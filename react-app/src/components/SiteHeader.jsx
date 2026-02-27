import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { searchGlobal } from "../services/globalSearchService";
import { getSports } from "../services/eventsService";
import { useAuth } from "../contexts/AuthContext";
import { getProfileAvatarOverride } from "../services/profileService";
import { getAthleteById, getTeamById } from "../services/catalogService";
import { useHeaderSearchPicker } from "../contexts/HeaderSearchPickerContext";

const PARCOURIR_NAV = [
  { to: "/athletes", label: "Athletes" },
  { to: "/teams", label: "Equipes" },
  { to: "/leagues", label: "Ligues" },
  { to: "/lists", label: "Listes" },
  { to: "/users", label: "Utilisateurs" },
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

function getPickerPlaceholder(kind) {
  return kind === "athlete"
    ? "Rechercher un athlete favori..."
    : "Rechercher une equipe favorite...";
}

function getImagePath(value) {
  const image = String(value || "").trim();
  if (!image) return "";
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:") || image.startsWith("blob:")) {
    return image;
  }
  return image.startsWith("/") ? image : `/${image}`;
}

function getInitials(name) {
  const source = String(name || "").trim();
  if (!source) return "?";
  const [first = "", second = ""] = source.split(/\s+/);
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase() || "?";
}

function resolvePickerSelection(kind, itemId) {
  const safeId = String(itemId || "").trim();
  if (!safeId) return null;
  if (kind === "athlete") {
    const athlete = getAthleteById(safeId);
    return athlete
      ? {
        id: athlete.id,
        label: athlete.name,
        to: `/athlete/${athlete.id}`,
      }
      : null;
  }
  const team = getTeamById(safeId);
  return team
    ? {
      id: team.id,
      label: team.nameFull || team.name,
      to: `/team/${team.id}`,
    }
    : null;
}

