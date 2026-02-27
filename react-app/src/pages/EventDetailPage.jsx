import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import HorizontalCardRail from "../components/HorizontalCardRail";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import ObjectTagsWidget from "../components/ObjectTagsWidget";
import ScoreBadge from "../components/ScoreBadge";
import ScoreSliderField from "../components/ScoreSliderField";
import { getEventById, getRelatedEvents } from "../services/eventsService";
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

function normalizeScore(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function EventDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { eventId } = useParams();
  const event = getEventById(eventId);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (!event) return;
    setUserRating(normalizeScore(getEventRating(event.id)));
  }, [event?.id]);

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

  function handleChangeUserRating(nextValue) {
    const normalized = normalizeScore(nextValue);
    const saved = setEventRating(event.id, normalized);
    setUserRating(normalizeScore(saved));
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
            <ScoreSliderField
              id="event-user-rating"
              label="Noter cet evenement (0-100)"
              value={userRating}
              onChange={handleChangeUserRating}
              className="event-rating-slider"
            />
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

      <ObjectFeedScopePanel
        targetType="event"
        targetId={event.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        title="Commentaires de l'evenement"
        subtitle="Flux commentaires uniquement · tri Chrono ou Populaires."
        contentProfile="comments-only"
        showComposer
        emptyStateText="Aucun commentaire pour cet evenement."
      />

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements similaires</h2>
          <span>{relatedEvents.length} suggestions</span>
        </div>
        <HorizontalCardRail label="Evenements similaires" itemType="event">
          {relatedEvents.map((item) => (
            <EventCard
              key={item.id}
              event={item}
              isInWatchlist={watchlistIds.includes(item.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </HorizontalCardRail>
      </section>
    </section>
  );
}

export default EventDetailPage;
