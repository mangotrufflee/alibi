// src/assets/loaders/imageLoader.js

const imageCache = new Map();

/**
 * Validates whether an image file exists at the given path.
 * Returns metadata { exists: boolean, width, height, aspectRatio } or fallback status.
 */
export async function loadImageMeta(path) {
  if (!path) return { exists: false };

  if (imageCache.has(path)) {
    return imageCache.get(path);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const meta = {
        exists: true,
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      };
      imageCache.set(path, meta);
      resolve(meta);
    };
    img.onerror = () => {
      const meta = { exists: false, aspectRatio: 1 };
      imageCache.set(path, meta);
      resolve(meta);
    };
    img.src = path;
  });
}
