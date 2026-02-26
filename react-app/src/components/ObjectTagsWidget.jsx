import { useEffect, useMemo, useRef, useState } from "react";
import {
  addUserTagToObject,
  getObjectTagEntries,
  isObjectTagType,
  toggleObjectTagVote,
} from "../services/objectTagsService";
import { useSocialSync } from "../contexts/SocialSyncContext";

function formatScore(score) {
  const value = Number(score || 0);
  if (value > 0) return `+${value}`;
  return String(value);
}

function ObjectTagsWidget({
  objectType,
  objectId,
  title = "Tags",
  className = "",
  compact = false,
}) {
  const [entries, setEntries] = useState([]);
  const [draft, setDraft] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);
  const { revisionByDomain } = useSocialSync();
  const tagsRevision = Number(revisionByDomain?.tags || 0);

  const safeType = String(objectType || "").trim();
  const safeId = String(objectId || "").trim();

  useEffect(() => {
    if (!isObjectTagType(safeType) || !safeId) {
      setEntries([]);
      return;
    }
    setEntries(getObjectTagEntries(safeType, safeId));
  }, [safeId, safeType, tagsRevision]);

  const topEntries = useMemo(() => entries.slice(0, 3), [entries]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!widgetRef.current) return;
      if (!widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function refreshTags() {
    setEntries(getObjectTagEntries(safeType, safeId));
  }

  function handleAddTag(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    const created = addUserTagToObject(safeType, safeId, draft);
    if (!created) return;
    setDraft("");
    refreshTags();
    setIsOpen(true);
  }

  function handleVote(tagId, voteValue) {
    const updated = toggleObjectTagVote(safeType, safeId, tagId, voteValue);
    if (!updated) return;
    refreshTags();
  }

  if (!isObjectTagType(safeType) || !safeId) return null;

  return (
    <section
      ref={widgetRef}
      className={`object-tags-widget ${compact ? "is-compact" : ""} ${isOpen ? "is-open" : ""} ${className}`.trim()}
    >
      <div className="object-tags-top">
        {topEntries.length ? (
          topEntries.map((entry) => (
            <button
              key={entry.tagId}
              className="object-tag-chip"
              onClick={() => setIsOpen((prev) => !prev)}
              title={`${entry.label} (${formatScore(entry.score)})`}
              type="button"
            >
              {entry.label}
            </button>
          ))
        ) : (
          <button
            className="object-tag-chip"
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
          >
            Ajouter un tag
          </button>
        )}
      </div>

      <div className="object-tags-popover" role="dialog" aria-label="Gerer les tags">
        <div className="object-tags-popover-head">
          <strong>{title}</strong>
          <span className="muted">{entries.length}</span>
        </div>

        <div className="object-tags-list">
          {entries.length ? (
            entries.slice(0, compact ? 6 : 10).map((entry) => (
              <div key={entry.tagId} className="object-tag-row">
                <span className="object-tag-row-label">{entry.label}</span>
                <span className="object-tag-row-score">{formatScore(entry.score)}</span>
                <div className="object-tag-row-actions">
                  <button
                    className={`object-tag-vote-btn ${entry.currentUserVote === 1 ? "is-active" : ""}`}
                    onClick={() => handleVote(entry.tagId, 1)}
                    type="button"
                  >
                    +
                  </button>
                  <button
                    className={`object-tag-vote-btn ${entry.currentUserVote === -1 ? "is-active" : ""}`}
                    onClick={() => handleVote(entry.tagId, -1)}
                    type="button"
                  >
                    -
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="object-tags-empty">Aucun tag pour le moment.</p>
          )}
        </div>

        <form className="object-tags-add" onSubmit={handleAddTag}>
          <input
            className="object-tags-input"
            type="text"
            maxLength={28}
            placeholder="Ajouter un tag"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button className="object-tags-add-btn" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </section>
  );
}

export default ObjectTagsWidget;
