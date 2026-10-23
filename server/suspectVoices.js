// server/suspectVoices.js
// Custom Voice Configurations for Rex Talkies Suspects using Gnani Timbre

import fs from "fs";
import path from "path";

// Helper to get custom voice override from .env or process.env
function getEnvVoice(key) {
  if (process.env[key] && process.env[key].trim()) {
    return process.env[key].trim();
  }
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(new RegExp(`^${key}=(.*)$`, "m"));
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (e) {
    // ignore
  }
  return "";
}

export const BASELINE_SUSPECT_VOICES = {
  raju: {
    suspectId: "raju",
    displayName: "Raju Ansari (Ticket Boy)",
    defaultVoice: "Shlok",      // Male, English-preferred but handles Hindi text
    envKey: "GNANI_VOICE_RAJU",
    model: "timbre-v2.5",
    language: "hi-IN",
    baseSpeed: 1.10,            // Fast, nervous teen — within Gnani limit
    basePitch: 1.20,            // Browser fallback only
    gender: "male",
    personaDescription: "19-year-old nervous Old Delhi youth, rapid breathing, hurried defensive cadence",
    audioConfig: {
      encoding: "linear_pcm",
      container: "wav",
      num_channels: 1,
      sample_rate: 48000,
      sample_width: 2
    }
  },
  meera: {
    suspectId: "meera",
    displayName: "Meera Kapoor (Cinema Owner)",
    defaultVoice: "Urmila",     // Female, Hindi-preferred refined/formal
    envKey: "GNANI_VOICE_MEERA",
    model: "timbre-v2.5",
    language: "en-IN",
    baseSpeed: 0.85,            // Slow, cold, deliberate — Gnani minimum
    basePitch: 0.65,            // Browser fallback only
    gender: "female",
    personaDescription: "42-year-old aristocratic cinema proprietor, slow, cold, calculating, deliberate enunciation",
    audioConfig: {
      encoding: "linear_pcm",
      container: "wav",
      num_channels: 1,
      sample_rate: 48000,
      sample_width: 2
    }
  },
  arvind: {
    suspectId: "arvind",
    displayName: "Dr. Arvind Sethi (Retired Professor)",
    defaultVoice: "Deepak",     // Male, Hindi-preferred professional voice
    envKey: "GNANI_VOICE_ARVIND",
    model: "timbre-v2.5",
    language: "en-IN",
    baseSpeed: 0.87,            // Scholarly, measured pace
    basePitch: 0.50,            // Browser fallback only
    gender: "male",
    personaDescription: "68-year-old cinema historian, deep raspy baritone, analytical pauses, scholarly weight",
    audioConfig: {
      encoding: "linear_pcm",
      container: "wav",
      num_channels: 1,
      sample_rate: 48000,
      sample_width: 2
    }
  },
  nusrat: {
    suspectId: "nusrat",
    displayName: "Nusrat Ali (Film Student)",
    defaultVoice: "Kaveri",     // Female, English-preferred firm/professional
    envKey: "GNANI_VOICE_NUSRAT",
    model: "timbre-v2.5",
    language: "en-IN",
    baseSpeed: 1.10,            // Fast, sharp, quick replies
    basePitch: 1.45,            // Browser fallback only
    gender: "female",
    personaDescription: "23-year-old university student, sharp, collegiate, quick defensive protests",
    audioConfig: {
      encoding: "linear_pcm",
      container: "wav",
      num_channels: 1,
      sample_rate: 48000,
      sample_width: 2
    }
  },
  bhola: {
    suspectId: "bhola",
    displayName: "Bhola Prasad (Cinema Chaiwala)",
    defaultVoice: "Vikrant",    // Male, Hindi-preferred warm/conversational
    envKey: "GNANI_VOICE_BHOLA",
    model: "timbre-v2.5",
    language: "hi-IN",
    baseSpeed: 0.90,            // Earthy, unhurried
    basePitch: 0.55,            // Browser fallback only
    gender: "male",
    personaDescription: "56-year-old tea vendor, earthy, gravelly warmth, colloquial Old Delhi cadence",
    audioConfig: {
      encoding: "linear_pcm",
      container: "wav",
      num_channels: 1,
      sample_rate: 48000,
      sample_width: 2
    }
  }
};

/**
 * Resolves the final custom voice payload for a suspect,
 * applying custom voice overrides from .env and stress-reactive prosody.
 */
export function getCustomVoiceConfig(suspectId, stressLevel = 30) {
  const profile = BASELINE_SUSPECT_VOICES[suspectId] || BASELINE_SUSPECT_VOICES.raju;
  const customVoiceId = getEnvVoice(profile.envKey);

  // Dynamic prosody based on interrogation stress (0% - 100%)
  // Speed adjusts within Gnani's allowed 0.85–1.15 range
  const stressFactor = Math.min(Math.max((stressLevel - 30) / 70, 0), 1);
  // Push speed toward 1.15 for stressed suspects (but clamp at API limits)
  const rawSpeed = profile.baseSpeed + stressFactor * 0.08;
  const adjustedSpeed = +Math.min(1.15, Math.max(0.85, rawSpeed)).toFixed(2);
  const adjustedPitch = +(profile.basePitch + stressFactor * 0.08).toFixed(2);

  return {
    suspectId: profile.suspectId,
    displayName: profile.displayName,
    // Use custom cloned voice ID if set in .env, otherwise fallback to curated Gnani voice
    voice: customVoiceId || profile.defaultVoice,
    isCustomCloned: Boolean(customVoiceId),
    model: profile.model,
    language: profile.language,
    speed: adjustedSpeed,
    pitch: adjustedPitch,  // Used by browser fallback only
    audioConfig: profile.audioConfig,
    personaDescription: profile.personaDescription
  };
}
