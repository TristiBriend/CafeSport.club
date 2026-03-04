import { useNavigate } from "react-router-dom";
import CompactSelectionRow, {
  buildCompactSelectionMeta,
  buildCompactSelectionMetaFromSearchResult,
} from "./CompactSelectionRow";

function ProfileTopEventsSection({
  title = "Mon Top 5 events",
  events = [],
  isOwnProfile = false,
  isEditing = false,
  topEventsQuery = "",
  topEventsNotice = "",
  searchResults = [],
  draggingTopEventId = "",
  dragOverTopEventId = "",
  emptyDisplayText = "Aucun top event disponible pour ce profil.",
  emptyEditingHint = "Liste vide: enregistrer applique automatiquement le mode auto.",
  onSave = () => {},
  onCancel = () => {},
  onStartEdit = () => {},
  onQueryChange = () => {},
  onQueryKeyDown = () => {},
  onAddResult = () => {},
  onRemove = () => {},
  onDragStart = () => {},
  onDragOver = () => {},
  onDrop = () => {},
  onDragEnd = () => {},
}) {
  const navigate = useNavigate();
  const visibleEvents = Array.isArray(events) ? events.slice(0, 5) : [];

  return (
    <section className="related-section profile-top5-section profile-top-aside">
      <div className="group-title">
        <h2>{title}</h2>
        <div className="group-title-meta">
          {isOwnProfile ? (
            isEditing ? (
              <>
                <button type="button" className="filter-btn is-active" onClick={onSave}>
                  Enregistrer
                </button>
                <button type="button" className="filter-btn" onClick={onCancel}>
                  Annuler
                </button>
              </>
            ) : (
              <button type="button" className="filter-btn" onClick={onStartEdit}>
                Modifier mon Top 5
              </button>
            )
          ) : null}
        </div>
      </div>

      {visibleEvents.length ? (
        <ol className="profile-top5-inline-list">
          {visibleEvents.map((event, index) => {
            const compactMeta = buildCompactSelectionMeta({
              kind: "event",
              event,
            });
            const safeEventId = String(event?.id || "").trim();
            return (
              <li
                key={safeEventId || `profile-top-${index + 1}`}
                className={`profile-top5-inline-item ${isEditing ? "is-editing" : ""} ${dragOverTopEventId === safeEventId ? "is-drag-target" : ""}`.trim()}
                draggable={isEditing}
                onDragStart={(dragEvent) => onDragStart(dragEvent, event)}
                onDragOver={(dragEvent) => onDragOver(dragEvent, event)}
                onDrop={(dragEvent) => onDrop(dragEvent, event)}
                onDragEnd={onDragEnd}
              >
                <span className="profile-top5-rank">#{index + 1}</span>
                <CompactSelectionRow
                  kind="event"
                  title={compactMeta.title}
                  subtitle={compactMeta.subtitle || "Infos non disponibles"}
                  interactive={!isEditing}
                  onClick={!isEditing && safeEventId ? () => navigate(`/event/${safeEventId}`) : undefined}
                  className="profile-top5-selection-row"
                />
                {isEditing ? (
                  <div className="profile-top5-item-controls">
                    <span className="profile-top5-drag-handle" aria-hidden="true" title="Glisser pour reclasser">
                      ⋮⋮
                    </span>
                    <button
                      type="button"
                      className="profile-top5-remove-btn"
                      onClick={() => onRemove(event)}
                      aria-label={`Retirer ${event?.title || "cet event"}`}
                    >
                      x
                    </button>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      ) : (
        isEditing ? null : <p className="event-meta">{emptyDisplayText}</p>
      )}

      {isOwnProfile && isEditing ? (
        <div className="profile-top5-editor profile-top5-editor-inline">
          <input
            className="profile-top5-search-input"
            type="search"
            placeholder="Ajouter un event au Top 5..."
            value={topEventsQuery}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={onQueryKeyDown}
          />
          {!visibleEvents.length ? (
            <p className="event-meta">{emptyEditingHint}</p>
          ) : null}
          {topEventsNotice ? <p className="profile-top5-editor-notice">{topEventsNotice}</p> : null}
          {topEventsQuery ? (
            searchResults.length ? (
              <div className="profile-top5-search-results">
                {searchResults.map((result) => (
                  (() => {
                    const compactMeta = buildCompactSelectionMetaFromSearchResult(result);
                    return (
                      <CompactSelectionRow
                        key={`${result.type}-${result.id}`}
                        kind={compactMeta.kind || "event"}
                        title={compactMeta.title}
                        subtitle={compactMeta.subtitle}
                        leadingLabel={compactMeta.kind === "athlete" ? "Athlete" : "Event"}
                        interactive
                        className="profile-top5-search-result"
                        onClick={() => onAddResult(result)}
                      />
                    );
                  })()
                ))}
              </div>
            ) : (
              <div className="global-search-empty">Aucun event pour <strong>{topEventsQuery}</strong></div>
            )
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export default ProfileTopEventsSection;
