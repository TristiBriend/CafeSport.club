import { getUserById } from "./catalogService";
import { FEED_ACTION_TYPE } from "./feedActionsService";

const FEED_SCOPE_OBJECT = "object";
const FEED_MODE_RECENT = "recent";
const FEED_MODE_FAVORITES = "favorites";
const FEED_MODE_ACTIVITY_RECENT = "activity-recent";
const FEED_MODE_ACTIVITY_POPULAR = "activity-popular";
const FEED_MODE_POPULAR = "popular";
const FEED_CONTENT_PROFILE_MIXED = "mixed";
const FEED_CONTENT_PROFILE_COMMENTS_ONLY = "comments-only";

const ORIGIN_LABELS = {
  "for-you-comment": "Discussion recommandee",
  "for-you-event": "Evenement recommande",
  "for-you-ranking": "Classement recommande",
  "for-you-profile": "Profil suggere",
  "for-you-activity": "Activite recente",
  "favorite-liked-comment": "Commentaire like",
  "favorite-liked-reply": "Reponse likee",
  "favorite-watchlist-event": "Watchlist",
  "favorite-followed-target": "Objet suivi",
  "activity-liked-comment": "Like commentaire",
  "activity-liked-reply": "Like reponse",
  "activity-card": "Activite",
  "object-meta": "Contexte objet",
  "object-comment": "Discussion objet",
  "object-event": "Evenement lie",
  "object-ranking": "Classement lie",
  "object-profile": "Profil lie",
  "action-watchlist-add": "Ajout watchlist",
  "action-follow-add": "Objet suivi",
  "action-like-comment": "Like commentaire",
  "action-like-reply": "Like reponse",
  "action-rate-event": "Note event",
};

const FEED_ACTION_WEIGHTS = {
  forYou: {
    [FEED_ACTION_TYPE.WATCHLIST_ADD]: 0.35,
    [FEED_ACTION_TYPE.FOLLOW_ADD]: 0.3,
    [FEED_ACTION_TYPE.LIKE_COMMENT]: 0.28,
    [FEED_ACTION_TYPE.LIKE_REPLY]: 0.26,
    [FEED_ACTION_TYPE.RATE_EVENT]: 0.4,
  },
  recent: {
    [FEED_ACTION_TYPE.WATCHLIST_ADD]: 0.36,
    [FEED_ACTION_TYPE.FOLLOW_ADD]: 0.34,
    [FEED_ACTION_TYPE.LIKE_COMMENT]: 0.32,
    [FEED_ACTION_TYPE.LIKE_REPLY]: 0.3,
    [FEED_ACTION_TYPE.RATE_EVENT]: 0.46,
  },
  favorites: {
    [FEED_ACTION_TYPE.WATCHLIST_ADD]: 0.42,
    [FEED_ACTION_TYPE.FOLLOW_ADD]: 0.4,
    [FEED_ACTION_TYPE.LIKE_COMMENT]: 0.34,
    [FEED_ACTION_TYPE.LIKE_REPLY]: 0.32,
    [FEED_ACTION_TYPE.RATE_EVENT]: 0.5,
  },
  activityRecent: {
    [FEED_ACTION_TYPE.WATCHLIST_ADD]: 0.8,
    [FEED_ACTION_TYPE.FOLLOW_ADD]: 0.8,
    [FEED_ACTION_TYPE.LIKE_COMMENT]: 0.9,
    [FEED_ACTION_TYPE.LIKE_REPLY]: 0.9,
    [FEED_ACTION_TYPE.RATE_EVENT]: 0.85,
  },
  activityPopular: {
    [FEED_ACTION_TYPE.WATCHLIST_ADD]: 0.76,
    [FEED_ACTION_TYPE.FOLLOW_ADD]: 0.76,
    [FEED_ACTION_TYPE.LIKE_COMMENT]: 0.86,
    [FEED_ACTION_TYPE.LIKE_REPLY]: 0.86,
    [FEED_ACTION_TYPE.RATE_EVENT]: 0.84,
  },
  object: {
    [FEED_ACTION_TYPE.WATCHLIST_ADD]: 0.52,
    [FEED_ACTION_TYPE.FOLLOW_ADD]: 0.5,
    [FEED_ACTION_TYPE.LIKE_COMMENT]: 0.58,
    [FEED_ACTION_TYPE.LIKE_REPLY]: 0.56,
    [FEED_ACTION_TYPE.RATE_EVENT]: 0.62,
  },
};

