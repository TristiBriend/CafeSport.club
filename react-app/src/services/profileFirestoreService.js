import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit as firestoreLimit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
}

function hasOwn(value, key) {
  return Boolean(value) && Object.prototype.hasOwnProperty.call(value, key);
}

function sanitizeIdList(input, maxLength = 5) {
  const values = Array.isArray(input) ? input : [];
  const seen = new Set();
  const out = [];
  values.forEach((entry) => {
    const safeId = normalizeId(entry);
    if (!safeId || seen.has(safeId)) return;
    seen.add(safeId);
    out.push(safeId);
  });
  return out.slice(0, Math.max(1, Number(maxLength) || 5));
}

function normalizeDisplayName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 32);
}

function normalizeHandle(value) {
  const cleaned = String(value || "")
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
  return cleaned;
}

function hasValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(String(value || "").trim());
}

function sanitizeStoredProfile(raw = {}) {
  const input = raw && typeof raw === "object" ? raw : {};
  const out = {};

  if (hasOwn(input, "displayName")) {
    out.displayName = normalizeDisplayName(input.displayName);
  }

  if (hasOwn(input, "handle") || hasOwn(input, "handleNormalized")) {
    const handleNormalized = normalizeHandle(input.handleNormalized || input.handle);
    out.handle = handleNormalized;
    out.handleNormalized = handleNormalized;
  }

  if (hasOwn(input, "age")) out.age = String(input.age || "").trim().slice(0, 3);
  if (hasOwn(input, "city")) out.city = String(input.city || "").trim().slice(0, 80);
  if (hasOwn(input, "bioLong")) out.bioLong = String(input.bioLong || "").trim().slice(0, 420);
  if (hasOwn(input, "favoriteTeam")) out.favoriteTeam = String(input.favoriteTeam || "").trim().slice(0, 120);
  if (hasOwn(input, "favoriteTeamIds")) out.favoriteTeamIds = sanitizeIdList(input.favoriteTeamIds, 5);
  if (hasOwn(input, "favoriteAthlete")) out.favoriteAthlete = String(input.favoriteAthlete || "").trim().slice(0, 120);
  if (hasOwn(input, "favoriteAthleteIds")) out.favoriteAthleteIds = sanitizeIdList(input.favoriteAthleteIds, 5);
  if (hasOwn(input, "topEventIds")) out.topEventIds = sanitizeIdList(input.topEventIds, 5);
  if (hasOwn(input, "quote")) out.quote = String(input.quote || "").trim().slice(0, 220);
  if (hasOwn(input, "avatarUrl")) out.avatarUrl = String(input.avatarUrl || "").trim();

  return out;
}

function sanitizePartialProfilePatch(raw = {}) {
  return sanitizeStoredProfile(raw);
}

function getPublicProfileDoc(appUserId) {
  const safeAppUserId = normalizeId(appUserId);
  if (!safeAppUserId || !db || !isFirebaseConfigured) return null;
  return doc(db, "publicProfiles", safeAppUserId);
}

export async function readPublicProfileOverride(appUserId) {
  const ref = getPublicProfileDoc(appUserId);
  if (!ref) return null;
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() || {};
  return {
    appUserId: normalizeId(data.appUserId || appUserId),
    ownerUid: normalizeId(data.ownerUid),
    ...sanitizeStoredProfile(data),
  };
}

export async function upsertPublicProfileOverride(appUserId, ownerUid, patch = {}) {
  const ref = getPublicProfileDoc(appUserId);
  const safeOwnerUid = normalizeId(ownerUid);
  if (!ref || !safeOwnerUid) return null;
  const safePatch = sanitizePartialProfilePatch(patch);
  await setDoc(ref, {
    appUserId: normalizeId(appUserId),
    ownerUid: safeOwnerUid,
    ...safePatch,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  }, { merge: true });
  return { appUserId: normalizeId(appUserId), ownerUid: safeOwnerUid, ...safePatch };
}

export async function findPublicProfileByHandleNormalized(handleNormalized) {
  const safeHandle = normalizeHandle(handleNormalized);
  if (!safeHandle || !db || !isFirebaseConfigured) return null;
  const ref = collection(db, "publicProfiles");
  const snap = await getDocs(query(
    ref,
    where("handleNormalized", "==", safeHandle),
    firestoreLimit(1),
  ));
  const first = snap.docs[0];
  if (!first) return null;
  const data = first.data() || {};
  return {
    appUserId: normalizeId(data.appUserId || first.id),
    ownerUid: normalizeId(data.ownerUid),
    ...sanitizeStoredProfile(data),
  };
}

export async function seedPublicProfileFromLocalUnion(appUserId, ownerUid, localPatch = {}) {
  const current = await readPublicProfileOverride(appUserId);
  const safeLocal = sanitizePartialProfilePatch(localPatch);
  if (!current) {
    const hasLocal = Object.values(safeLocal).some((value) => hasValue(value));
    if (!hasLocal) return false;
    await upsertPublicProfileOverride(appUserId, ownerUid, safeLocal);
    return true;
  }

  const patch = {};
  Object.entries(safeLocal).forEach(([key, value]) => {
    if (!hasValue(value)) return;
    if (hasValue(current?.[key])) return;
    patch[key] = value;
  });

  if (!Object.keys(patch).length) return false;
  await upsertPublicProfileOverride(appUserId, ownerUid, patch);
  return true;
}
