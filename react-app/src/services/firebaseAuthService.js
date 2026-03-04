import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured, firebaseMissingConfig } from "./firebase";

function createMissingConfigError() {
  const missing = firebaseMissingConfig.join(", ");
  return new Error(`Firebase non configure. Variables manquantes: ${missing}`);
}

function assertFirebaseConfigured() {
  if (!isFirebaseConfigured || !auth) {
    throw createMissingConfigError();
  }
}

export function observeAuth(listener) {
  if (typeof listener !== "function") return () => {};
  if (!isFirebaseConfigured || !auth) {
    listener(null);
    return () => {};
  }
  return onAuthStateChanged(auth, listener, () => listener(null));
}

export async function signInWithGoogle() {
  assertFirebaseConfigured();
  return signInWithPopup(auth, googleProvider);
}

export async function signInWithEmail(email, password) {
  assertFirebaseConfigured();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email, password, { displayName = "" } = {}) {
  assertFirebaseConfigured();
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const safeDisplayName = String(displayName || "").trim();
  if (safeDisplayName && result?.user) {
    await updateProfile(result.user, { displayName: safeDisplayName });
  }
  return result;
}

export async function signOutUser() {
  if (!isFirebaseConfigured || !auth) return null;
  return signOut(auth);
}

export async function ensureAnonymousSession() {
  if (!isFirebaseConfigured || !auth) return null;
  if (auth.currentUser) return auth.currentUser;
  const result = await signInAnonymously(auth);
  return result?.user || null;
}

export async function updateCurrentAuthProfile({ displayName = "" } = {}) {
  if (!isFirebaseConfigured || !auth?.currentUser) return null;
  const safeDisplayName = String(displayName || "").trim();
  await updateProfile(auth.currentUser, { displayName: safeDisplayName || null });
  return auth.currentUser;
}
