import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeToken(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeId(value) {
  return String(value || "").trim();
}

function getUserFollowsCollection(uid) {
  const safeUid = normalizeId(uid);
  if (!isFirebaseConfigured || !db || !safeUid) return null;
  return collection(db, "users", safeUid, "follows");
}

function encodeFollowDocId(targetType, targetId) {
  const safeType = normalizeToken(targetType);
  const safeId = normalizeId(targetId);
  if (!safeType || !safeId) return "";
  return `${safeType}__${safeId}`;
}

function decodeFollowDoc(snapshotDoc) {
  const data = snapshotDoc?.data?.() || {};
  const idToken = String(snapshotDoc?.id || "");
  const [idType = "", ...idParts] = idToken.split("__");
  const targetType = normalizeToken(data.targetType || idType);
  const targetId = normalizeId(data.targetId || idParts.join("__"));
  if (!targetType || !targetId) return null;
  return { targetType, targetId };
}

export async function readUserFollows(uid) {
  const col = getUserFollowsCollection(uid);
  if (!col) return [];
  const snap = await getDocs(col);
  return snap.docs.map(decodeFollowDoc).filter(Boolean);
}

export function subscribeUserFollows(uid, onChange, onError = () => {}) {
  const col = getUserFollowsCollection(uid);
  if (!col || typeof onChange !== "function") return () => {};
  return onSnapshot(col, (snap) => {
    onChange(snap.docs.map(decodeFollowDoc).filter(Boolean));
  }, onError);
}

export async function setUserFollowStateCloud(uid, targetType, targetId, isFollowed) {
  const safeUid = normalizeId(uid);
  const safeType = normalizeToken(targetType);
  const safeTargetId = normalizeId(targetId);
  if (!safeUid || !safeType || !safeTargetId || !db || !isFirebaseConfigured) return false;

  const docId = encodeFollowDocId(safeType, safeTargetId);
  if (!docId) return false;
  const ref = doc(db, "users", safeUid, "follows", docId);

  if (!isFollowed) {
    await deleteDoc(ref);
    return false;
  }

  await setDoc(ref, {
    targetType: safeType,
    targetId: safeTargetId,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  }, { merge: true });
  return true;
}

export async function seedUserFollowsFromLocalUnion(uid, localEntries = []) {
  const safeUid = normalizeId(uid);
  const col = getUserFollowsCollection(safeUid);
  if (!safeUid || !col || !db || !isFirebaseConfigured) return false;

  const safeLocal = Array.isArray(localEntries)
    ? localEntries
      .map((entry) => ({
        targetType: normalizeToken(entry?.targetType),
        targetId: normalizeId(entry?.targetId),
      }))
      .filter((entry) => entry.targetType && entry.targetId)
    : [];

  if (!safeLocal.length) return false;

  const cloudSnap = await getDocs(col);
  const cloudKeys = new Set(cloudSnap.docs.map((docSnap) => {
    const parsed = decodeFollowDoc(docSnap);
    if (!parsed) return "";
    return `${parsed.targetType}:${parsed.targetId}`;
  }).filter(Boolean));

  const missing = safeLocal.filter((entry) => !cloudKeys.has(`${entry.targetType}:${entry.targetId}`));
  if (!missing.length) return false;

  const batch = writeBatch(db);
  missing.forEach((entry) => {
    const ref = doc(db, "users", safeUid, "follows", encodeFollowDocId(entry.targetType, entry.targetId));
    batch.set(ref, {
      targetType: entry.targetType,
      targetId: entry.targetId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  });
  await batch.commit();
  return true;
}
