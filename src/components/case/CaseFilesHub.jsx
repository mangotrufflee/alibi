// src/components/case/CaseFilesHub.jsx
// ALIBI — Phase 2: Master Case Files Hub (The 8 Case Tabs from GDD §7)

import React from "react";
import { useGame } from "../../state/GameContext";
import EvidenceListTab from "./tabs/EvidenceListTab";
import PhysicalEvidenceTab from "./tabs/PhysicalEvidenceTab";
import ChecklistTab from "./tabs/ChecklistTab";
import NotesTab from "./tabs/NotesTab";
import PastConversationsTab from "./tabs/PastConversationsTab";
import SuspectProfilesTab from "./tabs/SuspectProfilesTab";
import TimelineTab from "./tabs/TimelineTab";
import CaseProgressTab from "./tabs/CaseProgressTab";
import { UiIcon } from "../ui/UiIcon";

export const CASE_TABS = [
  { id: "evidence_list",      icon: "evidence", label: "Evidence List"     },
  { id: "physical_evidence",  icon: "package", label: "Physical 3D"       },
  { id: "checklist",          icon: "report", label: "Case Checklist"   },
  { id: "notes",              icon: "notebook", label: "Notes & Log"       },
  { id: "conversations",      icon: "mic", label: "Past Dialogue"     },
  { id: "profiles",           icon: "user", label: "Suspect Profiles"  },
  { id: "timeline",           icon: "time", label: "Timeline & Clashes"},
  { id: "progress",           icon: "briefcase", label: "Case Progress"     }
];

export default function CaseFilesHub() {
  const caseSubTab = useGame((s) => s.caseSubTab);
  const setCaseSubTab = useGame((s) => s.setCaseSubTab);
  const setActiveTab = useGame((s) => s.setActiveTab);
  const generatorCountdown = useGame((s) => s.generatorCountdown);
  const score = useGame((s) => s.score);
  const storylineLocked = useGame((s) => s.storylineLocked);
  const isSolved = useGame((s) => s.isSolved);
  const discoveredClueIds = useGame((s) => s.discoveredClueIds);
  const exposedContradictionIds = useGame((s) => s.exposedContradictionIds);
  const checklistGoals = useGame((s) => s.checklistGoals) || [];
  const pendingGoalsCount = checklistGoals.filter((g) => !g.completed).length;

  const activeStoryline = useGame((s) => s.activeStoryline);
  const storylines = useGame((s) => s.storylines);
  const currentRoute = storylines[activeStoryline] || storylines.A;

  const minutes = Math.floor(generatorCountdown / 60);
  const seconds = generatorCountdown % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const nextObjective = isSolved
    ? "Verdict filed. Review the evidence trail or replay the final confrontation."
    : !storylineLocked
      ? "Establish a lead: question Raju about who paid him to leave the rear door unlatched."
      : "Build the proof chain: secure physical evidence, expose a contradiction, then prepare an indictment.";

  return (
    <div className="case-files-master-dossier">
      {/* MANILA FOLDER BINDER HEADER */}
      <div className="dossier-binder-header">
        <div className="binder-brand-group">
          <div className="confidential-seal">
            <span className="seal-text">CONFIDENTIAL</span>
          </div>
          <div className="binder-title-block">
            <h1 className="dossier-headline">CASE FILE // REX-0845-DELHI</h1>
            <span className="dossier-subheading">
              {storylineLocked ? `Lead under review: ${currentRoute.title}` : "Lead status: unconfirmed"}
            </span>
          </div>
        </div>

        <div className="binder-quick-stats">
          <div className="stat-pill">
            <span className="stat-label">CASE SCORE:</span>
            <strong className="stat-value">{score} PTS</strong>
          </div>
          <div className="stat-pill">
            <span className="stat-label">GENERATOR:</span>
            <strong className="stat-value text-amber">{timeStr}</strong>
          </div>
          <button
            type="button"
            className="return-interrogate-btn"
            onClick={() => setActiveTab("interrogation")}
          >
            <UiIcon name="close" /> Return to Theatre
          </button>
        </div>
      </div>

      <section className="case-flow-strip" aria-label="Investigation flow">
        <div className="case-flow-objective">
          <span className="case-flow-kicker">NEXT OBJECTIVE</span>
          <p>{nextObjective}</p>
        </div>
        <div className="case-flow-steps">
          <button
            type="button"
            className={`case-flow-step ${caseSubTab === "evidence_list" || caseSubTab === "physical_evidence" ? "active" : ""} ${discoveredClueIds.length ? "complete" : ""}`}
            onClick={() => setCaseSubTab("evidence_list")}
          >
            <span>01</span> Collect evidence
          </button>
          <button
            type="button"
            className={`case-flow-step ${caseSubTab === "timeline" || caseSubTab === "profiles" ? "active" : ""} ${exposedContradictionIds.length ? "complete" : ""}`}
            onClick={() => setCaseSubTab("timeline")}
          >
            <span>02</span> Test alibis
          </button>
          <button
            type="button"
            className={`case-flow-step ${caseSubTab === "progress" ? "active" : ""} ${isSolved ? "complete" : ""}`}
            onClick={() => setCaseSubTab("progress")}
          >
            <span>03</span> File indictment
          </button>
        </div>
      </section>

      {/* 8-TAB MANILA FOLDER DIVIDER STRIP */}
      <nav className="dossier-tabs-strip">
        {CASE_TABS.map((tab) => {
          const isActive = caseSubTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              className={`folder-tab-btn ${isActive ? "active-tab" : ""}`}
              onClick={() => setCaseSubTab(tab.id)}
            >
              <span className="folder-tab-icon"><UiIcon name={tab.icon} /></span>
              <span className="folder-tab-label">{tab.label}</span>
              {tab.id === "checklist" && (
                <span className="folder-tab-badge">
                  {pendingGoalsCount > 0 ? pendingGoalsCount : checklistGoals.length || 8}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ACTIVE TAB CONTENT PANE */}
      <div className="dossier-tab-viewport">
        {caseSubTab === "evidence_list" && <EvidenceListTab />}
        {caseSubTab === "physical_evidence" && <PhysicalEvidenceTab />}
        {caseSubTab === "checklist" && <ChecklistTab />}
        {caseSubTab === "notes" && <NotesTab />}
        {caseSubTab === "conversations" && <PastConversationsTab />}
        {caseSubTab === "profiles" && <SuspectProfilesTab />}
        {caseSubTab === "timeline" && <TimelineTab />}
        {caseSubTab === "progress" && <CaseProgressTab />}
      </div>
    </div>
  );
}
