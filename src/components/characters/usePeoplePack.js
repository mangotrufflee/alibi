// src/components/characters/usePeoplePack.js
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PEOPLE_GLTF_PATH = "/assets/models/characters/people.gltf";

// Preload asset for immediate non-blocking availability
try {
  useGLTF.preload(PEOPLE_GLTF_PATH);
} catch (e) {
  // Graceful preload error handling
}

/**
 * Custom hook to load and extract centered geometries from people.gltf
 * The pack contains 8 low-poly character meshes:
 * 1: Seated young person (SM_People_Lowpoly_01)
 * 2: Seated woman (SM_People_Lowpoly_02)
 * 3: Standing older gentleman (SM_People_Lowpoly_03)
 * 4: Standing young student (SM_People_Lowpoly_04)
 * 5: Standing vendor / middle-aged man (SM_People_Lowpoly_05)
 * 6: Standing man (SM_People_Lowpoly_06)
 * 7: Standing man (SM_People_Lowpoly_07)
 * 8: Standing woman (SM_People_Lowpoly_08)
 */
export function usePeoplePack() {
  const gltf = useGLTF(PEOPLE_GLTF_PATH);

  const geometries = useMemo(() => {
    const map = {};
    if (!gltf || !gltf.scene) return map;

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        const match = child.name.match(/SM_People_Lowpoly_0?(\d+)/);
        const index = match ? parseInt(match[1], 10) : null;
        if (index !== null && !map[index]) {
          const geom = child.geometry.clone();
          geom.computeBoundingBox();
          const box = geom.boundingBox;
          if (box) {
            const centerX = (box.min.x + box.max.x) / 2;
            const minY = box.min.y;
            const centerZ = (box.min.z + box.max.z) / 2;
            // Center origin at feet / seat contact point (minY) and centered in X & Z
            geom.translate(-centerX, -minY, -centerZ);
            map[index] = geom;
          }
        }
      }
    });

    return map;
  }, [gltf]);

  return { geometries, isReady: Object.keys(geometries).length > 0 };
}

