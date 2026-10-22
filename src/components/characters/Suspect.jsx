// src/components/characters/Suspect.jsx
import React from "react";
import { CharacterBase } from "./CharacterBase";
import { suspects } from "../../data/suspects";
import { useGame } from "../../state/GameContext";

export default function Suspect({ suspectId, position, rotation }) {
  const { selectSuspect } = useGame();
  const data = suspects[suspectId];

  if (!data) return null;

  return (
    <CharacterBase
      characterId={suspectId}
      modelAssetId={`${suspectId}Character`}
      name={data.name}
      silhouette={data.silhouette}
      color={data.color}
      position={position || data.seat?.position || [0, 0, 0]}
      rotation={rotation || [0, 0, 0]}
      onSelect={() => selectSuspect(suspectId)}
    />
  );
}
