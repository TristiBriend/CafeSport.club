import { setUserFollowStateCloud } from "./followsFirestoreService";
import {
  getSocialSyncCloudIdentity,
  isSocialDomainEnabled,
  notifyDomainDirty,
  SOCIAL_SYNC_DOMAIN,
} from "./socialSyncService";

const USER_FOLLOWS_KEY = "cafesport.club_user_follows";
const TARGET_FOLLOWS_KEY = "cafesport.club_target_follows_v1";

const FOLLOW_TARGET = {
  USER: "user",
  ATHLETE: "athlete",
  TEAM: "team",
  LEAGUE: "league",
  LEAGUE_SEASON: "league-season",
  LIST: "list",
};

function normalizeTargetType(targetType) {
  const token = String(targetType || "").trim().toLowerCase();
  return Object.values(FOLLOW_TARGET).includes(token) ? token : "";
}

function getTargetFollowKey(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) return "";
  return `${safeType}:${safeId}`;
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

function writeStorageObject(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function mirrorFollowToCloud(targetType, targetId, isFollowed) {
  const { isCloudMode, firebaseUid } = getSocialSyncCloudIdentity();
  if (!isCloudMode || !firebaseUid || !isSocialDomainEnabled(SOCIAL_SYNC_DOMAIN.FOLLOWS)) return;
  setUserFollowStateCloud(firebaseUid, targetType, targetId, Boolean(isFollowed)).catch(() => {});
}

export function readUserFollowMap() {
  const raw = readStorageObject(USER_FOLLOWS_KEY);
  return Object.entries(raw).reduce((acc, [userId, isFollowed]) => {
    acc[userId] = Boolean(isFollowed);
    return acc;
  }, {});
}

export function isUserFollowed(userId) {
  if (!userId) return false;
  const map = readUserFollowMap();
  return Boolean(map[userId]);
}

export function setUserFollowed(userId, isFollowed) {
  if (!userId) return false;
  const map = readUserFollowMap();
  map[userId] = Boolean(isFollowed);
  writeStorageObject(USER_FOLLOWS_KEY, map);
  mirrorFollowToCloud(FOLLOW_TARGET.USER, userId, map[userId]);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.FOLLOWS);
  return map[userId];
}

export function toggleUserFollow(userId) {
  const current = isUserFollowed(userId);
  return setUserFollowed(userId, !current);
}

export function getUserFollowerCount(userId, baseFollowers = 0) {
  const base = Number(baseFollowers) || 0;
  return base + (isUserFollowed(userId) ? 1 : 0);
}

export { FOLLOW_TARGET };

export function readTargetFollowMap() {
  const raw = readStorageObject(TARGET_FOLLOWS_KEY);
  return Object.entries(raw).reduce((acc, [key, isFollowed]) => {
    if (!String(key || "").includes(":")) return acc;
    acc[key] = Boolean(isFollowed);
    return acc;
  }, {});
}

export function isTargetFollowed(targetType, targetId) {
  const safeType = normalizeTargetType(targetType);
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) return false;
  if (safeType === FOLLOW_TARGET.USER) {
    return isUserFollowed(safeId);
  }
  const map = readTargetFollowMap();
  const key = getTargetFollowKey(safeType, safeId);
  return Boolean(map[key]);
}

export function setTargetFollowed(targetType, targetId, isFollowed) {
  const safeType = normalizeTargetType(targetType);
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) return false;
  if (safeType === FOLLOW_TARGET.USER) {
    return setUserFollowed(safeId, isFollowed);
  }
  const key = getTargetFollowKey(safeType, safeId);
  if (!key) return false;
  const map = readTargetFollowMap();
  map[key] = Boolean(isFollowed);
  writeStorageObject(TARGET_FOLLOWS_KEY, map);
  mirrorFollowToCloud(safeType, safeId, map[key]);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.FOLLOWS);
  return map[key];
}

export function toggleTargetFollow(targetType, targetId) {
  const current = isTargetFollowed(targetType, targetId);
  return setTargetFollowed(targetType, targetId, !current);
}

export function getTargetFollowerCount(targetType, targetId, baseFollowers = 0) {
  const base = Number(baseFollowers) || 0;
  return base + (isTargetFollowed(targetType, targetId) ? 1 : 0);
}

export function getAllFollowedTargets() {
  const entries = [];
  const users = readUserFollowMap();
  Object.entries(users).forEach(([userId, isFollowed]) => {
    if (!isFollowed) return;
    entries.push({
      targetType: FOLLOW_TARGET.USER,
      targetId: userId,
    });
  });

  const targetMap = readTargetFollowMap();
  Object.entries(targetMap).forEach(([key, isFollowed]) => {
    if (!isFollowed) return;
    const [targetType, ...idParts] = String(key || "").split(":");
    const targetId = idParts.join(":");
    const safeType = normalizeTargetType(targetType);
    if (!safeType || !targetId) return;
    entries.push({
      targetType: safeType,
      targetId,
    });
  });
  return entries;
}

export function getFollowedTargetIds(targetType) {
  const safeType = normalizeTargetType(targetType);
  if (!safeType) return [];
  if (safeType === FOLLOW_TARGET.USER) {
    return Object.entries(readUserFollowMap())
      .filter(([, isFollowed]) => Boolean(isFollowed))
      .map(([userId]) => userId);
  }
  return getAllFollowedTargets()
    .filter((entry) => entry.targetType === safeType)
    .map((entry) => entry.targetId);
}
