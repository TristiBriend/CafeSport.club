import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import SportDiscoverPage from "./pages/SportDiscoverPage";
import WatchlistPage from "./pages/WatchlistPage";
import EventDetailPage from "./pages/EventDetailPage";
import TierlistPage from "./pages/TierlistPage";
import AthletesPage from "./pages/AthletesPage";
import AthleteDetailPage from "./pages/AthleteDetailPage";
import TeamsPage from "./pages/TeamsPage";
import TeamDetailPage from "./pages/TeamDetailPage";
import LeaguesPage from "./pages/LeaguesPage";
import LeagueDetailPage from "./pages/LeagueDetailPage";
import LeagueSeasonDetailPage from "./pages/LeagueSeasonDetailPage";
import ListsPage from "./pages/ListsPage";
import ListDetailPage from "./pages/ListDetailPage";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import FeedPage from "./pages/FeedPage";
import JoinPage from "./pages/JoinPage";
import DataModelPage from "./pages/DataModelPage";
import UISamplesPage from "./pages/UISamplesPage";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { readWatchlist, writeWatchlist } from "./services/watchlistStorage";

function App() {
  const [watchlistIds, setWatchlistIds] = useState(() => readWatchlist());

  useEffect(() => {
    writeWatchlist(watchlistIds);
  }, [watchlistIds]);

  function handleToggleWatchlist(eventId) {
    setWatchlistIds((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId);
      }
      return [...prev, eventId];
    });
  }

  return (
    <div className="app-shell">
      <div className="bg-gradient" />
      <div className="bg-grid" />
      <SiteHeader watchlistCount={watchlistIds.length} />

      <main className="page-wrap app-main-wrap">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                watchlistCount={watchlistIds.length}
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route
            path="/discover"
            element={
              <DiscoverPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route
            path="/sports/:sportSlug"
            element={(
              <SportDiscoverPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            )}
          />
          <Route
            path="/watchlist"
            element={
              <WatchlistPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route path="/tierlist" element={<TierlistPage />} />
          <Route
            path="/event/:eventId"
            element={
              <EventDetailPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route path="/athletes" element={<AthletesPage />} />
          <Route
            path="/athlete/:athleteId"
            element={
              <AthleteDetailPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route path="/teams" element={<TeamsPage />} />
          <Route
            path="/team/:teamId"
            element={
              <TeamDetailPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route
            path="/league/:leagueId"
            element={
              <LeagueDetailPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route
            path="/league-season/:seasonId"
            element={
              <LeagueSeasonDetailPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route path="/lists" element={<ListsPage />} />
          <Route
            path="/list/:listId"
            element={
              <ListDetailPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route path="/users" element={<UsersPage />} />
          <Route
            path="/profile"
            element={
              <ProfilePage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route
            path="/user/:userId"
            element={
              <UserDetailPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route
            path="/calendar"
            element={
              <CalendarPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route
            path="/feed"
            element={
              <FeedPage
                watchlistIds={watchlistIds}
                onToggleWatchlist={handleToggleWatchlist}
              />
            }
          />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/datamodel" element={<DataModelPage />} />
          <Route path="/uisamples" element={<UISamplesPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
      <SiteFooter watchlistCount={watchlistIds.length} />
    </div>
  );
}

export default App;
