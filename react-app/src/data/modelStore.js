import rawEvents from "./events.json";
import rawUsers from "./users.json";
import rawAthletes from "./athletes.json";
import rawTeams from "./teams.json";
import rawEventTeams from "./eventTeams.json";
import rawAthleteParticipation from "./athleteParticipation.json";
import rawCuratedLists from "./curatedLists.json";
import rawActivitySamples from "./activitySamples.json";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toScore100(value) {
  const raw = Number(value);
  if (!Number.isFinite(raw)) return 0;
  const scaled = raw <= 10 ? raw * 10 : raw;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

function toISODate(value) {
  if (!value) return "";
  const source = String(value).trim();
  if (!source) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(source)) return source;
  const timestamp = Date.parse(source);
  if (!Number.isFinite(timestamp)) return "";
  return new Date(timestamp).toISOString().slice(0, 10);
}

function toDateLabel(dateISO) {
  const timestamp = Date.parse(String(dateISO || "").trim());
  if (!Number.isFinite(timestamp)) return "";
  return new Date(timestamp).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function dedupeStringList(list) {
  if (!Array.isArray(list)) return [];
  const set = new Set();
  list.forEach((item) => {
    const token = String(item || "").trim();
    if (token) set.add(token);
  });
  return Array.from(set);
}

function normalizeEvents() {
  const warnings = [];
  const list = (Array.isArray(rawEvents) ? rawEvents : []).map((event, index) => {
    const id = String(event?.id || "").trim();
    const sport = String(event?.sport || "").trim() || "Autre";
    const league = String(event?.league || "").trim() || "Competition";
    const title = String(event?.title || "").trim() || `Event ${index + 1}`;
    const dateISO = toISODate(event?.dateISO || event?.date);
    const location = String(event?.location || "").trim() || "N/A";
    const result = String(event?.result || "").trim();
    const image = String(event?.image || "").trim();
    const reviews = Math.max(0, Math.round(Number(event?.reviews || 0)));

    if (!id) {
      warnings.push(`events[${index}] missing id`);
      return null;
    }

    const competitionId = String(event?.competitionId || "").trim() || `comp_${slugify(league) || "unknown"}`;
    const seasonKey = String(event?.seasonKey || "").trim() || (dateISO ? dateISO.slice(0, 4) : "na");
    const seasonId = String(event?.seasonId || "").trim() || `${competitionId}:${seasonKey}`;

    const statusValue = String(event?.status || "").trim();
    const timestamp = Date.parse(dateISO || "");
    const isPastByDate = Number.isFinite(timestamp)
      ? timestamp < new Date(new Date().setHours(0, 0, 0, 0)).getTime()
      : false;
    const status = statusValue || (isPastByDate ? "Passe" : "A venir");

    return {
      ...event,
      id,
      sport,
      league,
      title,
      dateISO,
      location,
      status,
      result,
      image,
      reviews,
      communityScore: toScore100(event?.communityScore),
      competitionId,
      seasonKey,
      seasonId,
    };
  }).filter(Boolean);

  return { list, warnings };
}

function normalizeUsers() {
  const list = (Array.isArray(rawUsers) ? rawUsers : []).map((user, index) => {
    const id = String(user?.id || "").trim();
    if (!id) return null;
    return {
      ...user,
      id,
      name: String(user?.name || `User ${index + 1}`).trim(),
      handle: String(user?.handle || "").trim(),
      followers: Math.max(0, Math.round(Number(user?.followers || 0))),
      favoriteSports: dedupeStringList(user?.favoriteSports),
    };
  }).filter(Boolean);
  return list;
}

function normalizeAthletes() {
  const list = (Array.isArray(rawAthletes) ? rawAthletes : []).map((athlete, index) => {
    const id = String(athlete?.id || "").trim();
    if (!id) return null;
    return {
      ...athlete,
      id,
      name: String(athlete?.name || `Athlete ${index + 1}`).trim(),
      sport: String(athlete?.sport || "Autre").trim(),
      country: String(athlete?.country || "").trim(),
      role: String(athlete?.role || "").trim(),
      bio: String(athlete?.bio || "").trim(),
      image: String(athlete?.image || "").trim(),
      teamId: String(athlete?.teamId || "").trim(),
    };
  }).filter(Boolean);
  return list;
}

function normalizeTeams(athleteIds) {
  const athleteIdSet = new Set(athleteIds);
  return (Array.isArray(rawTeams) ? rawTeams : []).map((team, index) => {
    const id = String(team?.id || "").trim();
    if (!id) return null;
    const memberIds = dedupeStringList(team?.athleteIds).filter((athleteId) => athleteIdSet.has(athleteId));
    return {
      ...team,
      id,
      name: String(team?.name || `Team ${index + 1}`).trim(),
      nameFull: String(team?.nameFull || team?.name || `Team ${index + 1}`).trim(),
      nameMini: String(team?.nameMini || team?.name || `Team ${index + 1}`).trim(),
      sport: String(team?.sport || "Autre").trim(),
      city: String(team?.city || "").trim(),
      athleteIds: memberIds,
    };
  }).filter(Boolean);
}

function buildAthleteTeamLinks({ athletes, teams }) {
  const links = [];
  const linksByAthlete = new Map();

  teams.forEach((team) => {
    team.athleteIds.forEach((athleteId) => {
      if (!linksByAthlete.has(athleteId)) linksByAthlete.set(athleteId, []);
      linksByAthlete.get(athleteId).push(team.id);
      links.push({ athleteId, teamId: team.id });
    });
  });

  const teamIdSet = new Set(teams.map((team) => team.id));
  athletes.forEach((athlete) => {
    const explicit = String(athlete.teamId || "").trim();
    if (!explicit || !teamIdSet.has(explicit)) return;
    const existing = linksByAthlete.get(athlete.id) || [];
    if (existing.includes(explicit)) return;
    links.push({ athleteId: athlete.id, teamId: explicit });
    linksByAthlete.set(athlete.id, [...existing, explicit]);
  });

  const primaryTeamByAthlete = new Map();
  athletes.forEach((athlete) => {
    const explicit = String(athlete.teamId || "").trim();
    const linked = linksByAthlete.get(athlete.id) || [];
    if (explicit && linked.includes(explicit)) {
      primaryTeamByAthlete.set(athlete.id, explicit);
      return;
    }
    if (linked.length) {
      primaryTeamByAthlete.set(athlete.id, linked[0]);
    }
  });

  return {
    links,
    primaryTeamByAthlete,
    teamIdsByAthlete: linksByAthlete,
  };
}

function normalizeEventTeams(eventIds, teamIds) {
  const eventIdSet = new Set(eventIds);
  const teamIdSet = new Set(teamIds);
  return (Array.isArray(rawEventTeams) ? rawEventTeams : []).map((row) => {
    const eventId = String(row?.eventId || "").trim();
    if (!eventIdSet.has(eventId)) return null;
    const members = dedupeStringList(row?.teamIds).filter((teamId) => teamIdSet.has(teamId));
    return {
      eventId,
      teamIds: members,
    };
  }).filter(Boolean);
}

function normalizeAthleteParticipation(eventIds, athleteIds) {
  const eventIdSet = new Set(eventIds);
  const athleteIdSet = new Set(athleteIds);
  return (Array.isArray(rawAthleteParticipation) ? rawAthleteParticipation : []).map((row) => {
    const eventId = String(row?.eventId || "").trim();
    if (!eventIdSet.has(eventId)) return null;
    const members = dedupeStringList(row?.athleteIds).filter((athleteId) => athleteIdSet.has(athleteId));
    return {
      eventId,
      athleteIds: members,
    };
  }).filter(Boolean);
}

function normalizeCuratedLists(eventIds, athleteIds, userIds) {
  const eventIdSet = new Set(eventIds);
  const athleteIdSet = new Set(athleteIds);
  const userIdSet = new Set(userIds);

  return (Array.isArray(rawCuratedLists) ? rawCuratedLists : []).map((list, index) => {
    const id = String(list?.id || "").trim();
    if (!id) return null;

    const ownerId = String(list?.ownerId || "").trim();
    const entries = (Array.isArray(list?.entries) ? list.entries : []).map((entry) => {
      const eventId = String(entry?.eventId || "").trim();
      const athleteId = String(entry?.athleteId || "").trim();
      const note = String(entry?.note || "").trim();
      const score = entry?.score == null ? undefined : toScore100(entry.score);

      if (eventId && eventIdSet.has(eventId)) {
        return { eventId, note, score };
      }
      if (athleteId && athleteIdSet.has(athleteId)) {
        return { athleteId, note, score };
      }
      return null;
    }).filter(Boolean);

    return {
      ...list,
      id,
      title: String(list?.title || `List ${index + 1}`).trim(),
      description: String(list?.description || "").trim(),
      sport: String(list?.sport || "Autre").trim(),
      ownerId: userIdSet.has(ownerId) ? ownerId : "",
      likes: Math.max(0, Math.round(Number(list?.likes || 0))),
      entries,
      count: entries.length,
    };
  }).filter(Boolean);
}

function normalizeActivities(userIds) {
  const userIdSet = new Set(userIds);
  return (Array.isArray(rawActivitySamples) ? rawActivitySamples : []).map((item, index) => {
    const id = String(item?.id || `activity-${index + 1}`).trim();
    const userId = String(item?.userId || "").trim();
    if (!id || !userIdSet.has(userId)) return null;

    const dateISO = toISODate(item?.dateISO || item?.date);
    const dateLabel = String(item?.dateLabel || item?.date || "").trim() || toDateLabel(dateISO);
    return {
      ...item,
      id,
      userId,
      type: String(item?.type || "activity").trim(),
      label: String(item?.label || "").trim(),
      dateISO,
      dateLabel,
    };
  }).filter(Boolean);
}

function buildCompetitionCatalog(events) {
  const byCompetition = new Map();
  const bySeason = new Map();

  events.forEach((event) => {
    if (!byCompetition.has(event.competitionId)) {
      byCompetition.set(event.competitionId, {
        id: event.competitionId,
        currentName: event.league,
        sport: event.sport,
        seasonModel: "calendar_year",
        frequency: "annual",
      });
    }

    if (!bySeason.has(event.seasonId)) {
      bySeason.set(event.seasonId, {
        id: event.seasonId,
        competitionId: event.competitionId,
        seasonKey: event.seasonKey,
        label: `${event.league} ${event.seasonKey}`,
        startDate: event.dateISO,
        endDate: event.dateISO,
      });
    } else {
      const season = bySeason.get(event.seasonId);
      const start = season.startDate;
      const end = season.endDate;
      if (event.dateISO && (!start || event.dateISO < start)) season.startDate = event.dateISO;
      if (event.dateISO && (!end || event.dateISO > end)) season.endDate = event.dateISO;
    }
  });

  return {
    competitionCatalog: Array.from(byCompetition.values()).sort((a, b) => a.currentName.localeCompare(b.currentName)),
    seasonCatalog: Array.from(bySeason.values()).sort((a, b) => {
      if (a.competitionId !== b.competitionId) return a.competitionId.localeCompare(b.competitionId);
      return String(b.seasonKey).localeCompare(String(a.seasonKey));
    }),
  };
}

function warnSchemaIssues(label, warnings) {
  if (!warnings.length) return;
  if (typeof window === "undefined") return;
  // eslint-disable-next-line no-console
  console.warn(`[modelStore] ${label}:`, warnings);
}

const { list: events, warnings: eventWarnings } = normalizeEvents();
warnSchemaIssues("events", eventWarnings);

const users = normalizeUsers();
const athletesBase = normalizeAthletes();
const teams = normalizeTeams(athletesBase.map((athlete) => athlete.id));
const athleteTeamGraph = buildAthleteTeamLinks({ athletes: athletesBase, teams });

const athletes = athletesBase.map((athlete) => ({
  ...athlete,
  teamId: athleteTeamGraph.primaryTeamByAthlete.get(athlete.id) || "",
}));

const eventTeams = normalizeEventTeams(
  events.map((event) => event.id),
  teams.map((team) => team.id),
);

const athleteParticipation = normalizeAthleteParticipation(
  events.map((event) => event.id),
  athletes.map((athlete) => athlete.id),
);

const curatedLists = normalizeCuratedLists(
  events.map((event) => event.id),
  athletes.map((athlete) => athlete.id),
  users.map((user) => user.id),
);

const activitySamples = normalizeActivities(users.map((user) => user.id));

const { competitionCatalog, seasonCatalog } = buildCompetitionCatalog(events);

export { toScore100 };

export {
  events,
  users,
  athletes,
  teams,
  eventTeams,
  athleteParticipation,
  curatedLists,
  activitySamples,
  competitionCatalog,
  seasonCatalog,
};

export function getTeamIdsForAthlete(athleteId) {
  return athleteTeamGraph.teamIdsByAthlete.get(String(athleteId || "").trim()) || [];
}
