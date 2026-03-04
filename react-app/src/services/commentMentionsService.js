import {
  getAthletes,
  getAthleteById,
  getAthletesForEvent,
  getEventsForAthlete,
  getEventsForTeam,
  getTeamById,
  getTeams,
  getTeamsForEvent,
  getUserById,
} from "./catalogService";
import { getEventById } from "./eventsService";
import { matchesUserIdentity } from "./profileService";

const COMMENT_MENTION_TYPE = {
  ATHLETE: "athlete",
  TEAM: "team",
};

const VALID_MENTION_TYPES = new Set(Object.values(COMMENT_MENTION_TYPE));

function normalizeType(value) {
  const safeValue = String(value || "").trim().toLowerCase();
  return VALID_MENTION_TYPES.has(safeValue) ? safeValue : "";
}

function normalizeId(value) {
  return String(value || "").trim();
}

function normalizeLabel(value) {
  return String(value || "").trim().replace(/^@+/, "");
}

function buildToken(label) {
  const safeLabel = normalizeLabel(label);
  return safeLabel ? `@${safeLabel}` : "";
}

function isWordishCharacter(value) {
  return /[0-9A-Za-z_]/.test(String(value || ""));
}

function hasTokenBoundaryBefore(text, startIndex) {
  const previousChar = String(text || "").charAt(Math.max(0, startIndex - 1));
  if (!previousChar) return true;
  return !isWordishCharacter(previousChar);
}

function hasTokenBoundaryAfter(text, startIndex, token) {
  const nextChar = String(text || "").charAt(startIndex + token.length);
  if (!nextChar) return true;
  return !isWordishCharacter(nextChar);
}

function findMentionMatchIndex(text, mention, startFrom = 0) {
  const safeText = String(text || "");
  const token = buildToken(mention?.label);
  if (!token) return -1;

  let cursor = Math.max(0, Number(startFrom) || 0);
  while (cursor < safeText.length) {
    const index = safeText.indexOf(token, cursor);
    if (index < 0) return -1;
    if (hasTokenBoundaryBefore(safeText, index) && hasTokenBoundaryAfter(safeText, index, token)) {
      return index;
    }
    cursor = index + 1;
  }
  return -1;
}

function collectCommentMentions(comment = null, { includeReplies = true } = {}) {
  const source = [];
  if (comment?.mentions) {
    source.push(...(Array.isArray(comment.mentions) ? comment.mentions : []));
  }
  if (includeReplies) {
    const replies = Array.isArray(comment?.replies) ? comment.replies : [];
    replies.forEach((reply) => {
      if (Array.isArray(reply?.mentions)) {
        source.push(...reply.mentions);
      }
    });
  }
  return normalizeCommentMentions(source);
}

function getCommentReplies(comment = null) {
  return Array.isArray(comment?.replies) ? comment.replies : [];
}

function getUniqueReplyIds(comment = null, predicate = () => false) {
  const replyIds = new Set();
  getCommentReplies(comment).forEach((reply) => {
    if (!predicate(reply)) return;
    const replyId = normalizeId(reply?.id);
    if (replyId) replyIds.add(replyId);
  });
  return Array.from(replyIds);
}

function buildAthleteMeta(athlete) {
  return [athlete?.sport, athlete?.country || athlete?.role]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(" · ");
}

function buildTeamMeta(team) {
  return [team?.sport, team?.city]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(" · ");
}

function compareSuggestion(left, right, query) {
  const safeQuery = String(query || "").trim().toLowerCase();
  const leftLabel = String(left?.label || "").trim().toLowerCase();
  const rightLabel = String(right?.label || "").trim().toLowerCase();
  const leftStarts = safeQuery ? leftLabel.startsWith(safeQuery) : false;
  const rightStarts = safeQuery ? rightLabel.startsWith(safeQuery) : false;
  if (leftStarts !== rightStarts) {
    return leftStarts ? -1 : 1;
  }
  const leftContains = safeQuery ? leftLabel.includes(safeQuery) : false;
  const rightContains = safeQuery ? rightLabel.includes(safeQuery) : false;
  if (leftContains !== rightContains) {
    return leftContains ? -1 : 1;
  }
  const labelDiff = String(left?.label || "").localeCompare(String(right?.label || ""));
  if (labelDiff !== 0) return labelDiff;
  if (left?.type !== right?.type) {
    return left?.type === COMMENT_MENTION_TYPE.ATHLETE ? -1 : 1;
  }
  return 0;
}

export function normalizeCommentMention(raw) {
  if (!raw || typeof raw !== "object") return null;
  const type = normalizeType(raw.type);
  const id = normalizeId(raw.id);
  const label = normalizeLabel(raw.label);
  if (!type || !id || !label) return null;
  return {
    type,
    id,
    label,
  };
}

