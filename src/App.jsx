// src/App.jsx
import React, { useEffect } from "react";
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
import AudioLoadScene from "./components/ui/AudioLoadScene";
import GameStartScene from "./components/ui/GameStartScene";
import OpeningInstructionOverlay from "./components/ui/OpeningInstructionOverlay";
import "./styles/noir-theme.css";
import { ambientAudio } from "./services/ambientAudio";

function GameMain() {
  const hasStartedGame = useGame((s) => s.hasStartedGame);
  const isAudioUnlocked = useGame((s) => s.isAudioUnlocked);
  const activeTab = useGame((s) => s.activeTab);
  const generatorFlicker = useGame((s) => s.generatorFlicker);
  const isSolved = useGame((s) => s.isSolved);
  const isFailed = useGame((s) => s.isFailed);

  useEffect(() => {
    let lastHoveredElement = null;

    const handleButtonClick = (event) => {
      ambientAudio.init();
      if (event.target.closest("button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), .interactive-chip, [role='button'], canvas")) {
        ambientAudio.playClick();
      }
    };

    const handleButtonHover = (event) => {
      ambientAudio.init();
      const target = event.target.closest(
        "button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), .interactive-chip, [role='button'], canvas, .macos-dock-item-wrapper, .suspect-rail-item, .tool-rail-item, .chip-btn"
      );
      if (target && target !== lastHoveredElement) {
        lastHoveredElement = target;
        ambientAudio.playHover();
      }
    };

    const handleButtonPointerOut = (event) => {
      if (
        lastHoveredElement &&
        !event.relatedTarget?.closest?.(
          "button, input, select, textarea, .interactive-chip, [role='button'], canvas, .macos-dock-item-wrapper, .suspect-rail-item, .tool-rail-item, .chip-btn"
        )
      ) {
        lastHoveredElement = null;
      }
    };

    document.addEventListener("click", handleButtonClick);
    document.addEventListener("pointerover", handleButtonHover);
    document.addEventListener("pointerout", handleButtonPointerOut);
    return () => {
      document.removeEventListener("click", handleButtonClick);
      document.removeEventListener("pointerover", handleButtonHover);
      document.removeEventListener("pointerout", handleButtonPointerOut);
    };
  }, []);

  useEffect(() => {
    if (isSolved || isFailed) ambientAudio.stopGameAudio();
  }, [isSolved, isFailed]);

  const isCaseFiles =
    activeTab === "case_files" || activeTab === "evidence" || activeTab === "dossier";

  if (!hasStartedGame) {
    if (!isAudioUnlocked) return <AudioLoadScene />;
    return <GameStartScene />;
  }

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

        {/* POST-INTRO: TYPEWRITTEN INVESTIGATION BRIEF */}
        <OpeningInstructionOverlay />
      </div>

      {/* OVERLAY: FULL CASE FILES DOSSIER */}
      {isCaseFiles && (
        <div className="case-files-overlay-backdrop">
          <div className="case-files-overlay-container">
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
