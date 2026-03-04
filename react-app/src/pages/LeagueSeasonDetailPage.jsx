import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import HorizontalCardRail from "../components/HorizontalCardRail";
import LeagueSeasonCard from "../components/LeagueSeasonCard";
import ObjectDetailHero from "../components/ObjectDetailHero";
import ObjectDetailInfoCard from "../components/ObjectDetailInfoCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import { getLeagueById, getLeagueSeasonById } from "../services/leaguesService";
import { buildLeagueSeasonDetailInfoItems } from "../services/objectDetailInfoService";

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
  const seasonInfoItems = buildLeagueSeasonDetailInfoItems(season);

  return (
    <section className="object-detail-page">
      <ObjectDetailHero
        card={<LeagueSeasonCard season={season} variant="detail" size="large" />}
        side={(
          <ObjectDetailInfoCard
            title="Infos saison"
            items={seasonInfoItems}
          />
        )}
      />

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements de la saison</h2>
        </div>
        <HorizontalCardRail label="Evenements de la saison" itemType="event">
          {season.events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isInWatchlist={watchlistIds.includes(event.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </HorizontalCardRail>
      </section>

      <ObjectFeedScopePanel
        targetType="league-season"
        targetId={season.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        title="Commentaires de la saison"
        subtitle={`Flux commentaires uniquement · tri Chrono ou Populaires${league ? ` · ${league.title}` : ""}.`}
        contentProfile="comments-only"
        showComposer
        emptyStateText="Aucun commentaire pour cette saison."
      />
    </section>
  );
}

export default LeagueSeasonDetailPage;
