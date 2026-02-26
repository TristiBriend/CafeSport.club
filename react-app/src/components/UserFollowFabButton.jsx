function formatFollowerCount(value) {
  const safe = Number(value || 0);
  if (!Number.isFinite(safe)) return "0";
  return Math.max(0, safe).toLocaleString("fr-FR");
}

export function buildUserFollowFabButton(options = {}) {
  const {
    userId = "",
    isFollowed = false,
    followerCount = 0,
    className = "",
    buttonClassName = "",
    countClassName = "",
    activeLabel = "Ne plus suivre",
    inactiveLabel = "Suivre",
    activeSymbol = "✓",
    inactiveSymbol = "+",
    onToggle = null,
  } = options;

  const safeCount = formatFollowerCount(followerCount);
  const label = `${isFollowed ? activeLabel : inactiveLabel} (${safeCount})`;
  const wrapClass = className
    ? `follow-btn-fab-wrap watchlist-btn-fab-wrap ${className}`
    : "follow-btn-fab-wrap watchlist-btn-fab-wrap";
  const buttonClass = `watchlist-btn watchlist-btn-fab follow-btn-fab ${isFollowed ? "is-saved" : ""} ${buttonClassName}`.trim();
  const countClass = `watchlist-btn-fab-count follow-btn-fab-count ${countClassName}`.trim();

  return (
    <span className={wrapClass}>
      <button
        className={buttonClass}
        type="button"
        data-user-id={userId || undefined}
        aria-label={label}
        title={label}
        onClick={typeof onToggle === "function" ? onToggle : undefined}
      >
        {isFollowed ? activeSymbol : inactiveSymbol}
      </button>
      <span className={countClass}>{safeCount}</span>
    </span>
  );
}
