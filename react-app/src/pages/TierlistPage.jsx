import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CalendarPeriodRangeSelector from "../components/CalendarPeriodRangeSelector";
import ScoreBadge from "../components/ScoreBadge";
import { getRatedPastEvents } from "../services/ratingsService";
import { useSocialSync } from "../contexts/SocialSyncContext";

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
  const { revisionByDomain } = useSocialSync();
  const ratingsRevision = Number(revisionByDomain?.ratings || 0);
  const ratedEvents = useMemo(() => getRatedPastEvents(), [ratingsRevision]);

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

          <CalendarPeriodRangeSelector
            inputType="month"
            className="tierlist-month-inputs"
            fromId="tierlist-from-month"
            toId="tierlist-to-month"
            fromLabel="De"
            toLabel="A"
            fromValue={fromMonth}
            toValue={toMonth}
            onFromChange={setFromMonth}
            onToChange={setToMonth}
            fromMin={monthBounds.min}
            fromMax={toMonth || monthBounds.max}
            toMin={fromMonth || monthBounds.min}
            toMax={monthBounds.max}
          />
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
