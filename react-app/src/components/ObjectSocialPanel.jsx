import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import ObjectTagsWidget from "./ObjectTagsWidget";
import {
  COMMENT_MODE,
  createCommentReply,
  createTargetComment,
  deleteComment,
  deleteCommentReply,
  filterCommentsByMode,
  getCommentsForTarget,
  toggleCommentLike,
  toggleReplyLike,
  updateComment,
  updateCommentReply,
} from "../services/commentsService";
import {
  getTargetFollowerCount,
  isTargetFollowed,
  toggleTargetFollow,
} from "../services/userFollowService";

function ObjectSocialPanel({
  targetType,
  targetId,
  title = "Discussions",
  subtitle = "Commentaires lies a cet objet",
  showFollow = true,
  followTargetType = "",
  followBaseCount = 0,
  followLabel = "followers",
  allowReview = true,
  composerPlaceholder = "Ajouter un commentaire...",
  showFeedLink = true,
}) {
  const [comments, setComments] = useState([]);
  const [activeMode, setActiveMode] = useState(COMMENT_MODE.ALL);
  const [composerMode, setComposerMode] = useState(allowReview ? COMMENT_MODE.REVIEW : COMMENT_MODE.COMMENT);
  const [composerRating, setComposerRating] = useState(80);
  const [composerText, setComposerText] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);

  const resolvedFollowType = String(followTargetType || targetType || "").trim();

  useEffect(() => {
    if (!targetType || !targetId) return;
    setComments(getCommentsForTarget(targetType, targetId));
    setActiveMode(COMMENT_MODE.ALL);
    setComposerMode(allowReview ? COMMENT_MODE.REVIEW : COMMENT_MODE.COMMENT);
    setComposerText("");
    setComposerRating(80);
    if (showFollow && resolvedFollowType) {
      setIsFollowed(isTargetFollowed(resolvedFollowType, targetId));
      setFollowers(getTargetFollowerCount(resolvedFollowType, targetId, followBaseCount));
    }
  }, [allowReview, followBaseCount, resolvedFollowType, showFollow, targetId, targetType]);

  const visibleComments = useMemo(
    () => filterCommentsByMode(comments, activeMode),
    [activeMode, comments],
  );

  function refreshComments() {
    setComments(getCommentsForTarget(targetType, targetId));
  }

  function handleCreateComment(event) {
    event.preventDefault();
    const mode = allowReview ? composerMode : COMMENT_MODE.COMMENT;
    const created = createTargetComment(targetType, targetId, {
      mode,
      note: composerText,
      rating: composerRating,
      author: "Vous",
    });
    if (!created) return;
    setComposerText("");
    refreshComments();
  }

  function handleLikeComment(comment) {
    toggleCommentLike(comment);
    refreshComments();
  }

  function handleLikeReply(_comment, reply) {
    toggleReplyLike(reply);
    refreshComments();
  }

  function handleReplyToComment(comment, note) {
    const created = createCommentReply(comment?.id, {
      note,
      author: "Vous",
    });
    if (!created) return null;
    refreshComments();
    return created;
  }

  function handleUpdateComment(comment, payload) {
    const updated = updateComment(comment?.id, payload);
    if (!updated) return false;
    refreshComments();
    return true;
  }

  function handleDeleteComment(comment) {
    const deleted = deleteComment(comment?.id);
    if (!deleted) return false;
    refreshComments();
    return true;
  }

  function handleUpdateReply(comment, reply, note) {
    const updated = updateCommentReply(comment?.id, reply?.id, { note });
    if (!updated) return false;
    refreshComments();
    return true;
  }

  function handleDeleteReply(comment, reply) {
    const deleted = deleteCommentReply(comment?.id, reply?.id);
    if (!deleted) return false;
    refreshComments();
    return true;
  }

  function handleToggleFollow() {
    if (!showFollow || !resolvedFollowType) return;
    const next = toggleTargetFollow(resolvedFollowType, targetId);
    setIsFollowed(next);
    setFollowers(getTargetFollowerCount(resolvedFollowType, targetId, followBaseCount));
  }

  if (!targetType || !targetId) return null;

  return (
    <section className="related-section">
      <article className="entity-card object-social-actions">
        <div>
          <h3>{title}</h3>
          <p className="event-meta">{subtitle}</p>
          {showFollow ? (
            <p className="event-meta">{followers.toLocaleString("fr-FR")} {followLabel}</p>
          ) : null}
        </div>
        <div className="object-social-buttons">
          {showFollow ? (
            <button
              className={`watch-btn object-follow-btn ${isFollowed ? "is-active" : ""}`}
              onClick={handleToggleFollow}
              type="button"
            >
              {isFollowed ? "Ne plus suivre" : "Suivre"}
            </button>
          ) : null}
          {showFeedLink ? (
            <Link
              className="btn btn-ghost"
              to={`/feed?scope=object&targetType=${encodeURIComponent(targetType)}&targetId=${encodeURIComponent(targetId)}&mode=recent`}
            >
              Ouvrir le feed objet
            </Link>
          ) : null}
        </div>
      </article>

      <article className="entity-card">
        <ObjectTagsWidget
          objectType={targetType}
          objectId={targetId}
          title="Tags de la communaute"
          compact
        />
      </article>

      <section className="comments-section">
        <div className="group-title">
          <h2>{title}</h2>
          <span>{visibleComments.length} elements</span>
        </div>

        <div className="comment-filter-row" role="tablist" aria-label="Filtrer les commentaires">
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.ALL ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.ALL)}
            type="button"
          >
            Tous
          </button>
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.REVIEW ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.REVIEW)}
            type="button"
          >
            Critiques
          </button>
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.COMMENT ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.COMMENT)}
            type="button"
          >
            Commentaires
          </button>
        </div>

        <form className="comment-composer" onSubmit={handleCreateComment}>
          <div className="comment-composer-top">
            <label className="select-wrap" htmlFor={`comment-mode-${targetType}-${targetId}`}>
              <span>Type</span>
              <select
                id={`comment-mode-${targetType}-${targetId}`}
                value={composerMode}
                onChange={(changeEvent) => setComposerMode(changeEvent.target.value)}
                disabled={!allowReview}
              >
                <option value={COMMENT_MODE.COMMENT}>Commentaire</option>
                <option value={COMMENT_MODE.REVIEW}>Critique</option>
              </select>
            </label>

            {allowReview && composerMode === COMMENT_MODE.REVIEW ? (
              <label className="select-wrap" htmlFor={`comment-rating-${targetType}-${targetId}`}>
                <span>Note (0-100)</span>
                <input
                  id={`comment-rating-${targetType}-${targetId}`}
                  className="rating-input"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={composerRating}
                  onChange={(changeEvent) => setComposerRating(Number(changeEvent.target.value))}
                />
              </label>
            ) : null}
          </div>

          <label className="search-wrap" htmlFor={`comment-text-${targetType}-${targetId}`}>
            <span>Ton message</span>
            <textarea
              id={`comment-text-${targetType}-${targetId}`}
              rows="3"
              maxLength={600}
              placeholder={composerPlaceholder}
              value={composerText}
              onChange={(changeEvent) => setComposerText(changeEvent.target.value)}
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Publier
          </button>
        </form>

        {visibleComments.length ? (
          <div className="comment-list">
            {visibleComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onToggleLike={handleLikeComment}
                onCreateReply={handleReplyToComment}
                onToggleReplyLike={handleLikeReply}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                onUpdateReply={handleUpdateReply}
                onDeleteReply={handleDeleteReply}
              />
            ))}
          </div>
        ) : (
          <div className="simple-page">
            <p>Aucun commentaire pour le moment.</p>
          </div>
        )}
      </section>
    </section>
  );
}

export default ObjectSocialPanel;
