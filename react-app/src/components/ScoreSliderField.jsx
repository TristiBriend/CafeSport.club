import ScoreBadge from "./ScoreBadge";

function toFiniteNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function normalizeScore(value, min, max) {
  const raw = toFiniteNumber(value, min);
  const bounded = Math.max(min, Math.min(max, raw));
  return Math.round(bounded);
}

function ScoreSliderField({
  id,
  label = "Note (0-100)",
  value = 0,
  onChange = () => {},
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = "",
}) {
  const safeMin = toFiniteNumber(min, 0);
  const safeMaxRaw = toFiniteNumber(max, 100);
  const safeMax = safeMaxRaw >= safeMin ? safeMaxRaw : safeMin;
  const safeStep = Math.max(1, Math.round(toFiniteNumber(step, 1)));
  const safeValue = normalizeScore(value, safeMin, safeMax);
  const rootClassName = ["score-slider-field", className].filter(Boolean).join(" ");

  function handleChange(event) {
    const next = normalizeScore(event?.target?.value, safeMin, safeMax);
    onChange(next);
  }

  return (
    <label className={rootClassName} htmlFor={id}>
      <span>{label}</span>
      <div className="score-slider-top">
        <ScoreBadge variant="user-chip" value={safeValue} scale="percent" />
        <input
          id={id}
          className="score-slider-input"
          type="range"
          min={safeMin}
          max={safeMax}
          step={safeStep}
          value={safeValue}
          disabled={disabled}
          onChange={handleChange}
        />
      </div>
    </label>
  );
}

export default ScoreSliderField;
