import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import TeamCard from "../components/TeamCard";
import {
  getTeamById,
} from "../services/catalogService";
import {
  getExpectedEventsForObject,
  getTopRatedEventsForObject,
} from "../services/objectEventSectionsService";

function TeamDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { teamId } = useParams();
  const team = getTeamById(teamId);

  if (!team) {
    return (
      <section className="simple-page">
        <h1>Team introuvable</h1>
        <Link className="btn btn-ghost" to="/teams">
          Retour teams
        </Link>
      </section>
    );
  }

  const expectedEvents = getExpectedEventsForObject("team", team.id, 6);
  const topRatedEvents = getTopRatedEventsForObject("team", team.id, 6);

  return (
    <section className="object-detail-page">
      <div className="object-detail-top-left">
        <TeamCard team={team} variant="detail" size="large" />
      </div>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les plus attendus</h2>
          <span>{expectedEvents.length}</span>
        </div>
        {expectedEvents.length ? (
          <div className="event-grid">
            {expectedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isInWatchlist={watchlistIds.includes(event.id)}
                onToggleWatchlist={onToggleWatchlist}
                showComment={false}
              />
            ))}
          </div>
        ) : (
          <article className="entity-card">
            <p className="event-meta">Aucun evenement a venir pour ce team.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les mieux notes</h2>
          <span>{topRatedEvents.length}</span>
        </div>
        {topRatedEvents.length ? (
          <div className="event-grid">
            {topRatedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isInWatchlist={watchlistIds.includes(event.id)}
                onToggleWatchlist={onToggleWatchlist}
                showComment={false}
              />
            ))}
          </div>
        ) : (
          <article className="entity-card">
            <p className="event-meta">Aucun evenement note pour ce team.</p>
          </article>
        )}
      </section>

      <ObjectFeedScopePanel
        targetType="team"
        targetId={team.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        title="Feed relie a la card"
        subtitle="Flux team complet: commentaires, events et objets lies."
      />
    </section>
  );
}

export default TeamDetailPage;
