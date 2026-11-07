// src/components/ui/ToolsSidebar.jsx
import React from "react";
import { useGame } from "../../state/GameContext";

export default function ToolsSidebar() {
  const setActiveTab = useGame((s) => s.setActiveTab);
  const setCaseSubTab = useGame((s) => s.setCaseSubTab);
  const openPuzzle = useGame((s) => s.openPuzzle);
  const openCutscene = useGame((s) => s.openCutscene);
  const unlockedCutsceneIds = useGame((s) => s.unlockedCutsceneIds);
  const solvedPuzzleIds = useGame((s) => s.solvedPuzzleIds);
  const evidenceItems = useGame((s) => s.evidenceItems);
  const cameraState = useGame((s) => s.cameraState);
  const cycleCameraState = useGame((s) => s.cycleCameraState);
  const setIsVoiceLabOpen = useGame((s) => s.setIsVoiceLabOpen);
  const setIsTranscriptOpen = useGame((s) => s.setIsTranscriptOpen);
  const isTranscriptOpen = useGame((s) => s.isTranscriptOpen);
  const isHintsDrawerOpen = useGame((s) => s.isHintsDrawerOpen);
  const setIsHintsDrawerOpen = useGame((s) => s.setIsHintsDrawerOpen);

  const handleOpenCaseFiles = (subTab = "evidence_list") => {
    setCaseSubTab(subTab);
    setActiveTab("case_files");
  };

  const getCameraStateLabel = () => {
    switch (cameraState) {
      case "MAIN_THEATRE": return "Hall";
      case "SUSPECT_FOCUS": return "Focus";
      case "BOOTH_VIEW": return "Booth";
      case "SCREEN_VIEW": return "Screen";
      case "FREE_ORBIT": return "Orbit";
      default: return "Cam";
    }
  };

  return (
    <aside className="alibi-sidebar alibi-right-sidebar" aria-label="Investigation Tools">
      <div className="sidebar-rail-header">
        <span className="sidebar-rail-title">TOOLS</span>
        <span className="sidebar-rail-subtitle">FORENSICS</span>
      </div>

      <div className="tool-icons-group">
        {/* CASE FILES / DOSSIER */}
        <div className="tool-rail-item">
          <button
            type="button"
            className="tool-rail-btn"
            onClick={() => handleOpenCaseFiles("evidence_list")}
            title="Open Master Case Files (Evidence, Timeline, Profiles, Notes)"
          >
            <span className="tool-icon">📁</span>
            <span className="tool-badge">8</span>
          </button>
          <div className="tool-hover-tooltip">
            <strong>Case Files</strong>
            <p>Inspect 8 forensic dossiers, notes, and contradiction matrix.</p>
          </div>
        </div>

        {/* 3D PHYSICAL EVIDENCE */}
        <div className="tool-rail-item">
          <button
            type="button"
            className="tool-rail-btn"
            onClick={() => handleOpenCaseFiles("physical_evidence")}
            title="Inspect 3D Evidence (Ticket Stub, Duplicate Key, Chai Glass)"
          >
            <span className="tool-icon">🏺</span>
            <span className="tool-badge">{evidenceItems?.length || 5}</span>
          </button>
          <div className="tool-hover-tooltip">
            <strong>3D Physical Props</strong>
            <p>Inspect Ticket #409, Duplicate Key, Chai Glass with full 360° rotation.</p>
          </div>
        </div>

        {/* FORENSIC PUZZLES */}
        <div className="tool-rail-item">
          <button
            type="button"
            className="tool-rail-btn"
            onClick={() => openPuzzle("puzzle_ticket_clock")}
            title="Forensic Analysis Puzzles"
          >
            <span className="tool-icon">🧩</span>
            <span className="tool-badge">{solvedPuzzleIds?.length || 0}/5</span>
          </button>
          <div className="tool-hover-tooltip">
            <strong>Forensic Puzzles</strong>
            <p>Solve mechanical clock, tampered fuse box, and 3-splice film strip.</p>
          </div>
        </div>

        {/* CINEMATIC CUTSCENES */}
        <div className="tool-rail-item">
          <button
            type="button"
            className="tool-rail-btn"
            onClick={() =>
              openCutscene(
                unlockedCutsceneIds[unlockedCutsceneIds.length - 1] || "cutscene_opening"
              )
            }
            title="Replay Unlocked Cutscenes"
          >
            <span className="tool-icon">🎬</span>
            <span className="tool-badge">{unlockedCutsceneIds?.length || 1}/8</span>
          </button>
          <div className="tool-hover-tooltip">
            <strong>Incident Cutscenes</strong>
            <p>Review 1968 cinema blackout and crime scene re-enactments.</p>
          </div>
        </div>

        {/* CAMERA VIEW SWITCHER */}
        <div className="tool-rail-item">
          <button
            type="button"
            className={`tool-rail-btn ${cameraState === "FREE_ORBIT" ? "camera-orbit-active" : ""}`}
            onClick={cycleCameraState}
            title={`Switch Camera Angle (Current: ${cameraState})`}
          >
            <span className="tool-icon">🎥</span>
            <span className="tool-badge-text">{getCameraStateLabel()}</span>
          </button>
          <div className="tool-hover-tooltip">
            <strong>Camera Angle</strong>
            <p>Click to cycle: Hall View ➔ Suspect Focus ➔ Booth ➔ Screen ➔ Free Orbit.</p>
          </div>
        </div>

        {/* GNANI VOICE LAB */}
        <div className="tool-rail-item">
          <button
            type="button"
            className="tool-rail-btn"
            onClick={() => setIsVoiceLabOpen(true)}
            title="Gnani Voice Lab & TTS Voice Audition"
          >
            <span className="tool-icon">🎙️</span>
            <span className="tool-badge-dot" />
          </button>
          <div className="tool-hover-tooltip">
            <strong>Gnani Voice Lab</strong>
            <p>Audition suspect voices, test API keys, and inspect STT/TTS pipeline.</p>
          </div>
        </div>

        {/* RECORDED TRANSCRIPT */}
        <div className="tool-rail-item">
          <button
            type="button"
            className={`tool-rail-btn ${isTranscriptOpen ? "active" : ""}`}
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            title="Toggle Recorded Testimony Drawer"
          >
            <span className="tool-icon">📜</span>
          </button>
          <div className="tool-hover-tooltip">
            <strong>Recorded Testimony</strong>
            <p>Review and replay full dialogue history with custom suspect voices.</p>
          </div>
        </div>

        {/* CLUE HINTS & TRUTH GATES */}
        <div className="tool-rail-item">
          <button
            type="button"
            className={`tool-rail-btn ${isHintsDrawerOpen ? "active" : ""}`}
            onClick={() => setIsHintsDrawerOpen(!isHintsDrawerOpen)}
            title="Inspect Forensic Clue Hints & Suspect Truth Gates"
          >
            <span className="tool-icon">💡</span>
          </button>
          <div className="tool-hover-tooltip">
            <strong>Hints & Truth Gates</strong>
            <p>Active interrogation angles, scoring thin-ice cards, and suspect trust meter.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

