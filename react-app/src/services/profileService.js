import { users } from "../data/modelStore";
import { upsertPublicProfileOverride } from "./profileFirestoreService";
import {
  getSocialSyncCloudIdentity,
  isSocialDomainEnabled,
  notifyDomainDirty,
  SOCIAL_SYNC_DOMAIN,
} from "./socialSyncService";

const PROFILE_USER_ID_KEY = "cafesport.club_profile_user_id";
const PROFILE_AVATAR_OVERRIDES_KEY = "cafesport.club_profile_avatar_overrides";
const PROFILE_DETAILS_OVERRIDES_KEY = "cafesport.club_profile_details_overrides_v1";

const PROFILE_DETAIL_KEYS = [
  "age",
  "city",
  "bioLong",
  "favoriteTeam",
  "favoriteTeamIds",
  "favoriteAthlete",
  "favoriteAthleteIds",
  "topEventIds",
  "quote",
];

function getKnownUserIds() {
  return new Set((Array.isArray(users) ? users : []).map((user) => String(user?.id || "").trim()).filter(Boolean));
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

function isValidAvatarValue(value) {
  const safeValue = String(value || "").trim();
  if (!safeValue) return false;
  if (safeValue.startsWith("data:image/")) return true;
  if (safeValue.startsWith("https://") || safeValue.startsWith("http://")) return true;
  return false;
}

function mirrorProfilePatchToCloud(userId, patch) {
  const safeUserId = String(userId || "").trim();
  const { isCloudMode, firebaseUid, appUserId } = getSocialSyncCloudIdentity();
  if (!isCloudMode || !firebaseUid || !appUserId || appUserId !== safeUserId) return;
  if (!isSocialDomainEnabled(SOCIAL_SYNC_DOMAIN.PROFILE)) return;
  upsertPublicProfileOverride(appUserId, firebaseUid, patch).catch(() => {});
}

export function getCurrentProfileUserId(fallbackUserId = "") {
  const safeFallback = String(fallbackUserId || "").trim();
  const knownIds = getKnownUserIds();
  if (typeof window === "undefined") {
    if (safeFallback && knownIds.has(safeFallback)) return safeFallback;
    return (users[0]?.id || "");
  }
  const raw = String(window.localStorage.getItem(PROFILE_USER_ID_KEY) || "").trim();
  if (raw && knownIds.has(raw)) return raw;
  if (safeFallback && knownIds.has(safeFallback)) return safeFallback;
  return (users[0]?.id || "");
}

export function setCurrentProfileUserId(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return "";
  const knownIds = getKnownUserIds();
  if (!knownIds.has(safeUserId)) return "";
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PROFILE_USER_ID_KEY, safeUserId);
  }
  return safeUserId;
}

export function getProfileAvatarOverride(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return "";
  const map = readStorageObject(PROFILE_AVATAR_OVERRIDES_KEY);
  const value = String(map[safeUserId] || "").trim();
  if (!isValidAvatarValue(value)) return "";
  return value;
}

export function setProfileAvatarOverride(userId, avatarValue) {
  const safeUserId = String(userId || "").trim();
  const safeAvatarValue = String(avatarValue || "").trim();
  if (!safeUserId || !isValidAvatarValue(safeAvatarValue)) return "";
  const map = readStorageObject(PROFILE_AVATAR_OVERRIDES_KEY);
  map[safeUserId] = safeAvatarValue;
  writeStorageObject(PROFILE_AVATAR_OVERRIDES_KEY, map);
  mirrorProfilePatchToCloud(safeUserId, { avatarUrl: safeAvatarValue });
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return safeAvatarValue;
}

export function clearProfileAvatarOverride(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return false;
  const map = readStorageObject(PROFILE_AVATAR_OVERRIDES_KEY);
  if (!(safeUserId in map)) return false;
  delete map[safeUserId];
  writeStorageObject(PROFILE_AVATAR_OVERRIDES_KEY, map);
  mirrorProfilePatchToCloud(safeUserId, { avatarUrl: "" });
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return true;
}

function clampText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function sanitizeIdList(input, maxLength = 5) {
  const values = Array.isArray(input) ? input : [];
  const seen = new Set();
  const out = [];
  values.forEach((entry) => {
    const safeId = String(entry || "").trim();
    if (!safeId || seen.has(safeId)) return;
    seen.add(safeId);
    out.push(safeId);
  });
  return out.slice(0, Math.max(1, Number(maxLength) || 5));
}

function sanitizeProfileDetails(raw = {}) {
  const input = raw && typeof raw === "object" ? raw : {};
  const ageDigits = String(input.age || "").replace(/[^\d]/g, "").slice(0, 3);
  const ageNumber = Number(ageDigits || 0);
  const age = Number.isFinite(ageNumber) && ageNumber > 0 ? String(ageNumber) : "";
  return {
    age,
    city: clampText(input.city, 80),
    bioLong: clampText(input.bioLong, 420),
    favoriteTeam: clampText(input.favoriteTeam, 120),
    favoriteTeamIds: sanitizeIdList(input.favoriteTeamIds, 5),
    favoriteAthlete: clampText(input.favoriteAthlete, 120),
    favoriteAthleteIds: sanitizeIdList(input.favoriteAthleteIds, 5),
    topEventIds: sanitizeIdList(input.topEventIds, 5),
    quote: clampText(input.quote, 220),
  };
}

function mergeProfileDetails(base = {}, patch = {}) {
  return sanitizeProfileDetails({ ...base, ...patch });
}

function hasProfileDetailsValue(details) {
  return PROFILE_DETAIL_KEYS.some((key) => {
    const value = details?.[key];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(String(value || "").trim());
  });
}

export function getProfileDetailsOverride(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return sanitizeProfileDetails();
  const map = readStorageObject(PROFILE_DETAILS_OVERRIDES_KEY);
  return sanitizeProfileDetails(map[safeUserId]);
}

export function setProfileDetailsOverride(userId, patch = {}) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return sanitizeProfileDetails();
  const map = readStorageObject(PROFILE_DETAILS_OVERRIDES_KEY);
  const next = mergeProfileDetails(map[safeUserId], patch);
  if (hasProfileDetailsValue(next)) {
    map[safeUserId] = next;
  } else {
    delete map[safeUserId];
  }
  writeStorageObject(PROFILE_DETAILS_OVERRIDES_KEY, map);
  mirrorProfilePatchToCloud(safeUserId, next);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return next;
}

export function clearProfileDetailsOverride(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return false;
  const map = readStorageObject(PROFILE_DETAILS_OVERRIDES_KEY);
  if (!(safeUserId in map)) return false;
  delete map[safeUserId];
  writeStorageObject(PROFILE_DETAILS_OVERRIDES_KEY, map);
  mirrorProfilePatchToCloud(safeUserId, {
    age: "",
    city: "",
    bioLong: "",
    favoriteTeam: "",
    favoriteTeamIds: [],
    favoriteAthlete: "",
    favoriteAthleteIds: [],
    topEventIds: [],
    quote: "",
  });
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return true;
}
