// src/components/ui/SuspectsSidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import { Building2, UserRound } from "lucide-react";
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
    <motion.aside
      initial={{ opacity: 0, x: -35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="alibi-sidebar alibi-left-sidebar macos-dock-sidebar"
      aria-label="Suspects in Auditorium"
    >
      <div className="suspect-icons-group">
        {Object.values(suspects).map((s) => {
          const isSelected = s.id === selectedSuspect;
          const stress = suspectStress[s.id] || 25;
          const isCurrentlySpeaking = isSelected && isSpeaking;

          return (
            <div
              key={s.id}
              className="suspect-rail-item macos-dock-item-wrapper"
            >
              {/* macOS Active App Indicator Dot */}
              {isSelected && (
                <motion.span
                  layoutId="active-suspect-indicator"
                  className="macos-dock-indicator-dot"
                  title="Currently Interrogating"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}

              <motion.button
                type="button"
                whileHover={{ scale: 1.18, x: 6 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`suspect-rail-btn ${isSelected ? "selected" : ""} ${
                  isCurrentlySpeaking ? "speaking" : ""
                }`}
                onClick={() => (isSelected ? selectSuspect(null) : selectSuspect(s.id))}
                style={{ "--suspect-accent": s.color }}
                aria-label={`${s.name} (${s.role})`}
              >
                {/* BLACK SILHOUETTE AVATAR ICON */}
                <div className="silhouette-icon-wrapper">
                  <UserRound className="silhouette-head-bust" size={20} aria-hidden="true" />
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
              </motion.button>

              <span className="sidebar-button-heading suspect-button-heading">{s.name}</span>
            </div>
          );
        })}
      </div>

      <div className="macos-dock-separator" />

      {/* OVERVIEW / RESET CAMERA BUTTON */}
      <div className="sidebar-rail-footer">
        <motion.button
          type="button"
          whileHover={{ scale: 1.15, x: 5 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`overview-cam-btn ${cameraState === "MAIN_THEATRE" ? "active" : ""}`}
          onClick={() => {
            setCameraState("MAIN_THEATRE");
            selectSuspect(null);
          }}
          title="Zoom out to Full Theatre Overview"
        >
          <Building2 size={18} className="overview-icon" />
          <span className="overview-label">HALL VIEW</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
