import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import EventCard from "./EventCard";
import LeagueCard from "./LeagueCard";
import LeagueSeasonCard from "./LeagueSeasonCard";
import PlayerCard from "./PlayerCard";
import RankingCard from "./RankingCard";
import TeamCard from "./TeamCard";
import UserCard from "./UserCard";
import {
  getAthleteById,
  getCuratedLists,
  getEventsForAthlete,
  getEventsForTeam,
  getListById,
  getTeamById,
  getUserById,
  getUsers,
  resolveListEntries,
} from "../services/catalogService";
import {
  COMMENT_TARGET,
  createCommentReply,
  deleteComment,
  deleteCommentReply,
  getAllComments,
  getCommentDateLabel,
  getCommentsForTarget,
  toggleCommentLike,
  toggleReplyLike,
  updateComment,
  updateCommentReply,
} from "../services/commentsService";
import {
  buildRawFeedEntries,
  buildStreamMeta,
  composeBalancedFeedStream,
  groupCardRows,
} from "../services/feedStreamComposer";
import { getEventById } from "../services/eventsService";
import { getLeagueById, getLeagueSeasonById } from "../services/leaguesService";
import { useSocialSync } from "../contexts/SocialSyncContext";

const FEED_MODE = {
  RECENT: "recent",
  POPULAR: "popular",
};

function toTimestamp(value) {
  const ts = Date.parse(String(value || ""));
  return Number.isFinite(ts) ? ts : 0;
}

function sortByDateDesc(a, b) {
  return toTimestamp(b?.dateISO || b?.createdAt) - toTimestamp(a?.dateISO || a?.createdAt);
}

function resolveObjectMeta(targetType, targetId) {
  if (targetType === COMMENT_TARGET.EVENT) {
    const event = getEventById(targetId);
    return {
      title: "Feed evenement",
      subtitle: event?.title || "Evenement",
      detailPath: event ? `/event/${event.id}` : "/discover",
    };
  }
  if (targetType === COMMENT_TARGET.USER) {
    const user = getUserById(targetId);
    return {
      title: "Feed profil",
      subtitle: user?.name || "Profil",
      detailPath: user ? `/user/${user.id}` : "/users",
    };
  }
  if (targetType === COMMENT_TARGET.LEAGUE) {
    const league = getLeagueById(targetId);
    return {
      title: "Feed ligue",
      subtitle: league?.title || "Ligue",
      detailPath: league ? `/league/${league.id}` : "/leagues",
    };
  }
  if (targetType === COMMENT_TARGET.LEAGUE_SEASON) {
    const season = getLeagueSeasonById(targetId);
    return {
      title: "Feed saison",
      subtitle: season?.title || "Saison",
      detailPath: season ? `/league-season/${season.id}` : "/leagues",
    };
  }
  if (targetType === COMMENT_TARGET.ATHLETE) {
    const athlete = getAthleteById(targetId);
    return {
      title: "Feed athlete",
      subtitle: athlete?.name || "Athlete",
      detailPath: athlete ? `/athlete/${athlete.id}` : "/athletes",
    };
  }
  if (targetType === COMMENT_TARGET.TEAM) {
    const team = getTeamById(targetId);
    return {
      title: "Feed team",
      subtitle: team?.nameFull || team?.name || "Team",
      detailPath: team ? `/team/${team.id}` : "/teams",
    };
  }
  if (targetType === COMMENT_TARGET.LIST) {
    const list = getListById(targetId);
    return {
      title: "Feed list",
      subtitle: list?.title || "List",
      detailPath: list ? `/list/${list.id}` : "/lists",
    };
  }
  return {
    title: "Feed objet",
    subtitle: "Objet inconnu",
    detailPath: "/feed",
  };
}

function resolveObjectEvents(targetType, targetId, allComments = []) {
  if (targetType === COMMENT_TARGET.EVENT) {
    const event = getEventById(targetId);
    return event ? [event] : [];
  }
  if (targetType === COMMENT_TARGET.LEAGUE) {
    return [...(getLeagueById(targetId)?.events || [])];
  }
  if (targetType === COMMENT_TARGET.LEAGUE_SEASON) {
    return [...(getLeagueSeasonById(targetId)?.events || [])];
  }
  if (targetType === COMMENT_TARGET.ATHLETE) {
    return getEventsForAthlete(targetId);
  }
  if (targetType === COMMENT_TARGET.TEAM) {
    return getEventsForTeam(targetId);
  }
  if (targetType === COMMENT_TARGET.LIST) {
    const list = getListById(targetId);
    return resolveListEntries(list)
      .filter((entry) => entry.type === "event" && entry.event?.id)
      .map((entry) => entry.event);
  }
  if (targetType === COMMENT_TARGET.USER) {
    const user = getUserById(targetId);
    const ids = new Set(
      allComments
        .filter((comment) => {
          if (comment.userId && comment.userId === targetId) return true;
          if (user?.name && comment.author === user.name) return true;
          return false;
        })
        .map((comment) => comment.eventId)
        .filter(Boolean),
    );
    return Array.from(ids)
      .map((eventId) => getEventById(eventId))
      .filter(Boolean);
  }
  return [];
}

