// src/components/ui/LeftSidebar.jsx
import React from "react";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";
import { initialEvidenceItems } from "../../data/evidence";
import { caseInfo } from "../../data/caseInfo";

export default function LeftSidebar() {
  const {
    openSidebar,
    toggleSidebar,
    activeLeftTab,
    setActiveLeftTab,
    selectedSuspect,
    selectSuspect,
    openEvidenceInspection,
    discoveredEvidence,
    dialogueHistory,
    toggleHandbook
  } = useGame();

  if (openSidebar !== "left") return null;

  return (
    <aside className="sidebar left-sidebar">
      {/* SIDEBAR HEADER */}
      <div className="sidebar-header">
        <div className="sidebar-title-wrap">
          <span className="sidebar-badge">DELHI POLICE CID // CASE #77</span>
          <h2 className="sidebar-heading">INVESTIGATOR'S DOSSIER</h2>
        </div>
        <button
          className="sidebar-close-btn"
          onClick={() => toggleSidebar("left")}
          title="Collapse Dossier"
        >
          ✕
        </button>
      </div>

      {/* HORIZONTAL TAB BAR */}
      <div className="sidebar-tabs">
        <button
          className={`tab-btn ${activeLeftTab === "evidence" ? "active" : ""}`}
          onClick={() => setActiveLeftTab("evidence")}
        >
          🔍 Evidence ({discoveredEvidence.length}/12)
        </button>
        <button
          className={`tab-btn ${activeLeftTab === "suspects" ? "active" : ""}`}
          onClick={() => setActiveLeftTab("suspects")}
        >
          👥 Suspects (5)
        </button>
        <button
          className={`tab-btn ${activeLeftTab === "checklist" ? "active" : ""}`}
          onClick={() => setActiveLeftTab("checklist")}
        >
          ☑ Checklist
        </button>
        <button
          className={`tab-btn ${activeLeftTab === "timeline" ? "active" : ""}`}
          onClick={() => setActiveLeftTab("timeline")}
        >
          ⏱ Timeline
        </button>
        <button
          className={`tab-btn ${activeLeftTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveLeftTab("notes")}
        >
          📝 Notes
        </button>
        <button
          className={`tab-btn ${activeLeftTab === "transcripts" ? "active" : ""}`}
          onClick={() => setActiveLeftTab("transcripts")}
        >
          🎙 Transcripts
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="sidebar-content-area">
        {/* --- EVIDENCE LIST TAB --- */}
        {activeLeftTab === "evidence" && (
          <div className="tab-pane">
            <div className="pane-intro">
              <span className="instruction-tip">
                Click any discovered item to inspect in 3D or examine forensic clues.
              </span>
            </div>

            <div className="evidence-grid">
              {initialEvidenceItems.map((item) => {
                const isDiscovered = discoveredEvidence.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`evidence-card ${isDiscovered ? "discovered" : "undiscovered"}`}
                    onClick={() => isDiscovered && openEvidenceInspection(item.id)}
                  >
                    <div className="evidence-card-header">
                      <span className="evidence-cat">{item.category}</span>
                      <span className="status-indicator">
                        {isDiscovered ? "DISCOVERED" : "UNRESOLVED"}
                      </span>
                    </div>

                    <h4 className="evidence-card-title">
                      {isDiscovered ? item.name : "Unknown Item [Undiscovered]"}
                    </h4>

                    <p className="evidence-card-desc">
                      {isDiscovered
                        ? item.description
                        : `Undiscovered clue in Rex Talkies. Seek evidence in ${item.location || "theatre"}.`}
                    </p>

                    {isDiscovered && (
                      <div className="evidence-card-footer">
                        <span className="clue-tag">Clue: {item.placeholderType}</span>
                        <span className="inspect-link">Inspect 3D ▸</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- SUSPECT PROFILES TAB --- */}
        {activeLeftTab === "suspects" && (
          <div className="tab-pane">
            <div className="pane-intro">
              <span className="instruction-tip">
                Select a suspect profile to focus the camera on their seat in the auditorium.
              </span>
            </div>

            <div className="suspect-list">
              {Object.values(suspects).map((s) => {
                const isSelected = selectedSuspect === s.id;
                return (
                  <div
                    key={s.id}
                    className={`suspect-card ${isSelected ? "selected" : ""}`}
                    onClick={() => selectSuspect(s.id)}
                  >
                    <div className="suspect-card-header">
                      <div className="suspect-avatar-badge" style={{ borderColor: s.color }}>
                        {s.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="suspect-meta">
                        <h4 className="suspect-name">{s.name}</h4>
                        <span className="suspect-role">{s.role} • Age {s.age}</span>
                      </div>
                      <span className="suspect-status-pill">{s.status}</span>
                    </div>

                    <p className="suspect-personality">
                      <em>Personality:</em> {s.personality}
                    </p>

                    <div className="suspect-dossier-box">
                      <div className="dossier-line">
                        <strong>Motive:</strong> {s.initialMotive}
                      </div>
                      <div className="dossier-line">
                        <strong>Alibi:</strong> {s.alibi}
                      </div>
                    </div>

                    <div className="suspect-card-footer">
                      <span className="seat-badge">Seat: Row {s.seat.row}, Col {s.seat.col}</span>
                      <button className="focus-btn">
                        {isSelected ? "Currently Focused ●" : "Focus in Hall ▸"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- CHECKLIST TAB --- */}
        {activeLeftTab === "checklist" && (
          <div className="tab-pane">
            <h3 className="section-heading">Active Case Objectives</h3>
            <ul className="checklist-items">
              {caseInfo.checklist.map((c) => (
                <li key={c.id} className={`checklist-item ${c.completed ? "done" : ""}`}>
                  <span className="checkbox-icon">{c.completed ? "☑" : "☐"}</span>
                  <span className="checklist-text">{c.label}</span>
                </li>
              ))}
            </ul>

            <div className="handbook-cta-box">
              <h4>Investigator's Deduction Board</h4>
              <p>Connect clues, cross-examine alibis, and deduce the murder method.</p>
              <button className="btn-primary" onClick={toggleHandbook}>
                Open Case Deduction Board
              </button>
            </div>
          </div>
        )}

        {/* --- TIMELINE TAB --- */}
        {activeLeftTab === "timeline" && (
          <div className="tab-pane">
            <h3 className="section-heading">Timeline of Events // Oct 21, 1989</h3>
            <div className="timeline-stream">
              {caseInfo.timeline.map((item, idx) => (
                <div key={idx} className="timeline-event">
                  <span className="timeline-time">{item.time}</span>
                  <div className="timeline-node" />
                  <p className="timeline-desc">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- NOTES TAB --- */}
        {activeLeftTab === "notes" && (
          <div className="tab-pane">
            <h3 className="section-heading">Investigator's Field Notes</h3>
            <div className="notes-block">
              {caseInfo.investigatorNotes.map((note, idx) => (
                <div key={idx} className="note-card">
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TRANSCRIPTS TAB --- */}
        {activeLeftTab === "transcripts" && (
          <div className="tab-pane">
            <h3 className="section-heading">Recorded Interrogation Logs</h3>
            <div className="transcripts-log">
              {dialogueHistory.map((entry, idx) => (
                <div key={idx} className="transcript-entry">
                  <div className="transcript-head">
                    <span className="transcript-speaker">{entry.speaker}</span>
                    <span className="transcript-time">{entry.time || "LOG"}</span>
                  </div>
                  <p className="transcript-body">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
