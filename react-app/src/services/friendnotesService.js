import { getUserById } from "./catalogService";
import { COMMENT_MODE, getEventComments } from "./commentsService";
import { readUserFollowMap } from "./userFollowService";

function normalizeId(value) {
  return String(value || "").trim();
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeImagePath(value) {
  const image = String(value || "").trim();
  if (!image) return "";
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:") || image.startsWith("blob:")) {
    return image;
  }
  return image.startsWith("/") ? image : `/${image}`;
}

function normalizeDateValue(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeHandle(value, fallbackName = "") {
  const raw = String(value || "").trim();
  if (raw) return raw.startsWith("@") ? raw : `@${raw}`;
  const safeName = String(fallbackName || "").trim().replace(/\s+/g, "").toLowerCase();
  return safeName ? `@${safeName}` : "";
}

function buildFollowedUsersById() {
  const followMap = readUserFollowMap();
  return Object.entries(followMap).reduce((acc, [userId, isFollowed]) => {
    if (!isFollowed) return acc;
    const safeId = normalizeId(userId);
    if (!safeId) return acc;
    const user = getUserById(safeId);
    acc[safeId] = user || {
      id: safeId,
      name: "",
      handle: "",
      image: "",
    };
    return acc;
  }, {});
}

export function resolveFriendnotesUser(comment, followedUsersById = {}) {
  const safeComment = comment && typeof comment === "object" ? comment : null;
  if (!safeComment) return null;

  const explicitUserId = normalizeId(safeComment.userId);
  if (explicitUserId && followedUsersById[explicitUserId]) {
    return followedUsersById[explicitUserId];
  }

  const authorToken = normalizeText(safeComment.author);
  if (!authorToken) return null;

  return Object.values(followedUsersById).find((user) => {
    const nameToken = normalizeText(user?.name);
    const handleToken = normalizeText(String(user?.handle || "").replace(/^@/, ""));
    return Boolean(
      (nameToken && nameToken === authorToken)
      || (handleToken && handleToken === authorToken.replace(/^@/, "")),
    );
  }) || null;
}

export function sortFriendnotesEntries(entries = []) {
  return [...entries].sort((left, right) => {
    const ratingDiff = Number(right?.rating || 0) - Number(left?.rating || 0);
    if (ratingDiff !== 0) return ratingDiff;

    const dateDiff = normalizeDateValue(right?.createdAt) - normalizeDateValue(left?.createdAt);
    if (dateDiff !== 0) return dateDiff;

    return String(left?.handle || left?.displayName || "")
      .localeCompare(String(right?.handle || right?.displayName || ""), "fr", { sensitivity: "base" });
  });
}

export function getFriendnotesForEvent(eventId) {
  const safeEventId = normalizeId(eventId);
  if (!safeEventId) return [];

  const followedUsersById = buildFollowedUsersById();
  if (!Object.keys(followedUsersById).length) return [];

  const latestByUser = new Map();

  getEventComments(safeEventId).forEach((comment) => {
    if (comment?.commentType !== COMMENT_MODE.REVIEW) return;
    const rating = Number(comment?.rating);
    if (!Number.isFinite(rating)) return;

    const resolvedUser = resolveFriendnotesUser(comment, followedUsersById);
    if (!resolvedUser) return;

    const userId = normalizeId(resolvedUser.id);
    if (!userId) return;

    const displayName = String(resolvedUser.name || comment.author || "Utilisateur").trim() || "Utilisateur";
    const handle = normalizeHandle(resolvedUser.handle, displayName);
    const nextEntry = {
      userId,
      displayName,
      handle,
      avatarUrl: normalizeImagePath(resolvedUser.image),
      rating: Math.max(0, Math.min(100, Math.round(rating))),
      commentId: normalizeId(comment.id),
      createdAt: String(comment.createdAt || ""),
      profilePath: `/user/${encodeURIComponent(userId)}`,
    };

    const currentEntry = latestByUser.get(userId);
    if (!currentEntry || normalizeDateValue(nextEntry.createdAt) >= normalizeDateValue(currentEntry.createdAt)) {
      latestByUser.set(userId, nextEntry);
    }
  });

  return sortFriendnotesEntries(Array.from(latestByUser.values()));
}
