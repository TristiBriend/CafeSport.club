import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import EventCard from "./EventCard";
import HorizontalCardRail from "./HorizontalCardRail";
import UserCard from "./UserCard";
import { getAthleteById, getTeamById, getUserById, getUsers } from "../services/catalogService";
import {
  createCommentReply,
  getAllComments,
  getCommentDateLabel,
  getLikedComments,
  toggleCommentLike,
} from "../services/commentsService";
import { getEventById, getWatchlistEvents } from "../services/eventsService";
import { searchGlobal } from "../services/globalSearchService";
import { getTop5EventsForUser } from "../services/profileTopEventsService";
import {
  getFavoriteSportsByRatings,
  getRatedPastEvents,
} from "../services/ratingsService";
import {
  getUserFollowerCount,
  readUserFollowMap,
} from "../services/userFollowService";
import {
  getCurrentProfileUserId,
  getProfileAvatarOverride,
  getProfileDetailsOverride,
  setProfileAvatarOverride,
  setProfileDetailsOverride,
} from "../services/profileService";
import { useSocialSync } from "../contexts/SocialSyncContext";
import { useAuth } from "../contexts/AuthContext";
import {
  canUploadProfileAvatarToCloud,
  uploadProfileAvatarFile,
} from "../services/profileAvatarStorageService";

const RADAR_COLORS = [
  "#ecef46",
  "#cce95b",
  "#96e273",
  "#64d88a",
  "#4bc0a0",
  "#36b2a3",
  "#2caea3",
  "#33a0b6",
  "#447fc8",
  "#5b63cc",
];

