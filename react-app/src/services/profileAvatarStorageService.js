import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { isFirebaseConfigured, storage } from "./firebase";

function normalizeId(value) {
  return String(value || "").trim();
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

export function canUploadProfileAvatarToCloud() {
  return Boolean(isFirebaseConfigured && storage);
}

export async function uploadProfileAvatarFile(firebaseUid, file) {
  const safeUid = normalizeId(firebaseUid);
  if (!safeUid) {
    throw new Error("UID Firebase requis pour uploader un avatar.");
  }
  if (!file || typeof file !== "object") {
    throw new Error("Fichier avatar invalide.");
  }
  if (!canUploadProfileAvatarToCloud()) {
    throw new Error("Storage Firebase non configure.");
  }

  const extension = resolveExtension(file);
  const stamp = Date.now();
  const objectPath = `users/${safeUid}/avatar/avatar-${stamp}.${extension}`;
  const avatarRef = ref(storage, objectPath);
  await uploadBytes(avatarRef, file, {
    contentType: String(file.type || "application/octet-stream"),
    cacheControl: "public,max-age=86400",
  });
  const url = await getDownloadURL(avatarRef);
  return {
    path: objectPath,
    url: String(url || "").trim(),
  };
}
