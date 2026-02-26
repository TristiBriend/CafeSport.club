import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RequireAdmin({ children }) {
  const location = useLocation();
  const {
    authReady,
    isAuthenticated,
    isAdmin,
    adminReady,
  } = useAuth();

  if (!authReady || (isAuthenticated && !adminReady)) {
    return (
      <section className="simple-page">
        <p>Verification des droits admin...</p>
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

  if (!isAdmin) {
    return <Navigate replace to="/feed" />;
  }

  return children;
}

export default RequireAdmin;

