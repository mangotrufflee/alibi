// src/components/case/tabs/PastConversationsTab.jsx
// ALIBI — Phase 2: Past Conversations & Interrogation Audio Archive (GDD §7)

import React, { useState } from "react";
import { useGame } from "../../../state/GameContext";
import { suspects } from "../../../data/suspects";
import { UiIcon } from "../../ui/UiIcon";

export default function PastConversationsTab() {
  const {
    dialogueHistory,
    selectedSuspect,
    selectSuspect,
    setActiveTab,
    gnaniPipeline
  } = useGame();

  const [filterSuspect, setFilterSuspect] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const suspectList = Object.entries(suspects).map(([id, s]) => ({
    id,
    name: s.name,
    role: s.role
  }));

  const filteredHistory = dialogueHistory.filter((entry) => {
    // Check suspect filter (for suspect entries, or corresponding speaker)
    const matchesSuspect =
      filterSuspect === "all" ||
      (entry.speaker &&
        entry.speaker.toLowerCase().includes(suspects[filterSuspect]?.name.toLowerCase())) ||
      entry.role === "Lead Investigator";

    // Check search query
    const matchesSearch =
      !searchQuery ||
      entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.speaker && entry.speaker.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSuspect && matchesSearch;
  });

  const handleReplayAudio = async (text, speakerName, entrySuspectId) => {
    // Prefer entry.suspectId if recorded directly, else match by suspect name
    let suspectId = entrySuspectId;
    if (!suspectId || !suspects[suspectId]) {
      const entry = Object.entries(suspects).find(
        ([, s]) =>
          s.name.toLowerCase() === (speakerName || "").toLowerCase() ||
          (speakerName || "").toLowerCase().includes(s.name.toLowerCase())
      );
      suspectId = entry ? entry[0] : "raju";
    }
    await gnaniPipeline.synthesizeSpeech(text, suspectId);
  };

  const handleContinueInterrogation = (suspectId) => {
    selectSuspect(suspectId);
    setActiveTab("interrogation");
  };

  return (
    <div className="tab-pane past-conversations-pane">
      {/* FILTER & SEARCH TOOLBAR */}
      <div className="pane-toolbar">
        <div className="filter-pill-group">
          <button
            className={`filter-pill-btn ${filterSuspect === "all" ? "active" : ""}`}
            onClick={() => setFilterSuspect("all")}
          >
            All Suspects
          </button>
          {suspectList.map((s) => (
            <button
              key={s.id}
              className={`filter-pill-btn ${filterSuspect === s.id ? "active" : ""}`}
              onClick={() => setFilterSuspect(s.id)}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="search-box">
          <input
            type="text"
            className="pane-search-input"
            placeholder="Search dialogue transcripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* CONVERSATION TRANSCRIPT LOG */}
      <div className="transcript-history-container">
        {filteredHistory.length === 0 ? (
          <div className="empty-transcript-prompt">
            <span>No conversations recorded yet. Speak or type in the Interrogation Room!</span>
          </div>
        ) : (
          <div className="transcript-entries-list">
            {filteredHistory.map((entry, idx) => {
              const isDetective =
                entry.isPlayer || entry.role === "Lead Investigator";

              return (
                <div
                  key={idx}
                  className={`transcript-entry-row ${isDetective ? "detective-row" : "suspect-row"}`}
                >
                  <div className="entry-avatar-frame">
                    <span><UiIcon name={isDetective ? "evidence" : "user"} /></span>
                  </div>

                  <div className="entry-bubble-card">
                    <div className="bubble-header">
                      <div className="speaker-identity">
                        <strong className="speaker-name">{entry.speaker}</strong>
                        {entry.role && (
                          <span className="speaker-role">({entry.role})</span>
                        )}
                      </div>

                      <div className="bubble-meta">
                        {entry.time && <span className="entry-timestamp"><UiIcon name="time" /> {entry.time}</span>}
                        {entry.isVoice && (
                          <span className="voice-stt-badge"><UiIcon name="mic" /> Voice STT</span>
                        )}
                      </div>
                    </div>

                    <p className="bubble-content-text">{entry.text}</p>

                    {/* AUDIO REPLAY ACTION FOR SUSPECT LINES */}
                    {!isDetective && entry.text && (
                      <div className="bubble-footer-actions">
                        <button
                          type="button"
                          className="audio-replay-btn"
                          onClick={() => handleReplayAudio(entry.text, entry.speaker, entry.suspectId)}
                          title="Replay suspect speech audio via Gnani TTS"
                        >
                          <UiIcon name="sound" /> Replay Voice Audio
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER SHORTCUT */}
      {filterSuspect !== "all" && (
        <div className="pane-footer-bar">
          <button
            type="button"
            className="resume-interrogation-btn"
            onClick={() => handleContinueInterrogation(filterSuspect)}
          >
            <UiIcon name="mic" /> Continue Interrogating {suspects[filterSuspect]?.name} <UiIcon name="arrow" />
          </button>
        </div>
      )}
    </div>
  );
}
