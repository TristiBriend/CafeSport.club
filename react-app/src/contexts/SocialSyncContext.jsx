import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  getSocialSyncSnapshot,
  initializeSocialSyncSession,
  subscribeSocialSync,
} from "../services/socialSyncService";

const SocialSyncContext = createContext(null);

export function SocialSyncProvider({ children }) {
  const { authReady, currentUser, isAuthenticated, isFirebaseConfigured } = useAuth();
  const [snapshot, setSnapshot] = useState(() => getSocialSyncSnapshot());

  useEffect(() => {
    const unsubscribe = subscribeSocialSync((next) => setSnapshot(next));
    setSnapshot(getSocialSyncSnapshot());
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authReady) return;
    initializeSocialSyncSession({
      isAuthenticated,
      firebaseUid: currentUser?.firebaseUid || "",
      appUserId: currentUser?.id || "",
      firebaseConfigured: isFirebaseConfigured,
    }).catch(() => {});
  }, [authReady, currentUser?.firebaseUid, currentUser?.id, isAuthenticated, isFirebaseConfigured]);

  const value = useMemo(() => ({
    mode: snapshot.mode,
    readyByDomain: snapshot.readyByDomain,
    revisionByDomain: snapshot.revisionByDomain,
    flags: snapshot.flags,
  }), [snapshot]);

  return (
    <SocialSyncContext.Provider value={value}>
      {children}
    </SocialSyncContext.Provider>
  );
}

export function useSocialSync() {
  const context = useContext(SocialSyncContext);
  if (!context) {
    throw new Error("useSocialSync must be used within <SocialSyncProvider>.");
  }
  return context;
}
