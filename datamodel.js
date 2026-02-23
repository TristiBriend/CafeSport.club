function safeGetValue(getter, fallbackValue) {
  try {
    const value = getter();
    return value == null ? fallbackValue : value;
  } catch (_error) {
    return fallbackValue;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inferType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function limitSample(value, depth) {
  const maxDepth = 3;
  if (depth > maxDepth) return "...";
  if (Array.isArray(value)) {
    const maxItems = 3;
    const reduced = value.slice(0, maxItems).map((item) => limitSample(item, depth + 1));
    if (value.length > maxItems) {
      reduced.push(`... +${value.length - maxItems} more`);
    }
    return reduced;
  }
  if (value && typeof value === "object") {
    const maxKeys = 12;
    const entries = Object.entries(value);
    const reduced = {};
    entries.slice(0, maxKeys).forEach(([key, itemValue]) => {
      reduced[key] = limitSample(itemValue, depth + 1);
    });
    if (entries.length > maxKeys) {
      reduced.__moreKeys = `${entries.length - maxKeys} more keys`;
    }
    return reduced;
  }
  return value;
}

function analyzeFields(records) {
  const fieldMap = new Map();
  records.forEach((record) => {
    if (!record || typeof record !== "object") return;
    Object.entries(record).forEach(([key, value]) => {
      if (!fieldMap.has(key)) {
        fieldMap.set(key, { count: 0, types: new Set() });
      }
      const entry = fieldMap.get(key);
      entry.count += 1;
      entry.types.add(inferType(value));
    });
  });

  const total = records.length || 1;
  const required = [];
  const optional = [];
  const typed = [];

  fieldMap.forEach((meta, key) => {
    const fieldLabel = key;
    const typeLabel = Array.from(meta.types).sort().join(" | ");
    typed.push({ key: fieldLabel, type: typeLabel, count: meta.count });
    if (meta.count === total) {
      required.push(fieldLabel);
    } else {
      optional.push(fieldLabel);
    }
  });

  return { required, optional, typed };
}

function renderPills(items, className) {
  if (!items.length) {
    return '<span class="data-empty-pill">none</span>';
  }
  return items
    .map((item) => `<span class="${className}">${escapeHtml(item)}</span>`)
    .join("");
}

function normalizeInsights(rawValue) {
  if (!rawValue || typeof rawValue !== "object") return [];
  return Object.entries(rawValue).map(([eventId, payload]) => ({ eventId, ...payload }));
}

function splitObjectKey(objectKey) {
  const safeKey = String(objectKey || "");
  const separatorIndex = safeKey.indexOf(":");
  if (separatorIndex < 0) {
    return {
      objectType: "",
      objectId: safeKey,
    };
  }
  return {
    objectType: safeKey.slice(0, separatorIndex),
    objectId: safeKey.slice(separatorIndex + 1),
  };
}

function normalizeTagCatalog(rawValue) {
  if (!rawValue || typeof rawValue !== "object" || Array.isArray(rawValue)) return [];
  return Object.values(rawValue)
    .filter((item) => item && typeof item === "object")
    .map((item) => ({ ...item }));
}

function normalizeObjectTags(rawValue) {
  if (!rawValue || typeof rawValue !== "object" || Array.isArray(rawValue)) return [];
  return Object.entries(rawValue).map(([objectKey, tagIds]) => {
    const { objectType, objectId } = splitObjectKey(objectKey);
    const safeTagIds = Array.isArray(tagIds) ? tagIds.filter(Boolean) : [];
    return {
      objectKey,
      objectType,
      objectId,
      tagCount: safeTagIds.length,
      tagIds: safeTagIds,
    };
  });
}

function normalizeObjectTagVotes(rawValue) {
  if (!rawValue || typeof rawValue !== "object" || Array.isArray(rawValue)) return [];
  return Object.entries(rawValue).map(([voteKey, votesMap]) => {
    const [objectKey, tagId = ""] = String(voteKey || "").split("|");
    const { objectType, objectId } = splitObjectKey(objectKey);
    const safeVotesMap = votesMap && typeof votesMap === "object" && !Array.isArray(votesMap)
      ? votesMap
      : {};
    const voteValues = Object.values(safeVotesMap)
      .map((value) => Number(value))
      .filter((value) => value === 1 || value === -1);
    const up = voteValues.filter((value) => value > 0).length;
    const down = voteValues.filter((value) => value < 0).length;
    return {
      voteKey,
      objectKey,
      objectType,
      objectId,
      tagId: String(tagId || ""),
      voterCount: voteValues.length,
      up,
      down,
      score: up - down,
      votes: safeVotesMap,
    };
  });
}

function getCollections() {
  const rawCollections = [
    {
      key: "events",
      title: "events",
      description: "Evenements sportifs avec score communautaire, statut et contexte de ligue.",
      get: () => events,
    },
    {
      key: "leagues",
      title: "leagues",
      description: "Compétitions canoniques (ID stable), indépendantes des saisons.",
      get: () => leagues,
    },
    {
      key: "leagueSeasons",
      title: "leagueSeasons",
      description: "Saisons/éditions annuelles rattachées à une compétition.",
      get: () => leagueSeasons,
    },
    {
      key: "leagueEvents",
      title: "leagueEvents",
      description: "Alias legacy de leagueSeasons pour compatibilité UI.",
      get: () => leagueEvents,
    },
    {
      key: "users",
      title: "users",
      description: "Profils utilisateurs, preferences sport et badge communautaire.",
      get: () => users,
    },
    {
      key: "athletes",
      title: "athletes",
      description: "Athletes avec metadonnees sportives, role, pays, image et equipe.",
      get: () => athletes,
    },
    {
      key: "teams",
      title: "teams",
      description: "Equipes avec rattachement sport/ville et liste d'athletes.",
      get: () => teams,
    },
    {
      key: "eventTeams",
      title: "eventTeams",
      description: "Table de liaison event <-> teams.",
      get: () => eventTeams,
    },
    {
      key: "athleteParticipation",
      title: "athleteParticipation",
      description: "Table de liaison event <-> athletes.",
      get: () => athleteParticipation,
    },
    {
      key: "eventInsights",
      title: "eventInsights",
      description: "Insights editoriaux par event (headline, highlights, tags).",
      get: () => eventInsights,
      normalize: normalizeInsights,
    },
    {
      key: "genericCommentSamples",
      title: "genericCommentSamples",
      description: "Dataset canonique des commentaires (critique + teaser) avec replies.",
      get: () => genericCommentSamples,
    },
    {
      key: "tagCatalog",
      title: "tagCatalog",
      description: "Catalogue des tags utilisateur (label, slug, auteur, horodatage).",
      get: () => storedTagCatalog,
      normalize: normalizeTagCatalog,
    },
    {
      key: "objectTags",
      title: "objectTags",
      description: "Liens polymorphiques objet -> tags (event/user/league/season/team/athlete/list).",
      get: () => storedObjectTags,
      normalize: normalizeObjectTags,
    },
    {
      key: "objectTagVotes",
      title: "objectTagVotes",
      description: "Votes utilisateur par couple objet+tag (+1/-1).",
      get: () => storedObjectTagVotes,
      normalize: normalizeObjectTagVotes,
    },
    {
      key: "curatedLists",
      title: "curatedLists",
      description: "Classements editoriaux et communautaires avec entries.",
      get: () => curatedLists,
    },
    {
      key: "activitySamples",
      title: "activitySamples",
      description: "Flux d'activite utilisateur (listes, critiques, labels).",
      get: () => activitySamples,
    },
  ];

  return rawCollections
    .map((collection) => {
      const rawValue = safeGetValue(collection.get, []);
      const records = collection.normalize
        ? collection.normalize(rawValue)
        : Array.isArray(rawValue) ? rawValue : [];
      return {
        ...collection,
        records,
        count: records.length,
      };
    })
    .filter((collection) => collection.count > 0);
}

function getTargetModelExamples() {
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
    {
      id: "comp_dauphine",
      currentName: "Tour d'Auvergne RA",
      sport: "Cyclisme",
      seasonModel: "calendar_year",
      frequency: "annual",
      renamedFrom: "Dauphine Libere",
    },
  ];

  const seasons = [
    {
      id: "comp_tour_de_france:2026",
      competitionId: "comp_tour_de_france",
      seasonKey: "2026",
      label: "Tour de France 2026",
      startDate: "2026-07-01",
      endDate: "2026-07-24",
    },
    {
      id: "comp_ligue_1:2024-2025",
      competitionId: "comp_ligue_1",
      seasonKey: "2024-2025",
      label: "Ligue 1 2024-2025",
      startDate: "2024-08-01",
      endDate: "2025-05-31",
    },
    {
      id: "comp_ligue_1:2025-2026",
      competitionId: "comp_ligue_1",
      seasonKey: "2025-2026",
      label: "Ligue 1 2025-2026",
      startDate: "2025-08-01",
      endDate: "2026-05-31",
    },
    {
      id: "comp_jo_ete:2024",
      competitionId: "comp_jo_ete",
      seasonKey: "2024",
      label: "JO 2024",
      startDate: "2024-07-26",
      endDate: "2024-08-11",
    },
  ];

  const competitionNameHistory = [
    {
      id: "cnh_comp_dauphine_1947",
      competitionId: "comp_dauphine",
      name: "Dauphine Libere",
      validFrom: "1947-01-01",
      validTo: "2024-12-31",
    },
    {
      id: "cnh_comp_dauphine_2025",
      competitionId: "comp_dauphine",
      name: "Tour d'Auvergne RA",
      validFrom: "2025-01-01",
      validTo: null,
    },
  ];

  const exampleEvents = [
    {
      id: "evt_example_tdf_2026_stage_1",
      competitionId: "comp_tour_de_france",
      seasonId: "comp_tour_de_france:2026",
      title: "Etape 1 - Tour de France",
      dateISO: "2026-07-01",
    },
    {
      id: "evt_example_l1_2025_om_psg",
      competitionId: "comp_ligue_1",
      seasonId: "comp_ligue_1:2025-2026",
      title: "Marseille vs PSG",
      dateISO: "2025-11-07",
    },
  ];

  return [
    {
      key: "target_competitions",
      title: "target.competitions",
      description: "Competition stable (ID immuable), independante des saisons.",
      records: competitions,
      count: competitions.length,
    },
    {
      key: "target_seasons",
      title: "target.seasons",
      description: "Edition/saison rattachee a une competition.",
      records: seasons,
      count: seasons.length,
    },
    {
      key: "target_competition_name_history",
      title: "target.competitionNameHistory",
      description: "Historique des changements de nom d'une competition.",
      records: competitionNameHistory,
      count: competitionNameHistory.length,
    },
    {
      key: "target_events",
      title: "target.events",
      description: "Event reference par competitionId + seasonId (et non par nom).",
      records: exampleEvents,
      count: exampleEvents.length,
    },
  ];
}

function renderSummary(collections) {
  const summaryEl = document.getElementById("data-summary");
  if (!summaryEl) return;

  const totalRecords = collections.reduce((sum, collection) => sum + collection.count, 0);
  const relationTables = collections.filter((collection) =>
    ["eventTeams", "athleteParticipation", "genericCommentSamples", "objectTags", "objectTagVotes"].includes(collection.key)
  ).length;

  summaryEl.innerHTML = `
    <article class="data-kpi-card">
      <p class="data-kpi-label">Collections detectees</p>
      <p class="data-kpi-value">${collections.length}</p>
    </article>
    <article class="data-kpi-card">
      <p class="data-kpi-label">Enregistrements total</p>
      <p class="data-kpi-value">${totalRecords}</p>
    </article>
    <article class="data-kpi-card">
      <p class="data-kpi-label">Tables de relation</p>
      <p class="data-kpi-value">${relationTables}</p>
    </article>
    <article class="data-kpi-card">
      <p class="data-kpi-label">Source</p>
      <p class="data-kpi-value data-kpi-value-small">app.js</p>
    </article>
  `;
}

function renderRelations() {
  const relationEl = document.getElementById("data-relations-list");
  if (!relationEl) return;

  const relations = [
    "events.competitionId -> leagues.id (derive)",
    "events.seasonId -> leagueSeasons.id (derive)",
    "leagueSeasons.leagueId -> leagues.id",
    "target.events.competitionId -> target.competitions.id",
    "target.events.seasonId -> target.seasons.id",
    "target.seasons.competitionId -> target.competitions.id",
    "target.competitionNameHistory.competitionId -> target.competitions.id",
    "eventTeams.eventId -> events.id",
    "eventTeams.teamIds[] -> teams.id",
    "athleteParticipation.eventId -> events.id",
    "athleteParticipation.athleteIds[] -> athletes.id",
    "athletes.teamId -> teams.id (optionnel)",
    "teams.athleteIds[] -> athletes.id",
    "genericCommentSamples.userId -> users.id",
    "genericCommentSamples.eventId -> events.id | leagueSeasons.id",
    "genericCommentSamples.replies[].userId -> users.id",
    "objectTags.objectKey(type:id) -> objet cible polymorphique",
    "objectTags.tagIds[] -> tagCatalog.id",
    "objectTagVotes.voteKey(type:id|tagId).tagId -> tagCatalog.id",
    "objectTagVotes.voteKey(type:id|tagId).userId -> users.id",
    "curatedLists.ownerId -> users.id",
    "curatedLists.entries[].eventId -> events.id",
    "curatedLists.entries[].athleteId -> athletes.id",
  ];

  relationEl.innerHTML = relations
    .map((relation) => `<li class="data-relation-item">${escapeHtml(relation)}</li>`)
    .join("");
}

function renderCollections(collections) {
  const container = document.getElementById("data-showcase");
  if (!container) return;

  if (!collections.length) {
    container.innerHTML = `
      <article class="data-card">
        <div class="data-card-header">
          <h3>Aucune collection detectee</h3>
        </div>
        <div class="data-card-body">
          <p class="muted">Impossible de lire les collections dans app.js depuis cette page.</p>
        </div>
      </article>
    `;
    return;
  }

  container.innerHTML = collections
    .map((collection) => {
      const fieldStats = analyzeFields(collection.records);
      const sample = collection.records[0] || {};
      const reducedSample = limitSample(sample, 0);
      const typePreview = fieldStats.typed.slice(0, 8);
      const requiredPreview = fieldStats.required.slice(0, 10);
      const optionalPreview = fieldStats.optional.slice(0, 10);

      return `
        <article class="data-card">
          <div class="data-card-header data-card-header-collection">
            <div>
              <h3>${escapeHtml(collection.title)}</h3>
              <p class="data-card-subtitle">${escapeHtml(collection.description)}</p>
            </div>
            <span class="data-count-pill">${collection.count} rows</span>
          </div>
          <div class="data-card-body">
            <div class="data-field-group">
              <p class="data-field-label">Champs toujours presents</p>
              <div class="data-pill-list">${renderPills(requiredPreview, "data-pill data-pill-required")}</div>
            </div>
            <div class="data-field-group">
              <p class="data-field-label">Champs optionnels</p>
              <div class="data-pill-list">${renderPills(optionalPreview, "data-pill data-pill-optional")}</div>
            </div>
            <div class="data-field-group">
              <p class="data-field-label">Types detectes (apercu)</p>
              <div class="data-pill-list">
                ${typePreview.length
                  ? typePreview.map((item) => `<span class="data-pill data-pill-type">${escapeHtml(`${item.key}: ${item.type}`)}</span>`).join("")
                  : '<span class="data-empty-pill">none</span>'}
              </div>
            </div>
            <pre class="code-block"><code>${escapeHtml(JSON.stringify(reducedSample, null, 2))}</code></pre>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDataModels() {
  const collections = [...getCollections(), ...getTargetModelExamples()];
  renderSummary(collections);
  renderRelations();
  renderCollections(collections);
}

document.addEventListener("DOMContentLoaded", renderDataModels);
