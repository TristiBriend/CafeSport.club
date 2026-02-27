import { isFirebaseConfigured } from "./firebase";
import {
  readUserFollows,
  seedUserFollowsFromLocalUnion,
  subscribeUserFollows,
} from "./followsFirestoreService";
import {
  readCloudCommentsBundle,
  seedCommentsFromLocalUnion,
} from "./commentsFirestoreService";
import {
  readUserRatings,
  seedRatingsFromLocalUnion,
} from "./ratingsFirestoreService";
import {
  readAllObjectTagsBundle,
  seedObjectTagsFromLocalUnion,
} from "./objectTagsFirestoreService";
import {
  readUserFeedTabs,
  seedFeedTabsFromLocalUnion,
} from "./feedTabsFirestoreService";
import {
  readPublicProfileOverride,
  seedPublicProfileFromLocalUnion,
} from "./profileFirestoreService";

export const SOCIAL_SYNC_DOMAIN = {
  FOLLOWS: "follows",
  COMMENTS: "comments",
  RATINGS: "ratings",
  TAGS: "tags",
  TABS: "tabs",
  PROFILE: "profile",
};

const DOMAINS = Object.values(SOCIAL_SYNC_DOMAIN);

const USER_FOLLOWS_KEY = "cafesport.club_user_follows";
const TARGET_FOLLOWS_KEY = "cafesport.club_target_follows_v1";
const MANUAL_COMMENTS_KEY = "cafesport.club_manual_comments_v1";
const MANUAL_REPLIES_KEY = "cafesport.club_manual_replies_v1";
const REVIEW_LIKES_KEY = "cafesport.club_review_likes";
const COMMENT_LIKES_KEY = "cafesport.club_comment_likes";
const REPLY_LIKES_KEY = "cafesport.club_reply_likes";
const COMMENT_IMPRESSIONS_KEY = "cafesport.club_comment_impressions";
const COMMENT_IMPRESSIONS_SESSION_KEY = "cafesport.club_comment_impressions_session";
const RATINGS_KEY = "cafesport.club_ratings";
const TAG_CATALOG_KEY = "cafesport.club_tag_catalog_v1";
const OBJECT_TAGS_KEY = "cafesport.club_object_tags_v2";
const OBJECT_TAG_VOTES_KEY = "cafesport.club_object_tag_votes_v2";
const OBJECT_TAGS_SEED_STATE_KEY = "cafesport.club_object_tags_seed_v2";
const OBJECT_TAG_SEED_SUMMARY_KEY = "cafesport.club_object_tag_seed_summary_v1";
const FEED_OPTIONAL_TABS_STORAGE_KEY = "sofa_feed_optional_tabs_v1";
const PROFILE_AVATAR_OVERRIDES_KEY = "cafesport.club_profile_avatar_overrides";
const PROFILE_DETAILS_OVERRIDES_KEY = "cafesport.club_profile_details_overrides_v1";

const CURRENT_USER_TAG_KEY = "usr-manual";

const DOMAIN_FLAGS = {
  follows: String(import.meta.env.VITE_FIREBASE_SYNC_FOLLOWS ?? "1") !== "0",
  comments: String(import.meta.env.VITE_FIREBASE_SYNC_COMMENTS ?? "1") !== "0",
  ratings: String(import.meta.env.VITE_FIREBASE_SYNC_RATINGS ?? "1") !== "0",
  tags: String(import.meta.env.VITE_FIREBASE_SYNC_TAGS ?? "1") !== "0",
  tabs: String(import.meta.env.VITE_FIREBASE_SYNC_FEED_TABS ?? "1") !== "0",
  profile: String(import.meta.env.VITE_FIREBASE_SYNC_PROFILE ?? "1") !== "0",
};

function buildInitialReady() {
  return DOMAINS.reduce((acc, domain) => {
    acc[domain] = !DOMAIN_FLAGS[domain];
    return acc;
  }, {});
}

function buildInitialRevision() {
  return DOMAINS.reduce((acc, domain) => {
    acc[domain] = 0;
    return acc;
  }, {});
}

let mode = "guest-local";
let readyByDomain = buildInitialReady();
let revisionByDomain = buildInitialRevision();
let currentIdentity = {
  hasCloudSession: false,
  isAuthenticated: false,
  isFirebaseConfigured,
  firebaseUid: "",
  appUserId: "",
};
let syncRunToken = 0;
let followUnsubscribe = null;

const listeners = new Set();

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

