import { getCatalogSnapshot } from "./catalogRepositoryService";

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function normalizeId(value) {
  return String(value || "").trim();
}

function toTimeValue(dateISO) {
  const value = Date.parse(dateISO || "");
  return Number.isFinite(value) ? value : 0;
}

function sortByDateDesc(a, b) {
  return toTimeValue(b.dateISO) - toTimeValue(a.dateISO);
}

function getSnapshot() {
  return getCatalogSnapshot();
}

function getTeamIdsForAthleteInternal(athleteId) {
  const safeAthleteId = normalizeId(athleteId);
  if (!safeAthleteId) return [];
  const snapshot = getSnapshot();
  const athlete = snapshot.athletes.find((item) => normalizeId(item?.id) === safeAthleteId);
  const explicitTeamId = normalizeId(athlete?.teamId);
  const linked = snapshot.teams
    .filter((team) => Array.isArray(team?.athleteIds) && team.athleteIds.some((id) => normalizeId(id) === safeAthleteId))
    .map((team) => normalizeId(team?.id))
    .filter(Boolean);
  if (explicitTeamId && !linked.includes(explicitTeamId)) {
    linked.unshift(explicitTeamId);
  }
  return Array.from(new Set(linked));
}

export function getUsers({ query = "" } = {}) {
  const q = normalizeText(query);
  const users = getSnapshot().users || [];
  return users.filter((user) => {
    if (!q) return true;
    const haystack = normalizeText(`${user.name} ${user.handle} ${user.location}`);
    return haystack.includes(q);
  });
}

export function getUserById(userId) {
  const safeUserId = normalizeId(userId);
  if (!safeUserId) return null;
  return getSnapshot().users.find((user) => normalizeId(user?.id) === safeUserId) || null;
}

export function getAthletes({ sportFilter = "Tous", query = "" } = {}) {
  const q = normalizeText(query);
  return getSnapshot().athletes.filter((athlete) => {
    const sportMatch = sportFilter === "Tous" || athlete.sport === sportFilter;
    if (!sportMatch) return false;
    if (!q) return true;
    const haystack = normalizeText(
      `${athlete.name} ${athlete.sport} ${athlete.country} ${athlete.role}`,
    );
    return haystack.includes(q);
  });
}

export function getAthleteById(athleteId) {
  const safeAthleteId = normalizeId(athleteId);
  if (!safeAthleteId) return null;
  return getSnapshot().athletes.find((athlete) => normalizeId(athlete?.id) === safeAthleteId) || null;
}

export function getAthleteSports() {
  return Array.from(new Set(getSnapshot().athletes.map((athlete) => athlete.sport))).sort((a, b) => a.localeCompare(b));
}

export function getTeams({ sportFilter = "Tous", query = "" } = {}) {
  const q = normalizeText(query);
  return getSnapshot().teams.filter((team) => {
    const sportMatch = sportFilter === "Tous" || team.sport === sportFilter;
    if (!sportMatch) return false;
    if (!q) return true;
    const haystack = normalizeText(`${team.name} ${team.city} ${team.sport}`);
    return haystack.includes(q);
  });
}

export function getTeamById(teamId) {
  const safeTeamId = normalizeId(teamId);
  if (!safeTeamId) return null;
  return getSnapshot().teams.find((team) => normalizeId(team?.id) === safeTeamId) || null;
}

export function getTeamSports() {
  return Array.from(new Set(getSnapshot().teams.map((team) => team.sport))).sort((a, b) => a.localeCompare(b));
}

export function getTeamForAthlete(athlete) {
  if (!athlete) return null;
  const explicitId = normalizeId(athlete.teamId);
  if (explicitId) {
    const explicitTeam = getTeamById(explicitId);
    if (explicitTeam) return explicitTeam;
  }
  const teamIds = getTeamIdsForAthleteInternal(athlete.id);
  if (!teamIds.length) return null;
  return getTeamById(teamIds[0]);
}

export function getAthletesForTeam(teamId) {
  const team = getTeamById(teamId);
  if (!team) return [];
  const explicitIds = new Set(Array.isArray(team.athleteIds) ? team.athleteIds.map((id) => normalizeId(id)) : []);
  return getSnapshot().athletes.filter((athlete) => explicitIds.has(normalizeId(athlete.id)));
}

