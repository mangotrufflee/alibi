// src/components/scene/LightingRig.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../../state/GameContext";

export function LightingRig() {
  const ceilingLight1 = useRef();
  const ceilingLight2 = useRef();
  const generatorFill = useRef();
  const generatorFlicker = useGame((s) => s.generatorFlicker);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Occasional generator fluctuation dip
    const isDip = generatorFlicker || Math.sin(t * 8) > 0.985;
    const baseCobalt = isDip ? 0.15 : 0.45 + Math.sin(t * 1.5) * 0.04;

    if (ceilingLight1.current) {
      ceilingLight1.current.intensity = baseCobalt;
    }
    if (ceilingLight2.current) {
      ceilingLight2.current.intensity = baseCobalt * 0.9;
    }
    if (generatorFill.current) {
      generatorFill.current.intensity = isDip ? 0.1 : 0.28;
    }
  });

  return (
    <group name="LightingRig">
      {/* LOW AMBIENT DARK OBSIDIAN BASE */}
      <ambientLight color="#080c16" intensity={0.5} />

      {/* ELECTRIC COBALT CEILING PRACTICAL LIGHTS */}
      <pointLight
        ref={ceilingLight1}
        position={[0, 6.5, -4]}
        color="#3772f1"
        intensity={0.45}
        distance={14}
        castShadow
        shadow-bias={-0.001}
      />
      <pointLight
        ref={ceilingLight2}
        position={[0, 6.5, -9]}
        color="#1f61ef"
        intensity={0.4}
        distance={12}
      />

      {/* SUSPECT GROUP FILL LIGHT: ensures silhouettes remain crisp and readable */}
      <spotLight
        ref={generatorFill}
        position={[0, 5, 1]}
        target-position={[0, 0.5, -5]}
        color="#93c5fd"
        intensity={0.3}
        angle={0.8}
        penumbra={0.7}
      />

      {/* SUBTLE ELECTRIC COBALT BACKLIGHT FOR SCREEN SILHOUETTE */}
      <pointLight
        position={[0, 3, -14]}
        color="#1f61ef"
        intensity={0.4}
        distance={9}
      />
    </group>
  );
}
