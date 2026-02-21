# CafeSport.club
CaféSport.club is the social network of sport fans / Website

## React migration (progressive)

Legacy static assets (`app.js`, `style.css`) have been removed.
Root `.html` files now act as redirect stubs to React routes.
React app lives in `react-app/`.

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
- Legacy `.html` route aliases added (redirect to React routes)
- Watchlist connected to localStorage (`cafesport.club_watchlist`)
- Header/Footer dynamiques migrés en React (`SiteHeader`, `SiteFooter`)
- Recherche globale React (events, leagues, athletes, teams, users, lists)
- Comments/reviews React flow on event detail:
  - filter/post/like
  - reply create/like
  - edit/delete for own comments and own replies
- Business logic extracted in `react-app/src/services/`
- Legacy deep-link redirects with `?id=` mapped to React detail routes
- Legacy `matierlist.html` mapped to `/tierlist`
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
