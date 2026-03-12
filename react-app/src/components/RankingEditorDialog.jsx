import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CompactSelectionRow, {
  buildCompactSelectionMeta,
  buildCompactSelectionMetaFromSearchResult,
} from "./CompactSelectionRow";
import UnifiedSearchBar from "./UnifiedSearchBar";
import { searchGlobal } from "../services/globalSearchService";
import {
  MAX_RANKING_ROWS,
  buildRankingDraftFromList,
  createEmptyRankingDraft,
  createRankingListFromDraft,
  getDraftSport,
  getRankingDraftRowSelection,
  updateRankingListFromDraft,
  validateRankingDraft,
} from "../services/rankingListsService";
import { useAuth } from "../contexts/AuthContext";

function createRowKey(prefix = "row") {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function buildInitialDraft(mode, sourceList, initialList) {
  if (mode === "edit" && initialList) {
    return buildRankingDraftFromList(initialList);
  }
  if (mode === "fork" && sourceList) {
    return buildRankingDraftFromList(sourceList);
  }
  return createEmptyRankingDraft();
}

function getDialogTitle(mode) {
  if (mode === "edit") return "Modifier le classement";
  if (mode === "fork") return "Creer ma version";
  return "Creer un nouveau classement";
}

function moveRow(list, fromIndex, toIndex) {
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return list;
  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  if (!moved) return list;
  next.splice(toIndex, 0, moved);
  return next;
}

function buildResultSelection(result) {
  if (!result) return null;
  const safeType = String(result?.type || "").trim().toLowerCase();
  if (safeType !== "event" && safeType !== "athlete") return null;
  return {
    itemType: safeType,
    itemId: String(result?.id || "").trim(),
  };
}

function buildCompactRowPropsFromSelection(selection) {
  if (!selection) return null;
  if (selection.type === "event" && selection.event) {
    return buildCompactSelectionMeta({
      kind: "event",
      event: selection.event,
    });
  }
  if (selection.type === "athlete" && selection.athlete) {
    return buildCompactSelectionMeta({
      kind: "athlete",
      athlete: selection.athlete,
    });
  }
  return null;
}

function RankingEditorDialog({
  open = false,
  mode = "create",
  sourceList = null,
  initialList = null,
  onClose = () => {},
  onSaved = () => {},
}) {
  const { currentUser, isAuthenticated } = useAuth();
  const seededDraft = useMemo(
    () => buildInitialDraft(mode, sourceList, initialList),
    [initialList, mode, sourceList],
  );
  const [draft, setDraft] = useState(() => seededDraft);
  const [editingRowKey, setEditingRowKey] = useState("");
  const [draggingRowKey, setDraggingRowKey] = useState("");
  const [pendingAddQuery, setPendingAddQuery] = useState("");
  const [saveError, setSaveError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const wasOpenRef = useRef(false);
  const activeDraft = open && !wasOpenRef.current && !isDirty ? seededDraft : draft;

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setDraft(seededDraft);
      setEditingRowKey("");
      setDraggingRowKey("");
      setPendingAddQuery("");
      setSaveError("");
      setValidationErrors({});
      setIsSaving(false);
      setIsDirty(false);
    }
    wasOpenRef.current = open;
  }, [open, seededDraft]);

  useEffect(() => {
    if (!open || isSaving) return undefined;
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSaving, onClose, open]);

  const safeMode = String(mode || "").trim().toLowerCase();
  const rows = Array.isArray(activeDraft?.rows) ? activeDraft.rows : [];
  const draftSport = useMemo(() => getDraftSport(activeDraft), [activeDraft]);

  const resolvedRows = useMemo(
    () => rows.map((row) => ({
      ...row,
      selection: getRankingDraftRowSelection(row),
    })),
    [rows],
  );

  const searchResultsByRow = useMemo(() => {
    const output = {};
    resolvedRows.forEach((row) => {
      const isEditing = editingRowKey === row.key || !row.selection;
      const query = String(row?.query || "").trim();
      if (!isEditing || !query) {
        output[row.key] = [];
        return;
      }
      const matches = searchGlobal(query, { limit: 8, types: ["event", "athlete"] })
        .filter((result) => {
          const safeType = String(result?.type || "").trim().toLowerCase();
          if (safeType !== "event" && safeType !== "athlete") return false;
          const candidateSelection = getRankingDraftRowSelection({
            itemType: safeType,
            itemId: result.id,
          });
          if (!candidateSelection) return false;
          if (!draftSport) return true;
          return String(candidateSelection.sport || "").trim() === draftSport;
        });
      output[row.key] = matches;
    });
    return output;
  }, [draftSport, editingRowKey, resolvedRows]);

  const pendingAddResults = useMemo(() => {
    const query = String(pendingAddQuery || "").trim();
    if (!query) return [];
    return searchGlobal(query, { limit: 8, types: ["event", "athlete"] })
      .filter((result) => {
        const safeType = String(result?.type || "").trim().toLowerCase();
        if (safeType !== "event" && safeType !== "athlete") return false;
        const candidateSelection = getRankingDraftRowSelection({
          itemType: safeType,
          itemId: result.id,
        });
        if (!candidateSelection) return false;
        if (!draftSport) return true;
        return String(candidateSelection.sport || "").trim() === draftSport;
      });
  }, [draftSport, pendingAddQuery]);

  function updateRow(rowKey, updater) {
    setDraft((current) => ({
      ...current,
      rows: current.rows.map((row) => {
        if (row.key !== rowKey) return row;
        const nextPatch = typeof updater === "function" ? updater(row) : updater;
        return {
          ...row,
          ...(nextPatch || {}),
        };
      }),
    }));
    setIsDirty(true);
  }

  function handleAddSelection(result) {
    if (rows.length >= MAX_RANKING_ROWS) return;
    const selection = buildResultSelection(result);
    if (!selection) return;
    const resolvedSelection = getRankingDraftRowSelection(selection);
    if (!resolvedSelection) return;
    if (draftSport && resolvedSelection.sport !== draftSport) {
      setSaveError("Toutes les lignes doivent appartenir au meme sport.");
      return;
    }
    const nextKey = createRowKey("ranking");
    setDraft((current) => ({
      ...current,
      rows: [
        ...current.rows,
        {
          key: nextKey,
          itemType: selection.itemType,
          itemId: selection.itemId,
          note: "",
          query: "",
        },
      ],
    }));
    setIsDirty(true);
    setPendingAddQuery("");
    setSaveError("");
  }

  function handleRemoveRow(rowKey) {
    setDraft((current) => ({
      ...current,
      rows: current.rows.filter((row) => row.key !== rowKey),
    }));
    setIsDirty(true);
    if (editingRowKey === rowKey) setEditingRowKey("");
    setSaveError("");
  }

  function handleSelectResult(rowKey, result) {
    const selection = buildResultSelection(result);
    if (!selection) return;
    const resolvedSelection = getRankingDraftRowSelection(selection);
    if (!resolvedSelection) return;
    if (draftSport && resolvedSelection.sport !== draftSport) {
      setSaveError("Toutes les lignes doivent appartenir au meme sport.");
      return;
    }
    updateRow(rowKey, {
      ...selection,
      query: "",
    });
    setEditingRowKey("");
    setSaveError("");
  }

  function handleSave() {
    if (!isAuthenticated || !currentUser?.firebaseUid || currentUser?.isAnonymous) {
      setSaveError("Connecte-toi pour creer ou modifier un classement.");
      return;
    }

    const validation = validateRankingDraft(activeDraft);
    if (!validation.ok) {
      setValidationErrors(validation.errors || {});
      setSaveError("");
      const firstInvalidIndex = Array.isArray(validation.errors?.rows)
        ? validation.errors.rows.findIndex(Boolean)
        : -1;
      if (firstInvalidIndex >= 0 && rows[firstInvalidIndex]) {
        setEditingRowKey(rows[firstInvalidIndex].key);
      }
      return;
    }

    setIsSaving(true);
    setValidationErrors({});
    setSaveError("");

    const action = safeMode === "edit"
      ? updateRankingListFromDraft(initialList?.id, activeDraft, {
        currentUser,
        authUser: currentUser,
        existingList: initialList,
      })
      : createRankingListFromDraft(activeDraft, {
        currentUser,
        authUser: currentUser,
        sourceList: safeMode === "fork" ? sourceList : null,
      });

    Promise.resolve(action)
      .then((result) => {
        if (!result?.ok) {
          if (result?.error === "draft_invalid" && result?.validation?.errors) {
            setValidationErrors(result.validation.errors);
            return;
          }
          if (result?.error === "cloud_unavailable") {
            setSaveError("Le mode cloud des classements est indisponible pour le moment.");
            return;
          }
          if (result?.error === "forbidden") {
            setSaveError("Tu ne peux pas modifier ce classement.");
            return;
          }
          if (result?.error === "auth_required") {
            setSaveError("Connecte-toi pour enregistrer ce classement.");
            return;
          }
          setSaveError("Enregistrement impossible pour le moment.");
          return;
        }
        onClose();
        onSaved(result.list || null);
      })
      .catch(() => {
        setSaveError("Enregistrement impossible pour le moment.");
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="ranking-editor-backdrop"
      role="presentation"
      onClick={() => {
        if (!isSaving) onClose();
      }}
    >
      <section
        className="ranking-editor-panel"
        role="dialog"
        aria-modal="true"
        aria-label={getDialogTitle(safeMode)}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ranking-editor-head">
          <div>
            <h2>{getDialogTitle(safeMode)}</h2>
            {safeMode === "fork" && sourceList?.title ? (
              <p className="event-meta">Version derivee de {sourceList.title}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="ranking-editor-close"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Fermer l editeur"
          >
            x
          </button>
        </div>

        <div className="ranking-editor-body">
          <label className="search-wrap ranking-editor-title-field" htmlFor="ranking-editor-title">
            <span>Nom du classement</span>
            <input
              id="ranking-editor-title"
              type="text"
              maxLength={80}
              value={activeDraft.title}
              onChange={(event) => {
                setDraft((current) => ({ ...current, title: event.target.value }));
                setIsDirty(true);
                if (validationErrors.title) {
                  setValidationErrors((current) => ({ ...current, title: "" }));
                }
              }}
              placeholder="Nom du classement"
            />
          </label>
          {validationErrors.title ? (
            <p className="ranking-editor-error">{validationErrors.title}</p>
          ) : null}

          <div className="ranking-editor-sport-meta">
            <span className="event-corner-chip event-corner-chip-sport">
              {draftSport ? `Sport : ${draftSport}` : "Sport : a definir"}
            </span>
            <span className="event-meta">{rows.length}/{MAX_RANKING_ROWS}</span>
          </div>

          <div className="ranking-editor-list">
            {resolvedRows.map((row, index) => {
              const rowError = Array.isArray(validationErrors?.rows) ? validationErrors.rows[index] : "";
              const isEditingRow = editingRowKey === row.key || !row.selection;
              const searchResults = searchResultsByRow[row.key] || [];
              return (
                <article
                  key={row.key}
                  className={`ranking-editor-entry-row ${draggingRowKey === row.key ? "is-dragging" : ""}`.trim()}
                  draggable
                  onDragStart={(event) => {
                    setDraggingRowKey(row.key);
                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setData("text/plain", row.key);
                  }}
                  onDragOver={(event) => {
                    if (!draggingRowKey || draggingRowKey === row.key) return;
                    event.preventDefault();
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    const droppedKey = String(event.dataTransfer.getData("text/plain") || draggingRowKey).trim();
                    if (!droppedKey || droppedKey === row.key) return;
                    const fromIndex = rows.findIndex((item) => item.key === droppedKey);
                    const toIndex = rows.findIndex((item) => item.key === row.key);
                    if (fromIndex < 0 || toIndex < 0) return;
                    setDraft((current) => ({
                      ...current,
                      rows: moveRow(current.rows, fromIndex, toIndex),
                    }));
                    setDraggingRowKey("");
                  }}
                  onDragEnd={() => setDraggingRowKey("")}
                >
                  <div className="ranking-editor-entry-rank">#{index + 1}</div>
                  <div className="ranking-editor-entry-item">
                    {row.selection ? (() => {
                      const compactRow = buildCompactRowPropsFromSelection(row.selection);
                      if (!compactRow) return null;
                      return (
                        <div className="ranking-editor-selected-item">
                          <CompactSelectionRow
                            kind={compactRow.kind}
                            title={compactRow.title}
                            subtitle={compactRow.subtitle || "Infos non disponibles"}
                            className="ranking-editor-selection-row"
                            trailingSlot={!isEditingRow ? (
                              <button
                                type="button"
                                className="filter-btn"
                                onClick={() => setEditingRowKey(row.key)}
                              >
                                Changer
                              </button>
                            ) : null}
                          />
                        </div>
                      );
                    })() : null}
                    {isEditingRow ? (
                      <div className="ranking-editor-entry-search">
                        <UnifiedSearchBar
                          value={row.query || ""}
                          scope="all"
                          className="ranking-editor-search-field"
                          onChange={(event) => {
                            updateRow(row.key, { query: event.target.value });
                            setSaveError("");
                          }}
                        />
                        {row.query ? (
                          searchResults.length ? (
                            <div className="ranking-editor-search-results">
                              {searchResults.map((result) => {
                                const resultSelection = getRankingDraftRowSelection({
                                  itemType: result.type,
                                  itemId: result.id,
                                });
                                const compactRow = buildCompactSelectionMetaFromSearchResult(result);
                                if (!resultSelection || !compactRow) return null;
                                return (
                                  <CompactSelectionRow
                                    key={`${row.key}-${result.type}-${result.id}`}
                                    kind={compactRow.kind}
                                    title={compactRow.title}
                                    subtitle={compactRow.subtitle}
                                    leadingLabel={compactRow.kind === "athlete" ? "Athlete" : "Event"}
                                    interactive
                                    className="ranking-editor-search-result"
                                    onClick={() => handleSelectResult(row.key, result)}
                                  />
                                );
                              })}
                            </div>
                          ) : (
                            <div className="global-search-empty">Aucun resultat compatible.</div>
                          )
                        ) : null}
                      </div>
                    ) : null}
                    {rowError ? <p className="ranking-editor-error">{rowError}</p> : null}
                  </div>
                  <div className="ranking-editor-entry-note">
                    <textarea
                      rows="3"
                      maxLength={280}
                      placeholder="Commentaire pour cette position..."
                      value={row.note || ""}
                      onChange={(event) => updateRow(row.key, { note: event.target.value })}
                    />
                  </div>
                  <div className="ranking-editor-entry-controls">
                    <span className="ranking-editor-drag-handle" aria-hidden="true">::</span>
                    <button
                      type="button"
                      className="ranking-editor-remove-btn"
                      onClick={() => handleRemoveRow(row.key)}
                      aria-label={`Supprimer la ligne ${index + 1}`}
                    >
                      x
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {validationErrors.entries ? (
            <p className="ranking-editor-error">{validationErrors.entries}</p>
          ) : null}
          {saveError ? <p className="ranking-editor-error">{saveError}</p> : null}

          <div className="ranking-editor-actions-row">
            <div className="ranking-editor-add-bar">
              <div className="ranking-editor-add-input">
                <UnifiedSearchBar
                  value={pendingAddQuery}
                  scope="all"
                  className="ranking-editor-add-search-field"
                  onChange={(event) => {
                    setPendingAddQuery(event.target.value);
                    setSaveError("");
                  }}
                  disabled={rows.length >= MAX_RANKING_ROWS}
                />
                {pendingAddQuery ? (
                  pendingAddResults.length ? (
                    <div className="ranking-editor-search-results">
                      {pendingAddResults.map((result) => {
                        const resultSelection = getRankingDraftRowSelection({
                          itemType: result.type,
                          itemId: result.id,
                        });
                        const compactRow = buildCompactSelectionMetaFromSearchResult(result);
                        if (!resultSelection || !compactRow) return null;
                        return (
                          <CompactSelectionRow
                            key={`pending-${result.type}-${result.id}`}
                            kind={compactRow.kind}
                            title={compactRow.title}
                            subtitle={compactRow.subtitle}
                            leadingLabel={compactRow.kind === "athlete" ? "Athlete" : "Event"}
                            interactive
                            className="ranking-editor-search-result profile-top5-search-result"
                            onClick={() => handleAddSelection(result)}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="global-search-empty">Aucun resultat compatible.</div>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="ranking-editor-footer">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={isSaving}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export default RankingEditorDialog;
