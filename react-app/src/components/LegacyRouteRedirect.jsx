import { Navigate, useLocation } from "react-router-dom";
import {
  getAthleteById,
  getListById,
  getTeamById,
  getUserById,
} from "../services/catalogService";
import { getEventById } from "../services/eventsService";
import { getLeagueById, getLeagueSeasonById } from "../services/leaguesService";

const FEED_MODES = new Set([
  "for-you",
  "recent",
  "favorites",
  "activity-recent",
  "activity-popular",
  "popular",
]);

function readLegacyId(search) {
  const params = new URLSearchParams(search || "");
  return String(params.get("id") || "").trim();
}

function normalizeFeedMode(mode) {
  const raw = String(mode || "").trim().toLowerCase();
  if (!raw) return "";
  if (raw === "tailored") return "for-you";
  if (raw === "chrono") return "recent";
  return FEED_MODES.has(raw) ? raw : "";
}

function toPathWithSearch(path, params) {
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

function resolveLeagueId(rawId) {
  const safeId = String(rawId || "").trim();
  if (!safeId) return "";
  if (getLeagueById(safeId)) return safeId;
  const season = getLeagueSeasonById(safeId);
  if (season?.leagueId) return season.leagueId;

  const seasonPrefix = safeId.replace(/-(\d{4}|na)$/i, "");
  if (seasonPrefix && seasonPrefix !== safeId && getLeagueById(seasonPrefix)) {
    return seasonPrefix;
  }
  return "";
}

function resolveFeedTarget(search, { forceFavorites = false } = {}) {
  const params = new URLSearchParams(search || "");
  const modeToken = params.get("mode") || params.get("feedMode") || "";
  const normalizedMode = forceFavorites ? "favorites" : normalizeFeedMode(modeToken);

  params.delete("feedMode");
  if (normalizedMode) {
    params.set("mode", normalizedMode);
  } else {
    params.delete("mode");
  }

  if (forceFavorites && !params.get("scope")) {
    params.set("scope", "my");
  }

  return toPathWithSearch("/feed", params);
}

function resolveLegacyTarget(kind, location, forceFavorites) {
  const rawId = readLegacyId(location.search);

  if (kind === "event") {
    return getEventById(rawId) ? `/event/${rawId}` : "/discover";
  }
  if (kind === "athlete") {
    return getAthleteById(rawId) ? `/athlete/${rawId}` : "/athletes";
  }
  if (kind === "team") {
    return getTeamById(rawId) ? `/team/${rawId}` : "/teams";
  }
  if (kind === "league") {
    const leagueId = resolveLeagueId(rawId);
    return leagueId ? `/league/${leagueId}` : "/leagues";
  }
  if (kind === "league-season") {
    const season = getLeagueSeasonById(rawId);
    if (season) {
      return `/league-season/${season.id}`;
    }

    const leagueId = resolveLeagueId(rawId);
    if (leagueId) return `/league/${leagueId}`;
    return "/leagues";
  }
  if (kind === "list") {
    return getListById(rawId) ? `/list/${rawId}` : "/lists";
  }
  if (kind === "user") {
    return getUserById(rawId) ? `/user/${rawId}` : "/users";
  }
  if (kind === "feed") {
    return resolveFeedTarget(location.search, { forceFavorites });
  }

  return "/";
}

function LegacyRouteRedirect({ kind, forceMode = "" }) {
  const location = useLocation();
  const target = resolveLegacyTarget(kind, location, forceMode === "favorites");
  return <Navigate replace to={target} />;
}

export default LegacyRouteRedirect;
