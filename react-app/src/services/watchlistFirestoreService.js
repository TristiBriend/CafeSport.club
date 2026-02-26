import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
}

function normalizeWatchlistIds(value) {
  if (!Array.isArray(value)) return [];
  const ids = value
    .map((entry) => normalizeId(entry))
    .filter(Boolean);
  return Array.from(new Set(ids));
}

function getUserWatchlistCollection(userUid) {
  const safeUid = normalizeId(userUid);
  if (!safeUid || !db) return null;
  return collection(db, "users", safeUid, "watchlist");
}

function getWatchlistDoc(userUid, eventId) {
  const safeUid = normalizeId(userUid);
  const safeEventId = normalizeId(eventId);
  if (!safeUid || !safeEventId || !db) return null;
  return doc(db, "users", safeUid, "watchlist", safeEventId);
}

export async function readUserWatchlistIds(userUid) {
  const ref = getUserWatchlistCollection(userUid);
  if (!ref) return [];
  const snapshot = await getDocs(ref);
  const ids = snapshot.docs.map((entry) => normalizeId(entry.id)).filter(Boolean);
  return Array.from(new Set(ids));
}

export async function setUserWatchlistState(userUid, eventId, isSaved) {
  const ref = getWatchlistDoc(userUid, eventId);
  if (!ref) return false;
  if (isSaved) {
    await setDoc(ref, {
      eventId: normalizeId(eventId),
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    }, { merge: true });
    return true;
  }
  await deleteDoc(ref);
  return false;
}

export function subscribeUserWatchlist(userUid, onChange, onError = () => {}) {
  const ref = getUserWatchlistCollection(userUid);
  if (!ref || typeof onChange !== "function") return () => {};
  return onSnapshot(ref, (snapshot) => {
    const ids = snapshot.docs.map((entry) => normalizeId(entry.id)).filter(Boolean);
    onChange(Array.from(new Set(ids)));
  }, onError);
}

export async function seedWatchlistFromLocalIfCloudEmpty(userUid, localIds = []) {
  if (!isFirebaseConfigured || !db) return false;
  const ref = getUserWatchlistCollection(userUid);
  const seedIds = normalizeWatchlistIds(localIds);
  if (!ref || !seedIds.length) return false;
  const hasCloudItems = await getDocs(query(ref, limit(1)));
  if (!hasCloudItems.empty) return false;

  const batch = writeBatch(db);
  seedIds.forEach((eventId) => {
    const itemRef = getWatchlistDoc(userUid, eventId);
    if (!itemRef) return;
    batch.set(itemRef, {
      eventId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  });
  await batch.commit();
  return true;
}
