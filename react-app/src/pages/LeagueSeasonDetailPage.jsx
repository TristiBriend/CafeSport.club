import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import LeagueSeasonCard from "../components/LeagueSeasonCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
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

  return (
    <section className="object-detail-page">
      <div className="object-detail-top-left">
        <LeagueSeasonCard season={season} variant="detail" size="large" />
      </div>

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

      <ObjectFeedScopePanel
        targetType="league-season"
        targetId={season.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        title="Feed relie a la card"
        subtitle={`Flux saison complet${league ? ` · ${league.title}` : ""}.`}
      />
    </section>
  );
}

export default LeagueSeasonDetailPage;
