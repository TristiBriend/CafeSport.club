const ALLOWED_SCOPES = new Set([
  "all",
  "event",
  "team",
  "athlete",
  "user",
  "league",
  "list",
]);

function normalizeScope(scope) {
  const token = String(scope || "").trim().toLowerCase();
  return ALLOWED_SCOPES.has(token) ? token : "all";
}

function UnifiedSearchBar({
  value = "",
  onChange = () => {},
  id = "",
  name = "",
  onFocus,
  onBlur,
  onKeyDown,
  disabled = false,
  scope = "all",
  className = "",
  label = "",
  inputRef = null,
  ariaLabel = "Rechercher",
}) {
  const safeId = String(id || "").trim();
  const safeName = String(name || "").trim();
  const safeClassName = String(className || "").trim();
  const safeLabel = String(label || "").trim();
  const normalizedScope = normalizeScope(scope);
  const resolvedLabel = String(ariaLabel || "").trim() || "Rechercher";
  const rootClassName = ["unified-search-bar", safeClassName].filter(Boolean).join(" ");
  const inputProps = safeId ? { id: safeId } : {};

  return (
    <label className={rootClassName} htmlFor={safeId || undefined} data-search-scope={normalizedScope}>
      {safeLabel ? <span className="unified-search-bar-label">{safeLabel}</span> : null}
      <span className="unified-search-bar-field">
        <input
          {...inputProps}
          ref={inputRef}
          className="unified-search-bar-input"
          type="search"
          name={safeName || undefined}
          value={value}
          placeholder="Rechercher"
          aria-label={resolvedLabel}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
        <span className="unified-search-bar-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </span>
    </label>
  );
}

export default UnifiedSearchBar;
