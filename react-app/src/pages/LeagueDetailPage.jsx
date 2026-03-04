import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import HorizontalCardRail from "../components/HorizontalCardRail";
import LeagueCard from "../components/LeagueCard";
import ObjectDetailHero from "../components/ObjectDetailHero";
import ObjectDetailInfoCard from "../components/ObjectDetailInfoCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import { getLeagueById } from "../services/leaguesService";
import {
  getExpectedEventsForObject,
  getTopRatedEventsForObject,
} from "../services/objectEventSectionsService";
import { buildLeagueDetailInfoItems } from "../services/objectDetailInfoService";

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
  const leagueInfoItems = buildLeagueDetailInfoItems(league);

  return (
    <section className="object-detail-page">
      <ObjectDetailHero
        card={<LeagueCard league={league} variant="detail" size="large" />}
        side={(
          <ObjectDetailInfoCard
            title="Infos ligue"
            items={leagueInfoItems}
          />
        )}
      />

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les plus attendus</h2>
        </div>
        {expectedEvents.length ? (
          <HorizontalCardRail
            label="Evenements ligue attendus"
            itemType="event"
            mode="carousel"
            visibleDesktop={3.6}
            visibleTablet={2.3}
            visibleMobile={1.15}
            scrollStepItems={1}
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
            <p className="event-meta">Aucun evenement a venir pour cette ligue.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les mieux notes</h2>
        </div>
        {topRatedEvents.length ? (
          <HorizontalCardRail
            label="Evenements ligue mieux notes"
            itemType="event"
            mode="carousel"
            visibleDesktop={3.6}
            visibleTablet={2.3}
            visibleMobile={1.15}
            scrollStepItems={1}
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
            <p className="event-meta">Aucun evenement note pour cette ligue.</p>
          </article>
        )}
      </section>

      <ObjectFeedScopePanel
        targetType="league"
        targetId={league.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        subtitle="Flux ligue complet: commentaires, events et objets lies."
      />
    </section>
  );
}

export default LeagueDetailPage;
