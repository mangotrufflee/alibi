// src/components/case/tabs/EvidenceListTab.jsx
// ALIBI — Phase 2: Evidence List Tab (GDD §7)

import React, { useState } from "react";
import { useGame } from "../../../state/GameContext";
import { suspects } from "../../../data/suspects";

export default function EvidenceListTab() {
  const {
    evidenceItems,
    selectedSuspect,
    presentEvidenceToSuspect,
    setCaseSubTab,
    setSelectedEvidence
  } = useGame();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const currentSuspect = suspects[selectedSuspect] || suspects.raju;

  const categories = [
    { id: "all", label: "All Evidence" },
    { id: "Physical Evidence", label: "Physical" },
    { id: "Documents", label: "Documents" },
    { id: "Technical Evidence", label: "Technical" },
    { id: "Weapons / Trauma", label: "Weapons" }
  ];

  const filteredItems = evidenceItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInspect3D = (item) => {
    setSelectedEvidence(item);
    setCaseSubTab("physical_evidence");
  };

  return (
    <div className="tab-pane evidence-list-pane">
      {/* PANE HEADER & FILTER TOOLBAR */}
      <div className="pane-toolbar">
        <div className="filter-pill-group">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="search-box">
          <input
            type="text"
            className="pane-search-input"
            placeholder="Filter clues, forensics, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* EVIDENCE CARDS GRID */}
      <div className="evidence-cards-grid">
        {filteredItems.map((item) => {
          const isDiscovered = item.discovered !== false;

          return (
            <div
              key={item.id}
              className={`case-evidence-card ${isDiscovered ? "discovered" : "locked"}`}
            >
              <div className="card-top-row">
                <span className="card-category-badge">{item.category}</span>
                <span className={`discovery-status ${isDiscovered ? "status-found" : "status-undiscovered"}`}>
                  {isDiscovered ? "● DISCOVERED" : "○ UNCONFIRMED"}
                </span>
              </div>

              <h3 className="card-title">{item.name}</h3>
              <p className="card-location">
                📍 <strong>Location:</strong> {item.location}
              </p>

              <p className="card-description">{item.description}</p>

              {/* FORENSIC CLUE CALLOUT */}
              <div className="card-clue-box">
                <span className="clue-tag">FORENSIC SIGNIFICANCE:</span>
                <p className="clue-text">{item.clue}</p>
              </div>

              {/* INSPECTION BULLETS */}
              {item.inspectionDetails && item.inspectionDetails.length > 0 && (
                <ul className="card-details-list">
                  {item.inspectionDetails.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}

              {/* ACTION FOOTER */}
              <div className="card-actions-footer">
                <button
                  type="button"
                  className="card-action-btn btn-inspect"
                  onClick={() => handleInspect3D(item)}
                  title="View 3D turntable model"
                >
                  🔍 3D Turntable
                </button>

                <button
                  type="button"
                  className="card-action-btn btn-present"
                  onClick={() => presentEvidenceToSuspect(item.id)}
                  title={`Present this evidence to ${currentSuspect.name}`}
                >
                  ⚖️ Present to {currentSuspect.name} ➔
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
