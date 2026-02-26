import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { buildBreadcrumbs } from "../services/breadcrumbsService";

function PageBreadcrumbs() {
  const location = useLocation();
  const { currentUser, isAuthenticated } = useAuth();

  const segments = useMemo(() => buildBreadcrumbs({
    pathname: location.pathname,
    search: location.search,
    authState: {
      isAuthenticated,
      userName: currentUser?.name || "",
    },
  }), [currentUser?.name, isAuthenticated, location.pathname, location.search]);

  return (
    <nav className="page-breadcrumb-nav" aria-label="Arborescence">
      <ol className="page-breadcrumb-list">
        {segments.map((segment, index) => (
          <li key={`${segment.label}-${index}`} className="page-breadcrumb-item">
            {index > 0 ? <span className="page-breadcrumb-separator" aria-hidden="true">{">"}</span> : null}
            {segment.isCurrent ? (
              <span className="page-breadcrumb-current" aria-current="page">{segment.label}</span>
            ) : (
              <Link className="page-breadcrumb-link" to={segment.to || "#"}>
                {segment.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default PageBreadcrumbs;
