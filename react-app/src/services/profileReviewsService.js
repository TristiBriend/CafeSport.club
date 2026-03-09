import { COMMENT_MODE } from "./commentsService";
import { matchesUserIdentity } from "./profileService";

function toTimestamp(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function sortByMostRecent(comments = []) {
  return [...comments].sort(
    (left, right) => toTimestamp(right?.createdAt) - toTimestamp(left?.createdAt),
  );
}

function isReview(comment) {
  return comment?.commentType === COMMENT_MODE.REVIEW;
}

export function getUserReviews(user, allComments = []) {
  if (!user) return [];
  return sortByMostRecent(
    (Array.isArray(allComments) ? allComments : []).filter(
      (comment) => isReview(comment) && matchesUserIdentity(comment, user),
    ),
  );
}

export function getFollowedUsersReviews({ allComments = [], followedUsers = [] } = {}) {
  const safeComments = Array.isArray(allComments) ? allComments : [];
  const users = Array.isArray(followedUsers) ? followedUsers.filter(Boolean) : [];
  if (!users.length) return [];

  const byId = new Map();
  safeComments.forEach((comment) => {
    if (!isReview(comment)) return;
    if (!users.some((user) => matchesUserIdentity(comment, user))) return;
    const commentId = String(comment?.id || "").trim();
    if (!commentId || byId.has(commentId)) return;
    byId.set(commentId, comment);
  });
  return sortByMostRecent(Array.from(byId.values()));
}

