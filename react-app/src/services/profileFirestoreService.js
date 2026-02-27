import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
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

function hasValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(String(value || "").trim());
}

function sanitizePatch(raw = {}) {
  const input = raw && typeof raw === "object" ? raw : {};
  return {
    age: String(input.age || "").trim().slice(0, 3),
    city: String(input.city || "").trim().slice(0, 80),
    bioLong: String(input.bioLong || "").trim().slice(0, 420),
    favoriteTeam: String(input.favoriteTeam || "").trim().slice(0, 120),
    favoriteTeamIds: sanitizeIdList(input.favoriteTeamIds, 5),
    favoriteAthlete: String(input.favoriteAthlete || "").trim().slice(0, 120),
    favoriteAthleteIds: sanitizeIdList(input.favoriteAthleteIds, 5),
    topEventIds: sanitizeIdList(input.topEventIds, 5),
    quote: String(input.quote || "").trim().slice(0, 220),
    avatarUrl: String(input.avatarUrl || "").trim(),
  };
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
    ...sanitizePatch(data),
  };
}

export async function upsertPublicProfileOverride(appUserId, ownerUid, patch = {}) {
  const ref = getPublicProfileDoc(appUserId);
  const safeOwnerUid = normalizeId(ownerUid);
  if (!ref || !safeOwnerUid) return null;
  const safePatch = sanitizePatch(patch);
  await setDoc(ref, {
    appUserId: normalizeId(appUserId),
    ownerUid: safeOwnerUid,
    ...safePatch,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  }, { merge: true });
  return { appUserId: normalizeId(appUserId), ownerUid: safeOwnerUid, ...safePatch };
}

export async function seedPublicProfileFromLocalUnion(appUserId, ownerUid, localPatch = {}) {
  const current = await readPublicProfileOverride(appUserId);
  const safeLocal = sanitizePatch(localPatch);
  if (!current) {
    const hasLocal = Object.values(safeLocal).some((value) => Boolean(String(value || "").trim()));
    if (!hasLocal) return false;
    await upsertPublicProfileOverride(appUserId, ownerUid, safeLocal);
    return true;
  }

  const patch = {};
  Object.entries(safeLocal).forEach(([key, value]) => {
    if (hasValue(current?.[key])) return;
    if (!hasValue(value)) return;
    patch[key] = value;
  });

  if (!Object.keys(patch).length) return false;
  await upsertPublicProfileOverride(appUserId, ownerUid, patch);
  return true;
}
