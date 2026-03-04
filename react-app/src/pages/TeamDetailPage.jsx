import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import HorizontalCardRail from "../components/HorizontalCardRail";
import ObjectDetailHero from "../components/ObjectDetailHero";
import ObjectDetailInfoCard from "../components/ObjectDetailInfoCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import RankingCard from "../components/RankingCard";
import TeamCard from "../components/TeamCard";
import {
  getCuratedLists,
  getEventsForTeam,
  getTeamById,
  resolveListEntries,
} from "../services/catalogService";
import {
  getExpectedEventsForObject,
  getTopRatedEventsForObject,
} from "../services/objectEventSectionsService";
import { buildTeamDetailInfoItems } from "../services/objectDetailInfoService";

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
  const teamInfoItems = buildTeamDetailInfoItems(team);
  const teamEventIds = useMemo(
    () => new Set(getEventsForTeam(team.id).map((event) => String(event?.id || "").trim()).filter(Boolean)),
    [team.id],
  );
  const relatedRankings = useMemo(
    () => getCuratedLists({ sportFilter: "Tous", query: "" })
      .filter((list) => resolveListEntries(list).some((entry) => {
        if (entry.type === "event" && entry.event?.id) {
          return teamEventIds.has(entry.event.id);
        }
        return String(entry?.eventId || "").trim() !== "" && teamEventIds.has(String(entry.eventId || "").trim());
      })),
    [teamEventIds],
  );

  return (
    <section className="object-detail-page">
      <ObjectDetailHero
        card={<TeamCard team={team} variant="detail" size="large" />}
        side={(
          <ObjectDetailInfoCard
            title="Infos team"
            items={teamInfoItems}
          />
        )}
      />

      <section className="related-section">
        <div className="group-title">
          <h2>Classements qui contiennent des evenements de cette equipe</h2>
        </div>
        {relatedRankings.length ? (
          <HorizontalCardRail
            label="Classements lies a cette equipe"
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
            <p className="event-meta">Aucun classement ne reference encore les evenements de cette equipe.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les plus attendus</h2>
        </div>
        {expectedEvents.length ? (
          <HorizontalCardRail
            label="Evenements team attendus"
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
            <p className="event-meta">Aucun evenement a venir pour ce team.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les mieux notes</h2>
        </div>
        {topRatedEvents.length ? (
          <HorizontalCardRail
            label="Evenements team mieux notes"
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
            <p className="event-meta">Aucun evenement note pour ce team.</p>
          </article>
        )}
      </section>

      <ObjectFeedScopePanel
        targetType="team"
        targetId={team.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        subtitle="Flux team complet: commentaires, events et objets lies."
      />
    </section>
  );
}

export default TeamDetailPage;
