import { Link } from "react-router-dom";
import ObjectCardFrame from "./ObjectCardFrame";
import { getEventsForAthlete, getTeamForAthlete } from "../services/catalogService";

function getAverageScore(events = []) {
  const source = Array.isArray(events) ? events : [];
  if (!source.length) return 0;
  const total = source.reduce((sum, event) => sum + Number(event?.communityScore || 0), 0);
  return Math.round(total / source.length);
}

function PlayerCard({
  athlete,
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
}) {
  if (!athlete) return null;

  const team = getTeamForAthlete(athlete);
  const events = getEventsForAthlete(athlete.id);
  const averageScore = getAverageScore(events);

  return (
    <ObjectCardFrame
      objectType="athlete"
      objectId={athlete.id}
      title={athlete.name}
      sportLabel={athlete.sport || "Sport"}
      metricValue={averageScore}
      image={athlete.image}
      fallbackLabel={athlete.name}
      primaryPath={`/athlete/${athlete.id}`}
      primaryActionLabel={`Aller a ${athlete.name}`}
      size={size}
      variant={variant}
      showTags={showTags}
      showMenu={showMenu}
      className={className}
      baseFollowCount={Math.max(80, events.length * 28)}
      menuExtraActions={team?.id ? [{ label: `Aller a ${team.nameFull || team.name}`, to: `/team/${team.id}` }] : []}
    >
      <p className="object-card-line object-card-line-title typo-body-strong">
        <Link className="object-card-inline-link" to={`/athlete/${athlete.id}`}>
          {athlete.name}
        </Link>
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {athlete.role || "Athlete"} · {athlete.country || "N/A"}
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {team?.id ? (
          <>
            Team:{" "}
            <Link className="object-card-inline-link" to={`/team/${team.id}`}>
              {team.name}
            </Link>
          </>
        ) : "Team inconnu"}
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">{events.length} evenements lies</p>
    </ObjectCardFrame>
  );
}

export default PlayerCard;
