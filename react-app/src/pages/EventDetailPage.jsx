import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import FriendnotesPanel from "../components/FriendnotesPanel";
import HorizontalCardRail from "../components/HorizontalCardRail";
import ObjectDetailHero from "../components/ObjectDetailHero";
import ObjectDetailInfoCard from "../components/ObjectDetailInfoCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import RankingCard from "../components/RankingCard";
import ScoreSliderField from "../components/ScoreSliderField";
import { getEventById, getRelatedEvents } from "../services/eventsService";
import { getCuratedLists, resolveListEntries } from "../services/catalogService";
import { buildEventDetailInfoItems } from "../services/objectDetailInfoService";
import {
  deleteEventRating,
  getEventRating,
  isUpcomingEvent,
  setEventRating,
} from "../services/ratingsService";

function normalizeScore(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function EventDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { eventId } = useParams();
  const event = getEventById(eventId);
  const safeEventId = String(event?.id || "").trim();
  const [userRating, setUserRating] = useState(0);
  const relatedRankings = useMemo(
    () => {
      if (!safeEventId) return [];
      return getCuratedLists({ sportFilter: "Tous", query: "" })
        .filter((list) => resolveListEntries(list).some((entry) => {
          if (entry.type === "event" && entry.event?.id) {
            return entry.event.id === safeEventId;
          }
          return String(entry?.eventId || "").trim() === safeEventId;
        }));
    },
    [safeEventId],
  );

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
  const isFutureEvent = isUpcomingEvent(event);
  const eventInfoItems = buildEventDetailInfoItems(event);

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
      <ObjectDetailHero
        card={(
          <EventCard
            event={event}
            isInWatchlist={isInWatchlist}
            onToggleWatchlist={onToggleWatchlist}
            size="large"
            showComment={false}
          />
        )}
        side={(
          <ObjectDetailInfoCard
            title="Infos evenement"
            items={eventInfoItems}
          />
        )}
      />

      {!isFutureEvent ? (
        <section className="related-section">
          <div className="group-title">
            <h2>Ma note</h2>
          </div>
          <article className="entity-card">
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
          </article>
        </section>
      ) : null}

      <section className="related-section">
        <div className="group-title">
          <h2>Classements qui contiennent cet evenement</h2>
        </div>
        {relatedRankings.length ? (
          <HorizontalCardRail
            label="Classements lies"
            itemType="ranking"
            mode="carousel"
            visibleDesktop={2.8}
            visibleTablet={1.9}
            visibleMobile={1.08}
            scrollStepItems={1}
            showArrows
          >
            {relatedRankings.map((list) => (
              <RankingCard
                key={list.id}
                list={list}
                maxPreview={4}
              />
            ))}
          </HorizontalCardRail>
        ) : (
          <article className="entity-card">
            <p className="event-meta">Aucun classement ne reference encore cet evenement.</p>
          </article>
        )}
      </section>

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

      {!isFutureEvent ? (
        <FriendnotesPanel
          eventId={event.id}
          title="Note de mes amis"
          className="event-detail-friendnotes"
        />
      ) : null}

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements similaires</h2>
        </div>
        <HorizontalCardRail
          label="Evenements similaires"
          itemType="event"
          mode="carousel"
          visibleDesktop={3.6}
          visibleTablet={2.3}
          visibleMobile={1.15}
          scrollStepItems={1}
          showArrows
        >
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
