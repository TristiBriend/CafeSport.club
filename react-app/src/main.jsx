import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { SocialSyncProvider } from "./contexts/SocialSyncContext";
import "./styles/base.css";
import "./styles/tokens.css";
import "./styles/layout.css";
import "./components/EventCard.css";
import "./styles/components.css";
import "./styles/features.css";
import "./styles/overrides.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SocialSyncProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocialSyncProvider>
    </AuthProvider>
  </React.StrictMode>,
);
