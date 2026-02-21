function formatWatchlistCount(value) {
  const safe = Number(value || 0);
  if (!Number.isFinite(safe)) return "0";
  return Math.max(0, safe).toLocaleString("fr-FR");
}

export function buildAddWatchlistFabButton(options = {}) {
  const {
    eventId = "",
    isSaved = false,
    watchlistCount = 0,
    className = "",
    buttonClassName = "",
    countClassName = "",
    activeLabel = "Retirer de la watchlist",
    inactiveLabel = "Ajouter a la watchlist",
    activeSymbol = "✓",
    inactiveSymbol = "+",
    onToggle = null,
  } = options;

  const safeCount = formatWatchlistCount(watchlistCount);
  const label = `${isSaved ? activeLabel : inactiveLabel} (${safeCount})`;
  const wrapClass = className ? `watchlist-btn-fab-wrap ${className}` : "watchlist-btn-fab-wrap";
  const buttonClass = `watchlist-btn watchlist-btn-fab ${buttonClassName}`.trim();
  const countClass = `watchlist-btn-fab-count ${countClassName}`.trim();

  return (
    <span className={wrapClass}>
      <button
        className={buttonClass}
        type="button"
        data-event-id={eventId || undefined}
        aria-label={label}
        title={label}
        onClick={typeof onToggle === "function" ? onToggle : undefined}
      >
        {isSaved ? activeSymbol : inactiveSymbol}
      </button>
      <span className={countClass}>{safeCount}</span>
    </span>
  );
}
