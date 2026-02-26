import { useEffect, useMemo } from "react";
import UserProfileLayout from "../components/UserProfileLayout";
import { getUsers } from "../services/catalogService";
import { getCurrentProfileUserId, setCurrentProfileUserId } from "../services/profileService";

function ProfilePage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const allUsers = useMemo(() => getUsers({ query: "" }), []);
  const defaultProfileUserId = allUsers[0]?.id || "";
  const profileUserId = getCurrentProfileUserId(defaultProfileUserId);

  useEffect(() => {
    if (!profileUserId) return;
    setCurrentProfileUserId(profileUserId);
  }, [profileUserId]);

  if (!profileUserId) {
    return (
      <section className="simple-page">
        <h1>Profil indisponible</h1>
        <p>Aucun utilisateur disponible dans le dataset.</p>
      </section>
    );
  }

  return (
    <UserProfileLayout
      userId={profileUserId}
      isOwnProfile
      watchlistIds={watchlistIds}
      onToggleWatchlist={onToggleWatchlist}
    />
  );
}

export default ProfilePage;
