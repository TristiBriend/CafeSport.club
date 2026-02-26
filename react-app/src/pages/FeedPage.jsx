import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CommentCard from "../components/CommentCard";
import EventCard from "../components/EventCard";
import LeagueCard from "../components/LeagueCard";
import LeagueSeasonCard from "../components/LeagueSeasonCard";
import ObjectFeedScopePanel from "../components/ObjectFeedScopePanel";
import PlayerCard from "../components/PlayerCard";
import RankingCard from "../components/RankingCard";
import TeamCard from "../components/TeamCard";
import UserCard from "../components/UserCard";
import {
  getAllActivities,
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
  getLikedComments,
  toggleCommentLike,
  toggleReplyLike,
  updateComment,
  updateCommentReply,
} from "../services/commentsService";
import { getAllEvents, getEventById } from "../services/eventsService";
import {
  buildRawFeedEntries,
  buildStreamMeta,
  composeBalancedFeedStream,
  groupCardRows,
} from "../services/feedStreamComposer";
import {
  buildOptionalFeedTabId,
  FEED_OPTIONAL_TABS_MAX,
  getOptionalFeedTabForTarget,
  loadOptionalFeedTabs,
  removeOptionalFeedTab,
  setOptionalFeedTabMode,
  upsertOptionalFeedTab,
} from "../services/feedOptionalTabsService";
import { getLeagueById, getLeagueSeasonById } from "../services/leaguesService";
import {
  FOLLOW_TARGET,
  getAllFollowedTargets,
  getTargetFollowerCount,
} from "../services/userFollowService";

const FEED_SCOPE = {
  MY: "my",
  OBJECT: "object",
};

const FEED_MODE = {
  FOR_YOU: "for-you",
  RECENT: "recent",
  FAVORITES: "favorites",
  ACTIVITY_RECENT: "activity-recent",
  ACTIVITY_POPULAR: "activity-popular",
  POPULAR: "popular",
};

const FEED_ALLOWED_MY_MODES = new Set([
  FEED_MODE.FOR_YOU,
  FEED_MODE.RECENT,
  FEED_MODE.FAVORITES,
  FEED_MODE.ACTIVITY_RECENT,
  FEED_MODE.ACTIVITY_POPULAR,
]);

const FEED_ALLOWED_OBJECT_MODES = new Set([
  FEED_MODE.RECENT,
  FEED_MODE.POPULAR,
]);

function toTimestamp(value) {
  const ts = Date.parse(String(value || ""));
  return Number.isFinite(ts) ? ts : 0;
}

function sortByDateDesc(left, right) {
  return toTimestamp(right?.dateISO || right?.createdAt) - toTimestamp(left?.dateISO || left?.createdAt);
}

function normalizeFeedMode(modeToken) {
  const token = String(modeToken || "").trim().toLowerCase();
  if (!token) return FEED_MODE.FOR_YOU;
  if (token === "tailored") return FEED_MODE.FOR_YOU;
  if (token === "chrono") return FEED_MODE.RECENT;
  return token;
}

function normalizeFeedRequest(searchParams) {
  const targetType = String(searchParams.get("targetType") || "").trim();
  const targetId = String(searchParams.get("targetId") || "").trim();
  const scopeToken = String(searchParams.get("scope") || "").trim().toLowerCase();
  const modeToken = normalizeFeedMode(searchParams.get("mode") || searchParams.get("feedMode"));

  const hasObjectTarget = Boolean(targetType && targetId);
  const scope = scopeToken === FEED_SCOPE.OBJECT && hasObjectTarget
    ? FEED_SCOPE.OBJECT
    : FEED_SCOPE.MY;

  if (scope === FEED_SCOPE.OBJECT) {
    return {
      scope,
      mode: FEED_ALLOWED_OBJECT_MODES.has(modeToken) ? modeToken : FEED_MODE.RECENT,
      targetType,
      targetId,
    };
  }

  return {
    scope: FEED_SCOPE.MY,
    mode: FEED_ALLOWED_MY_MODES.has(modeToken) ? modeToken : FEED_MODE.FOR_YOU,
    targetType: "",
    targetId: "",
  };
}

