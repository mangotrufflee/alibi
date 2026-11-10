// src/components/ui/VoiceLabModal.jsx
import React from "react";
import { useGame } from "../../state/GameContext";
import GnaniPipelineVisualizer from "../gnani/GnaniPipelineVisualizer";
import { UiIcon } from "./UiIcon";

export default function VoiceLabModal() {
  const isVoiceLabOpen = useGame((s) => s.isVoiceLabOpen);
  const setIsVoiceLabOpen = useGame((s) => s.setIsVoiceLabOpen);

  if (!isVoiceLabOpen) return null;

  return (
    <div className="voice-lab-modal-backdrop" onClick={() => setIsVoiceLabOpen(false)}>
      <div className="voice-lab-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="voice-lab-modal-header">
          <div className="voice-lab-header-left">
            <span className="voice-lab-icon"><UiIcon name="mic" /></span>
            <div>
              <h2 className="voice-lab-title">GNANI.AI VOICE INTERROGATION LAB</h2>
              <span className="voice-lab-subtitle">Custom Suspicion Voice Synthesis & Audition</span>
            </div>
          </div>
          <button
            type="button"
            className="voice-lab-close-btn"
            onClick={() => setIsVoiceLabOpen(false)}
            title="Return to 3D Cinema"
          >
            <UiIcon name="close" /> Close
          </button>
        </div>

        <div className="voice-lab-modal-body">
          <GnaniPipelineVisualizer />
        </div>
      </div>
    </div>
  );
}

