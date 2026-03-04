import { collection, doc, setDoc } from "firebase/firestore";
import { getUserById, getListById, getCuratedLists, resolveListEntries, getAthleteById } from "./catalogService";
import { getEventById } from "./eventsService";
import { db, isFirebaseConfigured } from "./firebase";
import { isCatalogCloudMode, upsertCatalogListInSnapshot } from "./catalogRepositoryService";
import { resolvePublicIdentity } from "./profileService";

const MAX_RANKING_ROWS = 50;

function normalizeId(value) {
  return String(value || "").trim();
}

function normalizeText(value) {
  return String(value || "").trim();
}

function createRowKey(prefix = "row") {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getAuthUid(authUser) {
  return normalizeId(authUser?.uid || authUser?.firebaseUid);
}

function isAuthenticatedActor(authUser) {
  return Boolean(getAuthUid(authUser) && !authUser?.isAnonymous);
}

function toEntryPayload(row) {
  const safeType = normalizeText(row?.itemType).toLowerCase();
  const safeItemId = normalizeId(row?.itemId);
  const safeNote = normalizeText(row?.note).slice(0, 280);
  if (!safeItemId || (safeType !== "event" && safeType !== "athlete")) {
    return null;
  }
  return {
    eventId: safeType === "event" ? safeItemId : "",
    athleteId: safeType === "athlete" ? safeItemId : "",
    note: safeNote,
    score: null,
  };
}

function buildSubtitleForSelection(selection) {
  if (!selection) return "";
  if (selection.type === "event") {
    return [selection.event?.league, selection.event?.location, selection.event?.date || selection.event?.dateISO]
      .filter(Boolean)
      .join(" · ");
  }
  if (selection.type === "athlete") {
    return [selection.athlete?.sport, selection.athlete?.country || selection.athlete?.role]
      .filter(Boolean)
      .join(" · ");
  }
  return "";
}

export function getRankingDraftRowSelection(row) {
  const safeType = normalizeText(row?.itemType).toLowerCase();
  const safeItemId = normalizeId(row?.itemId);
  if (!safeItemId) return null;

  if (safeType === "event") {
    const event = getEventById(safeItemId);
    if (!event) return null;
    return {
      type: "event",
      id: safeItemId,
      sport: normalizeText(event?.sport),
      title: normalizeText(event?.title) || "Evenement",
      subtitle: buildSubtitleForSelection({ type: "event", event }),
      event,
    };
  }

  if (safeType === "athlete") {
    const athlete = getAthleteById(safeItemId);
    if (!athlete) return null;
    return {
      type: "athlete",
      id: safeItemId,
      sport: normalizeText(athlete?.sport),
      title: normalizeText(athlete?.name) || "Athlete",
      subtitle: buildSubtitleForSelection({ type: "athlete", athlete }),
      athlete,
    };
  }

  return null;
}

function getDraftRows(draft) {
  return Array.isArray(draft?.rows) ? draft.rows : [];
}

export function createEmptyRankingDraft() {
  return {
    title: "",
    rows: [],
  };
}

export function buildRankingDraftFromList(list) {
  const entries = resolveListEntries(list);
  return {
    title: normalizeText(list?.title),
    rows: entries.map((entry, index) => ({
      key: createRowKey(`seed-${index + 1}`),
      itemType: entry?.type === "athlete" ? "athlete" : entry?.type === "event" ? "event" : "",
      itemId:
        entry?.type === "athlete"
          ? normalizeId(entry?.athlete?.id)
          : entry?.type === "event"
            ? normalizeId(entry?.event?.id)
            : "",
      note: normalizeText(entry?.note).slice(0, 280),
    })),
  };
}

export function normalizeRankingDraft(draft) {
  const title = normalizeText(draft?.title).slice(0, 80);
  const rows = getDraftRows(draft)
    .slice(0, MAX_RANKING_ROWS)
    .map((row, index) => ({
      key: normalizeId(row?.key) || createRowKey(`norm-${index + 1}`),
      itemType: normalizeText(row?.itemType).toLowerCase(),
      itemId: normalizeId(row?.itemId),
      note: normalizeText(row?.note).slice(0, 280),
    }));

  return { title, rows };
}

export function getDraftSport(draft) {
  const rows = getDraftRows(draft);
  for (let index = 0; index < rows.length; index += 1) {
    const selection = getRankingDraftRowSelection(rows[index]);
    if (selection?.sport) return selection.sport;
  }
  return "";
}

export function validateRankingDraft(draft) {
  const normalized = normalizeRankingDraft(draft);
  const errors = {};

  if (normalized.title.length < 3) {
    errors.title = "Le nom du classement doit contenir au moins 3 caracteres.";
  }

  if (!normalized.rows.length) {
    errors.entries = "Ajoute au moins une ligne.";
  }

  if (normalized.rows.length > MAX_RANKING_ROWS) {
    errors.entries = `Maximum ${MAX_RANKING_ROWS} lignes.`;
  }

  const sport = getDraftSport(normalized);
  const rowErrors = normalized.rows.map((row) => {
    const selection = getRankingDraftRowSelection(row);
    if (!selection) return "Selection obligatoire.";
    if (sport && normalizeText(selection.sport) !== sport) {
      return "Toutes les lignes doivent appartenir au meme sport.";
    }
    return "";
  });

  if (rowErrors.some(Boolean)) {
    errors.rows = rowErrors;
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    draft: normalized,
    sport,
  };
}

export function getRankingListCanonicalRootId(list) {
  return normalizeId(list?.sourceRootListId || list?.id);
}

export function canEditRankingList(list, authUser, currentUser = null) {
  const ownerUid = normalizeId(list?.ownerUid);
  const authUid = getAuthUid(authUser || currentUser);
  return Boolean(ownerUid && authUid && ownerUid === authUid && !(authUser || currentUser)?.isAnonymous);
}

export function canForkRankingList(list, authUser) {
  return Boolean(list && isAuthenticatedActor(authUser));
}

export function resolveRankingListOwner(list) {
  const ownerId = normalizeId(list?.ownerId);
  const catalogOwner = ownerId ? getUserById(ownerId) : null;
  if (catalogOwner) {
    return {
      id: catalogOwner.id,
      name: normalizeText(catalogOwner.name) || "Utilisateur",
      handle: normalizeText(catalogOwner.handle) || "@user",
    };
  }
  const identity = resolvePublicIdentity(ownerId, {
    fallbackUser: {
      id: ownerId,
      name: "Utilisateur",
      handle: "",
    },
  });
  return {
    id: ownerId,
    name: identity.displayName,
    handle: identity.handleFormatted || "@user",
  };
}

export function getSiblingRankingLists(list, { excludeCurrent = true, excludeSameOwner = true } = {}) {
  const rootId = getRankingListCanonicalRootId(list);
  const currentId = normalizeId(list?.id);
  const currentOwnerId = normalizeId(list?.ownerId);
  if (!rootId) return [];

  return getCuratedLists()
    .filter((candidate) => {
      const candidateId = normalizeId(candidate?.id);
      if (!candidateId) return false;
      if (excludeCurrent && candidateId === currentId) return false;
      if (getRankingListCanonicalRootId(candidate) !== rootId) return false;
      if (excludeSameOwner && normalizeId(candidate?.ownerId) === currentOwnerId) return false;
      return true;
    })
    .sort((a, b) => normalizeText(b?.updatedAt || b?.createdAt).localeCompare(normalizeText(a?.updatedAt || a?.createdAt)));
}

function buildSavedListDoc({
  listId,
  draft,
  currentUser,
  ownerUid,
  sourceList,
  existingList,
}) {
  const validation = validateRankingDraft(draft);
  if (!validation.ok) {
    return {
      ok: false,
      error: "draft_invalid",
      validation,
    };
  }

  const nowIso = new Date().toISOString();
  const sourceListId = existingList
    ? normalizeId(existingList?.sourceListId)
    : normalizeId(sourceList?.id);
  const sourceRootListId = existingList
    ? getRankingListCanonicalRootId(existingList)
    : getRankingListCanonicalRootId(sourceList) || listId;

  const payload = {
    id: listId,
    title: validation.draft.title,
    description: "",
    sport: validation.sport,
    ownerId: normalizeId(existingList?.ownerId || currentUser?.id),
    ownerUid: normalizeId(existingList?.ownerUid || ownerUid),
    likes: Math.max(0, Number(existingList?.likes || 0)),
    count: validation.draft.rows.length,
    entries: validation.draft.rows.map(toEntryPayload).filter(Boolean),
    sourceListId: sourceListId || "",
    sourceRootListId: sourceRootListId || listId,
    createdAt: normalizeText(existingList?.createdAt) || nowIso,
    updatedAt: nowIso,
  };

  return {
    ok: true,
    payload,
  };
}

async function persistRankingListDoc(listId, payload) {
  if (!isFirebaseConfigured || !db || !isCatalogCloudMode()) {
    return {
      ok: false,
      error: "cloud_unavailable",
    };
  }

  await setDoc(doc(collection(db, "lists"), listId), payload, { merge: true });
  upsertCatalogListInSnapshot(payload);
  return {
    ok: true,
    listId,
    list: getListById(listId) || payload,
  };
}

export async function createRankingListFromDraft(draft, {
  currentUser,
  authUser = null,
  sourceList = null,
} = {}) {
  if (!isAuthenticatedActor(authUser || currentUser)) {
    return {
      ok: false,
      error: "auth_required",
    };
  }

  if (!isFirebaseConfigured || !db || !isCatalogCloudMode()) {
    return {
      ok: false,
      error: "cloud_unavailable",
    };
  }

  const nextRef = doc(collection(db, "lists"));
  const listId = normalizeId(nextRef.id);
  const built = buildSavedListDoc({
    listId,
    draft,
    currentUser,
    ownerUid: getAuthUid(authUser || currentUser),
    sourceList,
    existingList: null,
  });

  if (!built.ok) {
    return {
      ok: false,
      error: "draft_invalid",
      validation: built.validation,
    };
  }

  return persistRankingListDoc(listId, built.payload);
}

export async function updateRankingListFromDraft(listId, draft, {
  currentUser,
  authUser = null,
  existingList = null,
} = {}) {
  const safeListId = normalizeId(listId);
  if (!safeListId || !existingList) {
    return {
      ok: false,
      error: "invalid_target",
    };
  }

  if (!canEditRankingList(existingList, authUser || currentUser, currentUser)) {
    return {
      ok: false,
      error: "forbidden",
    };
  }

  if (!isFirebaseConfigured || !db || !isCatalogCloudMode()) {
    return {
      ok: false,
      error: "cloud_unavailable",
    };
  }

  const built = buildSavedListDoc({
    listId: safeListId,
    draft,
    currentUser,
    ownerUid: getAuthUid(authUser || currentUser),
    sourceList: null,
    existingList,
  });

  if (!built.ok) {
    return {
      ok: false,
      error: "draft_invalid",
      validation: built.validation,
    };
  }

  return persistRankingListDoc(safeListId, built.payload);
}

export { MAX_RANKING_ROWS };