function buildFeedLink({ scope = FEED_SCOPE.MY, mode = FEED_MODE.FOR_YOU, targetType = "", targetId = "" }) {
  const params = new URLSearchParams();
  params.set("scope", scope);
  params.set("mode", mode);
  if (scope === FEED_SCOPE.OBJECT && targetType && targetId) {
    params.set("targetType", targetType);
    params.set("targetId", targetId);
  }
  return `/feed?${params.toString()}`;
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
    if (guessed?.id) {
      map.set(guessed.id, guessed);
    }
  });

  return Array.from(map.values());
}

function buildFollowedTargetPreview(entry, allComments) {
  const targetType = entry?.targetType;
  const targetId = entry?.targetId;
  if (!targetType || !targetId) return null;

  if (targetType === FOLLOW_TARGET.USER) {
    const user = getUserById(targetId);
    if (!user) return null;
    const latestCommentTs = allComments
      .filter((comment) => comment.userId === user.id || comment.author === user.name)
      .reduce((max, comment) => Math.max(max, toTimestamp(comment.createdAt)), 0);
    return {
      id: `${targetType}-${targetId}`,
      targetType,
      targetId,
      title: user.name,
      subtitle: `${user.handle} · ${getTargetFollowerCount(FOLLOW_TARGET.USER, user.id, Number(user.followers || 0)).toLocaleString("fr-FR")} followers`,
      path: `/user/${user.id}`,
      popularity: getTargetFollowerCount(FOLLOW_TARGET.USER, user.id, Number(user.followers || 0)),
      timestamp: latestCommentTs,
    };
  }

  if (targetType === FOLLOW_TARGET.ATHLETE) {
    const athlete = getAthleteById(targetId);
    if (!athlete) return null;
    const events = getEventsForAthlete(athlete.id);
    return {
      id: `${targetType}-${targetId}`,
      targetType,
      targetId,
      title: athlete.name,
      subtitle: `${athlete.sport} · ${events.length} events`,
      path: `/athlete/${athlete.id}`,
      popularity: events.length * 32,
      timestamp: Math.max(...events.map((event) => toTimestamp(event.dateISO)), 0),
    };
  }

  if (targetType === FOLLOW_TARGET.TEAM) {
    const team = getTeamById(targetId);
    if (!team) return null;
    const events = getEventsForTeam(team.id);
    return {
      id: `${targetType}-${targetId}`,
      targetType,
      targetId,
      title: team.nameFull || team.name,
      subtitle: `${team.sport} · ${events.length} events`,
      path: `/team/${team.id}`,
      popularity: events.length * 40,
      timestamp: Math.max(...events.map((event) => toTimestamp(event.dateISO)), 0),
    };
  }

  if (targetType === FOLLOW_TARGET.LEAGUE) {
    const league = getLeagueById(targetId);
    if (!league) return null;
    return {
      id: `${targetType}-${targetId}`,
      targetType,
      targetId,
      title: league.title,
      subtitle: `${league.sport} · ${league.count} events`,
      path: `/league/${league.id}`,
      popularity: league.count * 24,
      timestamp: Math.max(...league.events.map((event) => toTimestamp(event.dateISO)), 0),
    };
  }

  if (targetType === FOLLOW_TARGET.LEAGUE_SEASON) {
    const season = getLeagueSeasonById(targetId);
    if (!season) return null;
    return {
      id: `${targetType}-${targetId}`,
      targetType,
      targetId,
      title: season.title,
      subtitle: `${season.count} events · ${season.dateRangeLabel}`,
      path: `/league-season/${season.id}`,
      popularity: season.count * 20,
      timestamp: Math.max(...season.events.map((event) => toTimestamp(event.dateISO)), 0),
    };
  }

  if (targetType === FOLLOW_TARGET.LIST) {
    const list = getListById(targetId);
    if (!list) return null;
    return {
      id: `${targetType}-${targetId}`,
      targetType,
      targetId,
      title: list.title,
      subtitle: `${list.sport} · ${Number(list.likes || 0).toLocaleString("fr-FR")} likes`,
      path: `/list/${list.id}`,
      popularity: Number(list.likes || 0),
      timestamp: 0,
    };
  }

  return null;
}

