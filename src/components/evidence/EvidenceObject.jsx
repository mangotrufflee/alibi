// src/components/evidence/EvidenceObject.jsx
import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { ModelWrapper } from "../../assets/placeholders/ModelWrapper";
import { PlaceholderProp } from "../../assets/placeholders/PlaceholderProp";
import { useGame } from "../../state/GameContext";

/**
 * 3D Evidence Object placed inside the theatre environment.
 * Clickable to open detailed inspection.
 */
export function EvidenceObject({ evidence }) {
  const { openEvidenceInspection, debugMode } = useGame();
  const [isHovered, setIsHovered] = useState(false);

  if (!evidence || !evidence.inScene) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    openEvidenceInspection(evidence.id);
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group
      position={evidence.scenePosition || [0, 0, 0]}
      rotation={evidence.sceneRotation || [0, 0, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <ModelWrapper
        assetId={evidence.id}
        isHovered={isHovered}
      >
        <PlaceholderProp
          type={evidence.placeholderType}
          isHovered={isHovered}
          debug={debugMode}
        />
      </ModelWrapper>

      {/* HOVER TOOLTIP IN SCENE */}
      {isHovered && (
        <Html position={[0, 0.25, 0]} center distanceFactor={8}>
          <div
            style={{
              background: "rgba(11, 13, 20, 0.95)",
              border: "1px solid #1f61ef",
              color: "#f3f5f7",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "11px",
              padding: "4px 10px",
              borderRadius: "1rem",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.8)",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span style={{ color: "#3772f1" }}>🔍 [Click to Inspect]</span>
            <strong>{evidence.name}</strong>
          </div>
        </Html>
      )}
    </group>
  );
}
