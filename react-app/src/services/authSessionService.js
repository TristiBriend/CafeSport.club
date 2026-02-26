import { getUserById } from "./catalogService";

const AUTH_SESSION_KEY = "cafesport.club_auth_session_v1";

const GUEST_SESSION = Object.freeze({
  status: "guest",
  userId: null,
});

function normalizeSession(value) {
  const raw = value && typeof value === "object" ? value : {};
  const status = String(raw.status || "").trim().toLowerCase();
  const userId = String(raw.userId || "").trim();
  if (status !== "authenticated" || !userId) return { ...GUEST_SESSION };
  if (!getUserById(userId)) return { ...GUEST_SESSION };
  return {
    status: "authenticated",
    userId,
  };
}

function writeAuthSession(session) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function readAuthSession() {
  if (typeof window === "undefined") return { ...GUEST_SESSION };
  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY);
    const parsed = JSON.parse(raw || "{}");
    return normalizeSession(parsed);
  } catch {
    return { ...GUEST_SESSION };
  }
}

export function isAuthenticated(session) {
  return String(session?.status || "").trim() === "authenticated" && Boolean(session?.userId);
}

export function login(userId) {
  const safeUserId = String(userId || "").trim();
  if (!safeUserId || !getUserById(safeUserId)) {
    return logout();
  }
  const session = {
    status: "authenticated",
    userId: safeUserId,
  };
  writeAuthSession(session);
  return session;
}

export function logout() {
  const session = { ...GUEST_SESSION };
  writeAuthSession(session);
  return session;
}
