// src/state/useGameStore.js
// ALIBI — Centralized Zustand Game State Store (Phases 1, 2 & 4)

import { create } from "zustand";
import { suspects } from "../data/suspects.js";
import { initialEvidenceItems } from "../data/evidence.js";
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
  TRUTH_GATES
} from "../data/truthGatesData.js";
import { truthGateEngine } from "../services/truthGateEngine.js";

export const useGameStore = create((set, get) => ({
  // ── Navigation & Tabs ───────────────────────────────────────────────────
  activeTab: "interrogation", // "interrogation" | "case-files" | "evidence" | "dossier" | "gnani-pipeline"
  caseSubTab: "evidence_list",
  setActiveTab: (tab) => set({ activeTab: tab }),
  setCaseSubTab: (subTab) => set({ caseSubTab: subTab }),

  // ── Suspects & Demeanor ─────────────────────────────────────────────────
  selectedSuspect: "raju",
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

  // ── Phase 4: Truth Gates & Contradictions ───────────────────────────────
  truthGates: [...TRUTH_GATES],
  unlockedGateIds: [],
  contradictions: [...INITIAL_CONTRADICTIONS],
  truthGatePopup: null, // { title, secretFact, points, suspectName }

  // ── Clues & Case Progress ───────────────────────────────────────────────
  caseInfo,
  discoveredClues: [
    "Victim Harbans Lal struck down during 8:45 PM interval blackout.",
    "Projection booth door was locked from the outside with a deadbolt key."
  ],
  investigationProgress: 25,
  evidenceItems: initialEvidenceItems,
  selectedEvidence: initialEvidenceItems[0],

  // ── Interrogation & Dialogue ────────────────────────────────────────────
  dialogueHistory: [
    {
      id: "d-0",
      speaker: "Inspector (You)",
      text: "Rex Talkies is sealed until we find Harbans Lal's killer. You were seen near the projection booth right before the power cut. Speak.",
      time: "09:02 PM",
      type: "detective"
    },
    {
      id: "d-1",
      speaker: "Raju Ansari",
      role: "Ticket Boy",
      text: suspects.raju.initialDialogue,
      time: "09:03 PM",
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
  isSolved: false,
  isFailed: false,
  failReason: null,
  scoredCardIds: {
    raju: [], meera: [], arvind: [], nusrat: [], bhola: []
  },
  activeHints: getActiveHints("raju", []),
  pointPopup: null,

  // ── Case Tabs Data ──────────────────────────────────────────────────────
  checklistGoals: INITIAL_CHECKLIST,
  investigatorNotes: INITIAL_INVESTIGATOR_NOTES,
  scoreLedger: [],
  generatorCountdown: 2400, // 40 minutes in seconds
  generatorFlicker: false,

  // ══════════════════════════════════════════════════════════════════════════
  // ACTIONS & METHODS
  // ══════════════════════════════════════════════════════════════════════════

  setSelectedEvidence: (evidence) => set({ selectedEvidence: evidence }),
  setCurrentLanguage: (lang) => set({ currentLanguage: lang }),

  setGeneratorCountdown: (updateFn) => {
    set((state) => {
      const nextCount = typeof updateFn === "function" ? updateFn(state.generatorCountdown) : updateFn;
      return { generatorCountdown: nextCount };
    });
  },

  setGeneratorFlicker: (val) => set({ generatorFlicker: val }),

  selectSuspect: (suspectId) => {
    const suspect = suspects[suspectId];
    if (!suspect) return;

    gnaniPipeline.stopCurrentAudio();

    const state = get();
    const alreadyScored = (state.scoredCardIds && state.scoredCardIds[suspectId]) || [];
    const hints = getActiveHints(suspectId, alreadyScored);

    set({
      selectedSuspect: suspectId,
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
  },

  /**
   * Phase 4: Core Interrogation Dispatch Pipeline.
   * Intertwines Truth Gates, Keyword Scoring, Contradictions, and Gnani TTS.
   */
  dispatchInterrogation: async (queryText, isVoice = false, isEvidence = false) => {
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

    // 2. Phase 4: Evaluate Truth Gates for Breakthroughs
    const seenEvidence = (state.suspectLiveState[suspectId] && state.suspectLiveState[suspectId].seenEvidence) || [];
    const resolvedContradictions = state.contradictions.filter((c) => c.resolved).map((c) => c.id);

    const gateEval = truthGateEngine.evaluateQuery(
      suspectId,
      queryText,
      state.suspectLiveState,
      state.unlockedGateIds,
      seenEvidence,
      resolvedContradictions
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
        // Breakthrough achieved!
        unlockedClue = gateEval.unlockedClue;
        pointsAwarded = gateEval.points || 20;

        // Fire Truth Gate Breakthrough Alert
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
      }
    } else {
      // Regular interrogation trigger match
      const regularResult = interrogationEngine.processQuery(suspectId, queryText);
      finalResponse = regularResult.response;
      finalStressDelta = regularResult.stressDelta;
      unlockedClue = regularResult.unlockedClue;
    }

    // 3. Phase 1 Scoring Engine: Match transcript against hint cards
    if (!isEvidence) {
      const alreadyScored = (get().scoredCardIds && get().scoredCardIds[suspectId]) || [];
      const matchResult = matchTranscriptToHintCards(queryText, suspectId, alreadyScored);

      if (matchResult.matched && matchResult.card) {
        const currentScore = get().score;
        const currentTries = get().remainingTries;
        const update = computeScoreUpdate(matchResult, currentScore, currentTries);

        // Point popup
        set({
          pointPopup: {
            delta: update.delta,
            keyword: matchResult.matchedKeyword || matchResult.card.keyword,
            type: matchResult.card.type
          }
        });
        setTimeout(() => set({ pointPopup: null }), 2200);

        // Update score & tries
        set((prev) => ({
          score: update.nextScore,
          remainingTries: update.nextTries,
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
          activeHints: getActiveHints(suspectId, [...(prev.scoredCardIds[suspectId] || []), matchResult.card.id])
        }));

        if (update.isSolved) {
          set((prev) => ({
            isSolved: true,
            checklistGoals: prev.checklistGoals.map((g) =>
              g.id === "confront_killer" ? { ...g, completed: true } : g
            )
          }));
        }

        if (update.isFailed) {
          set({
            isFailed: true,
            failReason: "Investigation collapsed: 3 critical missteps while on thin-ice ruined the prosecution."
          });
        }
      }
    }

    // If a truth gate awarded points, apply them to the score
    if (pointsAwarded > 0) {
      set((prev) => {
        const nextScore = prev.score + pointsAwarded;
        return {
          score: nextScore,
          isSolved: nextScore >= prev.solveThreshold ? true : prev.isSolved,
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

    // 4. Update Suspect Live State (Stress, Trust, Clues)
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

    // Auto-complete suspect whereabouts goal
    set((prev) => ({
      checklistGoals: prev.checklistGoals.map((goal) => {
        if (goal.targetSuspect === suspectId && goal.category.includes("Whereabouts")) {
          return { ...goal, completed: true };
        }
        return goal;
      })
    }));

    // If clue unlocked, record into discoveredClues & Investigator Notes
    if (unlockedClue) {
      set((prev) => {
        const nextClues = prev.discoveredClues.includes(unlockedClue)
          ? prev.discoveredClues
          : [unlockedClue, ...prev.discoveredClues];

        const nextProgress = Math.min(100, prev.investigationProgress + 15);

        const newNote = {
          id: "auto_" + Date.now(),
          timestamp: timeStr,
          text: `[BREAKTHROUGH // ${currentSuspectData.name}]: ${unlockedClue}`,
          tag: "Clue",
          isAuto: true
        };

        const updatedChecklist = prev.checklistGoals.map((g) => {
          const cLower = unlockedClue.toLowerCase();
          if ((cLower.includes("booth key") || cLower.includes("office key") || cLower.includes("deadbolt")) && g.id === "clue_key_origin") {
            return { ...g, completed: true };
          }
          if ((cLower.includes("tea was delivered") || cLower.includes("poison") || cLower.includes("sedative") || cLower.includes("tampered")) && g.id === "clue_sedative") {
            return { ...g, completed: true };
          }
          if ((cLower.includes("redevelopment deal") || cLower.includes("sale deed") || cLower.includes("18-crore")) && g.id === "clue_deed") {
            return { ...g, completed: true, hidden: false };
          }
          if ((cLower.includes("erase") || cLower.includes("audio recorder") || cLower.includes("wiped")) && g.id === "clue_erased_audio") {
            return { ...g, completed: true, hidden: false };
          }
          return g;
        });

        return {
          discoveredClues: nextClues,
          investigationProgress: nextProgress,
          investigatorNotes: [newNote, ...prev.investigatorNotes],
          checklistGoals: updatedChecklist
        };
      });
    }

    // 5. Update Current Dialogue display & Dialogue History
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

    // 6. Gnani TTS Audio Playback with Custom Suspect Voice & Stress Modulation
    await gnaniPipeline.synthesizeSpeech(finalResponse, suspectId, nextStress);
  },

  /**
   * Phase 4: Direct Contradiction Challenge Action.
   * Evaluates contradiction clashes from TimelineTab or spoken prompts.
   */
  confrontSuspectWithContradiction: async (contradictionId) => {
    const state = get();
    const result = truthGateEngine.evaluateContradictionChallenge(
      contradictionId,
      state.suspectLiveState,
      state.unlockedGateIds
    );

    if (!result.valid) return;

    // 1. Switch to the suspect and open interrogation tab
    get().selectSuspect(result.suspectId);
    set({ activeTab: "interrogation" });

    const c = result.contradiction;
    const query = `You claimed: "${c.claimA}", but physical proof confirms: "${c.claimB}"! You are lying to the police!`;

    // 2. Mark contradiction resolved
    set((prev) => ({
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

    // 3. Dispatch interrogation with the contradiction query
    await get().dispatchInterrogation(query, false, false);
  },

  /**
   * Phase 4: Present Evidence to Suspect.
   * Tracks seen evidence and tests truth gates.
   */
  presentEvidenceToSuspect: async (evidenceId) => {
    const state = get();
    const item =
      state.evidenceItems.find((e) => e.id === evidenceId) ||
      initialEvidenceItems.find((e) => e.id === evidenceId);
    if (!item) return;

    const suspectId = state.selectedSuspect;

    // Track evidence as seen by this suspect
    set((prev) => ({
      selectedEvidence: item,
      activeTab: "interrogation",
      suspectLiveState: {
        ...prev.suspectLiveState,
        [suspectId]: {
          ...(prev.suspectLiveState[suspectId] || {}),
          seenEvidence: [
            ...new Set([...((prev.suspectLiveState[suspectId]?.seenEvidence) || []), evidenceId])
          ]
        }
      }
    }));

    const query = `Look at this evidence: ${item.name}! ${item.clue}. What do you have to say for yourself?`;
    await get().dispatchInterrogation(query, false, true);
  },

  // ── Voice Recording & Audio Controls ────────────────────────────────────
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
        await get().dispatchInterrogation(transcript, true);
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

  askTopicQuestion: (topic) => {
    get().dispatchInterrogation(topic.title, false);
  },

  askTextQuestion: (text) => {
    get().dispatchInterrogation(text, false);
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
    isProcessing: pipeState.stage === "STT_PROCESSING" || pipeState.stage === "TTS_SYNTHESIZING",
    isSpeaking: pipeState.stage === "PLAYING"
  });
});

// Periodic Generator Atmospheric Flicker
setInterval(() => {
  if (Math.random() > 0.65) {
    useGameStore.setState({ generatorFlicker: true });
    setTimeout(() => useGameStore.setState({ generatorFlicker: false }), 280);
  }
}, 18000);

// Auxiliary Generator Real-Time Countdown Timer (40 Minutes)
setInterval(() => {
  const state = useGameStore.getState();
  if (state.isSolved || state.isFailed) return;
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
