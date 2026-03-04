import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard";
import EventCard from "../components/EventCard";
import HorizontalCardRail from "../components/HorizontalCardRail";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import PlayerCard from "../components/PlayerCard";
import RankingCard from "../components/RankingCard";
import RankingEditorDialog from "../components/RankingEditorDialog";
import { getListById, resolveListEntries } from "../services/catalogService";
import { getCommentsForTarget } from "../services/commentsService";
import { useAuth } from "../contexts/AuthContext";
import {
  canEditRankingList,
  getSiblingRankingLists,
} from "../services/rankingListsService";

function ListDetailPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const { listId } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const list = getListById(listId);
  const [editorState, setEditorState] = useState({
    open: false,
    mode: "create",
  });

  if (!list) {
    return (
      <section className="simple-page">
        <h1>List introuvable</h1>
        <Link className="btn btn-ghost" to="/lists">
          Retour lists
        </Link>
      </section>
    );
  }

  const canEditList = canEditRankingList(list, currentUser, currentUser);
  const listEntries = resolveListEntries(list);
  const siblingLists = getSiblingRankingLists(list, {
    excludeCurrent: true,
    excludeSameOwner: true,
  });

  function handleOpenEditor(mode) {
    if (!isAuthenticated || !currentUser?.firebaseUid || currentUser?.isAnonymous) {
      navigate("/login");
      return;
    }
    setEditorState({
      open: true,
      mode,
    });
  }

  function handleCloseEditor() {
    setEditorState((current) => ({
      ...current,
      open: false,
    }));
  }

  function handleEditorSaved(savedList) {
    const safeListId = String(savedList?.id || "").trim();
    if (!safeListId) return;
    if (editorState.mode === "create" || editorState.mode === "fork") {
      navigate(`/list/${safeListId}`);
    }
  }

  return (
    <section className="object-detail-page">
      <div className="list-detail-hero">
        <div className="object-detail-top-left">
          <RankingCard list={list} />
        </div>
        <div className="list-detail-hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleOpenEditor(canEditList ? "edit" : "fork")}
          >
            {canEditList ? "Modifier le classement" : "Creer ma version de ce classement"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => handleOpenEditor("create")}
          >
            Creer un nouveau classement
          </button>
        </div>
      </div>

      <section className="list-ranking-table-section">
        <div className="group-title">
          <h2>Classement</h2>
        </div>

        {listEntries.length ? (
          <div className="list-ranking-feed-wrap">
            <div className="list-ranking-feed">
              {listEntries.map((entry, index) => {
                const targetType = entry.type === "event" || entry.type === "athlete" ? entry.type : "";
                const targetId = entry.type === "event"
                  ? entry.event?.id
                  : entry.type === "athlete"
                    ? entry.athlete?.id
                    : "";
                const bestComment = targetType && targetId
                  ? getCommentsForTarget(targetType, targetId)[0] || null
                  : null;
                return (
                  <article key={entry.id} className="list-ranking-entry-row">
                    <div className="list-ranking-entry-rank">#{index + 1}</div>
                    <div className="list-ranking-entry-card">
                      {entry.type === "event" && entry.event ? (
                        <EventCard
                          event={entry.event}
                          size="miniature"
                          showComment={false}
                          showTags={false}
                        />
                      ) : null}
                      {entry.type === "athlete" && entry.athlete ? (
                        <PlayerCard
                          athlete={entry.athlete}
                          size="miniature"
                          showTags={false}
                          showMenu={false}
                        />
                      ) : null}
                      {entry.type === "unknown" || ((entry.type === "event" && !entry.event) || (entry.type === "athlete" && !entry.athlete)) ? (
                        <div className="list-ranking-unknown-card">
                          <p className="typo-label">Element indisponible</p>
                          <p className="typo-meta">La reference source n est plus resolue.</p>
                        </div>
                      ) : null}
                    </div>
                    <div className="list-ranking-entry-comment">
                      {bestComment ? (
                        <CommentCard
                          comment={bestComment}
                          showEventLink={false}
                        />
                      ) : (
                        <div className="list-ranking-entry-empty-comment">
                          <p className="typo-comment-text">
                            {String(entry.note || "").trim() || "Aucun commentaire"}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <article className="entity-card">
            <p className="typo-body">Aucun element dans ce classement.</p>
          </article>
        )}
      </section>

      <ObjectFeedScopePanel
        targetType="list"
        targetId={list.id}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
        title="Commentaires du classement"
        subtitle="Flux commentaires uniquement · tri Chrono ou Populaires."
        contentProfile="comments-only"
        showComposer
        emptyStateText="Aucun commentaire pour ce classement."
      />

      {siblingLists.length ? (
        <section className="related-section">
          <div className="group-title">
            <h2>Autres versions de ce classement</h2>
          </div>
          <HorizontalCardRail
            label="Autres versions du classement"
            itemType="ranking"
            mode="carousel"
            visibleDesktop={3.6}
            visibleTablet={2.3}
            visibleMobile={1.15}
            scrollStepItems={1}
            showArrows
          >
            {siblingLists.map((item) => (
              <RankingCard key={item.id} list={item} />
            ))}
          </HorizontalCardRail>
        </section>
      ) : null}

      <RankingEditorDialog
        open={editorState.open}
        mode={editorState.mode}
        sourceList={editorState.mode === "fork" ? list : null}
        initialList={editorState.mode === "edit" ? list : null}
        onClose={handleCloseEditor}
        onSaved={handleEditorSaved}
      />
    </section>
  );
}

export default ListDetailPage;
