import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ScoreBadge from "../components/ScoreBadge";
import { getRatedPastEvents } from "../services/ratingsService";

function toMonthKey(dateISO) {
  const parsed = Date.parse(dateISO || "");
  if (!Number.isFinite(parsed)) return "";
  const date = new Date(parsed);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
}

function parseMonthKey(value) {
  const safe = String(value || "").trim();
  if (!/^\d{4}-\d{2}$/.test(safe)) return null;
  const [year, month] = safe.split("-").map(Number);
  if (!year || !month) return null;
  return new Date(year, month - 1, 1);
}

function TierlistPage() {
  const ratedEvents = useMemo(() => getRatedPastEvents(), []);

  const monthBounds = useMemo(() => {
    if (!ratedEvents.length) {
      const now = new Date();
      const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      return { min: key, max: key };
    }
    const keys = ratedEvents
      .map(({ event }) => toMonthKey(event.dateISO || event.date))
      .filter(Boolean)
      .sort();
    return {
      min: keys[0] || "",
      max: keys[keys.length - 1] || "",
    };
  }, [ratedEvents]);

  const [sport, setSport] = useState("Tous");
  const [fromMonth, setFromMonth] = useState(monthBounds.min);
  const [toMonth, setToMonth] = useState(monthBounds.max);

  useEffect(() => {
    setFromMonth(monthBounds.min);
    setToMonth(monthBounds.max);
  }, [monthBounds.max, monthBounds.min]);

  const sportOptions = useMemo(() => {
    const values = Array.from(new Set(ratedEvents.map(({ event }) => event.sport))).sort((a, b) => a.localeCompare(b));
    return ["Aucun", "Tous", ...values];
  }, [ratedEvents]);

  useEffect(() => {
    if (!sportOptions.includes(sport)) {
      setSport("Tous");
    }
  }, [sport, sportOptions]);

  const filteredEvents = useMemo(() => {
    const fromDate = parseMonthKey(fromMonth);
    const toDate = parseMonthKey(toMonth);
    const toExclusive = toDate ? new Date(toDate.getFullYear(), toDate.getMonth() + 1, 1) : null;

    return ratedEvents.filter(({ event }) => {
      if (sport === "Aucun") return false;
      if (sport !== "Tous" && event.sport !== sport) return false;
      const eventDate = Date.parse(event.dateISO || "");
      if (fromDate && Number.isFinite(eventDate) && eventDate < fromDate.getTime()) return false;
      if (toExclusive && Number.isFinite(eventDate) && eventDate >= toExclusive.getTime()) return false;
      return true;
    });
  }, [fromMonth, ratedEvents, sport, toMonth]);

  const tiers = useMemo(() => ([
    { key: "legendary", label: "Legendaire", min: 100, max: 100, legendary: true },
    ...Array.from({ length: 10 }, (_, index) => {
      const max = 99 - (index * 10);
      const min = max - 9;
      return {
        key: `range-${min}-${max}`,
        label: `${min}-${max}`,
        min,
        max,
        legendary: false,
      };
    }),
  ]), []);

  return (
    <section>
      <div className="discover-head">
        <h1>MaTierlist</h1>
        <p className="lede">
          {filteredEvents.length} evenement(s) notes
          {ratedEvents.length !== filteredEvents.length ? ` (${ratedEvents.length} au total)` : ""}
        </p>
      </div>

      <section className="related-section">
        <div className="tierlist-controls-react">
          <div>
            <p className="detail-label">Filtrer par sport</p>
            <div className="filter-row">
              {sportOptions.map((option) => (
                <button
                  key={option}
                  className={`filter-btn ${sport === option ? "is-active" : ""}`}
                  onClick={() => setSport(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="tierlist-month-inputs">
            <label className="select-wrap" htmlFor="tierlist-from-month">
              <span>De</span>
              <input
                id="tierlist-from-month"
                type="month"
                min={monthBounds.min}
                max={toMonth || monthBounds.max}
                value={fromMonth}
                onChange={(event) => setFromMonth(event.target.value)}
              />
            </label>
            <label className="select-wrap" htmlFor="tierlist-to-month">
              <span>A</span>
              <input
                id="tierlist-to-month"
                type="month"
                min={fromMonth || monthBounds.min}
                max={monthBounds.max}
                value={toMonth}
                onChange={(event) => setToMonth(event.target.value)}
              />
            </label>
          </div>
        </div>
      </section>

      {!ratedEvents.length ? (
        <div className="simple-page">
          <p>Aucun evenement note pour le moment.</p>
        </div>
      ) : !filteredEvents.length ? (
        <div className="simple-page">
          <p>Aucun evenement pour ce filtre.</p>
        </div>
      ) : (
        <section className="tierlist-board-react">
          {tiers.map((tier) => {
            const entries = filteredEvents.filter(({ score }) => {
              if (tier.legendary) return score === 100;
              return score >= tier.min && score <= tier.max;
            });
            return (
              <article key={tier.key} className={`tierlist-row-react ${tier.legendary ? "is-legendary" : ""}`}>
                <div className="tierlist-row-head-react">
                  <span className="event-chip">{tier.label}</span>
                  <span className="event-status">{entries.length}</span>
                </div>
                {entries.length ? (
                  <div className="tierlist-mini-grid-react">
                    {entries.map(({ event, score }) => (
                      <article key={event.id} className="tierlist-mini-card-react">
                        <h3>
                          <Link to={`/event/${event.id}`}>{event.title}</Link>
                        </h3>
                        <p className="event-meta">{event.sport} · {event.league}</p>
                        <p className="event-meta">{event.date || "Date inconnue"} · {event.location || "N/A"}</p>
                        <p className="event-meta">
                          <strong><ScoreBadge variant="user-chip" value={score} scale="percent" /></strong>
                        </p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="event-meta">Aucun evenement dans cette tranche.</p>
                )}
              </article>
            );
          })}
        </section>
      )}
    </section>
  );
}

export default TierlistPage;
