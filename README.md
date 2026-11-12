
# ALIBI — The Projectionist's Last Reel

> A voice-driven, 3D detective mystery where every conversation can uncover a clue, expose a contradiction, or bring the truth closer.

<p align="center">
  <a href="https://alibi-ten-pi.vercel.app/">
    <strong>PLAY ALIBI →</strong>
  </a>
</p>

---

## Overview

ALIBI is an immersive, browser-based detective investigation game set inside Rex Talkies, an ageing single-screen cinema in Old Delhi.

During the cinema's final screening, a sudden power failure plunges the building into darkness. When the emergency lights return, veteran projectionist Harbans Lal is discovered dead inside the projection booth.

Five individuals remain trapped inside the cinema. Each has a different motive, a personal connection to the victim, and a version of events that may not be entirely truthful.

The player assumes the role of an investigator and must reconstruct the events of the night through interrogations, physical evidence, forensic investigations, interactive puzzles, and logical deductions.

ALIBI combines cinematic 3D environments, voice-based character interactions, and a structured mystery-solving system. Players must build a logical chain of evidence before making their final accusation.

**Live Demo:** https://alibi-ten-pi.vercel.app/

---

## The Mystery

### The Projectionist's Last Reel

On 17 October 2026, during the farewell screening at Rex Talkies, the municipal power grid fails at 9:17 PM. The auxiliary generator activates, but within fifteen minutes, Harbans Lal is found dead beside the projection equipment.

Five individuals are under investigation:

| Character | Role | Connection to the Case |
|---|---|---|
| Raju Ansari | Ticket Boy | Knows about the rear entrance and duplicate key |
| Meera Kapoor | Cinema Owner | Has financial interests tied to the cinema's sale |
| Dr. Arvind Sethi | Retired Professor | Connected to a missing archival film |
| Nusrat Ali | Film Student | Has a suspicious gap in her phone recording |
| Bhola Prasad | Chaiwala | Holds important eyewitness information |

### Three Possible Storylines

The game contains three canonical storylines, each with a different culprit, motive, and explanation of the crime.

**A — The Sale Must Survive**

A financial conspiracy involving Meera Kapoor, concealed archival prints, and a staged projector malfunction.

**B — The Film That Would Not Die**

An archival mystery involving Dr. Arvind Sethi, a lost film, and the erased legacy of Zohra Sen.

**C — The Missing Minute**

A concealed confrontation involving Nusrat Ali, a missing 58-second recording, and an attempt to hide her presence in the projection booth.

Each storyline contains its own clues, alibis, contradictions, evidence requirements, and revelations.

---

## Gameplay Features

### 1. Voice-Based Interrogation

Interact with five suspects through voice and text-based questioning.

- Ask questions and investigate suspicious statements.
- Challenge alibis and uncover inconsistencies.
- Discover information through character-specific dialogue.
- Track interrogation progress, stress, and trust.
- Unlock additional revelations through evidence.

### 2. Evidence Investigation

Examine physical exhibits, case files, timelines, character dossiers, and investigative notes.

Evidence is connected to the canonical storyline and helps establish the facts required for the final accusation.

### 3. Interactive Puzzles

The investigation features five major puzzles:

1. **The Ticket Is a Clock:** Reconstruct the timeline using ticket punch marks and maintenance records.
2. **The Canister That Lies:** Identify the original archival film beneath a replacement label.
3. **The Missing Fifty-Eight Seconds:** Reconstruct a missing section of a phone recording using audio-frequency alignment.
4. **The Reflection:** Examine a glass reflection to identify a suspect's presence near the staff passage.
5. **The Booth Reconstruction:** Reconstruct the physical arrangement of objects inside the projection booth.

### 4. Evidence-Based Deduction

Players must connect clues, timeline events, suspect statements, and physical evidence to establish a logical proof chain.

The final accusation is governed by predefined evidence requirements. Simply identifying a suspect is insufficient; players must establish the necessary proof.

### 5. Stress and Trust System

Suspects respond differently as interrogation progresses.

The game tracks:

- Stress levels
- Trust levels
- Previously asked questions
- Discovered clues
- Evidence presented
- Contradictions and truth-gate unlocks

These variables influence investigation progression and character reactions.

---

## AI Integration — Gnani AI

ALIBI integrates Gnani AI to create an immersive voice-based interrogation experience.

An important architectural decision is the separation of narrative intelligence from speech processing.

Rather than allowing an unrestricted generative model to invent character responses, the game uses predefined storylines, character profiles, and canonical answers. Gnani handles speech recognition and voice synthesis, while the game engine maintains control over the facts of the mystery.

### 1. Speech-to-Text (STT)

The player's spoken questions are recorded and converted into text using Gnani's Vachana API.

- API: Gnani Vachana
- Configuration: Prisma v2.5
- Input: Player voice recordings
- Output: Transcribed text

