import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ObjectCardFrame from "./ObjectCardFrame";
import { buildUserFollowFabButton } from "./UserFollowFabButton";
import { useSocialSync } from "../contexts/SocialSyncContext";
import { useAuth } from "../contexts/AuthContext";
import { getTeamById } from "../services/catalogService";
import { getProfileDetailsOverride } from "../services/profileService";
import {
  getUserFollowerCount,
  isUserFollowed,
  toggleUserFollow,
} from "../services/userFollowService";

function normalizeUserCardSize(size) {
  const raw = String(size || "").trim().toLowerCase();
  if (!raw || raw === "default") return "medium";
  if (raw === "compact") return "small";
  return raw;
}

function UserCard({
  user,
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
}) {
  const { currentUser } = useAuth();
  const { revisionByDomain } = useSocialSync();
  const safeUser = user || null;
  const normalizedSize = normalizeUserCardSize(size);
  const isMiniature = normalizedSize === "miniature";
  const isCompact = normalizedSize === "small";
  const followsRevision = Number(revisionByDomain?.follows || 0);
  const profileRevision = Number(revisionByDomain?.profile || 0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [resolvedFollowers, setResolvedFollowers] = useState(Number(safeUser?.followers || 0));
  const isSelfCard = String(currentUser?.id || "").trim() !== ""
    && String(currentUser?.id || "").trim() === String(safeUser?.id || "").trim();

  const favoriteSport = Array.isArray(safeUser?.favoriteSports) && safeUser.favoriteSports.length
    ? safeUser.favoriteSports[0]
    : "Profil";
  const favoriteTags = useMemo(() => {
    if (isMiniature || !safeUser) return [];
    const sportTags = (Array.isArray(safeUser.favoriteSports) ? safeUser.favoriteSports : [])
      .map((entry) => String(entry || "").trim())
      .filter(Boolean)
      .slice(0, 2)
      .map((label) => ({ key: `sport-${label}`, label }));
    const details = getProfileDetailsOverride(safeUser.id);
    const teamTags = (Array.isArray(details.favoriteTeamIds) ? details.favoriteTeamIds : [])
      .map((teamId) => getTeamById(teamId))
      .filter(Boolean)
      .slice(0, 2)
      .map((team) => ({
        key: `team-${team.id}`,
        label: String(team.nameFull || team.name || "").trim(),
      }))
      .filter((tag) => tag.label);
    return [...sportTags, ...teamTags];
  }, [isMiniature, profileRevision, safeUser]);
  useEffect(() => {
    if (!safeUser) {
      setIsFollowed(false);
      setResolvedFollowers(0);
      return;
    }
    const safeUserId = String(safeUser.id || "").trim();
    if (!safeUserId) {
      setIsFollowed(false);
      setResolvedFollowers(Math.max(0, Number(safeUser.followers || 0)));
      return;
    }
    setIsFollowed(isUserFollowed(safeUserId));
    setResolvedFollowers(getUserFollowerCount(safeUserId, Number(safeUser.followers || 0)));
  }, [followsRevision, safeUser.followers, safeUser.id]);

  function handleToggleFollow() {
    const safeUserId = String(safeUser.id || "").trim();
    if (!safeUserId || isSelfCard) return;
    const next = toggleUserFollow(safeUserId);
    setIsFollowed(next);
    setResolvedFollowers(getUserFollowerCount(safeUserId, Number(safeUser.followers || 0)));
  }

  const followFab = safeUser && !isMiniature && !isSelfCard
    ? buildUserFollowFabButton({
      userId: safeUser.id,
      isFollowed,
      followerCount: resolvedFollowers,
      className: isCompact ? "is-compact user-card-follow-fab-wrap" : "user-card-follow-fab-wrap",
      onToggle: handleToggleFollow,
    })
    : null;

  if (!safeUser) return null;

  return (
    <ObjectCardFrame
      objectType="user"
      objectId={safeUser.id}
      title={safeUser.name}
      sportLabel={favoriteSport}
      metricValue={0}
      image={safeUser.image}
      fallbackLabel={safeUser.name}
      primaryPath={`/user/${safeUser.id}`}
      primaryActionLabel={`Aller a ${safeUser.name}`}
      size={size}
      variant={variant}
      showTags={showTags}
      showMenu={showMenu}
      hideMetricChip
      hideSportChip={!isMiniature}
      headerAction={followFab}
      hideDetailFooterMeta={!isMiniature}
      className={`is-user-card ${className}`.trim()}
      baseFollowCount={Number(safeUser.followers || 0)}
    >
      <p className="object-card-line object-card-line-title typo-body-strong">
        <Link className="object-card-inline-link" to={`/user/${safeUser.id}`}>
          {safeUser.name}
        </Link>
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {safeUser.handle || "@user"} · {safeUser.location || "Monde"}
      </p>
      {!isMiniature && favoriteTags.length ? (
        <div className="user-card-favorite-tags" aria-label="Favoris">
          {favoriteTags.map((tag) => (
            <span key={tag.key} className="tag user-card-favorite-tag">
              {tag.label}
            </span>
          ))}
        </div>
      ) : null}
    </ObjectCardFrame>
  );
}

export default UserCard;
