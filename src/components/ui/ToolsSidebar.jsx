// src/components/ui/ToolsSidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Box,
  Puzzle,
  Clapperboard,
  ScrollText
} from "lucide-react";
import { useGame } from "../../state/GameContext";

export default function ToolsSidebar() {
  const setActiveTab = useGame((s) => s.setActiveTab);
  const setCaseSubTab = useGame((s) => s.setCaseSubTab);
  const openPuzzle = useGame((s) => s.openPuzzle);
  const openCutscene = useGame((s) => s.openCutscene);
  const unlockedCutsceneIds = useGame((s) => s.unlockedCutsceneIds);
  const solvedPuzzleIds = useGame((s) => s.solvedPuzzleIds);
  const evidenceItems = useGame((s) => s.evidenceItems);
  const setIsTranscriptOpen = useGame((s) => s.setIsTranscriptOpen);
  const isTranscriptOpen = useGame((s) => s.isTranscriptOpen);

  const handleOpenCaseFiles = (subTab = "evidence_list") => {
    setCaseSubTab(subTab);
    setActiveTab("case_files");
  };

  const tools = [
    {
      id: "case_files",
      label: "Case Files",
      icon: <FolderOpen size={20} />,
      onClick: () => handleOpenCaseFiles("evidence_list"),
    },
    {
      id: "physical_props",
      label: "3D Physical Props",
      icon: <Box size={20} />,
      badge: String(evidenceItems?.length || 5),
      onClick: () => handleOpenCaseFiles("physical_evidence"),
    },
    {
      id: "puzzles",
      label: "Forensic Puzzles",
      icon: <Puzzle size={20} />,
      badge: `${solvedPuzzleIds?.length || 0}/5`,
      onClick: () => openPuzzle("puzzle_ticket_clock"),
    },
    {
      id: "cutscenes",
      label: "Incident Cutscenes",
      icon: <Clapperboard size={20} />,
      badge: `${unlockedCutsceneIds?.length || 1}/8`,
      onClick: () =>
        openCutscene(
          unlockedCutsceneIds[unlockedCutsceneIds.length - 1] || "cutscene_opening"
        ),
    }
  ];

  const utilityTools = [
    {
      id: "transcript",
      label: "Recorded Testimony",
      icon: <ScrollText size={20} />,
      isActive: Boolean(isTranscriptOpen),
      onClick: () => setIsTranscriptOpen(!isTranscriptOpen),
    }
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="alibi-sidebar alibi-right-sidebar macos-dock-sidebar"
      aria-label="Investigation Tools"
    >
      <div className="tool-icons-group">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="tool-rail-item macos-dock-item-wrapper"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.18, x: -6 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="tool-rail-btn"
              onClick={tool.onClick}
              aria-label={tool.label}
            >
              <span className="tool-icon">{tool.icon}</span>
              {tool.badge && <span className="tool-badge">{tool.badge}</span>}
            </motion.button>

            <span className="sidebar-button-heading">{tool.label}</span>
          </div>
        ))}

        <div className="macos-dock-separator" />

        {utilityTools.map((tool) => (
          <div
            key={tool.id}
            className="tool-rail-item macos-dock-item-wrapper"
          >
            {tool.isActive && (
              <motion.span
                layoutId={`active-tool-${tool.id}`}
                className="macos-dock-indicator-dot"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}

            <motion.button
              type="button"
              whileHover={{ scale: 1.18, x: -6 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`tool-rail-btn ${tool.isActive ? "active" : ""}`}
              onClick={tool.onClick}
              aria-label={tool.label}
            >
              <span className="tool-icon">{tool.icon}</span>
              {tool.badgeText && (
                <span className="tool-badge-text">{tool.badgeText}</span>
              )}
              {tool.isDot && <span className="tool-badge-dot" />}
            </motion.button>

            <span className="sidebar-button-heading">{tool.label}</span>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}
