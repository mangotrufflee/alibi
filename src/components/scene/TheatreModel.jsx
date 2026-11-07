// src/components/scene/TheatreModel.jsx
import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { loadModelSafe } from "../../assets/loaders/modelLoader";

/**
 * Loads the 3D Theatre environment model from public/assets/models/furniture/
 * Supports Home+Theatre.glb, theatre.glb, and Home+Theatre.gltf.
 * Uses loadModelSafe so if the binary geometry buffer (.bin) is missing,
 * it fails gracefully without crashing the React Three Fiber Canvas,
 * seamlessly allowing Theatre.jsx to render the procedural Rex Talkies auditorium.
 */
export function TheatreModel({
  position = [0, 0, -5],
  scale = [1, 1, 1],
  rotation = [0, 0, 0]
}) {
  const [model, setModel] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTheatreAsset() {
      const candidates = [
        "/assets/models/furniture/Home+Theatre.glb",
        "/assets/models/furniture/theatre.glb",
        "/assets/models/furniture/Home+Theatre.gltf"
      ];

      for (const path of candidates) {
        try {
          const loaded = await loadModelSafe(path);
          if (loaded && isMounted) {
            loaded.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                  // Ensure materials interact with noir spotlights
                  child.material.roughness = Math.max(0.65, child.material.roughness || 0.8);
                }
              }
            });
            setModel(loaded);
            return;
          }
        } catch (err) {
          // Gracefully continue to next candidate
        }
      }
    }

    loadTheatreAsset();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!model) return null;

  return (
    <primitive
      object={model}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

export default TheatreModel;

