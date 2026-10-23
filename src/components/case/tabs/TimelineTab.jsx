// src/components/case/tabs/TimelineTab.jsx
// ALIBI — Phase 2: Minute-by-Minute Master Timeline & Contradiction Clashes (GDD §7, §8)

import React, { useState } from "react";
import { useGame } from "../../../state/GameContext";
import { MASTER_TIMELINE, SUSPECT_CLAIMS, CONTRADICTIONS } from "../../../data/caseTabsData";
import { suspects } from "../../../data/suspects";

export default function TimelineTab() {
  const { selectSuspect, setActiveTab } = useGame();
  const [viewMode, setViewMode] = useState("master"); // "master" | "claims" | "clashes"
  const [selectedSuspectFilter, setSelectedSuspectFilter] = useState("all");

  const handleJumpToSuspect = (suspectId) => {
    selectSuspect(suspectId);
    setActiveTab("interrogation");
  };

  return (
    <div className="tab-pane timeline-pane">
      {/* TIMELINE TOOLBAR */}
      <div className="pane-toolbar">
        <div className="filter-pill-group">
          <button
            className={`filter-pill-btn ${viewMode === "master" ? "active" : ""}`}
            onClick={() => setViewMode("master")}
          >
            ⏱️ Master Clock ({MASTER_TIMELINE.length} Events)
          </button>
          <button
            className={`filter-pill-btn ${viewMode === "claims" ? "active" : ""}`}
            onClick={() => setViewMode("claims")}
          >
            🗣️ Suspect Alibi Claims
          </button>
          <button
            className={`filter-pill-btn ${viewMode === "clashes" ? "active" : ""}`}
            onClick={() => setViewMode("clashes")}
          >
            ⚠️ Flagged Contradictions ({CONTRADICTIONS.length})
          </button>
        </div>

        {viewMode === "claims" && (
          <div className="suspect-filter-subgroup">
            <select
              className="suspect-select-dropdown"
              value={selectedSuspectFilter}
              onChange={(e) => setSelectedSuspectFilter(e.target.value)}
            >
              <option value="all">All Suspect Claims</option>
              {Object.entries(suspects).map(([id, s]) => (
                <option key={id} value={id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* VIEW 1: MASTER VERIFIED TIMELINE */}
      {viewMode === "master" && (
        <div className="timeline-track-container">
          <div className="timeline-spine-line" />

          <div className="timeline-nodes-list">
            {MASTER_TIMELINE.map((item, idx) => {
              const isCritical = item.category === "critical";

              return (
                <div
                  key={idx}
                  className={`timeline-node-card ${isCritical ? "node-critical" : ""}`}
                >
                  <div className="node-time-badge">
                    <span>{item.time}</span>
                  </div>

                  <div className="node-marker-dot" />

                  <div className="node-content-card">
                    <div className="node-top">
                      <span className="node-category-tag">{item.category.toUpperCase()}</span>
                      {item.verified && (
                        <span className="node-verified-tag">✔ FORENSICALLY VERIFIED</span>
                      )}
                    </div>
                    <h4 className="node-title">{item.title}</h4>
                    <p className="node-desc">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: SUSPECT CLAIMS */}
      {viewMode === "claims" && (
        <div className="suspect-claims-grid">
          {Object.entries(SUSPECT_CLAIMS).map(([suspectId, claims]) => {
            if (
              selectedSuspectFilter !== "all" &&
              selectedSuspectFilter !== suspectId
            ) {
              return null;
            }

            const suspect = suspects[suspectId];

            return (
              <div key={suspectId} className="suspect-claim-card">
                <div className="claim-card-header">
                  <div className="suspect-heading">
                    <span className="claim-avatar">
                      {suspectId === "raju" && "🧢"}
                      {suspectId === "meera" && "💍"}
                      {suspectId === "arvind" && "👓"}
                      {suspectId === "nusrat" && "🎙️"}
                      {suspectId === "bhola" && "☕"}
                    </span>
                    <div>
                      <h3 className="claim-suspect-name">{suspect.name}</h3>
                      <span className="claim-suspect-role">{suspect.role}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="challenge-alibi-btn"
                    onClick={() => handleJumpToSuspect(suspectId)}
                  >
                    Challenge Alibi ➔
                  </button>
                </div>

                <div className="claims-chronology-list">
                  {claims.map((c, i) => (
                    <div key={i} className="claim-timeline-row">
                      <span className="claim-timestamp">{c.time}</span>
                      <p className="claim-statement-text">"{c.claim}"</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: CONTRADICTIONS & CLASHES */}
      {viewMode === "clashes" && (
        <div className="contradictions-list-container">
          <div className="clashes-header-note">
            <span>
              Direct discrepancies identified between witness testimonies and physical evidence. Interrogate these vulnerabilities to extract confessions.
            </span>
          </div>

          <div className="contradiction-cards-grid">
            {CONTRADICTIONS.map((c) => {
              const suspA = suspects[c.suspectA] || { name: c.suspectA };

              return (
                <div key={c.id} className="contradiction-clash-card">
                  <div className="clash-card-top">
                    <span className="clash-badge">⚠️ CONTRADICTION DETECTED</span>
                    <h3 className="clash-title">{c.title}</h3>
                  </div>

                  <div className="clash-comparison-block">
                    <div className="side-card witness-side">
                      <span className="side-label">CLAIM // {suspA.name.toUpperCase()}</span>
                      <p className="side-quote">"{c.claimA}"</p>
                    </div>

                    <div className="clash-vs-divider">VS</div>

                    <div className="side-card evidence-side">
                      <span className="side-label">CORROBORATING FORENSIC RECORD</span>
                      <p className="side-quote">"{c.claimB}"</p>
                    </div>
                  </div>

                  <div className="clash-footer">
                    <button
                      type="button"
                      className="confront-contradiction-btn"
                      onClick={() => handleJumpToSuspect(c.suspectA)}
                    >
                      Confront {suspA.name} with Contradiction ➔
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
