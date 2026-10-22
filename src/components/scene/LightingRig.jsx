// src/components/scene/LightingRig.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../../state/GameContext";

export function LightingRig() {
  const ceilingLight1 = useRef();
  const ceilingLight2 = useRef();
  const generatorFill = useRef();
  const { generatorFlicker } = useGame();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Occasional generator fluctuation dip
    const isDip = generatorFlicker || Math.sin(t * 8) > 0.985;
    const baseAmber = isDip ? 0.15 : 0.45 + Math.sin(t * 1.5) * 0.04;

    if (ceilingLight1.current) {
      ceilingLight1.current.intensity = baseAmber;
    }
    if (ceilingLight2.current) {
      ceilingLight2.current.intensity = baseAmber * 0.9;
    }
    if (generatorFill.current) {
      generatorFill.current.intensity = isDip ? 0.08 : 0.22;
    }
  });

  return (
    <group name="LightingRig">
      {/* LOW AMBIENT DARK TEAL BASE */}
      <ambientLight color="#0c191c" intensity={0.45} />

      {/* WEAK AMBER CEILING PRACTICAL LIGHTS */}
      <pointLight
        ref={ceilingLight1}
        position={[0, 6.5, -4]}
        color="#f59e0b"
        intensity={0.45}
        distance={14}
        castShadow
        shadow-bias={-0.001}
      />
      <pointLight
        ref={ceilingLight2}
        position={[0, 6.5, -9]}
        color="#d97706"
        intensity={0.4}
        distance={12}
      />

      {/* SUSPECT GROUP FILL LIGHT: ensures faces and silhouettes remain readable */}
      <spotLight
        ref={generatorFill}
        position={[0, 5, 1]}
        target-position={[0, 0.5, -5]}
        color="#fed7aa"
        intensity={0.3}
        angle={0.8}
        penumbra={0.7}
      />

      {/* SUBTLE COLD TEAL BACKLIGHT FOR SCREEN SILHOUETTE */}
      <pointLight
        position={[0, 3, -14]}
        color="#083344"
        intensity={0.35}
        distance={8}
      />
    </group>
  );
}
