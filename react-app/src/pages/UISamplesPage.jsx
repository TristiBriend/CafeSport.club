import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CalendarPeriodSelector from "../components/CalendarPeriodSelector";
import CalendarPeriodRangeSelector from "../components/CalendarPeriodRangeSelector";
import CommentCard from "../components/CommentCard";
import ConfirmDialog from "../components/ConfirmDialog";
import EventCard from "../components/EventCard";
import FriendnotesPanel from "../components/FriendnotesPanel";
import LeagueCard from "../components/LeagueCard";
import LeagueSeasonCard from "../components/LeagueSeasonCard";
import ObjectSocialPanel from "../components/ObjectSocialPanel";
import ObjectTagsWidget from "../components/ObjectTagsWidget";
import PlayerCard from "../components/PlayerCard";
import ProfileTopEventsSection from "../components/ProfileTopEventsSection";
import RankingCard from "../components/RankingCard";
import RankingEditorDialog from "../components/RankingEditorDialog";
import ScoreBadge from "../components/ScoreBadge";
import ScoreSliderField from "../components/ScoreSliderField";
import TeamCard from "../components/TeamCard";
import UserCard from "../components/UserCard";
import { buildAddWatchlistFabButton } from "../components/WatchlistFabButton";
import { buildUserFollowFabButton } from "../components/UserFollowFabButton";
import SelectField from "../components/SelectField";
import {
  getAthletes,
  getCuratedLists,
  getTeamsForEvent,
  getTeams,
  getUsers,
} from "../services/catalogService";
import {
  COMMENT_MODE,
  COMMENT_TARGET,
  createCommentReply,
  createEventComment,
  deleteComment,
  deleteCommentReply,
  getAllComments,
  getCommentDateLabel,
  getCommentModeLabel,
  getEventComments,
  isReviewAllowedTarget,
  toggleCommentLike,
  toggleReplyLike,
  updateComment,
  updateCommentReply,
} from "../services/commentsService";
import { getAllEvents } from "../services/eventsService";
import { getLeagueById, getLeagues } from "../services/leaguesService";
import { isUpcomingEvent } from "../services/ratingsService";

const UI_NAV_ITEMS = [
  { href: "#ui-legend", label: "Legende" },
  { href: "#ui-base", label: "UI de base" },
  { href: "#ui-text", label: "Texte" },
  { href: "#ui-reuse", label: "Composants" },
  { href: "#ui-cards", label: "Cards" },
  { href: "#ui-comments", label: "Comments" },
  { href: "#ui-social", label: "Social" },
  { href: "#ui-colors", label: "Palette" },
  { href: "#ui-sanity", label: "Data sanity" },
];

const EVENT_CARD_SIZE_PRESETS = ["large", "medium", "small", "miniature"];

const COMPONENT_LEGENDS = [
  {
    name: "SiteHeader",
    props: [
      "watchlistCount?: number",
      "Usage: <SiteHeader watchlistCount={watchlistIds.length} />",
    ],
  },
  {
    name: "SiteFooter",
    props: [
      "watchlistCount?: number",
      "Usage: <SiteFooter watchlistCount={watchlistIds.length} />",
    ],
  },
  {
    name: "CalendarPeriodSelector",
    props: [
      "baseDate: Date (required)",
      "onChange: (nextDate) => void (required)",
      "summary?: string",
      "className?: string",
      "Usage: <CalendarPeriodSelector baseDate={date} onChange={setDate} summary='12 evenements' />",
    ],
  },
  {
    name: "CalendarPeriodRangeSelector",
    props: [
      "inputType?: month|date (rendu visuel mois + annee)",
      "fromValue/toValue: string (required)",
      "onFromChange/onToChange: (nextValue) => void",
      "fromMin/fromMax/toMin/toMax?: string",
      "className?: string",
      "Usage: <CalendarPeriodRangeSelector inputType='month' fromValue={from} toValue={to} ... />",
    ],
  },
  {
    name: "EventCard",
    props: [
      "event: EventModel (required)",
      "isInWatchlist: boolean",
      "onToggleWatchlist: (eventId) => void",
      "size?: large|medium|small|miniature|compact|default",
      "variant?: default|_alter",
      "note?: string",
      "showTags?: boolean",
      "showComment?: boolean",
      "Usage: <EventCard event={event} ... />",
    ],
  },
  {
    name: "CommentCard",
    props: [
      "comment: CommentModel (required)",
      "onToggleLike: (comment) => void",
      "showEventLink?: boolean",
      "onCreateReply: (comment, note) => CommentReply | null",
      "onToggleReplyLike: (comment, reply) => void",
      "onUpdateComment/onDeleteComment",
      "onUpdateReply/onDeleteReply",
      "Usage: <CommentCard comment={comment} showEventLink={boolean} ... />",
    ],
  },
  {
    name: "ConfirmDialog",
    props: [
      "open: boolean (required)",
      "title?: string",
      "message?: string",
      "confirmLabel?: string",
      "cancelLabel?: string",
      "tone?: danger|default",
      "isBusy?: boolean",
      "onConfirm/onCancel: callbacks",
      "Usage: <ConfirmDialog open={open} title='Supprimer ?' tone='danger' ... />",
    ],
  },
  {
    name: "PlayerCard",
    props: [
      "athlete: AthleteModel (required)",
      "size?: large|medium|small|miniature|compact|default",
      "variant?: listing|detail",
      "showTags?: boolean",
      "showMenu?: boolean",
      "className?: string",
      "Usage: <PlayerCard athlete={athlete} />",
    ],
  },
  {
    name: "TeamCard",
    props: [
      "team: TeamModel (required)",
      "size?: large|medium|small|miniature|compact|default",
      "variant?: listing|detail",
      "showTags?: boolean",
      "showMenu?: boolean",
      "className?: string",
      "Usage: <TeamCard team={team} />",
    ],
  },
  {
    name: "LeagueCard",
    props: [
      "league: LeagueModel (required)",
      "size?: large|medium|small|miniature|compact|default",
      "variant?: listing|detail",
      "showTags?: boolean",
      "showMenu?: boolean",
      "className?: string",
      "Usage: <LeagueCard league={league} />",
    ],
  },
  {
    name: "LeagueSeasonCard",
    props: [
      "season: LeagueSeasonModel (required)",
      "size?: large|medium|small|miniature|compact|default",
      "variant?: listing|detail",
      "showTags?: boolean",
      "showMenu?: boolean",
      "className?: string",
      "Usage: <LeagueSeasonCard season={season} />",
    ],
  },
  {
    name: "UserCard",
    props: [
      "user: UserModel (required)",
      "size?: large|medium|small|miniature|compact|default",
      "variant?: listing|detail",
      "showTags?: boolean",
      "showMenu?: boolean",
      "className?: string",
      "Usage: <UserCard user={user} />",
    ],
  },
  {
    name: "ObjectTagsWidget",
    props: [
      "objectType: event|team|user|list|athlete|league|league-season (required)",
      "objectId: string (required)",
      "title?: string",
      "className?: string",
      "compact?: boolean",
      "Usage: <ObjectTagsWidget objectType='event' objectId={id} />",
    ],
  },
  {
    name: "ObjectSocialPanel",
    props: [
      "targetType: object type (required)",
      "targetId: string (required)",
      "title/subtitle?: string",
      "showFollow?: boolean",
      "followTargetType?: string",
      "followBaseCount?: number",
      "followLabel?: string",
      "allowReview?: boolean",
      "Review note enabled only for targetType: event|league|league-season",
      "composerPlaceholder?: string",
      "showFeedLink?: boolean",
      "Usage: <ObjectSocialPanel targetType='event' targetId={id} />",
    ],
  },
  {
    name: "ObjectFeedScopePanel",
    props: [
      "targetType: object type (required)",
      "targetId: string (required)",
      "watchlistIds?: string[]",
      "onToggleWatchlist?: (eventId) => void",
      "title?: string",
      "subtitle?: string",
      "mode?: recent|popular",
      "onModeChange?: (mode) => void",
      "contentProfile?: mixed|comments-only",
      "showComposer?: boolean",
      "emptyStateText?: string",
      "Usage: <ObjectFeedScopePanel targetType='team' targetId={id} />",
      "Usage (comments-only): <ObjectFeedScopePanel targetType='event' targetId={id} contentProfile='comments-only' showComposer />",
    ],
  },
  {
    name: "RankingCard",
    props: [
      "list: CuratedListModel (required)",
      "showOwner?: boolean",
      "maxPreview?: number",
      "className?: string",
      "Usage: <RankingCard list={list} />",
    ],
  },
  {
    name: "RankingEditorDialog",
    props: [
      "open: boolean (required)",
      "mode?: create|fork|edit",
      "sourceList?: CuratedListModel | null",
      "initialList?: CuratedListModel | null",
      "onClose?: () => void",
      "onSaved?: (savedList) => void",
      "Usage: <RankingEditorDialog open={open} mode='fork' sourceList={list} />",
    ],
  },
  {
    name: "ScoreBadge",
    props: [
      "value: number (required)",
      "scale: percent",
      "variant: badge|user-chip|community-chip|teaser-chip|live-chip|review-chip",
      "Usage: <ScoreBadge value={82} scale='percent' variant='user-chip' />",
    ],
  },
  {
    name: "FriendnotesPanel",
    props: [
      "eventId: string (required)",
      "title?: string",
      "className?: string",
      "compact?: boolean",
      "Usage: <FriendnotesPanel eventId={eventId} title='Note de mes amis' />",
    ],
  },
  {
    name: "SportFilters",
    props: [
      "sports: string[] (required)",
      "activeSport: string (required)",
      "onChange: (sport) => void (required)",
      "Usage: <SportFilters sports={sports} activeSport={sport} onChange={setSport} />",
    ],
  },
  {
    name: "buildAddWatchlistFabButton",
    props: [
      "Named export from WatchlistFabButton.jsx",
      "options: { eventId?, isSaved?, watchlistCount?, className?, buttonClassName?, countClassName?, activeLabel?, inactiveLabel?, activeSymbol?, inactiveSymbol?, onToggle? }",
      "Usage: {buildAddWatchlistFabButton({ isSaved: true, watchlistCount: 12 })}",
    ],
  },
  {
    name: "buildUserFollowFabButton",
    props: [
      "Named export from UserFollowFabButton.jsx",
      "options: { userId?, isFollowed?, followerCount?, className?, buttonClassName?, countClassName?, activeLabel?, inactiveLabel?, activeSymbol?, inactiveSymbol?, onToggle? }",
      "Usage: {buildUserFollowFabButton({ isFollowed: true, followerCount: 1200 })}",
    ],
  },
];

