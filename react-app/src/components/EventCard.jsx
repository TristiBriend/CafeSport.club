import { Link } from "react-router-dom";
import ObjectTagsWidget from "./ObjectTagsWidget";
import ScoreBadge from "./ScoreBadge";
import { buildAddWatchlistFabButton } from "./WatchlistFabButton";
import { getEventComments } from "../services/commentsService";
import { getEventRating, isUpcomingEvent } from "../services/ratingsService";

function getEventImage(event) {
  const image = String(event?.image || "").trim();
  if (!image) return "";
  return image.startsWith("/") ? image : `/${image}`;
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
  return Math.max(0, Math.min(100, Math.round(raw * 10)));
}

function EventCard({
  event,
  isInWatchlist = false,
  onToggleWatchlist = null,
  size = "default",
  note = "",
  showTags = true,
}) {
  const isCompact = size === "compact";
  const statusClass = getStatusClass(event);
  const isFuture = statusClass === "is-upcoming";
  const communityPercent = toPercentScore(event?.communityScore);
  const userScore = getEventRating(event?.id);
  const topComment = getEventComments(event?.id)
    .slice()
    .sort((a, b) => Number(b.totalLikes || 0) - Number(a.totalLikes || 0))[0];
  const baseWatchlistCount = Number(event?.watchlistCount || 0);
  const watchlistCount = Math.max(0, baseWatchlistCount + (isInWatchlist ? 1 : 0));
  const eventImage = getEventImage(event);
  const displayNote = String(note || "").trim();

  return (
    <article className={`event-card ${isCompact ? "compact" : ""} ${statusClass}`} data-event-id={event.id}>
      <div
        className="event-corner-meta"
        aria-label={`Sport ${event.sport}, score communaute ${communityPercent}`}
      >
        {isFuture ? (
          <span className="event-corner-leading">
            <span className="event-corner-upcoming-text">{getUpcomingLabel(event)}</span>
          </span>
        ) : (
          <span className="event-corner-leading">
            <ScoreBadge variant="user-chip" value={userScore} scale="percent" />
          </span>
        )}
        <span className="event-corner-trailing">
          <span className="event-corner-chip event-corner-chip-sport" title={event.sport}>{event.sport}</span>
          <ScoreBadge variant="community-chip" value={communityPercent} scale="percent" />
          {typeof onToggleWatchlist === "function" ? (
            buildAddWatchlistFabButton({
              eventId: event.id,
              isSaved: isInWatchlist,
              watchlistCount,
              onToggle: () => onToggleWatchlist(event.id),
            })
          ) : null}
        </span>
      </div>

      <div className="event-card-body">
        <div className="event-main">
          <div className="event-media">
            {eventImage ? <img src={eventImage} alt={event.title} /> : null}
            <div className={`event-media-overlay ${isCompact ? "compact" : ""}`}>
              <div className="overlay-description">
                <div className="ui-event-description">
                  <p className="ui-event-description-line">
                    <span className="ui-event-description-line-name">
                      <Link className="event-title-link" to={`/event/${event.id}`}>
                        {event.title}
                      </Link>
                    </span>
                  </p>
                  <p className="ui-event-description-line ui-event-description-line-meta">
                    {event.league} <span className="ui-event-description-sep">·</span> {event.date} <span className="ui-event-description-sep">·</span> {event.location}
                  </p>
                  {event.result ? (
                    <p className="ui-event-description-line">
                      Resultat <span className="ui-event-description-result">{event.result}</span>
                    </p>
                  ) : null}
                  <Link className="ui-event-description-link" to={`/event/${event.id}`}>
                    Voir l'evenement
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={`event-card-comment ${isCompact ? "compact" : ""}`}>
            {displayNote && topComment ? <div className="comment-preview-context">{displayNote}</div> : null}
            <div className="comment-preview compact">
              {topComment ? (
                <div className="comment-preview-list">
                  <article className="comment-preview-item">
                    <div className="comment-preview-item-head">
                      <span className="comment-preview-author">{topComment.author}</span>
                      <span className="comment-preview-sep">·</span>
                      <span className="comment-preview-like">{topComment.totalLikes || 0} likes</span>
                    </div>
                    <p className="comment-preview-text">{topComment.note}</p>
                  </article>
                </div>
              ) : (
                <>
                  {displayNote ? <div className="comment-preview-context">{displayNote}</div> : null}
                  <div className="comment-preview-empty">Aucun commentaire pour le moment.</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showTags ? (
        <div className="object-tags-inline">
          <ObjectTagsWidget objectType="event" objectId={event.id} title="Tags" compact />
        </div>
      ) : null}
    </article>
  );
}

export default EventCard;
