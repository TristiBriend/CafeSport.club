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

export function searchGlobal(query, { limit = 24 } = {}) {
  const q = normalizeText(query);
  if (!q) return [];

  const results = [];

  getAllEvents().forEach((event) => {
    addResult(results, {
      id: event.id,
      type: "event",
      title: event.title,
      subtitle: `${event.league} · ${event.location} · ${event.date}`,
      to: `/event/${event.id}`,
    }, q);
  });

  getLeagues().forEach((league) => {
    addResult(results, {
      id: league.id,
      type: "league",
      title: league.title,
      subtitle: `${league.sport} · ${league.count} events`,
      to: `/league/${league.id}`,
    }, q);
  });

  getAthletes().forEach((athlete) => {
    addResult(results, {
      id: athlete.id,
      type: "athlete",
      title: athlete.name,
      subtitle: `${athlete.sport || "Sport"} · ${athlete.country || "N/A"}`,
      to: `/athlete/${athlete.id}`,
    }, q);
  });

  getTeams().forEach((team) => {
    addResult(results, {
      id: team.id,
      type: "team",
      title: team.name,
      subtitle: `${team.sport || "Sport"} · ${team.city || "N/A"}`,
      to: `/team/${team.id}`,
    }, q);
  });

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

  getCuratedLists().forEach((list) => {
    addResult(results, {
      id: list.id,
      type: "list",
      title: list.title,
      subtitle: `${list.sport || "Sport"} · ${list.count || (list.entries || []).length} items`,
      to: `/list/${list.id}`,
    }, q);
  });

  return results
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.title.localeCompare(b.title);
    })
    .slice(0, limit);
}
