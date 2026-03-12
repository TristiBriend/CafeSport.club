import { useMemo, useState } from "react";
import UserCard from "../components/UserCard";
import UnifiedSearchBar from "../components/UnifiedSearchBar";
import { getUsers } from "../services/catalogService";

function UsersPage() {
  const [query, setQuery] = useState("");
  const users = useMemo(() => getUsers({ query }), [query]);

  return (
    <section>
      <UnifiedSearchBar
        id="user-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        scope="user"
      />

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
