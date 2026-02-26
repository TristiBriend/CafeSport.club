import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { getAllEvents, getSports } from "../services/eventsService";
import { getRatingsMap, isUpcomingEvent } from "../services/ratingsService";

const CALENDAR_VIEW = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

function toTimestamp(value) {
  const ts = Date.parse(String(value || ""));
  return Number.isFinite(ts) ? ts : 0;
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

function formatDayLabel(dateInput) {
  const date = toDayDate(dateInput);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatMonthLabel(dateInput) {
  const date = toDayDate(dateInput);
  return date.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

function getCalendarRange(view, baseDateInput) {
  const baseDate = toDayDate(baseDateInput);
  const start = new Date(baseDate.getTime());
  const end = new Date(baseDate.getTime());

  if (view === CALENDAR_VIEW.DAY) {
    return { start, end };
  }

  if (view === CALENDAR_VIEW.WEEK) {
    const mondayOffset = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - mondayOffset);
    end.setTime(start.getTime());
    end.setDate(end.getDate() + 6);
    return { start, end };
  }

  if (view === CALENDAR_VIEW.YEAR) {
    start.setMonth(0, 1);
    end.setMonth(11, 31);
    return { start, end };
  }

  start.setDate(1);
  end.setMonth(end.getMonth() + 1, 0);
  return { start, end };
}

function shiftCalendarDate(baseDateInput, view, direction) {
  const delta = Number(direction) >= 0 ? 1 : -1;
  const next = toDayDate(baseDateInput);
  if (view === CALENDAR_VIEW.DAY) {
    next.setDate(next.getDate() + delta);
    return next;
  }
  if (view === CALENDAR_VIEW.WEEK) {
    next.setDate(next.getDate() + (7 * delta));
    return next;
  }
  if (view === CALENDAR_VIEW.YEAR) {
    next.setFullYear(next.getFullYear() + delta);
    return next;
  }
  next.setMonth(next.getMonth() + delta, 1);
  return next;
}

function formatRangeLabel(start, end) {
  const startLabel = toDayDate(start).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const endLabel = toDayDate(end).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
}

function getEventDayDate(event) {
  const ts = toTimestamp(event?.dateISO || event?.date);
  if (!ts) return null;
  return toDayDate(new Date(ts));
}

function isEventInRange(event, range) {
  const day = getEventDayDate(event);
  if (!day) return false;
  return day >= range.start && day <= range.end;
}

function getTimelineEventIds(allEvents, watchlistIds) {
  const watchlistSet = new Set(watchlistIds);
  const ratingsMap = getRatingsMap();
  const timelineSet = new Set();

  allEvents.forEach((event) => {
    if (isUpcomingEvent(event)) {
      if (watchlistSet.has(event.id)) timelineSet.add(event.id);
      return;
    }
    const rating = Number(ratingsMap[event.id] || 0);
    if (rating > 0) timelineSet.add(event.id);
  });

  return {
    timelineSet,
    ratingsMap,
    watchlistSet,
  };
}

function getSpotlightEventIds(events, { watchlistSet, ratingsMap }) {
  const upcoming = [];
  const past = [];

  events.forEach((event) => {
    if (isUpcomingEvent(event)) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  });

  const spotlightIds = new Set();
  const pickTop = (list, scoreFn, ratio = 0.35) => {
    if (!list.length) return [];
    const count = Math.min(list.length, Math.max(1, Math.ceil(list.length * ratio)));
    return list
      .slice()
      .sort((a, b) => scoreFn(b) - scoreFn(a))
      .slice(0, count);
  };

  pickTop(
    upcoming,
    (event) => Number(event.communityScore || 0) * 90
      + Number(event.reviews || 0)
      + (watchlistSet.has(event.id) ? 400 : 0),
    0.4,
  ).forEach((event) => spotlightIds.add(event.id));

  pickTop(
    past,
    (event) => Number(event.communityScore || 0) * 95
      + Number(event.reviews || 0)
      + Number(ratingsMap[event.id] || 0) * 2,
    0.35,
  ).forEach((event) => spotlightIds.add(event.id));

  return spotlightIds;
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

function CalendarPage({ watchlistIds = [], onToggleWatchlist = () => {} }) {
  const [viewMode, setViewMode] = useState(CALENDAR_VIEW.MONTH);
  const [displayMode, setDisplayMode] = useState("calendar");
  const [timelineOnly, setTimelineOnly] = useState(true);
  const [spotlightOnly, setSpotlightOnly] = useState(false);
  const [sportFilter, setSportFilter] = useState("Tous");
  const [baseDate, setBaseDate] = useState(() => toDayDate(new Date()));

  const sports = useMemo(() => getSports(), []);
  const allEvents = useMemo(() => getAllEvents(), []);

  const timelineContext = useMemo(
    () => getTimelineEventIds(allEvents, watchlistIds),
    [allEvents, watchlistIds],
  );

  const range = useMemo(
    () => getCalendarRange(viewMode, baseDate),
    [baseDate, viewMode],
  );

  const eventsInRange = useMemo(() => {
    return allEvents
      .filter((event) => {
        if (sportFilter !== "Tous" && event.sport !== sportFilter) return false;
        return isEventInRange(event, range);
      })
      .sort((a, b) => {
        const dateDiff = toTimestamp(a.dateISO) - toTimestamp(b.dateISO);
        if (dateDiff !== 0) return dateDiff;
        return Number(b.communityScore || 0) - Number(a.communityScore || 0);
      });
  }, [allEvents, range, sportFilter]);

  const spotlightIds = useMemo(
    () => getSpotlightEventIds(eventsInRange, timelineContext),
    [eventsInRange, timelineContext],
  );

  const filteredEvents = useMemo(() => {
    let list = eventsInRange;

    if (timelineOnly) {
      list = list.filter((event) => timelineContext.timelineSet.has(event.id));
      if (spotlightOnly) {
        const known = new Set(list.map((event) => event.id));
        const boosted = eventsInRange.filter((event) => spotlightIds.has(event.id) && !known.has(event.id));
        list = [...list, ...boosted]
          .sort((a, b) => toTimestamp(a.dateISO) - toTimestamp(b.dateISO));
      }
    } else if (spotlightOnly) {
      list = list.filter((event) => spotlightIds.has(event.id));
    }

    return list;
  }, [eventsInRange, spotlightIds, spotlightOnly, timelineContext.timelineSet, timelineOnly]);

  const groupedByDay = useMemo(() => {
    const map = new Map();
    filteredEvents.forEach((event) => {
      const day = getEventDayDate(event);
      if (!day) return;
      const key = formatDateKey(day);
      if (!map.has(key)) {
        map.set(key, {
          date: day,
          items: [],
        });
      }
      map.get(key).items.push(event);
    });
    return Array.from(map.entries())
      .map(([, value]) => value)
      .sort((a, b) => a.date - b.date);
  }, [filteredEvents]);

  const groupedByLeague = useMemo(() => {
    const map = new Map();
    filteredEvents.forEach((event) => {
      const key = event.league || "Competition";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    });
    return Array.from(map.entries())
      .map(([league, items]) => ({
        league,
        items: items
          .slice()
          .sort((a, b) => toTimestamp(a.dateISO) - toTimestamp(b.dateISO)),
      }))
      .sort((a, b) => {
        const left = a.items[0] ? toTimestamp(a.items[0].dateISO) : 0;
        const right = b.items[0] ? toTimestamp(b.items[0].dateISO) : 0;
        return left - right;
      });
  }, [filteredEvents]);

  const yearMonthBuckets = useMemo(() => {
    const buckets = new Map();
    filteredEvents.forEach((event) => {
      const day = getEventDayDate(event);
      if (!day) return;
      const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}`;
      if (!buckets.has(key)) {
        buckets.set(key, {
          key,
          date: new Date(day.getFullYear(), day.getMonth(), 1),
          items: [],
        });
      }
      buckets.get(key).items.push(event);
    });

    return Array.from(buckets.values())
      .sort((a, b) => a.date - b.date);
  }, [filteredEvents]);

  const monthGridWeeks = useMemo(
    () => buildMonthGridDates(baseDate),
    [baseDate],
  );

  const eventsByDateKey = useMemo(() => {
    const map = new Map();
    filteredEvents.forEach((event) => {
      const day = getEventDayDate(event);
      if (!day) return;
      const key = formatDateKey(day);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    });
    map.forEach((items, key) => {
      const sorted = items
        .slice()
        .sort((a, b) => Number(b.communityScore || 0) - Number(a.communityScore || 0));
      map.set(key, sorted);
    });
    return map;
  }, [filteredEvents]);

  const isMonthView = viewMode === CALENDAR_VIEW.MONTH;
  const isYearView = viewMode === CALENDAR_VIEW.YEAR;
  return (
    <section>
      <div className="filter-row">
        <button
          className={`filter-btn ${displayMode === "calendar" ? "is-active" : ""}`}
          onClick={() => setDisplayMode("calendar")}
          type="button"
        >
          Calendrier
        </button>
        <button
          className={`filter-btn ${displayMode === "list" ? "is-active" : ""}`}
          onClick={() => setDisplayMode("list")}
          type="button"
        >
          Liste
        </button>
      </div>

      <div className="filter-row">
        {[CALENDAR_VIEW.DAY, CALENDAR_VIEW.WEEK, CALENDAR_VIEW.MONTH, CALENDAR_VIEW.YEAR].map((mode) => (
          <button
            key={mode}
            className={`filter-btn ${viewMode === mode ? "is-active" : ""}`}
            onClick={() => setViewMode(mode)}
            type="button"
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="watchlist-controls">
        <label className="select-wrap" htmlFor="calendar-sport-filter-react">
          <span>Sport</span>
          <select
            id="calendar-sport-filter-react"
            value={sportFilter}
            onChange={(event) => setSportFilter(event.target.value)}
          >
            <option value="Tous">Tous</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </label>

        <label className="select-wrap" htmlFor="calendar-date-react">
          <span>Date de base</span>
          <input
            id="calendar-date-react"
            type="date"
            value={formatDateKey(baseDate)}
            onChange={(event) => {
              const next = toTimestamp(event.target.value);
              if (!next) return;
              setBaseDate(toDayDate(new Date(next)));
            }}
          />
        </label>
      </div>

      <div className="filter-row">
        <button
          className="filter-btn"
          onClick={() => setBaseDate((prev) => shiftCalendarDate(prev, viewMode, -1))}
          type="button"
        >
          {"<-"}
        </button>
        <button
          className="filter-btn"
          onClick={() => setBaseDate(toDayDate(new Date()))}
          type="button"
        >
          Aujourd&apos;hui
        </button>
        <button
          className="filter-btn"
          onClick={() => setBaseDate((prev) => shiftCalendarDate(prev, viewMode, 1))}
          type="button"
        >
          {"->"}
        </button>
        <button
          className={`filter-btn ${timelineOnly ? "is-active" : ""}`}
          onClick={() => setTimelineOnly((prev) => !prev)}
          type="button"
        >
          Timeline perso
        </button>
        <button
          className={`filter-btn ${spotlightOnly ? "is-active" : ""}`}
          onClick={() => setSpotlightOnly((prev) => !prev)}
          type="button"
        >
          Spotlight
        </button>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="simple-page">
          <p>Aucun evenement pour ce filtre/periode.</p>
        </div>
      ) : null}

      {displayMode === "calendar" && isMonthView && filteredEvents.length ? (
        <section className="calendar-grid-react">
          <div className="calendar-week-head-react">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          {monthGridWeeks.map((week) => (
            <div key={formatDateKey(week[0])} className="calendar-week-react">
              {week.map((day) => {
                const key = formatDateKey(day);
                const dayEvents = eventsByDateKey.get(key) || [];
                const isCurrentMonth = day.getMonth() === baseDate.getMonth();
                const isToday = key === formatDateKey(new Date());
                return (
                  <article
                    key={key}
                    className={`calendar-day-react ${isCurrentMonth ? "" : "is-dim"} ${isToday ? "is-today" : ""}`.trim()}
                  >
                    <div className="calendar-day-head-react">
                      <strong>{day.getDate()}</strong>
                      {dayEvents.length ? <span>{dayEvents.length}</span> : null}
                    </div>
                    <div className="calendar-day-events-react">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div key={event.id} className={`calendar-chip-react ${spotlightIds.has(event.id) ? "is-spotlight" : ""}`}>
                          <Link to={`/event/${event.id}`}>{event.title}</Link>
                          <button
                            className={`comment-like-btn ${watchlistIds.includes(event.id) ? "is-active" : ""}`}
                            onClick={() => onToggleWatchlist(event.id)}
                            type="button"
                          >
                            {watchlistIds.includes(event.id) ? "❤" : "+"}
                          </button>
                        </div>
                      ))}
                      {dayEvents.length > 3 ? <span className="event-meta">+{dayEvents.length - 3}</span> : null}
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </section>
      ) : null}

      {displayMode === "calendar" && !isMonthView && !isYearView && filteredEvents.length ? (
        <section className="group-stack">
          {groupedByDay.map((group) => (
            <section key={formatDateKey(group.date)} className="group-block">
              <div className="group-title">
                <h2>{formatDayLabel(group.date)}</h2>
                <span>{group.items.length} events</span>
              </div>
              <div className="event-grid">
                {group.items.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isInWatchlist={watchlistIds.includes(event.id)}
                    onToggleWatchlist={onToggleWatchlist}
                  />
                ))}
              </div>
            </section>
          ))}
        </section>
      ) : null}

      {displayMode === "calendar" && isYearView && filteredEvents.length ? (
        <section className="calendar-year-grid-react">
          {yearMonthBuckets.map((bucket) => (
            <article key={bucket.key} className="entity-card">
              <h3>{formatMonthLabel(bucket.date)}</h3>
              <p className="event-meta">{bucket.items.length} events</p>
              <div className="calendar-year-mini-react">
                {bucket.items.slice(0, 3).map((event) => (
                  <p key={event.id} className="event-meta">
                    <Link to={`/event/${event.id}`}>{event.title}</Link>
                  </p>
                ))}
              </div>
              <button
                className="comment-like-btn"
                onClick={() => {
                  setBaseDate(bucket.date);
                  setViewMode(CALENDAR_VIEW.MONTH);
                }}
                type="button"
              >
                Ouvrir le mois
              </button>
            </article>
          ))}
        </section>
      ) : null}

      {displayMode === "list" && filteredEvents.length ? (
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
                    isInWatchlist={watchlistIds.includes(event.id)}
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

export default CalendarPage;
