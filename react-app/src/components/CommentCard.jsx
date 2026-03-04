import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CommentMentionTextarea from "./CommentMentionTextarea";
import {
  COMMENT_MODE,
  COMMENT_TARGET,
  deleteComment,
  deleteCommentReply,
  resolveTargetCommentContext,
  registerCommentImpression,
} from "../services/commentsService";
import { getUserById, getUsers } from "../services/catalogService";
import { getEventById } from "../services/eventsService";
import {
  isUserFollowed,
  toggleUserFollow,
} from "../services/userFollowService";
import { getSocialSyncCloudIdentity } from "../services/socialSyncService";
import { useSocialSync } from "../contexts/SocialSyncContext";
import {
  filterCommentMentionsForText,
  getCommentMentionPath,
  tokenizeCommentTextWithMentions,
} from "../services/commentMentionsService";
import ConfirmDialog from "./ConfirmDialog";
import ScoreBadge from "./ScoreBadge";
import RelativeDateLabel from "./RelativeDateLabel";

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-6.5-4.3-9-8.2C.8 9.3 2.2 5.8 5.7 5c2.1-.4 4 .4 5.3 2 1.3-1.6 3.3-2.4 5.3-2 3.5.8 4.9 4.3 2.7 7.8C18.5 16.7 12 21 12 21Z" />
    </svg>
  );
}

function IconReply() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 7.5A2.5 2.5 0 0 0 17.5 5h-11A2.5 2.5 0 0 0 4 7.5v7A2.5 2.5 0 0 0 6.5 17H9v2.5l3.3-2.5h5.2A2.5 2.5 0 0 0 20 14.5v-7Z" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

function IconMore() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5.2" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="18.8" cy="12" r="1.8" />
    </svg>
  );
}

function getImagePath(value) {
  const image = String(value || "").trim();
  if (!image) return "";
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:") || image.startsWith("blob:")) {
    return image;
  }
  return image.startsWith("/") ? image : `/${image}`;
}

function getInitials(name) {
  const source = String(name || "").trim();
  if (!source) return "?";
  const [first = "", second = ""] = source.split(/\s+/);
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase() || "?";
}

function resolveCommentUser(comment) {
  const safeUserId = String(comment?.userId || "").trim();
  if (safeUserId) {
    const direct = getUserById(safeUserId);
    if (direct) return direct;
  }

  const author = String(comment?.author || "").trim();
  if (!author) return null;
  const authorMatch = getUsers({ query: author }).find((user) => user.name === author);
  return authorMatch || null;
}

function resolveCommentEvent(comment) {
  const eventId = String(comment?.eventId || "").trim();
  if (eventId) return getEventById(eventId);

  const isEventTarget = String(comment?.targetType || "").trim() === "event";
  if (!isEventTarget) return null;
  const targetId = String(comment?.targetId || "").trim();
  if (!targetId) return null;
  return getEventById(targetId);
}

function resolveCommentTargetPath(comment, resolvedEvent) {
  const targetType = String(comment?.targetType || "").trim();
  const targetId = String(comment?.targetId || "").trim();

  if (targetType === COMMENT_TARGET.EVENT) {
    const eventId = String(comment?.eventId || targetId || resolvedEvent?.id || "").trim();
    return eventId ? `/event/${eventId}` : "";
  }
  if (targetType === COMMENT_TARGET.ATHLETE) {
    return targetId ? `/athlete/${targetId}` : "";
  }
  if (targetType === COMMENT_TARGET.TEAM) {
    return targetId ? `/team/${targetId}` : "";
  }
  if (targetType === COMMENT_TARGET.LEAGUE) {
    return targetId ? `/league/${targetId}` : "";
  }
  if (targetType === COMMENT_TARGET.LEAGUE_SEASON) {
    return targetId ? `/league-season/${targetId}` : "";
  }
  if (targetType === COMMENT_TARGET.LIST) {
    return targetId ? `/list/${targetId}` : "";
  }
  if (targetType === COMMENT_TARGET.USER) {
    return targetId ? `/user/${targetId}` : "";
  }
  return "";
}

function buildCommentFeedPath(comment) {
  const targetType = String(comment?.targetType || "").trim();
  const targetId = String(comment?.targetId || "").trim();
  const commentId = String(comment?.id || "").trim();
  const params = new URLSearchParams();

  if (targetType && targetId) {
    params.set("scope", "object");
    params.set("mode", "for-you");
    params.set("targetType", targetType);
    params.set("targetId", targetId);
  } else {
    params.set("scope", "my");
    params.set("mode", "for-you");
  }

  if (commentId) params.set("commentId", commentId);
  return `/feed?${params.toString()}`;
}

