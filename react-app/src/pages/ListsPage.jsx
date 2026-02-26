import { useMemo, useState } from "react";
import RankingCard from "../components/RankingCard";
import {
  getCuratedLists,
  getListSports,
} from "../services/catalogService";

function ListsPage() {
  const [sportFilter, setSportFilter] = useState("Tous");
  const [query, setQuery] = useState("");

  const sports = useMemo(() => getListSports(), []);
  const lists = useMemo(
    () => getCuratedLists({ sportFilter, query }),
    [query, sportFilter],
  );

  return (
    <section>
      <label className="search-wrap" htmlFor="list-search">
        <span>Recherche</span>
        <input
          id="list-search"
          type="search"
          placeholder="Titre, sport..."
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

      <p className="results-count">{lists.length} lists</p>

      <div className="list-grid">
        {lists.map((list) => (
          <RankingCard key={list.id} list={list} />
        ))}
      </div>
    </section>
  );
}

export default ListsPage;
