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

export const CASE_TABS = [
  { id: "evidence_list",      icon: "🔍", label: "Evidence List"     },
  { id: "physical_evidence",  icon: "🏺", label: "Physical 3D"       },
  { id: "checklist",          icon: "☑️", label: "Case Checklist"   },
  { id: "notes",              icon: "📓", label: "Notes & Log"       },
  { id: "conversations",      icon: "🎙️", label: "Past Dialogue"     },
  { id: "profiles",           icon: "👤", label: "Suspect Profiles"  },
  { id: "timeline",           icon: "⏱️", label: "Timeline & Clashes"},
  { id: "progress",           icon: "📊", label: "Case Progress"     }
];

export default function CaseFilesHub() {
  const { caseSubTab, setCaseSubTab, setActiveTab, generatorCountdown, score } = useGame();

  const minutes = Math.floor(generatorCountdown / 60);
  const seconds = generatorCountdown % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="case-files-master-dossier">
      {/* MANILA FOLDER BINDER HEADER */}
      <div className="dossier-binder-header">
        <div className="binder-brand-group">
          <div className="confidential-seal">
            <span className="seal-text">TOP SECRET</span>
          </div>
          <div className="binder-title-block">
            <h1 className="dossier-headline">CASE FILE // REX-0845-DELHI</h1>
            <span className="dossier-subheading">
              The Homicide of Harbans Lal • 8 Case Tabs System (GDD §7)
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
            🎙️ Interrogation Room ➔
          </button>
        </div>
      </div>

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
              <span className="folder-tab-icon">{tab.icon}</span>
              <span className="folder-tab-label">{tab.label}</span>
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
