import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import HorizontalCardRail from "../components/HorizontalCardRail";
import LeagueCard from "../components/LeagueCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import { getLeagueById } from "../services/leaguesService";
import {
  getExpectedEventsForObject,
  getTopRatedEventsForObject,
} from "../services/objectEventSectionsService";

function LeagueDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { leagueId } = useParams();
  const league = getLeagueById(leagueId);

  if (!league) {
    return (
      <section className="simple-page">
        <h1>Ligue introuvable</h1>
        <Link className="btn btn-ghost" to="/leagues">
          Retour leagues
        </Link>
      </section>
    );
  }

  const expectedEvents = getExpectedEventsForObject("league", league.id, 6);
  const topRatedEvents = getTopRatedEventsForObject("league", league.id, 6);

  return (
    <section className="object-detail-page">
      <div className="object-detail-top-left">
        <LeagueCard league={league} variant="detail" size="large" />
      </div>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les plus attendus</h2>
          <span>{expectedEvents.length}</span>
        </div>
        {expectedEvents.length ? (
          <HorizontalCardRail label="Evenements ligue attendus" itemType="event">
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
            <p className="event-meta">Aucun evenement a venir pour cette ligue.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les mieux notes</h2>
          <span>{topRatedEvents.length}</span>
        </div>
        {topRatedEvents.length ? (
          <HorizontalCardRail label="Evenements ligue mieux notes" itemType="event">
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
            <p className="event-meta">Aucun evenement note pour cette ligue.</p>
          </article>
        )}
      </section>

      <ObjectFeedScopePanel
        targetType="league"
        targetId={league.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        title="Feed relie a la card"
        subtitle="Flux ligue complet: commentaires, events et objets lies."
      />
    </section>
  );
}

export default LeagueDetailPage;
