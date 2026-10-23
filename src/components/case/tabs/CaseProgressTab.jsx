// src/components/case/tabs/CaseProgressTab.jsx
// ALIBI — Phase 2: Case Progress, Score Log & Generator Monitor (GDD §7, §12)

import React from "react";
import { useGame } from "../../../state/GameContext";

export default function CaseProgressTab() {
  const {
    score,
    solveThreshold,
    remainingTries,
    scoreLedger,
    generatorCountdown,
    isSolved,
    isFailed,
    failReason,
    discoveredClues,
    investigationProgress
  } = useGame();

  const minutes = Math.floor(generatorCountdown / 60);
  const seconds = generatorCountdown % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const fuelPct = Math.max(0, Math.min(100, (generatorCountdown / 2400) * 100));
  const scorePct = Math.max(0, Math.min(100, (score / (solveThreshold || 50)) * 100));
  const isThinIce = score <= 0;

  return (
    <div className="tab-pane case-progress-pane">
      {isFailed && (
        <div className="case-failed-banner" style={{ marginBottom: "1.2rem" }}>
          ✘ CASE FAILED: {failReason || "Killer escaped into the storm"}
        </div>
      )}
      {/* TOP DASHBOARD METRICS GRID */}
      <div className="progress-metrics-grid">
        {/* METRIC 1: CASE SCORE */}
        <div className="metric-card score-metric-card">
          <div className="metric-header">
            <span className="metric-label">SOLVE PROGRESS</span>
            <span className="metric-status">
              {isSolved ? "CASE CRACKED" : `${score} / ${solveThreshold} PTS`}
            </span>
          </div>

          <div className="metric-big-value">
            <span className={score < 0 ? "value-negative" : "value-positive"}>
              {score}
            </span>
            <span className="metric-subtext">points earned</span>
          </div>

          <div className="metric-track">
            <div
              className={`metric-fill score-fill ${isSolved ? "fill-solved" : ""}`}
              style={{ width: `${scorePct}%` }}
            />
          </div>
          <span className="track-caption">Threshold to solve: {solveThreshold} pts</span>
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
              ⏱️ {timeFormatted}
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

        {/* METRIC 3: THIN-ICE TRIES & INTEGRITY */}
        <div className="metric-card thin-ice-metric-card">
          <div className="metric-header">
            <span className="metric-label">THIN-ICE INTEGRITY</span>
            <span className="metric-status">
              {isThinIce ? "⚠ ACTIVE WARNING" : "STABLE"}
            </span>
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
            Triggering wrong leads or groundless accusations while score is ≤ 0 consumes tries.
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
                {scoreLedger.map((entry) => (
                  <tr key={entry.id}>
                    <td className="cell-time">{entry.timestamp}</td>
                    <td className="cell-suspect">{entry.suspect}</td>
                    <td className="cell-keyword">
                      <code>{entry.keyword}</code>
                    </td>
                    <td className="cell-type">
                      <span className={`ledger-type-pill type-${entry.type}`}>
                        {entry.type.toUpperCase()}
                      </span>
                    </td>
                    <td className={`cell-delta ${entry.delta > 0 ? "delta-pos" : entry.delta < 0 ? "delta-neg" : ""}`}>
                      {entry.delta > 0 ? `+${entry.delta}` : entry.delta}
                    </td>
                    <td className="cell-total">{entry.scoreAfter}</td>
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
