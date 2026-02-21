import { getAthleteById, getListById, getTeamById, getUserById } from "./catalogService";
import { getEventById } from "./eventsService";
import { getLeagueById, getLeagueSeasonById } from "./leaguesService";

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

  if (safeType === FEED_TARGET.EVENT) {
    return getEventById(safeId)?.title || "Evenement";
  }
  if (safeType === FEED_TARGET.USER) {
    return getUserById(safeId)?.name || "Profil";
  }
  if (safeType === FEED_TARGET.LEAGUE) {
    return getLeagueById(safeId)?.title || "Competition";
  }
  if (safeType === FEED_TARGET.LEAGUE_SEASON) {
    return getLeagueSeasonById(safeId)?.title || "Saison";
  }
  if (safeType === FEED_TARGET.ATHLETE) {
    return getAthleteById(safeId)?.name || "Athlete";
  }
  if (safeType === FEED_TARGET.TEAM) {
    const team = getTeamById(safeId);
    return team?.nameFull || team?.name || "Team";
  }
  if (safeType === FEED_TARGET.LIST) {
    return getListById(safeId)?.title || "List";
  }
  return "Feed";
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

  return {
    id,
    targetType,
    targetId,
    mode,
    label: label.slice(0, 80),
    createdAt: createdAt > 0 ? Math.round(createdAt) : Date.now(),
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
      const timeDiff = Number(a.createdAt || 0) - Number(b.createdAt || 0);
      if (timeDiff !== 0) return timeDiff;
      return String(a.id || "").localeCompare(String(b.id || ""));
    });

  return normalizedList.length > FEED_OPTIONAL_TABS_MAX
    ? normalizedList.slice(normalizedList.length - FEED_OPTIONAL_TABS_MAX)
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
    };
  } else {
    nextTabs.push({
      id: tabId,
      targetType: safeType,
      targetId: safeTargetId,
      mode: nextMode,
      label: finalLabel,
      createdAt: Date.now(),
    });
  }

  return {
    tabs: saveOptionalFeedTabs(nextTabs),
    added: existingIndex < 0,
    error: "",
  };
}

export function removeOptionalFeedTab(tabId) {
  const safeId = String(tabId || "").trim();
  if (!safeId) return loadOptionalFeedTabs();
  const currentTabs = loadOptionalFeedTabs();
  return saveOptionalFeedTabs(currentTabs.filter((tab) => tab.id !== safeId));
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
  return saveOptionalFeedTabs(nextTabs);
}

export { FEED_OPTIONAL_TABS_MAX, FEED_TARGET };
