// src/state/GameContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { suspects } from "../data/suspects";
import { initialEvidenceItems } from "../data/evidence";
import { caseInfo } from "../data/caseInfo";
import { gnaniPipeline, SUSPECT_VOICE_MAP } from "../services/gnaniApi";
import { interrogationEngine } from "../services/interrogationEngine";
import { getActiveHints } from "../data/hintCards";
import {
  matchTranscriptToHintCards,
  computeScoreUpdate,
  SOLVE_THRESHOLD,
  INITIAL_SCORE,
  INITIAL_TRIES
} from "../services/scoringEngine.js";
import { INITIAL_CHECKLIST, INITIAL_INVESTIGATOR_NOTES } from "../data/caseTabsData.js";

const GameContext = createContext(null);
export const useGame = () => useContext(GameContext);

export function GameProvider({ children }) {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState("interrogation"); // "interrogation" | "evidence" | "dossier" | "gnani-pipeline" | "accuse"

  // Suspects & Demeanor
  const [selectedSuspect, setSelectedSuspect] = useState("raju");
  const [suspectStress, setSuspectStress] = useState({
    raju: 35,
    meera: 20,
    arvind: 15,
    nusrat: 40,
    bhola: 25
  });

  // Clues & Investigation progress
  const [discoveredClues, setDiscoveredClues] = useState([
    "Victim Harbans Lal struck down during 8:45 PM interval blackout.",
    "Projection booth door was locked from the outside with a deadbolt key."
  ]);
  const [investigationProgress, setInvestigationProgress] = useState(25);
  const [evidenceItems, setEvidenceItems] = useState(initialEvidenceItems);
  const [selectedEvidence, setSelectedEvidence] = useState(initialEvidenceItems[0]);

  // Dialogue & Interrogation
  const [dialogueHistory, setDialogueHistory] = useState([
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
  ]);

  const [currentDialogue, setCurrentDialogue] = useState({
    speaker: "Raju Ansari",
    role: "Ticket Boy",
    text: suspects.raju.initialDialogue,
    topics: suspects.raju.topics || []
  });

  // Gnani Pipeline Reactive State
  const [pipelineState, setPipelineState] = useState(() => gnaniPipeline.pipelineState);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("en-IN"); // "en-IN" | "hi-IN"

  // ── Phase 1: Scoring, Hint Cards & Thin-Ice System ──────────────────────
  const [score, setScore] = useState(INITIAL_SCORE);
  const [remainingTries, setRemainingTries] = useState(INITIAL_TRIES);
  const [isSolved, setIsSolved] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [failReason, setFailReason] = useState(null);
  // Map of suspectId -> array of scored hint-card IDs (prevents re-scoring)
  const [scoredCardIds, setScoredCardIds] = useState({
    raju: [], meera: [], arvind: [], nusrat: [], bhola: []
  });
  // Active hint cards for the currently selected suspect
  const [activeHints, setActiveHints] = useState(() =>
    getActiveHints("raju", [])
  );
  // Transient point popup: { delta, keyword, type } | null
  const [pointPopup, setPointPopup] = useState(null);

  // ── Phase 2: Complete Suite of 8 Case Tabs State ────────────────────────
  const [caseSubTab, setCaseSubTab] = useState("evidence_list");
  const [checklistGoals, setChecklistGoals] = useState(INITIAL_CHECKLIST);
  const [investigatorNotes, setInvestigatorNotes] = useState(INITIAL_INVESTIGATOR_NOTES);
  const [scoreLedger, setScoreLedger] = useState([]);
  const [generatorCountdown, setGeneratorCountdown] = useState(2400); // 40 minutes

  // 40-Minute Generator Real-Time Countdown
  useEffect(() => {
    if (isSolved || isFailed) return;
    const interval = setInterval(() => {
      setGeneratorCountdown((prev) => {
        if (prev <= 1) {
          setIsFailed(true);
          setFailReason("Auxiliary generator depleted: Rex Talkies plunged into permanent blackout and the killer fled.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSolved, isFailed]);

  // Synchronize active hint cards whenever selected suspect or scored cards change
  useEffect(() => {
    const alreadyScored = (scoredCardIds && scoredCardIds[selectedSuspect]) || [];
    setActiveHints(getActiveHints(selectedSuspect, alreadyScored));
  }, [selectedSuspect, scoredCardIds]);

  // Atmosphere
  const [generatorFlicker, setGeneratorFlicker] = useState(false);
  const audioWaveCanvasRef = useRef(null);

  // Subscribe to Gnani Pipeline changes
  useEffect(() => {
    const unsubscribe = gnaniPipeline.subscribe((state) => {
      setPipelineState(state);
      setIsRecording(state.stage === "RECORDING");
      setIsProcessing(state.stage === "STT_PROCESSING" || state.stage === "TTS_SYNTHESIZING");
      setIsSpeaking(state.stage === "PLAYING");
    });
    return unsubscribe;
  }, []);

  // Periodic atmospheric surge flicker
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setGeneratorFlicker(true);
        setTimeout(() => setGeneratorFlicker(false), 300);
      }
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  // Select suspect — switches focus and initial dialogue
  const selectSuspect = useCallback((suspectId) => {
    const suspect = suspects[suspectId];
    if (!suspect) return;

    gnaniPipeline.stopCurrentAudio();
    setSelectedSuspect(suspectId);

    const initialText = suspect.initialDialogue;
    setCurrentDialogue({
      speaker: suspect.name,
      role: suspect.role,
      text: initialText,
      topics: suspect.topics || []
    });

    setDialogueHistory((prev) => [
      ...prev,
      {
        id: "d-" + Date.now(),
        speaker: suspect.name,
        role: suspect.role,
        text: initialText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "suspect",
        suspectId
      }
    ]);
  }, []);

  // Process Interrogation Response (The core pipeline dispatch)
  const dispatchInterrogation = useCallback(
    async (queryText, isVoice = false, isEvidence = false) => {
      if (!queryText || !queryText.trim()) return;
      if (isSolved || isFailed) return; // Game over — no more interrogation

      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const currentSuspectData = suspects[selectedSuspect] || suspects.raju;

      // 1. Add Detective query to dialogue
      setDialogueHistory((prev) => [
        ...prev,
        {
          id: "d-" + Date.now(),
          speaker: isVoice ? "Inspector (Voice STT)" : isEvidence ? "Inspector (Physical Evidence)" : "Inspector (You)",
          text: queryText,
          time: timeStr,
          type: "detective"
        }
      ]);

      // 2. Interrogation Engine processes question (stress, clues, response text)
      const result = interrogationEngine.processQuery(selectedSuspect, queryText);

      // 3. Scoring Engine: match transcript against hint card keywords (only for non-evidence speech)
      if (!isEvidence) {
        const alreadyScored = (scoredCardIds && scoredCardIds[selectedSuspect]) || [];
        const matchResult = matchTranscriptToHintCards(queryText, selectedSuspect, alreadyScored);

        if (matchResult.matched && matchResult.card) {
          const update = computeScoreUpdate(matchResult, score, remainingTries);

          // Fire point popup (auto-clears after 2.2s)
          setPointPopup({
            delta: update.delta,
            keyword: matchResult.matchedKeyword || matchResult.card.keyword,
            type: matchResult.card.type
          });
          setTimeout(() => setPointPopup(null), 2200);

          // Update Score
          setScore(update.nextScore);

          // Update remaining tries if reduced
          if (update.nextTries !== remainingTries) {
            setRemainingTries(update.nextTries);
          }

          // Record to Chronological Score Ledger (including neutral cards)
          setScoreLedger((prevLedger) => [
            {
              id: "sc_" + Date.now(),
              timestamp: timeStr,
              suspect: currentSuspectData.name,
              keyword: matchResult.matchedKeyword || matchResult.card.keyword,
              type: matchResult.card.type,
              delta: update.delta,
              scoreAfter: update.nextScore
            },
            ...prevLedger
          ]);

          // Mark this card as scored
          setScoredCardIds((prev) => ({
            ...prev,
            [selectedSuspect]: [...(prev[selectedSuspect] || []), matchResult.card.id]
          }));

          if (update.isSolved) {
            setIsSolved(true);
            setChecklistGoals((prevG) =>
              prevG.map((g) => (g.id === "confront_killer" ? { ...g, completed: true } : g))
            );
          }

          if (update.isFailed) {
            setIsFailed(true);
            setFailReason("Investigation collapsed: 3 critical missteps while on thin-ice ruined the prosecution case.");
          }
        }
      }

      // Auto-complete suspect whereabouts goal (matches by targetSuspect regardless of ID naming)
      setChecklistGoals((prevGoals) =>
        prevGoals.map((goal) => {
          if (goal.targetSuspect === selectedSuspect && goal.category.includes("Whereabouts")) {
            return { ...goal, completed: true };
          }
          return goal;
        })
      );

      // 4. Update stress and clues
      if (result.unlockedClue) {
        setDiscoveredClues((prev) => {
          if (!prev.includes(result.unlockedClue)) {
            return [result.unlockedClue, ...prev];
          }
          return prev;
        });
        setInvestigationProgress((p) => Math.min(100, p + 15));

        // Auto-record new clue into Investigator Notes
        setInvestigatorNotes((prevNotes) => [
          {
            id: "auto_" + Date.now(),
            timestamp: timeStr,
            text: `[BREAKTHROUGH // ${currentSuspectData.name}]: ${result.unlockedClue}`,
            tag: "Clue",
            isAuto: true
          },
          ...prevNotes
        ]);

        // Auto-reveal or complete checklist goals tied to discovered clues
        setChecklistGoals((prevGoals) =>
          prevGoals.map((g) => {
            const cLower = result.unlockedClue.toLowerCase();
            if ((cLower.includes("booth key") || cLower.includes("office key") || cLower.includes("deadbolt")) && g.id === "clue_key_origin") {
              return { ...g, completed: true };
            }
            if ((cLower.includes("tea was delivered") || cLower.includes("poison") || cLower.includes("sedative") || cLower.includes("datura")) && g.id === "clue_sedative") {
              return { ...g, completed: true };
            }
            if ((cLower.includes("redevelopment deal") || cLower.includes("sale deed") || cLower.includes("18-crore")) && g.id === "clue_deed") {
              return { ...g, completed: true, hidden: false };
            }
            if ((cLower.includes("erase") || cLower.includes("audio recorder") || cLower.includes("wiped") || cLower.includes("tampered")) && g.id === "clue_erased_audio") {
              return { ...g, completed: true, hidden: false };
            }
            return g;
          })
        );
      }

      const nextStress = Math.min(100, (suspectStress[selectedSuspect] || 30) + result.stressDelta);
      setSuspectStress((prev) => ({
        ...prev,
        [selectedSuspect]: nextStress
      }));

      // 5. Update Current Dialogue display
      setCurrentDialogue({
        speaker: currentSuspectData.name,
        role: currentSuspectData.role,
        text: result.response,
        topics: currentSuspectData.topics || []
      });

      // 6. Add Suspect reply to history
      setDialogueHistory((prev) => [
        ...prev,
        {
          id: "d-" + (Date.now() + 1),
          speaker: currentSuspectData.name,
          role: currentSuspectData.role,
          text: result.response,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "suspect",
          suspectId: selectedSuspect
        }
      ]);

      // 7. Gnani TTS Audio Playback with Custom Suspect Voice & Stress Modulation
      await gnaniPipeline.synthesizeSpeech(result.response, selectedSuspect, nextStress);
    },
    [selectedSuspect, suspectStress, score, remainingTries, scoredCardIds, isSolved, isFailed]
  );

  // Push-To-Talk Voice Recording Flow
  const startVoiceRecording = useCallback(async () => {
    gnaniPipeline.stopCurrentAudio();
    const success = await gnaniPipeline.startRecording();
    if (success) {
      setIsRecording(true);
      setLastTranscript("Listening... Speak your interrogation question clearly.");
    }
  }, []);

  const stopVoiceRecording = useCallback(async () => {
    if (!isRecording) return;
    setIsRecording(false);
    setIsProcessing(true);

    const audioBlob = await gnaniPipeline.stopRecording();
    if (audioBlob) {
      const transcript = await gnaniPipeline.transcribeAudio(audioBlob, currentLanguage);
      setLastTranscript(transcript);
      setIsProcessing(false);

      if (transcript && transcript.trim()) {
        await dispatchInterrogation(transcript, true);
      }
    } else {
      setIsProcessing(false);
    }
  }, [isRecording, currentLanguage, dispatchInterrogation]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopVoiceRecording();
    } else {
      startVoiceRecording();
    }
  }, [isRecording, startVoiceRecording, stopVoiceRecording]);

  // Topic Click Flow
  const askTopicQuestion = useCallback(
    (topic) => {
      dispatchInterrogation(topic.title, false);
    },
    [dispatchInterrogation]
  );

  // Manual Text Interrogation
  const askTextQuestion = useCallback(
    (text) => {
      dispatchInterrogation(text, false);
    },
    [dispatchInterrogation]
  );

  // Stop current speaking
  const stopAudio = useCallback(() => {
    gnaniPipeline.stopCurrentAudio();
  }, []);

  // ── Phase 2: Case Tabs Actions ──────────────────────────────────────────
  const toggleChecklistGoal = useCallback((goalId) => {
    setChecklistGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g))
    );
  }, []);

  const completeChecklistGoal = useCallback((goalId) => {
    setChecklistGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, completed: true } : g))
    );
  }, []);

  const addInvestigatorNote = useCallback((text, tag = "General") => {
    if (!text || !text.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newNote = {
      id: "note_" + Date.now(),
      timestamp: timeStr,
      text: text.trim(),
      tag,
      isAuto: false
    };
    setInvestigatorNotes((prev) => [newNote, ...prev]);
  }, []);

  const deleteInvestigatorNote = useCallback((noteId) => {
    setInvestigatorNotes((prev) => prev.filter((n) => n.id !== noteId));
  }, []);

  const presentEvidenceToSuspect = useCallback(
    (evidenceId) => {
      const item =
        evidenceItems.find((e) => e.id === evidenceId) ||
        initialEvidenceItems.find((e) => e.id === evidenceId);
      if (!item) return;

      setSelectedEvidence(item);
      setActiveTab("interrogation");
      dispatchInterrogation(`Look at this evidence: ${item.name}! How do you explain this?`, false, true);
    },
    [evidenceItems, dispatchInterrogation, setActiveTab, setSelectedEvidence]
  );

  const value = {
    // Navigation
    activeTab,
    setActiveTab,

    // Suspects
    selectedSuspect,
    selectSuspect,
    suspectStress,
    suspectVoiceMap: SUSPECT_VOICE_MAP,

    // Case Lore & Progress
    caseInfo,
    discoveredClues,
    investigationProgress,
    evidenceItems,
    selectedEvidence,
    setSelectedEvidence,

    // Interrogation & Dialogue
    dialogueHistory,
    currentDialogue,
    askTopicQuestion,
    askTextQuestion,
    isRecording,
    isProcessing,
    isSpeaking,
    lastTranscript,
    toggleRecording,
    stopAudio,

    currentLanguage,
    setCurrentLanguage,
    gnaniPipeline,

    // Atmosphere
    generatorFlicker,

    // ── Phase 1: Scoring & Hint Cards ─────────────────────────────────────
    score,
    solveThreshold: SOLVE_THRESHOLD,
    remainingTries,
    isSolved,
    isFailed,
    failReason,
    activeHints,
    pointPopup,
    scoredCardIds,

    // ── Phase 2: Complete Suite of 8 Case Tabs ────────────────────────────
    caseSubTab,
    setCaseSubTab,
    checklistGoals,
    toggleChecklistGoal,
    completeChecklistGoal,
    investigatorNotes,
    addInvestigatorNote,
    deleteInvestigatorNote,
    scoreLedger,
    generatorCountdown,
    presentEvidenceToSuspect
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
