import {
  deleteFeedActionCloud,
  upsertFeedActionCloud,
} from "./feedActionsFirestoreService";
import {
  getSocialSyncCloudIdentity,
  isSocialDomainEnabled,
  notifyDomainDirty,
  SOCIAL_SYNC_DOMAIN,
} from "./socialSyncService";

const FEED_ACTIONS_KEY = "cafesport.club_feed_actions_v1";
export { FEED_ACTIONS_KEY };

export const FEED_ACTION_TYPE = {
  WATCHLIST_ADD: "watchlist_add",
  FOLLOW_ADD: "follow_add",
  LIKE_COMMENT: "like_comment",
  LIKE_REPLY: "like_reply",
  RATE_EVENT: "rate_event",
};

const ACTION_TYPES = new Set(Object.values(FEED_ACTION_TYPE));

function normalizeId(value) {
  return String(value || "").trim();
}

function toIso(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const ts = Date.parse(raw);
  if (!Number.isFinite(ts)) return "";
  return new Date(ts).toISOString();
}

function nowIso() {
  return new Date().toISOString();
}

function toActionId(actionType, targetType, targetId) {
  const safeType = String(actionType || "").trim().toLowerCase();
  const safeTargetType = String(targetType || "").trim().toLowerCase();
  const safeTargetId = normalizeId(targetId);
  if (!safeType || !safeTargetType || !safeTargetId) return "";
  return `${safeType}:${safeTargetType}:${safeTargetId}`;
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

function sanitizeMeta(meta = {}) {
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return {};
  const out = {};
  if (meta.eventId) out.eventId = normalizeId(meta.eventId);
  if (meta.score != null) {
    const score = Number(meta.score);
    if (Number.isFinite(score)) out.score = Math.max(0, Math.min(100, Math.round(score)));
  }
  if (meta.noteSnippet) out.noteSnippet = String(meta.noteSnippet).trim().slice(0, 180);
  return out;
}

function normalizeFeedAction(raw = {}) {
  const actionType = String(raw?.actionType || "").trim().toLowerCase();
  const targetType = String(raw?.targetType || "").trim().toLowerCase();
  const targetId = normalizeId(raw?.targetId);
  if (!ACTION_TYPES.has(actionType) || !targetType || !targetId) return null;
  const id = normalizeId(raw?.id) || toActionId(actionType, targetType, targetId);
  if (!id) return null;
  const createdAt = toIso(raw?.createdAt) || nowIso();
  const updatedAt = toIso(raw?.updatedAt) || createdAt;
  return {
    id,
    actionType,
    targetType,
    targetId,
    createdAt,
    updatedAt,
    meta: sanitizeMeta(raw?.meta),
  };
}
export { normalizeFeedAction };

function mirrorActionUpsert(action) {
  const { isCloudMode, firebaseUid } = getSocialSyncCloudIdentity();
  if (!isCloudMode || !firebaseUid || !isSocialDomainEnabled(SOCIAL_SYNC_DOMAIN.FEED_ACTIONS)) return;
  upsertFeedActionCloud(firebaseUid, action).catch(() => {});
}

function mirrorActionDelete(actionId) {
  const { isCloudMode, firebaseUid } = getSocialSyncCloudIdentity();
  if (!isCloudMode || !firebaseUid || !isSocialDomainEnabled(SOCIAL_SYNC_DOMAIN.FEED_ACTIONS)) return;
  deleteFeedActionCloud(firebaseUid, actionId).catch(() => {});
}

export function readFeedActions() {
  const raw = readStorageObject(FEED_ACTIONS_KEY);
  return Object.values(raw)
    .map((entry) => normalizeFeedAction(entry))
    .filter(Boolean)
    .sort((left, right) => Date.parse(right.updatedAt || "") - Date.parse(left.updatedAt || ""));
}

export function upsertFeedAction(action = {}) {
  const normalized = normalizeFeedAction(action);
  if (!normalized) return null;
  const store = readStorageObject(FEED_ACTIONS_KEY);
  const previous = normalizeFeedAction(store[normalized.id]);
  const createdAt = previous?.createdAt || normalized.createdAt || nowIso();
  const merged = {
    ...normalized,
    createdAt,
    updatedAt: nowIso(),
    meta: {
      ...(previous?.meta || {}),
      ...(normalized.meta || {}),
    },
  };
  store[merged.id] = merged;
  writeStorageObject(FEED_ACTIONS_KEY, store);
  mirrorActionUpsert(merged);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.FEED_ACTIONS);
  return merged;
}

