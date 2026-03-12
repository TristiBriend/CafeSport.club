import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import CommentComposerModePill from "./CommentComposerModePill";
import CommentMentionTextarea from "./CommentMentionTextarea";
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
  resolveComposerModeForTarget,
  toggleCommentLike,
  toggleReplyLike,
  updateComment,
  updateCommentReply,
} from "../services/commentsService";
import { filterCommentMentionsForText } from "../services/commentMentionsService";
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
  const resolvedComposer = resolveComposerModeForTarget(targetType, targetId, { allowReview });
  const [composerRating, setComposerRating] = useState(80);
  const [composerText, setComposerText] = useState("");
  const [composerMentions, setComposerMentions] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const { revisionByDomain } = useSocialSync();
  const followsRevision = Number(revisionByDomain?.follows || 0);

  const resolvedFollowType = String(followTargetType || targetType || "").trim();

  useEffect(() => {
    if (!targetType || !targetId) return;
    setComments(getCommentsForTarget(targetType, targetId));
    setActiveMode(COMMENT_MODE.ALL);
    setComposerText("");
    setComposerMentions([]);
    setComposerRating(80);
    if (showFollow && resolvedFollowType) {
      setIsFollowed(isTargetFollowed(resolvedFollowType, targetId));
      setFollowers(getTargetFollowerCount(resolvedFollowType, targetId, followBaseCount));
    }
  }, [followBaseCount, followsRevision, resolvedFollowType, showFollow, targetId, targetType]);

  const visibleComments = useMemo(
    () => filterCommentsByMode(comments, activeMode),
  [activeMode, comments],
  );

  function refreshComments() {
    setComments(getCommentsForTarget(targetType, targetId));
  }

  function handleCreateComment(event) {
    event.preventDefault();
    const created = createTargetComment(targetType, targetId, {
      mode: resolvedComposer.commentMode,
      note: composerText,
      rating: resolvedComposer.showRating ? composerRating : undefined,
      mentions: filterCommentMentionsForText(composerText, composerMentions),
    });
    if (!created) return;
    setComposerText("");
    setComposerMentions([]);
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

  function handleReplyToComment(comment, note, mentions = []) {
    const created = createCommentReply(comment?.id, {
      note,
      mentions,
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
        </div>
        {resolvedComposer.timingHint ? (
          <p className="event-meta">{resolvedComposer.timingHint}</p>
        ) : null}

        <div className="comment-filter-row" role="tablist" aria-label="Filtrer les commentaires">
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.ALL ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.ALL)}
            type="button"
          >
            Tous
          </button>
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.COMMENT ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.COMMENT)}
            type="button"
          >
            Teasers
          </button>
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.LIVE ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.LIVE)}
            type="button"
          >
            Live
          </button>
          <button
            className={`filter-btn ${activeMode === COMMENT_MODE.REVIEW ? "is-active" : ""}`}
            onClick={() => setActiveMode(COMMENT_MODE.REVIEW)}
            type="button"
          >
            Critiques
          </button>
        </div>

        <form className="comment-composer" onSubmit={handleCreateComment}>
          {resolvedComposer.displayMode !== "comment" || resolvedComposer.showRating ? (
            <div className="comment-composer-top">
              <CommentComposerModePill mode={resolvedComposer.displayMode} />

              {resolvedComposer.showRating ? (
                <ScoreSliderField
                  id={`comment-rating-${targetType}-${targetId}`}
                  label="Note (0-100)"
                  value={composerRating}
                  onChange={handleChangeComposerRating}
                />
              ) : null}
            </div>
          ) : null}

          <CommentMentionTextarea
            id={`comment-text-${targetType}-${targetId}`}
            label="Ton message"
            rows={3}
            maxLength={600}
            placeholder={composerPlaceholder}
            value={composerText}
            mentions={composerMentions}
            onChange={setComposerText}
            onMentionsChange={setComposerMentions}
            fieldClassName="search-wrap"
          />

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
                forceReplyThreadOpen={Boolean(comment?.viewContext?.forceReplyThreadOpen)}
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
