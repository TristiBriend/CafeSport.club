import { getCatalogSnapshot } from "./catalogRepositoryService";

export const EVENT_SORT = {
  DATE_DESC: "date-desc",
  DATE_ASC: "date-asc",
  SCORE_DESC: "score-desc",
  SCORE_ASC: "score-asc",
};

function toTimeValue(dateISO) {
  const value = Date.parse(dateISO || "");
  return Number.isFinite(value) ? value : 0;
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function compareByDateDesc(a, b) {
  return toTimeValue(b.dateISO) - toTimeValue(a.dateISO);
}

function compareByDateAsc(a, b) {
  return toTimeValue(a.dateISO) - toTimeValue(b.dateISO);
}

function compareByScoreDesc(a, b) {
  return (Number(b.communityScore) || 0) - (Number(a.communityScore) || 0);
}

function compareByScoreAsc(a, b) {
  return (Number(a.communityScore) || 0) - (Number(b.communityScore) || 0);
}

export function getAllEvents() {
  return getCatalogSnapshot().events;
}

export function getSports() {
  return Array.from(new Set(getAllEvents().map((event) => event.sport))).sort((a, b) => a.localeCompare(b));
}

export function getEventById(eventId) {
  return getAllEvents().find((event) => event.id === eventId) || null;
}

export function filterEvents(list, { sportFilter = "Tous", query = "" } = {}) {
  const q = normalizeText(query);
  return list.filter((event) => {
    const sportMatch = sportFilter === "Tous" || event.sport === sportFilter;
    const haystack = normalizeText(`${event.title} ${event.league} ${event.location}`);
    const queryMatch = q === "" || haystack.includes(q);
    return sportMatch && queryMatch;
  });
}

export function groupEventsBySport(list) {
  const map = new Map();
  list.forEach((event) => {
    if (!map.has(event.sport)) map.set(event.sport, []);
    map.get(event.sport).push(event);
  });
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

export function sortEvents(list, sortBy = EVENT_SORT.DATE_DESC) {
  const copy = [...list];
  if (sortBy === EVENT_SORT.SCORE_DESC) return copy.sort(compareByScoreDesc);
  if (sortBy === EVENT_SORT.SCORE_ASC) return copy.sort(compareByScoreAsc);
  if (sortBy === EVENT_SORT.DATE_ASC) return copy.sort(compareByDateAsc);
  return copy.sort(compareByDateDesc);
}

export function getWatchlistEvents(watchlistIds = []) {
  const ids = new Set(watchlistIds);
  return getAllEvents().filter((event) => ids.has(event.id));
}

export function getRelatedEvents(event, limit = 6) {
  if (!event) return [];
  const pool = getAllEvents().filter((item) => item.id !== event.id);
  const sameSport = pool.filter((item) => item.sport === event.sport);
  const sameLeague = sameSport.filter((item) => item.league === event.league);
  const primary = sortEvents(sameLeague, EVENT_SORT.SCORE_DESC);
  const secondary = sortEvents(
    sameSport.filter((item) => item.league !== event.league),
    EVENT_SORT.SCORE_DESC,
  );
  return [...primary, ...secondary].slice(0, limit);
}
