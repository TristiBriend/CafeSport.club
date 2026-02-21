import events from "../data/events.json";
import baseReviewSamples from "../data/baseReviewSamples.json";
import baseCommentSamples from "../data/baseCommentSamples.json";
import {
  getAthleteById,
  getEventsForAthlete,
  getEventsForTeam,
  getListById,
  getUserById,
  resolveListEntries,
} from "./catalogService";
import { getLeagueById, getLeagueSeasonById } from "./leaguesService";

const MANUAL_COMMENTS_KEY = "cafesport.club_manual_comments_v1";
const MANUAL_REPLIES_KEY = "cafesport.club_manual_replies_v1";
const REVIEW_LIKES_KEY = "cafesport.club_review_likes";
const COMMENT_LIKES_KEY = "cafesport.club_comment_likes";
const REPLY_LIKES_KEY = "cafesport.club_reply_likes";

export const COMMENT_MODE = {
  ALL: "all",
  REVIEW: "critique",
  COMMENT: "teaser",
};

export const COMMENT_TARGET = {
  EVENT: "event",
  ATHLETE: "athlete",
  TEAM: "team",
  LEAGUE: "league",
  LEAGUE_SEASON: "league-season",
  LIST: "list",
  USER: "user",
};

const TARGET_TYPES = new Set(Object.values(COMMENT_TARGET));

const reviewLines = [
  "Match intense du debut a la fin.",
  "Belle execution tactique et rythme eleve.",
  "Une rencontre solide avec un vrai scenario.",
  "Evenement maitrise, niveau global tres propre.",
];

const commentLines = [
  "Je sens une grosse ambiance pour celui-la.",
  "Je prends place devant l'ecran, ca va etre chaud.",
  "On va avoir du suspense jusqu'au bout.",
  "J'espere un finish memorable.",
];

const autoReplyLines = [
  "Je valide completement.",
  "On signe tout de suite.",
  "Tres bon point, je suis d'accord.",
  "Ca promet clairement.",
];

function clampRating(value) {
  const raw = Number(value);
  if (!Number.isFinite(raw)) return 0;
  return Math.max(0, Math.min(10, Math.round(raw)));
}

