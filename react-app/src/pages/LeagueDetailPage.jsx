import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import ObjectSocialPanel from "../components/ObjectSocialPanel";
import ScoreBadge from "../components/ScoreBadge";
import { getLeagueById } from "../services/leaguesService";

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

  return (
    <section>
      <Link className="back-link" to="/leagues">
        {"<- Retour leagues"}
      </Link>

      <article className="event-detail-card">
        <div className="event-detail-head">
          <span className="event-chip">{league.sport}</span>
          <span className="event-status">{league.count} events</span>
        </div>
        <h1>{league.title}</h1>
        <p className="event-detail-subtitle">
          <span className="score-inline">
            <span className="score-inline-label">Score moyen</span>
            <ScoreBadge variant="community-chip" value={league.averageScore} scale="percent" />
          </span>
        </p>

        <div className="event-detail-grid">
          {league.seasons.map((season) => (
            <div key={season.id}>
              <span className="detail-label">Saison {season.year || "N/A"}</span>
              <strong>
                <span className="score-inline">
                  <Link to={`/league-season/${season.id}`}>{season.count} events</Link>
                  <ScoreBadge variant="community-chip" value={season.averageScore} scale="percent" />
                </span>
              </strong>
            </div>
          ))}
        </div>
      </article>

      <ObjectSocialPanel
        targetType="league"
        targetId={league.id}
        title="Feed ligue"
        subtitle="Commentaires de la ligue et de ses evenements"
        followTargetType="league"
        followBaseCount={Math.max(200, league.count * 30)}
        followLabel="abonnes"
        composerPlaceholder="Ton avis sur cette ligue..."
      />

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements de la ligue</h2>
          <span>{league.events.length}</span>
        </div>
        <div className="event-grid">
          {league.events.map((event) => (
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

export default LeagueDetailPage;
