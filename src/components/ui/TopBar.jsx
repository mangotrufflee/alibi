// src/components/ui/TopBar.jsx
import React from "react";
import { useGame } from "../../state/GameContext";

export default function TopBar() {
  const {
    generatorCountdown,
    remainingAttempts,
    investigationProgress,
    cameraState,
    resetCameraToTheatre,
    toggleHandbook,
    togglePause,
    assetMode,
    toggleAssetMode,
    debugMode,
    toggleDebugMode,
    toggleSidebar,
    openSidebar
  } = useGame();

  const minutes = Math.floor(generatorCountdown / 60);
  const seconds = generatorCountdown % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <header className="topbar">
      {/* BRAND & LOCATION */}
      <div className="topbar-left">
        <button
          className={`sidebar-toggle-btn ${openSidebar === "left" ? "active" : ""}`}
          onClick={() => toggleSidebar("left")}
          title="Toggle Case Dossier [Tab]"
        >
          ☰ DOSSIER
        </button>

        <div className="topbar-brand">
          <h1 className="case-title">ALIBI</h1>
          <span className="case-location">REX TALKIES // OLD DELHI</span>
        </div>
      </div>

      {/* STATUS GAUGES & COUNTERS */}
      <div className="topbar-center">
        {/* PROGRESS INDICATOR */}
        <div className="status-widget">
          <div className="widget-label">
            <span>INVESTIGATION PROGRESS</span>
            <span className="widget-value">{investigationProgress}%</span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${investigationProgress}%` }}
            />
          </div>
        </div>

        {/* GENERATOR COUNTDOWN */}
        <div className={`status-widget countdown-widget ${generatorCountdown < 120 ? "warning-pulse" : ""}`}>
          <div className="widget-label">
            <span>GENERATOR DIESEL</span>
            <span className="widget-value highlight-amber">{timeFormatted}</span>
          </div>
          <div className="countdown-gauge">
            <div
              className="gauge-meter"
              style={{ width: `${(generatorCountdown / 420) * 100}%` }}
            />
          </div>
        </div>

        {/* INTERROGATION ATTEMPTS */}
        <div className="status-widget">
          <div className="widget-label">
            <span>INTERROGATION ATTEMPTS</span>
            <span className="widget-value highlight-red">{remainingAttempts} LEFT</span>
          </div>
          <div className="attempts-pip-row">
            {[1, 2, 3, 4, 5].map((idx) => (
              <span
                key={idx}
                className={`attempt-pip ${idx <= remainingAttempts ? "active" : "spent"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CONTROLS & DEVELOPMENT TOOLBAR */}
      <div className="topbar-right">
        {/* Camera Reset button if zoomed into a suspect */}
        {cameraState !== "MAIN_THEATRE" && (
          <button className="topbar-btn accent" onClick={resetCameraToTheatre}>
            🎥 Wide View
          </button>
        )}

        {/* Handbook button */}
        <button className="topbar-btn" onClick={toggleHandbook}>
          📋 Detective Board
        </button>

        {/* Development Asset Pipeline Toggles */}
        <div className="dev-toggle-group">
          <button
            className={`dev-chip ${assetMode === "asset" ? "active" : ""}`}
            onClick={toggleAssetMode}
            title="Toggle between attempting to load imported assets or forcing procedural placeholders"
          >
            {assetMode === "asset" ? "Asset Pipeline" : "Placeholder Mode"}
          </button>

          <button
            className={`dev-chip ${debugMode ? "active" : ""}`}
            onClick={toggleDebugMode}
            title="Toggle 3D mesh wireframes and asset ID tags"
          >
            Debug Tags
          </button>
        </div>

        {/* Pause Button */}
        <button className="topbar-btn icon-btn" onClick={togglePause} title="Pause Game [ESC]">
          ⏸
        </button>

        {/* Right Sidebar (System / Settings) */}
        <button
          className={`sidebar-toggle-btn ${openSidebar === "right" ? "active" : ""}`}
          onClick={() => toggleSidebar("right")}
          title="System & Settings"
        >
          ⚙
        </button>
      </div>
    </header>
  );
}
