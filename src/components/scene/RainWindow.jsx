// src/components/scene/RainWindow.jsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural monsoon rain visible through an exit doorway and upper transom windows.
 * Uses lightweight line geometry / instanced rain streaks with cold blue street bleed.
 */
export function RainWindow() {
  const rainCount = 180;
  const rainRef = useRef();

  // Create lightweight rain streak positions
  const rainGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < rainCount; i++) {
      const x = -7.5 + (Math.random() - 0.5) * 4.5;
      const y = Math.random() * 8;
      const z = -6 + (Math.random() - 0.5) * 6;
      points.push(new THREE.Vector3(x, y, z));
      points.push(new THREE.Vector3(x - 0.05, y - 0.35, z + 0.02)); // slanted monsoon streak
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [rainCount]);

  useFrame((state, delta) => {
    if (!rainRef.current) return;
    const positions = rainRef.current.geometry.attributes.position.array;
    for (let i = 1; i < positions.length; i += 6) {
      positions[i] -= delta * 14; // rain speed
      positions[i + 3] -= delta * 14;
      if (positions[i] < 0) {
        const resetY = 7.5 + Math.random() * 1.5;
        positions[i] = resetY;
        positions[i + 3] = resetY - 0.35;
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={[-9.8, 0, -4]}>
      {/* CINEMA EXIT DOOR ARCHWAY */}
      {/* Frame Left */}
      <mesh position={[0, 2.2, -1.2]}>
        <boxGeometry args={[0.3, 4.4, 0.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Frame Right */}
      <mesh position={[0, 2.2, 1.2]}>
        <boxGeometry args={[0.3, 4.4, 0.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Lintel Top */}
      <mesh position={[0, 4.3, 0]}>
        <boxGeometry args={[0.3, 0.3, 2.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Glass Pane Transom */}
      <mesh position={[0, 3.5, 0]}>
        <planeGeometry args={[0.1, 1.2]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.8}
          transparent
          opacity={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* RAIN LINE SEGMENTS OUTSIDE DOOR */}
      <lineSegments ref={rainRef} geometry={rainGeometry}>
        <lineBasicMaterial color="#93c5fd" transparent opacity={0.65} />
      </lineSegments>

      {/* COLD STREET BLEED LIGHT ENTERING AUDITORIUM */}
      <spotLight
        position={[2.5, 3.5, 0]}
        target-position={[4.0, 0, 0]}
        color="#38bdf8"
        intensity={0.6}
        distance={9}
        angle={0.6}
        penumbra={0.8}
      />

      {/* EXIT SIGN (RESTRICTED DIM RED NOIR ACCENT) */}
      <mesh position={[0.2, 4.6, 0]}>
        <boxGeometry args={[0.1, 0.25, 0.7]} />
        <meshStandardMaterial color="#1c1917" />
      </mesh>
      <mesh position={[0.26, 4.6, 0]}>
        <planeGeometry args={[0.65, 0.2]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <pointLight position={[0.4, 4.6, 0]} color="#ef4444" intensity={0.4} distance={2.5} />
    </group>
  );
}
