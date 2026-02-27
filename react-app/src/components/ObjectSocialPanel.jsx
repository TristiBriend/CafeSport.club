import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import ObjectTagsWidget from "./ObjectTagsWidget";
import ScoreSliderField from "./ScoreSliderField";
import {
  COMMENT_MODE,
  createCommentReply,
  createTargetComment,
  deleteComment,
  deleteCommentReply,
  filterCommentsByMode,
  getCommentsForTarget,
  isReviewAllowedTarget,
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
import { useSocialSync } from "../contexts/SocialSyncContext";

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
  const canReviewTarget = allowReview && isReviewAllowedTarget(targetType);
  const [composerMode, setComposerMode] = useState(canReviewTarget ? COMMENT_MODE.REVIEW : COMMENT_MODE.COMMENT);
  const [composerRating, setComposerRating] = useState(80);
  const [composerText, setComposerText] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const { revisionByDomain } = useSocialSync();
  const followsRevision = Number(revisionByDomain?.follows || 0);

  const resolvedFollowType = String(followTargetType || targetType || "").trim();

  useEffect(() => {
    if (!targetType || !targetId) return;
    setComments(getCommentsForTarget(targetType, targetId));
    setActiveMode(COMMENT_MODE.ALL);
    setComposerMode(canReviewTarget ? COMMENT_MODE.REVIEW : COMMENT_MODE.COMMENT);
    setComposerText("");
    setComposerRating(80);
    if (showFollow && resolvedFollowType) {
      setIsFollowed(isTargetFollowed(resolvedFollowType, targetId));
      setFollowers(getTargetFollowerCount(resolvedFollowType, targetId, followBaseCount));
    }
  }, [canReviewTarget, followBaseCount, followsRevision, resolvedFollowType, showFollow, targetId, targetType]);

  useEffect(() => {
    if (canReviewTarget) return;
    if (activeMode === COMMENT_MODE.REVIEW) {
      setActiveMode(COMMENT_MODE.ALL);
    }
  }, [activeMode, canReviewTarget]);

  const visibleComments = useMemo(
    () => filterCommentsByMode(comments, activeMode),
  [activeMode, comments],
  );

  function refreshComments() {
    setComments(getCommentsForTarget(targetType, targetId));
  }

  function handleCreateComment(event) {
    event.preventDefault();
    const mode = canReviewTarget ? composerMode : COMMENT_MODE.COMMENT;
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

  function handleChangeComposerRating(nextValue) {
    const value = Number(nextValue);
    const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 0;
    setComposerRating(safeValue);
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
          {canReviewTarget ? (
            <button
              className={`filter-btn ${activeMode === COMMENT_MODE.REVIEW ? "is-active" : ""}`}
              onClick={() => setActiveMode(COMMENT_MODE.REVIEW)}
              type="button"
            >
              Critiques
            </button>
          ) : null}
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
                disabled={!canReviewTarget}
              >
                <option value={COMMENT_MODE.COMMENT}>Commentaire</option>
                {canReviewTarget ? <option value={COMMENT_MODE.REVIEW}>Critique</option> : null}
              </select>
            </label>

            {canReviewTarget && composerMode === COMMENT_MODE.REVIEW ? (
              <ScoreSliderField
                id={`comment-rating-${targetType}-${targetId}`}
                label="Note (0-100)"
                value={composerRating}
                onChange={handleChangeComposerRating}
              />
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
