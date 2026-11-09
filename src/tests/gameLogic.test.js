// src/tests/gameLogic.test.js
// ALIBI — 12 Canonical Automated Test Cases
// Deterministic interrogation, stress engine, evidence challenge, clue progression, and accusation tests.

import test from "node:test";
import assert from "node:assert/strict";

import { QUESTION_DATABASE, getCanonicalAnswer, getQuestion } from "../data/questionDatabase.js";
import { CLUE_DATABASE, getClue, getCluesForStoryline } from "../data/clueDatabase.js";
import { EVIDENCE_CHALLENGES, getChallengeForEvidenceAndSuspect } from "../data/evidenceChallenges.js";
import { ACCUSATION_REQUIREMENTS, checkAccusationEligibility } from "../data/accusationRequirements.js";
import { STORYLINES } from "../data/storylines.js";
import { classifyQuestion, arePrerequisitesMet } from "../services/questionClassifier.js";
import { computeStressUpdate, getStressBand, getSuspectStressReaction } from "../services/stressEngine.js";
import { useGameStore } from "../state/useGameStore.js";

// Helper to reset store cleanly before tests
function resetTestStore(routeId = "A") {
  useGameStore.getState().resetRun(routeId);
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST 1: Question mapping determinism
// Different phrasings must map to the same canonical question ID
// ─────────────────────────────────────────────────────────────────────────────
test("Test 1: Question mapping determinism — different phrasings map to same question ID", () => {
  const phrasingA = "Why was the duplicate back door key left unlatched?";
  const phrasingB = "Who gave you five hundred rupees to leave the rear entrance open?";
  const phrasingC = "Tell me about the staff passage and duplicate key";

  const matchA = classifyQuestion(phrasingA, "raju", "A");
  const matchB = classifyQuestion(phrasingB, "raju", "A");
  const matchC = classifyQuestion(phrasingC, "raju", "A");

  assert.equal(matchA.questionId, "raju_back_door", "Phrasing A should map to raju_back_door");
  assert.equal(matchB.questionId, "raju_back_door", "Phrasing B should map to raju_back_door");
  assert.equal(matchC.questionId, "raju_back_door", "Phrasing C should map to raju_back_door");
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 2: Canonical answer consistency
// The same question ID must always return the exact same predefined answer
// ─────────────────────────────────────────────────────────────────────────────
test("Test 2: Canonical answer consistency — identical answer returned repeatedly", () => {
  const result1 = getCanonicalAnswer("raju_back_door");
  const result2 = getCanonicalAnswer("raju_back_door");
  const result3 = getCanonicalAnswer("raju_back_door");

  assert.ok(result1, "Canonical answer should exist");
  assert.equal(result1.answer, result2.answer, "Answer 1 and 2 must be identical");
  assert.equal(result2.answer, result3.answer, "Answer 2 and 3 must be identical");
  assert.ok(result1.answer.includes("five hundred rupees"), "Answer must contain canonical content");
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 3: Stress engine bounds
// Stress must strictly remain between 0 and 100
// ─────────────────────────────────────────────────────────────────────────────
test("Test 3: Stress engine bounds — clamped strictly to [0, 100]", () => {
  // Test upper bound
  const overMax = computeStressUpdate({ currentStress: 90, delta: 50, suspectId: "raju" });
  assert.equal(overMax.newStress, 100, "Stress exceeding 100 must clamp to 100");

  // Test lower bound
  const underMin = computeStressUpdate({ currentStress: 10, delta: -30, suspectId: "raju" });
  assert.equal(underMin.newStress, 0, "Stress below 0 must clamp to 0");

  // Normal within bounds
  const normal = computeStressUpdate({ currentStress: 40, delta: 15, suspectId: "raju" });
  assert.equal(normal.newStress, 55, "Normal stress update should calculate correctly");
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 4: Stress band transitions and reactions
// Band changes trigger contextual suspect demeanor reactions
// ─────────────────────────────────────────────────────────────────────────────
test("Test 4: Stress band transitions and reactions", () => {
  assert.equal(getStressBand(20), "calm", "20 should be calm");
  assert.equal(getStressBand(45), "guarded", "45 should be guarded");
  assert.equal(getStressBand(65), "evasive", "65 should be evasive");
  assert.equal(getStressBand(85), "panicked", "85 should be panicked");

  // Transition from guarded (40) to evasive (65)
  const transition = computeStressUpdate({ currentStress: 40, delta: 25, suspectId: "meera" });
  assert.equal(transition.bandChanged, true, "Should detect band transition");
  assert.equal(transition.oldBand, "guarded");
  assert.equal(transition.newBand, "evasive");
  assert.ok(transition.bandReaction.length > 0, "Contextual reaction must be provided");
  assert.ok(transition.bandReaction.includes("Meera"), "Reaction should be suspect-specific");
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 5: Evidence challenge validation
// Challenges require prerequisites before processing
// ─────────────────────────────────────────────────────────────────────────────
test("Test 5: Evidence challenge validation — prerequisites enforced", async () => {
  resetTestStore("A");
  const store = useGameStore.getState();

  // Try presenting sale ledger to Meera before asking cinema_sale question
  const resultBefore = await store.presentEvidence("sale_ledger", "meera");
  assert.equal(resultBefore.success, false, "Challenge should fail without prerequisite question");
  assert.equal(resultBefore.reason, "prerequisites_not_met");

  // Now satisfy the prerequisite question
  await store.askQuestion("meera_cinema_sale", "Tell me about the cinema sale");

  // Now present the evidence again
  const resultAfter = await store.presentEvidence("sale_ledger", "meera");
  assert.equal(resultAfter.success, true, "Challenge should succeed after prerequisite is met");
  assert.ok(resultAfter.response.includes("page forty-seven"), "Should return canonical challenge response");
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 6: Duplicate evidence challenge prevention
// Repeated evidence presentation cannot award rewards twice
// ─────────────────────────────────────────────────────────────────────────────
test("Test 6: Duplicate evidence challenge prevention — no duplicate rewards", async () => {
  resetTestStore("A");
  const store = useGameStore.getState();

  // Setup prerequisite
  await store.askQuestion("meera_cinema_sale", "Tell me about the cinema sale");

  // First presentation
  const first = await store.presentEvidence("sale_ledger", "meera");
  assert.equal(first.success, true);
  assert.ok(first.clueUnlocked, "First challenge should unlock a clue");

  const clueCountBefore = useGameStore.getState().discoveredClueIds.length;

  // Second presentation
  const second = await store.presentEvidence("sale_ledger", "meera");
  assert.equal(second.success, true);
  assert.equal(second.isRepeat, true, "Repeated challenge must be flagged as repeat");
  assert.equal(second.stressDelta, 0, "Repeated challenge should not add stress");

  const clueCountAfter = useGameStore.getState().discoveredClueIds.length;
  assert.equal(clueCountBefore, clueCountAfter, "Repeated challenge must not award new clues");
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 7: Clue unlocking progression
// Clues unlock only when conditions are satisfied and contain all required metadata
// ─────────────────────────────────────────────────────────────────────────────
test("Test 7: Clue unlocking progression — complete metadata", async () => {
  resetTestStore("A");
  const store = useGameStore.getState();

  assert.equal(store.discoveredClueIds.includes("clue_raju_back_door_bribe"), false);

  // Ask question that unlocks the clue
  const result = await store.askQuestion("raju_back_door", "Why was the door unlatched?");
  assert.equal(result.success, true);
  assert.ok(result.clueUnlocked, "Question should return unlocked clue object");

  const clue = getClue("clue_raju_back_door_bribe");
  assert.ok(clue, "Clue must exist in database");
  assert.ok(clue.id, "Clue must have unique ID");
  assert.ok(clue.title, "Clue must have title");
  assert.ok(clue.description, "Clue must have description");
  assert.ok(clue.source, "Clue must specify source");
  assert.ok(Array.isArray(clue.storylines), "Clue must specify storyline association");
  assert.ok(Array.isArray(clue.relatedEvidenceIds), "Clue must specify related evidence");
  assert.ok(Array.isArray(clue.relatedSuspectIds), "Clue must specify related suspects");
  assert.ok(Array.isArray(clue.relatedFacts), "Clue must specify related facts");

  assert.ok(useGameStore.getState().discoveredClueIds.includes("clue_raju_back_door_bribe"));
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 8: Storyline independence — Storyline A (Meera Kapoor)
// ─────────────────────────────────────────────────────────────────────────────
test("Test 8: Storyline independence — Storyline A (Meera is culprit)", () => {
  const routeA = STORYLINES.A;
  assert.equal(routeA.culpritId, "meera");
  assert.equal(routeA.culpritName, "Meera Kapoor");

  const reqA = ACCUSATION_REQUIREMENTS.A;
  assert.equal(reqA.killerSuspectId, "meera");
  assert.ok(reqA.requiredEvidenceIds.includes("sale_ledger"));
  assert.ok(reqA.requiredClueIds.includes("clue_meera_admits_struggle"));
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 9: Storyline independence — Storyline B (Dr. Arvind Sethi)
// ─────────────────────────────────────────────────────────────────────────────
test("Test 9: Storyline independence — Storyline B (Dr. Arvind Sethi is culprit)", () => {
  const routeB = STORYLINES.B;
  assert.equal(routeB.culpritId, "arvind");
  assert.equal(routeB.culpritName, "Dr. Arvind Sethi");

  const reqB = ACCUSATION_REQUIREMENTS.B;
  assert.equal(reqB.killerSuspectId, "arvind");
  assert.ok(reqB.requiredEvidenceIds.includes("film_canister"));
  assert.ok(reqB.requiredClueIds.includes("clue_arvind_admits_confrontation"));
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 10: Storyline independence — Storyline C (Nusrat Ali)
// ─────────────────────────────────────────────────────────────────────────────
test("Test 10: Storyline independence — Storyline C (Nusrat Ali is culprit)", () => {
  const routeC = STORYLINES.C;
  assert.equal(routeC.culpritId, "nusrat");
  assert.equal(routeC.culpritName, "Nusrat Ali");

  const reqC = ACCUSATION_REQUIREMENTS.C;
  assert.equal(reqC.killerSuspectId, "nusrat");
  assert.ok(reqC.requiredEvidenceIds.includes("nusrat_phone"));
  assert.ok(reqC.requiredClueIds.includes("clue_nusrat_admits_incident"));
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 11: Emergent storyline pivot mechanism
// Asking pivot question triggers choice; locking storyline is permanent
// ─────────────────────────────────────────────────────────────────────────────
test("Test 11: Emergent storyline pivot mechanism — locks permanently", async () => {
  resetTestStore(); // reset with no locked storyline
  const store = useGameStore.getState();

  assert.equal(store.storylineLocked, false, "Initial state should not have locked storyline");

  // Step 1: Ask raju_back_door first (prerequisite for pivot)
  await store.askQuestion("raju_back_door", "Why was the door unlatched?");

  // Step 2: Ask the pivot question raju_who_paid
  const pivotRes = await store.askQuestion("raju_who_paid", "Who gave you the money?");
  assert.equal(pivotRes.isPivotQuestion, true, "raju_who_paid must be marked as pivot question");
  assert.equal(useGameStore.getState().showStorylinePivotModal, true, "Should trigger pivot modal");

  // Step 3: Lock storyline to Route B
  useGameStore.getState().lockStoryline("B");
  assert.equal(useGameStore.getState().lockedStoryline, "B");
  assert.equal(useGameStore.getState().storylineLocked, true);

  // Step 4: Attempt to change locked storyline — must be rejected
  useGameStore.getState().lockStoryline("C");
  assert.equal(useGameStore.getState().lockedStoryline, "B", "Storyline lock must be permanent");
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 12: Proof-based accusation validation
// Requires proof chain before accusation; handles correct and incorrect verdicts
// ─────────────────────────────────────────────────────────────────────────────
test("Test 12: Proof-based accusation validation — full proof chain enforced", () => {
  // Incomplete proof check
  const incomplete = checkAccusationEligibility("A", ["clue_raju_back_door_bribe"], ["duplicate_key"]);
  assert.equal(incomplete.eligible, false, "Incomplete clues must not be eligible");
  assert.ok(incomplete.missingClues.length > 0, "Must list missing clues");

  // Complete proof check
  const reqA = ACCUSATION_REQUIREMENTS.A;
  const complete = checkAccusationEligibility("A", reqA.requiredClueIds, reqA.requiredEvidenceIds);
  assert.equal(complete.eligible, true, "Complete proof must make accusation eligible");

  // Wrong accusation test
  resetTestStore("A");
  useGameStore.setState({ accusationEligible: true, lockedStoryline: "A" });

  const wrongResult = useGameStore.getState().makeAccusation("raju");
  assert.equal(wrongResult.success, false, "Accusing Raju in Storyline A must fail");
  assert.ok(wrongResult.message.includes("material witness"), "Must provide specific wrong accusation response");

  // Correct accusation test
  const correctResult = useGameStore.getState().makeAccusation("meera");
  assert.equal(correctResult.success, true, "Accusing Meera in Storyline A must succeed");
  assert.equal(correctResult.culpritId, "meera");
  assert.equal(useGameStore.getState().isSolved, true, "Game must transition to solved");
});

