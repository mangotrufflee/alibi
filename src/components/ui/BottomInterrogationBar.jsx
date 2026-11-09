// src/components/ui/BottomInterrogationBar.jsx
import React, { useState } from "react";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";

export default function BottomInterrogationBar() {
  const selectedSuspect = useGame((s) => s.selectedSuspect);
  const suspectStress = useGame((s) => s.suspectStress);
  const currentDialogue = useGame((s) => s.currentDialogue);
  const dialogueHistory = useGame((s) => s.dialogueHistory);
  const askTopicQuestion = useGame((s) => s.askTopicQuestion);
  const askTextQuestion = useGame((s) => s.askTextQuestion);
  const isRecording = useGame((s) => s.isRecording);
  const isProcessing = useGame((s) => s.isProcessing);
  const isSpeaking = useGame((s) => s.isSpeaking);
  const toggleRecording = useGame((s) => s.toggleRecording);
  const stopAudio = useGame((s) => s.stopAudio);
  const speakCurrentSuspect = useGame((s) => s.speakCurrentSuspect);
  const currentLanguage = useGame((s) => s.currentLanguage);
  const setCurrentLanguage = useGame((s) => s.setCurrentLanguage);
  const isSolved = useGame((s) => s.isSolved);
  const isFailed = useGame((s) => s.isFailed);
  const isTranscriptOpen = useGame((s) => s.isTranscriptOpen);
  const setIsTranscriptOpen = useGame((s) => s.setIsTranscriptOpen);
  const isHintsDrawerOpen = useGame((s) => s.isHintsDrawerOpen);
  const setIsHintsDrawerOpen = useGame((s) => s.setIsHintsDrawerOpen);
  const unlockedGateIds = useGame((s) => s.unlockedGateIds);

  const [textInput, setTextInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const currentSuspect = suspects[selectedSuspect] || suspects.raju;
  const stressLevel = suspectStress[selectedSuspect] || 30;
  const isGameOver = isSolved || isFailed;

  // Find the latest suspect statement from dialogue history
  const latestSuspectMessage = [...dialogueHistory]
    .reverse()
    .find((m) => m.type === "suspect");

  const statementText =
    latestSuspectMessage?.text ||
    currentDialogue?.text ||
    currentSuspect.initialDialogue ||
    "Waiting for detective questioning...";

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim() || isRecording || isProcessing || isGameOver) return;
    askTextQuestion(textInput);
    setTextInput("");
  };

  return (
    <footer
      className={`bottom-interrogation-bar ${isMinimized ? "minimized" : ""}`}
      aria-label="Detective Interrogation Console"
    >
      {/* MINIMIZE / RESTORE BAR TAB */}
      <div className="bottom-bar-header-strip">
        <div className="strip-left">
          <span className="strip-title">REX TALKIES CROSS-EXAMINATION</span>
          <span className="strip-suspect-pill" style={{ color: currentSuspect.color }}>
            ● {currentSuspect.name} ({currentSuspect.role})
          </span>
        </div>

        <div className="strip-right">
          <button
            type="button"
            className="transcript-toggle-btn"
            onClick={() => setIsHintsDrawerOpen(!isHintsDrawerOpen)}
            title="Toggle forensic hint cards and suspect demeanor truth gates"
          >
            💡 Hints & Gates ({unlockedGateIds?.length || 0})
          </button>
          <button
            type="button"
            className="transcript-toggle-btn"
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            title="Toggle full recorded testimony log"
          >
            📜 Testimony Log ({dialogueHistory.length})
          </button>
          <button
            type="button"
            className="toggle-minimize-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Expand interrogation console" : "Minimize console for 3D view"}
          >
            {isMinimized ? "▲ Expand Interrogation" : "▼ Minimize for 3D Scene"}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="bottom-bar-main-body">
          {/* LEFT: SUSPECT DOSSIER MINI-CARD */}
          <div className="bottom-suspect-profile">
            <div className="bottom-avatar-frame" style={{ borderColor: currentSuspect.color }}>
              <div className="bottom-silhouette-bust">👤</div>
              <span className="bottom-monogram">
                {currentSuspect.name.split(" ").map((n) => n[0]).join("")}
              </span>
              {isSpeaking && (
                <div className="speaking-wave-mini">
                  <span className="sw-bar b1" />
                  <span className="sw-bar b2" />
                  <span className="sw-bar b3" />
                </div>
              )}
            </div>

            <div className="bottom-suspect-meta">
              <h3 className="bottom-suspect-name">{currentSuspect.name}</h3>
              <span className="bottom-suspect-role">
                {currentSuspect.role} • {currentSuspect.age} yrs
              </span>

              {/* STRESS METER */}
              <div className="bottom-stress-container">
                <div className="bottom-stress-label">
                  <span>Demeanor:</span>
                  <strong className={stressLevel > 65 ? "text-danger" : "text-amber"}>
                    {stressLevel}% {stressLevel > 65 ? "Panicked" : stressLevel > 45 ? "Evasive" : "Guarded"}
                  </strong>
                </div>
                <div className="bottom-stress-track">
                  <div
                    className="bottom-stress-fill"
                    style={{
                      width: `${stressLevel}%`,
                      backgroundColor:
                        stressLevel > 70 ? "#ba2c2c" : stressLevel > 45 ? "#3772f1" : "#10b981"
                    }}
                  />
                </div>
              </div>

              {/* VOICE PLAY / STOP BUTTON */}
              <div className="bottom-voice-btn-row">
                <button
                  type="button"
                  className="bottom-speak-btn"
                  onClick={speakCurrentSuspect}
                  disabled={isSpeaking || isRecording || isProcessing}
                  title={`Speak ${currentSuspect.name}'s statement with Gnani TTS`}
                >
                  {isSpeaking ? "🔊 Speaking..." : "🔊 Listen"}
                </button>
                {isSpeaking && (
                  <button
                    type="button"
                    className="bottom-stop-btn"
                    onClick={stopAudio}
                    title="Stop audio playback"
                  >
                    ⏹ Stop
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* CENTER: CURRENT STATEMENT & INTERROGATION DOCK */}
          <div className="bottom-dialogue-center">
            {/* CURRENT SUSPECT TESTIMONY BUBBLE */}
            <div className="statement-bubble-card">
              <div className="statement-speaker-line">
                <span className="statement-badge">CURRENT TESTIMONY</span>
                <span className="statement-speaker-name">{currentSuspect.name}:</span>
              </div>
              <p className="statement-text">"{statementText}"</p>
            </div>

            {/* QUICK CROSS-EXAMINATION CHIPS */}
            {currentSuspect.topics && currentSuspect.topics.length > 0 && (
              <div className="quick-topics-strip">
                <span className="quick-topics-label">Cross-Examine:</span>
                {currentSuspect.topics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="quick-topic-button"
                    onClick={() => askTopicQuestion(t)}
                    disabled={isRecording || isProcessing || isGameOver}
                    title={`Ask: ${t.title}`}
                  >
                    ❓ {t.title}
                  </button>
                ))}
              </div>
            )}

            {/* INTERROGATION ACTION DOCK: MIC + TEXT INPUT + LANGUAGE */}
            <div className="bottom-input-dock">
              {/* PUSH-TO-TALK MIC BUTTON */}
              <button
                type="button"
                className={`bottom-mic-btn ${isRecording ? "recording" : ""}`}
                onClick={toggleRecording}
                disabled={isProcessing || isGameOver}
                title="Voice Interrogation via Gnani STT (Push to talk / click to finish)"
              >
                <div className="bottom-mic-halo" />
                <span className="bottom-mic-icon">{isRecording ? "⏹" : "🎙"}</span>
                <span className="bottom-mic-label">
                  {isRecording ? "CLICK TO FINISH" : "PUSH TO TALK"}
                </span>
              </button>

              {/* TEXT QUERY FORM */}
              <form className="bottom-text-form" onSubmit={handleTextSubmit}>
                <input
                  type="text"
                  className="bottom-text-input"
                  placeholder={
                    isGameOver
                      ? "Case concluded."
                      : `Question ${currentSuspect.name} about 9:17 PM blackout, duplicate key, or Harbans...`
                  }
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={isRecording || isProcessing || isGameOver}
                />
                <button
                  type="submit"
                  className="bottom-submit-btn"
                  disabled={!textInput.trim() || isRecording || isProcessing || isGameOver}
                >
                  Interrogate ➔
                </button>
              </form>

              {/* LANGUAGE SELECTOR */}
              <div className="bottom-lang-box">
                <button
                  type="button"
                  className={`bottom-lang-btn ${currentLanguage === "en-IN" ? "active" : ""}`}
                  onClick={() => setCurrentLanguage("en-IN")}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`bottom-lang-btn ${currentLanguage === "hi-IN" ? "active" : ""}`}
                  onClick={() => setCurrentLanguage("hi-IN")}
                >
                  HI
                </button>
              </div>
            </div>

            {/* LIVE STATUS BAR */}
            <div className="bottom-pipeline-status">
              {isRecording ? (
                <span className="status-item rec">
                  <span className="pulse-rec-dot" /> <strong>RECORDING:</strong> Speak your question into the microphone...
                </span>
              ) : isProcessing ? (
                <span className="status-item proc">
                  ⏳ <strong>TRANSCRIBING:</strong> Processing detective speech query via Gnani STT...
                </span>
              ) : isSpeaking ? (
                <span className="status-item spk">
                  🔊 <strong>SPEAKING:</strong> {currentSuspect.name} is giving their statement...
                </span>
              ) : (
                <span className="status-item idle">
                  🎙️ Push-to-Talk or select a cross-examination question above to interrogate in 3D
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

