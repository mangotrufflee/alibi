// src/components/ui/SuspectProfileCard.jsx
// Floating Suspect Dossier Card rendered beside the focused character
// Displays character info, psychological meters (Stress/Trust), and conversation-unlocked clues

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";
import { CLUE_DATABASE } from "../../data/clueDatabase";
import { getStressBandLabel, getStressBandColor } from "../../services/stressEngine";

export default function SuspectProfileCard() {
  const selectedSuspect = useGame((s) => s.selectedSuspect);
  const selectSuspect = useGame((s) => s.selectSuspect);
  const suspectStress = useGame((s) => s.suspectStress);
  const suspectTrust = useGame((s) => s.suspectTrust);
  const suspectLiveState = useGame((s) => s.suspectLiveState);
  const discoveredClueIds = useGame((s) => s.discoveredClueIds) || [];
  const askedQuestionIds = useGame((s) => s.askedQuestionIds?.[selectedSuspect]) || [];

  if (!selectedSuspect) return null;

  const currentSuspect = suspects[selectedSuspect] || suspects.raju;
  const stress = suspectStress[selectedSuspect] || 30;
  const trust = suspectTrust[selectedSuspect] || 50;
  const live = suspectLiveState[selectedSuspect] || {};
  const liesCaught = live.contradictionsCaught || 0;

  const stressColor = getStressBandColor(stress);
  const stressLabel = getStressBandLabel(stress);

  const trustColor = trust >= 65 ? "#10b981" : trust >= 35 ? "#3772f1" : "#ba2c2c";
  const trustLabel =
    trust >= 70 ? "Cooperative" : trust >= 50 ? "Measured" : trust >= 30 ? "Guarded" : "Hostile";

  // Filter clues unlocked that are related to this suspect
  const unlockedCluesForSuspect = discoveredClueIds
    .map((id) => CLUE_DATABASE[id])
    .filter((clue) => clue && clue.relatedSuspectIds?.includes(selectedSuspect));

  // Determine whether suspect is on the left or right side of the cinema
  // If suspect is framed on left (seat[0] < 0), card appears on the RIGHT beside them.
  // If suspect is framed on right (seat[0] >= 0), card appears on the LEFT beside them.
  const isLeftSuspect = (currentSuspect.seat?.position?.[0] || 0) < 0;

  return (
    <AnimatePresence>
      <motion.div
        key={selectedSuspect}
        initial={{ opacity: 0, x: isLeftSuspect ? 32 : -32, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: isLeftSuspect ? 24 : -24, scale: 0.95 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="suspect-profile-floating-card"
        style={{
          position: "fixed",
          top: "76px",
          left: isLeftSuspect ? "auto" : "92px",
          right: isLeftSuspect ? "36px" : "auto",
          width: "350px",
          maxHeight: "calc(100vh - 100px)",
          background: "rgba(9, 13, 20, 0.94)",
          backdropFilter: "blur(20px)",
          border: `1px solid rgba(31, 97, 239, 0.45)`,
          borderRadius: "14px",
          boxShadow: "0 18px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(31, 97, 239, 0.18)",
          color: "#f8fafc",
          zIndex: 42,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          pointerEvents: "auto"
        }}
      >
        {/* CARD HEADER */}
        <div style={{
          padding: "0.85rem 1rem 0.65rem 1rem",
          background: "rgba(14, 20, 32, 0.9)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "#05060a",
              border: `2px solid ${currentSuspect.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
            }}>
              👤
            </div>
            <div>
              <h3 style={{
                margin: 0,
                fontSize: "0.95rem",
                fontWeight: 700,
                fontFamily: "var(--font-title, sans-serif)",
                color: "#ffffff"
              }}>
                {currentSuspect.name}
              </h3>
              <span style={{ fontSize: "0.72rem", color: currentSuspect.color, fontWeight: 600 }}>
                {currentSuspect.role} • {currentSuspect.age} yrs
              </span>
            </div>
          </div>

          {/* CLOSE / UNFOCUS BUTTON */}
          <button
            type="button"
            onClick={() => selectSuspect(null)}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#94a3b8",
              borderRadius: "6px",
              width: "26px",
              height: "26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "0.8rem",
              transition: "all 0.15s"
            }}
            title="Unfocus suspect and return to hall overview"
          >
            ✕
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div style={{
          padding: "0.85rem 1rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem"
        }}>
          {/* STATUS PILL */}
          <div style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            alignItems: "center",
            gap: "0.35rem",
            background: "rgba(31, 97, 239, 0.15)",
            border: "1px solid rgba(55, 114, 241, 0.4)",
            borderRadius: "4px",
            padding: "0.15rem 0.5rem",
            fontSize: "0.68rem",
            color: "#93c5fd",
            fontWeight: 600
          }}>
            <span>●</span>
            <span>{currentSuspect.status || "Material Witness"}</span>
          </div>

          {/* MOTIVE & ALIBI SYNOPSIS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.75rem", lineHeight: 1.4 }}>
            <div>
              <span style={{ color: "#64748b", fontWeight: 600 }}>ALIBI: </span>
              <span style={{ color: "#cbd5e1" }}>{currentSuspect.alibi}</span>
            </div>
            {currentSuspect.initialMotive && (
              <div>
                <span style={{ color: "#64748b", fontWeight: 600 }}>MOTIVE: </span>
                <span style={{ color: "#cbd5e1" }}>{currentSuspect.initialMotive}</span>
              </div>
            )}
          </div>

          {/* METERS: STRESS & TRUST BARS */}
          <div style={{
            background: "rgba(18, 24, 38, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "8px",
            padding: "0.65rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem"
          }}>
            {/* STRESS METER */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "0.25rem" }}>
                <span style={{ color: "#94a3b8" }}>Demeanor / Stress:</span>
                <strong style={{ color: stressColor }}>{stress}% [{stressLabel}]</strong>
              </div>
              <div style={{
                height: "6px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "3px",
                overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
                  width: `${stress}%`,
                  background: stressColor,
                  transition: "width 0.3s ease, background 0.3s ease"
                }} />
              </div>
            </div>

            {/* TRUST METER */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "0.25rem" }}>
                <span style={{ color: "#94a3b8" }}>Detective Trust:</span>
                <strong style={{ color: trustColor }}>{trust}% [{trustLabel}]</strong>
              </div>
              <div style={{
                height: "6px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "3px",
                overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
                  width: `${trust}%`,
                  background: trustColor,
                  transition: "width 0.3s ease"
                }} />
              </div>
            </div>

            {/* CONTRADICTIONS / QUESTIONS COUNTER */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "0.35rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              fontSize: "0.68rem",
              color: "#94a3b8"
            }}>
              <span>Questions Asked: <strong>{askedQuestionIds.length}</strong></span>
              <span>Lies Exposed: <strong style={{ color: liesCaught > 0 ? "#ba2c2c" : "#94a3b8" }}>{liesCaught}</strong></span>
            </div>
          </div>

          {/* CLUES UNLOCKED FROM CONVERSATION */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#3772f1",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "0.4rem"
            }}>
              <span>🔍</span>
              <span>UNLOCKED CONVERSATION CLUES ({unlockedCluesForSuspect.length}):</span>
            </div>

            {unlockedCluesForSuspect.length === 0 ? (
              <div style={{
                background: "rgba(18, 22, 34, 0.5)",
                border: "1px dashed rgba(255, 255, 255, 0.12)",
                borderRadius: "6px",
                padding: "0.6rem",
                textAlign: "center",
                color: "#64748b",
                fontSize: "0.7rem",
                lineHeight: 1.4
              }}>
                No critical clues unlocked yet. Interrogate {currentSuspect.name} or present evidence to uncover breakthroughs.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {unlockedCluesForSuspect.map((clue) => (
                  <div
                    key={clue.id}
                    style={{
                      background: "rgba(31, 97, 239, 0.08)",
                      border: "1px solid rgba(55, 114, 241, 0.3)",
                      borderRadius: "6px",
                      padding: "0.45rem 0.6rem"
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "#93c5fd",
                      marginBottom: "0.15rem"
                    }}>
                      <span>💡</span>
                      <span>{clue.title}</span>
                    </div>
                    <p style={{
                      margin: 0,
                      fontSize: "0.68rem",
                      color: "#cbd5e1",
                      lineHeight: 1.35
                    }}>
                      {clue.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

