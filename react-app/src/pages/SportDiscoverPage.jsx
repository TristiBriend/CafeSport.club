import { Navigate, useParams } from "react-router-dom";
import DiscoverPage from "./DiscoverPage";
import { getSports } from "../services/eventsService";

function toSportSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function SportDiscoverPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { sportSlug } = useParams();
  const sports = getSports();
  const safeSlug = String(sportSlug || "").trim().toLowerCase();
  const selectedSport = sports.find((sport) => toSportSlug(sport) === safeSlug) || "";

  if (!selectedSport) {
    const fallbackSport = sports[0] || "";
    if (!fallbackSport) {
      return (
        <section className="discover-page">
          <div className="discover-head">
            <h1>Sports</h1>
            <p className="lede">Aucun sport disponible.</p>
          </div>
        </section>
      );
    }
    return <Navigate replace to={`/sports/${toSportSlug(fallbackSport)}`} />;
  }

  return (
    <DiscoverPage
      watchlistIds={watchlistIds}
      onToggleWatchlist={onToggleWatchlist}
      forcedSport={selectedSport}
      title={`Sport · ${selectedSport}`}
      subtitle={`Vue sports: meme experience que Decouvrir, filtree sur ${selectedSport}.`}
    />
  );
}

export default SportDiscoverPage;
