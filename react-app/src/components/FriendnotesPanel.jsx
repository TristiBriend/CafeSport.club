import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSocialSync } from "../contexts/SocialSyncContext";
import ScoreBadge from "./ScoreBadge";
import { getFriendnotesForEvent } from "../services/friendnotesService";
import { readUserFollowMap } from "../services/userFollowService";
import { SOCIAL_SYNC_DOMAIN } from "../services/socialSyncService";

function getInitials(value) {
  const source = String(value || "").trim();
  if (!source) return "?";
  const [first = "", second = ""] = source.split(/\s+/);
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase() || "?";
}

function getFollowedUserCount() {
  return Object.values(readUserFollowMap()).filter(Boolean).length;
}

function buildClassName(baseClassName, className, compact) {
  return [
    baseClassName,
    compact ? "is-compact" : "",
    className,
  ].filter(Boolean).join(" ");
}

function FriendnotesPanel({
  eventId = "",
  title = "Note de mes amis",
  className = "",
  compact = false,
}) {
  const { isAuthenticated } = useAuth();
  const { revisionByDomain } = useSocialSync();
  const followsRevision = revisionByDomain?.[SOCIAL_SYNC_DOMAIN.FOLLOWS] || 0;
  const commentsRevision = revisionByDomain?.[SOCIAL_SYNC_DOMAIN.COMMENTS] || 0;

  const followedUserCount = useMemo(
    () => (isAuthenticated ? getFollowedUserCount() : 0),
    [followsRevision, isAuthenticated],
  );

  const entries = useMemo(
    () => (isAuthenticated ? getFriendnotesForEvent(eventId) : []),
    [commentsRevision, eventId, followsRevision, isAuthenticated],
  );

  let emptyMessage = "";
  if (!isAuthenticated) {
    emptyMessage = "Connectez-vous pour voir les notes de vos amis.";
  } else if (!followedUserCount) {
    emptyMessage = "Vous ne suivez encore aucun membre.";
  } else if (!entries.length) {
    emptyMessage = "Aucune note publiee par vos amis pour cet event.";
  }

  return (
    <section className={buildClassName("friendnotes-panel", className, compact)}>
      {title ? (
        <div className="friendnotes-header">
          <h3>{title}</h3>
          {entries.length ? <span>{entries.length} note{entries.length > 1 ? "s" : ""}</span> : null}
        </div>
      ) : null}

      {emptyMessage ? (
        <p className="friendnotes-empty">{emptyMessage}</p>
      ) : (
        <div className="friendnotes-table" aria-label="Notes de vos amis">
          {entries.map((entry) => {
            const RowTag = entry.profilePath ? Link : "div";
            const rowProps = entry.profilePath ? { to: entry.profilePath } : {};
            const primaryLabel = String(entry.handle || entry.displayName || "Utilisateur").trim() || "Utilisateur";
            const secondaryLabel = primaryLabel === entry.displayName ? "" : entry.displayName;

            return (
              <RowTag
                key={entry.commentId || entry.userId}
                className="friendnotes-row"
                {...rowProps}
              >
                <span className="friendnotes-score">
                  <ScoreBadge variant="user-chip" value={entry.rating} scale="percent" />
                </span>
                <span className="friendnotes-user">
                  <span className="friendnotes-avatar" aria-hidden="true">
                    {entry.avatarUrl ? (
                      <img src={entry.avatarUrl} alt="" loading="lazy" />
                    ) : (
                      <span>{getInitials(entry.displayName)}</span>
                    )}
                  </span>
                  <span className="friendnotes-user-copy">
                    <strong className="friendnotes-name">{primaryLabel}</strong>
                    {secondaryLabel ? <span className="friendnotes-meta">{secondaryLabel}</span> : null}
                  </span>
                </span>
              </RowTag>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default FriendnotesPanel;