function getFeedEmptyStateText(request) {
  if (request.scope === FEED_SCOPE.OBJECT) {
    return "Aucun contenu lie a cet objet.";
  }
  if (request.mode === FEED_MODE.FAVORITES) {
    return "Aucun favori pour le moment.";
  }
  if (request.mode === FEED_MODE.ACTIVITY_RECENT || request.mode === FEED_MODE.ACTIVITY_POPULAR) {
    return "Aucune activite pour le moment.";
  }
  return "Aucun contenu a afficher pour le moment.";
}

function FeedPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [optionalTabs, setOptionalTabs] = useState(() => loadOptionalFeedTabs());
  const [, setCommentsVersion] = useState(0);
  const request = normalizeFeedRequest(searchParams);

  if (request.scope === FEED_SCOPE.OBJECT) {
    const objectMeta = resolveObjectMeta(request.targetType, request.targetId);
    const title = objectMeta?.title || "Feed objet";
    const subtitle = `${objectMeta?.subtitle || "Objet"} · ${request.mode === FEED_MODE.POPULAR ? "mode Populaires" : "mode Chrono"}`;
    return (
      <section className="feed-page is-editorial">
        <div className="discover-head">
          <h1 className="typo-h1">{title}</h1>
          <p className="lede typo-body">{subtitle}</p>
        </div>
        <ObjectFeedScopePanel
          targetType={request.targetType}
          targetId={request.targetId}
          watchlistIds={watchlistIds}
          onToggleWatchlist={onToggleWatchlist}
          title={title}
          subtitle={subtitle}
          mode={request.mode}
          onModeChange={(nextMode) => {
            navigate(
              buildFeedLink({
                scope: FEED_SCOPE.OBJECT,
                mode: nextMode,
                targetType: request.targetType,
                targetId: request.targetId,
              }),
            );
          }}
        />
      </section>
    );
  }

  const allComments = getAllComments();

  const watchlistSet = new Set(watchlistIds);
  const watchlistEvents = getAllEvents().filter((event) => watchlistSet.has(event.id));
  const likedEntries = getLikedComments({ limit: 28 });
  const followedTargetEntries = getAllFollowedTargets();
  const followedUserIds = new Set(
    followedTargetEntries
      .filter((entry) => entry.targetType === FOLLOW_TARGET.USER)
      .map((entry) => entry.targetId),
  );
  const followedListIds = new Set(
    followedTargetEntries
      .filter((entry) => entry.targetType === FOLLOW_TARGET.LIST)
      .map((entry) => entry.targetId),
  );
  const followedTargets = followedTargetEntries
    .map((entry) => buildFollowedTargetPreview(entry, allComments))
    .filter(Boolean);

  const topLists = getCuratedLists({ sportFilter: "Tous", query: "" })
    .slice()
    .sort((a, b) => {
      const leftScore = Number(a.likes || 0) + (followedListIds.has(a.id) ? 500 : 0);
      const rightScore = Number(b.likes || 0) + (followedListIds.has(b.id) ? 500 : 0);
      return rightScore - leftScore;
    });

  const isObjectScope = false;

  const currentOptionalTabId = isObjectScope
    ? buildOptionalFeedTabId(request.targetType, request.targetId)
    : "";
  const isCurrentObjectPinned = isObjectScope
    ? optionalTabs.some((tab) => tab.id === currentOptionalTabId)
    : false;

  useEffect(() => {
    if (!isObjectScope) return;
    const currentTab = getOptionalFeedTabForTarget(request.targetType, request.targetId);
    if (!currentTab || currentTab.mode === request.mode) return;
    setOptionalTabs(setOptionalFeedTabMode(currentTab.id, request.mode));
  }, [isObjectScope, request.mode, request.targetId, request.targetType]);

  const sortedComments = allComments
    .slice()
    .sort((a, b) => {
      if (request.mode === FEED_MODE.RECENT || request.mode === FEED_MODE.ACTIVITY_RECENT) {
        return toTimestamp(b.createdAt) - toTimestamp(a.createdAt);
      }
      const leftIsFollowed = a.userId ? followedUserIds.has(a.userId) : false;
      const rightIsFollowed = b.userId ? followedUserIds.has(b.userId) : false;
      const leftScore = Number(a.totalLikes || 0) * 20
        + (leftIsFollowed ? 420 : 0)
        + (toTimestamp(a.createdAt) / 100000000000);
      const rightScore = Number(b.totalLikes || 0) * 20
        + (rightIsFollowed ? 420 : 0)
        + (toTimestamp(b.createdAt) / 100000000000);
      const signalDiff = rightScore - leftScore;
      if (signalDiff !== 0) return signalDiff;
      return toTimestamp(b.createdAt) - toTimestamp(a.createdAt);
    });

  const myTopComments = request.mode === FEED_MODE.RECENT
    ? sortedComments.slice(0, 20)
    : sortedComments.slice(0, 16);

  const allEventsByScore = getAllEvents()
    .slice()
    .sort((a, b) => {
      const scoreDiff = Number(b.communityScore || 0) - Number(a.communityScore || 0);
      if (scoreDiff !== 0) return scoreDiff;
      return sortByDateDesc(a, b);
    });

  const userCommentCountById = allComments.reduce((acc, comment) => {
    if (!comment.userId) return acc;
    acc[comment.userId] = (acc[comment.userId] || 0) + 1;
    return acc;
  }, {});

  const allUsers = getUsers({ query: "" })
    .slice()
    .sort((a, b) => {
      const leftScore = Number(a.followers || 0) + (Number(userCommentCountById[a.id] || 0) * 120);
      const rightScore = Number(b.followers || 0) + (Number(userCommentCountById[b.id] || 0) * 120);
      return rightScore - leftScore;
    });

  const suggestedUsers = allUsers.filter((user) => !followedUserIds.has(user.id));

  const modeTabs = isObjectScope
    ? [
      { id: FEED_MODE.RECENT, label: "Chrono" },
      { id: FEED_MODE.POPULAR, label: "Populaires" },
    ]
    : [
      { id: FEED_MODE.FOR_YOU, label: "Pour toi" },
      { id: FEED_MODE.RECENT, label: "Recent" },
      { id: FEED_MODE.FAVORITES, label: "Mes favoris" },
      { id: FEED_MODE.ACTIVITY_RECENT, label: "Mes activites" },
      { id: FEED_MODE.ACTIVITY_POPULAR, label: "Activites populaires" },
    ];

  const objectMeta = isObjectScope
    ? resolveObjectMeta(request.targetType, request.targetId)
    : null;

  const objectComments = isObjectScope
    ? getCommentsForTarget(request.targetType, request.targetId)
      .slice()
      .sort((a, b) => {
        if (request.mode === FEED_MODE.POPULAR) {
          const likesDiff = Number(b.totalLikes || 0) - Number(a.totalLikes || 0);
          if (likesDiff !== 0) return likesDiff;
        }
        return toTimestamp(b.createdAt) - toTimestamp(a.createdAt);
      })
    : [];

  const objectEvents = isObjectScope
    ? resolveObjectEvents(request.targetType, request.targetId, allComments)
      .slice()
      .sort((a, b) => {
        if (request.mode === FEED_MODE.POPULAR) {
          const scoreDiff = Number(b.communityScore || 0) - Number(a.communityScore || 0);
          if (scoreDiff !== 0) return scoreDiff;
        }
        return sortByDateDesc(a, b);
      })
    : [];

  const objectLists = isObjectScope
    ? resolveObjectLists(request.targetType, request.targetId, objectEvents)
      .slice()
      .sort((a, b) => {
        if (request.mode === FEED_MODE.POPULAR) {
          const likesDiff = Number(b.likes || 0) - Number(a.likes || 0);
          if (likesDiff !== 0) return likesDiff;
        }
        return String(a.title || "").localeCompare(String(b.title || ""));
      })
    : [];

  const objectUsers = isObjectScope
    ? resolveObjectProfiles(request.targetType, request.targetId, objectComments)
      .slice()
      .sort((a, b) => {
        if (request.mode === FEED_MODE.POPULAR) {
          const followersDiff = Number(b.followers || 0) - Number(a.followers || 0);
          if (followersDiff !== 0) return followersDiff;
        }
        return String(a.name || "").localeCompare(String(b.name || ""));
      })
    : [];

  const activityItems = [
    ...likedEntries.map((entry) => ({
      id: `activity-like-${entry.id}`,
      kind: entry.kind === "reply" ? "Reponse likee" : "Commentaire like",
      label: entry.item.note,
      path: entry.eventId ? `/event/${entry.eventId}` : "/feed",
      timestamp: toTimestamp(entry.item?.createdAt),
      popularity: Number(entry.item?.totalLikes || 0),
    })),
    ...watchlistEvents.map((event) => ({
      id: `activity-watchlist-${event.id}`,
      kind: "Ajout watchlist",
      label: event.title,
      path: `/event/${event.id}`,
      timestamp: toTimestamp(event.dateISO),
      popularity: Number(event.communityScore || 0),
    })),
    ...followedTargets.map((target) => ({
      id: `activity-follow-${target.id}`,
      kind: "Objet suivi",
      label: target.title,
      path: target.path,
      timestamp: Number(target.timestamp || 0),
      popularity: Number(target.popularity || 0),
      targetType: String(target.targetType || "").trim(),
      targetId: String(target.targetId || "").trim(),
    })),
  ]
    .sort((a, b) => {
      if (request.mode === FEED_MODE.ACTIVITY_POPULAR) {
        const popDiff = Number(b.popularity || 0) - Number(a.popularity || 0);
        if (popDiff !== 0) return popDiff;
      }
      return Number(b.timestamp || 0) - Number(a.timestamp || 0);
    });

  const streamRawEntries = buildRawFeedEntries({
    request,
    datasets: {
      myTopComments,
      allEventsByScore,
      topLists,
      suggestedUsers,
      allActivities: getAllActivities(),
      likedEntries,
      watchlistEvents,
      followedTargets,
      activityItems,
      objectMeta,
      objectComments,
      objectEvents,
      objectLists,
      objectUsers,
      followedListIds,
    },
  });

  const streamEntries = groupCardRows(
    composeBalancedFeedStream(streamRawEntries, { lookahead: 6 }),
    3,
  );

  const title = isObjectScope
    ? objectMeta?.title || "Feed objet"
    : "Mon Feed";

  const subtitle = isObjectScope
    ? `${objectMeta?.subtitle || "Objet"} · ${request.mode === FEED_MODE.POPULAR ? "mode Populaires" : "mode Chrono"}`
    : (
      request.mode === FEED_MODE.FAVORITES
        ? "Likes, suivis et watchlist."
        : request.mode === FEED_MODE.ACTIVITY_RECENT
          ? "Historique recent de tes actions."
          : request.mode === FEED_MODE.ACTIVITY_POPULAR
            ? "Actions triees par impact social."
            : request.mode === FEED_MODE.RECENT
              ? "Flux chronologique global."
              : "Flux personnalise social + popularite."
    );

  function handleAddCurrentObjectFeed() {
    if (!isObjectScope) return;
    const result = upsertOptionalFeedTab({
      targetType: request.targetType,
      targetId: request.targetId,
      mode: request.mode,
      label: objectMeta?.subtitle || "",
    });
    setOptionalTabs(result.tabs);
    if (result.error === "limit_reached") {
      window.alert(`Maximum ${FEED_OPTIONAL_TABS_MAX} feeds complementaires.`);
    }
  }

  function handleRemoveOptionalTab(tabId) {
    const nextTabs = removeOptionalFeedTab(tabId);
    setOptionalTabs(nextTabs);
    if (tabId && tabId === currentOptionalTabId) {
      navigate(buildFeedLink({ scope: FEED_SCOPE.MY, mode: FEED_MODE.FOR_YOU }), { replace: true });
    }
  }

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

      if (safeType === COMMENT_TARGET.USER || safeType === FOLLOW_TARGET.USER) {
        const user = getUserById(safeId);
        return user ? <UserCard user={user} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.ATHLETE || safeType === FOLLOW_TARGET.ATHLETE) {
        const athlete = getAthleteById(safeId);
        return athlete ? <PlayerCard athlete={athlete} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.TEAM || safeType === FOLLOW_TARGET.TEAM) {
        const team = getTeamById(safeId);
        return team ? <TeamCard team={team} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.LEAGUE || safeType === FOLLOW_TARGET.LEAGUE) {
        const league = getLeagueById(safeId);
        return league ? <LeagueCard league={league} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.LEAGUE_SEASON || safeType === FOLLOW_TARGET.LEAGUE_SEASON) {
        const season = getLeagueSeasonById(safeId);
        return season ? <LeagueSeasonCard season={season} size="small" showTags={false} /> : null;
      }
      if (safeType === COMMENT_TARGET.LIST || safeType === FOLLOW_TARGET.LIST) {
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
      return (
        <RankingCard
          list={entry.payload?.list}
          className={extraClass}
          maxPreview={4}
        />
      );
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
      if (entry.subtype === "reply") {
        return renderReplyCard(entry);
      }
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

  return (
    <section className="feed-page is-editorial">
      <div className="discover-head">
        <h1 className="typo-h1">{title}</h1>
        <p className="lede typo-body">{subtitle}</p>
      </div>

      <section className="related-section">
        <div className="filter-row">
          {modeTabs.map((tab) => (
            <Link
              key={tab.id}
              className={`filter-btn ${request.mode === tab.id ? "is-active" : ""}`}
              to={buildFeedLink({
                scope: request.scope,
                mode: tab.id,
                targetType: request.targetType,
                targetId: request.targetId,
              })}
            >
              {tab.label}
            </Link>
          ))}
          {isObjectScope ? (
            <>
              <button
                className={`filter-btn ${isCurrentObjectPinned ? "is-active" : ""}`}
                onClick={() => {
                  if (isCurrentObjectPinned) {
                    handleRemoveOptionalTab(currentOptionalTabId);
                    return;
                  }
                  handleAddCurrentObjectFeed();
                }}
                type="button"
              >
                {isCurrentObjectPinned ? "Retirer de mes feeds" : "Ajouter a mes feeds"}
              </button>
            </>
          ) : null}
        </div>

        {optionalTabs.length ? (
          <div className="feed-optional-row-react">
            <span className="event-meta typo-meta">Complements:</span>
            {optionalTabs.map((tab) => {
              const isActive = isObjectScope && tab.id === currentOptionalTabId;
              return (
                <span key={tab.id} className={`feed-optional-chip-react ${isActive ? "is-active" : ""}`}>
                  <Link
                    className={`filter-btn feed-optional-open-react ${isActive ? "is-active" : ""}`}
                    to={buildFeedLink({
                      scope: FEED_SCOPE.OBJECT,
                      mode: tab.mode,
                      targetType: tab.targetType,
                      targetId: tab.targetId,
                    })}
                    title={tab.label}
                  >
                    {tab.label}
                  </Link>
                  <button
                    className="feed-optional-remove-react"
                    onClick={(event) => {
                      event.preventDefault();
                      handleRemoveOptionalTab(tab.id);
                    }}
                    type="button"
                    aria-label={`Supprimer ${tab.label}`}
                    title="Supprimer ce feed complementaire"
                  >
                    x
                  </button>
                </span>
              );
            })}
          </div>
        ) : null}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Flux</h2>
          <span>{streamEntries.length}</span>
        </div>

        {streamEntries.length ? (
          <div className={`feed-stream-shell ${isObjectScope ? "object-feed-stream-shell" : ""}`.trim()}>
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
            <p className="event-meta">{getFeedEmptyStateText(request)}</p>
          </article>
        )}
      </section>
    </section>
  );
}

export default FeedPage;
