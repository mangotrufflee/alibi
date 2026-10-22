// src/assets/loaders/textureLoader.js
import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map();

/**
 * Safely loads a Three.js texture.
 * Applies SRGBColorSpace for standard color textures.
 * Returns null if missing, never crashes the canvas.
 */
export async function loadTextureSafe(path, isColorMap = true) {
  if (!path) return null;

  if (textureCache.has(path)) {
    return textureCache.get(path);
  }

  try {
    const headCheck = await fetch(path, { method: "HEAD" }).catch(() => null);
    if (!headCheck || !headCheck.ok) {
      textureCache.set(path, null);
      return null;
    }

    const texture = await new Promise((resolve, reject) => {
      textureLoader.load(
        path,
        (tex) => resolve(tex),
        undefined,
        (err) => reject(err)
      );
    });

    if (texture) {
      if (isColorMap) {
        texture.colorSpace = THREE.SRGBColorSpace;
      }
      textureCache.set(path, texture);
      return texture;
    }
    return null;
  } catch (err) {
    console.info(`[Asset Pipeline] Texture not found at "${path}". Using procedural fallback material.`);
    textureCache.set(path, null);
    return null;
  }
}