function hashCode(value) {
  let hash = 0;
  const source = String(value || "");
  for (let i = 0; i < source.length; i += 1) {
    hash = ((hash << 5) - hash) + source.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function normalizeTargetType(targetType) {
  const token = String(targetType || "").trim().toLowerCase();
  return TARGET_TYPES.has(token) ? token : "";
}

function normalizeTargetId(targetId) {
  return String(targetId || "").trim();
}

function isUpcomingEvent(event) {
  const parsed = Date.parse(event?.dateISO || "");
  if (Number.isFinite(parsed)) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return parsed >= today.getTime();
  }
  return String(event?.status || "").toLowerCase() !== "passe";
}

function getEventDateTime(event, shiftHours = 0) {
  const parsed = Date.parse(event?.dateISO || "");
  const base = Number.isFinite(parsed) ? parsed : Date.UTC(2026, 1, 9);
  const shifted = base + (shiftHours * 60 * 60 * 1000);
  return new Date(shifted).toISOString();
}

function createSeedReview(event, index = 0) {
  const seed = hashCode(event.id);
  const author = ["Nina P.", "Marcus L.", "Louise B.", "Diego M."][seed % 4];
  const rating = clampRating(Math.round(Number(event.communityScore || 7)));
  return {
    id: `seed-rev-${event.id}`,
    targetType: COMMENT_TARGET.EVENT,
    targetId: event.id,
    eventId: event.id,
    author,
    note: reviewLines[seed % reviewLines.length],
    likes: 8 + (seed % 15),
    commentType: COMMENT_MODE.REVIEW,
    rating,
    createdAt: getEventDateTime(event, 18 - (index % 6)),
    replies: [
      {
        id: `seed-rep-${event.id}-1`,
        author: "CafeSport community",
        note: autoReplyLines[seed % autoReplyLines.length],
        likes: 1 + (seed % 4),
        createdAt: getEventDateTime(event, 19 - (index % 6)),
      },
    ],
  };
}

function createSeedComment(event, index = 0) {
  const seed = hashCode(event.id);
  const author = ["Jamal T.", "Riley K.", "Nina P.", "Marcus L."][seed % 4];
  return {
    id: `seed-cmt-${event.id}`,
    targetType: COMMENT_TARGET.EVENT,
    targetId: event.id,
    eventId: event.id,
    author,
    note: commentLines[seed % commentLines.length],
    likes: 5 + (seed % 10),
    commentType: COMMENT_MODE.COMMENT,
    createdAt: getEventDateTime(event, 15 - (index % 6)),
    replies: [
      {
        id: `seed-rep-${event.id}-2`,
        author: "CafeSport community",
        note: autoReplyLines[(seed + 1) % autoReplyLines.length],
        likes: seed % 3,
        createdAt: getEventDateTime(event, 16 - (index % 6)),
      },
    ],
  };
}

function normalizeComment(raw, fallbackTarget = {}) {
  if (!raw || typeof raw !== "object") return null;
  const fallbackType = normalizeTargetType(fallbackTarget.targetType || fallbackTarget.type);
  const fallbackId = normalizeTargetId(fallbackTarget.targetId || fallbackTarget.id);
  const targetType = normalizeTargetType(raw.targetType || fallbackType || COMMENT_TARGET.EVENT);
  const targetId = normalizeTargetId(raw.targetId || raw.eventId || fallbackId);
  const note = String(raw.note || "").trim();

  if (!targetType || !targetId || !note) return null;

  const mode = raw.commentType === COMMENT_MODE.REVIEW ? COMMENT_MODE.REVIEW : COMMENT_MODE.COMMENT;
  const explicitEventId = normalizeTargetId(raw.eventId);
  const eventId = explicitEventId || (targetType === COMMENT_TARGET.EVENT ? targetId : "");

  return {
    id: String(raw.id || `manual-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`),
    targetType,
    targetId,
    eventId,
    userId: String(raw.userId || ""),
    author: String(raw.author || "Vous"),
    note,
    likes: Math.max(0, Number(raw.likes || 0)),
    commentType: mode,
    rating: mode === COMMENT_MODE.REVIEW ? clampRating(raw.rating) : undefined,
    createdAt: raw.createdAt || raw.dateTime || new Date().toISOString(),
    replies: Array.isArray(raw.replies)
      ? raw.replies.map((reply) => normalizeReply(reply)).filter(Boolean)
      : [],
  };
}

function normalizeReply(raw) {
  if (!raw || typeof raw !== "object") return null;
  const note = String(raw.note || "").trim();
  if (!note) return null;
  return {
    id: String(raw.id || `reply-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`),
    userId: String(raw.userId || ""),
    author: String(raw.author || "Utilisateur"),
    note,
    likes: Math.max(0, Number(raw.likes || 0)),
    createdAt: raw.createdAt || raw.dateTime || new Date().toISOString(),
  };
}

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

function readManualComments() {
  return readStorageArray(MANUAL_COMMENTS_KEY);
}

function writeManualComments(list) {
  writeStorageArray(MANUAL_COMMENTS_KEY, list);
}

function readStorageObject(key) {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStorageObject(key, obj) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(obj));
}

function readManualReplyMap() {
  const raw = readStorageObject(MANUAL_REPLIES_KEY);
  return Object.entries(raw).reduce((acc, [commentId, replies]) => {
    if (!Array.isArray(replies)) return acc;
    acc[commentId] = replies.map((reply) => normalizeReply(reply)).filter(Boolean);
    return acc;
  }, {});
}

function writeManualReplyMap(map) {
  writeStorageObject(MANUAL_REPLIES_KEY, map);
}

function isCommentLiked(comment) {
  const key = comment.commentType === COMMENT_MODE.REVIEW ? REVIEW_LIKES_KEY : COMMENT_LIKES_KEY;
  const likes = readStorageObject(key);
  return Boolean(likes[comment.id]);
}

function isReplyLiked(reply) {
  const likes = readStorageObject(REPLY_LIKES_KEY);
  return Boolean(likes[reply.id]);
}

function withReplyComputedLikes(reply) {
  const liked = isReplyLiked(reply);
  return {
    ...reply,
    isLiked: liked,
    totalLikes: Number(reply.likes || 0) + (liked ? 1 : 0),
  };
}

function withComputedLikes(comment) {
  const liked = isCommentLiked(comment);
  return {
    ...comment,
    isLiked: liked,
    totalLikes: Number(comment.likes || 0) + (liked ? 1 : 0),
  };
}

