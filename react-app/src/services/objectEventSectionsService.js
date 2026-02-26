import {
  getEventsForAthlete,
  getEventsForTeam,
  getListById,
  getUserById,
  resolveListEntries,
} from "./catalogService";
import { COMMENT_TARGET, getAllComments } from "./commentsService";
import { getEventById } from "./eventsService";
import { getLeagueById, getLeagueSeasonById } from "./leaguesService";

function toTimestamp(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function isUpcomingEvent(event) {
  const ts = toTimestamp(event?.dateISO);
  if (ts > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return ts >= today.getTime();
  }
  return String(event?.status || "").toLowerCase() !== "passe";
}

function uniqueEvents(list = []) {
  const map = new Map();
  (Array.isArray(list) ? list : []).forEach((event) => {
    const id = String(event?.id || "").trim();
    if (!id || map.has(id)) return;
    map.set(id, event);
  });
  return Array.from(map.values());
}

function sortByPopularityThenDate(events = []) {
  return [...events].sort((left, right) => {
    const reviewsDiff = Number(right?.reviews || 0) - Number(left?.reviews || 0);
    if (reviewsDiff !== 0) return reviewsDiff;
    const dateDiff = toTimestamp(left?.dateISO) - toTimestamp(right?.dateISO);
    if (dateDiff !== 0) return dateDiff;
    return Number(right?.communityScore || 0) - Number(left?.communityScore || 0);
  });
}

function sortByScore(events = []) {
  return [...events].sort((left, right) => {
    const scoreDiff = Number(right?.communityScore || 0) - Number(left?.communityScore || 0);
    if (scoreDiff !== 0) return scoreDiff;
    const reviewsDiff = Number(right?.reviews || 0) - Number(left?.reviews || 0);
    if (reviewsDiff !== 0) return reviewsDiff;
    return toTimestamp(right?.dateISO) - toTimestamp(left?.dateISO);
  });
}

export function getObjectRelatedEvents(targetType, targetId) {
  const safeType = String(targetType || "").trim();
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) return [];

  if (safeType === COMMENT_TARGET.EVENT) {
    const event = getEventById(safeId);
    return event ? [event] : [];
  }

  if (safeType === COMMENT_TARGET.ATHLETE) {
    return uniqueEvents(getEventsForAthlete(safeId));
  }

  if (safeType === COMMENT_TARGET.TEAM) {
    return uniqueEvents(getEventsForTeam(safeId));
  }

  if (safeType === COMMENT_TARGET.LEAGUE) {
    return uniqueEvents(getLeagueById(safeId)?.events || []);
  }

  if (safeType === COMMENT_TARGET.LEAGUE_SEASON) {
    return uniqueEvents(getLeagueSeasonById(safeId)?.events || []);
  }

  if (safeType === COMMENT_TARGET.LIST) {
    const list = getListById(safeId);
    return uniqueEvents(
      resolveListEntries(list)
        .filter((entry) => entry.type === "event" && entry.event?.id)
        .map((entry) => entry.event),
    );
  }

  if (safeType === COMMENT_TARGET.USER) {
    const user = getUserById(safeId);
    const comments = getAllComments().filter((comment) => {
      if (comment.userId && comment.userId === safeId) return true;
      if (user?.name && String(comment.author || "").trim() === user.name) return true;
      return false;
    });
    return uniqueEvents(
      comments
        .map((comment) => {
          const eventId = String(
            comment.eventId || (comment.targetType === COMMENT_TARGET.EVENT ? comment.targetId : ""),
          ).trim();
          return eventId ? getEventById(eventId) : null;
        })
        .filter(Boolean),
    );
  }

  return [];
}

export function getExpectedEventsForObject(targetType, targetId, limit = 6) {
  const safeLimit = Math.max(0, Number(limit) || 0);
  if (!safeLimit) return [];
  const related = getObjectRelatedEvents(targetType, targetId);
  const upcoming = related.filter((event) => isUpcomingEvent(event));
  return sortByPopularityThenDate(upcoming).slice(0, safeLimit);
}

export function getTopRatedEventsForObject(targetType, targetId, limit = 6) {
  const safeLimit = Math.max(0, Number(limit) || 0);
  if (!safeLimit) return [];
  const related = getObjectRelatedEvents(targetType, targetId);
  return sortByScore(related).slice(0, safeLimit);
}
