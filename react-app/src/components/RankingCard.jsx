import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById, resolveListEntries } from "../services/catalogService";
import { buildAddWatchlistFabButton } from "./WatchlistFabButton";
import {
  FOLLOW_TARGET,
  getTargetFollowerCount,
  isTargetFollowed,
  toggleTargetFollow,
} from "../services/userFollowService";

function IconMore() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5.2" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="18.8" cy="12" r="1.8" />
    </svg>
  );
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

function resolveHeroImage(entries = []) {
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (entry?.type === "event" && entry?.event) {
      const image = getImagePath(entry.event.image);
      if (image) return image;
    }
  }
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (entry?.type === "athlete" && entry?.athlete) {
      const image = getImagePath(entry.athlete.image);
      if (image) return image;
    }
  }
  return "";
}

function resolvePreviewItem(entry) {
  if (entry?.type === "event" && entry?.event?.id) {
    return {
      key: entry.id,
      label: entry.event.title,
      to: `/event/${entry.event.id}`,
      image: getImagePath(entry.event.image),
      initials: getInitials(entry.event.title),
    };
  }
  if (entry?.type === "athlete" && entry?.athlete?.id) {
    return {
      key: entry.id,
      label: entry.athlete.name,
      to: `/athlete/${entry.athlete.id}`,
      image: getImagePath(entry.athlete.image),
      initials: getInitials(entry.athlete.name),
    };
  }
  return null;
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

function buildListFeedPath(listId) {
  const safeId = String(listId || "").trim();
  if (!safeId) return "/feed";
  const params = new URLSearchParams({
    scope: "object",
    mode: "recent",
    targetType: "list",
    targetId: safeId,
  });
  return `/feed?${params.toString()}`;
}

function RankingCard({ list, showOwner = true, maxPreview = 5, className = "" }) {
  const entries = resolveListEntries(list);
  const owner = getUserById(list?.ownerId);
  const previewItems = entries.map(resolvePreviewItem).filter(Boolean);
  const visibleItems = previewItems.slice(0, maxPreview);
  const remaining = Math.max(0, previewItems.length - visibleItems.length);
  const heroImage = resolveHeroImage(entries);
  const listTitle = String(list?.title || "cette list").trim() || "cette list";
  const sportLabel = String(list?.sport || "").trim();
  const sportSlug = toSportSlug(sportLabel);
  const sportPath = sportSlug ? `/sports/${sportSlug}` : "";
  const sportActionLabel = sportLabel ? `Aller a ${sportLabel}` : "";
  const listPath = list?.id ? `/list/${list.id}` : "/lists";
  const listActionLabel = listTitle ? `Aller a ${listTitle}` : "Aller a la list";
  const ownerActionLabel = String(owner?.name || "").trim()
    ? `Aller a ${String(owner?.name || "").trim()}`
    : "";
  const feedPath = buildListFeedPath(list?.id);
  const baseFavoriteCount = Math.max(0, Number(list?.likes || 0));
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [resolvedFavoriteCount, setResolvedFavoriteCount] = useState(baseFavoriteCount);
  const moreMenuRef = useRef(null);
  const canToggleFavorite = Boolean(String(list?.id || "").trim());
  const followActionLabel = isFavorite
    ? `Ne plus suivre ${listTitle}`
    : `Suivre ${listTitle}`;

  useEffect(() => {
    const safeListId = String(list?.id || "").trim();
    if (!safeListId) {
      setIsFavorite(false);
      setResolvedFavoriteCount(baseFavoriteCount);
      return;
    }
    setIsFavorite(isTargetFollowed(FOLLOW_TARGET.LIST, safeListId));
    setResolvedFavoriteCount(
      getTargetFollowerCount(FOLLOW_TARGET.LIST, safeListId, baseFavoriteCount),
    );
  }, [baseFavoriteCount, list?.id]);

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

  function handleToggleMoreMenu() {
    setIsMoreMenuOpen((value) => !value);
  }

  function handleToggleFavorite() {
    const safeListId = String(list?.id || "").trim();
    if (!safeListId) return;
    const nextValue = toggleTargetFollow(FOLLOW_TARGET.LIST, safeListId);
    setIsFavorite(nextValue);
    setResolvedFavoriteCount(
      getTargetFollowerCount(FOLLOW_TARGET.LIST, safeListId, baseFavoriteCount),
    );
  }

  function handleToggleFollowFromMenu() {
    if (!canToggleFavorite) return;
    handleToggleFavorite();
    setIsMoreMenuOpen(false);
  }

  if (!list) return null;

  return (
    <article className={`list-card ranking-card ${isMoreMenuOpen ? "is-more-open" : ""} ${className}`.trim()}>
      <div className="ranking-card-head-outside">
        <div className="ranking-card-head-top">
          <span className="event-corner-chip event-corner-chip-sport ranking-card-sport-chip">
            {sportLabel || "Sport"}
          </span>
          {buildAddWatchlistFabButton({
            eventId: String(list?.id || "").trim(),
            isSaved: isFavorite,
            watchlistCount: resolvedFavoriteCount,
            className: "ranking-card-fav-wrap",
            activeLabel: `Ne plus suivre ${listTitle}`,
            inactiveLabel: `Suivre ${listTitle}`,
            onToggle: canToggleFavorite ? handleToggleFavorite : null,
          })}
          <div className="ranking-card-more-menu" ref={moreMenuRef}>
            <button
              className="ranking-card-more-btn"
              type="button"
              aria-label="Options de la carte classement"
              aria-haspopup="menu"
              aria-expanded={isMoreMenuOpen}
              onClick={handleToggleMoreMenu}
            >
              <IconMore />
            </button>
            {isMoreMenuOpen ? (
              <div className="ranking-card-more-popover" role="menu" aria-label="Actions classement">
                <button
                  type="button"
                  className="ranking-card-more-action"
                  role="menuitem"
                  onClick={handleToggleFollowFromMenu}
                  disabled={!canToggleFavorite}
                >
                  {followActionLabel}
                </button>
                <Link
                  to={feedPath}
                  className="ranking-card-more-action"
                  role="menuitem"
                  onClick={() => setIsMoreMenuOpen(false)}
                >
                  Voir le feed
                </Link>
                <Link
                  to={listPath}
                  className="ranking-card-more-action"
                  role="menuitem"
                  onClick={() => setIsMoreMenuOpen(false)}
                >
                  {listActionLabel}
                </Link>
                {sportPath && sportActionLabel ? (
                  <Link
                    to={sportPath}
                    className="ranking-card-more-action"
                    role="menuitem"
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    {sportActionLabel}
                  </Link>
                ) : null}
                {owner?.id && ownerActionLabel ? (
                  <Link
                    to={`/user/${owner.id}`}
                    className="ranking-card-more-action"
                    role="menuitem"
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    {ownerActionLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="ranking-card-media">
        {heroImage ? <img src={heroImage} alt={list.title} loading="lazy" /> : null}
        <div className={`ranking-card-media-overlay ${heroImage ? "" : "is-no-image"}`.trim()}>
          {!heroImage ? <span className="ranking-card-media-fallback">{getInitials(list.title)}</span> : null}
          {visibleItems.length ? (
            <div className="ranking-card-miniatures" aria-label={`Elements de la liste (${previewItems.length})`}>
              {visibleItems.map((item) => (
                <Link key={item.key} className="ranking-card-miniature" to={item.to} aria-label={item.label}>
                  <span className="ranking-card-miniature-avatar" aria-hidden="true">
                    {item.image ? <img src={item.image} alt="" loading="lazy" /> : item.initials}
                  </span>
                </Link>
              ))}
              {remaining > 0 ? (
                <span className="ranking-card-miniature ranking-card-miniature-overflow" aria-label={`${remaining} elements supplementaires`}>
                  <span className="ranking-card-miniature-avatar">+{remaining}</span>
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="ranking-card-overlay-text">
            {showOwner ? (
              <p className="ranking-card-owner-in-media event-meta">
                {owner?.id ? (
                  <Link className="user-link" to={`/user/${owner.id}`}>
                    {owner.name}
                  </Link>
                ) : (
                  "Auteur inconnu"
                )}
              </p>
            ) : null}
            <h3 className="ranking-card-title ranking-card-title-in-media">
              <Link className="user-link" to={`/list/${list.id}`}>
                {list.title}
              </Link>
            </h3>
            <p className="muted ranking-card-description ranking-card-description-in-media">
              {list.description || "Sans description"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default RankingCard;
