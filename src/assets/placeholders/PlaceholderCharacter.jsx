// src/assets/placeholders/PlaceholderCharacter.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural stylized silhouettes for the 5 suspects.
 * Distinct silhouettes for:
 * - Raju Ansari (young, slim, fidgety shirt silhouette)
 * - Meera Kapoor (upright, sharp structured drape/saree silhouette)
 * - Dr. Arvind Sethi (stooped elderly professor silhouette, shawl/jacket)
 * - Nusrat Ali (young seated student profile, sharp angles, bag)
 * - Bhola Prasad (broad, robust chaiwala silhouette, seated with poise)
 */
export function PlaceholderCharacter({
  characterId,
  silhouette = "young-slim",
  isSelected = false,
  isHovered = false,
  debug = false,
  color = "#a0c4ff",
  name = "Suspect"
}) {
  const groupRef = useRef();

  // Subtle breathing idle animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Raju has a slight nervous jitter; others have calm breathing
    if (characterId === "raju") {
      groupRef.current.position.y = Math.sin(t * 3.5) * 0.012;
      groupRef.current.rotation.y = Math.sin(t * 1.8) * 0.03;
    } else {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.008;
    }
  });

  // Base materials with noir styling
  const primaryMaterial = new THREE.MeshStandardMaterial({
    color: isSelected ? "#f59e0b" : isHovered ? "#38bdf8" : color,
    roughness: 0.75,
    metalness: 0.1,
    wireframe: debug
  });

  const skinToneMaterial = new THREE.MeshStandardMaterial({
    color: isSelected ? "#fed7aa" : "#8d705c",
    roughness: 0.85
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: isSelected ? "#ef4444" : "#1e293b",
    roughness: 0.6
  });

  return (
    <group ref={groupRef}>
      {/* SELECTION / FOCUS AURA RING ON GROUND */}
      {isSelected && (
        <mesh position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.52, 32]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.8} />
        </mesh>
      )}

      {/* RAJU ANSARI — Young, slim, casual shirt shape */}
      {silhouette === "young-slim" && (
        <group position={[0, 0, 0]}>
          {/* Seated Thighs/Legs */}
          <mesh position={[0, -0.22, 0.18]} castShadow>
            <boxGeometry args={[0.36, 0.16, 0.45]} />
            <primitive object={accentMaterial} attach="material" />
          </mesh>
          {/* Lower Legs */}
          <mesh position={[0, -0.42, 0.4]}>
            <boxGeometry args={[0.32, 0.32, 0.14]} />
            <primitive object={accentMaterial} attach="material" />
          </mesh>
          {/* Slim Torso */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <boxGeometry args={[0.34, 0.44, 0.22]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          {/* Shirt Collar / V-neck */}
          <mesh position={[0, 0.36, 0.08]}>
            <boxGeometry args={[0.2, 0.1, 0.12]} />
            <primitive object={skinToneMaterial} attach="material" />
          </mesh>
          {/* Slender Arms resting on knees/lap */}
          <mesh position={[-0.22, 0.08, 0.12]} rotation={[0.4, 0, -0.2]} castShadow>
            <cylinderGeometry args={[0.05, 0.045, 0.38, 8]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          <mesh position={[0.22, 0.08, 0.12]} rotation={[0.4, 0, 0.2]} castShadow>
            <cylinderGeometry args={[0.05, 0.045, 0.38, 8]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          {/* Neck */}
          <mesh position={[0, 0.44, 0.02]}>
            <cylinderGeometry args={[0.055, 0.065, 0.1, 10]} />
            <primitive object={skinToneMaterial} attach="material" />
          </mesh>
          {/* Head & Tousled Hair */}
          <mesh position={[0, 0.58, 0.03]} castShadow>
            <boxGeometry args={[0.22, 0.24, 0.22]} />
            <primitive object={skinToneMaterial} attach="material" />
          </mesh>
          {/* Hair block */}
          <mesh position={[0, 0.68, 0.02]}>
            <boxGeometry args={[0.24, 0.1, 0.24]} />
            <meshStandardMaterial color="#111827" roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* MEERA KAPOOR — Upright silhouette with structured outfit & shawl drape */}
      {silhouette === "upright-structured" && (
        <group position={[0, 0, 0]}>
          {/* Seated Base / Pleats */}
          <mesh position={[0, -0.25, 0.2]} castShadow>
            <boxGeometry args={[0.42, 0.22, 0.48]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          {/* Rigid Upright Torso */}
          <mesh position={[0, 0.22, 0]} castShadow>
            <boxGeometry args={[0.38, 0.48, 0.24]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          {/* Saree Pallu / Stole draped diagonally */}
          <mesh position={[-0.04, 0.24, 0.08]} rotation={[0, 0, -0.45]}>
            <boxGeometry args={[0.44, 0.14, 0.16]} />
            <primitive object={accentMaterial} attach="material" />
          </mesh>
          {/* Composed Arms in Lap */}
          <mesh position={[-0.22, 0.12, 0.12]} rotation={[0.5, 0, -0.15]}>
            <cylinderGeometry args={[0.055, 0.05, 0.4, 8]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          <mesh position={[0.22, 0.12, 0.12]} rotation={[0.5, 0, 0.15]}>
            <cylinderGeometry args={[0.055, 0.05, 0.4, 8]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          {/* Graceful Neck */}
          <mesh position={[0, 0.48, 0.01]}>
            <cylinderGeometry args={[0.05, 0.06, 0.12, 10]} />
            <primitive object={skinToneMaterial} attach="material" />
          </mesh>
          {/* Head & Bun */}
          <mesh position={[0, 0.62, 0.02]} castShadow>
            <boxGeometry args={[0.22, 0.24, 0.2]} />
            <primitive object={skinToneMaterial} attach="material" />
          </mesh>
          {/* Hair Bun at back */}
          <mesh position={[0, 0.64, -0.12]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>
        </group>
      )}

      {/* DR. ARVIND SETHI — Seated stooped elderly silhouette with shawl */}
      {silhouette === "stooped-elderly" && (
        <group position={[0, 0, 0]}>
          {/* Seated base */}
          <mesh position={[0, -0.22, 0.18]} castShadow>
            <boxGeometry args={[0.38, 0.18, 0.44]} />
            <primitive object={accentMaterial} attach="material" />
          </mesh>
          {/* Stooped Forward Torso */}
          <group position={[0, 0.18, 0.04]} rotation={[0.18, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.4, 0.44, 0.26]} />
              <primitive object={primaryMaterial} attach="material" />
            </mesh>
            {/* Shawl across shoulders */}
            <mesh position={[0, 0.14, 0]}>
              <boxGeometry args={[0.46, 0.18, 0.3]} />
              <meshStandardMaterial color="#475569" roughness={0.9} />
            </mesh>
            {/* Arms resting on cane/lap */}
            <mesh position={[-0.2, -0.06, 0.14]} rotation={[0.6, 0, -0.1]}>
              <cylinderGeometry args={[0.05, 0.045, 0.38, 8]} />
              <primitive object={primaryMaterial} attach="material" />
            </mesh>
            <mesh position={[0.2, -0.06, 0.14]} rotation={[0.6, 0, 0.1]}>
              <cylinderGeometry args={[0.05, 0.045, 0.38, 8]} />
              <primitive object={primaryMaterial} attach="material" />
            </mesh>
            {/* Head slightly inclined */}
            <mesh position={[0, 0.34, 0.06]} rotation={[-0.1, 0, 0]} castShadow>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
              <primitive object={skinToneMaterial} attach="material" />
            </mesh>
            {/* Silver Hair / Spectacles Bar */}
            <mesh position={[0, 0.44, 0.04]}>
              <boxGeometry args={[0.23, 0.06, 0.23]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.35, 0.18]}>
              <boxGeometry args={[0.18, 0.04, 0.04]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.8} />
            </mesh>
          </group>
        </group>
      )}

      {/* NUSRAT ALI — Young seated silhouette, sharp profile, sling bag */}
      {silhouette === "young-profile" && (
        <group position={[0, 0, 0]}>
          {/* Seated base */}
          <mesh position={[0, -0.22, 0.18]} castShadow>
            <boxGeometry args={[0.34, 0.16, 0.42]} />
            <primitive object={accentMaterial} attach="material" />
          </mesh>
          {/* Alert Torso */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <boxGeometry args={[0.32, 0.42, 0.22]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          {/* Crossbody Bag Strap */}
          <mesh position={[0.02, 0.2, 0.08]} rotation={[0, 0, 0.55]}>
            <boxGeometry args={[0.42, 0.06, 0.12]} />
            <meshStandardMaterial color="#78350f" roughness={0.5} />
          </mesh>
          {/* Audio recorder in hand silhouette */}
          <mesh position={[-0.18, 0.12, 0.2]} rotation={[0.5, 0, -0.3]}>
            <cylinderGeometry args={[0.045, 0.04, 0.36, 8]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          <mesh position={[0.18, 0.12, 0.16]} rotation={[0.5, 0, 0.2]}>
            <cylinderGeometry args={[0.045, 0.04, 0.36, 8]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          {/* Head & Ponytail */}
          <mesh position={[0, 0.44, 0.02]}>
            <cylinderGeometry args={[0.05, 0.055, 0.1, 8]} />
            <primitive object={skinToneMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.58, 0.03]} castShadow>
            <boxGeometry args={[0.2, 0.22, 0.2]} />
            <primitive object={skinToneMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.66, 0.0]}>
            <boxGeometry args={[0.22, 0.08, 0.22]} />
            <meshStandardMaterial color="#18181b" roughness={0.7} />
          </mesh>
        </group>
      )}

      {/* BHOLA PRASAD — Broad seated silhouette, vest & cloth profile */}
      {silhouette === "broad-seated" && (
        <group position={[0, 0, 0]}>
          {/* Broad seated thighs */}
          <mesh position={[0, -0.22, 0.18]} castShadow>
            <boxGeometry args={[0.48, 0.18, 0.46]} />
            <primitive object={accentMaterial} attach="material" />
          </mesh>
          {/* Broad, stocky Torso */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[0.46, 0.46, 0.28]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          {/* Cotton Waistcoat / Sadri */}
          <mesh position={[0, 0.2, 0.04]}>
            <boxGeometry args={[0.48, 0.44, 0.22]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>
          {/* Heavy Arms resting comfortably */}
          <mesh position={[-0.28, 0.1, 0.12]} rotation={[0.4, 0, -0.2]}>
            <cylinderGeometry args={[0.07, 0.06, 0.38, 8]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          <mesh position={[0.28, 0.1, 0.12]} rotation={[0.4, 0, 0.2]}>
            <cylinderGeometry args={[0.07, 0.06, 0.38, 8]} />
            <primitive object={primaryMaterial} attach="material" />
          </mesh>
          {/* Head & Cotton Gamcha/Scarf */}
          <mesh position={[0, 0.48, 0.02]}>
            <cylinderGeometry args={[0.07, 0.08, 0.1, 10]} />
            <primitive object={skinToneMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.6, 0.03]} castShadow>
            <boxGeometry args={[0.25, 0.24, 0.24]} />
            <primitive object={skinToneMaterial} attach="material" />
          </mesh>
          {/* Mustache / Beard block & Muted Cap */}
          <mesh position={[0, 0.72, 0.01]}>
            <boxGeometry args={[0.26, 0.08, 0.26]} />
            <meshStandardMaterial color="#d97706" roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* DEVELOPMENT OVERLAY BADGE */}
      {debug && (
        <Html position={[0, 1.05, 0]} center distanceFactor={12}>
          <div
            style={{
              background: "rgba(12, 25, 28, 0.92)",
              border: `1px solid ${isSelected ? "#f59e0b" : "#38bdf8"}`,
              color: isSelected ? "#f59e0b" : "#e2e8f0",
              fontFamily: "monospace",
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
              pointerEvents: "none"
            }}
          >
            <strong>{name}</strong>
            <span style={{ opacity: 0.7, marginLeft: "4px" }}>
              [{characterId} • {silhouette}]
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
