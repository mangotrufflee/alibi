// src/components/characters/CharacterBase.jsx
import React, { useState } from "react";
import { ModelWrapper } from "../../assets/placeholders/ModelWrapper";
import { PlaceholderCharacter } from "../../assets/placeholders/PlaceholderCharacter";
import { useGame } from "../../state/GameContext";

/**
 * Reusable Character Component.
 * Supports:
 * - Imported 3D models via ModelWrapper
 * - Procedural stylized silhouette fallback
 * - Hover / selection highlights
 * - Debug overlays
 */
export function CharacterBase({
  characterId,
  modelAssetId,
  name,
  silhouette,
  color,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  onSelect
}) {
  const { selectedSuspect, debugMode } = useGame();
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = selectedSuspect === characterId;

  const handleClick = (e) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(characterId);
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <ModelWrapper
      assetId={modelAssetId || `${characterId}Character`}
      position={position}
      rotation={rotation}
      scale={scale}
      isSelected={isSelected}
      isHovered={isHovered}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <PlaceholderCharacter
        characterId={characterId}
        silhouette={silhouette}
        color={color}
        name={name}
        isSelected={isSelected}
        isHovered={isHovered}
        debug={debugMode}
      />
    </ModelWrapper>
  );
}
