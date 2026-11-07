// src/components/ui/TranscriptDrawer.jsx
import React, { useRef, useEffect } from "react";
import { useGame } from "../../state/GameContext";

export default function TranscriptDrawer() {
  const isTranscriptOpen = useGame((s) => s.isTranscriptOpen);
  const setIsTranscriptOpen = useGame((s) => s.setIsTranscriptOpen);
  const dialogueHistory = useGame((s) => s.dialogueHistory);
  const speakDialogue = useGame((s) => s.speakDialogue);
  const isSpeaking = useGame((s) => s.isSpeaking);
  const stopAudio = useGame((s) => s.stopAudio);
  const selectedSuspect = useGame((s) => s.selectedSuspect);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (isTranscriptOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isTranscriptOpen, dialogueHistory]);

  if (!isTranscriptOpen) return null;

  return (
    <div className="transcript-drawer-overlay" onClick={() => setIsTranscriptOpen(false)}>
      <div className="transcript-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* DRAWER HEADER */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span className="drawer-icon">📜</span>
            <div className="drawer-title-text">
              <h2>REX TALKIES RECORDED TESTIMONY</h2>
              <span className="drawer-subtitle">
                Official Detective Log • {dialogueHistory.length} Statements Recorded
              </span>
            </div>
          </div>

          <div className="drawer-actions">
            {isSpeaking && (
              <button
                type="button"
                className="stop-audio-btn"
                onClick={stopAudio}
                title="Interrupt audio playback"
              >
                ⏹ Stop Voice
              </button>
            )}
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setIsTranscriptOpen(false)}
              title="Close Transcript Drawer"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* DRAWER SCROLL CONTENT */}
        <div className="drawer-scroll-body" ref={scrollRef}>
          {dialogueHistory.length === 0 ? (
            <div className="drawer-empty-msg">No recorded testimony yet.</div>
          ) : (
            dialogueHistory.map((item) => (
              <div key={item.id} className={`drawer-bubble ${item.type}`}>
                <div className="drawer-bubble-header">
                  <span className="drawer-bubble-speaker">{item.speaker}</span>
                  <span className="drawer-bubble-time">{item.time}</span>
                </div>
                <div className="drawer-bubble-body">{item.text}</div>
                {item.type === "suspect" && (
                  <div className="drawer-bubble-actions">
                    <button
                      type="button"
                      className="audio-replay-btn"
                      onClick={() => speakDialogue(item.text, item.suspectId || selectedSuspect)}
                      title="Replay this response with custom voice"
                    >
                      🔊 Listen
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

