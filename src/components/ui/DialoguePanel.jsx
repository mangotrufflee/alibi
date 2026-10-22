// src/components/ui/DialoguePanel.jsx
import React from "react";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";

export default function DialoguePanel() {
  const {
    currentDialogue,
    selectedSuspect,
    askTopicQuestion,
    isRecording,
    micTranscript,
    isTranscribing,
    toggleRecording,
    settings,
    updateSetting,
    inspectingEvidenceId
  } = useGame();

  // If inspecting evidence, hide the dialogue bar to keep focus on evidence
  if (inspectingEvidenceId) return null;

  const currentSuspectData = suspects[selectedSuspect] || suspects.raju;

  return (
    <div className="dialogue-panel-container">
      <div className="dialogue-panel">
        {/* LEFT: SPEAKER PROFILE & STATUS */}
        <div className="speaker-column">
          <div
            className="speaker-avatar-frame"
            style={{ borderColor: currentSuspectData.color || "#f59e0b" }}
          >
            <div className="speaker-initials">
              {currentDialogue.speaker.slice(0, 2).toUpperCase()}
            </div>
            {/* Pulsing indicator if active speaker */}
            <span className="speaker-live-dot" />
          </div>

          <div className="speaker-meta">
            <span className="speaker-role-tag">{currentDialogue.role || "SUSPECT"}</span>
            <h3 className="speaker-name">{currentDialogue.speaker}</h3>
            <span className="suspect-demeanor">
              Status: {currentSuspectData.status || "Questioned"}
            </span>
          </div>
        </div>

        {/* CENTER: DIALOGUE SPEECH & LIVE TRANSCRIPTION */}
        <div className="dialogue-main-column">
          {/* Main Dialogue text box */}
          <div className="dialogue-speech-box">
            <p className="dialogue-text">
              <span className="quote-mark">“</span>
              {currentDialogue.text}
              <span className="quote-mark">”</span>
            </p>
          </div>

          {/* SIMULATED LIVE TRANSCRIPTION / RECORDING STATUS AREA */}
          {(isRecording || isTranscribing || micTranscript) && (
            <div className={`live-transcription-bar ${isRecording ? "recording" : ""}`}>
              <div className="transcription-indicator">
                {isRecording ? (
                  <>
                    <span className="rec-pulse-icon" />
                    <strong>[VOICE INTERROGATION ACTIVE]</strong>
                    {/* Simulated sound waves */}
                    <div className="soundwave-bars">
                      <span className="bar b1" />
                      <span className="bar b2" />
                      <span className="bar b3" />
                      <span className="bar b4" />
                      <span className="bar b5" />
                    </div>
                  </>
                ) : isTranscribing ? (
                  <>
                    <span className="spinner-icon">⏳</span>
                    <em>Processing speech recognition transcript...</em>
                  </>
                ) : (
                  <>
                    <span className="mic-icon">🎙️</span>
                    <span className="transcript-label">DETECTIVE SPOKE:</span>
                  </>
                )}
              </div>
              <span className="transcript-text">
                {isRecording ? "Listening for interrogation query... (Click Mic to Finish)" : micTranscript}
              </span>
            </div>
          )}

          {/* QUESTION TOPIC PROMPTS */}
          {currentDialogue.topics && currentDialogue.topics.length > 0 && (
            <div className="dialogue-topics-row">
              <span className="topics-label">Cross-Examine:</span>
              {currentDialogue.topics.map((topic) => (
                <button
                  key={topic.id}
                  className="topic-chip-btn"
                  onClick={() => askTopicQuestion(topic)}
                  title="Press to confront suspect with this question"
                >
                  ❓ {topic.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: VOICE PUSH-TO-TALK & SUBTITLE CONTROLS */}
        <div className="dialogue-action-column">
          <div className="mic-wrapper">
            <button
              className={`mic-button ${isRecording ? "recording" : ""}`}
              onClick={toggleRecording}
              title={
                isRecording
                  ? "Finish Voice Interrogation"
                  : "Click to simulate Voice Interrogation [Microphone Simulator]"
              }
            >
              <div className="mic-circle-outer">
                <span className="mic-symbol">{isRecording ? "⏹" : "🎙"}</span>
              </div>
            </button>
            <span className="mic-status-label">
              {isRecording ? "RECORDING..." : "PUSH TO TALK"}
            </span>
            <small className="mic-helper-text">[Simulated Voice STT]</small>
          </div>

          <div className="dialogue-sub-toggle">
            <button
              className={`sub-btn ${settings.subtitles ? "active" : ""}`}
              onClick={() => updateSetting("subtitles", !settings.subtitles)}
              title="Toggle Interrogation Subtitles"
            >
              CC {settings.subtitles ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
