import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import RankingEditorDialog from "../components/RankingEditorDialog";
import RankingCard from "../components/RankingCard";
import UnifiedSearchBar from "../components/UnifiedSearchBar";
import { useAuth } from "../contexts/AuthContext";
import {
  getCuratedLists,
  getListSports,
} from "../services/catalogService";

function ListsPage() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [sportFilter, setSportFilter] = useState("Tous");
  const [query, setQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const sports = useMemo(() => getListSports(), []);
  const lists = useMemo(
    () => getCuratedLists({ sportFilter, query }),
    [query, sportFilter],
  );

  function handleOpenCreate() {
    if (!isAuthenticated || !currentUser?.firebaseUid || currentUser?.isAnonymous) {
      navigate("/login");
      return;
    }
    setIsCreateOpen(true);
  }

  function handleSavedList(savedList) {
    const safeListId = String(savedList?.id || "").trim();
    if (!safeListId) return;
    navigate(`/list/${safeListId}`);
  }

  return (
    <section>
      <div className="list-page-actions">
        <button className="btn btn-primary" type="button" onClick={handleOpenCreate}>
          Creer un nouveau classement
        </button>
      </div>

      <UnifiedSearchBar
        id="list-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        scope="list"
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

      <p className="results-count">{lists.length} lists</p>

      <div className="list-grid">
        {lists.map((list) => (
          <RankingCard key={list.id} list={list} />
        ))}
      </div>

      <RankingEditorDialog
        open={isCreateOpen}
        mode="create"
        sourceList={null}
        initialList={null}
        onClose={() => setIsCreateOpen(false)}
        onSaved={handleSavedList}
      />
    </section>
  );
}

export default ListsPage;
