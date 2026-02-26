import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, isFirebaseConfigured, storage } from "./firebase";
import { isCatalogCloudMode } from "./catalogRepositoryService";

const SUPPORTED_CATALOG_IMAGE_TYPES = {
  event: "events",
  athlete: "athletes",
};

function normalizeId(value) {
  return String(value || "").trim();
}

function normalizeType(value) {
  return String(value || "").trim().toLowerCase();
}

function resolveExtension(file) {
  const mime = String(file?.type || "").toLowerCase();
  if (mime === "image/jpeg" || mime === "image/jpg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/avif") return "avif";
  return "img";
}

function getCollectionName(type) {
  return SUPPORTED_CATALOG_IMAGE_TYPES[normalizeType(type)] || "";
}

export function canUploadCatalogImageToCloud() {
  return Boolean(isFirebaseConfigured && db && storage && isCatalogCloudMode());
}

export async function uploadCatalogImageFile({ firebaseUid, objectType, objectId, file }) {
  const safeUid = normalizeId(firebaseUid);
  const safeType = normalizeType(objectType);
  const safeId = normalizeId(objectId);
  const collectionName = getCollectionName(safeType);

  if (!safeUid) throw new Error("UID Firebase requis.");
  if (!collectionName) throw new Error("Type d objet non supporte pour upload image.");
  if (!safeId) throw new Error("ID objet requis.");
  if (!file || typeof file !== "object") throw new Error("Fichier image invalide.");
  if (!canUploadCatalogImageToCloud()) {
    throw new Error("Catalog cloud indisponible.");
  }

  const extension = resolveExtension(file);
  const stamp = Date.now();
  const objectPath = `catalog/${collectionName}/${safeId}/image-${stamp}.${extension}`;
  const imageRef = ref(storage, objectPath);

  await uploadBytes(imageRef, file, {
    contentType: String(file.type || "application/octet-stream"),
    cacheControl: "public,max-age=86400",
  });
  const url = String(await getDownloadURL(imageRef) || "").trim();

  await updateDoc(doc(db, collectionName, safeId), {
    image: url,
    updatedAt: new Date().toISOString(),
    updatedByUid: safeUid,
  });

  return {
    path: objectPath,
    url,
  };
}

export async function uploadEventImageFile(firebaseUid, eventId, file) {
  return uploadCatalogImageFile({
    firebaseUid,
    objectType: "event",
    objectId: eventId,
    file,
  });
}

export async function uploadAthleteImageFile(firebaseUid, athleteId, file) {
  return uploadCatalogImageFile({
    firebaseUid,
    objectType: "athlete",
    objectId: athleteId,
    file,
  });
}
