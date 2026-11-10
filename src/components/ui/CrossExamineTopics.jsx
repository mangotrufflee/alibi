// src/components/ui/CrossExamineTopics.jsx
// Dedicated Cross-Examination & Evidence Presentation Section
// Rendered below the interrogation input box in the floating console

import React, { useState } from "react";
import { useGame } from "../../state/GameContext";
import { UiIcon } from "./UiIcon";
import { suspects } from "../../data/suspects";

export default function CrossExamineTopics({ suspectId }) {
  const currentSuspect = suspects[suspectId] || suspects.raju;
  const askTopicQuestion = useGame((s) => s.askTopicQuestion);
  const askedQuestionIds = useGame((s) => s.askedQuestionIds?.[suspectId]) || [];
  const evidenceItems = useGame((s) => s.evidenceItems) || [];
  const presentEvidenceToSuspect = useGame((s) => s.presentEvidenceToSuspect);
  const isRecording = useGame((s) => s.isRecording);
  const isProcessing = useGame((s) => s.isProcessing);
  const isSolved = useGame((s) => s.isSolved);
  const isFailed = useGame((s) => s.isFailed);

  const [isEvidencePickerOpen, setIsEvidencePickerOpen] = useState(false);
  const isBusy = isRecording || isProcessing || isSolved || isFailed;

  const topics = currentSuspect.topics || [];

  const handleSelectEvidence = (evidenceId) => {
    setIsEvidencePickerOpen(false);
    presentEvidenceToSuspect(evidenceId);
  };

  return (
    <div className="cross-examine-container" style={{
      marginTop: "0.15rem",
      paddingTop: "0.18rem",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      display: "flex",
      flexDirection: "column",
      gap: "0.18rem"
    }}>
      {/* SECTION HEADER & CONTROLS */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          fontSize: "0.66rem",
          fontFamily: "monospace",
          letterSpacing: "0.08em",
          color: "#94a3b8",
          textTransform: "uppercase"
        }}>
          <span style={{ color: "#3772f1" }}>●</span>
          <span>Cross-Examine Lines of Inquiry:</span>
        </div>

        {/* EVIDENCE CHALLENGE TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setIsEvidencePickerOpen(!isEvidencePickerOpen)}
          disabled={isBusy}
          style={{
            background: isEvidencePickerOpen ? "#1f61ef" : "rgba(31, 97, 239, 0.12)",
            border: `1px solid ${isEvidencePickerOpen ? "#3772f1" : "rgba(31, 97, 239, 0.35)"}`,
            borderRadius: "5px",
            color: isEvidencePickerOpen ? "#ffffff" : "#93c5fd",
            padding: "0.18rem 0.55rem",
            fontSize: "0.68rem",
            fontWeight: 600,
            cursor: isBusy ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            transition: "all 0.15s ease"
          }}
          title={`Present physical evidence to ${currentSuspect.name}`}
        >
          <UiIcon name="folder" />
          <span>{isEvidencePickerOpen ? "Hide Exhibits" : "Present Evidence Exhibit"}</span>
        </button>
      </div>

      {/* EVIDENCE EXHIBIT PICKER DRAWER */}
      {isEvidencePickerOpen && (
        <div style={{
          background: "#0c101a",
          border: "1px solid #1f61ef",
          borderRadius: "8px",
          padding: "0.6rem",
          maxHeight: "150px",
          overflowY: "auto",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.4rem"
          }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#3772f1", textTransform: "uppercase" }}>
              Select Exhibit to Confront {currentSuspect.name}:
            </span>
            <button
              type="button"
              onClick={() => setIsEvidencePickerOpen(false)}
              style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "0.75rem" }}
            >
              <UiIcon name="close" />
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {evidenceItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectEvidence(item.id)}
                style={{
                  background: "#161c2e",
                  border: "1px solid #23252f",
                  borderRadius: "5px",
                  padding: "0.3rem 0.55rem",
                  color: "#e2e8f0",
                  fontSize: "0.72rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
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
                <UiIcon name="file" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CROSS-EXAMINE TOPICS CHIPS */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.3rem",
        alignItems: "center"
      }}>
        {topics.map((t) => {
          const isAsked =
            askedQuestionIds.includes(t.id) ||
            askedQuestionIds.includes(`${suspectId}_${t.id}`);

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => askTopicQuestion(t)}
              disabled={isBusy}
              style={{
                background: isAsked ? "rgba(22, 28, 46, 0.6)" : "rgba(18, 22, 34, 0.9)",
                border: `1px solid ${isAsked ? "rgba(55, 114, 241, 0.25)" : "rgba(55, 114, 241, 0.5)"}`,
                borderRadius: "5px",
                color: isAsked ? "#94a3b8" : "#f1f5f9",
                padding: "0.18rem 0.5rem",
                fontSize: "0.68rem",
                cursor: isBusy ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                transition: "all 0.15s ease",
                textAlign: "left"
              }}
              onMouseEnter={(e) => {
                if (!isBusy) {
                  e.currentTarget.style.borderColor = "#1f61ef";
                  e.currentTarget.style.background = "rgba(31, 97, 239, 0.15)";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isBusy) {
                  e.currentTarget.style.borderColor = isAsked ? "rgba(55, 114, 241, 0.25)" : "rgba(55, 114, 241, 0.5)";
                  e.currentTarget.style.background = isAsked ? "rgba(22, 28, 46, 0.6)" : "rgba(18, 22, 34, 0.9)";
                  e.currentTarget.style.color = isAsked ? "#94a3b8" : "#f1f5f9";
                }
              }}
              title={isAsked ? `Already asked: ${t.title}` : `Ask: ${t.title}`}
            >
              <span style={{ color: isAsked ? "#10b981" : "#3772f1" }}>
                <UiIcon name={isAsked ? "check" : "question"} />
              </span>
              <span>{t.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