function SiteHeader({ watchlistCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentUser,
    isAuthenticated,
    isAdmin,
    logout,
  } = useAuth();
  const {
    isPickerActive,
    pickerKind,
    pickerTitle,
    pickerMaxSelections,
    selectedIds,
    setSelectedIds,
    confirmPicker,
    cancelPicker,
  } = useHeaderSearchPicker();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [pickerNotice, setPickerNotice] = useState("");
  const headerSearchRef = useRef(null);
  const sportsMenuRef = useRef(null);
  const adminMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const inputRef = useRef(null);
  const previousPathRef = useRef(location.pathname);
  const sports = useMemo(() => getSports(), []);
  const profileAvatar = useMemo(
    () => getProfileAvatarOverride(currentUser?.id),
    [currentUser?.id],
  );
  const userAvatarSrc = getImagePath(profileAvatar || currentUser?.image);
  const userInitials = getInitials(currentUser?.name || "User");
  const isBrowseActive = useMemo(
    () => [
      "/sports/",
      "/athletes",
      "/teams",
      "/leagues",
      "/lists",
      "/users",
    ].some((prefix) => location.pathname.startsWith(prefix)),
    [location.pathname],
  );
  const pickerTypes = useMemo(
    () => (isPickerActive ? [pickerKind] : null),
    [isPickerActive, pickerKind],
  );
  const results = useMemo(
    () => searchGlobal(query, { limit: 20, types: pickerTypes }),
    [pickerTypes, query],
  );
  const pickerSelections = useMemo(
    () => selectedIds.map((id) => resolvePickerSelection(pickerKind, id)).filter(Boolean),
    [pickerKind, selectedIds],
  );

  const closeHeaderMenus = useCallback(({ except = null } = {}) => {
    [sportsMenuRef.current, adminMenuRef.current, userMenuRef.current].forEach((menu) => {
      if (!menu || menu === except) return;
      menu.open = false;
    });
  }, []);

  const handleMenuDropdownClick = useCallback((event) => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest("a")) return;
    closeHeaderMenus();
  }, [closeHeaderMenus]);

  const handleLogout = useCallback(() => {
    closeHeaderMenus();
    logout();
    navigate("/login");
  }, [closeHeaderMenus, logout, navigate]);

  function handleCancelPicker() {
    cancelPicker();
    setPickerNotice("");
    setQuery("");
    setIsOpen(false);
  }

  function handleConfirmPicker() {
    confirmPicker();
    setPickerNotice("");
    setQuery("");
    setIsOpen(false);
  }

  function handleAddPickerResult(result) {
    if (!isPickerActive) return;
    const safeId = String(result?.id || "").trim();
    if (!safeId) return;
    if (selectedIds.includes(safeId)) {
      setPickerNotice("Deja ajoute.");
      return;
    }
    if (selectedIds.length >= pickerMaxSelections) {
      setPickerNotice(`Limite ${pickerMaxSelections}/${pickerMaxSelections} atteinte.`);
      return;
    }
    setSelectedIds((previous) => [...previous, safeId]);
    setPickerNotice("");
    setQuery("");
    inputRef.current?.focus();
  }

  function handleRemovePickerSelection(itemId) {
    const safeId = String(itemId || "").trim();
    if (!safeId) return;
    setSelectedIds((previous) => previous.filter((id) => id !== safeId));
    setPickerNotice("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    if (previousPathRef.current === location.pathname) {
      return;
    }
    previousPathRef.current = location.pathname;
    setIsOpen(false);
    setQuery("");
    setPickerNotice("");
    if (isPickerActive) {
      cancelPicker();
    }
    closeHeaderMenus();
  }, [cancelPicker, closeHeaderMenus, isPickerActive, location.pathname]);

  useEffect(() => {
    if (!isPickerActive) return;
    setIsOpen(true);
    setQuery("");
    setPickerNotice("");
    inputRef.current?.focus();
  }, [isPickerActive]);

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
        if (isPickerActive) {
          handleCancelPicker();
          return;
        }
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
  }, [closeHeaderMenus, isPickerActive]);

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
              placeholder={isPickerActive ? getPickerPlaceholder(pickerKind) : getSearchPlaceholder(location.pathname)}
              value={query}
              onFocus={() => setIsOpen(true)}
              onChange={(event) => {
                setQuery(event.target.value);
                if (pickerNotice) setPickerNotice("");
              }}
              onKeyDown={(event) => {
                if (!isPickerActive || event.key !== "Enter") return;
                event.preventDefault();
                if (results.length) {
                  handleAddPickerResult(results[0]);
                }
              }}
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
              isPickerActive ? (
                <>
                  <div className="header-search-picker-head">
                    <strong>{pickerTitle || (pickerKind === "athlete" ? "Favoris athletes" : "Favoris equipes")}</strong>
                    <span className="header-search-picker-limit">
                      {selectedIds.length}/{pickerMaxSelections}
                    </span>
                  </div>
                  <div className="header-search-picker-selection">
                    {pickerSelections.length ? (
                      pickerSelections.map((item) => (
                        <span key={item.id} className="tag">
                          <span>{item.label}</span>
                          <button
                            type="button"
                            className="header-search-picker-chip-remove"
                            onClick={() => handleRemovePickerSelection(item.id)}
                            aria-label={`Retirer ${item.label}`}
                            title={`Retirer ${item.label}`}
                          >
                            x
                          </button>
                        </span>
                      ))
                    ) : (
                      <p className="event-meta">Aucune selection pour le moment.</p>
                    )}
                  </div>
                  {pickerNotice ? <p className="header-search-picker-limit">{pickerNotice}</p> : null}
                  {query ? (
                    results.length ? (
                      results.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          className="global-search-result-item header-search-picker-result"
                          type="button"
                          onClick={() => handleAddPickerResult(result)}
                        >
                          <span className="global-search-type">{result.typeLabel}</span>
                          <div>
                            <strong>{result.title}</strong>
                            <p>{result.subtitle}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="global-search-empty">
                        Aucun resultat pour <strong>{query}</strong>
                      </div>
                    )
                  ) : (
                    <div className="global-search-hints">
                      <p>Tape puis valide avec Enter, ou clique sur un resultat.</p>
                    </div>
                  )}
                  <div className="header-search-picker-actions">
                    <button type="button" className="filter-btn" onClick={handleCancelPicker}>
                      Annuler
                    </button>
                    <button type="button" className="filter-btn is-active" onClick={handleConfirmPicker}>
                      {`Valider (${selectedIds.length}/${pickerMaxSelections})`}
                    </button>
                  </div>
                </>
              ) : (
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
              )
            ) : null}
          </div>
        </div>

        <nav className="nav nav-tristi">
          <NavLink to="/feed">Mon Feed</NavLink>
          <NavLink to="/watchlist">Ma Watchlist ({watchlistCount})</NavLink>
          <NavLink
            to="/discover"
            className={({ isActive }) => (isActive ? "nav-pill-link" : "")}
          >
            Decouvrir
          </NavLink>
          <details
            ref={sportsMenuRef}
            className="nav-dropdown nav-sports-menu"
            onToggle={(event) => {
              if (!event.currentTarget.open) return;
              closeHeaderMenus({ except: event.currentTarget });
            }}
          >
            <summary className={`nav-dropdown-toggle ${isBrowseActive ? "is-active" : ""}`.trim()}>
              Parcourir
            </summary>
            <div className="nav-dropdown-menu" role="menu" aria-label="Menu parcourir" onClick={handleMenuDropdownClick}>
              {PARCOURIR_NAV.map((item) => (
                <NavLink key={item.to} role="menuitem" to={item.to}>
                  {item.label}
                </NavLink>
              ))}
              <details className="nav-submenu nav-browse-sports-submenu">
                <summary className="nav-submenu-toggle">Sports</summary>
                <div className="nav-submenu-menu" role="group" aria-label="Liste des sports">
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
            </div>
          </details>
        </nav>

        <div className="header-actions">
          {isAdmin ? (
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
          ) : null}

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
