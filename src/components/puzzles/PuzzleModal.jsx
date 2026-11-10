// src/components/puzzles/PuzzleModal.jsx
import React, { useState } from "react";
import { useGame } from "../../state/GameContext";
import { UiIcon } from "../ui/UiIcon";

// ── Puzzle 1: The Ticket Is a Clock ─────────────────────────────────────────
function TicketClockPuzzle({ puzzle, onSolve, isSolved }) {
  const [sequence, setSequence] = useState([]);
  const [error, setError] = useState(false);

  const handleSelectShape = (shapeId) => {
    if (sequence.includes(shapeId)) {
      setSequence(sequence.filter((id) => id !== shapeId));
    } else {
      const next = [...sequence, shapeId];
      setSequence(next);
      if (next.length === puzzle.correctOrder.length) {
        if (JSON.stringify(next) === JSON.stringify(puzzle.correctOrder)) {
          onSolve(puzzle.id);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
            setSequence([]);
          }, 1200);
        }
      }
    }
  };

  return (
    <div className="puzzle-interactive-body">
      <p className="puzzle-instruction">
        Click the punch marks in their chronological order according to the maintenance log:
      </p>

      <div className="ticket-clock-grid">
        {puzzle.items.map((item) => {
          const isSelected = sequence.includes(item.id);
          const orderIdx = sequence.indexOf(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className={`punch-option-card ${isSelected ? "selected" : ""} ${error ? "shake-error" : ""}`}
              onClick={() => handleSelectShape(item.id)}
              disabled={isSolved}
            >
              <div className="punch-icon-badge">
                {item.id === "round" && "●"}
                {item.id === "half_moon" && <UiIcon name="time" />}
                {item.id === "square" && "■"}
                {isSelected && <span className="order-bubble">{orderIdx + 1}</span>}
              </div>
              <strong className="punch-label">{item.label}</strong>
              <span className="punch-meaning">{item.meaning}</span>
            </button>
          );
        })}
      </div>
      {error && <div className="puzzle-error-toast">Incorrect chronological sequence. Try again!</div>}
    </div>
  );
}

