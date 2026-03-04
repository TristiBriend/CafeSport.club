function normalizeKind(value) {
  const safeValue = String(value || "").trim().toLowerCase();
  if (safeValue === "event" || safeValue === "athlete") return safeValue;
  return "";
}

function joinMeta(parts = []) {
  return (Array.isArray(parts) ? parts : [])
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(" · ");
}

export function buildCompactSelectionMeta({
  kind = "",
  event = null,
  athlete = null,
  title = "",
  subtitle = "",
} = {}) {
  const safeKind = normalizeKind(kind);
  if (safeKind === "event" && event) {
    return {
      kind: safeKind,
      title: String(event?.title || "").trim() || "Evenement",
      subtitle: joinMeta([event?.league, event?.location, event?.date]),
    };
  }
  if (safeKind === "athlete" && athlete) {
    return {
      kind: safeKind,
      title: String(athlete?.name || "").trim() || "Athlete",
      subtitle: joinMeta([athlete?.sport, athlete?.country || athlete?.role]),
    };
  }
  return {
    kind: safeKind,
    title: String(title || "").trim() || (safeKind === "athlete" ? "Athlete" : "Evenement"),
    subtitle: String(subtitle || "").trim(),
  };
}

export function buildCompactSelectionMetaFromSearchResult(result = null) {
  const safeType = normalizeKind(result?.type);
  return buildCompactSelectionMeta({
    kind: safeType,
    title: result?.title,
    subtitle: result?.subtitle,
  });
}

function CompactSelectionRow({
  kind = "",
  title = "",
  subtitle = "",
  leadingLabel = null,
  interactive = false,
  selected = false,
  className = "",
  onClick,
  onKeyDown,
  trailingSlot = null,
}) {
  const safeKind = normalizeKind(kind);
  const safeTitle = String(title || "").trim() || (safeKind === "athlete" ? "Athlete" : "Evenement");
  const safeSubtitle = String(subtitle || "").trim();
  const safeLeadingLabel = String(leadingLabel || "").trim();
  const classes = [
    "compact-selection-row",
    safeKind ? `is-${safeKind}` : "",
    interactive ? "is-interactive" : "",
    selected ? "is-selected" : "",
    String(className || "").trim(),
  ].filter(Boolean).join(" ");
  const content = (
    <>
      {safeLeadingLabel ? (
        <span className="compact-selection-row-kind">{safeLeadingLabel}</span>
      ) : null}
      <span className="compact-selection-row-body">
        <span className="compact-selection-row-title">{safeTitle}</span>
        {safeSubtitle ? (
          <span className="compact-selection-row-subtitle">{safeSubtitle}</span>
        ) : null}
      </span>
      {trailingSlot ? (
        <span className="compact-selection-row-trailing">{trailingSlot}</span>
      ) : null}
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={classes}>
      {content}
    </div>
  );
}

export default CompactSelectionRow;
