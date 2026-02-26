import {
  collection,
  collectionGroup,
  deleteDoc,
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

function toIso(value) {
  if (!value) return new Date().toISOString();
  if (typeof value === "string") return value;
  if (typeof value?.toDate === "function") return value.toDate().toISOString();
  const parsed = Date.parse(String(value || ""));
  if (Number.isFinite(parsed)) return new Date(parsed).toISOString();
  return new Date().toISOString();
}

function toPositiveInt(value) {
  const raw = Number(value || 0);
  if (!Number.isFinite(raw)) return 0;
  return Math.max(0, Math.round(raw));
}

function getCommentDoc(commentId) {
  const safeCommentId = normalizeId(commentId);
  if (!safeCommentId || !db || !isFirebaseConfigured) return null;
  return doc(db, "comments", safeCommentId);
}

function getReplyDoc(commentId, replyId) {
  const safeCommentId = normalizeId(commentId);
  const safeReplyId = normalizeId(replyId);
  if (!safeCommentId || !safeReplyId || !db || !isFirebaseConfigured) return null;
  return doc(db, "comments", safeCommentId, "replies", safeReplyId);
}

function getCommentLikeDoc(commentId, uid) {
  const safeCommentId = normalizeId(commentId);
  const safeUid = normalizeId(uid);
  if (!safeCommentId || !safeUid || !db || !isFirebaseConfigured) return null;
  return doc(db, "comments", safeCommentId, "likes", safeUid);
}

function getReplyLikeDoc(commentId, replyId, uid) {
  const safeCommentId = normalizeId(commentId);
  const safeReplyId = normalizeId(replyId);
  const safeUid = normalizeId(uid);
  if (!safeCommentId || !safeReplyId || !safeUid || !db || !isFirebaseConfigured) return null;
  return doc(db, "comments", safeCommentId, "replies", safeReplyId, "likes", safeUid);
}

function getImpressionDoc(uid, commentId) {
  const safeUid = normalizeId(uid);
  const safeCommentId = normalizeId(commentId);
  if (!safeUid || !safeCommentId || !db || !isFirebaseConfigured) return null;
  return doc(db, "users", safeUid, "commentImpressions", safeCommentId);
}

function parseCommentFromDoc(docSnap) {
  const data = docSnap.data() || {};
  if (data.deleted) return null;
  const id = normalizeId(data.commentId || docSnap.id);
  const note = String(data.note || "").trim();
  const targetType = normalizeType(data.targetType);
  const targetId = normalizeId(data.targetId);
  if (!id || !note || !targetType || !targetId) return null;

  return {
    id,
    targetType,
    targetId,
    eventId: normalizeId(data.eventId),
    userId: normalizeId(data.authorAppUserId),
    author: String(data.authorName || "Utilisateur").trim() || "Utilisateur",
    note,
    likes: toPositiveInt(data.likes),
    commentType: String(data.commentType || "teaser").trim() || "teaser",
    rating: data.rating == null ? undefined : toPositiveInt(data.rating),
    createdAt: toIso(data.createdAt),
  };
}

function parseReplyFromDoc(docSnap) {
  const data = docSnap.data() || {};
  if (data.deleted) return null;
  const path = String(docSnap.ref.path || "").split("/");
  const commentId = normalizeId(path[1]);
  const id = normalizeId(data.replyId || docSnap.id || path[3]);
  const note = String(data.note || "").trim();
  if (!commentId || !id || !note) return null;

  return {
    commentId,
    reply: {
      id,
      userId: normalizeId(data.authorAppUserId),
      author: String(data.authorName || "Utilisateur").trim() || "Utilisateur",
      note,
      likes: toPositiveInt(data.likes),
      createdAt: toIso(data.createdAt),
    },
  };
}

function parseLikePath(path) {
  const parts = String(path || "").split("/");
  if (parts.length === 4 && parts[0] === "comments" && parts[2] === "likes") {
    return { type: "comment", commentId: normalizeId(parts[1]) };
  }
  if (parts.length === 6 && parts[0] === "comments" && parts[2] === "replies" && parts[4] === "likes") {
    return {
      type: "reply",
      commentId: normalizeId(parts[1]),
      replyId: normalizeId(parts[3]),
    };
  }
  return null;
}

export async function readCloudCommentsBundle(uid = "") {
  const safeUid = normalizeId(uid);
  if (!db || !isFirebaseConfigured) {
    return {
      manualComments: [],
      manualReplies: {},
      reviewLikes: {},
      commentLikes: {},
      replyLikes: {},
      impressions: {},
      seenImpressions: {},
    };
  }

  const commentsSnap = await getDocs(collection(db, "comments"));
  const manualComments = [];
  const commentTypeById = {};
  const impressions = {};

  commentsSnap.docs.forEach((docSnap) => {
    const parsed = parseCommentFromDoc(docSnap);
    if (!parsed) return;
    manualComments.push(parsed);
    commentTypeById[parsed.id] = parsed.commentType;
    impressions[parsed.id] = toPositiveInt(docSnap.data()?.impressionsCount || 0);
  });

  const repliesSnap = await getDocs(collectionGroup(db, "replies"));
  const manualReplies = {};
  repliesSnap.docs.forEach((docSnap) => {
    const parsed = parseReplyFromDoc(docSnap);
    if (!parsed || !commentTypeById[parsed.commentId]) return;
    if (!manualReplies[parsed.commentId]) manualReplies[parsed.commentId] = [];
    manualReplies[parsed.commentId].push(parsed.reply);
  });

  const reviewLikes = {};
  const commentLikes = {};
  const replyLikes = {};

  if (safeUid) {
    const likesSnap = await getDocs(query(collectionGroup(db, "likes"), where("uid", "==", safeUid)));
    likesSnap.docs.forEach((likeDoc) => {
      const parsed = parseLikePath(likeDoc.ref.path);
      if (!parsed) return;
      if (parsed.type === "comment") {
        const mode = commentTypeById[parsed.commentId];
        if (mode === "critique") {
          reviewLikes[parsed.commentId] = true;
        } else {
          commentLikes[parsed.commentId] = true;
        }
        return;
      }
      if (parsed.type === "reply" && parsed.replyId) {
        replyLikes[parsed.replyId] = true;
      }
    });
  }

  const seenImpressions = {};
  if (safeUid) {
    const seenSnap = await getDocs(collection(db, "users", safeUid, "commentImpressions"));
    seenSnap.docs.forEach((docSnap) => {
      const safeId = normalizeId(docSnap.id);
      if (safeId) seenImpressions[safeId] = 1;
    });
  }

  return {
    manualComments,
    manualReplies,
    reviewLikes,
    commentLikes,
    replyLikes,
    impressions,
    seenImpressions,
  };
}

export async function seedCommentsFromLocalUnion(uid, localBundle = {}) {
  if (!db || !isFirebaseConfigured) return false;
  const safeUid = normalizeId(uid);

  const localComments = Array.isArray(localBundle?.manualComments) ? localBundle.manualComments : [];
  const localReplies = localBundle?.manualReplies && typeof localBundle.manualReplies === "object"
    ? localBundle.manualReplies
    : {};
  const localReviewLikes = localBundle?.reviewLikes && typeof localBundle.reviewLikes === "object"
    ? localBundle.reviewLikes
    : {};
  const localCommentLikes = localBundle?.commentLikes && typeof localBundle.commentLikes === "object"
    ? localBundle.commentLikes
    : {};
  const localReplyLikes = localBundle?.replyLikes && typeof localBundle.replyLikes === "object"
    ? localBundle.replyLikes
    : {};
  const localImpressions = localBundle?.impressions && typeof localBundle.impressions === "object"
    ? localBundle.impressions
    : {};
  const localSeen = localBundle?.seenImpressions && typeof localBundle.seenImpressions === "object"
    ? localBundle.seenImpressions
    : {};

  const cloudCommentIds = new Set((await getDocs(collection(db, "comments"))).docs.map((item) => normalizeId(item.id)));

  for (const rawComment of localComments) {
    const commentId = normalizeId(rawComment?.id);
    if (!commentId || cloudCommentIds.has(commentId)) continue;
    await upsertCommentCloud(rawComment);
  }

  for (const [commentId, replies] of Object.entries(localReplies)) {
    const safeCommentId = normalizeId(commentId);
    if (!safeCommentId || !Array.isArray(replies)) continue;
    for (const rawReply of replies) {
      const replyId = normalizeId(rawReply?.id);
      if (!replyId) continue;
      const existing = await getDoc(getReplyDoc(safeCommentId, replyId));
      if (existing.exists()) continue;
      await upsertReplyCloud(safeCommentId, rawReply);
    }
  }

  if (safeUid) {
    for (const commentId of Object.keys(localReviewLikes)) {
      if (!localReviewLikes[commentId]) continue;
      await setCommentLikeStateCloud(safeUid, { id: commentId }, true);
    }
    for (const commentId of Object.keys(localCommentLikes)) {
      if (!localCommentLikes[commentId]) continue;
      await setCommentLikeStateCloud(safeUid, { id: commentId }, true);
    }
    for (const [replyId, state] of Object.entries(localReplyLikes)) {
      if (!state) continue;
      const foundParent = Object.entries(localReplies).find(([, replies]) => Array.isArray(replies) && replies.some((item) => normalizeId(item?.id) === normalizeId(replyId)));
      if (!foundParent) continue;
      await setReplyLikeStateCloud(safeUid, foundParent[0], replyId, true);
    }

    for (const [commentId, seen] of Object.entries(localSeen)) {
      if (!seen) continue;
      const seenRef = getImpressionDoc(safeUid, commentId);
      if (!seenRef) continue;
      await setDoc(seenRef, { seenAt: serverTimestamp() }, { merge: true });
    }
  }

  for (const [commentId, value] of Object.entries(localImpressions)) {
    const safeCommentId = normalizeId(commentId);
    if (!safeCommentId) continue;
    const ref = getCommentDoc(safeCommentId);
    if (!ref) continue;
    const snap = await getDoc(ref);
    if (!snap.exists()) continue;
    const current = toPositiveInt(snap.data()?.impressionsCount || 0);
    const next = toPositiveInt(value);
    if (next <= current) continue;
    await setDoc(ref, {
      impressionsCount: next,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }

  return true;
}

export async function upsertCommentCloud(comment) {
  const safeCommentId = normalizeId(comment?.id);
  if (!safeCommentId) return null;
  const ref = getCommentDoc(safeCommentId);
  if (!ref) return null;

  const payload = {
    commentId: safeCommentId,
    targetType: normalizeType(comment?.targetType),
    targetId: normalizeId(comment?.targetId),
    eventId: normalizeId(comment?.eventId),
    authorUid: normalizeId(comment?.firebaseUid),
    authorAppUserId: normalizeId(comment?.userId),
    authorName: String(comment?.author || "Utilisateur").trim() || "Utilisateur",
    commentType: String(comment?.commentType || "teaser").trim() || "teaser",
    rating: comment?.rating == null ? null : toPositiveInt(comment.rating),
    note: String(comment?.note || "").trim(),
    likes: toPositiveInt(comment?.likes),
    deleted: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (!payload.targetType || !payload.targetId || !payload.note) return null;
  await setDoc(ref, payload, { merge: true });
  return safeCommentId;
}

export async function deleteCommentCloud(commentId) {
  const ref = getCommentDoc(commentId);
  if (!ref) return false;
  await setDoc(ref, {
    deleted: true,
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return true;
}

export async function upsertReplyCloud(commentId, reply) {
  const safeCommentId = normalizeId(commentId);
  const safeReplyId = normalizeId(reply?.id);
  if (!safeCommentId || !safeReplyId) return null;
  const ref = getReplyDoc(safeCommentId, safeReplyId);
  if (!ref) return null;

  await setDoc(ref, {
    replyId: safeReplyId,
    authorUid: normalizeId(reply?.firebaseUid),
    authorAppUserId: normalizeId(reply?.userId),
    authorName: String(reply?.author || "Utilisateur").trim() || "Utilisateur",
    note: String(reply?.note || "").trim(),
    likes: toPositiveInt(reply?.likes),
    deleted: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return safeReplyId;
}

export async function deleteReplyCloud(commentId, replyId) {
  const ref = getReplyDoc(commentId, replyId);
  if (!ref) return false;
  await setDoc(ref, {
    deleted: true,
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return true;
}

export async function setCommentLikeStateCloud(uid, comment, isLiked) {
  const safeUid = normalizeId(uid);
  const safeCommentId = normalizeId(comment?.id || comment);
  const likeRef = getCommentLikeDoc(safeCommentId, safeUid);
  const commentRef = getCommentDoc(safeCommentId);
  if (!safeUid || !safeCommentId || !likeRef || !commentRef) return false;

  await runTransaction(db, async (tx) => {
    const [likeSnap, commentSnap] = await Promise.all([
      tx.get(likeRef),
      tx.get(commentRef),
    ]);
    const hasLike = likeSnap.exists();
    const current = toPositiveInt(commentSnap.data()?.likes || 0);

    if (isLiked && !hasLike) {
      tx.set(likeRef, { uid: safeUid, createdAt: serverTimestamp() }, { merge: true });
      tx.set(commentRef, { likes: current + 1, updatedAt: serverTimestamp() }, { merge: true });
      return;
    }

    if (!isLiked && hasLike) {
      tx.delete(likeRef);
      tx.set(commentRef, { likes: Math.max(0, current - 1), updatedAt: serverTimestamp() }, { merge: true });
    }
  });

  return Boolean(isLiked);
}

export async function setReplyLikeStateCloud(uid, commentId, replyId, isLiked) {
  const safeUid = normalizeId(uid);
  const safeCommentId = normalizeId(commentId);
  const safeReplyId = normalizeId(replyId);
  const likeRef = getReplyLikeDoc(safeCommentId, safeReplyId, safeUid);
  const replyRef = getReplyDoc(safeCommentId, safeReplyId);
  if (!safeUid || !safeCommentId || !safeReplyId || !likeRef || !replyRef) return false;

  await runTransaction(db, async (tx) => {
    const [likeSnap, replySnap] = await Promise.all([
      tx.get(likeRef),
      tx.get(replyRef),
    ]);
    const hasLike = likeSnap.exists();
    const current = toPositiveInt(replySnap.data()?.likes || 0);

    if (isLiked && !hasLike) {
      tx.set(likeRef, { uid: safeUid, createdAt: serverTimestamp() }, { merge: true });
      tx.set(replyRef, { likes: current + 1, updatedAt: serverTimestamp() }, { merge: true });
      return;
    }

    if (!isLiked && hasLike) {
      tx.delete(likeRef);
      tx.set(replyRef, { likes: Math.max(0, current - 1), updatedAt: serverTimestamp() }, { merge: true });
    }
  });

  return Boolean(isLiked);
}

export async function registerCommentImpressionCloud(uid, commentId) {
  const safeUid = normalizeId(uid);
  const safeCommentId = normalizeId(commentId);
  const seenRef = getImpressionDoc(safeUid, safeCommentId);
  const commentRef = getCommentDoc(safeCommentId);
  if (!safeUid || !safeCommentId || !seenRef || !commentRef) return 0;

  const nextValue = await runTransaction(db, async (tx) => {
    const [seenSnap, commentSnap] = await Promise.all([
      tx.get(seenRef),
      tx.get(commentRef),
    ]);

    const current = toPositiveInt(commentSnap.data()?.impressionsCount || 0);
    if (seenSnap.exists()) {
      return current;
    }

    const next = current + 1;
    tx.set(seenRef, { seenAt: serverTimestamp() }, { merge: true });
    tx.set(commentRef, { impressionsCount: next, updatedAt: serverTimestamp() }, { merge: true });
    return next;
  });

  return toPositiveInt(nextValue);
}
