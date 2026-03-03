function toDayDate(dateInput) {
  const date = dateInput instanceof Date ? new Date(dateInput.getTime()) : new Date(dateInput);
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatMonthLabel(dateInput) {
  return toDayDate(dateInput).toLocaleDateString("fr-FR", {
    month: "long",
  });
}

function shiftMonth(baseDateInput, delta) {
  const next = toDayDate(baseDateInput);
  next.setMonth(next.getMonth() + delta, 1);
  return next;
}

function shiftYear(baseDateInput, delta) {
  const next = toDayDate(baseDateInput);
  next.setFullYear(next.getFullYear() + delta);
  return next;
}

function CalendarPeriodSelector({
  baseDate,
  onChange,
  summary = "",
  className = "",
}) {
  const safeDate = toDayDate(baseDate || new Date());
  const monthLabel = formatMonthLabel(safeDate);
  const yearLabel = String(safeDate.getFullYear());
  const wrapperClassName = ["calendar-period-controls", className].filter(Boolean).join(" ");

  function handleChange(nextDate) {
    if (typeof onChange !== "function") return;
    onChange(toDayDate(nextDate));
  }

  return (
    <div className={wrapperClassName} aria-label="Selection du mois et de l annee">
      <div className="calendar-tag-selector" role="group" aria-label="Selection du mois">
        <button
          type="button"
          className="calendar-tag-arrow"
          aria-label="Mois precedent"
          onClick={() => handleChange(shiftMonth(safeDate, -1))}
        >
          &lsaquo;
        </button>
        <span className="calendar-tag-value">{monthLabel}</span>
        <button
          type="button"
          className="calendar-tag-arrow"
          aria-label="Mois suivant"
          onClick={() => handleChange(shiftMonth(safeDate, 1))}
        >
          &rsaquo;
        </button>
      </div>
      <div className="calendar-tag-selector" role="group" aria-label="Selection de l annee">
        <button
          type="button"
          className="calendar-tag-arrow"
          aria-label="Annee precedente"
          onClick={() => handleChange(shiftYear(safeDate, -1))}
        >
          &lsaquo;
        </button>
        <span className="calendar-tag-value">{yearLabel}</span>
        <button
          type="button"
          className="calendar-tag-arrow"
          aria-label="Annee suivante"
          onClick={() => handleChange(shiftYear(safeDate, 1))}
        >
          &rsaquo;
        </button>
      </div>
      {summary ? <p className="calendar-period-summary">{summary}</p> : null}
    </div>
  );
}

export default CalendarPeriodSelector;
