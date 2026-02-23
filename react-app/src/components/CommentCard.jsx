import { useState } from "react";
import {
  COMMENT_MODE,
  getCommentDateLabel,
  getCommentModeLabel,
} from "../services/commentsService";
import ScoreBadge from "./ScoreBadge";

function CommentCard({
  comment,
  onToggleLike,
  onCreateReply,
  onToggleReplyLike,
  onUpdateComment,
  onDeleteComment,
  onUpdateReply,
  onDeleteReply,
}) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [editCommentText, setEditCommentText] = useState(comment.note);
  const [editCommentRating, setEditCommentRating] = useState(Number(comment.rating || 0));
  const [editingReplyId, setEditingReplyId] = useState("");
  const [editReplyText, setEditReplyText] = useState("");

  const isOwnComment = comment.userId === "usr-manual" || comment.author === "Vous";
  const isReview = comment.commentType === COMMENT_MODE.REVIEW;

  function handleSubmitReply(event) {
    event.preventDefault();
    if (typeof onCreateReply !== "function") return;
    const created = onCreateReply(comment, replyText);
    if (!created) return;
    setReplyText("");
    setIsReplyOpen(false);
  }

  function handleSaveComment(event) {
    event.preventDefault();
    if (!isOwnComment || typeof onUpdateComment !== "function") return;
    const updated = onUpdateComment(comment, {
      note: editCommentText,
      rating: editCommentRating,
    });
    if (!updated) return;
    setIsEditingComment(false);
  }

  function handleDeleteComment() {
    if (!isOwnComment || typeof onDeleteComment !== "function") return;
    onDeleteComment(comment);
  }

  function handleStartEditReply(reply) {
    setEditingReplyId(reply.id);
    setEditReplyText(reply.note);
  }

  function handleSaveReply(event, reply) {
    event.preventDefault();
    if (typeof onUpdateReply !== "function") return;
    const updated = onUpdateReply(comment, reply, editReplyText);
    if (!updated) return;
    setEditingReplyId("");
    setEditReplyText("");
  }

  return (
    <article className="comment-card">
      <header className="comment-head">
        <div className="headercommentaire compact">
          <div className="headercommentaire-main">
            {isReview ? (
              <ScoreBadge
                value={comment.rating}
                scale="percent"
                variant="user-chip"
              />
            ) : null}
            <div>
              <strong>{comment.author}</strong>
              <p className="comment-meta">
                {getCommentModeLabel(comment)} - {getCommentDateLabel(comment)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {isEditingComment ? (
        <form className="reply-composer" onSubmit={handleSaveComment}>
          <label className="search-wrap" htmlFor={`edit-comment-${comment.id}`}>
            <span>Modifier ton message</span>
            <textarea
              id={`edit-comment-${comment.id}`}
              rows="3"
              maxLength={600}
              value={editCommentText}
              onChange={(event) => setEditCommentText(event.target.value)}
            />
          </label>
          {isReview ? (
            <label className="select-wrap" htmlFor={`edit-rating-${comment.id}`}>
              <span>Note (0-100)</span>
              <input
                id={`edit-rating-${comment.id}`}
                className="rating-input"
                type="number"
                min="0"
                max="100"
                step="1"
                value={editCommentRating}
                onChange={(event) => setEditCommentRating(Number(event.target.value))}
              />
            </label>
          ) : null}
          <div className="comment-actions">
            <button className="btn btn-primary" type="submit">
              Enregistrer
            </button>
            <button
              className="comment-like-btn"
              onClick={() => setIsEditingComment(false)}
              type="button"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <p className="comment-note">{comment.note}</p>
      )}

      <div className="comment-actions">
        <button
          className={`comment-like-btn ${comment.isLiked ? "is-active" : ""}`}
          onClick={() => onToggleLike(comment)}
          type="button"
        >
          {comment.isLiked ? "Unlike" : "Like"} ({comment.totalLikes || 0})
        </button>
        <button
          className="comment-like-btn"
          onClick={() => setIsReplyOpen((prev) => !prev)}
          type="button"
        >
          {isReplyOpen ? "Annuler" : "Repondre"}
        </button>
        {isOwnComment ? (
          <button
            className="comment-like-btn"
            onClick={() => setIsEditingComment((prev) => !prev)}
            type="button"
          >
            {isEditingComment ? "Fermer edit" : "Editer"}
          </button>
        ) : null}
        {isOwnComment ? (
          <button
            className="comment-like-btn comment-like-danger"
            onClick={handleDeleteComment}
            type="button"
          >
            Supprimer
          </button>
        ) : null}
      </div>

      {isReplyOpen ? (
        <form className="reply-composer" onSubmit={handleSubmitReply}>
          <label className="search-wrap" htmlFor={`reply-${comment.id}`}>
            <span>Ta reponse</span>
            <textarea
              id={`reply-${comment.id}`}
              rows="2"
              maxLength={400}
              placeholder="Ecrire une reponse..."
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Publier la reponse
          </button>
        </form>
      ) : null}

      {Array.isArray(comment.replies) && comment.replies.length ? (
        <div className="reply-list">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="reply-item">
              <p className="reply-author">{reply.author}</p>
              {editingReplyId === reply.id ? (
                <form className="reply-composer" onSubmit={(event) => handleSaveReply(event, reply)}>
                  <label className="search-wrap" htmlFor={`edit-reply-${reply.id}`}>
                    <span>Modifier ta reponse</span>
                    <textarea
                      id={`edit-reply-${reply.id}`}
                      rows="2"
                      maxLength={400}
                      value={editReplyText}
                      onChange={(event) => setEditReplyText(event.target.value)}
                    />
                  </label>
                  <div className="comment-actions">
                    <button className="btn btn-primary" type="submit">
                      Enregistrer
                    </button>
                    <button
                      className="comment-like-btn"
                      onClick={() => setEditingReplyId("")}
                      type="button"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <p className="reply-note">{reply.note}</p>
              )}
              <p className="reply-date">{getCommentDateLabel(reply)}</p>
              <div className="comment-actions">
                <button
                  className={`comment-like-btn ${reply.isLiked ? "is-active" : ""}`}
                  onClick={() => {
                    if (typeof onToggleReplyLike === "function") {
                      onToggleReplyLike(comment, reply);
                    }
                  }}
                  type="button"
                >
                  {reply.isLiked ? "Unlike" : "Like"} ({reply.totalLikes || 0})
                </button>
                {reply.userId === "usr-manual" || reply.author === "Vous" ? (
                  <button
                    className="comment-like-btn"
                    onClick={() => handleStartEditReply(reply)}
                    type="button"
                  >
                    Editer
                  </button>
                ) : null}
                {reply.userId === "usr-manual" || reply.author === "Vous" ? (
                  <button
                    className="comment-like-btn comment-like-danger"
                    onClick={() => {
                      if (typeof onDeleteReply === "function") {
                        onDeleteReply(comment, reply);
                      }
                    }}
                    type="button"
                  >
                    Supprimer
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default CommentCard;