function resolveObjectLists(targetType, targetId, relatedEvents = []) {
  const allLists = getCuratedLists({ sportFilter: "Tous", query: "" });
  if (targetType === COMMENT_TARGET.LIST) {
    const current = getListById(targetId);
    return current ? [current] : [];
  }
  if (targetType === COMMENT_TARGET.USER) {
    return allLists.filter((list) => list.ownerId === targetId);
  }

  const relatedEventIds = new Set((relatedEvents || []).map((event) => event.id));
  return allLists.filter((list) => {
    const entries = Array.isArray(list.entries) ? list.entries : [];
    if (targetType === COMMENT_TARGET.ATHLETE) {
      if (entries.some((entry) => entry.athleteId === targetId)) return true;
    }
    if (!relatedEventIds.size) return false;
    return entries.some((entry) => entry.eventId && relatedEventIds.has(entry.eventId));
  });
}

function resolveObjectProfiles(targetType, targetId, comments = []) {
  const users = getUsers({ query: "" });
  const byName = new Map(users.map((user) => [user.name, user]));
  const map = new Map();

  if (targetType === COMMENT_TARGET.USER) {
    const user = getUserById(targetId);
    if (user?.id) map.set(user.id, user);
  }

  comments.forEach((comment) => {
    if (comment.userId) {
      const user = getUserById(comment.userId);
      if (user?.id) map.set(user.id, user);
      return;
    }
    const guessed = byName.get(comment.author);
    if (guessed?.id) map.set(guessed.id, guessed);
  });

  return Array.from(map.values());
}

function getFeedEmptyStateText() {
  return "Aucun contenu lie a cet objet.";
}

