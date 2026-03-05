import { doc, updateDoc } from "firebase/firestore";
import {
  getCatalogSnapshot,
  isCatalogCloudMode,
  upsertCatalogEventInSnapshot,
} from "./catalogRepositoryService";
import { db, isFirebaseConfigured } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
}

function getCurrentEvent(eventId) {
  const safeId = normalizeId(eventId);
  if (!safeId) return null;
  const snapshot = getCatalogSnapshot();
  return snapshot.events.find((event) => normalizeId(event?.id) === safeId) || null;
}

export async function setEventLegendary(eventId, legendary, options = {}) {
  const safeId = normalizeId(eventId);
  if (!safeId) {
    return {
      ok: false,
      reason: "invalid_event_id",
    };
  }

  const currentEvent = getCurrentEvent(safeId);
  if (!currentEvent) {
    return {
      ok: false,
      reason: "event_not_found",
    };
  }

  const nextLegendary = Boolean(legendary);
  const updatedAt = new Date().toISOString();
  const safeUid = normalizeId(options?.firebaseUid);
  const nextEvent = {
    ...currentEvent,
    legendary: nextLegendary,
    updatedAt,
    ...(safeUid ? { updatedByUid: safeUid } : {}),
  };

  const canWriteCloud = Boolean(isCatalogCloudMode() && isFirebaseConfigured && db);

  try {
    if (canWriteCloud) {
      const payload = {
        legendary: nextLegendary,
        updatedAt,
      };
      if (safeUid) {
        payload.updatedByUid = safeUid;
      }
      await updateDoc(doc(db, "events", safeId), payload);
    }

    const updated = upsertCatalogEventInSnapshot(nextEvent);
    if (!updated) {
      return {
        ok: false,
        reason: "event_not_found",
      };
    }

    return {
      ok: true,
      event: nextEvent,
    };
  } catch {
    return {
      ok: false,
      reason: "update_failed",
    };
  }
}

export async function toggleEventLegendary(eventId, nextValue, options = {}) {
  const currentEvent = getCurrentEvent(eventId);
  if (!currentEvent) {
    return {
      ok: false,
      reason: "event_not_found",
    };
  }

  const resolvedLegendary = typeof nextValue === "boolean"
    ? nextValue
    : !Boolean(currentEvent?.legendary);

  return setEventLegendary(eventId, resolvedLegendary, options);
}
