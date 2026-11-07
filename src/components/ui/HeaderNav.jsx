// src/components/ui/HeaderNav.jsx
import React from "react";
import { useGame } from "../../state/GameContext";

function HeaderTimer() {
  const generatorCountdown = useGame((s) => s.generatorCountdown);
  const minutes = Math.floor(generatorCountdown / 60);
  const seconds = generatorCountdown % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isTimeCritical = generatorCountdown < 300;

  return (
    <div
      className={`progress-badge timer-badge ${isTimeCritical ? "timer-alert" : ""}`}
      title="Auxiliary Diesel Generator Countdown"
    >
      <span className="progress-label">Generator:</span>
      <strong className="timer-digits">⏱️ {timeFormatted}</strong>
    </div>
  );
}

export default function HeaderNav() {
  const activeTab = useGame((s) => s.activeTab);
  const setActiveTab = useGame((s) => s.setActiveTab);
  const setCaseSubTab = useGame((s) => s.setCaseSubTab);
  const activeStoryline = useGame((s) => s.activeStoryline);
  const selectStoryline = useGame((s) => s.selectStoryline);
  const resetRun = useGame((s) => s.resetRun);
  const score = useGame((s) => s.score);
  const cluesCount = useGame((s) => s.discoveredClues.length);
  const openPuzzle = useGame((s) => s.openPuzzle);
  const openCutscene = useGame((s) => s.openCutscene);
  const unlockedCutsceneIds = useGame((s) => s.unlockedCutsceneIds);
  const solvedPuzzleIds = useGame((s) => s.solvedPuzzleIds);

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
            <span className="brand-tagline">Rex Talkies • 17 Oct 2026 Noir</span>
          </div>
        </div>

        {/* CANONICAL STORYLINE SELECTOR */}
        <div className="storyline-selector-cluster">
          <span className="storyline-label">ROUTE:</span>
          <select
            className="storyline-dropdown"
            value={activeStoryline}
            onChange={(e) => selectStoryline(e.target.value)}
            title="Switch between the 3 distinct canonical storylines"
          >
            <option value="A">Storyline A: The Sale Must Survive (Meera Kapoor)</option>
            <option value="B">Storyline B: The Film That Would Not Die (Dr. Arvind Sethi)</option>
            <option value="C">Storyline C: The Missing Minute (Nusrat Ali)</option>
          </select>
          <button
            type="button"
            className="reset-run-btn"
            onClick={() => resetRun()}
            title="Reset current run to initial state"
          >
            🔄 Reset
          </button>
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
          <span>Interrogation</span>
        </button>

        <button
          type="button"
          className={`nav-tab-btn ${isCaseFilesActive ? "active" : ""}`}
          onClick={() => handleOpenCaseFiles("evidence_list")}
        >
          <span className="tab-icon">📁</span>
          <span>Case Files (8 Tabs)</span>
        </button>

        {/* QUICK PUZZLE LAUNCHER */}
        <button
          type="button"
          className="nav-tab-btn nav-tab-action"
          onClick={() => openPuzzle("puzzle_ticket_clock")}
          title="Open Forensic Analysis Puzzles"
        >
          <span className="tab-icon">🧩</span>
          <span>Puzzles ({solvedPuzzleIds.length}/5)</span>
        </button>

        {/* QUICK CUTSCENE ARCHIVE */}
        <button
          type="button"
          className="nav-tab-btn nav-tab-action"
          onClick={() => openCutscene(unlockedCutsceneIds[unlockedCutsceneIds.length - 1] || "cutscene_opening")}
          title="Replay Unlocked Cutscenes"
        >
          <span className="tab-icon">🎬</span>
          <span>Scenes ({unlockedCutsceneIds.length}/8)</span>
        </button>
      </nav>

      {/* RIGHT STATUS INDICATORS */}
      <div className="header-status-area">
        {/* SCORE BADGE */}
        <div className="progress-badge score-badge" title="Investigation Thoroughness Score">
          <span className="progress-label">Score:</span>
          <strong>{score} pts</strong>
        </div>

        {/* GENERATOR COUNTDOWN BADGE */}
        <HeaderTimer />

        {/* CLUES DISCOVERED BADGE */}
        <div className="progress-badge" title="Forensic Clues & Revelations Discovered">
          <span className="progress-label">Clues:</span>
          <strong>{cluesCount}</strong>
        </div>
      </div>
    </header>
  );
}
