import { WATCHLIST_STORAGE_KEY } from "../constants";

function normalizeWatchlistEntries(value) {
  if (!Array.isArray(value)) return [];
  const ids = value
    .map((entry) => {
      if (typeof entry === "string") return entry.trim();
      if (entry && typeof entry === "object" && typeof entry.id === "string") {
        return entry.id.trim();
      }
      return "";
    })
    .filter(Boolean);
  return Array.from(new Set(ids));
}

export function readWatchlist() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    return normalizeWatchlistEntries(parsed);
  } catch {
    return [];
  }
}

export function writeWatchlist(watchlistIds) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlistIds));
}
