import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
}

function sanitizeRoles(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

function mapAdminDoc(uid, raw = {}) {
  return {
    uid: normalizeId(raw?.uid || uid),
    isAdmin: Boolean(raw?.isAdmin),
    roles: sanitizeRoles(raw?.roles),
  };
}

function getAdminDocRef(uid) {
  const safeUid = normalizeId(uid);
  if (!safeUid || !isFirebaseConfigured || !db) return null;
  return doc(db, "adminUsers", safeUid);
}

export async function readAdminProfile(uid) {
  const ref = getAdminDocRef(uid);
  const safeUid = normalizeId(uid);
  if (!ref) return { uid: safeUid, isAdmin: false, roles: [] };
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return { uid: safeUid, isAdmin: false, roles: [] };
  }
  return mapAdminDoc(safeUid, snap.data());
}

export async function readIsAdmin(uid) {
  const profile = await readAdminProfile(uid);
  return Boolean(profile?.isAdmin);
}

export function subscribeAdminProfile(uid, onChange = () => {}, onError = () => {}) {
  const ref = getAdminDocRef(uid);
  const safeUid = normalizeId(uid);
  if (!ref) {
    onChange({ uid: safeUid, isAdmin: false, roles: [] });
    return () => {};
  }
  return onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      onChange({ uid: safeUid, isAdmin: false, roles: [] });
      return;
    }
    onChange(mapAdminDoc(safeUid, snap.data()));
  }, onError);
}

