import {
  activitySamples,
  athletes as localAthletes,
  competitionCatalog as localLeagues,
  curatedLists as localLists,
  events as localEvents,
  seasonCatalog as localLeagueSeasons,
  teams as localTeams,
  users as localUsers,
} from "../data/modelStore";
import {
  CATALOG_COLLECTIONS,
  readAllCatalogCollections,
  subscribeCatalogCollections,
} from "./catalogFirestoreService";
import { isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function buildLocalSnapshot() {
  return {
    events: [...localEvents],
    athletes: [...localAthletes],
    teams: [...localTeams],
    leagues: localLeagues.map((row) => ({
      id: normalizeId(row?.id),
      title: String(row?.currentName || "").trim(),
      sport: String(row?.sport || "").trim(),
      seasonModel: String(row?.seasonModel || "").trim(),
      frequency: String(row?.frequency || "").trim(),
    })),
    leagueSeasons: localLeagueSeasons.map((row) => ({
      id: normalizeId(row?.id),
      leagueId: normalizeId(row?.competitionId),
      seasonKey: String(row?.seasonKey || "").trim(),
      title: String(row?.label || "").trim(),
      startDate: String(row?.startDate || "").trim(),
      endDate: String(row?.endDate || "").trim(),
    })),
    lists: [...localLists],
    users: [...localUsers],
    activitySamples: [...activitySamples],
    source: "local",
  };
}

function sanitizeCatalogRows(rows = []) {
  return toArray(rows)
    .map((row) => ({ ...row, id: normalizeId(row?.id) }))
    .filter((row) => Boolean(row.id));
}

function normalizeCloudEvents(rows = []) {
  return sanitizeCatalogRows(rows).map((row) => ({
    ...row,
    teamIds: toArray(row?.teamIds).map((id) => normalizeId(id)).filter(Boolean),
    athleteIds: toArray(row?.athleteIds).map((id) => normalizeId(id)).filter(Boolean),
  }));
}

function normalizeCloudTeams(rows = []) {
  return sanitizeCatalogRows(rows).map((row) => ({
    ...row,
    athleteIds: toArray(row?.athleteIds).map((id) => normalizeId(id)).filter(Boolean),
  }));
}

function normalizeCloudLists(rows = []) {
  return sanitizeCatalogRows(rows).map((row) => ({
    ...row,
    entries: toArray(row?.entries).map((entry) => ({
      eventId: normalizeId(entry?.eventId),
      athleteId: normalizeId(entry?.athleteId),
      note: String(entry?.note || "").trim(),
      score: entry?.score == null ? undefined : Number(entry.score),
    })),
  }));
}

function buildCloudSnapshot(payload = {}, fallbackSnapshot = buildLocalSnapshot()) {
  return {
    events: normalizeCloudEvents(payload[CATALOG_COLLECTIONS.EVENTS] ?? fallbackSnapshot.events),
    athletes: sanitizeCatalogRows(payload[CATALOG_COLLECTIONS.ATHLETES] ?? fallbackSnapshot.athletes),
    teams: normalizeCloudTeams(payload[CATALOG_COLLECTIONS.TEAMS] ?? fallbackSnapshot.teams),
    leagues: sanitizeCatalogRows(payload[CATALOG_COLLECTIONS.LEAGUES] ?? fallbackSnapshot.leagues),
    leagueSeasons: sanitizeCatalogRows(payload[CATALOG_COLLECTIONS.LEAGUE_SEASONS] ?? fallbackSnapshot.leagueSeasons),
    lists: normalizeCloudLists(payload[CATALOG_COLLECTIONS.LISTS] ?? fallbackSnapshot.lists),
    users: [...localUsers],
    activitySamples: [...activitySamples],
    source: "cloud",
  };
}

const listeners = new Set();
let revision = 0;
let snapshot = buildLocalSnapshot();
let cloudEnabled = false;
let cloudUnsubscribe = null;

function notify() {
  revision += 1;
  listeners.forEach((listener) => {
    try {
      listener(revision);
    } catch {
      // noop
    }
  });
}

function setSnapshot(nextSnapshot) {
  snapshot = nextSnapshot;
  notify();
}

function clearCloudSubscription() {
  if (typeof cloudUnsubscribe === "function") {
    cloudUnsubscribe();
  }
  cloudUnsubscribe = null;
}

function enableLocalMode() {
  clearCloudSubscription();
  cloudEnabled = false;
  setSnapshot(buildLocalSnapshot());
}

async function enableCloudMode() {
  clearCloudSubscription();
  cloudEnabled = true;

  try {
    const initial = await readAllCatalogCollections();
    if (cloudEnabled) {
      setSnapshot(buildCloudSnapshot(initial, snapshot));
    }
  } catch {
    if (cloudEnabled) {
      setSnapshot(buildLocalSnapshot());
    }
  }

  cloudUnsubscribe = subscribeCatalogCollections((payload) => {
    if (!cloudEnabled) return;
    const keys = Object.keys(payload || {});
    if (!keys.length) return;
    setSnapshot(buildCloudSnapshot(payload, snapshot));
  }, () => {});
}

export function initCatalogRepository({ enableCloud = false } = {}) {
  const shouldUseCloud = Boolean(enableCloud && isFirebaseConfigured);
  if (!shouldUseCloud) {
    if (!cloudEnabled && snapshot.source === "local") return;
    enableLocalMode();
    return;
  }
  if (cloudEnabled) return;
  enableCloudMode();
}

export function subscribeCatalogRevision(listener) {
  if (typeof listener !== "function") return () => {};
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCatalogRevision() {
  return revision;
}

export function getCatalogSnapshot() {
  return snapshot;
}

export function isCatalogCloudMode() {
  return snapshot.source === "cloud";
}

export function removeCatalogObjectFromSnapshot(objectType, objectId) {
  const safeType = String(objectType || "").trim().toLowerCase();
  const safeId = normalizeId(objectId);
  if (!safeType || !safeId) return false;

  const next = {
    ...snapshot,
    events: [...snapshot.events],
    athletes: [...snapshot.athletes],
    teams: [...snapshot.teams],
    leagues: [...snapshot.leagues],
    leagueSeasons: [...snapshot.leagueSeasons],
    lists: [...snapshot.lists],
  };

  let touched = false;

  if (safeType === "event") {
    const before = next.events.length;
    next.events = next.events.filter((event) => normalizeId(event?.id) !== safeId);
    next.lists = next.lists.map((list) => ({
      ...list,
      entries: toArray(list?.entries).filter((entry) => normalizeId(entry?.eventId) !== safeId),
    }));
    touched = touched || before !== next.events.length;
  }

  if (safeType === "athlete") {
    const before = next.athletes.length;
    next.athletes = next.athletes.filter((athlete) => normalizeId(athlete?.id) !== safeId);
    next.events = next.events.map((event) => ({
      ...event,
      athleteIds: toArray(event?.athleteIds).filter((id) => normalizeId(id) !== safeId),
    }));
    next.teams = next.teams.map((team) => ({
      ...team,
      athleteIds: toArray(team?.athleteIds).filter((id) => normalizeId(id) !== safeId),
    }));
    next.lists = next.lists.map((list) => ({
      ...list,
      entries: toArray(list?.entries).filter((entry) => normalizeId(entry?.athleteId) !== safeId),
    }));
    touched = touched || before !== next.athletes.length;
  }

  if (safeType === "team") {
    const before = next.teams.length;
    next.teams = next.teams.filter((team) => normalizeId(team?.id) !== safeId);
    next.events = next.events.map((event) => ({
      ...event,
      teamIds: toArray(event?.teamIds).filter((id) => normalizeId(id) !== safeId),
    }));
    touched = touched || before !== next.teams.length;
  }

  if (safeType === "league") {
    const before = next.leagues.length;
    next.leagues = next.leagues.filter((league) => normalizeId(league?.id) !== safeId);
    next.leagueSeasons = next.leagueSeasons.filter((season) => normalizeId(season?.leagueId) !== safeId);
    touched = touched || before !== next.leagues.length;
  }

  if (safeType === "league-season") {
    const before = next.leagueSeasons.length;
    next.leagueSeasons = next.leagueSeasons.filter((season) => normalizeId(season?.id) !== safeId);
    touched = touched || before !== next.leagueSeasons.length;
  }

  if (safeType === "list") {
    const before = next.lists.length;
    next.lists = next.lists.filter((list) => normalizeId(list?.id) !== safeId);
    touched = touched || before !== next.lists.length;
  }

  if (!touched) return false;
  setSnapshot(next);
  return true;
}
