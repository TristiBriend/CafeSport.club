import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { searchGlobal } from "../services/globalSearchService";
import { getSports } from "../services/eventsService";
import { useAuth } from "../contexts/AuthContext";
import { getProfileAvatarOverride } from "../services/profileService";

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

function toSportSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSearchPlaceholder(pathname) {
  if (pathname.startsWith("/event/")) return "Rechercher un autre evenement...";
  if (pathname.startsWith("/league/")) return "Rechercher une ligue, un event ou un athlete...";
  if (pathname.startsWith("/user/")) return "Rechercher users, lists, events...";
  return "Rechercher competition, joueur, classement, user...";
}

function getImagePath(value) {
  const image = String(value || "").trim();
  if (!image) return "";
  return image.startsWith("/") ? image : `/${image}`;
}

function getInitials(name) {
  const source = String(name || "").trim();
  if (!source) return "?";
  const [first = "", second = ""] = source.split(/\s+/);
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase() || "?";
}

function SiteHeader({ watchlistCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const headerSearchRef = useRef(null);
  const sportsMenuRef = useRef(null);
  const adminMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const inputRef = useRef(null);
  const sports = useMemo(() => getSports(), []);
  const profileAvatar = useMemo(
    () => getProfileAvatarOverride(currentUser?.id),
    [currentUser?.id],
  );
  const userAvatarSrc = getImagePath(profileAvatar || currentUser?.image);
  const userInitials = getInitials(currentUser?.name || "User");
  const isSportsActive = location.pathname.startsWith("/sports/");

  const results = useMemo(
    () => searchGlobal(query, { limit: 20 }),
    [query],
  );

  function closeHeaderMenus({ except = null } = {}) {
    [sportsMenuRef.current, adminMenuRef.current, userMenuRef.current].forEach((menu) => {
      if (!menu || menu === except) return;
      menu.open = false;
    });
  }

  function handleMenuDropdownClick(event) {
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest("a")) return;
    closeHeaderMenus();
  }

  function handleLogout() {
    closeHeaderMenus();
    logout();
    navigate("/login");
  }

  useEffect(() => {
    setIsOpen(false);
    setQuery("");
    closeHeaderMenus();
  }, [location.pathname]);

  useEffect(() => {
    function onPointerDown(event) {
      if (!headerSearchRef.current) return;
      if (!headerSearchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      const clickedInsideMenu = [sportsMenuRef.current, adminMenuRef.current, userMenuRef.current]
        .some((menu) => menu?.contains(event.target));
      if (!clickedInsideMenu) {
        closeHeaderMenus();
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
        closeHeaderMenus();
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
      <div className="header-main tristi-header-main">
        <div className="brand brand-tristi">
          <Link className="brand-link" to="/">
            <img src="/images/logo.svg" alt="Logo Sofa Critics" />
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

        <nav className="nav nav-tristi">
          <NavLink to="/feed">Mon Feed</NavLink>
          <NavLink to="/watchlist">Ma Watchlist ({watchlistCount})</NavLink>
          <a className={location.pathname === "/" ? "nav-pill-link" : ""} href="/#home">Decouvrir</a>
          <details
            ref={sportsMenuRef}
            className="nav-dropdown nav-sports-menu"
            onToggle={(event) => {
              if (!event.currentTarget.open) return;
              closeHeaderMenus({ except: event.currentTarget });
            }}
          >
            <summary className={`nav-dropdown-toggle ${isSportsActive ? "is-active" : ""}`.trim()}>
              Sports
            </summary>
            <div className="nav-dropdown-menu" role="menu" aria-label="Liste des sports" onClick={handleMenuDropdownClick}>
              {sports.map((sport) => (
                <NavLink
                  key={sport}
                  role="menuitem"
                  to={`/sports/${toSportSlug(sport)}`}
                >
                  {sport}
                </NavLink>
              ))}
            </div>
          </details>
        </nav>

        <div className="header-actions">
          <details
            ref={adminMenuRef}
            className="header-user-menu"
            onToggle={(event) => {
              if (!event.currentTarget.open) return;
              closeHeaderMenus({ except: event.currentTarget });
            }}
          >
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
            <div className="user-menu-dropdown" role="menu" aria-label="Menu admin" onClick={handleMenuDropdownClick}>
              {ADMIN_NAV.map((item) => (
                <NavLink key={item.to} role="menuitem" to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </details>

          {isAuthenticated ? (
            <details
              ref={userMenuRef}
              className="header-user-menu"
              onToggle={(event) => {
                if (!event.currentTarget.open) return;
                closeHeaderMenus({ except: event.currentTarget });
              }}
            >
              <summary className="ghost-header user-menu-toggle header-user-avatar-toggle" aria-label="Ouvrir le menu utilisateur">
                <span className="header-user-avatar" aria-hidden="true">
                  {userAvatarSrc ? (
                    <img src={userAvatarSrc} alt={currentUser?.name || "Utilisateur"} loading="lazy" />
                  ) : (
                    <span className="header-user-avatar-initials">{userInitials}</span>
                  )}
                </span>
              </summary>
              <div className="user-menu-dropdown" role="menu" aria-label="Menu utilisateur" onClick={handleMenuDropdownClick}>
                <NavLink role="menuitem" to="/profile">Mon profil</NavLink>
                <NavLink role="menuitem" to="/tierlist">Tierlist</NavLink>
                {EXPLORE_NAV.map((item) => (
                  <NavLink key={item.to} role="menuitem" to={item.to}>
                    {item.label}
                  </NavLink>
                ))}
                <button type="button" role="menuitem" className="user-menu-logout-btn" onClick={handleLogout}>
                  Deconnexion
                </button>
              </div>
            </details>
          ) : (
            <>
              <NavLink className="ghost-header header-auth-cta is-login" to="/login">Se connecter</NavLink>
              <NavLink className="cta cta-header header-auth-cta is-signup" to="/join">S inscrire</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
