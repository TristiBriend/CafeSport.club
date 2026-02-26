import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
}

function normalizeType(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeLabel(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 28);
}

function normalizeLabelKey(value) {
  return normalizeLabel(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function toPositiveInt(value) {
  const raw = Number(value || 0);
  if (!Number.isFinite(raw)) return 0;
  return Math.max(0, Math.round(raw));
}

function objectDocId(objectType, objectId) {
  const safeType = normalizeType(objectType);
  const safeId = normalizeId(objectId);
  if (!safeType || !safeId) return "";
  return `${safeType}__${safeId}`;
}

function objectKey(objectType, objectId) {
  const safeType = normalizeType(objectType);
  const safeId = normalizeId(objectId);
  if (!safeType || !safeId) return "";
  return `${safeType}:${safeId}`;
}

function splitObjectDocId(value) {
  const [safeType = "", ...parts] = String(value || "").split("__");
  const safeId = parts.join("__");
  return {
    objectType: normalizeType(safeType),
    objectId: normalizeId(safeId),
  };
}

function getTagCollection(objectType, objectId) {
  const docId = objectDocId(objectType, objectId);
  if (!docId || !db || !isFirebaseConfigured) return null;
  return collection(db, "objectTags", docId, "tags");
}

function getTagDoc(objectType, objectId, tagId) {
  const docId = objectDocId(objectType, objectId);
  const safeTagId = normalizeId(tagId);
  if (!docId || !safeTagId || !db || !isFirebaseConfigured) return null;
  return doc(db, "objectTags", docId, "tags", safeTagId);
}

function getVoteDoc(objectType, objectId, tagId, uid) {
  const safeUid = normalizeId(uid);
  const tagRef = getTagDoc(objectType, objectId, tagId);
  if (!tagRef || !safeUid) return null;
  return doc(tagRef, "votes", safeUid);
}

function parseTagPath(path) {
  const parts = String(path || "").split("/");
  if (parts.length < 4 || parts[0] !== "objectTags" || parts[2] !== "tags") return null;
  const { objectType, objectId } = splitObjectDocId(parts[1]);
  const tagId = normalizeId(parts[3]);
  if (!objectType || !objectId || !tagId) return null;
  return { objectType, objectId, tagId };
}

export async function readAllObjectTagsBundle(uid, currentUserKey = "usr-manual") {
  if (!db || !isFirebaseConfigured) {
    return {
      catalog: {},
      objectTags: {},
      seedState: {},
      seedSummary: {},
      votesByTag: {},
    };
  }

  const catalog = {};
  const objectTags = {};
  const seedState = {};
  const seedSummary = {};
  const votesByTag = {};

  const tagsSnap = await getDocs(collectionGroup(db, "tags"));
  tagsSnap.docs.forEach((docSnap) => {
    const parsed = parseTagPath(docSnap.ref.path);
    if (!parsed) return;
    const data = docSnap.data() || {};
    const label = normalizeLabel(data.label || parsed.tagId);
    const normalized = normalizeLabelKey(data.normalized || label);
    const objKey = objectKey(parsed.objectType, parsed.objectId);
    const voteKey = `${objKey}|${parsed.tagId}`;

    catalog[parsed.tagId] = {
      id: parsed.tagId,
      label,
      normalized,
    };
    if (!Array.isArray(objectTags[objKey])) objectTags[objKey] = [];
    if (!objectTags[objKey].includes(parsed.tagId)) objectTags[objKey].push(parsed.tagId);

    seedSummary[voteKey] = {
      up: toPositiveInt(data.upCount),
      down: toPositiveInt(data.downCount),
    };
    seedState[objKey] = 1;
  });

  const safeUid = normalizeId(uid);
  if (safeUid) {
    const votesSnap = await getDocs(query(collectionGroup(db, "votes"), where("uid", "==", safeUid)));
    votesSnap.docs.forEach((docSnap) => {
      const tagPath = parseTagPath(docSnap.ref.parent.parent?.path || "");
      if (!tagPath) return;
      const objKey = objectKey(tagPath.objectType, tagPath.objectId);
      const voteKey = `${objKey}|${tagPath.tagId}`;
      const vote = Number(docSnap.data()?.vote || 0) === -1 ? -1 : 1;
      votesByTag[voteKey] = {
        [currentUserKey]: vote,
      };
    });
  }

  return {
    catalog,
    objectTags,
    seedState,
    seedSummary,
    votesByTag,
  };
}

async function applyVote(objectType, objectId, tagId, uid, targetVote) {
  const tagRef = getTagDoc(objectType, objectId, tagId);
  const voteRef = getVoteDoc(objectType, objectId, tagId, uid);
  const safeTarget = Number(targetVote) === -1 ? -1 : 1;
  if (!tagRef || !voteRef) return false;

  return runTransaction(db, async (tx) => {
    const [tagSnap, voteSnap] = await Promise.all([tx.get(tagRef), tx.get(voteRef)]);
    if (!tagSnap.exists()) return false;

    const currentVote = Number(voteSnap.data()?.vote || 0);
    const nextVote = currentVote === safeTarget ? 0 : safeTarget;

    let up = toPositiveInt(tagSnap.data()?.upCount || 0);
    let down = toPositiveInt(tagSnap.data()?.downCount || 0);

    if (currentVote === 1) up = Math.max(0, up - 1);
    if (currentVote === -1) down = Math.max(0, down - 1);

    if (nextVote === 1) up += 1;
    if (nextVote === -1) down += 1;

    tx.set(tagRef, {
      upCount: up,
      downCount: down,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    if (nextVote === 0) {
      tx.delete(voteRef);
    } else {
      tx.set(voteRef, {
        uid: normalizeId(uid),
        vote: nextVote,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }

    return true;
  });
}

export async function addUserTagToObjectCloud(uid, objectType, objectId, rawLabel) {
  const safeUid = normalizeId(uid);
  const safeType = normalizeType(objectType);
  const safeObjectId = normalizeId(objectId);
  const label = normalizeLabel(rawLabel);
  if (!safeUid || !safeType || !safeObjectId || !label || !db || !isFirebaseConfigured) return null;

  const col = getTagCollection(safeType, safeObjectId);
  if (!col) return null;
  const snap = await getDocs(col);
  const normalized = normalizeLabelKey(label);

  let tagId = "";
  snap.docs.some((docSnap) => {
    const data = docSnap.data() || {};
    const candidate = normalizeLabelKey(data.normalized || data.label || "");
    if (candidate !== normalized) return false;
    tagId = docSnap.id;
    return true;
  });

  if (!tagId) {
    tagId = `tag-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  const tagRef = getTagDoc(safeType, safeObjectId, tagId);
  const existing = await getDoc(tagRef);
  const existingData = existing.data() || {};
  await setDoc(tagRef, {
    tagId,
    objectType: safeType,
    objectId: safeObjectId,
    label,
    normalized,
    createdByUid: safeUid,
    upCount: toPositiveInt(existingData.upCount || 0),
    downCount: toPositiveInt(existingData.downCount || 0),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });

  await applyVote(safeType, safeObjectId, tagId, safeUid, 1);

  return { tagId, label };
}

export async function toggleObjectTagVoteCloud(uid, objectType, objectId, tagId, voteValue) {
  const safeUid = normalizeId(uid);
  const safeType = normalizeType(objectType);
  const safeObjectId = normalizeId(objectId);
  const safeTagId = normalizeId(tagId);
  if (!safeUid || !safeType || !safeObjectId || !safeTagId) return false;
  return Boolean(await applyVote(safeType, safeObjectId, safeTagId, safeUid, voteValue));
}

export async function seedObjectTagsFromLocalUnion(uid, localBundle = {}, currentUserKey = "usr-manual") {
  const safeUid = normalizeId(uid);
  if (!safeUid || !db || !isFirebaseConfigured) return false;

  const catalog = localBundle?.catalog && typeof localBundle.catalog === "object" ? localBundle.catalog : {};
  const objectTags = localBundle?.objectTags && typeof localBundle.objectTags === "object" ? localBundle.objectTags : {};
  const votes = localBundle?.votesByTag && typeof localBundle.votesByTag === "object" ? localBundle.votesByTag : {};

  const entries = Object.entries(objectTags);
  for (const [objKey, tagIds] of entries) {
    const [rawType = "", ...idParts] = String(objKey || "").split(":");
    const objectType = normalizeType(rawType);
    const objectId = normalizeId(idParts.join(":"));
    if (!objectType || !objectId || !Array.isArray(tagIds)) continue;

    for (const tagId of tagIds) {
      const safeTagId = normalizeId(tagId);
      if (!safeTagId) continue;
      const tagRef = getTagDoc(objectType, objectId, safeTagId);
      const label = normalizeLabel(catalog?.[safeTagId]?.label || safeTagId);
      const normalized = normalizeLabelKey(catalog?.[safeTagId]?.normalized || label);
      await setDoc(tagRef, {
        tagId: safeTagId,
        objectType,
        objectId,
        label,
        normalized,
        createdByUid: safeUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });

      const voteKey = `${objectType}:${objectId}|${safeTagId}`;
      const vote = Number(votes?.[voteKey]?.[currentUserKey] || 0);
      if (vote === 1 || vote === -1) {
        await applyVote(objectType, objectId, safeTagId, safeUid, vote);
      }
    }
  }

  return true;
}
