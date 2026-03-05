import { toScore100 } from "../data/modelStore";
import baseReviewSamples from "../data/baseReviewSamples.json";
import baseCommentSamples from "../data/baseCommentSamples.json";
import {
  deleteCommentCloud,
  deleteReplyCloud,
  renameAuthoredCloudContent,
  registerCommentImpressionCloud,
  setCommentLikeStateCloud,
  setReplyLikeStateCloud,
  upsertCommentCloud,
  upsertReplyCloud,
} from "./commentsFirestoreService";
import {
  getAthleteById,
  getEventsForAthlete,
  getEventsForTeam,
  getListById,
  getTeamById,
  getUserById,
  resolveListEntries,
} from "./catalogService";
import { getLeagueById, getLeagueSeasonById } from "./leaguesService";
import { getAllEvents, getEventById } from "./eventsService";
import {
  getSocialSyncCloudIdentity,
  getSocialSyncSnapshot,
  isSocialDomainEnabled,
  notifyDomainDirty,
  SOCIAL_SYNC_DOMAIN,
} from "./socialSyncService";
import { createCommentId, createReplyId } from "./idService";
import {
  getCurrentProfileUserId,
  matchesUserIdentity,
  resolvePublicIdentity,
} from "./profileService";
import {
  doesCommentMatchEventViaMentions,
  doesCommentOrReplyMentionTarget,
  doesMentionListIncludeTarget,
  getReplyIdsMatchingEventViaMentions,
  getReplyIdsMatchingTarget,
  normalizeCommentMentions,
} from "./commentMentionsService";
import { logCommentLiked, logReplyLiked } from "./feedActionsService";

const MANUAL_COMMENTS_KEY = "cafesport.club_manual_comments_v1";
const MANUAL_REPLIES_KEY = "cafesport.club_manual_replies_v1";
const REVIEW_LIKES_KEY = "cafesport.club_review_likes";
const COMMENT_LIKES_KEY = "cafesport.club_comment_likes";
const REPLY_LIKES_KEY = "cafesport.club_reply_likes";
const COMMENT_IMPRESSIONS_KEY = "cafesport.club_comment_impressions";
const COMMENT_IMPRESSIONS_SESSION_KEY = "cafesport.club_comment_impressions_session";

export const COMMENT_MODE = {
  ALL: "all",
  REVIEW: "critique",
  COMMENT: "teaser",
};

