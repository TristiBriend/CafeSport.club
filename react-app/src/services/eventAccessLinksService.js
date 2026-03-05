import { getTeamsForEvent } from "./catalogService";
import { isUpcomingEvent } from "./ratingsService";

function createLink(id, label, href, meta = "") {
  const safeId = String(id || "").trim();
  const safeLabel = String(label || "").trim();
  const safeHref = String(href || "").trim();
  if (!safeId || !safeLabel || !safeHref) return null;
  return {
    id: safeId,
    label: safeLabel,
    href: safeHref,
    meta: String(meta || "").trim(),
  };
}

function buildGoogleSearchUrl(query) {
  const safeQuery = String(query || "").trim();
  if (!safeQuery) return "";
  return `https://www.google.com/search?q=${encodeURIComponent(safeQuery)}`;
}

function buildGoogleNewsUrl(query) {
  const safeQuery = String(query || "").trim();
  if (!safeQuery) return "";
  return `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(safeQuery)}`;
}

function buildYouTubeSearchUrl(query) {
  const safeQuery = String(query || "").trim();
  if (!safeQuery) return "";
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(safeQuery)}`;
}

function buildSearchLabel(event) {
  const teams = getTeamsForEvent(event?.id);
  if (teams.length >= 2) {
    const leftName = String(teams[0]?.nameFull || teams[0]?.name || "").trim();
    const rightName = String(teams[1]?.nameFull || teams[1]?.name || "").trim();
    const matchLabel = [leftName, rightName].filter(Boolean).join(" vs ");
    if (matchLabel) return matchLabel;
  }
  return String(event?.title || "").trim() || "evenement sportif";
}

function buildBaseQuery(event) {
  const tokens = [
    buildSearchLabel(event),
    String(event?.league || "").trim(),
    String(event?.sport || "").trim(),
  ].filter(Boolean);
  return Array.from(new Set(tokens)).join(" ");
}

export function getEventAccessLinks(event) {
  if (!event) {
    return {
      title: "Ou regarder",
      description: "",
      links: [],
    };
  }

  const baseQuery = buildBaseQuery(event);
  const futureEvent = isUpcomingEvent(event);

  if (futureEvent) {
    return {
      title: "Ou regarder",
      description: "Liens rapides pour trouver la diffusion, le direct et les dernieres infos.",
      links: [
        createLink(
          "watch-live",
          "Ou regarder en direct",
          buildGoogleSearchUrl(`${baseQuery} ou regarder en direct`),
          "Recherche web",
        ),
        createLink(
          "tv-guide",
          "Programmation TV / streaming",
          buildGoogleSearchUrl(`${baseQuery} chaine TV streaming`),
          "Recherche web",
        ),
        createLink(
          "latest-news",
          "Dernieres infos",
          buildGoogleNewsUrl(baseQuery),
          "Google News",
        ),
      ].filter(Boolean),
    };
  }

  return {
    title: "Replay",
    description: "Liens rapides pour retrouver le replay, les highlights et les analyses.",
    links: [
      createLink(
        "full-replay",
        "Replay complet",
        buildYouTubeSearchUrl(`${baseQuery} replay complet`),
        "YouTube",
      ),
      createLink(
        "highlights",
        "Highlights",
        buildYouTubeSearchUrl(`${baseQuery} highlights`),
        "YouTube",
      ),
      createLink(
        "analysis",
        "Resume et analyses",
        buildGoogleSearchUrl(`${baseQuery} resume analyse`),
        "Recherche web",
      ),
    ].filter(Boolean),
  };
}
