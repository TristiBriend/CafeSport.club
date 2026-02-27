import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import HorizontalCardRail from "../components/HorizontalCardRail";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import PlayerCard from "../components/PlayerCard";
import {
  getAthleteById,
} from "../services/catalogService";
import {
  getExpectedEventsForObject,
  getTopRatedEventsForObject,
} from "../services/objectEventSectionsService";

function AthleteDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { athleteId } = useParams();
  const athlete = getAthleteById(athleteId);

  if (!athlete) {
    return (
      <section className="simple-page">
        <h1>Athlete introuvable</h1>
        <Link className="btn btn-ghost" to="/athletes">
          Retour athletes
        </Link>
      </section>
    );
  }

  const expectedEvents = getExpectedEventsForObject("athlete", athlete.id, 6);
  const topRatedEvents = getTopRatedEventsForObject("athlete", athlete.id, 6);

  return (
    <section className="object-detail-page">
      <div className="object-detail-top-left">
        <PlayerCard athlete={athlete} variant="detail" size="large" />
      </div>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les plus attendus</h2>
          <span>{expectedEvents.length}</span>
        </div>
        {expectedEvents.length ? (
          <HorizontalCardRail
            label="Evenements athlete attendus"
            itemType="event"
            mode="carousel"
            visibleDesktop={4}
            visibleTablet={2.3}
            visibleMobile={1.15}
            scrollStepItems={1}
            loop
            showArrows
          >
            {expectedEvents.map((event) => (
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
            <p className="event-meta">Aucun evenement a venir pour ce player.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les mieux notes</h2>
          <span>{topRatedEvents.length}</span>
        </div>
        {topRatedEvents.length ? (
          <HorizontalCardRail
            label="Evenements athlete mieux notes"
            itemType="event"
            mode="carousel"
            visibleDesktop={4}
            visibleTablet={2.3}
            visibleMobile={1.15}
            scrollStepItems={1}
            loop
            showArrows
          >
            {topRatedEvents.map((event) => (
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
            <p className="event-meta">Aucun evenement note pour ce player.</p>
          </article>
        )}
      </section>

      <ObjectFeedScopePanel
        targetType="athlete"
        targetId={athlete.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        title="Feed relie a la card"
        subtitle="Flux athlete complet: commentaires, events et objets lies."
      />
    </section>
  );
}

export default AthleteDetailPage;
