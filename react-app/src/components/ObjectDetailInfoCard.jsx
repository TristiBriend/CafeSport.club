import { Link } from "react-router-dom";

function renderValue(item) {
  if (item?.to) {
    return (
      <Link className="object-detail-info-link" to={item.to}>
        {item.value}
      </Link>
    );
  }
  if (item?.href) {
    return (
      <a
        className="object-detail-info-link"
        href={item.href}
        target="_blank"
        rel="noreferrer"
      >
        {item.value}
      </a>
    );
  }
  return item?.value;
}

function ObjectDetailInfoCard({
  items = [],
  className = "",
}) {
  const safeItems = (Array.isArray(items) ? items : [])
    .filter((item) => item && String(item.label || "").trim() && item.value !== undefined && item.value !== null);
  const rootClassName = ["entity-card", "object-detail-info-card", String(className || "").trim()]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={rootClassName}>
      {safeItems.length ? (
        <div className="object-detail-info-grid">
          {safeItems.map((item) => (
            <div key={item.id} className="object-detail-info-row">
              <strong>{item.label}</strong>
              <div className="object-detail-info-value">
                {renderValue(item)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="event-meta">Aucune information disponible.</p>
      )}
    </article>
  );
}

export default ObjectDetailInfoCard;
