// src/components/ui/PauseMenu.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Building2,
  Compass,
  Film
} from "lucide-react";
import { useGame } from "../../state/GameContext";

export default function PauseMenu() {
  const isMenuOpen = useGame((s) => s.isMenuOpen);
  const setIsMenuOpen = useGame((s) => s.setIsMenuOpen);
  const isPaused = useGame((s) => s.isPaused);
  const togglePause = useGame((s) => s.togglePause);
  const setPaused = useGame((s) => s.setPaused);
  const isMuted = useGame((s) => s.isMuted);
  const toggleMute = useGame((s) => s.toggleMute);
  const resetRun = useGame((s) => s.resetRun);
  const activeStoryline = useGame((s) => s.activeStoryline);
  const selectStoryline = useGame((s) => s.selectStoryline);
  const setCameraState = useGame((s) => s.setCameraState);
  const generatorCountdown = useGame((s) => s.generatorCountdown);
  const score = useGame((s) => s.score);

  // Allow ESC key to toggle menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(!isMenuOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, setIsMenuOpen]);

  if (!isMenuOpen) return null;

  const minutes = Math.floor(generatorCountdown / 60);
  const seconds = generatorCountdown % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const handleResume = () => {
    setPaused(false);
    setIsMenuOpen(false);
  };

  const handlePauseToggle = () => {
    togglePause();
  };

  const handleQuitToOverview = () => {
    setCameraState("MAIN_THEATRE");
    setIsMenuOpen(false);
  };

  const handleResetRun = () => {
    if (window.confirm("Are you sure you want to reset the investigation back to the start?")) {
      resetRun();
      setIsMenuOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="cutscene-modal-backdrop" onClick={() => setIsMenuOpen(false)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="cutscene-dialog-card macos-dock-modal"
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "520px" }}
        >
          {/* HEADER */}
          <div className="cutscene-dialog-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span className="cutscene-badge-pill" style={{ color: "#3772f1" }}>
                CASE OPERATIONS // REX TALKIES
              </span>
              <h2 className="cutscene-dialog-title" style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem" }}>
                GAME MENU
              </h2>
            </div>
            <button
              type="button"
              className="overview-cam-btn"
              onClick={() => setIsMenuOpen(false)}
              style={{ width: "36px", height: "36px", borderRadius: "10px" }}
              title="Close Menu (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* STATUS PILLS */}
          <div style={{ display: "flex", gap: "8px", margin: "1rem 0 1.25rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "4px 10px",
                borderRadius: "9999px",
                background: isPaused ? "rgba(239, 68, 68, 0.2)" : "rgba(31, 97, 239, 0.2)",
                border: `1px solid ${isPaused ? "#ef4444" : "#1f61ef"}`,
                color: isPaused ? "#f87171" : "#38bdf8",
                fontWeight: 700
              }}
            >
              {isPaused ? "⏸ INVESTIGATION PAUSED" : "▶ LIVE RUNNING"}
            </span>

            <span
              style={{
                fontSize: "0.75rem",
                padding: "4px 10px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#cbd5e1"
              }}
            >
              ⏱ Generator: {timeFormatted}
            </span>

            <span
              style={{
                fontSize: "0.75rem",
                padding: "4px 10px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#cbd5e1"
              }}
            >
              🏆 Score: {score} pts
            </span>
          </div>

          {/* GAME OPTIONS BUTTONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* RESUME BUTTON */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleResume}
              className="cutscene-dismiss-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "1rem",
                padding: "0.85rem 1.4rem"
              }}
            >
              <Play size={18} />
              <span>Resume Investigation</span>
            </motion.button>

            {/* PAUSE / UNPAUSE BUTTON */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePauseToggle}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "0.75rem 1.4rem",
                borderRadius: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                background: isPaused ? "rgba(31, 97, 239, 0.2)" : "rgba(255, 255, 255, 0.06)",
                color: "#f3f5f7",
                fontSize: "0.92rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {isPaused ? <Play size={17} /> : <Pause size={17} />}
              <span>{isPaused ? "Unpause Countdown" : "Pause Investigation & Countdown"}</span>
            </motion.button>

            {/* MUTE / AUDIO TOGGLE */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleMute}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "0.75rem 1.4rem",
                borderRadius: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                background: "rgba(255, 255, 255, 0.06)",
                color: "#f3f5f7",
                fontSize: "0.92rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              <span>{isMuted ? "Unmute Background Music & Audio" : "Mute Background Music & Audio"}</span>
            </motion.button>

            {/* STORYLINE ROUTE SELECTOR */}
            <div
              style={{
                marginTop: "0.4rem",
                padding: "0.85rem 1rem",
                borderRadius: "1rem",
                background: "rgba(11, 13, 20, 0.8)",
                border: "1px solid rgba(31, 97, 239, 0.3)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <Film size={15} color="#3772f1" />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3772f1", letterSpacing: "0.5px" }}>
                  SWITCH INVESTIGATION ROUTE:
                </span>
              </div>
              <select
                value={activeStoryline}
                onChange={(e) => selectStoryline(e.target.value)}
                style={{
                  width: "100%",
                  background: "#0b0d14",
                  color: "#f3f5f7",
                  border: "1px solid #23252f",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  outline: "none"
                }}
              >
                <option value="A">Route A: The Sale Must Survive (Meera Kapoor)</option>
                <option value="B">Route B: The Film That Would Not Die (Dr. Arvind Sethi)</option>
                <option value="C">Route C: The Missing Minute (Nusrat Ali)</option>
              </select>
            </div>

            {/* RESTART RUN BUTTON */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "0.4rem" }}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleResetRun}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "0.7rem 1rem",
                  borderRadius: "1rem",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  background: "rgba(239, 68, 68, 0.12)",
                  color: "#f87171",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                <RotateCcw size={16} />
                <span>Restart Case</span>
              </motion.button>

              {/* QUIT TO HALL OVERVIEW */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleQuitToOverview}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "0.7rem 1rem",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "#cbd5e1",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                <Building2 size={16} />
                <span>Quit to Hall</span>
              </motion.button>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ marginTop: "1.2rem", paddingTop: "0.8rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#929caa" }}>
            <span>Shortcut: Press [ESC] to toggle menu</span>
            <span>ALIBI Noir Engine v2.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
