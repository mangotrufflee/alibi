// src/components/evidence/EvidenceInspection.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { PlaceholderProp } from "../../assets/placeholders/PlaceholderProp";
import { ModelWrapper } from "../../assets/placeholders/ModelWrapper";
import { useGame } from "../../state/GameContext";
import { initialEvidenceItems } from "../../data/evidence";

export function EvidenceInspection({ evidenceId, onClose }) {
  const { debugMode } = useGame();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState("3d"); // "3d" | "2d"

  const evidence = initialEvidenceItems.find((e) => e.id === evidenceId) || initialEvidenceItems[0];

  return (
    <div className="evidence-overlay-backdrop">
      <div className="evidence-modal">
        {/* MODAL HEADER */}
        <div className="evidence-modal-header">
          <div className="evidence-header-tag">
            <span className="badge-tag">EXHIBIT // {evidence.category.toUpperCase()}</span>
            <span className="badge-status">DISCOVERED AT: {evidence.location}</span>
          </div>
          <button className="evidence-close-btn" onClick={onClose} title="Close Inspection [ESC]">
            ✕ CLOSE
          </button>
        </div>

        {/* MODAL CONTENT GRID */}
        <div className="evidence-modal-body">
          {/* LEFT: 3D / 2D INTERACTIVE VIEWER */}
          <div className="evidence-viewer-pane">
            <div className="evidence-viewer-canvas-wrap">
              {viewMode === "3d" ? (
                <Canvas
                  camera={{ position: [0, 0, 1.8 / zoomLevel], fov: 45 }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[3, 5, 2]} intensity={1.2} />
                  <pointLight position={[-2, -2, 2]} intensity={0.5} color="#f59e0b" />
                  <Center>
                    <ModelWrapper assetId={evidence.id} isSelected={true}>
                      <PlaceholderProp
                        type={evidence.placeholderType}
                        isSelected={true}
                        debug={debugMode}
                        interactive={false}
                      />
                    </ModelWrapper>
                  </Center>
                  <OrbitControls enablePan={true} enableZoom={true} autoRotate={false} />
                </Canvas>
              ) : (
                <div className="evidence-2d-view">
                  <div className="evidence-illustration-card">
                    <div className="illustration-placeholder">
                      <span className="icon">🖼️</span>
                      <p>HAND-DRAWN ILLUSTRATION</p>
                      <code>{evidence.image || "/assets/illustrations/evidence/" + evidence.id + ".png"}</code>
                      <small>Aspect ratio preserved. Transparent PNG alpha supported.</small>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* VIEWER CONTROLS */}
            <div className="evidence-viewer-toolbar">
              <div className="btn-group">
                <button
                  className={`toolbar-btn ${viewMode === "3d" ? "active" : ""}`}
                  onClick={() => setViewMode("3d")}
                >
                  📦 3D Inspection
                </button>
                <button
                  className={`toolbar-btn ${viewMode === "2d" ? "active" : ""}`}
                  onClick={() => setViewMode("2d")}
                >
                  🎨 Illustration View
                </button>
              </div>

              {viewMode === "3d" && (
                <div className="btn-group">
                  <button
                    className="toolbar-btn"
                    onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 2.2))}
                    title="Zoom In"
                  >
                    🔍+ Zoom
                  </button>
                  <button
                    className="toolbar-btn"
                    onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.7))}
                    title="Zoom Out"
                  >
                    🔍- Reset
                  </button>
                </div>
              )}
              <span className="toolbar-hint">Drag to rotate • Scroll to zoom</span>
            </div>
          </div>

          {/* RIGHT: EVIDENCE FILE & FORENSIC NOTES */}
          <div className="evidence-info-pane">
            <h2 className="evidence-title">{evidence.name}</h2>
            <div className="evidence-meta-row">
              <span className="meta-label">ID:</span>
              <code className="meta-val">{evidence.id}</code>
              <span className="meta-label">Type:</span>
              <span className="meta-val">{evidence.placeholderType}</span>
            </div>

            <div className="evidence-section">
              <label className="section-title">PHYSICAL DESCRIPTION</label>
              <p className="evidence-desc">{evidence.description}</p>
            </div>

            <div className="evidence-section clue-box">
              <label className="section-title clue-title">🔍 DETECTIVE'S DEDUCTION CLUE</label>
              <p className="clue-text">{evidence.clue}</p>
            </div>

            <div className="evidence-section">
              <div className="details-header">
                <label className="section-title">FORENSIC EXAMINATION POINTS</label>
                <button
                  className="examine-toggle-btn"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? "Hide Points ▲" : "Examine Under UV Light ▼"}
                </button>
              </div>

              {showDetails ? (
                <ul className="forensic-points-list">
                  {evidence.inspectionDetails?.map((detail, idx) => (
                    <li key={idx} className="forensic-item">
                      <span className="bullet">⚡</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="details-prompt" onClick={() => setShowDetails(true)}>
                  Click <em>"Examine Under UV Light"</em> to uncover microscopic residue and marks.
                </div>
              )}
            </div>

            <div className="evidence-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  alert(`Cross-referenced ${evidence.name} with suspect statements. Added to Case File.`);
                }}
              >
                📌 Pin to Case Board
              </button>
              <button className="btn-secondary" onClick={onClose}>
                Return to Theatre
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
