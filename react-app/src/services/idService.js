function toHex(bytes) {
  return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
}

function randomHex(byteLength = 16) {
  const safeLength = Math.max(1, Number(byteLength) || 16);
  const bytes = new Uint8Array(safeLength);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
    return toHex(bytes);
  }

  let fallback = "";
  for (let index = 0; index < safeLength; index += 1) {
    fallback += Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
  }
  return fallback;
}

export function createClientId(prefix = "id") {
  const safePrefix = String(prefix || "id").trim().replace(/[^a-z0-9_-]+/gi, "-");
  const normalizedPrefix = safePrefix || "id";
  const uuid = globalThis.crypto?.randomUUID?.();
  const token = uuid || randomHex(16);
  return `${normalizedPrefix}-${token}`;
}

export function createCommentId() {
  return createClientId("comment");
}

export function createReplyId() {
  return createClientId("reply");
}

export function createTagId() {
  return createClientId("tag");
}