export const COMMENT_FEED_SORT = {
  RECENT: "recent",
  POPULAR: "popular",
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
const REVIEW_ALLOWED_TARGETS = new Set([
  COMMENT_TARGET.EVENT,
  COMMENT_TARGET.LEAGUE,
  COMMENT_TARGET.LEAGUE_SEASON,
]);

export function isReviewAllowedTarget(targetType) {
  const safeType = normalizeTargetType(targetType);
  return REVIEW_ALLOWED_TARGETS.has(safeType);
}

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
  return toScore100(raw);
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

function resolveAuthoredDisplayName(userId, explicitAuthor = "", fallbackLabel = "Utilisateur") {
  const safeUserId = normalizeTargetId(userId);
  const author = String(explicitAuthor || "").trim();
  if (author && author !== "Vous" && author !== "Utilisateur") {
    return author;
  }
  if (!safeUserId) {
    return author || fallbackLabel;
  }
  if (safeUserId) {
    const fallbackUser = getUserById(safeUserId);
    const identity = resolvePublicIdentity(safeUserId, { fallbackUser });
    if (identity?.displayName && (!author || author === "Vous" || author === "Utilisateur")) {
      return identity.displayName;
    }
    if (identity?.displayName && author === identity.displayName) {
      return identity.displayName;
    }
    if (!author) {
      return identity?.displayName || fallbackLabel;
    }
  }
  return author || fallbackLabel;
}

function resolveCurrentCommentIdentity(userId = "", author = "") {
  const cloudIdentity = getCloudIdentity();
  const preferredUserId = normalizeTargetId(userId)
    || normalizeTargetId(getCurrentProfileUserId())
    || normalizeTargetId(cloudIdentity?.appUserId)
    || "usr-manual";
  return {
    userId: preferredUserId,
    author: resolveAuthoredDisplayName(preferredUserId, author, "Vous"),
  };
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
  const rating = clampRating(Number(event.communityScore || 80));
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

  const mode = raw.commentType === COMMENT_MODE.REVIEW && isReviewAllowedTarget(targetType)
    ? COMMENT_MODE.REVIEW
    : COMMENT_MODE.COMMENT;
  const explicitEventId = normalizeTargetId(raw.eventId);
  const eventId = explicitEventId || (targetType === COMMENT_TARGET.EVENT ? targetId : "");

  return {
    id: String(raw.id || createCommentId()),
    targetType,
    targetId,
    eventId,
    userId: String(raw.userId || ""),
    author: resolveAuthoredDisplayName(raw.userId, raw.author, "Vous"),
    note,
    likes: Math.max(0, Number(raw.likes || 0)),
    commentType: mode,
    rating: mode === COMMENT_MODE.REVIEW ? clampRating(raw.rating) : undefined,
    mentions: normalizeCommentMentions(raw.mentions),
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
    id: String(raw.id || createReplyId()),
    userId: String(raw.userId || ""),
    author: resolveAuthoredDisplayName(raw.userId, raw.author, "Utilisateur"),
    note,
    mentions: normalizeCommentMentions(raw.mentions),
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

function readSessionObject(key) {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(key);
    const parsed = JSON.parse(raw || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeSessionObject(key, obj) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(key, JSON.stringify(obj));
}

function getCloudIdentity() {
  const identity = getSocialSyncCloudIdentity();
  if (!identity.isCloudMode || !identity.firebaseUid) return null;
  if (!isSocialDomainEnabled(SOCIAL_SYNC_DOMAIN.COMMENTS)) return null;
  return identity;
}

function mirrorCommentUpsert(rawComment) {
  const identity = getCloudIdentity();
  if (!identity) return;
  const safe = normalizeComment(rawComment);
  if (!safe) return;
  upsertCommentCloud({
    ...safe,
    firebaseUid: identity.firebaseUid,
  }).catch(() => {});
}

function mirrorCommentDelete(commentId) {
  const identity = getCloudIdentity();
  if (!identity) return;
  deleteCommentCloud(commentId).catch(() => {});
}

function mirrorReplyUpsert(parentCommentId, rawReply) {
  const identity = getCloudIdentity();
  if (!identity) return;
  const safeParent = String(parentCommentId || "").trim();
  const safeReply = normalizeReply(rawReply);
  if (!safeParent || !safeReply) return;
  upsertReplyCloud(safeParent, {
    ...safeReply,
    firebaseUid: identity.firebaseUid,
  }).catch(() => {});
}

function mirrorReplyDelete(parentCommentId, replyId) {
  const identity = getCloudIdentity();
  if (!identity) return;
  deleteReplyCloud(parentCommentId, replyId).catch(() => {});
}

function mirrorCommentLike(comment, nextLiked) {
  const identity = getCloudIdentity();
  if (!identity) return;
  setCommentLikeStateCloud(identity.firebaseUid, comment, nextLiked).catch(() => {});
}

function mirrorReplyLike(reply, nextLiked) {
  const identity = getCloudIdentity();
  if (!identity) return;
  const safeParentId = String(reply?.parentCommentId || "").trim();
  const safeReplyId = String(reply?.id || "").trim();
  if (!safeParentId || !safeReplyId) return;
  setReplyLikeStateCloud(identity.firebaseUid, safeParentId, safeReplyId, nextLiked).catch(() => {});
}

function mirrorCommentImpression(commentId) {
  const identity = getCloudIdentity();
  if (!identity) return;
  registerCommentImpressionCloud(identity.firebaseUid, commentId).catch(() => {});
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
    totalImpressions: getCommentImpressions(comment.id),
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
      .map((reply) => withReplyComputedLikes({ ...reply, parentCommentId: comment.id })),
  };
}

function sortComments(list) {
  return [...list].sort((a, b) => {
    const likesDiff = (b.totalLikes || 0) - (a.totalLikes || 0);
    if (likesDiff !== 0) return likesDiff;
    return Date.parse(b.createdAt || "") - Date.parse(a.createdAt || "");
  });
}

function normalizeCommentFeedSort(sort) {
  const token = String(sort || "").trim().toLowerCase();
  return token === COMMENT_FEED_SORT.POPULAR
    ? COMMENT_FEED_SORT.POPULAR
    : COMMENT_FEED_SORT.RECENT;
}

function compareCommentsForFeed(left, right, sort) {
  const safeSort = normalizeCommentFeedSort(sort);
  if (safeSort === COMMENT_FEED_SORT.POPULAR) {
    const likesDiff = Number(right?.totalLikes || right?.likes || 0) - Number(left?.totalLikes || left?.likes || 0);
    if (likesDiff !== 0) return likesDiff;
  }
  return Date.parse(right?.createdAt || "") - Date.parse(left?.createdAt || "");
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

function normalizeMatchedReplyIds(list) {
  const ids = new Set(
    (Array.isArray(list) ? list : [])
      .map((replyId) => String(replyId || "").trim())
      .filter(Boolean),
  );
  return Array.from(ids);
}

function applyCommentViewContext(comment, matchedReplyIds = []) {
  if (!comment?.id) return comment;
  const safeMatchedReplyIds = normalizeMatchedReplyIds(matchedReplyIds);
  const { viewContext: _ignoredViewContext, ...baseComment } = comment;
  if (!safeMatchedReplyIds.length) {
    return baseComment;
  }
  return {
    ...baseComment,
    viewContext: {
      forceReplyThreadOpen: true,
      matchedReplyIds: safeMatchedReplyIds,
    },
  };
}

function mergeCommentsWithViewContext(entries = []) {
  const map = new Map();

  (Array.isArray(entries) ? entries : []).forEach((entry) => {
    const comment = entry?.comment || entry;
    const commentId = String(comment?.id || "").trim();
    if (!commentId) return;

    const nextMatchedReplyIds = normalizeMatchedReplyIds(entry?.matchedReplyIds);
    if (!map.has(commentId)) {
      map.set(commentId, {
        comment,
        matchedReplyIds: nextMatchedReplyIds,
      });
      return;
    }

    const existing = map.get(commentId);
    map.set(commentId, {
      comment: existing?.comment || comment,
      matchedReplyIds: normalizeMatchedReplyIds([
        ...(existing?.matchedReplyIds || []),
        ...nextMatchedReplyIds,
      ]),
    });
  });

  return Array.from(map.values()).map((entry) => (
    applyCommentViewContext(entry.comment, entry.matchedReplyIds)
  ));
}

function getManualCommentsNormalized() {
  return sanitizeManualCommentsStorage()
    .map((item) => normalizeComment(item))
    .filter(Boolean);
}

function removeIdsFromStorageObject(key, ids = []) {
  const safeIds = new Set(
    (Array.isArray(ids) ? ids : [])
      .map((id) => String(id || "").trim())
      .filter(Boolean),
  );
  if (!safeIds.size) return;
  const map = readStorageObject(key);
  let changed = false;
  safeIds.forEach((id) => {
    if (!(id in map)) return;
    delete map[id];
    changed = true;
  });
  if (changed) {
    writeStorageObject(key, map);
  }
}

function removeIdsFromSessionObject(key, ids = []) {
  const safeIds = new Set(
    (Array.isArray(ids) ? ids : [])
      .map((id) => String(id || "").trim())
      .filter(Boolean),
  );
  if (!safeIds.size) return;
  const map = readSessionObject(key);
  let changed = false;
  safeIds.forEach((id) => {
    if (!(id in map)) return;
    delete map[id];
    changed = true;
  });
  if (changed) {
    writeSessionObject(key, map);
  }
}

function sanitizeManualCommentsStorage() {
  const manual = readManualComments();
  if (!manual.length) return manual;

  const invalidReviewIds = [];
  const filtered = manual.filter((comment) => {
    const targetType = normalizeTargetType(comment?.targetType || comment?.type || "");
    const isReview = comment?.commentType === COMMENT_MODE.REVIEW;
    const isValid = !isReview || isReviewAllowedTarget(targetType);
    if (!isValid) {
      invalidReviewIds.push(String(comment?.id || "").trim());
    }
    return isValid;
  });

  const safeInvalidIds = invalidReviewIds.filter(Boolean);
  if (!safeInvalidIds.length) return manual;

  writeManualComments(filtered);

  const replyMap = readStorageObject(MANUAL_REPLIES_KEY);
  const removedReplyIds = [];
  let replyMapChanged = false;
  safeInvalidIds.forEach((commentId) => {
    const replies = Array.isArray(replyMap[commentId]) ? replyMap[commentId] : [];
    replies.forEach((reply) => {
      const replyId = String(reply?.id || "").trim();
      if (replyId) removedReplyIds.push(replyId);
    });
    if (commentId in replyMap) {
      delete replyMap[commentId];
      replyMapChanged = true;
    }
  });
  if (replyMapChanged) {
    writeStorageObject(MANUAL_REPLIES_KEY, replyMap);
  }

  removeIdsFromStorageObject(REVIEW_LIKES_KEY, safeInvalidIds);
  removeIdsFromStorageObject(COMMENT_LIKES_KEY, safeInvalidIds);
  removeIdsFromStorageObject(COMMENT_IMPRESSIONS_KEY, safeInvalidIds);
  removeIdsFromSessionObject(COMMENT_IMPRESSIONS_SESSION_KEY, safeInvalidIds);
  removeIdsFromStorageObject(REPLY_LIKES_KEY, removedReplyIds);

  return filtered;
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
  getAllEvents().forEach((event, index) => {
    if (coveredEventIds.has(event.id)) return;
    const item = isUpcomingEvent(event)
      ? createSeedComment(event, index)
      : createSeedReview(event, index);
    seeded.push(item);
  });

  return seeded;
}

const seededComments = getSeedComments();
let preparedCommentsCacheRevision = -1;
let preparedCommentsCache = [];

function getPreparedComments() {
  const commentsRevision = Number(getSocialSyncSnapshot()?.revisionByDomain?.comments || 0);
  if (preparedCommentsCacheRevision === commentsRevision) {
    return preparedCommentsCache;
  }
  preparedCommentsCache = dedupeComments([
    ...seededComments,
    ...getManualCommentsNormalized(),
  ])
    .map(withMergedReplies)
    .map(withComputedLikes);
  preparedCommentsCacheRevision = commentsRevision;
  return preparedCommentsCache;
}

function commentMatchesTarget(comment, targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId || !comment) return false;
  if (comment.targetType === safeType && comment.targetId === safeId) return true;
  if (safeType !== COMMENT_TARGET.ATHLETE && safeType !== COMMENT_TARGET.TEAM) return false;
  return doesMentionListIncludeTarget(comment.mentions, safeType, safeId);
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
      return matchesUserIdentity(comment, user);
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
  const list = getPreparedComments().flatMap((comment) => {
    const directTarget = comment.targetType === COMMENT_TARGET.EVENT && comment.targetId === safeEventId;
    const linkedEvent = comment.eventId === safeEventId;
    const mentionedEvent = doesCommentMatchEventViaMentions(comment, safeEventId);
    const matchedReplyIds = getReplyIdsMatchingEventViaMentions(comment, safeEventId);
    if (!directTarget && !linkedEvent && !mentionedEvent && !matchedReplyIds.length) {
      return [];
    }
    return [{
      comment,
      matchedReplyIds,
    }];
  });
  return sortComments(mergeCommentsWithViewContext(list));
}

export function getCommentsForTarget(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId) return [];

  if (safeType === COMMENT_TARGET.EVENT) {
    return getEventComments(safeId);
  }

  const allComments = getPreparedComments();
  const relatedEventIds = getRelatedEventIdsForTarget(safeType, safeId);
  const targetUser = safeType === COMMENT_TARGET.USER ? getUserById(safeId) : null;
  const list = allComments.flatMap((comment) => {
    const matchedReplyIds = getReplyIdsMatchingTarget(comment, safeType, safeId);
    const direct = commentMatchesTarget(comment, safeType, safeId);
    const byRelatedEvents = relatedEventIds.size
      && comment.targetType === COMMENT_TARGET.EVENT
      && relatedEventIds.has(comment.targetId);
    const byMention = (
      safeType === COMMENT_TARGET.ATHLETE || safeType === COMMENT_TARGET.TEAM
    ) && doesCommentOrReplyMentionTarget(comment, safeType, safeId);

    let userAuthored = false;
    if (safeType === COMMENT_TARGET.USER) {
      userAuthored = matchedReplyIds.length > 0;
      if (!userAuthored) {
        userAuthored = Boolean(
          (comment.userId && comment.userId === safeId)
          || matchesUserIdentity(comment, targetUser),
        );
      }
    }

    if (!direct && !byRelatedEvents && !byMention && !userAuthored) {
      return [];
    }

    return [{
      comment,
      matchedReplyIds,
    }];
  });

  return sortComments(mergeCommentsWithViewContext(list));
}

export function getCommentFeedForTarget(targetType, targetId, {
  sort = COMMENT_FEED_SORT.RECENT,
  limit,
} = {}) {
  const sorted = getCommentsForTarget(targetType, targetId)
    .slice()
    .sort((left, right) => compareCommentsForFeed(left, right, sort));

  if (!Number.isFinite(Number(limit))) return sorted;
  const safeLimit = Math.max(0, Number(limit));
  return sorted.slice(0, safeLimit);
}

export function filterCommentsByMode(comments, mode = COMMENT_MODE.ALL) {
  if (mode === COMMENT_MODE.ALL) return comments;
  return comments.filter((comment) => comment.commentType === mode);
}

export function createTargetComment(targetType, targetId, {
  mode,
  note,
  rating,
  author = "",
  userId = "",
  eventId = "",
  mentions = [],
} = {}) {
  const safeType = normalizeTargetType(targetType);
  const safeTargetId = normalizeTargetId(targetId);
  const cleanNote = String(note || "").trim();
  if (!safeType || !safeTargetId || !cleanNote) return null;

  const canReview = isReviewAllowedTarget(safeType);
  const safeMode = mode === COMMENT_MODE.REVIEW && canReview ? COMMENT_MODE.REVIEW : COMMENT_MODE.COMMENT;
  const resolvedEventId = safeType === COMMENT_TARGET.EVENT
    ? safeTargetId
    : normalizeTargetId(eventId);
  const identity = resolveCurrentCommentIdentity(userId, author);

  const now = new Date().toISOString();
  const payload = {
    id: createCommentId(),
    targetType: safeType,
    targetId: safeTargetId,
    eventId: resolvedEventId,
    userId: identity.userId,
    author: identity.author,
    note: cleanNote,
    likes: 0,
    commentType: safeMode,
    rating: safeMode === COMMENT_MODE.REVIEW ? clampRating(rating) : undefined,
    mentions: normalizeCommentMentions(mentions),
    createdAt: now,
    dateTime: now,
    replies: [],
  };

  const current = readStorageArray(MANUAL_COMMENTS_KEY);
  current.push(payload);
  writeManualComments(current);
  mirrorCommentUpsert(payload);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
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
  const nextLiked = !likes[comment.id];
  likes[comment.id] = nextLiked;
  writeStorageObject(key, likes);
  mirrorCommentLike(comment, nextLiked);
  if (nextLiked) {
    logCommentLiked(comment);
  }
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
}

export function getCommentImpressions(commentId) {
  const safeId = String(commentId || "").trim();
  if (!safeId) return 0;
  const impressions = readStorageObject(COMMENT_IMPRESSIONS_KEY);
  return Math.max(0, Number(impressions[safeId] || 0));
}

export function registerCommentImpression(commentId, { oncePerSession = true } = {}) {
  const safeId = String(commentId || "").trim();
  if (!safeId) return 0;

  if (oncePerSession) {
    const seen = readSessionObject(COMMENT_IMPRESSIONS_SESSION_KEY);
    if (seen[safeId]) return getCommentImpressions(safeId);
  }

  const impressions = readStorageObject(COMMENT_IMPRESSIONS_KEY);
  const next = Math.max(0, Number(impressions[safeId] || 0)) + 1;
  impressions[safeId] = next;
  writeStorageObject(COMMENT_IMPRESSIONS_KEY, impressions);

  if (oncePerSession) {
    const seen = readSessionObject(COMMENT_IMPRESSIONS_SESSION_KEY);
    seen[safeId] = 1;
    writeSessionObject(COMMENT_IMPRESSIONS_SESSION_KEY, seen);
  }

  mirrorCommentImpression(safeId);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
  return next;
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
  const nextLiked = !likes[reply.id];
  likes[reply.id] = nextLiked;
  writeStorageObject(REPLY_LIKES_KEY, likes);
  mirrorReplyLike(reply, nextLiked);
  if (nextLiked) {
    const parentComment = getPreparedComments().find((comment) => (
      Array.isArray(comment?.replies) && comment.replies.some((item) => item?.id === reply.id)
    )) || null;
    logReplyLiked(reply, parentComment);
  }
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
}

export function createCommentReply(parentCommentId, { note, author = "", userId = "", mentions = [] } = {}) {
  const safeParentId = String(parentCommentId || "").trim();
  const cleanNote = String(note || "").trim();
  if (!safeParentId || !cleanNote) return null;

  const identity = resolveCurrentCommentIdentity(userId, author);
  const newReply = normalizeReply({
    id: createReplyId(),
    userId: identity.userId,
    author: identity.author,
    note: cleanNote,
    mentions: normalizeCommentMentions(mentions),
    likes: 0,
    createdAt: new Date().toISOString(),
  });
  if (!newReply) return null;

  const replyMap = readManualReplyMap();
  const currentReplies = Array.isArray(replyMap[safeParentId]) ? replyMap[safeParentId] : [];
  replyMap[safeParentId] = [...currentReplies, newReply];
  writeManualReplyMap(replyMap);
  mirrorReplyUpsert(safeParentId, newReply);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
  return newReply;
}

export async function renameAuthoredContentForUser(userId, nextDisplayName, { syncCloud = true } = {}) {
  const safeUserId = normalizeTargetId(userId);
  const safeDisplayName = String(nextDisplayName || "").trim();
  if (!safeUserId || !safeDisplayName) return false;

  let changed = false;

  const comments = readManualComments();
  const nextComments = comments.map((comment) => {
    if (String(comment?.userId || "").trim() !== safeUserId) return comment;
    changed = true;
    return {
      ...comment,
      author: safeDisplayName,
    };
  });
  if (changed) {
    writeManualComments(nextComments);
  }

  const replyMap = readManualReplyMap();
  let repliesChanged = false;
  const nextReplyMap = Object.entries(replyMap).reduce((acc, [commentId, replies]) => {
    const nextReplies = (Array.isArray(replies) ? replies : []).map((reply) => {
      if (String(reply?.userId || "").trim() !== safeUserId) return reply;
      repliesChanged = true;
      return {
        ...reply,
        author: safeDisplayName,
      };
    });
    acc[commentId] = nextReplies;
    return acc;
  }, {});
  if (repliesChanged) {
    writeManualReplyMap(nextReplyMap);
    changed = true;
  }

  const cloudIdentity = getCloudIdentity();
  if (syncCloud && cloudIdentity?.appUserId === safeUserId) {
    try {
      await renameAuthoredCloudContent(safeUserId, safeDisplayName);
      changed = true;
    } catch {
      // Keep local rename even if cloud sync fails.
    }
  }

  if (changed) {
    notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
  }
  return changed;
}

export function updateComment(commentId, { note, rating, mentions } = {}) {
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
  if (mentions !== undefined) {
    current.mentions = normalizeCommentMentions(mentions);
  }
  comments[index] = current;
  writeManualComments(comments);
  mirrorCommentUpsert(current);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
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

  const impressions = readStorageObject(COMMENT_IMPRESSIONS_KEY);
  if (safeId in impressions) {
    delete impressions[safeId];
    writeStorageObject(COMMENT_IMPRESSIONS_KEY, impressions);
  }

  const seen = readSessionObject(COMMENT_IMPRESSIONS_SESSION_KEY);
  if (safeId in seen) {
    delete seen[safeId];
    writeSessionObject(COMMENT_IMPRESSIONS_SESSION_KEY, seen);
  }

  mirrorCommentDelete(safeId);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
  return true;
}

export function deleteEventComment(commentId) {
  return deleteComment(commentId);
}

export function updateCommentReply(parentCommentId, replyId, { note, mentions } = {}) {
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
    ...(mentions !== undefined ? { mentions: normalizeCommentMentions(mentions) } : {}),
  };
  replyMap[safeParentId] = list;
  writeManualReplyMap(replyMap);
  mirrorReplyUpsert(safeParentId, list[index]);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
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
  mirrorReplyDelete(safeParentId, safeReplyId);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.COMMENTS);
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
          parentComment: comment,
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
  return getEventById(eventIds[0]);
}

export function resolveTargetCommentContext(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = normalizeTargetId(targetId);
  if (!safeType || !safeId) return null;

  if (safeType === COMMENT_TARGET.EVENT) {
    const event = getEventById(safeId);
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
    const team = getTeamById(safeId);
    return {
      targetType: safeType,
      targetId: safeId,
      label: team?.nameFull || team?.name || "Team",
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
