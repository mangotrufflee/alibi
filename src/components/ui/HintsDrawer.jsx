// src/components/ui/HintsDrawer.jsx
import React, { useState } from "react";
import { LockKeyhole, Sparkles } from "lucide-react";
import { useGame } from "../../state/GameContext";
import { UiIcon } from "./UiIcon";
import { HINT_CARDS } from "../../data/hintCards";
import { suspects } from "../../data/suspects";

const HINT_UNLOCK_COST = 10;

export default function HintsDrawer() {
  const isHintsDrawerOpen = useGame((s) => s.isHintsDrawerOpen);
  const setIsHintsDrawerOpen = useGame((s) => s.setIsHintsDrawerOpen);
  const selectedSuspect = useGame((s) => s.selectedSuspect);
  const score = useGame((s) => s.score);
  const unlockedHintIds = useGame((s) => s.unlockedHintIds);
  const unlockHint = useGame((s) => s.unlockHint);
  const [unlockMessage, setUnlockMessage] = useState("");

  if (!isHintsDrawerOpen) return null;

  const suspectId = selectedSuspect || "raju";
  const hintCards = (HINT_CARDS[suspectId] || [])
    .filter((hint) => hint.type === "right")
    .slice(0, 4);
  const suspectName = suspects[suspectId]?.name || "the current suspect";

  const revealHint = (hintId) => {
    const unlocked = unlockHint(hintId, HINT_UNLOCK_COST);
    setUnlockMessage(unlocked ? "Lead unlocked." : `You need ${HINT_UNLOCK_COST} points to unlock this lead.`);
  };

  return (
    <div className="hints-drawer-overlay" onClick={() => setIsHintsDrawerOpen(false)}>
      <div className="hints-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="hints-drawer-header">
          <div className="hints-header-title">
            <span className="hints-header-icon"><UiIcon name="lightbulb" /></span>
            <div>
              <h2>INVESTIGATION HINTS</h2>
              <span className="hints-header-sub">
                Spend earned points to reveal a useful line of questioning.
              </span>
            </div>
          </div>
          <button
            type="button"
            className="hints-close-btn"
            onClick={() => setIsHintsDrawerOpen(false)}
          >
            <UiIcon name="close" /> Close
          </button>
        </div>

        <div className="hints-drawer-content">
          <div className="hints-unlock-summary">
            <span><Sparkles size={15} aria-hidden="true" /> {score} points available</span>
            <span>FOCUS: {suspectName.toUpperCase()}</span>
          </div>

          <div className="hints-section-block">
            <h3 className="section-title">LOCKED LEADS</h3>
            <p className="hints-section-description">
              Each lead is hidden until you decide it is worth the cost.
            </p>
            <div className="locked-hints-grid">
              {hintCards.map((hint, index) => {
                const isUnlocked = (unlockedHintIds || []).includes(hint.id);
                return (
                  <article key={hint.id} className={`locked-hint-card ${isUnlocked ? "is-unlocked" : ""}`}>
                    <div className="locked-hint-card__topline">
                      <span>LEAD {String(index + 1).padStart(2, "0")}</span>
                      {isUnlocked ? <span className="hint-unlocked-label">UNLOCKED</span> : <LockKeyhole size={15} aria-label="Locked" />}
                    </div>
                    {isUnlocked ? (
                      <p className="locked-hint-card__text">{hint.hint}</p>
                    ) : (
                      <>
                        <p className="locked-hint-card__masked">Classified interrogation angle</p>
                        <button type="button" onClick={() => revealHint(hint.id)} disabled={score < HINT_UNLOCK_COST}>
                          Use {HINT_UNLOCK_COST} points to unlock
                        </button>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
            {unlockMessage && <p className="hints-unlock-message" role="status">{unlockMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