const DISPLAYED_SAMPLE_LEGENDS = [
  {
    name: "UI de base · Cadre global",
    details: [
      "Markup: .ui-frame-preview.cardbase.cardhover",
      "Elements: .ui-frame-swatch.is-bg / .is-border / .is-hover",
      "Parametres: aucun (preview statique)",
    ],
  },
  {
    name: "UI de base · Boutons",
    details: [
      "Markup: button.cta / button.ghost / button.ghost.small / button.filter-btn",
      "Parametres: type='button' (statique)",
    ],
  },
  {
    name: "UI de base · Watchlist FAB",
    details: [
      "Factory: buildAddWatchlistFabButton(options)",
      "Bindings: { isSaved:false, watchlistCount:128 } + { isSaved:true, watchlistCount:128 }",
      "Classes: watchlist-btn-fab-wrap / watchlist-btn-fab / watchlist-btn-fab-count",
    ],
  },
  {
    name: "UI de base · Follow User FAB",
    details: [
      "Factory: buildUserFollowFabButton(options)",
      "Bindings: { isFollowed:false, followerCount:1200 } + { isFollowed:true, followerCount:1200 }",
      "Classes: base watchlist-btn/watchlist-btn-fab/watchlist-btn-fab-count + hooks follow-btn-fab/follow-btn-fab-wrap/follow-btn-fab-count",
    ],
  },
  {
    name: "UI de base · Tags / Pills",
    details: [
      "Markup utilitaire: .pill / .pill.ghost / .tag / .tag.ghost / .mini-pill",
      "Parametres: aucun (preview statique)",
    ],
  },
  {
    name: "UI de base · ScoreBadge",
    details: [
      "Composant: <ScoreBadge value={number} scale='percent' variant='badge|user-chip|community-chip|teaser-chip|live-chip|review-chip' />",
      "Bindings: user-chip(82%), user-chip(0%), community-chip(87%), teaser-chip, live-chip, review-chip",
    ],
  },
  {
    name: "UI de base · Form controls",
    details: [
      "Markup: .search-wrap > input / <SelectField /> / input.tag-textbox",
      "Bindings: defaultValue='Sample', select default='a', tag textbox",
    ],
  },
  {
    name: "UI de base · ObjectTagsWidget",
    details: [
      "Composant: <ObjectTagsWidget objectType objectId title compact />",
      "Bindings: event(focusEvent.id) + team(allTeams[0].id)",
    ],
  },
  {
    name: "UI de base · Smoke tests links",
    details: [
      "Composant: <Link className='filter-btn' to='...'>",
      "Routes: /feed?scope=my&mode=for-you, /feed?scope=my&mode=favorites, /calendar, /tierlist",
    ],
  },
  {
    name: "Texte · Formats",
    details: [
      "Markup: .ui-text-format-sample.display|heading|body|muted|small|caption|mono",
      "Bindings: event_id affiche focusEvent?.id",
    ],
  },
  {
    name: "Texte · Event description",
    details: [
      "Markup: .ui-event-description (+ line-name/meta/result/link)",
      "Bindings: focusEvent.title/league/date/location/result",
    ],
  },
  {
    name: "Composants reutilisables · Miniatures event",
    details: [
      "Markup: <Link className='event-mini' to={`/event/${event.id}`}>",
      "Bindings: allEvents.slice(0,6), getEventImage(event), ScoreBadge(communityScore)",
    ],
  },
  {
    name: "Composants reutilisables · Calendar chips",
    details: [
      "Markup: .calendar-chip.is-past|is-upcoming",
      "Bindings: allEvents.slice(0,4), sport + date",
    ],
  },
  {
    name: "Composants reutilisables · Apercu Sorare",
    details: [
      "Markup: <Link className='sorare-card'> + overlays",
      "Bindings: focusEvent + ScoreBadge(community-chip) + status/reviews",
    ],
  },
  {
    name: "Composants reutilisables · Top 5 add UI",
    details: [
      "Markup: .profile-top5-inline-list + .profile-top5-search + .profile-top5-search-results",
      "Bindings: recherche event + ajout/retrait local sur 5 positions max",
    ],
  },
  {
    name: "Composants reutilisables · Ranking editor",
    details: [
      "Composant: <RankingEditorDialog open mode sourceList initialList />",
      "Bindings: preview interactive via bouton, en reprenant l UI reelle de creation/edition",
    ],
  },
  {
    name: "Cards · EventCard grid",
    details: [
      "Composant: <EventCard event isInWatchlist onToggleWatchlist size showComment />",
      "Bindings: allEvents.slice(0,8), sampleWatchlistIds",
    ],
  },
  {
    name: "Cards · Friendnotes",
    details: [
      "Composant: <FriendnotesPanel eventId={eventId} title='Note de mes amis' compact />",
      "Bindings: reviews publiques notees des users suivis sur un event passe",
    ],
  },
  {
    name: "Cards · RankingCard grid",
    details: [
      "Composant: <RankingCard list />",
      "Bindings: allLists.slice(0,4)",
    ],
  },
  {
    name: "Cards · Object cards unifiees",
    details: [
      "Composants: <PlayerCard/> <TeamCard/> <LeagueCard/> <LeagueSeasonCard/> <UserCard/> + <RankingCard/>",
      "Bindings: premiers objets du dataset + styles inspires EventCard",
    ],
  },
  {
    name: "Cards · Timeline mini calendar",
    details: [
      "Markup: entity-card groupe par date",
      "Bindings: timelineGroups (allEvents.slice(0,14) -> toDateKey)",
    ],
  },
  {
    name: "Comments · Controls + composer",
    details: [
      "Markup: select event/mode + form.comment-composer",
      "Bindings: commentFocusEventId, composerMode, composerRating, composerText",
      "Actions: createEventComment() + refreshCommentSamples()",
    ],
  },
  {
    name: "Comments · CommentCard list",
    details: [
      "Composant: <CommentCard ...callbacks />",
      "Bindings: commentSamples + callbacks like/reply/update/delete",
    ],
  },
  {
    name: "Social · ObjectSocialPanel",
    details: [
      "Composant: <ObjectSocialPanel targetType targetId ... />",
      "Bindings: activeSocialTarget (event/athlete/team/league/season/list/user)",
    ],
  },
  {
    name: "Social · ObjectFeedScopePanel",
    details: [
      "Composant: <ObjectFeedScopePanel targetType targetId ... />",
      "Bindings: feed objet (tabs chrono/populaires + stream mixte par defaut)",
      "Variant: contentProfile='comments-only' pour afficher uniquement les commentaires",
    ],
  },
  {
    name: "Social · Profils sample",
    details: [
      "Markup: user-identity-row avec mini-avatar + badge",
      "Bindings: allUsers.slice(0,3)",
    ],
  },
  {
    name: "Palette · Color tokens",
    details: [
      "Bindings: COLOR_TOKENS -> ui-color-grid",
      "Source: computed style de :root (fallback inclus)",
    ],
  },
  {
    name: "Palette · Distribution des notes",
    details: [
      "Markup: .rating-distribution-chart / .rating-dist-bin",
      "Bindings: buildRatingBins(allEvents), maxBin, getScoreColor(center)",
    ],
  },
  {
    name: "Data sanity",
    details: [
      "Markup: tags de comptage dataset",
      "Bindings: allEvents/allUsers/allTeams/allAthletes/allLists/commentsTotal",
    ],
  },
];

