// src/components/scene/LightingRig.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";

/**
 * LightingRig:
 * - Single ambient light illuminating the Rex Talkies auditorium.
 * - When a suspect is clicked / interrogated, an overhead spotlight illuminates them directly.
 * - When no suspect is selected, only the ambient light is present.
 */
export function LightingRig() {
  const selectedSuspect = useGame((s) => s.selectedSuspect);
  const spotRef = useRef();
  const targetRef = useRef();

  const suspectPos =
    selectedSuspect && suspects[selectedSuspect]?.seat?.position
      ? suspects[selectedSuspect].seat.position
      : null;

  useFrame(() => {
    if (spotRef.current && targetRef.current && suspectPos) {
      spotRef.current.target = targetRef.current;
    }
  });

  return (
    <group name="LightingRig">
      {/* SINGLE BASE AMBIENT LIGHT */}
      <ambientLight color="#ffffff" intensity={selectedSuspect ? 0.85 : 1.2} />

      {/* OVERHEAD SPOTLIGHT ON SELECTED CHARACTER */}
      {suspectPos && (
        <group>
          <object3D
            ref={targetRef}
            position={[suspectPos[0], suspectPos[1] + 0.6, suspectPos[2]]}
          />
          <spotLight
            ref={spotRef}
            position={[suspectPos[0], suspectPos[1] + 5.0, suspectPos[2] + 0.5]}
            color="#fff8ed"
            intensity={4.2}
            angle={0.42}
            penumbra={0.65}
            distance={11}
            castShadow
            shadow-bias={-0.001}
          />
        </group>
      )}
    </group>
  );
}

export default LightingRig;
