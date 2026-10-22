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

      {/* SUBTLE DETECTIVE GLOW PULSE */}
      <pointLight
        position={[0, 0.1, 0]}
        color={isHovered ? "#38bdf8" : "#f59e0b"}
        intensity={isHovered ? 0.8 : 0.25}
        distance={1.2}
      />

      {/* HOVER TOOLTIP IN SCENE */}
      {isHovered && (
        <Html position={[0, 0.25, 0]} center distanceFactor={8}>
          <div
            style={{
              background: "rgba(10, 18, 20, 0.95)",
              border: "1px solid #f59e0b",
              color: "#fef3c7",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "11px",
              padding: "4px 8px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.8)",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span style={{ color: "#f59e0b" }}>🔍 [Click to Inspect]</span>
            <strong>{evidence.name}</strong>
          </div>
        </Html>
      )}
    </group>
  );
}