export function getEventsForTeam(teamId) {
  const safeTeamId = normalizeId(teamId);
  if (!safeTeamId) return [];
  return getSnapshot().events
    .filter((event) => Array.isArray(event?.teamIds) && event.teamIds.some((id) => normalizeId(id) === safeTeamId))
    .sort(sortByDateDesc);
}

export function getTeamsForEvent(eventId) {
  const safeEventId = normalizeId(eventId);
  if (!safeEventId) return [];
  const event = getSnapshot().events.find((item) => normalizeId(item?.id) === safeEventId);
  if (!event || !Array.isArray(event.teamIds)) return [];
  return event.teamIds
    .map((teamId) => getTeamById(teamId))
    .filter(Boolean);
}

export function getAthletesForEvent(eventId) {
  const safeEventId = normalizeId(eventId);
  if (!safeEventId) return [];
  const event = getSnapshot().events.find((item) => normalizeId(item?.id) === safeEventId);
  if (!event || !Array.isArray(event.athleteIds)) return [];
  return event.athleteIds
    .map((athleteId) => getAthleteById(athleteId))
    .filter(Boolean);
}

export function getEventsForAthlete(athleteId) {
  const safeAthleteId = normalizeId(athleteId);
  if (!safeAthleteId) return [];
  const teamIds = new Set(getTeamIdsForAthleteInternal(safeAthleteId));
  return getSnapshot().events
    .filter((event) => {
      const byAthlete = Array.isArray(event?.athleteIds)
        && event.athleteIds.some((id) => normalizeId(id) === safeAthleteId);
      if (byAthlete) return true;
      const byTeam = Array.isArray(event?.teamIds)
        && event.teamIds.some((teamId) => teamIds.has(normalizeId(teamId)));
      return byTeam;
    })
    .sort(sortByDateDesc);
}

export function getCuratedLists({ sportFilter = "Tous", query = "" } = {}) {
  const q = normalizeText(query);
  return getSnapshot().lists.filter((list) => {
    const sportMatch = sportFilter === "Tous" || list.sport === sportFilter;
    if (!sportMatch) return false;
    if (!q) return true;
    const haystack = normalizeText(`${list.title} ${list.description} ${list.sport}`);
    return haystack.includes(q);
  });
}

export function getListById(listId) {
  const safeListId = normalizeId(listId);
  if (!safeListId) return null;
  return getSnapshot().lists.find((list) => normalizeId(list?.id) === safeListId) || null;
}

export function getListSports() {
  return Array.from(new Set(getSnapshot().lists.map((list) => list.sport))).sort((a, b) => a.localeCompare(b));
}

export function getListsForUser(userId) {
  const safeUserId = normalizeId(userId);
  if (!safeUserId) return [];
  return getSnapshot().lists.filter((list) => normalizeId(list?.ownerId) === safeUserId);
}

export function resolveListEntries(list) {
  if (!list || !Array.isArray(list.entries)) return [];
  return list.entries.map((entry, index) => {
    const safeEventId = normalizeId(entry?.eventId);
    const safeAthleteId = normalizeId(entry?.athleteId);
    if (safeEventId) {
      return {
        id: `${list.id}-entry-${index}`,
        type: "event",
        event: getSnapshot().events.find((event) => normalizeId(event?.id) === safeEventId) || null,
        note: entry.note || "",
        score: entry.score,
      };
    }
    if (safeAthleteId) {
      return {
        id: `${list.id}-entry-${index}`,
        type: "athlete",
        athlete: getSnapshot().athletes.find((athlete) => normalizeId(athlete?.id) === safeAthleteId) || null,
        note: entry.note || "",
        score: entry.score,
      };
    }
    return {
      id: `${list.id}-entry-${index}`,
      type: "unknown",
      note: entry.note || "",
      score: entry.score,
    };
  });
}

export function getActivitiesForUser(userId) {
  const safeUserId = normalizeId(userId);
  if (!safeUserId) return [];
  return getSnapshot().activitySamples.filter((activity) => normalizeId(activity?.userId) === safeUserId);
}

export function getAllActivities() {
  return getSnapshot().activitySamples;
}

