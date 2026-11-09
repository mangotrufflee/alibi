// src/components/ui/SuspectsSidebar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2 } from "lucide-react";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";

export default function SuspectsSidebar() {
  const selectedSuspect = useGame((s) => s.selectedSuspect);
  const selectSuspect = useGame((s) => s.selectSuspect);
  const suspectStress = useGame((s) => s.suspectStress);
  const isSpeaking = useGame((s) => s.isSpeaking);
  const cameraState = useGame((s) => s.cameraState);
  const setCameraState = useGame((s) => s.setCameraState);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="alibi-sidebar alibi-left-sidebar macos-dock-sidebar"
      aria-label="Suspects in Auditorium"
    >
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
            <div
              key={s.id}
              className="suspect-rail-item macos-dock-item-wrapper"
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
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
              </motion.button>

              {/* EXPANDING HOVER DOSSIER FLYOUT */}
              <AnimatePresence>
                {hoveredId === s.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -8, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="suspect-hover-tooltip macos-dock-tooltip"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
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
