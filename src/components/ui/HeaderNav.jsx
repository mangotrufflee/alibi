// src/components/ui/HeaderNav.jsx
import React from "react";
import { useGame } from "../../state/GameContext";

export default function HeaderNav() {
  const {
    activeTab,
    setActiveTab,
    discoveredClues,
    pipelineState,
    investigationProgress
  } = useGame();

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

      {/* NAVIGATION TABS */}
      <nav className="header-nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === "interrogation" ? "active" : ""}`}
          onClick={() => setActiveTab("interrogation")}
        >
          <span className="tab-icon">🎙️</span>
          <span>Interrogation Room</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "gnani-pipeline" ? "active" : ""}`}
          onClick={() => setActiveTab("gnani-pipeline")}
        >
          <span className="tab-icon">⚡</span>
          <span>Gnani AI Pipeline</span>
          <span className="tab-mini-badge">STT & TTS</span>
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
          <span>Case & Timeline</span>
        </button>
      </nav>

      {/* RIGHT STATUS INDICATORS */}
      <div className="header-status-area">
        <div className="gnani-status-chip" onClick={() => setActiveTab("gnani-pipeline")}>
          <span className={`status-led ${pipelineState.isFallbackActive ? "fallback" : "online"}`} />
          <span className="gnani-label">
            {pipelineState.isFallbackActive ? "Gnani (Dual-Mode)" : "Gnani.ai (Live Key)"}
          </span>
        </div>

        <div className="progress-badge" title="Investigation Confidence">
          <span className="progress-label">Clues:</span>
          <strong>{discoveredClues.length}</strong>
        </div>
      </div>
    </header>
  );
}
