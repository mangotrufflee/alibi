// src/components/ui/HUD.jsx
import React from "react";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import DialoguePanel from "./DialoguePanel";
import { EvidenceInspection } from "../evidence/EvidenceInspection";
import HandbookModal from "./HandbookModal";
import PauseMenu from "./PauseMenu";
import DebugOverlay from "./DebugOverlay";
import { useGame } from "../../state/GameContext";

export default function HUD() {
  const { inspectingEvidenceId, closeEvidenceInspection } = useGame();

  return (
    <div className="game-hud-layer">
      {/* Top Header Bar */}
      <TopBar />

      {/* Main Interactive Dialogue at bottom */}
      <DialoguePanel />

      {/* Left Investigative Dossier */}
      <LeftSidebar />

      {/* Right System Settings */}
      <RightSidebar />

      {/* Evidence Fullscreen 3D/2D Inspection Overlay */}
      {inspectingEvidenceId && (
        <EvidenceInspection
          evidenceId={inspectingEvidenceId}
          onClose={closeEvidenceInspection}
        />
      )}

      {/* Deduction Board Modal */}
      <HandbookModal />

      {/* Pause Menu Modal */}
      <PauseMenu />

      {/* Technical Pipeline Debug Overlay */}
      <DebugOverlay />
    </div>
  );
}
