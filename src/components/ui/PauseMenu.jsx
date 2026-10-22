// src/components/ui/PauseMenu.jsx
import React from "react";
import { useGame } from "../../state/GameContext";

export default function PauseMenu() {
  const { isPaused, togglePause, toggleHandbook, toggleDebugMode, debugMode } = useGame();

  if (!isPaused) return null;

  return (
    <div className="pause-overlay">
      <div className="pause-card">
        <span className="pause-badge">INVESTIGATION SUSPENDED</span>
        <h2 className="pause-title">ALIBI // CASE PAUSED</h2>
        <p className="pause-desc">
          Rex Talkies is sealed under Section 144. Monsoon rainfall outside continues unabated.
          The backup generator diesel supply is finite.
        </p>

        <div className="pause-actions">
          <button className="btn-primary full-width" onClick={togglePause}>
            ▶ Resume Interrogation
          </button>

          <button
            className="btn-secondary full-width"
            onClick={() => {
              togglePause();
              toggleHandbook();
            }}
          >
            📋 Open Case Deduction Board
          </button>

          <button
            className="btn-secondary full-width"
            onClick={toggleDebugMode}
          >
            🛠 {debugMode ? "Disable Debug Tags" : "Enable Dev Debug Tags"}
          </button>
        </div>

        <div className="pause-footer">
          <small>Press [ESC] to quickly toggle pause at any point.</small>
        </div>
      </div>
    </div>
  );
}
