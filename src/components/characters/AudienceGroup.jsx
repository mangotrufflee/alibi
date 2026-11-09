// src/components/characters/AudienceGroup.jsx
import React from "react";
import { usePeoplePack } from "./usePeoplePack";
import { PersonModel } from "./PersonModel";

/**
 * AudienceGroup:
 * Renders random audience members and spectators placed at various seats
 * and positions throughout the Rex Talkies auditorium using the imported people models.
 */

// Seated audience members placed in cinema seats
const SEATED_AUDIENCE = [
  // Row 0 (closest to silver screen, yRiser = 0.00, z = -3.5)
  { id: "aud-r0-s0", modelIndex: 1, pos: [-3.10, 0.00, -3.5], rot: [0, 0.06, 0], color: "#475569" },
  { id: "aud-r0-s4", modelIndex: 2, pos: [2.00, 0.00, -3.5], rot: [0, -0.05, 0], color: "#64748b" },
  { id: "aud-r0-s5", modelIndex: 1, pos: [3.10, 0.00, -3.5], rot: [0, 0.08, 0], color: "#52525b" },

  // Row 1 (yRiser = 0.18, z = -5.0)
  { id: "aud-r1-s0", modelIndex: 2, pos: [-3.10, 0.18, -5.0], rot: [0, -0.04, 0], color: "#78716c" },
  { id: "aud-r1-s1", modelIndex: 1, pos: [-2.00, 0.18, -5.0], rot: [0, 0.07, 0], color: "#3f3f46" },
  { id: "aud-r1-s4", modelIndex: 2, pos: [2.00, 0.18, -5.0], rot: [0, -0.09, 0], color: "#4b5563" },
  { id: "aud-r1-s5", modelIndex: 1, pos: [3.10, 0.18, -5.0], rot: [0, 0.05, 0], color: "#57534e" },

  // Row 2 (yRiser = 0.36, z = -6.5)
  { id: "aud-r2-s0", modelIndex: 1, pos: [-3.10, 0.36, -6.5], rot: [0, 0.06, 0], color: "#334155" },
  { id: "aud-r2-s1", modelIndex: 2, pos: [-2.00, 0.36, -6.5], rot: [0, -0.07, 0], color: "#6b7280" },
  { id: "aud-r2-s4", modelIndex: 1, pos: [2.00, 0.36, -6.5], rot: [0, 0.04, 0], color: "#475569" },
  { id: "aud-r2-s5", modelIndex: 2, pos: [3.10, 0.36, -6.5], rot: [0, -0.11, 0], color: "#52525b" },

  // Row 3 (yRiser = 0.54, z = -8.0)
  { id: "aud-r3-s0", modelIndex: 2, pos: [-3.10, 0.54, -8.0], rot: [0, 0.05, 0], color: "#78716c" },
  { id: "aud-r3-s3", modelIndex: 1, pos: [0.90, 0.54, -8.0], rot: [0, -0.03, 0], color: "#3f3f46" },
  { id: "aud-r3-s4", modelIndex: 2, pos: [2.00, 0.54, -8.0], rot: [0, 0.08, 0], color: "#64748b" },
  { id: "aud-r3-s5", modelIndex: 1, pos: [3.10, 0.54, -8.0], rot: [0, -0.06, 0], color: "#57534e" }
];

// Standing spectators and bystanders located in aisles and near walls
const STANDING_SPECTATORS = [
  // Left exit corridor / concession entrance
  { id: "spec-corridor", modelIndex: 6, pos: [-5.8, 0.0, -3.2], rot: [0, 0.75, 0], color: "#475569" },
  // Left wall by fluted pilasters & poster
  { id: "spec-poster-left", modelIndex: 7, pos: [-7.2, 0.0, -6.8], rot: [0, 1.4, 0], color: "#64748b" },
  // Projection booth stairs left corner
  { id: "spec-booth-corner", modelIndex: 8, pos: [-3.2, 0.0, -9.6], rot: [0, 0.35, 0], color: "#78716c" },
  // Rear center aisle observing the hall
  { id: "spec-rear-center", modelIndex: 6, pos: [0.2, 0.0, -9.8], rot: [0, -0.15, 0], color: "#334155" },
  // Right rear corner near old reels
  { id: "spec-rear-right", modelIndex: 7, pos: [3.6, 0.0, -9.4], rot: [0, -0.4, 0], color: "#52525b" },
  // Right wall near electrical fuse box
  { id: "spec-fusebox", modelIndex: 8, pos: [6.8, 0.0, -5.0], rot: [0, -1.25, 0], color: "#57534e" },
  // Front right proscenium stage flank
  { id: "spec-stage-right", modelIndex: 6, pos: [5.2, 0.0, -12.4], rot: [0, -2.5, 0], color: "#4b5563" },
  // Front left proscenium stage flank
  { id: "spec-stage-left", modelIndex: 7, pos: [-5.4, 0.0, -12.8], rot: [0, 2.3, 0], color: "#3f3f46" }
];

export function AudienceGroup() {
  const { geometries, isReady } = usePeoplePack();

  if (!isReady) return null;

  return (
    <group name="AudienceGroup">
      {/* SEATED AUDIENCE MEMBERS */}
      {SEATED_AUDIENCE.map((item) => {
        const geom = geometries[item.modelIndex];
        if (!geom) return null;
        return (
          <PersonModel
            key={item.id}
            geometry={geom}
            modelIndex={item.modelIndex}
            position={item.pos}
            rotation={item.rot}
            scale={[0.05, 0.05, 0.05]}
            color={item.color}
            isSuspect={false}
          />
        );
      })}

      {/* STANDING SPECTATORS & BYSTANDERS */}
      {STANDING_SPECTATORS.map((item) => {
        const geom = geometries[item.modelIndex];
        if (!geom) return null;
        return (
          <PersonModel
            key={item.id}
            geometry={geom}
            modelIndex={item.modelIndex}
            position={item.pos}
            rotation={item.rot}
            scale={[0.05, 0.05, 0.05]}
            color={item.color}
            isSuspect={false}
          />
        );
      })}
    </group>
  );
}

export default AudienceGroup;

