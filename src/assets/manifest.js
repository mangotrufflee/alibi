// src/assets/manifest.js
// Central Asset Manifest for ALIBI
// All visual assets can be replaced here without changing gameplay or scene logic.

export const assetManifest = {
  // --- CHARACTERS (3D Models) ---
  rajuCharacter: {
    id: "rajuCharacter",
    name: "Raju Ansari (Model)",
    type: "model",
    path: "/assets/models/characters/raju.glb",
    fallback: "placeholder-character",
    status: "placeholder",
    transform: { scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] }
  },
  meeraCharacter: {
    id: "meeraCharacter",
    name: "Meera Kapoor (Model)",
    type: "model",
    path: "/assets/models/characters/meera.glb",
    fallback: "placeholder-character",
    status: "placeholder",
    transform: { scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] }
  },
  arvindCharacter: {
    id: "arvindCharacter",
    name: "Dr. Arvind Sethi (Model)",
    type: "model",
    path: "/assets/models/characters/arvind.glb",
    fallback: "placeholder-character",
    status: "placeholder",
    transform: { scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] }
  },
  nusratCharacter: {
    id: "nusratCharacter",
    name: "Nusrat Ali (Model)",
    type: "model",
    path: "/assets/models/characters/nusrat.glb",
    fallback: "placeholder-character",
    status: "placeholder",
    transform: { scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] }
  },
  bholaCharacter: {
    id: "bholaCharacter",
    name: "Bhola Prasad (Model)",
    type: "model",
    path: "/assets/models/characters/bhola.glb",
    fallback: "placeholder-character",
    status: "placeholder",
    transform: { scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] }
  },

  // --- CHARACTER PORTRAITS (2D Illustrations) ---
  rajuPortrait: {
    id: "rajuPortrait",
    name: "Raju Ansari Portrait",
    type: "image",
    path: "/assets/illustrations/characters/raju-portrait.png",
    fallback: "placeholder-portrait",
    status: "placeholder"
  },
  meeraPortrait: {
    id: "meeraPortrait",
    name: "Meera Kapoor Portrait",
    type: "image",
    path: "/assets/illustrations/characters/meera-portrait.png",
    fallback: "placeholder-portrait",
    status: "placeholder"
  },
  arvindPortrait: {
    id: "arvindPortrait",
    name: "Dr. Arvind Sethi Portrait",
    type: "image",
    path: "/assets/illustrations/characters/arvind-portrait.png",
    fallback: "placeholder-portrait",
    status: "placeholder"
  },
  nusratPortrait: {
    id: "nusratPortrait",
    name: "Nusrat Ali Portrait",
    type: "image",
    path: "/assets/illustrations/characters/nusrat-portrait.png",
    fallback: "placeholder-portrait",
    status: "placeholder"
  },
  bholaPortrait: {
    id: "bholaPortrait",
    name: "Bhola Prasad Portrait",
    type: "image",
    path: "/assets/illustrations/characters/bhola-portrait.png",
    fallback: "placeholder-portrait",
    status: "placeholder"
  },

  // --- EVIDENCE OBJECTS (3D Models & 2D Illustrations) ---
  ticketStub: {
    id: "ticketStub",
    name: "Ticket Stub #409",
    type: "model",
    path: "/assets/models/evidence/ticket-stub.glb",
    fallback: "placeholder-prop",
    status: "placeholder",
    transform: { scale: [1, 1, 1] }
  },
  ticketStubImage: {
    id: "ticketStubImage",
    name: "Ticket Stub Illustration",
    type: "image",
    path: "/assets/illustrations/evidence/ticket-stub.png",
    fallback: "placeholder-prop-image",
    status: "placeholder"
  },
  duplicateKey: {
    id: "duplicateKey",
    name: "Duplicate Booth Key",
    type: "model",
    path: "/assets/models/evidence/duplicate-key.glb",
    fallback: "placeholder-prop",
    status: "placeholder",
    transform: { scale: [1, 1, 1] }
  },
  teaGlass: {
    id: "teaGlass",
    name: "Cutting Chai Glass",
    type: "model",
    path: "/assets/models/evidence/tea-glass.glb",
    fallback: "placeholder-prop",
    status: "placeholder",
    transform: { scale: [1, 1, 1] }
  },
  maintenanceLog: {
    id: "maintenanceLog",
    name: "Projector Maintenance Log",
    type: "model",
    path: "/assets/models/evidence/maintenance-log.glb",
    fallback: "placeholder-prop",
    status: "placeholder",
    transform: { scale: [1, 1, 1] }
  },
  filmStrip: {
    id: "filmStrip",
    name: "Three-Splice Film Strip",
    type: "model",
    path: "/assets/models/evidence/film-strip.glb",
    fallback: "placeholder-prop",
    status: "placeholder",
    transform: { scale: [1, 1, 1] }
  },

  // --- ENVIRONMENT & TEXTURES ---
  theatreWall: {
    id: "theatreWall",
    name: "Rex Cinema Distressed Wall Texture",
    type: "texture",
    path: "/assets/textures/environment/theatre-wall.png",
    fallback: "procedural-material",
    status: "placeholder"
  },
  cinemaScreen: {
    id: "cinemaScreen",
    name: "Silver Screen Fabric Texture",
    type: "texture",
    path: "/assets/textures/environment/screen-fabric.png",
    fallback: "procedural-material",
    status: "placeholder"
  },
  posterVintage1: {
    id: "posterVintage1",
    name: "Vintage Hindi Film Poster 1",
    type: "image",
    path: "/assets/illustrations/UI/poster-guide-1965.png",
    fallback: "placeholder-poster",
    status: "placeholder"
  },
  posterVintage2: {
    id: "posterVintage2",
    name: "Vintage Hindi Film Poster 2",
    type: "image",
    path: "/assets/illustrations/UI/poster-shree420.png",
    fallback: "placeholder-poster",
    status: "placeholder"
  }
};