function withMergedReplies(comment) {
  const manualReplyMap = readManualReplyMap();
  const seededReplies = Array.isArray(comment.replies)
    ? comment.replies.map((reply) => normalizeReply(reply)).filter(Boolean)
    : [];
  const manualReplies = Array.isArray(manualReplyMap[comment.id]) ? manualReplyMap[comment.id] : [];
  return {
    ...comment,
    replies: [...seededReplies, ...manualReplies]
      .sort((a, b) => Date.parse(a.createdAt || "") - Date.parse(b.createdAt || ""))
      .map(withReplyComputedLikes),
  };
}

function sortComments(list) {
  return [...list].sort((a, b) => {
    const likesDiff = (b.totalLikes || 0) - (a.totalLikes || 0);
    if (likesDiff !== 0) return likesDiff;
    return Date.parse(b.createdAt || "") - Date.parse(a.createdAt || "");
  });
}

function dedupeComments(list) {
  const map = new Map();
  list.forEach((comment) => {
    if (!comment?.id) return;
    if (!map.has(comment.id)) {
      map.set(comment.id, comment);
    }
  });
  return Array.from(map.values());
}

function getManualCommentsNormalized() {
  return readManualComments()
    .map((item) => normalizeComment(item))
    .filter(Boolean);
}

function getSeedComments() {
  const seeded = [];

  baseReviewSamples.forEach((item, index) => {
    const normalized = normalizeComment(
      {
        ...item,
        targetType: COMMENT_TARGET.EVENT,
        targetId: item.eventId,
        commentType: COMMENT_MODE.REVIEW,
        createdAt: item.createdAt || new Date(2026, 1, 9 - (index % 14)).toISOString(),
      },
      { targetType: COMMENT_TARGET.EVENT, targetId: item.eventId },
    );
    if (normalized) seeded.push(normalized);
  });

  baseCommentSamples.forEach((item, index) => {
    const normalized = normalizeComment(
      {
        ...item,
        targetType: COMMENT_TARGET.EVENT,
        targetId: item.eventId,
        commentType: COMMENT_MODE.COMMENT,
        createdAt: item.createdAt || new Date(2026, 1, 8 - (index % 12)).toISOString(),
      },
      { targetType: COMMENT_TARGET.EVENT, targetId: item.eventId },
    );
    if (normalized) seeded.push(normalized);
  });

  const coveredEventIds = new Set(seeded.map((item) => item.eventId));
  events.forEach((event, index) => {
    if (coveredEventIds.has(event.id)) return;
    const item = isUpcomingEvent(event)
      ? createSeedComment(event, index)
      : createSeedReview(event, index);
    seeded.push(item);
  });

  return seeded;
}

const seededComments = getSeedComments();

function getPreparedComments() {
  return dedupeComments([
    ...seededComments,
    ...getManualCommentsNormalized(),
  ])
    .map(withMergedReplies)
    .map(withComputedLikes);
}

function commentMatchesTarget(comment, targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId || !comment) return false;
  return comment.targetType === safeType && comment.targetId === safeId;
}

function getRelatedEventIdsForTarget(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId) return new Set();

  if (safeType === COMMENT_TARGET.EVENT) {
    return new Set([safeId]);
  }

  if (safeType === COMMENT_TARGET.ATHLETE) {
    return new Set(getEventsForAthlete(safeId).map((event) => event.id));
  }

  if (safeType === COMMENT_TARGET.TEAM) {
    return new Set(getEventsForTeam(safeId).map((event) => event.id));
  }

  if (safeType === COMMENT_TARGET.LEAGUE) {
    const league = getLeagueById(safeId);
    return new Set((league?.events || []).map((event) => event.id));
  }

  if (safeType === COMMENT_TARGET.LEAGUE_SEASON) {
    const season = getLeagueSeasonById(safeId);
    return new Set((season?.events || []).map((event) => event.id));
  }

  if (safeType === COMMENT_TARGET.LIST) {
    const list = getListById(safeId);
    return new Set(
      resolveListEntries(list)
        .filter((entry) => entry.type === "event" && entry.event?.id)
        .map((entry) => entry.event.id),
    );
  }

  if (safeType === COMMENT_TARGET.USER) {
    const user = getUserById(safeId);
    const authored = getPreparedComments().filter((comment) => {
      if (comment.userId && comment.userId === safeId) return true;
      if (user?.name && comment.author === user.name) return true;
      return false;
    });
    return new Set(
      authored
        .map((comment) => comment.eventId || (comment.targetType === COMMENT_TARGET.EVENT ? comment.targetId : ""))
        .filter(Boolean),
    );
  }

  return new Set();
}

