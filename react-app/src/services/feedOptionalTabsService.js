import { getAthleteById, getListById, getTeamById, getUserById } from "./catalogService";
import { getEventById } from "./eventsService";
import {
  removeUserFeedTabCloud,
  upsertUserFeedTabCloud,
} from "./feedTabsFirestoreService";
import { getLeagueById, getLeagueSeasonById } from "./leaguesService";
import {
  getSocialSyncCloudIdentity,
  isSocialDomainEnabled,
  notifyDomainDirty,
  SOCIAL_SYNC_DOMAIN,
} from "./socialSyncService";

const FEED_OPTIONAL_TABS_STORAGE_KEY = "sofa_feed_optional_tabs_v1";
const FEED_OPTIONAL_TABS_MAX = 12;

const FEED_TARGET = {
  EVENT: "event",
  USER: "user",
  LEAGUE: "league",
  LEAGUE_SEASON: "league-season",
  ATHLETE: "athlete",
  TEAM: "team",
  LIST: "list",
};

const FEED_ALLOWED_TARGET_TYPES = new Set(Object.values(FEED_TARGET));
const FEED_ALLOWED_OBJECT_MODES = new Set(["recent", "popular"]);

function readStorageArray(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorageArray(key, list) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(list));
}

function mirrorTabUpsertCloud(tab) {
  const { isCloudMode, firebaseUid } = getSocialSyncCloudIdentity();
  if (!isCloudMode || !firebaseUid || !isSocialDomainEnabled(SOCIAL_SYNC_DOMAIN.TABS)) return;
  upsertUserFeedTabCloud(firebaseUid, tab).catch(() => {});
}

function mirrorTabRemoveCloud(tabId) {
  const { isCloudMode, firebaseUid } = getSocialSyncCloudIdentity();
  if (!isCloudMode || !firebaseUid || !isSocialDomainEnabled(SOCIAL_SYNC_DOMAIN.TABS)) return;
  removeUserFeedTabCloud(firebaseUid, tabId).catch(() => {});
}

function normalizeTargetType(targetType) {
  const raw = String(targetType || "").trim().toLowerCase();
  if (!raw) return "";
  if (raw === "player") return FEED_TARGET.ATHLETE;
  return FEED_ALLOWED_TARGET_TYPES.has(raw) ? raw : "";
}

function normalizeTargetId(targetId) {
  return String(targetId || "").trim();
}

function normalizeObjectFeedMode(modeToken) {
  const raw = String(modeToken || "").trim().toLowerCase();
  if (raw === "chrono") return "recent";
  if (FEED_ALLOWED_OBJECT_MODES.has(raw)) return raw;
  return "recent";
}

export function buildOptionalFeedTabId(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId) return "";
  return `object:${safeType}:${safeId}`;
}

function doesFeedTargetExist(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId) return false;

  if (safeType === FEED_TARGET.EVENT) return Boolean(getEventById(safeId));
  if (safeType === FEED_TARGET.USER) return Boolean(getUserById(safeId));
  if (safeType === FEED_TARGET.LEAGUE) return Boolean(getLeagueById(safeId));
  if (safeType === FEED_TARGET.LEAGUE_SEASON) return Boolean(getLeagueSeasonById(safeId));
  if (safeType === FEED_TARGET.ATHLETE) return Boolean(getAthleteById(safeId));
  if (safeType === FEED_TARGET.TEAM) return Boolean(getTeamById(safeId));
  if (safeType === FEED_TARGET.LIST) return Boolean(getListById(safeId));
  return false;
}

export function getOptionalFeedTabDefaultLabel(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId) return "Feed";

  let objectLabel = "";

  if (safeType === FEED_TARGET.EVENT) {
    objectLabel = getEventById(safeId)?.title || "Evenement";
  }
  if (!objectLabel && safeType === FEED_TARGET.USER) {
    objectLabel = getUserById(safeId)?.name || "Profil";
  }
  if (!objectLabel && safeType === FEED_TARGET.LEAGUE) {
    objectLabel = getLeagueById(safeId)?.title || "Competition";
  }
  if (!objectLabel && safeType === FEED_TARGET.LEAGUE_SEASON) {
    objectLabel = getLeagueSeasonById(safeId)?.title || "Saison";
  }
  if (!objectLabel && safeType === FEED_TARGET.ATHLETE) {
    objectLabel = getAthleteById(safeId)?.name || "Athlete";
  }
  if (!objectLabel && safeType === FEED_TARGET.TEAM) {
    const team = getTeamById(safeId);
    objectLabel = team?.nameFull || team?.name || "Team";
  }
  if (!objectLabel && safeType === FEED_TARGET.LIST) {
    objectLabel = getListById(safeId)?.title || "List";
  }
  return objectLabel ? `Feed · ${objectLabel}` : "Feed";
}

