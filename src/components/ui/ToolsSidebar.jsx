// src/components/ui/ToolsSidebar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  Box,
  Puzzle,
  Clapperboard,
  Camera,
  Mic,
  ScrollText,
  Lightbulb
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
  const cameraState = useGame((s) => s.cameraState);
  const cycleCameraState = useGame((s) => s.cycleCameraState);
  const setIsVoiceLabOpen = useGame((s) => s.setIsVoiceLabOpen);
  const isVoiceLabOpen = useGame((s) => s.isVoiceLabOpen);
  const setIsTranscriptOpen = useGame((s) => s.setIsTranscriptOpen);
  const isTranscriptOpen = useGame((s) => s.isTranscriptOpen);
  const isHintsDrawerOpen = useGame((s) => s.isHintsDrawerOpen);
  const setIsHintsDrawerOpen = useGame((s) => s.setIsHintsDrawerOpen);
  const [hoveredTool, setHoveredTool] = useState(null);

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

  const tools = [
    {
      id: "case_files",
      label: "Case Files",
      icon: <FolderOpen size={20} />,
      badge: "8",
      onClick: () => handleOpenCaseFiles("evidence_list"),
      tooltipTitle: "Case Files",
      tooltipDesc: "Inspect 8 forensic dossiers, notes, and contradiction matrix."
    },
    {
      id: "physical_props",
      label: "3D Physical Props",
      icon: <Box size={20} />,
      badge: String(evidenceItems?.length || 5),
      onClick: () => handleOpenCaseFiles("physical_evidence"),
      tooltipTitle: "3D Physical Props",
      tooltipDesc: "Inspect Ticket #409, Duplicate Key, Chai Glass with full 360° rotation."
    },
    {
      id: "puzzles",
      label: "Forensic Puzzles",
      icon: <Puzzle size={20} />,
      badge: `${solvedPuzzleIds?.length || 0}/5`,
      onClick: () => openPuzzle("puzzle_ticket_clock"),
      tooltipTitle: "Forensic Puzzles",
      tooltipDesc: "Solve mechanical clock, tampered fuse box, and 3-splice film strip."
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
      tooltipTitle: "Incident Cutscenes",
      tooltipDesc: "Review 1968 cinema blackout and crime scene re-enactments."
    }
  ];

  const utilityTools = [
    {
      id: "camera",
      label: "Camera Angle",
      icon: <Camera size={20} />,
      badgeText: getCameraStateLabel(),
      isActive: cameraState === "FREE_ORBIT",
      onClick: cycleCameraState,
      tooltipTitle: "Camera Angle",
      tooltipDesc: "Click to cycle: Hall View ➔ Suspect Focus ➔ Booth ➔ Screen ➔ Free Orbit."
    },
    {
      id: "voicelab",
      label: "Gnani Voice Lab",
      icon: <Mic size={20} />,
      isDot: true,
      isActive: Boolean(isVoiceLabOpen),
      onClick: () => setIsVoiceLabOpen(true),
      tooltipTitle: "Gnani Voice Lab",
      tooltipDesc: "Audition suspect voices, test API keys, and inspect STT/TTS pipeline."
    },
    {
      id: "transcript",
      label: "Recorded Testimony",
      icon: <ScrollText size={20} />,
      isActive: Boolean(isTranscriptOpen),
      onClick: () => setIsTranscriptOpen(!isTranscriptOpen),
      tooltipTitle: "Recorded Testimony",
      tooltipDesc: "Review and replay full dialogue history with custom suspect voices."
    },
    {
      id: "hints",
      label: "Hints & Truth Gates",
      icon: <Lightbulb size={20} />,
      isActive: Boolean(isHintsDrawerOpen),
      onClick: () => setIsHintsDrawerOpen(!isHintsDrawerOpen),
      tooltipTitle: "Hints & Truth Gates",
      tooltipDesc: "Active interrogation angles, scoring thin-ice cards, and suspect trust meter."
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
      <div className="sidebar-rail-header">
        <span className="sidebar-rail-title">TOOLS</span>
        <span className="sidebar-rail-subtitle">FORENSICS</span>
      </div>

      <div className="tool-icons-group">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="tool-rail-item macos-dock-item-wrapper"
            onMouseEnter={() => setHoveredTool(tool.id)}
            onMouseLeave={() => setHoveredTool(null)}
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

            <AnimatePresence>
              {hoveredTool === tool.id && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="tool-hover-tooltip macos-dock-tooltip"
                >
                  <strong>{tool.tooltipTitle}</strong>
                  <p>{tool.tooltipDesc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="macos-dock-separator" />

        {utilityTools.map((tool) => (
          <div
            key={tool.id}
            className="tool-rail-item macos-dock-item-wrapper"
            onMouseEnter={() => setHoveredTool(tool.id)}
            onMouseLeave={() => setHoveredTool(null)}
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

            <AnimatePresence>
              {hoveredTool === tool.id && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="tool-hover-tooltip macos-dock-tooltip"
                >
                  <strong>{tool.tooltipTitle}</strong>
                  <p>{tool.tooltipDesc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}
