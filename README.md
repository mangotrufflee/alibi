# ALIBI — Gnani.ai Voice Interrogation Noir

*An Old Delhi 1965 Detective Mystery powered by Gnani.ai Voice Pipeline (Prisma v2.5 STT & Timbre v2.5 TTS)*

---

## Overview

**ALIBI** is a voice-driven detective interrogation experience set inside **Rex Talkies**, an Old Delhi single-screen cinema during the 8:45 PM monsoon blackout of *Guide*. Chief projectionist **Harbans Lal** was struck down behind locked booth doors.

You interrogate five suspects using your microphone or direct cross-examination queries, powered by the **Gnani.ai Speech & Voice Pipeline**:
1. **Raju Ansari** (Ticket Boy, Age 19) — *Gnani Voice: Pranav (hi-IN / en-IN)*
2. **Meera Kapoor** (Cinema Owner, Age 42) — *Gnani Voice: Nalini (en-IN)*
3. **Dr. Arvind Sethi** (Retired Professor, Age 68) — *Gnani Voice: Pranav (en-IN)*
4. **Nusrat Ali** (Film Student, Age 23) — *Gnani Voice: Yashvi (en-IN)*
5. **Bhola Prasad** (Cinema Chaiwala, Age 56) — *Gnani Voice: Pranav (hi-IN)*

---

## Gnani.ai Voice Pipeline Architecture

```
[Detective Microphone]
         │ (16kHz PCM WAV Audio)
         ▼
[Gnani Prisma STT v3] ──> POST https://api.vachana.ai/stt/v3
         │ (Transcribed Query: "Where were you at 8:45 PM?")
         ▼
[Suspect NLP & Clue Engine]
         │ (Contextual response + Stress level + Unlocked clues)
         ▼
[Gnani Timbre TTS v2.5] ──> POST https://api.vachana.ai/api/v1/tts/inference
         │ (Voice Models: Nalini, Pranav, Yashvi)
         ▼
[Suspect Audio Voice Playback]
```

### Dual-Mode Architecture (Production & Zero-Setup Fallback)
- **Live Mode**: Set your Gnani API Key (`X-API-Key-ID`) in the **⚡ Gnani AI Pipeline** tab. Requests hit `https://api.vachana.ai` directly.
- **Interactive Fallback Mode**: If no API key is entered or during offline testing, the system automatically uses browser speech recognition (`SpeechRecognition` / Web Audio) and voice synthesis (`speechSynthesis`) with intelligent suspect reasoning, ensuring the game runs seamlessly with zero errors.

---

## Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open `http://localhost:5173/` (or the port Vite outputs) in your browser.

---

## Key Features

- **Push-to-Talk Microphone**: Real-time microphone audio recording with speech visualizer.
- **Gnani Pipeline Visualizer**: Interactive diagram with latency metrics, payload preview, voice audition tester, and live event console.
- **Cross-Examination**: Dynamic clue detection that alters suspect demeanor from *Calm* to *Panicked/Contradictory*.
- **Forensic Evidence Dossier**: 12 detailed crime scene items including punched tickets, duplicate keys, poisoned chai dregs, and tampered generator meters.
- **Accusation System**: Formally indict the killer and murder weapon to solve the mystery.
