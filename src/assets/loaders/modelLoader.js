// src/assets/loaders/modelLoader.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const gltfLoader = new GLTFLoader();
const modelCache = new Map();

/**
 * Safely loads a GLTF/GLB model from path.
 * Returns the cloned scene on success or null on failure.
 * Never throws uncaught runtime errors.
 */
export async function loadModelSafe(path) {
  if (!path) return null;

  if (modelCache.has(path)) {
    const cached = modelCache.get(path);
    return cached ? cached.clone() : null;
  }

  try {
    // Check if file exists via HEAD request first to prevent browser 404 console cascades
    const response = await fetch(path, { method: "HEAD" }).catch(() => null);
    if (!response || !response.ok) {
      // Asset file not present yet, expected in placeholder mode
      modelCache.set(path, null);
      return null;
    }

    const gltf = await new Promise((resolve, reject) => {
      gltfLoader.load(
        path,
        (data) => resolve(data),
        undefined,
        (err) => reject(err)
      );
    });

    if (gltf && gltf.scene) {
      modelCache.set(path, gltf.scene);
      return gltf.scene.clone();
    }
    return null;
  } catch (error) {
    console.info(`[Asset Pipeline] Model not found at "${path}". Gracefully using procedural placeholder.`);
    modelCache.set(path, null);
    return null;
  }
}
