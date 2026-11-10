// src/components/interrogation/InterrogationRoom.jsx
import React, { useState, useRef, useEffect } from "react";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";
import HintCards from "./HintCards";
import TruthGateIndicator from "./TruthGateIndicator";
import { UiIcon } from "../ui/UiIcon";

export default function InterrogationRoom() {
  const selectedSuspect   = useGame((s) => s.selectedSuspect);
  const selectSuspect     = useGame((s) => s.selectSuspect);
  const suspectStress     = useGame((s) => s.suspectStress);
  const currentDialogue   = useGame((s) => s.currentDialogue);
  const dialogueHistory   = useGame((s) => s.dialogueHistory);
  const askTopicQuestion  = useGame((s) => s.askTopicQuestion);
  const askTextQuestion   = useGame((s) => s.askTextQuestion);
  const isRecording       = useGame((s) => s.isRecording);
  const isProcessing      = useGame((s) => s.isProcessing);
  const isSpeaking        = useGame((s) => s.isSpeaking);
  const lastTranscript    = useGame((s) => s.lastTranscript);
  const toggleRecording   = useGame((s) => s.toggleRecording);
  const stopAudio         = useGame((s) => s.stopAudio);
  const speakCurrentSuspect = useGame((s) => s.speakCurrentSuspect);
  const speakDialogue     = useGame((s) => s.speakDialogue);
  const currentLanguage   = useGame((s) => s.currentLanguage);
  const setCurrentLanguage = useGame((s) => s.setCurrentLanguage);
  const suspectVoiceMap   = useGame((s) => s.suspectVoiceMap);
  const isSolved          = useGame((s) => s.isSolved);
  const isFailed          = useGame((s) => s.isFailed);

  const [textInput, setTextInput] = useState("");
  const dialogueEndRef = useRef(null);
  const currentSuspect = suspects[selectedSuspect] || suspects.raju;
  const stressLevel = suspectStress[selectedSuspect] || 30;
  const voiceConfig = suspectVoiceMap[selectedSuspect] || suspectVoiceMap.raju;
  const isGameOver = isSolved || isFailed;

  // Auto scroll transcript to latest entry
  useEffect(() => {
    if (dialogueEndRef.current) {
      dialogueEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dialogueHistory, isSpeaking]);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    askTextQuestion(textInput);
    setTextInput("");
  };

  return (
    <div className="interrogation-room">
      {/* SUSPECT SELECTOR TABS */}
      <div className="suspect-ribbon">
        <div className="ribbon-label">SUSPECTS IN AUDITORIUM:</div>
        <div className="suspect-pill-row">
          {Object.values(suspects).map((s) => {
            const isSelected = s.id === selectedSuspect;
            const stress = suspectStress[s.id] || 25;
            return (
              <button
                key={s.id}
                className={`suspect-pill-btn ${isSelected ? "selected" : ""}`}
                onClick={() => selectSuspect(s.id)}
              >
                <span className="pill-dot" style={{ backgroundColor: s.color }} />
                <span className="pill-name">{s.name}</span>
                <span className="pill-role">{s.role}</span>
                <span className={`pill-stress-tag ${stress > 60 ? "high" : ""}`}>
                  {stress}% Stress
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN INTERROGATION GRID */}
      <div className="interrogation-main-grid">
        {/* LEFT: SUSPECT DOSSIER & PROFILE */}
        <div className="suspect-profile-card">
          <div className="profile-badge-row">
            <span className="suspect-status-tag">{currentSuspect.status}</span>
            <span className="voice-badge">{currentSuspect.age} yrs • Rex Auditorium</span>
          </div>

          {/* SUSPECT PORTRAIT */}
          <div
            className={`suspect-portrait-frame ${isSpeaking ? "speaking-glow" : ""}`}
            style={{ borderColor: currentSuspect.color }}
          >
            <div className="portrait-inner-avatar">
              <span className="portrait-silhouette-icon"><UiIcon name="user" /></span>
              <span className="portrait-monogram">{currentSuspect.name.slice(0, 2).toUpperCase()}</span>
            </div>

            {/* SPEAKING SOUNDWAVE OVERLAY */}
            {isSpeaking && (
              <div className="speaking-wave-overlay">
                <span className="wave-bar w1" />
                <span className="wave-bar w2" />
                <span className="wave-bar w3" />
                <span className="wave-bar w4" />
                <span className="wave-bar w5" />
              </div>
            )}
          </div>

          <h2 className="suspect-fullname">{currentSuspect.name}</h2>
          <div className="suspect-details">
            <div className="detail-item">
              <span className="detail-label">Role:</span>
              <span className="detail-val">{currentSuspect.role} ({currentSuspect.age} yrs)</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Initial Motive:</span>
              <span className="detail-val">{currentSuspect.initialMotive}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Claimed Alibi:</span>
              <span className="detail-val">{currentSuspect.alibi}</span>
            </div>
          </div>

          {/* SPEAK STATEMENT TRIGGER */}
          <div className="suspect-speech-control-bar">
            <button
              type="button"
              className="suspect-speak-trigger-btn"
              onClick={speakCurrentSuspect}
              disabled={isSpeaking || isRecording || isProcessing}
              title={`Hear ${currentSuspect.name} speak their statement`}
            >
              {isSpeaking ? <><UiIcon name="sound" /> Speaking Statement...</> : <><UiIcon name="sound" /> Hear {currentSuspect.name.split(" ")[0]}'s Statement</>}
            </button>
          </div>

          {/* STRESS / NERVOUSNESS METER */}
          <div className="stress-meter-section">
            <div className="stress-header">
              <span>SUSPECT DEMEANOR:</span>
              <strong className={stressLevel > 65 ? "text-danger" : "text-amber"}>
                {stressLevel > 75 ? "PANICKED / CONTRADICTORY" : stressLevel > 50 ? "EVASIVE & NERVOUS" : "GUARDED / CALM"} ({stressLevel}%)
              </strong>
            </div>
            <div className="stress-bar-track">
              <div
                className="stress-bar-fill"
                style={{
                  width: `${stressLevel}%`,
                  backgroundColor: stressLevel > 70 ? "#ba2c2c" : stressLevel > 45 ? "#3772f1" : "#10b981"
                }}
              />
            </div>
          </div>

          {/* PHASE 4: TRUTH GATES & LIVE TRUST */}
          <TruthGateIndicator />
        </div>

        {/* RIGHT: INTERROGATION TRANSCRIPT & CONTROLS */}
        <div className="interrogation-dialogue-column">
          {/* DIALOGUE TRANSCRIPT FEED */}
          <div className="transcript-box">
            <div className="transcript-header-bar">
              <div className="transcript-title">REX TALKIES RECORDED TESTIMONY</div>
              <div className="transcript-actions-group">
                <button
                  type="button"
                  className="play-current-speech-btn"
                  onClick={speakCurrentSuspect}
                  disabled={isSpeaking || isRecording || isProcessing}
                  title={`Speak ${currentSuspect.name}'s current statement`}
                >
                  <UiIcon name="sound" /> Play Voice
                </button>
                {isSpeaking && (
                  <button className="stop-audio-btn" onClick={stopAudio} title="Interrupt suspect voice">
                    <UiIcon name="stop" /> Stop
                  </button>
                )}
              </div>
            </div>

            <div className="transcript-scroll-area">
              {dialogueHistory.map((item) => (
                <div key={item.id} className={`dialogue-bubble ${item.type}`}>
                  <div className="bubble-meta">
                    <span className="bubble-speaker">{item.speaker}</span>
                    <span className="bubble-time">{item.time}</span>
                  </div>
                  <div className="bubble-text">{item.text}</div>
                  {item.type === "suspect" && (
                    <div className="bubble-audio-action">
                      <button
                        type="button"
                        className="audio-replay-btn"
                        onClick={() => speakDialogue(item.text, item.suspectId || selectedSuspect)}
                        title="Replay this response with suspect's custom voice"
                      >
                        <UiIcon name="sound" /> Listen
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div ref={dialogueEndRef} />
            </div>
          </div>

          {/* HINT CARDS & SCORING BAR — Phase 1 */}
          <HintCards />

          {/* LIVE VOICE STATUS BAR */}
          <div className="pipeline-live-status-bar">
            {isRecording ? (
              <div className="status-live recording">
                <span className="pulse-rec-icon" />
                <strong>MIC RECORDING:</strong> Speak your question clearly... (Click Mic to Finish)
              </div>
            ) : isProcessing ? (
              <div className="status-live processing">
                <span className="spinner-icon">⏳</span>
                <strong>TRANSCRIBING:</strong> Processing detective voice query...
              </div>
            ) : isSpeaking ? (
              <div className="status-live speaking">
                <span className="speaker-icon"><UiIcon name="sound" /></span>
                <strong>SPEAKING:</strong> {currentSuspect.name} is responding...
              </div>
            ) : (
              <div className="status-live idle">
                <span><UiIcon name="mic" /> Push-to-Talk or select a cross-examination question below</span>
                <span className="lang-pill">{currentLanguage === "en-IN" ? "English (India)" : "Hindi"}</span>
              </div>
            )}
          </div>

          {/* QUICK CROSS-EXAMINATION TOPIC CHIPS */}
          {currentSuspect.topics && currentSuspect.topics.length > 0 && (
            <div className="quick-topics-row">
              <span className="topics-heading">Cross-Examine:</span>
              {currentSuspect.topics.map((t) => (
                <button
                  key={t.id}
                  className="quick-topic-chip"
                  onClick={() => askTopicQuestion(t)}
                  disabled={isRecording || isProcessing}
                >
                  <UiIcon name="question" /> {t.title}
                </button>
              ))}
            </div>
          )}

          {/* BOTTOM INTERROGATION DOCK: PUSH-TO-TALK & TEXT BAR */}
          <div className="interrogation-dock">
            {/* BIG PUSH-TO-TALK MIC BUTTON */}
            <div className="mic-action-cluster">
              <button
                className={`gnani-mic-trigger-btn ${isRecording ? "is-recording" : ""}`}
                onClick={toggleRecording}
                disabled={isProcessing || isGameOver}
                title="Click to toggle Voice Interrogation via Gnani STT"
              >
                <div className="mic-halo-ring" />
                <span className="mic-core-icon"><UiIcon name={isRecording ? "stop" : "mic"} /></span>
              </button>
              <div className="mic-label-under">
                <span className="mic-primary-text">
                  {isRecording ? "CLICK TO FINISH" : "PUSH TO TALK"}
                </span>
                <span className="mic-sub-text">Voice Interrogation</span>
              </div>
            </div>

            {/* TEXT QUESTION INPUT */}
            <form className="text-query-form" onSubmit={handleTextSubmit}>
              <input
                type="text"
                className="query-input-field"
                placeholder={isGameOver ? "Case concluded." : `Ask ${currentSuspect.name} anything about the 8:45 PM blackout, keys, or Harbans...`}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                disabled={isRecording || isProcessing || isGameOver}
              />
              <button
                type="submit"
                className="query-submit-btn"
                disabled={!textInput.trim() || isRecording || isProcessing || isGameOver}
              >
                Interrogate <UiIcon name="arrow" />
              </button>
            </form>

            {/* LANGUAGE SELECTOR */}
            <div className="lang-toggle-box">
              <button
                type="button"
                className={`lang-btn ${currentLanguage === "en-IN" ? "active" : ""}`}
                onClick={() => setCurrentLanguage("en-IN")}
              >
                EN-IN
              </button>
              <button
                type="button"
                className={`lang-btn ${currentLanguage === "hi-IN" ? "active" : ""}`}
                onClick={() => setCurrentLanguage("hi-IN")}
              >
                HI-IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
