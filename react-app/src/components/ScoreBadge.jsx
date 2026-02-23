import "./ScoreBadge.css";

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
  const displayedValue = variant === "user-chip" && percent <= 0 ? "Noter" : `${percent}`;
  const safeTitle = variant === "community-chip" ? "Score communaute" : "Mon score";

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