export function normalizeCommentMentions(list = []) {
  const map = new Map();
  (Array.isArray(list) ? list : []).forEach((entry) => {
    const mention = normalizeCommentMention(entry);
    if (!mention) return;
    const key = `${mention.type}:${mention.id}`;
    if (!map.has(key)) {
      map.set(key, mention);
    }
  });
  return Array.from(map.values());
}

export function buildCommentMentionSuggestions(query, { limit = 6 } = {}) {
  const safeQuery = String(query || "").trim();
  if (!safeQuery) return [];

  const athleteSuggestions = getAthletes({ query: safeQuery }).map((athlete) => ({
    type: COMMENT_MENTION_TYPE.ATHLETE,
    id: normalizeId(athlete?.id),
    label: String(athlete?.name || "").trim(),
    meta: buildAthleteMeta(athlete),
  }));
  const teamSuggestions = getTeams({ query: safeQuery }).map((team) => ({
    type: COMMENT_MENTION_TYPE.TEAM,
    id: normalizeId(team?.id),
    label: String(team?.nameFull || team?.name || "").trim(),
    meta: buildTeamMeta(team),
  }));

  return normalizeCommentMentions([...athleteSuggestions, ...teamSuggestions])
    .map((entry) => ({
      ...entry,
      meta: entry.type === COMMENT_MENTION_TYPE.ATHLETE
        ? buildAthleteMeta(getAthleteById(entry.id))
        : buildTeamMeta(getTeamById(entry.id)),
    }))
    .sort((left, right) => compareSuggestion(left, right, safeQuery))
    .slice(0, Math.max(1, Number(limit) || 6));
}

export function getCommentMentionQuery(text, caretIndex) {
  const safeText = String(text || "");
  const safeCaret = Math.max(0, Math.min(safeText.length, Number(caretIndex) || 0));
  let tokenStart = safeCaret;
  while (tokenStart > 0) {
    const previousChar = safeText.charAt(tokenStart - 1);
    if (/\s/.test(previousChar)) break;
    tokenStart -= 1;
  }
  if (safeText.charAt(tokenStart) !== "@") return null;

  let tokenEnd = tokenStart + 1;
  while (tokenEnd < safeText.length) {
    const nextChar = safeText.charAt(tokenEnd);
    if (/\s/.test(nextChar)) break;
    tokenEnd += 1;
  }
  if (tokenEnd <= tokenStart + 1) return null;

  return {
    start: tokenStart,
    end: tokenEnd,
    query: safeText.slice(tokenStart + 1, tokenEnd),
  };
}

export function insertCommentMention(text, selectionStart, selectionEnd, mention) {
  const safeText = String(text || "");
  const safeMention = normalizeCommentMention(mention);
  if (!safeMention) {
    return {
      text: safeText,
      selectionStart: Math.max(0, Number(selectionStart) || 0),
      selectionEnd: Math.max(0, Number(selectionEnd) || 0),
    };
  }

  const start = Math.max(0, Number(selectionStart) || 0);
  const end = Math.max(start, Number(selectionEnd) || start);
  const activeToken = getCommentMentionQuery(safeText, start);
  if (!activeToken) {
    return {
      text: safeText,
      selectionStart: start,
      selectionEnd: end,
    };
  }

  const mentionToken = buildToken(safeMention.label);
  const after = safeText.slice(activeToken.end);
  const shouldAppendSpace = after.length > 0 && !/^\s/.test(after);
  const replacement = shouldAppendSpace ? `${mentionToken} ` : mentionToken;
  const nextText = `${safeText.slice(0, activeToken.start)}${replacement}${after}`;
  const nextCaret = activeToken.start + replacement.length;

  return {
    text: nextText,
    selectionStart: nextCaret,
    selectionEnd: nextCaret,
  };
}

export function filterCommentMentionsForText(text, mentions = []) {
  const safeText = String(text || "");
  return normalizeCommentMentions(mentions).filter((mention) => (
    findMentionMatchIndex(safeText, mention) >= 0
  ));
}

export function doesMentionListIncludeTarget(mentions, targetType, targetId) {
  const safeType = normalizeType(targetType);
  const safeId = normalizeId(targetId);
  if (!safeType || !safeId) return false;
  return normalizeCommentMentions(mentions).some((mention) => (
    mention.type === safeType && mention.id === safeId
  ));
}

export function doesCommentOrReplyMentionTarget(comment, targetType, targetId) {
  if (!comment) return false;
  return doesMentionListIncludeTarget(collectCommentMentions(comment), targetType, targetId);
}

