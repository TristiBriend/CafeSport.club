import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function getJoinRequestsCollection() {
  if (!db || !isFirebaseConfigured) return null;
  return collection(db, "joinRequests");
}

export async function createJoinRequestCloud(uid, payload = {}) {
  const col = getJoinRequestsCollection();
  const safeUid = normalizeId(uid);
  if (!col || !safeUid) return null;

  const item = {
    requesterUid: safeUid,
    name: cleanText(payload.name, 120),
    email: cleanText(payload.email, 180),
    sport: cleanText(payload.sport, 80),
    favorite: cleanText(payload.favorite, 180),
    note: cleanText(payload.note, 500),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (!item.name || !item.email) return null;

  const result = await addDoc(col, item);
  return result.id;
}
