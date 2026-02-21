import { Link, NavLink } from "react-router-dom";

const FOOTER_LINKS = [
  { to: "/discover", label: "Decouvrir" },
  { to: "/feed", label: "Mon Feed" },
  { to: "/calendar", label: "Calendar" },
  { to: "/watchlist", label: "Watchlist" },
  { to: "/tierlist", label: "Tierlist" },
  { to: "/lists", label: "Lists" },
  { to: "/join", label: "Join" },
  { to: "/datamodel", label: "DataModel" },
  { to: "/uisamples", label: "UISamples" },
];

function SiteFooter({ watchlistCount = 0 }) {
  return (
    <footer className="site-footer">
      <div>
        <span className="brand-name">
          <Link to="/">Sofa Critics</Link>
        </span>
        <p className="muted">A vos marques, prets, critiquez !</p>
        <p className="muted">Watchlist: {watchlistCount} element(s)</p>
        <p className="muted">Copyright @Intuitions Studio 2026</p>
      </div>
      <nav className="footer-links" aria-label="Navigation footer">
        {FOOTER_LINKS.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
        <a href="mailto:tristan@pytha.app">Contact</a>
      </nav>
    </footer>
  );
}

export default SiteFooter;
