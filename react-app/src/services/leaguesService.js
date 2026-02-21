import events from "../data/events.json";

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

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getEventYear(event) {
  if (/^\d{4}/.test(String(event?.dateISO || ""))) {
    return Number(String(event.dateISO).slice(0, 4));
  }
  const match = String(event?.date || "").match(/(19|20)\d{2}/);
  return match ? Number(match[0]) : null;
}

function computeLeagues() {
  const map = new Map();
  events.forEach((event) => {
    const key = String(event.league || "").trim();
    if (!key) return;
    if (!map.has(key)) {
      map.set(key, {
        id: slugify(key),
        title: key,
        events: [],
        sportCount: {},
      });
    }
    const league = map.get(key);
    league.events.push(event);
    const sport = String(event.sport || "Autre");
    league.sportCount[sport] = (league.sportCount[sport] || 0) + 1;
  });

  const leagues = Array.from(map.values()).map((league) => {
    const sortedEvents = [...league.events].sort((a, b) => toTimeValue(b.dateISO) - toTimeValue(a.dateISO));
    const sport = Object.entries(league.sportCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || "Autre";
    const years = {};
    sortedEvents.forEach((event) => {
      const year = getEventYear(event);
      const key = year || "na";
      if (!years[key]) {
        years[key] = {
          id: `${league.id}-${key}`,
          leagueId: league.id,
          leagueTitle: league.title,
          sport,
          year,
          title: year ? `${league.title} ${year}` : `${league.title} (saison)`,
          events: [],
          count: 0,
          averageScore: 0,
          _scoreSum: 0,
        };
      }
      years[key].events.push(event);
      years[key].count += 1;
      years[key]._scoreSum += Number(event.communityScore || 0);
    });
    const seasons = Object.values(years)
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
      .sort((a, b) => {
        const ay = Number.isFinite(Number(a.year)) ? Number(a.year) : 0;
        const by = Number.isFinite(Number(b.year)) ? Number(b.year) : 0;
        return by - ay;
      });
    return {
      id: league.id,
      title: league.title,
      sport,
      events: sortedEvents,
      count: sortedEvents.length,
      averageScore: sortedEvents.length
        ? sortedEvents.reduce((sum, event) => sum + Number(event.communityScore || 0), 0) / sortedEvents.length
        : 0,
      seasons,
    };
  });
  return leagues.sort((a, b) => a.title.localeCompare(b.title));
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
