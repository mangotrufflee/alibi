// src/state/GameContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { suspects } from "../data/suspects";
import { initialEvidenceItems } from "../data/evidence";
import { caseInfo } from "../data/caseInfo";
import { gnaniPipeline, SUSPECT_VOICE_MAP } from "../services/gnaniApi";
import { interrogationEngine } from "../services/interrogationEngine";

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

  // Select suspect
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
    async (queryText, isVoice = false) => {
      if (!queryText || !queryText.trim()) return;

      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const currentSuspectData = suspects[selectedSuspect] || suspects.raju;

      // 1. Add Detective query to dialogue
      setDialogueHistory((prev) => [
        ...prev,
        {
          id: "d-" + Date.now(),
          speaker: isVoice ? "Inspector (Voice STT)" : "Inspector (You)",
          text: queryText,
          time: timeStr,
          type: "detective"
        }
      ]);

      // 2. Interrogation Engine processes question
      const result = interrogationEngine.processQuery(selectedSuspect, queryText);

      // 3. Update stress and clues
      if (result.unlockedClue) {
        setDiscoveredClues((prev) => {
          if (!prev.includes(result.unlockedClue)) {
            return [result.unlockedClue, ...prev];
          }
          return prev;
        });
        setInvestigationProgress((p) => Math.min(100, p + 15));
      }

      setSuspectStress((prev) => ({
        ...prev,
        [selectedSuspect]: Math.min(100, (prev[selectedSuspect] || 30) + result.stressDelta)
      }));

      // 4. Update Current Dialogue display
      setCurrentDialogue({
        speaker: currentSuspectData.name,
        role: currentSuspectData.role,
        text: result.response,
        topics: currentSuspectData.topics || []
      });

      // 5. Add Suspect reply to history
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

      // 6. Gnani TTS Audio Playback
      await gnaniPipeline.synthesizeSpeech(result.response, selectedSuspect);
    },
    [selectedSuspect]
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
    generatorFlicker
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