function toTimestamp(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function toNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function toStableRecentTimestamp(rawTimestamp, rank = 0) {
  const base = toNumber(rawTimestamp);
  if (base > 0) return base;
  return Date.now() - (rank * 60 * 60 * 1000);
}

function resolveModeScore(mode, { popularity = 0, timestamp = 0, rank = 0 } = {}) {
  const safePopularity = toNumber(popularity);
  const safeTimestamp = toNumber(timestamp);
  const rankPenalty = rank * 0.0001;
  if (mode === FEED_MODE_RECENT || mode === FEED_MODE_ACTIVITY_RECENT) {
    return safeTimestamp - rankPenalty;
  }
  if (mode === FEED_MODE_FAVORITES) {
    return (safeTimestamp * 10) + safePopularity - rankPenalty;
  }
  return (safePopularity * 1000000000) + safeTimestamp - rankPenalty;
}

function createEntityPayload({
  title = "",
  subtitle = "",
  path = "",
  pathLabel = "Ouvrir",
  lines = [],
} = {}) {
  return {
    title: String(title || "").trim(),
    subtitle: String(subtitle || "").trim(),
    path: String(path || "").trim(),
    pathLabel: String(pathLabel || "Ouvrir").trim(),
    lines: Array.isArray(lines)
      ? lines.map((line) => String(line || "").trim()).filter(Boolean)
      : [],
  };
}

function toModeWeightKey(mode = "", scope = "") {
  const safeMode = String(mode || "").trim().toLowerCase();
  const safeScope = String(scope || "").trim().toLowerCase();
  if (safeScope === FEED_SCOPE_OBJECT) return "object";
  if (safeMode === FEED_MODE_FAVORITES) return "favorites";
  if (safeMode === FEED_MODE_ACTIVITY_RECENT) return "activityRecent";
  if (safeMode === FEED_MODE_ACTIVITY_POPULAR) return "activityPopular";
  if (safeMode === FEED_MODE_RECENT) return "recent";
  return "forYou";
}

function resolveActionWeight({ mode = "", scope = "", actionType = "" } = {}) {
  const key = toModeWeightKey(mode, scope);
  const modeWeights = FEED_ACTION_WEIGHTS[key] || FEED_ACTION_WEIGHTS.forYou;
  const safeType = String(actionType || "").trim().toLowerCase();
  const weight = Number(modeWeights?.[safeType] || 0);
  return Number.isFinite(weight) && weight > 0 ? weight : 0;
}

function actionMatchesObjectTarget(action, targetType, targetId) {
  const safeTargetType = String(targetType || "").trim().toLowerCase();
  const safeTargetId = String(targetId || "").trim();
  if (!safeTargetType || !safeTargetId) return true;
  const actionType = String(action?.actionType || "").trim().toLowerCase();
  const actionTargetType = String(action?.targetType || "").trim().toLowerCase();
  const actionTargetId = String(action?.targetId || "").trim();

  if (safeTargetType === "event") {
    if (actionTargetType === "event" && actionTargetId === safeTargetId) return true;
    const eventId = String(action?.meta?.eventId || "").trim();
    if ((actionType === FEED_ACTION_TYPE.LIKE_COMMENT || actionType === FEED_ACTION_TYPE.LIKE_REPLY) && eventId) {
      return eventId === safeTargetId;
    }
    return false;
  }

  return actionTargetType === safeTargetType && actionTargetId === safeTargetId;
}

function buildActionEntries({ mode = "", scope = "", request = {}, datasets = {} } = {}) {
  const feedActions = Array.isArray(datasets.feedActions) ? datasets.feedActions : [];
  const entries = [];

  feedActions.forEach((action, index) => {
    const actionType = String(action?.actionType || "").trim().toLowerCase();
    if (!actionType) return;
    if (!actionMatchesObjectTarget(action, request?.targetType, request?.targetId)) return;
    const weight = resolveActionWeight({ mode, scope, actionType });
    if (!weight) return;

    const timestamp = toStableRecentTimestamp(toTimestamp(action?.updatedAt || action?.createdAt), index);
    const popularity = actionType === FEED_ACTION_TYPE.RATE_EVENT
      ? toNumber(action?.meta?.score || 0)
      : toNumber(action?.meta?.popularity || 55);
    const weightedScore = resolveModeScore(mode, {
      popularity,
      timestamp,
      rank: index,
    }) * weight;

    if (actionType === FEED_ACTION_TYPE.LIKE_COMMENT && action?.resolvedComment) {
      entries.push({
        id: `action-${action.id}`,
        type: "comment",
        subtype: "comment",
        modeScore: weightedScore,
        timestamp,
        originType: "action-like-comment",
        payload: {
          comment: action.resolvedComment,
        },
      });
      return;
    }

    if (actionType === FEED_ACTION_TYPE.LIKE_REPLY && action?.resolvedReply) {
      entries.push({
        id: `action-${action.id}`,
        type: "comment",
        subtype: "reply",
        modeScore: weightedScore,
        timestamp,
        originType: "action-like-reply",
        payload: {
          reply: action.resolvedReply,
          comment: action.resolvedParentComment || null,
          eventId: String(action?.meta?.eventId || "").trim(),
        },
      });
      return;
    }

    if ((actionType === FEED_ACTION_TYPE.WATCHLIST_ADD || actionType === FEED_ACTION_TYPE.RATE_EVENT) && action?.resolvedEvent) {
      entries.push({
        id: `action-${action.id}`,
        type: "card",
        subtype: "event",
        modeScore: weightedScore,
        timestamp,
        originType: actionType === FEED_ACTION_TYPE.RATE_EVENT ? "action-rate-event" : "action-watchlist-add",
        payload: {
          event: action.resolvedEvent,
        },
      });
      return;
    }

    entries.push({
      id: `action-${action.id}`,
      type: "card",
      subtype: "activity",
      modeScore: weightedScore,
      timestamp,
      originType: actionType === FEED_ACTION_TYPE.FOLLOW_ADD
        ? "action-follow-add"
        : (actionType === FEED_ACTION_TYPE.RATE_EVENT
          ? "action-rate-event"
          : (actionType === FEED_ACTION_TYPE.LIKE_COMMENT
            ? "action-like-comment"
            : (actionType === FEED_ACTION_TYPE.LIKE_REPLY
              ? "action-like-reply"
              : "action-watchlist-add"))),
      payload: {
        targetType: String(action?.targetType || "").trim(),
        targetId: String(action?.targetId || "").trim(),
        entity: createEntityPayload({
          title: String(action?.displayTitle || "").trim() || "Action",
          subtitle: String(action?.displaySubtitle || "").trim() || "",
          path: String(action?.displayPath || "").trim() || "/feed",
          lines: actionType === FEED_ACTION_TYPE.RATE_EVENT && Number(action?.meta?.score || 0) > 0
            ? [`Ma note: ${Math.round(Number(action.meta.score || 0))}/100`]
            : [],
        }),
      },
    });
  });

  return entries;
}

function buildForYouEntries(mode, datasets) {
  const commentLimit = mode === FEED_MODE_RECENT ? 20 : 16;
  const eventLimit = mode === FEED_MODE_RECENT ? 10 : 8;
  const rankingLimit = mode === FEED_MODE_RECENT ? 8 : 6;
  const profileLimit = mode === FEED_MODE_RECENT ? 8 : 6;
  const activityLimit = mode === FEED_MODE_RECENT ? 10 : 8;

  const myTopComments = Array.isArray(datasets.myTopComments) ? datasets.myTopComments : [];
  const allEventsByScore = Array.isArray(datasets.allEventsByScore) ? datasets.allEventsByScore : [];
  const topLists = Array.isArray(datasets.topLists) ? datasets.topLists : [];
  const suggestedUsers = Array.isArray(datasets.suggestedUsers) ? datasets.suggestedUsers : [];
  const allActivities = Array.isArray(datasets.allActivities) ? datasets.allActivities : [];
  const followedListIds = datasets.followedListIds instanceof Set ? datasets.followedListIds : new Set();
  const entries = [];
  const actionEntries = buildActionEntries({
    mode,
    scope: "my",
    request: { scope: "my" },
    datasets,
  });

  myTopComments.slice(0, commentLimit).forEach((comment, index) => {
    const timestamp = toStableRecentTimestamp(toTimestamp(comment?.createdAt), index);
    entries.push({
      id: `for-you-comment-${comment.id}`,
      type: "comment",
      subtype: "comment",
      modeScore: resolveModeScore(mode, {
        popularity: toNumber(comment?.totalLikes || comment?.likes),
        timestamp,
        rank: index,
      }),
      timestamp,
      originType: "for-you-comment",
      payload: {
        comment,
      },
    });
  });

  allEventsByScore.slice(0, eventLimit).forEach((event, index) => {
    const timestamp = toStableRecentTimestamp(
      toTimestamp(event?.dateISO || event?.createdAt),
      index,
    );
    entries.push({
      id: `for-you-event-${event.id}`,
      type: "card",
      subtype: "event",
      modeScore: resolveModeScore(mode, {
        popularity: toNumber(event?.communityScore),
        timestamp,
        rank: index,
      }),
      timestamp,
      originType: "for-you-event",
      payload: {
        event,
      },
    });
  });

  topLists.slice(0, rankingLimit).forEach((list, index) => {
    const timestamp = toStableRecentTimestamp(toTimestamp(list?.updatedAt || list?.createdAt), index + 1);
    entries.push({
      id: `for-you-ranking-${list.id}`,
      type: "card",
      subtype: "ranking",
      modeScore: resolveModeScore(mode, {
        popularity: toNumber(list?.likes),
        timestamp,
        rank: index,
      }),
      timestamp,
      originType: "for-you-ranking",
      payload: {
        list,
        className: followedListIds.has(list.id) ? "is-followed-list" : "",
      },
    });
  });

  suggestedUsers.slice(0, profileLimit).forEach((user, index) => {
    const timestamp = toStableRecentTimestamp(
      toTimestamp(user?.updatedAt || user?.createdAt),
      index + 2,
    );
    entries.push({
      id: `for-you-profile-${user.id}`,
      type: "card",
      subtype: "profile",
      modeScore: resolveModeScore(mode, {
        popularity: toNumber(user?.followers),
        timestamp,
        rank: index,
      }),
      timestamp,
      originType: "for-you-profile",
      payload: {
        user,
        entity: createEntityPayload({
          title: user?.name || "Profil",
          subtitle: user?.handle || "",
          path: user?.id ? `/user/${user.id}` : "/users",
          lines: [`${toNumber(user?.followers).toLocaleString("fr-FR")} followers`],
        }),
      },
    });
  });

  allActivities.slice(0, activityLimit).forEach((activity, index) => {
    const user = getUserById(activity?.userId);
    const timestamp = toStableRecentTimestamp(
      toTimestamp(activity?.dateISO || activity?.createdAt),
      index,
    );
    entries.push({
      id: `for-you-activity-${activity.id}`,
      type: "card",
      subtype: "activity",
      modeScore: resolveModeScore(mode, {
        popularity: activity?.type === "list" ? 60 : 45,
        timestamp,
        rank: index,
      }),
      timestamp,
      originType: "for-you-activity",
      payload: {
        entity: createEntityPayload({
          title: user?.name || "Utilisateur",
          subtitle: String(activity?.label || ""),
          path: user?.id ? `/user/${user.id}` : "/feed",
          lines: [String(activity?.dateLabel || activity?.dateISO || activity?.date || "")],
        }),
      },
    });
  });

  return [...entries, ...actionEntries];
}

function buildFavoritesEntries(mode, datasets) {
  const entries = [];
  const actionEntries = buildActionEntries({
    mode,
    scope: "my",
    request: { scope: "my" },
    datasets,
  });
  return [...entries, ...actionEntries];
}

function buildActivityEntries(mode, datasets) {
  return buildActionEntries({
    mode,
    scope: "my",
    request: { scope: "my" },
    datasets,
  });
}

function buildObjectEntries(mode, datasets, contentProfile = FEED_CONTENT_PROFILE_MIXED) {
  const objectMeta = datasets.objectMeta || null;
  const objectComments = Array.isArray(datasets.objectComments) ? datasets.objectComments : [];
  const objectEvents = Array.isArray(datasets.objectEvents) ? datasets.objectEvents : [];
  const objectLists = Array.isArray(datasets.objectLists) ? datasets.objectLists : [];
  const objectUsers = Array.isArray(datasets.objectUsers) ? datasets.objectUsers : [];
  const commentsOnly = String(contentProfile || "").trim().toLowerCase() === FEED_CONTENT_PROFILE_COMMENTS_ONLY;
  const entries = [];
  const actionEntries = buildActionEntries({
    mode,
    scope: FEED_SCOPE_OBJECT,
    request: {
      scope: FEED_SCOPE_OBJECT,
      targetType: datasets?.objectMeta?.targetType || datasets?.request?.targetType || "",
      targetId: datasets?.objectMeta?.targetId || datasets?.request?.targetId || "",
    },
    datasets,
  });

  if (!commentsOnly && objectMeta) {
    entries.push({
      id: "object-meta-entry",
      type: "card",
      subtype: "object-meta",
      modeScore: Number.MAX_SAFE_INTEGER,
      timestamp: Date.now(),
      originType: "object-meta",
      payload: {
        entity: createEntityPayload({
          title: objectMeta?.subtitle || objectMeta?.title || "Objet",
          subtitle: "Feed contextualise sur cet objet.",
          path: objectMeta?.detailPath || "/feed",
          pathLabel: "Ouvrir la page detail",
        }),
      },
    });
  }

  objectComments.slice(0, 22).forEach((comment, index) => {
    const timestamp = toStableRecentTimestamp(toTimestamp(comment?.createdAt), index);
    entries.push({
      id: `object-comment-${comment.id}`,
      type: "comment",
      subtype: "comment",
      modeScore: resolveModeScore(mode, {
        popularity: toNumber(comment?.totalLikes || comment?.likes),
        timestamp,
        rank: index,
      }),
      timestamp,
      originType: "object-comment",
      payload: {
        comment,
      },
    });
  });

  if (commentsOnly) return [...entries, ...actionEntries];

  objectEvents.slice(0, 12).forEach((event, index) => {
    const timestamp = toStableRecentTimestamp(toTimestamp(event?.dateISO || event?.createdAt), index);
    entries.push({
      id: `object-event-${event.id}`,
      type: "card",
      subtype: "event",
      modeScore: resolveModeScore(mode, {
        popularity: toNumber(event?.communityScore),
        timestamp,
        rank: index,
      }),
      timestamp,
      originType: "object-event",
      payload: {
        event,
      },
    });
  });

  objectLists.slice(0, 10).forEach((list, index) => {
    const timestamp = toStableRecentTimestamp(toTimestamp(list?.updatedAt || list?.createdAt), index + 1);
    entries.push({
      id: `object-ranking-${list.id}`,
      type: "card",
      subtype: "ranking",
      modeScore: resolveModeScore(mode, {
        popularity: toNumber(list?.likes),
        timestamp,
        rank: index,
      }),
      timestamp,
      originType: "object-ranking",
      payload: {
        list,
      },
    });
  });

  objectUsers.slice(0, 10).forEach((user, index) => {
    const timestamp = toStableRecentTimestamp(toTimestamp(user?.updatedAt || user?.createdAt), index + 2);
    entries.push({
      id: `object-profile-${user.id}`,
      type: "card",
      subtype: "profile",
      modeScore: resolveModeScore(mode, {
        popularity: toNumber(user?.followers),
        timestamp,
        rank: index,
      }),
      timestamp,
      originType: "object-profile",
      payload: {
        user,
        entity: createEntityPayload({
          title: user?.name || "Profil",
          subtitle: user?.handle || "",
          path: user?.id ? `/user/${user.id}` : "/users",
          lines: [`${toNumber(user?.followers).toLocaleString("fr-FR")} followers`],
        }),
      },
    });
  });

  return [...entries, ...actionEntries];
}

export function buildRawFeedEntries(context = {}) {
  const request = context.request || {};
  const datasets = context.datasets || {};
  const scope = String(request.scope || "").trim().toLowerCase();
  const mode = String(request.mode || "").trim().toLowerCase();
  const contentProfile = String(request.contentProfile || FEED_CONTENT_PROFILE_MIXED).trim().toLowerCase();

  if (scope === FEED_SCOPE_OBJECT) {
    return buildObjectEntries(mode, {
      ...datasets,
      request,
    }, contentProfile);
  }

  if (mode === FEED_MODE_FAVORITES) {
    return buildFavoritesEntries(mode, datasets);
  }

  if (mode === FEED_MODE_ACTIVITY_RECENT || mode === FEED_MODE_ACTIVITY_POPULAR) {
    return buildActivityEntries(mode, datasets);
  }

  return buildForYouEntries(mode, datasets);
}

function resolveDynamicMaxRun(entries) {
  if (!entries.length) return 4;
  const cards = entries.filter((entry) => entry?.type === "card").length;
  const ratio = cards / entries.length;
  if (ratio >= 0.45) return 3;
  if (ratio <= 0.20) return 5;
  return 4;
}

export function composeBalancedFeedStream(entries = [], options = {}) {
  const lookahead = Math.max(1, Number(options.lookahead || 6));
  const cleaned = (Array.isArray(entries) ? entries : [])
    .filter((entry) => entry && (entry.type === "comment" || entry.type === "card"))
    .map((entry, index) => ({
      ...entry,
      __stableIndex: index,
      modeScore: toNumber(entry.modeScore),
      timestamp: toNumber(entry.timestamp),
    }));

  if (!cleaned.length) return [];

  const sorted = cleaned.slice().sort((left, right) => {
    if (right.modeScore !== left.modeScore) return right.modeScore - left.modeScore;
    if (right.timestamp !== left.timestamp) return right.timestamp - left.timestamp;
    return left.__stableIndex - right.__stableIndex;
  });

  const maxRun = resolveDynamicMaxRun(sorted);
  const pool = sorted.slice();
  const result = [];
  let currentRunType = "";
  let currentRunLength = 0;

  while (pool.length) {
    let pickIndex = 0;
    const candidate = pool[0];
    if (candidate && currentRunType && candidate.type === currentRunType && currentRunLength >= maxRun) {
      const oppositeType = currentRunType === "card" ? "comment" : "card";
      const boundedIndex = pool
        .slice(1, lookahead + 1)
        .findIndex((entry) => entry.type === oppositeType);
      if (boundedIndex >= 0) {
        pickIndex = boundedIndex + 1;
      }
    }

    const [picked] = pool.splice(pickIndex, 1);
    if (!picked) continue;
    result.push(picked);
    if (picked.type === currentRunType) {
      currentRunLength += 1;
    } else {
      currentRunType = picked.type;
      currentRunLength = 1;
    }
  }

  return result.map(({ __stableIndex, ...entry }) => entry);
}

function flushCardChunk(buffer, output, rowSize) {
  if (!buffer.length) return;
  let rowIndex = 0;
  while (rowIndex < buffer.length) {
    const chunk = buffer.slice(rowIndex, rowIndex + rowSize);
    const first = chunk[0];
    output.push({
      id: `card-row-${first?.id || rowIndex}-${output.length}`,
      type: "card",
      subtype: "card-row",
      modeScore: Math.max(...chunk.map((item) => toNumber(item.modeScore)), 0),
      timestamp: Math.max(...chunk.map((item) => toNumber(item.timestamp)), 0),
      originType: first?.originType || "for-you-event",
      payload: {
        items: chunk,
      },
    });
    rowIndex += rowSize;
  }
}

export function groupCardRows(entries = [], rowSize = 3) {
  const safeRowSize = Math.max(1, Number(rowSize || 3));
  const output = [];
  let cardBuffer = [];

  (Array.isArray(entries) ? entries : []).forEach((entry) => {
    const isPlainCard = entry?.type === "card" && entry?.subtype !== "card-row";
    if (isPlainCard) {
      cardBuffer.push(entry);
      return;
    }
    flushCardChunk(cardBuffer, output, safeRowSize);
    cardBuffer = [];
    output.push(entry);
  });

  flushCardChunk(cardBuffer, output, safeRowSize);
  return output;
}

function formatTimestamp(timestamp) {
  const safeTimestamp = toNumber(timestamp);
  if (!safeTimestamp) return "";
  const date = new Date(safeTimestamp);
  if (Number.isNaN(date.getTime())) return "";
  const datePart = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} · ${timePart}`;
}

export function buildStreamMeta(entry) {
  const safeEntry = entry || {};
  const timestampLabel = formatTimestamp(safeEntry.timestamp);
  const originLabel = ORIGIN_LABELS[safeEntry.originType] || "Recommande";

  if (timestampLabel) {
    return {
      leftLabel: timestampLabel,
      leftSubLabel: originLabel,
    };
  }

  return {
    leftLabel: originLabel,
    leftSubLabel: "",
  };
}
