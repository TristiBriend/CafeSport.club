import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import EventCard from "./EventCard";
import HorizontalCardRail from "./HorizontalCardRail";
import RankingCard from "./RankingCard";
import UserCard from "./UserCard";
import { getUserById, getUsers } from "../services/catalogService";
import {
  createCommentReply,
  getAllComments,
  getCommentDateLabel,
  getLikedComments,
  toggleCommentLike,
} from "../services/commentsService";
import { getWatchlistEvents } from "../services/eventsService";
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
  clearProfileAvatarOverride,
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

function mergeProfileDetails(user, override = {}) {
  return {
    age: String(override?.age || "").trim(),
    city: String(override?.city || user?.location || "").trim(),
    bioLong: String(override?.bioLong || user?.bio || "").trim(),
    favoriteTeam: String(override?.favoriteTeam || "").trim(),
    favoriteAthlete: String(override?.favoriteAthlete || "").trim(),
    quote: String(override?.quote || "").trim(),
  };
}

function emptyDetailsDraft() {
  return {
    age: "",
    city: "",
    bioLong: "",
    favoriteTeam: "",
    favoriteAthlete: "",
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
  const [detailsDraft, setDetailsDraft] = useState(emptyDetailsDraft);
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

  function handleResetPhoto() {
    clearProfileAvatarOverride(profileUser.id);
    setAvatarVersion((value) => value + 1);
    setAvatarError("");
  }

  function openDetailsEditor() {
    setDetailsDraft({
      age: profileDetails.age,
      city: profileDetails.city,
      bioLong: profileDetails.bioLong,
      favoriteTeam: profileDetails.favoriteTeam,
      favoriteAthlete: profileDetails.favoriteAthlete,
      quote: profileDetails.quote,
    });
    setIsEditingDetails(true);
  }

  function handleCancelEditDetails() {
    setIsEditingDetails(false);
    setDetailsDraft(emptyDetailsDraft());
  }

  function handleSaveDetails(event) {
    event.preventDefault();
    setProfileDetailsOverride(profileUser.id, detailsDraft);
    setDetailsVersion((value) => value + 1);
    setIsEditingDetails(false);
  }

  function handleDetailsDraftChange(event) {
    const { name, value } = event.target;
    setDetailsDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <section className={`profile-page profile-page-shell ${isOwnProfile ? "profile-mode-owner" : "profile-mode-visitor"}`.trim()}>
      <section className="profile-top-grid">
        <div className="profile-primary-column">
          <article className="entity-card profile-panel">
            {isOwnProfile ? (
              <div className="profile-panel-actions">
                <button type="button" className="filter-btn" onClick={openDetailsEditor}>
                  Modifier mes infos
                </button>
                {avatarOverride ? (
                  <button type="button" className="filter-btn" onClick={handleResetPhoto} disabled={isUploadingAvatar}>
                    Retirer photo perso
                  </button>
                ) : null}
              </div>
            ) : null}
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
          </article>

          <section className="related-section profile-top5-section">
            <div className="group-title">
              <h2>{copy.topEventsTitle}</h2>
              <span>{topEventsData.events?.length || 0}</span>
            </div>
            {topEventsData.rankingList ? (
              <RankingCard
                list={topEventsData.rankingList}
                showOwner={false}
                maxPreview={5}
                className="profile-top5-ranking-card"
              />
            ) : (
              <article className="entity-card">
                <p className="event-meta">Aucun top event disponible pour ce profil.</p>
              </article>
            )}
          </section>

          <section className="related-section profile-info-section">
            <div className="group-title">
              <h2>{copy.infoTitle}</h2>
              <span>{profileDetails.city || "Profil"}</span>
            </div>
            <article className="entity-card">
              <div className="profile-info-grid">
                <p><strong>Age</strong> <span>{profileDetails.age || "Non renseigne"}</span></p>
                <p><strong>Ville</strong> <span>{profileDetails.city || "Non renseignee"}</span></p>
                <p><strong>Bio</strong> <span>{profileDetails.bioLong || "Aucune bio detaillee."}</span></p>
                <p><strong>Equipe favorite</strong> <span>{profileDetails.favoriteTeam || "Non renseignee"}</span></p>
                <p><strong>Athlete favori</strong> <span>{profileDetails.favoriteAthlete || "Non renseigne"}</span></p>
                <p><strong>Citation</strong> <span>{profileDetails.quote || "Aucune citation."}</span></p>
              </div>

              {isOwnProfile && isEditingDetails ? (
                <form className="profile-edit-inline" onSubmit={handleSaveDetails}>
                  <div className="profile-edit-grid">
                    <label className="select-wrap">
                      <span>Age</span>
                      <input name="age" type="text" value={detailsDraft.age} onChange={handleDetailsDraftChange} />
                    </label>
                    <label className="select-wrap">
                      <span>Ville</span>
                      <input name="city" type="text" value={detailsDraft.city} onChange={handleDetailsDraftChange} />
                    </label>
                    <label className="select-wrap profile-edit-wide">
                      <span>Bio</span>
                      <textarea name="bioLong" rows={3} value={detailsDraft.bioLong} onChange={handleDetailsDraftChange} />
                    </label>
                    <label className="select-wrap">
                      <span>Equipe favorite</span>
                      <input name="favoriteTeam" type="text" value={detailsDraft.favoriteTeam} onChange={handleDetailsDraftChange} />
                    </label>
                    <label className="select-wrap">
                      <span>Athlete favori</span>
                      <input name="favoriteAthlete" type="text" value={detailsDraft.favoriteAthlete} onChange={handleDetailsDraftChange} />
                    </label>
                    <label className="select-wrap profile-edit-wide">
                      <span>Citation</span>
                      <input name="quote" type="text" value={detailsDraft.quote} onChange={handleDetailsDraftChange} />
                    </label>
                  </div>
                  <div className="profile-edit-actions">
                    <button type="submit" className="filter-btn is-active">Enregistrer</button>
                    <button type="button" className="filter-btn" onClick={handleCancelEditDetails}>Annuler</button>
                  </div>
                </form>
              ) : null}
            </article>
          </section>
        </div>

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
    </section>
  );
}

export default UserProfileLayout;
