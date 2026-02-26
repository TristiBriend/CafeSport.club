import { useMemo, useState } from "react";
import UserCard from "../components/UserCard";
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
          <UserCard key={user.id} user={user} size="small" showTags={false} />
        ))}
      </div>
    </section>
  );
}

export default UsersPage;
