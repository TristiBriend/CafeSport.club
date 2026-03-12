import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import ConfirmDialog from "./ConfirmDialog";
import FriendnotesModal from "./FriendnotesModal";
import ImageCropModal from "./ImageCropModal";
import ObjectTagsWidget from "./ObjectTagsWidget";
import ScoreBadge from "./ScoreBadge";
import { buildAddWatchlistFabButton } from "./WatchlistFabButton";
import { getAthletesForEvent, getTeamsForEvent } from "../services/catalogService";
import {
  createCommentReply,
  deleteComment,
  deleteCommentReply,
  getEventComments,
  toggleCommentLike,
  toggleReplyLike,
  updateComment,
  updateCommentReply,
} from "../services/commentsService";
import { getLeagueById } from "../services/leaguesService";
import { getEventRating, isUpcomingEvent } from "../services/ratingsService";
import { useAuth } from "../contexts/AuthContext";
import {
  canUploadCatalogImageToCloud,
  uploadEventImageFile,
} from "../services/catalogImageStorageService";
import {
  deleteCatalogObject,
  getDeleteDependencies,
} from "../services/adminCatalogModerationService";
import { toggleEventLegendary } from "../services/eventLegendaryAdminService";

function getEventImage(event) {
  const image = String(event?.image || "").trim();
  if (!image) return "";
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:") || image.startsWith("blob:")) {
    return image;
  }
  return image.startsWith("/") ? image : `/${image}`;
}

function IconMore() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5.2" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="18.8" cy="12" r="1.8" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7.5h2l1.2-1.8h3.6L15 7.5h2A2.5 2.5 0 0 1 19.5 10v7A2.5 2.5 0 0 1 17 19.5H7A2.5 2.5 0 0 1 4.5 17v-7A2.5 2.5 0 0 1 7 7.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="13.2" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function getImagePath(value) {
  const image = String(value || "").trim();
  if (!image) return "";
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:") || image.startsWith("blob:")) {
    return image;
  }
  return image.startsWith("/") ? image : `/${image}`;
}

function getInitials(name) {
  const source = String(name || "").trim();
  if (!source) return "?";
  const [first = "", second = ""] = source.split(/\s+/);
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase() || "?";
}

function getStatusClass(event) {
  return isUpcomingEvent(event) ? "is-upcoming" : "is-past";
}

function getUpcomingLabel(event) {
  const timestamp = Date.parse(String(event?.dateISO || ""));
  if (!Number.isFinite(timestamp)) return "A venir";
  const delta = timestamp - Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.ceil(delta / dayMs);
  if (days <= 0) return "Aujourd'hui";
  if (days === 1) return "Dans 1 jour";
  return `Dans ${days} jours`;
}