function renderCommentNoteContent(text, mentions = [], keyPrefix = "note") {
  const tokens = tokenizeCommentTextWithMentions(text, mentions);
  const nodes = [];

  tokens.forEach((token, tokenIndex) => {
    if (token.type === "mention") {
      const path = getCommentMentionPath(token.mention);
      if (path) {
        nodes.push(
          <Link
            key={`${keyPrefix}-mention-${tokenIndex}`}
            className="comment-mention-link"
            to={path}
          >
            {token.value}
          </Link>,
        );
        return;
      }
      nodes.push(token.value);
      return;
    }

    const parts = String(token.value || "").split("\n");
    parts.forEach((part, partIndex) => {
      if (part) {
        nodes.push(part);
      }
      if (partIndex < parts.length - 1) {
        nodes.push(<br key={`${keyPrefix}-br-${tokenIndex}-${partIndex}`} />);
      }
    });
  });

  return nodes;
}

function CommentCard({
  comment,
  onToggleLike,
  onCreateReply,
  onToggleReplyLike,
  onDeleteComment,
  onDeleteReply,
  showEventLink = true,
  forceReplyThreadOpen = false,
}) {
  const cloudIdentity = getSocialSyncCloudIdentity();
  const isReview = comment.commentType === COMMENT_MODE.REVIEW;
  const replies = Array.isArray(comment.replies) ? comment.replies : [];
  const resolvedUser = useMemo(
    () => resolveCommentUser(comment),
    [comment?.userId, comment?.author],
  );
  const userPath = resolvedUser?.id ? `/user/${resolvedUser.id}` : "/users";
  const avatarImage = getImagePath(resolvedUser?.image);
  const [isFollowed, setIsFollowed] = useState(false);
  const [impressionCount, setImpressionCount] = useState(Number(comment?.totalImpressions || 0));
  const [isReplyThreadOpen, setIsReplyThreadOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyMentions, setReplyMentions] = useState([]);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [isCommentDismissed, setIsCommentDismissed] = useState(false);
  const [dismissedReplyIds, setDismissedReplyIds] = useState([]);
  const [pendingDeleteTarget, setPendingDeleteTarget] = useState(null);
  const { revisionByDomain } = useSocialSync();
  const followsRevision = Number(revisionByDomain?.follows || 0);
  const moreMenuRef = useRef(null);
  const resolvedEvent = useMemo(
    () => resolveCommentEvent(comment),
    [comment?.eventId, comment?.targetType, comment?.targetId],
  );
  const targetContext = useMemo(
    () => resolveTargetCommentContext(comment?.targetType, comment?.targetId),
    [comment?.targetType, comment?.targetId],
  );
  const eventPath = resolvedEvent?.id ? `/event/${resolvedEvent.id}` : "";
  const targetPath = useMemo(
    () => resolveCommentTargetPath(comment, resolvedEvent),
    [comment?.eventId, comment?.targetId, comment?.targetType, resolvedEvent?.id],
  );
  const feedPath = useMemo(
    () => buildCommentFeedPath(comment),
    [comment?.id, comment?.targetType, comment?.targetId],
  );
  const authorLabel = String(resolvedUser?.name || comment?.author || "cet utilisateur").trim();
  const resolvedTargetLabel = String(targetContext?.label || resolvedEvent?.title || "").trim();
  const targetActionLabel = targetContext?.label
    ? `Aller a ${targetContext.label}`
    : (resolvedTargetLabel ? `Aller a ${resolvedTargetLabel}` : "Aller a l'objet");
  const followActionLabel = isFollowed
    ? `Ne plus suivre ${authorLabel}`
    : `Suivre ${authorLabel}`;
  const shouldRenderEventLink = showEventLink && Boolean(resolvedEvent?.id);
  const cleanReplyText = String(replyText || "").trim();
  const canSubmitReply = cleanReplyText.length > 0 && typeof onCreateReply === "function";
  const canToggleReplyLike = typeof onToggleReplyLike === "function";
  const visibleReplies = replies.filter((reply) => !dismissedReplyIds.includes(String(reply?.id || "")));
  const repliesCount = visibleReplies.length;
  const currentActorId = String(cloudIdentity?.appUserId || "").trim();
  const canDeleteOwnComment = (
    String(comment?.userId || "").trim() === "usr-manual"
    || (currentActorId && String(comment?.userId || "").trim() === currentActorId)
    || String(comment?.author || "").trim() === "Vous"
  );
  const replyThreadId = `comment-replies-${String(comment?.id || "item").trim() || "item"}`;
  const replyInputId = `comment-reply-${String(comment?.id || "item").trim() || "item"}`;
  const isReplyThreadForced = Boolean(forceReplyThreadOpen);
  const isReplyThreadVisible = isReplyThreadForced || isReplyThreadOpen;

  useEffect(() => {
    if (!resolvedUser?.id) {
      setIsFollowed(false);
      return;
    }
    setIsFollowed(isUserFollowed(resolvedUser.id));
  }, [followsRevision, resolvedUser?.id]);

  useEffect(() => {
    setImpressionCount(Math.max(0, Number(comment?.totalImpressions || 0)));
  }, [comment?.id, comment?.totalImpressions]);

  useEffect(() => {
    const safeCommentId = String(comment?.id || "").trim();
    if (!safeCommentId) return;
    const next = registerCommentImpression(safeCommentId);
    setImpressionCount(next);
  }, [comment?.id]);

  useEffect(() => {
    setIsCommentDismissed(false);
    setDismissedReplyIds([]);
    setIsReplyThreadOpen(false);
    setReplyText("");
    setReplyMentions([]);
    setPendingDeleteTarget(null);
  }, [comment?.id]);

  useEffect(() => {
    if (!isMoreMenuOpen) return undefined;
    function handlePointerDown(event) {
      if (!moreMenuRef.current?.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMoreMenuOpen(false);
      }
    }
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMoreMenuOpen]);

  function handleToggleFollow() {
    if (!resolvedUser?.id) return;
    const next = toggleUserFollow(resolvedUser.id);
    setIsFollowed(next);
  }

  function handleToggleReplyThread() {
    if (isReplyThreadForced) return;
    setIsReplyThreadOpen((value) => !value);
  }

  function handleSubmitReply(event) {
    event.preventDefault();
    if (!canSubmitReply) return;
    const created = onCreateReply(comment, cleanReplyText, filterCommentMentionsForText(replyText, replyMentions));
    if (!created) return;
    setReplyText("");
    setReplyMentions([]);
    setIsReplyThreadOpen(true);
  }

  function handleToggleMoreMenu() {
    setIsMoreMenuOpen((value) => !value);
  }

  function handleToggleFollowFromMenu() {
    handleToggleFollow();
    setIsMoreMenuOpen(false);
  }

  function handleReportComment() {
    setIsReported(true);
    setIsMoreMenuOpen(false);
  }

  function handleRequestDeleteComment() {
    setPendingDeleteTarget({ kind: "comment" });
  }

  function handleRequestDeleteReply(reply) {
    const safeReplyId = String(reply?.id || "").trim();
    if (!safeReplyId) return;
    setPendingDeleteTarget({ kind: "reply", replyId: safeReplyId });
  }

  function handleConfirmDelete() {
    if (!pendingDeleteTarget) return;
    if (pendingDeleteTarget.kind === "comment") {
      const deleted = typeof onDeleteComment === "function"
        ? onDeleteComment(comment)
        : deleteComment(comment?.id);
      if (!deleted) return;
      setIsCommentDismissed(true);
      setIsMoreMenuOpen(false);
      setPendingDeleteTarget(null);
      return;
    }
    if (pendingDeleteTarget.kind !== "reply") return;
    const safeReplyId = String(pendingDeleteTarget.replyId || "").trim();
    if (!safeReplyId) return;
    const reply = visibleReplies.find((entry) => String(entry?.id || "").trim() === safeReplyId);
    if (!reply) {
      setPendingDeleteTarget(null);
      return;
    }
    const deleted = typeof onDeleteReply === "function"
      ? onDeleteReply(comment, reply)
      : deleteCommentReply(comment?.id, safeReplyId);
    if (!deleted) return;
    setDismissedReplyIds((prev) => [...prev, safeReplyId]);
    setPendingDeleteTarget(null);
  }

  if (isCommentDismissed) return null;

  return (
    <div className={`comment-card-shell ${isMoreMenuOpen ? "is-more-open" : ""}`.trim()}>
      {shouldRenderEventLink ? (
        <p className="comment-card-event-row typo-meta">
          <Link className="comment-card-event-link" to={eventPath}>
            {resolvedEvent.title}
          </Link>
        </p>
      ) : null}
      <article className={`comment-card comment-card-ui ${isMoreMenuOpen ? "is-more-open" : ""}`.trim()}>
        <header className="comment-head comment-card-head">
          <div className="comment-card-author-block">
            {isReview ? (
              <ScoreBadge
                value={comment.rating}
                scale="percent"
                variant="user-chip"
              />
            ) : (
              <ScoreBadge variant="teaser-chip" />
            )}
            <div className="comment-card-author-meta">
              <div className="comment-card-user-row">
                <Link className="comment-card-author-identity" to={userPath}>
                  <span className="mini-avatar user-identity-avatar comment-card-author-avatar">
                    {avatarImage ? (
                      <img src={avatarImage} alt={comment.author} loading="lazy" />
                    ) : (
                      getInitials(comment.author)
                    )}
                  </span>
                  <span className="comment-author comment-card-author-link typo-meta">{comment.author}</span>
                </Link>
                <RelativeDateLabel value={comment?.createdAt} className="comment-card-author-time typo-meta" />
              </div>
            </div>
          </div>
          <div className="comment-card-toolbox">
            {canDeleteOwnComment ? (
              <button
                className="comment-delete-btn"
                type="button"
                aria-label="Supprimer mon commentaire"
                onClick={handleRequestDeleteComment}
              >
                ×
              </button>
            ) : null}
            <div className="comment-card-more-menu" ref={moreMenuRef}>
              <button
                className="comment-card-more-btn"
                type="button"
                aria-label="Options du commentaire"
                aria-haspopup="menu"
                aria-expanded={isMoreMenuOpen}
                onClick={handleToggleMoreMenu}
              >
                <IconMore />
              </button>
              {isMoreMenuOpen ? (
                <div className="comment-card-more-popover" role="menu" aria-label="Actions du commentaire">
                  <button
                    type="button"
                    className="comment-card-more-action"
                    role="menuitem"
                    onClick={handleToggleFollowFromMenu}
                    disabled={!resolvedUser?.id}
                  >
                    {followActionLabel}
                  </button>
                  <Link
                    className="comment-card-more-action"
                    role="menuitem"
                    to={feedPath}
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    Ouvrir le commentaire dans le feed
                  </Link>
                  {targetPath ? (
                    <Link
                      className="comment-card-more-action"
                      role="menuitem"
                      to={targetPath}
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      {targetActionLabel}
                    </Link>
                  ) : (
                    <button type="button" className="comment-card-more-action" role="menuitem" disabled>
                      {targetActionLabel}
                    </button>
                  )}
                  <button
                    type="button"
                    className={`comment-card-more-action ${isReported ? "is-reported" : "is-danger"}`.trim()}
                    role="menuitem"
                    onClick={handleReportComment}
                    disabled={isReported}
                  >
                    {isReported ? "Commentaire signale" : "Signaler le commentaire"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <p className="comment-note typo-comment-text">
          {renderCommentNoteContent(comment.note, comment.mentions, `comment-${comment?.id || "item"}`)}
        </p>

        <div className="comment-card-stats typo-meta" aria-label="Actions du commentaire">
          <button
            className={`comment-card-stat comment-card-stat-button ${comment.isLiked ? "is-active" : ""}`.trim()}
            onClick={() => {
              if (typeof onToggleLike === "function") onToggleLike(comment);
            }}
            aria-label={comment.isLiked ? "Retirer le like" : "Liker le commentaire"}
            type="button"
          >
            <IconHeart />
            <span>{comment.totalLikes || 0}</span>
          </button>

          <span className="comment-card-stat" aria-label={`${impressionCount} impressions`}>
            <IconEye />
            <span>{impressionCount}</span>
          </span>

          {isReplyThreadForced ? (
            <span
              className="comment-card-stat comment-card-stat-reply is-active"
              aria-label={`${repliesCount} reponses`}
            >
              <IconReply />
              <span>{repliesCount}</span>
            </span>
          ) : (
            <button
              className={`comment-card-stat comment-card-stat-button comment-card-stat-reply ${isReplyThreadOpen ? "is-active" : ""}`.trim()}
              onClick={handleToggleReplyThread}
              aria-label={`Commenter (${repliesCount} reponses)`}
              aria-expanded={isReplyThreadOpen}
              aria-controls={replyThreadId}
              type="button"
            >
              <IconReply />
              <span>{repliesCount}</span>
            </button>
          )}
        </div>

        {isReplyThreadVisible ? (
          <section className="comment-reply-thread" id={replyThreadId} aria-label={`Reponses a ${authorLabel}`}>
            {repliesCount ? (
              <div className="comment-reply-thread-list">
                {visibleReplies.map((reply, replyIndex) => (
                  (() => {
                    const resolvedReplyUser = resolveCommentUser(reply);
                    const replyPath = resolvedReplyUser?.id ? `/user/${resolvedReplyUser.id}` : "/users";
                    const replyAvatarImage = getImagePath(resolvedReplyUser?.image);
                    const replyAuthor = String(reply?.author || "Utilisateur").trim();
                    const canDeleteOwnReply = (
                      String(reply?.userId || "").trim() === "usr-manual"
                      || (currentActorId && String(reply?.userId || "").trim() === currentActorId)
                      || replyAuthor === "Vous"
                    );
                    return (
                      <article
                        key={reply?.id || `reply-${replyIndex}`}
                        className="comment-reply-thread-item"
                      >
                        {canDeleteOwnReply ? (
                          <button
                            type="button"
                            className="comment-delete-btn comment-reply-delete-btn"
                            aria-label="Supprimer ma reponse"
                            onClick={() => handleRequestDeleteReply(reply)}
                          >
                            ×
                          </button>
                        ) : null}
                        <div className="comment-card-author-meta">
                          <div className="comment-card-user-row">
                            <Link className="comment-card-author-identity" to={replyPath}>
                              <span className="mini-avatar user-identity-avatar comment-card-author-avatar">
                                {replyAvatarImage ? (
                                  <img src={replyAvatarImage} alt={replyAuthor} loading="lazy" />
                                ) : (
                                  getInitials(replyAuthor)
                                )}
                              </span>
                              <span className="comment-author comment-card-author-link typo-meta">{replyAuthor}</span>
                            </Link>
                            <RelativeDateLabel value={reply?.createdAt} className="comment-card-author-time typo-meta" />
                          </div>
                        </div>
                        <p className="comment-note typo-comment-text">
                          {renderCommentNoteContent(reply?.note || "", reply?.mentions, `reply-${reply?.id || replyIndex}`)}
                        </p>
                        <div className="comment-reply-thread-actions">
                          {canToggleReplyLike ? (
                            <button
                              type="button"
                              className={`comment-reply-thread-like comment-card-stat-button ${reply?.isLiked ? "is-active" : ""}`.trim()}
                              onClick={() => onToggleReplyLike(comment, reply)}
                              aria-label={reply?.isLiked ? "Retirer le like de la reponse" : "Liker la reponse"}
                            >
                              <IconHeart />
                              <span>{reply?.totalLikes || 0}</span>
                            </button>
                          ) : (
                            <span className="comment-reply-thread-like comment-reply-thread-like-count" aria-label={`${reply?.totalLikes || 0} likes`}>
                              <IconHeart />
                              <span>{reply?.totalLikes || 0}</span>
                            </span>
                          )}
                        </div>
                      </article>
                    );
                  })()
                ))}
              </div>
            ) : null}
            <form className="comment-reply-thread-composer" onSubmit={handleSubmitReply}>
              <CommentMentionTextarea
                id={replyInputId}
                label="Ecris une reponse"
                value={replyText}
                onChange={setReplyText}
                placeholder="Ecris une reponse..."
                rows={3}
                maxLength={400}
                mentions={replyMentions}
                onMentionsChange={setReplyMentions}
                fieldClassName="comment-reply-thread-field"
                labelClassName="comment-reply-thread-label-wrap"
                textareaClassName="comment-reply-input"
                suggestionsClassName="is-reply-thread"
              />
              <button
                className="btn btn-primary comment-reply-submit"
                type="submit"
                disabled={!canSubmitReply}
              >
                Repondre
              </button>
            </form>
          </section>
        ) : null}
      </article>
      <ConfirmDialog
        open={Boolean(pendingDeleteTarget)}
        title={pendingDeleteTarget?.kind === "reply" ? "Supprimer cette reponse ?" : "Supprimer ce commentaire ?"}
        message="Cette action est irreversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        tone="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteTarget(null)}
      />
    </div>
  );
}

export default CommentCard;