function toTimestamp(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function resolveAuthoredComments(allComments, user) {
  const safeUserId = String(user?.id || "").trim();
  const safeUserName = String(user?.name || "").trim();
  if (!safeUserId && !safeUserName) return [];
  return allComments
    .filter((comment) => {
      if (safeUserId && String(comment?.userId || "").trim() === safeUserId) return true;
      return safeUserName && String(comment?.author || "").trim() === safeUserName;
    })
    .sort((left, right) => toTimestamp(right?.createdAt) - toTimestamp(left?.createdAt));
}

function getSharedSportCount(user, profileUser) {
  const left = new Set(Array.isArray(user?.favoriteSports) ? user.favoriteSports : []);
  const right = new Set(Array.isArray(profileUser?.favoriteSports) ? profileUser.favoriteSports : []);
  if (!left.size || !right.size) return 0;
  let count = 0;
  left.forEach((sport) => {
    if (right.has(sport)) count += 1;
  });
  return count;
}

function buildRadarBins(ratedEvents) {
  const bins = Array.from({ length: 10 }, (_, index) => ({
    index,
    label: `${index * 10 + 1}-${(index + 1) * 10}`,
    count: 0,
  }));
  ratedEvents.forEach(({ score }) => {
    const value = Number(score || 0);
    if (!value) return;
    const bucket = Math.min(9, Math.max(0, Math.floor((value - 1) / 10)));
    bins[bucket].count += 1;
  });
  const maxCount = Math.max(1, ...bins.map((bin) => bin.count));
  return bins.map((bin, index) => ({
    ...bin,
    color: RADAR_COLORS[index % RADAR_COLORS.length],
    height: Math.max(4, Math.round((bin.count / maxCount) * 110)),
  }));
}

function buildProfileCopy({ isOwnProfile, userName }) {
  if (isOwnProfile) {
    return {
      topEventsTitle: "Mon Top 5 events",
      infoTitle: "Mes infos perso",
      radarTitle: "Mon radar des notes",
      friendsTitle: "Mes amis",
      followersTitle: "Mes followers",
      likesTitle: "Mes likes",
      watchlistTitle: "Ma watchlist",
      commentsTitle: "Mes commentaires",
      ideasTitle: "Autres idees",
    };
  }
  return {
    topEventsTitle: `Top 5 events de ${userName}`,
    infoTitle: `Infos perso de ${userName}`,
    followersTitle: `Followers de ${userName}`,
    commentsTitle: `Commentaires de ${userName}`,
  };
}

function resolveFavoriteItems(ids = [], kind = "team") {
  return (Array.isArray(ids) ? ids : [])
    .map((id) => {
      const safeId = String(id || "").trim();
      if (!safeId) return null;
      if (kind === "athlete") {
        const athlete = getAthleteById(safeId);
        if (!athlete) return null;
        return {
          id: athlete.id,
          label: athlete.name,
          to: `/athlete/${athlete.id}`,
        };
      }
      const team = getTeamById(safeId);
      if (!team) return null;
      return {
        id: team.id,
        label: team.nameFull || team.name,
        to: `/team/${team.id}`,
      };
    })
    .filter(Boolean);
}

function resolveTopEventsByIds(ids = []) {
  return (Array.isArray(ids) ? ids : [])
    .map((id) => {
      const safeId = String(id || "").trim();
      if (!safeId) return null;
      return getEventById(safeId);
    })
    .filter(Boolean)
    .slice(0, 5);
}

function mergeProfileDetails(user, override = {}) {
  return {
    age: String(override?.age || "").trim(),
    city: String(override?.city || user?.location || "").trim(),
    bioLong: String(override?.bioLong || user?.bio || "").trim(),
    favoriteTeam: String(override?.favoriteTeam || "").trim(),
    favoriteTeamIds: Array.isArray(override?.favoriteTeamIds) ? override.favoriteTeamIds.slice(0, 5) : [],
    favoriteAthlete: String(override?.favoriteAthlete || "").trim(),
    favoriteAthleteIds: Array.isArray(override?.favoriteAthleteIds) ? override.favoriteAthleteIds.slice(0, 5) : [],
    topEventIds: Array.isArray(override?.topEventIds) ? override.topEventIds.slice(0, 5) : [],
    quote: String(override?.quote || "").trim(),
  };
}

function emptyDetailsDraft() {
  return {
    age: "",
    city: "",
    bioLong: "",
    favoriteTeam: "",
    favoriteTeamIds: [],
    favoriteAthlete: "",
    favoriteAthleteIds: [],
    quote: "",
  };
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7.5h2l1.2-1.8h3.6L15 7.5h2A2.5 2.5 0 0 1 19.5 10v7A2.5 2.5 0 0 1 17 19.5H7A2.5 2.5 0 0 1 4.5 17v-7A2.5 2.5 0 0 1 7 7.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="13.2" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function UserProfileLayout({
  userId,
  isOwnProfile,
  watchlistIds = [],
  onToggleWatchlist = () => {},
}) {
  const { revisionByDomain } = useSocialSync();
  const { currentUser, isAuthenticated } = useAuth();
  const commentsRevision = Number(revisionByDomain?.comments || 0);
  const ratingsRevision = Number(revisionByDomain?.ratings || 0);
  const followsRevision = Number(revisionByDomain?.follows || 0);
  const profileRevision = Number(revisionByDomain?.profile || 0);
  const allUsers = useMemo(() => getUsers({ query: "" }), []);
  const defaultUserId = allUsers[0]?.id || "";
  const resolvedUserId = String(
    userId || (isOwnProfile ? getCurrentProfileUserId(defaultUserId) : ""),
  ).trim();
  const baseUser = getUserById(resolvedUserId) || (isOwnProfile ? getUserById(defaultUserId) : null);

  const [avatarVersion, setAvatarVersion] = useState(0);
  const [detailsVersion, setDetailsVersion] = useState(0);
  const [commentsVersion, setCommentsVersion] = useState(0);
  const [avatarError, setAvatarError] = useState("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingTopEvents, setIsEditingTopEvents] = useState(false);
  const [detailsDraft, setDetailsDraft] = useState(emptyDetailsDraft);
  const [favoriteTeamQuery, setFavoriteTeamQuery] = useState("");
  const [favoriteAthleteQuery, setFavoriteAthleteQuery] = useState("");
  const [topEventsDraft, setTopEventsDraft] = useState([]);
  const [topEventsQuery, setTopEventsQuery] = useState("");
  const [topEventsNotice, setTopEventsNotice] = useState("");
  const [draggingTopEventId, setDraggingTopEventId] = useState("");
  const [dragOverTopEventId, setDragOverTopEventId] = useState("");
  const ageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const avatarOverride = useMemo(
    () => getProfileAvatarOverride(baseUser?.id),
    [avatarVersion, baseUser?.id, profileRevision],
  );
  const profileUser = baseUser
    ? { ...baseUser, image: avatarOverride || baseUser.image }
    : null;

  const actorUser = useMemo(() => {
    const currentActorId = getCurrentProfileUserId(defaultUserId);
    return getUserById(currentActorId) || getUserById(defaultUserId) || profileUser;
  }, [defaultUserId, profileUser]);

  const allComments = useMemo(
    () => getAllComments(),
    [commentsRevision, commentsVersion],
  );
  const authoredComments = useMemo(
    () => resolveAuthoredComments(allComments, profileUser),
    [allComments, profileUser],
  );
  const likedEntries = useMemo(
    () => (isOwnProfile ? getLikedComments({ limit: 24 }) : []),
    [commentsRevision, commentsVersion, isOwnProfile],
  );
  const watchlistEvents = useMemo(
    () => (isOwnProfile ? getWatchlistEvents(watchlistIds) : []),
    [isOwnProfile, watchlistIds],
  );
  const ratedEvents = useMemo(
    () => (isOwnProfile ? getRatedPastEvents() : []),
    [isOwnProfile, ratingsRevision],
  );
  const radarBins = useMemo(
    () => buildRadarBins(ratedEvents),
    [ratedEvents],
  );
  const favoriteSports = useMemo(
    () => (isOwnProfile ? getFavoriteSportsByRatings() : []),
    [isOwnProfile, ratingsRevision],
  );
  const friends = useMemo(() => {
    if (!isOwnProfile) return [];
    const map = readUserFollowMap();
    return Object.entries(map)
      .filter(([followedUserId, isFollowed]) => Boolean(isFollowed) && followedUserId !== profileUser?.id)
      .map(([followedUserId]) => getUserById(followedUserId))
      .filter(Boolean);
  }, [commentsVersion, followsRevision, isOwnProfile, profileUser?.id]);
  const followers = useMemo(() => {
    if (!profileUser) return [];
    return allUsers
      .filter((user) => user.id !== profileUser.id)
      .sort((left, right) => {
        const sharedDiff = getSharedSportCount(right, profileUser) - getSharedSportCount(left, profileUser);
        if (sharedDiff !== 0) return sharedDiff;
        return Number(right.followers || 0) - Number(left.followers || 0);
      })
      .slice(0, 8);
  }, [allUsers, profileUser]);
  const topEventsData = useMemo(
    () => (profileUser ? getTop5EventsForUser(profileUser.id, 5) : { events: [], rankingList: null }),
    [commentsRevision, commentsVersion, profileUser],
  );
  const detailsOverride = useMemo(
    () => getProfileDetailsOverride(profileUser?.id),
    [detailsVersion, profileRevision, profileUser?.id],
  );
  const profileDetails = useMemo(
    () => mergeProfileDetails(profileUser, detailsOverride),
    [detailsOverride, profileUser],
  );
  const manualTopEvents = useMemo(
    () => resolveTopEventsByIds(profileDetails.topEventIds),
    [profileDetails.topEventIds],
  );
  const displayedTopEvents = manualTopEvents.length ? manualTopEvents : topEventsData.events;
  const favoriteTeamSelections = useMemo(
    () => resolveFavoriteItems(profileDetails.favoriteTeamIds, "team"),
    [profileDetails.favoriteTeamIds],
  );
  const favoriteAthleteSelections = useMemo(
    () => resolveFavoriteItems(profileDetails.favoriteAthleteIds, "athlete"),
    [profileDetails.favoriteAthleteIds],
  );
  const draftFavoriteTeams = useMemo(
    () => resolveFavoriteItems(detailsDraft.favoriteTeamIds, "team"),
    [detailsDraft.favoriteTeamIds],
  );
  const draftFavoriteAthletes = useMemo(
    () => resolveFavoriteItems(detailsDraft.favoriteAthleteIds, "athlete"),
    [detailsDraft.favoriteAthleteIds],
  );
  const favoriteTeamSearchResults = useMemo(() => {
    const selected = new Set((Array.isArray(detailsDraft.favoriteTeamIds) ? detailsDraft.favoriteTeamIds : []).map((id) => String(id || "").trim()));
    return searchGlobal(favoriteTeamQuery, { limit: 6, types: ["team"] })
      .filter((result) => !selected.has(String(result?.id || "").trim()));
  }, [detailsDraft.favoriteTeamIds, favoriteTeamQuery]);
  const favoriteAthleteSearchResults = useMemo(() => {
    const selected = new Set((Array.isArray(detailsDraft.favoriteAthleteIds) ? detailsDraft.favoriteAthleteIds : []).map((id) => String(id || "").trim()));
    return searchGlobal(favoriteAthleteQuery, { limit: 6, types: ["athlete"] })
      .filter((result) => !selected.has(String(result?.id || "").trim()));
  }, [detailsDraft.favoriteAthleteIds, favoriteAthleteQuery]);
  const topEventsDraftItems = useMemo(
    () => resolveTopEventsByIds(topEventsDraft),
    [topEventsDraft],
  );
  const visibleTopEvents = isEditingTopEvents ? topEventsDraftItems : displayedTopEvents;
  const topEventSearchResults = useMemo(() => {
    const currentSelection = new Set((Array.isArray(topEventsDraft) ? topEventsDraft : []).map((id) => String(id || "").trim()));
    return searchGlobal(topEventsQuery, { limit: 8, types: ["event"] })
      .filter((result) => !currentSelection.has(String(result?.id || "").trim()));
  }, [topEventsDraft, topEventsQuery]);

  if (!profileUser) {
    return (
      <section className="simple-page">
        <h1>Profil introuvable</h1>
        <Link className="btn btn-ghost" to={isOwnProfile ? "/" : "/users"}>
          {isOwnProfile ? "Retour accueil" : "Retour users"}
        </Link>
      </section>
    );
  }

  const copy = buildProfileCopy({
    isOwnProfile: Boolean(isOwnProfile),
    userName: profileUser.name,
  });
  const followerCount = getUserFollowerCount(profileUser.id, Number(profileUser.followers || 0));

  useEffect(() => {
    if (!isEditingDetails) return undefined;
    const frameId = window.requestAnimationFrame(() => {
      ageInputRef.current?.focus();
      ageInputRef.current?.select?.();
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [isEditingDetails]);

  function bumpComments() {
    setCommentsVersion((value) => value + 1);
  }

  function handleToggleLike(comment) {
    toggleCommentLike(comment);
    bumpComments();
  }

  function handleCreateReply(comment, note) {
    const created = createCommentReply(comment?.id, {
      note,
      author: actorUser?.name || "Vous",
      userId: actorUser?.id || "usr-manual",
    });
    if (!created) return null;
    bumpComments();
    return created;
  }

  function handlePickPhoto() {
    fileInputRef.current?.click();
  }

  async function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setAvatarError("Selectionne une image valide.");
      return;
    }
    if (file.size > 2_500_000) {
      setAvatarError("Image trop lourde (max 2.5 MB).");
      return;
    }
    setAvatarError("");

    if (isOwnProfile && isAuthenticated && canUploadProfileAvatarToCloud() && currentUser?.firebaseUid) {
      setIsUploadingAvatar(true);
      try {
        const { url } = await uploadProfileAvatarFile(currentUser.firebaseUid, file);
        setProfileAvatarOverride(profileUser.id, url);
        setAvatarVersion((value) => value + 1);
        setAvatarError("");
      } catch {
        setAvatarError("Upload impossible pour le moment. Reessaye dans quelques secondes.");
      } finally {
        setIsUploadingAvatar(false);
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      if (!result.startsWith("data:image/")) {
        setAvatarError("Impossible de lire cette image.");
        return;
      }
      setProfileAvatarOverride(profileUser.id, result);
      setAvatarVersion((value) => value + 1);
      setAvatarError("");
    };
    reader.readAsDataURL(file);
  }

  function openDetailsEditor() {
    setDetailsDraft({
      age: profileDetails.age,
      city: profileDetails.city,
      bioLong: profileDetails.bioLong,
      favoriteTeam: profileDetails.favoriteTeam,
      favoriteTeamIds: Array.isArray(profileDetails.favoriteTeamIds) ? profileDetails.favoriteTeamIds.slice(0, 5) : [],
      favoriteAthlete: profileDetails.favoriteAthlete,
      favoriteAthleteIds: Array.isArray(profileDetails.favoriteAthleteIds) ? profileDetails.favoriteAthleteIds.slice(0, 5) : [],
      quote: profileDetails.quote,
    });
    setFavoriteTeamQuery("");
    setFavoriteAthleteQuery("");
    setIsEditingDetails(true);
  }

  function handleCancelEditDetails() {
    setIsEditingDetails(false);
    setDetailsDraft(emptyDetailsDraft());
    setFavoriteTeamQuery("");
    setFavoriteAthleteQuery("");
  }

  function openTopEventsEditor() {
    const seedIds = profileDetails.topEventIds.length
      ? profileDetails.topEventIds
      : topEventsData.events
        .map((event) => String(event?.id || "").trim())
        .filter(Boolean)
        .slice(0, 5);
    setTopEventsDraft(seedIds);
    setTopEventsQuery("");
    setTopEventsNotice("");
    setIsEditingTopEvents(true);
  }

  function handleCancelTopEventsEdit() {
    setIsEditingTopEvents(false);
    setTopEventsDraft([]);
    setTopEventsQuery("");
    setTopEventsNotice("");
    setDraggingTopEventId("");
    setDragOverTopEventId("");
  }

  function handleAddTopEvent(result) {
    const safeId = String(result?.id || "").trim();
    if (!safeId) return;
    if (topEventsDraft.includes(safeId)) {
      setTopEventsNotice("Event deja ajoute.");
      return;
    }
    if (topEventsDraft.length >= 5) {
      setTopEventsNotice("Limite 5/5 atteinte.");
      return;
    }
    setTopEventsDraft((prev) => [...prev, safeId]);
    setTopEventsQuery("");
    setTopEventsNotice("");
  }

  function handleRemoveTopEvent(eventId) {
    const safeId = String(eventId || "").trim();
    if (!safeId) return;
    setTopEventsDraft((prev) => prev.filter((id) => id !== safeId));
    setTopEventsNotice("");
    if (draggingTopEventId === safeId) setDraggingTopEventId("");
    if (dragOverTopEventId === safeId) setDragOverTopEventId("");
  }

  function handleMoveTopEvent(draggedId, targetId) {
    const safeDraggedId = String(draggedId || "").trim();
    const safeTargetId = String(targetId || "").trim();
    if (!safeDraggedId || !safeTargetId || safeDraggedId === safeTargetId) return;
    setTopEventsDraft((prev) => {
      const next = Array.isArray(prev) ? prev.slice() : [];
      const fromIndex = next.indexOf(safeDraggedId);
      const targetIndex = next.indexOf(safeTargetId);
      if (fromIndex < 0 || targetIndex < 0) return prev;
      const [moved] = next.splice(fromIndex, 1);
      const insertIndex = next.indexOf(safeTargetId);
      next.splice(insertIndex < 0 ? next.length : insertIndex, 0, moved);
      return next;
    });
  }

  function handleUseAutoTopEvents() {
    setTopEventsDraft([]);
    setTopEventsQuery("");
    setTopEventsNotice("Mode automatique actif. Enregistre pour appliquer.");
    setDraggingTopEventId("");
    setDragOverTopEventId("");
  }

  function handleSaveTopEvents() {
    setProfileDetailsOverride(profileUser.id, {
      topEventIds: topEventsDraft,
    });
    setDetailsVersion((value) => value + 1);
    setIsEditingTopEvents(false);
    setTopEventsDraft([]);
    setTopEventsQuery("");
    setTopEventsNotice("");
    setDraggingTopEventId("");
    setDragOverTopEventId("");
  }

  function handleSaveDetails(event) {
    if (event?.preventDefault) event.preventDefault();
    const firstTeam = resolveFavoriteItems(detailsDraft.favoriteTeamIds, "team")[0] || null;
    const firstAthlete = resolveFavoriteItems(detailsDraft.favoriteAthleteIds, "athlete")[0] || null;
    setProfileDetailsOverride(profileUser.id, {
      ...detailsDraft,
      favoriteTeam: firstTeam?.label || "",
      favoriteAthlete: firstAthlete?.label || "",
    });
    setDetailsVersion((value) => value + 1);
    setIsEditingDetails(false);
    setFavoriteTeamQuery("");
    setFavoriteAthleteQuery("");
  }

  function handleDetailsDraftChange(event) {
    const { name, value } = event.target;
    setDetailsDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddFavoriteTeam(result) {
    const safeId = String(result?.id || "").trim();
    if (!safeId) return;
    setDetailsDraft((prev) => {
      if (prev.favoriteTeamIds.includes(safeId)) return prev;
      if (prev.favoriteTeamIds.length >= 5) return prev;
      return {
        ...prev,
        favoriteTeamIds: [...prev.favoriteTeamIds, safeId],
      };
    });
    setFavoriteTeamQuery("");
  }

  function handleRemoveFavoriteTeam(teamId) {
    const safeId = String(teamId || "").trim();
    if (!safeId) return;
    setDetailsDraft((prev) => ({
      ...prev,
      favoriteTeamIds: prev.favoriteTeamIds.filter((id) => id !== safeId),
    }));
  }

  function handleAddFavoriteAthlete(result) {
    const safeId = String(result?.id || "").trim();
    if (!safeId) return;
    setDetailsDraft((prev) => {
      if (prev.favoriteAthleteIds.includes(safeId)) return prev;
      if (prev.favoriteAthleteIds.length >= 5) return prev;
      return {
        ...prev,
        favoriteAthleteIds: [...prev.favoriteAthleteIds, safeId],
      };
    });
    setFavoriteAthleteQuery("");
  }

  function handleRemoveFavoriteAthlete(athleteId) {
    const safeId = String(athleteId || "").trim();
    if (!safeId) return;
    setDetailsDraft((prev) => ({
      ...prev,
      favoriteAthleteIds: prev.favoriteAthleteIds.filter((id) => id !== safeId),
    }));
  }

  return (
    <section className={`profile-page profile-page-shell ${isOwnProfile ? "profile-mode-owner" : "profile-mode-visitor"}`.trim()}>
      <section className="profile-top-grid">
        <div className="profile-primary-column">
          {isUploadingAvatar ? <p className="event-meta">Upload de la photo en cours...</p> : null}
          {avatarError ? <p className="event-meta">{avatarError}</p> : null}
          <div className="profile-user-card-wrap">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="profile-photo-input"
              onChange={handlePhotoChange}
            />
            <UserCard user={profileUser} variant="detail" size="large" showTags={false} />
            {isOwnProfile ? (
              <button
                type="button"
                className="profile-photo-upload-icon-btn"
                onClick={handlePickPhoto}
                disabled={isUploadingAvatar}
                aria-label="Changer ma photo"
                title={isUploadingAvatar ? "Upload en cours..." : "Changer ma photo"}
              >
                <CameraIcon />
              </button>
            ) : null}
          </div>
        </div>

        <div className="profile-secondary-column">
          <section className="related-section profile-info-section">
            <div className="group-title">
              <h2>{copy.infoTitle}</h2>
              <div className="group-title-meta">
                <span>{profileDetails.city || "Profil"}</span>
                {isOwnProfile ? (
                  isEditingDetails ? (
                    <>
                      <button type="button" className="filter-btn is-active" onClick={handleSaveDetails}>
                        Enregistrer
                      </button>
                      <button type="button" className="filter-btn" onClick={handleCancelEditDetails}>
                        Annuler
                      </button>
                    </>
                  ) : (
                    <button type="button" className="filter-btn" onClick={openDetailsEditor}>
                      Modifier mes infos
                    </button>
                  )
                ) : null}
              </div>
            </div>
            <article className="entity-card profile-info-card">
              <div className="profile-info-grid">
                <div className={`profile-info-row ${isEditingDetails ? "is-editing" : ""}`.trim()}>
                  <strong>Age</strong>
                  <div className="profile-info-value">
                    {isOwnProfile && isEditingDetails ? (
                      <input
                        ref={ageInputRef}
                        className={`profile-info-inline-input ${isEditingDetails ? "is-entry-focus" : ""}`.trim()}
                        name="age"
                        type="text"
                        value={detailsDraft.age}
                        onChange={handleDetailsDraftChange}
                      />
                    ) : (
                      <span>{profileDetails.age || "Non renseigne"}</span>
                    )}
                  </div>
                </div>
                <div className={`profile-info-row ${isEditingDetails ? "is-editing" : ""}`.trim()}>
                  <strong>Ville</strong>
                  <div className="profile-info-value">
                    {isOwnProfile && isEditingDetails ? (
                      <input
                        className="profile-info-inline-input"
                        name="city"
                        type="text"
                        value={detailsDraft.city}
                        onChange={handleDetailsDraftChange}
                      />
                    ) : (
                      <span>{profileDetails.city || "Non renseignee"}</span>
                    )}
                  </div>
                </div>
                <div className={`profile-info-row ${isEditingDetails ? "is-editing" : ""}`.trim()}>
                  <strong>Bio</strong>
                  <div className="profile-info-value">
                    {isOwnProfile && isEditingDetails ? (
                      <textarea
                        className="profile-info-inline-textarea"
                        name="bioLong"
                        rows={2}
                        value={detailsDraft.bioLong}
                        onChange={handleDetailsDraftChange}
                      />
                    ) : (
                      <span>{profileDetails.bioLong || "Aucune bio detaillee."}</span>
                    )}
                  </div>
                </div>
                <div className={`profile-info-row ${isEditingDetails ? "is-editing" : ""}`.trim()}>
                  <strong>Equipes favorites</strong>
                  <div className="profile-info-value">
                    {isOwnProfile && isEditingDetails ? (
                      <>
                        <div className="profile-inline-picker">
                          <input
                            className="profile-inline-picker-input"
                            type="search"
                            placeholder="Ajouter une equipe..."
                            value={favoriteTeamQuery}
                            onChange={(event) => setFavoriteTeamQuery(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key !== "Enter" || !favoriteTeamSearchResults.length) return;
                              event.preventDefault();
                              handleAddFavoriteTeam(favoriteTeamSearchResults[0]);
                            }}
                          />
                          <span className="tag-row profile-inline-picker-tags">
                            {draftFavoriteTeams.map((entry) => (
                              <span key={entry.id} className="tag">
                                <span>{entry.label}</span>
                                <button
                                  type="button"
                                  className="header-search-picker-chip-remove"
                                  onClick={() => handleRemoveFavoriteTeam(entry.id)}
                                  aria-label={`Retirer ${entry.label}`}
                                >
                                  x
                                </button>
                              </span>
                            ))}
                          </span>
                        </div>
                        {!draftFavoriteTeams.length ? <span className="event-meta">Aucune equipe selectionnee.</span> : null}
                        {detailsDraft.favoriteTeamIds.length >= 5 ? <span className="event-meta">Limite 5/5 atteinte.</span> : null}
                        {favoriteTeamQuery ? (
                          favoriteTeamSearchResults.length ? (
                            <div className="profile-inline-picker-results">
                              {favoriteTeamSearchResults.map((result) => (
                                <button
                                  key={`${result.type}-${result.id}`}
                                  type="button"
                                  className="global-search-result-item profile-inline-picker-result"
                                  onClick={() => handleAddFavoriteTeam(result)}
                                >
                                  <span className="global-search-type">{result.typeLabel}</span>
                                  <div>
                                    <strong>{result.title}</strong>
                                    <p>{result.subtitle}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <span className="event-meta">Aucune equipe trouvee.</span>
                          )
                        ) : null}
                      </>
                    ) : (
                      favoriteTeamSelections.length ? (
                        <span className="tag-row">
                          {favoriteTeamSelections.map((entry) => (
                            <Link key={entry.id} to={entry.to} className="tag">{entry.label}</Link>
                          ))}
                        </span>
                      ) : (
                        <span>{profileDetails.favoriteTeam || "Non renseignee"}</span>
                      )
                    )}
                  </div>
                </div>
                <div className={`profile-info-row ${isEditingDetails ? "is-editing" : ""}`.trim()}>
                  <strong>Athletes favoris</strong>
                  <div className="profile-info-value">
                    {isOwnProfile && isEditingDetails ? (
                      <>
                        <div className="profile-inline-picker">
                          <input
                            className="profile-inline-picker-input"
                            type="search"
                            placeholder="Ajouter un athlete..."
                            value={favoriteAthleteQuery}
                            onChange={(event) => setFavoriteAthleteQuery(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key !== "Enter" || !favoriteAthleteSearchResults.length) return;
                              event.preventDefault();
                              handleAddFavoriteAthlete(favoriteAthleteSearchResults[0]);
                            }}
                          />
                          <span className="tag-row profile-inline-picker-tags">
                            {draftFavoriteAthletes.map((entry) => (
                              <span key={entry.id} className="tag">
                                <span>{entry.label}</span>
                                <button
                                  type="button"
                                  className="header-search-picker-chip-remove"
                                  onClick={() => handleRemoveFavoriteAthlete(entry.id)}
                                  aria-label={`Retirer ${entry.label}`}
                                >
                                  x
                                </button>
                              </span>
                            ))}
                          </span>
                        </div>
                        {!draftFavoriteAthletes.length ? <span className="event-meta">Aucun athlete selectionne.</span> : null}
                        {detailsDraft.favoriteAthleteIds.length >= 5 ? <span className="event-meta">Limite 5/5 atteinte.</span> : null}
                        {favoriteAthleteQuery ? (
                          favoriteAthleteSearchResults.length ? (
                            <div className="profile-inline-picker-results">
                              {favoriteAthleteSearchResults.map((result) => (
                                <button
                                  key={`${result.type}-${result.id}`}
                                  type="button"
                                  className="global-search-result-item profile-inline-picker-result"
                                  onClick={() => handleAddFavoriteAthlete(result)}
                                >
                                  <span className="global-search-type">{result.typeLabel}</span>
                                  <div>
                                    <strong>{result.title}</strong>
                                    <p>{result.subtitle}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <span className="event-meta">Aucun athlete trouve.</span>
                          )
                        ) : null}
                      </>
                    ) : (
                      favoriteAthleteSelections.length ? (
                        <span className="tag-row">
                          {favoriteAthleteSelections.map((entry) => (
                            <Link key={entry.id} to={entry.to} className="tag">{entry.label}</Link>
                          ))}
                        </span>
                      ) : (
                        <span>{profileDetails.favoriteAthlete || "Non renseigne"}</span>
                      )
                    )}
                  </div>
                </div>
                <div className={`profile-info-row ${isEditingDetails ? "is-editing" : ""}`.trim()}>
                  <strong>Citation</strong>
                  <div className="profile-info-value">
                    {isOwnProfile && isEditingDetails ? (
                      <input
                        className="profile-info-inline-input"
                        name="quote"
                        type="text"
                        value={detailsDraft.quote}
                        onChange={handleDetailsDraftChange}
                      />
                    ) : (
                      <span>{profileDetails.quote || "Aucune citation."}</span>
                    )}
                  </div>
                </div>
              </div>

            </article>
          </section>

          <section className="related-section profile-top5-section profile-top-aside">
            <div className="group-title">
              <h2>{copy.topEventsTitle}</h2>
              <div className="group-title-meta">
                <span>{visibleTopEvents.length || 0}</span>
                {isOwnProfile ? (
                  isEditingTopEvents ? (
                    <>
                      <button type="button" className="filter-btn" onClick={handleUseAutoTopEvents}>
                        Mode auto
                      </button>
                      <button type="button" className="filter-btn is-active" onClick={handleSaveTopEvents}>
                        Enregistrer
                      </button>
                      <button type="button" className="filter-btn" onClick={handleCancelTopEventsEdit}>
                        Annuler
                      </button>
                    </>
                  ) : (
                    <button type="button" className="filter-btn" onClick={openTopEventsEditor}>
                      Modifier mon Top 5
                    </button>
                  )
                ) : null}
              </div>
            </div>
            {visibleTopEvents.length ? (
              <article className="entity-card profile-top5-inline-card">
                <ol className="profile-top5-inline-list">
                  {visibleTopEvents.slice(0, 5).map((event, index) => {
                    const sport = String(event?.sport || "").trim();
                    const date = String(event?.date || "").trim();
                    const location = String(event?.location || "").trim();
                    const metaParts = [sport, date, location].filter(Boolean);
                    return (
                      <li
                        key={event.id || `profile-top-${index + 1}`}
                        className={`profile-top5-inline-item ${isEditingTopEvents ? "is-editing" : ""} ${dragOverTopEventId === event.id ? "is-drag-target" : ""}`.trim()}
                        draggable={isEditingTopEvents}
                        onDragStart={(dragEvent) => {
                          if (!isEditingTopEvents) return;
                          const safeId = String(event?.id || "").trim();
                          if (!safeId) return;
                          setDraggingTopEventId(safeId);
                          setDragOverTopEventId(safeId);
                          dragEvent.dataTransfer.effectAllowed = "move";
                          dragEvent.dataTransfer.setData("text/plain", safeId);
                        }}
                        onDragOver={(dragEvent) => {
                          if (!isEditingTopEvents || !draggingTopEventId) return;
                          dragEvent.preventDefault();
                          const safeId = String(event?.id || "").trim();
                          if (!safeId) return;
                          dragEvent.dataTransfer.dropEffect = "move";
                          if (dragOverTopEventId !== safeId) setDragOverTopEventId(safeId);
                        }}
                        onDrop={(dragEvent) => {
                          if (!isEditingTopEvents) return;
                          dragEvent.preventDefault();
                          const droppedId = String(dragEvent.dataTransfer.getData("text/plain") || draggingTopEventId).trim();
                          const targetId = String(event?.id || "").trim();
                          handleMoveTopEvent(droppedId, targetId);
                          setDraggingTopEventId("");
                          setDragOverTopEventId("");
                        }}
                        onDragEnd={() => {
                          setDraggingTopEventId("");
                          setDragOverTopEventId("");
                        }}
                      >
                        <span className="profile-top5-rank">#{index + 1}</span>
                        <div className="profile-top5-line">
                          {isEditingTopEvents ? (
                            <span className="profile-top5-link profile-top5-link-static">
                              {event.title || "Evenement"}
                            </span>
                          ) : (
                            <Link className="profile-top5-link" to={`/event/${event.id}`}>
                              {event.title || "Evenement"}
                            </Link>
                          )}
                          {metaParts.length ? (
                            <span className="profile-top5-meta">{metaParts.join(" · ")}</span>
                          ) : (
                            <span className="profile-top5-meta">Infos non disponibles</span>
                          )}
                        </div>
                        {isEditingTopEvents ? (
                          <div className="profile-top5-item-controls">
                            <span className="profile-top5-drag-handle" aria-hidden="true" title="Glisser pour reclasser">
                              ⋮⋮
                            </span>
                            <button
                              type="button"
                              className="profile-top5-remove-btn"
                              onClick={() => handleRemoveTopEvent(event.id)}
                              aria-label={`Retirer ${event.title || "cet event"}`}
                            >
                              x
                            </button>
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </article>
            ) : (
              <article className="entity-card">
                <p className="event-meta">
                  {isEditingTopEvents
                    ? "Aucune selection manuelle pour le moment."
                    : "Aucun top event disponible pour ce profil."}
                </p>
              </article>
            )}
            {isOwnProfile && isEditingTopEvents ? (
              <article className="entity-card profile-top5-editor">
                <div className="profile-top5-editor-head">
                  <strong>Edition manuelle</strong>
                  <span className="event-meta">{topEventsDraft.length}/5 · glisse pour reclasser</span>
                </div>
                {!topEventsDraftItems.length ? (
                  <p className="event-meta">Aucune selection manuelle. Enregistrer vide = retour au mode automatique.</p>
                ) : null}
                <label className="profile-top5-search">
                  <span className="event-meta">Rechercher un event</span>
                  <input
                    type="search"
                    placeholder="Ajouter un event au Top 5..."
                    value={topEventsQuery}
                    onChange={(event) => {
                      setTopEventsQuery(event.target.value);
                      if (topEventsNotice) setTopEventsNotice("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter") return;
                      if (!topEventSearchResults.length) return;
                      event.preventDefault();
                      handleAddTopEvent(topEventSearchResults[0]);
                    }}
                  />
                </label>
                {topEventsNotice ? <p className="profile-top5-editor-notice">{topEventsNotice}</p> : null}
                {topEventsQuery ? (
                  topEventSearchResults.length ? (
                    <div className="profile-top5-search-results">
                      {topEventSearchResults.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          type="button"
                          className="global-search-result-item profile-top5-search-result"
                          onClick={() => handleAddTopEvent(result)}
                        >
                          <span className="global-search-type">{result.typeLabel}</span>
                          <div>
                            <strong>{result.title}</strong>
                            <p>{result.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="global-search-empty">Aucun event pour <strong>{topEventsQuery}</strong></div>
                  )
                ) : null}
              </article>
            ) : null}
          </section>
        </div>
      </section>

      {isOwnProfile ? (
        <section className="related-section">
          <div className="group-title">
            <h2>{copy.friendsTitle}</h2>
            <span>{friends.length}</span>
          </div>
          {friends.length ? (
            <div className="entity-grid">
              {friends.map((friend) => (
                <UserCard key={friend.id} user={friend} size="small" showTags={false} />
              ))}
            </div>
          ) : (
            <article className="entity-card">
              <p className="event-meta">
                Aucun ami suivi pour le moment. Va sur{" "}
                <Link to="/users">Users</Link> pour commencer a suivre des profils.
              </p>
            </article>
          )}
        </section>
      ) : null}

      <section className="related-section">
        <div className="group-title">
          <h2>{copy.followersTitle}</h2>
          <span>{followerCount.toLocaleString("fr-FR")}</span>
        </div>
        {followers.length ? (
          <div className="entity-grid">
            {followers.map((user) => (
              <UserCard key={user.id} user={user} size="small" showTags={false} />
            ))}
          </div>
        ) : (
          <article className="entity-card">
            <p className="event-meta">Aucun follower recommande.</p>
          </article>
        )}
      </section>

      {isOwnProfile ? (
        <section className="related-section">
          <div className="group-title">
            <h2>{copy.likesTitle}</h2>
            <span>{likedEntries.length}</span>
          </div>
          {likedEntries.length ? (
            <div className="profile-like-list">
              {likedEntries.map((entry) => {
                if (entry.kind === "comment") {
                  return (
                    <CommentCard
                      key={entry.id}
                      comment={entry.item}
                      onToggleLike={handleToggleLike}
                      onCreateReply={handleCreateReply}
                    />
                  );
                }
                return (
                  <article key={entry.id} className="entity-card profile-like-reply-card">
                    <h3>Reponse likee</h3>
                    <p className="event-meta">
                      {entry.item?.parentAuthor ? `En reponse a ${entry.item.parentAuthor}` : "Reponse"}
                      {" · "}
                      {getCommentDateLabel(entry.item)}
                    </p>
                    <p className="typo-body">{entry.item?.note || "Sans contenu"}</p>
                    {entry.eventId ? (
                      <Link className="event-link" to={`/event/${entry.eventId}`}>
                        Ouvrir evenement
                      </Link>
                    ) : null}
                  </article>
                );
              })}
            </div>
          ) : (
            <article className="entity-card">
              <p className="event-meta">Aucun like enregistre pour le moment.</p>
            </article>
          )}
        </section>
      ) : null}

      {isOwnProfile ? (
        <section className="related-section">
          <div className="group-title">
            <h2>{copy.watchlistTitle}</h2>
            <span>{watchlistEvents.length}</span>
          </div>
          {watchlistEvents.length ? (
            <HorizontalCardRail label={copy.watchlistTitle} itemType="event">
              {watchlistEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isInWatchlist={watchlistIds.includes(event.id)}
                  onToggleWatchlist={onToggleWatchlist}
                  showComment={false}
                />
              ))}
            </HorizontalCardRail>
          ) : (
            <article className="entity-card">
              <p className="event-meta">Ta watchlist est vide.</p>
            </article>
          )}
        </section>
      ) : null}

      <section className="related-section">
        <div className="group-title">
          <h2>{copy.commentsTitle}</h2>
          <span>{authoredComments.length}</span>
        </div>
        {authoredComments.length ? (
          <div className="profile-comments-list">
            {authoredComments.slice(0, 20).map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onToggleLike={handleToggleLike}
                onCreateReply={handleCreateReply}
              />
            ))}
          </div>
        ) : (
          <article className="entity-card">
            <p className="event-meta">Aucun commentaire publie pour l instant.</p>
          </article>
        )}
      </section>

      {isOwnProfile ? (
        <section className="related-section">
          <div className="group-title">
            <h2>{copy.ideasTitle}</h2>
            <span>Roadmap</span>
          </div>
          <article className="entity-card">
            <ul className="profile-ideas-list">
              <li>Badges de progression (noteur, analyste, top fan par sport).</li>
              <li>Timeline d activite (likes, commentaires, suivis) par semaine.</li>
              <li>Objectifs personnels (ex: 10 critiques ce mois-ci).</li>
              <li>Comparaison de radar avec tes amis.</li>
            </ul>
          </article>
        </section>
      ) : null}

      {isOwnProfile ? (
        <article className="rating-distribution-card is-user">
          <div className="rating-distribution-head">
            <h3>{copy.radarTitle}</h3>
            <span className="muted">{ratedEvents.length} notes</span>
          </div>
          <div className="rating-distribution-scroll">
            <div className="rating-distribution-chart">
              {radarBins.map((bin) => (
                <div key={bin.label} className="rating-dist-bin">
                  <span className={`rating-dist-count ${bin.count ? "is-visible" : ""}`.trim()}>
                    {bin.count || ""}
                  </span>
                  <span
                    className="rating-dist-bar"
                    style={{
                      "--bar-height": `${bin.height}px`,
                      "--bar-color": bin.color,
                    }}
                    aria-hidden="true"
                  />
                  <span className="rating-dist-label">{bin.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rating-distribution-axis">
            <span>Notes basses</span>
            <span>Moyennes</span>
            <span>Excellentes</span>
          </div>
          <div className="tag-row profile-favorite-sports">
            {favoriteSports.length ? (
              favoriteSports.slice(0, 4).map((sport) => (
                <span key={sport} className="tag">
                  {sport}
                </span>
              ))
            ) : (
              <span className="event-meta">Aucune tendance sport pour l instant.</span>
            )}
          </div>
        </article>
      ) : null}
    </section>
  );
}

export default UserProfileLayout;
