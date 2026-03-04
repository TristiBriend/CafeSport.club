import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ObjectCardFrame from "./ObjectCardFrame";
import { buildUserFollowFabButton } from "./UserFollowFabButton";
import { useSocialSync } from "../contexts/SocialSyncContext";
import { getLeagueById } from "../services/leaguesService";
import {
  FOLLOW_TARGET,
  getTargetFollowerCount,
  isTargetFollowed,
  toggleTargetFollow,
} from "../services/userFollowService";

function LeagueSeasonCard({
  season,
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
}) {
  if (!season) return null;

  const { revisionByDomain } = useSocialSync();
  const league = getLeagueById(season.leagueId);
  const followsRevision = Number(revisionByDomain?.follows || 0);
  const baseFollowCount = Math.max(90, Number(season.count || 0) * 18);
  const [isFollowed, setIsFollowed] = useState(false);
  const [resolvedFollowers, setResolvedFollowers] = useState(baseFollowCount);

  useEffect(() => {
    const safeSeasonId = String(season?.id || "").trim();
    if (!safeSeasonId) {
      setIsFollowed(false);
      setResolvedFollowers(baseFollowCount);
      return;
    }
    setIsFollowed(isTargetFollowed(FOLLOW_TARGET.LEAGUE_SEASON, safeSeasonId));
    setResolvedFollowers(getTargetFollowerCount(FOLLOW_TARGET.LEAGUE_SEASON, safeSeasonId, baseFollowCount));
  }, [baseFollowCount, followsRevision, season?.id]);

  function handleToggleFollow() {
    const safeSeasonId = String(season?.id || "").trim();
    if (!safeSeasonId) return;
    const next = toggleTargetFollow(FOLLOW_TARGET.LEAGUE_SEASON, safeSeasonId);
    setIsFollowed(next);
    setResolvedFollowers(getTargetFollowerCount(FOLLOW_TARGET.LEAGUE_SEASON, safeSeasonId, baseFollowCount));
  }

  const followFab = buildUserFollowFabButton({
    userId: season.id,
    isFollowed,
    followerCount: resolvedFollowers,
    className: "league-season-card-follow-fab-wrap",
    activeLabel: "Ne plus suivre",
    inactiveLabel: "Suivre",
    onToggle: handleToggleFollow,
  });

  return (
    <ObjectCardFrame
      objectType="league-season"
      objectId={season.id}
      title={season.title}
      sportLabel={season.sport || league?.sport || "Sport"}
      metricValue={Math.round(Number(season.averageScore || 0))}
      image={season.image}
      fallbackLabel={season.title}
      primaryPath={`/league-season/${season.id}`}
      primaryActionLabel={`Aller a ${season.title}`}
      size={size}
      variant={variant}
      showTags={showTags}
      showMenu={showMenu}
      hideMetricChip
      headerAction={followFab}
      className={`is-league-season-card ${className}`.trim()}
      baseFollowCount={baseFollowCount}
      menuExtraActions={league?.id ? [{ label: `Aller a ${league.title}`, to: `/league/${league.id}` }] : []}
    >
      <p className="object-card-line object-card-line-title typo-body-strong">
        <Link className="object-card-inline-link" to={`/league-season/${season.id}`}>
          {season.title}
        </Link>
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {season.count || 0} evenements · {season.dateRangeLabel || "Periode N/A"}
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        A venir: {Number(season.upcomingCount || 0)} · Termines: {Number(season.pastCount || 0)}
      </p>
    </ObjectCardFrame>
  );
}

export default LeagueSeasonCard;
