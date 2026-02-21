import "./ScoreBadge.css";

function toScorePercent(value, scale = "ten") {
  const raw = Number(value || 0);
  if (!Number.isFinite(raw)) return 0;
  const safeScale = scale === "percent" ? "percent" : "ten";
  const percent = safeScale === "ten"
    ? raw * 10
    : raw;
  return Math.max(0, Math.min(100, Math.round(percent)));
}

function getScoreColor(percent) {
  if (percent >= 80) return "#3ca63a";
  if (percent >= 60) return "#6da737";
  if (percent >= 40) return "#d08d28";
  if (percent >= 20) return "#cb6834";
  return "#c84a4a";
}

function ScoreBadge({
  value = 0,
  scale = "ten",
  variant = "badge",
  className = "",
}) {
  const percent = toScorePercent(value, scale);
  const displayedValue = variant === "user-chip" && percent <= 0 ? "Noter" : `${percent}`;
  const safeTitle = variant === "community-chip" ? "Score communaute" : "Mon score";
  const extraClass = String(className || "").trim();

  if (variant === "user-chip") {
    return (
      <span className={`event-corner-chip event-corner-chip-user ${extraClass}`.trim()} title={safeTitle} aria-label={safeTitle}>
        {displayedValue}
      </span>
    );
  }

  if (variant === "community-chip") {
    return (
      <span className={`event-corner-chip event-corner-chip-community ${extraClass}`.trim()} title={safeTitle} aria-label={safeTitle}>
        {displayedValue}
      </span>
    );
  }

  return (
    <span
      className={`score-badge small ${extraClass}`.trim()}
      style={{ "--score-color": getScoreColor(percent) }}
      aria-label={safeTitle}
      title={safeTitle}
    >
      <span className="score-badge-logo" aria-hidden="true" />
      <span className="score-badge-value">{displayedValue}</span>
    </span>
  );
}

export default ScoreBadge;
