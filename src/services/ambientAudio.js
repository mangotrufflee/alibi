// src/services/ambientAudio.js
// ALIBI — Atmospheric Noir Monsoon & 50Hz Diesel Generator Ambient Sound Generator
// Uses standard Web Audio API with zero external dependencies

class AmbientAudioManager {
  constructor() {
    this.audioCtx = null;
    this.isInitialized = false;
    this.isMuted = false;
    this.masterGain = null;
    this.droneGain = null;
    this.rainGain = null;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
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
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }
}

export const ambientAudio = new AmbientAudioManager();
