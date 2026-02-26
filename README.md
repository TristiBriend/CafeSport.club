# CafeSport.club
CaféSport.club is the social network of sport fans / Website

## React app

The project runs from `react-app/` (Vite + React).

### Commands

```bash
npm run react:install
npm run react:dev
```

Then open the local Vite URL displayed in the terminal.

### Current scope

- React + Vite scaffold ready
- Core routes migrated:
  - `/`, `/discover`, `/watchlist`, `/tierlist`, `/event/:eventId`
  - `/athletes`, `/athlete/:athleteId`
  - `/teams`, `/team/:teamId`
  - `/leagues`, `/league/:leagueId`, `/league-season/:seasonId`
  - `/lists`, `/list/:listId`
  - `/users`, `/user/:userId`
  - `/calendar`, `/feed`, `/join`, `/datamodel`, `/uisamples`
- Watchlist connected to localStorage (`cafesport.club_watchlist`)
- Header/Footer dynamiques migrés en React (`SiteHeader`, `SiteFooter`)
- Recherche globale React (events, leagues, athletes, teams, users, lists)
- Comments/reviews React flow on event detail:
  - filter/post/like
  - reply create/like
  - edit/delete for own comments and own replies
- Business logic extracted in `react-app/src/services/`
- Canonical data normalization via `react-app/src/data/modelStore.js`:
  - scores normalized to `/100`
  - events linked by `competitionId` + `seasonId`
  - activity feed dates normalized with `dateISO`
- User profile React enriched:
  - about, sport collection, best reviews, rating distribution
  - activities, published lists, liked comments, recent reviews
- Home React enriched:
  - hero a la une, radar, best-of (periode/sport), watchlist, anticipated, best month, curated lists
- Feed React upgraded:
  - modes `for-you`, `recent`, `favorites`, `activity-recent`, `activity-popular`
  - object scope feed (`scope=object`) with `recent/popular` for event/user/league/league-season/athlete/team/list
  - optional object tabs persisted in localStorage (`sofa_feed_optional_tabs_v1`) with add/remove + mode memory
  - first pass on feed signals: followed-account boost + trending/origin labels in `for-you`
- Calendar React upgraded:
  - view modes `day/week/month/year` + period navigation
  - timeline mode (watchlist upcoming + rated past) and spotlight mode
  - calendar and list displays with sport/date filtering
- UISamples React upgraded:
  - interactive sandbox for cards, comments CRUD, object tags, object social panel, and feed/calendar smoke links
- Object social layer migrated on detail pages:
  - follow actions (user, athlete, team, league, league-season, list) with localStorage
  - target comments/reviews/replies (create/like/edit/delete) via shared `ObjectSocialPanel`
- Object tags migrated:
  - `objectTagsService` with localStorage + seeded defaults
  - add/vote (+/-) tags on object surfaces (`event`, `user`, `athlete`, `team`, `league`, `league-season`, `list`)

### Cloud sync domains (Firebase)

- Auth via Firebase (`react-app/src/contexts/AuthContext.jsx`)
  - anonymous cloud session auto for non connected visitors
- Watchlist cloud (`users/{uid}/watchlist`) + local guest fallback
- Social sync orchestrator (`react-app/src/services/socialSyncService.js`)
  - domains: `follows`, `comments`, `ratings`, `tags`, `tabs`, `profile`
  - mode guest: localStorage/sessionStorage
  - mode cloud (anonymous/authenticated): non-destructive local->cloud seed + cloud->local hydration
- Join requests cloud: `joinRequests`
- Catalog bootstrap Firestore:
  - button in `DataModel` page to initialize `events`, `athletes`, `teams`, `leagues`, `leagueSeasons`, `lists`
  - service: `react-app/src/services/catalogFirestoreBootstrapService.js`
- Admin mode (Firestore):
  - roles from `adminUsers/{uid}` (`isAdmin: true`, `roles: ["catalog_admin"]`)
  - admin routes: `/datamodel`, `/uisamples`
  - admin can delete catalog objects from card menus (`event`, `athlete`, `team`, `league`, `league-season`, `list`) with dependency guard
  - first admin bootstrap (Firebase Console): create document `adminUsers/{uid}` with fields:
    - `uid: "<firebase uid>"`
    - `isAdmin: true`
    - `roles: ["catalog_admin"]`
- Domain flags (optional) in `react-app/.env.local`:
  - `VITE_FIREBASE_SYNC_FOLLOWS`
  - `VITE_FIREBASE_SYNC_COMMENTS`
  - `VITE_FIREBASE_SYNC_RATINGS`
  - `VITE_FIREBASE_SYNC_TAGS`
  - `VITE_FIREBASE_SYNC_FEED_TABS`
  - `VITE_FIREBASE_SYNC_PROFILE`
