import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const {
    authError,
    authReady,
    isAuthenticated,
    isFirebaseConfigured,
    firebaseMissingConfig,
    loginWithGoogle,
    signupWithEmail,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (authReady && isAuthenticated) {
    return <Navigate replace to="/profile" />;
  }

  async function handleSignupSubmit(event) {
    event.preventDefault();
    const safeEmail = String(email || "").trim();
    if (!safeEmail || !password) {
      setLocalError("Email et mot de passe obligatoires.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Le mot de passe doit contenir au moins 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsSubmitting(true);
    setLocalError("");
    try {
      await signupWithEmail(safeEmail, password);
      navigate("/profile", { replace: true });
    } catch (error) {
      setLocalError(String(error?.message || "Inscription impossible."));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignup() {
    setIsSubmitting(true);
    setLocalError("");
    try {
      await loginWithGoogle();
      navigate("/profile", { replace: true });
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
      <form className="comment-composer auth-form" onSubmit={handleSignupSubmit}>
        <label className="search-wrap" htmlFor="signup-email">
          <span>Email</span>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="vous@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="search-wrap" htmlFor="signup-password">
          <span>Mot de passe</span>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="6 caracteres minimum"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label className="search-wrap" htmlFor="signup-password-confirm">
          <span>Confirmer le mot de passe</span>
          <input
            id="signup-password-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          Creer un compte
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={handleGoogleSignup}
          disabled={isSubmitting}
        >
          Continuer avec Google
        </button>
        {feedback ? (
          <p className="event-meta auth-feedback-error">{feedback}</p>
        ) : null}
        <p className="event-meta">
          Deja inscrit ? <Link className="auth-inline-link" to="/login">Se connecter</Link>
        </p>
      </form>
    </section>
  );
}

export default SignupPage;
