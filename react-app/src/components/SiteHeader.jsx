import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { searchGlobal } from "../services/globalSearchService";

const EXPLORE_NAV = [
  { to: "/athletes", label: "Athletes" },
  { to: "/teams", label: "Teams" },
  { to: "/leagues", label: "Leagues" },
  { to: "/lists", label: "Lists" },
  { to: "/users", label: "Users" },
];

const ADMIN_NAV = [
  { to: "/datamodel", label: "DataModel" },
  { to: "/uisamples", label: "UISamples" },
];

function getSearchPlaceholder(pathname) {
  if (pathname.startsWith("/event/")) return "Rechercher un autre evenement...";
  if (pathname.startsWith("/league/")) return "Rechercher une ligue, un event ou un athlete...";
  if (pathname.startsWith("/user/")) return "Rechercher users, lists, events...";
  return "Rechercher competition, joueur, classement, user...";
}

function SiteHeader({ watchlistCount = 0 }) {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const headerSearchRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(
    () => searchGlobal(query, { limit: 20 }),
    [query],
  );

  useEffect(() => {
    setIsOpen(false);
    setQuery("");
  }, [location.pathname]);

  useEffect(() => {
    function onPointerDown(event) {
      if (!headerSearchRef.current) return;
      if (!headerSearchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function onKeyDown(event) {
      const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const isSlashFocus = event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
      if (isCommandK || isSlashFocus) {
        const tagName = String(document.activeElement?.tagName || "").toLowerCase();
        const isTypingContext = tagName === "input" || tagName === "textarea" || document.activeElement?.isContentEditable;
        if (!isCommandK && isTypingContext) return;
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-main gum-header-main">
        <div className="brand brand-gum">
          <Link className="brand-link" to="/">
            <img src="/images/Name.svg" alt="Logo Sofa Critics" />
          </Link>
        </div>

        <div className="header-search-inline" ref={headerSearchRef}>
          <label className="search header-search" htmlFor="global-search-input-react">
            <input
              id="global-search-input-react"
              ref={inputRef}
              type="search"
              placeholder={getSearchPlaceholder(location.pathname)}
              value={query}
              onFocus={() => setIsOpen(true)}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </label>

          <div className="search-results header-search-results">
            {isOpen ? (
              query ? (
                results.length ? (
                  results.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      className="global-search-result-item"
                      to={result.to}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery("");
                      }}
                    >
                      <span className="global-search-type">{result.typeLabel}</span>
                      <div>
                        <strong>{result.title}</strong>
                        <p>{result.subtitle}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="global-search-empty">
                    Aucun resultat pour <strong>{query}</strong>
                  </div>
                )
              ) : (
                <div className="global-search-hints">
                  <p>Astuce: tape `/` ou `Cmd/Ctrl + K` pour rechercher rapidement.</p>
                  <p>Exemples: <code>Real Madrid</code>, <code>Roland</code>, <code>Nina</code>, <code>Tour de France</code></p>
                </div>
              )
            ) : null}
          </div>
        </div>

        <nav className="nav nav-gum">
          <a className={location.pathname === "/" ? "nav-pill-link" : ""} href="/#home">Decouvrir</a>
          <NavLink to="/feed">Mon Feed</NavLink>
          <a href="/#events">Evenements</a>
          <NavLink to="/watchlist">Watchlist ({watchlistCount})</NavLink>
        </nav>

        <div className="header-actions">
          <details className="header-user-menu">
            <summary className="ghost-header user-menu-toggle" aria-label="Ouvrir le menu admin">
              <span className="user-menu-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 7.5h16M4 12h16M4 16.5h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="8" cy="7.5" r="1.75" fill="#111111" />
                  <circle cx="14" cy="12" r="1.75" fill="#111111" />
                  <circle cx="10" cy="16.5" r="1.75" fill="#111111" />
                </svg>
              </span>
            </summary>
            <div className="user-menu-dropdown" role="menu" aria-label="Menu admin">
              {ADMIN_NAV.map((item) => (
                <NavLink key={item.to} role="menuitem" to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </details>

          <details className="header-user-menu">
            <summary className="ghost-header user-menu-toggle" aria-label="Ouvrir le menu utilisateur">
              <span className="user-menu-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4.25" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 21c1-4.2 4.2-6.4 8-6.4s7 2.2 8 6.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="user-menu-dropdown" role="menu" aria-label="Menu utilisateur">
              <NavLink role="menuitem" to="/users">Profil</NavLink>
              <NavLink role="menuitem" to="/tierlist">Tierlist</NavLink>
              {EXPLORE_NAV.map((item) => (
                <NavLink key={item.to} role="menuitem" to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </details>
          <NavLink className="cta cta-header join-beta-header" to="/join">Rejoindre la beta</NavLink>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
