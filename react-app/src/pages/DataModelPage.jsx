import events from "../data/events.json";
import users from "../data/users.json";
import athletes from "../data/athletes.json";
import teams from "../data/teams.json";
import curatedLists from "../data/curatedLists.json";
import eventTeams from "../data/eventTeams.json";
import athleteParticipation from "../data/athleteParticipation.json";
import activitySamples from "../data/activitySamples.json";
import { getLeagues } from "../services/leaguesService";
import { getAllComments } from "../services/commentsService";

const STORAGE_KEYS = {
  tagCatalog: "cafesport.club_tag_catalog_v1",
  objectTags: "cafesport.club_object_tags_v2",
  objectTagVotes: "cafesport.club_object_tag_votes_v2",
};

function inferType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function limitSample(value, depth = 0) {
  const maxDepth = 2;
  if (depth > maxDepth) return "...";

  if (Array.isArray(value)) {
    const preview = value.slice(0, 3).map((item) => limitSample(item, depth + 1));
    if (value.length > 3) preview.push(`... +${value.length - 3} more`);
    return preview;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    const out = {};
    entries.slice(0, 12).forEach(([key, item]) => {
      out[key] = limitSample(item, depth + 1);
    });
    if (entries.length > 12) {
      out.__moreKeys = `${entries.length - 12} more keys`;
    }
    return out;
  }

  return value;
}

function analyzeFields(records) {
  const fieldMap = new Map();

  records.forEach((record) => {
    if (!record || typeof record !== "object" || Array.isArray(record)) return;
    Object.entries(record).forEach(([key, value]) => {
      if (!fieldMap.has(key)) {
        fieldMap.set(key, {
          count: 0,
          types: new Set(),
        });
      }
      const meta = fieldMap.get(key);
      meta.count += 1;
      meta.types.add(inferType(value));
    });
  });

  const total = records.length || 1;
  const required = [];
  const optional = [];
  const typed = [];

  fieldMap.forEach((meta, key) => {
    const typeLabel = Array.from(meta.types).sort().join(" | ");
    typed.push({ key, type: typeLabel, count: meta.count });
    if (meta.count === total) required.push(key);
    else optional.push(key);
  });

  typed.sort((a, b) => a.key.localeCompare(b.key));
  required.sort((a, b) => a.localeCompare(b));
  optional.sort((a, b) => a.localeCompare(b));

  return { required, optional, typed };
}

function readStorageObject(key) {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed;
  } catch {
    return {};
  }
}

function toStorageRecords(mapValue) {
  return Object.entries(mapValue || {}).map(([id, value]) => ({ id, value }));
}

function buildTargetModelExamples() {
  const competitions = [
    {
      id: "comp_tour_de_france",
      currentName: "Tour de France",
      sport: "Cyclisme",
      seasonModel: "calendar_year",
      frequency: "annual",
    },
    {
      id: "comp_ligue_1",
      currentName: "Ligue 1",
      sport: "Football",
      seasonModel: "split_year",
      frequency: "annual",
    },
    {
      id: "comp_jo_ete",
      currentName: "Jeux Olympiques d'ete",
      sport: "Multi-sport",
      seasonModel: "calendar_year",
      frequency: "every_4_years",
    },
  ];

  const seasons = [
    {
      id: "comp_tour_de_france:2026",
      competitionId: "comp_tour_de_france",
      seasonKey: "2026",
      label: "Tour de France 2026",
      status: "scheduled",
    },
    {
      id: "comp_ligue_1:2025-2026",
      competitionId: "comp_ligue_1",
      seasonKey: "2025-2026",
      label: "Ligue 1 2025-2026",
      status: "in_progress",
    },
  ];

  const namingHistory = [
    {
      id: "name_hist_dauphine_1",
      competitionId: "comp_dauphine",
      validFromSeason: "1947",
      validToSeason: "2009",
      displayName: "Dauphine Libere",
    },
    {
      id: "name_hist_dauphine_2",
      competitionId: "comp_dauphine",
      validFromSeason: "2010",
      validToSeason: null,
      displayName: "Critérium du Dauphine",
    },
  ];

  return { competitions, seasons, namingHistory };
}

