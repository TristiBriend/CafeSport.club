import { getCuratedLists, getTeams, getUsers, getAthletes } from "./catalogService";
import { getAllEvents } from "./eventsService";
import { getLeagues } from "./leaguesService";

const TYPE_LABEL = {
  event: "Event",
  league: "League",
  athlete: "Athlete",
  team: "Team",
  user: "User",
  list: "List",
};

const ALL_TYPES = new Set(Object.keys(TYPE_LABEL));

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function computeScore(title, subtitle, query) {
  const t = normalizeText(title);
  const s = normalizeText(subtitle);
  const q = normalizeText(query);
  if (!q) return 0;

  let score = 0;
  if (t === q) score += 120;
  if (t.startsWith(q)) score += 80;
  if (t.includes(q)) score += 45;
  if (s.includes(q)) score += 25;

  const tokens = q.split(/\s+/).filter(Boolean);
  tokens.forEach((token) => {
    if (t.includes(token)) score += 8;
    if (s.includes(token)) score += 4;
  });

  return score;
}

function addResult(results, candidate, query) {
  const score = computeScore(candidate.title, candidate.subtitle, query);
  if (score <= 0) return;
  results.push({
    ...candidate,
    typeLabel: TYPE_LABEL[candidate.type] || candidate.type,
    score,
  });
}

function normalizeTypes(inputTypes) {
  if (!Array.isArray(inputTypes) || !inputTypes.length) return null;
  const set = new Set(
    inputTypes
      .map((type) => String(type || "").trim().toLowerCase())
      .filter((type) => ALL_TYPES.has(type)),
  );
  return set.size ? set : null;
}

export function searchGlobal(query, { limit = 24, types = null } = {}) {
  const q = normalizeText(query);
  if (!q) return [];
  const typeSet = normalizeTypes(types);
  const includeType = (type) => !typeSet || typeSet.has(type);

  const results = [];

  if (includeType("event")) {
    getAllEvents().forEach((event) => {
      addResult(results, {
        id: event.id,
        type: "event",
        title: event.title,
        subtitle: `${event.league} · ${event.location} · ${event.date}`,
        to: `/event/${event.id}`,
      }, q);
    });
  }

  if (includeType("league")) {
    getLeagues().forEach((league) => {
      addResult(results, {
        id: league.id,
        type: "league",
        title: league.title,
        subtitle: `${league.sport} · ${league.count} events`,
        to: `/league/${league.id}`,
      }, q);
    });
  }

  if (includeType("athlete")) {
    getAthletes().forEach((athlete) => {
      addResult(results, {
        id: athlete.id,
        type: "athlete",
        title: athlete.name,
        subtitle: `${athlete.sport || "Sport"} · ${athlete.country || "N/A"}`,
        to: `/athlete/${athlete.id}`,
      }, q);
    });
  }

  if (includeType("team")) {
    getTeams().forEach((team) => {
      addResult(results, {
        id: team.id,
        type: "team",
        title: team.name,
        subtitle: `${team.sport || "Sport"} · ${team.city || "N/A"}`,
        to: `/team/${team.id}`,
      }, q);
    });
  }

  if (includeType("user")) {
    getUsers().forEach((user) => {
      addResult(results, {
        id: user.id,
        type: "user",
        title: user.name,
        subtitle: `${user.handle || "@user"} · ${user.location || "N/A"}`,
        followersBase: Number(user.followers || 0),
        to: `/user/${user.id}`,
      }, q);
    });
  }

  if (includeType("list")) {
    getCuratedLists().forEach((list) => {
      addResult(results, {
        id: list.id,
        type: "list",
        title: list.title,
        subtitle: `${list.sport || "Sport"} · ${list.count || (list.entries || []).length} items`,
        to: `/list/${list.id}`,
      }, q);
    });
  }

  return results
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.title.localeCompare(b.title);
    })
    .slice(0, limit);
}
