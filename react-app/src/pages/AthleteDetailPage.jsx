import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import HorizontalCardRail from "../components/HorizontalCardRail";
import ObjectDetailHero from "../components/ObjectDetailHero";
import ObjectDetailInfoCard from "../components/ObjectDetailInfoCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import PlayerCard from "../components/PlayerCard";
import RankingCard from "../components/RankingCard";
import {
  getCuratedLists,
  getAthleteById,
  resolveListEntries,
} from "../services/catalogService";
import {
  getExpectedEventsForObject,
  getTopRatedEventsForObject,
} from "../services/objectEventSectionsService";
import { buildAthleteDetailInfoItems } from "../services/objectDetailInfoService";

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
  const athleteInfoItems = buildAthleteDetailInfoItems(athlete);
  const relatedRankings = useMemo(
    () => getCuratedLists({ sportFilter: "Tous", query: "" })
      .filter((list) => resolveListEntries(list).some((entry) => (
        entry.type === "athlete" && entry.athlete?.id === athlete.id
      ))),
    [athlete.id],
  );

  return (
    <section className="object-detail-page">
      <ObjectDetailHero
        card={<PlayerCard athlete={athlete} variant="detail" size="large" />}
        side={(
          <ObjectDetailInfoCard
            title="Infos athlete"
            items={athleteInfoItems}
          />
        )}
      />

      <section className="related-section">
        <div className="group-title">
          <h2>Classements qui contiennent cet athlete</h2>
        </div>
        {relatedRankings.length ? (
          <HorizontalCardRail
            label="Classements lies a cet athlete"
            itemType="ranking"
            mode="carousel"
            visibleDesktop={2.8}
            visibleTablet={1.9}
            visibleMobile={1.08}
            scrollStepItems={1}
            showArrows
          >
            {relatedRankings.map((list) => (
              <RankingCard
                key={list.id}
                list={list}
                maxPreview={4}
              />
            ))}
          </HorizontalCardRail>
        ) : (
          <article className="entity-card">
            <p className="event-meta">Aucun classement ne reference encore cet athlete.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les plus attendus</h2>
        </div>
        {expectedEvents.length ? (
          <HorizontalCardRail
            label="Evenements athlete attendus"
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
            <p className="event-meta">Aucun evenement a venir pour ce player.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les mieux notes</h2>
        </div>
        {topRatedEvents.length ? (
          <HorizontalCardRail
            label="Evenements athlete mieux notes"
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
            <p className="event-meta">Aucun evenement note pour ce player.</p>
          </article>
        )}
      </section>

      <ObjectFeedScopePanel
        targetType="athlete"
        targetId={athlete.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        subtitle="Flux athlete complet: commentaires, events et objets lies."
      />
    </section>
  );
}

export default AthleteDetailPage;
