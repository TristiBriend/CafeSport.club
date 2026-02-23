import {
  activitySamples,
  athleteParticipation,
  athletes,
  curatedLists,
  eventTeams,
  events,
  getTeamIdsForAthlete,
  teams,
  users,
} from "../data/modelStore";

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function toTimeValue(dateISO) {
  const value = Date.parse(dateISO || "");
  return Number.isFinite(value) ? value : 0;
}

function sortByDateDesc(a, b) {
  return toTimeValue(b.dateISO) - toTimeValue(a.dateISO);
}

export function getUsers({ query = "" } = {}) {
  const q = normalizeText(query);
  return users.filter((user) => {
    if (!q) return true;
    const haystack = normalizeText(`${user.name} ${user.handle} ${user.location}`);
    return haystack.includes(q);
  });
}

export function getUserById(userId) {
  return users.find((user) => user.id === userId) || null;
}

export function getAthletes({ sportFilter = "Tous", query = "" } = {}) {
  const q = normalizeText(query);
  return athletes.filter((athlete) => {
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
  return athletes.find((athlete) => athlete.id === athleteId) || null;
}

export function getAthleteSports() {
  return Array.from(new Set(athletes.map((athlete) => athlete.sport))).sort((a, b) => a.localeCompare(b));
}

export function getTeams({ sportFilter = "Tous", query = "" } = {}) {
  const q = normalizeText(query);
  return teams.filter((team) => {
    const sportMatch = sportFilter === "Tous" || team.sport === sportFilter;
    if (!sportMatch) return false;
    if (!q) return true;
    const haystack = normalizeText(`${team.name} ${team.city} ${team.sport}`);
    return haystack.includes(q);
  });
}

export function getTeamById(teamId) {
  return teams.find((team) => team.id === teamId) || null;
}

export function getTeamSports() {
  return Array.from(new Set(teams.map((team) => team.sport))).sort((a, b) => a.localeCompare(b));
}

export function getTeamForAthlete(athlete) {
  if (!athlete) return null;
  const explicitId = String(athlete.teamId || "").trim();
  if (explicitId) {
    const explicitTeam = getTeamById(explicitId);
    if (explicitTeam) return explicitTeam;
  }
  const teamIds = getTeamIdsForAthlete(athlete.id);
  if (!teamIds.length) return null;
  return getTeamById(teamIds[0]);
}

export function getAthletesForTeam(teamId) {
  const team = getTeamById(teamId);
  if (!team) return [];
  const explicitIds = new Set(Array.isArray(team.athleteIds) ? team.athleteIds : []);
  return athletes.filter((athlete) => explicitIds.has(athlete.id));
}

export function getEventsForTeam(teamId) {
  const ids = new Set(
    eventTeams
      .filter((item) => Array.isArray(item.teamIds) && item.teamIds.includes(teamId))
      .map((item) => item.eventId),
  );
  return events.filter((event) => ids.has(event.id)).sort(sortByDateDesc);
}

export function getEventsForAthlete(athleteId) {
  const teamIds = getTeamIdsForAthlete(athleteId);
  const ids = new Set(
    athleteParticipation
      .filter((item) => Array.isArray(item.athleteIds) && item.athleteIds.includes(athleteId))
      .map((item) => item.eventId),
  );

  teamIds.forEach((teamId) => {
    getEventsForTeam(teamId).forEach((event) => ids.add(event.id));
  });

  return events.filter((event) => ids.has(event.id)).sort(sortByDateDesc);
}

export function getCuratedLists({ sportFilter = "Tous", query = "" } = {}) {
  const q = normalizeText(query);
  return curatedLists.filter((list) => {
    const sportMatch = sportFilter === "Tous" || list.sport === sportFilter;
    if (!sportMatch) return false;
    if (!q) return true;
    const haystack = normalizeText(`${list.title} ${list.description} ${list.sport}`);
    return haystack.includes(q);
  });
}

export function getListById(listId) {
  return curatedLists.find((list) => list.id === listId) || null;
}

export function getListSports() {
  return Array.from(new Set(curatedLists.map((list) => list.sport))).sort((a, b) => a.localeCompare(b));
}

export function getListsForUser(userId) {
  return curatedLists.filter((list) => list.ownerId === userId);
}

export function resolveListEntries(list) {
  if (!list || !Array.isArray(list.entries)) return [];
  return list.entries.map((entry, index) => {
    if (entry.eventId) {
      return {
        id: `${list.id}-entry-${index}`,
        type: "event",
        event: events.find((event) => event.id === entry.eventId) || null,
        note: entry.note || "",
        score: entry.score,
      };
    }
    if (entry.athleteId) {
      return {
        id: `${list.id}-entry-${index}`,
        type: "athlete",
        athlete: athletes.find((athlete) => athlete.id === entry.athleteId) || null,
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
  return activitySamples.filter((activity) => activity.userId === userId);
}

export function getAllActivities() {
  return activitySamples;
}
