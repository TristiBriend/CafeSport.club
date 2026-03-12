import { useMemo, useState } from "react";
import PlayerCard from "../components/PlayerCard";
import UnifiedSearchBar from "../components/UnifiedSearchBar";
import { getAthleteSports, getAthletes } from "../services/catalogService";

function AthletesPage() {
  const [sportFilter, setSportFilter] = useState("Tous");
  const [query, setQuery] = useState("");

  const sports = useMemo(() => getAthleteSports(), []);
  const athletes = useMemo(
    () => getAthletes({ sportFilter, query }),
    [query, sportFilter],
  );

  return (
    <section>
      <UnifiedSearchBar
        id="athlete-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        scope="athlete"
      />

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

      <p className="results-count">{athletes.length} athletes</p>

      <div className="entity-grid">
        {athletes.map((athlete) => (
          <PlayerCard key={athlete.id} athlete={athlete} size="small" showTags={false} />
        ))}
      </div>
    </section>
  );
}

export default AthletesPage;
