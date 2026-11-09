// src/data/clueDatabase.js
// ALIBI — Deterministic Clue Database
// Clues are unlocked by asking canonical questions and presenting evidence.
// Every clue has a unique ID, description, source, storyline association, and unlock conditions.

export const CLUE_DATABASE = {

  // ═══════════════════════════════════════════════════════
  // RAJU ANSARI CLUES (all storylines)
  // ═══════════════════════════════════════════════════════

  clue_raju_back_door_bribe: {
    id: "clue_raju_back_door_bribe",
    title: "Raju's Paid Silence",
    description: "Raju Ansari admits receiving five hundred rupees to leave the iron rear staff passage door unlatched before the screening. Someone orchestrated unauthorized access to the cinema building.",
    source: "raju_back_door",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["duplicate_key"],
    relatedSuspectIds: ["raju"],
    relatedFacts: ["fact_rear_access_enabled"]
  },

  clue_pivot_identity: {
    id: "clue_pivot_identity",
    title: "The Briber's Identity — Partial Description",
    description: "Raju caught a brief glimpse of the person who paid him: expensive perfume, heels clicking on mosaic tile, and an embroidered saree sleeve near the manager's side of the lobby. This partial description points toward one specific suspect.",
    source: "raju_who_paid",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: [],
    relatedSuspectIds: ["raju", "meera", "arvind", "nusrat"],
    relatedFacts: ["fact_briber_partial_description"],
    isPivotClue: true
  },

  clue_booth_bell_921: {
    id: "clue_booth_bell_921",
    title: "Projection Booth Bell — 9:21 PM",
    description: "Raju Ansari confirms hearing the brass spring bell on the projection booth door ring at exactly 9:21 PM — during the blackout, over the generator noise. The booth was accessed by an unknown person at 9:21 PM.",
    source: "raju_booth_bell",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["booth_bell"],
    relatedSuspectIds: ["raju"],
    relatedFacts: ["fact_booth_accessed_921"]
  },

  clue_raju_alibi_foyer: {
    id: "clue_raju_alibi_foyer",
    title: "Raju's Alibi — Concession Foyer",
    description: "Raju states he was in the concession foyer lighting hurricane lanterns with Bhola Prasad during the blackout. If corroborated, this establishes his innocence of the booth access.",
    source: "raju_blackout_location",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: [],
    relatedSuspectIds: ["raju", "bhola"],
    relatedFacts: ["fact_raju_foyer_alibi"]
  },

  clue_key_grease_match: {
    id: "clue_key_grease_match",
    title: "Duplicate Key Grease — Booth Latch Match",
    description: "The grease on the duplicate key found under the lobby blotter matches the specific latch lubricant of the projection booth door. This confirms the key was used to enter the booth via the rear corridor.",
    source: "raju_grease_key",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["duplicate_key"],
    relatedSuspectIds: ["raju"],
    relatedFacts: ["fact_key_grease_proof"]
  },

  clue_clamp_accessible: {
    id: "clue_clamp_accessible",
    title: "Reel Clamp Location — Accessible to Anyone in Booth",
    description: "Raju confirms the heavy reel clamp was kept on the take-up spindle shelf above the rewind table. Any person who entered the projection booth could have seized it in the darkness.",
    source: "raju_reel_clamp",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["reel_clamp"],
    relatedSuspectIds: ["raju"],
    relatedFacts: ["fact_clamp_accessible"]
  },

  // ═══════════════════════════════════════════════════════
  // MEERA KAPOOR CLUES (Storyline A)
  // ═══════════════════════════════════════════════════════

  clue_meera_sale_motive: {
    id: "clue_meera_sale_motive",
    title: "Meera's Sale Desperation",
    description: "Meera confirms the Rex Talkies property sale was critically necessary and financially urgent. The commercial transaction was the central driver of her actions on the night of the murder.",
    source: "meera_cinema_sale",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["sale_ledger", "inspection_cert"],
    relatedSuspectIds: ["meera"],
    relatedFacts: ["fact_meera_sale_urgent"]
  },

  clue_meera_ledger_contradiction: {
    id: "clue_meera_ledger_contradiction",
    title: "Meera Admits October Ledger Payments",
    description: "Meera admits to paying Harbans ₹18,500 on October 14th and ₹6,000 on October 16th to keep the unlisted archive prints undisclosed until the sale deed was signed. This directly contradicts her earlier statement that their financial arrangement had terminated weeks ago.",
    source: "meera_ledger",
    sourceType: "question",
    storylines: ["A"],
    relatedEvidenceIds: ["sale_ledger"],
    relatedSuspectIds: ["meera"],
    relatedFacts: ["fact_meera_paid_harbans_october"]
  },

  clue_meera_cert_alteration: {
    id: "clue_meera_cert_alteration",
    title: "Property Certificate — Concealed Inventory Requirement",
    description: "Meera confirms the property inspection certificate required a fully cleared inventory before the final transfer. The altered inspection date was intended to push the sale through before Harbans could expose the unlicensed prints.",
    source: "meera_inspection_cert",
    sourceType: "question",
    storylines: ["A"],
    relatedEvidenceIds: ["inspection_cert"],
    relatedSuspectIds: ["meera"],
    relatedFacts: ["fact_cert_concealed_inventory"]
  },

  clue_meera_alibi_shattered: {
    id: "clue_meera_alibi_shattered",
    title: "Meera's Office Alibi Challenged by Phone Footage",
    description: "When confronted with Nusrat's phone footage showing a figure with embroidered bangles in the staff corridor at 9:26 PM, Meera dismisses it as 'just a shadow' — an evasion that contradicts her claimed position in the manager's office.",
    source: "meera_corridor_alibi",
    sourceType: "question",
    storylines: ["A"],
    relatedEvidenceIds: ["nusrat_phone"],
    relatedSuspectIds: ["meera"],
    relatedFacts: ["fact_meera_alibi_shattered"]
  },

  clue_meera_staged_cut: {
    id: "clue_meera_staged_cut",
    title: "Film Cut at 9:24 PM — Five Minutes After Motor Stopped",
    description: "Meera's nervous reaction to the film cut timeline reveals she is aware that the 35mm film was manually sliced 5 minutes after the projector motor died — proving the 'equipment accident' was deliberately staged.",
    source: "meera_film_cut",
    sourceType: "question",
    storylines: ["A"],
    relatedEvidenceIds: ["film_strip", "maintenance_log"],
    relatedSuspectIds: ["meera"],
    relatedFacts: ["fact_film_cut_manual_staged"]
  },

  clue_meera_admits_struggle: {
    id: "clue_meera_admits_struggle",
    title: "Meera Admits to Physical Confrontation with Harbans",
    description: "Under pressure from physical evidence, Meera admits to a physical struggle with Harbans Lal in the projection booth — describing him grabbing a ledger sheet and her attempting to retrieve it. She claims the fatal fall was unintentional.",
    source: "meera_physical_struggle",
    sourceType: "question",
    storylines: ["A"],
    relatedEvidenceIds: ["reel_clamp"],
    relatedSuspectIds: ["meera"],
    relatedFacts: ["fact_meera_admits_struggle"]
  },

  // ═══════════════════════════════════════════════════════
  // DR. ARVIND SETHI CLUES (Storylines B/C)
  // ═══════════════════════════════════════════════════════

  clue_arvind_zohra_motive: {
    id: "clue_arvind_zohra_motive",
    title: "Dr. Sethi's Motive — Recovering Zohra Sen's Legacy",
    description: "Dr. Sethi reveals that the original archive print RT-17-Z contains the uncredited work of his late sister Zohra Sen. Harbans promised to publicly screen it tonight for the first time — a plan Sethi desperately wanted to control.",
    source: "arvind_zohra",
    sourceType: "question",
    storylines: ["B", "C"],
    relatedEvidenceIds: ["film_canister", "film_strip"],
    relatedSuspectIds: ["arvind"],
    relatedFacts: ["fact_arvind_zohra_motive"]
  },

  clue_arvind_label_replacement: {
    id: "clue_arvind_label_replacement",
    title: "Film Canister Label Was Deliberately Replaced",
    description: "Dr. Sethi confirms the film canister's original label (RT-17-Z / Z. SEN / ARCHIVE PRINT) was deliberately pasted over with a generic label to conceal the archive print's identity and subject it to commercial liquidation.",
    source: "arvind_film_canister",
    sourceType: "question",
    storylines: ["B"],
    relatedEvidenceIds: ["film_canister"],
    relatedSuspectIds: ["arvind"],
    relatedFacts: ["fact_canister_label_replaced"]
  },

  clue_arvind_splice_identified: {
    id: "clue_arvind_splice_identified",
    title: "Splice Pattern Identifies Print as RT-17-Z",
    description: "Dr. Sethi identifies the precise 12mm-19mm-12mm splice spacing as Zohra Sen's personal signature from the 1968 studio. This uniquely identifies the surviving print on the projector as catalogue RT-17-Z.",
    source: "arvind_splice_pattern",
    sourceType: "question",
    storylines: ["B", "C"],
    relatedEvidenceIds: ["film_strip"],
    relatedSuspectIds: ["arvind"],
    relatedFacts: ["fact_splice_identifies_rt17z"]
  },

  clue_arvind_manual_reel_access: {
    id: "clue_arvind_manual_reel_access",
    title: "Manual Reel Movement at 9:21 PM — Sethi's Knowledge",
    description: "Dr. Sethi reveals detailed knowledge of the manual take-up spindle operation at 9:21 PM after the motor stopped — suggesting he was physically present in or near the booth at the time of the spindle manipulation.",
    source: "arvind_manual_reel",
    sourceType: "question",
    storylines: ["B"],
    relatedEvidenceIds: ["maintenance_log"],
    relatedSuspectIds: ["arvind"],
    relatedFacts: ["fact_arvind_accessed_booth"]
  },

  clue_arvind_admits_confrontation: {
    id: "clue_arvind_admits_confrontation",
    title: "Dr. Sethi Admits Confronting Harbans in the Booth",
    description: "Dr. Sethi acknowledges he entered the projection booth during the blackout and physically confronted Harbans Lal over control of the archive reel. He states Harbans refused to release the print to him.",
    source: "arvind_seat_alibi",
    sourceType: "question",
    storylines: ["B"],
    relatedEvidenceIds: ["film_canister", "reel_clamp"],
    relatedSuspectIds: ["arvind"],
    relatedFacts: ["fact_arvind_admits_confrontation"]
  },

  // ═══════════════════════════════════════════════════════
  // NUSRAT ALI CLUES (Storylines C/B)
  // ═══════════════════════════════════════════════════════

  clue_nusrat_mother_motive: {
    id: "clue_nusrat_mother_motive",
    title: "Nusrat's Motive — Mother's Erased Film Contribution",
    description: "Nusrat reveals her mother worked uncredited in the Rex Talkies sound mixing rooms for three years. Harbans Lal held her mother's original handwritten sound cue notes in the projection booth — the target of Nusrat's unauthorized booth visit.",
    source: "nusrat_mother_research",
    sourceType: "question",
    storylines: ["C", "B"],
    relatedEvidenceIds: ["film_strip"],
    relatedSuspectIds: ["nusrat"],
    relatedFacts: ["fact_nusrat_mother_motive"]
  },

  clue_nusrat_admits_booth: {
    id: "clue_nusrat_admits_booth",
    title: "Nusrat Admits Being Inside Projection Booth During Blackout",
    description: "Nusrat admits that the 58-second gap in her phone recording (9:22:10–9:23:08 PM) corresponds to her being physically inside the projection booth, filming the splice note for her thesis research.",
    source: "nusrat_phone_gap",
    sourceType: "question",
    storylines: ["C", "B"],
    relatedEvidenceIds: ["nusrat_phone"],
    relatedSuspectIds: ["nusrat"],
    relatedFacts: ["fact_nusrat_in_booth_during_blackout"]
  },

  clue_nusrat_film_dust_proof: {
    id: "clue_nusrat_film_dust_proof",
    title: "Film Dust on Nusrat's Phone — Direct Reel Contact",
    description: "Nusrat confirms the microscopic film dust found inside her phone case came from leaning directly over the rewind table to photograph the splice joint. This proves direct physical proximity to the archive reel.",
    source: "nusrat_film_dust",
    sourceType: "question",
    storylines: ["C"],
    relatedEvidenceIds: ["nusrat_phone", "film_strip"],
    relatedSuspectIds: ["nusrat"],
    relatedFacts: ["fact_nusrat_reel_contact"]
  },

  clue_nusrat_pre_screening_visit: {
    id: "clue_nusrat_pre_screening_visit",
    title: "Nusrat's Pre-Screening Booth Visit — Authorized by Harbans",
    description: "Nusrat admits she was inside the projection booth before the screening, with Harbans' permission, to view the carbon arc lamp. This establishes her familiarity with the booth layout and reel position.",
    source: "nusrat_booth_access",
    sourceType: "question",
    storylines: ["C", "B"],
    relatedEvidenceIds: [],
    relatedSuspectIds: ["nusrat"],
    relatedFacts: ["fact_nusrat_pre_screening_visit"]
  },

  clue_nusrat_false_alibi: {
    id: "clue_nusrat_false_alibi",
    title: "Nusrat's Washroom Alibi Was Fabricated",
    description: "Nusrat admits her washroom/umbrella alibi was completely fabricated to avoid charges of trespassing in the projection area and potential academic consequences.",
    source: "nusrat_washroom_alibi",
    sourceType: "question",
    storylines: ["C", "B"],
    relatedEvidenceIds: [],
    relatedSuspectIds: ["nusrat"],
    relatedFacts: ["fact_nusrat_alibi_false"]
  },

  clue_nusrat_admits_incident: {
    id: "clue_nusrat_admits_incident",
    title: "Nusrat Admits to Fatal Shoving Incident",
    description: "Nusrat admits that Harbans grabbed her wrist in the dark, causing her to shove him in self-defense panic. He lost balance and his head struck the booth safety rail. She froze in shock and fled the scene, repositioning the reel clamp before leaving.",
    source: "nusrat_wrist_incident",
    sourceType: "question",
    storylines: ["C"],
    relatedEvidenceIds: ["reel_clamp", "nusrat_phone"],
    relatedSuspectIds: ["nusrat"],
    relatedFacts: ["fact_nusrat_admits_incident"]
  },

  // ═══════════════════════════════════════════════════════
  // BHOLA PRASAD CLUES (all storylines)
  // ═══════════════════════════════════════════════════════

  clue_bhola_full_trust: {
    id: "clue_bhola_full_trust",
    title: "Bhola's Complete Trust — Token #026 Established",
    description: "Presenting Bhola's personal paper token #026 unlocks his full confidence and willingness to share everything he witnessed on the night of October 17th. He now speaks freely and completely.",
    source: "bhola_token",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["bhola_token"],
    relatedSuspectIds: ["bhola"],
    relatedFacts: ["fact_bhola_trust_established"]
  },

  clue_bhola_bell_testimony: {
    id: "clue_bhola_bell_testimony",
    title: "Bhola Corroborates Booth Bell at 9:21 PM",
    description: "Bhola independently corroborates Raju's testimony: the brass spring bell on the projection booth door rang at exactly 9:21 PM, coinciding with a change in generator pitch. Someone opened the booth door at that precise moment.",
    source: "bhola_booth_bell",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["booth_bell"],
    relatedSuspectIds: ["bhola"],
    relatedFacts: ["fact_booth_accessed_921"]
  },

  clue_bhola_929_testimony: {
    id: "clue_bhola_929_testimony",
    title: "Bhola Hears Hurried Footsteps at 9:29 PM",
    description: "Bhola testifies to hearing hurried wet footsteps and a sharp clink of a tea glass being set down in the staff corridor at 9:29 PM — placing someone fleeing the scene at that exact time.",
    source: "bhola_footsteps",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["tea_glass"],
    relatedSuspectIds: ["bhola"],
    relatedFacts: ["fact_suspect_fled_929"]
  },

  clue_bhola_harbans_alive_910: {
    id: "clue_bhola_harbans_alive_910",
    title: "Harbans Alive at 9:10 PM — Tea Delivery Confirmed",
    description: "Bhola's 9:10 PM tea delivery confirms Harbans Lal was alive, calm, and actively working in the booth approximately 7 minutes before the blackout. The crime window is established between 9:21 PM and 9:29 PM.",
    source: "bhola_tea_delivery",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["tea_glass"],
    relatedSuspectIds: ["bhola"],
    relatedFacts: ["fact_harbans_alive_910", "fact_crime_window_921_929"]
  },

  clue_bhola_identifies_footsteps: {
    id: "clue_bhola_identifies_footsteps",
    title: "Bhola Describes Fleeing Suspect",
    description: "Bhola provides a detailed description of the sounds he heard from the person fleeing the booth at 9:29 PM. His description aligns with one specific suspect's movement pattern and typical sounds.",
    source: "bhola_footsteps_description",
    sourceType: "question",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["tea_glass"],
    relatedSuspectIds: ["bhola"],
    relatedFacts: ["fact_bhola_identifies_suspect"]
  },

  // ═══════════════════════════════════════════════════════
  // EVIDENCE CHALLENGE CLUES
  // ═══════════════════════════════════════════════════════

  clue_key_challenge_complete: {
    id: "clue_key_challenge_complete",
    title: "Duplicate Key — Rear Passage Access Confirmed",
    description: "Presenting the duplicate key to Raju Ansari while questioning him about the back door confirms the physical mechanism of the unauthorized booth access via the rear staff passage.",
    source: "challenge_duplicate_key_raju",
    sourceType: "evidence_challenge",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["duplicate_key"],
    relatedSuspectIds: ["raju"],
    relatedFacts: ["fact_rear_access_confirmed"]
  },

  clue_ledger_challenge_complete: {
    id: "clue_ledger_challenge_complete",
    title: "Ledger Page 47 — Meera's October Payments Proven",
    description: "Presenting the accounts ledger to Meera proves the October payments to Harbans, forcing her to acknowledge the financial coercion and the concealment of unlicensed prints.",
    source: "challenge_sale_ledger_meera",
    sourceType: "evidence_challenge",
    storylines: ["A"],
    relatedEvidenceIds: ["sale_ledger"],
    relatedSuspectIds: ["meera"],
    relatedFacts: ["fact_meera_coercion_proven"]
  },

  clue_phone_challenge_complete_meera: {
    id: "clue_phone_challenge_complete_meera",
    title: "Phone Footage — Meera Identified in Staff Corridor",
    description: "Presenting Nusrat's phone footage to Meera — showing the distinctive embroidered saree sleeve and bangles at 9:26 PM in the staff corridor — shatters her manager's office alibi.",
    source: "challenge_nusrat_phone_meera",
    sourceType: "evidence_challenge",
    storylines: ["A"],
    relatedEvidenceIds: ["nusrat_phone"],
    relatedSuspectIds: ["meera"],
    relatedFacts: ["fact_meera_alibi_disproven"]
  },

  clue_phone_challenge_complete_nusrat: {
    id: "clue_phone_challenge_complete_nusrat",
    title: "Phone Footage Gap — Nusrat's Booth Presence Confirmed",
    description: "Presenting Nusrat's own phone to her proves the 58-second gap aligns exactly with the booth confrontation window, forcing her to acknowledge being inside the booth during the murder timeframe.",
    source: "challenge_nusrat_phone_nusrat",
    sourceType: "evidence_challenge",
    storylines: ["C"],
    relatedEvidenceIds: ["nusrat_phone"],
    relatedSuspectIds: ["nusrat"],
    relatedFacts: ["fact_nusrat_booth_time_proven"]
  },

  clue_clamp_challenge_meera: {
    id: "clue_clamp_challenge_meera",
    title: "Reel Clamp — Textile Fibres Match Meera's Garment",
    description: "Presenting the reel clamp to Meera — with forensic evidence of textile fibres matching her garment caught in the hinge — directly connects her to the fatal struggle near the booth rail.",
    source: "challenge_reel_clamp_meera",
    sourceType: "evidence_challenge",
    storylines: ["A"],
    relatedEvidenceIds: ["reel_clamp"],
    relatedSuspectIds: ["meera"],
    relatedFacts: ["fact_meera_clamp_contact"]
  },

  clue_clamp_challenge_nusrat: {
    id: "clue_clamp_challenge_nusrat",
    title: "Reel Clamp — Position Proves Nusrat Repositioned It",
    description: "Presenting the reel clamp to Nusrat — showing its displaced position near the rail, inconsistent with normal storage — forces her to acknowledge she moved it during or after the incident.",
    source: "challenge_reel_clamp_nusrat",
    sourceType: "evidence_challenge",
    storylines: ["C"],
    relatedEvidenceIds: ["reel_clamp"],
    relatedSuspectIds: ["nusrat"],
    relatedFacts: ["fact_nusrat_moved_clamp"]
  },

  clue_canister_challenge_arvind: {
    id: "clue_canister_challenge_arvind",
    title: "Film Canister — Dr. Sethi Identifies RT-17-Z",
    description: "Presenting the film canister to Dr. Sethi — with the pasted-over label — proves his detailed knowledge of the label replacement and his motive to retrieve the reel before the sale.",
    source: "challenge_film_canister_arvind",
    sourceType: "evidence_challenge",
    storylines: ["B"],
    relatedEvidenceIds: ["film_canister"],
    relatedSuspectIds: ["arvind"],
    relatedFacts: ["fact_arvind_knew_label_replaced"]
  },

  clue_bhola_token_challenge: {
    id: "clue_bhola_token_challenge",
    title: "Bhola's Token — Full Witness Testimony Unlocked",
    description: "Presenting the paper token #026 to Bhola Prasad unlocks his complete eyewitness testimony about the sounds and movements he observed on the night of October 17th.",
    source: "challenge_bhola_token",
    sourceType: "evidence_challenge",
    storylines: ["A", "B", "C"],
    relatedEvidenceIds: ["bhola_token"],
    relatedSuspectIds: ["bhola"],
    relatedFacts: ["fact_bhola_trust_established"]
  }
};

/**
 * Returns a clue by ID or null if not found.
 */
export function getClue(clueId) {
  return CLUE_DATABASE[clueId] || null;
}

/**
 * Returns all clues for a storyline.
 */
export function getCluesForStoryline(storylineId) {
  return Object.values(CLUE_DATABASE).filter(
    (c) => c.storylines.includes(storylineId)
  );
}

/**
 * Returns all clue IDs that exist in the database.
 */
export function getAllClueIds() {
  return Object.keys(CLUE_DATABASE);
}

