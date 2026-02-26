import "./ScoreBadge.css";

function IconTeaserMegaphone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11.2v1.6c0 .7.5 1.2 1.2 1.2h2.2l.8 4.1c.1.5.6.9 1.2.9h1.2c.8 0 1.4-.8 1.2-1.6L10 14.6l6.6 2.6c.8.3 1.7-.3 1.7-1.2V8.1c0-.9-.9-1.5-1.7-1.2L10 9.4 9.6 7.6C9.5 7.1 9 6.8 8.4 6.8H7.2c-.8 0-1.4.8-1.2 1.6l.4 1.8H4.2c-.7 0-1.2.5-1.2 1.2Z" />
      <path d="M20.7 9.2a1 1 0 0 1 1.4.2 4.2 4.2 0 0 1 0 5.2 1 1 0 1 1-1.6-1.2 2.2 2.2 0 0 0 0-2.8 1 1 0 0 1 .2-1.4Z" />
    </svg>
  );
}

function toScorePercent(value, scale = "percent") {
  const raw = Number(value || 0);
  if (!Number.isFinite(raw)) return 0;
  const safeScale = scale === "percent" ? "percent" : "ten";
  const percent = safeScale === "ten"
    ? raw * 10
    : raw;
  return Math.max(0, Math.min(100, Math.round(percent)));
}

function ScoreBadge({
  value = 0,
  scale = "percent",
  variant = "badge",
}) {
  const percent = toScorePercent(value, scale);
  const isUnsetUserScore = variant === "user-chip" && percent <= 0;
  const displayedValue = isUnsetUserScore ? "N" : `${percent}`;
  const safeTitle = variant === "community-chip"
    ? "Score communaute"
    : variant === "teaser-chip"
      ? "Teaser"
      : (isUnsetUserScore ? "Noter" : "Mon score");

  if (variant === "user-chip") {
    return (
      <span className="event-corner-chip event-corner-chip-user" title={safeTitle} aria-label={safeTitle}>
        {displayedValue}
      </span>
    );
  }

  if (variant === "community-chip") {
    return (
      <span className="event-corner-chip event-corner-chip-community" title={safeTitle} aria-label={safeTitle}>
        {displayedValue}
      </span>
    );
  }

  if (variant === "teaser-chip") {
    return (
      <span className="event-corner-chip event-corner-chip-user event-corner-chip-teaser" title={safeTitle} aria-label={safeTitle}>
        <IconTeaserMegaphone />
      </span>
    );
  }

  return (
    <span
      className="score-badge small"
      aria-label={safeTitle}
      title={safeTitle}
    >
      <span className="score-badge-logo" aria-hidden="true" />
      <span className="score-badge-value">{displayedValue}</span>
    </span>
  );
}

export default ScoreBadge;