function DataModelPage() {
  const leagues = getLeagues();
  const comments = getAllComments();
  const leagueSeasons = leagues.flatMap((league) => league.seasons || []);

  const tagCatalog = toStorageRecords(readStorageObject(STORAGE_KEYS.tagCatalog));
  const objectTags = toStorageRecords(readStorageObject(STORAGE_KEYS.objectTags));
  const objectTagVotes = toStorageRecords(readStorageObject(STORAGE_KEYS.objectTagVotes));

  const collections = [
    {
      key: "events",
      title: "events",
      description: "Evenements sportifs avec score communautaire, statut, ligue et media.",
      records: events,
    },
    {
      key: "leagues",
      title: "leagues",
      description: "Competitions canoniques derivees des events.",
      records: leagues,
    },
    {
      key: "leagueSeasons",
      title: "leagueSeasons",
      description: "Saisons/editions d'une league avec bornes de dates et stats.",
      records: leagueSeasons,
    },
    {
      key: "users",
      title: "users",
      description: "Profils utilisateurs, handle, location, sports preferes, badge.",
      records: users,
    },
    {
      key: "athletes",
      title: "athletes",
      description: "Athletes avec sport, role, team et image.",
      records: athletes,
    },
    {
      key: "teams",
      title: "teams",
      description: "Equipes et metadata de composition.",
      records: teams,
    },
    {
      key: "eventTeams",
      title: "eventTeams",
      description: "Liaison N:N events <-> teams.",
      records: eventTeams,
    },
    {
      key: "athleteParticipation",
      title: "athleteParticipation",
      description: "Liaison N:N events <-> athletes.",
      records: athleteParticipation,
    },
    {
      key: "comments",
      title: "comments",
      description: "Commentaires/criticques/reponses sur les events.",
      records: comments,
    },
    {
      key: "curatedLists",
      title: "curatedLists",
      description: "Classements avec entries event/athlete.",
      records: curatedLists,
    },
    {
      key: "activitySamples",
      title: "activitySamples",
      description: "Flux d'activite des utilisateurs.",
      records: activitySamples,
    },
    {
      key: "tagCatalog",
      title: "tagCatalog (storage)",
      description: "Catalogue des tags utilises par le module ObjectTags.",
      records: tagCatalog,
    },
    {
      key: "objectTags",
      title: "objectTags (storage)",
      description: "Index polymorphe objectType:objectId -> tagIds.",
      records: objectTags,
    },
    {
      key: "objectTagVotes",
      title: "objectTagVotes (storage)",
      description: "Votes utilisateur (+1/-1) par objet+tag.",
      records: objectTagVotes,
    },
  ];

  const summary = collections.map((collection) => ({
    label: collection.key,
    value: collection.records.length,
  }));

  const relations = [
    "league 1..n leagueSeasons",
    "leagueSeason 1..n events",
    "team n..n events (via eventTeams)",
    "athlete n..n events (via athleteParticipation)",
    "user 1..n curatedLists",
    "event 1..n comments",
    "comment 0..n replies",
    "objectType:objectId n..n tags (via objectTags/objectTagVotes)",
  ];

  const targetExamples = buildTargetModelExamples();

  return (
    <section className="data-page">
      <section className="data-hero section-shell">
        <div className="section-head">
          <div>
            <h1>DataModel</h1>
            <p className="muted">Vue live des collections, relations et schemas utilises par l'app React.</p>
          </div>
          <a className="ghost" href="/#events">Retour a l'accueil</a>
        </div>
        <div className="data-note">
          {summary.map((item) => (
            <span key={item.label} className="tag">{item.label}</span>
          ))}
        </div>
      </section>

      <section className="data-summary-grid">
        {summary.map((item) => (
          <article key={item.label} className="data-kpi-card">
            <p className="data-kpi-label">{item.label}</p>
            <p className="data-kpi-value">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="data-relations section-shell">
        <div className="section-head">
          <h2>Relations principales</h2>
        </div>
        <ul className="data-relations-list">
          {relations.map((relation) => (
            <li key={relation} className="data-relation-item">{relation}</li>
          ))}
        </ul>
      </section>

      <section className="data-relations section-shell">
        <div className="section-head">
          <h2>Modele cible competition/saison</h2>
        </div>
        <p className="muted">
          Separation recommandee entre competition stable, editions/saisons et historique des noms.
        </p>
        <div className="data-grid">
          {Object.entries(targetExamples).map(([key, records]) => (
            <article key={key} className="data-card">
              <div className="data-card-header">
                <div className="data-card-header-collection">
                  <h3>{key}</h3>
                  <span className="data-count-pill">{records.length} rows</span>
                </div>
              </div>
              <div className="data-card-body">
                <pre className="code-block"><code>{JSON.stringify(records, null, 2)}</code></pre>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="data-grid">
        {collections.map((collection) => {
          const { required, optional, typed } = analyzeFields(collection.records);
          const sample = collection.records[0] || {};

          return (
            <article key={collection.key} className="data-card">
              <div className="data-card-header">
                <div className="data-card-header-collection">
                  <h3>{collection.title}</h3>
                  <span className="data-count-pill">{collection.records.length} rows</span>
                </div>
                <p className="data-card-subtitle">{collection.description}</p>
              </div>

              <div className="data-card-body">
                <div className="data-field-group">
                  <p className="data-field-label">Required fields ({required.length})</p>
                  <div className="data-pill-list">
                    {required.length ? required.slice(0, 20).map((field) => (
                      <span key={`${collection.key}-req-${field}`} className="data-pill data-pill-required">{field}</span>
                    )) : <span className="data-empty-pill">none</span>}
                  </div>
                </div>

                <div className="data-field-group">
                  <p className="data-field-label">Optional fields ({optional.length})</p>
                  <div className="data-pill-list">
                    {optional.length ? optional.slice(0, 20).map((field) => (
                      <span key={`${collection.key}-opt-${field}`} className="data-pill data-pill-optional">{field}</span>
                    )) : <span className="data-empty-pill">none</span>}
                  </div>
                </div>

                <div className="data-field-group">
                  <p className="data-field-label">Field types</p>
                  <div className="data-pill-list">
                    {typed.length ? typed.slice(0, 24).map((field) => (
                      <span key={`${collection.key}-type-${field.key}`} className="data-pill data-pill-type">
                        {field.key}: {field.type}
                      </span>
                    )) : <span className="data-empty-pill">none</span>}
                  </div>
                </div>

                <div className="data-field-group">
                  <p className="data-field-label">Sample row</p>
                  <pre className="code-block"><code>{JSON.stringify(limitSample(sample), null, 2)}</code></pre>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
}

export default DataModelPage;
