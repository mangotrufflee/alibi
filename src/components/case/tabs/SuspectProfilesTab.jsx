// src/components/case/tabs/SuspectProfilesTab.jsx
// ALIBI — Phase 2: Suspect Profiles & Relationship Dossier (GDD §7, §8)

import React, { useState } from "react";
import { useGame } from "../../../state/GameContext";
import { suspects } from "../../../data/suspects";
import { SUSPECT_RELATIONSHIPS } from "../../../data/caseTabsData";

export default function SuspectProfilesTab() {
  const {
    selectedSuspect,
    selectSuspect,
    suspectStress,
    setActiveTab
  } = useGame();

  const [activeProfileId, setActiveProfileId] = useState(selectedSuspect || "raju");

  const suspectData = suspects[activeProfileId] || suspects.raju;
  const stress = suspectStress[activeProfileId] || 30;

  // Derive demeanor qualitative read based on stress
  let demeanorText = "Calm & Composed";
  let demeanorClass = "demeanor-calm";
  if (stress >= 75) {
    demeanorText = "Near Breaking Point";
    demeanorClass = "demeanor-panic";
  } else if (stress >= 50) {
    demeanorText = "Visibly Agitated";
    demeanorClass = "demeanor-agitated";
  } else if (stress >= 35) {
    demeanorText = "Guarded & Deflective";
    demeanorClass = "demeanor-guarded";
  }

  // Filter relationships relating to this suspect
  const relevantRelations = SUSPECT_RELATIONSHIPS.filter(
    (rel) => rel.source === activeProfileId || rel.target === activeProfileId
  );

  const handleStartInterrogation = (suspectId) => {
    selectSuspect(suspectId);
    setActiveTab("interrogation");
  };

  return (
    <div className="tab-pane suspect-profiles-pane">
      {/* SUSPECT SELECTOR ROSTER BAR */}
      <div className="suspects-roster-strip">
        {Object.entries(suspects).map(([id, s]) => {
          const isSelected = id === activeProfileId;
          const sStress = suspectStress[id] || 30;

          return (
            <button
              key={id}
              type="button"
              className={`roster-suspect-card ${isSelected ? "selected" : ""}`}
              onClick={() => setActiveProfileId(id)}
            >
              <div className="roster-avatar-frame">
                <span className="roster-avatar-icon">
                  {id === "raju" && "🧢"}
                  {id === "meera" && "💍"}
                  {id === "arvind" && "👓"}
                  {id === "nusrat" && "🎙️"}
                  {id === "bhola" && "☕"}
                </span>
                <span className="roster-stress-pip" style={{ height: `${sStress}%` }} />
              </div>

              <div className="roster-info">
                <span className="roster-name">{s.name}</span>
                <span className="roster-role">{s.role}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE SUSPECT DOSSIER CONTENT */}
      <div className="suspect-full-dossier-grid">
        {/* LEFT COLUMN: IDENTITY & PSYCHOLOGICAL READ */}
        <div className="dossier-identity-card">
          <div className="identity-header">
            <span className="case-file-no">REX-FILE #{activeProfileId.toUpperCase()}</span>
            <h2 className="suspect-headline-name">{suspectData.name}</h2>
            <span className="suspect-tagline">{suspectData.role} • Age {suspectData.age}</span>
          </div>

          {/* PSYCHOLOGICAL STRESS METER */}
          <div className="stress-gauge-block">
            <div className="gauge-label-row">
              <span className="gauge-title">PSYCHOLOGICAL RESISTANCE</span>
              <span className={`gauge-status-tag ${demeanorClass}`}>{demeanorText}</span>
            </div>

            <div className="stress-bar-track">
              <div
                className={`stress-bar-fill ${stress > 65 ? "stress-critical" : ""}`}
                style={{ width: `${stress}%` }}
              />
            </div>
            <span className="stress-numeric">{stress}% Stress Pressure</span>
          </div>

          {/* STATS & BACKGROUND */}
          <div className="identity-details-list">
            <div className="detail-row">
              <span className="detail-label">Speaking Style:</span>
              <span className="detail-value">{suspectData.accent || "Standard Hindi/Hinglish"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Seat Location:</span>
              <span className="detail-value">{suspectData.seatLocation || "Auditorium"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Claimed Alibi:</span>
              <span className="detail-value">{suspectData.alibi}</span>
            </div>
          </div>

          <div className="dossier-section bio-section">
            <h4 className="section-label">BACKGROUND PROFILE</h4>
            <p className="bio-text">{suspectData.bio}</p>
          </div>

          <button
            type="button"
            className="interrogate-now-btn"
            onClick={() => handleStartInterrogation(activeProfileId)}
          >
            🎙️ Interrogate {suspectData.name} ➔
          </button>
        </div>

        {/* RIGHT COLUMN: RELATIONSHIP NETWORK & SECRETS */}
        <div className="dossier-analysis-card">
          {/* INITIAL MOTIVE & STATEMENT */}
          <div className="motive-statement-box">
            <h4 className="section-label">RECORDED INITIAL STATEMENT</h4>
            <blockquote className="initial-quote">
              "{suspectData.initialDialogue}"
            </blockquote>
          </div>

          {/* RELATIONSHIP TIES NETWORK */}
          <div className="relationships-network-box">
            <h4 className="section-label">RELATIONSHIP WEB & SUSPECT CONNECTIONS</h4>
            <div className="relations-list">
              {relevantRelations.length === 0 ? (
                <span className="no-relations-text">No direct links established yet.</span>
              ) : (
                relevantRelations.map((rel, idx) => {
                  const otherPartyKey =
                    rel.source === activeProfileId ? rel.target : rel.source;
                  const otherPartyName =
                    otherPartyKey === "victim"
                      ? "Harbans Lal (Victim)"
                      : suspects[otherPartyKey]?.name || otherPartyKey;

                  return (
                    <div key={idx} className="relation-item-card">
                      <div className="relation-header">
                        <span className="relation-type-tag">{rel.relation}</span>
                        <span className="other-party-name">➔ {otherPartyName}</span>
                      </div>
                      <p className="relation-desc-text">{rel.desc}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* INVESTIGATIVE TOPICS COVERAGE */}
          {suspectData.topics && suspectData.topics.length > 0 && (
            <div className="topics-coverage-box">
              <h4 className="section-label">KEY QUESTIONS & TOPICS</h4>
              <div className="topics-pills-row">
                {suspectData.topics.map((t, idx) => (
                  <span key={idx} className="topic-pill">
                    {t.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
