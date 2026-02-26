import UserProfileLayout from "../components/UserProfileLayout";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { currentUser } = useAuth();
  const profileUserId = String(currentUser?.id || "").trim();

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
