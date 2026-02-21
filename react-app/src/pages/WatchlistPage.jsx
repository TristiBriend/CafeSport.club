import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { buildAddWatchlistFabButton } from "../components/WatchlistFabButton";
import { filterEvents, getWatchlistEvents } from "../services/eventsService";
import { isUpcomingEvent } from "../services/ratingsService";

const WATCHLIST_VIEW = {
  CALENDAR: "calendar",
  LIST: "list",
};

const WEEKDAY_LABELS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

function toTimestamp(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function toDayDate(dateInput) {
  const date = dateInput instanceof Date ? new Date(dateInput.getTime()) : new Date(dateInput);
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDateKey(dateInput) {
  const date = toDayDate(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

function buildMonthGridDates(baseDateInput) {
  const baseDate = toDayDate(baseDateInput);
  const monthStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const monthEnd = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);

  const gridStart = new Date(monthStart.getTime());
  const startOffset = (gridStart.getDay() + 6) % 7;
  gridStart.setDate(gridStart.getDate() - startOffset);

  const gridEnd = new Date(monthEnd.getTime());
  const endOffset = 6 - ((gridEnd.getDay() + 6) % 7);
  gridEnd.setDate(gridEnd.getDate() + endOffset);

  const weeks = [];
  const cursor = new Date(gridStart.getTime());
  while (cursor <= gridEnd) {
    const week = [];
    for (let i = 0; i < 7; i += 1) {
      week.push(new Date(cursor.getTime()));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function WatchlistPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const [sportFilter, setSportFilter] = useState("Tous");
  const [viewMode, setViewMode] = useState(WATCHLIST_VIEW.CALENDAR);
  const [baseDate, setBaseDate] = useState(() => toDayDate(new Date()));

  const watchlistSet = useMemo(() => new Set(watchlistIds), [watchlistIds]);

  const watchlistEvents = useMemo(
    () => getWatchlistEvents(watchlistIds),
    [watchlistIds],
  );

  const availableSports = useMemo(() => {
    return Array.from(new Set(watchlistEvents.map((event) => event.sport).filter(Boolean)))
      .sort((a, b) => a.localeCompare(b));
  }, [watchlistEvents]);

  const safeSportFilter = sportFilter === "Tous" || availableSports.includes(sportFilter)
    ? sportFilter
    : "Tous";

  const filtered = useMemo(
    () => filterEvents(watchlistEvents, { sportFilter: safeSportFilter }),
    [safeSportFilter, watchlistEvents],
  );

  const monthStart = useMemo(
    () => new Date(baseDate.getFullYear(), baseDate.getMonth(), 1),
    [baseDate],
  );
  const monthEndExclusive = useMemo(
    () => new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1),
    [baseDate],
  );

  const monthEvents = useMemo(() => {
    return filtered.filter((event) => {
      const ts = toTimestamp(event.dateISO || event.date);
      if (!ts) return false;
      return ts >= monthStart.getTime() && ts < monthEndExclusive.getTime();
    });
  }, [filtered, monthEndExclusive, monthStart]);

  const monthGridWeeks = useMemo(
    () => buildMonthGridDates(baseDate),
    [baseDate],
  );

  const eventsByDateKey = useMemo(() => {
    const map = new Map();
    monthEvents.forEach((event) => {
      const ts = toTimestamp(event.dateISO || event.date);
      if (!ts) return;
      const key = formatDateKey(new Date(ts));
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    });
    map.forEach((items, key) => {
      map.set(
        key,
        items.slice().sort((left, right) => Number(right.communityScore || 0) - Number(left.communityScore || 0)),
      );
    });
    return map;
  }, [monthEvents]);

  const groupedByLeague = useMemo(() => {
    const map = new Map();
    monthEvents.forEach((event) => {
      const key = event.league || "Competition";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    });

    return Array.from(map.entries())
      .map(([league, items]) => ({
        league,
        items: items.slice().sort((a, b) => toTimestamp(a.dateISO || a.date) - toTimestamp(b.dateISO || b.date)),
      }))
      .sort((a, b) => {
        const aTime = a.items[0] ? toTimestamp(a.items[0].dateISO || a.items[0].date) : 0;
        const bTime = b.items[0] ? toTimestamp(b.items[0].dateISO || b.items[0].date) : 0;
        return aTime - bTime;
      });
  }, [monthEvents]);

  const monthLabel = formatMonthLabel(baseDate);
  const yearLabel = String(baseDate.getFullYear());
  const monthEventWord = monthEvents.length > 1 ? "evenements" : "evenement";

  return (
    <section className="watchlist-page">
      <div className="discover-head">
        <h1>Watchlist</h1>
        <p className="lede">
          Donnees importees du storage legacy. {watchlistEvents.length} evenement(s) suivi(s).
        </p>
      </div>

      <div className="calendar-mode-switch" role="group" aria-label="Mode d affichage watchlist">
        <button
          className={`calendar-mode-btn ${viewMode === WATCHLIST_VIEW.CALENDAR ? "is-active" : ""}`}
          onClick={() => setViewMode(WATCHLIST_VIEW.CALENDAR)}
          type="button"
        >
          Calendrier
        </button>
        <button
          className={`calendar-mode-btn ${viewMode === WATCHLIST_VIEW.LIST ? "is-active" : ""}`}
          onClick={() => setViewMode(WATCHLIST_VIEW.LIST)}
          type="button"
        >
          Liste
        </button>
      </div>

      <div className="calendar-period-controls" aria-label="Selection du mois et de l annee">
        <div className="calendar-tag-selector" role="group" aria-label="Selection du mois">
          <button
            type="button"
            className="calendar-tag-arrow"
            aria-label="Mois precedent"
            onClick={() => setBaseDate((prev) => shiftMonth(prev, -1))}
          >
            &lsaquo;
          </button>
          <span className="calendar-tag-value">{monthLabel}</span>
          <button
            type="button"
            className="calendar-tag-arrow"
            aria-label="Mois suivant"
            onClick={() => setBaseDate((prev) => shiftMonth(prev, 1))}
          >
            &rsaquo;
          </button>
        </div>
        <div className="calendar-tag-selector" role="group" aria-label="Selection de l annee">
          <button
            type="button"
            className="calendar-tag-arrow"
            aria-label="Annee precedente"
            onClick={() => setBaseDate((prev) => shiftYear(prev, -1))}
          >
            &lsaquo;
          </button>
          <span className="calendar-tag-value">{yearLabel}</span>
          <button
            type="button"
            className="calendar-tag-arrow"
            aria-label="Annee suivante"
            onClick={() => setBaseDate((prev) => shiftYear(prev, 1))}
          >
            &rsaquo;
          </button>
        </div>
        <p className="calendar-period-summary">{monthEvents.length} {monthEventWord}</p>
      </div>

      <div className="watchlist-controls">
        <label className="select-wrap" htmlFor="watchlist-sport-filter">
          <span>Sport</span>
          <select
            id="watchlist-sport-filter"
            value={safeSportFilter}
            onChange={(event) => setSportFilter(event.target.value)}
          >
            <option value="Tous">Tous</option>
            {availableSports.map((sport) => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </label>
      </div>

      {watchlistEvents.length === 0 ? (
        <div className="simple-page">
          <p>Ta watchlist est vide. Ajoute des evenements depuis la page Decouvrir.</p>
        </div>
      ) : null}

      {watchlistEvents.length > 0 && monthEvents.length === 0 ? (
        <div className="simple-page">
          <p>Aucun evenement pour ce mois avec les filtres actifs.</p>
        </div>
      ) : null}

      {watchlistEvents.length > 0 && monthEvents.length > 0 && viewMode === WATCHLIST_VIEW.CALENDAR ? (
        <section className="calendar-list is-month-grid">
          <div className="calendar-month-grid">
            <div className="calendar-week calendar-week-head">
              {WEEKDAY_LABELS.map((label) => <span key={label}>{label}</span>)}
            </div>

            {monthGridWeeks.map((week) => (
              <div key={formatDateKey(week[0])} className="calendar-week">
                {week.map((day) => {
                  const key = formatDateKey(day);
                  const dayEvents = eventsByDateKey.get(key) || [];
                  const isCurrentMonth = day.getMonth() === baseDate.getMonth();
                  const isToday = key === formatDateKey(new Date());
                  return (
                    <div
                      key={key}
                      className={`calendar-day ${isCurrentMonth ? "" : "is-dim"} ${isToday ? "is-today" : ""}`.trim()}
                    >
                      <div className="calendar-day-head">
                        <span className="calendar-day-number">{day.getDate()}</span>
                        {dayEvents.length ? <span className="calendar-day-count">{dayEvents.length}</span> : null}
                      </div>
                      <div className="calendar-day-events">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`calendar-chip ${isUpcomingEvent(event) ? "is-upcoming" : "is-past"}`}
                          >
                            <Link className="calendar-chip-title" to={`/event/${event.id}`}>
                              {event.title}
                            </Link>
                            <span className="calendar-chip-right">
                              <span className="event-corner-chip calendar-chip-sport-chip">{event.sport}</span>
                              {buildAddWatchlistFabButton({
                                eventId: event.id,
                                isSaved: watchlistSet.has(event.id),
                                watchlistCount: Math.max(
                                  0,
                                  Number(event?.watchlistCount || 0) + (watchlistSet.has(event.id) ? 1 : 0),
                                ),
                                onToggle: () => onToggleWatchlist(event.id),
                                className: "calendar-chip-watchlist-control",
                              })}
                            </span>
                          </div>
                        ))}
                        {dayEvents.length > 3 ? (
                          <div className="calendar-chip-more">+{dayEvents.length - 3}</div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {watchlistEvents.length > 0 && monthEvents.length > 0 && viewMode === WATCHLIST_VIEW.LIST ? (
        <section className="group-stack">
          {groupedByLeague.map((group) => (
            <section key={group.league} className="group-block">
              <div className="group-title">
                <h2>{group.league}</h2>
                <span>{group.items.length} events</span>
              </div>
              <div className="event-grid">
                {group.items.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isInWatchlist={watchlistSet.has(event.id)}
                    onToggleWatchlist={onToggleWatchlist}
                  />
                ))}
              </div>
            </section>
          ))}
        </section>
      ) : null}
    </section>
  );
}

export default WatchlistPage;
