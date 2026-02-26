import { useMemo, useState } from "react";
import { getAthleteSports } from "../services/catalogService";

const JOIN_STORAGE_KEY = "cafesport.club_join_requests_v1";

function readJoinRequests() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(JOIN_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJoinRequests(requests) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(JOIN_STORAGE_KEY, JSON.stringify(requests));
}

function JoinPage() {
  const sports = useMemo(() => getAthleteSports(), []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    sport: "Football",
    favorite: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = String(form.name || "").trim();
    const email = String(form.email || "").trim();
    if (!name || !email) return;

    const requests = readJoinRequests();
    requests.push({
      id: `join-${Date.now()}`,
      ...form,
      name,
      email,
      createdAt: new Date().toISOString(),
    });
    writeJoinRequests(requests);
    setSubmitted(true);
    setForm((prev) => ({
      ...prev,
      name: "",
      email: "",
      favorite: "",
      note: "",
    }));
  }

  return (
    <section className="join-page-react">
      <div className="join-layout">
        <article className="event-detail-card">
          <h2>Ce que tu obtiens</h2>
          <div className="list-points">
            <p>01. Liste de suivi personnelle</p>
            <p>02. Communaute d early adopters</p>
            <p>03. Badges fondateurs et feedback direct</p>
          </div>
          <p className="event-meta">
            Les demandes sont stockees en local pour l instant (mode migration React).
          </p>
        </article>

        <form className="comment-composer" onSubmit={handleSubmit}>
          <label className="search-wrap" htmlFor="join-name">
            <span>Nom complet</span>
            <input
              id="join-name"
              type="text"
              placeholder="Alex Morgan"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
            />
          </label>
          <label className="search-wrap" htmlFor="join-email">
            <span>Email</span>
            <input
              id="join-email"
              type="email"
              placeholder="vous@email.com"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
            />
          </label>
          <label className="select-wrap" htmlFor="join-sport">
            <span>Sport prefere</span>
            <select
              id="join-sport"
              value={form.sport}
              onChange={(event) => handleChange("sport", event.target.value)}
            >
              {sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </label>
          <label className="search-wrap" htmlFor="join-favorite">
            <span>Equipe ou athlete prefere</span>
            <input
              id="join-favorite"
              type="text"
              placeholder="Equipe ou athlete"
              value={form.favorite}
              onChange={(event) => handleChange("favorite", event.target.value)}
            />
          </label>
          <label className="search-wrap" htmlFor="join-note">
            <span>Ce que tu veux suivre</span>
            <textarea
              id="join-note"
              rows="3"
              maxLength={500}
              placeholder="Finales, derbies, courses mythiques..."
              value={form.note}
              onChange={(event) => handleChange("note", event.target.value)}
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Demander l acces
          </button>
          {submitted ? (
            <p className="event-meta">Demande enregistree localement. Merci.</p>
          ) : (
            <p className="event-meta">On t ecrira pour la beta.</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default JoinPage;
