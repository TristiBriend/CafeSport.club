import {
  getAthleteById,
  getListById,
  getTeamById,
  getUserById,
} from "./catalogService";
import { getEventById, getSports } from "./eventsService";
import { getLeagueById, getLeagueSeasonById } from "./leaguesService";

function toSportSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitleCase(value) {
  const safe = String(value || "").trim();
  if (!safe) return "";
  return safe.charAt(0).toUpperCase() + safe.slice(1);
}

function decodeToken(value) {
  try {
    return decodeURIComponent(String(value || "").trim());
  } catch {
    return String(value || "").trim();
  }
}

function formatFallbackLabel(raw = "", defaultLabel = "") {
  const token = decodeToken(raw).replace(/[-_]+/g, " ").trim();
  if (!token) return defaultLabel;
  return token
    .split(/\s+/)
    .map((part) => toTitleCase(part))
    .join(" ");
}

function resolveSportBySlug(sportSlug) {
  const safeSlug = String(sportSlug || "").trim().toLowerCase();
  if (!safeSlug) return "";
  const sports = getSports();
  const exact = sports.find((sport) => toSportSlug(sport) === safeSlug);
  return exact || formatFallbackLabel(safeSlug, "Sport");
}

function resolveObjectCrumb(targetType, targetId) {
  const safeType = String(targetType || "").trim().toLowerCase();
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) {
    return { label: "Objet", to: "/feed" };
  }

  if (safeType === "event") {
    const event = getEventById(safeId);
    return {
      label: event?.title || `Evenement ${safeId}`,
      to: event?.id ? `/event/${event.id}` : `/feed?scope=object&mode=recent&targetType=event&targetId=${encodeURIComponent(safeId)}`,
    };
  }
  if (safeType === "athlete") {
    const athlete = getAthleteById(safeId);
    return {
      label: athlete?.name || `Athlete ${safeId}`,
      to: athlete?.id ? `/athlete/${athlete.id}` : `/athlete/${safeId}`,
    };
  }
  if (safeType === "team") {
    const team = getTeamById(safeId);
    return {
      label: team?.nameFull || team?.name || `Team ${safeId}`,
      to: team?.id ? `/team/${team.id}` : `/team/${safeId}`,
    };
  }
  if (safeType === "league") {
    const league = getLeagueById(safeId);
    return {
      label: league?.title || `Ligue ${safeId}`,
      to: league?.id ? `/league/${league.id}` : `/league/${safeId}`,
    };
  }
  if (safeType === "league-season") {
    const season = getLeagueSeasonById(safeId);
    return {
      label: season?.title || `Saison ${safeId}`,
      to: season?.id ? `/league-season/${season.id}` : `/league-season/${safeId}`,
    };
  }
  if (safeType === "list") {
    const list = getListById(safeId);
    return {
      label: list?.title || `Classement ${safeId}`,
      to: list?.id ? `/list/${list.id}` : `/list/${safeId}`,
    };
  }
  if (safeType === "user") {
    const user = getUserById(safeId);
    return {
      label: user?.name || `Utilisateur ${safeId}`,
      to: user?.id ? `/user/${user.id}` : `/user/${safeId}`,
    };
  }

  return {
    label: `${toTitleCase(safeType)} ${safeId}`,
    to: "/feed",
  };
}

function addUserPrefix(segments, authState = {}) {
  const isAuthenticated = Boolean(authState?.isAuthenticated);
  const userName = String(authState?.userName || "").trim();
  const label = isAuthenticated ? (userName || "Profil") : "Visiteur";
  const to = isAuthenticated ? "/profile" : "/login";
  segments.push({ label, to });
}

function withCurrentFlag(segments) {
  const clean = segments
    .map((segment) => ({
      label: String(segment?.label || "").trim(),
      to: String(segment?.to || "").trim(),
    }))
    .filter((segment) => Boolean(segment.label));

  if (!clean.length) {
    return [{ label: "Accueil", to: "/", isCurrent: true }];
  }

  const lastIndex = clean.length - 1;
  return clean.map((segment, index) => {
    const isCurrent = index === lastIndex;
    return {
      label: segment.label,
      to: isCurrent ? "" : segment.to,
      isCurrent,
    };
  });
}

