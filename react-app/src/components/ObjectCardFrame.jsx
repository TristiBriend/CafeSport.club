import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ObjectTagsWidget from "./ObjectTagsWidget";
import ScoreBadge from "./ScoreBadge";
import {
  getTargetFollowerCount,
  isTargetFollowed,
  toggleTargetFollow,
} from "../services/userFollowService";
import { useSocialSync } from "../contexts/SocialSyncContext";

function IconMore() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5.2" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="18.8" cy="12" r="1.8" />
    </svg>
  );
}

const OBJECT_CARD_SIZES = new Set(["large", "medium", "small", "miniature"]);

function normalizeObjectCardSize(size) {
  const raw = String(size || "").trim().toLowerCase();
  if (!raw || raw === "default") return "medium";
  if (raw === "compact") return "small";
  if (OBJECT_CARD_SIZES.has(raw)) return raw;
  return "medium";
}

function toSportSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getImagePath(value) {
  const image = String(value || "").trim();
  if (!image) return "";
  return image.startsWith("/") ? image : `/${image}`;
}

function getInitials(value) {
  const source = String(value || "").trim();
  if (!source) return "?";
  const [first = "", second = ""] = source.split(/\s+/);
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase() || "?";
}

function toPercentScore(value) {
  const raw = Number(value || 0);
  if (!Number.isFinite(raw)) return 0;
  const scaled = raw <= 10 ? raw * 10 : raw;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

function buildObjectFeedPath(targetType, targetId) {
  const safeType = String(targetType || "").trim();
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) return "/feed";
  const params = new URLSearchParams({
    scope: "object",
    mode: "recent",
    targetType: safeType,
    targetId: safeId,
  });
  return `/feed?${params.toString()}`;
}

