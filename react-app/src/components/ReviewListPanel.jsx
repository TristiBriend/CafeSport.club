import CommentCard from "./CommentCard";
import { COMMENT_MODE } from "../services/commentsService";

function toTimestamp(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function ReviewListPanel({
  title = "Notes & critiques",
  comments = [],
  emptyMessage = "Aucune critique pour le moment.",
  maxItems = 20,
  headerActions = null,
  onToggleLike,
  onCreateReply,
  onToggleReplyLike,
  onDeleteComment,
  onDeleteReply,
  onUpdateComment,
  onUpdateReply,
}) {
  const visibleComments = (Array.isArray(comments) ? comments : [])
    .filter((comment) => comment?.commentType === COMMENT_MODE.REVIEW)
    .sort((left, right) => toTimestamp(right?.createdAt) - toTimestamp(left?.createdAt))
    .slice(0, Math.max(1, Number(maxItems) || 20));

  return (
    <section className="related-section profile-reviews-panel">
      <div className="group-title">
        <h2>{title}</h2>
        <div className="group-title-meta">
          {headerActions}
        </div>
      </div>

      {visibleComments.length ? (
        <div className="review-list">
          {visibleComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onToggleLike={onToggleLike}
              onCreateReply={onCreateReply}
              onToggleReplyLike={onToggleReplyLike}
              onDeleteComment={onDeleteComment}
              onDeleteReply={onDeleteReply}
              onUpdateComment={onUpdateComment}
              onUpdateReply={onUpdateReply}
            />
          ))}
        </div>
      ) : (
        <article className="entity-card">
          <p className="event-meta">{emptyMessage}</p>
        </article>
      )}
    </section>
  );
}

export default ReviewListPanel;
