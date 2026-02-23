import {
  competitionCatalog,
  events,
  seasonCatalog,
} from "../data/modelStore";

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function toTimeValue(dateISO) {
  const value = Date.parse(dateISO || "");
  return Number.isFinite(value) ? value : 0;
}

function toDateLabel(dateISO) {
  const timestamp = toTimeValue(dateISO);
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isUpcomingEvent(event) {
  const timestamp = toTimeValue(event?.dateISO);
  if (timestamp) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return timestamp >= today.getTime();
  }
  return String(event?.status || "").toLowerCase() !== "passe";
}

function computeLeagues() {
  const competitionById = new Map(competitionCatalog.map((competition) => [competition.id, competition]));
  const seasonById = new Map(seasonCatalog.map((season) => [season.id, season]));
  const groupedByCompetition = new Map();

  events.forEach((event) => {
    const competitionId = String(event.competitionId || "").trim();
    if (!competitionId) return;
    if (!groupedByCompetition.has(competitionId)) {
      const competition = competitionById.get(competitionId);
      groupedByCompetition.set(competitionId, {
        id: competitionId,
        title: competition?.currentName || event.league || "Competition",
        sport: competition?.sport || event.sport || "Autre",
        events: [],
      });
    }
    groupedByCompetition.get(competitionId).events.push(event);
  });

  return Array.from(groupedByCompetition.values())
    .map((competition) => {
      const sortedEvents = [...competition.events].sort((a, b) => toTimeValue(b.dateISO) - toTimeValue(a.dateISO));
      const seasonAccumulator = new Map();

      sortedEvents.forEach((event) => {
        const seasonId = String(event.seasonId || "").trim();
        if (!seasonId) return;
        if (!seasonAccumulator.has(seasonId)) {
          const seasonMeta = seasonById.get(seasonId);
          seasonAccumulator.set(seasonId, {
            id: seasonId,
            leagueId: competition.id,
            leagueTitle: competition.title,
            sport: competition.sport,
            seasonKey: seasonMeta?.seasonKey || event.seasonKey || "na",
            year: seasonMeta?.seasonKey || event.seasonKey || null,
            title: seasonMeta?.label || `${competition.title} ${event.seasonKey || ""}`.trim(),
            events: [],
            count: 0,
            _scoreSum: 0,
          });
        }

        const season = seasonAccumulator.get(seasonId);
        season.events.push(event);
        season.count += 1;
        season._scoreSum += Number(event.communityScore || 0);
      });

      const seasons = Array.from(seasonAccumulator.values())
        .map((season) => {
          const seasonEvents = [...season.events].sort((a, b) => toTimeValue(b.dateISO) - toTimeValue(a.dateISO));
          const timestamps = seasonEvents
            .map((event) => toTimeValue(event.dateISO))
            .filter((value) => value > 0);
          const startTimestamp = timestamps.length ? Math.min(...timestamps) : 0;
          const endTimestamp = timestamps.length ? Math.max(...timestamps) : 0;
          const startDateISO = startTimestamp ? new Date(startTimestamp).toISOString().slice(0, 10) : "";
          const endDateISO = endTimestamp ? new Date(endTimestamp).toISOString().slice(0, 10) : "";
          const dateRangeLabel = startDateISO && endDateISO
            ? `${toDateLabel(startDateISO)} - ${toDateLabel(endDateISO)}`
            : (toDateLabel(startDateISO) || toDateLabel(endDateISO) || "Periode non renseignee");
          const upcomingCount = seasonEvents.filter((event) => isUpcomingEvent(event)).length;
          const pastCount = Math.max(0, seasonEvents.length - upcomingCount);

          return {
            id: season.id,
            leagueId: season.leagueId,
            leagueTitle: season.leagueTitle,
            sport: season.sport,
            seasonKey: season.seasonKey,
            year: season.year,
            title: season.title,
            events: seasonEvents,
            eventIds: seasonEvents.map((event) => event.id),
            count: season.count,
            averageScore: season.count ? season._scoreSum / season.count : 0,
            startDateISO,
            endDateISO,
            dateRangeLabel,
            upcomingCount,
            pastCount,
          };
        })
        .sort((a, b) => toTimeValue(b.endDateISO) - toTimeValue(a.endDateISO));

      return {
        id: competition.id,
        title: competition.title,
        sport: competition.sport,
        events: sortedEvents,
        count: sortedEvents.length,
        averageScore: sortedEvents.length
          ? sortedEvents.reduce((sum, event) => sum + Number(event.communityScore || 0), 0) / sortedEvents.length
          : 0,
        seasons,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

const leaguesCache = computeLeagues();
const leagueSeasonsCache = leaguesCache.flatMap((league) => league.seasons || []);
const leagueSeasonsById = new Map(leagueSeasonsCache.map((season) => [season.id, season]));

export function getLeagues({ sportFilter = "Tous", query = "" } = {}) {
  const q = normalizeText(query);
  return leaguesCache.filter((league) => {
    const sportMatch = sportFilter === "Tous" || league.sport === sportFilter;
    if (!sportMatch) return false;
    if (!q) return true;
    const haystack = normalizeText(`${league.title} ${league.sport}`);
    return haystack.includes(q);
  });
}

export function getLeagueById(leagueId) {
  return leaguesCache.find((league) => league.id === leagueId) || null;
}

export function getLeagueSeasonById(seasonId) {
  return leagueSeasonsById.get(String(seasonId || "").trim()) || null;
}

export function getLeagueSeasonsByLeagueId(leagueId) {
  return leagueSeasonsCache.filter((season) => season.leagueId === leagueId);
}

export function getLeagueSports() {
  return Array.from(new Set(leaguesCache.map((league) => league.sport))).sort((a, b) => a.localeCompare(b));
}
