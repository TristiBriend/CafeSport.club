import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RequireAuth({ children }) {
  const location = useLocation();
  const { authReady, isAuthenticated } = useAuth();

  if (!authReady) {
    return (
      <section className="simple-page">
        <p>Initialisation de la session...</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        to="/login"
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  return children;
}

export default RequireAuth;