The transcript is passed to the interrogation engine for question classification.

### 2. Deterministic Dialogue Engine

Character knowledge is predefined to maintain narrative consistency and prevent hallucinations.

The system uses:

- `storylines.js` — Canonical storylines, culprits, motives, and proof requirements.
- `suspects.js` — Character profiles, personalities, and dialogue context.
- `questionDatabase.js` — Predefined questions, accepted phrasings, answers, and information-unlocking conditions.
- `questionClassifier.js` — Matches player input against predefined questions.
- `useGameStore.js` — Manages dialogue history, interrogation state, stress, trust, and evidence progression.

When a player asks a question, the classifier attempts to match it with a predefined question.

If a valid match is found and its prerequisites are satisfied, the corresponding canonical response is retrieved.

If the question is unrecognised, the character responds with a predefined, character-specific fallback response asking the player to rephrase.

This prevents the dialogue system from inventing evidence, changing alibis, or revealing unsupported narrative information.

### 3. Text-to-Speech (TTS)

The predefined character response is converted into speech using Gnani's Timbre v2.5 model.

Each suspect has a distinct voice configuration:

| Character | Voice Configuration |
|---|---|
| Raju Ansari | Shlok |
| Meera Kapoor | Urmila |
| Dr. Arvind Sethi | Deepak |
| Nusrat Ali | Kaveri |
| Bhola Prasad | Vikrant |

Character-specific voice settings help distinguish suspects and make interrogations more immersive.

### 4. Fallback Mechanisms

The application also supports browser-based speech capabilities.

- Browser Speech Recognition can be used when Gnani transcription is unavailable.
- Browser SpeechSynthesis can be used when Gnani voice generation fails.
- Predefined character responses handle unrecognised questions.

**Why deterministic dialogue?**

In a detective mystery, factual consistency is essential. A freely generating language model could invent evidence, change a suspect's alibi, or reveal the culprit prematurely.

ALIBI therefore separates the conversational interface from the underlying truth of the case. The player can interact through voice, but the game engine retains control over narrative facts and revelations.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend architecture |
| Vite | Development and build tooling |
| JavaScript | Application and game logic |
| Three.js | 3D rendering |
| React Three Fiber | React integration for Three.js |
| Drei | 3D scene utilities |
| Zustand | Centralised game state management |
| Framer Motion | Interface animations |
| CSS | Visual styling |
| Gnani Vachana / Prisma v2.5 | Speech-to-text |
| Gnani Timbre v2.5 | Text-to-speech |
| Browser Speech APIs | Voice fallback |
| Vercel | Hosting and deployment |

---

## Project Architecture

```text
ALIBI/
│
├── api/
│   ├── stt.js
│   ├── tts.js
│   └── status.js
│
├── server/
│   ├── gnaniBackend.js
│   └── suspectVoices.js
│
├── src/
│   ├── components/
│   │   ├── case/
│   │   ├── cutscenes/
│   │   ├── evidence/
│   │   ├── puzzles/
│   │   └── ui/
│   │
│   ├── data/
│   │   ├── storylines.js
│   │   ├── suspects.js
│   │   ├── questionDatabase.js
│   │   ├── caseInfo.js
│   │   ├── evidence.js
│   │   ├── clueDatabase.js
│   │   ├── puzzlesData.js
│   │   └── cutscenesData.js
│   │
│   ├── services/
│   │   ├── gnaniApi.js
│   │   ├── interrogationEngine.js
│   │   ├── questionClassifier.js
│   │   ├── scoringEngine.js
│   │   ├── stressEngine.js
│   │   └── truthGateEngine.js
│   │
│   ├── state/
│   │   ├── GameContext.jsx
│   │   └── useGameStore.js
│   │
│   ├── App.jsx
│   └── Scene.jsx
│
└── package.json
```

---

## Key Highlights

- Immersive 3D detective environment.
- Five interactive suspects with distinct personalities.
- Three possible canonical murder storylines.
- Voice-based interrogation powered by Gnani AI.
- Character-specific AI-generated speech.
- Deterministic dialogue to maintain narrative consistency.
- Five interactive investigation puzzles.
- Evidence discovery and contradiction tracking.
- Stress and trust simulation.
- Storyline-specific proof requirements.
- Browser-based gameplay and deployment.

---

## Deployment

ALIBI is hosted on Vercel and can be accessed directly through a web browser.

**Live Experience:** https://alibi-ten-pi.vercel.app/

## Project Vision

ALIBI explores how artificial intelligence, immersive 3D environments, and interactive storytelling can be combined to create a new form of narrative gaming.

Instead of using AI as an unrestricted storyteller, the project uses it as an interface between the player and a carefully constructed mystery.

Every statement can be questioned. Every clue can change the investigation. And every contradiction brings the detective closer to the truth.

**The reel has stopped. The investigation has just begun.**