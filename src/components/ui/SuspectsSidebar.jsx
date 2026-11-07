// src/components/ui/SuspectsSidebar.jsx
import React from "react";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";

export default function SuspectsSidebar() {
  const selectedSuspect = useGame((s) => s.selectedSuspect);
  const selectSuspect = useGame((s) => s.selectSuspect);
  const suspectStress = useGame((s) => s.suspectStress);
  const isSpeaking = useGame((s) => s.isSpeaking);
  const cameraState = useGame((s) => s.cameraState);
  const setCameraState = useGame((s) => s.setCameraState);

  return (
    <aside className="alibi-sidebar alibi-left-sidebar" aria-label="Suspects in Auditorium">
      <div className="sidebar-rail-header">
        <span className="sidebar-rail-title">SUSPECTS</span>
        <span className="sidebar-rail-subtitle">5 SEATED</span>
      </div>

      <div className="suspect-icons-group">
        {Object.values(suspects).map((s) => {
          const isSelected = s.id === selectedSuspect;
          const stress = suspectStress[s.id] || 25;
          const isCurrentlySpeaking = isSelected && isSpeaking;

          return (
            <div key={s.id} className="suspect-rail-item">
              <button
                type="button"
                className={`suspect-rail-btn ${isSelected ? "selected" : ""} ${
                  isCurrentlySpeaking ? "speaking" : ""
                }`}
                onClick={() => selectSuspect(s.id)}
                style={{ "--suspect-accent": s.color }}
                title={`${s.name} (${s.role}) - Click to focus camera & interrogate`}
              >
                {/* BLACK SILHOUETTE AVATAR ICON */}
                <div className="silhouette-icon-wrapper">
                  <span className="silhouette-head-bust">👤</span>
                  <span className="suspect-initials-badge">
                    {s.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>

                {/* STRESS LEVEL PULSE DOT */}
                <span
                  className={`suspect-stress-dot ${
                    stress > 70 ? "high" : stress > 40 ? "mid" : "low"
                  }`}
                  title={`Stress: ${stress}%`}
                />

                {/* AUDIO WAVE IF CURRENTLY SPEAKING */}
                {isCurrentlySpeaking && (
                  <span className="speaking-indicator-bars">
                    <span className="sbar b1" />
                    <span className="sbar b2" />
                    <span className="sbar b3" />
                  </span>
                )}
              </button>

              {/* EXPANDING HOVER DOSSIER FLYOUT */}
              <div className="suspect-hover-tooltip">
                <div className="tooltip-top-row">
                  <strong className="tooltip-name">{s.name}</strong>
                  <span className="tooltip-tag" style={{ color: s.color }}>
                    {s.role}
                  </span>
                </div>
                <div className="tooltip-details">
                  <span className="tooltip-seat">
                    Seat: Row {s.seat?.row}, Col {s.seat?.col}
                  </span>
                  <span className="tooltip-stress">
                    Demeanor: {stress}% {stress > 65 ? "Panicked" : stress > 45 ? "Nervous" : "Guarded"}
                  </span>
                </div>
                <div className="tooltip-action-hint">
                  {isSelected ? "▶ Camera Focused • Interrogating" : "▶ Click to Focus Camera & Interrogate"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OVERVIEW / RESET CAMERA BUTTON */}
      <div className="sidebar-rail-footer">
        <button
          type="button"
          className={`overview-cam-btn ${cameraState === "MAIN_THEATRE" ? "active" : ""}`}
          onClick={() => setCameraState("MAIN_THEATRE")}
          title="Zoom out to Full Theatre Overview"
        >
          <span className="overview-icon">🏛️</span>
          <span className="overview-label">HALL VIEW</span>
        </button>
      </div>
    </aside>
  );
}

