// src/components/case/tabs/PhysicalEvidenceTab.jsx
// ALIBI — Phase 2: Physical 3D Evidence Turntable Tab (GDD §7)

import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Float } from "@react-three/drei";
import { PlaceholderProp } from "../../../assets/placeholders/PlaceholderProp";
import { useGame } from "../../../state/GameContext";
import { suspects } from "../../../data/suspects";

function Evidence3DViewer({ propType, autoRotate }) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 3.2], fov: 45 }}
      style={{ width: "100%", height: "100%", background: "radial-gradient(circle at 50% 50%, #161c24 0%, #080b0e 100%)" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.5} color="#fff1d6" castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#38bdf8" />
      <pointLight position={[0, -2, 2]} intensity={0.4} color="#f59e0b" />

      <Suspense fallback={null}>
        <Float speed={autoRotate ? 2 : 0} rotationIntensity={0.4} floatIntensity={0.2}>
          <Center top>
            <PlaceholderProp type={propType} isInteractive={false} />
          </Center>
        </Float>
      </Suspense>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={2.5}
        minDistance={1.2}
        maxDistance={6.0}
      />
    </Canvas>
  );
}

export default function PhysicalEvidenceTab() {
  const {
    evidenceItems,
    selectedEvidence,
    setSelectedEvidence,
    selectedSuspect,
    presentEvidenceToSuspect
  } = useGame();

  const [autoRotate, setAutoRotate] = useState(true);

  const physicalItems = evidenceItems.filter(
    (e) => e.placeholderType && e.placeholderType !== "generic"
  );

  const currentItem =
    physicalItems.find((e) => e.id === selectedEvidence?.id) ||
    physicalItems[0] ||
    evidenceItems[0];

  const currentSuspect = suspects[selectedSuspect] || suspects.raju;

  return (
    <div className="tab-pane physical-evidence-pane">
      {/* LEFT: EXHIBIT SELECTOR SIDEBAR */}
      <aside className="exhibits-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">PHYSICAL EXHIBITS</span>
          <span className="sidebar-count">{physicalItems.length} items</span>
        </div>

        <div className="exhibits-list">
          {physicalItems.map((item) => {
            const isSelected = item.id === currentItem.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`exhibit-item-btn ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedEvidence(item)}
              >
                <div className="exhibit-icon-box">
                  {item.placeholderType === "key" && "🔑"}
                  {item.placeholderType === "ticket" && "🎟️"}
                  {item.placeholderType === "glass" && "🍵"}
                  {item.placeholderType === "filmstrip" && "🎞️"}
                  {item.placeholderType === "ledger" && "📓"}
                  {item.placeholderType === "phone" && "📱"}
                  {item.placeholderType === "clamp" && "🔩"}
                  {item.placeholderType === "token" && "🪙"}
                  {item.placeholderType === "gauge" && "⚡"}
                  {item.placeholderType === "canister" && "🛢️"}
                  {item.placeholderType === "cord" && "🪢"}
                </div>
                <div className="exhibit-info">
                  <span className="exhibit-name">{item.name}</span>
                  <span className="exhibit-loc">{item.location}</span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* CENTER: 3D TURNTABLE VIEWPORT */}
      <section className="turntable-viewport-area">
        <div className="turntable-canvas-wrapper">
          <Evidence3DViewer
            propType={currentItem.placeholderType || "ticket"}
            autoRotate={autoRotate}
          />

          {/* TURNTABLE CONTROLS OVERLAY */}
          <div className="turntable-overlay-controls">
            <button
              type="button"
              className={`control-btn ${autoRotate ? "active" : ""}`}
              onClick={() => setAutoRotate(!autoRotate)}
            >
              {autoRotate ? "⏸ Pause Rotation" : "▶ Auto Rotate"}
            </button>
            <span className="control-hint">Drag mouse to orbit • Scroll to zoom</span>
          </div>

          {/* EXHIBIT BADGE OVERLAY */}
          <div className="exhibit-badge-tag">
            <span>EXHIBIT # {currentItem.id.toUpperCase()}</span>
          </div>
        </div>
      </section>

      {/* RIGHT: FORENSIC DOSSIER SPEC SHEET */}
      <aside className="exhibit-dossier-panel">
        <div className="dossier-header">
          <span className="dossier-category">{currentItem.category}</span>
          <h2 className="dossier-title">{currentItem.name}</h2>
          <span className="dossier-found">Found at: {currentItem.location}</span>
        </div>

        <div className="dossier-body">
          <div className="dossier-section">
            <h4 className="section-heading">DESCRIPTION & ANALYSIS</h4>
            <p className="dossier-text">{currentItem.description}</p>
          </div>

          <div className="dossier-section clue-section">
            <h4 className="section-heading">FORENSIC CLUE</h4>
            <div className="clue-highlight-box">
              <p>{currentItem.clue}</p>
            </div>
          </div>

          {currentItem.inspectionDetails && currentItem.inspectionDetails.length > 0 && (
            <div className="dossier-section">
              <h4 className="section-heading">LABORATORY OBSERVATIONS</h4>
              <ul className="dossier-bullet-list">
                {currentItem.inspectionDetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="dossier-footer">
          <button
            type="button"
            className="present-evidence-large-btn"
            onClick={() => presentEvidenceToSuspect(currentItem.id)}
          >
            ⚖️ Present "{currentItem.name}" to {currentSuspect.name} ➔
          </button>
        </div>
      </aside>
    </div>
  );
}