// ── Puzzle 2: The Canister That Lies ────────────────────────────────────────
function CanisterLabelPuzzle({ puzzle, onSolve, isSolved }) {
  const [peeled, setPeeled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(false);

  const handleVerify = () => {
    if (selectedOption === puzzle.correctOption) {
      onSolve(puzzle.id);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1200);
    }
  };

  return (
    <div className="puzzle-interactive-body">
      <div className="canister-interactive-stage">
        <div className={`canister-label-disc ${peeled ? "is-peeled" : ""}`}>
          <div className="label-front">
            <span>RT-ARCHIVE / GENERAL STOCK / 1968</span>
            <button
              type="button"
              className="peel-label-btn"
              onClick={() => setPeeled(!peeled)}
            >
              {peeled ? "Reset Label Sticker" : <><UiIcon name="evidence" /> Peel Off Replacement Sticker</>}
            </button>
          </div>
          {peeled && (
            <div className="label-underneath">
              <strong>STAMP: RT-17-Z / Z. SEN / ARCHIVE PRINT</strong>
              <small>Splice pattern verified: 12 mm — 19 mm — 12 mm</small>
            </div>
          )}
        </div>
      </div>

      <div className="puzzle-options-list">
        <label className="options-title">Select the true unedited catalogue identity:</label>
        {puzzle.options.map((opt) => (
          <label key={opt.id} className="puzzle-radio-option">
            <input
              type="radio"
              name="canister_code"
              value={opt.id}
              checked={selectedOption === opt.id}
              onChange={(e) => setSelectedOption(e.target.value)}
              disabled={isSolved}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {!isSolved && (
        <button
          type="button"
          className="puzzle-submit-btn"
          disabled={!selectedOption}
          onClick={handleVerify}
        >
          Confirm Archival Identification <UiIcon name="arrow" />
        </button>
      )}
      {error && <div className="puzzle-error-toast">Incorrect catalogue matching. Examine the label!</div>}
    </div>
  );
}

// ── Puzzle 3: The Missing Fifty-Eight Seconds ───────────────────────────────
function MissingMinutePuzzle({ puzzle, onSolve, isSolved }) {
  const [freq, setFreq] = useState(42);

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setFreq(val);
    if (Math.abs(val - puzzle.targetFrequency) <= 2) {
      onSolve(puzzle.id);
    }
  };

  const isTuned = Math.abs(freq - puzzle.targetFrequency) <= 2;

  return (
    <div className="puzzle-interactive-body">
      <div className="waveform-display-screen">
        <div className="waveform-timer-bar">
          <span>09:22:10 PM</span>
          <span className="gap-indicator">[58 SECONDS RESTORED]</span>
          <span>09:23:08 PM</span>
        </div>
        <div className="waveform-visual">
          {[...Array(24)].map((_, i) => {
            const h = isTuned ? 20 + Math.sin(i * 0.8) * 16 : 4 + (i % 3) * 2;
            return (
              <span
                key={i}
                className={`wave-col ${isTuned ? "tuned" : "static"}`}
                style={{ height: `${h}px` }}
              />
            );
          })}
        </div>
        <div className="audio-status-readout">
          {isTuned ? <><UiIcon name="success" /> AUDIO HARMONIZED: Generator 50Hz hum matches booth background</> : <><UiIcon name="zap" /> STATIC NOISE: Drag frequency dial to 50 Hz</>}
        </div>
      </div>

      <div className="frequency-dial-control">
        <label>Auxiliary Generator Frequency Pitch: <strong>{freq} Hz</strong> (Target: 50 Hz)</label>
        <input
          type="range"
          min="30"
          max="70"
          value={freq}
          onChange={handleSliderChange}
          disabled={isSolved}
          className="freq-slider"
        />
      </div>
    </div>
  );
}

// ── Puzzle 4: The Reflection ────────────────────────────────────────────────
function GlassReflectionPuzzle({ puzzle, onSolve }) {
  const activeStoryline = useGame((s) => s.activeStoryline);
  const [angle, setAngle] = useState(0);
  const [lightSource, setLightSource] = useState("tungsten");

  const isAligned = angle >= 60 && angle <= 90 && lightSource === "tungsten";

  const handleAngleChange = (e) => {
    const val = Number(e.target.value);
    setAngle(val);
    if (val >= 60 && val <= 90 && lightSource === "tungsten") {
      onSolve(puzzle.id);
    }
  };

  const handleLightChange = (light) => {
    setLightSource(light);
    if (angle >= 60 && angle <= 90 && light === "tungsten") {
      onSolve(puzzle.id);
    }
  };

  return (
    <div className="puzzle-interactive-body">
      <div className="glass-reflection-viewport">
        <div className="reflection-glass-cylinder" style={{ transform: `rotateY(${angle}deg)` }}>
          <div className="glass-surface">
            {isAligned ? (
              <div className="revealed-silhouette-card">
                <span className="silhouette-icon"><UiIcon name="user" /></span>
                <p className="silhouette-text">
                  {puzzle.routeReflections[activeStoryline] || puzzle.routeReflections.A}
                </p>
              </div>
            ) : (
              <div className="glass-diffuse-reflection">
                <span>Distorted amber reflection... Adjust angle (60°–90°) under tungsten light.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="reflection-controls-cluster">
        <div className="control-row">
          <label>Light Source Filter:</label>
          <div className="btn-group">
            <button
              type="button"
              className={`toolbar-btn ${lightSource === "tungsten" ? "active" : ""}`}
              onClick={() => handleLightChange("tungsten")}
            >
              <UiIcon name="lightbulb" /> Tungsten Booth Lamp
            </button>
            <button
              type="button"
              className={`toolbar-btn ${lightSource === "ambient" ? "active" : ""}`}
              onClick={() => handleLightChange("ambient")}
            >
              <UiIcon name="waves" /> Monsoon Street Light
            </button>
          </div>
        </div>

        <div className="control-row">
          <label>Glass Rotation Angle: <strong>{angle}°</strong></label>
          <input
            type="range"
            min="0"
            max="180"
            value={angle}
            onChange={handleAngleChange}
            className="angle-slider"
          />
        </div>
      </div>
    </div>
  );
}

// ── Puzzle 5: The Booth Reconstruction ──────────────────────────────────────
function BoothReconstructionPuzzle({ puzzle, onSolve, isSolved }) {
  const [placements, setPlacements] = useState({});

  const handleDrop = (slotId, itemId) => {
    const next = { ...placements, [slotId]: itemId };
    setPlacements(next);

    // Check if all slots are correctly filled
    const allCorrect = puzzle.slots.every((s) => next[s.id] === s.acceptedItem);
    if (allCorrect) {
      onSolve(puzzle.id);
    }
  };

  const availableItems = [
    { id: "canister", label: "Film Canister" },
    { id: "clamp", label: "Metal Reel Clamp" },
    { id: "glass", label: "Tea Glass" },
    { id: "phone", label: "Nusrat's Phone" }
  ];

  return (
    <div className="puzzle-interactive-body">
      <p className="puzzle-instruction">
        Assign each physical exhibit to its discovered location on the projection booth blueprint:
      </p>

      <div className="booth-blueprint-grid">
        {puzzle.slots.map((slot) => {
          const placedItem = placements[slot.id];
          const isCorrect = placedItem === slot.acceptedItem;

          return (
            <div key={slot.id} className={`blueprint-slot-box ${isCorrect ? "slot-correct" : ""}`}>
              <span className="slot-name"><UiIcon name="location" /> {slot.name}</span>
              <select
                className="slot-dropdown"
                value={placedItem || ""}
                onChange={(e) => handleDrop(slot.id, e.target.value)}
                disabled={isSolved}
              >
                <option value="">-- Place Object Here --</option>
                {availableItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Master Puzzle Modal Wrapper ─────────────────────────────────────────────
export default function PuzzleModal() {
  const activePuzzle = useGame((s) => s.activePuzzle);
  const closePuzzle = useGame((s) => s.closePuzzle);
  const solvePuzzle = useGame((s) => s.solvePuzzle);
  const solvedPuzzleIds = useGame((s) => s.solvedPuzzleIds);

  if (!activePuzzle) return null;

  const isSolved = solvedPuzzleIds.includes(activePuzzle.id);

  return (
    <div className="evidence-overlay-backdrop puzzle-modal-backdrop">
      <div className="puzzle-dialog-card">
        <div className="puzzle-dialog-header">
          <div className="puzzle-badge-pill">FORENSIC LAB (OPTIONAL)</div>
          <button className="puzzle-close-btn" onClick={closePuzzle} title="Close Puzzle">
            <UiIcon name="close" />
          </button>
        </div>
        <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.5rem" }}>
          * Optional analysis lab. Key clues can be unlocked directly via cross-examination and evidence challenges.
        </div>

        <h2 className="puzzle-title">{activePuzzle.title}</h2>
        <span className="puzzle-subtitle">{activePuzzle.subtitle}</span>
        <p className="puzzle-desc">{activePuzzle.description}</p>

        {activePuzzle.id === "puzzle_ticket_clock" && (
          <TicketClockPuzzle puzzle={activePuzzle} onSolve={solvePuzzle} isSolved={isSolved} />
        )}
        {activePuzzle.id === "puzzle_canister_lies" && (
          <CanisterLabelPuzzle puzzle={activePuzzle} onSolve={solvePuzzle} isSolved={isSolved} />
        )}
        {activePuzzle.id === "puzzle_missing_minute" && (
          <MissingMinutePuzzle puzzle={activePuzzle} onSolve={solvePuzzle} isSolved={isSolved} />
        )}
        {activePuzzle.id === "puzzle_reflection" && (
          <GlassReflectionPuzzle puzzle={activePuzzle} onSolve={solvePuzzle} isSolved={isSolved} />
        )}
        {activePuzzle.id === "puzzle_booth_reconstruction" && (
          <BoothReconstructionPuzzle puzzle={activePuzzle} onSolve={solvePuzzle} isSolved={isSolved} />
        )}

        {isSolved && (
          <div className="puzzle-solved-banner">
            <UiIcon name="success" /> PUZZLE SOLVED: {activePuzzle.rewardClue}
          </div>
        )}
      </div>
    </div>
  );
}