function ObjectCardFrame({
  objectType,
  objectId,
  title,
  sportLabel = "",
  metricValue = 0,
  image = "",
  fallbackLabel = "",
  primaryPath = "",
  primaryActionLabel = "Voir la page",
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
  baseFollowCount = 0,
  menuExtraActions = [],
  children,
}) {
  const normalizedSize = normalizeObjectCardSize(size);
  const isCompact = normalizedSize === "small";
  const metricPercent = toPercentScore(metricValue);
  const imagePath = getImagePath(image);
  const fallbackInitials = getInitials(fallbackLabel || title);
  const sportPath = useMemo(() => {
    const slug = toSportSlug(sportLabel);
    return slug ? `/sports/${slug}` : "";
  }, [sportLabel]);
  const sportActionLabel = String(sportLabel || "").trim()
    ? `Aller a ${String(sportLabel).trim()}`
    : "";
  const feedPath = useMemo(
    () => buildObjectFeedPath(objectType, objectId),
    [objectId, objectType],
  );
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [resolvedFollowers, setResolvedFollowers] = useState(Number(baseFollowCount || 0));
  const moreMenuRef = useRef(null);
  const { revisionByDomain } = useSocialSync();
  const followsRevision = Number(revisionByDomain?.follows || 0);

  useEffect(() => {
    const safeType = String(objectType || "").trim();
    const safeId = String(objectId || "").trim();
    if (!safeType || !safeId) {
      setIsFollowed(false);
      setResolvedFollowers(Math.max(0, Number(baseFollowCount || 0)));
      return;
    }
    setIsFollowed(isTargetFollowed(safeType, safeId));
    setResolvedFollowers(getTargetFollowerCount(safeType, safeId, Number(baseFollowCount || 0)));
  }, [baseFollowCount, objectId, objectType, followsRevision]);

  useEffect(() => {
    if (!isMoreMenuOpen) return undefined;
    function handlePointerDown(event) {
      if (!moreMenuRef.current?.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMoreMenuOpen(false);
      }
    }
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMoreMenuOpen]);

  function handleToggleMenu() {
    setIsMoreMenuOpen((value) => !value);
  }

  function handleToggleFollow() {
    const safeType = String(objectType || "").trim();
    const safeId = String(objectId || "").trim();
    if (!safeType || !safeId) return;
    const next = toggleTargetFollow(safeType, safeId);
    setIsFollowed(next);
    setResolvedFollowers(getTargetFollowerCount(safeType, safeId, Number(baseFollowCount || 0)));
    setIsMoreMenuOpen(false);
  }

  const followLabel = isFollowed
    ? `Ne plus suivre ${String(title || "cet objet").trim()}`
    : `Suivre ${String(title || "cet objet").trim()}`;

  return (
    <div
      className={`object-card-shell ${isCompact ? "compact" : ""} ${isMoreMenuOpen ? "is-more-open" : ""}`.trim()}
      data-size={normalizedSize}
    >
      <article
        className={`object-card ${variant === "detail" ? "is-detail" : "is-listing"} ${isMoreMenuOpen ? "is-more-open" : ""} ${className}`.trim()}
      >
        <div className="event-corner-meta" aria-label={`${sportLabel}, score ${metricPercent}`}>
          <span className="event-corner-leading">
            <ScoreBadge variant="community-chip" value={metricPercent} scale="percent" />
          </span>
          <span className="event-corner-trailing">
            {sportLabel ? (
              <span className="event-corner-chip event-corner-chip-sport" title={sportLabel}>
                {sportLabel}
              </span>
            ) : null}
            {showMenu ? (
              <div className="object-card-more-menu" ref={moreMenuRef}>
                <button
                  type="button"
                  className="object-card-more-btn"
                  aria-label="Options de la carte"
                  aria-haspopup="menu"
                  aria-expanded={isMoreMenuOpen}
                  onClick={handleToggleMenu}
                >
                  <IconMore />
                </button>
                {isMoreMenuOpen ? (
                  <div className="object-card-more-popover" role="menu" aria-label="Actions">
                    <button type="button" className="object-card-more-action" role="menuitem" onClick={handleToggleFollow}>
                      {followLabel}
                    </button>
                    <Link
                      to={feedPath}
                      className="object-card-more-action"
                      role="menuitem"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      Ouvrir le feed
                    </Link>
                    {primaryPath ? (
                      <Link
                        to={primaryPath}
                        className="object-card-more-action"
                        role="menuitem"
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        {primaryActionLabel}
                      </Link>
                    ) : null}
                    {sportPath && sportActionLabel ? (
                      <Link
                        to={sportPath}
                        className="object-card-more-action"
                        role="menuitem"
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        {sportActionLabel}
                      </Link>
                    ) : null}
                    {Array.isArray(menuExtraActions)
                      ? menuExtraActions.map((action) => {
                        const key = `${action?.label || ""}-${action?.to || ""}`;
                        if (action?.to) {
                          return (
                            <Link
                              key={key}
                              to={action.to}
                              className="object-card-more-action"
                              role="menuitem"
                              onClick={() => setIsMoreMenuOpen(false)}
                            >
                              {action.label}
                            </Link>
                          );
                        }
                        return (
                          <button
                            key={key}
                            type="button"
                            className="object-card-more-action"
                            role="menuitem"
                            disabled={Boolean(action?.disabled)}
                            onClick={() => setIsMoreMenuOpen(false)}
                          >
                            {action?.label || "Action"}
                          </button>
                        );
                      })
                      : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </span>
        </div>

        <div className="object-card-body">
          <div className="object-card-media">
            {imagePath ? <img src={imagePath} alt={String(title || "").trim() || "Object"} loading="lazy" /> : null}
            <div className={`object-card-media-overlay ${imagePath ? "" : "is-no-image"}`.trim()}>
              {!imagePath ? <span className="object-card-media-fallback">{fallbackInitials}</span> : null}
              <div className="object-card-description">{children}</div>
              {showTags ? (
                <div className="object-card-tags">
                  <ObjectTagsWidget objectType={objectType} objectId={objectId} title="Tags" compact />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {variant === "detail" ? (
          <p className="object-card-followers event-meta">
            {Math.max(0, Number(resolvedFollowers || 0)).toLocaleString("fr-FR")} followers
          </p>
        ) : null}
      </article>
    </div>
  );
}

export default ObjectCardFrame;