export function getEventComments(eventId) {
  const safeEventId = normalizeTargetId(eventId);
  if (!safeEventId) return [];
  const list = getPreparedComments().filter((comment) => {
    const directTarget = comment.targetType === COMMENT_TARGET.EVENT && comment.targetId === safeEventId;
    const legacyEvent = comment.eventId === safeEventId;
    return directTarget || legacyEvent;
  });
  return sortComments(dedupeComments(list));
}

export function getCommentsForTarget(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId) return [];

  if (safeType === COMMENT_TARGET.EVENT) {
    return getEventComments(safeId);
  }

  const allComments = getPreparedComments();
  const direct = allComments.filter((comment) => commentMatchesTarget(comment, safeType, safeId));

  const relatedEventIds = getRelatedEventIdsForTarget(safeType, safeId);
  const byRelatedEvents = relatedEventIds.size
    ? allComments.filter((comment) => (
      comment.targetType === COMMENT_TARGET.EVENT && relatedEventIds.has(comment.targetId)
    ))
    : [];

  let userAuthored = [];
  if (safeType === COMMENT_TARGET.USER) {
    const user = getUserById(safeId);
    userAuthored = allComments.filter((comment) => {
      if (comment.userId && comment.userId === safeId) return true;
      if (user?.name && comment.author === user.name) return true;
      return false;
    });
  }

  return sortComments(dedupeComments([
    ...direct,
    ...byRelatedEvents,
    ...userAuthored,
  ]));
}

export function filterCommentsByMode(comments, mode = COMMENT_MODE.ALL) {
  if (mode === COMMENT_MODE.ALL) return comments;
  return comments.filter((comment) => comment.commentType === mode);
}

export function createTargetComment(targetType, targetId, {
  mode,
  note,
  rating,
  author = "Vous",
  userId = "usr-manual",
  eventId = "",
} = {}) {
  const safeType = normalizeTargetType(targetType);
  const safeTargetId = normalizeTargetId(targetId);
  const cleanNote = String(note || "").trim();
  if (!safeType || !safeTargetId || !cleanNote) return null;

  const safeMode = mode === COMMENT_MODE.REVIEW ? COMMENT_MODE.REVIEW : COMMENT_MODE.COMMENT;
  const resolvedEventId = safeType === COMMENT_TARGET.EVENT
    ? safeTargetId
    : normalizeTargetId(eventId);

  const now = new Date().toISOString();
  const payload = {
    id: `manual-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    targetType: safeType,
    targetId: safeTargetId,
    eventId: resolvedEventId,
    userId,
    author,
    note: cleanNote,
    likes: 0,
    commentType: safeMode,
    rating: safeMode === COMMENT_MODE.REVIEW ? clampRating(rating) : undefined,
    createdAt: now,
    dateTime: now,
    replies: [],
  };

  const current = readStorageArray(MANUAL_COMMENTS_KEY);
  current.push(payload);
  writeManualComments(current);
  return normalizeComment(payload, { targetType: safeType, targetId: safeTargetId });
}

export function createEventComment(eventId, payload = {}) {
  return createTargetComment(COMMENT_TARGET.EVENT, eventId, {
    ...payload,
    eventId,
  });
}

export function toggleCommentLike(comment) {
  if (!comment?.id) return;
  const key = comment.commentType === COMMENT_MODE.REVIEW ? REVIEW_LIKES_KEY : COMMENT_LIKES_KEY;
  const likes = readStorageObject(key);
  likes[comment.id] = !likes[comment.id];
  writeStorageObject(key, likes);
}

function clearLikeEntry(key, id) {
  const likes = readStorageObject(key);
  if (!(id in likes)) return;
  delete likes[id];
  writeStorageObject(key, likes);
}

export function toggleReplyLike(reply) {
  if (!reply?.id) return;
  const likes = readStorageObject(REPLY_LIKES_KEY);
  likes[reply.id] = !likes[reply.id];
  writeStorageObject(REPLY_LIKES_KEY, likes);
}

export function createCommentReply(parentCommentId, { note, author = "Vous" }) {
  const safeParentId = String(parentCommentId || "").trim();
  const cleanNote = String(note || "").trim();
  if (!safeParentId || !cleanNote) return null;

  const newReply = normalizeReply({
    id: `reply-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    userId: "usr-manual",
    author,
    note: cleanNote,
    likes: 0,
    createdAt: new Date().toISOString(),
  });
  if (!newReply) return null;

  const replyMap = readManualReplyMap();
  const currentReplies = Array.isArray(replyMap[safeParentId]) ? replyMap[safeParentId] : [];
  replyMap[safeParentId] = [...currentReplies, newReply];
  writeManualReplyMap(replyMap);
  return newReply;
}

