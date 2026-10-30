// src/data/evidence.js
// Canonical Evidence Items for ALIBI — Rex Talkies Monsoon Blackout Mystery

export const CANONICAL_EVIDENCE_ITEMS = [
  {
    id: "sale_ledger",
    name: "Rex Talkies Private Accounts Ledger",
    canonicalId: "EV-01",
    category: "Documents",
    location: "Manager's Office Safe Drawer",
    inScene: false,
    placeholderType: "ledger",
    discovered: true,
    description:
      "A clothbound accounting ledger titled 'Rex Talkies — Private Accounts'. Page 47 covers October 2026 for account 'H. Lal'.",
    routeClues: {
      A: "Ledger records payments to Harbans on 04 Oct (₹12,000), 10 Oct (₹8,000), 14 Oct (₹18,500), and 16 Oct (₹6,000). The 14 and 16 Oct payments directly contradict Meera's claim that their financial arrangement terminated weeks ago.",
      B: "Background financial ledger documenting cinema operations. Shows Harbans held strict control over print inventories before approving the property transfer.",
      C: "Background account ledger showing Harbans was managing cinema asset disclosures before the impending transfer."
    },
    inspectionDetails: [
      "Page 47 Header: Rex Talkies — Private Accounts, Period: October 2026, Account: H. Lal.",
      "Entries: 04 Oct (Advance ₹12,000), 10 Oct (Final settlement ₹8,000), 14 Oct (Additional payment, M.K. ₹18,500), 16 Oct (Property file processing ₹6,000).",
      "Handwritten margin note in Harbans' handwriting: 'H.L. insists the print inventory must be disclosed before the sale is signed.'"
    ],
    model: "/assets/models/evidence/sale-ledger.glb",
    image: "/assets/illustrations/evidence/sale-ledger.png"
  },
  {
    id: "inspection_cert",
    name: "Property Inspection Certificate OD-P/1847/26",
    canonicalId: "EV-02",
    category: "Documents",
    location: "Filing Cabinet, Mezzanine Office",
    inScene: false,
    placeholderType: "certificate",
    discovered: true,
    description:
      "Municipal property clearance certificate for proposed commercial redevelopment of Rex Talkies land.",
    routeClues: {
      A: "Inspection date reads 06 October 2026 with obvious ink scraping and alteration. Proves Meera was concealing pending inventory issues to push the sale through.",
      B: "Official municipal inspection certificate for the proposed site transfer. Shows transfer clearance was contingent on inventory confirmation.",
      C: "Documents the pending property sale and revised inventory requirements."
    },
    inspectionDetails: [
      "Certificate Number: OD-P/1847/26 • Property: Rex Talkies, Old Delhi.",
      "Inspection Date: 06 October 2026 (shows physical scraping and date alteration).",
      "Recorded Status: Cleared for proposed transfer • File Received: 17 October 2026.",
      "Margin Note: 'Revised inventory pending. Confirm before final transfer.'"
    ],
    model: "/assets/models/evidence/inspection-cert.glb",
    image: "/assets/illustrations/evidence/inspection-cert.png"
  },
  {
    id: "maintenance_log",
    name: "Projector Maintenance Log",
    canonicalId: "EV-03",
    category: "Documents",
    location: "Projection Booth Desk Under Desk Lamp",
    inScene: true,
    scenePosition: [-3.8, 0.75, -10.5],
    sceneRotation: [0, -0.3, 0],
    placeholderType: "ledger",
    discovered: true,
    description:
      "Grease-stained logbook documenting projector motor checks and mechanical operations for 17 October 2026. Water damage obscures parts of the page.",
    routeClues: {
      A: "Establishes projector motor stopped at 9:19 PM, while the film section was cut at 9:24 PM. Proves the film was cut manually after the projector had already halted, staging a false accident.",
      B: "Documents reel movement detected at 9:21 PM after the motor had stopped at 9:19 PM. Proves manual manipulation of the film take-up spindle during the blackout.",
      C: "Establishes the chronological timing of the blackout (9:17 PM) and projector shutdown (9:19 PM), anchoring the phone recording gap."
    },
    inspectionDetails: [
      "8:40 PM — Projector checked; running normally.",
      "9:17 PM — Main power failure; generator active.",
      "9:19 PM — Projector motor stopped.",
      "9:21 PM — Reel movement detected after motor stop.",
      "9:24 PM — Film section found cut; cause unconfirmed."
    ],
    model: "/assets/models/evidence/maintenance-log.glb",
    image: "/assets/illustrations/evidence/maintenance-log.png"
  },
  {
    id: "ticket_stub",
    name: "Screening Ticket Stub #RT-0847",
    canonicalId: "EV-04",
    category: "Physical Evidence",
    location: "Row B, Seat 12 Armrest",
    inScene: true,
    scenePosition: [-1.4, 0.65, -4.6],
    sceneRotation: [0, 0.4, 0],
    placeholderType: "ticket",
    discovered: true,
    description:
      "Cardboard cinema ticket stub for the final 8:45 PM screening, marked with three distinct hand-punched shapes.",
    routeClues: {
      A: "The three punch marks (round, half-moon, square) function as a chronological clock, reconstructing the order of arrival, power failure, and booth access.",
      B: "Punched shapes confirm seat occupancy timing and establish when patrons moved between auditorium stalls and the balcony stairs.",
      C: "Punch sequence corroborates student entry and balcony movement prior to the 9:17 PM blackout."
    },
    inspectionDetails: [
      "Venue: Rex Talkies • Date: 17 October 2026 • Screening Time: 8:45 PM.",
      "Ticket Number: RT-0847 • Seat: B-12.",
      "Three distinct punch shapes on margins: round, half-moon, and square."
    ],
    model: "/assets/models/evidence/ticket-stub.glb",
    image: "/assets/illustrations/evidence/ticket-stub.png"
  },
  {
    id: "duplicate_key",
    name: "Duplicate Back-Door Key",
    canonicalId: "EV-05",
    category: "Physical Evidence",
    location: "Beneath Lobby Desk Blotter",
    inScene: true,
    scenePosition: [-0.2, 0.05, -5.3],
    sceneRotation: [Math.PI / 2, 0, 0.8],
    placeholderType: "key",
    discovered: true,
    description:
      "Aged iron key with hand-filed teeth, coated in fresh dark industrial grease.",
    routeClues: {
      A: "Fresh grease on key matches the projection booth latch grease, proving someone used the rear staff passage to access the booth.",
      B: "Confirms unauthorised physical access to the projection gallery was possible via the rear stairs.",
      C: "Supports investigation into who unlatched the rear corridor threshold prior to the power cut."
    },
    inspectionDetails: [
      "Object ID: EV-05 • Material: Aged hand-cut iron.",
      "Condition: Worn barrel teeth and fresh dark industrial grease on the bit.",
      "Comparison Match: Grease composition identical to projection-booth latch lubricant."
    ],
    model: "/assets/models/evidence/duplicate-key.glb",
    image: "/assets/illustrations/evidence/duplicate-key.png"
  },
  {
    id: "film_canister",
    name: "35mm Archive Film Canister",
    canonicalId: "EV-06",
    category: "Physical Evidence",
    location: "Booth Archive Rack",
    inScene: false,
    placeholderType: "canister",
    discovered: true,
    description:
      "A 35mm galvanized iron film canister with adhesive sticker residue and a bent locking clasp.",
    routeClues: {
      A: "Contains unlicensed vintage prints that Meera was secretly hoarding and concealing from the commercial buyers.",
      B: "Original label reads 'RT-17-Z / Z. SEN / ARCHIVE PRINT'. A crude replacement label 'RT-ARCHIVE / GENERAL STOCK / 1968' was pasted over it to erase Zohra's identity.",
      C: "Canister holds the surviving reel tied to the uncredited historical footage Nusrat sought to document."
    },
    inspectionDetails: [
      "Replacement Label: RT-ARCHIVE / GENERAL STOCK / 1968.",
      "Underlying Original Label: RT-17-Z / Z. SEN / ARCHIVE PRINT.",
      "Condition: Heavy adhesive residue, bent clasp, and fresh scratch mark across the locking edge."
    ],
    model: "/assets/models/evidence/film-canister.glb",
    image: "/assets/illustrations/evidence/film-canister.png"
  },
  {
    id: "film_strip",
    name: "Three-Splice 35mm Celluloid Strip",
    canonicalId: "EV-07",
    category: "Technical Evidence",
    location: "Near Booth Floor Spindle",
    inScene: true,
    scenePosition: [0.6, 0.15, -11.0],
    sceneRotation: [0, 1.2, 0],
    placeholderType: "filmstrip",
    discovered: true,
    description:
      "A 35mm cellulose nitrate film strip featuring three distinct hand joins with measured millimeter spacing.",
    routeClues: {
      A: "The clean manual slice at the severed end proves someone used shears to cut the strip, rather than a motor tear.",
      B: "Join spacing of exactly 12 mm, 19 mm, and 12 mm with one uneven splice uniquely identifies this print as catalogue RT-17-Z tied to Zohra Sen.",
      C: "The splice pattern connects Nusrat's photo notes directly to the reel mounted on Harbans' projector."
    },
    inspectionDetails: [
      "Format: 35 mm safety/acetate base.",
      "Splice Spacing: Three joins measured at 12 mm, 19 mm, and 12 mm.",
      "One uneven splice showing aged cement discoloration, matching catalogue RT-17-Z."
    ],
    model: "/assets/models/evidence/film-strip.glb",
    image: "/assets/illustrations/evidence/film-strip.png"
  },
  {
    id: "nusrat_phone",
    name: "Nusrat's Phone (REX_1710_FINAL.mp4)",
    canonicalId: "EV-08",
    category: "Digital Evidence",
    location: "Left Balcony Aisle Stool",
    inScene: false,
    placeholderType: "phone",
    discovered: true,
    description:
      "Smartphone containing video file 'REX_1710_FINAL.mp4' (duration 04:12) recorded on 17 October 2026. Contains a conspicuous recording gap.",
    routeClues: {
      A: "Recovered frame at 9:26 PM captures a figure in the staff corridor wearing distinctive ornate metal bangles matching Meera Kapoor, shattering her alibi.",
      B: "Audio analysis of the recording before and after the gap reveals ambient booth dialogue referencing unreleased print details.",
      C: "Central piece of evidence: The missing 58 seconds (9:22:10–9:23:08 PM) corresponds to the blackout confrontation. Fine film dust inside the phone case connects Nusrat directly to the reel."
    },
    inspectionDetails: [
      "Filename: REX_1710_FINAL.mp4 • Recording Date: 17 October 2026 • Duration: 04:12.",
      "Visible Footage: 9:16–9:17 PM and 9:24–9:26 PM.",
      "Missing Gap Interval: 9:22:10 PM – 9:23:08 PM (exactly 58 missing seconds).",
      "Restored Frame: High-contrast reflection shows distinctive accessories/metal bangles in staff corridor at 9:26 PM.",
      "Forensic swab: Microscopic film dust detected inside and around phone casing."
    ],
    model: "/assets/models/evidence/phone.glb",
    image: "/assets/illustrations/evidence/phone.png"
  },
  {
    id: "tea_glass",
    name: "Tempered Tea Glass & Residue",
    canonicalId: "EV-09",
    category: "Physical Evidence",
    location: "Near Staff Corridor Landing",
    inScene: true,
    scenePosition: [2.8, 0.4, -3.2],
    sceneRotation: [0, 0, 0],
    placeholderType: "glass",
    discovered: true,
    description:
      "A cutting chai glass resting near the staff corridor. The curved surface catches light to reveal a distorted partial reflection.",
    routeClues: {
      A: "Rotating the glass under the corridor light reveals the distorted reflection of an embroidered saree sleeve and bangle near the booth threshold at 9:24 PM.",
      B: "Reflection reveals the outline of a tweed coat pocket and catalogue notebook edge, corroborating Sethi's corridor movement.",
      C: "Reflection catches the silhouette of a tote bag and phone strap, corroborating Nusrat's presence near the booth stairs."
    },
    inspectionDetails: [
      "Object ID: EV-09 • Location: Near staff corridor landing.",
      "Condition: Dried tea residue at base; no foreign chemical or poison detected.",
      "Interactive Property: Rotating the glass against directional light reveals a clear silhouette reflection on the outer curve."
    ],
    model: "/assets/models/evidence/tea-glass.glb",
    image: "/assets/illustrations/evidence/tea-glass.png"
  },
  {
    id: "reel_clamp",
    name: "Metal Reel Clamp",
    canonicalId: "EV-10",
    category: "Weapons / Trauma",
    location: "Projection Booth Floor Near Rail",
    inScene: false,
    placeholderType: "clamp",
    discovered: true,
    description:
      "A heavy steel reel clamp used to lock 35mm film reels on the take-up spindle. Found displaced near the railing.",
    routeClues: {
      A: "Displaced felt pad and synthetic textile fibres caught in the hinge match Meera's garment and the booth rail, confirming a violent struggle.",
      B: "Found knocked against the booth rail where Sethi shoved Harbans during their struggle over the print canister.",
      C: "Position near the rail confirms the physical struggle when Harbans grabbed Nusrat's wrist and she shoved him back in panic."
    },
    inspectionDetails: [
      "Object ID: EV-10 • Material: Heavy machined steel.",
      "Condition: Displaced felt cushioning pad and a fine textile fibre caught in the hinge.",
      "Forensic Comparison: Fibre matches the impact abrasion on the projection-booth safety rail."
    ],
    model: "/assets/models/evidence/reel-clamp.glb",
    image: "/assets/illustrations/evidence/reel-clamp.png"
  },
  {
    id: "bhola_token",
    name: "Bhola's Paper Token #026",
    canonicalId: "EV-11",
    category: "Physical Evidence",
    location: "Inside Bhola's Brass Tea Tin",
    inScene: false,
    placeholderType: "token",
    discovered: true,
    description:
      "A faded paper token stamped 'BHOLA TEA STALL' with a central crease and water stain.",
    routeClues: {
      A: "Earning Bhola's trust with this token unlocks his testimony regarding wet footsteps and a cup set down at 9:29 PM.",
      B: "Unlocks Bhola's testimony confirming Dr. Sethi's agitation and hurried movements near the stairs.",
      C: "Unlocks Bhola's testimony regarding Nusrat's pale, trembling state when returning to the hall."
    },
    inspectionDetails: [
      "Text: BHOLA TEA STALL • Token Number: 026 • Date Mark: PAID — 17/10.",
      "Condition: Blue ink faded by water stains, sharp horizontal crease down center.",
      "Significance: Personal token of trust from Bhola Prasad."
    ],
    model: "/assets/models/evidence/token.glb",
    image: "/assets/illustrations/evidence/token.png"
  },
  {
    id: "generator_gauge",
    name: "Auxiliary Generator Fuel Gauge",
    canonicalId: "ENV-01",
    category: "Technical Evidence",
    location: "Basement Generator Housing",
    inScene: false,
    placeholderType: "gauge",
    discovered: true,
    description:
      "The mechanical fuel gauge on the diesel generator, tracking fuel consumption and establishing the timeline of power operations.",
    routeClues: {
      A: "Gauge indicates generator started at 100% capacity at 9:17 PM and degraded to 68% at 9:32 PM, locking down the 15-minute crime window.",
      B: "Confirms timing of power activation and auditory hum changes during the projection interval.",
      C: "Auditory correlation: generator hum pitch shift ties directly to the missing 58-second audio waveform on Nusrat's phone."
    },
    inspectionDetails: [
      "Starting Reading: 100% at 9:17 PM (main grid failure).",
      "Current Level: 68% at 9:32 PM (time of body discovery).",
      "Significance: Pure timeline and access corroboration."
    ],
    model: "/assets/models/evidence/generator-gauge.glb",
    image: "/assets/illustrations/evidence/generator-gauge.png"
  },
  {
    id: "booth_bell",
    name: "Projection Booth Mechanical Bell",
    canonicalId: "ENV-02",
    category: "Technical Evidence",
    location: "Booth Entryway Threshold",
    inScene: false,
    placeholderType: "bell",
    discovered: true,
    description:
      "A brass overhead spring bell mounted above the booth door that rings whenever the heavy door threshold is breached.",
    routeClues: {
      A: "Metallic ring heard at exactly 9:21 PM marks when the culprit breached the booth threshold, starting the fatal confrontation.",
      B: "The 9:21 PM chime establishes the precise moment Sethi entered the booth to demand the Zohra print.",
      C: "The 9:21 PM chime confirms the moment Nusrat slipped into the booth with her phone camera."
    },
    inspectionDetails: [
      "Mechanism: Counterweighted brass spring bell.",
      "Auditory Log: Metallic ring sounded through hall at 9:21 PM.",
      "Significance: Proves booth threshold breach at 9:21 PM."
    ],
    model: "/assets/models/evidence/bell.glb",
    image: "/assets/illustrations/evidence/bell.png"
  }
];

export const initialEvidenceItems = CANONICAL_EVIDENCE_ITEMS;

/**
 * Returns evidence items dynamically adapted for the active storyline.
 */
export function getEvidenceForStoryline(storylineId = "A") {
  const route = storylineId || "A";
  return CANONICAL_EVIDENCE_ITEMS.map((item) => ({
    ...item,
    clue: (item.routeClues && item.routeClues[route]) || item.routeClues?.A || ""
  }));
}
