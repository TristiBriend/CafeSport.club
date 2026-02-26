import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function resolveSafeFromPath(value) {
  const path = String(value || "").trim();
  if (!path.startsWith("/")) return "/profile";
  if (path.startsWith("/login") || path.startsWith("/signup")) return "/profile";
  return path;
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    authError,
    authReady,
    isAuthenticated,
    isFirebaseConfigured,
    firebaseMissingConfig,
    loginWithEmail,
    loginWithGoogle,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (authReady && isAuthenticated) {
    return <Navigate replace to="/profile" />;
  }

  async function handleEmailSubmit(event) {
    event.preventDefault();
    const safeEmail = String(email || "").trim();
    if (!safeEmail || !password) {
      setLocalError("Email et mot de passe obligatoires.");
      return;
    }
    setIsSubmitting(true);
    setLocalError("");
    try {
      await loginWithEmail(safeEmail, password);
      const fromPath = resolveSafeFromPath(location.state?.from);
      navigate(fromPath, { replace: true });
    } catch (error) {
      setLocalError(String(error?.message || "Connexion impossible."));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsSubmitting(true);
    setLocalError("");
    try {
      await loginWithGoogle();
      const fromPath = resolveSafeFromPath(location.state?.from);
      navigate(fromPath, { replace: true });
    } catch (error) {
      setLocalError(String(error?.message || "Connexion Google impossible."));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <section className="auth-page-shell">
        <article className="simple-page">
          <p>Firebase n est pas configure.</p>
          <p className="event-meta">
            Variables manquantes: {firebaseMissingConfig.join(", ")}
          </p>
        </article>
      </section>
    );
  }

  if (!authReady) {
    return (
      <section className="auth-page-shell">
        <article className="simple-page">
          <p>Initialisation de la session...</p>
        </article>
      </section>
    );
  }

  const feedback = localError || authError;

  return (
    <section className="auth-page-shell">
      <form className="comment-composer auth-form" onSubmit={handleEmailSubmit}>
        <label className="search-wrap" htmlFor="login-email">
          <span>Email</span>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="vous@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="search-wrap" htmlFor="login-password">
          <span>Mot de passe</span>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          Se connecter
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          Continuer avec Google
        </button>
        {feedback ? (
          <p className="event-meta auth-feedback-error">{feedback}</p>
        ) : null}
        <p className="event-meta">
          Pas de compte ? <Link className="auth-inline-link" to="/signup">S inscrire</Link>
        </p>
      </form>
    </section>
  );
}

export default LoginPage;
