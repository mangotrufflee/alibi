// src/components/scene/Atmosphere.jsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Atmospheric elements:
 * - Floating dust motes illuminated by ambient light
 * - Slowly spinning vintage ceiling fan casting subtle rhythmic shadow
 */
export function Atmosphere() {
  const fanRef = useRef();
  const dustRef = useRef();
  const dustCount = 80;

  const dustGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < dustCount; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = Math.random() * 6 + 0.5;
      const z = -4 - Math.random() * 9;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [dustCount]);

  useFrame((state, delta) => {
    // Ceiling fan slow rotation
    if (fanRef.current) {
      fanRef.current.rotation.y += delta * 0.75;
    }

    // Gentle dust drift
    if (dustRef.current) {
      const positions = dustRef.current.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= delta * 0.05;
        if (positions[i] < 0.2) {
          positions[i] = 6.0;
        }
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group name="Atmosphere">
      {/* VINTAGE CEILING FAN */}
      <group position={[0, 6.8, -5]} ref={fanRef}>
        {/* Fan hub */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
          <meshStandardMaterial color="#1c1917" metalness={0.7} />
        </mesh>
        {/* Downrod */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
          <meshStandardMaterial color="#1c1917" metalness={0.8} />
        </mesh>
        {/* 3 Fan Blades */}
        {[0, 1, 2].map((idx) => {
          const angle = (idx * Math.PI * 2) / 3;
          return (
            <group key={idx} rotation={[0, angle, 0]}>
              <mesh position={[0.7, 0, 0]} rotation={[0.08, 0, 0]}>
                <boxGeometry args={[1.1, 0.015, 0.22]} />
                <meshStandardMaterial color="#292524" roughness={0.7} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* DUST PARTICLES */}
      <points ref={dustRef} geometry={dustGeometry}>
        <pointsMaterial
          size={0.035}
          color="#fef3c7"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
