// src/state/useGameStore.js
// ALIBI — Centralized Zustand Game State Store Supporting Canonical Storylines A, B, and C

import { create } from "zustand";
import { STORYLINES } from "../data/storylines.js";
import { suspects } from "../data/suspects.js";
import { CANONICAL_EVIDENCE_ITEMS, getEvidenceForStoryline } from "../data/evidence.js";
import { caseInfo } from "../data/caseInfo.js";
import { gnaniPipeline, SUSPECT_VOICE_MAP } from "../services/gnaniApi.js";
import { interrogationEngine } from "../services/interrogationEngine.js";
import { getActiveHints } from "../data/hintCards.js";
import {
  matchTranscriptToHintCards,
  computeScoreUpdate,
  SOLVE_THRESHOLD,
  INITIAL_SCORE,
  INITIAL_TRIES
} from "../services/scoringEngine.js";
import {
  INITIAL_CHECKLIST,
  INITIAL_INVESTIGATOR_NOTES,
  CONTRADICTIONS as INITIAL_CONTRADICTIONS
} from "../data/caseTabsData.js";
import {
  SUSPECT_CHARACTER_SHEETS,
  INITIAL_SUSPECT_LIVE_STATE,
  getTruthGatesForStoryline
} from "../data/truthGatesData.js";
import { truthGateEngine } from "../services/truthGateEngine.js";
import { CUTSCENES } from "../data/cutscenesData.js";
import { PUZZLES } from "../data/puzzlesData.js";
import { ambientAudio } from "../services/ambientAudio.js";

// ── Deterministic Interrogation System ──────────────────────────────────────
import { QUESTION_DATABASE, getCanonicalAnswer } from "../data/questionDatabase.js";
import { CLUE_DATABASE, getClue } from "../data/clueDatabase.js";
import { EVIDENCE_CHALLENGES, getChallengeForEvidenceAndSuspect } from "../data/evidenceChallenges.js";
import { checkAccusationEligibility, ACCUSATION_REQUIREMENTS } from "../data/accusationRequirements.js";
import { classifyQuestion, getRephrasPrompt, arePrerequisitesMet } from "../services/questionClassifier.js";
import { computeStressUpdate } from "../services/stressEngine.js";

const DEFAULT_STORYLINE = "A";

// Initial state for per-suspect asked question tracking
const INITIAL_ASKED_QUESTIONS = {
  raju: [], meera: [], arvind: [], nusrat: [], bhola: []
};

// Initial state for per-suspect presented evidence tracking
const INITIAL_PRESENTED_EVIDENCE = {
  raju: [], meera: [], arvind: [], nusrat: [], bhola: []
};

