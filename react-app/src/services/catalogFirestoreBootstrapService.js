import { doc, writeBatch } from "firebase/firestore";
import {
  athleteParticipation,
  athletes,
  competitionCatalog,
  curatedLists,
  events,
  eventTeams,
  seasonCatalog,
  teams,
} from "../data/modelStore";
import { db, isFirebaseConfigured } from "./firebase";

const COLLECTION_EVENTS = "events";
const COLLECTION_ATHLETES = "athletes";
const COLLECTION_TEAMS = "teams";
const COLLECTION_LEAGUES = "leagues";
const COLLECTION_LEAGUE_SEASONS = "leagueSeasons";
const COLLECTION_LISTS = "lists";

const MAX_BATCH_WRITES = 400;

function normalizeId(value) {
  return String(value || "").trim();
}

function toFiniteNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function sanitizeFirestoreValue(value) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeFirestoreValue(item))
      .filter((item) => item !== undefined);
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === "object") {
    const output = {};
    Object.entries(value).forEach(([key, item]) => {
      const safeValue = sanitizeFirestoreValue(item);
      if (safeValue !== undefined) output[key] = safeValue;
    });
    return output;
  }
  return value;
}

function toChunks(list, size = MAX_BATCH_WRITES) {
  const source = Array.isArray(list) ? list : [];
  const chunks = [];
  for (let index = 0; index < source.length; index += size) {
    chunks.push(source.slice(index, index + size));
  }
  return chunks;
}

function mapEventTeams() {
  const map = new Map();
  (Array.isArray(eventTeams) ? eventTeams : []).forEach((row) => {
    const eventId = normalizeId(row?.eventId);
    if (!eventId) return;
    const teamIds = Array.isArray(row?.teamIds)
      ? row.teamIds.map((teamId) => normalizeId(teamId)).filter(Boolean)
      : [];
    map.set(eventId, teamIds);
  });
  return map;
}

function mapEventAthletes() {
  const map = new Map();
  (Array.isArray(athleteParticipation) ? athleteParticipation : []).forEach((row) => {
    const eventId = normalizeId(row?.eventId);
    if (!eventId) return;
    const athleteIds = Array.isArray(row?.athleteIds)
      ? row.athleteIds.map((athleteId) => normalizeId(athleteId)).filter(Boolean)
      : [];
    map.set(eventId, athleteIds);
  });
  return map;
}

function buildEventsRows() {
  const teamsByEvent = mapEventTeams();
  const athletesByEvent = mapEventAthletes();
  return (Array.isArray(events) ? events : [])
    .map((event) => {
      const id = normalizeId(event?.id);
      if (!id) return null;
      return sanitizeFirestoreValue({
        id,
        title: String(event?.title || "").trim(),
        sport: String(event?.sport || "").trim(),
        league: String(event?.league || "").trim(),
        competitionId: normalizeId(event?.competitionId),
        seasonId: normalizeId(event?.seasonId),
        seasonKey: String(event?.seasonKey || "").trim(),
        dateISO: String(event?.dateISO || "").trim(),
        location: String(event?.location || "").trim(),
        status: String(event?.status || "").trim(),
        result: String(event?.result || "").trim(),
        reviews: Math.max(0, Math.round(toFiniteNumber(event?.reviews, 0))),
        communityScore: event?.communityScore == null ? null : Math.round(toFiniteNumber(event?.communityScore, 0)),
        image: String(event?.image || "").trim(),
        teamIds: teamsByEvent.get(id) || [],
        athleteIds: athletesByEvent.get(id) || [],
      });
    })
    .filter(Boolean);
}

function buildAthletesRows() {
  return (Array.isArray(athletes) ? athletes : [])
    .map((athlete) => {
      const id = normalizeId(athlete?.id);
      if (!id) return null;
      return sanitizeFirestoreValue({
        id,
        name: String(athlete?.name || "").trim(),
        sport: String(athlete?.sport || "").trim(),
        country: String(athlete?.country || "").trim(),
        role: String(athlete?.role || "").trim(),
        bio: String(athlete?.bio || "").trim(),
        image: String(athlete?.image || "").trim(),
        teamId: normalizeId(athlete?.teamId),
      });
    })
    .filter(Boolean);
}

