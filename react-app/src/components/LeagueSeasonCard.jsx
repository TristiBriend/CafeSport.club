import { Link } from "react-router-dom";
import ObjectCardFrame from "./ObjectCardFrame";
import { getLeagueById } from "../services/leaguesService";

function LeagueSeasonCard({
  season,
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
}) {
  if (!season) return null;

  const league = getLeagueById(season.leagueId);

  return (
    <ObjectCardFrame
      objectType="league-season"
      objectId={season.id}
      title={season.title}
      sportLabel={season.sport || league?.sport || "Sport"}
      metricValue={Math.round(Number(season.averageScore || 0))}
      image={season.image}
      fallbackLabel={season.title}
      primaryPath={`/league-season/${season.id}`}
      primaryActionLabel={`Aller a ${season.title}`}
      size={size}
      variant={variant}
      showTags={showTags}
      showMenu={showMenu}
      className={className}
      baseFollowCount={Math.max(90, Number(season.count || 0) * 18)}
      menuExtraActions={league?.id ? [{ label: `Aller a ${league.title}`, to: `/league/${league.id}` }] : []}
    >
      <p className="object-card-line object-card-line-title typo-body-strong">
        <Link className="object-card-inline-link" to={`/league-season/${season.id}`}>
          {season.title}
        </Link>
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {season.count || 0} evenements · {season.dateRangeLabel || "Periode N/A"}
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        A venir: {Number(season.upcomingCount || 0)} · Termines: {Number(season.pastCount || 0)}
      </p>
    </ObjectCardFrame>
  );
}

export default LeagueSeasonCard;
