import { Link, useParams } from "react-router-dom";
import ObjectSocialPanel from "../components/ObjectSocialPanel";
import ScoreBadge from "../components/ScoreBadge";
import { getListById, getUserById, resolveListEntries } from "../services/catalogService";

function ListDetailPage() {
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

  const owner = getUserById(list.ownerId);
  const entries = resolveListEntries(list);

  return (
    <section>
      <Link className="back-link" to="/lists">
        {"<- Retour lists"}
      </Link>

      <article className="event-detail-card">
        <div className="event-detail-head">
          <span className="event-chip">{list.sport || "Sport"}</span>
          <span className="event-status">{entries.length} items</span>
        </div>
        <h1>{list.title}</h1>
        <p className="event-detail-subtitle">{list.description || "Sans description"}</p>
        <p className="event-meta">Auteur: {owner ? owner.name : "Inconnu"}</p>
      </article>

      <ObjectSocialPanel
        targetType="list"
        targetId={list.id}
        title="Feed list"
        subtitle="Commentaires sur ce classement et ses entrees"
        followTargetType="list"
        followBaseCount={Number(list.likes || 0)}
        followLabel="likes"
        composerPlaceholder="Ton avis sur cette list..."
      />

      <section className="related-section">
        <div className="entity-grid">
          {entries.map((entry) => (
            <article key={entry.id} className="entity-card">
              {entry.type === "event" && entry.event ? (
                <>
                  <h3>
                    <Link to={`/event/${entry.event.id}`}>{entry.event.title}</Link>
                  </h3>
                  <p className="event-meta">{entry.event.league}</p>
                </>
              ) : null}
              {entry.type === "athlete" && entry.athlete ? (
                <>
                  <h3>
                    <Link to={`/athlete/${entry.athlete.id}`}>{entry.athlete.name}</Link>
                  </h3>
                  <p className="event-meta">{entry.athlete.sport}</p>
                </>
              ) : null}
              {entry.type === "unknown" ? <h3>Entree</h3> : null}
              {entry.score ? (
                <p className="event-meta">
                  <span className="score-inline">
                    <span className="score-inline-label">Score</span>
                    <ScoreBadge variant="community-chip" value={entry.score} scale="percent" />
                  </span>
                </p>
              ) : null}
              {entry.note ? <p className="event-meta">{entry.note}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default ListDetailPage;