function readLocalObject(key) {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeLocalObject(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function readLocalArray(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalArray(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(Array.isArray(value) ? value : []));
}

function writeSessionObject(key, value) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(key, JSON.stringify(value && typeof value === "object" ? value : {}));
}

function notify() {
  listeners.forEach((listener) => {
    try {
      listener(getSocialSyncSnapshot());
    } catch {
      // noop
    }
  });
}

function setDomainReady(domain, ready) {
  if (!DOMAINS.includes(domain)) return;
  readyByDomain = {
    ...readyByDomain,
    [domain]: Boolean(ready),
  };
  notify();
}

function bumpDomainRevision(domain) {
  if (!DOMAINS.includes(domain)) return;
  revisionByDomain = {
    ...revisionByDomain,
    [domain]: Number(revisionByDomain[domain] || 0) + 1,
  };
  notify();
}

function cleanupSubscriptions() {
  if (typeof followUnsubscribe === "function") {
    followUnsubscribe();
  }
  followUnsubscribe = null;
}

function readLocalFollowEntries() {
  const userMap = readLocalObject(USER_FOLLOWS_KEY);
  const targetMap = readLocalObject(TARGET_FOLLOWS_KEY);
  const entries = [];

  Object.entries(userMap).forEach(([targetId, state]) => {
    if (!state) return;
    const safeTargetId = normalizeId(targetId);
    if (!safeTargetId) return;
    entries.push({ targetType: "user", targetId: safeTargetId });
  });

  Object.entries(targetMap).forEach(([key, state]) => {
    if (!state) return;
    const [targetType = "", ...idParts] = String(key || "").split(":");
    const safeType = String(targetType || "").trim().toLowerCase();
    const safeTargetId = normalizeId(idParts.join(":"));
    if (!safeType || !safeTargetId) return;
    entries.push({ targetType: safeType, targetId: safeTargetId });
  });

  return entries;
}

function writeLocalFollowEntries(entries = []) {
  const userMap = {};
  const targetMap = {};
  (Array.isArray(entries) ? entries : []).forEach((entry) => {
    const safeType = String(entry?.targetType || "").trim().toLowerCase();
    const safeId = normalizeId(entry?.targetId);
    if (!safeType || !safeId) return;
    if (safeType === "user") {
      userMap[safeId] = true;
      return;
    }
    targetMap[`${safeType}:${safeId}`] = true;
  });
  writeLocalObject(USER_FOLLOWS_KEY, userMap);
  writeLocalObject(TARGET_FOLLOWS_KEY, targetMap);
}

function readLocalCommentsBundle() {
  return {
    manualComments: readLocalArray(MANUAL_COMMENTS_KEY),
    manualReplies: readLocalObject(MANUAL_REPLIES_KEY),
    reviewLikes: readLocalObject(REVIEW_LIKES_KEY),
    commentLikes: readLocalObject(COMMENT_LIKES_KEY),
    replyLikes: readLocalObject(REPLY_LIKES_KEY),
    impressions: readLocalObject(COMMENT_IMPRESSIONS_KEY),
    seenImpressions: (() => {
      if (typeof window === "undefined") return {};
      try {
        const raw = window.sessionStorage.getItem(COMMENT_IMPRESSIONS_SESSION_KEY);
        const parsed = JSON.parse(raw || "{}");
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch {
        return {};
      }
    })(),
  };
}

function writeLocalCommentsBundle(bundle = {}) {
  writeLocalArray(MANUAL_COMMENTS_KEY, bundle.manualComments || []);
  writeLocalObject(MANUAL_REPLIES_KEY, bundle.manualReplies || {});
  writeLocalObject(REVIEW_LIKES_KEY, bundle.reviewLikes || {});
  writeLocalObject(COMMENT_LIKES_KEY, bundle.commentLikes || {});
  writeLocalObject(REPLY_LIKES_KEY, bundle.replyLikes || {});
  writeLocalObject(COMMENT_IMPRESSIONS_KEY, bundle.impressions || {});
  writeSessionObject(COMMENT_IMPRESSIONS_SESSION_KEY, bundle.seenImpressions || {});
}

function readLocalTagsBundle() {
  return {
    catalog: readLocalObject(TAG_CATALOG_KEY),
    objectTags: readLocalObject(OBJECT_TAGS_KEY),
    votesByTag: readLocalObject(OBJECT_TAG_VOTES_KEY),
    seedState: readLocalObject(OBJECT_TAGS_SEED_STATE_KEY),
    seedSummary: readLocalObject(OBJECT_TAG_SEED_SUMMARY_KEY),
  };
}

function writeLocalTagsBundle(bundle = {}) {
  writeLocalObject(TAG_CATALOG_KEY, bundle.catalog || {});
  writeLocalObject(OBJECT_TAGS_KEY, bundle.objectTags || {});
  writeLocalObject(OBJECT_TAG_VOTES_KEY, bundle.votesByTag || {});
  writeLocalObject(OBJECT_TAGS_SEED_STATE_KEY, bundle.seedState || {});
  writeLocalObject(OBJECT_TAG_SEED_SUMMARY_KEY, bundle.seedSummary || {});
}

function readLocalProfilePatch(appUserId) {
  const safeId = normalizeId(appUserId);
  if (!safeId) return {};
  const avatarMap = readLocalObject(PROFILE_AVATAR_OVERRIDES_KEY);
  const detailsMap = readLocalObject(PROFILE_DETAILS_OVERRIDES_KEY);
  return {
    avatarUrl: String(avatarMap[safeId] || "").trim(),
    ...(detailsMap[safeId] && typeof detailsMap[safeId] === "object" ? detailsMap[safeId] : {}),
  };
}

function writeLocalProfilePatch(appUserId, patch = {}) {
  const safeId = normalizeId(appUserId);
  if (!safeId) return;
  const avatarMap = readLocalObject(PROFILE_AVATAR_OVERRIDES_KEY);
  const detailsMap = readLocalObject(PROFILE_DETAILS_OVERRIDES_KEY);

  const avatar = String(patch.avatarUrl || "").trim();
  if (avatar) {
    avatarMap[safeId] = avatar;
  }

  const detailsPatch = {
    age: String(patch.age || "").trim(),
    city: String(patch.city || "").trim(),
    bioLong: String(patch.bioLong || "").trim(),
    favoriteTeam: String(patch.favoriteTeam || "").trim(),
    favoriteTeamIds: sanitizeIdList(patch.favoriteTeamIds, 5),
    favoriteAthlete: String(patch.favoriteAthlete || "").trim(),
    favoriteAthleteIds: sanitizeIdList(patch.favoriteAthleteIds, 5),
    topEventIds: sanitizeIdList(patch.topEventIds, 5),
    quote: String(patch.quote || "").trim(),
  };
  const hasDetail = Object.values(detailsPatch).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  });
  if (hasDetail) {
    detailsMap[safeId] = detailsPatch;
  }

  writeLocalObject(PROFILE_AVATAR_OVERRIDES_KEY, avatarMap);
  writeLocalObject(PROFILE_DETAILS_OVERRIDES_KEY, detailsMap);
}

