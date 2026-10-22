// src/components/scene/ProjectorBeam.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "../../state/GameContext";

/**
 * Volumetric-style translucent projector beam.
 * Emanates from the rear projection booth slit and projects onto the screen.
 * Flickers subtly with the unstable generator.
 */
export function ProjectorBeam() {
  const beamRef = useRef();
  const dustRef = useRef();
  const { generatorFlicker } = useGame();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (beamRef.current) {
      // Base flickering frequency mimicking 24fps carbon arc shutter + generator pulse
      const flicker = 0.35 + Math.sin(t * 12) * 0.05 + (Math.random() > 0.94 ? -0.15 : 0.02);
      beamRef.current.material.opacity = Math.max(0.12, Math.min(0.55, flicker * (generatorFlicker ? 0.4 : 1)));
    }

    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group position={[0, 4.8, -1.0]}>
      {/* PROJECTOR CONE: Layered translucent cone angled down towards screen */}
      <mesh
        ref={beamRef}
        position={[0, -0.6, -6.5]}
        rotation={[-0.24, 0, 0]}
      >
        <coneGeometry args={[3.8, 14.5, 32, 1, true]} />
        <meshBasicMaterial
          color="#fef08a"
          transparent
          opacity={0.32}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* CORE INTENSE BEAM CENTER */}
      <mesh
        position={[0, -0.6, -6.5]}
        rotation={[-0.24, 0, 0]}
      >
        <coneGeometry args={[1.5, 14.5, 16, 1, true]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* LIGHT CONE APERTURE AT PROJECTION BOOTH SLIT */}
      <pointLight
        position={[0, 0.4, 0.5]}
        color="#fef08a"
        intensity={1.2}
        distance={6}
      />
    </group>
  );
}
