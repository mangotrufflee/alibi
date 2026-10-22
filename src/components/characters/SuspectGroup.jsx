// src/components/characters/SuspectGroup.jsx
import React from "react";
import Suspect from "./Suspect";
import { suspects } from "../../data/suspects";

/**
 * Renders all 5 suspects in their respective seats in the cinema hall.
 * Raju Ansari is the primary foreground suspect.
 * Meera, Dr. Arvind, Nusrat, and Bhola occupy distinct seats.
 */
export function SuspectGroup() {
  return (
    <group name="SuspectGroup">
      {Object.keys(suspects).map((suspectId) => {
        const item = suspects[suspectId];
        return (
          <Suspect
            key={suspectId}
            suspectId={suspectId}
            position={item.seat?.position}
            rotation={[0, 0, 0]}
          />
        );
      })}
    </group>
  );
}
