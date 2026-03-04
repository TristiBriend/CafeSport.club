import { users } from "../data/modelStore";
import {
  findPublicProfileByHandleNormalized,
  upsertPublicProfileOverride,
} from "./profileFirestoreService";
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

const PROFILE_IDENTITY_KEYS = [
  "displayName",
  "handle",
  "handleNormalized",
];
const storageObjectCache = new Map();

function cloneStorageRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return { ...value };
}

function readStorageObject(key) {
  if (storageObjectCache.has(key)) {
    return cloneStorageRecord(storageObjectCache.get(key));
  }
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "{}");
    const safeValue = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    storageObjectCache.set(key, safeValue);
    return cloneStorageRecord(safeValue);
  } catch {
    return {};
  }
}

function writeStorageObject(key, value) {
  if (typeof window === "undefined") return;
  const safeValue = cloneStorageRecord(value);
  storageObjectCache.set(key, safeValue);
  window.localStorage.setItem(key, JSON.stringify(safeValue));
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
  if (typeof window === "undefined") {
    if (safeFallback) return safeFallback;
    return (users[0]?.id || "");
  }
  const raw = String(window.localStorage.getItem(PROFILE_USER_ID_KEY) || "").trim();
  if (raw) return raw;
  if (safeFallback) return safeFallback;
  return (users[0]?.id || "");
}

export function setCurrentProfileUserId(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return "";
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

export function normalizeDisplayName(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 32);
}

export function normalizeHandle(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9._]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/\.+/g, ".")
    .replace(/^[_\.]+|[_\.]+$/g, "")
    .slice(0, 24);
}

export function formatHandle(value) {
  const safe = normalizeHandle(value);
  return safe ? `@${safe}` : "";
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

function readProfileEntry(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return {};
  const map = readStorageObject(PROFILE_DETAILS_OVERRIDES_KEY);
  const raw = map[safeUserId];
  return raw && typeof raw === "object" && !Array.isArray(raw) ? { ...raw } : {};
}

function sanitizeProfileIdentity(raw = {}, fallback = {}) {
  const input = raw && typeof raw === "object" ? raw : {};
  const backup = fallback && typeof fallback === "object" ? fallback : {};
  const displayName = normalizeDisplayName(input.displayName || backup.displayName);
  const handleNormalized = normalizeHandle(input.handleNormalized || input.handle || backup.handleNormalized || backup.handle);
  return {
    displayName,
    handle: handleNormalized,
    handleNormalized,
  };
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

function mergeProfileIdentity(base = {}, patch = {}) {
  return sanitizeProfileIdentity({ ...base, ...patch });
}

function hasProfileDetailsValue(details) {
  return PROFILE_DETAIL_KEYS.some((key) => {
    const value = details?.[key];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(String(value || "").trim());
  });
}

function hasProfileIdentityValue(identity) {
  return PROFILE_IDENTITY_KEYS.some((key) => Boolean(String(identity?.[key] || "").trim()));
}

function writeProfileOverrideEntry(userId, entry = {}) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return {};
  const map = readStorageObject(PROFILE_DETAILS_OVERRIDES_KEY);
  const safeIdentity = sanitizeProfileIdentity(entry);
  const safeDetails = sanitizeProfileDetails(entry);
  const hasDetails = hasProfileDetailsValue(safeDetails);
  const hasIdentity = hasProfileIdentityValue(safeIdentity);
  if (!hasDetails && !hasIdentity) {
    delete map[safeUserId];
  } else {
    map[safeUserId] = {
      ...(hasDetails ? safeDetails : {}),
      ...(hasIdentity ? safeIdentity : {}),
    };
  }
  writeStorageObject(PROFILE_DETAILS_OVERRIDES_KEY, map);
  return map[safeUserId] || {};
}

export function getProfileDetailsOverride(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return sanitizeProfileDetails();
  return sanitizeProfileDetails(readProfileEntry(safeUserId));
}

export function setProfileDetailsOverride(userId, patch = {}) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return sanitizeProfileDetails();
  const current = readProfileEntry(safeUserId);
  const next = mergeProfileDetails(current, patch);
  const currentIdentity = sanitizeProfileIdentity(current);
  writeProfileOverrideEntry(safeUserId, {
    ...currentIdentity,
    ...next,
  });
  mirrorProfilePatchToCloud(safeUserId, next);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return next;
}

