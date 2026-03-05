import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
}

function getFeedActionsCollection(uid) {
  const safeUid = normalizeId(uid);
  if (!safeUid || !db || !isFirebaseConfigured) return null;
  return collection(db, "users", safeUid, "feedActions");
}

function getFeedActionDoc(uid, actionId) {
  const safeUid = normalizeId(uid);
  const safeActionId = normalizeId(actionId);
  if (!safeUid || !safeActionId || !db || !isFirebaseConfigured) return null;
  return doc(db, "users", safeUid, "feedActions", safeActionId);
}

function normalizeCloudAction(raw = {}) {
  const id = normalizeId(raw?.id || raw?.actionId);
  const actionType = String(raw?.actionType || "").trim().toLowerCase();
  const targetType = String(raw?.targetType || "").trim().toLowerCase();
  const targetId = normalizeId(raw?.targetId);
  if (!id || !actionType || !targetType || !targetId) return null;
  return {
    id,
    actionType,
    targetType,
    targetId,
    createdAt: String(raw?.createdAt || "").trim(),
    updatedAt: String(raw?.updatedAt || raw?.createdAt || "").trim(),
    meta: raw?.meta && typeof raw.meta === "object" ? raw.meta : {},
  };
}

export async function upsertFeedActionCloud(uid, action = {}) {
  const safeUid = normalizeId(uid);
  const normalized = normalizeCloudAction(action);
  if (!safeUid || !normalized) return null;
  const ref = getFeedActionDoc(safeUid, normalized.id);
  if (!ref) return null;
  await setDoc(ref, {
    actionId: normalized.id,
    actionType: normalized.actionType,
    targetType: normalized.targetType,
    targetId: normalized.targetId,
    createdAt: normalized.createdAt || new Date().toISOString(),
    updatedAt: normalized.updatedAt || new Date().toISOString(),
    meta: normalized.meta || {},
    updatedAtServer: serverTimestamp(),
  }, { merge: true });
  return normalized;
}

export async function deleteFeedActionCloud(uid, actionId) {
  const ref = getFeedActionDoc(uid, actionId);
  if (!ref) return false;
  await deleteDoc(ref);
  return true;
}

export async function readUserFeedActions(uid) {
  const col = getFeedActionsCollection(uid);
  if (!col) return [];
  const snap = await getDocs(col);
  return snap.docs
    .map((docSnap) => normalizeCloudAction({ id: docSnap.id, ...docSnap.data() }))
    .filter(Boolean);
}

export function subscribeUserFeedActions(uid, onChange = () => {}, onError = () => {}) {
  const col = getFeedActionsCollection(uid);
  if (!col || typeof onChange !== "function") return () => {};
  return onSnapshot(col, (snap) => {
    const rows = snap.docs
      .map((docSnap) => normalizeCloudAction({ id: docSnap.id, ...docSnap.data() }))
      .filter(Boolean);
    onChange(rows);
  }, onError);
}

export async function seedFeedActionsFromLocalUnion(uid, localActions = []) {
  const safeUid = normalizeId(uid);
  if (!safeUid) return false;
  const safeLocal = (Array.isArray(localActions) ? localActions : [])
    .map((entry) => normalizeCloudAction(entry))
    .filter(Boolean);
  if (!safeLocal.length) return false;

  const cloudRows = await readUserFeedActions(safeUid);
  const cloudById = new Map(cloudRows.map((entry) => [entry.id, entry]));
  const missing = safeLocal.filter((entry) => !cloudById.has(entry.id));
  if (!missing.length) return false;
  await Promise.all(missing.map((entry) => upsertFeedActionCloud(safeUid, entry)));
  return true;
}