async function syncCloudDomains(identity, runToken) {
  const safeUid = normalizeId(identity?.firebaseUid);
  const safeAppUserId = normalizeId(identity?.appUserId);
  if (!safeUid) return;

  if (DOMAIN_FLAGS.follows) {
    try {
      await seedUserFollowsFromLocalUnion(safeUid, readLocalFollowEntries());
      const initialEntries = await readUserFollows(safeUid);
      if (runToken !== syncRunToken) return;
      writeLocalFollowEntries(initialEntries);
      setDomainReady(SOCIAL_SYNC_DOMAIN.FOLLOWS, true);
      bumpDomainRevision(SOCIAL_SYNC_DOMAIN.FOLLOWS);

      followUnsubscribe = subscribeUserFollows(safeUid, (entries) => {
        writeLocalFollowEntries(entries);
        setDomainReady(SOCIAL_SYNC_DOMAIN.FOLLOWS, true);
        bumpDomainRevision(SOCIAL_SYNC_DOMAIN.FOLLOWS);
      }, () => {
        setDomainReady(SOCIAL_SYNC_DOMAIN.FOLLOWS, true);
      });
    } catch {
      setDomainReady(SOCIAL_SYNC_DOMAIN.FOLLOWS, true);
    }
  }

  if (DOMAIN_FLAGS.comments) {
    try {
      await seedCommentsFromLocalUnion(safeUid, readLocalCommentsBundle());
      const cloudBundle = await readCloudCommentsBundle(safeUid);
      if (runToken !== syncRunToken) return;
      writeLocalCommentsBundle(cloudBundle);
      setDomainReady(SOCIAL_SYNC_DOMAIN.COMMENTS, true);
      bumpDomainRevision(SOCIAL_SYNC_DOMAIN.COMMENTS);
    } catch {
      setDomainReady(SOCIAL_SYNC_DOMAIN.COMMENTS, true);
    }
  }

  if (DOMAIN_FLAGS.ratings) {
    try {
      const localRatings = readLocalObject(RATINGS_KEY);
      await seedRatingsFromLocalUnion(safeUid, localRatings);
      const cloudRatings = await readUserRatings(safeUid);
      if (runToken !== syncRunToken) return;
      writeLocalObject(RATINGS_KEY, cloudRatings);
      setDomainReady(SOCIAL_SYNC_DOMAIN.RATINGS, true);
      bumpDomainRevision(SOCIAL_SYNC_DOMAIN.RATINGS);
    } catch {
      setDomainReady(SOCIAL_SYNC_DOMAIN.RATINGS, true);
    }
  }

  if (DOMAIN_FLAGS.tags) {
    try {
      await seedObjectTagsFromLocalUnion(safeUid, readLocalTagsBundle(), CURRENT_USER_TAG_KEY);
      const cloudTags = await readAllObjectTagsBundle(safeUid, CURRENT_USER_TAG_KEY);
      if (runToken !== syncRunToken) return;
      writeLocalTagsBundle(cloudTags);
      setDomainReady(SOCIAL_SYNC_DOMAIN.TAGS, true);
      bumpDomainRevision(SOCIAL_SYNC_DOMAIN.TAGS);
    } catch {
      setDomainReady(SOCIAL_SYNC_DOMAIN.TAGS, true);
    }
  }

  if (DOMAIN_FLAGS.tabs) {
    try {
      const localTabs = readLocalArray(FEED_OPTIONAL_TABS_STORAGE_KEY);
      await seedFeedTabsFromLocalUnion(safeUid, localTabs);
      const cloudTabs = await readUserFeedTabs(safeUid);
      if (runToken !== syncRunToken) return;
      writeLocalArray(FEED_OPTIONAL_TABS_STORAGE_KEY, cloudTabs);
      setDomainReady(SOCIAL_SYNC_DOMAIN.TABS, true);
      bumpDomainRevision(SOCIAL_SYNC_DOMAIN.TABS);
    } catch {
      setDomainReady(SOCIAL_SYNC_DOMAIN.TABS, true);
    }
  }

  if (DOMAIN_FLAGS.profile) {
    try {
      if (safeAppUserId) {
        await seedPublicProfileFromLocalUnion(safeAppUserId, safeUid, readLocalProfilePatch(safeAppUserId));
        const cloudProfile = await readPublicProfileOverride(safeAppUserId);
        if (runToken !== syncRunToken) return;
        if (cloudProfile) {
          writeLocalProfilePatch(safeAppUserId, cloudProfile);
        }
      }
      setDomainReady(SOCIAL_SYNC_DOMAIN.PROFILE, true);
      bumpDomainRevision(SOCIAL_SYNC_DOMAIN.PROFILE);
    } catch {
      setDomainReady(SOCIAL_SYNC_DOMAIN.PROFILE, true);
    }
  }
}