export function clearProfileDetailsOverride(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return false;
  const current = readProfileEntry(safeUserId);
  if (!Object.keys(current).length) return false;
  const identity = sanitizeProfileIdentity(current);
  const hadDetails = hasProfileDetailsValue(current);
  writeProfileOverrideEntry(safeUserId, identity);
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
  return hadDetails;
}

export function getProfileIdentityOverride(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return sanitizeProfileIdentity();
  return sanitizeProfileIdentity(readProfileEntry(safeUserId));
}

export function setProfileIdentityOverride(userId, patch = {}) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return sanitizeProfileIdentity();
  const current = readProfileEntry(safeUserId);
  const next = mergeProfileIdentity(current, patch);
  const currentDetails = sanitizeProfileDetails(current);
  writeProfileOverrideEntry(safeUserId, {
    ...currentDetails,
    ...next,
  });
  mirrorProfilePatchToCloud(safeUserId, next);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return next;
}

export function clearProfileIdentityOverride(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId) return false;
  const current = readProfileEntry(safeUserId);
  if (!Object.keys(current).length) return false;
  const details = sanitizeProfileDetails(current);
  const hadIdentity = hasProfileIdentityValue(current);
  writeProfileOverrideEntry(safeUserId, details);
  mirrorProfilePatchToCloud(safeUserId, {
    displayName: "",
    handle: "",
    handleNormalized: "",
  });
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return hadIdentity;
}

export function migrateProfileOverridesToUserId(fromUserId, toUserId) {
  const safeFromUserId = String(fromUserId || "").trim();
  const safeToUserId = String(toUserId || "").trim();
  if (!safeFromUserId || !safeToUserId || safeFromUserId === safeToUserId) return false;

  const avatarMap = readStorageObject(PROFILE_AVATAR_OVERRIDES_KEY);
  const detailsMap = readStorageObject(PROFILE_DETAILS_OVERRIDES_KEY);
  const sourceAvatar = String(avatarMap[safeFromUserId] || "").trim();
  const targetAvatar = String(avatarMap[safeToUserId] || "").trim();
  const sourceEntry = detailsMap[safeFromUserId];
  const targetEntry = detailsMap[safeToUserId];
  const hasSourceEntry = sourceEntry && typeof sourceEntry === "object" && !Array.isArray(sourceEntry);
  const hasTargetEntry = targetEntry && typeof targetEntry === "object" && !Array.isArray(targetEntry);
  const hasSourceAvatar = isValidAvatarValue(sourceAvatar);

  if (!hasSourceAvatar && !hasSourceEntry) return false;

  let didChange = false;

  if (hasSourceAvatar && !isValidAvatarValue(targetAvatar)) {
    avatarMap[safeToUserId] = sourceAvatar;
    didChange = true;
  }
  if (hasSourceAvatar && safeFromUserId in avatarMap) {
    delete avatarMap[safeFromUserId];
    didChange = true;
  }

  if (hasSourceEntry) {
    const mergedEntry = hasTargetEntry
      ? { ...sourceEntry, ...targetEntry }
      : { ...sourceEntry };
    detailsMap[safeToUserId] = mergedEntry;
    delete detailsMap[safeFromUserId];
    didChange = true;
  }

  if (!didChange) return false;

  writeStorageObject(PROFILE_AVATAR_OVERRIDES_KEY, avatarMap);
  writeStorageObject(PROFILE_DETAILS_OVERRIDES_KEY, detailsMap);
  notifyDomainDirty(SOCIAL_SYNC_DOMAIN.PROFILE);
  return true;
}

