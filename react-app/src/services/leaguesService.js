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
  const snapshot = getCatalogSnapshot();
  const competitionById = new Map(
    (snapshot.leagues || []).map((competition) => [normalizeId(competition.id), competition]),
  );
  const seasonById = new Map(
    (snapshot.leagueSeasons || []).map((season) => [normalizeId(season.id), season]),
  );
  const groupedByCompetition = new Map();

  (snapshot.events || []).forEach((event) => {
    const competitionId = normalizeId(event?.competitionId);
    if (!competitionId) return;
    if (!groupedByCompetition.has(competitionId)) {
      const competition = competitionById.get(competitionId);
      groupedByCompetition.set(competitionId, {
        id: competitionId,
        title: String(competition?.title || event?.league || "Competition").trim(),
        sport: String(competition?.sport || event?.sport || "Autre").trim(),
        seasonModel: String(competition?.seasonModel || "").trim(),
        frequency: String(competition?.frequency || "").trim(),
        events: [],
      });
    }
    groupedByCompetition.get(competitionId).events.push(event);
  });

  competitionById.forEach((competition, competitionId) => {
    if (groupedByCompetition.has(competitionId)) return;
    groupedByCompetition.set(competitionId, {
      id: competitionId,
      title: String(competition?.title || "Competition").trim(),
      sport: String(competition?.sport || "Autre").trim(),
      seasonModel: String(competition?.seasonModel || "").trim(),
      frequency: String(competition?.frequency || "").trim(),
      events: [],
    });
  });

  return Array.from(groupedByCompetition.values())
    .map((competition) => {
      const sortedEvents = [...competition.events].sort((a, b) => toTimeValue(b.dateISO) - toTimeValue(a.dateISO));
      const seasonAccumulator = new Map();

      sortedEvents.forEach((event) => {
        const seasonId = normalizeId(event?.seasonId);
        if (!seasonId) return;
        if (!seasonAccumulator.has(seasonId)) {
          const seasonMeta = seasonById.get(seasonId);
          seasonAccumulator.set(seasonId, {
            id: seasonId,
            leagueId: competition.id,
            leagueTitle: competition.title,
            sport: competition.sport,
            seasonKey: String(seasonMeta?.seasonKey || event?.seasonKey || "na").trim(),
            year: String(seasonMeta?.seasonKey || event?.seasonKey || "").trim() || null,
            title: String(
              seasonMeta?.title
              || seasonMeta?.label
              || `${competition.title} ${event?.seasonKey || ""}`,
            ).trim(),
            startDateISO: String(seasonMeta?.startDate || "").trim(),
            endDateISO: String(seasonMeta?.endDate || "").trim(),
            events: [],
            count: 0,
            _scoreSum: 0,
          });
        }
        const season = seasonAccumulator.get(seasonId);
        season.events.push(event);
        season.count += 1;
        season._scoreSum += Number(event?.communityScore || 0);
      });

      (snapshot.leagueSeasons || [])
        .filter((season) => normalizeId(season?.leagueId) === normalizeId(competition.id))
        .forEach((season) => {
          const safeSeasonId = normalizeId(season?.id);
          if (!safeSeasonId || seasonAccumulator.has(safeSeasonId)) return;
          seasonAccumulator.set(safeSeasonId, {
            id: safeSeasonId,
            leagueId: competition.id,
            leagueTitle: competition.title,
            sport: competition.sport,
            seasonKey: String(season?.seasonKey || "na").trim(),
            year: String(season?.seasonKey || "").trim() || null,
            title: String(season?.title || `${competition.title} ${season?.seasonKey || ""}`).trim(),
            startDateISO: String(season?.startDate || "").trim(),
            endDateISO: String(season?.endDate || "").trim(),
            events: [],
            count: 0,
            _scoreSum: 0,
          });
        });

      const seasons = Array.from(seasonAccumulator.values())
        .map((season) => {
          const seasonEvents = [...season.events].sort((a, b) => toTimeValue(b.dateISO) - toTimeValue(a.dateISO));
          const timestamps = seasonEvents
            .map((event) => toTimeValue(event?.dateISO))
            .filter((value) => value > 0);
          const minFromEvents = timestamps.length ? Math.min(...timestamps) : 0;
          const maxFromEvents = timestamps.length ? Math.max(...timestamps) : 0;
          const startDateISO = season.startDateISO || (minFromEvents ? new Date(minFromEvents).toISOString().slice(0, 10) : "");
          const endDateISO = season.endDateISO || (maxFromEvents ? new Date(maxFromEvents).toISOString().slice(0, 10) : "");
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
        seasonModel: competition.seasonModel,
        frequency: competition.frequency,
        events: sortedEvents,
        count: sortedEvents.length,
        averageScore: sortedEvents.length
          ? sortedEvents.reduce((sum, event) => sum + Number(event?.communityScore || 0), 0) / sortedEvents.length
          : 0,
        seasons,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getLeagues({ sportFilter = "Tous", query = "" } = {}) {
  const q = normalizeText(query);
  return computeLeagues().filter((league) => {
    const sportMatch = sportFilter === "Tous" || league.sport === sportFilter;
    if (!sportMatch) return false;
    if (!q) return true;
    const haystack = normalizeText(`${league.title} ${league.sport}`);
    return haystack.includes(q);
  });
}

export function getLeagueById(leagueId) {
  const safeLeagueId = normalizeId(leagueId);
  if (!safeLeagueId) return null;
  return computeLeagues().find((league) => normalizeId(league.id) === safeLeagueId) || null;
}

export function getLeagueSeasonById(seasonId) {
  const safeSeasonId = normalizeId(seasonId);
  if (!safeSeasonId) return null;
  const leagues = computeLeagues();
  for (let index = 0; index < leagues.length; index += 1) {
    const match = (leagues[index].seasons || []).find((season) => normalizeId(season?.id) === safeSeasonId);
    if (match) return match;
  }
  return null;
}

export function getLeagueSeasonsByLeagueId(leagueId) {
  const league = getLeagueById(leagueId);
  if (!league) return [];
  return league.seasons || [];
}

export function getLeagueSports() {
  return Array.from(new Set(computeLeagues().map((league) => league.sport))).sort((a, b) => a.localeCompare(b));
}

