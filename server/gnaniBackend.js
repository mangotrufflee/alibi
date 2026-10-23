// server/gnaniBackend.js
// Dedicated Backend Service for Gnani.ai Voice Pipeline
// Manages API keys securely on the server and applies custom voices for each suspect.

import fs from "fs";
import path from "path";
import { getCustomVoiceConfig } from "./suspectVoices.js";

const GNANI_BASE_URL = "https://api.vachana.ai";

// Read GNANI_API_KEY from environment or .env file
export function getGnaniApiKey() {
  if (process.env.GNANI_API_KEY && process.env.GNANI_API_KEY.trim()) {
    return process.env.GNANI_API_KEY.trim();
  }

  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/^GNANI_API_KEY=(.*)$/m);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (e) {
    // ignore
  }
  return "";
}

// Backend STT Handler
export async function handleBackendSTT(audioBuffer, languageCode = "en-IN") {
  const apiKey = getGnaniApiKey();

  if (apiKey) {
    try {
      const formData = new FormData();
      const audioBlob = new Blob([audioBuffer], { type: "audio/wav" });
      formData.append("audio_file", audioBlob, "detective_interrogation.wav");
      formData.append("language_code", languageCode);
      formData.append("preferred_language", languageCode);
      formData.append("format", "transcribe");
      formData.append("itn_native_numerals", "true");

      const res = await fetch(`${GNANI_BASE_URL}/stt/v3`, {
        method: "POST",
        headers: {
          "X-API-Key-ID": apiKey
        },
        body: formData
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`[Gnani Backend STT] Error HTTP ${res.status}: ${errText}`);
        return { success: false, fallback: true, error: errText };
      }

      const data = await res.json();
      const transcript = data.transcript || data.text || data.transcription || "";
      return { success: true, transcript, source: "gnani_prisma_v2.5" };
    } catch (err) {
      console.warn("[Gnani Backend STT] Network failure:", err.message);
      return { success: false, fallback: true, error: err.message };
    }
  }

  // If no backend API key, return fallback signal
  return {
    success: false,
    fallback: true,
    message: "No GNANI_API_KEY configured in .env. Running local speech recognition fallback."
  };
}

// Backend TTS Handler with Custom Suspect Voices
export async function handleBackendTTS(text, suspectId = "raju", stressLevel = 30) {
  const apiKey = getGnaniApiKey();
  const voiceConfig = getCustomVoiceConfig(suspectId, stressLevel);

  if (apiKey) {
    try {
      // Gnani speed range: 0.85 (slow) to 1.15 (fast)
      const clampedSpeed = Math.min(1.15, Math.max(0.85, voiceConfig.speed));

      const payload = {
        text,
        voice: voiceConfig.voice,
        model: voiceConfig.model,
        language: voiceConfig.language,
        speed: clampedSpeed,
        audio_config: voiceConfig.audioConfig
      };

      console.log(`[Gnani TTS] ${voiceConfig.displayName} | voice=${voiceConfig.voice} speed=${clampedSpeed} lang=${voiceConfig.language}`);

      const res = await fetch(`${GNANI_BASE_URL}/api/v1/tts/inference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key-ID": apiKey
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`[Gnani Backend TTS] Error HTTP ${res.status}: ${errText}`);
        return { success: false, fallback: true, voiceConfig, error: errText };
      }

      // Gnani always returns raw binary audio on 200 — never JSON
      const contentType = res.headers.get("content-type") || "audio/wav";
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return { success: true, audioBuffer: buffer, contentType, voiceConfig };
    } catch (err) {
      console.warn("[Gnani Backend TTS] Network failure:", err.message);
      return { success: false, fallback: true, voiceConfig, error: err.message };
    }
  }

  return {
    success: false,
    fallback: true,
    voiceConfig,
    message: "No GNANI_API_KEY configured in .env. Engaging local speech synthesis."
  };
}
