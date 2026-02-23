import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import ObjectSocialPanel from "../components/ObjectSocialPanel";
import ScoreBadge from "../components/ScoreBadge";
import { getLeagueById, getLeagueSeasonById } from "../services/leaguesService";

function LeagueSeasonDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { seasonId } = useParams();
  const season = getLeagueSeasonById(seasonId);

  if (!season) {
    return (
      <section className="simple-page">
        <h1>Saison introuvable</h1>
        <Link className="btn btn-ghost" to="/leagues">
          Retour leagues
        </Link>
      </section>
    );
  }

  const league = getLeagueById(season.leagueId);
  const backPath = league ? `/league/${league.id}` : "/leagues";

  return (
    <section>
      <Link className="back-link" to={backPath}>
        {"<- Retour league"}
      </Link>

      <article className="event-detail-card">
        <div className="event-detail-head">
          <span className="event-chip">{season.sport}</span>
          <span className="event-status">{season.count} events</span>
        </div>
        <h1>{season.title}</h1>
        <p className="event-detail-subtitle">{season.dateRangeLabel}</p>
        <p className="event-meta">
          Competition: {league ? <Link to={`/league/${league.id}`}>{league.title}</Link> : season.leagueTitle}
        </p>

        <div className="event-detail-grid">
          <div>
            <span className="detail-label">Saison</span>
            <strong>{season.year || "N/A"}</strong>
          </div>
          <div>
            <span className="detail-label">Moyenne</span>
            <strong>
              <ScoreBadge variant="community-chip" value={season.averageScore} scale="percent" />
            </strong>
          </div>
          <div>
            <span className="detail-label">A venir</span>
            <strong>{season.upcomingCount}</strong>
          </div>
          <div>
            <span className="detail-label">Termines</span>
            <strong>{season.pastCount}</strong>
          </div>
        </div>
      </article>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements de la saison</h2>
          <span>{season.events.length}</span>
        </div>
        <div className="event-grid">
          {season.events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isInWatchlist={watchlistIds.includes(event.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      </section>

      <ObjectSocialPanel
        targetType="league-season"
        targetId={season.id}
        title="Feed saison"
        subtitle="Commentaires sur cette saison et ses evenements"
        followTargetType="league-season"
        followBaseCount={Math.max(80, season.count * 18)}
        followLabel="abonnes"
        composerPlaceholder="Ton avis sur cette saison..."
      />
    </section>
  );
}

export default LeagueSeasonDetailPage;
