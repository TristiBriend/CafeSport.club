import { getListsForUser, getUserById, resolveListEntries } from "./catalogService";
import { COMMENT_MODE, getAllComments } from "./commentsService";
import { getEventById } from "./eventsService";

function toTimestamp(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function matchesUserComment(comment, userId, userName) {
  const safeUserId = String(userId || "").trim();
  const safeUserName = String(userName || "").trim();
  if (!comment) return false;
  if (safeUserId && String(comment.userId || "").trim() === safeUserId) return true;
  return Boolean(safeUserName && String(comment.author || "").trim() === safeUserName);
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

function resolveTopEventsFromLists(userId, limit = 5) {
  const safeLimit = Math.max(0, Number(limit) || 0);
  if (!safeLimit) return { list: null, events: [] };

  const sortedLists = getListsForUser(userId)
    .slice()
    .sort((left, right) => {
      const likesDiff = Number(right?.likes || 0) - Number(left?.likes || 0);
      if (likesDiff !== 0) return likesDiff;
      const countDiff = Number(right?.count || 0) - Number(left?.count || 0);
      if (countDiff !== 0) return countDiff;
      return String(left?.title || "").localeCompare(String(right?.title || ""), "fr");
    });

  for (let index = 0; index < sortedLists.length; index += 1) {
    const list = sortedLists[index];
    const events = uniqueEvents(
      resolveListEntries(list)
        .filter((entry) => entry.type === "event" && entry.event?.id)
        .map((entry) => entry.event),
    ).slice(0, safeLimit);
    if (events.length) return { list, events };
  }

  return { list: null, events: [] };
}

function resolveTopEventsFromReviews(user, limit = 5) {
  const safeLimit = Math.max(0, Number(limit) || 0);
  if (!safeLimit || !user) return [];

  const sorted = getAllComments()
    .filter((comment) => (
      comment.commentType === COMMENT_MODE.REVIEW
      && matchesUserComment(comment, user.id, user.name)
    ))
    .sort((left, right) => {
      const ratingDiff = Number(right?.rating || 0) - Number(left?.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return toTimestamp(right?.createdAt) - toTimestamp(left?.createdAt);
    });

  const events = [];
  const seen = new Set();

  sorted.forEach((comment) => {
    if (events.length >= safeLimit) return;
    const eventId = String(
      comment.eventId || (comment.targetType === "event" ? comment.targetId : ""),
    ).trim();
    if (!eventId || seen.has(eventId)) return;
    const event = getEventById(eventId);
    if (!event) return;
    seen.add(eventId);
    events.push(event);
  });

  return events;
}

function buildRankingListForTopEvents(user, events, source = "reviews", sourceList = null) {
  const safeEvents = uniqueEvents(events).slice(0, 5);
  const sportSet = Array.from(new Set(safeEvents.map((event) => String(event?.sport || "").trim()).filter(Boolean)));
  const sport = sportSet.length === 1 ? sportSet[0] : "Multi-sport";
  const sourceDescription = source === "list" && sourceList
    ? `Selection issue de la list "${sourceList.title}".`
    : "Selection calculee depuis ses critiques les mieux notees.";

  return {
    id: `profile-top-events-${String(user?.id || "unknown")}-${source}`,
    title: `Top 5 events de ${String(user?.name || "ce profil")}`,
    description: sourceDescription,
    count: safeEvents.length,
    sport,
    ownerId: String(user?.id || ""),
    likes: Number(sourceList?.likes || 0),
    entries: safeEvents.map((event) => ({ eventId: event.id })),
  };
}

export function getTop5EventsForUser(userId, limit = 5) {
  const safeUserId = String(userId || "").trim();
  const safeLimit = Math.max(0, Number(limit) || 0);
  const user = getUserById(safeUserId);
  if (!safeUserId || !user || !safeLimit) {
    return {
      source: "none",
      user: user || null,
      events: [],
      sourceList: null,
      rankingList: null,
    };
  }

  const fromList = resolveTopEventsFromLists(safeUserId, safeLimit);
  if (fromList.events.length) {
    return {
      source: "list",
      user,
      events: fromList.events,
      sourceList: fromList.list,
      rankingList: buildRankingListForTopEvents(user, fromList.events, "list", fromList.list),
    };
  }

  const fromReviews = resolveTopEventsFromReviews(user, safeLimit);
  return {
    source: fromReviews.length ? "reviews" : "none",
    user,
    events: fromReviews,
    sourceList: null,
    rankingList: fromReviews.length ? buildRankingListForTopEvents(user, fromReviews, "reviews") : null,
  };
}