export function deleteFeedActionById(actionId) {
  const safeId = normalizeId(actionId);
  if (!safeId) return false;
  const store = readStorageObject(FEED_ACTIONS_KEY);
  if (!(safeId in store)) return false;
  delete store[safeId];
  writeStorageObject(FEED_ACTIONS_KEY, store);
  mirrorActionDelete(safeId);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.FEED_ACTIONS);
  return true;
}

export function getFeedActions({ limit = 120, actionTypes } = {}) {
  const filter = Array.isArray(actionTypes)
    ? new Set(actionTypes.map((item) => String(item || "").trim().toLowerCase()))
    : null;
  return readFeedActions()
    .filter((entry) => (filter ? filter.has(entry.actionType) : true))
    .slice(0, Math.max(0, Number(limit) || 0));
}

export function logWatchlistAdded(event) {
  const eventId = normalizeId(event?.id);
  if (!eventId) return null;
  return upsertFeedAction({
    id: toActionId(FEED_ACTION_TYPE.WATCHLIST_ADD, "event", eventId),
    actionType: FEED_ACTION_TYPE.WATCHLIST_ADD,
    targetType: "event",
    targetId: eventId,
  });
}

export function logFollowAdded(targetType, targetId) {
  const safeTargetType = String(targetType || "").trim().toLowerCase();
  const safeTargetId = normalizeId(targetId);
  if (!safeTargetType || !safeTargetId) return null;
  return upsertFeedAction({
    id: toActionId(FEED_ACTION_TYPE.FOLLOW_ADD, safeTargetType, safeTargetId),
    actionType: FEED_ACTION_TYPE.FOLLOW_ADD,
    targetType: safeTargetType,
    targetId: safeTargetId,
  });
}

export function logCommentLiked(comment) {
  const commentId = normalizeId(comment?.id);
  if (!commentId) return null;
  const eventId = normalizeId(comment?.eventId || (comment?.targetType === "event" ? comment?.targetId : ""));
  return upsertFeedAction({
    id: toActionId(FEED_ACTION_TYPE.LIKE_COMMENT, "comment", commentId),
    actionType: FEED_ACTION_TYPE.LIKE_COMMENT,
    targetType: "comment",
    targetId: commentId,
    meta: {
      eventId,
      noteSnippet: String(comment?.note || "").trim().slice(0, 180),
    },
  });
}

export function logReplyLiked(reply, parentComment = null) {
  const replyId = normalizeId(reply?.id);
  if (!replyId) return null;
  const eventId = normalizeId(
    parentComment?.eventId
      || (parentComment?.targetType === "event" ? parentComment?.targetId : "")
      || reply?.eventId,
  );
  return upsertFeedAction({
    id: toActionId(FEED_ACTION_TYPE.LIKE_REPLY, "reply", replyId),
    actionType: FEED_ACTION_TYPE.LIKE_REPLY,
    targetType: "reply",
    targetId: replyId,
    meta: {
      eventId,
      noteSnippet: String(reply?.note || "").trim().slice(0, 180),
    },
  });
}

export function logEventRated(eventId, score) {
  const safeEventId = normalizeId(eventId);
  if (!safeEventId) return null;
  return upsertFeedAction({
    id: toActionId(FEED_ACTION_TYPE.RATE_EVENT, "event", safeEventId),
    actionType: FEED_ACTION_TYPE.RATE_EVENT,
    targetType: "event",
    targetId: safeEventId,
    meta: {
      score: Number(score || 0),
    },
  });
}
