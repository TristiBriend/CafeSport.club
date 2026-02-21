import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAthletesForTeam,
  getEventsForTeam,
  getTeamSports,
  getTeams,
} from "../services/catalogService";

function TeamsPage() {
  const [sportFilter, setSportFilter] = useState("Tous");
  const [query, setQuery] = useState("");

  const sports = useMemo(() => getTeamSports(), []);
  const teams = useMemo(
    () => getTeams({ sportFilter, query }),
    [query, sportFilter],
  );

  return (
    <section>
      <div className="discover-head">
        <h1>Teams</h1>
        <p className="lede">Migration React de la page teams.</p>
      </div>

      <label className="search-wrap" htmlFor="team-search">
        <span>Recherche</span>
        <input
          id="team-search"
          type="search"
          placeholder="Nom, ville, sport..."
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

      <p className="results-count">{teams.length} teams</p>

      <div className="entity-grid">
        {teams.map((team) => (
          <article key={team.id} className="entity-card">
            <h3>
              <Link to={`/team/${team.id}`}>{team.name}</Link>
            </h3>
            <p className="event-meta">{team.sport}</p>
            <p className="event-meta">{team.city || "N/A"}</p>
            <p className="event-meta">
              {getAthletesForTeam(team.id).length} athletes · {getEventsForTeam(team.id).length} events
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TeamsPage;
