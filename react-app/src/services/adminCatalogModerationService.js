import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import {
  getCatalogSnapshot,
  isCatalogCloudMode,
  removeCatalogObjectFromSnapshot,
} from "./catalogRepositoryService";

const ADMIN_CATALOG_TYPES = new Set([
  "event",
  "athlete",
  "team",
  "league",
  "league-season",
  "list",
]);

const COLLECTION_BY_TYPE = {
  event: "events",
  athlete: "athletes",
  team: "teams",
  league: "leagues",
  "league-season": "leagueSeasons",
  list: "lists",
};

function normalizeId(value) {
  return String(value || "").trim();
}

function normalizeType(value) {
  return String(value || "").trim().toLowerCase();
}

function asEntries(value) {
  return Array.isArray(value) ? value : [];
}

async function countCommentsForTarget(type, id) {
  const safeType = normalizeType(type);
  const safeId = normalizeId(id);
  if (!safeType || !safeId || !isFirebaseConfigured || !db) return 0;
  const snap = await getDocs(collection(db, "comments"));
  let count = 0;
  snap.forEach((docSnap) => {
    const comment = docSnap.data() || {};
    const targetType = normalizeType(comment?.targetType);
    const targetId = normalizeId(comment?.targetId);
    if (targetType === safeType && targetId === safeId) {
      count += 1;
      return;
    }
    if (safeType === "event" && normalizeId(comment?.eventId) === safeId) {
      count += 1;
    }
  });
  return count;
}

function pushDependency(list, label, count) {
  const safeCount = Number(count || 0);
  if (safeCount <= 0) return;
  list.push({ label, count: safeCount });
}

export function canAdminDeleteCatalogType(objectType) {
  return ADMIN_CATALOG_TYPES.has(normalizeType(objectType));
}

export async function getDeleteDependencies({ type, id }) {
  const safeType = normalizeType(type);
  const safeId = normalizeId(id);
  const dependencies = [];
  if (!canAdminDeleteCatalogType(safeType) || !safeId) {
    return {
      blocked: true,
      totalRefs: 1,
      dependencies: [{ label: "Type non supporte", count: 1 }],
    };
  }

  const snapshot = getCatalogSnapshot();

  if (safeType === "event") {
    const listRefs = snapshot.lists.reduce((acc, list) => (
      acc + asEntries(list?.entries).filter((entry) => normalizeId(entry?.eventId) === safeId).length
    ), 0);
    const commentsRefs = await countCommentsForTarget("event", safeId);
    pushDependency(dependencies, "Classements (entries event)", listRefs);
    pushDependency(dependencies, "Commentaires relies a l'event", commentsRefs);
  }

  if (safeType === "athlete") {
    const listRefs = snapshot.lists.reduce((acc, list) => (
      acc + asEntries(list?.entries).filter((entry) => normalizeId(entry?.athleteId) === safeId).length
    ), 0);
    const eventRefs = snapshot.events.filter((event) => asEntries(event?.athleteIds).some((athleteId) => normalizeId(athleteId) === safeId)).length;
    const teamRefs = snapshot.teams.filter((team) => asEntries(team?.athleteIds).some((athleteId) => normalizeId(athleteId) === safeId)).length;
    pushDependency(dependencies, "Classements (entries athlete)", listRefs);
    pushDependency(dependencies, "Events liant l'athlete", eventRefs);
    pushDependency(dependencies, "Teams liant l'athlete", teamRefs);
  }

  if (safeType === "team") {
    const eventRefs = snapshot.events.filter((event) => asEntries(event?.teamIds).some((teamId) => normalizeId(teamId) === safeId)).length;
    pushDependency(dependencies, "Events liant la team", eventRefs);
  }

  if (safeType === "league") {
    const seasonRefs = snapshot.leagueSeasons.filter((season) => normalizeId(season?.leagueId) === safeId).length;
    const eventRefs = snapshot.events.filter((event) => normalizeId(event?.competitionId) === safeId).length;
    pushDependency(dependencies, "Saisons de la league", seasonRefs);
    pushDependency(dependencies, "Events de la league", eventRefs);
  }

  if (safeType === "league-season") {
    const eventRefs = snapshot.events.filter((event) => normalizeId(event?.seasonId) === safeId).length;
    pushDependency(dependencies, "Events de la saison", eventRefs);
  }

  if (safeType === "list") {
    const commentsRefs = await countCommentsForTarget("list", safeId);
    pushDependency(dependencies, "Commentaires relies au classement", commentsRefs);
  }

  const totalRefs = dependencies.reduce((sum, item) => sum + Number(item.count || 0), 0);
  return {
    blocked: totalRefs > 0,
    totalRefs,
    dependencies,
  };
}

export async function deleteCatalogObject({ type, id }) {
  const safeType = normalizeType(type);
  const safeId = normalizeId(id);
  if (!canAdminDeleteCatalogType(safeType) || !safeId) {
    return {
      ok: false,
      reason: "invalid_target",
    };
  }
  if (!isCatalogCloudMode()) {
    return {
      ok: false,
      reason: "catalog_not_in_cloud_mode",
    };
  }
  if (!isFirebaseConfigured || !db) {
    return {
      ok: false,
      reason: "firebase_not_configured",
    };
  }

  const dependencies = await getDeleteDependencies({ type: safeType, id: safeId });
  if (dependencies.blocked) {
    return {
      ok: false,
      reason: "blocked_by_dependencies",
      dependencies,
    };
  }

  const collectionName = COLLECTION_BY_TYPE[safeType];
  if (!collectionName) {
    return {
      ok: false,
      reason: "unsupported_collection",
    };
  }

  await deleteDoc(doc(db, collectionName, safeId));
  removeCatalogObjectFromSnapshot(safeType, safeId);

  return {
    ok: true,
  };
}
