import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
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
import CalendarPage from "./pages/CalendarPage";
import FeedPage from "./pages/FeedPage";
import JoinPage from "./pages/JoinPage";
import DataModelPage from "./pages/DataModelPage";
import UISamplesPage from "./pages/UISamplesPage";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import LegacyRouteRedirect from "./components/LegacyRouteRedirect";
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

      <main className="page-wrap legacy-main-wrap">
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
          <Route path="/list/:listId" element={<ListDetailPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/user/:userId" element={<UserDetailPage />} />
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
          <Route path="/index.html" element={<Navigate replace to="/" />} />
          <Route path="/calendar.html" element={<Navigate replace to="/calendar" />} />
          <Route path="/feed.html" element={<LegacyRouteRedirect kind="feed" />} />
          <Route
            path="/feed-favorites.html"
            element={<LegacyRouteRedirect kind="feed" forceMode="favorites" />}
          />
          <Route path="/join/index.html" element={<Navigate replace to="/join" />} />
          <Route path="/athlete.html" element={<LegacyRouteRedirect kind="athlete" />} />
          <Route path="/team.html" element={<LegacyRouteRedirect kind="team" />} />
          <Route path="/league.html" element={<LegacyRouteRedirect kind="league" />} />
          <Route path="/league-season.html" element={<LegacyRouteRedirect kind="league-season" />} />
          <Route path="/list.html" element={<LegacyRouteRedirect kind="list" />} />
          <Route path="/profile.html" element={<LegacyRouteRedirect kind="user" />} />
          <Route path="/event.html" element={<LegacyRouteRedirect kind="event" />} />
          <Route path="/datamodel.html" element={<Navigate replace to="/datamodel" />} />
          <Route path="/uisamples.html" element={<Navigate replace to="/uisamples" />} />
          <Route path="/matierlist.html" element={<Navigate replace to="/tierlist" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
      <SiteFooter watchlistCount={watchlistIds.length} />
    </div>
  );
}

export default App;
