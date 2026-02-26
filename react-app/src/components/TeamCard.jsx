import { Link } from "react-router-dom";
import ObjectCardFrame from "./ObjectCardFrame";
import { getAthletesForTeam, getEventsForTeam } from "../services/catalogService";

function getAverageScore(events = []) {
  const source = Array.isArray(events) ? events : [];
  if (!source.length) return 0;
  const total = source.reduce((sum, event) => sum + Number(event?.communityScore || 0), 0);
  return Math.round(total / source.length);
}

function TeamCard({
  team,
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
}) {
  if (!team) return null;

  const athletes = getAthletesForTeam(team.id);
  const events = getEventsForTeam(team.id);
  const averageScore = getAverageScore(events);

  return (
    <ObjectCardFrame
      objectType="team"
      objectId={team.id}
      title={team.nameFull || team.name}
      sportLabel={team.sport || "Sport"}
      metricValue={averageScore}
      image={team.image}
      fallbackLabel={team.name}
      primaryPath={`/team/${team.id}`}
      primaryActionLabel={`Aller a ${team.nameFull || team.name}`}
      size={size}
      variant={variant}
      showTags={showTags}
      showMenu={showMenu}
      className={className}
      baseFollowCount={Math.max(120, athletes.length * 40 + events.length * 28)}
      menuExtraActions={athletes[0]?.id ? [{ label: `Aller a ${athletes[0].name}`, to: `/athlete/${athletes[0].id}` }] : []}
    >
      <p className="object-card-line object-card-line-title typo-body-strong">
        <Link className="object-card-inline-link" to={`/team/${team.id}`}>
          {team.nameFull || team.name}
        </Link>
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {team.city || "Ville inconnue"} · {team.nameMini || team.name}
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {athletes.length} athletes · {events.length} evenements
      </p>
    </ObjectCardFrame>
  );
}

export default TeamCard;
