import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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

export async function signUpWithEmail(email, password) {
  assertFirebaseConfigured();
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  if (!isFirebaseConfigured || !auth) return null;
  return signOut(auth);
}
