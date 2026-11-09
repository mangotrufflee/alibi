// src/data/accusationRequirements.js
// ALIBI — Proof Requirements for Final Accusation
// The player must discover specific clues and facts before making an accusation.
// accusationEligible is set only when ALL requirements are satisfied.

export const ACCUSATION_REQUIREMENTS = {
  A: {
    storylineId: "A",
    killerSuspectId: "meera",
    killerName: "Meera Kapoor",
    requiredClueIds: [
      "clue_raju_back_door_bribe",    // Someone paid for rear access
      "clue_meera_sale_motive",        // Meera desperately needed sale
      "clue_meera_ledger_contradiction", // Paid Harbans to stay quiet
      "clue_meera_alibi_shattered",    // Not in office as claimed
      "clue_meera_admits_struggle",    // Admits physical confrontation
      "clue_bhola_bell_testimony",     // Booth entered at 9:21 PM
      "clue_bhola_929_testimony"       // Fleeing suspect at 9:29 PM
    ],
    requiredEvidenceIds: [
      "sale_ledger",
      "duplicate_key",
      "nusrat_phone",
      "reel_clamp"
    ],
    summary: "Meera Kapoor paid Raju to leave the rear passage open, confronted Harbans in the projection booth at 9:21 PM over the ledger page, struck him with the reel clamp during a physical struggle causing a fatal fall, then manually cut the film at 9:24 PM to stage a projector malfunction.",
    wrongAccusationResponses: {
      raju: "Raju had the means but no motive. He admits leaving the door open for pay, but Bhola's testimony and the foyer lanterns confirm his alibi. He is a material witness, not the killer.",
      arvind: "Dr. Sethi had motive — his sister's reel — but the textile fibres on the clamp match Meera's embroidered saree, not tweed. The 9:26 PM corridor footage shows a woman, not an elderly professor.",
      nusrat: "Nusrat was inside the booth earlier, but left before 9:21 PM. The phone footage at 9:26 PM shows her in the balcony aisle area, not the staff corridor. The clamp fibres do not match her clothing.",
      bhola: "Bhola has a perfect alibi confirmed by multiple witnesses in the concession area. He had no motive. Harbans was his closest friend."
    }
  },

  B: {
    storylineId: "B",
    killerSuspectId: "arvind",
    killerName: "Dr. Arvind Sethi",
    requiredClueIds: [
      "clue_raju_back_door_bribe",      // Rear access was enabled
      "clue_arvind_zohra_motive",        // Sethi's desperate motive
      "clue_arvind_label_replacement",   // Knew label was switched
      "clue_arvind_manual_reel_access",  // Detailed knowledge of 9:21 reel movement
      "clue_arvind_admits_confrontation", // Admits entering booth
      "clue_bhola_bell_testimony",       // Booth accessed at 9:21 PM
      "clue_bhola_929_testimony"         // Fleeing at 9:29 PM
    ],
    requiredEvidenceIds: [
      "film_canister",
      "film_strip",
      "maintenance_log",
      "reel_clamp"
    ],
    summary: "Dr. Arvind Sethi entered the booth at 9:21 PM to retrieve the RT-17-Z reel before the sale could liquidate it. When Harbans refused to release it, their confrontation became physical. Sethi shoved Harbans, causing a fatal cranium impact against the safety rail. He then removed and replaced the reel label to conceal the print's identity.",
    wrongAccusationResponses: {
      raju: "Raju had no motive related to the archive reel. His alibi in the foyer is corroborated by Bhola. He is a material witness, not the killer.",
      meera: "Meera had motive for the sale, but the boot entries in this case point to canister knowledge only Dr. Sethi possessed. The tea glass reflection shows a silhouette consistent with his tweed jacket and notebook.",
      nusrat: "Nusrat was motivated by her mother's legacy, but the reel clamp fibres and the particular knowledge of the reel spindle operation at 9:21 PM connect to Dr. Sethi's decades of archival expertise.",
      bhola: "Bhola has no motive and a confirmed alibi. He was Harbans' closest friend."
    }
  },

  C: {
    storylineId: "C",
    killerSuspectId: "nusrat",
    killerName: "Nusrat Ali",
    requiredClueIds: [
      "clue_nusrat_mother_motive",      // Why she was in the booth
      "clue_nusrat_admits_booth",        // Admits being inside during blackout
      "clue_nusrat_film_dust_proof",     // Physical contact with reel proven
      "clue_nusrat_false_alibi",         // Washroom alibi fabricated
      "clue_nusrat_admits_incident",     // Admits to the fatal shoving
      "clue_bhola_bell_testimony",       // Booth entry confirmed at 9:21 PM
      "clue_bhola_929_testimony"         // Flight at 9:29 PM confirmed
    ],
    requiredEvidenceIds: [
      "nusrat_phone",
      "reel_clamp",
      "film_strip"
    ],
    summary: "Nusrat Ali entered the projection booth at 9:21 PM to photograph her mother's handwritten sound cue notes. Harbans discovered her and seized her wrist. In self-defense panic, she shoved him away and he fell fatally against the booth rail. She froze, repositioned the reel clamp, then deleted the 58-second phone footage gap and fabricated a washroom alibi.",
    wrongAccusationResponses: {
      raju: "Raju was in the foyer lighting lanterns. His alibi is independently confirmed by Bhola. He had no motive connected to the archive prints or the reel.",
      meera: "Meera had urgent motive for the sale, but the phone gap timeline directly places a young woman inside the booth — not Meera. The corridor footage at 9:26 PM shows Nusrat's silhouette with the canvas tote bag.",
      arvind: "Dr. Sethi had motive for the reel, but the film dust inside the phone case proves only someone who leaned over the rewind table — not someone who merely moved the canister from the shelf.",
      bhola: "Bhola has no motive and a confirmed alibi. He was Harbans' closest friend."
    }
  }
};

/**
 * Returns the requirements object for a given storyline.
 */
export function getAccusationRequirements(storylineId) {
  return ACCUSATION_REQUIREMENTS[storylineId] || null;
}

/**
 * Checks if the player has met all requirements to make an accusation.
 * Returns { eligible: boolean, missingClues: string[], missingEvidence: string[] }
 */
export function checkAccusationEligibility(storylineId, discoveredClueIds, presentedEvidenceIds) {
  const req = ACCUSATION_REQUIREMENTS[storylineId];
  if (!req) return { eligible: false, missingClues: [], missingEvidence: [] };

  const missingClues = req.requiredClueIds.filter((id) => !discoveredClueIds.includes(id));
  const missingEvidence = req.requiredEvidenceIds.filter((id) => !presentedEvidenceIds.includes(id));

  return {
    eligible: missingClues.length === 0 && missingEvidence.length === 0,
    missingClues,
    missingEvidence
  };
}

