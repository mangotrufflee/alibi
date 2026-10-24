// src/services/truthGateEngine.js
// ALIBI — Phase 4: Truth Gates & Contradiction Evaluation Engine (GDD §8)

import { SUSPECT_CHARACTER_SHEETS, TRUTH_GATES } from "../data/truthGatesData.js";
import { CONTRADICTIONS } from "../data/caseTabsData.js";

export class TruthGateEngine {
  constructor() {
    this.gates = [...TRUTH_GATES];
  }

  /**
   * Evaluates an interrogation query against active truth gates for the suspect.
   */
  evaluateQuery(suspectId, queryText, liveState, unlockedGateIds = [], seenEvidence = [], resolvedContradictions = []) {
    const cleanText = (queryText || "").toLowerCase();
    const suspectGates = this.gates.filter((g) => g.suspectId === suspectId);
    const suspectState = liveState[suspectId] || { stress: 30, trust: 50 };

    for (const gate of suspectGates) {
      const isAlreadyUnlocked = unlockedGateIds.includes(gate.id);
      const kw = gate.conditions.matchKeyword ? gate.conditions.matchKeyword.toLowerCase() : null;

      // Check if player's question mentions the gate's topic
      if (kw && cleanText.includes(kw)) {
        if (isAlreadyUnlocked) {
          // Already confessed, reiterate with slight emphasis
          return {
            triggered: true,
            unlockedNow: false,
            alreadyUnlocked: true,
            gate,
            response: `As I already confessed: ${gate.unlockedAdmission}`,
            stressDelta: 4,
            trustDelta: 0
          };
        }

        // Evaluate unlock conditions
        const stressMet = suspectState.stress >= (gate.conditions.minStress || 50);
        const evidenceMet = gate.conditions.requiredEvidence &&
          gate.conditions.requiredEvidence.some((e) => seenEvidence.includes(e));
        const contradictionMet = gate.conditions.requiredContradiction &&
          resolvedContradictions.includes(gate.conditions.requiredContradiction);

        if (stressMet || evidenceMet || contradictionMet) {
          // TRUTH GATE UNLOCKED!
          return {
            triggered: true,
            unlockedNow: true,
            gate,
            response: gate.unlockedAdmission,
            stressDelta: gate.stressDelta,
            trustDelta: gate.trustDelta,
            points: gate.points,
            unlockedClue: gate.unlockedClue,
            checklistGoalId: gate.checklistGoalId
          };
        } else {
          // LOCKED: Suspect deflects using character style
          return {
            triggered: true,
            unlockedNow: false,
            gate,
            response: gate.lockedResponse,
            stressDelta: 8, // pressing on a locked secret still raises pressure
            trustDelta: -3,
            deflection: true
          };
        }
      }
    }

    return { triggered: false };
  }

  /**
   * Evaluates a direct Contradiction Challenge (GDD §8).
   * Verifies the clash against logged evidence and timelines.
   */
  evaluateContradictionChallenge(contradictionId, liveState, unlockedGateIds = []) {
    const contradiction = CONTRADICTIONS.find((c) => c.id === contradictionId);
    if (!contradiction) {
      return {
        valid: false,
        response: "That's an unfounded accusation, Inspector. Get your facts straight before interrogating me.",
        stressDelta: -5,
        trustDelta: -15
      };
    }

    const suspectId = contradiction.suspectA;
    // Find associated truth gate for this contradiction
    const associatedGate = this.gates.find(
      (g) => g.suspectId === suspectId && g.conditions.requiredContradiction === contradictionId
    ) || this.gates.find((g) => g.suspectId === suspectId && !unlockedGateIds.includes(g.id));

    if (associatedGate) {
      return {
        valid: true,
        contradiction,
        suspectId,
        gate: associatedGate,
        admission: associatedGate.unlockedAdmission,
        stressDelta: associatedGate.stressDelta + 10,
        trustDelta: associatedGate.trustDelta,
        points: associatedGate.points,
        unlockedClue: associatedGate.unlockedClue,
        checklistGoalId: associatedGate.checklistGoalId
      };
    }

    return {
      valid: true,
      contradiction,
      suspectId,
      gate: null,
      admission: "I... I admit my timeline was scrambled! But you have no right to treat me like a criminal!",
      stressDelta: 20,
      trustDelta: -5,
      points: 15,
      unlockedClue: `${contradiction.title}: Suspect's claim crumbled under cross-examination.`,
      checklistGoalId: null
    };
  }

  /**
   * Formats the LLM Prompt Context following GDD §8.
   */
  buildPromptContext(suspectId, liveState, unlockedGateIds = []) {
    const sheet = SUSPECT_CHARACTER_SHEETS[suspectId];
    if (!sheet) return "";

    const suspectState = liveState[suspectId] || { stress: 30, trust: 50 };
    const suspectGates = this.gates.filter((g) => g.suspectId === suspectId);

    const allowedFacts = suspectGates
      .filter((g) => unlockedGateIds.includes(g.id))
      .map((g) => `- ${g.secretFact}`);

    const forbiddenSecrets = suspectGates
      .filter((g) => !unlockedGateIds.includes(g.id))
      .map((g) => `- ${g.secretFact} [KEEP HIDDEN: ${g.lockedResponse}]`);

    return `
=== SUSPECT CHARACTER SHEET: ${sheet.name.toUpperCase()} (${sheet.role}) ===
Speaking Style: ${sheet.speakingStyle.tone}. Pace: ${sheet.speakingStyle.pace}.
Deflection Pattern: ${sheet.speakingStyle.deflectionPattern}
Fears: ${sheet.fears}
Protects: ${sheet.protects}

=== LIVE SUSPECT STATE ===
Stress Level: ${suspectState.stress} / 100
Trust Toward Detective: ${suspectState.trust} / 100
Contradictions Caught: ${suspectState.contradictionsCaught || 0}

=== TRUTH GATES & REVELATION RULES ===
ALLOWED REVELATIONS (Truth Gates Unlocked):
${allowedFacts.length > 0 ? allowedFacts.join("\n") : "None yet. Reveal nothing concrete."}

FORBIDDEN SECRETS (Must Deflect):
${forbiddenSecrets.join("\n")}
`;
  }
}

export const truthGateEngine = new TruthGateEngine();
