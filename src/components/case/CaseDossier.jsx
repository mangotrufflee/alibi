// src/components/case/CaseDossier.jsx
import React, { useState } from "react";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";

export default function CaseDossier() {
  const { caseInfo, discoveredClues, investigationProgress } = useGame();
  const [accusedSuspect, setAccusedSuspect] = useState("meera");
  const [selectedWeapon, setSelectedWeapon] = useState("reel_clamp");
  const [verdictResult, setVerdictResult] = useState(null);

  const handleMakeAccusation = (e) => {
    e.preventDefault();
    if (accusedSuspect === "meera") {
      setVerdictResult({
        success: true,
        title: "CASE SOLVED: MEERA KAPOOR GUILTY",
        summary:
          "Brilliant deduction, Inspector! Meera Kapoor orchestrated the murder. Harbans Lal held the legal tenancy that blocked her 18-Crore mall development sale deed. She had Raju duplicate the booth key, laced Harbans' chai with sedative powder, and during the deliberate interval fuse short-circuit, struck him down using the heavy cast-iron reel clamp."
      });
    } else {
      setVerdictResult({
        success: false,
        title: "ACCUSATION FAILED",
        summary: `${suspects[accusedSuspect]?.name} had reasons for anxiety, but forensic evidence and alibi corroboration prove they could not have committed the homicide. Cross-examine the suspects further using the Gnani Voice Pipeline!`
      });
    }
  };

  return (
    <div className="case-dossier-container">
      {/* CASE OVERVIEW & CRIME SCENE BRIEFING */}
      <div className="dossier-grid">
        <div className="dossier-card">
          <div className="dossier-tag">CRIME SCENE REPORT</div>
          <h2 className="dossier-title">{caseInfo.title}</h2>
          <div className="dossier-subtitle">{caseInfo.subtitle}</div>

          <div className="crime-metadata-table">
            <div className="meta-row">
              <span className="meta-k">Victim:</span>
              <span className="meta-v">{caseInfo.victim}</span>
            </div>
            <div className="meta-row">
              <span className="meta-k">Estimated Time:</span>
              <span className="meta-v">{caseInfo.timeOfDeath}</span>
            </div>
            <div className="meta-row">
              <span className="meta-k">Cause of Death:</span>
              <span className="meta-v">{caseInfo.causeOfDeath}</span>
            </div>
            <div className="meta-row">
              <span className="meta-k">Environment:</span>
              <span className="meta-v">{caseInfo.weather}</span>
            </div>
          </div>

          <p className="case-synopsis">{caseInfo.overview}</p>

          <div className="progress-card">
            <div className="progress-title-row">
              <span>Investigation Confidence:</span>
              <strong>{investigationProgress}%</strong>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-val" style={{ width: `${investigationProgress}%` }} />
            </div>
          </div>

          <div className="unlocked-clues-section">
            <h4>Discovered Clues ({discoveredClues.length}):</h4>
            <ul className="clues-bullet-list">
              {discoveredClues.map((clue, idx) => (
                <li key={idx}>{clue}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* TIMELINE OF EVENTS */}
        <div className="dossier-card">
          <div className="dossier-tag">CHRONOLOGICAL RECORD</div>
          <h3 className="card-heading">Monsoon Blackout Timeline</h3>
          <div className="timeline-flow">
            {caseInfo.timeline.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <span className="timeline-time">{item.time}</span>
                <span className="timeline-dot" />
                <span className="timeline-desc">{item.event}</span>
              </div>
            ))}
          </div>

          {/* ACCUSATION DEDUCTION SECTION */}
          <div className="accusation-box">
            <h4 className="accusation-title">⚖️ Issue Formal Murder Indictment</h4>
            <p className="accusation-intro">
              When you have uncovered sufficient evidence through voice interrogation, name the killer and murder weapon:
            </p>

            <form onSubmit={handleMakeAccusation} className="accusation-form">
              <div className="accuse-row">
                <div className="accuse-field">
                  <label>Primary Culprit:</label>
                  <select
                    className="select-input"
                    value={accusedSuspect}
                    onChange={(e) => setAccusedSuspect(e.target.value)}
                  >
                    {Object.values(suspects).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="accuse-field">
                  <label>Murder Weapon:</label>
                  <select
                    className="select-input"
                    value={selectedWeapon}
                    onChange={(e) => setSelectedWeapon(e.target.value)}
                  >
                    <option value="reel_clamp">Heavy Cast-Iron Reel Clamp</option>
                    <option value="poison">Crushed Datura in Cutting Chai</option>
                    <option value="voltage">Generator Voltage Fuse Shock</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="indictment-btn">
                Declare Final Verdict
              </button>
            </form>

            {verdictResult && (
              <div className={`verdict-banner ${verdictResult.success ? "success" : "failed"}`}>
                <h3>{verdictResult.title}</h3>
                <p>{verdictResult.summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