export function updateComment(commentId, { note, rating } = {}) {
  const safeId = String(commentId || "").trim();
  const cleanNote = String(note || "").trim();
  if (!safeId || !cleanNote) return false;

  const comments = readManualComments();
  const index = comments.findIndex((comment) => String(comment?.id || "") === safeId);
  if (index < 0) return false;

  const current = { ...comments[index] };
  current.note = cleanNote;
  if (current.commentType === COMMENT_MODE.REVIEW) {
    current.rating = clampRating(rating);
  }
  comments[index] = current;
  writeManualComments(comments);
  return true;
}

export function updateEventComment(commentId, payload = {}) {
  return updateComment(commentId, payload);
}

export function deleteComment(commentId) {
  const safeId = String(commentId || "").trim();
  if (!safeId) return false;

  const comments = readManualComments();
  const filtered = comments.filter((comment) => String(comment?.id || "") !== safeId);
  if (filtered.length === comments.length) return false;
  writeManualComments(filtered);

  const replyMap = readManualReplyMap();
  if (replyMap[safeId]) {
    delete replyMap[safeId];
    writeManualReplyMap(replyMap);
  }

  clearLikeEntry(REVIEW_LIKES_KEY, safeId);
  clearLikeEntry(COMMENT_LIKES_KEY, safeId);
  return true;
}

export function deleteEventComment(commentId) {
  return deleteComment(commentId);
}

export function updateCommentReply(parentCommentId, replyId, { note } = {}) {
  const safeParentId = String(parentCommentId || "").trim();
  const safeReplyId = String(replyId || "").trim();
  const cleanNote = String(note || "").trim();
  if (!safeParentId || !safeReplyId || !cleanNote) return false;

  const replyMap = readManualReplyMap();
  const list = Array.isArray(replyMap[safeParentId]) ? [...replyMap[safeParentId]] : [];
  const index = list.findIndex((reply) => String(reply?.id || "") === safeReplyId);
  if (index < 0) return false;
  list[index] = {
    ...list[index],
    note: cleanNote,
  };
  replyMap[safeParentId] = list;
  writeManualReplyMap(replyMap);
  return true;
}

export function deleteCommentReply(parentCommentId, replyId) {
  const safeParentId = String(parentCommentId || "").trim();
  const safeReplyId = String(replyId || "").trim();
  if (!safeParentId || !safeReplyId) return false;

  const replyMap = readManualReplyMap();
  const list = Array.isArray(replyMap[safeParentId]) ? replyMap[safeParentId] : [];
  const filtered = list.filter((reply) => String(reply?.id || "") !== safeReplyId);
  if (filtered.length === list.length) return false;
  replyMap[safeParentId] = filtered;
  writeManualReplyMap(replyMap);
  clearLikeEntry(REPLY_LIKES_KEY, safeReplyId);
  return true;
}

export function getAllComments() {
  return sortComments(getPreparedComments());
}

