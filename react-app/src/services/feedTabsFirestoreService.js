import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
}

function normalizeTargetType(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeMode(value) {
  const token = String(value || "").trim().toLowerCase();
  if (token === "popular") return "popular";
  return "recent";
}

function getTabsCollection(uid) {
  const safeUid = normalizeId(uid);
  if (!safeUid || !db || !isFirebaseConfigured) return null;
  return collection(db, "users", safeUid, "preferences", "feedOptionalTabs", "items");
}

function getTabDoc(uid, tabId) {
  const safeUid = normalizeId(uid);
  const safeTabId = normalizeId(tabId);
  if (!safeUid || !safeTabId || !db || !isFirebaseConfigured) return null;
  return doc(db, "users", safeUid, "preferences", "feedOptionalTabs", "items", safeTabId);
}

function normalizeTab(raw) {
  const targetType = normalizeTargetType(raw?.targetType);
  const targetId = normalizeId(raw?.targetId);
  const id = normalizeId(raw?.id || raw?.tabId);
  if (!id || !targetType || !targetId) return null;
  return {
    id,
    tabId: id,
    targetType,
    targetId,
    mode: normalizeMode(raw?.mode),
    label: String(raw?.label || "").trim().slice(0, 80),
    createdAt: Number(raw?.createdAt || Date.now()),
  };
}

export async function readUserFeedTabs(uid) {
  const col = getTabsCollection(uid);
  if (!col) return [];
  const snap = await getDocs(col);
  return snap.docs
    .map((docSnap) => normalizeTab({ id: docSnap.id, ...docSnap.data() }))
    .filter(Boolean)
    .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
}

export async function upsertUserFeedTabCloud(uid, tab) {
  const normalized = normalizeTab(tab);
  if (!normalized) return null;
  const ref = getTabDoc(uid, normalized.id);
  if (!ref) return null;
  await setDoc(ref, {
    tabId: normalized.id,
    targetType: normalized.targetType,
    targetId: normalized.targetId,
    mode: normalized.mode,
    label: normalized.label,
    createdAt: Number(normalized.createdAt || Date.now()),
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return normalized;
}

export async function removeUserFeedTabCloud(uid, tabId) {
  const ref = getTabDoc(uid, tabId);
  if (!ref) return false;
  await deleteDoc(ref);
  return true;
}

export async function seedFeedTabsFromLocalUnion(uid, localTabs = []) {
  const safeLocal = Array.isArray(localTabs)
    ? localTabs.map((item) => normalizeTab(item)).filter(Boolean)
    : [];
  if (!safeLocal.length) return false;
  const cloudTabs = await readUserFeedTabs(uid);
  const cloudSet = new Set(cloudTabs.map((item) => item.id));
  const missing = safeLocal.filter((item) => !cloudSet.has(item.id));
  if (!missing.length) return false;
  await Promise.all(missing.map((item) => upsertUserFeedTabCloud(uid, item)));
  return true;
}
