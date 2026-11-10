// src/services/ambientAudio.js
// ALIBI — Atmospheric Noir Monsoon & 50Hz Diesel Generator Ambient Sound Generator

const GAME_AUDIO = {
  click: "/assets/audio/click.mp3",
  hover: "/assets/audio/hover.mp3",
  typing: "/assets/audio/typing.mp3",
  intro: "/assets/audio/intro.mp3",
  suspense: "/assets/audio/suspense.mp3",
  flicker: "/assets/audio/flicker.mp3"
};

class AmbientAudioManager {
  constructor() {
    this.audioCtx = null;
    this.isInitialized = false;
    this.isMuted = false;
    this.masterGain = null;
    this.droneGain = null;
    this.rainGain = null;
    this.suspenseTrack = null;
    this.typingTrack = null;
    this.lastHoverAt = 0;
    this.lastTypingAt = 0;
    this.pools = {};
    this.poolIndices = {};
    this.soundBuffers = {};
  }

  async preloadSoundBuffers() {
    if (!this.audioCtx || typeof fetch === "undefined") return;
    const sfx = ["hover", "click", "typing", "flicker"];
    for (const name of sfx) {
      if (this.soundBuffers[name] || !GAME_AUDIO[name]) continue;
      try {
        const res = await fetch(GAME_AUDIO[name]);
        if (!res.ok) continue;
        const arrayBuf = await res.arrayBuffer();
        this.audioCtx.decodeAudioData(
          arrayBuf,
          (decoded) => {
            this.soundBuffers[name] = decoded;
          },
          () => {}
        );
      } catch {
        // Fallback to HTML5 audio pool
      }
    }
  }

  getAudioFromPool(name) {
    if (typeof Audio === "undefined" || !GAME_AUDIO[name]) return null;
    if (!this.pools[name]) {
      const poolSize = (name === "hover" || name === "typing" || name === "click") ? 4 : 2;
      this.pools[name] = Array.from({ length: poolSize }, () => {
        const a = new Audio(GAME_AUDIO[name]);
        a.preload = "auto";
        return a;
      });
      this.poolIndices[name] = 0;
    }
    const pool = this.pools[name];
    const index = this.poolIndices[name];
    this.poolIndices[name] = (index + 1) % pool.length;
    return pool[index];
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContextClass = typeof window !== "undefined" ? (window.AudioContext || window.webkitAudioContext) : null;
      if (!AudioContextClass) return;
      this.audioCtx = new AudioContextClass();

      // Master output gain
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);

      // 1. Diesel Generator 50Hz & 100Hz Sub-Harmonic Hum
      const droneOsc1 = this.audioCtx.createOscillator();
      const droneOsc2 = this.audioCtx.createOscillator();
      droneOsc1.type = "sine";
      droneOsc1.frequency.setValueAtTime(50, this.audioCtx.currentTime);
      droneOsc2.type = "triangle";
      droneOsc2.frequency.setValueAtTime(100, this.audioCtx.currentTime);

      const droneFilter = this.audioCtx.createBiquadFilter();
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(140, this.audioCtx.currentTime);

      this.droneGain = this.audioCtx.createGain();
      this.droneGain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      droneOsc1.start();
      droneOsc2.start();

      // 2. Monsoon Rain White-Noise Filter
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const rainFilter = this.audioCtx.createBiquadFilter();
      rainFilter.type = "lowpass";
      rainFilter.frequency.setValueAtTime(450, this.audioCtx.currentTime);

      this.rainGain = this.audioCtx.createGain();
      this.rainGain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);

      whiteNoise.connect(rainFilter);
      rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);

      whiteNoise.start();

      this.isInitialized = true;
      this.preloadSoundBuffers();
    } catch {
      // AudioContext may be restricted until user interaction
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!this.isInitialized) {
      if (!muted) this.init();
      return;
    }
    if (this.audioCtx && this.masterGain) {
      if (this.audioCtx.state === "suspended" && !muted) {
        this.audioCtx.resume();
      }
      const targetGain = muted ? 0 : 0.25;
      this.masterGain.gain.setTargetAtTime(targetGain, this.audioCtx.currentTime, 0.08);
    }
    if (this.suspenseTrack) {
      this.suspenseTrack.muted = muted;
      if (muted) this.suspenseTrack.pause();
      else this.suspenseTrack.play().catch(() => {});
    }
    if (muted && this.typingTrack) this.typingTrack.pause();
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  playOneShot(name, volume = 0.2) {
    if (this.isMuted) return;
    const clampedVol = Math.max(0, Math.min(1, volume));

    // Instant Web Audio API playback if decoded buffer is available
    if (this.audioCtx && this.soundBuffers[name] && this.audioCtx.state === "running") {
      try {
        const source = this.audioCtx.createBufferSource();
        source.buffer = this.soundBuffers[name];
        const gain = this.audioCtx.createGain();
        gain.gain.setValueAtTime(clampedVol, this.audioCtx.currentTime);
        source.connect(gain);
        gain.connect(this.masterGain || this.audioCtx.destination);
        source.start(0);
        return;
      } catch {
        // Fall back to pooled audio element
      }
    }

    // High-performance HTML5 Audio pool fallback
    try {
      const sound = this.getAudioFromPool(name);
      if (!sound) return;
      sound.volume = clampedVol;
      sound.currentTime = 0;
      sound.play().catch(() => {});
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playIntro() {
    this.playOneShot("intro", 0.35);
  }

  playClick() {
    this.playOneShot("click", 0.18);
  }

  playHover() {
    const now = Date.now();
    if (now - this.lastHoverAt < 80) return;
    this.lastHoverAt = now;
    this.playOneShot("hover", 0.16);
  }

  playTyping() {
    if (this.isMuted || typeof Audio === "undefined") return;
    if (!this.typingTrack) {
      this.typingTrack = new Audio(GAME_AUDIO.typing);
      this.typingTrack.loop = true;
      this.typingTrack.volume = 0.1;
      this.typingTrack.preload = "auto";
    }
    this.typingTrack.play().catch(() => {});
  }

  stopTyping() {
    if (!this.typingTrack) return;
    this.typingTrack.pause();
    this.typingTrack.currentTime = 0;
  }

  playFlicker() {
    this.playOneShot("flicker", 0.28);
  }

  unlock() {
    this.init();
    if (this.audioCtx?.state === "suspended") this.audioCtx.resume().catch(() => {});
    this.playIntro();
  }

  startGameAudio() {
    this.init();
    if (this.audioCtx?.state === "suspended") this.audioCtx.resume().catch(() => {});
    if (this.isMuted || typeof Audio === "undefined") return;

    if (!this.suspenseTrack) {
      this.suspenseTrack = new Audio(GAME_AUDIO.suspense);
      this.suspenseTrack.loop = true;
      this.suspenseTrack.volume = 0.16;
      this.suspenseTrack.preload = "auto";
    }
    this.suspenseTrack.play().catch(() => {});
  }

  stopGameAudio() {
    this.stopTyping();
    if (!this.suspenseTrack) return;
    this.suspenseTrack.pause();
    this.suspenseTrack.currentTime = 0;
  }

}

export const ambientAudio = new AmbientAudioManager();

