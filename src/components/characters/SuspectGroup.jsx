// src/components/characters/SuspectGroup.jsx
import React from "react";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";
import { usePeoplePack } from "./usePeoplePack";
import { PersonModel } from "./PersonModel";
import { CharacterBase } from "./CharacterBase";

/**
 * Suspect Model Assignments:
 * Mapping the 5 canonical suspects to the imported low-poly people models:
 * - Raju Ansari: Model 1 (SM_People_Lowpoly_01 — seated young person)
 * - Meera Kapoor: Model 2 (SM_People_Lowpoly_02 — seated woman)
 * - Dr. Arvind Sethi: Model 3 (SM_People_Lowpoly_03 — older gentleman patron)
 * - Nusrat Ali: Model 4 (SM_People_Lowpoly_04 — student)
 * - Bhola Prasad: Model 5 (SM_People_Lowpoly_05 — chaiwala / vendor)
 */
const SUSPECT_MODEL_CONFIG = {
  raju: {
    modelIndex: 1,
    yOffset: -0.22,
    rotation: [0, 0.05, 0] // natively faces +Z towards camera
  },
  meera: {
    modelIndex: 2,
    yOffset: -0.22,
    rotation: [0, -0.08, 0] // natively faces +Z towards camera
  },
  arvind: {
    modelIndex: 3,
    yOffset: 0.0,
    rotation: [0, Math.PI + 0.12, 0] // rotated 180° so face & chest point to camera (+Z)
  },
  nusrat: {
    modelIndex: 4,
    yOffset: 0.0,
    rotation: [0, -0.15, 0] // natively faces +Z towards camera
  },
  bhola: {
    modelIndex: 5,
    yOffset: 0.0,
    rotation: [0, Math.PI - 0.25, 0] // rotated 180° so face & chest point to camera (+Z)
  }
};

export function SuspectGroup() {
  const { selectedSuspect, selectSuspect } = useGame();
  const { geometries, isReady } = usePeoplePack();

  return (
    <group name="SuspectGroup">
      {Object.keys(suspects).map((suspectId) => {
        const data = suspects[suspectId];
        const config = SUSPECT_MODEL_CONFIG[suspectId];
        const rawPos = data.seat?.position || [0, 0, 0];
        const position = [
          rawPos[0],
          rawPos[1] + (config?.yOffset || 0),
          rawPos[2]
        ];
        const isSelected = selectedSuspect === suspectId;
        const geom = config ? geometries[config.modelIndex] : null;

        // If the 3D model geometry is ready, render the assigned imported people model
        if (isReady && geom) {
          return (
            <PersonModel
              key={suspectId}
              geometry={geom}
              modelIndex={config.modelIndex}
              position={position}
              rotation={config.rotation || [0, 0, 0]}
              scale={[0.05, 0.05, 0.05]}
              color={data.color}
              isSuspect={true}
              suspectId={suspectId}
              name={data.name}
              role={data.role}
              isSelected={isSelected}
              onClick={() => selectSuspect(suspectId)}
            />
          );
        }

        // Graceful fallback to CharacterBase if asset is still loading
        return (
          <CharacterBase
            key={suspectId}
            characterId={suspectId}
            modelAssetId={`${suspectId}Character`}
            name={data.name}
            silhouette={data.silhouette}
            color={data.color}
            position={rawPos}
            rotation={[0, 0, 0]}
            onSelect={() => selectSuspect(suspectId)}
          />
        );
      })}
    </group>
  );
}

export default SuspectGroup;
