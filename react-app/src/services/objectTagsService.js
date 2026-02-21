import { getAthleteById, getListById, getTeamById, getUserById } from "./catalogService";
import { getEventById } from "./eventsService";
import { getLeagueById, getLeagueSeasonById } from "./leaguesService";

const TAG_CATALOG_KEY = "cafesport.club_tag_catalog_v1";
const OBJECT_TAGS_KEY = "cafesport.club_object_tags_v2";
const OBJECT_TAG_VOTES_KEY = "cafesport.club_object_tag_votes_v2";
const OBJECT_TAGS_SEED_STATE_KEY = "cafesport.club_object_tags_seed_v2";
const OBJECT_TAG_SEED_SUMMARY_KEY = "cafesport.club_object_tag_seed_summary_v1";

const CURRENT_USER_ID = "usr-manual";

export const TAG_OBJECT = {
  EVENT: "event",
  ATHLETE: "athlete",
  TEAM: "team",
  LEAGUE: "league",
  LEAGUE_SEASON: "league-season",
  LIST: "list",
  USER: "user",
};

const TAG_OBJECT_TYPES = new Set(Object.values(TAG_OBJECT));

function readStorageObject(key) {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeStorageObject(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function hashCode(value) {
  const source = String(value || "");
  let hash = 0;
  for (let i = 0; i < source.length; i += 1) {
    hash = ((hash << 5) - hash) + source.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function normalizeObjectType(objectType) {
  const token = String(objectType || "").trim().toLowerCase();
  return TAG_OBJECT_TYPES.has(token) ? token : "";
}

function normalizeObjectId(objectId) {
  return String(objectId || "").trim();
}

function normalizeTagLabel(rawLabel) {
  return String(rawLabel || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 28);
}

function normalizeTagLabelKey(rawLabel) {
  return normalizeTagLabel(rawLabel)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getObjectTagKey(objectType, objectId) {
  const safeType = normalizeObjectType(objectType);
  const safeId = normalizeObjectId(objectId);
  if (!safeType || !safeId) return "";
  return `${safeType}:${safeId}`;
}

function getObjectTagVoteKey(objectType, objectId, tagId) {
  const objectKey = getObjectTagKey(objectType, objectId);
  const safeTagId = String(tagId || "").trim();
  if (!objectKey || !safeTagId) return "";
  return `${objectKey}|${safeTagId}`;
}

function readCatalog() {
  const raw = readStorageObject(TAG_CATALOG_KEY);
  return Object.entries(raw).reduce((acc, [tagId, entry]) => {
    if (!entry || typeof entry !== "object") return acc;
    const label = normalizeTagLabel(entry.label);
    if (!label) return acc;
    acc[tagId] = {
      id: tagId,
      label,
      normalized: normalizeTagLabelKey(label),
    };
    return acc;
  }, {});
}

function writeCatalog(catalog) {
  writeStorageObject(TAG_CATALOG_KEY, catalog);
}

function ensureTagInCatalog(rawLabel) {
  const safeLabel = normalizeTagLabel(rawLabel);
  if (!safeLabel) return "";

  const catalog = readCatalog();
  const targetKey = normalizeTagLabelKey(safeLabel);
  const found = Object.values(catalog).find((entry) => entry.normalized === targetKey);
  if (found) return found.id;

  const tagId = `tag-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  catalog[tagId] = {
    id: tagId,
    label: safeLabel,
    normalized: targetKey,
  };
  writeCatalog(catalog);
  return tagId;
}

function ensureObjectTagLink(objectType, objectId, tagId) {
  const safeTagId = String(tagId || "").trim();
  const objectKey = getObjectTagKey(objectType, objectId);
  if (!safeTagId || !objectKey) return false;

  const tagLinks = readStorageObject(OBJECT_TAGS_KEY);
  const current = Array.isArray(tagLinks[objectKey]) ? tagLinks[objectKey].filter(Boolean) : [];
  if (!current.includes(safeTagId)) {
    tagLinks[objectKey] = [...new Set([...current, safeTagId])];
    writeStorageObject(OBJECT_TAGS_KEY, tagLinks);
    return true;
  }
  return false;
}

function getDefaultObjectTagLabels(objectType, objectId) {
  const safeType = normalizeObjectType(objectType);
  const safeId = normalizeObjectId(objectId);
  if (!safeType || !safeId) return [];

  if (safeType === TAG_OBJECT.EVENT) {
    const event = getEventById(safeId);
    if (!event) return [];
    const score = Number(event.communityScore || 0);
    return [
      event.sport,
      event.league,
      event.status,
      event.location,
      score >= 9 ? "Legendaire" : score >= 8 ? "Top niveau" : "A suivre",
    ].filter(Boolean);
  }

  if (safeType === TAG_OBJECT.ATHLETE) {
    const athlete = getAthleteById(safeId);
    if (!athlete) return [];
    return [
      athlete.sport,
      athlete.country,
      athlete.role,
      "Profil athlete",
    ].filter(Boolean);
  }

  if (safeType === TAG_OBJECT.TEAM) {
    const team = getTeamById(safeId);
    if (!team) return [];
    return [
      team.sport,
      team.city,
      "Team",
      "Collectif",
    ].filter(Boolean);
  }

  if (safeType === TAG_OBJECT.LEAGUE) {
    const league = getLeagueById(safeId);
    if (!league) return [];
    return [
      league.sport,
      "Competition",
      league.count > 20 ? "Long format" : "Saison compacte",
    ].filter(Boolean);
  }

  if (safeType === TAG_OBJECT.LEAGUE_SEASON) {
    const season = getLeagueSeasonById(safeId);
    if (!season) return [];
    return [
      season.sport,
      season.year ? `Saison ${season.year}` : "Saison",
      season.upcomingCount > 0 ? "Encore en cours" : "Terminee",
    ].filter(Boolean);
  }

  if (safeType === TAG_OBJECT.LIST) {
    const list = getListById(safeId);
    if (!list) return [];
    return [
      list.sport,
      "Classement",
      Number(list.likes || 0) > 500 ? "Populaire" : "Communautaire",
    ].filter(Boolean);
  }

  if (safeType === TAG_OBJECT.USER) {
    const user = getUserById(safeId);
    if (!user) return [];
    const favorites = Array.isArray(user.favoriteSports) ? user.favoriteSports : [];
    return [
      ...(favorites.slice(0, 2)),
      user.location,
      user.badge,
    ].filter(Boolean);
  }

  return [];
}

function seedObjectTagsIfMissing(objectType, objectId) {
  const objectKey = getObjectTagKey(objectType, objectId);
  if (!objectKey) return;

  const seededMap = readStorageObject(OBJECT_TAGS_SEED_STATE_KEY);
  if (seededMap[objectKey]) return;

  const labels = getDefaultObjectTagLabels(objectType, objectId);
  const seedSummary = readStorageObject(OBJECT_TAG_SEED_SUMMARY_KEY);

  labels.forEach((label) => {
    const tagId = ensureTagInCatalog(label);
    if (!tagId) return;
    ensureObjectTagLink(objectType, objectId, tagId);

    const voteKey = getObjectTagVoteKey(objectType, objectId, tagId);
    if (!voteKey || seedSummary[voteKey]) return;
    const seed = hashCode(`${voteKey}:${label}`);
    seedSummary[voteKey] = {
      up: 1 + (seed % 7),
      down: seed % 3,
    };
  });

  seededMap[objectKey] = 1;
  writeStorageObject(OBJECT_TAG_SEED_SUMMARY_KEY, seedSummary);
  writeStorageObject(OBJECT_TAGS_SEED_STATE_KEY, seededMap);
}

function getVoteSummary(objectType, objectId, tagId) {
  const voteKey = getObjectTagVoteKey(objectType, objectId, tagId);
  if (!voteKey) {
    return {
      up: 0,
      down: 0,
      score: 0,
      currentUserVote: 0,
    };
  }

  const seedSummary = readStorageObject(OBJECT_TAG_SEED_SUMMARY_KEY);
  const votesMapByTag = readStorageObject(OBJECT_TAG_VOTES_KEY);
  const votesMap = votesMapByTag[voteKey] && typeof votesMapByTag[voteKey] === "object"
    ? votesMapByTag[voteKey]
    : {};

  const seedUp = Number(seedSummary[voteKey]?.up || 0);
  const seedDown = Number(seedSummary[voteKey]?.down || 0);

  let up = seedUp;
  let down = seedDown;

  Object.values(votesMap).forEach((voteValue) => {
    if (Number(voteValue) === 1) up += 1;
    if (Number(voteValue) === -1) down += 1;
  });

  const currentUserVote = Number(votesMap[CURRENT_USER_ID] || 0);
  return {
    up,
    down,
    score: up - down,
    currentUserVote: currentUserVote === 1 || currentUserVote === -1 ? currentUserVote : 0,
  };
}

function setObjectTagVote(objectType, objectId, tagId, voteValue) {
  const voteKey = getObjectTagVoteKey(objectType, objectId, tagId);
  if (!voteKey) return false;

  const safeVote = Number(voteValue);
  const nextVote = safeVote === 1 || safeVote === -1 ? safeVote : 0;

  const votesMapByTag = readStorageObject(OBJECT_TAG_VOTES_KEY);
  const current = votesMapByTag[voteKey] && typeof votesMapByTag[voteKey] === "object"
    ? { ...votesMapByTag[voteKey] }
    : {};

  if (nextVote === 0) {
    delete current[CURRENT_USER_ID];
  } else {
    current[CURRENT_USER_ID] = nextVote;
  }

  votesMapByTag[voteKey] = current;
  writeStorageObject(OBJECT_TAG_VOTES_KEY, votesMapByTag);
  return true;
}

export function getObjectTagEntries(objectType, objectId) {
  const safeType = normalizeObjectType(objectType);
  const safeId = normalizeObjectId(objectId);
  if (!safeType || !safeId) return [];

  seedObjectTagsIfMissing(safeType, safeId);

  const objectKey = getObjectTagKey(safeType, safeId);
  const tagLinks = readStorageObject(OBJECT_TAGS_KEY);
  const catalog = readCatalog();
  const tagIds = Array.isArray(tagLinks[objectKey]) ? tagLinks[objectKey].filter(Boolean) : [];

  const entries = tagIds
    .map((tagId) => {
      const catalogEntry = catalog[tagId];
      if (!catalogEntry?.label) return null;
      const summary = getVoteSummary(safeType, safeId, tagId);
      return {
        tagId,
        label: catalogEntry.label,
        up: summary.up,
        down: summary.down,
        score: summary.score,
        currentUserVote: summary.currentUserVote,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const scoreDiff = Number(b.score || 0) - Number(a.score || 0);
      if (scoreDiff !== 0) return scoreDiff;
      const upDiff = Number(b.up || 0) - Number(a.up || 0);
      if (upDiff !== 0) return upDiff;
      return String(a.label || "").localeCompare(String(b.label || ""));
    });

  return entries;
}

export function addUserTagToObject(objectType, objectId, rawLabel) {
  const safeType = normalizeObjectType(objectType);
  const safeId = normalizeObjectId(objectId);
  const safeLabel = normalizeTagLabel(rawLabel);
  if (!safeType || !safeId || safeLabel.length < 2) return null;

  seedObjectTagsIfMissing(safeType, safeId);

  const tagId = ensureTagInCatalog(safeLabel);
  if (!tagId) return null;
  ensureObjectTagLink(safeType, safeId, tagId);
  setObjectTagVote(safeType, safeId, tagId, 1);

  return {
    tagId,
    label: safeLabel,
  };
}

export function toggleObjectTagVote(objectType, objectId, tagId, voteValue) {
  const safeType = normalizeObjectType(objectType);
  const safeId = normalizeObjectId(objectId);
  const safeTagId = String(tagId || "").trim();
  if (!safeType || !safeId || !safeTagId) return false;

  seedObjectTagsIfMissing(safeType, safeId);

  const targetVote = Number(voteValue) === -1 ? -1 : 1;
  const current = getVoteSummary(safeType, safeId, safeTagId).currentUserVote;
  const nextVote = current === targetVote ? 0 : targetVote;
  return setObjectTagVote(safeType, safeId, safeTagId, nextVote);
}

export function getTopObjectTags(objectType, objectId, limit = 6) {
  return getObjectTagEntries(objectType, objectId)
    .slice(0, Math.max(0, Number(limit) || 0));
}

export function isObjectTagType(value) {
  return Boolean(normalizeObjectType(value));
}
