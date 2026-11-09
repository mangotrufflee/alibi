// src/services/stressEngine.js
// ALIBI — Deterministic Stress Engine
// Stress ranges from 0–100. Changes are deterministic based on interaction type.
// Stress is SEPARATE from guilt — high stress never independently triggers a confession.

/**
 * Stress bands with associated suspect reactions.
 * These reactions are shown as contextual UI text when a band boundary is crossed.
 */
export const STRESS_BANDS = {
  calm: { min: 0, max: 30, label: "Calm", color: "#10b981" },
  guarded: { min: 31, max: 55, label: "Guarded", color: "#3772f1" },
  evasive: { min: 56, max: 75, label: "Evasive", color: "#f59e0b" },
  panicked: { min: 76, max: 100, label: "Panicked", color: "#ba2c2c" }
};

/**
 * Per-suspect stress reaction text for each band.
 * These are DISPLAY strings, not factual answers.
 */
export const SUSPECT_STRESS_REACTIONS = {
  raju: {
    calm: "Raju fidgets with his key ring but speaks cooperatively.",
    guarded: "Raju's eyes dart toward the exits. His voice quickens.",
    evasive: "Raju starts contradicting himself and looking at the floor.",
    panicked: "Raju is sweating visibly, hands trembling. He may crack."
  },
  meera: {
    calm: "Meera maintains composure, smoking her kretek in controlled intervals.",
    guarded: "Meera's jaw tightens. Her responses become clipped and formal.",
    evasive: "Meera deflects every question with legal language and counter-threats.",
    panicked: "Meera's cigarette holder rattles. She is barely maintaining her facade."
  },
  arvind: {
    calm: "Dr. Sethi speaks with the measured cadence of an academic lecture.",
    guarded: "Dr. Sethi grips his satchel tightly, eyes distant and haunted.",
    evasive: "Dr. Sethi shifts to abstract philosophizing, avoiding direct answers.",
    panicked: "Dr. Sethi's voice breaks. He clutches his satchel to his chest."
  },
  nusrat: {
    calm: "Nusrat is alert and professional, her answers precise and measured.",
    guarded: "Nusrat clutches her phone tighter. Her responses become shorter.",
    evasive: "Nusrat repeatedly asks to call her department head.",
    panicked: "Nusrat's composure has collapsed. She is on the verge of breaking."
  },
  bhola: {
    calm: "Bhola is warm and open, his hands steady around his tea tin.",
    guarded: "Bhola pauses longer before answering, choosing words carefully.",
    evasive: "Bhola stares at the coal samovar and speaks in halting sentences.",
    panicked: "Bhola murmurs prayers under his breath. Something has deeply frightened him."
  }
};

/**
 * Returns the stress band label for a given stress value.
 */
export function getStressBand(stressValue) {
  if (stressValue <= 30) return "calm";
  if (stressValue <= 55) return "guarded";
  if (stressValue <= 75) return "evasive";
  return "panicked";
}

/**
 * Returns the stress band color for a given stress value.
 */
export function getStressBandColor(stressValue) {
  const band = getStressBand(stressValue);
  return STRESS_BANDS[band].color;
}

/**
 * Returns the stress band label (display string) for a given stress value.
 */
export function getStressBandLabel(stressValue) {
  const band = getStressBand(stressValue);
  return STRESS_BANDS[band].label;
}

/**
 * Returns the per-suspect contextual reaction string for the current stress band.
 */
export function getSuspectStressReaction(suspectId, stressValue) {
  const band = getStressBand(stressValue);
  const reactions = SUSPECT_STRESS_REACTIONS[suspectId] || SUSPECT_STRESS_REACTIONS.raju;
  return reactions[band] || "";
}

/**
 * Compute new stress after an interaction.
 *
 * @param {Object} params
 * @param {number} params.currentStress - Current stress value (0–100)
 * @param {number} params.delta - Change to apply (positive = more stress, negative = less)
 * @param {string} params.suspectId - Suspect being interrogated
 * @returns {{ newStress: number, bandChanged: boolean, oldBand: string, newBand: string, bandReaction: string }}
 */
export function computeStressUpdate({ currentStress, delta, suspectId }) {
  const oldBand = getStressBand(currentStress);
  const newStress = Math.max(0, Math.min(100, currentStress + delta));
  const newBand = getStressBand(newStress);
  const bandChanged = oldBand !== newBand;

  return {
    newStress,
    bandChanged,
    oldBand,
    newBand,
    bandReaction: bandChanged ? getSuspectStressReaction(suspectId, newStress) : null
  };
}

/**
 * Stress delta constants for different interaction types.
 * These are defaults; question-specific values override them.
 */
export const STRESS_DELTAS = {
  question_answered: 8,           // Neutral/routine question answered
  question_evasive: 4,            // Suspect deflected but answered
  contradiction_exposed: 25,      // A direct contradiction is called out
  evidence_challenge: 20,         // Evidence presented and challenged
  evidence_irrelevant: 2,         // Evidence presented but doesn't apply
  rapport_question: -5,           // Respectful/neutral question builds rapport
  subject_change: -8,             // Changing subject gives suspect relief
  repeated_question: -2,          // Already answered — suspect annoyed but calmer
  no_match: 2                     // Rephrase prompt — minimal stress
};

