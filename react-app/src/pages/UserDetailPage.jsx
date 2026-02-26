import { useParams } from "react-router-dom";
import UserProfileLayout from "../components/UserProfileLayout";

function UserDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { userId } = useParams();

  return (
    <UserProfileLayout
      userId={userId}
      isOwnProfile={false}
      watchlistIds={watchlistIds}
      onToggleWatchlist={onToggleWatchlist}
    />
  );
}

export default UserDetailPage;
