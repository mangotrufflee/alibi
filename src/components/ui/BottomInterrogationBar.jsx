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

  // Deterministic Interrogation & Evidence Challenge State
  const evidenceItems = useGame((s) => s.evidenceItems) || [];
  const presentEvidenceToSuspect = useGame((s) => s.presentEvidenceToSuspect);
  const showStorylinePivotModal = useGame((s) => s.showStorylinePivotModal);
  const lockStoryline = useGame((s) => s.lockStoryline);
  const dismissPivotModal = useGame((s) => s.dismissPivotModal);
  const accusationEligible = useGame((s) => s.accusationEligible);
  const makeAccusation = useGame((s) => s.makeAccusation);
  const stressBandNotification = useGame((s) => s.stressBandNotification);

  const [textInput, setTextInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isEvidencePickerOpen, setIsEvidencePickerOpen] = useState(false);
  const [showAccusationConfirm, setShowAccusationConfirm] = useState(false);

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

  const handlePresentEvidence = (evidenceId) => {
    setIsEvidencePickerOpen(false);
    presentEvidenceToSuspect(evidenceId);
  };

  const handleConfirmAccusation = () => {
    setShowAccusationConfirm(false);
    makeAccusation(selectedSuspect);
  };

  return (
    <>
      {/* ── STORYLINE PIVOT MODAL (EMERGENT CHOICE POINT) ────────────────── */}
      {showStorylinePivotModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(5, 6, 10, 0.88)",
          backdropFilter: "blur(6px)",
          padding: "1rem"
        }}>
          <div style={{
            background: "#0a0d14",
            border: "1px solid #1f61ef",
            borderRadius: "12px",
            maxWidth: "520px",
            width: "100%",
            padding: "1.75rem",
            color: "#f8fafc",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(31, 97, 239, 0.2)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#3772f1", fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              <span>⚡ CRITICAL INTERROGATION PIVOT</span>
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.75rem", color: "#ffffff" }}>
              Who Arranged the Breach at Rex Talkies?
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Raju Ansari admitted taking cash from someone in an embroidered saree who walked with clicking heels to leave the rear staff door unlatched. Based on your cross-examination, which theory of the crime will you pursue?
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
              <button
                type="button"
                onClick={() => lockStoryline("A")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #23252f",
                  background: "#121622",
                  color: "#ffffff",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>Meera Kapoor</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>The Sale Must Survive • Concealed archive prints</div>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#3772f1", fontFamily: "monospace" }}>Route A ➔</span>
              </button>

              <button
                type="button"
                onClick={() => lockStoryline("B")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #23252f",
                  background: "#121622",
                  color: "#ffffff",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>Dr. Arvind Sethi</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>The Film That Would Not Die • Erased sister's print</div>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#3772f1", fontFamily: "monospace" }}>Route B ➔</span>
              </button>

              <button
                type="button"
                onClick={() => lockStoryline("C")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #23252f",
                  background: "#121622",
                  color: "#ffffff",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>Nusrat Ali</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>The Missing Minute • 58-second recording gap</div>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#3772f1", fontFamily: "monospace" }}>Route C ➔</span>
              </button>
            </div>

            <button
              type="button"
              onClick={dismissPivotModal}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                color: "#64748b",
                fontSize: "0.75rem",
                cursor: "pointer",
                padding: "0.5rem"
              }}
            >
              Examine more evidence before deciding
            </button>
          </div>
        </div>
      )}

      {/* ── ACCUSATION CONFIRMATION MODAL ─────────────────────────────────── */}
      {showAccusationConfirm && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(5, 6, 10, 0.88)",
          backdropFilter: "blur(6px)",
          padding: "1rem"
        }}>
          <div style={{
            background: "#0a0d14",
            border: "1px solid #dc2626",
            borderRadius: "12px",
            maxWidth: "460px",
            width: "100%",
            padding: "1.75rem",
            color: "#f8fafc",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(220, 38, 38, 0.3)"
          }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#fca5a5" }}>
              Confirm Final Accusation
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.5, margin: "0 0 1.25rem" }}>
              Are you prepared to formally accuse <strong>{currentSuspect.name}</strong> ({currentSuspect.role}) of the murder of Harbans Lal? An unsupported accusation will penalize your prosecution credibility.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setShowAccusationConfirm(false)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "6px",
                  border: "1px solid #23252f",
                  background: "transparent",
                  color: "#cbd5e1",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAccusation}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "6px",
                  border: "none",
                  background: "#dc2626",
                  color: "#ffffff",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Indict {currentSuspect.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN INTERROGATION BAR ────────────────────────────────────────── */}
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
            {accusationEligible && (
              <span style={{
                background: "#1f61ef",
                color: "#ffffff",
                padding: "0.15rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                marginLeft: "0.5rem",
                animation: "pulse 2s infinite"
              }}>
                ⚖️ ACCUSATION READY
              </span>
            )}
          </div>

          <div className="strip-right">
            {accusationEligible && !isGameOver && (
              <button
                type="button"
                onClick={() => setShowAccusationConfirm(true)}
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  padding: "0.35rem 0.8rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  marginRight: "0.5rem"
                }}
                title={`Formally accuse ${currentSuspect.name}`}
              >
                ⚖️ Accuse {currentSuspect.name}
              </button>
            )}

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
                      {stressLevel}% {stressLevel > 75 ? "Panicked" : stressLevel > 55 ? "Evasive" : stressLevel > 30 ? "Guarded" : "Calm"}
                    </strong>
                  </div>
                  <div className="bottom-stress-track">
                    <div
                      className="bottom-stress-fill"
                      style={{
                        width: `${stressLevel}%`,
                        backgroundColor:
                          stressLevel > 75 ? "#ba2c2c" : stressLevel > 55 ? "#f59e0b" : stressLevel > 30 ? "#3772f1" : "#10b981"
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
              {/* STRESS BAND REACTION BANNER */}
              {stressBandNotification && (
                <div style={{
                  background: "rgba(31, 97, 239, 0.15)",
                  border: "1px solid rgba(55, 114, 241, 0.4)",
                  color: "#93c5fd",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  marginBottom: "0.4rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}>
                  <span>⚠️</span>
                  <span><strong>[Demeanor Shift]:</strong> {stressBandNotification.reaction}</span>
                </div>
              )}

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

              {/* EVIDENCE PICKER DROPDOWN */}
              {isEvidencePickerOpen && (
                <div style={{
                  background: "#0c101a",
                  border: "1px solid #1f61ef",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                  maxHeight: "160px",
                  overflowY: "auto"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3772f1", textTransform: "uppercase" }}>
                      Select Evidence to Challenge {currentSuspect.name}:
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEvidencePickerOpen(false)}
                      style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "0.8rem" }}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {evidenceItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handlePresentEvidence(item.id)}
                        style={{
                          background: "#161c2e",
                          border: "1px solid #23252f",
                          borderRadius: "4px",
                          padding: "0.35rem 0.65rem",
                          color: "#e2e8f0",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          transition: "all 0.15s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#1f61ef";
                          e.currentTarget.style.background = "#1e293b";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#23252f";
                          e.currentTarget.style.background = "#161c2e";
                        }}
                      >
                        📁 {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* INTERROGATION ACTION DOCK: MIC + TEXT INPUT + EVIDENCE BTN + LANGUAGE */}
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

                {/* PRESENT EVIDENCE BUTTON */}
                <button
                  type="button"
                  onClick={() => setIsEvidencePickerOpen(!isEvidencePickerOpen)}
                  disabled={isRecording || isProcessing || isGameOver}
                  style={{
                    background: isEvidencePickerOpen ? "#1f61ef" : "#121622",
                    border: "1px solid #23252f",
                    borderRadius: "6px",
                    color: "#ffffff",
                    padding: "0.5rem 0.85rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    whiteSpace: "nowrap"
                  }}
                  title={`Present physical evidence to ${currentSuspect.name}`}
                >
                  📁 Present Evidence
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
                    🎙️ Push-to-Talk, select a topic, or Present Evidence to cross-examine
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </footer>
    </>
  );
}
