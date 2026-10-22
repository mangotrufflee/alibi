# ALIBI — The Projectionist's Last Reel
*A Cinematic 3D Noir Detective Game set in Old Delhi during a Monsoon Blackout*

---

## Overview

**ALIBI** is a first-person investigative mystery set inside **Rex Talkies**, an ageing single-screen cinema in Old Delhi. During the 8:45 PM interval blackout of the Hindi classic *Guide*, chief projectionist **Harbans Lal** was struck down behind the locked doors of the projection booth. 

With five suspects trapped inside the cinema and the backup diesel generator rapidly failing, you must examine physical evidence, cross-examine suspects using voice or typed queries, and deduce the murder method before the lights go out completely.

---

## Tech Stack

- **Build Tool:** Vite
- **Frontend Framework:** React 19
- **3D Graphics:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Styling:** Vanilla CSS with custom Indian Noir Design System (dark teal, charcoal black, muted amber, faded burgundy, aged cream)
- **Asset Architecture:** Zero-Asset Policy with modular asset manifest, procedural fallbacks, and multi-workflow loader pipeline.

---

## Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle (optional)
npm run build
```

The game will run immediately at `http://localhost:5173/` without requiring any downloaded assets.

---

## Zero-Asset Policy & Pipeline Architecture

The initial foundation uses **100% procedural geometry and shaders** for all theatre architecture, lighting, suspects, and evidence props. If any model or texture file is absent, the game gracefully renders procedural placeholders and will **never crash** or show a blank screen.

### Directory Structure for Assets

```
public/assets/
├── models/
│   ├── characters/       # 3D GLB/GLTF models for suspects (raju.glb, meera.glb, etc.)
│   ├── environment/      # 3D architectural pieces (theatre-hall.glb, screen-frame.glb)
│   ├── furniture/        # Cinema seats, projection booth equipment
│   └── evidence/         # 3D evidence models (ticket-stub.glb, duplicate-key.glb, etc.)
├── textures/
│   ├── characters/       # Diffuse, normal, and roughness textures
│   ├── environment/      # Distressed plaster walls, silver screen fabric
│   └── evidence/         # Detail textures for props
├── illustrations/
│   ├── characters/       # Hand-drawn 2D character portraits (transparent PNG / WebP)
│   ├── evidence/         # Hand-drawn evidence cards and forensic illustrations
│   ├── backgrounds/      # Stylized Delhi street and cinema backdrops
│   └── UI/               # Vintage cinema posters, badges, and logos
└── audio/
    └── ...               # Voice lines, ambient rain, projector motor Foley
```

---

## How to Import Your Assets

### Workflow A: Hand-Drawn Illustrations (2D Art)
1. Export your hand-drawn illustration as a **transparent PNG** or **WebP** image (aspect ratios are preserved automatically).
2. Place the file into `public/assets/illustrations/characters/` or `public/assets/illustrations/evidence/`.
3. In `src/assets/manifest.js`, update the asset entry:
   ```javascript
   rajuPortrait: {
     id: "rajuPortrait",
     type: "image",
     path: "/assets/illustrations/characters/raju-portrait.png",
     fallback: "placeholder-portrait",
     status: "ready", // change from "placeholder" to "ready"
   }
   ```
4. The interrogation interface and evidence cards will automatically display your artwork with proper transparency.

### Workflow B: Imported 3D Models (.glb / .gltf)
1. Export your 3D model as a standard `.glb` or `.gltf` file.
2. Place the file into `public/assets/models/characters/` or `public/assets/models/evidence/`.
3. In `src/assets/manifest.js`, point to your file and configure transforms if needed:
   ```javascript
   rajuCharacter: {
     id: "rajuCharacter",
     type: "model",
     path: "/assets/models/characters/raju.glb",
     fallback: "placeholder-character",
     status: "ready", // change from "placeholder" to "ready"
     transform: { scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] }
   }
   ```
4. The 3D scene will render your imported model in place of the procedural placeholder silhouette without modifying any gameplay code.

---

## Development Tools & Debug Modes

In the top bar, you can toggle developer tools:
- **Asset Pipeline Mode:** Toggle between `Asset Pipeline` (attempts loading imported assets with safe fallback) and `Placeholder Mode` (forces procedural geometry to test scale and layout).
- **Debug Tags:** Overlays 3D asset IDs, character silhouettes, wireframes, and opens the **ALIBI Dev Pipeline Inspector** showing the status of every manifest entry.
- **Wide View [🎥]:** Resets the camera to the full auditorium view whenever focused on a suspect.
- **Detective Board [📋]:** Opens the interactive corkboard deduction board with pinned suspect dossiers and case hypothesis selectors.

---

## The 5 Suspects

| Name | Role | Age | Silhouette & Seating | Initial Motive |
| :--- | :--- | :--- | :--- | :--- |
| **Raju Ansari** | Ticket Boy | 19 | Slim silhouette, Row 2 Center | Owed Harbans Lal gambling debts; duplicate booth key |
| **Meera Kapoor** | Cinema Owner | 42 | Upright structured drape, Row 2 Right | Harbans Lal blocked the 18-crore redevelopment sale deed |
| **Dr. Arvind Sethi** | Retired Professor | 68 | Stooped elderly silhouette, Row 1 Center | Investigating missing 35mm nitrate prints sold illegally |
| **Nusrat Ali** | Film Student | 23 | Alert silhouette with bag, Row 1 Right | Audio recorder left in booth with 12 minutes wiped |
| **Bhola Prasad** | Chaiwala | 56 | Broad silhouette with vest, Row 0 Center | Overheard violent argument behind screen before interval |

---

## License

Built for **ALIBI** Game Production. Proprietary detective game foundation.