function buildTeamsRows() {
  return (Array.isArray(teams) ? teams : [])
    .map((team) => {
      const id = normalizeId(team?.id);
      if (!id) return null;
      return sanitizeFirestoreValue({
        id,
        name: String(team?.name || "").trim(),
        nameFull: String(team?.nameFull || "").trim(),
        nameMini: String(team?.nameMini || "").trim(),
        sport: String(team?.sport || "").trim(),
        city: String(team?.city || "").trim(),
        athleteIds: Array.isArray(team?.athleteIds)
          ? team.athleteIds.map((athleteId) => normalizeId(athleteId)).filter(Boolean)
          : [],
      });
    })
    .filter(Boolean);
}

function buildLeaguesRows() {
  return (Array.isArray(competitionCatalog) ? competitionCatalog : [])
    .map((league) => {
      const id = normalizeId(league?.id);
      if (!id) return null;
      return sanitizeFirestoreValue({
        id,
        title: String(league?.currentName || "").trim(),
        sport: String(league?.sport || "").trim(),
        seasonModel: String(league?.seasonModel || "").trim(),
        frequency: String(league?.frequency || "").trim(),
      });
    })
    .filter(Boolean);
}

function buildLeagueSeasonsRows() {
  return (Array.isArray(seasonCatalog) ? seasonCatalog : [])
    .map((season) => {
      const id = normalizeId(season?.id);
      if (!id) return null;
      return sanitizeFirestoreValue({
        id,
        leagueId: normalizeId(season?.competitionId),
        seasonKey: String(season?.seasonKey || "").trim(),
        title: String(season?.label || "").trim(),
        startDate: String(season?.startDate || "").trim(),
        endDate: String(season?.endDate || "").trim(),
      });
    })
    .filter(Boolean);
}

function buildListsRows() {
  return (Array.isArray(curatedLists) ? curatedLists : [])
    .map((list) => {
      const id = normalizeId(list?.id);
      if (!id) return null;
      const entries = Array.isArray(list?.entries)
        ? list.entries.map((entry) => sanitizeFirestoreValue({
          eventId: normalizeId(entry?.eventId),
          athleteId: normalizeId(entry?.athleteId),
          note: String(entry?.note || "").trim(),
          score: entry?.score == null ? null : Math.round(toFiniteNumber(entry.score, 0)),
        }))
        : [];
      return sanitizeFirestoreValue({
        id,
        title: String(list?.title || "").trim(),
        description: String(list?.description || "").trim(),
        sport: String(list?.sport || "").trim(),
        ownerId: normalizeId(list?.ownerId),
        likes: Math.max(0, Math.round(toFiniteNumber(list?.likes, 0))),
        count: Math.max(0, Math.round(toFiniteNumber(list?.count, entries.length))),
        entries,
      });
    })
    .filter(Boolean);
}

async function upsertCollection(collectionName, rows, { merge = true } = {}) {
  const docs = (Array.isArray(rows) ? rows : []).filter((row) => normalizeId(row?.id));
  if (!docs.length) return 0;
  const chunks = toChunks(docs, MAX_BATCH_WRITES);
  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    const batch = writeBatch(db);
    chunk.forEach((row) => {
      const ref = doc(db, collectionName, row.id);
      batch.set(ref, row, { merge });
    });
    await batch.commit();
  }
  return docs.length;
}

export async function seedCatalogCollectionsToFirestore({ merge = true } = {}) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase n'est pas configure.");
  }

  const payload = {
    [COLLECTION_EVENTS]: buildEventsRows(),
    [COLLECTION_ATHLETES]: buildAthletesRows(),
    [COLLECTION_TEAMS]: buildTeamsRows(),
    [COLLECTION_LEAGUES]: buildLeaguesRows(),
    [COLLECTION_LEAGUE_SEASONS]: buildLeagueSeasonsRows(),
    [COLLECTION_LISTS]: buildListsRows(),
  };

  const summary = {};
  for (const [collectionName, rows] of Object.entries(payload)) {
    // eslint-disable-next-line no-await-in-loop
    summary[collectionName] = await upsertCollection(collectionName, rows, { merge });
  }

  return {
    ok: true,
    merge: Boolean(merge),
    summary,
  };
}

