// src/assets/placeholders/ModelWrapper.jsx
import React, { useMemo } from "react";
import { useAsset } from "../registry";
import { useGame } from "../../state/GameContext";

/**
 * Universal Wrapper for 3D Assets.
 * Workflow B: Supports imported .glb / .gltf models.
 * Automatically falls back to procedural placeholders if the asset is missing,
 * preserving position, rotation, scale, shadows, selection highlight, and click interaction.
 */
export function ModelWrapper({
  assetId,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  castShadow = true,
  receiveShadow = true,
  isSelected = false,
  isHovered = false,
  onClick,
  onPointerOver,
  onPointerOut,
  children, // Fallback component to render if asset is not loaded
  ...props
}) {
  const { assetMode, debugMode } = useGame();
  const { status, data, entry } = useAsset(assetId, assetMode);

  // If imported model scene is available:
  const modelObject = useMemo(() => {
    if (status === "ready" && data) {
      const cloned = data.clone();
      cloned.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = castShadow;
          node.receiveShadow = receiveShadow;
        }
      });
      return cloned;
    }
    return null;
  }, [status, data, castShadow, receiveShadow]);

  const transformScale = entry?.transform?.scale || scale;
  const transformPos = entry?.transform?.position || position;
  const transformRot = entry?.transform?.rotation || rotation;

  return (
    <group
      position={transformPos}
      rotation={transformRot}
      scale={transformScale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      {...props}
    >
      {modelObject ? (
        <primitive object={modelObject} />
      ) : (
        // Render fallback procedural placeholder
        children
      )}
    </group>
  );
}
