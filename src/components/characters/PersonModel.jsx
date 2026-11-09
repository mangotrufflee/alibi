// src/components/characters/PersonModel.jsx
import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * Renders an individual low-poly person from the people model pack.
 * Supports:
 * - Centered geometry from usePeoplePack
 * - Suspect highlighting, selection rings, and overhead name tags
 * - Click and hover interaction
 * - Subtle breathing idle animation
 */
export function PersonModel({
  geometry,
  modelIndex,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [0.05, 0.05, 0.05],
  color = "#475569",
  isSuspect = false,
  suspectId = null,
  name = "",
  role = "",
  isSelected = false,
  onClick
}) {
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // Subtle breathing idle motion for realism
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isSuspect) {
      if (suspectId === "raju") {
        // Raju has slight nervous twitching
        groupRef.current.position.y = position[1] + Math.sin(t * 3.2) * 0.008;
      } else {
        groupRef.current.position.y = position[1] + Math.sin(t * 1.6 + position[0]) * 0.005;
      }
    }
  });

  // Material setup: vivid signature tones for suspects, subtle ambient response for spectators
  const material = useMemo(() => {
    const matColor = new THREE.Color(color);
    const emissiveColor = isSelected
      ? new THREE.Color(color).multiplyScalar(0.4)
      : isHovered
      ? new THREE.Color(color).multiplyScalar(0.25)
      : new THREE.Color("#000000");

    return new THREE.MeshStandardMaterial({
      color: matColor,
      roughness: isSuspect ? 0.7 : 0.85,
      metalness: isSuspect ? 0.15 : 0.05,
      emissive: emissiveColor,
      emissiveIntensity: isSelected ? 0.6 : isHovered ? 0.35 : 0.0
    });
  }, [color, isSuspect, isSelected, isHovered]);

  const handlePointerOver = (e) => {
    if (!isSuspect) return;
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    if (!isSuspect) return;
    setIsHovered(false);
    document.body.style.cursor = "auto";
  };

  const handleClick = (e) => {
    if (!isSuspect) return;
    e.stopPropagation();
    if (onClick) onClick();
  };

  if (!geometry) return null;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* 3D CHARACTER MESH */}
      <mesh
        geometry={geometry}
        material={material}
        scale={scale}
        castShadow
        receiveShadow
      />

      {/* SUSPECT GROUND SELECTION RING */}
      {isSuspect && isSelected && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.38, 0.46, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* SUSPECT HOVER OR SELECTED FLOATING NAME BADGE */}
      {isSuspect && (isSelected || isHovered) && (
        <Html position={[0, 1.55, 0]} center distanceFactor={7}>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: "4px",
              background: "rgba(10, 14, 23, 0.92)",
              border: `1px solid ${isSelected ? color : "rgba(255, 255, 255, 0.25)"}`,
              boxShadow: `0 0 12px ${isSelected ? color + "66" : "rgba(0,0,0,0.5)"}`,
              color: "#ffffff",
              fontSize: "11px",
              fontFamily: "var(--font-mono, monospace)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px"
            }}
          >
            <span style={{ fontWeight: 700, letterSpacing: "0.5px" }}>{name}</span>
            <span style={{ fontSize: "9px", opacity: 0.75, color: color }}>
              {isSelected ? "● INTERROGATING" : role}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

export default PersonModel;
