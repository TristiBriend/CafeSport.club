import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../services/catalogService";

function UsersPage() {
  const [query, setQuery] = useState("");
  const users = useMemo(() => getUsers({ query }), [query]);

  return (
    <section>
      <div className="discover-head">
        <h1>Users</h1>
        <p className="lede">Migration React de la page profils.</p>
      </div>

      <label className="search-wrap" htmlFor="user-search">
        <span>Recherche</span>
        <input
          id="user-search"
          type="search"
          placeholder="Nom, handle, ville..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <p className="results-count">{users.length} users</p>

      <div className="entity-grid">
        {users.map((user) => (
          <article key={user.id} className="entity-card">
            <h3>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            </h3>
            <p className="event-meta">{user.handle}</p>
            <p className="event-meta">{user.location}</p>
            <p className="event-meta">{Number(user.followers || 0).toLocaleString("fr-FR")} followers</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UsersPage;
