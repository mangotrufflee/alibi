// src/components/ui/HandbookModal.jsx
import React, { useState } from "react";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";
import { initialEvidenceItems } from "../../data/evidence";
import { caseInfo } from "../../data/caseInfo";

export default function HandbookModal() {
  const { isHandbookOpen, toggleHandbook, discoveredEvidence } = useGame();
  const [deductions, setDeductions] = useState({
    weapon: "reel_clamp",
    access: "duplicate_key",
    culprit: null
  });

  if (!isHandbookOpen) return null;

  return (
    <div className="handbook-backdrop">
      <div className="handbook-modal">
        {/* MODAL HEADER */}
        <div className="handbook-header">
          <div className="handbook-branding">
            <span className="case-ref">DELHI POLICE CRIME BRANCH // SPECIAL INVESTIGATION</span>
            <h2 className="handbook-title">CASE DEDUCTION BOARD</h2>
          </div>
          <button className="handbook-close-btn" onClick={toggleHandbook}>
            ✕ RETURN TO AUDITORIUM
          </button>
        </div>

        {/* DEDUCTION BOARD CONTENT */}
        <div className="corkboard-area">
          {/* TOP BANNER: VICTIM FILE */}
          <div className="victim-dossier-card">
            <div className="card-pin red-pin" />
            <div className="victim-badge">VICTIM FILE</div>
            <h3 className="victim-name">{caseInfo.victim}</h3>
            <p className="victim-details">
              <strong>Time:</strong> {caseInfo.timeOfDeath} • <strong>Cause:</strong> {caseInfo.causeOfDeath}
            </p>
            <p className="victim-memo">{caseInfo.overview}</p>
          </div>

          <div className="board-columns-grid">
            {/* COLUMN 1: SUSPECT DOSSIER PINS */}
            <div className="board-column">
              <h4 className="column-heading">
                <span className="pin-symbol">📌</span> PERSONS OF INTEREST
              </h4>
              <div className="pinned-suspects-list">
                {Object.values(suspects).map((s) => (
                  <div key={s.id} className="pinned-suspect-card">
                    <div className="card-pin" />
                    <div className="pinned-head">
                      <strong>{s.name}</strong>
                      <span className="role-tag">{s.role}</span>
                    </div>
                    <p className="pinned-snippet">{s.initialMotive}</p>
                    <div className="pinned-footer">
                      <small>Alibi: {s.alibi}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: COLLECTED CLUES & CONNECTING YARN */}
            <div className="board-column">
              <h4 className="column-heading">
                <span className="pin-symbol">🧵</span> FORENSIC CONNECTIONS
              </h4>
              <div className="evidence-pins-list">
                {initialEvidenceItems
                  .filter((e) => discoveredEvidence.includes(e.id))
                  .map((e) => (
                    <div key={e.id} className="pinned-clue-card">
                      <div className="card-pin yellow-pin" />
                      <div className="clue-tag-row">
                        <span className="evidence-chip">{e.category}</span>
                        <span className="location-chip">{e.location}</span>
                      </div>
                      <h5>{e.name}</h5>
                      <p className="clue-memo">{e.clue}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* COLUMN 3: HYPOTHESIS & DEDUCTION SLOTS */}
            <div className="board-column deduction-column">
              <h4 className="column-heading">
                <span className="pin-symbol">⚖️</span> CASE HYPOTHESIS
              </h4>

              <div className="deduction-box">
                <label className="deduction-label">1. Primary Murder Weapon:</label>
                <select
                  className="deduction-select"
                  value={deductions.weapon || ""}
                  onChange={(e) => setDeductions({ ...deductions, weapon: e.target.value })}
                >
                  <option value="reel_clamp">Heavy Cast-Iron Reel Clamp (Blunt Force)</option>
                  <option value="cutting_chai_glass">Poisoned Cutting Chai Glass (Datura)</option>
                  <option value="bell_cord">Strangulation by Frayed Bell Cord</option>
                </select>
                <small className="deduction-hint">Matches autopsy cranial impression.</small>
              </div>

              <div className="deduction-box">
                <label className="deduction-label">2. Booth Entry Method:</label>
                <select
                  className="deduction-select"
                  value={deductions.access || ""}
                  onChange={(e) => setDeductions({ ...deductions, access: e.target.value })}
                >
                  <option value="duplicate_key">Freshly Ground Duplicate Brass Key</option>
                  <option value="window">Ventilation Duct from Balcony</option>
                  <option value="inside">Harbans Lal willingly opened the door</option>
                </select>
                <small className="deduction-hint">Key found on carpet under Seat D-4.</small>
              </div>

              <div className="deduction-box">
                <label className="deduction-label">3. Primary Accusation:</label>
                <select
                  className="deduction-select"
                  value={deductions.culprit || ""}
                  onChange={(e) => setDeductions({ ...deductions, culprit: e.target.value })}
                >
                  <option value="">-- Formulate Formal Accusation --</option>
                  {Object.values(suspects).map((s) => (
                    <option key={s.id} value={s.id}>
                      Accuse {s.name} ({s.role})
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn-primary full-width"
                style={{ marginTop: "16px" }}
                onClick={() => {
                  if (!deductions.culprit) {
                    alert("Please select a prime suspect to formalize the case hypothesis.");
                  } else {
                    alert(
                      `Formal warrant drafted accusing ${suspects[deductions.culprit]?.name}. Keep interrogating to gather undeniable corroboration before the generator shuts down!`
                    );
                    toggleHandbook();
                  }
                }}
              >
                ⚖️ Formalize Accusation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
