// src/components/ui/HeaderNav.jsx
import React from "react";
import { useGame } from "../../state/GameContext";

export default function HeaderNav() {
  const { activeTab, setActiveTab, discoveredClues } = useGame();

  return (
    <header className="alibi-header">
      <div className="header-brand">
        <div className="brand-logo-frame">
          <span className="brand-film-sprocket">🎞️</span>
          <div className="brand-text-block">
            <h1 className="brand-title">ALIBI</h1>
            <span className="brand-tagline">Rex Talkies • 1965 Noir Mystery</span>
          </div>
        </div>
      </div>

      {/* GAME NAVIGATION TABS */}
      <nav className="header-nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === "interrogation" ? "active" : ""}`}
          onClick={() => setActiveTab("interrogation")}
        >
          <span className="tab-icon">🎙️</span>
          <span>Interrogation Room</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "evidence" ? "active" : ""}`}
          onClick={() => setActiveTab("evidence")}
        >
          <span className="tab-icon">🔍</span>
          <span>Forensic Evidence</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "dossier" ? "active" : ""}`}
          onClick={() => setActiveTab("dossier")}
        >
          <span className="tab-icon">📋</span>
          <span>Case Timeline</span>
        </button>
      </nav>

      {/* RIGHT STATUS INDICATOR */}
      <div className="header-status-area">
        <div className="progress-badge" title="Investigation Clues Discovered">
          <span className="progress-label">Clues Found:</span>
          <strong>{discoveredClues.length}</strong>
        </div>
      </div>
    </header>
  );
}
