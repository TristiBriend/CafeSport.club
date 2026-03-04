import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ObjectCardFrame from "./ObjectCardFrame";
import { buildUserFollowFabButton } from "./UserFollowFabButton";
import { useSocialSync } from "../contexts/SocialSyncContext";
import { getEventsForAthlete, getTeamForAthlete } from "../services/catalogService";
import {
  FOLLOW_TARGET,
  getTargetFollowerCount,
  isTargetFollowed,
  toggleTargetFollow,
} from "../services/userFollowService";

function getAverageScore(events = []) {
  const source = Array.isArray(events) ? events : [];
  if (!source.length) return 0;
  const total = source.reduce((sum, event) => sum + Number(event?.communityScore || 0), 0);
  return Math.round(total / source.length);
}

function PlayerCard({
  athlete,
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
}) {
  if (!athlete) return null;

  const { revisionByDomain } = useSocialSync();
  const team = getTeamForAthlete(athlete);
  const events = getEventsForAthlete(athlete.id);
  const averageScore = getAverageScore(events);
  const followsRevision = Number(revisionByDomain?.follows || 0);
  const baseFollowCount = Math.max(80, events.length * 28);
  const [isFollowed, setIsFollowed] = useState(false);
  const [resolvedFollowers, setResolvedFollowers] = useState(baseFollowCount);

  useEffect(() => {
    const safeAthleteId = String(athlete?.id || "").trim();
    if (!safeAthleteId) {
      setIsFollowed(false);
      setResolvedFollowers(baseFollowCount);
      return;
    }
    setIsFollowed(isTargetFollowed(FOLLOW_TARGET.ATHLETE, safeAthleteId));
    setResolvedFollowers(getTargetFollowerCount(FOLLOW_TARGET.ATHLETE, safeAthleteId, baseFollowCount));
  }, [athlete?.id, baseFollowCount, followsRevision]);

  function handleToggleFollow() {
    const safeAthleteId = String(athlete?.id || "").trim();
    if (!safeAthleteId) return;
    const next = toggleTargetFollow(FOLLOW_TARGET.ATHLETE, safeAthleteId);
    setIsFollowed(next);
    setResolvedFollowers(getTargetFollowerCount(FOLLOW_TARGET.ATHLETE, safeAthleteId, baseFollowCount));
  }

  const followFab = buildUserFollowFabButton({
    userId: athlete.id,
    isFollowed,
    followerCount: resolvedFollowers,
    className: "athlete-card-follow-fab-wrap",
    activeLabel: "Ne plus suivre",
    inactiveLabel: "Suivre",
    onToggle: handleToggleFollow,
  });

  return (
    <ObjectCardFrame
      objectType="athlete"
      objectId={athlete.id}
      title={athlete.name}
      sportLabel={athlete.sport || "Sport"}
      metricValue={averageScore}
      image={athlete.image}
      fallbackLabel={athlete.name}
      primaryPath={`/athlete/${athlete.id}`}
      primaryActionLabel={`Aller a ${athlete.name}`}
      size={size}
      variant={variant}
      showTags={showTags}
      showMenu={showMenu}
      hideMetricChip
      headerAction={followFab}
      className={`is-athlete-card ${className}`.trim()}
      baseFollowCount={baseFollowCount}
      menuExtraActions={team?.id ? [{ label: `Aller a ${team.nameFull || team.name}`, to: `/team/${team.id}` }] : []}
    >
      <p className="object-card-line object-card-line-title typo-body-strong">
        <Link className="object-card-inline-link" to={`/athlete/${athlete.id}`}>
          {athlete.name}
        </Link>
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {athlete.role || "Athlete"} · {athlete.country || "N/A"}
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {team?.id ? (
          <>
            Team:{" "}
            <Link className="object-card-inline-link" to={`/team/${team.id}`}>
              {team.name}
            </Link>
          </>
        ) : "Team inconnu"}
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">{events.length} evenements lies</p>
    </ObjectCardFrame>
  );
}

export default PlayerCard;
