import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export const CATALOG_COLLECTIONS = {
  EVENTS: "events",
  ATHLETES: "athletes",
  TEAMS: "teams",
  LEAGUES: "leagues",
  LEAGUE_SEASONS: "leagueSeasons",
  LISTS: "lists",
};

const COLLECTION_KEYS = [
  CATALOG_COLLECTIONS.EVENTS,
  CATALOG_COLLECTIONS.ATHLETES,
  CATALOG_COLLECTIONS.TEAMS,
  CATALOG_COLLECTIONS.LEAGUES,
  CATALOG_COLLECTIONS.LEAGUE_SEASONS,
  CATALOG_COLLECTIONS.LISTS,
];

function normalizeId(value) {
  return String(value || "").trim();
}

function sanitizeValue(value) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeValue(item))
      .filter((item) => item !== undefined);
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (value && typeof value === "object") {
    const output = {};
    Object.entries(value).forEach(([key, item]) => {
      const safeItem = sanitizeValue(item);
      if (safeItem !== undefined) output[key] = safeItem;
    });
    return output;
  }
  return value;
}

function mapDocList(list = []) {
  return list
    .map((entry) => {
      const id = normalizeId(entry?.id);
      if (!id) return null;
      return sanitizeValue({
        id,
        ...entry,
      });
    })
    .filter(Boolean);
}

function getCollectionRef(name) {
  if (!isFirebaseConfigured || !db) return null;
  return collection(db, name);
}

export async function readCatalogCollection(name) {
  const ref = getCollectionRef(name);
  if (!ref) return [];
  const snap = await getDocs(ref);
  return mapDocList(snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
}

export async function readAllCatalogCollections() {
  const out = {};
  for (let index = 0; index < COLLECTION_KEYS.length; index += 1) {
    const key = COLLECTION_KEYS[index];
    // eslint-disable-next-line no-await-in-loop
    out[key] = await readCatalogCollection(key);
  }
  return out;
}

export function subscribeCatalogCollections(onChange = () => {}, onError = () => {}) {
  if (!isFirebaseConfigured || !db) {
    onChange({});
    return () => {};
  }

  const payload = {};
  const unsubscribers = COLLECTION_KEYS.map((key) => {
    const ref = getCollectionRef(key);
    if (!ref) return () => {};
    return onSnapshot(ref, (snap) => {
      payload[key] = mapDocList(snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
      onChange({
        ...payload,
      });
    }, onError);
  });

  return () => {
    unsubscribers.forEach((unsubscribe) => {
      try {
        unsubscribe();
      } catch {
        // noop
      }
    });
  };
}