export const useGameStore = create((set, get) => ({
  // ── Game Flow, Pause, Audio & Menu ──────────────────────────────────────
  isPaused: false,
  isMuted: false,
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  setPaused: (isPaused) => set({ isPaused }),
  togglePause: () => set((s) => ({ isPaused: !s.isPaused })),
  setMuted: (isMuted) => {
    ambientAudio.setMuted(isMuted);
    set({ isMuted });
  },
  toggleMute: () => {
    const next = !get().isMuted;
    ambientAudio.setMuted(next);
    set({ isMuted: next });
    return next;
  },
  // ── Canonical Storyline Route ───────────────────────────────────────────
  activeStoryline: DEFAULT_STORYLINE,
  storylines: STORYLINES,

  // ── DETERMINISTIC INTERROGATION SYSTEM (NEW) ────────────────────────────
  // Storyline lock — null until pivot question (raju_who_paid) is answered
  lockedStoryline: null,
  storylineLocked: false,
  showStorylinePivotModal: false,  // shows the "who do you think paid?" modal

  // Per-suspect tracking of asked canonical question IDs
  askedQuestionIds: { raju: [], meera: [], arvind: [], nusrat: [], bhola: [] },

  // Per-suspect tracking of presented evidence IDs
  presentedEvidenceIds: { raju: [], meera: [], arvind: [], nusrat: [], bhola: [] },

  // All completed evidence challenge IDs (across all suspects)
  completedChallengeIds: [],

  // All discovered canonical clue IDs (from clueDatabase.js)
  discoveredClueIds: [],

  // Established facts (from interrogation breakthroughs)
  establishedFacts: [],

  // Exposed contradictions
  exposedContradictionIds: [],

  // Accusation state
  accusationEligible: false,
  accusationMade: null,         // { suspectId, timestamp, isCorrect }
  accusationResult: null,       // { success, title, summary, ... }

  // Pivot selection state
  pendingPivotSuspects: null,   // ['meera', 'arvind', 'nusrat'] — shown in modal

  // Stress band change notification
  stressBandNotification: null, // { suspectId, reaction, band } — cleared after display

  // ── Navigation & Tabs ───────────────────────────────────────────────────
  isAudioUnlocked: false,
  unlockAudio: () => {
    ambientAudio.unlock();
    set({ isAudioUnlocked: true });
  },
  hasStartedGame: false,
  isOpeningCameraPanComplete: false,
  startGame: () => {
    ambientAudio.startGameAudio();
    void gnaniPipeline.preloadSpeech(
      Object.entries(suspects).map(([suspectId, suspect]) => ({
        text: suspect.initialDialogue,
        suspectId,
        stressLevel: get().suspectStress[suspectId] || 30
      }))
    );
    set({ hasStartedGame: true, isPaused: false, isOpeningCameraPanComplete: false });
  },
  completeOpeningCameraPan: () => set({ isOpeningCameraPanComplete: true }),
  returnToStartScreen: () => {
    ambientAudio.stopGameAudio();
    get().resetRun();
    set({ hasStartedGame: false, isPaused: false, isMenuOpen: false });
  },
  activeTab: "interrogation", // "interrogation" | "case_files"
  caseSubTab: "evidence_list",
  setActiveTab: (tab) => set({ activeTab: tab }),
  setCaseSubTab: (subTab) => set({ caseSubTab: subTab }),

  // ── 3D Scene Camera & Modals ────────────────────────────────────────────
  cameraState: "MAIN_THEATRE", // "MAIN_THEATRE" | "SUSPECT_FOCUS" | "BOOTH_VIEW" | "SCREEN_VIEW" | "FREE_ORBIT"
  setCameraState: (cameraState) => set({ cameraState }),
  cycleCameraState: () => {
    const states = ["MAIN_THEATRE", "SUSPECT_FOCUS", "BOOTH_VIEW", "SCREEN_VIEW", "FREE_ORBIT"];
    const current = get().cameraState || "MAIN_THEATRE";
    const nextIdx = (states.indexOf(current) + 1) % states.length;
    set({ cameraState: states[nextIdx] });
  },
  isVoiceLabOpen: false,
  setIsVoiceLabOpen: (isOpen) => set({ isVoiceLabOpen: isOpen }),
  isTranscriptOpen: false,
  setIsTranscriptOpen: (isOpen) => set({ isTranscriptOpen: isOpen }),
  isHintsDrawerOpen: false,
  setIsHintsDrawerOpen: (isOpen) => set({ isHintsDrawerOpen: isOpen }),

  // ── Suspects & Demeanor ─────────────────────────────────────────────────
  selectedSuspect: null,
  suspectStress: {
    raju: 35,
    meera: 20,
    arvind: 15,
    nusrat: 40,
    bhola: 25
  },
  suspectTrust: {
    raju: 45,
    meera: 30,
    arvind: 50,
    nusrat: 60,
    bhola: 75
  },
  suspectLiveState: { ...INITIAL_SUSPECT_LIVE_STATE },
  suspectVoiceMap: SUSPECT_VOICE_MAP,

  // ── Truth Gates & Contradictions ────────────────────────────────────────
  truthGates: getTruthGatesForStoryline(DEFAULT_STORYLINE),
  unlockedGateIds: [],
  contradictions: INITIAL_CONTRADICTIONS.map((c) => ({ ...c })),
  truthGatePopup: null,

  // ── Clues & Case Progress ───────────────────────────────────────────────
  caseInfo,
  discoveredClues: [
    "Victim Harbans Lal suffered fatal blunt trauma against the booth rail during the 9:17 PM blackout.",
    "Projector motor halted at 9:19 PM; mechanical booth bell rang at 9:21 PM."
  ],
  investigationProgress: 20,
  evidenceItems: getEvidenceForStoryline(DEFAULT_STORYLINE),
  selectedEvidence: getEvidenceForStoryline(DEFAULT_STORYLINE)[0],

  // ── Interrogation & Dialogue ────────────────────────────────────────────
  dialogueHistory: [
    {
      id: "d-0",
      speaker: "Inspector (You)",
      text: "Rex Talkies is sealed until we determine how Harbans Lal died. You were near the projection gallery when the generator started. Speak.",
      time: "09:35 PM",
      type: "detective"
    },
    {
      id: "d-1",
      speaker: "Raju Ansari",
      role: "Ticket Boy",
      text: suspects.raju.initialDialogue,
      time: "09:36 PM",
      type: "suspect",
      suspectId: "raju"
    }
  ],
  currentDialogue: {
    speaker: "Raju Ansari",
    role: "Ticket Boy",
    text: suspects.raju.initialDialogue,
    topics: suspects.raju.topics || []
  },

  // ── Gnani Pipeline State ────────────────────────────────────────────────
  pipelineState: gnaniPipeline.pipelineState,
  isRecording: false,
  isProcessing: false,
  isSpeaking: false,
  lastTranscript: "",
  currentLanguage: "en-IN",

  // ── Scoring, Hint Cards & Thin-Ice ──────────────────────────────────────
  score: INITIAL_SCORE,
  solveThreshold: SOLVE_THRESHOLD,
  remainingTries: INITIAL_TRIES,
  isProsecutionReady: false,
  isSolved: false,
  isFailed: false,
  failReason: null,
  verdictResult: null,
  scoredCardIds: {
    raju: [],
    meera: [],
    arvind: [],
    nusrat: [],
    bhola: []
  },
  activeHints: getActiveHints("raju", [], DEFAULT_STORYLINE),
  pointPopup: null,

  // ── Case Tab Data ───────────────────────────────────────────────────────
  checklistGoals: INITIAL_CHECKLIST.map((g) => ({ ...g })),
  investigatorNotes: INITIAL_INVESTIGATOR_NOTES.map((n) => ({ ...n })),
  scoreLedger: [],
  unlockedForensicClueIds: [],
  unlockedHintIds: [],
  generatorCountdown: 2400, // 40 minutes in seconds
  generatorFlicker: false,

  // ── Puzzles & Cutscenes ─────────────────────────────────────────────────
  solvedPuzzleIds: [],
  unlockedCutsceneIds: ["cutscene_opening"],
  activeCutscene: null,
  activePuzzle: null,

  // ══════════════════════════════════════════════════════════════════════════
  // ACTIONS & METHODS
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * Switches active canonical storyline and resets all case state deterministically.
   */
  selectStoryline: (routeId) => {
    if (!STORYLINES[routeId]) return;
    get().resetRun(routeId);
  },

  /**
   * Resets all case state, dialogue, clues, and contradictions for a clean run.
   */
  resetRun: (targetRouteId = null) => {
    gnaniPipeline.stopCurrentAudio();
    const routeId = targetRouteId || get().activeStoryline || "A";

    set({
      activeStoryline: routeId,
      activeTab: "interrogation",
      caseSubTab: "evidence_list",
      selectedSuspect: null,
      cameraState: "MAIN_THEATRE",
      isOpeningCameraPanComplete: false,
      suspectStress: { raju: 35, meera: 20, arvind: 15, nusrat: 40, bhola: 25 },
      suspectTrust: { raju: 45, meera: 30, arvind: 50, nusrat: 60, bhola: 75 },
      suspectLiveState: { ...INITIAL_SUSPECT_LIVE_STATE },
      truthGates: getTruthGatesForStoryline(routeId),
      unlockedGateIds: [],
      contradictions: INITIAL_CONTRADICTIONS.map((c) => ({ ...c })),
      truthGatePopup: null,
      discoveredClues: [
        "Victim Harbans Lal suffered fatal blunt trauma against the booth rail during the 9:17 PM blackout.",
        "Projector motor halted at 9:19 PM; mechanical booth bell rang at 9:21 PM."
      ],
      investigationProgress: 20,
      evidenceItems: getEvidenceForStoryline(routeId),
      selectedEvidence: getEvidenceForStoryline(routeId)[0],
      dialogueHistory: [
        {
          id: "d-0",
          speaker: "Inspector (You)",
          text: `Rex Talkies is sealed until we determine how Harbans Lal died. [Active Storyline: ${STORYLINES[routeId].title}]`,
          time: "09:35 PM",
          type: "detective"
        },
        {
          id: "d-1",
          speaker: "Raju Ansari",
          role: "Ticket Boy",
          text: suspects.raju.initialDialogue,
          time: "09:36 PM",
          type: "suspect",
          suspectId: "raju"
        }
      ],
      currentDialogue: {
        speaker: "Raju Ansari",
        role: "Ticket Boy",
        text: suspects.raju.initialDialogue,
        topics: suspects.raju.topics || []
      },
      score: INITIAL_SCORE,
      remainingTries: INITIAL_TRIES,
      isProsecutionReady: false,
      isSolved: false,
      isFailed: false,
      failReason: null,
      verdictResult: null,
      scoredCardIds: { raju: [], meera: [], arvind: [], nusrat: [], bhola: [] },
      activeHints: getActiveHints("raju", [], routeId),
      pointPopup: null,
      checklistGoals: INITIAL_CHECKLIST.map((g) => ({ ...g })),
      investigatorNotes: INITIAL_INVESTIGATOR_NOTES.map((n) => ({ ...n })),
      scoreLedger: [],
      unlockedForensicClueIds: [],
      unlockedHintIds: [],
      generatorCountdown: 2400,
      solvedPuzzleIds: [],
      unlockedCutsceneIds: ["cutscene_opening"],
      activeCutscene: null,
      activePuzzle: null,
      lockedStoryline: null,
      storylineLocked: false,
      showStorylinePivotModal: false,
      askedQuestionIds: { raju: [], meera: [], arvind: [], nusrat: [], bhola: [] },
      presentedEvidenceIds: { raju: [], meera: [], arvind: [], nusrat: [], bhola: [] },
      completedChallengeIds: [],
      discoveredClueIds: [],
      establishedFacts: [],
      exposedContradictionIds: [],
      accusationEligible: false,
      accusationMade: null,
      accusationResult: null,
      pendingPivotSuspects: null,
      stressBandNotification: null
    });
  },

  setSelectedEvidence: (evidence) => set({ selectedEvidence: evidence }),
  unlockForensicClue: (evidenceId, cost = 10) => {
    const state = get();
    if (!evidenceId || state.unlockedForensicClueIds.includes(evidenceId)) return true;
    if (state.score < cost) return false;

    const nextScore = state.score - cost;
    set((prev) => ({
      score: nextScore,
      isProsecutionReady: nextScore >= prev.solveThreshold,
      unlockedForensicClueIds: [...prev.unlockedForensicClueIds, evidenceId],
      scoreLedger: [
        {
          id: `clue_unlock_${evidenceId}_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suspect: "Forensic Lab",
          keyword: "FORENSIC CLUE UNLOCK",
          type: "spend",
          delta: -cost,
          scoreAfter: nextScore
        },
        ...prev.scoreLedger
      ]
    }));
    return true;
  },
  unlockHint: (hintId, cost = 10) => {
    const state = get();
    if (!hintId || state.unlockedHintIds.includes(hintId)) return true;
    if (state.score < cost) return false;

    const nextScore = state.score - cost;
    set((prev) => ({
      score: nextScore,
      isProsecutionReady: nextScore >= prev.solveThreshold,
      unlockedHintIds: [...prev.unlockedHintIds, hintId],
      scoreLedger: [
        {
          id: `hint_unlock_${hintId}_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suspect: "Investigation Desk",
          keyword: "HINT UNLOCK",
          type: "spend",
          delta: -cost,
          scoreAfter: nextScore
        },
        ...prev.scoreLedger
      ]
    }));
    return true;
  },
  setCurrentLanguage: (lang) => set({ currentLanguage: lang }),

  // ══════════════════════════════════════════════════════════════════════════
  // DETERMINISTIC INTERROGATION ACTIONS (NEW SYSTEM)
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * Lock the storyline permanently. Called once when the pivot question is answered
   * and the player selects a suspect in the pivot modal.
   */
  lockStoryline: (storylineId) => {
    if (get().storylineLocked) return; // already locked, cannot change
    if (!STORYLINES[storylineId]) return;
    set({
      lockedStoryline: storylineId,
      storylineLocked: true,
      showStorylinePivotModal: false,
      activeStoryline: storylineId,
      evidenceItems: getEvidenceForStoryline(storylineId),
      selectedEvidence: getEvidenceForStoryline(storylineId)[0]
    });
  },

  /**
   * Dismiss the pivot modal without locking (player can ask more questions first).
   */
  dismissPivotModal: () => set({ showStorylinePivotModal: false }),

  /**
   * Core deterministic question-answering action.
   * Called by both text and voice pathways.
   * Returns an object describing the result for the UI to consume.
   */
  askQuestion: async (questionId, playerText) => {
    const state = get();
    const question = QUESTION_DATABASE[questionId];
    if (!question) return { success: false, reason: "question_not_found" };

    const suspectId = question.suspectId;
    const askedForSuspect = state.askedQuestionIds[suspectId] || [];

    // Prerequisite check
    if (!arePrerequisitesMet(question, askedForSuspect)) {
      return {
        success: false,
        reason: "prerequisites_not_met",
        message: "You need to establish more facts before asking this."
      };
    }

    // Check if already asked (return same answer but mark as repeat)
    const isRepeat = askedForSuspect.includes(questionId);

    // Record the question as asked (deduplicated)
    if (!isRepeat) {
      set((prev) => ({
        askedQuestionIds: {
          ...prev.askedQuestionIds,
          [suspectId]: [...prev.askedQuestionIds[suspectId], questionId]
        }
      }));
    }

    // Get canonical answer
    const canonicalData = getCanonicalAnswer(questionId);
    if (!canonicalData) return { success: false, reason: "no_canonical_answer" };

    const stressDelta = isRepeat ? -2 : canonicalData.stressDelta;
    const trustDelta = isRepeat ? 0 : (canonicalData.trustDelta || 0);

    // Update stress/trust
    const currentStress = get().suspectStress[suspectId] || 30;
    const currentTrust = get().suspectTrust[suspectId] || 50;
    const stressUpdate = computeStressUpdate({ currentStress, delta: stressDelta, suspectId });

    set((prev) => ({
      suspectStress: { ...prev.suspectStress, [suspectId]: stressUpdate.newStress },
      suspectTrust: {
        ...prev.suspectTrust,
        [suspectId]: Math.max(0, Math.min(100, currentTrust + trustDelta))
      },
      suspectLiveState: {
        ...prev.suspectLiveState,
        [suspectId]: {
          ...(prev.suspectLiveState[suspectId] || {}),
          stress: stressUpdate.newStress,
          trust: Math.max(0, Math.min(100, currentTrust + trustDelta))
        }
      }
    }));

    // Show stress band notification if band changed
    if (stressUpdate.bandChanged) {
      set({ stressBandNotification: { suspectId, reaction: stressUpdate.bandReaction, band: stressUpdate.newBand } });
      setTimeout(() => set({ stressBandNotification: null }), 4000);
    }

    // Unlock clue if conditions met
    let clueUnlocked = null;
    if (!isRepeat && question.unlocksClueId) {
      const alreadyDiscovered = get().discoveredClueIds.includes(question.unlocksClueId);
      if (!alreadyDiscovered) {
        const clue = getClue(question.unlocksClueId);
        if (clue) {
          clueUnlocked = clue;
          set((prev) => ({
            discoveredClueIds: [...prev.discoveredClueIds, question.unlocksClueId],
            discoveredClues: prev.discoveredClues.includes(clue.description)
              ? prev.discoveredClues
              : [clue.description, ...prev.discoveredClues],
            investigationProgress: Math.min(100, prev.investigationProgress + 10)
          }));

          // Add auto investigator note
          const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const suspect = suspects[suspectId] || suspects.raju;
          set((prev) => ({
            investigatorNotes: [
              {
                id: "auto_" + Date.now(),
                timestamp: timeStr,
                text: `[CLUE // ${suspect.name}]: ${clue.description}`,
                tag: "Clue",
                isAuto: true
              },
              ...prev.investigatorNotes
            ]
          }));
        }
      }
    }

    // Check if pivot question unlocked
    if (!isRepeat && question.isPivotQuestion) {
      set({
        showStorylinePivotModal: true,
        pendingPivotSuspects: ["meera", "arvind", "nusrat"]
      });
    }

    // Check accusation eligibility
    get().checkAccusationEligibility();

    return {
      success: true,
      answer: canonicalData.answer,
      stressDelta,
      trustDelta,
      clueUnlocked,
      isRepeat,
      isPivotQuestion: question.isPivotQuestion || false
    };
  },

  /**
   * Present a physical evidence item to the currently selected suspect.
   * Validates all prerequisites before returning a predefined response.
   */
  presentEvidence: async (evidenceId, targetSuspectId) => {
    const state = get();
    const suspectId = targetSuspectId || state.selectedSuspect;
    const lockedStoryline = state.lockedStoryline || state.activeStoryline;

    // Find the challenge for this evidence × suspect × storyline
    const challenge = getChallengeForEvidenceAndSuspect(evidenceId, suspectId, lockedStoryline);

    if (!challenge) {
      // No predefined challenge — provide a neutral non-answer
      const evidenceItem = CANONICAL_EVIDENCE_ITEMS.find((e) => e.id === evidenceId);
      return {
        success: true,
        response: `${suspects[suspectId]?.name || "The suspect"} examines the ${evidenceItem?.name || "evidence"} carefully but says nothing that advances the investigation.`,
        stressDelta: 2,
        isNeutral: true
      };
    }

    // Check if already completed
    if (state.completedChallengeIds.includes(challenge.id)) {
      return {
        success: true,
        response: `You have already presented this evidence. ${suspects[suspectId]?.name || "The suspect"} has nothing further to add.`,
        stressDelta: 0,
        isRepeat: true
      };
    }

    // Check prerequisite questions
    const askedForSuspect = state.askedQuestionIds[suspectId] || [];
    const missingPrereqs = challenge.prerequisiteQuestionIds.filter(
      (id) => !askedForSuspect.includes(id)
    );
    if (missingPrereqs.length > 0) {
      return {
        success: false,
        reason: "prerequisites_not_met",
        message: "Ask more questions before presenting this evidence."
      };
    }

    // Check prerequisite clues
    const missingClues = challenge.prerequisiteClueIds.filter(
      (id) => !state.discoveredClueIds.includes(id)
    );
    if (missingClues.length > 0) {
      return {
        success: false,
        reason: "clue_prerequisites_not_met",
        message: "Discover more facts before presenting this evidence."
      };
    }

    // Record challenge as completed
    set((prev) => ({
      completedChallengeIds: [...prev.completedChallengeIds, challenge.id],
      presentedEvidenceIds: {
        ...prev.presentedEvidenceIds,
        [suspectId]: [
          ...new Set([...(prev.presentedEvidenceIds[suspectId] || []), evidenceId])
        ]
      }
    }));

    // Update stress/trust
    const currentStress = get().suspectStress[suspectId] || 30;
    const currentTrust = get().suspectTrust[suspectId] || 50;
    const stressUpdate = computeStressUpdate({
      currentStress,
      delta: challenge.stressDelta,
      suspectId
    });

    set((prev) => ({
      suspectStress: { ...prev.suspectStress, [suspectId]: stressUpdate.newStress },
      suspectTrust: {
        ...prev.suspectTrust,
        [suspectId]: Math.max(0, Math.min(100, currentTrust + (challenge.trustDelta || 0)))
      }
    }));

    // Unlock clue from challenge
    let clueUnlocked = null;
    if (challenge.unlocksClueId) {
      const alreadyDiscovered = get().discoveredClueIds.includes(challenge.unlocksClueId);
      if (!alreadyDiscovered) {
        const clue = getClue(challenge.unlocksClueId);
        if (clue) {
          clueUnlocked = clue;
          set((prev) => ({
            discoveredClueIds: [...prev.discoveredClueIds, challenge.unlocksClueId],
            discoveredClues: prev.discoveredClues.includes(clue.description)
              ? prev.discoveredClues
              : [clue.description, ...prev.discoveredClues],
            investigationProgress: Math.min(100, prev.investigationProgress + 10)
          }));
        }
      }
    }

    // Check accusation eligibility
    get().checkAccusationEligibility();

    return {
      success: true,
      response: challenge.response,
      stressDelta: challenge.stressDelta,
      trustDelta: challenge.trustDelta,
      clueUnlocked
    };
  },

  /**
   * Classify player input and dispatch either a canonical question or a rephrase prompt.
   * This is the main entry point for text/voice interrogation.
   */
  dispatchCanonicalInterrogation: async (playerText, isVoice = false) => {
    if (!playerText || !playerText.trim()) return;
    const state = get();
    if (state.isSolved || state.isFailed) return;

    const suspectId = state.selectedSuspect;
    const lockedStoryline = state.lockedStoryline || null;
    const askedForSuspect = state.askedQuestionIds[suspectId] || [];
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const currentSuspectData = suspects[suspectId] || suspects.raju;

    // Record player input in dialogue
    set((prev) => ({
      dialogueHistory: [
        ...prev.dialogueHistory,
        {
          id: "d-" + Date.now(),
          speaker: isVoice ? "Inspector (Voice)" : "Inspector (You)",
          text: playerText,
          time: timeStr,
          type: "detective"
        }
      ]
    }));

    // Classify the question
    const classification = classifyQuestion(playerText, suspectId, lockedStoryline, askedForSuspect);

    let finalResponse;
    let finalStressDelta;

    if (classification.confidence === "low" || !classification.questionId) {
      // No confident match — ask player to rephrase
      finalResponse = getRephrasPrompt(suspectId);
      finalStressDelta = 2;
    } else {
      // We have a confident classification — ask the canonical question
      const result = await get().askQuestion(classification.questionId, playerText);

      if (!result.success) {
        // Prerequisites not met — provide a guarded response
        finalResponse = result.message || getRephrasPrompt(suspectId);
        finalStressDelta = 2;
      } else {
        finalResponse = result.answer;
        finalStressDelta = result.stressDelta;
      }
    }

    // Update dialogue display with suspect response
    set((prev) => ({
      currentDialogue: {
        speaker: currentSuspectData.name,
        role: currentSuspectData.role,
        text: finalResponse,
        topics: currentSuspectData.topics || []
      },
      dialogueHistory: [
        ...prev.dialogueHistory,
        {
          id: "d-" + (Date.now() + 1),
          speaker: currentSuspectData.name,
          role: currentSuspectData.role,
          text: finalResponse,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "suspect",
          suspectId,
          questionId: classification.questionId || null
        }
      ]
    }));

    // TTS playback
    const nextStress = get().suspectStress[suspectId] || 30;
    await gnaniPipeline.synthesizeSpeech(finalResponse, suspectId, nextStress);
  },

  /**
   * Check if the player has met all requirements to make an accusation.
   * Updates accusationEligible state.
   */
  checkAccusationEligibility: () => {
    const state = get();
    const lockedStoryline = state.lockedStoryline || state.activeStoryline;
    const allPresentedEvidence = Object.values(state.presentedEvidenceIds).flat();

    const { eligible } = checkAccusationEligibility(
      lockedStoryline,
      state.discoveredClueIds,
      allPresentedEvidence
    );

    if (eligible !== state.accusationEligible) {
      set({ accusationEligible: eligible });
    }
  },

  /**
   * Make a final accusation against a suspect.
   * Returns whether accusation is correct and what happens next.
   */
  makeAccusation: (suspectId) => {
    const state = get();
    const lockedStoryline = state.lockedStoryline || state.activeStoryline;
    const requirements = ACCUSATION_REQUIREMENTS[lockedStoryline];

    if (!requirements) return { success: false, reason: "no_storyline" };
    if (!state.accusationEligible) return { success: false, reason: "not_eligible", message: "Gather more evidence before making an accusation." };

    const isCorrect = suspectId === requirements.killerSuspectId;
    const timestamp = new Date().toISOString();

    set({
      accusationMade: { suspectId, timestamp, isCorrect }
    });

    if (isCorrect) {
      const verdict = {
        success: true,
        culpritId: requirements.killerSuspectId,
        culpritName: requirements.killerName,
        title: `CASE SOLVED: ${requirements.killerName.toUpperCase()} IS RESPONSIBLE`,
        summary: STORYLINES[lockedStoryline]?.summary || requirements.summary,
        motive: STORYLINES[lockedStoryline]?.motive,
        fatalAction: STORYLINES[lockedStoryline]?.fatalAction
      };
      set({ isSolved: true, verdictResult: verdict, accusationResult: verdict });
      return verdict;
    } else {
      // Wrong accusation — provide canonical wrong-accusation response
      const wrongResponse = requirements.wrongAccusationResponses?.[suspectId] ||
        "The evidence does not conclusively point to this person. Continue investigating.";
      const failResult = {
        success: false,
        accusedSuspectId: suspectId,
        message: wrongResponse,
        title: "ACCUSATION REJECTED"
      };
      set((prev) => ({
        accusationResult: failResult,
        remainingTries: Math.max(0, prev.remainingTries - 1),
        accusationMade: null // allow trying again
      }));
      return failResult;
    }
  },

  // ══════════════════════════════════════════════════════════════════════════
  // END DETERMINISTIC INTERROGATION ACTIONS
  // ══════════════════════════════════════════════════════════════════════════


  setGeneratorCountdown: (updateFn) => {
    set((state) => {
      const nextCount = typeof updateFn === "function" ? updateFn(state.generatorCountdown) : updateFn;
      return { generatorCountdown: nextCount };
    });
  },

  setGeneratorFlicker: (val) => set({ generatorFlicker: val }),

  selectSuspect: async (suspectId, autoPlay = true) => {
    if (!suspectId) {
      gnaniPipeline.stopCurrentAudio();
      set({
        selectedSuspect: null,
        cameraState: "MAIN_THEATRE"
      });
      return;
    }
    const suspect = suspects[suspectId];
    if (!suspect) return;

    gnaniPipeline.stopCurrentAudio();

    const state = get();
    const alreadyScored = (state.scoredCardIds && state.scoredCardIds[suspectId]) || [];
    const hints = getActiveHints(suspectId, alreadyScored, state.activeStoryline);

    set({
      selectedSuspect: suspectId,
      cameraState: "SUSPECT_FOCUS",
      activeHints: hints,
      currentDialogue: {
        speaker: suspect.name,
        role: suspect.role,
        text: suspect.initialDialogue,
        topics: suspect.topics || []
      },
      dialogueHistory: [
        ...state.dialogueHistory,
        {
          id: "d-" + Date.now(),
          speaker: suspect.name,
          role: suspect.role,
          text: suspect.initialDialogue,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "suspect",
          suspectId
        }
      ]
    });

    if (autoPlay && suspect.initialDialogue) {
      const stress = (get().suspectStress[suspectId]) || 30;
      await gnaniPipeline.synthesizeSpeech(suspect.initialDialogue, suspectId, stress);
    }
  },

  /**
   * Interrogation Dispatch Pipeline with Route Awareness
   */
  dispatchInterrogation: async (queryText, isVoice = false, isEvidence = false, preferredResponse = null) => {
    if (!queryText || !queryText.trim()) return;
    const state = get();
    if (state.isSolved || state.isFailed) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const suspectId = state.selectedSuspect;
    const currentSuspectData = suspects[suspectId] || suspects.raju;

    // 1. Record Detective Query to dialogue history
    set((prev) => ({
      dialogueHistory: [
        ...prev.dialogueHistory,
        {
          id: "d-" + Date.now(),
          speaker: isVoice ? "Inspector (Voice STT)" : isEvidence ? "Inspector (Physical Evidence)" : "Inspector (You)",
          text: queryText,
          time: timeStr,
          type: "detective"
        }
      ]
    }));

    // 2. Evaluate Truth Gates for Breakthroughs
    const seenEvidence = (state.suspectLiveState[suspectId] && state.suspectLiveState[suspectId].seenEvidence) || [];
    const resolvedContradictions = state.contradictions.filter((c) => c.resolved).map((c) => c.id);

    const gateEval = truthGateEngine.evaluateQuery(
      suspectId,
      queryText,
      state.suspectLiveState,
      state.unlockedGateIds,
      seenEvidence,
      resolvedContradictions,
      state.activeStoryline
    );

    let finalResponse = "";
    let finalStressDelta = 4;
    let finalTrustDelta = 0;
    let unlockedClue = null;
    let pointsAwarded = 0;

    if (gateEval.triggered) {
      finalResponse = gateEval.response;
      finalStressDelta = gateEval.stressDelta;
      finalTrustDelta = gateEval.trustDelta;

      if (gateEval.unlockedNow && gateEval.gate) {
        unlockedClue = gateEval.unlockedClue;
        pointsAwarded = gateEval.points || 20;

        set((prev) => ({
          unlockedGateIds: [...prev.unlockedGateIds, gateEval.gate.id],
          truthGatePopup: {
            title: gateEval.gate.title,
            secretFact: gateEval.gate.secretFact,
            points: pointsAwarded,
            suspectName: currentSuspectData.name
          }
        }));
        setTimeout(() => set({ truthGatePopup: null }), 3500);

        // Check if cutscenes should unlock based on gate
        if (gateEval.gate.id === "gate_meera_cut" && !state.unlockedCutsceneIds.includes("cutscene_last_negotiation")) {
          get().unlockCutscene("cutscene_last_negotiation");
        }
        if (gateEval.gate.id === "gate_arvind_catalogue" && !state.unlockedCutsceneIds.includes("cutscene_three_splices")) {
          get().unlockCutscene("cutscene_three_splices");
        }
        if (gateEval.gate.id === "gate_arvind_label" && !state.unlockedCutsceneIds.includes("cutscene_credit_never_came")) {
          get().unlockCutscene("cutscene_credit_never_came");
        }
        if (gateEval.gate.id === "gate_nusrat_gap" && !state.unlockedCutsceneIds.includes("cutscene_missing_minute")) {
          get().unlockCutscene("cutscene_missing_minute");
        }
        if (gateEval.gate.id === "gate_bhola_trust" && !state.unlockedCutsceneIds.includes("cutscene_bhola_account")) {
          get().unlockCutscene("cutscene_bhola_account");
        }
      }
    } else {
      if (preferredResponse) {
        finalResponse = preferredResponse;
        finalStressDelta = 6;
      } else {
        const regularResult = interrogationEngine.processQuery(suspectId, queryText);
        finalResponse = regularResult.response;
        finalStressDelta = regularResult.stressDelta;
        unlockedClue = regularResult.unlockedClue;
      }
    }

    // 3. Match transcript against hint cards
    if (!isEvidence) {
      const alreadyScored = (get().scoredCardIds && get().scoredCardIds[suspectId]) || [];
      const matchResult = matchTranscriptToHintCards(queryText, suspectId, alreadyScored);

      if (matchResult.matched && matchResult.card) {
        const currentScore = get().score;
        const currentTries = get().remainingTries;
        const update = computeScoreUpdate(matchResult, currentScore, currentTries);

        set({
          pointPopup: {
            delta: update.delta,
            keyword: matchResult.matchedKeyword || matchResult.card.keyword,
            type: matchResult.card.type
          }
        });
        setTimeout(() => set({ pointPopup: null }), 2200);

        set((prev) => ({
          score: update.nextScore,
          remainingTries: update.nextTries,
          isProsecutionReady: update.isProsecutionReady,
          scoreLedger: [
            {
              id: "sc_" + Date.now(),
              timestamp: timeStr,
              suspect: currentSuspectData.name,
              keyword: matchResult.matchedKeyword || matchResult.card.keyword,
              type: matchResult.card.type,
              delta: update.delta,
              scoreAfter: update.nextScore
            },
            ...prev.scoreLedger
          ],
          scoredCardIds: {
            ...prev.scoredCardIds,
            [suspectId]: [...(prev.scoredCardIds[suspectId] || []), matchResult.card.id]
          },
          activeHints: getActiveHints(suspectId, [...(prev.scoredCardIds[suspectId] || []), matchResult.card.id], prev.activeStoryline)
        }));

        if (update.isFailed) {
          set({
            isFailed: true,
            failReason: "Investigation collapsed: 3 critical missteps while on thin-ice ruined the prosecution."
          });
        }
      }
    }

    // Apply truth gate points
    if (pointsAwarded > 0) {
      set((prev) => {
        const nextScore = prev.score + pointsAwarded;
        return {
          score: nextScore,
          isProsecutionReady: nextScore >= prev.solveThreshold,
          scoreLedger: [
            {
              id: "tg_" + Date.now(),
              timestamp: timeStr,
              suspect: currentSuspectData.name,
              keyword: `TRUTH GATE [${gateEval.gate.title}]`,
              type: "right",
              delta: pointsAwarded,
              scoreAfter: nextScore
            },
            ...prev.scoreLedger
          ]
        };
      });
    }

    // 4. Update Suspect Demeanor (Stress / Trust)
    const currentStress = get().suspectStress[suspectId] || 30;
    const currentTrust = get().suspectTrust[suspectId] || 50;
    const nextStress = Math.max(0, Math.min(100, currentStress + finalStressDelta));
    const nextTrust = Math.max(0, Math.min(100, currentTrust + finalTrustDelta));

    set((prev) => ({
      suspectStress: { ...prev.suspectStress, [suspectId]: nextStress },
      suspectTrust: { ...prev.suspectTrust, [suspectId]: nextTrust },
      suspectLiveState: {
        ...prev.suspectLiveState,
        [suspectId]: {
          ...(prev.suspectLiveState[suspectId] || {}),
          stress: nextStress,
          trust: nextTrust
        }
      }
    }));

    // If clue unlocked, record
    if (unlockedClue) {
      set((prev) => {
        const nextClues = prev.discoveredClues.includes(unlockedClue)
          ? prev.discoveredClues
          : [unlockedClue, ...prev.discoveredClues];

        const nextProgress = Math.min(100, prev.investigationProgress + 12);

        const newNote = {
          id: "auto_" + Date.now(),
          timestamp: timeStr,
          text: `[DISCOVERY // ${currentSuspectData.name}]: ${unlockedClue}`,
          tag: "Clue",
          isAuto: true
        };

        return {
          discoveredClues: nextClues,
          investigationProgress: nextProgress,
          investigatorNotes: [newNote, ...prev.investigatorNotes]
        };
      });
    }

    // 5. Update dialogue display
    set((prev) => ({
      currentDialogue: {
        speaker: currentSuspectData.name,
        role: currentSuspectData.role,
        text: finalResponse,
        topics: currentSuspectData.topics || []
      },
      dialogueHistory: [
        ...prev.dialogueHistory,
        {
          id: "d-" + (Date.now() + 1),
          speaker: currentSuspectData.name,
          role: currentSuspectData.role,
          text: finalResponse,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "suspect",
          suspectId
        }
      ]
    }));

    // 6. Gnani TTS Audio Playback
    await gnaniPipeline.synthesizeSpeech(finalResponse, suspectId, nextStress);
  },

  /**
   * Confront suspect with a contradiction clash
   */
  confrontSuspectWithContradiction: async (contradictionId) => {
    const state = get();
    const result = truthGateEngine.evaluateContradictionChallenge(
      contradictionId,
      state.suspectLiveState,
      state.unlockedGateIds,
      state.activeStoryline
    );

    if (!result.valid) return;

    get().selectSuspect(result.suspectId);
    set({ activeTab: "interrogation" });

    const c = result.contradiction;
    const query = `You claimed: "${c.claimA}", but evidence confirms: "${c.claimB}"! You are lying to the police!`;

    set((prev) => ({
      exposedContradictionIds: [...new Set([...prev.exposedContradictionIds, contradictionId])],
      contradictions: prev.contradictions.map((item) =>
        item.id === contradictionId ? { ...item, resolved: true } : item
      ),
      suspectLiveState: {
        ...prev.suspectLiveState,
        [result.suspectId]: {
          ...(prev.suspectLiveState[result.suspectId] || {}),
          contradictionsCaught: ((prev.suspectLiveState[result.suspectId]?.contradictionsCaught) || 0) + 1
        }
      }
    }));

    await get().dispatchInterrogation(query, false, false);
  },

  /**
   * Present evidence to suspect — integrated with deterministic evidence challenge engine
   */
  presentEvidenceToSuspect: async (evidenceId) => {
    const state = get();
    const item =
      state.evidenceItems.find((e) => e.id === evidenceId) ||
      CANONICAL_EVIDENCE_ITEMS.find((e) => e.id === evidenceId);
    if (!item) return;

    const suspectId = state.selectedSuspect || "raju";
    const currentSuspectData = suspects[suspectId] || suspects.raju;
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Set selected evidence, ensure suspect is selected, and switch to interrogation tab
    set((prev) => ({
      selectedEvidence: item,
      selectedSuspect: suspectId,
      cameraState: "SUSPECT_FOCUS",
      activeTab: "interrogation",
      suspectLiveState: {
        ...prev.suspectLiveState,
        [suspectId]: {
          ...(prev.suspectLiveState[suspectId] || {}),
          seenEvidence: [
            ...new Set([...((prev.suspectLiveState[suspectId]?.seenEvidence) || []), evidenceId])
          ]
        }
      },
      dialogueHistory: [
        ...prev.dialogueHistory,
        {
          id: "d-" + Date.now(),
          speaker: "Inspector (Evidence Challenge)",
          text: `[Presents ${item.name}]: Examine this carefully. Explain your connection to this item!`,
          time: timeStr,
          type: "detective"
        }
      ]
    }));

    // Run through deterministic evidence challenge engine
    const challengeResult = await get().presentEvidence(evidenceId, suspectId);
    const responseText = challengeResult.response || challengeResult.message ||
      `${currentSuspectData.name} inspects the evidence closely but maintains silence.`;

    // Record response in dialogue
    set((prev) => ({
      currentDialogue: {
        speaker: currentSuspectData.name,
        role: currentSuspectData.role,
        text: responseText,
        topics: currentSuspectData.topics || []
      },
      dialogueHistory: [
        ...prev.dialogueHistory,
        {
          id: "d-" + (Date.now() + 1),
          speaker: currentSuspectData.name,
          role: currentSuspectData.role,
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "suspect",
          suspectId,
          evidenceId
        }
      ]
    }));

    // Synthesize response audio
    const currentStress = get().suspectStress[suspectId] || 30;
    await gnaniPipeline.synthesizeSpeech(responseText, suspectId, currentStress);
  },

  // ── Cutscenes & Puzzles Management ──────────────────────────────────────
  openCutscene: (cutsceneId) => {
    const scene = CUTSCENES.find((c) => c.id === cutsceneId);
    if (scene) set({ activeCutscene: scene });
  },

  closeCutscene: () => set({ activeCutscene: null }),

  unlockCutscene: (cutsceneId) => {
    set((prev) => ({
      unlockedCutsceneIds: prev.unlockedCutsceneIds.includes(cutsceneId)
        ? prev.unlockedCutsceneIds
        : [...prev.unlockedCutsceneIds, cutsceneId]
    }));
  },

  openPuzzle: (puzzleId) => {
    const puzzle = PUZZLES.find((p) => p.id === puzzleId);
    if (puzzle) set({ activePuzzle: puzzle });
  },

  closePuzzle: () => set({ activePuzzle: null }),

  solvePuzzle: (puzzleId) => {
    const state = get();
    if (state.solvedPuzzleIds.includes(puzzleId)) return;

    const puzzle = PUZZLES.find((p) => p.id === puzzleId);
    const rewardText = puzzle ? puzzle.rewardClue : "Puzzle breakthrough established.";

    set((prev) => ({
      solvedPuzzleIds: [...prev.solvedPuzzleIds, puzzleId],
      discoveredClues: prev.discoveredClues.includes(rewardText)
        ? prev.discoveredClues
        : [rewardText, ...prev.discoveredClues],
      score: prev.score + 20,
      activePuzzle: null
    }));
  },

  /**
   * Deterministic Proof-Chain Validator for Indictment
   */
  checkProofChain: (accusedSuspectId) => {
    const state = get();
    const route = STORYLINES[state.activeStoryline] || STORYLINES.A;
    const isCorrectCulprit = accusedSuspectId === route.culpritId;

    // 1. Physical clue verification
    const seenEvidenceIds = Object.values(state.suspectLiveState).flatMap((s) => s.seenEvidence || []);
    const physicalSatisfied = route.requiredProof.physicalClues.some((id) =>
      seenEvidenceIds.includes(id) || state.discoveredClues.some((c) => c.toLowerCase().includes(id.replace("_", " ")))
    );

    // 2. Contradiction / Timeline verification
    const resolvedContradictionIds = state.contradictions.filter((c) => c.resolved).map((c) => c.id);
    const contradictionSatisfied = route.requiredProof.contradictions.some((id) =>
      resolvedContradictionIds.includes(id)
    );

    // 3. Corroborating confession / admission verification (via gate, clue, or evidence challenge)
    const confessionSatisfied =
      state.unlockedGateIds.length > 0 ||
      state.completedChallengeIds.length > 0 ||
      state.discoveredClueIds.length >= 3 ||
      state.solvedPuzzleIds.length > 0;

    const ready = isCorrectCulprit && physicalSatisfied && (contradictionSatisfied || confessionSatisfied);

    const missing = [];
    if (!isCorrectCulprit) missing.push("Accused suspect does not match evidence trail");
    if (!physicalSatisfied) missing.push("Required physical evidence not yet presented or examined");
    if (!contradictionSatisfied) missing.push("Timeline contradiction not yet formally shattered");
    if (!confessionSatisfied) missing.push("Corroborating eyewitness or confession not yet secured");

    return { ready, isCorrectCulprit, physicalSatisfied, contradictionSatisfied, confessionSatisfied, missing };
  },

  /**
   * Formal Murder Indictment
   */
  indictSuspect: (accusedSuspectId, weaponId) => {
    const state = get();
    const route = STORYLINES[state.activeStoryline] || STORYLINES.A;
    const proof = get().checkProofChain(accusedSuspectId);

    if (proof.ready) {
      // SUCCESSFUL VERDICT
      const successVerdict = {
        success: true,
        culpritId: route.culpritId,
        culpritName: route.culpritName,
        title: `CASE SOLVED: ${route.culpritName.toUpperCase()} IS RESPONSIBLE`,
        summary: route.summary,
        motive: route.motive,
        fatalAction: route.fatalAction,
        stagedElement: route.stagedElement
      };

      set((prev) => ({
        isSolved: true,
        verdictResult: successVerdict,
        unlockedCutsceneIds: [...new Set([...prev.unlockedCutsceneIds, "cutscene_final_confrontation"])],
        checklistGoals: prev.checklistGoals.map((g) =>
          g.id === "confront_killer" ? { ...g, completed: true } : g
        )
      }));

      get().openCutscene("cutscene_final_confrontation");
      return successVerdict;
    } else {
      // FAILED ACCUSATION
      const remainingTries = Math.max(0, state.remainingTries - 1);
      const isFailed = remainingTries <= 0;

      const failVerdict = {
        success: false,
        title: "INDICTMENT FAILED: INSUFFICIENT PROOF",
        summary: `The magistrate rejected the warrant. Missing proof: ${proof.missing.join("; ")}.`,
        remainingTries
      };

      set({
        remainingTries,
        isFailed,
        failReason: isFailed ? "Case collapsed: Groundless indictment rejected by the magistrate." : null,
        verdictResult: failVerdict
      });

      return failVerdict;
    }
  },

  // ── Voice Controls ──────────────────────────────────────────────────────
  startVoiceRecording: async () => {
    gnaniPipeline.stopCurrentAudio();
    const success = await gnaniPipeline.startRecording();
    if (success) {
      set({
        isRecording: true,
        lastTranscript: "Listening... Speak your interrogation question clearly."
      });
    }
  },

  stopVoiceRecording: async () => {
    const state = get();
    if (!state.isRecording) return;
    set({ isRecording: false, isProcessing: true });

    const audioBlob = await gnaniPipeline.stopRecording();
    if (audioBlob) {
      const transcript = await gnaniPipeline.transcribeAudio(audioBlob, state.currentLanguage);
      set({ lastTranscript: transcript, isProcessing: false });

      if (transcript && transcript.trim()) {
        await get().dispatchCanonicalInterrogation(transcript, true);
      }
    } else {
      set({ isProcessing: false });
    }
  },

  toggleRecording: () => {
    if (get().isRecording) {
      get().stopVoiceRecording();
    } else {
      get().startVoiceRecording();
    }
  },

  askTopicQuestion: async (topic) => {
    const state = get();
    const suspectId = state.selectedSuspect;
    const candidateQid = QUESTION_DATABASE[topic.id]
      ? topic.id
      : QUESTION_DATABASE[`${suspectId}_${topic.id}`]
      ? `${suspectId}_${topic.id}`
      : null;

    if (candidateQid) {
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const currentSuspectData = suspects[suspectId] || suspects.raju;
      set((prev) => ({
        dialogueHistory: [
          ...prev.dialogueHistory,
          {
            id: "d-" + Date.now(),
            speaker: "Inspector (You)",
            text: topic.title,
            time: timeStr,
            type: "detective"
          }
        ]
      }));

      const res = await get().askQuestion(candidateQid, topic.title);
      const answer = res.success ? res.answer : (res.message || topic.response);

      set((prev) => ({
        currentDialogue: {
          speaker: currentSuspectData.name,
          role: currentSuspectData.role,
          text: answer,
          topics: currentSuspectData.topics || []
        },
        dialogueHistory: [
          ...prev.dialogueHistory,
          {
            id: "d-" + (Date.now() + 1),
            speaker: currentSuspectData.name,
            role: currentSuspectData.role,
            text: answer,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            type: "suspect",
            suspectId,
            questionId: candidateQid
          }
        ]
      }));

      const stress = get().suspectStress[suspectId] || 30;
      await gnaniPipeline.synthesizeSpeech(answer, suspectId, stress);
    } else {
      await get().dispatchCanonicalInterrogation(topic.title, false);
    }
  },

  askTextQuestion: async (text) => {
    await get().dispatchCanonicalInterrogation(text, false);
  },

  speakCurrentSuspect: async () => {
    const state = get();
    const suspectId = state.selectedSuspect;
    const text = state.currentDialogue?.text || suspects[suspectId]?.initialDialogue;
    const stress = state.suspectStress[suspectId] || 30;
    if (text) {
      await gnaniPipeline.synthesizeSpeech(text, suspectId, stress);
    }
  },

  speakDialogue: async (text, suspectId) => {
    const state = get();
    const sid = suspectId || state.selectedSuspect;
    const stress = state.suspectStress[sid] || 30;
    if (text) {
      await gnaniPipeline.synthesizeSpeech(text, sid, stress);
    }
  },

  stopAudio: () => {
    gnaniPipeline.stopCurrentAudio();
  },

  // ── Case Tab Helpers ────────────────────────────────────────────────────
  toggleChecklistGoal: (goalId) => {
    set((prev) => ({
      checklistGoals: prev.checklistGoals.map((g) =>
        g.id === goalId ? { ...g, completed: !g.completed } : g
      )
    }));
  },

  completeChecklistGoal: (goalId) => {
    set((prev) => ({
      checklistGoals: prev.checklistGoals.map((g) =>
        g.id === goalId ? { ...g, completed: true } : g
      )
    }));
  },

  addInvestigatorNote: (text, tag = "General") => {
    if (!text || !text.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newNote = {
      id: "note_" + Date.now(),
      timestamp: timeStr,
      text: text.trim(),
      tag,
      isAuto: false
    };
    set((prev) => ({
      investigatorNotes: [newNote, ...prev.investigatorNotes]
    }));
  },

  deleteInvestigatorNote: (noteId) => {
    set((prev) => ({
      investigatorNotes: prev.investigatorNotes.filter((n) => n.id !== noteId)
    }));
  }
}));

// Wire Gnani Pipeline status to store updates
gnaniPipeline.subscribe((pipeState) => {
  useGameStore.setState({
    pipelineState: pipeState,
    isRecording: pipeState.stage === "RECORDING",
    isProcessing: pipeState.stage === "STT_PROCESSING" || pipeState.stage === "TTS_SYNTHESIZING" || pipeState.stage === "PROCESSING",
    isSpeaking: pipeState.stage === "PLAYING"
  });
});

// Periodic Generator Atmospheric Flicker & Real-Time Countdown Timer (Browser Only)
if (typeof window !== "undefined") {
  setInterval(() => {
    const state = useGameStore.getState();
    if (!state.hasStartedGame || state.isSolved || state.isFailed || state.isPaused) return;
    useGameStore.setState({ generatorFlicker: true });
    ambientAudio.playFlicker();
    setTimeout(() => useGameStore.setState({ generatorFlicker: false }), 280);
  }, 5000);

  setInterval(() => {
    const state = useGameStore.getState();
    if (state.isSolved || state.isFailed || state.isPaused) return;
    if (state.generatorCountdown <= 1) {
      useGameStore.setState({
        generatorCountdown: 0,
        isFailed: true,
        failReason: "Auxiliary generator depleted: Rex Talkies plunged into permanent blackout and the killer fled."
      });
    } else {
      useGameStore.setState({ generatorCountdown: state.generatorCountdown - 1 });
    }
  }, 1000);
}
