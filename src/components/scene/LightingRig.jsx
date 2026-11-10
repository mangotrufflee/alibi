// src/components/scene/LightingRig.jsx
import React from "react";

/**
 * LightingRig:
 * Ambient-only theatre lighting. Additional lights are intentionally disabled.
 */
export function LightingRig() {
  return (
    <group name="LightingRig">
      <ambientLight color="#ffffff" intensity={1.15} />
    </group>
  );
}

export default LightingRig;
