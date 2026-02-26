import { Link } from "react-router-dom";
import ObjectCardFrame from "./ObjectCardFrame";

function LeagueCard({
  league,
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
}) {
  if (!league) return null;

  const firstSeason = Array.isArray(league.seasons) ? league.seasons[0] : null;

  return (
    <ObjectCardFrame
      objectType="league"
      objectId={league.id}
      title={league.title}
      sportLabel={league.sport || "Sport"}
      metricValue={Math.round(Number(league.averageScore || 0))}
      image={league.image}
      fallbackLabel={league.title}
      primaryPath={`/league/${league.id}`}
      primaryActionLabel={`Aller a ${league.title}`}
      size={size}
      variant={variant}
      showTags={showTags}
      showMenu={showMenu}
      className={className}
      baseFollowCount={Math.max(180, Number(league.count || 0) * 26)}
      menuExtraActions={firstSeason?.id ? [{ label: `Aller a ${firstSeason.title}`, to: `/league-season/${firstSeason.id}` }] : []}
    >
      <p className="object-card-line object-card-line-title typo-body-strong">
        <Link className="object-card-inline-link" to={`/league/${league.id}`}>
          {league.title}
        </Link>
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {league.count || 0} evenements · {league.seasons?.length || 0} saisons
      </p>
      {firstSeason?.id ? (
        <p className="object-card-line object-card-line-meta typo-meta">
          Saison en cours:{" "}
          <Link className="object-card-inline-link" to={`/league-season/${firstSeason.id}`}>
            {firstSeason.title}
          </Link>
        </p>
      ) : (
        <p className="object-card-line object-card-line-meta typo-meta">Aucune saison disponible</p>
      )}
    </ObjectCardFrame>
  );
}

export default LeagueCard;
