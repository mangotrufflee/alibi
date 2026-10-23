// src/services/gnaniApi.js
// Client-side voice client that communicates with the Gnani AI Backend Server

// Voice speed is clamped to Gnani's allowed range: 0.85–1.15
// Language codes MUST match the voice's preferred language (from Gnani voice catalog)
// Pitch is only used in browser TTS fallback (Gnani API ignores it)
export const SUSPECT_VOICE_MAP = {
  raju: {
    voice: "Shlok",         // Male, en-IN (conversational, warm — but we use hi-IN text)
    model: "timbre-v2.5",
    language: "hi-IN",      // Raju speaks Hindi
    speed: 1.15,            // Fast (nervous teen) — Gnani max
    pitch: 1.40,            // Browser fallback only
    gender: "male"
  },
  meera: {
    voice: "Urmila",        // Female, hi-IN (refined, formal — cold aristocrat)
    model: "timbre-v2.5",
    language: "en-IN",      // Meera speaks English
    speed: 0.85,            // Very slow (cold, deliberate) — Gnani min
    pitch: 0.60,            // Browser fallback only
    gender: "female"
  },
  arvind: {
    voice: "Deepak",        // Male, hi-IN (professional, measured — elderly professor)
    model: "timbre-v2.5",
    language: "en-IN",      // Arvind speaks English
    speed: 0.85,            // Slowest (scholarly, deliberate)
    pitch: 0.40,            // Browser fallback only
    gender: "male"
  },
  nusrat: {
    voice: "Kaveri",        // Female, en-IN (firm, professional — sharp student)
    model: "timbre-v2.5",
    language: "en-IN",      // Nusrat speaks English
    speed: 1.15,            // Fast (quick, defensive)
    pitch: 1.50,            // Browser fallback only
    gender: "female"
  },
  bhola: {
    voice: "Vikrant",       // Male, hi-IN (warm, conversational — old chaiwala)
    model: "timbre-v2.5",
    language: "hi-IN",      // Bhola speaks Hindi
    speed: 0.90,            // Slightly slow (earthy, unhurried)
    pitch: 0.50,            // Browser fallback only
    gender: "male"
  }
};

// Cached browser voices indexed by gender, loaded once
let _browserVoiceCache = null;

function loadBrowserVoices() {
  if (_browserVoiceCache) return _browserVoiceCache;
  if (!window.speechSynthesis) return { male: [], female: [], all: [] };

  const voices = window.speechSynthesis.getVoices();
  const all = voices;
  const male = voices.filter(
    (v) =>
      v.name.toLowerCase().includes("male") ||
      v.name.toLowerCase().includes("man") ||
      ["david", "mark", "daniel", "alex", "thomas", "ravi", "deepak", "pranav", "fred", "jorge"].some((n) =>
        v.name.toLowerCase().includes(n)
      )
  );
  const female = voices.filter(
    (v) =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("woman") ||
      ["samantha", "victoria", "karen", "moira", "fiona", "nalini", "veena", "lekha", "zira", "hazel", "tessa", "yashvi"].some((n) =>
        v.name.toLowerCase().includes(n)
      )
  );

  _browserVoiceCache = { male, female, all };
  return _browserVoiceCache;
}

// Pick the Nth distinct voice from a gender pool (wraps around)
function pickVoiceForSuspect(gender, slotIndex, lang) {
  const voices = loadBrowserVoices();
  const pool = gender === "female" ? voices.female : voices.male;

  // Prefer language-matching voices, then fall back to any pool voice
  const langFiltered = pool.filter((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));

  // Try lang-specific pool first, then gender pool, then all voices
  const candidates = langFiltered.length > 0 ? langFiltered : pool.length > 0 ? pool : voices.all;

  if (candidates.length === 0) return null;
  return candidates[slotIndex % candidates.length];
}

// Slot indices so suspects get different voice slots even within same gender
const SUSPECT_VOICE_SLOTS = {
  raju: 0,
  bhola: 1,
  arvind: 2,
  meera: 0,
  nusrat: 1,
};