export function getReplyIdsMatchingTarget(comment, targetType, targetId) {
  const safeType = String(targetType || "").trim().toLowerCase();
  const safeId = normalizeId(targetId);
  if (!comment || !safeId) return [];

  if (safeType === COMMENT_MENTION_TYPE.ATHLETE || safeType === COMMENT_MENTION_TYPE.TEAM) {
    return getUniqueReplyIds(comment, (reply) => doesMentionListIncludeTarget(reply?.mentions, safeType, safeId));
  }

  if (safeType === "user") {
    const user = getUserById(safeId);
    return getUniqueReplyIds(comment, (reply) => {
      if (normalizeId(reply?.userId) === safeId) return true;
      return matchesUserIdentity(reply, user);
    });
  }

  return [];
}

export function getRelatedEventIdsForCommentMentions(mentions = []) {
  const eventIds = new Set();
  normalizeCommentMentions(mentions).forEach((mention) => {
    const relatedEvents = mention.type === COMMENT_MENTION_TYPE.ATHLETE
      ? getEventsForAthlete(mention.id)
      : getEventsForTeam(mention.id);
    relatedEvents.forEach((event) => {
      const safeId = normalizeId(event?.id);
      if (safeId) eventIds.add(safeId);
    });
  });
  return eventIds;
}

export function doesCommentMatchEventViaMentions(comment, eventId) {
  const safeEventId = normalizeId(eventId);
  if (!safeEventId || !comment) return false;
  const event = getEventById(safeEventId);
  if (!event) return false;

  const athleteIds = new Set(getAthletesForEvent(safeEventId).map((athlete) => normalizeId(athlete?.id)).filter(Boolean));
  const teamIds = new Set(getTeamsForEvent(safeEventId).map((team) => normalizeId(team?.id)).filter(Boolean));

  return collectCommentMentions(comment).some((mention) => {
    if (mention.type === COMMENT_MENTION_TYPE.ATHLETE) {
      return athleteIds.has(mention.id);
    }
    if (mention.type === COMMENT_MENTION_TYPE.TEAM) {
      return teamIds.has(mention.id);
    }
    return false;
  });
}

export function getReplyIdsMatchingEventViaMentions(comment, eventId) {
  const safeEventId = normalizeId(eventId);
  if (!safeEventId || !comment) return [];
  const event = getEventById(safeEventId);
  if (!event) return [];

  const athleteIds = new Set(getAthletesForEvent(safeEventId).map((athlete) => normalizeId(athlete?.id)).filter(Boolean));
  const teamIds = new Set(getTeamsForEvent(safeEventId).map((team) => normalizeId(team?.id)).filter(Boolean));

  return getUniqueReplyIds(comment, (reply) => normalizeCommentMentions(reply?.mentions).some((mention) => {
    if (mention.type === COMMENT_MENTION_TYPE.ATHLETE) {
      return athleteIds.has(mention.id);
    }
    if (mention.type === COMMENT_MENTION_TYPE.TEAM) {
      return teamIds.has(mention.id);
    }
    return false;
  }));
}

export function getCommentMentionPath(mention) {
  const safeMention = normalizeCommentMention(mention);
  if (!safeMention) return "";
  if (safeMention.type === COMMENT_MENTION_TYPE.ATHLETE) {
    return `/athlete/${safeMention.id}`;
  }
  if (safeMention.type === COMMENT_MENTION_TYPE.TEAM) {
    return `/team/${safeMention.id}`;
  }
  return "";
}

export function tokenizeCommentTextWithMentions(text, mentions = []) {
  const safeText = String(text || "");
  if (!safeText) return [];

  const candidates = normalizeCommentMentions(mentions)
    .map((mention) => ({
      mention,
      token: buildToken(mention.label),
    }))
    .filter((entry) => entry.token)
    .sort((left, right) => {
      if (right.token.length !== left.token.length) {
        return right.token.length - left.token.length;
      }
      return left.token.localeCompare(right.token);
    });

  if (!candidates.length) {
    return [{ type: "text", value: safeText }];
  }

  const parts = [];
  let cursor = 0;

  while (cursor < safeText.length) {
    let matched = null;
    for (const candidate of candidates) {
      if (!safeText.startsWith(candidate.token, cursor)) continue;
      if (!hasTokenBoundaryBefore(safeText, cursor)) continue;
      if (!hasTokenBoundaryAfter(safeText, cursor, candidate.token)) continue;
      matched = candidate;
      break;
    }

    if (!matched) {
      let nextCursor = cursor + 1;
      while (nextCursor < safeText.length) {
        const willMatch = candidates.some((candidate) => (
          safeText.startsWith(candidate.token, nextCursor)
          && hasTokenBoundaryBefore(safeText, nextCursor)
          && hasTokenBoundaryAfter(safeText, nextCursor, candidate.token)
        ));
        if (willMatch) break;
        nextCursor += 1;
      }
      parts.push({
        type: "text",
        value: safeText.slice(cursor, nextCursor),
      });
      cursor = nextCursor;
      continue;
    }

    parts.push({
      type: "mention",
      value: matched.token,
      mention: matched.mention,
    });
    cursor += matched.token.length;
  }

  return parts;
}
