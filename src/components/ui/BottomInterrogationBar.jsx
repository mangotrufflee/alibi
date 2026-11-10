// src/components/ui/BottomInterrogationBar.jsx
// Floating Interrogation Console — appears only when a suspect is chosen
// Contains complete testimony text, voice input, type input, voice listen button,
// and CrossExamineTopics component rendered below the input box.

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";
import CrossExamineTopics from "./CrossExamineTopics";

export default function BottomInterrogationBar() {
  const selectedSuspect = useGame((s) => s.selectedSuspect);
  const selectSuspect = useGame((s) => s.selectSuspect);
  const currentDialogue = useGame((s) => s.currentDialogue);
  const dialogueHistory = useGame((s) => s.dialogueHistory);
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

  // Storyline Pivot & Accusation State
  const showStorylinePivotModal = useGame((s) => s.showStorylinePivotModal);
  const lockStoryline = useGame((s) => s.lockStoryline);
  const dismissPivotModal = useGame((s) => s.dismissPivotModal);
  const accusationEligible = useGame((s) => s.accusationEligible);
  const makeAccusation = useGame((s) => s.makeAccusation);
  const stressBandNotification = useGame((s) => s.stressBandNotification);

  const [textInput, setTextInput] = useState("");
  const [showAccusationConfirm, setShowAccusationConfirm] = useState(false);

  // FLOATING BAR APPEARS ONLY WHEN A SUSPECT IS CHOSEN
  if (!selectedSuspect) {
    return null;
  }

  const currentSuspect = suspects[selectedSuspect] || suspects.raju;
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

      {/* ── FLOATING INTERROGATION CONSOLE (APPEARS ONLY WHEN SUSPECT IS CHOSEN) ── */}
      <AnimatePresence>
        <motion.div
          key={selectedSuspect}
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.97 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="floating-bottom-bar"
          style={{
            position: "fixed",
            bottom: "12px",
            left: 0,
            right: 0,
            margin: "0 auto",
            width: "min(1200px, calc(100vw - 120px))",
            maxWidth: "1200px",
            background: "rgba(9, 13, 20, 0.94)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(31, 97, 239, 0.4)",
            borderRadius: "12px",
            boxShadow: "0 16px 45px rgba(0, 0, 0, 0.88), 0 0 30px rgba(31, 97, 239, 0.18)",
            padding: "0.42rem 1.1rem 0.45rem 1.1rem",
            zIndex: 40,
            color: "#f8fafc",
            display: "flex",
            flexDirection: "column",
            gap: "0.26rem",
            pointerEvents: "auto"
          }}
          aria-label="Floating Interrogation Console"
        >
          {/* BAR HEADER STRIP: TARGET SUSPECT + VOICE LISTEN BUTTON + CLOSE BTN */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "0.22rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: "0.72rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span style={{
                color: currentSuspect.color,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem"
              }}>
                <span>●</span>
                <span>INTERROGATING: {currentSuspect.name.toUpperCase()}</span>
              </span>

              {accusationEligible && !isGameOver && (
                <button
                  type="button"
                  onClick={() => setShowAccusationConfirm(true)}
                  style={{
                    background: "#dc2626",
                    color: "#ffffff",
                    border: "none",
                    padding: "0.15rem 0.55rem",
                    borderRadius: "4px",
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    animation: "pulse 2s infinite"
                  }}
                  title={`Formally accuse ${currentSuspect.name}`}
                >
                  ⚖️ ACCUSE SUSPECT
                </button>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              {/* VOICE LISTEN / STOP BUTTON */}
              <button
                type="button"
                onClick={isSpeaking ? stopAudio : speakCurrentSuspect}
                disabled={isRecording || isProcessing}
                style={{
                  background: isSpeaking ? "rgba(220, 38, 38, 0.2)" : "rgba(31, 97, 239, 0.15)",
                  border: `1px solid ${isSpeaking ? "#dc2626" : "rgba(55, 114, 241, 0.4)"}`,
                  color: isSpeaking ? "#fca5a5" : "#93c5fd",
                  padding: "0.16rem 0.5rem",
                  borderRadius: "5px",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
                title={isSpeaking ? "Stop Voice Playback" : `Listen to ${currentSuspect.name} speak`}
              >
                <span>{isSpeaking ? "⏹" : "🔊"}</span>
                <span>{isSpeaking ? "Stop Voice" : "Listen (Voice)"}</span>
                {isSpeaking && (
                  <span className="speaking-wave-mini" style={{ position: "relative", top: 0 }}>
                    <span className="sw-bar b1" />
                    <span className="sw-bar b2" />
                    <span className="sw-bar b3" />
                  </span>
                )}
              </button>

              {/* UNSELECT / CLOSE BAR BUTTON */}
              <button
                type="button"
                onClick={() => selectSuspect(null)}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#94a3b8",
                  padding: "0.16rem 0.45rem",
                  borderRadius: "5px",
                  fontSize: "0.68rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem"
                }}
                title="Unfocus suspect and return to 3D theatre view"
              >
                <span>✕</span>
                <span>Unfocus</span>
              </button>
            </div>
          </div>

          {/* DEMEANOR SHIFT ALERT IF ACTIVE */}
          {stressBandNotification && (
            <div style={{
              background: "rgba(31, 97, 239, 0.15)",
              border: "1px solid rgba(55, 114, 241, 0.4)",
              color: "#93c5fd",
              padding: "0.15rem 0.55rem",
              borderRadius: "5px",
              fontSize: "0.68rem",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem"
            }}>
              <span>⚠️</span>
              <span><strong>[Demeanor Reaction]:</strong> {stressBandNotification.reaction}</span>
            </div>
          )}

          {/* CURRENT TESTIMONY (FULLY VISIBLE — COMPACT SLEEK DISPLAY) */}
          <div style={{
            background: "rgba(18, 24, 38, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "7px",
            padding: "0.3rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.15rem"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.64rem",
              fontFamily: "monospace",
              color: "#94a3b8",
              letterSpacing: "0.05em"
            }}>
              <span style={{ color: "#3772f1", fontWeight: 700 }}>
                RECORDED TESTIMONY // {currentSuspect.name.toUpperCase()}
              </span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>

            {/* FULL TESTIMONY TEXT — NO MAX-HEIGHT TRUNCATION, ALL WORDS VISIBLE */}
            <p style={{
              margin: 0,
              fontSize: "0.82rem",
              lineHeight: 1.35,
              color: "#f8fafc",
              fontStyle: "italic",
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflow: "visible"
            }}>
              "{statementText}"
            </p>
          </div>

          {/* INTERROGATION INPUT ROW: VOICE PUSH-TO-TALK + TEXT INPUT + LANGUAGE */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}>
            {/* PUSH-TO-TALK MIC BUTTON */}
            <button
              type="button"
              className={`bottom-mic-btn ${isRecording ? "recording" : ""}`}
              onClick={toggleRecording}
              disabled={isProcessing || isGameOver}
              style={{
                flexShrink: 0,
                minWidth: "125px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.35rem",
                borderRadius: "6px",
                padding: "0 0.65rem",
                background: isRecording ? "#dc2626" : "rgba(31, 97, 239, 0.2)",
                border: `1px solid ${isRecording ? "#ef4444" : "#1f61ef"}`,
                color: "#ffffff",
                cursor: isGameOver ? "not-allowed" : "pointer",
                fontWeight: 600,
                fontSize: "0.72rem"
              }}
              title="Voice Interrogation via Gnani STT (Push to talk / click to finish)"
            >
              <span style={{ fontSize: "0.9rem" }}>{isRecording ? "⏹" : "🎙️"}</span>
              <span>{isRecording ? "CLICK TO FINISH" : "PUSH TO TALK"}</span>
            </button>

            {/* TEXT QUERY FORM */}
            <form onSubmit={handleTextSubmit} style={{ flex: 1, display: "flex", gap: "0.4rem" }}>
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={
                  isGameOver
                    ? "Case concluded."
                    : `Ask ${currentSuspect.name} about 9:17 PM blackout, key, bell, alibi...`
                }
                disabled={isRecording || isProcessing || isGameOver}
                style={{
                  flex: 1,
                  height: "32px",
                  background: "rgba(14, 18, 28, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "6px",
                  padding: "0 0.65rem",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  outline: "none"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1f61ef")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
              />
              <button
                type="submit"
                disabled={!textInput.trim() || isRecording || isProcessing || isGameOver}
                style={{
                  height: "32px",
                  padding: "0 0.85rem",
                  background: textInput.trim() ? "#1f61ef" : "rgba(31, 97, 239, 0.3)",
                  border: "none",
                  borderRadius: "6px",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  cursor: textInput.trim() && !isRecording && !isProcessing ? "pointer" : "not-allowed",
                  whiteSpace: "nowrap"
                }}
              >
                Interrogate ➔
              </button>
            </form>

            {/* LANGUAGE TOGGLE */}
            <div style={{
              display: "flex",
              borderRadius: "6px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              height: "32px",
              flexShrink: 0
            }}>
              <button
                type="button"
                onClick={() => setCurrentLanguage("en-IN")}
                style={{
                  background: currentLanguage === "en-IN" ? "#1f61ef" : "transparent",
                  color: currentLanguage === "en-IN" ? "#ffffff" : "#64748b",
                  border: "none",
                  padding: "0.2rem 0.45rem",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setCurrentLanguage("hi-IN")}
                style={{
                  background: currentLanguage === "hi-IN" ? "#1f61ef" : "transparent",
                  color: currentLanguage === "hi-IN" ? "#ffffff" : "#64748b",
                  border: "none",
                  padding: "0.2rem 0.45rem",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                HI
              </button>
            </div>
          </div>

          {/* ── CROSS-EXAMINATION SECTION (SEPARATE COMPONENT BELOW INPUT BOX) ── */}
          <CrossExamineTopics suspectId={selectedSuspect} />

          {/* LIVE STATUS BAR */}
          <div style={{
            fontSize: "0.66rem",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            marginTop: "0.05rem"
          }}>
            {isRecording ? (
              <span style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span className="pulse-rec-dot" /> <strong>RECORDING:</strong> Speak clearly into microphone...
              </span>
            ) : isProcessing ? (
              <span style={{ color: "#38bdf8" }}>
                ⏳ <strong>TRANSCRIBING:</strong> Processing speech query via Gnani STT...
              </span>
            ) : isSpeaking ? (
              <span style={{ color: "#3772f1" }}>
                🔊 <strong>SPEAKING:</strong> {currentSuspect.name} is giving their statement...
              </span>
            ) : (
              <span>
                🎙️ Push-to-Talk, type question, or click cross-examine topics above
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
