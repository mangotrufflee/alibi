// src/components/interrogation/HintCards.jsx
// ALIBI — Phase 1: Hint Card UI Component
// Renders 2-3 animated hint cards with keyword highlight, scoring bar, and thin-ice indicators.

import React from "react";
import { useGame } from "../../state/GameContext";

// Pill styling & icons per card type
const TYPE_CONFIG = {
  right:   { label: "+", className: "hint-type-right"   },
  wrong:   { label: "−", className: "hint-type-wrong"   },
  neutral: { label: "~", className: "hint-type-neutral" }
};

/**
 * Highlight the keyword inside the hint text by wrapping it in a <mark>.
 * Falls back to plain text if keyword not found in hint.
 */
function HighlightedHint({ hint, keyword }) {
  if (!hint) return null;
  if (!keyword) return <span>{hint}</span>;

  const idx = hint.toLowerCase().indexOf(keyword.toLowerCase());
  if (idx === -1) {
    return <span>{hint}</span>;
  }
  return (
    <span>
      {hint.slice(0, idx)}
      <mark className="hint-keyword-mark">{hint.slice(idx, idx + keyword.length)}</mark>
      {hint.slice(idx + keyword.length)}
    </span>
  );
}

export default function HintCards() {
  const {
    activeHints,
    pointPopup,
    score,
    solveThreshold,
    remainingTries,
    isSolved,
    isFailed,
    failReason,
    scoredCardIds,
    selectedSuspect
  } = useGame();

  if (!activeHints || activeHints.length === 0) return null;

  const currentScoredList = (scoredCardIds && scoredCardIds[selectedSuspect]) || [];
  const scoredCount = currentScoredList.length;
  const progressPct = Math.max(0, Math.min(100, (score / (solveThreshold || 50)) * 100));
  const isLow = score <= 0;

  return (
    <div className="hint-cards-section">
      {/* SECTION HEADER */}
      <div className="hint-cards-header">
        <span className="hint-cards-label">
          📋 LINE OF QUESTIONING
        </span>
        <span className="hint-scored-badge">
          {scoredCount} scored
        </span>
      </div>

      {/* CARD GRID */}
      <div className="hint-cards-grid">
        {activeHints.map((card, i) => {
          const cfg = TYPE_CONFIG[card.type] || TYPE_CONFIG.neutral;
          return (
            <div
              key={card.id}
              className={`hint-card hint-card-${card.type}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="hint-card-top">
                <span className={`hint-type-badge ${cfg.className}`}>
                  {cfg.label} {card.points > 0 ? `+${card.points}` : card.points === 0 ? "0" : card.points} pts
                </span>
              </div>
              <p className="hint-card-text">
                <HighlightedHint hint={card.hint} keyword={card.keyword} />
              </p>
              <div className="hint-card-footer">
                <span className="hint-keyword-chip">
                  keyword: <em>{card.keyword}</em>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SCORING BAR */}
      <div className="scoring-bar-container">
        <div className="scoring-bar-labels">
          <span className="scoring-current-label">
            CASE SCORE: <strong className={isLow ? "score-danger" : ""}>{score}</strong>
          </span>
          <span className="scoring-threshold-label">
            SOLVE THRESHOLD: <strong>{solveThreshold || 50}</strong>
          </span>
        </div>

        <div className="scoring-bar-track">
          <div
            className={`scoring-bar-fill ${isLow ? "bar-danger" : ""} ${isSolved ? "bar-solved" : ""}`}
            style={{ width: `${progressPct}%` }}
          />
          {/* Zero-line marker */}
          <div className="zero-marker" />
        </div>

        {/* THIN-ICE TRIES — only shown when score is at or below zero */}
        {isLow && !isSolved && !isFailed && (
          <div className="thin-ice-row">
            <span className="thin-ice-label">⚠ THIN ICE — 3-TRIES RULE:</span>
            <div className="tries-pip-row">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`try-pip ${i <= remainingTries ? "pip-active" : "pip-spent"}`}
                  title={`Try ${i} of 3`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* POINT POPUP TOAST */}
      {pointPopup && (
        <div className={`point-popup point-popup-${pointPopup.type || "right"}`}>
          <span className="popup-delta">
            {pointPopup.delta > 0 ? `+${pointPopup.delta}` : pointPopup.delta}
          </span>
          <span className="popup-keyword">{pointPopup.keyword}</span>
        </div>
      )}

      {/* SOLVED BANNER */}
      {isSolved && (
        <div className="case-solved-banner">
          ✔ CASE CRACKED — {score} / {solveThreshold} pts
        </div>
      )}

      {/* FAILED BANNER */}
      {isFailed && (
        <div className="case-failed-banner">
          ✘ CASE COLLAPSED — {failReason ? failReason.toUpperCase() : "KILLER ESCAPES"}
        </div>
      )}
    </div>
  );
}
