import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ScoreBadge from "../components/ScoreBadge";
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
      <div className="discover-head">
        <h1>Leagues</h1>
        <p className="lede">Migration React de la page leagues.</p>
      </div>

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
          <article key={league.id} className="entity-card">
            <h3>
              <Link to={`/league/${league.id}`}>{league.title}</Link>
            </h3>
            <p className="event-meta">{league.sport}</p>
            <p className="event-meta">{league.count} events</p>
            <p className="event-meta">
              <span className="score-inline">
                <span className="score-inline-label">Moyenne</span>
                <ScoreBadge variant="community-chip" value={league.averageScore} scale="percent" />
              </span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LeaguesPage;