export function buildBreadcrumbs({ pathname = "/", search = "", authState = {} } = {}) {
  const normalizedPath = String(pathname || "").trim() || "/";
  const safePath = normalizedPath === "/" ? "/" : normalizedPath.replace(/\/+$/, "");
  const pathParts = safePath.split("/").filter(Boolean);
  const first = pathParts[0] || "";
  const segments = [];
  const isPersonalGlobal = first === "feed" || first === "watchlist" || first === "profile" || first === "tierlist";

  if (isPersonalGlobal) {
    addUserPrefix(segments, authState);
  }

  if (safePath === "/") {
    segments.push({ label: "Accueil", to: "/" });
    return withCurrentFlag(segments);
  }

  if (first === "discover") {
    segments.push({ label: "Decouvrir", to: "/discover" });
    return withCurrentFlag(segments);
  }

  if (first === "sports") {
    const sportSlug = pathParts[1] || "";
    const sportLabel = resolveSportBySlug(sportSlug);
    segments.push({ label: "Sports", to: "/discover" });
    segments.push({ label: sportLabel || "Sport", to: `/sports/${sportSlug}` });
    return withCurrentFlag(segments);
  }

  if (first === "feed") {
    const params = new URLSearchParams(String(search || ""));
    const scope = String(params.get("scope") || "").trim().toLowerCase();
    const targetType = String(params.get("targetType") || "").trim();
    const targetId = String(params.get("targetId") || "").trim();
    segments.push({ label: "Mon Feed", to: "/feed" });
    if (scope === "object" && targetType && targetId) {
      segments.push(resolveObjectCrumb(targetType, targetId));
    }
    return withCurrentFlag(segments);
  }

  if (first === "watchlist") {
    segments.push({ label: "Ma Watchlist", to: "/watchlist" });
    return withCurrentFlag(segments);
  }

  if (first === "profile") {
    segments.push({ label: "Mon profil", to: "/profile" });
    return withCurrentFlag(segments);
  }

  if (first === "tierlist") {
    segments.push({ label: "Ma Tierlist", to: "/tierlist" });
    return withCurrentFlag(segments);
  }

  if (first === "athletes") {
    segments.push({ label: "Athletes", to: "/athletes" });
    return withCurrentFlag(segments);
  }

  if (first === "athlete") {
    const athleteId = pathParts[1] || "";
    const athlete = getAthleteById(athleteId);
    if (athlete?.sport) {
      segments.push({ label: athlete.sport, to: `/sports/${toSportSlug(athlete.sport)}` });
    }
    segments.push({
      label: athlete?.name || `Athlete ${athleteId}`,
      to: athlete?.id ? `/athlete/${athlete.id}` : `/athlete/${athleteId}`,
    });
    return withCurrentFlag(segments);
  }

  if (first === "teams") {
    segments.push({ label: "Teams", to: "/teams" });
    return withCurrentFlag(segments);
  }

  if (first === "team") {
    const teamId = pathParts[1] || "";
    const team = getTeamById(teamId);
    if (team?.sport) {
      segments.push({ label: team.sport, to: `/sports/${toSportSlug(team.sport)}` });
    }
    segments.push({
      label: team?.nameFull || team?.name || `Team ${teamId}`,
      to: team?.id ? `/team/${team.id}` : `/team/${teamId}`,
    });
    return withCurrentFlag(segments);
  }

  if (first === "leagues") {
    segments.push({ label: "Leagues", to: "/leagues" });
    return withCurrentFlag(segments);
  }

  if (first === "league") {
    const leagueId = pathParts[1] || "";
    const league = getLeagueById(leagueId);
    if (league?.sport) {
      segments.push({ label: league.sport, to: `/sports/${toSportSlug(league.sport)}` });
    }
    segments.push({
      label: league?.title || `Ligue ${leagueId}`,
      to: league?.id ? `/league/${league.id}` : `/league/${leagueId}`,
    });
    return withCurrentFlag(segments);
  }

  if (first === "league-season") {
    const seasonId = pathParts[1] || "";
    const season = getLeagueSeasonById(seasonId);
    const league = season?.leagueId ? getLeagueById(season.leagueId) : null;
    const sportLabel = season?.sport || league?.sport || "";
    if (sportLabel) {
      segments.push({ label: sportLabel, to: `/sports/${toSportSlug(sportLabel)}` });
    }
    if (league?.id) {
      segments.push({ label: league.title, to: `/league/${league.id}` });
    } else if (season?.leagueTitle) {
      segments.push({ label: season.leagueTitle, to: "/leagues" });
    }
    segments.push({
      label: season?.title || `Saison ${seasonId}`,
      to: season?.id ? `/league-season/${season.id}` : `/league-season/${seasonId}`,
    });
    return withCurrentFlag(segments);
  }

  if (first === "lists") {
    segments.push({ label: "Classements", to: "/lists" });
    return withCurrentFlag(segments);
  }

  if (first === "list") {
    const listId = pathParts[1] || "";
    const list = getListById(listId);
    segments.push({ label: "Classements", to: "/lists" });
    segments.push({
      label: list?.title || `Classement ${listId}`,
      to: list?.id ? `/list/${list.id}` : `/list/${listId}`,
    });
    return withCurrentFlag(segments);
  }

  if (first === "users") {
    segments.push({ label: "Users", to: "/users" });
    return withCurrentFlag(segments);
  }

  if (first === "user") {
    const userId = pathParts[1] || "";
    const user = getUserById(userId);
    segments.push({ label: "Users", to: "/users" });
    segments.push({
      label: user?.name || `Utilisateur ${userId}`,
      to: user?.id ? `/user/${user.id}` : `/user/${userId}`,
    });
    return withCurrentFlag(segments);
  }

  if (first === "calendar") {
    segments.push({ label: "Calendrier", to: "/calendar" });
    return withCurrentFlag(segments);
  }

  if (first === "join") {
    segments.push({ label: "Compte", to: "/login" });
    segments.push({ label: "S inscrire", to: "/join" });
    return withCurrentFlag(segments);
  }

  if (first === "login") {
    segments.push({ label: "Compte", to: "/login" });
    segments.push({ label: "Se connecter", to: "/login" });
    return withCurrentFlag(segments);
  }

  if (first === "signup") {
    segments.push({ label: "Compte", to: "/login" });
    segments.push({ label: "S inscrire", to: "/signup" });
    return withCurrentFlag(segments);
  }

  if (first === "datamodel") {
    segments.push({ label: "Admin", to: "/datamodel" });
    segments.push({ label: "DataModel", to: "/datamodel" });
    return withCurrentFlag(segments);
  }

  if (first === "uisamples") {
    segments.push({ label: "Admin", to: "/datamodel" });
    segments.push({ label: "UISamples", to: "/uisamples" });
    return withCurrentFlag(segments);
  }

  if (first === "event") {
    const eventId = pathParts[1] || "";
    const event = getEventById(eventId);
    if (event?.sport) {
      segments.push({ label: event.sport, to: `/sports/${toSportSlug(event.sport)}` });
    }
    const season = event?.seasonId ? getLeagueSeasonById(event.seasonId) : null;
    if (season?.id) {
      segments.push({ label: season.title, to: `/league-season/${season.id}` });
    } else {
      const league = event?.competitionId ? getLeagueById(event.competitionId) : null;
      if (league?.id) {
        segments.push({ label: league.title, to: `/league/${league.id}` });
      } else if (event?.league) {
        segments.push({ label: event.league, to: "/leagues" });
      }
    }
    segments.push({
      label: event?.title || `Evenement ${eventId}`,
      to: event?.id ? `/event/${event.id}` : `/event/${eventId}`,
    });
    return withCurrentFlag(segments);
  }

  const fallbackLabel = formatFallbackLabel(first, "Page");
  segments.push({ label: fallbackLabel, to: safePath });
  return withCurrentFlag(segments);
}
