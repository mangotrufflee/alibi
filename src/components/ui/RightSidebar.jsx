// src/components/ui/RightSidebar.jsx
import React from "react";
import { useGame } from "../../state/GameContext";

export default function RightSidebar() {
  const {
    openSidebar,
    toggleSidebar,
    activeRightTab,
    setActiveRightTab,
    settings,
    updateSetting,
    togglePause
  } = useGame();

  if (openSidebar !== "right") return null;

  return (
    <aside className="sidebar right-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title-wrap">
          <span className="sidebar-badge">SYSTEM CONFIG</span>
          <h2 className="sidebar-heading">GAME SETTINGS</h2>
        </div>
        <button
          className="sidebar-close-btn"
          onClick={() => toggleSidebar("right")}
          title="Close Settings"
        >
          ✕
        </button>
      </div>

      {/* TABS */}
      <div className="sidebar-tabs">
        <button
          className={`tab-btn ${activeRightTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveRightTab("settings")}
        >
          🔊 Audio & Display
        </button>
        <button
          className={`tab-btn ${activeRightTab === "controls" ? "active" : ""}`}
          onClick={() => setActiveRightTab("controls")}
        >
          🎮 Controls
        </button>
        <button
          className={`tab-btn ${activeRightTab === "save" ? "active" : ""}`}
          onClick={() => setActiveRightTab("save")}
        >
          💾 Save / Load
        </button>
      </div>

      <div className="sidebar-content-area">
        {activeRightTab === "settings" && (
          <div className="tab-pane">
            <h3 className="section-heading">Audio Mixer</h3>
            <div className="setting-row">
              <label>Master Volume: {settings.masterVolume}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.masterVolume}
                onChange={(e) => updateSetting("masterVolume", Number(e.target.value))}
              />
            </div>

            <div className="setting-row">
              <label>Dialogue & Voice Volume: {settings.voiceVolume}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.voiceVolume}
                onChange={(e) => updateSetting("voiceVolume", Number(e.target.value))}
              />
            </div>

            <div className="setting-row">
              <label>Monsoon Rain Ambience: {settings.ambientRain}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.ambientRain}
                onChange={(e) => updateSetting("ambientRain", Number(e.target.value))}
              />
            </div>

            <h3 className="section-heading" style={{ marginTop: "24px" }}>
              Accessibility & Display
            </h3>
            <div className="setting-toggle-row">
              <label htmlFor="subtitles-toggle">Subtitles & Interrogation Closed Captions</label>
              <input
                id="subtitles-toggle"
                type="checkbox"
                checked={settings.subtitles}
                onChange={(e) => updateSetting("subtitles", e.target.checked)}
              />
            </div>

            <div className="setting-toggle-row">
              <label htmlFor="motion-toggle">Reduced Motion (Disable Camera Swings)</label>
              <input
                id="motion-toggle"
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => updateSetting("reducedMotion", e.target.checked)}
              />
            </div>

            <div className="setting-action-block">
              <button className="btn-secondary full-width" onClick={togglePause}>
                Pause Game Session
              </button>
            </div>
          </div>
        )}

        {activeRightTab === "controls" && (
          <div className="tab-pane">
            <h3 className="section-heading">Keybinds & Controls</h3>
            <div className="controls-list">
              <div className="control-item">
                <span className="key-badge">Click Suspect</span>
                <span className="control-desc">Focus & Interrogate Suspect</span>
              </div>
              <div className="control-item">
                <span className="key-badge">Click 3D Evidence</span>
                <span className="control-desc">Open 3D Inspection Overlay</span>
              </div>
              <div className="control-item">
                <span className="key-badge">Space / Mic</span>
                <span className="control-desc">Push-To-Talk Voice Interrogation</span>
              </div>
              <div className="control-item">
                <span className="key-badge">Tab</span>
                <span className="control-desc">Toggle Left Case Dossier</span>
              </div>
              <div className="control-item">
                <span className="key-badge">Esc</span>
                <span className="control-desc">Pause Menu / Close Overlays</span>
              </div>
            </div>
          </div>
        )}

        {activeRightTab === "save" && (
          <div className="tab-pane">
            <h3 className="section-heading">Investigation Save Slots</h3>
            <div className="save-slot-card">
              <div className="save-slot-title">SLOT 1: AUTOSAVE</div>
              <p className="save-slot-desc">
                Rex Talkies Auditorium • Generator: 06:42 • 1 Suspect Interrogated
              </p>
              <div className="save-btn-row">
                <button
                  className="btn-primary"
                  onClick={() => alert("Investigation State Saved to Local Storage.")}
                >
                  Save State
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => alert("Loaded autosave state.")}
                >
                  Load
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
