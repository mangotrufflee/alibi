// src/data/puzzlesData.js
// Canonical Interactive Puzzles for ALIBI (Puzzles 1–5)

export const PUZZLES = [
  {
    id: "puzzle_ticket_clock",
    title: "Puzzle 1: The Ticket Is a Clock",
    subtitle: "Reconstruct the sequence of events using punch marks and the maintenance log",
    description:
      "Ticket stub #RT-0847 bears three distinct hand-punched shapes (round, half-moon, and square). Match each punch shape to its corresponding timestamp to establish the chronological timeline of the blackout.",
    items: [
      { id: "round", label: "Round Punch", meaning: "8:45 PM — Final Screening Commences" },
      { id: "half_moon", label: "Half-Moon Punch", meaning: "9:17 PM — Main Power Failure & Generator Start" },
      { id: "square", label: "Square Punch", meaning: "9:21 PM — Projection Booth Door Opened" }
    ],
    correctOrder: ["round", "half_moon", "square"],
    rewardClue: "Timeline Reconstructed: Proves the projector halted before any manual tampering occurred."
  },

  {
    id: "puzzle_canister_lies",
    title: "Puzzle 2: The Canister That Lies",
    subtitle: "Identify the surviving print beneath the replacement label",
    description:
      "A generic archive label was pasted over the 35mm film canister. Align the underlying adhesive marks and compare the three-splice spacing (12mm, 19mm, 12mm) to identify the true catalogue code.",
    options: [
      { id: "RT-GEN-68", label: "RT-ARCHIVE / GENERAL STOCK / 1968 (Replacement Label)" },
      { id: "RT-17-Z", label: "RT-17-Z / Z. SEN / ARCHIVE PRINT (Original Catalogue)" },
      { id: "MUGHAL-6", label: "MUGHAL-E-AZAM REEL 6 (Generic Vault Stock)" }
    ],
    correctOption: "RT-17-Z",
    rewardClue: "Print Identified: Proves print RT-17-Z is the uncredited master reel preserving Zohra Sen's work."
  },

  {
    id: "puzzle_missing_minute",
    title: "Puzzle 3: The Missing Fifty-Eight Seconds",
    subtitle: "Reconstruct the recording gap by aligning audio frequency and generator hum",
    description:
      "Nusrat's phone video drops out between 9:22:10 PM and 9:23:08 PM. Adjust the generator frequency slider and align the audio waveform to restore the missing 58 seconds of recording.",
    targetFrequency: 50, // 50 Hz generator hum
    rewardClue: "Waveform Aligned: Restores ambient audio during the 58-second gap, capturing the fatal confrontation."
  },

  {
    id: "puzzle_reflection",
    title: "Puzzle 4: The Reflection",
    subtitle: "Rotate the tea glass and adjust the light angle to reveal the corridor silhouette",
    description:
      "The flared glass surface near the staff passage catches ambient lighting. Rotate the glass and toggle between tungsten lamp and street spill to expose the hidden reflection.",
    routeReflections: {
      A: "A distinct reflection reveals ornate metal bangles on a silk saree sleeve near the booth threshold.",
      B: "A distinct reflection reveals the outline of a tweed coat pocket and notebook edge.",
      C: "A distinct reflection reveals a camera strap and college tote bag near the spiral stairs."
    },
    rewardClue: "Reflection Discovered: Corroborates the physical presence of the suspect near the staff passage."
  },

  {
    id: "puzzle_booth_reconstruction",
    title: "Puzzle 5: The Booth Reconstruction",
    subtitle: "Place physical exhibits onto the projection booth blueprint",
    description:
      "Place the four key objects (Film Canister, Reel Clamp, Tea Glass, and Phone) in their verified physical positions on the projection booth schematic.",
    slots: [
      { id: "slot_spindle", name: "Take-Up Spindle", acceptedItem: "canister" },
      { id: "slot_rail", name: "Safety Rail Floor", acceptedItem: "clamp" },
      { id: "slot_corridor", name: "Staff Corridor Passage", acceptedItem: "glass" },
      { id: "slot_bench", name: "Rewind Inspection Bench", acceptedItem: "phone" }
    ],
    rewardClue: "Crime Scene Reconstructed: Confirms physical geometry of the struggle against the booth rail."
  }
];
