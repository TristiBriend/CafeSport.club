import { events as eventsData } from "../data/modelStore";
import { deleteUserRatingCloud, setUserRatingCloud } from "./ratingsFirestoreService";
import {
  getSocialSyncCloudIdentity,
  isSocialDomainEnabled,
  notifyDomainDirty,
  SOCIAL_SYNC_DOMAIN,
} from "./socialSyncService";

const RATINGS_KEY = "cafesport.club_ratings";
let hasSeededSession = false;

function toTimeValue(dateISO) {
  const value = Date.parse(dateISO || "");
  return Number.isFinite(value) ? value : 0;
}

export function isUpcomingEvent(event) {
  const timestamp = toTimeValue(event?.dateISO);
  if (timestamp) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return timestamp >= today.getTime();
  }
  return String(event?.status || "").toLowerCase() !== "passe";
}

function normalizeScore(value) {
  const raw = Number(value);
  if (!Number.isFinite(raw)) return 0;
  const scaled = raw <= 10 ? raw * 10 : raw;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

function readStorageObject(key) {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeStorageObject(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function mirrorRatingToCloud(eventId, scoreOrNull) {
  const { isCloudMode, firebaseUid } = getSocialSyncCloudIdentity();
  if (!isCloudMode || !firebaseUid || !isSocialDomainEnabled(SOCIAL_SYNC_DOMAIN.RATINGS)) return;
  if (scoreOrNull == null) {
    deleteUserRatingCloud(firebaseUid, eventId).catch(() => {});
    return;
  }
  setUserRatingCloud(firebaseUid, eventId, scoreOrNull).catch(() => {});
}

function getAllEvents(list = null) {
  return Array.isArray(list) && list.length ? list : eventsData;
}

export function getRatingsMap({ seed = true } = {}) {
  const map = { ...readStorageObject(RATINGS_KEY) };
  if (!seed || hasSeededSession) return map;

  let changed = false;
  const allEvents = getAllEvents();

  allEvents.forEach((event) => {
    if (isUpcomingEvent(event)) return;
    if (map[event.id] == null) {
      map[event.id] = normalizeScore(event.communityScore || 0);
      changed = true;
    }
  });

  Object.keys(map).forEach((eventId) => {
    const event = allEvents.find((item) => item.id === eventId);
    if (!event) {
      delete map[eventId];
      changed = true;
      return;
    }
    if (isUpcomingEvent(event)) {
      delete map[eventId];
      changed = true;
    }
  });

  if (changed) {
    writeStorageObject(RATINGS_KEY, map);
  }
  hasSeededSession = true;
  return map;
}

export function getEventRating(eventId) {
  const map = getRatingsMap();
  return normalizeScore(map[String(eventId || "").trim()] || 0);
}

export function setEventRating(eventId, score) {
  const safeId = String(eventId || "").trim();
  if (!safeId) return 0;
  const map = getRatingsMap();
  const nextScore = normalizeScore(score);
  map[safeId] = nextScore;
  writeStorageObject(RATINGS_KEY, map);
  mirrorRatingToCloud(safeId, nextScore);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.RATINGS);
  return nextScore;
}

export function deleteEventRating(eventId) {
  const safeId = String(eventId || "").trim();
  if (!safeId) return false;
  const map = getRatingsMap();
  if (!(safeId in map)) return false;
  delete map[safeId];
  writeStorageObject(RATINGS_KEY, map);
  mirrorRatingToCloud(safeId, null);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.RATINGS);
  return true;
}

export function getRatedPastEvents() {
  const map = getRatingsMap();
  return getAllEvents()
    .map((event) => ({
      event,
      score: normalizeScore(map[event.id] || 0),
    }))
    .filter(({ event, score }) => score > 0 && !isUpcomingEvent(event))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return toTimeValue(b.event?.dateISO) - toTimeValue(a.event?.dateISO);
    });
}

export function getFavoriteSportsByRatings() {
  const counts = {};
  getRatedPastEvents().forEach(({ event }) => {
    if (!event?.sport) return;
    counts[event.sport] = (counts[event.sport] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([sport]) => sport);
}
