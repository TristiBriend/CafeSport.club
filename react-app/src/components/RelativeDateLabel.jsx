import { useEffect, useMemo, useState } from "react";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const MONTH_MS = 30 * DAY_MS;
const YEAR_MS = 365 * DAY_MS;

function toSafeTimestamp(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : NaN;
}

function formatUnit(count, single, plural = single) {
  return `${count} ${count > 1 ? plural : single}`;
}

export function formatRelativeMoment(value, nowMs = Date.now()) {
  const timestamp = toSafeTimestamp(value);
  if (!Number.isFinite(timestamp)) return "";

  const deltaMs = timestamp - nowMs;
  const isFuture = deltaMs > 0;
  const absMs = Math.abs(deltaMs);

  let unitMs = HOUR_MS;
  let label = "heure";
  let plural = "heures";

  if (absMs >= YEAR_MS) {
    unitMs = YEAR_MS;
    label = "an";
    plural = "ans";
  } else if (absMs >= MONTH_MS) {
    unitMs = MONTH_MS;
    label = "mois";
    plural = "mois";
  } else if (absMs >= DAY_MS) {
    unitMs = DAY_MS;
    label = "jour";
    plural = "jours";
  }

  const rounded = isFuture
    ? Math.ceil(absMs / unitMs)
    : Math.floor(absMs / unitMs);
  const count = Math.max(1, rounded);
  const body = formatUnit(count, label, plural);

  if (isFuture) return `Dans ${body}`;
  return `Il y'a ${body}`;
}

function RelativeDateLabel({ value, className = "" }) {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNowMs(Date.now());
    }, 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const label = useMemo(
    () => formatRelativeMoment(value, nowMs),
    [value, nowMs],
  );

  if (!label) return null;
  const classes = ["relative-date-element", className].filter(Boolean).join(" ");
  return <span className={classes}>{label}</span>;
}

export default RelativeDateLabel;
