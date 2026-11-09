// src/data/evidenceChallenges.js
// ALIBI — Evidence Challenge Database
// Each challenge is triggered when the player presents physical evidence to a specific suspect.
// Challenges are validated before processing — cannot be re-triggered after completion.

export const EVIDENCE_CHALLENGES = {

  // ═══════════════════════════════════════════════════════
  // RAJU ANSARI CHALLENGES
  // ═══════════════════════════════════════════════════════

  challenge_duplicate_key_raju: {
    id: "challenge_duplicate_key_raju",
    evidenceId: "duplicate_key",
    suspectId: "raju",
    storylines: ["A", "B", "C"],
    title: "Duplicate Key — Present to Raju",
    prerequisiteQuestionIds: [],
    prerequisiteClueIds: [],
    response: "That is the spare iron key from under the lobby blotter! I never touched it! The person who paid me must have used it to access the rear corridor without me seeing. The grease on it matches the booth latch exactly — I recognize that smell from helping Masterji oil it last month!",
    stressDelta: 20,
    trustDelta: -5,
    unlocksClueId: "clue_key_challenge_complete"
  },

  // ═══════════════════════════════════════════════════════
  // MEERA KAPOOR CHALLENGES
  // ═══════════════════════════════════════════════════════

  challenge_sale_ledger_meera: {
    id: "challenge_sale_ledger_meera",
    evidenceId: "sale_ledger",
    suspectId: "meera",
    storylines: ["A"],
    title: "Sale Ledger — Present to Meera",
    prerequisiteQuestionIds: ["meera_cinema_sale"],
    prerequisiteClueIds: [],
    response: "You have page forty-seven. Very well. Those payments were entirely legitimate business arrangements. Harbans was an employee. Supplementary compensation for administrative cooperation is not unusual. I refuse to call that bribery!",
    stressDelta: 25,
    trustDelta: -15,
    unlocksClueId: "clue_ledger_challenge_complete"
  },

  challenge_inspection_cert_meera: {
    id: "challenge_inspection_cert_meera",
    evidenceId: "inspection_cert",
    suspectId: "meera",
    storylines: ["A"],
    title: "Inspection Certificate — Present to Meera",
    prerequisiteQuestionIds: ["meera_cinema_sale"],
    prerequisiteClueIds: ["clue_meera_sale_motive"],
    response: "That certificate number is official! The date was... revised administratively to reflect the final inspection timeline. This is a standard municipal procedure. The ink scraping you are pointing to is simply a correction notation!",
    stressDelta: 22,
    trustDelta: -12,
    unlocksClueId: null
  },

  challenge_nusrat_phone_meera: {
    id: "challenge_nusrat_phone_meera",
    evidenceId: "nusrat_phone",
    suspectId: "meera",
    storylines: ["A"],
    title: "Nusrat's Phone Footage — Present to Meera",
    prerequisiteQuestionIds: ["meera_corridor_alibi"],
    prerequisiteClueIds: ["clue_meera_alibi_shattered"],
    response: "That... is a distorted silhouette in a monsoon blackout corridor. You cannot determine anything from low-resolution footage recorded by a trespassing student on a consumer smartphone during a power failure!",
    stressDelta: 32,
    trustDelta: -20,
    unlocksClueId: "clue_phone_challenge_complete_meera"
  },

  challenge_film_strip_meera: {
    id: "challenge_film_strip_meera",
    evidenceId: "film_strip",
    suspectId: "meera",
    storylines: ["A"],
    title: "Film Strip — Present to Meera",
    prerequisiteQuestionIds: ["meera_film_cut"],
    prerequisiteClueIds: ["clue_meera_staged_cut"],
    response: "The film strip was cut by the projector drive mechanism malfunctioning under power surge conditions! That is a known equipment failure mode in vintage projectors during voltage spikes!",
    stressDelta: 28,
    trustDelta: -15,
    unlocksClueId: null
  },

  challenge_reel_clamp_meera: {
    id: "challenge_reel_clamp_meera",
    evidenceId: "reel_clamp",
    suspectId: "meera",
    storylines: ["A"],
    title: "Reel Clamp — Present to Meera",
    prerequisiteQuestionIds: ["meera_physical_struggle"],
    prerequisiteClueIds: ["clue_meera_admits_struggle"],
    response: "Those fibres could be from anyone who entered the booth! Rex Talkies has had dozens of visitors over the years! That textile evidence proves nothing without direct witness testimony placing me physically at the railing!",
    stressDelta: 35,
    trustDelta: -25,
    unlocksClueId: "clue_clamp_challenge_meera"
  },

  // ═══════════════════════════════════════════════════════
  // DR. ARVIND SETHI CHALLENGES
  // ═══════════════════════════════════════════════════════

  challenge_film_canister_arvind: {
    id: "challenge_film_canister_arvind",
    evidenceId: "film_canister",
    suspectId: "arvind",
    storylines: ["B"],
    title: "Film Canister — Present to Dr. Sethi",
    prerequisiteQuestionIds: ["arvind_zohra"],
    prerequisiteClueIds: [],
    response: "You found it. RT-17-Z — the original reel. Can you see the adhesive outline where they pasted over Zohra's name? Commercial liquidators would have melted this into raw acetate within a week of the sale. Harbans was the only one trying to protect it!",
    stressDelta: 20,
    trustDelta: 10,
    unlocksClueId: "clue_canister_challenge_arvind"
  },

  challenge_film_strip_arvind: {
    id: "challenge_film_strip_arvind",
    evidenceId: "film_strip",
    suspectId: "arvind",
    storylines: ["B", "C"],
    title: "Film Strip — Present to Dr. Sethi",
    prerequisiteQuestionIds: ["arvind_splice_pattern"],
    prerequisiteClueIds: ["clue_arvind_splice_identified"],
    response: "Yes. Twelve millimeters. Nineteen. Twelve. And the aged cement discoloration at the second join. This is unquestionably Zohra's hand. No commercial cutter worked this way in 1968. Only Zohra. This film has never been publicly screened with her name acknowledged.",
    stressDelta: 18,
    trustDelta: 15,
    unlocksClueId: null
  },

  challenge_maintenance_log_arvind: {
    id: "challenge_maintenance_log_arvind",
    evidenceId: "maintenance_log",
    suspectId: "arvind",
    storylines: ["B"],
    title: "Maintenance Log — Present to Dr. Sethi",
    prerequisiteQuestionIds: ["arvind_manual_reel"],
    prerequisiteClueIds: ["clue_arvind_manual_reel_access"],
    response: "9:21 PM. The motor stopped at 9:19. At 9:21 — when that log shows reel movement — I was... I was attempting to retrieve that canister from the take-up spindle before it was damaged. Harbans came through the door and saw me.",
    stressDelta: 30,
    trustDelta: -15,
    unlocksClueId: null
  },

  // ═══════════════════════════════════════════════════════
  // NUSRAT ALI CHALLENGES
  // ═══════════════════════════════════════════════════════

  challenge_nusrat_phone_nusrat: {
    id: "challenge_nusrat_phone_nusrat",
    evidenceId: "nusrat_phone",
    suspectId: "nusrat",
    storylines: ["C", "B"],
    title: "Nusrat's Phone — Present to Nusrat",
    prerequisiteQuestionIds: ["nusrat_mother_research"],
    prerequisiteClueIds: [],
    response: "Yes! That is my phone! And the fifty-eight second gap — I already told you, it cut out when the power surged! The buffer lagged and the file corrupted! That is not evidence of anything except cheap smartphone storage!",
    stressDelta: 25,
    trustDelta: -10,
    unlocksClueId: "clue_phone_challenge_complete_nusrat"
  },

  challenge_reel_clamp_nusrat: {
    id: "challenge_reel_clamp_nusrat",
    evidenceId: "reel_clamp",
    suspectId: "nusrat",
    storylines: ["C"],
    title: "Reel Clamp — Present to Nusrat",
    prerequisiteQuestionIds: ["nusrat_wrist_incident"],
    prerequisiteClueIds: ["clue_nusrat_admits_incident"],
    response: "I didn't use the clamp as a weapon! When I finally managed to run, I stumbled and knocked it off the shelf in the dark. I moved it aside instinctively as I was leaving — I was in complete shock! I didn't know it would matter!",
    stressDelta: 35,
    trustDelta: -20,
    unlocksClueId: "clue_clamp_challenge_nusrat"
  },

  // ═══════════════════════════════════════════════════════
  // BHOLA PRASAD CHALLENGES
  // ═══════════════════════════════════════════════════════

  challenge_bhola_token: {
    id: "challenge_bhola_token",
    evidenceId: "bhola_token",
    suspectId: "bhola",
    storylines: ["A", "B", "C"],
    title: "Paper Token #026 — Present to Bhola",
    prerequisiteQuestionIds: [],
    prerequisiteClueIds: [],
    response: "You found my token... Token twenty-six. Harbans placed it in my tea tin at 9:10 PM with his own two hands as a sign of his complete trust in me. If you have that token, it means Harbans wants me to speak. I will tell you everything I saw and heard that night, Babu ji — every detail.",
    stressDelta: 0,
    trustDelta: 40,
    unlocksClueId: "clue_bhola_token_challenge"
  }
};

/**
 * Returns a challenge by ID or null if not found.
 */
export function getChallenge(challengeId) {
  return EVIDENCE_CHALLENGES[challengeId] || null;
}

/**
 * Returns all challenges for a given evidence item and suspect combination.
 */
export function getChallengeForEvidenceAndSuspect(evidenceId, suspectId, storylineId) {
  return Object.values(EVIDENCE_CHALLENGES).find(
    (c) =>
      c.evidenceId === evidenceId &&
      c.suspectId === suspectId &&
      c.storylines.includes(storylineId)
  ) || null;
}

/**
 * Returns all challenges relevant to a suspect in a storyline.
 */
export function getChallengesForSuspect(suspectId, storylineId) {
  return Object.values(EVIDENCE_CHALLENGES).filter(
    (c) => c.suspectId === suspectId && c.storylines.includes(storylineId)
  );
}

