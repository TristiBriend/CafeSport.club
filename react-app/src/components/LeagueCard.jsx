import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ObjectCardFrame from "./ObjectCardFrame";
import { buildUserFollowFabButton } from "./UserFollowFabButton";
import { useSocialSync } from "../contexts/SocialSyncContext";
import {
  FOLLOW_TARGET,
  getTargetFollowerCount,
  isTargetFollowed,
  toggleTargetFollow,
} from "../services/userFollowService";

function LeagueCard({
  league,
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
}) {
  if (!league) return null;

  const { revisionByDomain } = useSocialSync();
  const firstSeason = Array.isArray(league.seasons) ? league.seasons[0] : null;
  const followsRevision = Number(revisionByDomain?.follows || 0);
  const baseFollowCount = Math.max(180, Number(league.count || 0) * 26);
  const [isFollowed, setIsFollowed] = useState(false);
  const [resolvedFollowers, setResolvedFollowers] = useState(baseFollowCount);

  useEffect(() => {
    const safeLeagueId = String(league?.id || "").trim();
    if (!safeLeagueId) {
      setIsFollowed(false);
      setResolvedFollowers(baseFollowCount);
      return;
    }
    setIsFollowed(isTargetFollowed(FOLLOW_TARGET.LEAGUE, safeLeagueId));
    setResolvedFollowers(getTargetFollowerCount(FOLLOW_TARGET.LEAGUE, safeLeagueId, baseFollowCount));
  }, [baseFollowCount, followsRevision, league?.id]);

  function handleToggleFollow() {
    const safeLeagueId = String(league?.id || "").trim();
    if (!safeLeagueId) return;
    const next = toggleTargetFollow(FOLLOW_TARGET.LEAGUE, safeLeagueId);
    setIsFollowed(next);
    setResolvedFollowers(getTargetFollowerCount(FOLLOW_TARGET.LEAGUE, safeLeagueId, baseFollowCount));
  }

  const followFab = buildUserFollowFabButton({
    userId: league.id,
    isFollowed,
    followerCount: resolvedFollowers,
    className: "league-card-follow-fab-wrap",
    activeLabel: "Ne plus suivre",
    inactiveLabel: "Suivre",
    onToggle: handleToggleFollow,
  });

  return (
    <ObjectCardFrame
      objectType="league"
      objectId={league.id}
      title={league.title}
      sportLabel={league.sport || "Sport"}
      metricValue={Math.round(Number(league.averageScore || 0))}
      image={league.image}
      fallbackLabel={league.title}
      primaryPath={`/league/${league.id}`}
      primaryActionLabel={`Aller a ${league.title}`}
      size={size}
      variant={variant}
      showTags={showTags}
      showMenu={showMenu}
      hideMetricChip
      headerAction={followFab}
      className={`is-league-card ${className}`.trim()}
      baseFollowCount={baseFollowCount}
      menuExtraActions={firstSeason?.id ? [{ label: `Aller a ${firstSeason.title}`, to: `/league-season/${firstSeason.id}` }] : []}
    >
      <p className="object-card-line object-card-line-title typo-body-strong">
        <Link className="object-card-inline-link" to={`/league/${league.id}`}>
          {league.title}
        </Link>
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {league.count || 0} evenements · {league.seasons?.length || 0} saisons
      </p>
      {firstSeason?.id ? (
        <p className="object-card-line object-card-line-meta typo-meta">
          Saison en cours:{" "}
          <Link className="object-card-inline-link" to={`/league-season/${firstSeason.id}`}>
            {firstSeason.title}
          </Link>
        </p>
      ) : (
        <p className="object-card-line object-card-line-meta typo-meta">Aucune saison disponible</p>
      )}
    </ObjectCardFrame>
  );
}

export default LeagueCard;