function ObjectFeedScopePanel({
  targetType,
  targetId,
  watchlistIds = [],
  onToggleWatchlist = () => {},
  title = "",
  subtitle = "",
  mode = "",
  onModeChange = null,
}) {
  const safeTargetType = String(targetType || "").trim();
  const safeTargetId = String(targetId || "").trim();
  const hasTarget = Boolean(safeTargetType && safeTargetId);
  const isControlledMode = mode === FEED_MODE.RECENT || mode === FEED_MODE.POPULAR;
  const [internalMode, setInternalMode] = useState(FEED_MODE.RECENT);
  const [commentsVersion, setCommentsVersion] = useState(0);
  const { revisionByDomain } = useSocialSync();
  const commentsRevision = Number(revisionByDomain?.comments || 0);
  const activeMode = isControlledMode ? mode : internalMode;
  const watchlistSet = useMemo(() => new Set(watchlistIds), [watchlistIds]);
  const allComments = useMemo(() => getAllComments(), [commentsRevision, commentsVersion]);

  const objectMeta = useMemo(
    () => (hasTarget ? resolveObjectMeta(safeTargetType, safeTargetId) : null),
    [hasTarget, safeTargetId, safeTargetType],
  );

  const objectComments = useMemo(() => {
    if (!hasTarget) return [];
    return getCommentsForTarget(safeTargetType, safeTargetId)
      .slice()
      .sort((a, b) => {
        if (activeMode === FEED_MODE.POPULAR) {
          const likesDiff = Number(b.totalLikes || 0) - Number(a.totalLikes || 0);
          if (likesDiff !== 0) return likesDiff;
        }
        return toTimestamp(b.createdAt) - toTimestamp(a.createdAt);
      });
  }, [activeMode, commentsRevision, hasTarget, safeTargetId, safeTargetType, commentsVersion]);

  const objectEvents = useMemo(() => {
    if (!hasTarget) return [];
    return resolveObjectEvents(safeTargetType, safeTargetId, allComments)
      .slice()
      .sort((a, b) => {
        if (activeMode === FEED_MODE.POPULAR) {
          const scoreDiff = Number(b.communityScore || 0) - Number(a.communityScore || 0);
          if (scoreDiff !== 0) return scoreDiff;
        }
        return sortByDateDesc(a, b);
      });
  }, [activeMode, allComments, hasTarget, safeTargetId, safeTargetType]);

  const objectLists = useMemo(() => {
    if (!hasTarget) return [];
    return resolveObjectLists(safeTargetType, safeTargetId, objectEvents)
      .slice()
      .sort((a, b) => {
        if (activeMode === FEED_MODE.POPULAR) {
          const likesDiff = Number(b.likes || 0) - Number(a.likes || 0);
          if (likesDiff !== 0) return likesDiff;
        }
        return String(a.title || "").localeCompare(String(b.title || ""));
      });
  }, [activeMode, hasTarget, objectEvents, safeTargetId, safeTargetType]);

  const objectUsers = useMemo(() => {
    if (!hasTarget) return [];
    return resolveObjectProfiles(safeTargetType, safeTargetId, objectComments)
      .slice()
      .sort((a, b) => {
        if (activeMode === FEED_MODE.POPULAR) {
          const followersDiff = Number(b.followers || 0) - Number(a.followers || 0);
          if (followersDiff !== 0) return followersDiff;
        }
        return String(a.name || "").localeCompare(String(b.name || ""));
      });
  }, [activeMode, hasTarget, objectComments, safeTargetId, safeTargetType]);

  const streamRawEntries = useMemo(() => (
    buildRawFeedEntries({
      request: {
        scope: "object",
        mode: activeMode,
        targetType: safeTargetType,
        targetId: safeTargetId,
      },
      datasets: {
        objectMeta,
        objectComments,
        objectEvents,
        objectLists,
        objectUsers,
      },
    })
  ), [activeMode, objectComments, objectEvents, objectLists, objectMeta, objectUsers, safeTargetId, safeTargetType]);

  const streamEntries = useMemo(
    () => groupCardRows(composeBalancedFeedStream(streamRawEntries, { lookahead: 6 }), 3),
    [streamRawEntries],
  );

  function bumpComments() {
    setCommentsVersion((value) => value + 1);
  }

  function handleToggleLike(comment) {
    toggleCommentLike(comment);
    bumpComments();
  }

  function handleToggleReplyLike(_comment, reply) {
    toggleReplyLike(reply);
    bumpComments();
  }

  function handleCreateReply(comment, note) {
    const created = createCommentReply(comment?.id, {
      note,
      author: "Vous",
    });
    if (!created) return null;
    bumpComments();
    return created;
  }

  function handleUpdateComment(comment, payload) {
    const updated = updateComment(comment?.id, payload);
    if (!updated) return false;
    bumpComments();
    return true;
  }

  function handleDeleteComment(comment) {
    const deleted = deleteComment(comment?.id);
    if (!deleted) return false;
    bumpComments();
    return true;
  }

  function handleUpdateReply(comment, reply, note) {
    const updated = updateCommentReply(comment?.id, reply?.id, { note });
    if (!updated) return false;
    bumpComments();
    return true;
  }

  function handleDeleteReply(comment, reply) {
    const deleted = deleteCommentReply(comment?.id, reply?.id);
    if (!deleted) return false;
    bumpComments();
    return true;
  }

  function setMode(nextMode) {
    if (!Object.values(FEED_MODE).includes(nextMode)) return;
    if (typeof onModeChange === "function") onModeChange(nextMode);
    if (!isControlledMode) setInternalMode(nextMode);
  }

  function renderEntityCard(entry) {
    const entity = entry?.payload?.entity || {};
    const lines = Array.isArray(entity.lines) ? entity.lines : [];
    return (
      <article className="entity-card">
        <h3>
          {entity.path ? (
            <Link to={entity.path}>{entity.title || "Element"}</Link>
          ) : (entity.title || "Element")}
        </h3>
        {entity.subtitle ? <p className="event-meta">{entity.subtitle}</p> : null}
        {lines.map((line, index) => (
          <p key={`${entry.id}-line-${index}`} className="event-meta">{line}</p>
        ))}
        {entity.path ? <Link to={entity.path}>{entity.pathLabel || "Ouvrir"}</Link> : null}
      </article>
    );
  }

  function renderReplyCard(entry) {
    const reply = entry?.payload?.reply;
    if (!reply) return null;
    const eventId = entry?.payload?.eventId;
    return (
      <article className="comment-card">
        <header className="comment-head">
          <div>
            <strong className="typo-body-strong">{reply.author || "Utilisateur"}</strong>
            <p className="comment-meta typo-meta">Reponse likee</p>
          </div>
        </header>
        <p className="comment-note typo-body-strong">{reply.note}</p>
        <p className="event-meta typo-meta">{reply.totalLikes || 0} likes</p>
        <p className="reply-date typo-meta">{getCommentDateLabel(reply)}</p>
        {eventId ? <Link className="typo-meta" to={`/event/${eventId}`}>Voir evenement</Link> : null}
      </article>
    );
  }

  function renderCardEntry(entry) {
    function renderObjectTargetCard(targetType, targetId) {
      const safeType = String(targetType || "").trim();
      const safeId = String(targetId || "").trim();
      if (!safeType || !safeId) return null;

      if (safeType === COMMENT_TARGET.USER) {
        const user = getUserById(safeId);
        return user ? <UserCard user={user} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.ATHLETE) {
        const athlete = getAthleteById(safeId);
        return athlete ? <PlayerCard athlete={athlete} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.TEAM) {
        const team = getTeamById(safeId);
        return team ? <TeamCard team={team} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.LEAGUE) {
        const league = getLeagueById(safeId);
        return league ? <LeagueCard league={league} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.LEAGUE_SEASON) {
        const season = getLeagueSeasonById(safeId);
        return season ? <LeagueSeasonCard season={season} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.LIST) {
        const list = getListById(safeId);
        return list ? <RankingCard list={list} maxPreview={4} className="is-feed-uniform" /> : null;
      }
      return null;
    }

    if (entry.subtype === "event") {
      return (
        <EventCard
          event={entry.payload?.event}
          isInWatchlist={watchlistSet.has(entry.payload?.event?.id)}
          onToggleWatchlist={onToggleWatchlist}
          size="small"
          showComment={false}
        />
      );
    }
    if (entry.subtype === "ranking") {
      const extraClass = entry.payload?.className ? `${entry.payload.className} is-feed-uniform` : "is-feed-uniform";
      return <RankingCard list={entry.payload?.list} maxPreview={4} className={extraClass} />;
    }

    if (entry.subtype === "profile" && entry.payload?.user) {
      return <UserCard user={entry.payload.user} size="small" showTags={false} />;
    }

    const targetCard = renderObjectTargetCard(entry.payload?.targetType, entry.payload?.targetId);
    if (targetCard) return targetCard;

    return renderEntityCard(entry);
  }

  function renderStreamMain(entry) {
    if (entry.type === "comment") {
      if (entry.subtype === "reply") return renderReplyCard(entry);
      return (
        <CommentCard
          comment={entry.payload?.comment}
          onToggleLike={handleToggleLike}
          onCreateReply={handleCreateReply}
          onToggleReplyLike={handleToggleReplyLike}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
          onUpdateReply={handleUpdateReply}
          onDeleteReply={handleDeleteReply}
        />
      );
    }
    if (entry.subtype === "card-row") {
      const items = Array.isArray(entry.payload?.items) ? entry.payload.items : [];
      return (
        <div className="feed-stream-card-row">
          {items.map((item) => (
            <div key={item.id} className="feed-stream-card-cell">
              {renderCardEntry(item)}
            </div>
          ))}
        </div>
      );
    }
    return renderCardEntry(entry);
  }

  if (!hasTarget) return null;

  return (
    <section className="related-section object-feed-scope-panel">
      <div className="section-head">
        <div>
          <h2>{title || objectMeta?.title || "Feed relié a la card"}</h2>
          <p className="muted">
            {subtitle || `${objectMeta?.subtitle || "Objet"} · ${activeMode === FEED_MODE.POPULAR ? "mode Populaires" : "mode Chrono"}`}
          </p>
        </div>
      </div>

      <div className="filter-row">
        <button
          className={`filter-btn ${activeMode === FEED_MODE.RECENT ? "is-active" : ""}`}
          onClick={() => setMode(FEED_MODE.RECENT)}
          type="button"
        >
          Chrono
        </button>
        <button
          className={`filter-btn ${activeMode === FEED_MODE.POPULAR ? "is-active" : ""}`}
          onClick={() => setMode(FEED_MODE.POPULAR)}
          type="button"
        >
          Populaires
        </button>
        {objectMeta?.detailPath ? (
          <Link className="filter-btn" to={objectMeta.detailPath}>
            Ouvrir la page detail
          </Link>
        ) : null}
      </div>

      <div className="group-title">
        <h2>Flux</h2>
        <span>{streamEntries.length}</span>
      </div>

      {streamEntries.length ? (
        <div className="feed-stream-shell object-feed-stream-shell">
          <div className="feed-stream">
            {streamEntries.map((entry) => {
              const meta = buildStreamMeta(entry);
              const hasMeta = Boolean(meta.leftLabel || meta.leftSubLabel);
              return (
                <article key={entry.id} className={`feed-stream-item is-${entry.type}`}>
                  <div className="feed-stream-origin-col">
                    {hasMeta ? (
                      <div className="feed-stream-origin-stack">
                        {meta.leftLabel ? (
                          <span className="feed-stream-origin is-timestamp">{meta.leftLabel}</span>
                        ) : null}
                        {meta.leftSubLabel ? (
                          <span className="feed-stream-origin is-soft-meta">{meta.leftSubLabel}</span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="feed-stream-main">
                    {renderStreamMain(entry)}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <article className="entity-card">
          <h3>Flux vide</h3>
          <p className="event-meta">{getFeedEmptyStateText()}</p>
        </article>
      )}
    </section>
  );
}

export default ObjectFeedScopePanel;
