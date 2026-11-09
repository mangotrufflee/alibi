// src/components/characters/Suspect.jsx
import React from "react";
import { CharacterBase } from "./CharacterBase";
import { PersonModel } from "./PersonModel";
import { usePeoplePack } from "./usePeoplePack";
import { suspects } from "../../data/suspects";
import { useGame } from "../../state/GameContext";

const SUSPECT_MODEL_INDEX = {
  raju: 1,
  meera: 2,
  arvind: 3,
  nusrat: 4,
  bhola: 5
};

export default function Suspect({ suspectId, position, rotation }) {
  const { selectedSuspect, selectSuspect } = useGame();
  const { geometries, isReady } = usePeoplePack();
  const data = suspects[suspectId];

  if (!data) return null;

  const modelIdx = SUSPECT_MODEL_INDEX[suspectId] || 1;
  const geom = geometries[modelIdx];
  const isSelected = selectedSuspect === suspectId;
  const finalPos = position || data.seat?.position || [0, 0, 0];

  if (isReady && geom) {
    return (
      <PersonModel
        geometry={geom}
        modelIndex={modelIdx}
        position={finalPos}
        rotation={rotation || [0, 0, 0]}
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

  return (
    <CharacterBase
      characterId={suspectId}
      modelAssetId={`${suspectId}Character`}
      name={data.name}
      silhouette={data.silhouette}
      color={data.color}
      position={finalPos}
      rotation={rotation || [0, 0, 0]}
      onSelect={() => selectSuspect(suspectId)}
    />
  );
}