function normalizeOptionalFeedTabEntry(raw) {
  if (!raw || typeof raw !== "object") return null;

  const targetType = normalizeTargetType(raw.targetType);
  const targetId = normalizeTargetId(raw.targetId);
  if (!targetType || !targetId) return null;
  if (!doesFeedTargetExist(targetType, targetId)) return null;

  const id = buildOptionalFeedTabId(targetType, targetId);
  const mode = normalizeObjectFeedMode(raw.mode);
  const fallbackLabel = getOptionalFeedTabDefaultLabel(targetType, targetId);
  const label = String(raw.label || "").trim() || fallbackLabel;
  const createdAt = Number(raw.createdAt || 0);
  const order = Number(raw.order);

  return {
    id,
    targetType,
    targetId,
    mode,
    label: label.slice(0, 80),
    createdAt: createdAt > 0 ? Math.round(createdAt) : Date.now(),
    order: Number.isFinite(order) ? Math.round(order) : (createdAt > 0 ? Math.round(createdAt) : Date.now()),
  };
}

function normalizeOptionalFeedTabs(list) {
  const input = Array.isArray(list) ? list : [];
  const byId = new Map();

  input.forEach((entry) => {
    const normalized = normalizeOptionalFeedTabEntry(entry);
    if (!normalized) return;
    const previous = byId.get(normalized.id);
    if (!previous || Number(normalized.createdAt || 0) >= Number(previous.createdAt || 0)) {
      byId.set(normalized.id, normalized);
    }
  });

  const normalizedList = Array.from(byId.values())
    .sort((a, b) => {
      const orderDiff = Number(a.order || 0) - Number(b.order || 0);
      if (orderDiff !== 0) return orderDiff;
      const createdDiff = Number(a.createdAt || 0) - Number(b.createdAt || 0);
      if (createdDiff !== 0) return createdDiff;
      return String(a.id || "").localeCompare(String(b.id || ""));
    });

  return normalizedList.length > FEED_OPTIONAL_TABS_MAX
    ? normalizedList.slice(0, FEED_OPTIONAL_TABS_MAX)
    : normalizedList;
}

function saveOptionalFeedTabs(list) {
  const normalized = normalizeOptionalFeedTabs(list);
  writeStorageArray(FEED_OPTIONAL_TABS_STORAGE_KEY, normalized);
  return normalized;
}

export function loadOptionalFeedTabs() {
  return normalizeOptionalFeedTabs(readStorageArray(FEED_OPTIONAL_TABS_STORAGE_KEY));
}

export function getOptionalFeedTabForTarget(targetType, targetId) {
  const id = buildOptionalFeedTabId(targetType, targetId);
  if (!id) return null;
  return loadOptionalFeedTabs().find((tab) => tab.id === id) || null;
}

export function isOptionalFeedTarget(targetType, targetId) {
  return Boolean(getOptionalFeedTabForTarget(targetType, targetId));
}

export function upsertOptionalFeedTab({
  targetType,
  targetId,
  mode = "recent",
  label = "",
} = {}) {
  const safeType = normalizeTargetType(targetType);
  const safeTargetId = normalizeTargetId(targetId);
  if (!safeType || !safeTargetId || !doesFeedTargetExist(safeType, safeTargetId)) {
    return {
      tabs: loadOptionalFeedTabs(),
      added: false,
      error: "invalid_target",
    };
  }

  const tabId = buildOptionalFeedTabId(safeType, safeTargetId);
  const currentTabs = loadOptionalFeedTabs();
  const existingIndex = currentTabs.findIndex((tab) => tab.id === tabId);

  if (existingIndex < 0 && currentTabs.length >= FEED_OPTIONAL_TABS_MAX) {
    return {
      tabs: currentTabs,
      added: false,
      error: "limit_reached",
    };
  }

  const fallbackLabel = getOptionalFeedTabDefaultLabel(safeType, safeTargetId);
  const finalLabel = String(label || "").trim() || fallbackLabel;
  const nextMode = normalizeObjectFeedMode(mode);
  const nextTabs = currentTabs.slice();

  if (existingIndex >= 0) {
    const current = nextTabs[existingIndex];
    nextTabs[existingIndex] = {
      ...current,
      targetType: safeType,
      targetId: safeTargetId,
      mode: nextMode,
      label: finalLabel,
      order: Number.isFinite(Number(current?.order)) ? Number(current.order) : Number(current?.createdAt || Date.now()),
    };
  } else {
    const maxOrder = nextTabs.reduce((max, tab) => Math.max(max, Number(tab?.order || 0)), 0);
    nextTabs.push({
      id: tabId,
      targetType: safeType,
      targetId: safeTargetId,
      mode: nextMode,
      label: finalLabel,
      createdAt: Date.now(),
      order: maxOrder + 1,
    });
  }

  const saved = saveOptionalFeedTabs(nextTabs);
  const createdOrUpdated = saved.find((tab) => tab.id === tabId);
  if (createdOrUpdated) {
    mirrorTabUpsertCloud(createdOrUpdated);
    notifyDomainDirty(SOCIAL_SYNC_DOMAIN.TABS);
  }

  return {
    tabs: saved,
    added: existingIndex < 0,
    error: "",
  };
}

