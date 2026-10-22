// src/components/evidence/EvidenceBoard.jsx
import React from "react";
import { useGame } from "../../state/GameContext";

export default function EvidenceBoard() {
  const { evidenceItems, selectedEvidence, setSelectedEvidence } = useGame();

  return (
    <div className="evidence-board-container">
      <div className="evidence-sidebar">
        <h3 className="evidence-heading">FORENSIC EVIDENCE ({evidenceItems.length})</h3>
        <div className="evidence-list-scroll">
          {evidenceItems.map((item) => {
            const isSelected = selectedEvidence && selectedEvidence.id === item.id;
            return (
              <button
                key={item.id}
                className={`evidence-nav-item ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedEvidence(item)}
              >
                <div className="item-name">{item.name}</div>
                <div className="item-meta">
                  <span className="item-cat">{item.category}</span>
                  <span className="item-loc">{item.location}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="evidence-detail-view">
        {selectedEvidence ? (
          <div className="evidence-card-detailed">
            <div className="card-top-tag">{selectedEvidence.category.toUpperCase()}</div>
            <h2 className="evidence-title">{selectedEvidence.name}</h2>
            <div className="location-pill">📍 Location: {selectedEvidence.location}</div>

            <div className="evidence-description-box">
              <h4>Item Overview:</h4>
              <p>{selectedEvidence.description}</p>
            </div>

            <div className="evidence-clue-highlight">
              <span className="clue-icon">🔎</span>
              <div className="clue-content">
                <strong>Investigative Significance:</strong>
                <p>{selectedEvidence.clue}</p>
              </div>
            </div>

            <div className="inspection-forensics-box">
              <h4>Forensic Examination Log:</h4>
              <ul>
                {selectedEvidence.inspectionDetails?.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="empty-evidence">Select an evidence item from the list to examine.</div>
        )}
      </div>
    </div>
  );
}