export class GnaniClientService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.currentAudio = null;
    this.stage = "IDLE"; // IDLE | RECORDING | PROCESSING | PLAYING
    this.listeners = new Set();
    // Pre-warm voice cache after browser voices load
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const warmup = () => { _browserVoiceCache = null; loadBrowserVoices(); };
      window.speechSynthesis.onvoiceschanged = warmup;
      setTimeout(warmup, 500);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback({ stage: this.stage });
    return () => this.listeners.delete(callback);
  }

  setStage(stage) {
    this.stage = stage;
    this.listeners.forEach((cb) => cb({ stage }));
  }

  // Audio Recording
  async startRecording() {
    try {
      this.audioChunks = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaStream = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "";

      this.mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) this.audioChunks.push(e.data);
      };

      this.mediaRecorder.start(100);
      this.setStage("RECORDING");
      return true;
    } catch (err) {
      console.warn("Microphone not available, using fallback interrogation queries:", err);
      return false;
    }
  }

  async stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === "inactive") {
        this.setStage("IDLE");
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" });
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach((t) => t.stop());
        }
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  // Convert to 16kHz WAV
  async convertToWav(audioBlob) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      const targetSampleRate = 16000;
      const offlineCtx = new OfflineAudioContext(1, audioBuffer.duration * targetSampleRate, targetSampleRate);
      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineCtx.destination);
      source.start(0);

      const renderedBuffer = await offlineCtx.startRendering();
      audioCtx.close();

      return this.encodeWav(renderedBuffer);
    } catch (e) {
      return audioBlob;
    }
  }

  encodeWav(buffer) {
    const numChannels = 1;
    const sampleRate = buffer.sampleRate;
    const channelData = buffer.getChannelData(0);
    const dataSize = channelData.length * 2;
    const arrayBuffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(arrayBuffer);

    const writeStr = (offset, str) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };

    writeStr(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeStr(36, "data");
    view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let i = 0; i < channelData.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }

    return new Blob([view], { type: "audio/wav" });
  }

  // Transcribe detective audio via Backend
  async transcribeAudio(audioBlob, languageCode = "en-IN") {
    this.setStage("PROCESSING");
    try {
      const wavBlob = await this.convertToWav(audioBlob);
      const res = await fetch(`/api/stt?lang=${languageCode}`, {
        method: "POST",
        body: wavBlob
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.transcript) {
          return data.transcript;
        }
      }
    } catch (e) {
      console.warn("Backend STT fetch error:", e);
    }

    // Local fallback if backend returns fallback or is offline
    return this.fallbackQueryGenerator(languageCode);
  }

  fallbackQueryGenerator(languageCode) {
    return new Promise((resolve) => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.lang = languageCode;
          rec.continuous = false;
          let done = false;
          rec.onresult = (e) => {
            done = true;
            resolve(e.results[0][0].transcript);
          };
          rec.onerror = () => {
            if (!done) resolve(this.getRandomQuery());
          };
          rec.start();
          setTimeout(() => {
            if (!done) {
              rec.stop();
              resolve(this.getRandomQuery());
            }
          }, 3500);
          return;
        } catch (e) {
          // fall through
        }
      }
      setTimeout(() => resolve(this.getRandomQuery()), 300);
    });
  }

  getRandomQuery() {
    const queries = [
      "Where were you when the lights cut out at 8:45 PM?",
      "Why did you have Harbans Lal's duplicate projection booth key?",
      "Whose voice was shouting behind the cinema screen before the interval?",
      "Explain why the emergency generator voltage fuse was melted!",
      "Did you know Harbans Lal refused to sign the redevelopment sale deed?"
    ];
    return queries[Math.floor(Math.random() * queries.length)];
  }

  // Synthesize suspect speech via Backend Custom Voice
  async synthesizeSpeech(text, suspectId = "raju", stressLevel = 30) {
    this.setStage("PROCESSING");
    const voiceConfig = SUSPECT_VOICE_MAP[suspectId] || SUSPECT_VOICE_MAP.raju;

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, suspectId, stressLevel })
      });

      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("audio")) {
        const audioBlob = await res.blob();
        await this.playAudioBlob(audioBlob);
        return true;
      }
    } catch (e) {
      console.warn("Backend TTS fetch error:", e);
    }

    // Local SpeechSynthesis fallback — pass suspectId so we can pick distinct voices
    return this.fallbackSpeechSynthesis(text, voiceConfig, stressLevel, suspectId);
  }

  fallbackSpeechSynthesis(text, voiceConfig, stressLevel = 30, suspectId = "raju") {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        this.setStage("IDLE");
        resolve(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voiceConfig.language;

      // Apply strongly differentiated rate + pitch from voice fingerprint
      // stressBonus adds a little extra nervousness at high stress levels
      const stressBonus = Math.max((stressLevel - 30) / 100, 0) * 0.10;
      utterance.rate = Math.min(2.0, +(voiceConfig.speed + stressBonus).toFixed(2));
      utterance.pitch = Math.max(0.1, Math.min(2.0, +(voiceConfig.pitch).toFixed(2)));

      // Pick a distinct browser voice per suspect (gender-aware, slotted so they differ)
      const slotIndex = SUSPECT_VOICE_SLOTS[suspectId] ?? 0;
      const pickedVoice = pickVoiceForSuspect(voiceConfig.gender, slotIndex, voiceConfig.language);
      if (pickedVoice) {
        utterance.voice = pickedVoice;
        console.log(`[Fallback TTS] ${suspectId} → browser voice: "${pickedVoice.name}" rate=${utterance.rate} pitch=${utterance.pitch}`);
      } else {
        // Last-resort: just pick any available voice and apply rate/pitch fingerprint
        const allVoices = window.speechSynthesis.getVoices();
        if (allVoices.length > 0) {
          utterance.voice = allVoices[slotIndex % allVoices.length];
        }
        console.log(`[Fallback TTS] ${suspectId} → fallback voice slot ${slotIndex} rate=${utterance.rate} pitch=${utterance.pitch}`);
      }

      this.setStage("PLAYING");

      utterance.onend = () => {
        this.setStage("IDLE");
        resolve(true);
      };

      utterance.onerror = () => {
        this.setStage("IDLE");
        resolve(false);
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  async playAudioBlob(audioBlob) {
    return new Promise((resolve) => {
      this.stopCurrentAudio();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;
      this.setStage("PLAYING");

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        this.currentAudio = null;
        this.setStage("IDLE");
        resolve(true);
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        this.currentAudio = null;
        this.setStage("IDLE");
        resolve(false);
      };

      audio.play().catch(() => {
        this.setStage("IDLE");
        resolve(false);
      });
    });
  }

  stopCurrentAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.setStage("IDLE");
  }
}

export const gnaniPipeline = new GnaniClientService();
