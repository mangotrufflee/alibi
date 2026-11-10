// src/components/cutscenes/CutsceneModal.jsx
import React from "react";
import { useGame } from "../../state/GameContext";
import { UiIcon } from "../ui/UiIcon";

export default function CutsceneModal() {
  const activeCutscene = useGame((s) => s.activeCutscene);
  const closeCutscene = useGame((s) => s.closeCutscene);

  if (!activeCutscene) return null;

  return (
    <div className="evidence-overlay-backdrop cutscene-modal-backdrop">
      <div className="cutscene-dialog-card">
        {/* CUTSCENE HEADER */}
        <div className="cutscene-dialog-header">
          <div className="cutscene-badge-pill">CINEMATIC RECONSTRUCTION</div>
          <h2 className="cutscene-dialog-title">{activeCutscene.title}</h2>
          <span className="cutscene-dialog-sub">{activeCutscene.subtitle}</span>
        </div>

        {/* CUTSCENE NARRATIVE CONTENT */}
        <div className="cutscene-paragraphs-flow">
          {activeCutscene.paragraphs.map((p, idx) => (
            <p key={idx} className="cutscene-story-p">
              {p}
            </p>
          ))}
        </div>

        {/* DEDUCTION REVELATION CALLOUT */}
        {activeCutscene.reveals && (
          <div className="cutscene-revelation-box">
            <span className="revelation-tag">KEY DEDUCTION REVEALED:</span>
            <p className="revelation-text">{activeCutscene.reveals}</p>
          </div>
        )}

        {/* FOOTER ACTION */}
        <div className="cutscene-dialog-footer">
          <button type="button" className="cutscene-dismiss-btn" onClick={closeCutscene}>
            Resume Investigation <UiIcon name="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
