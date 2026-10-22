// src/services/gnaniApi.js
// Client-side voice client that communicates with the Gnani AI Backend Server

export const SUSPECT_VOICE_MAP = {
  raju: {
    voice: "Pranav",
    model: "timbre-v2.5",
    language: "hi-IN",
    speed: 1.08,
    pitch: 1.05,
    gender: "male"
  },
  meera: {
    voice: "Nalini",
    model: "timbre-v2.5",
    language: "en-IN",
    speed: 0.95,
    pitch: 0.98,
    gender: "female"
  },
  arvind: {
    voice: "Pranav",
    model: "timbre-v2.5",
    language: "en-IN",
    speed: 0.88,
    pitch: 0.90,
    gender: "male"
  },
  nusrat: {
    voice: "Yashvi",
    model: "timbre-v2.5",
    language: "en-IN",
    speed: 1.05,
    pitch: 1.02,
    gender: "female"
  },
  bhola: {
    voice: "Pranav",
    model: "timbre-v2.5",
    language: "hi-IN",
    speed: 0.98,
    pitch: 0.95,
    gender: "male"
  }
};

export class GnaniClientService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.currentAudio = null;
    this.stage = "IDLE"; // IDLE | RECORDING | PROCESSING | PLAYING
    this.listeners = new Set();
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

  // Synthesize suspect speech via Backend
  async synthesizeSpeech(text, suspectId = "raju") {
    this.setStage("PROCESSING");
    const voiceConfig = SUSPECT_VOICE_MAP[suspectId] || SUSPECT_VOICE_MAP.raju;

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceConfig })
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

    // Local SpeechSynthesis fallback
    return this.fallbackSpeechSynthesis(text, voiceConfig);
  }

  fallbackSpeechSynthesis(text, voiceConfig) {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        this.setStage("IDLE");
        resolve(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voiceConfig.language;
      utterance.rate = voiceConfig.speed;
      utterance.pitch = voiceConfig.pitch;

      const voices = window.speechSynthesis.getVoices();
      const matched = voices.find(
        (v) =>
          v.lang.toLowerCase().includes(voiceConfig.language.toLowerCase()) ||
          v.name.toLowerCase().includes("india") ||
          v.name.toLowerCase().includes("hindi")
      );
      if (matched) utterance.voice = matched;

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
