// src/assets/registry.js
import { useState, useEffect } from "react";
import { assetManifest } from "./manifest";
import { loadModelSafe } from "./loaders/modelLoader";
import { loadTextureSafe } from "./loaders/textureLoader";
import { loadImageMeta } from "./loaders/imageLoader";

export function getManifestEntry(assetId) {
  return assetManifest[assetId] || null;
}

export function getAllManifestEntries() {
  return Object.values(assetManifest);
}

/**
 * Universal safe asset loader.
 * Returns { status: 'ready' | 'placeholder', data, manifest: entry }
 */
export async function resolveAsset(assetId, forcePlaceholder = false) {
  const entry = assetManifest[assetId];
  if (!entry) {
    return { status: "missing", data: null, entry: null };
  }

  if (forcePlaceholder || entry.status === "placeholder") {
    return { status: "placeholder", data: null, entry };
  }

  try {
    if (entry.type === "model") {
      const model = await loadModelSafe(entry.path);
      if (model) {
        return { status: "ready", data: model, entry };
      }
    } else if (entry.type === "texture") {
      const texture = await loadTextureSafe(entry.path);
      if (texture) {
        return { status: "ready", data: texture, entry };
      }
    } else if (entry.type === "image") {
      const meta = await loadImageMeta(entry.path);
      if (meta.exists) {
        return { status: "ready", data: entry.path, meta, entry };
      }
    }
  } catch (err) {
    console.warn(`[Registry] Error resolving asset ${assetId}:`, err);
  }

  return { status: "placeholder", data: null, entry };
}

/**
 * React Hook for consuming an asset inside 3D or 2D components.
 */
export function useAsset(assetId, assetMode = "asset") {
  const [result, setResult] = useState({
    loading: true,
    status: "placeholder",
    data: null,
    entry: assetManifest[assetId] || null
  });

  useEffect(() => {
    let isMounted = true;
    const forcePlaceholder = assetMode === "placeholder";

    resolveAsset(assetId, forcePlaceholder).then((res) => {
      if (isMounted) {
        setResult({
          loading: false,
          status: res.status,
          data: res.data,
          entry: res.entry
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [assetId, assetMode]);

  return result;
}
