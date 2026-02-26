import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard";
import EventCard from "../components/EventCard";
import ObjectTagsWidget from "../components/ObjectTagsWidget";
import ScoreBadge from "../components/ScoreBadge";
import { getEventById, getRelatedEvents } from "../services/eventsService";
import {
  COMMENT_MODE,
  createCommentReply,
  createEventComment,
  deleteCommentReply,
  deleteEventComment,
  filterCommentsByMode,
  getEventComments,
  toggleReplyLike,
  toggleCommentLike,
  updateCommentReply,
  updateEventComment,
} from "../services/commentsService";
import {
  deleteEventRating,
  getEventRating,
  isUpcomingEvent,
  setEventRating,
} from "../services/ratingsService";

function formatDateLabel(event) {
  const date = Date.parse(event?.dateISO || "");
  if (!Number.isFinite(date)) return event?.date || "Date non renseignee";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function EventDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { eventId } = useParams();
  const event = getEventById(eventId);
  const [comments, setComments] = useState([]);
  const [activeMode, setActiveMode] = useState(COMMENT_MODE.ALL);
  const [composerMode, setComposerMode] = useState(COMMENT_MODE.COMMENT);
  const [composerRating, setComposerRating] = useState(80);
  const [composerText, setComposerText] = useState("");
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (!event) return;
    setComments(getEventComments(event.id));
    const defaultMode = String(event.status || "").toLowerCase() === "passe"
      ? COMMENT_MODE.REVIEW
      : COMMENT_MODE.COMMENT;
    setComposerMode(defaultMode);
    setComposerRating(Math.max(0, Math.min(100, Math.round(Number(event.communityScore || 80)))));
    setComposerText("");
    setActiveMode(COMMENT_MODE.ALL);
    setUserRating(getEventRating(event.id));
  }, [event?.id]);

  const visibleComments = useMemo(
    () => filterCommentsByMode(comments, activeMode),
    [activeMode, comments],
  );

  if (!event) {
    return (
      <section className="simple-page">
        <h1>Evenement introuvable</h1>
        <p>Impossible de trouver cet evenement dans le dataset React.</p>
        <Link className="btn btn-ghost" to="/discover">
          Retour a Decouvrir
        </Link>
      </section>
    );
  }

  const isInWatchlist = watchlistIds.includes(event.id);
  const relatedEvents = getRelatedEvents(event, 6);
  const reviews = Number.isFinite(Number(event.reviews))
    ? Number(event.reviews).toLocaleString("fr-FR")
    : "0";
  const status = String(event.status || "").trim() || "A venir";
  const isFutureEvent = isUpcomingEvent(event);

  function refreshComments() {
    setComments(getEventComments(event.id));
  }

  function handleCreateComment(submitEvent) {
    submitEvent.preventDefault();
    const created = createEventComment(event.id, {
      mode: composerMode,
      note: composerText,
      rating: composerRating,
      author: "Vous",
    });
    if (!created) return;
    setComposerText("");
    refreshComments();
  }

  function handleLikeComment(comment) {
    toggleCommentLike(comment);
    refreshComments();
  }

  function handleLikeReply(_comment, reply) {
    toggleReplyLike(reply);
    refreshComments();
  }

  function handleReplyToComment(comment, note) {
    const created = createCommentReply(comment?.id, {
      note,
      author: "Vous",
    });
    if (!created) return null;
    refreshComments();
    return created;
  }

  function handleUpdateComment(comment, payload) {
    const updated = updateEventComment(comment?.id, payload);
    if (!updated) return false;
    refreshComments();
    return true;
  }

  function handleDeleteComment(comment) {
    const deleted = deleteEventComment(comment?.id);
    if (!deleted) return false;
    refreshComments();
    return true;
  }

  function handleUpdateReply(comment, reply, note) {
    const updated = updateCommentReply(comment?.id, reply?.id, { note });
    if (!updated) return false;
    refreshComments();
    return true;
  }

  function handleDeleteReply(comment, reply) {
    const deleted = deleteCommentReply(comment?.id, reply?.id);
    if (!deleted) return false;
    refreshComments();
    return true;
  }

  function handleChangeUserRating(nextValue) {
    const saved = setEventRating(event.id, nextValue);
    setUserRating(saved);
  }

  function handleClearUserRating() {
    deleteEventRating(event.id);
    setUserRating(0);
  }

  return (
    <section className="event-detail-page">
      <article className="event-detail-card">
        <div className="event-detail-head">
          <span className="event-chip">{event.sport}</span>
          <span className="event-status">{status}</span>
        </div>

        <h1>{event.title}</h1>
        <p className="event-detail-subtitle">{event.league}</p>

        <div className="event-detail-grid">
          <div>
            <span className="detail-label">Date</span>
            <strong>{formatDateLabel(event)}</strong>
          </div>
          <div>
            <span className="detail-label">Lieu</span>
            <strong>{event.location || "N/A"}</strong>
          </div>
          <div>
            <span className="detail-label">Note communaute</span>
            <strong>
              <ScoreBadge variant="community-chip" value={event.communityScore} scale="percent" />
            </strong>
          </div>
          <div>
            <span className="detail-label">Avis</span>
            <strong>{reviews}</strong>
          </div>
          {!isFutureEvent ? (
            <div>
              <span className="detail-label">Ma note</span>
              <strong>
                <ScoreBadge variant="user-chip" value={userRating} scale="percent" />
              </strong>
            </div>
          ) : null}
        </div>

        {event.result ? <p className="event-result">Resultat: {event.result}</p> : null}

        <ObjectTagsWidget
          objectType="event"
          objectId={event.id}
          title="Tags de l'evenement"
        />

        <div className="event-detail-actions">
          <button
            className={`watch-btn detail-watch-btn ${isInWatchlist ? "is-active" : ""}`}
            onClick={() => onToggleWatchlist(event.id)}
            type="button"
          >
            {isInWatchlist ? "Retirer de la watchlist" : "Ajouter a la watchlist"}
          </button>
          <Link className="btn btn-ghost" to="/watchlist">
            Ouvrir ma watchlist
          </Link>
          <Link
            className="btn btn-ghost"
            to={`/feed?scope=object&targetType=event&targetId=${encodeURIComponent(event.id)}&mode=recent`}
          >
            Ouvrir le feed event
          </Link>
        </div>

        {!isFutureEvent ? (
          <div className="event-personal-rating">
            <label className="select-wrap" htmlFor="event-user-rating">
              <span>Noter cet evenement (0-100)</span>
              <input
                id="event-user-rating"
                className="rating-input"
                type="range"
                min="0"
                max="100"
                step="1"
                value={userRating}
                onChange={(changeEvent) => handleChangeUserRating(changeEvent.target.value)}
              />
            </label>
            <button
              className="comment-like-btn"
              onClick={handleClearUserRating}
              type="button"
            >
              Reinitialiser
            </button>
          </div>
        ) : null}
      </article>

      <section className="comments-section">
        <div className="group-title">
          <h2>Reviews et commentaires</h2>
          <span>{visibleComments.length} elements</span>
        </div>

        <div className="comment-filter-row" role="tablist" aria-label="Filtrer les commentaires">
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.ALL ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.ALL)}
            type="button"
          >
            Tous
          </button>
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.REVIEW ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.REVIEW)}
            type="button"
          >
            Critiques
          </button>
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.COMMENT ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.COMMENT)}
            type="button"
          >
            Commentaires
          </button>
        </div>

        <form className="comment-composer" onSubmit={handleCreateComment}>
          <div className="comment-composer-top">
            <label className="select-wrap" htmlFor="comment-mode">
              <span>Type</span>
              <select
                id="comment-mode"
                value={composerMode}
                onChange={(changeEvent) => setComposerMode(changeEvent.target.value)}
              >
                <option value={COMMENT_MODE.COMMENT}>Commentaire</option>
                <option value={COMMENT_MODE.REVIEW}>Critique</option>
              </select>
            </label>

            {composerMode === COMMENT_MODE.REVIEW ? (
              <label className="select-wrap" htmlFor="comment-rating">
                <span>Note (0-100)</span>
                <input
                  id="comment-rating"
                  className="rating-input"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={composerRating}
                  onChange={(changeEvent) => setComposerRating(Number(changeEvent.target.value))}
                />
              </label>
            ) : null}
          </div>

          <label className="search-wrap" htmlFor="comment-text">
            <span>Ton message</span>
            <textarea
              id="comment-text"
              rows="3"
              maxLength={600}
              placeholder="Ajouter un avis sur cet evenement..."
              value={composerText}
              onChange={(changeEvent) => setComposerText(changeEvent.target.value)}
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Publier
          </button>
        </form>

        {visibleComments.length ? (
          <div className="comment-list">
            {visibleComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onToggleLike={handleLikeComment}
                onCreateReply={handleReplyToComment}
                onToggleReplyLike={handleLikeReply}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                onUpdateReply={handleUpdateReply}
                onDeleteReply={handleDeleteReply}
              />
            ))}
          </div>
        ) : (
          <div className="simple-page">
            <p>Aucun element pour ce filtre.</p>
          </div>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements similaires</h2>
          <span>{relatedEvents.length} suggestions</span>
        </div>
        <div className="event-grid">
          {relatedEvents.map((item) => (
            <EventCard
              key={item.id}
              event={item}
              isInWatchlist={watchlistIds.includes(item.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default EventDetailPage;
