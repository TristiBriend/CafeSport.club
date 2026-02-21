import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import ObjectSocialPanel from "../components/ObjectSocialPanel";
import {
  getAthleteById,
  getEventsForAthlete,
  getTeamForAthlete,
} from "../services/catalogService";

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

  const team = getTeamForAthlete(athlete);
  const events = getEventsForAthlete(athlete.id);

  return (
    <section>
      <Link className="back-link" to="/athletes">
        {"<- Retour athletes"}
      </Link>

      <article className="event-detail-card">
        <div className="event-detail-head">
          <span className="event-chip">{athlete.sport || "Sport"}</span>
          <span className="event-status">{athlete.country || "N/A"}</span>
        </div>
        <h1>{athlete.name}</h1>
        <p className="event-detail-subtitle">{athlete.role || "Athlete"}</p>
        <p className="event-meta">{athlete.bio || "Bio non renseignee."}</p>
        {team ? (
          <p className="event-meta">
            Team: <Link to={`/team/${team.id}`}>{team.name}</Link>
          </p>
        ) : null}
      </article>

      <ObjectSocialPanel
        targetType="athlete"
        targetId={athlete.id}
        title="Feed athlete"
        subtitle="Commentaires et critiques sur cet athlete"
        followTargetType="athlete"
        followBaseCount={(events.length * 40) + (team ? 120 : 80)}
        followLabel="abonnes"
        composerPlaceholder="Ton avis sur cet athlete..."
      />

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements associes</h2>
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

export default AthleteDetailPage;
