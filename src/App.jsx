// src/App.jsx
import React from "react";
import { GameProvider, useGame } from "./state/GameContext";
import Scene from "./Scene";
import HeaderNav from "./components/ui/HeaderNav";
import SuspectsSidebar from "./components/ui/SuspectsSidebar";
import SuspectProfileCard from "./components/ui/SuspectProfileCard";
import ToolsSidebar from "./components/ui/ToolsSidebar";
import BottomInterrogationBar from "./components/ui/BottomInterrogationBar";
import TranscriptDrawer from "./components/ui/TranscriptDrawer";
import VoiceLabModal from "./components/ui/VoiceLabModal";
import HintsDrawer from "./components/ui/HintsDrawer";
import CaseFilesHub from "./components/case/CaseFilesHub";
import PuzzleModal from "./components/puzzles/PuzzleModal";
import CutsceneModal from "./components/cutscenes/CutsceneModal";
import PauseMenu from "./components/ui/PauseMenu";
import "./styles/noir-theme.css";

function GameMain() {
  const activeTab = useGame((s) => s.activeTab);
  const setActiveTab = useGame((s) => s.setActiveTab);
  const generatorFlicker = useGame((s) => s.generatorFlicker);

  const isCaseFiles =
    activeTab === "case_files" || activeTab === "evidence" || activeTab === "dossier";

  return (
    <div className={`alibi-noir-app ${generatorFlicker ? "generator-dip" : ""}`}>
      {/* MONSOON RAIN ATMOSPHERE OVERLAY */}
      <div className="rain-atmosphere-layer" />

      {/* FULL-VIEWPORT 3D THEATRE SCENE */}
      <div className="alibi-3d-viewport">
        <Scene />
      </div>

      {/* HUD OVERLAY (TOP, BOTTOM, LEFT, RIGHT) */}
      <div className="alibi-hud-overlay">
        {/* TOP BAR */}
        <HeaderNav />

        {/* LEFT ICONS BAR: 5 SUSPECTS SEATED IN AUDITORIUM */}
        <SuspectsSidebar />

        {/* FLOATING SUSPECT CARD BESIDE CHARACTER (INFO, BARS, UNLOCKED CLUES) */}
        <SuspectProfileCard />

        {/* RIGHT ICONS BAR: FORENSIC TOOLS, EVIDENCE, PUZZLES, CAMERA */}
        <ToolsSidebar />

        {/* BOTTOM BAR: LIVE INTERROGATION, SPEECH, MIC, TOPICS */}
        <BottomInterrogationBar />
      </div>

      {/* OVERLAY: FULL CASE FILES DOSSIER */}
      {isCaseFiles && (
        <div className="case-files-overlay-backdrop">
          <div className="case-files-overlay-container">
            <button
              type="button"
              className="case-files-modal-close-btn"
              onClick={() => setActiveTab("interrogation")}
              title="Return to 3D Cinema Auditorium"
            >
              ✕ Return to 3D Theatre
            </button>
            <CaseFilesHub />
          </div>
        </div>
      )}

      {/* OVERLAY DRAWERS & MODALS */}
      <TranscriptDrawer />
      <HintsDrawer />
      <VoiceLabModal />
      <PuzzleModal />
      <CutsceneModal />
      <PauseMenu />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameMain />
    </GameProvider>
  );
}
