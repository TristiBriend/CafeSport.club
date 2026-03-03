function toMonthDate(value) {
  const raw = String(value || "").trim();
  if (raw) {
    const normalized = raw.length >= 7
      ? `${raw.slice(0, 7)}-01`
      : raw;
    const parsed = new Date(normalized);
    if (!Number.isNaN(parsed.getTime())) {
      parsed.setHours(0, 0, 0, 0);
      parsed.setDate(1);
      return parsed;
    }
  }
  const fallback = new Date();
  fallback.setHours(0, 0, 0, 0);
  fallback.setDate(1);
  return fallback;
}

function formatMonthLabel(dateInput) {
  return toMonthDate(dateInput).toLocaleDateString("fr-FR", {
    month: "long",
  });
}

function formatOutputValue(dateInput, inputType, previousValue = "") {
  const safeDate = toMonthDate(dateInput);
  const year = safeDate.getFullYear();
  const month = String(safeDate.getMonth() + 1).padStart(2, "0");
  if (inputType === "month") {
    return `${year}-${month}`;
  }

  const previous = String(previousValue || "").trim();
  const previousDay = /^\d{4}-\d{2}-(\d{2})$/.exec(previous)?.[1] || "01";
  return `${year}-${month}-${previousDay}`;
}

function shiftMonth(baseDateInput, delta) {
  const next = toMonthDate(baseDateInput);
  next.setMonth(next.getMonth() + delta, 1);
  return next;
}

function shiftYear(baseDateInput, delta) {
  const next = toMonthDate(baseDateInput);
  next.setFullYear(next.getFullYear() + delta);
  return next;
}

function clampDate(baseDate, minValue, maxValue) {
  const next = toMonthDate(baseDate);
  const minDate = minValue ? toMonthDate(minValue) : null;
  const maxDate = maxValue ? toMonthDate(maxValue) : null;
  if (minDate && next < minDate) return minDate;
  if (maxDate && next > maxDate) return maxDate;
  return next;
}

function CalendarRangeField({
  label,
  value,
  minValue = "",
  maxValue = "",
  onChange = null,
  inputType = "month",
  previousValue = "",
}) {
  const safeDate = toMonthDate(value);
  const monthLabel = formatMonthLabel(safeDate);
  const yearLabel = String(safeDate.getFullYear());

  function applyNext(nextDate) {
    if (typeof onChange !== "function") return;
    const clamped = clampDate(nextDate, minValue, maxValue);
    onChange(formatOutputValue(clamped, inputType, previousValue));
  }

  return (
    <div className="calendar-period-range-field">
      <span className="calendar-period-range-label">{label}</span>
      <div className="calendar-period-range-controls">
        <div className="calendar-tag-selector" role="group" aria-label={`Selection du mois (${label})`}>
          <button
            type="button"
            className="calendar-tag-arrow"
            aria-label={`${label} mois precedent`}
            onClick={() => applyNext(shiftMonth(safeDate, -1))}
          >
            &lsaquo;
          </button>
          <span className="calendar-tag-value">{monthLabel}</span>
          <button
            type="button"
            className="calendar-tag-arrow"
            aria-label={`${label} mois suivant`}
            onClick={() => applyNext(shiftMonth(safeDate, 1))}
          >
            &rsaquo;
          </button>
        </div>
        <div className="calendar-tag-selector" role="group" aria-label={`Selection de l annee (${label})`}>
          <button
            type="button"
            className="calendar-tag-arrow"
            aria-label={`${label} annee precedente`}
            onClick={() => applyNext(shiftYear(safeDate, -1))}
          >
            &lsaquo;
          </button>
          <span className="calendar-tag-value">{yearLabel}</span>
          <button
            type="button"
            className="calendar-tag-arrow"
            aria-label={`${label} annee suivante`}
            onClick={() => applyNext(shiftYear(safeDate, 1))}
          >
            &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
}

function CalendarPeriodRangeSelector({
  inputType = "month",
  fromId = "",
  toId = "",
  fromLabel = "De",
  toLabel = "A",
  fromValue = "",
  toValue = "",
  onFromChange = null,
  onToChange = null,
  fromMin = "",
  fromMax = "",
  toMin = "",
  toMax = "",
  className = "",
}) {
  const wrapperClassName = ["calendar-period-range", "calendar-period-controls", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName} data-from-id={fromId || undefined} data-to-id={toId || undefined}>
      <CalendarRangeField
        label={fromLabel}
        value={fromValue}
        minValue={fromMin}
        maxValue={fromMax}
        onChange={onFromChange}
        inputType={inputType}
        previousValue={fromValue}
      />
      <CalendarRangeField
        label={toLabel}
        value={toValue}
        minValue={toMin}
        maxValue={toMax}
        onChange={onToChange}
        inputType={inputType}
        previousValue={toValue}
      />
    </div>
  );
}

export default CalendarPeriodRangeSelector;
