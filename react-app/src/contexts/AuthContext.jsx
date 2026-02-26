import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getUsers } from "../services/catalogService";
import { setCurrentProfileUserId } from "../services/profileService";
import { firebaseMissingConfig, isFirebaseConfigured } from "../services/firebase";
import {
  observeAuth,
  ensureAnonymousSession,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  signUpWithEmail,
} from "../services/firebaseAuthService";
import { subscribeAdminProfile } from "../services/adminRolesService";

const AuthContext = createContext(null);

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function getSafeErrorMessage(error) {
  const code = String(error?.code || "");
  if (code.includes("auth/invalid-credential")) return "Email ou mot de passe invalide.";
  if (code.includes("auth/user-not-found")) return "Utilisateur introuvable.";
  if (code.includes("auth/wrong-password")) return "Mot de passe incorrect.";
  if (code.includes("auth/email-already-in-use")) return "Cet email est deja utilise.";
  if (code.includes("auth/weak-password")) return "Mot de passe trop faible (6 caracteres minimum).";
  if (code.includes("auth/popup-closed-by-user")) return "Connexion Google annulee.";
  if (code.includes("auth/network-request-failed")) return "Erreur reseau. Verifie ta connexion.";
  return String(error?.message || "Une erreur d authentification est survenue.");
}

function pickCatalogUser(firebaseUser) {
  const users = getUsers({ query: "" });
  if (!users.length) return null;
  if (!firebaseUser) return users[0];

  const displayName = normalizeText(firebaseUser.displayName);
  const emailPrefix = normalizeText(String(firebaseUser.email || "").split("@")[0]);
  const exactByName = users.find((user) => normalizeText(user.name) === displayName);
  if (exactByName) return exactByName;

  const partialByName = users.find((user) => {
    const safeUserName = normalizeText(user.name);
    if (!safeUserName) return false;
    return (displayName && safeUserName.includes(displayName))
      || (displayName && displayName.includes(safeUserName))
      || (emailPrefix && safeUserName.includes(emailPrefix));
  });
  if (partialByName) return partialByName;
  return users[0];
}

function buildCurrentUser(firebaseUser) {
  if (!firebaseUser) return null;
  if (firebaseUser.isAnonymous) {
    return {
      id: "",
      firebaseUid: String(firebaseUser.uid || "").trim(),
      name: "Visiteur",
      handle: "@visiteur",
      location: "",
      bio: "",
      favoriteSports: [],
      followers: 0,
      image: "",
      email: "",
      isAnonymous: true,
    };
  }
  const catalogUser = pickCatalogUser(firebaseUser);
  if (!catalogUser) {
    const email = String(firebaseUser.email || "").trim();
    const fallbackName = String(firebaseUser.displayName || "").trim() || (email ? email.split("@")[0] : "Utilisateur");
    return {
      id: String(firebaseUser.uid || "").trim(),
      firebaseUid: String(firebaseUser.uid || "").trim(),
      name: fallbackName,
      handle: email ? `@${email.split("@")[0]}` : "@user",
      location: "",
      bio: "",
      favoriteSports: [],
      followers: 0,
      image: String(firebaseUser.photoURL || "").trim(),
      email,
    };
  }

  return {
    ...catalogUser,
    firebaseUid: String(firebaseUser.uid || "").trim(),
    name: String(firebaseUser.displayName || "").trim() || catalogUser.name,
    image: String(firebaseUser.photoURL || "").trim() || String(catalogUser.image || "").trim(),
    email: String(firebaseUser.email || "").trim(),
  };
}

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRoles, setAdminRoles] = useState([]);
  const [adminReady, setAdminReady] = useState(false);
  const currentUser = useMemo(() => buildCurrentUser(firebaseUser), [firebaseUser]);
  const hasCloudSession = Boolean(firebaseUser);
  const isAnonymousSession = Boolean(firebaseUser?.isAnonymous);
  const isAuthenticated = Boolean(firebaseUser && !firebaseUser?.isAnonymous);

  useEffect(() => {
    const unsubscribe = observeAuth((nextUser) => {
      setFirebaseUser(nextUser || null);
      setAuthReady(true);
      if (nextUser && !nextUser.isAnonymous) {
        const mappedUser = buildCurrentUser(nextUser);
        const profileId = String(mappedUser?.id || "").trim();
        if (profileId) {
          setCurrentProfileUserId(profileId);
        }
      } else if (!nextUser && isFirebaseConfigured) {
        ensureAnonymousSession().catch(() => {});
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authReady) return () => {};
    if (!isAuthenticated || !isFirebaseConfigured) {
      setIsAdmin(false);
      setAdminRoles([]);
      setAdminReady(true);
      return () => {};
    }

    const safeUid = String(currentUser?.firebaseUid || "").trim();
    if (!safeUid) {
      setIsAdmin(false);
      setAdminRoles([]);
      setAdminReady(true);
      return () => {};
    }

    setAdminReady(false);
    return subscribeAdminProfile(safeUid, (profile) => {
      setIsAdmin(Boolean(profile?.isAdmin));
      setAdminRoles(Array.isArray(profile?.roles) ? profile.roles : []);
      setAdminReady(true);
    }, () => {
      setIsAdmin(false);
      setAdminRoles([]);
      setAdminReady(true);
    });
  }, [authReady, currentUser?.firebaseUid, isAuthenticated, isFirebaseConfigured]);

  const loginWithGoogle = useCallback(async () => {
    setAuthError("");
    try {
      return await signInWithGoogle();
    } catch (error) {
      const message = getSafeErrorMessage(error);
      setAuthError(message);
      throw new Error(message);
    }
  }, []);

  const loginWithEmail = useCallback(async (email, password) => {
    setAuthError("");
    try {
      return await signInWithEmail(email, password);
    } catch (error) {
      const message = getSafeErrorMessage(error);
      setAuthError(message);
      throw new Error(message);
    }
  }, []);

  const signupWithEmail = useCallback(async (email, password) => {
    setAuthError("");
    try {
      return await signUpWithEmail(email, password);
    } catch (error) {
      const message = getSafeErrorMessage(error);
      setAuthError(message);
      throw new Error(message);
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthError("");
    await signOutUser();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      hasCloudSession,
      isAnonymousSession,
      isAdmin,
      adminRoles,
      adminReady,
      currentUser,
      authReady,
      authError,
      isFirebaseConfigured,
      firebaseMissingConfig,
      loginWithGoogle,
      loginWithEmail,
      signupWithEmail,
      logout,
    }),
    [
      authError,
      authReady,
      currentUser,
      isAdmin,
      adminRoles,
      adminReady,
      isAuthenticated,
      hasCloudSession,
      isAnonymousSession,
      isFirebaseConfigured,
      loginWithEmail,
      loginWithGoogle,
      logout,
      signupWithEmail,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within <AuthProvider>.");
  }
  return context;
}
