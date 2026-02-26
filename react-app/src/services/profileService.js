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
  "favoriteAthlete",
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
  if (!value.startsWith("data:image/")) return "";
  return value;
}

export function setProfileAvatarOverride(userId, dataUrl) {
  const safeUserId = String(userId || "").trim();
  const safeDataUrl = String(dataUrl || "").trim();
  if (!safeUserId || !safeDataUrl.startsWith("data:image/")) return "";
  const map = readStorageObject(PROFILE_AVATAR_OVERRIDES_KEY);
  map[safeUserId] = safeDataUrl;
  writeStorageObject(PROFILE_AVATAR_OVERRIDES_KEY, map);
  mirrorProfilePatchToCloud(safeUserId, { avatarUrl: safeDataUrl });
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return safeDataUrl;
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
    favoriteAthlete: clampText(input.favoriteAthlete, 120),
    quote: clampText(input.quote, 220),
  };
}

function mergeProfileDetails(base = {}, patch = {}) {
  return sanitizeProfileDetails({ ...base, ...patch });
}

function hasProfileDetailsValue(details) {
  return PROFILE_DETAIL_KEYS.some((key) => Boolean(String(details?.[key] || "").trim()));
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
    favoriteAthlete: "",
    quote: "",
  });
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return true;
}
