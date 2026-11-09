// src/components/ui/HeaderNav.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Mic,
  FolderOpen,
  Puzzle,
  Clapperboard,
  Lightbulb,
  Volume2,
  VolumeX,
  Menu,
  Trophy
} from "lucide-react";
import { useGame } from "../../state/GameContext";

export default function HeaderNav() {
  const activeTab = useGame((s) => s.activeTab);
  const setActiveTab = useGame((s) => s.setActiveTab);
  const setCaseSubTab = useGame((s) => s.setCaseSubTab);
  const score = useGame((s) => s.score);
  const openPuzzle = useGame((s) => s.openPuzzle);
  const openCutscene = useGame((s) => s.openCutscene);
  const unlockedCutsceneIds = useGame((s) => s.unlockedCutsceneIds);
  const solvedPuzzleIds = useGame((s) => s.solvedPuzzleIds);
  const isHintsDrawerOpen = useGame((s) => s.isHintsDrawerOpen);
  const setIsHintsDrawerOpen = useGame((s) => s.setIsHintsDrawerOpen);
  const isMuted = useGame((s) => s.isMuted);
  const toggleMute = useGame((s) => s.toggleMute);
  const toggleMenu = useGame((s) => s.toggleMenu);

  const handleOpenCaseFiles = (subTab = "evidence_list") => {
    setCaseSubTab(subTab);
    setActiveTab("case_files");
  };

  const isCaseFilesActive =
    activeTab === "case_files" || activeTab === "evidence" || activeTab === "dossier";

  const tabs = [
    {
      id: "interrogation",
      label: "Interrogation",
      icon: <Mic size={15} />,
      isActive: activeTab === "interrogation",
      onClick: () => setActiveTab("interrogation")
    },
    {
      id: "case_files",
      label: "Case Files",
      icon: <FolderOpen size={15} />,
      isActive: isCaseFilesActive,
      onClick: () => handleOpenCaseFiles("evidence_list")
    },
    {
      id: "puzzles",
      label: `Puzzles (${solvedPuzzleIds?.length || 0}/5)`,
      icon: <Puzzle size={15} />,
      isActive: false,
      onClick: () => openPuzzle("puzzle_ticket_clock")
    },
    {
      id: "scenes",
      label: `Scenes (${unlockedCutsceneIds?.length || 1}/8)`,
      icon: <Clapperboard size={15} />,
      isActive: false,
      onClick: () =>
        openCutscene(
          unlockedCutsceneIds[unlockedCutsceneIds.length - 1] || "cutscene_opening"
        )
    }
  ];

  return (
    <header className="alibi-header alibi-dock-header">
      {/* LEFT: ONLY "ALIBI" TEXT + THE 4 TABS ALIGNED LEFT */}
      <div className="header-left-cluster">
        {/* ALIBI BRAND TEXT */}
        <h1 className="header-brand-alibi">ALIBI</h1>

        {/* 4 TABS - DOCK THEME ALIGNED LEFT */}
        <nav className="header-dock-tabs-container" aria-label="Game Navigation Tabs">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`header-dock-tab-btn ${tab.isActive ? "active" : ""}`}
              onClick={tab.onClick}
            >
              <span className="tab-dock-icon">{tab.icon}</span>
              <span className="tab-dock-label">{tab.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* RIGHT: SCORE -> HINT ICON -> MUTE ICON -> MENU ICON */}
      <div className="header-right-cluster">
        {/* SCORE PART */}
        <div className="header-dock-score-pill" title="Investigation Thoroughness Score">
          <Trophy size={15} className="score-trophy-icon" />
          <span className="score-val">{score}</span>
          <span className="score-pts">PTS</span>
        </div>

        {/* DOCK ACTION ICONS GROUP */}
        <div className="header-dock-actions-group">
          {/* HINT ICON */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`header-dock-icon-btn ${isHintsDrawerOpen ? "active" : ""}`}
            onClick={() => setIsHintsDrawerOpen(!isHintsDrawerOpen)}
            title="Forensic Hints & Truth Gates"
            aria-label="Hints"
          >
            <Lightbulb size={17} />
            {isHintsDrawerOpen && <span className="header-icon-active-dot" />}
          </motion.button>

          {/* MUTE MUSIC ICON */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`header-dock-icon-btn ${isMuted ? "muted" : ""}`}
            onClick={toggleMute}
            title={isMuted ? "Unmute Background Music & Audio" : "Mute Background Music & Audio"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </motion.button>

          {/* GAME MENU ICON */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="header-dock-icon-btn header-dock-menu-btn"
            onClick={toggleMenu}
            title="Game Menu (Resume, Pause, Quit, Options)"
            aria-label="Menu"
          >
            <Menu size={17} />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
