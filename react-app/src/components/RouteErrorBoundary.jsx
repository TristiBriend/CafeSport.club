import { Component } from "react";
import { Link } from "react-router-dom";

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: String(error?.message || "Erreur inconnue"),
    };
  }

  componentDidCatch(error, info) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error("RouteErrorBoundary:", error, info);
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="simple-page">
        <h1>Erreur de rendu</h1>
        <p>Une erreur bloque l affichage de cette page objet.</p>
        <p className="event-meta"><strong>Message:</strong> {this.state.errorMessage}</p>
        <Link className="btn btn-ghost" to="/discover">
          Retour a Decouvrir
        </Link>
      </section>
    );
  }
}

export default RouteErrorBoundary;