const COLOR_TOKENS = [
  { token: "--tristi-ink", fallback: "#111111", source: ":root" },
  { token: "--tristi-paper", fallback: "#f6f5f2", source: ":root" },
  { token: "--tristi-paper-soft", fallback: "#ecebe7", source: ":root" },
  { token: "--tristi-pink", fallback: "#ec8bd7", source: ":root" },
  { token: "--tristi-yellow", fallback: "#ecef46", source: ":root" },
  { token: "--tristi-teal", fallback: "#2caea3", source: ":root" },
  { token: "--tristi-gold", fallback: "#d8b24c", source: ":root" },
  { token: "--text", fallback: "#191c1f", source: ":root" },
];

function toDateKey(dateISO = "") {
  const parsed = Date.parse(dateISO || "");
  if (!Number.isFinite(parsed)) return "Date inconnue";
  return new Date(parsed).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
}

function getInitials(name = "") {
  return String(name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function getEventImage(event) {
  const image = String(event?.image || "").trim();
  if (!image) return "";
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:") || image.startsWith("blob:")) {
    return image;
  }
  return image.startsWith("/") ? image : `/${image}`;
}

function getScoreColor(percent) {
  if (percent >= 80) return "#3ca63a";
  if (percent >= 60) return "#6da737";
  if (percent >= 40) return "#d08d28";
  if (percent >= 20) return "#cb6834";
  return "#c84a4a";
}

function buildRatingBins(events) {
  const intervalSize = 10;
  const totalBins = 10;
  const bins = Array.from({ length: totalBins }, () => 0);

  events.forEach((event) => {
    const raw = Number(event?.communityScore);
    if (!Number.isFinite(raw)) return;
    const score = Math.max(0, Math.min(100, Math.round(raw <= 10 ? raw * 10 : raw)));
    const index = Math.min(totalBins - 1, Math.floor(score / intervalSize));
    bins[index] += 1;
  });

  return bins;
}

function UISamplesPage() {
  const allEvents = useMemo(() => getAllEvents(), []);
  const allUsers = useMemo(() => getUsers({ query: "" }), []);
  const allTeams = useMemo(() => getTeams({ sportFilter: "Tous", query: "" }), []);
  const allAthletes = useMemo(() => getAthletes({ sportFilter: "Tous", query: "" }), []);
  const allLists = useMemo(() => getCuratedLists({ sportFilter: "Tous", query: "" }), []);
  const allLeagues = useMemo(() => getLeagues({ sportFilter: "Tous", query: "" }), []);

  const focusEvent = allEvents[0] || null;
  const focusAthlete = allAthletes[0] || null;
  const focusTeam = allTeams[0] || null;
  const focusLeagueCard = allLeagues[0] || null;
  const focusLeagueSeasonCard = focusLeagueCard?.seasons?.[0] || null;
  const focusUser = allUsers[0] || null;
  const focusList = allLists[0] || null;
  const friendnotesEvent = useMemo(
    () => allEvents.find((event) => !isUpcomingEvent(event)) || null,
    [allEvents],
  );
  const focusLeague = focusEvent ? getLeagueById(focusEvent.competitionId) : null;
  const focusTeams = focusEvent ? getTeamsForEvent(focusEvent.id) : [];
  const [sampleWatchlistIds, setSampleWatchlistIds] = useState(() => (
    allEvents.slice(0, 3).map((event) => event.id)
  ));
  const [sampleCalendarBaseDate, setSampleCalendarBaseDate] = useState(() => new Date());
  const [sampleRangeFromDate, setSampleRangeFromDate] = useState(() => {
    const value = new Date();
    value.setMonth(value.getMonth() - 1, 1);
    return value.toISOString().slice(0, 7);
  });
  const [sampleRangeToDate, setSampleRangeToDate] = useState(() => {
    const value = new Date();
    value.setDate(1);
    return value.toISOString().slice(0, 7);
  });

  const [commentFocusEventId, setCommentFocusEventId] = useState(focusEvent?.id || "");
  const [commentSamples, setCommentSamples] = useState([]);
  const [composerMode, setComposerMode] = useState(COMMENT_MODE.COMMENT);
  const [composerRating, setComposerRating] = useState(80);
  const [composerText, setComposerText] = useState("");
  const [isConfirmPreviewOpen, setIsConfirmPreviewOpen] = useState(false);
  const [isDangerConfirmPreviewOpen, setIsDangerConfirmPreviewOpen] = useState(false);
  const [isConfirmPreviewBusy, setIsConfirmPreviewBusy] = useState(false);
  const [isDangerConfirmPreviewBusy, setIsDangerConfirmPreviewBusy] = useState(false);
  const [uiTop5Query, setUiTop5Query] = useState("");
  const [uiTop5Draft, setUiTop5Draft] = useState(() => allEvents.slice(0, 3).map((event) => event.id));
  const [isRankingEditorPreviewOpen, setIsRankingEditorPreviewOpen] = useState(false);
  const [rankingEditorPreviewMode, setRankingEditorPreviewMode] = useState("fork");

  const [activeSocialTargetId, setActiveSocialTargetId] = useState("");
  const socialTargets = useMemo(() => {
    const firstLeague = allLeagues[0] || null;
    const firstSeason = firstLeague?.seasons?.[0] || null;
    return [
      focusEvent ? { id: "event", type: "event", targetId: focusEvent.id, label: `Event · ${focusEvent.title}` } : null,
      allAthletes[0] ? { id: "athlete", type: "athlete", targetId: allAthletes[0].id, label: `Athlete · ${allAthletes[0].name}` } : null,
      allTeams[0] ? { id: "team", type: "team", targetId: allTeams[0].id, label: `Team · ${allTeams[0].name}` } : null,
      firstLeague ? { id: "league", type: "league", targetId: firstLeague.id, label: `League · ${firstLeague.title}` } : null,
      firstSeason ? { id: "league-season", type: "league-season", targetId: firstSeason.id, label: `League season · ${firstSeason.title}` } : null,
      allLists[0] ? { id: "list", type: "list", targetId: allLists[0].id, label: `List · ${allLists[0].title}` } : null,
      allUsers[0] ? { id: "user", type: "user", targetId: allUsers[0].id, label: `User · ${allUsers[0].name}` } : null,
    ].filter(Boolean);
  }, [allAthletes, allLeagues, allLists, allTeams, allUsers, focusEvent]);

  useEffect(() => {
    if (!socialTargets.length) return;
    if (socialTargets.some((target) => target.id === activeSocialTargetId)) return;
    setActiveSocialTargetId(socialTargets[0].id);
  }, [activeSocialTargetId, socialTargets]);

  const activeSocialTarget = socialTargets.find((target) => target.id === activeSocialTargetId) || null;
  const activeSocialTargetCanReview = activeSocialTarget
    ? isReviewAllowedTarget(activeSocialTarget.type)
    : false;

  useEffect(() => {
    if (!commentFocusEventId) {
      setCommentSamples([]);
      return;
    }
    setCommentSamples(getEventComments(commentFocusEventId).slice(0, 6));
  }, [commentFocusEventId]);

  const commentsTotal = getAllComments().length;
  const commentTypePreview = useMemo(() => {
    const previewEvent = allEvents.find((event) => event.id === commentFocusEventId) || allEvents[0] || null;
    const previewEventId = String(previewEvent?.id || "preview-event").trim();
    const now = Date.now();
    const baseReplies = [
      {
        id: "ui-preview-reply-1",
        author: "Noa",
        note: "Bien vu, je suis d'accord.",
        likes: 2,
        totalLikes: 2,
        mentions: [],
        createdAt: new Date(now - (8 * 60 * 1000)).toISOString(),
      },
    ];
    return [
      {
        id: "ui-preview-teaser",
        targetType: COMMENT_TARGET.EVENT,
        targetId: previewEventId,
        eventId: previewEventId,
        author: "Lina",
        userId: "usr-preview-lina",
        note: "Teaser: grosse attente sur cette affiche, j'espere un gros rythme.",
        likes: 5,
        totalLikes: 5,
        commentType: COMMENT_MODE.COMMENT,
        mentions: [],
        totalImpressions: 18,
        createdAt: new Date(now - (2 * 60 * 60 * 1000)).toISOString(),
        replies: baseReplies,
      },
      {
        id: "ui-preview-live",
        targetType: COMMENT_TARGET.EVENT,
        targetId: previewEventId,
        eventId: previewEventId,
        author: "Marco",
        userId: "usr-preview-marco",
        note: "Live: changement de momentum en direct, ca bascule completement.",
        likes: 11,
        totalLikes: 11,
        commentType: COMMENT_MODE.LIVE,
        mentions: [],
        totalImpressions: 27,
        createdAt: new Date(now - (30 * 60 * 1000)).toISOString(),
        replies: [
          {
            id: "ui-preview-reply-2",
            author: "Emma",
            note: "Oui, on sent la pression monter.",
            likes: 1,
            totalLikes: 1,
            mentions: [],
            createdAt: new Date(now - (22 * 60 * 1000)).toISOString(),
          },
        ],
      },
      {
        id: "ui-preview-critique",
        targetType: COMMENT_TARGET.EVENT,
        targetId: previewEventId,
        eventId: previewEventId,
        author: "Sara",
        userId: "usr-preview-sara",
        note: "Critique: match solide tactiquement, execution propre et final intense.",
        likes: 15,
        totalLikes: 15,
        commentType: COMMENT_MODE.REVIEW,
        rating: 84,
        mentions: [],
        totalImpressions: 39,
        createdAt: new Date(now - (26 * 60 * 60 * 1000)).toISOString(),
        replies: [
          {
            id: "ui-preview-reply-3",
            author: "Hugo",
            note: "Note coherente, je mets autour de 80 aussi.",
            likes: 3,
            totalLikes: 3,
            mentions: [],
            createdAt: new Date(now - (25 * 60 * 60 * 1000)).toISOString(),
          },
        ],
      },
    ];
  }, [allEvents, commentFocusEventId]);

  const timelineGroups = useMemo(() => {
    return allEvents
      .slice(0, 14)
      .reduce((acc, event) => {
        const key = toDateKey(event.dateISO);
        if (!acc[key]) acc[key] = [];
        acc[key].push(event);
        return acc;
      }, {});
  }, [allEvents]);

  const colorSwatches = useMemo(() => {
    if (typeof window === "undefined") {
      return COLOR_TOKENS.map((item) => ({ ...item, value: item.fallback }));
    }
    const rootStyle = window.getComputedStyle(document.documentElement);
    return COLOR_TOKENS.map((item) => {
      const computed = rootStyle.getPropertyValue(item.token).trim();
      return {
        ...item,
        value: computed || item.fallback,
      };
    });
  }, []);

  const ratingBins = useMemo(() => buildRatingBins(allEvents), [allEvents]);
  const maxBin = Math.max(...ratingBins, 1);
  const uiTop5Items = useMemo(
    () => uiTop5Draft
      .map((eventId) => allEvents.find((event) => event.id === eventId) || null)
      .filter(Boolean)
      .slice(0, 5),
    [allEvents, uiTop5Draft],
  );
  const uiTop5SearchResults = useMemo(() => {
    const query = String(uiTop5Query || "").trim().toLowerCase();
    if (!query) return [];
    const selected = new Set(uiTop5Draft.map((eventId) => String(eventId || "").trim()));
    return allEvents
      .filter((event) => {
        const safeId = String(event?.id || "").trim();
        if (!safeId || selected.has(safeId)) return false;
        const haystack = [
          String(event?.title || ""),
          String(event?.sport || ""),
          String(event?.league || ""),
          String(event?.location || ""),
        ].join(" ").toLowerCase();
        return haystack.includes(query);
      })
      .slice(0, 6)
      .map((event) => ({
        id: event.id,
        type: "event",
        typeLabel: "Event",
        title: event.title,
        subtitle: [event.league, event.location, event.date].filter(Boolean).join(" · "),
      }));
  }, [allEvents, uiTop5Draft, uiTop5Query]);

  function refreshCommentSamples() {
    if (!commentFocusEventId) return;
    setCommentSamples(getEventComments(commentFocusEventId).slice(0, 6));
  }

  function handleToggleWatchlist(eventId) {
    setSampleWatchlistIds((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId);
      }
      return [...prev, eventId];
    });
  }

  function handleCreateComment(event) {
    event.preventDefault();
    if (!commentFocusEventId) return;
    const created = createEventComment(commentFocusEventId, {
      mode: composerMode,
      note: composerText,
      rating: composerRating,
    });
    if (!created) return;
    setComposerText("");
    refreshCommentSamples();
  }

  function handleChangeComposerRating(nextValue) {
    const value = Number(nextValue);
    const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 0;
    setComposerRating(safeValue);
  }

  function handleLikeComment(comment) {
    toggleCommentLike(comment);
    refreshCommentSamples();
  }

  function handleLikeReply(_comment, reply) {
    toggleReplyLike(reply);
    refreshCommentSamples();
  }

  function handleReplyToComment(comment, note, mentions = []) {
    const created = createCommentReply(comment?.id, {
      note,
      mentions,
    });
    if (!created) return null;
    refreshCommentSamples();
    return created;
  }

  function handleUpdateComment(comment, payload) {
    const updated = updateComment(comment?.id, payload);
    if (!updated) return false;
    refreshCommentSamples();
    return true;
  }

  function handleDeleteComment(comment) {
    const deleted = deleteComment(comment?.id);
    if (!deleted) return false;
    refreshCommentSamples();
    return true;
  }

  function handleUpdateReply(comment, reply, note) {
    const updated = updateCommentReply(comment?.id, reply?.id, { note });
    if (!updated) return false;
    refreshCommentSamples();
    return true;
  }

  function handleDeleteReply(comment, reply) {
    const deleted = deleteCommentReply(comment?.id, reply?.id);
    if (!deleted) return false;
    refreshCommentSamples();
    return true;
  }

  async function handleConfirmPreview() {
    setIsConfirmPreviewBusy(true);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    setIsConfirmPreviewBusy(false);
    setIsConfirmPreviewOpen(false);
  }

  async function handleConfirmDangerPreview() {
    setIsDangerConfirmPreviewBusy(true);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setIsDangerConfirmPreviewBusy(false);
    setIsDangerConfirmPreviewOpen(false);
  }

  function handleAddUiTop5Event(result) {
    const safeId = String(result?.id || "").trim();
    if (!safeId || uiTop5Draft.includes(safeId) || uiTop5Draft.length >= 5) return;
    setUiTop5Draft((current) => [...current, safeId]);
    setUiTop5Query("");
  }

  function handleRemoveUiTop5Event(eventId) {
    const safeId = String(eventId || "").trim();
    if (!safeId) return;
    setUiTop5Draft((current) => current.filter((id) => id !== safeId));
  }

  function openRankingEditorPreview(mode = "fork") {
    setRankingEditorPreviewMode(mode);
    setIsRankingEditorPreviewOpen(true);
  }

  return (
    <section className="ui-page">
      <section className="ui-section section-shell ui-nav-shell">
        <nav className="ui-category-nav" aria-label="Navigation UISamples">
          {UI_NAV_ITEMS.map((item, index) => (
            <a key={item.href} className={`filter-btn ${index === 0 ? "is-active" : ""}`} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </section>

      <section id="ui-base" className="ui-section section-shell">
        <div className="section-head">
          <div>
            <h2>UI de base</h2>
            <p className="muted">Boutons, tags, chips, formulaires et widgets.</p>
          </div>
        </div>

        <div className="ui-samples-grid">
          <article className="ui-sample-card">
            <h3>Cadre global</h3>
            <div className="ui-frame-preview cardbase cardhover">
              <p>Shadows / border / radius systeme cartes</p>
              <div className="ui-frame-preview-swatches">
                <span className="ui-frame-swatch is-bg">Fond</span>
                <span className="ui-frame-swatch is-border">Bordure</span>
                <span className="ui-frame-swatch is-hover">Hover</span>
              </div>
            </div>
            <pre className="ui-component-code"><code>.cardbase + .cardhover + variables --card-bg/--card-border</code></pre>
          </article>

          <article className="ui-sample-card">
            <h3>Boutons</h3>
            <div className="ui-row">
              <button className="cta" type="button">Call to action</button>
              <button className="ghost" type="button">Secondaire</button>
              <button className="ghost small" type="button">Petit</button>
              <button className="filter-btn" type="button">Filtre</button>
            </div>
            <pre className="ui-component-code"><code>.cta · .ghost · .ghost.small · .filter-btn</code></pre>
          </article>

          <article className="ui-sample-card">
            <h3>Watchlist FAB</h3>
            <div className="ui-watchlist-fab-stack">
              {buildAddWatchlistFabButton({ isSaved: false, watchlistCount: 128 })}
              {buildAddWatchlistFabButton({ isSaved: true, watchlistCount: 128 })}
            </div>
            <pre className="ui-component-code"><code>buildAddWatchlistFabButton({"{ isSaved, watchlistCount }"})</code></pre>
          </article>

          <article className="ui-sample-card">
            <h3>Follow user FAB</h3>
            <div className="ui-watchlist-fab-stack">
              {buildUserFollowFabButton({ isFollowed: false, followerCount: 1200 })}
              {buildUserFollowFabButton({ isFollowed: true, followerCount: 1200 })}
            </div>
            <pre className="ui-component-code"><code>buildUserFollowFabButton({"{ isFollowed, followerCount }"})</code></pre>
          </article>

          <article className="ui-sample-card">
            <h3>Tags et pills</h3>
            <div className="ui-row">
              <span className="pill">A la une</span>
              <span className="pill ghost">Passe</span>
              <span className="tag">Football</span>
              <span className="tag ghost">Resultat</span>
              <span className="mini-pill is-rating">8.7</span>
              <span className="mini-pill is-watchlist">Watchlist</span>
            </div>
            <pre className="ui-component-code">
              <code>.pill · .pill.ghost · .tag · .tag.ghost · .mini-pill.is-rating · .mini-pill.is-watchlist</code>
            </pre>
          </article>

          <article className="ui-sample-card">
            <h3>ScoreBadge</h3>
            <div className="ui-row">
              <ScoreBadge variant="user-chip" value={82} scale="percent" />
              <ScoreBadge variant="user-chip" value={0} scale="percent" />
              <ScoreBadge variant="community-chip" value={87} scale="percent" />
              <ScoreBadge variant="teaser-chip" />
              <ScoreBadge variant="live-chip" />
              <ScoreBadge variant="review-chip" />
            </div>
            <pre className="ui-component-code"><code>{'<ScoreBadge value={number} scale="percent" variant="badge|user-chip|community-chip|teaser-chip|live-chip|review-chip" />'}</code></pre>
          </article>

          <article className="ui-sample-card">
            <h3>Form controls</h3>
            <div className="ui-user-identity-list">
              <label className="search-wrap" htmlFor="ui-sample-input">
                <span>Input</span>
                <input id="ui-sample-input" type="text" placeholder="Tape quelque chose" defaultValue="Sample" />
              </label>
              <SelectField id="ui-sample-select" label="Select" value="a" onChange={() => {}}>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
              </SelectField>
              <input className="tag-textbox" type="text" defaultValue="Tag textbox" />
            </div>
          </article>

          <article className="ui-sample-card">
            <h3>Object tags widget</h3>
            <div className="ui-user-identity-list">
              {focusEvent ? <ObjectTagsWidget objectType="event" objectId={focusEvent.id} title="Tags event" compact /> : null}
              {allTeams[0] ? <ObjectTagsWidget objectType="team" objectId={allTeams[0].id} title="Tags team" compact /> : null}
            </div>
          </article>

          <article className="ui-sample-card">
            <h3>Smoke tests rapides</h3>
            <div className="ui-row">
              <Link className="filter-btn" to="/feed?scope=my&mode=for-you">Feed pour toi</Link>
              <Link className="filter-btn" to="/feed?scope=my&mode=favorites">Feed favoris</Link>
              <Link className="filter-btn" to="/calendar">Calendar</Link>
              <Link className="filter-btn" to="/tierlist">Tierlist</Link>
            </div>
          </article>
        </div>
      </section>

      <section id="ui-text" className="ui-section section-shell">
        <div className="section-head">
          <div>
            <h2>Texte</h2>
            <p className="muted">Hierarchie typographique et descriptions.</p>
          </div>
        </div>

        <div className="ui-samples-grid">
          <article className="ui-sample-card">
            <h3>Formats de texte (9 styles)</h3>
            <p className="ui-text-format-sample typo-display">Display: Sofa Critics note chaque evenement.</p>
            <p className="ui-text-format-sample typo-h1">Heading-1: Finale Coupe du monde 2022</p>
            <p className="ui-text-format-sample typo-h2">Heading-2: Demi-finale legendaire</p>
            <p className="ui-text-format-sample typo-body">Body: Compare les avis, puis ajoute ton propre commentaire.</p>
            <p className="ui-text-format-sample typo-body-strong">Body-strong: Cette action change le match.</p>
            <p className="ui-text-format-sample typo-comment-text">CommentText: avis, reactions et reponses lisibles sans effet gras.</p>
            <p className="ui-text-format-sample typo-meta">Meta: metadata secondaire et contexte.</p>
            <p className="ui-text-format-sample typo-label">Label: Termine</p>
            <p className="ui-text-format-sample typo-caption">Caption: 18 DEC 2022 · LUSAIL</p>
            <p className="ui-text-format-sample mono">token_id: {focusEvent?.id || "N/A"}</p>
          </article>

          <article className="ui-sample-card">
            <h3>Do / Don&apos;t</h3>
            <ul className="ui-typo-guidelines">
              <li><strong>Do:</strong> utiliser `.typo-*` et les variables `--typo-*`.</li>
              <li><strong>Do:</strong> reutiliser `body/meta/label/caption` avant de creer un style local.</li>
              <li><strong>Don&apos;t:</strong> fixer des `font-size` arbitraires dans les composants.</li>
              <li><strong>Don&apos;t:</strong> ajouter de nouvelles variantes typo sans token central.</li>
            </ul>
            <pre className="ui-component-code"><code>{'.typo-display · .typo-h1 · .typo-h2 · .typo-body · .typo-body-strong · .typo-comment-text · .typo-meta · .typo-label · .typo-caption'}</code></pre>
          </article>

          <article className="ui-sample-card">
            <h3>Event description</h3>
            {focusEvent ? (
              <div className="ui-event-description">
                <p className="ui-event-description-line">
                  <span className="ui-event-description-line-name">{focusEvent.title}</span>
                </p>
                <p className="ui-event-description-line ui-event-description-line-meta">
                  {focusLeague ? (
                    <Link className="ui-event-description-inline-link" to={`/league/${focusLeague.id}`}>
                      {focusLeague.title}
                    </Link>
                  ) : focusEvent.league}
                  {focusTeams.length ? <span className="ui-event-description-sep">·</span> : null}
                  {focusTeams.map((team, index) => (
                    <span key={team.id}>
                      {index > 0 ? <span className="ui-event-description-sep">vs</span> : null}
                      <Link className="ui-event-description-inline-link" to={`/team/${team.id}`}>
                        {team.name}
                      </Link>
                    </span>
                  ))}
                  <span className="ui-event-description-sep">·</span> {focusEvent.date} <span className="ui-event-description-sep">·</span> {focusEvent.location}
                </p>
                {focusEvent.result ? (
                  <p className="ui-event-description-line">
                    Resultat <span className="ui-event-description-result">{focusEvent.result}</span>
                  </p>
                ) : null}
                <Link className="ui-event-description-link" to={`/event/${focusEvent.id}`}>Voir la fiche event</Link>
              </div>
            ) : (
              <p className="muted">Aucun event.</p>
            )}
          </article>
        </div>
      </section>

      <section id="ui-reuse" className="ui-section section-shell">
        <div className="section-head">
          <div>
            <h2>Composants reutilisables</h2>
            <p className="muted">Miniatures events, chips calendrier et carte hero premium.</p>
          </div>
        </div>

        <div className="ui-samples-grid">
          <article className="ui-sample-card">
            <h3>ConfirmDialog · default</h3>
            <p className="muted">Preview d une confirmation non destructive, en portal comme dans l app.</p>
            <div className="ui-row">
              <button className="btn btn-ghost" type="button" onClick={() => setIsConfirmPreviewOpen(true)}>
                Ouvrir confirmation
              </button>
            </div>
            <pre className="ui-component-code">
              <code>{'<ConfirmDialog open={open} title="Continuer ?" tone="default" />'}</code>
            </pre>
          </article>

          <article className="ui-sample-card">
            <h3>ConfirmDialog · danger</h3>
            <p className="muted">Version destructive pour suppressions admin et suppression de commentaires.</p>
            <div className="ui-row">
              <button className="btn btn-primary" type="button" onClick={() => setIsDangerConfirmPreviewOpen(true)}>
                Ouvrir suppression
              </button>
            </div>
            <pre className="ui-component-code">
              <code>{'<ConfirmDialog open={open} title="Supprimer ?" tone="danger" />'}</code>
            </pre>
          </article>

          <article className="ui-sample-card">
            <h3>Miniatures event</h3>
            <div className="event-mini-grid">
              {allEvents.slice(0, 6).map((event) => (
                <Link key={event.id} className="event-mini" to={`/event/${event.id}`}>
                  <div className="event-mini-media">
                    {getEventImage(event) ? <img src={getEventImage(event)} alt={event.title} /> : null}
                    <div className="event-mini-overlay">
                      <div className="event-corner-meta">
                        <span className="event-corner-chip event-corner-chip-sport">{event.sport}</span>
                      </div>
                      <p className="event-mini-titleline">{event.title}</p>
                      <p className="event-mini-league">{event.league}</p>
                      <p className="event-mini-date">{event.date}</p>
                    </div>
                  </div>
                  <div className="event-mini-meta">
                    <span className="mini-pill is-spotlight">{event.status}</span>
                    <ScoreBadge variant="badge" value={event.communityScore} scale="percent" />
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <article className="ui-sample-card">
            <h3>Calendar chips</h3>
            <div className="calendar-mini-grid">
              {allEvents.slice(0, 4).map((event) => (
                <div key={event.id} className={`calendar-chip ${String(event.status).toLowerCase().includes("passe") ? "is-past" : "is-upcoming"}`}>
                  <span className="calendar-chip-title">{event.title}</span>
                  <span className="calendar-chip-right">
                    <span className="event-corner-chip calendar-chip-sport-chip">{event.sport}</span>
                    <span className="mini-pill is-watchlist">{event.date}</span>
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="ui-sample-card">
            <h3>Apercu Sorare style</h3>
            {focusEvent ? (
              <Link className="sorare-card" to={`/event/${focusEvent.id}`}>
                {getEventImage(focusEvent) ? <img className="sorare-card-bg" src={getEventImage(focusEvent)} alt={focusEvent.title} /> : null}
                <div className="sorare-card-overlay">
                  <div className="sorare-card-top">
                    <span className="sorare-chip">A LA UNE</span>
                    <ScoreBadge variant="community-chip" value={focusEvent.communityScore} scale="percent" />
                  </div>
                  <div className="sorare-card-main">
                    <span className="sorare-league">{focusEvent.league}</span>
                    <h3>{focusEvent.title}</h3>
                    <p>{focusEvent.date} · {focusEvent.location}</p>
                  </div>
                  <div className="sorare-card-bottom">
                    <span className={`sorare-pill ${String(focusEvent.status).toLowerCase().includes("passe") ? "is-past" : "is-upcoming"}`}>{focusEvent.status}</span>
                    <span className="sorare-watchers">{Number(focusEvent.reviews || 0).toLocaleString("fr-FR")} avis</span>
                  </div>
                </div>
              </Link>
            ) : null}
          </article>

          <article className="ui-sample-card">
            <h3>Top 5 · ajout d element</h3>
            <p className="muted">Le meme composant que sur la page profil, sans version parallele.</p>
            <ProfileTopEventsSection
              title="Mon Top 5 events"
              events={uiTop5Items}
              isOwnProfile
              isEditing
              topEventsQuery={uiTop5Query}
              searchResults={uiTop5SearchResults}
              onSave={() => {}}
              onCancel={() => {
                setUiTop5Draft([]);
                setUiTop5Query("");
              }}
              onQueryChange={setUiTop5Query}
              onQueryKeyDown={(event) => {
                if (event.key !== "Enter") return;
                if (!uiTop5SearchResults.length) return;
                event.preventDefault();
                handleAddUiTop5Event(uiTop5SearchResults[0]);
              }}
              onAddResult={handleAddUiTop5Event}
              onRemove={(eventItem) => handleRemoveUiTop5Event(eventItem?.id)}
              onDragStart={() => {}}
              onDragOver={() => {}}
              onDrop={() => {}}
              onDragEnd={() => {}}
            />
            <pre className="ui-component-code">
              <code>{"<ProfileTopEventsSection events={events} isOwnProfile isEditing ... />"}</code>
            </pre>
          </article>

          <article className="ui-sample-card">
            <h3>Ranking editor</h3>
            <p className="muted">Ouverture du modal reel utilise pour creer, forker ou modifier un classement.</p>
            <div className="ui-row">
              <button className="btn btn-primary" type="button" onClick={() => openRankingEditorPreview("fork")}>
                Ouvrir version derivee
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => openRankingEditorPreview("create")}>
                Ouvrir creation vide
              </button>
            </div>
            <pre className="ui-component-code">
              <code>{"<RankingEditorDialog open={open} mode='fork|create' sourceList={list} />"}</code>
            </pre>
          </article>
        </div>
      </section>

      <section id="ui-cards" className="ui-section section-shell">
        <div className="section-head">
          <div>
            <h2>Cards</h2>
            <p className="muted">Event cards, object cards, list cards et timeline mini calendar.</p>
          </div>
        </div>

        <div className="card-grid">
          {allEvents.slice(0, 8).map((event) => (
            <div key={event.id} className="ui-sample-component">
              <EventCard
                event={event}
                isInWatchlist={sampleWatchlistIds.includes(event.id)}
                onToggleWatchlist={handleToggleWatchlist}
              />
            </div>
          ))}
        </div>
        <pre className="ui-component-code">
          <code>{"<EventCard event={event} isInWatchlist={boolean} onToggleWatchlist={(eventId) => void} size='medium' variant='default|_alter' showComment={boolean} />"}</code>
        </pre>

        {focusEvent ? (
          <article className="ui-sample-card ui-event-size-preview">
            <h3>EventCard sizes (contenu identique)</h3>
            <div className="ui-event-size-grid">
              {EVENT_CARD_SIZE_PRESETS.map((sizePreset) => (
                <div key={sizePreset} className="ui-event-size-cell">
                  <p className="muted ui-event-size-label">{sizePreset}</p>
                  <EventCard
                    event={focusEvent}
                    size={sizePreset}
                    showComment={false}
                    isInWatchlist={sampleWatchlistIds.includes(focusEvent.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                </div>
              ))}
            </div>
          </article>
        ) : null}

        {focusEvent ? (
          <article className="ui-sample-card ui-event-size-preview ui-event-size-preview-alter">
            <h3>EventCard variant _alter (bandeau transversal)</h3>
            <div className="ui-event-size-grid is-alter-preview">
              <div className="ui-event-size-cell is-alter-preview">
                <p className="muted ui-event-size-label">large · _alter</p>
                <EventCard
                  event={focusEvent}
                  size="large"
                  variant="_alter"
                  showComment={false}
                  isInWatchlist={sampleWatchlistIds.includes(focusEvent.id)}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              </div>
            </div>
          </article>
        ) : null}

        {(focusAthlete || focusTeam || focusLeagueCard || focusLeagueSeasonCard || focusUser || focusList) ? (
          <article className="ui-sample-card">
            <h3>Object cards unifiees</h3>
            <div className="ui-cards-grid">
              {focusAthlete ? <PlayerCard athlete={focusAthlete} size="small" /> : null}
              {focusTeam ? <TeamCard team={focusTeam} size="small" /> : null}
              {focusLeagueCard ? <LeagueCard league={focusLeagueCard} size="small" /> : null}
              {focusLeagueSeasonCard ? <LeagueSeasonCard season={focusLeagueSeasonCard} size="small" /> : null}
              {focusUser ? <UserCard user={focusUser} size="small" /> : null}
              {focusList ? <RankingCard list={focusList} /> : null}
            </div>
            <pre className="ui-component-code">
              <code>{"<PlayerCard athlete={athlete} /> · <TeamCard team={team} /> · <LeagueCard league={league} /> · <LeagueSeasonCard season={season} /> · <UserCard user={user} /> · <RankingCard list={list} />"}</code>
            </pre>
          </article>
        ) : null}

        <div className="list-grid">
          {allLists.slice(0, 4).map((list) => (
            <RankingCard key={list.id} list={list} />
          ))}
        </div>
        <pre className="ui-component-code">
          <code>{"<RankingCard list={list} showOwner={boolean} maxPreview={number} />"}</code>
        </pre>

        <div className="ui-samples-grid">
          <article className="ui-sample-card">
            <h3>Watchlist date selector</h3>
            <CalendarPeriodSelector
              baseDate={sampleCalendarBaseDate}
              onChange={setSampleCalendarBaseDate}
              summary="Demo UISamples"
            />
            <pre className="ui-component-code"><code>{"<CalendarPeriodSelector baseDate={date} onChange={setDate} summary='Demo UISamples' />"}</code></pre>
          </article>

          <article className="ui-sample-card">
            <h3>Period range selector</h3>
            <CalendarPeriodRangeSelector
              inputType="month"
              fromId="ui-sample-range-from-date"
              toId="ui-sample-range-to-date"
              fromLabel="De"
              toLabel="A"
              fromValue={sampleRangeFromDate}
              toValue={sampleRangeToDate}
              onFromChange={setSampleRangeFromDate}
              onToChange={setSampleRangeToDate}
              toMin={sampleRangeFromDate}
              fromMax={sampleRangeToDate}
            />
            <pre className="ui-component-code"><code>{"<CalendarPeriodRangeSelector inputType='month' fromValue={from} toValue={to} onFromChange={setFrom} onToChange={setTo} />"}</code></pre>
          </article>

          <article className="ui-sample-card">
            <h3>Friendnotes</h3>
            {friendnotesEvent ? (
              <FriendnotesPanel
                eventId={friendnotesEvent.id}
                title="Note de mes amis"
                compact
              />
            ) : (
              <p className="muted">Aucun event passe disponible pour la demo.</p>
            )}
            <pre className="ui-component-code"><code>{"<FriendnotesPanel eventId={eventId} title='Note de mes amis' compact />"}</code></pre>
          </article>

          <article className="ui-sample-card">
            <h3>Timeline mini calendar</h3>
            <div className="ui-user-identity-list">
              {Object.entries(timelineGroups).slice(0, 6).map(([dateKey, items]) => (
                <article key={dateKey} className="entity-card">
                  <h3>{dateKey}</h3>
                  {items.slice(0, 3).map((event) => (
                    <p key={event.id} className="event-meta">
                      <Link to={`/event/${event.id}`}>{event.title}</Link>
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="ui-comments" className="ui-section section-shell">
        <div className="section-head">
          <div>
            <h2>Reviews & commentaires</h2>
            <p className="muted">Edition complete: like, reply, update, delete.</p>
          </div>
          <span className="mini-pill is-rating">{commentSamples.length} / {commentsTotal}</span>
        </div>

        <div className="watchlist-controls">
          <SelectField
            id="ui-comment-event-select"
            label="Event cible"
            value={commentFocusEventId}
            onChange={setCommentFocusEventId}
          >
              {allEvents.slice(0, 20).map((event) => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
          </SelectField>

          <SelectField
            id="ui-comment-mode-select"
            label="Type nouveau commentaire"
            value={composerMode}
            onChange={setComposerMode}
          >
              <option value={COMMENT_MODE.COMMENT}>Commentaire</option>
              <option value={COMMENT_MODE.LIVE}>Live</option>
              <option value={COMMENT_MODE.REVIEW}>Critique</option>
          </SelectField>
        </div>

        <form className="comment-composer" onSubmit={handleCreateComment}>
          <div className="comment-composer-top">
            {composerMode === COMMENT_MODE.REVIEW ? (
              <ScoreSliderField
                id="ui-comment-rating-input"
                label="Note (0-100)"
                value={composerRating}
                onChange={handleChangeComposerRating}
              />
            ) : null}
          </div>

          <label className="search-wrap" htmlFor="ui-comment-textarea">
            <span>Nouveau message</span>
            <textarea
              id="ui-comment-textarea"
              rows="3"
              maxLength={600}
              placeholder="Ecris un commentaire de test..."
              value={composerText}
              onChange={(event) => setComposerText(event.target.value)}
            />
          </label>

          <button className="cta" type="submit">Publier</button>
        </form>

        <article className="ui-sample-card">
          <h3>Apercu des 3 types</h3>
          <p className="muted">Teaser, Live et Critique (demo statique).</p>
          <div className="review-list">
            {commentTypePreview.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
              />
            ))}
          </div>
        </article>

        {commentSamples.length ? (
          <div className="review-list">
            {commentSamples.map((comment) => (
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
          <article className="ui-sample-card">
            <h3>Aucun commentaire</h3>
            <p className="muted">Cree un commentaire pour tester les interactions.</p>
          </article>
        )}
        <pre className="ui-component-code">
          <code>{"<CommentCard comment={comment} showEventLink={boolean} onToggleLike={fn} onCreateReply={fn} onToggleReplyLike={fn} onUpdateComment={fn} onDeleteComment={fn} onUpdateReply={fn} onDeleteReply={fn} />"}</code>
        </pre>

        <article className="ui-sample-card">
          <h3>Dernier commentaire</h3>
          <p className="muted">
            {commentSamples[0] ? `${getCommentModeLabel(commentSamples[0])} · ${getCommentDateLabel(commentSamples[0])}` : "N/A"}
          </p>
        </article>
      </section>

      <section id="ui-social" className="ui-section section-shell">
        <div className="section-head">
          <div>
            <h2>Object social panel</h2>
            <p className="muted">Follow + tags + comments sur plusieurs types d'objets.</p>
          </div>
        </div>

        <SelectField
          id="ui-social-target-select"
          label="Cible"
          value={activeSocialTargetId}
          onChange={setActiveSocialTargetId}
        >
            {socialTargets.map((target) => (
              <option key={target.id} value={target.id}>{target.label}</option>
            ))}
        </SelectField>

        {activeSocialTarget ? (
          <ObjectSocialPanel
            targetType={activeSocialTarget.type}
            targetId={activeSocialTarget.targetId}
            title={`Panel social · ${activeSocialTarget.type}`}
            subtitle={`Surface de test complete pour interactions sociales${activeSocialTargetCanReview ? " · Critique active" : " · Critique indisponible"}`}
            showFollow={activeSocialTarget.type !== "event"}
            followTargetType={activeSocialTarget.type !== "event" ? activeSocialTarget.type : ""}
            followBaseCount={120}
            followLabel="followers"
            composerPlaceholder="Message de test..."
          />
        ) : null}
        <pre className="ui-component-code">
          <code>{"<ObjectSocialPanel targetType={type} targetId={id} title={...} subtitle={...} showFollow={bool} followTargetType={type} followBaseCount={number} followLabel={string} composerPlaceholder={string} />"}</code>
        </pre>

        <div className="ui-samples-grid">
          <article className="ui-sample-card">
            <h3>Profils samples</h3>
            <div className="ui-user-identity-list">
              {allUsers.slice(0, 3).map((user) => (
                <div key={user.id} className="user-identity-row">
                  <Link className="user-identity" to={`/user/${user.id}`}>
                    <span className="mini-avatar user-identity-avatar">{getInitials(user.name)}</span>
                    <span className="user-identity-name">{user.name}</span>
                  </Link>
                  <span className="tag ghost">{user.badge}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="ui-colors" className="ui-section section-shell">
        <div className="section-head">
          <div>
            <h2>Palette et distribution</h2>
            <p className="muted">Variables CSS + histogramme des notes.</p>
          </div>
        </div>

        <div className="ui-color-grid">
          {colorSwatches.map((swatch) => (
            <article key={swatch.token} className="ui-sample-card ui-color-card">
              <h3>{swatch.token}</h3>
              <div className="ui-color-preview" style={{ "--swatch-color": swatch.value }} />
              <div className="ui-color-meta">
                <span className="ui-color-value">{swatch.value}</span>
                <span className="ui-color-source">source: {swatch.source}</span>
              </div>
            </article>
          ))}
        </div>

        <section className="rating-distribution-card is-event">
          <div className="rating-distribution-head">
            <h3>Distribution des notes events</h3>
            <span className="muted">{allEvents.length} notes communautaires · intervalles de 10</span>
          </div>
          <div className="rating-distribution-scroll">
            <div className="rating-distribution-chart">
              {ratingBins.map((count, index) => {
                const start = index * 10;
                const end = index === 9 ? 100 : start + 9;
                const center = index === 9 ? 100 : start + 5;
                const height = count ? Math.round((count / maxBin) * 100) : 3;
                return (
                  <div key={`${start}-${end}`} className="rating-dist-bin" title={`${start}-${end}% · ${count} note(s)`}>
                    <div className={`rating-dist-count ${count ? "is-visible" : ""}`}>{count || ""}</div>
                    <div
                      className="rating-dist-bar"
                      style={{
                        "--bar-height": `${height}%`,
                        "--bar-color": getScoreColor(center),
                      }}
                    />
                    <div className="rating-dist-label">{start}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rating-distribution-axis">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </section>
      </section>

      <section id="ui-sanity" className="ui-section section-shell">
        <div className="section-head">
          <div>
            <h2>Data sanity</h2>
            <p className="muted">Comptages rapides pour verifier le dataset de test.</p>
          </div>
        </div>
        <div className="ui-row">
          <span className="tag">events: {allEvents.length}</span>
          <span className="tag">users: {allUsers.length}</span>
          <span className="tag">teams: {allTeams.length}</span>
          <span className="tag">athletes: {allAthletes.length}</span>
          <span className="tag">lists: {allLists.length}</span>
          <span className="tag">comments: {commentsTotal}</span>
        </div>
      </section>

      <section id="ui-legend" className="ui-section section-shell">
        <div className="section-head">
          <div>
            <h2>Legende composants</h2>
            <p className="muted">Nom des composants React, parametres (props), et inventaire des elements affiches dans UISamples.</p>
          </div>
        </div>
        <h3>API composants</h3>
        <div className="ui-samples-grid">
          {COMPONENT_LEGENDS.map((item) => (
            <article key={item.name} className="ui-sample-card">
              <h3>{item.name}</h3>
              <pre className="ui-component-code">
                <code>{item.props.join("\n")}</code>
              </pre>
            </article>
          ))}
        </div>
        <h3>Inventaire affichage UISamples</h3>
        <div className="ui-samples-grid">
          {DISPLAYED_SAMPLE_LEGENDS.map((item) => (
            <article key={item.name} className="ui-sample-card">
              <h3>{item.name}</h3>
              <pre className="ui-component-code">
                <code>{item.details.join("\n")}</code>
              </pre>
            </article>
          ))}
        </div>
      </section>
      <ConfirmDialog
        open={isConfirmPreviewOpen}
        title="Continuer avec cette action ?"
        message="Cette demo simule une confirmation standard reutilisable."
        confirmLabel="Continuer"
        cancelLabel="Annuler"
        isBusy={isConfirmPreviewBusy}
        onConfirm={handleConfirmPreview}
        onCancel={() => setIsConfirmPreviewOpen(false)}
      />
      <ConfirmDialog
        open={isDangerConfirmPreviewOpen}
        title="Supprimer cet element ?"
        message="Cette demo simule la confirmation destructive utilisee pour les suppressions."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        tone="danger"
        isBusy={isDangerConfirmPreviewBusy}
        onConfirm={handleConfirmDangerPreview}
        onCancel={() => setIsDangerConfirmPreviewOpen(false)}
      />
      <RankingEditorDialog
        open={isRankingEditorPreviewOpen}
        mode={rankingEditorPreviewMode}
        sourceList={rankingEditorPreviewMode === "fork" ? focusList : null}
        initialList={rankingEditorPreviewMode === "edit" ? focusList : null}
        onClose={() => setIsRankingEditorPreviewOpen(false)}
        onSaved={() => setIsRankingEditorPreviewOpen(false)}
      />
    </section>
  );
}

export default UISamplesPage;
