// src/assets/placeholders/IllustrationPlane.jsx
import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { useAsset } from "../registry";
import { useGame } from "../../state/GameContext";

/**
 * Workflow A: Hand-drawn illustrations.
 * Renders a hand-drawn PNG/WebP illustration on a flat 3D plane with transparency,
 * maintaining proper aspect ratio and alpha channel.
 * Falls back to an artistic procedural card placeholder if image is missing.
 */
export function IllustrationPlane({
  assetId,
  width = 1,
  height = 1.4,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  doubleSided = true,
  fallbackLabel = "Illustration",
  fallbackColor = "#1e293b"
}) {
  const { assetMode } = useGame();
  const { status, data, entry } = useAsset(assetId, assetMode);
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (status === "ready" && typeof data === "string") {
      const loader = new THREE.TextureLoader();
      loader.load(data, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      });
    } else {
      setTexture(null);
    }
  }, [status, data]);

  return (
    <group position={position} rotation={rotation}>
      {texture ? (
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            map={texture}
            transparent
            alphaTest={0.05}
            side={doubleSided ? THREE.DoubleSide : THREE.FrontSide}
          />
        </mesh>
      ) : (
        // Procedural placeholder card
        <group>
          <mesh>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial
              color={fallbackColor}
              roughness={0.7}
              side={doubleSided ? THREE.DoubleSide : THREE.FrontSide}
            />
          </mesh>
          {/* Card Border */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
            <lineBasicMaterial color="#d97706" />
          </lineSegments>
        </group>
      )}
    </group>
  );
}
