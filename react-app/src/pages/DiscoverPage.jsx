import { useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import SportFilters from "../components/SportFilters";
import {
  filterEvents,
  getAllEvents,
  getSports,
  groupEventsBySport,
} from "../services/eventsService";

function DiscoverPage({ watchlistIds = [], onToggleWatchlist }) {
  const [sportFilter, setSportFilter] = useState("Tous");
  const [query, setQuery] = useState("");
  const events = getAllEvents();
  const sports = useMemo(() => getSports(), []);

  const filtered = useMemo(() => {
    return filterEvents(events, { sportFilter, query });
  }, [events, query, sportFilter]);

  const grouped = useMemo(() => groupEventsBySport(filtered), [filtered]);

  return (
    <section className="discover-page">
      <div className="discover-head">
        <h1>Parcourir les evenements</h1>
        <p className="lede">Migration React de la section events avec filtres et recherche.</p>
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

      <SportFilters sports={sports} activeSport={sportFilter} onChange={setSportFilter} />

      <p className="results-count">{filtered.length} evenements affiches</p>

      {filtered.length === 0 ? (
        <div className="simple-page">
          <p>Aucun evenement ne correspond a ta recherche.</p>
        </div>
      ) : sportFilter === "Tous" ? (
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