function getCatalogUserByHandle(handleNormalized) {
  const safeHandle = normalizeHandle(handleNormalized);
  if (!safeHandle) return null;
  return (Array.isArray(users) ? users : []).find((user) => normalizeHandle(user?.handle) === safeHandle) || null;
}

function getEmailPrefix(email) {
  const safeEmail = String(email || "").trim();
  if (!safeEmail.includes("@")) return "";
  return safeEmail.split("@")[0].trim();
}

export function resolvePublicIdentity(userId, {
  firebaseUser = null,
  fallbackUser = null,
  fallbackEmail = "",
} = {}) {
  const safeUserId = String(userId || "").trim();
  const override = getProfileIdentityOverride(safeUserId);
  const fallback = fallbackUser && typeof fallbackUser === "object" ? fallbackUser : {};
  const firebaseDisplayName = normalizeDisplayName(firebaseUser?.displayName);
  const displayName = normalizeDisplayName(
    override.displayName
    || firebaseDisplayName
    || fallback.name
    || getEmailPrefix(fallbackEmail || firebaseUser?.email)
    || "Utilisateur"
  );
  const handleNormalized = normalizeHandle(
    override.handle
    || fallback.handle
    || displayName
  );
  return {
    userId: safeUserId,
    displayName,
    name: displayName,
    handle: handleNormalized,
    handleFormatted: formatHandle(handleNormalized),
    handleNormalized,
  };
}

export async function isHandleAvailable(handle, { excludeUserId = "", excludeUserIds = [] } = {}) {
  const safeHandle = normalizeHandle(handle);
  const safeExcludeUserId = String(excludeUserId || "").trim();
  const excludedIds = new Set(
    [safeExcludeUserId, ...(Array.isArray(excludeUserIds) ? excludeUserIds : [])]
      .map((value) => String(value || "").trim())
      .filter(Boolean),
  );
  if (!safeHandle) return false;

  const catalogUser = getCatalogUserByHandle(safeHandle);
  if (catalogUser && !excludedIds.has(String(catalogUser.id || "").trim())) {
    return false;
  }

  const localMap = readStorageObject(PROFILE_DETAILS_OVERRIDES_KEY);
  const localMatch = Object.entries(localMap).find(([userId, value]) => {
    const safeUserId = String(userId || "").trim();
    if (!safeUserId || excludedIds.has(safeUserId)) return false;
    const normalized = normalizeHandle(value?.handleNormalized || value?.handle);
    return normalized === safeHandle;
  });
  if (localMatch) return false;

  const { isCloudMode } = getSocialSyncCloudIdentity();
  if (!isCloudMode) return true;
  try {
    const cloudProfile = await findPublicProfileByHandleNormalized(safeHandle);
    if (!cloudProfile) return true;
    return excludedIds.has(String(cloudProfile.appUserId || "").trim());
  } catch {
    return true;
  }
}

export function matchesUserIdentity(entry, user) {
  const safeEntry = entry && typeof entry === "object" ? entry : null;
  const safeUser = user && typeof user === "object" ? user : null;
  if (!safeEntry || !safeUser) return false;

  const safeUserId = String(safeUser.id || "").trim();
  if (safeUserId && String(safeEntry.userId || "").trim() === safeUserId) {
    return true;
  }

  const authorToken = String(safeEntry.author || "").trim().toLowerCase();
  if (!authorToken) return false;
  const aliases = new Set();
  const addAlias = (value) => {
    const raw = String(value || "").trim().toLowerCase();
    if (!raw) return;
    aliases.add(raw);
    if (raw.startsWith("@")) {
      aliases.add(raw.slice(1));
    }
  };

  addAlias(safeUser.name);
  addAlias(safeUser.handle);

  if (safeUserId && (!aliases.size || !String(safeUser.name || "").trim() || !String(safeUser.handle || "").trim())) {
    const identity = getProfileIdentityOverride(safeUserId);
    addAlias(identity.displayName);
    addAlias(formatHandle(identity.handle || identity.handleNormalized));
    addAlias(identity.handle || identity.handleNormalized);
  }

  return aliases.has(authorToken);
}
