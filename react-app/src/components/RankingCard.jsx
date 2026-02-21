import { Link } from "react-router-dom";
import { getUserById, resolveListEntries } from "../services/catalogService";

function getImagePath(value) {
  const image = String(value || "").trim();
  if (!image) return "";
  return image.startsWith("/") ? image : `/${image}`;
}

function RankingCard({ list, showOwner = true, maxPreview = 5, className = "" }) {
  const entries = resolveListEntries(list);
  const owner = getUserById(list?.ownerId);
  const preview = entries.slice(0, maxPreview);
  const remaining = Math.max(0, entries.length - preview.length);

  return (
    <article className={`list-card ranking-card ${className}`.trim()}>
      <div className="ranking-card-head-outside">
        <div className="ranking-card-head-top">
          <span className="event-corner-chip event-corner-chip-sport ranking-card-sport-chip">
            {list.sport || "Sport"}
          </span>
        </div>
        <div className="ranking-card-head-text">
          <h3 className="ranking-card-title">
            <Link className="user-link" to={`/list/${list.id}`}>
              {list.title}
            </Link>
          </h3>
          <p className="muted ranking-card-description">{list.description || "Sans description"}</p>
        </div>
        {showOwner ? (
          <div className="ranking-card-head-owner">
            <p className="event-meta">{owner ? owner.name : "Auteur inconnu"}</p>
          </div>
        ) : null}
      </div>

      <div className="ranking-card-preview-frame">
        <div className="ranking-card-position-list">
          {preview.length ? preview.map((entry, index) => {
            const rank = index + 1;
            let label = "Element";
            let to = `/list/${list.id}`;
            let thumb = (
              <span className="ranking-card-row-thumb is-generic">{rank}</span>
            );

            if (entry.type === "event" && entry.event) {
              label = entry.event.title;
              to = `/event/${entry.event.id}`;
              const image = getImagePath(entry.event.image);
              if (image) {
                thumb = <img className="ranking-card-row-thumb" src={image} alt={entry.event.title} />;
              }
            }

            if (entry.type === "athlete" && entry.athlete) {
              label = entry.athlete.name;
              to = `/athlete/${entry.athlete.id}`;
              const image = getImagePath(entry.athlete.image);
              if (image) {
                thumb = <img className="ranking-card-row-thumb" src={image} alt={entry.athlete.name} />;
              }
            }

            return (
              <Link key={entry.id} className="ranking-card-row-link" to={to}>
                <span className="ranking-card-row-rank">#{rank}</span>
                {thumb}
                <span className="ranking-card-row-line">{label}</span>
              </Link>
            );
          }) : (
            <p className="muted ranking-card-position-empty">Aucun element dans ce classement.</p>
          )}
          {remaining > 0 ? (
            <div className="ranking-card-row-ellipsis" aria-hidden="true">+{remaining} autres</div>
          ) : null}
        </div>
      </div>

      <div className="ranking-card-footer-actions">
        <Link className="ghost small" to={`/list/${list.id}`}>Voir la list</Link>
      </div>
    </article>
  );
}

export default RankingCard;
