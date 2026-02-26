import { useMemo, useState } from "react";
import LeagueCard from "../components/LeagueCard";
import { getLeagueSports, getLeagues } from "../services/leaguesService";

function LeaguesPage() {
  const [sportFilter, setSportFilter] = useState("Tous");
  const [query, setQuery] = useState("");

  const sports = useMemo(() => getLeagueSports(), []);
  const leagues = useMemo(
    () => getLeagues({ sportFilter, query }),
    [query, sportFilter],
  );

  return (
    <section>
      <label className="search-wrap" htmlFor="league-search">
        <span>Recherche</span>
        <input
          id="league-search"
          type="search"
          placeholder="Nom de ligue..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="filter-row">
        {["Tous", ...sports].map((sport) => (
          <button
            key={sport}
            className={`filter-btn ${sportFilter === sport ? "is-active" : ""}`}
            onClick={() => setSportFilter(sport)}
            type="button"
          >
            {sport}
          </button>
        ))}
      </div>

      <p className="results-count">{leagues.length} leagues</p>

      <div className="entity-grid">
        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} size="small" showTags={false} />
        ))}
      </div>
    </section>
  );
}

export default LeaguesPage;
