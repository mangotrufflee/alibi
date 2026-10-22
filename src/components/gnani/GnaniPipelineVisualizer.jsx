// src/components/gnani/GnaniPipelineVisualizer.jsx
import React, { useState } from "react";
import { useGame } from "../../state/GameContext";

export default function GnaniPipelineVisualizer() {
  const {
    pipelineState,
    currentLanguage,
    setCurrentLanguage,
    setGnaniApiKey,
    testGnaniConnection,
    suspectVoiceMap,
    gnaniPipeline
  } = useGame();

  const [inputKey, setInputKey] = useState(() => gnaniPipeline.getApiKey());
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [auditionText, setAuditionText] = useState("Inspector sahab, I am speaking to you inside Rex Talkies.");
  const [selectedAuditionVoice, setSelectedAuditionVoice] = useState("Pranav");

  const handleSaveKey = () => {
    setGnaniApiKey(inputKey);
    setTestResult({ success: true, message: inputKey ? "API Key saved to browser storage." : "Key cleared. Fallback mode activated." });
  };

  const handleTestKey = async () => {
    setIsTesting(true);
    setTestResult(null);
    const result = await testGnaniConnection(inputKey);
    setTestResult(result);
    setIsTesting(false);
  };

  const handleAudition = async () => {
    // Audition using Gnani TTS
    await gnaniPipeline.synthesizeSpeech(auditionText, selectedAuditionVoice.toLowerCase() === "nalini" ? "meera" : "raju");
  };

  return (
    <div className="gnani-pipeline-container">
      {/* HEADER BANNER */}
      <div className="pipeline-header">
        <div className="pipeline-title-group">
          <div className="pipeline-badge">GNANI.AI CORE PIPELINE</div>
          <h2 className="pipeline-title">Voice Interrogation Architecture</h2>
          <p className="pipeline-desc">
            End-to-end voice pipeline powered by Gnani.ai <strong>Prisma v2.5</strong> (Speech-to-Text) and <strong>Timbre v2.5</strong> (Text-to-Speech) with seamless Indic fallback.
          </p>
        </div>

        <div className="pipeline-status-card">
          <div className="status-indicator-row">
            <span className={`status-dot ${pipelineState.isFallbackActive ? "fallback" : "live"}`} />
            <span className="status-label">
              {pipelineState.isFallbackActive ? "Dual-Mode (Local Fallback Ready)" : "Gnani.ai Production Key Active"}
            </span>
          </div>
          <div className="endpoint-tag">Endpoint: https://api.vachana.ai</div>
        </div>
      </div>

      {/* PIPELINE ARCHITECTURE FLOW DIAGRAM */}
      <div className="pipeline-diagram">
        {/* NODE 1: AUDIO CAPTURE */}
        <div className={`pipeline-node ${pipelineState.stage === "RECORDING" ? "active-node" : ""}`}>
          <div className="node-icon">🎙️</div>
          <div className="node-title">1. Audio Capture</div>
          <div className="node-meta">PCM 16-bit 16kHz WAV</div>
          <div className="node-status">
            {pipelineState.stage === "RECORDING" ? "🔴 Recording Detective..." : "Ready"}
          </div>
        </div>

        <div className="pipeline-arrow">➔</div>

        {/* NODE 2: GNANI STT */}
        <div className={`pipeline-node ${pipelineState.stage === "STT_PROCESSING" ? "active-node" : ""}`}>
          <div className="node-icon">⚡</div>
          <div className="node-title">2. Gnani Prisma STT</div>
          <div className="node-meta">POST /stt/v3</div>
          <div className="node-status">
            {pipelineState.stage === "STT_PROCESSING"
              ? "⏳ Transcribing..."
              : pipelineState.lastLatency
              ? `${pipelineState.lastLatency}ms latency`
              : "Prisma v2.5"}
          </div>
        </div>

        <div className="pipeline-arrow">➔</div>

        {/* NODE 3: INTERROGATION ENGINE */}
        <div className={`pipeline-node ${pipelineState.stage === "REASONING" ? "active-node" : ""}`}>
          <div className="node-icon">🧠</div>
          <div className="node-title">3. Noir NLP Engine</div>
          <div className="node-meta">Alibi & Clue Resolver</div>
          <div className="node-status">Dynamic Suspect Mind</div>
        </div>

        <div className="pipeline-arrow">➔</div>

        {/* NODE 4: GNANI TTS */}
        <div className={`pipeline-node ${pipelineState.stage === "TTS_SYNTHESIZING" || pipelineState.stage === "PLAYING" ? "active-node" : ""}`}>
          <div className="node-icon">🔊</div>
          <div className="node-title">4. Gnani Timbre TTS</div>
          <div className="node-meta">POST /api/v1/tts/inference</div>
          <div className="node-status">
            {pipelineState.stage === "TTS_SYNTHESIZING"
              ? "⏳ Synthesizing..."
              : pipelineState.stage === "PLAYING"
              ? "🔊 Speaking Audio"
              : "Timbre v2.5"}
          </div>
        </div>
      </div>

      {/* CONFIGURATION & TEST PLAYGROUND */}
      <div className="pipeline-grid">
        {/* LEFT: API KEY & SETTINGS */}
        <div className="pipeline-card">
          <h3 className="card-heading">🔑 Gnani Authentication & Settings</h3>
          <p className="card-subtext">
            Enter your Gnani.ai <code>X-API-Key-ID</code>. When no key is entered or if the API is offline, the pipeline automatically runs in full interactive simulation mode so the game never crashes.
          </p>

          <div className="input-group">
            <label className="input-label">X-API-Key-ID</label>
            <div className="key-input-row">
              <input
                type="password"
                className="text-input"
                placeholder="Enter your Gnani.ai API Key..."
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
              />
              <button className="primary-btn" onClick={handleSaveKey}>
                Save Key
              </button>
              <button
                className="secondary-btn"
                onClick={handleTestKey}
                disabled={isTesting}
              >
                {isTesting ? "Testing..." : "Test Connection"}
              </button>
            </div>
          </div>

          {testResult && (
            <div className={`test-feedback ${testResult.success ? "success" : "warning"}`}>
              {testResult.success ? "✅ " : "⚠️ "} {testResult.message}
            </div>
          )}

          <div className="settings-two-col">
            <div className="input-group">
              <label className="input-label">Interrogation Language</label>
              <select
                className="select-input"
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
              >
                <option value="en-IN">en-IN (Indian English / Code-switched)</option>
                <option value="hi-IN">hi-IN (Hindi - Standard)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Gnani STT Model</label>
              <div className="model-badge">Prisma v2.5 (Telephony & Hinglish Optimized)</div>
            </div>
          </div>

          {/* VOICE AUDITION PLAYGROUND */}
          <div className="audition-box">
            <h4 className="audition-title">🎙️ Audition Gnani Suspect Voices</h4>
            <div className="audition-row">
              <select
                className="select-input"
                value={selectedAuditionVoice}
                onChange={(e) => setSelectedAuditionVoice(e.target.value)}
              >
                <option value="Pranav">Pranav (Raju Ansari & Bhola)</option>
                <option value="Nalini">Nalini (Meera Kapoor)</option>
                <option value="Yashvi">Yashvi (Nusrat Ali)</option>
              </select>

              <button className="action-btn" onClick={handleAudition}>
                ▶ Play Voice Sample
              </button>
            </div>
            <input
              type="text"
              className="text-input"
              value={auditionText}
              onChange={(e) => setAuditionText(e.target.value)}
              placeholder="Sample voice text..."
            />
          </div>
        </div>

        {/* RIGHT: LIVE EVENT LOG & PAYLOAD INSPECTOR */}
        <div className="pipeline-card">
          <div className="card-header-row">
            <h3 className="card-heading">📡 Live Gnani Event Inspector</h3>
            <span className="log-count">{pipelineState.logs.length} events</span>
          </div>

          <div className="log-console">
            {pipelineState.logs.length === 0 ? (
              <div className="empty-log">
                No pipeline events yet. Click the Push-to-Talk button in the Interrogation Room or test a voice above to see live events.
              </div>
            ) : (
              pipelineState.logs.map((log) => (
                <div key={log.id} className={`log-row log-${log.type.toLowerCase()}`}>
                  <span className="log-time">[{log.timestamp}]</span>
                  <span className="log-badge">{log.type}</span>
                  <span className="log-msg">{log.message}</span>
                </div>
              ))
            )}
          </div>

          {pipelineState.lastRequestPayload && (
            <div className="payload-preview">
              <div className="payload-title">Recent API Payload:</div>
              <pre className="payload-code">
                {JSON.stringify(pipelineState.lastRequestPayload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
