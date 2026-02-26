import { useEffect, useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import SportFilters from "../components/SportFilters";
import {
  filterEvents,
  getAllEvents,
  getSports,
  groupEventsBySport,
} from "../services/eventsService";

function resolveForcedSport(sports, forcedSport) {
  const token = String(forcedSport || "").trim().toLowerCase();
  if (!token) return "";
  return sports.find((sport) => String(sport || "").trim().toLowerCase() === token) || "";
}

function DiscoverPage({
  watchlistIds = [],
  onToggleWatchlist,
  forcedSport = "",
  title = "Parcourir les evenements",
  subtitle = "Migration React de la section events avec filtres et recherche.",
}) {
  const [sportFilter, setSportFilter] = useState("Tous");
  const [query, setQuery] = useState("");
  const events = getAllEvents();
  const sports = useMemo(() => getSports(), []);
  const lockedSport = useMemo(
    () => resolveForcedSport(sports, forcedSport),
    [forcedSport, sports],
  );
  const activeSport = lockedSport || sportFilter;

  useEffect(() => {
    if (!lockedSport) return;
    setSportFilter(lockedSport);
  }, [lockedSport]);

  const filtered = useMemo(() => {
    return filterEvents(events, { sportFilter: activeSport, query });
  }, [activeSport, events, query]);

  const grouped = useMemo(() => groupEventsBySport(filtered), [filtered]);

  return (
    <section className="discover-page">
      <div className="discover-head">
        <h1>{title}</h1>
        <p className="lede">{subtitle}</p>
      </div>

      <label className="search-wrap" htmlFor="discover-search">
        <span>Recherche</span>
        <input
          id="discover-search"
          type="search"
          placeholder="Rechercher equipes, ligues, ou lieux"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      {!lockedSport ? (
        <SportFilters sports={sports} activeSport={sportFilter} onChange={setSportFilter} />
      ) : null}

      <p className="results-count">{filtered.length} evenements affiches</p>

      {filtered.length === 0 ? (
        <div className="simple-page">
          <p>Aucun evenement ne correspond a ta recherche.</p>
        </div>
      ) : activeSport === "Tous" ? (
        <div className="group-stack">
          {grouped.map(([sport, items]) => (
            <section key={sport} className="group-block">
              <div className="group-title">
                <h2>{sport}</h2>
                <span>{items.length} evenements</span>
              </div>
              <div className="event-grid">
                {items.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isInWatchlist={watchlistIds.includes(event.id)}
                    onToggleWatchlist={onToggleWatchlist}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="event-grid">
          {filtered.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isInWatchlist={watchlistIds.includes(event.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DiscoverPage;
