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

function normalizeScore(value) {
  const raw = Number(value || 0);
  if (!Number.isFinite(raw)) return 0;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

function getRatingsCollection(uid) {
  const safeUid = normalizeId(uid);
  if (!safeUid || !db || !isFirebaseConfigured) return null;
  return collection(db, "users", safeUid, "ratings");
}

function getRatingDoc(uid, eventId) {
  const safeUid = normalizeId(uid);
  const safeEventId = normalizeId(eventId);
  if (!safeUid || !safeEventId || !db || !isFirebaseConfigured) return null;
  return doc(db, "users", safeUid, "ratings", safeEventId);
}

export async function readUserRatings(uid) {
  const safeUid = normalizeId(uid);
  const col = getRatingsCollection(safeUid);
  if (!safeUid || !col || !db || !isFirebaseConfigured) return {};
  const snap = await getDocs(col);
  return snap.docs.reduce((acc, docSnap) => {
    const eventId = normalizeId(docSnap.id);
    const score = normalizeScore(docSnap.data()?.score || 0);
    if (eventId && score > 0) acc[eventId] = score;
    return acc;
  }, {});
}

export async function setUserRatingCloud(uid, eventId, score) {
  const ref = getRatingDoc(uid, eventId);
  if (!ref) return 0;
  const safeScore = normalizeScore(score);
  await setDoc(ref, {
    eventId: normalizeId(eventId),
    score: safeScore,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  }, { merge: true });
  return safeScore;
}

export async function deleteUserRatingCloud(uid, eventId) {
  const ref = getRatingDoc(uid, eventId);
  if (!ref) return false;
  await deleteDoc(ref);
  return true;
}

export async function seedRatingsFromLocalUnion(uid, localMap = {}) {
  const safeUid = normalizeId(uid);
  if (!safeUid || !db || !isFirebaseConfigured) return false;
  const localEntries = Object.entries(localMap || {}).reduce((acc, [eventId, score]) => {
    const safeEventId = normalizeId(eventId);
    const safeScore = normalizeScore(score);
    if (safeEventId && safeScore > 0) acc.push({ eventId: safeEventId, score: safeScore });
    return acc;
  }, []);
  if (!localEntries.length) return false;

  const cloudMap = await readUserRatings(safeUid);
  const missing = localEntries.filter((entry) => cloudMap[entry.eventId] == null);
  if (!missing.length) return false;

  await Promise.all(missing.map((entry) => setUserRatingCloud(safeUid, entry.eventId, entry.score)));
  return true;
}
