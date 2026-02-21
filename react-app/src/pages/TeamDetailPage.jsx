import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import ObjectSocialPanel from "../components/ObjectSocialPanel";
import {
  getAthletesForTeam,
  getEventsForTeam,
  getTeamById,
} from "../services/catalogService";

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

  const athletes = getAthletesForTeam(team.id);
  const events = getEventsForTeam(team.id);

  return (
    <section>
      <Link className="back-link" to="/teams">
        {"<- Retour teams"}
      </Link>

      <article className="event-detail-card">
        <div className="event-detail-head">
          <span className="event-chip">{team.sport}</span>
          <span className="event-status">{team.city || "N/A"}</span>
        </div>
        <h1>{team.nameFull || team.name}</h1>
        <p className="event-detail-subtitle">{team.nameMini || team.name}</p>
      </article>

      <ObjectSocialPanel
        targetType="team"
        targetId={team.id}
        title="Feed team"
        subtitle="Discussions liees a cette equipe et ses evenements"
        followTargetType="team"
        followBaseCount={(athletes.length * 80) + (events.length * 30)}
        followLabel="abonnes"
        composerPlaceholder="Ton avis sur ce team..."
      />

      <section className="related-section">
        <div className="group-title">
          <h2>Athletes du team</h2>
          <span>{athletes.length}</span>
        </div>
        <div className="entity-grid">
          {athletes.map((athlete) => (
            <article key={athlete.id} className="entity-card">
              <h3>
                <Link to={`/athlete/${athlete.id}`}>{athlete.name}</Link>
              </h3>
              <p className="event-meta">{athlete.role || "Athlete"}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements du team</h2>
          <span>{events.length}</span>
        </div>
        <div className="event-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isInWatchlist={watchlistIds.includes(event.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default TeamDetailPage;