function toPercentScore(value) {
  const raw = Number(value || 0);
  if (!Number.isFinite(raw)) return 0;
  const scaled = raw <= 10 ? raw * 10 : raw;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

const EVENT_CARD_SIZES = new Set(["large", "medium", "small", "miniature"]);
const CARD_CROP_ASPECT_FALLBACK = 1 / 1.4;
const ATHLETE_PREVIEW_MAX_BY_SIZE = {
  large: 6,
  medium: 5,
  small: 4,
  miniature: 3,
};

function normalizeEventCardSize(size) {
  const raw = String(size || "").trim().toLowerCase();
  if (!raw || raw === "default") return "medium";
  if (raw === "compact") return "small";
  if (EVENT_CARD_SIZES.has(raw)) return raw;
  return "medium";
}

function toSportSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildEventFeedPath(eventId) {
  const safeId = String(eventId || "").trim();
  if (!safeId) return "/feed";
  const params = new URLSearchParams({
    scope: "object",
    mode: "recent",
    targetType: "event",
    targetId: safeId,
  });
  return `/feed?${params.toString()}`;
}

function formatRibbonCityTag(locationValue) {
  const rawLocation = String(locationValue || "").trim();
  if (!rawLocation) return "";
  const citySource = rawLocation.split(",")[0]?.trim() || rawLocation;
  const compactCity = citySource.replace(/\s+/g, "");
  if (!compactCity) return "";
  return `@${compactCity}`;
}

function EventCard({
  event,
  isInWatchlist = false,
  onToggleWatchlist = null,
  size = "default",
  variant = "default",
  note = "",
  showTags = true,
  showComment = true,
}) {
  const { isAdmin, currentUser } = useAuth();
  const [commentVersion, setCommentVersion] = useState(0);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isFriendnotesOpen, setIsFriendnotesOpen] = useState(false);
  const [isAdminDeleting, setIsAdminDeleting] = useState(false);
  const [isLegendaryBusy, setIsLegendaryBusy] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState("");
  const [photoOverrideUrl, setPhotoOverrideUrl] = useState("");
  const [cropSourceFile, setCropSourceFile] = useState(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [cropAspect, setCropAspect] = useState(CARD_CROP_ASPECT_FALLBACK);
  const moreMenuRef = useRef(null);
  const photoInputRef = useRef(null);
  const mediaRef = useRef(null);
  const normalizedSize = normalizeEventCardSize(size);
  const normalizedVariant = String(variant || "default").trim().toLowerCase();
  const isOldVariant = normalizedVariant === "_old";
  const isAlterVariant = !isOldVariant;
  const resolvedVariant = isOldVariant ? "_old" : "_alter";
  const isCompact = normalizedSize === "small";
  const isLegendary = Boolean(event?.legendary);
  const statusClass = getStatusClass(event);
  const isFuture = statusClass === "is-upcoming";
  const communityPercent = toPercentScore(event?.communityScore);
  const userScore = getEventRating(event?.id);
  const league = getLeagueById(event?.competitionId);
  const teams = getTeamsForEvent(event?.id);
  const eventAthletes = getAthletesForEvent(event?.id);
  const maxMiniatures = ATHLETE_PREVIEW_MAX_BY_SIZE[normalizedSize] ?? 5;
  const visibleAthletes = eventAthletes.slice(0, maxMiniatures);
  const remainingCount = Math.max(0, eventAthletes.length - visibleAthletes.length);
  const eventComments = useMemo(
    () => getEventComments(event?.id),
    [event?.id, commentVersion],
  );
  const topComment = eventComments[0];
  const baseWatchlistCount = Number(event?.watchlistCount || 0);
  const watchlistCount = Math.max(0, baseWatchlistCount + (isInWatchlist ? 1 : 0));
  const eventImage = photoOverrideUrl || getEventImage(event);
  const canAdminEditPhoto = Boolean(
    isAdmin
      && currentUser?.firebaseUid
      && canUploadCatalogImageToCloud()
      && String(event?.id || "").trim(),
  );
  const displayNote = String(note || "").trim();
  const shouldRenderCommentAddon = showComment && Boolean(topComment);
  const eventTitle = String(event?.title || "cet evenement").trim() || "cet evenement";
  const canToggleWatchlist = typeof onToggleWatchlist === "function";
  const sportSlug = toSportSlug(event?.sport);
  const sportPath = sportSlug ? `/sports/${sportSlug}` : "";
  const sportActionLabel = String(event?.sport || "").trim()
    ? `Aller a ${String(event.sport).trim()}`
    : "";
  const leaguePath = league?.id ? `/league/${league.id}` : "";
  const leagueActionLabel = league?.title ? `Aller a ${league.title}` : "";
  const teamOne = teams[0] || null;
  const teamTwo = teams[1] || null;
  const teamOneLabel = teamOne?.id
    ? `Aller a ${String(teamOne.nameFull || teamOne.name || "").trim() || "Team 1"}`
    : "";
  const teamTwoLabel = teamTwo?.id
    ? `Aller a ${String(teamTwo.nameFull || teamTwo.name || "").trim() || "Team 2"}`
    : "";
  const feedPath = buildEventFeedPath(event?.id);
  const followActionLabel = isInWatchlist
    ? `Ne plus suivre ${eventTitle}`
    : `Suivre ${eventTitle}`;
  const seasonTokenRaw = String(event?.seasonKey || "").trim();
  const seasonToken = seasonTokenRaw && seasonTokenRaw.toLowerCase() !== "na" ? seasonTokenRaw : "";
  const ribbonLeagueLabel = String(league?.title || event?.league || "").trim();
  const ribbonCityTag = formatRibbonCityTag(event?.location);
  const ribbonMetaLabel = [ribbonLeagueLabel, seasonToken, ribbonCityTag].filter(Boolean).join(" · ");
  const resultLabel = String(event?.result || "").trim();
  const ribbonDateLabel = String(event?.date || "").trim();
  const hasSportChip = Boolean(String(event?.sport || "").trim());
  const participantsContent = visibleAthletes.length ? (
    <div className="overlay-participants">
      <div className="event-player-miniatures" aria-label={`Participants (${eventAthletes.length})`}>
        {visibleAthletes.map((athlete) => {
          const athleteName = String(athlete?.name || "Athlete").trim() || "Athlete";
          const athleteImage = getImagePath(athlete?.image);
          return (
            <Link
              key={athlete.id}
              className="player-miniature"
              to={`/athlete/${athlete.id}`}
              aria-label={`Voir ${athleteName}`}
              title={athleteName}
            >
              <span className="player-miniature-avatar">
                {athleteImage ? (
                  <img src={athleteImage} alt={athleteName} loading="lazy" />
                ) : (
                  <span>{getInitials(athleteName)}</span>
                )}
              </span>
            </Link>
          );
        })}
        {remainingCount > 0 ? (
          <span
            className="player-miniature player-miniature-overflow"
            aria-label={`${remainingCount} autres participants`}
            title={`+${remainingCount} autres participants`}
          >
            <span className="player-miniature-avatar">+{remainingCount}</span>
          </span>
        ) : null}
      </div>
    </div>
  ) : null;
  const descriptionContent = (
    <div className="ui-event-description">
      <p className="ui-event-description-line ui-event-description-line-meta ui-event-description-line-league typo-label">
        {league ? (
          <Link className="ui-event-description-inline-link" to={`/league/${league.id}`}>
            {league.title}
          </Link>
        ) : event.league}
      </p>
      <p className="ui-event-description-line ui-event-description-line-title typo-body-strong">
        <span className="ui-event-description-line-name">
          {teams.length ? (
            <>
              {teams.map((team, index) => (
                <span key={team.id}>
                  {index > 0 ? <span className="ui-event-description-sep">vs</span> : null}
                  <Link className="ui-event-description-inline-link" to={`/team/${team.id}`}>
                    {team.name}
                  </Link>
                </span>
              ))}
              {event.result ? (
                <>
                  <span className="ui-event-description-sep">:</span>
                  <span className="ui-event-description-result">{event.result}</span>
                </>
              ) : null}
            </>
          ) : (
            <>
              <Link className="event-title-link" to={`/event/${event.id}`}>
                {event.title}
              </Link>
              {event.result ? (
                <>
                  <span className="ui-event-description-sep">:</span>
                  <span className="ui-event-description-result">{event.result}</span>
                </>
              ) : null}
            </>
          )}
        </span>
      </p>
      <p className="ui-event-description-line ui-event-description-line-meta ui-event-description-line-datetime typo-meta">
        {event.date} <span className="ui-event-description-sep">·</span> {event.location}
      </p>
    </div>
  );
  const alterRibbonContent = (
    <div className="event-alter-ribbon" aria-label={`Informations principales ${eventTitle}`}>
      <div className="event-alter-ribbon-inner">
        <p className="event-alter-ribbon-title">{eventTitle}</p>
        {(ribbonMetaLabel || resultLabel) ? (
          <p className="event-alter-ribbon-meta">
            {ribbonMetaLabel}
            {resultLabel ? (
              <>
                {ribbonMetaLabel ? <span className="event-alter-ribbon-sep">·</span> : null}
                <span className="event-alter-ribbon-result">{resultLabel}</span>
              </>
            ) : null}
          </p>
        ) : null}
        {ribbonDateLabel ? (
          <p className="event-alter-ribbon-submeta">{ribbonDateLabel}</p>
        ) : null}
      </div>
    </div>
  );
  const tagsContent = isLegendary || showTags ? (
    <div className="object-tags-inline event-card-tags-row">
      {isLegendary ? (
        <span
          className="object-tag-chip event-tag-chip-legendary"
          title="Evenement legendaire"
        >
          Legendaire
        </span>
      ) : null}
      {showTags ? (
        <ObjectTagsWidget objectType="event" objectId={event.id} title="Tags" compact />
      ) : null}
    </div>
  ) : null;

  useEffect(() => {
    if (!isMoreMenuOpen) return undefined;
    function handlePointerDown(pointerEvent) {
      if (!moreMenuRef.current?.contains(pointerEvent.target)) {
        setIsMoreMenuOpen(false);
      }
    }
    function handleEscape(keyEvent) {
      if (keyEvent.key === "Escape") {
        setIsMoreMenuOpen(false);
      }
    }
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMoreMenuOpen]);

  useEffect(() => {
    setPhotoOverrideUrl("");
    setPhotoUploadError("");
    setCropSourceFile(null);
    setIsCropOpen(false);
  }, [event?.id, event?.image]);

  useEffect(() => {
    const mediaElement = mediaRef.current;
    if (!mediaElement) return undefined;

    function updateCropAspect() {
      const rect = mediaElement.getBoundingClientRect();
      const width = Number(rect.width || 0);
      const height = Number(rect.height || 0);
      if (width <= 0 || height <= 0) return;
      const nextAspect = width / height;
      if (!Number.isFinite(nextAspect) || nextAspect <= 0) return;
      setCropAspect(nextAspect);
    }

    updateCropAspect();
    const observer = new ResizeObserver(updateCropAspect);
    observer.observe(mediaElement);
    return () => observer.disconnect();
  }, [normalizedSize, isMoreMenuOpen, showTags]);

  function refreshComments() {
    setCommentVersion((value) => value + 1);
  }

  function handleToggleCommentLike(comment) {
    toggleCommentLike(comment);
    refreshComments();
  }

  function handleCreateReply(comment, noteValue, mentions = []) {
    const created = createCommentReply(comment?.id, { note: noteValue, mentions });
    if (!created) return null;
    refreshComments();
    return created;
  }

  function handleToggleReplyLike(_comment, reply) {
    toggleReplyLike(reply);
    refreshComments();
  }

  function handleUpdateComment(comment, payload) {
    const updated = updateComment(comment?.id, payload);
    if (updated) refreshComments();
    return updated;
  }

  function handleDeleteComment(comment) {
    const deleted = deleteComment(comment?.id);
    if (deleted) refreshComments();
    return deleted;
  }

  function handleUpdateReply(comment, reply, noteValue) {
    const updated = updateCommentReply(comment?.id, reply?.id, { note: noteValue });
    if (updated) refreshComments();
    return updated;
  }

  function handleDeleteReply(comment, reply) {
    const deleted = deleteCommentReply(comment?.id, reply?.id);
    if (deleted) refreshComments();
    return deleted;
  }

  function handleToggleMoreMenu() {
    setIsMoreMenuOpen((value) => !value);
  }

  function handleOpenFriendnotes() {
    setIsMoreMenuOpen(false);
    setIsFriendnotesOpen(true);
  }

  function handlePickPhoto() {
    if (!canAdminEditPhoto || isUploadingPhoto) return;
    photoInputRef.current?.click();
  }

  async function handlePhotoChange(changeEvent) {
    const file = changeEvent.target.files?.[0];
    changeEvent.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoUploadError("Selectionne une image valide.");
      return;
    }
    if (file.size > 2_500_000) {
      setPhotoUploadError("Image trop lourde (max 2.5 MB).");
      return;
    }

    setPhotoUploadError("");
    setCropSourceFile(file);
    setIsCropOpen(true);
  }

  function handleCloseCropModal() {
    if (isUploadingPhoto) return;
    setIsCropOpen(false);
    setCropSourceFile(null);
  }

  async function handleConfirmCroppedPhoto(croppedFile) {
    if (!croppedFile) return;
    setIsUploadingPhoto(true);
    try {
      const { url } = await uploadEventImageFile(currentUser.firebaseUid, event.id, croppedFile);
      setPhotoOverrideUrl(url);
      setPhotoUploadError("");
      setIsCropOpen(false);
      setCropSourceFile(null);
    } catch {
      setPhotoUploadError("Upload impossible pour le moment.");
    } finally {
      setIsUploadingPhoto(false);
    }
  }

  function handleToggleFollowFromMenu() {
    if (!canToggleWatchlist) return;
    onToggleWatchlist(event.id);
    setIsMoreMenuOpen(false);
  }

  async function handleAdminDeleteFromMenu() {
    if (!isAdmin || isAdminDeleting) return;
    const deps = await getDeleteDependencies({ type: "event", id: event?.id });
    if (deps.blocked) {
      const detail = deps.dependencies
        .map((item) => `- ${item.label}: ${item.count}`)
        .join("\n");
      window.alert(`Suppression bloquee pour ${eventTitle}.\nDependances detectees:\n${detail}`);
      setIsMoreMenuOpen(false);
      return;
    }

    setIsDeleteConfirmOpen(true);
    setIsMoreMenuOpen(false);
  }

  async function handleToggleLegendaryFromMenu() {
    if (!isAdmin || isLegendaryBusy) return;
    setIsLegendaryBusy(true);
    try {
      const result = await toggleEventLegendary(event?.id, !isLegendary, {
        firebaseUid: currentUser?.firebaseUid,
      });
      if (!result?.ok) {
        window.alert("Mise a jour impossible pour le moment.");
      }
    } catch {
      window.alert("Mise a jour impossible pour le moment.");
    } finally {
      setIsLegendaryBusy(false);
      setIsMoreMenuOpen(false);
    }
  }

  async function handleConfirmAdminDelete() {
    if (isAdminDeleting) return;
    setIsAdminDeleting(true);
    try {
      const result = await deleteCatalogObject({
        type: "event",
        id: event?.id,
      });
      if (!result?.ok && result?.reason === "blocked_by_dependencies") {
        const detail = (result?.dependencies?.dependencies || [])
          .map((item) => `- ${item.label}: ${item.count}`)
          .join("\n");
        window.alert(`Suppression bloquee.\n${detail}`);
      } else if (!result?.ok) {
        window.alert("Suppression impossible pour le moment.");
      }
    } catch {
      window.alert("Erreur pendant la suppression.");
    } finally {
      setIsAdminDeleting(false);
      setIsDeleteConfirmOpen(false);
    }
  }

  return (
    <div
      className={`event-card-shell ${isCompact ? "compact" : ""} ${statusClass} ${isLegendary ? "is-legendary" : ""} ${isMoreMenuOpen ? "is-more-open" : ""} ${resolvedVariant}`.trim()}
      data-size={normalizedSize}
      data-variant={resolvedVariant}
    >
      <article
        className={`event-card ${isCompact ? "compact" : ""} ${statusClass} ${isLegendary ? "is-legendary" : ""} ${isMoreMenuOpen ? "is-more-open" : ""} ${resolvedVariant}`.trim()}
        data-event-id={event.id}
        data-variant={resolvedVariant}
      >
        <div
          className="event-corner-meta"
          aria-label={
            isFuture
              ? "Evenement a venir"
              : `Score communaute ${communityPercent}`
          }
        >
          {isFuture ? (
            <span className="event-corner-leading">
              <span className="event-corner-upcoming-text">{getUpcomingLabel(event)}</span>
              {isAlterVariant && hasSportChip ? (
                <span className="event-corner-chip event-corner-chip-sport event-alter-top-sport-chip" title={event.sport}>
                  {event.sport}
                </span>
              ) : null}
            </span>
          ) : (
            <span className="event-corner-leading">
              <ScoreBadge variant="community-chip" value={communityPercent} scale="percent" />
              {isAlterVariant && hasSportChip ? (
                <span className="event-corner-chip event-corner-chip-sport event-alter-top-sport-chip" title={event.sport}>
                  {event.sport}
                </span>
              ) : null}
            </span>
          )}
          <span className="event-corner-trailing">
            {!isFuture ? <ScoreBadge variant="user-chip" value={userScore} scale="percent" /> : null}
            {typeof onToggleWatchlist === "function" ? (
              buildAddWatchlistFabButton({
                eventId: event.id,
                isSaved: isInWatchlist,
                watchlistCount,
                className: "event-card-watchlist-fab-wrap",
                buttonClassName: "event-card-watchlist-fab",
                countClassName: "event-card-watchlist-fab-count",
                onToggle: () => onToggleWatchlist(event.id),
              })
            ) : null}
            <div className="event-card-more-menu" ref={moreMenuRef}>
              <button
                className="event-card-more-btn"
                type="button"
                aria-label="Options de la carte evenement"
                aria-haspopup="menu"
                aria-expanded={isMoreMenuOpen}
                onClick={handleToggleMoreMenu}
              >
                <IconMore />
              </button>
              {isMoreMenuOpen ? (
                <div className="event-card-more-popover" role="menu" aria-label="Actions evenement">
                  <button
                    type="button"
                    className="event-card-more-action"
                    role="menuitem"
                    onClick={handleToggleFollowFromMenu}
                    disabled={!canToggleWatchlist}
                  >
                    {followActionLabel}
                  </button>
                  <Link
                    to={feedPath}
                    className="event-card-more-action"
                    role="menuitem"
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    Voir le feed
                  </Link>
                  {!isFuture ? (
                    <button
                      type="button"
                      className="event-card-more-action"
                      role="menuitem"
                      onClick={handleOpenFriendnotes}
                    >
                      Note de mes amis
                    </button>
                  ) : null}
                  {teamOne?.id ? (
                    <Link
                      to={`/team/${teamOne.id}`}
                      className="event-card-more-action"
                      role="menuitem"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      {teamOneLabel}
                    </Link>
                  ) : null}
                  {teamTwo?.id ? (
                    <Link
                      to={`/team/${teamTwo.id}`}
                      className="event-card-more-action"
                      role="menuitem"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      {teamTwoLabel}
                    </Link>
                  ) : null}
                  {leaguePath ? (
                    <Link
                      to={leaguePath}
                      className="event-card-more-action"
                      role="menuitem"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      {leagueActionLabel}
                    </Link>
                  ) : null}
                  {sportPath && sportActionLabel ? (
                    <Link
                      to={sportPath}
                      className="event-card-more-action"
                      role="menuitem"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      {sportActionLabel}
                    </Link>
                  ) : null}
                  {isAdmin ? (
                    <button
                      type="button"
                      className="event-card-more-action"
                      role="menuitem"
                      onClick={handleToggleLegendaryFromMenu}
                      disabled={isLegendaryBusy}
                    >
                      {isLegendaryBusy
                        ? "Mise a jour..."
                        : (isLegendary ? "Desactiver legendaire" : "Activer legendaire")}
                    </button>
                  ) : null}
                  {isAdmin ? (
                    <button
                      type="button"
                      className="event-card-more-action is-danger"
                      role="menuitem"
                      onClick={handleAdminDeleteFromMenu}
                      disabled={isAdminDeleting}
                    >
                      {isAdminDeleting ? "Suppression..." : "Supprimer de la base"}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </span>
        </div>

        <div className="event-card-body">
          <div className="event-main">
            <div className="event-media" ref={mediaRef}>
              <input
                ref={photoInputRef}
                className="catalog-photo-upload-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              {canAdminEditPhoto ? (
                <button
                  type="button"
                  className="profile-photo-upload-icon-btn event-card-photo-upload-icon-btn"
                  onClick={handlePickPhoto}
                  disabled={isUploadingPhoto}
                  aria-label={isUploadingPhoto ? "Upload en cours" : "Modifier la photo event"}
                  title={isUploadingPhoto ? "Upload en cours..." : "Modifier la photo"}
                >
                  <CameraIcon />
                </button>
              ) : null}
              {photoUploadError ? <p className="catalog-photo-upload-error">{photoUploadError}</p> : null}
              {eventImage ? <img src={eventImage} alt={event.title} /> : null}
              {isAlterVariant ? alterRibbonContent : null}
              {!isAlterVariant ? (
                <div className={`event-media-overlay ${isCompact ? "compact" : ""}`}>
                  {hasSportChip ? (
                    <span className="event-overlay-sport-chip event-corner-chip event-corner-chip-sport" title={event.sport}>
                      {event.sport}
                    </span>
                  ) : null}
                  {participantsContent}
                  <div className="overlay-description">
                    {descriptionContent}
                  </div>
                  {tagsContent}
                </div>
              ) : null}
            </div>
            {isAlterVariant ? (
              <div className={`event-alter-body ${isCompact ? "compact" : ""}`.trim()}>
                {participantsContent ? (
                  <div className="event-alter-meta-row">
                    {participantsContent}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </article>

      {shouldRenderCommentAddon ? (
        <aside className={`event-card-comment-addon ${isCompact ? "compact" : ""}`}>
          {displayNote ? <p className="comment-meta event-card-comment-context typo-meta">{displayNote}</p> : null}
          <CommentCard
            comment={topComment}
            onToggleLike={handleToggleCommentLike}
            showEventLink={false}
            onCreateReply={handleCreateReply}
            onToggleReplyLike={handleToggleReplyLike}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            onUpdateReply={handleUpdateReply}
            onDeleteReply={handleDeleteReply}
          />
        </aside>
      ) : null}
      <FriendnotesModal
        open={isFriendnotesOpen}
        eventId={event?.id || null}
        eventTitle={eventTitle}
        onClose={() => setIsFriendnotesOpen(false)}
      />
      <ImageCropModal
        open={isCropOpen}
        file={cropSourceFile}
        aspect={cropAspect || CARD_CROP_ASPECT_FALLBACK}
        previewVariant="event"
        title="Recadrer la photo de l evenement"
        isBusy={isUploadingPhoto}
        onCancel={handleCloseCropModal}
        onConfirm={handleConfirmCroppedPhoto}
      />
      <ConfirmDialog
        open={isDeleteConfirmOpen}
        title="Supprimer cet evenement ?"
        message={`Supprimer definitivement ${eventTitle} de la base ? Cette action est irreversible.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        tone="danger"
        isBusy={isAdminDeleting}
        onConfirm={handleConfirmAdminDelete}
        onCancel={() => setIsDeleteConfirmOpen(false)}
      />
    </div>
  );
}

export default EventCard;