export function removeOptionalFeedTab(tabId) {
  const safeId = String(tabId || "").trim();
  if (!safeId) return loadOptionalFeedTabs();
  const currentTabs = loadOptionalFeedTabs();
  const next = saveOptionalFeedTabs(currentTabs.filter((tab) => tab.id !== safeId));
  mirrorTabRemoveCloud(safeId);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.TABS);
  return next;
}

export function setOptionalFeedTabMode(tabId, mode) {
  const safeId = String(tabId || "").trim();
  if (!safeId) return loadOptionalFeedTabs();
  const nextMode = normalizeObjectFeedMode(mode);
  const currentTabs = loadOptionalFeedTabs();
  const nextTabs = currentTabs.map((tab) => {
    if (tab.id !== safeId) return tab;
    return {
      ...tab,
      mode: nextMode,
    };
  });
  const saved = saveOptionalFeedTabs(nextTabs);
  const updated = saved.find((tab) => tab.id === safeId);
  if (updated) {
    mirrorTabUpsertCloud(updated);
    notifyDomainDirty(SOCIAL_SYNC_DOMAIN.TABS);
  }
  return saved;
}

export function reorderOptionalFeedTabs(sourceTabId, targetTabId) {
  const sourceId = String(sourceTabId || "").trim();
  const targetId = String(targetTabId || "").trim();
  if (!sourceId || !targetId || sourceId === targetId) return loadOptionalFeedTabs();

  const currentTabs = loadOptionalFeedTabs();
  const fromIndex = currentTabs.findIndex((tab) => tab.id === sourceId);
  const toIndex = currentTabs.findIndex((tab) => tab.id === targetId);
  if (fromIndex < 0 || toIndex < 0) return currentTabs;

  const reordered = currentTabs.slice();
  const [moved] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, moved);

  const now = Date.now();
  const nextTabs = reordered.map((tab, index) => ({
    ...tab,
    order: index + 1,
    createdAt: Number(tab?.createdAt || now),
  }));

  const saved = saveOptionalFeedTabs(nextTabs);
  saved.forEach((tab) => mirrorTabUpsertCloud(tab));
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.TABS);
  return saved;
}

export function setOptionalFeedTabsOrder(tabIds = []) {
  const orderIds = Array.isArray(tabIds)
    ? tabIds.map((id) => String(id || "").trim()).filter(Boolean)
    : [];
  if (!orderIds.length) return loadOptionalFeedTabs();

  const currentTabs = loadOptionalFeedTabs();
  const byId = new Map(currentTabs.map((tab) => [tab.id, tab]));
  const seen = new Set();
  const ordered = [];

  orderIds.forEach((id) => {
    if (seen.has(id)) return;
    const tab = byId.get(id);
    if (!tab) return;
    seen.add(id);
    ordered.push(tab);
  });

  currentTabs.forEach((tab) => {
    if (seen.has(tab.id)) return;
    seen.add(tab.id);
    ordered.push(tab);
  });

  const now = Date.now();
  const nextTabs = ordered.map((tab, index) => ({
    ...tab,
    order: index + 1,
    createdAt: Number(tab?.createdAt || now),
  }));

  const saved = saveOptionalFeedTabs(nextTabs);
  saved.forEach((tab) => mirrorTabUpsertCloud(tab));
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.TABS);
  return saved;
}

export { FEED_OPTIONAL_TABS_MAX, FEED_TARGET };
