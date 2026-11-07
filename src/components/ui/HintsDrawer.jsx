// src/components/ui/HintsDrawer.jsx
import React from "react";
import { useGame } from "../../state/GameContext";
import HintCards from "../interrogation/HintCards";
import TruthGateIndicator from "../interrogation/TruthGateIndicator";

export default function HintsDrawer() {
  const isHintsDrawerOpen = useGame((s) => s.isHintsDrawerOpen);
  const setIsHintsDrawerOpen = useGame((s) => s.setIsHintsDrawerOpen);
  const selectedSuspect = useGame((s) => s.selectedSuspect);

  if (!isHintsDrawerOpen) return null;

  return (
    <div className="hints-drawer-overlay" onClick={() => setIsHintsDrawerOpen(false)}>
      <div className="hints-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="hints-drawer-header">
          <div className="hints-header-title">
            <span className="hints-header-icon">💡</span>
            <div>
              <h2>FORENSIC HINTS & TRUTH GATES</h2>
              <span className="hints-header-sub">
                Interrogation Angles & Suspect Psychological Resistance
              </span>
            </div>
          </div>
          <button
            type="button"
            className="hints-close-btn"
            onClick={() => setIsHintsDrawerOpen(false)}
          >
            ✕ Close
          </button>
        </div>

        <div className="hints-drawer-content">
          <div className="hints-section-block">
            <h3 className="section-title">ACTIVE SUSPECT DEMEANOR & TRUTH GATES</h3>
            <TruthGateIndicator />
          </div>

          <div className="hints-section-block">
            <h3 className="section-title">FORENSIC HINT CARDS & SCORING ANGLES</h3>
            <HintCards />
          </div>
        </div>
      </div>
    </div>
  );
}

