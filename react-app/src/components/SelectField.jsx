function SelectField({
  id,
  label = "",
  value = "",
  onChange = () => {},
  options = [],
  children = null,
  disabled = false,
  required = false,
  className = "",
  selectClassName = "",
  labelClassName = "",
  ariaLabel = "",
}) {
  const rootClassName = ["select-field", String(className || "").trim()]
    .filter(Boolean)
    .join(" ");
  const textLabel = String(label || "").trim();
  const resolvedAriaLabel = String(ariaLabel || "").trim();
  const controlClassName = ["select-field-control", String(selectClassName || "").trim()]
    .filter(Boolean)
    .join(" ");
  const labelClass = ["select-field-label", String(labelClassName || "").trim()]
    .filter(Boolean)
    .join(" ");

  function handleChange(event) {
    if (typeof onChange !== "function") return;
    onChange(event.target.value);
  }

  return (
    <label className={rootClassName} htmlFor={id || undefined}>
      {textLabel ? <span className={labelClass}>{textLabel}</span> : null}
      <select
        id={id}
        className={controlClassName}
        value={value}
        onChange={handleChange}
        disabled={Boolean(disabled)}
        required={Boolean(required)}
        aria-label={resolvedAriaLabel || undefined}
      >
        {children || (
          (Array.isArray(options) ? options : []).map((option) => {
            const safeValue = option?.value;
            const safeLabel = String(option?.label ?? safeValue ?? "").trim();
            if (!safeLabel && safeValue == null) return null;
            return (
              <option
                key={`${String(safeValue ?? safeLabel)}`}
                value={safeValue}
                disabled={Boolean(option?.disabled)}
              >
                {safeLabel}
              </option>
            );
          })
        )}
      </select>
    </label>
  );
}

export default SelectField;