export function getLikedComments({ limit = 12 } = {}) {
  const reviewLikes = readStorageObject(REVIEW_LIKES_KEY);
  const commentLikes = readStorageObject(COMMENT_LIKES_KEY);
  const replyLikes = readStorageObject(REPLY_LIKES_KEY);
  const allComments = getAllComments();
  const entries = [];

  allComments.forEach((comment) => {
    const liked = Boolean(reviewLikes[comment.id]) || Boolean(commentLikes[comment.id]);
    if (liked) {
      entries.push({
        id: `comment-${comment.id}`,
        kind: "comment",
        eventId: comment.eventId || (comment.targetType === COMMENT_TARGET.EVENT ? comment.targetId : ""),
        item: comment,
      });
    }

    if (Array.isArray(comment.replies)) {
      comment.replies.forEach((reply) => {
        if (!replyLikes[reply.id]) return;
        entries.push({
          id: `reply-${reply.id}`,
          kind: "reply",
          eventId: comment.eventId || (comment.targetType === COMMENT_TARGET.EVENT ? comment.targetId : ""),
          item: {
            ...reply,
            parentCommentId: comment.id,
            parentAuthor: comment.author,
          },
        });
      });
    }
  });

  return entries
    .sort((a, b) => {
      const likesDiff = Number(b.item?.totalLikes || 0) - Number(a.item?.totalLikes || 0);
      if (likesDiff !== 0) return likesDiff;
      return Date.parse(b.item?.createdAt || "") - Date.parse(a.item?.createdAt || "");
    })
    .slice(0, Math.max(0, Number(limit) || 0));
}

export function getCommentDateLabel(comment) {
  const parsed = Date.parse(comment?.createdAt || "");
  if (!Number.isFinite(parsed)) return "";
  return new Date(parsed).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getCommentModeLabel(comment) {
  return comment?.commentType === COMMENT_MODE.REVIEW ? "Critique" : "Commentaire";
}

export function getCommentTargetLabel(targetType) {
  const safeType = normalizeTargetType(targetType);
  if (safeType === COMMENT_TARGET.EVENT) return "Evenement";
  if (safeType === COMMENT_TARGET.ATHLETE) return "Athlete";
  if (safeType === COMMENT_TARGET.TEAM) return "Team";
  if (safeType === COMMENT_TARGET.LEAGUE) return "Ligue";
  if (safeType === COMMENT_TARGET.LEAGUE_SEASON) return "Saison";
  if (safeType === COMMENT_TARGET.LIST) return "List";
  if (safeType === COMMENT_TARGET.USER) return "Profil";
  return "Objet";
}

export function isCommentTargetType(value) {
  return Boolean(normalizeTargetType(value));
}

export function getTargetCommentCount(targetType, targetId) {
  return getCommentsForTarget(targetType, targetId).length;
}

export function getTargetReviewCount(targetType, targetId) {
  return getCommentsForTarget(targetType, targetId)
    .filter((comment) => comment.commentType === COMMENT_MODE.REVIEW)
    .length;
}

export function targetHasRelatedEvents(targetType, targetId) {
  return getRelatedEventIdsForTarget(targetType, targetId).size > 0;
}

export function getTargetPrimaryEvent(targetType, targetId) {
  const eventIds = Array.from(getRelatedEventIdsForTarget(targetType, targetId));
  if (!eventIds.length) return null;
  return events.find((event) => event.id === eventIds[0]) || null;
}

export function resolveTargetCommentContext(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId) return null;

  if (safeType === COMMENT_TARGET.EVENT) {
    const event = events.find((item) => item.id === safeId) || null;
    return {
      targetType: safeType,
      targetId: safeId,
      label: event?.title || "Evenement",
    };
  }

  if (safeType === COMMENT_TARGET.ATHLETE) {
    const athlete = getAthleteById(safeId);
    return {
      targetType: safeType,
      targetId: safeId,
      label: athlete?.name || "Athlete",
    };
  }

  if (safeType === COMMENT_TARGET.TEAM) {
    const teamEvents = getEventsForTeam(safeId);
    return {
      targetType: safeType,
      targetId: safeId,
      label: teamEvents[0]?.league || "Team",
    };
  }

  if (safeType === COMMENT_TARGET.LEAGUE) {
    const league = getLeagueById(safeId);
    return {
      targetType: safeType,
      targetId: safeId,
      label: league?.title || "Ligue",
    };
  }

  if (safeType === COMMENT_TARGET.LEAGUE_SEASON) {
    const season = getLeagueSeasonById(safeId);
    return {
      targetType: safeType,
      targetId: safeId,
      label: season?.title || "Saison",
    };
  }

  if (safeType === COMMENT_TARGET.LIST) {
    const list = getListById(safeId);
    return {
      targetType: safeType,
      targetId: safeId,
      label: list?.title || "List",
    };
  }

  if (safeType === COMMENT_TARGET.USER) {
    const user = getUserById(safeId);
    return {
      targetType: safeType,
      targetId: safeId,
      label: user?.name || "Profil",
    };
  }

  return {
    targetType: safeType,
    targetId: safeId,
    label: safeId,
  };
}