export function getSocialSyncSnapshot() {
  return {
    mode,
    readyByDomain,
    revisionByDomain,
    currentIdentity,
    flags: DOMAIN_FLAGS,
  };
}

export function subscribeSocialSync(listener) {
  if (typeof listener !== "function") return () => {};
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isSocialDomainEnabled(domain) {
  return Boolean(DOMAIN_FLAGS[String(domain || "")]);
}

export function getSocialSyncCloudIdentity() {
  const safeUid = normalizeId(currentIdentity.firebaseUid);
  const safeAppUserId = normalizeId(currentIdentity.appUserId);
  const isCloudMode = (mode === "cloud-auth" || mode === "cloud-anon")
    && Boolean(safeUid)
    && Boolean(currentIdentity.isFirebaseConfigured);
  return {
    isCloudMode,
    firebaseUid: safeUid,
    appUserId: safeAppUserId,
  };
}

export function notifyDomainDirty(domain) {
  bumpDomainRevision(domain);
}

export async function initializeSocialSyncSession({
  hasCloudSession = false,
  isAuthenticated = false,
  firebaseUid = "",
  appUserId = "",
  firebaseConfigured = isFirebaseConfigured,
} = {}) {
  syncRunToken += 1;
  const runToken = syncRunToken;

  cleanupSubscriptions();

  currentIdentity = {
    hasCloudSession: Boolean(hasCloudSession),
    isAuthenticated: Boolean(isAuthenticated),
    isFirebaseConfigured: Boolean(firebaseConfigured),
    firebaseUid: normalizeId(firebaseUid),
    appUserId: normalizeId(appUserId),
  };

  const cloudMode = Boolean(
    currentIdentity.hasCloudSession
    && currentIdentity.isFirebaseConfigured
    && currentIdentity.firebaseUid,
  );

  mode = cloudMode
    ? (currentIdentity.isAuthenticated ? "cloud-auth" : "cloud-anon")
    : "guest-local";

  readyByDomain = DOMAINS.reduce((acc, domain) => {
    if (!DOMAIN_FLAGS[domain]) {
      acc[domain] = true;
      return acc;
    }
    acc[domain] = !cloudMode;
    return acc;
  }, {});
  notify();

  if (!cloudMode) {
    DOMAINS.forEach((domain) => {
      if (!DOMAIN_FLAGS[domain]) return;
      bumpDomainRevision(domain);
    });
    return;
  }

  await syncCloudDomains(currentIdentity, runToken);
}
