import {
  getAthletesForTeam,
  getEventsForAthlete,
  getEventsForTeam,
  getTeamForAthlete,
  getTeamsForEvent,
} from "./catalogService";
import { getFriendnotesForEvent } from "./friendnotesService";
import { getLeagueById } from "./leaguesService";
import { getEventRating } from "./ratingsService";

function createItem(id, label, value, extra = {}) {
  const safeId = String(id || "").trim();
  const safeLabel = String(label || "").trim();
  if (!safeId || !safeLabel || value === undefined || value === null || value === "") {
    return null;
  }
  return {
    id: safeId,
    label: safeLabel,
    value,
    ...extra,
  };
}

function compactNumber(value) {
  return Math.max(0, Number(value || 0)).toLocaleString("fr-FR");
}

function toAverageScore(events = []) {
  const source = Array.isArray(events) ? events : [];
  if (!source.length) return 0;
  const total = source.reduce((sum, event) => sum + Number(event?.communityScore || 0), 0);
  return Math.round(total / source.length);
}

function toAveragePersonalScore(events = []) {
  const source = (Array.isArray(events) ? events : [])
    .map((event) => ({
      id: String(event?.id || "").trim(),
      score: Number(getEventRating(event?.id) || 0),
    }))
    .filter((entry) => entry.id && entry.score > 0);
  if (!source.length) return null;
  const total = source.reduce((sum, entry) => sum + entry.score, 0);
  return Math.round(total / source.length);
}

function toAverageFriendScore(events = []) {
  const ratings = (Array.isArray(events) ? events : [])
    .flatMap((event) => getFriendnotesForEvent(event?.id))
    .map((entry) => Number(entry?.rating || 0))
    .filter((value) => value > 0);
  if (!ratings.length) return null;
  const total = ratings.reduce((sum, value) => sum + value, 0);
  return Math.round(total / ratings.length);
}

function toReadableDate(dateValue = "", fallbackIso = "") {
  const explicit = String(dateValue || "").trim();
  if (explicit) return explicit;
  const iso = String(fallbackIso || "").trim();
  const timestamp = Date.parse(iso);
  if (!Number.isFinite(timestamp)) return "";
  return new Date(timestamp).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildLeagueFeedPath(leagueId) {
  const safeId = String(leagueId || "").trim();
  if (!safeId) return "";
  const params = new URLSearchParams({
    scope: "object",
    mode: "recent",
    targetType: "league",
    targetId: safeId,
  });
  return `/feed?${params.toString()}`;
}

function buildScoreItems(events = [], { aggregate = false } = {}) {
  const personalScore = toAveragePersonalScore(events);
  const friendScore = toAverageFriendScore(events);
  const personalLabel = aggregate ? "Mon score moyen" : "Mon score";
  const friendLabel = aggregate ? "Score moyen de mes amis" : "Score de mes amis";

  return [
    createItem("my-score", personalLabel, personalScore == null ? "" : `${personalScore}/100`),
    createItem("friends-score", friendLabel, friendScore == null ? "" : `${friendScore}/100`),
  ].filter(Boolean);
}

export function buildEventDetailInfoItems(event) {
  if (!event) return [];
  const league = getLeagueById(event?.competitionId);
  const teams = getTeamsForEvent(event?.id);
  const matchLabel = teams.length >= 2
    ? `${teams[0].nameFull || teams[0].name} vs ${teams[1].nameFull || teams[1].name}`
    : (String(event?.title || "").trim() || "Evenement");
  const scoreItems = buildScoreItems([event], { aggregate: false });

  return [
    createItem("sport", "Sport", String(event?.sport || "").trim()),
    createItem(
      "competition",
      "Competition",
      String(league?.title || event?.league || "").trim(),
      league?.id ? { to: `/league/${league.id}` } : {},
    ),
    createItem("match", "Affiche", matchLabel),
    createItem("date", "Date", toReadableDate(event?.date, event?.dateISO)),
    createItem("location", "Lieu", String(event?.location || "").trim() || "Non renseigne"),
    createItem("community-score", "Score communaute", `${Math.round(Number(event?.communityScore || 0))}/100`),
    ...scoreItems,
    createItem("watchlist", "Watchlist", compactNumber(event?.watchlistCount)),
  ].filter(Boolean);
}

export function buildAthleteDetailInfoItems(athlete) {
  if (!athlete) return [];
  const team = getTeamForAthlete(athlete);
  const events = getEventsForAthlete(athlete?.id);
  const scoreItems = buildScoreItems(events, { aggregate: true });

  return [
    createItem("sport", "Sport", String(athlete?.sport || "").trim()),
    createItem("role", "Role", String(athlete?.role || "").trim()),
    createItem("country", "Pays", String(athlete?.country || "").trim()),
    createItem(
      "team",
      "Equipe",
      String(team?.nameFull || team?.name || "").trim(),
      team?.id ? { to: `/team/${team.id}` } : {},
    ),
    createItem("events", "Evenements lies", compactNumber(events.length)),
    createItem("score", "Score moyen", `${toAverageScore(events)}/100`),
    ...scoreItems,
  ].filter(Boolean);
}

export function buildTeamDetailInfoItems(team) {
  if (!team) return [];
  const athletes = getAthletesForTeam(team?.id);
  const events = getEventsForTeam(team?.id);
  const scoreItems = buildScoreItems(events, { aggregate: true });

  return [
    createItem("sport", "Sport", String(team?.sport || "").trim()),
    createItem("city", "Ville", String(team?.city || "").trim()),
    createItem("short-name", "Nom court", String(team?.nameMini || team?.name || "").trim()),
    createItem("athletes", "Athletes", compactNumber(athletes.length)),
    createItem("events", "Evenements", compactNumber(events.length)),
    createItem("score", "Score moyen", `${toAverageScore(events)}/100`),
    ...scoreItems,
  ].filter(Boolean);
}

export function buildLeagueDetailInfoItems(league) {
  if (!league) return [];
  const firstSeason = Array.isArray(league?.seasons) && league.seasons.length ? league.seasons[0] : null;
  const scoreItems = buildScoreItems(league?.events || [], { aggregate: true });

  return [
    createItem("sport", "Sport", String(league?.sport || "").trim()),
    createItem("events", "Evenements", compactNumber(league?.count)),
    createItem(
      "period",
      "Periode",
      String(firstSeason?.dateRangeLabel || "").trim(),
    ),
    ...scoreItems,
    createItem("feed", "Acces", "Ouvrir le feed", { to: buildLeagueFeedPath(league?.id) }),
  ].filter(Boolean);
}

export function buildLeagueSeasonDetailInfoItems(season) {
  if (!season) return [];
  const league = getLeagueById(season?.leagueId);
  const scoreItems = buildScoreItems(season?.events || [], { aggregate: true });

  return [
    createItem(
      "league",
      "Ligue",
      String(league?.title || season?.leagueTitle || "").trim(),
      league?.id ? { to: `/league/${league.id}` } : {},
    ),
    createItem("period", "Periode", String(season?.dateRangeLabel || "").trim()),
    createItem("events", "Evenements", compactNumber(season?.count || season?.events?.length)),
    ...scoreItems,
    createItem("season", "Saison", String(season?.title || "").trim()),
  ].filter(Boolean);
}
