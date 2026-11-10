// src/components/case/tabs/PhysicalEvidenceTab.jsx
// ALIBI — Phase 2: Physical 3D Evidence Turntable Tab (GDD §7)

import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Float } from "@react-three/drei";
import { PlaceholderProp } from "../../../assets/placeholders/PlaceholderProp";
import { ModelWrapper } from "../../../assets/placeholders/ModelWrapper";
import { useGame } from "../../../state/GameContext";
import { suspects } from "../../../data/suspects";
import { UiIcon } from "../../ui/UiIcon";

const FORENSIC_CLUE_UNLOCK_COST = 10;

function Evidence3DViewer({ propType, assetId, autoRotate }) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 3.2], fov: 45 }}
      style={{ width: "100%", height: "100%", background: "#05060a" }}
    >
      <ambientLight intensity={0.7} />
      <spotLight
        color="#3b82f6"
        intensity={12}
        position={[2.5, 4, 2.5]}
        angle={0.45}
        penumbra={0.7}
      />

      <Suspense fallback={null}>
        <Float speed={autoRotate ? 2 : 0} rotationIntensity={0.4} floatIntensity={0.2}>
          <Center top>
            <ModelWrapper assetId={assetId}>
              <PlaceholderProp type={propType} isInteractive={false} />
            </ModelWrapper>
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
    presentEvidenceToSuspect,
    score,
    unlockedForensicClueIds,
    unlockForensicClue
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
  const isClueUnlocked = (unlockedForensicClueIds || []).includes(currentItem.id);
  const hasUnlockPoints = score >= FORENSIC_CLUE_UNLOCK_COST;

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
                  <UiIcon name={{ key: "key", ticket: "ticket", glass: "coffee", filmstrip: "film", ledger: "notebook", phone: "phone", clamp: "wrench", token: "briefcase", gauge: "zap", canister: "archive", cord: "waves", certificate: "scroll", bell: "bell" }[item.placeholderType] || "file"} />
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
            assetId={currentItem.id}
            autoRotate={autoRotate}
          />

          {/* TURNTABLE CONTROLS OVERLAY */}
          <div className="turntable-overlay-controls">
            <button
              type="button"
              className={`control-btn ${autoRotate ? "active" : ""}`}
              onClick={() => setAutoRotate(!autoRotate)}
            >
              {autoRotate ? <><UiIcon name="pause" /> Pause Rotation</> : <><UiIcon name="arrow" /> Auto Rotate</>}
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
            {isClueUnlocked ? (
              <div className="clue-highlight-box">
                <p>{currentItem.clue}</p>
              </div>
            ) : (
              <div className="clue-unlock-overlay">
                <span className="clue-lock-icon"><UiIcon name="lock" /></span>
                <span className="clue-unlock-copy">FORENSIC CLUE SEALED</span>
                <button
                  type="button"
                  className="clue-unlock-btn"
                  onClick={() => unlockForensicClue(currentItem.id)}
                  disabled={!hasUnlockPoints}
                >
                  USE {FORENSIC_CLUE_UNLOCK_COST} POINTS TO UNLOCK THE CLUE
                  <span
                    className="clue-cost-icon"
                    title="Play the puzzle to gain points"
                    aria-label="Play the puzzle to gain points"
                  >
                    <UiIcon name="gem" />
                  </span>
                </button>
              </div>
            )}
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
            <UiIcon name="gavel" /> Present "{currentItem.name}" to {currentSuspect.name} <UiIcon name="arrow" />
          </button>
        </div>
      </aside>
    </div>
  );
}
