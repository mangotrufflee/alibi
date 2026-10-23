// src/components/ui/HeaderNav.jsx
import React from "react";
import { useGame } from "../../state/GameContext";

export default function HeaderNav() {
  const {
    activeTab,
    setActiveTab,
    discoveredClues,
    generatorCountdown,
    score,
    setCaseSubTab
  } = useGame();

  const minutes = Math.floor(generatorCountdown / 60);
  const seconds = generatorCountdown % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isTimeCritical = generatorCountdown < 300;

  const handleOpenCaseFiles = (subTab = "evidence_list") => {
    setCaseSubTab(subTab);
    setActiveTab("case_files");
  };

  const isCaseFilesActive =
    activeTab === "case_files" || activeTab === "evidence" || activeTab === "dossier";

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
          type="button"
          className={`nav-tab-btn ${activeTab === "interrogation" ? "active" : ""}`}
          onClick={() => setActiveTab("interrogation")}
        >
          <span className="tab-icon">🎙️</span>
          <span>Interrogation Room</span>
        </button>

        <button
          type="button"
          className={`nav-tab-btn ${isCaseFilesActive ? "active" : ""}`}
          onClick={() => handleOpenCaseFiles("evidence_list")}
        >
          <span className="tab-icon">📁</span>
          <span>Case Files (8 Tabs)</span>
        </button>
      </nav>

      {/* RIGHT STATUS INDICATORS */}
      <div className="header-status-area">
        {/* SCORE BADGE */}
        <div className="progress-badge score-badge" title="Current Case Score">
          <span className="progress-label">Score:</span>
          <strong>{score} pts</strong>
        </div>

        {/* GENERATOR COUNTDOWN BADGE */}
        <div
          className={`progress-badge timer-badge ${isTimeCritical ? "timer-alert" : ""}`}
          title="Diesel Generator Countdown"
        >
          <span className="progress-label">Generator:</span>
          <strong className="timer-digits">⏱️ {timeFormatted}</strong>
        </div>

        {/* CLUES DISCOVERED BADGE */}
        <div className="progress-badge" title="Investigation Clues Discovered">
          <span className="progress-label">Clues:</span>
          <strong>{discoveredClues.length}</strong>
        </div>
      </div>
    </header>
  );
}
