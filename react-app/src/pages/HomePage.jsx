import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import RankingCard from "../components/RankingCard";
import ScoreBadge from "../components/ScoreBadge";
import { COMMENT_MODE, getAllComments, getCommentDateLabel } from "../services/commentsService";
import { getCuratedLists } from "../services/catalogService";
import { getAllEvents, getWatchlistEvents } from "../services/eventsService";
import { getFavoriteSportsByRatings, isUpcomingEvent } from "../services/ratingsService";

function toTimeValue(dateISO) {
  const value = Date.parse(dateISO || "");
  return Number.isFinite(value) ? value : 0;
}

function getStatusClass(event) {
  const isPast = toTimeValue(event?.dateISO) <= Date.now();
  return isPast ? "is-past" : "is-upcoming";
}

function getInitials(name) {
  return String(name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((value) => value[0]?.toUpperCase() || "")
    .join("");
}

function getEventImage(event) {
  const image = String(event?.image || "").trim();
  if (!image) return "";
  return image.startsWith("/") ? image : `/${image}`;
}

function HomePage({ watchlistCount = 0, watchlistIds = [], onToggleWatchlist = () => {} }) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [bestOfDays, setBestOfDays] = useState(7);
  const [bestOfSport, setBestOfSport] = useState("Tous");

  const allEvents = useMemo(() => getAllEvents(), []);
  const allComments = useMemo(() => getAllComments(), []);
  const allLists = useMemo(() => getCuratedLists(), []);
  const sports = useMemo(
    () => Array.from(new Set(allEvents.map((event) => event.sport))).sort((a, b) => a.localeCompare(b)),
    [allEvents],
  );
  const favoriteSports = useMemo(() => getFavoriteSportsByRatings(), []);

  const pastEvents = useMemo(
    () => allEvents.filter((event) => !isUpcomingEvent(event)),
    [allEvents],
  );

  const heroEvents = useMemo(() => {
    const source = pastEvents.length ? pastEvents : allEvents;
    return [...source]
      .sort((a, b) => {
        const scoreDiff = Number(b.communityScore || 0) - Number(a.communityScore || 0);
        if (scoreDiff !== 0) return scoreDiff;
        return toTimeValue(b.dateISO) - toTimeValue(a.dateISO);
      })
      .slice(0, 6);
  }, [allEvents, pastEvents]);

  useEffect(() => {
    if (heroEvents.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroEvents.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [heroEvents.length]);

  useEffect(() => {
    if (heroIndex < heroEvents.length) return;
    setHeroIndex(0);
  }, [heroEvents.length, heroIndex]);

  const heroEvent = heroEvents[heroIndex] || null;
  const heroReview = useMemo(() => {
    if (!heroEvent) return null;
    return allComments
      .filter((comment) => comment.eventId === heroEvent.id)
      .sort((a, b) => (b.totalLikes || 0) - (a.totalLikes || 0))[0] || null;
  }, [allComments, heroEvent]);

  const topReviews = useMemo(() => (
    allComments
      .filter((comment) => comment.commentType === COMMENT_MODE.REVIEW)
      .sort((a, b) => (b.totalLikes || 0) - (a.totalLikes || 0))
      .slice(0, 3)
  ), [allComments]);

  const topLists = useMemo(() => (
    [...allLists]
      .sort((a, b) => Number(b.likes || 0) - Number(a.likes || 0))
      .slice(0, 3)
  ), [allLists]);

  const bestOfEvents = useMemo(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    const from = new Date(now);
    from.setDate(now.getDate() - Number(bestOfDays || 7));
    return pastEvents
      .filter((event) => {
        if (bestOfSport !== "Tous" && event.sport !== bestOfSport) return false;
        const ts = toTimeValue(event.dateISO);
        return ts >= from.getTime() && ts <= now.getTime();
      })
      .sort((a, b) => Number(b.communityScore || 0) - Number(a.communityScore || 0))
      .slice(0, 10);
  }, [bestOfDays, bestOfSport, pastEvents]);

  const watchlistPreview = useMemo(() => {
    const watchlistEvents = getWatchlistEvents(watchlistIds);
    const upcoming = watchlistEvents
      .filter((event) => isUpcomingEvent(event))
      .sort((a, b) => toTimeValue(a.dateISO) - toTimeValue(b.dateISO));
    return (upcoming.length ? upcoming : watchlistEvents).slice(0, 4);
  }, [watchlistIds]);

  const anticipatedEvents = useMemo(() => {
    let list = allEvents.filter((event) => isUpcomingEvent(event));
    if (favoriteSports.length) {
      list = list.filter((event) => favoriteSports.includes(event.sport));
    }
    list = list
      .sort((a, b) => Number(b.communityScore || 0) - Number(a.communityScore || 0))
      .slice(0, 4);
    if (list.length) return list;
    return [...allEvents]
      .sort((a, b) => Number(b.communityScore || 0) - Number(a.communityScore || 0))
      .slice(0, 4);
  }, [allEvents, favoriteSports]);

  const bestMonthEvents = useMemo(() => {
    const now = new Date();
    const monthly = pastEvents
      .filter((event) => {
        const ts = toTimeValue(event.dateISO);
        if (!ts) return false;
        const date = new Date(ts);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      })
      .sort((a, b) => Number(b.communityScore || 0) - Number(a.communityScore || 0))
      .slice(0, 4);
    if (monthly.length) return monthly;
    return [...pastEvents]
      .sort((a, b) => Number(b.communityScore || 0) - Number(a.communityScore || 0))
      .slice(0, 4);
  }, [pastEvents]);

  const curatedLists = useMemo(() => (
    [...allLists]
      .sort((a, b) => Number(b.likes || 0) - Number(a.likes || 0))
      .slice(0, 6)
  ), [allLists]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Suivre - Noter - Decouvrir</p>
          <h1>Le plus grand reseau social sportif, note tous les matchs et toutes les courses !</h1>
          <p className="lede">
            Sofa Critics rassemble les fans autour de chaque match et chaque course.
            Note, commente, suis tes equipes et sportifs preferes, et cree tes classements.
          </p>
          <div className="hero-actions">
            <Link className="cta" to="/discover">
              Commencer a noter
            </Link>
            <Link className="ghost" to="/join">
              Creer un classement de suivi
            </Link>
          </div>
          <div className="stats">
            <div>
              <span className="stat-number">{allEvents.length}</span>
              <span className="stat-label">Evenements classes</span>
            </div>
            <div>
              <span className="stat-number">12.4k</span>
              <span className="stat-label">Avis de la communaute</span>
            </div>
            <div>
              <span className="stat-number">{sports.length}</span>
              <span className="stat-label">Sports couverts</span>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-header">
            <span className="pill">A la une</span>
            <div className="hero-controls">
              <button
                aria-label="Evenement precedent"
                className="hero-nav"
                disabled={heroEvents.length <= 1}
                onClick={() => setHeroIndex((prev) => ((prev - 1 + heroEvents.length) % heroEvents.length))}
                type="button"
              >
                {"<-"}
              </button>
              <button
                aria-label="Evenement suivant"
                className="hero-nav"
                disabled={heroEvents.length <= 1}
                onClick={() => setHeroIndex((prev) => ((prev + 1) % heroEvents.length))}
                type="button"
              >
                {"->"}
              </button>
            </div>
          </div>

          {heroEvent ? (
            <div className="hero-slide">
              <article className={`hero-review-card ${getStatusClass(heroEvent)}`}>
                <div className="hero-review-media">
                  {getEventImage(heroEvent) ? (
                    <img src={getEventImage(heroEvent)} alt={heroEvent.title} />
                  ) : null}
                  <div className="hero-review-tags">
                    <span className="tag">{heroEvent.league}</span>
                    <span className="tag ghost">{heroEvent.status || "A venir"}</span>
                  </div>
                </div>
                <div className="hero-review-content">
                  <div className="hero-review-top">
                    <span className="pill">Critique a la une</span>
                    <span className="hero-review-score">
                      <ScoreBadge variant="badge" value={heroEvent.communityScore} scale="ten" />
                    </span>
                  </div>
                  <p className="hero-review-quote">
                    “{heroReview?.note || "Aucune critique pour le moment, soyez le premier a laisser un avis."}”
                  </p>
                  <div className="hero-review-author">
                    <span className="mini-avatar">{getInitials(heroReview?.author || "Sofa Critics")}</span>
                    <div>
                      <strong>{heroReview?.author || "Sofa Critics"}</strong>
                      <span className="hero-review-handle">{heroReview ? getCommentDateLabel(heroReview) : "Aujourd'hui"}</span>
                    </div>
                  </div>
                  <div className="hero-review-meta">
                    <span>❤ {heroReview?.totalLikes || 0} likes</span>
                    <span>{heroEvent.title}</span>
                    <span>{heroEvent.date} · {heroEvent.location}</span>
                    {heroEvent.result ? <span>Resultat: {heroEvent.result}</span> : null}
                  </div>
                  <div className="hero-review-actions">
                    <Link className="event-link" to={`/event/${heroEvent.id}`}>Voir l'evenement</Link>
                    <Link className="ghost small" to={`/event/${heroEvent.id}#reviews`}>Lire la critique</Link>
                  </div>
                </div>
              </article>
              {heroEvents.length > 1 ? (
                <div className="hero-dots">
                  {heroEvents.map((event, idx) => (
                    <button
                      aria-label={`Aller a l'evenement ${idx + 1}`}
                      className={`hero-dot ${idx === heroIndex ? "is-active" : ""}`}
                      key={event.id}
                      onClick={() => setHeroIndex(idx)}
                      type="button"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <article className="hero-review-card is-upcoming">
              <p>Aucun evenement a la une.</p>
            </article>
          )}
        </div>
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Radar CafeSport.club</h2>
          <span>Highlights</span>
        </div>
        <div className="home-radar-grid-react">
          <div>
            <div className="group-title">
              <h3>Meilleures critiques</h3>
              <span>{topReviews.length}</span>
            </div>
            <div className="entity-grid">
              {topReviews.map((comment) => (
                <article key={comment.id} className="entity-card">
                  <h3>
                    <Link to={`/event/${comment.eventId}`}>{comment.author}</Link>
                  </h3>
                  <p className="event-meta">{comment.note}</p>
                  <p className="event-meta">{comment.totalLikes || 0} likes</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <div className="group-title">
              <h3>Meilleurs classements</h3>
              <span>{topLists.length}</span>
            </div>
            <div className="list-grid">
              {topLists.map((list) => (
                <RankingCard key={list.id} list={list} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Best of des derniers jours</h2>
          <span>{bestOfEvents.length}</span>
        </div>
        <div className="watchlist-controls">
          <label className="select-wrap" htmlFor="home-bestof-days">
            <span>Periode</span>
            <select
              id="home-bestof-days"
              value={bestOfDays}
              onChange={(event) => setBestOfDays(Number(event.target.value))}
            >
              <option value={7}>7 jours</option>
              <option value={14}>14 jours</option>
              <option value={30}>30 jours</option>
            </select>
          </label>
          <label className="select-wrap" htmlFor="home-bestof-sport">
            <span>Sport</span>
            <select
              id="home-bestof-sport"
              value={bestOfSport}
              onChange={(event) => setBestOfSport(event.target.value)}
            >
              <option value="Tous">Tous</option>
              {sports.map((sportValue) => (
                <option key={sportValue} value={sportValue}>
                  {sportValue}
                </option>
              ))}
            </select>
          </label>
        </div>
        {bestOfEvents.length ? (
          <div className="event-grid">
            {bestOfEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isInWatchlist={watchlistIds.includes(event.id)}
                onToggleWatchlist={onToggleWatchlist}
              />
            ))}
          </div>
        ) : (
          <div className="simple-page">
            <p>Aucun evenement note sur cette periode.</p>
          </div>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Watchlist</h2>
          <span>{watchlistCount}</span>
        </div>
        {watchlistPreview.length ? (
          <div className="event-grid">
            {watchlistPreview.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isInWatchlist={watchlistIds.includes(event.id)}
                onToggleWatchlist={onToggleWatchlist}
              />
            ))}
          </div>
        ) : (
          <div className="simple-page">
            <p>Ta watchlist est vide. Ajoute des evenements depuis Decouvrir.</p>
          </div>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Evenements les plus attendus</h2>
          <span>{anticipatedEvents.length}</span>
        </div>
        <div className="event-grid">
          {anticipatedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isInWatchlist={watchlistIds.includes(event.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Meilleurs evenements du mois</h2>
          <span>{bestMonthEvents.length}</span>
        </div>
        <div className="event-grid">
          {bestMonthEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isInWatchlist={watchlistIds.includes(event.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Classements de la communaute</h2>
          <span>{curatedLists.length}</span>
        </div>
        <div className="list-grid">
          {curatedLists.map((list) => (
            <RankingCard key={list.id} list={list} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
