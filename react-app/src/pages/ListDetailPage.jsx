import { Link, useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard";
import EventCard from "../components/EventCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import PlayerCard from "../components/PlayerCard";
import RankingCard from "../components/RankingCard";
import { getListById, resolveListEntries } from "../services/catalogService";
import { COMMENT_TARGET, getCommentsForTarget } from "../services/commentsService";
import {
  getExpectedEventsForObject,
  getTopRatedEventsForObject,
} from "../services/objectEventSectionsService";

function ListDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { listId } = useParams();
  const list = getListById(listId);

  if (!list) {
    return (
      <section className="simple-page">
        <h1>List introuvable</h1>
        <Link className="btn btn-ghost" to="/lists">
          Retour lists
        </Link>
      </section>
    );
  }

  const listEntries = resolveListEntries(list);
  const expectedEvents = getExpectedEventsForObject("list", list.id, 6);
  const topRatedEvents = getTopRatedEventsForObject("list", list.id, 6);

  return (
    <section className="object-detail-page">
      <div className="object-detail-top-left">
        <RankingCard list={list} />
      </div>

      <section className="related-section list-ranking-table-section">
        <div className="group-title">
          <h2>Classement</h2>
          <span>{listEntries.length}</span>
        </div>
        {listEntries.length ? (
          <div className="list-ranking-table-wrap">
            <table className="list-ranking-table">
              <thead>
                <tr>
                  <th scope="col">Position</th>
                  <th scope="col">Card</th>
                  <th scope="col">Commentaire</th>
                </tr>
              </thead>
              <tbody>
                {listEntries.map((entry, index) => {
                  const note = String(entry?.note || "").trim();
                  const isEvent = entry?.type === "event" && entry?.event?.id;
                  const isAthlete = entry?.type === "athlete" && entry?.athlete?.id;
                  const bestComment = isEvent
                    ? getCommentsForTarget(COMMENT_TARGET.EVENT, entry.event.id)[0]
                    : isAthlete
                      ? getCommentsForTarget(COMMENT_TARGET.ATHLETE, entry.athlete.id)[0]
                      : null;
                  return (
                    <tr key={entry.id}>
                      <td className="list-ranking-position-cell">{index + 1}</td>
                      <td className="list-ranking-card-cell">
                        {isEvent ? (
                          <EventCard
                            event={entry.event}
                            isInWatchlist={watchlistIds.includes(entry.event.id)}
                            onToggleWatchlist={onToggleWatchlist}
                            size="miniature"
                            showComment={false}
                            showTags={false}
                          />
                        ) : null}
                        {isAthlete ? (
                          <PlayerCard
                            athlete={entry.athlete}
                            size="miniature"
                            showTags={false}
                            showMenu={false}
                          />
                        ) : null}
                        {!isEvent && !isAthlete ? (
                          <article className="list-ranking-unknown-card">
                            <p className="typo-body-strong">Element inconnu</p>
                            <p className="event-meta">Entree non resolvable</p>
                          </article>
                        ) : null}
                      </td>
                      <td className="list-ranking-comment-cell">
                        {bestComment ? (
                          <CommentCard
                            comment={bestComment}
                            showEventLink={false}
                          />
                        ) : (
                          <p className="event-meta">{note || "Aucun commentaire"}</p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <article className="entity-card">
            <p className="event-meta">Aucun element dans ce classement.</p>
          </article>
        )}
      </section>

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
            <p className="event-meta">Aucun evenement a venir dans cette list.</p>
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
            <p className="event-meta">Aucun evenement note dans cette list.</p>
          </article>
        )}
      </section>

      <ObjectFeedScopePanel
        targetType="list"
        targetId={list.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        title="Feed relie a la card"
        subtitle="Flux list complet: commentaires, events et objets lies."
      />
    </section>
  );
}

export default ListDetailPage;
