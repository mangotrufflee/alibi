// src/components/case/tabs/NotesTab.jsx
// ALIBI — Phase 2: Investigator Notes & Field Log Tab (GDD §7)

import React, { useState } from "react";
import { useGame } from "../../../state/GameContext";

export default function NotesTab() {
  const { investigatorNotes, addInvestigatorNote, deleteInvestigatorNote } = useGame();

  const [noteText, setNoteText] = useState("");
  const [selectedTag, setSelectedTag] = useState("Theory");
  const [activeFilter, setActiveFilter] = useState("all");

  const tags = ["Theory", "Contradiction", "Motive", "Alibi", "Forensics", "Suspect"];

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addInvestigatorNote(noteText, selectedTag);
    setNoteText("");
  };

  const filteredNotes = investigatorNotes.filter((note) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "auto") return note.isAuto;
    if (activeFilter === "manual") return !note.isAuto;
    return note.tag.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="tab-pane notes-pane">
      {/* LEFT: COMPOSE NEW DETECTIVE NOTE */}
      <div className="compose-note-card">
        <div className="compose-header">
          <span className="notebook-stamp">INVESTIGATOR DIARY</span>
          <h3 className="compose-title">Record Case Hypothesis</h3>
          <p className="compose-desc">
            Document inconsistencies, suspect motives, and cross-examination theories.
          </p>
        </div>

        <form onSubmit={handleAddNote} className="note-form">
          <div className="form-group">
            <label className="form-label">Classification Tag:</label>
            <div className="tag-picker-row">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`tag-picker-btn ${selectedTag === tag ? "active" : ""}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <textarea
              className="note-textarea"
              placeholder="Type investigative notes, observations on Raju's body language, or contradictions in Meera's timeline..."
              rows={5}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="submit-note-btn"
            disabled={!noteText.trim()}
          >
            ✍ Record into Official Log
          </button>
        </form>
      </div>

      {/* RIGHT: CHRONOLOGICAL LOG ENTRIES */}
      <div className="notes-feed-container">
        {/* FILTER BAR */}
        <div className="notes-filter-bar">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Notes ({investigatorNotes.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "auto" ? "active" : ""}`}
              onClick={() => setActiveFilter("auto")}
            >
              Forensic Breakthroughs
            </button>
            <button
              className={`filter-btn ${activeFilter === "manual" ? "active" : ""}`}
              onClick={() => setActiveFilter("manual")}
            >
              Personal Hypotheses
            </button>
          </div>
        </div>

        {/* NOTES LIST */}
        <div className="notes-feed-list">
          {filteredNotes.length === 0 ? (
            <div className="empty-notes-prompt">
              <span>No notes match this filter. Start recording your deductions!</span>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`note-entry-card ${note.isAuto ? "is-auto-clue" : "is-player-note"}`}
              >
                <div className="note-card-header">
                  <div className="note-meta">
                    <span className="note-tag-pill">{note.tag}</span>
                    <span className="note-time">🕒 {note.timestamp}</span>
                    {note.isAuto && (
                      <span className="auto-badge">AUTO-OBSERVATION</span>
                    )}
                  </div>

                  {!note.isAuto && (
                    <button
                      type="button"
                      className="delete-note-btn"
                      onClick={() => deleteInvestigatorNote(note.id)}
                      title="Delete note"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <p className="note-body-text">{note.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
