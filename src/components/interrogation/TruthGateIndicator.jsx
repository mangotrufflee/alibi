// src/components/interrogation/TruthGateIndicator.jsx
// ALIBI — Phase 4: Truth Gate Status, Trust Meter & Contradiction Counter (GDD §8)

import React from "react";
import { useGameStore } from "../../state/useGameStore.js";
import { TRUTH_GATES } from "../../data/truthGatesData.js";

export default function TruthGateIndicator() {
  const selectedSuspect = useGameStore((s) => s.selectedSuspect);
  const suspectTrust = useGameStore((s) => s.suspectTrust[selectedSuspect] ?? 50);
  const suspectStress = useGameStore((s) => s.suspectStress[selectedSuspect] ?? 30);
  const suspectLiveState = useGameStore((s) => s.suspectLiveState[selectedSuspect] || {});
  const unlockedGateIds = useGameStore((s) => s.unlockedGateIds);
  const truthGatePopup = useGameStore((s) => s.truthGatePopup);

  const gatesForSuspect = TRUTH_GATES.filter((g) => g.suspectId === selectedSuspect);
  const contradictionsCaught = suspectLiveState.contradictionsCaught || 0;

  // Trust qualitative mood read
  const trustColor = suspectTrust >= 65 ? "#10b981" : suspectTrust >= 35 ? "#f59e0b" : "#ef4444";
  const trustMood =
    suspectTrust >= 70 ? "COOPERATIVE / CONFIDING"
    : suspectTrust >= 50 ? "MEASURED / OBSERVANT"
    : suspectTrust >= 30 ? "SUSPICIOUS / EVASIVE"
    : "HOSTILE / DEFENSIVE";

  return (
    <div className="truth-gate-indicator-card">
      {/* HEADER: TRUST METER & CONTRADICTIONS BADGE */}
      <div className="truth-gate-header">
        <div className="trust-meter-block">
          <div className="trust-meter-labels">
            <span className="meter-title">🤝 DETECTIVE TRUST:</span>
            <strong style={{ color: trustColor }}>
              {trustMood} ({suspectTrust}%)
            </strong>
          </div>
          <div className="trust-bar-track">
            <div
              className="trust-bar-fill"
              style={{
                width: `${suspectTrust}%`,
                backgroundColor: trustColor
              }}
            />
          </div>
        </div>

        <div className="contradictions-badge-box">
          <span className="contradictions-count-chip" title="Direct contradictions and alibi lies broken">
            ⚔️ {contradictionsCaught} {contradictionsCaught === 1 ? "Lie Caught" : "Lies Caught"}
          </span>
        </div>
      </div>

      {/* TRUTH GATES STATUS BAR */}
      <div className="gates-status-list">
        <div className="gates-list-label">
          <span>🧠 PSYCHOLOGICAL TRUTH GATES (GDD §8):</span>
        </div>

        <div className="gates-chips-row">
          {gatesForSuspect.map((gate) => {
            const isUnlocked = unlockedGateIds.includes(gate.id);

            return (
              <div
                key={gate.id}
                className={`truth-gate-chip ${isUnlocked ? "gate-unlocked" : "gate-locked"}`}
                title={isUnlocked ? `CONFESSED: ${gate.secretFact}` : `LOCKED SECRET: Requires evidence or higher pressure`}
              >
                <span className="gate-icon">{isUnlocked ? "🔓" : "🔒"}</span>
                <span className="gate-title">{gate.title}</span>
                <span className="gate-badge">
                  {isUnlocked ? `CRACKED (+${gate.points})` : `LOCKED (> ${gate.conditions.minStress}% Stress)`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* DRAMATIC TRUTH GATE BREAKTHROUGH MODAL/TOAST */}
      {truthGatePopup && (
        <div className="truth-breakthrough-overlay">
          <div className="truth-breakthrough-modal">
            <div className="breakthrough-badge">
              ⚡ TRUTH GATE CRACKED // +{truthGatePopup.points} PTS
            </div>
            <h3 className="breakthrough-title">{truthGatePopup.title}</h3>
            <p className="breakthrough-fact">
              <strong>{truthGatePopup.suspectName}</strong> broke under interrogation:
              <br />
              <em>"{truthGatePopup.secretFact}"</em>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
