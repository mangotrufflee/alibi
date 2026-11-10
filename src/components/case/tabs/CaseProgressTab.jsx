// src/components/case/tabs/CaseProgressTab.jsx
// ALIBI — Case Progress, Score Log & Formal Murder Indictment Station

import React, { useState } from "react";
import { useGame } from "../../../state/GameContext";
import { suspects } from "../../../data/suspects";
import { UiIcon } from "../../ui/UiIcon";

export default function CaseProgressTab() {
  const {
    activeStoryline,
    storylines,
    score,
    solveThreshold,
    remainingTries,
    scoreLedger,
    generatorCountdown,
    isSolved,
    isFailed,
    failReason,
    discoveredClues,
    investigationProgress,
    checkProofChain,
    indictSuspect,
    verdictResult,
    openCutscene
  } = useGame();

  const [accusedSuspect, setAccusedSuspect] = useState("meera");
  const [selectedWeapon, setSelectedWeapon] = useState("reel_clamp");

  const minutes = Math.floor(generatorCountdown / 60);
  const seconds = generatorCountdown % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const fuelPct = Math.max(0, Math.min(100, (generatorCountdown / 2400) * 100));
  const scorePct = Math.max(0, Math.min(100, (score / (solveThreshold || 50)) * 100));
  const isThinIce = score <= 0;

  const currentRoute = storylines[activeStoryline] || storylines.A;
  const proofStatus = checkProofChain(accusedSuspect);

  const handleIndict = (e) => {
    e.preventDefault();
    indictSuspect(accusedSuspect, selectedWeapon);
  };

  return (
    <div className="tab-pane case-progress-pane">
      {isFailed && (
        <div className="case-failed-banner">
          <UiIcon name="failure" /> CASE FAILED: {failReason || "Killer escaped into the storm"}
        </div>
      )}

      {isSolved && verdictResult && (
        <div className="case-solved-banner">
          <div className="banner-row">
            <span><UiIcon name="success" /> {verdictResult.title}</span>
            <button
              type="button"
              className="replay-verdict-btn"
              onClick={() => openCutscene("cutscene_final_confrontation")}
            >
              <UiIcon name="film" /> Watch Final Confrontation
            </button>
          </div>
          <p>{verdictResult.summary}</p>
        </div>
      )}

      {/* TOP DASHBOARD METRICS GRID */}
      <div className="progress-metrics-grid">
        {/* METRIC 1: CASE SCORE */}
        <div className="metric-card score-metric-card">
          <div className="metric-header">
            <span className="metric-label">SOLVE READINESS</span>
            <span className="metric-status">
              {score >= solveThreshold ? "PROSECUTION READY" : `${score} / ${solveThreshold} PTS`}
            </span>
          </div>

          <div className="metric-big-value">
            <span className={score < 0 ? "value-negative" : "value-positive"}>{score}</span>
            <span className="metric-subtext">points earned</span>
          </div>

          <div className="metric-track">
            <div
              className={`metric-fill score-fill ${score >= solveThreshold ? "fill-solved" : ""}`}
              style={{ width: `${scorePct}%` }}
            />
          </div>
          <span className="track-caption">Threshold to indict: {solveThreshold} pts</span>
        </div>

        {/* METRIC 2: DIESEL GENERATOR TIMER */}
        <div className="metric-card generator-metric-card">
          <div className="metric-header">
            <span className="metric-label">AUXILIARY GENERATOR</span>
            <span className={`metric-status ${generatorCountdown < 300 ? "status-danger" : ""}`}>
              {generatorCountdown === 0 ? "DEPLETED" : "RUNNING"}
            </span>
          </div>

          <div className="metric-big-value">
            <span className={generatorCountdown < 300 ? "timer-critical" : "timer-normal"}>
              <UiIcon name="time" /> {timeFormatted}
            </span>
            <span className="metric-subtext">before permanent blackout</span>
          </div>

          <div className="metric-track">
            <div
              className={`metric-fill fuel-fill ${generatorCountdown < 300 ? "fuel-critical" : ""}`}
              style={{ width: `${fuelPct}%` }}
            />
          </div>
          <span className="track-caption">Diesel fuel remaining: {Math.round(fuelPct)}%</span>
        </div>

        {/* METRIC 3: THIN-ICE TRIES */}
        <div className="metric-card thin-ice-metric-card">
          <div className="metric-header">
            <span className="metric-label">THIN-ICE INTEGRITY</span>
            <span className="metric-status">{isThinIce && <UiIcon name="warning" />} {isThinIce ? "ACTIVE WARNING" : "STABLE"}</span>
          </div>

          <div className="metric-big-value">
            <div className="pips-display-row">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`integrity-pip ${i <= remainingTries ? "pip-intact" : "pip-lost"}`}
                />
              ))}
            </div>
            <span className="metric-subtext">{remainingTries} of 3 tries remaining</span>
          </div>

          <p className="thin-ice-explainer">
            Triggering groundless accusations or wrong leads while on thin-ice consumes integrity tries.
          </p>
        </div>

        {/* METRIC 4: FORENSIC CLUES DISCOVERED */}
        <div className="metric-card clues-metric-card">
          <div className="metric-header">
            <span className="metric-label">CLUES DISCOVERED</span>
            <span className="metric-status">{discoveredClues.length} FOUND</span>
          </div>

          <div className="metric-big-value">
            <span className="value-positive">{discoveredClues.length}</span>
            <span className="metric-subtext">pieces of corroborating proof</span>
          </div>

          <div className="metric-track">
            <div
              className="metric-fill clues-fill"
              style={{ width: `${investigationProgress}%` }}
            />
          </div>
          <span className="track-caption">Case clarity: {investigationProgress}%</span>
        </div>
      </div>

      {/* FORMAL MURDER INDICTMENT CHAMBER */}
      <div className="accusation-box">
        <div className="accusation-header">
          <div className="dossier-tag">MAGISTRATE'S COURT // FORMAL INDICTMENT</div>
          <h3 className="accusation-title"><UiIcon name="gavel" /> Issue Formal Murder Indictment</h3>
          <p className="accusation-intro">
            Active Storyline: <strong>{currentRoute.title}</strong>. To secure a murder warrant, you must formulate your accusation with the 3 pillars of proof: a verified physical clue, an established timeline contradiction, and corroborating eyewitness or confession.
          </p>
        </div>

        {/* LIVE PROOF-CHAIN CHECKLIST */}
        <div className="proof-chain-status-grid">
          <div className={`proof-card ${proofStatus.physicalSatisfied ? "proof-pass" : "proof-missing"}`}>
            <span>PILLAR 1: PHYSICAL EVIDENCE</span>
            <p>
              {proofStatus.physicalSatisfied ? <><UiIcon name="success" /> Verified Physical Clue Discovered</> : "Physical Clue Missing"}
            </p>
          </div>

          <div className={`proof-card ${proofStatus.contradictionSatisfied ? "proof-pass" : "proof-missing"}`}>
            <span>PILLAR 2: TIMELINE CONTRADICTION</span>
            <p>
              {proofStatus.contradictionSatisfied ? <><UiIcon name="success" /> Alibi Contradiction Broken</> : "Alibi Contradiction Unresolved"}
            </p>
          </div>

          <div className={`proof-card ${proofStatus.confessionSatisfied ? "proof-pass" : "proof-missing"}`}>
            <span>PILLAR 3: CORROBORATION / CONFESSION</span>
            <p>
              {proofStatus.confessionSatisfied ? <><UiIcon name="success" /> Corroborating Evidence Secured</> : "Eyewitness/Confession Pending"}
            </p>
          </div>
        </div>

        <form onSubmit={handleIndict} className="accusation-form">
          <div className="accuse-row">
            <div className="accuse-field">
              <label>
                1. Accuse Suspect:
              </label>
              <select
                className="suspect-select-dropdown"
                value={accusedSuspect}
                onChange={(e) => setAccusedSuspect(e.target.value)}
                disabled={isSolved || isFailed}
              >
                {Object.values(suspects).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="accuse-field">
              <label>
                2. Murder Trauma / Lethal Mechanism:
              </label>
              <select
                className="suspect-select-dropdown"
                value={selectedWeapon}
                onChange={(e) => setSelectedWeapon(e.target.value)}
                disabled={isSolved || isFailed}
              >
                <option value="reel_clamp">Heavy Steel Reel Clamp & Booth Rail Impact</option>
                <option value="film_strip">Manually Severed 35mm Celluloid Strip (Staged Accident)</option>
                <option value="duplicate_key">Unlatched Passage & Forced Entry</option>
              </select>
            </div>

            <button
              type="submit"
              className="submit-indictment-btn"
              disabled={isSolved || isFailed}
            >
              <UiIcon name="gavel" /> Formulate Indictment <UiIcon name="arrow" />
            </button>
          </div>
        </form>

        {verdictResult && !verdictResult.success && (
          <div className="indictment-failure-notice">
            <strong>{verdictResult.title}</strong>
            <p>{verdictResult.summary}</p>
          </div>
        )}
      </div>

      {/* CHRONOLOGICAL SCORE LEDGER TABLE */}
      <div className="score-ledger-card">
        <div className="ledger-header">
          <h3 className="ledger-title">CHRONOLOGICAL SCORE LEDGER</h3>
          <span className="ledger-subtitle">
            Audited history of keyword detection, point awards, and interrogation penalties.
          </span>
        </div>

        {scoreLedger.length === 0 ? (
          <div className="empty-ledger-box">
            <p className="empty-ledger-text">
              No scoring events recorded yet. Interrogate suspects using keywords to generate ledger entries.
            </p>
          </div>
        ) : (
          <div className="ledger-table-wrapper">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Suspect</th>
                  <th>Matched Keyword</th>
                  <th>Type</th>
                  <th>Points Delta</th>
                  <th>Score After</th>
                </tr>
              </thead>
              <tbody>
                {scoreLedger.map((row) => (
                  <tr key={row.id}>
                    <td>{row.timestamp}</td>
                    <td>{row.suspect}</td>
                    <td><code>{row.keyword}</code></td>
                    <td>
                      <span className={`badge-pill ${row.type === "right" ? "badge-success" : "badge-danger"}`}>
                        {row.type.toUpperCase()}
                      </span>
                    </td>
                    <td className={row.delta > 0 ? "delta-pos" : "delta-neg"}>
                      {row.delta > 0 ? `+${row.delta}` : row.delta}
                    </td>
                    <td><strong>{row.scoreAfter}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
