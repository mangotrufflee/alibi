// src/components/scene/LightingRig.jsx
import React from "react";

/**
 * LightingRig:
 * User requested: "remove the lights and add one ambient light for now".
 * Single pure ambient light illuminating the entire Rex Talkies auditorium,
 * characters, and models cleanly without harsh point/spot shadows.
 */
export function LightingRig() {
  return (
    <group name="LightingRig">
      <ambientLight color="#ffffff" intensity={1.2} />
    </group>
  );
}

export default LightingRig;
