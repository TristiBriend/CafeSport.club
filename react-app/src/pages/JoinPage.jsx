import { useMemo, useState } from "react";
import { getAthleteSports } from "../services/catalogService";
import { useAuth } from "../contexts/AuthContext";
import { createJoinRequestCloud } from "../services/joinRequestsFirestoreService";

function JoinPage() {
  const sports = useMemo(() => getAthleteSports(), []);
  const { hasCloudSession, currentUser, isFirebaseConfigured } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    sport: "Football",
    favorite: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    const name = String(form.name || "").trim();
    const email = String(form.email || "").trim();
    if (!name || !email) return;
    if (!isFirebaseConfigured || !hasCloudSession || !currentUser?.firebaseUid) {
      setSubmitError("Session cloud indisponible pour le moment.");
      return;
    }

    try {
      const createdId = await createJoinRequestCloud(currentUser.firebaseUid, {
        ...form,
        name,
        email,
      });
      if (!createdId) {
        setSubmitError("Impossible d envoyer la demande.");
        return;
      }
      setSubmitted(true);
      setForm((prev) => ({
        ...prev,
        name: "",
        email: "",
        favorite: "",
        note: "",
      }));
    } catch {
      setSubmitError("Erreur reseau. Reessaie.");
    }
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
            Les demandes sont stockees dans Firebase.
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
            <p className="event-meta">Demande enregistree. Merci.</p>
          ) : (
            <p className="event-meta">On t ecrira pour la beta.</p>
          )}
          {submitError ? <p className="event-meta">{submitError}</p> : null}
        </form>
      </div>
    </section>
  );
}

export default JoinPage;
