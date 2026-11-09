// src/data/questionDatabase.js
// ALIBI — Deterministic Question Database
// Every suspect question has a unique ID, predefined answer, stress/trust delta, and unlock conditions.
// The same question ID ALWAYS returns the same canonical answer.
// Different phrasings map to the same question ID via the classifier.

export const QUESTION_DATABASE = {

  // ═══════════════════════════════════════════════════════
  // RAJU ANSARI — Ticket Boy
  // ═══════════════════════════════════════════════════════

  raju_back_door: {
    id: "raju_back_door",
    suspectId: "raju",
    storylines: ["A", "B", "C"],
    category: "access",
    phrasings: [
      "back door", "back passage", "rear door", "staff passage", "rear corridor",
      "unlatched", "unlatch", "left open", "iron door", "rear entrance",
      "duplicate key", "who paid", "five hundred", "500 rupees", "rupees",
      "who gave you money", "who paid you", "paid you to", "left the door"
    ],
    answer: "Someone gave me five hundred rupees to leave the iron staff passage door unlatched before the screening. They said it was only for a sound equipment delivery. I swear on my mother, I didn't know what they were planning!",
    stressDelta: 20,
    trustDelta: -5,
    prerequisites: [],
    unlocksClueId: "clue_raju_back_door_bribe",
    evidenceChallengeId: "challenge_duplicate_key_raju"
  },

  raju_who_paid: {
    id: "raju_who_paid",
    suspectId: "raju",
    storylines: ["A", "B", "C"],
    category: "pivot",
    phrasings: [
      "who was it", "who gave you", "who paid you", "whose money", "which person",
      "who approached you", "who contacted you", "who asked you", "name the person",
      "tell me who", "who sent you", "who told you", "who was it that paid",
      "which suspect", "identify them"
    ],
    answer: "It was... I cannot say for certain. It was dark and they slipped the envelope under the counter. But I smelled expensive perfume and heard heels clicking on the mosaic floor. And once, I caught a glimpse of an embroidered saree sleeve near the manager's side of the lobby.",
    stressDelta: 25,
    trustDelta: -10,
    prerequisites: ["raju_back_door"],
    unlocksClueId: "clue_pivot_identity",
    evidenceChallengeId: null,
    isPivotQuestion: true
  },

  raju_booth_bell: {
    id: "raju_booth_bell",
    suspectId: "raju",
    storylines: ["A", "B", "C"],
    category: "timeline",
    phrasings: [
      "booth bell", "bell ring", "bell rang", "9:21", "brass bell", "spring bell",
      "door chime", "door bell", "ring at 9", "bell at 9", "did you hear",
      "booth door", "projection booth door", "bell sound", "ghanti"
    ],
    answer: "Yes! At 9:21 PM, right over the generator drone, that brass spring bell on Masterji's booth door rang out sharp and clear. Someone pushed that heavy door open during the blackout!",
    stressDelta: 15,
    trustDelta: 5,
    prerequisites: [],
    unlocksClueId: "clue_booth_bell_921",
    evidenceChallengeId: null
  },

  raju_blackout_location: {
    id: "raju_blackout_location",
    suspectId: "raju",
    storylines: ["A", "B", "C"],
    category: "alibi",
    phrasings: [
      "where were you", "your location", "9:17", "9:32", "blackout", "power cut",
      "lights went out", "lights failed", "dark", "lantern", "hurricane lantern",
      "concession", "foyer", "lobby", "alibi", "what were you doing", "during the blackout"
    ],
    answer: "When the lights died at 9:17 PM, the whole hall gasped in shock. I ran to the concession foyer immediately to light the hurricane lanterns. Bhola bhai was right there at his chai stove! You can confirm with him!",
    stressDelta: 10,
    trustDelta: 10,
    prerequisites: [],
    unlocksClueId: "clue_raju_alibi_foyer",
    evidenceChallengeId: null
  },

  raju_grease_key: {
    id: "raju_grease_key",
    suspectId: "raju",
    storylines: ["A", "B", "C"],
    category: "evidence",
    phrasings: [
      "grease on key", "grease", "latch grease", "oily key", "key stain",
      "dark grease", "booth latch", "latch lubricant", "grease match",
      "key analysis", "forensic key", "key evidence"
    ],
    answer: "The grease on that key matches the heavy booth latch lubricant exactly. Whoever took it from under the lobby blotter used it to get through the rear corridor completely unnoticed during the screening!",
    stressDelta: 16,
    trustDelta: 0,
    prerequisites: ["raju_back_door"],
    unlocksClueId: "clue_key_grease_match",
    evidenceChallengeId: "challenge_duplicate_key_raju"
  },

  raju_reel_clamp: {
    id: "raju_reel_clamp",
    suspectId: "raju",
    storylines: ["A", "B", "C"],
    category: "evidence",
    phrasings: [
      "reel clamp", "clamp", "heavy clamp", "spindle shelf", "take-up spindle",
      "weapon", "murder weapon", "booth weapon", "steel clamp", "reel lock"
    ],
    answer: "The heavy reel clamp stays on the take-up spindle shelf above the rewind table! That is a standard projection booth position. Anyone who entered the booth during the blackout could have grabbed it in the dark!",
    stressDelta: 22,
    trustDelta: -5,
    prerequisites: ["raju_booth_bell"],
    unlocksClueId: "clue_clamp_accessible",
    evidenceChallengeId: null
  },

  // ═══════════════════════════════════════════════════════
  // MEERA KAPOOR — Cinema Owner
  // ═══════════════════════════════════════════════════════

  meera_cinema_sale: {
    id: "meera_cinema_sale",
    suspectId: "meera",
    storylines: ["A", "B", "C"],
    category: "motive",
    phrasings: [
      "cinema sale", "property sale", "sale of rex", "selling rex", "real estate",
      "redevelopment", "deed", "transfer", "buyers", "developer", "commercial sale",
      "property transfer", "sale proceed", "property deal"
    ],
    answer: "Single-screen cinema in Old Delhi has been financially bankrupt for a decade, Inspector. The property sale is completely legal, properly filed with the municipal authorities, and absolutely necessary for the survival of this family.",
    stressDelta: 10,
    trustDelta: -5,
    prerequisites: [],
    unlocksClueId: "clue_meera_sale_motive",
    evidenceChallengeId: null
  },

  meera_ledger: {
    id: "meera_ledger",
    suspectId: "meera",
    storylines: ["A"],
    category: "contradiction",
    phrasings: [
      "ledger", "page 47", "accounts", "payment", "october", "h lal", "harbans payment",
      "18500", "18,500", "6000", "6,000", "advance payment", "private accounts",
      "money to harbans", "paid harbans"
    ],
    answer: "Harbans threatened to bring the inventory matter before the municipal board! Yes, I paid him — eighteen thousand five hundred on the fourteenth and six thousand on the sixteenth — only to keep the unlisted prints confidential until the sale deed was executed!",
    stressDelta: 28,
    trustDelta: -15,
    prerequisites: ["meera_cinema_sale"],
    unlocksClueId: "clue_meera_ledger_contradiction",
    evidenceChallengeId: "challenge_sale_ledger_meera"
  },

  meera_inspection_cert: {
    id: "meera_inspection_cert",
    suspectId: "meera",
    storylines: ["A"],
    category: "contradiction",
    phrasings: [
      "inspection certificate", "inspection cert", "property certificate", "municipal certificate",
      "od-p", "1847", "alteration", "date changed", "altered certificate", "backdated",
      "inventory", "inventory disclosure", "print inventory"
    ],
    answer: "The property inspection certificate required a fully cleared inventory before the final transfer could be signed. If Harbans had revealed those unlicensed archive prints to the buyers, the entire commercial transaction would have collapsed completely!",
    stressDelta: 22,
    trustDelta: -10,
    prerequisites: ["meera_cinema_sale"],
    unlocksClueId: "clue_meera_cert_alteration",
    evidenceChallengeId: "challenge_inspection_cert_meera"
  },

  meera_corridor_alibi: {
    id: "meera_corridor_alibi",
    suspectId: "meera",
    storylines: ["A"],
    category: "alibi",
    phrasings: [
      "corridor", "phone video", "bangles", "footage", "nusrat video", "9:26",
      "corridor footage", "alibi", "manager office", "office alibi", "where were you",
      "9:15", "phone call", "solicitor", "legal phone call"
    ],
    answer: "That phone video captures only a shadow in a corridor! Rex Talkies is full of shadows during a monsoon blackout. A silhouette with bangles proves absolutely nothing about my whereabouts!",
    stressDelta: 30,
    trustDelta: -20,
    prerequisites: ["meera_cinema_sale"],
    unlocksClueId: "clue_meera_alibi_shattered",
    evidenceChallengeId: "challenge_nusrat_phone_meera"
  },

  meera_film_cut: {
    id: "meera_film_cut",
    suspectId: "meera",
    storylines: ["A"],
    category: "contradiction",
    phrasings: [
      "film cut", "9:24", "manual cut", "sliced film", "cut the film", "staged accident",
      "projector malfunction", "fake malfunction", "film shears", "film section cut"
    ],
    answer: "The maintenance log says the projector motor stopped at 9:19 PM. If the film was manually sliced at 9:24 PM — that is five minutes after the motor stopped — that is... that would be a matter for mechanical technicians to explain, not homicide investigators!",
    stressDelta: 32,
    trustDelta: -15,
    prerequisites: ["meera_corridor_alibi"],
    unlocksClueId: "clue_meera_staged_cut",
    evidenceChallengeId: "challenge_film_strip_meera"
  },

  meera_physical_struggle: {
    id: "meera_physical_struggle",
    suspectId: "meera",
    storylines: ["A"],
    category: "confession",
    phrasings: [
      "struggle", "clamp", "rail", "struck", "harbans fall", "physical altercation",
      "fight", "booth fight", "confronted harbans", "argument in booth",
      "reel clamp evidence", "textile fibre"
    ],
    answer: "He grabbed the ledger sheet from my hands! He was going to burn it in front of the buyers! It was an argument — a desperate argument! No one intended for him to stumble and fall against that rail!",
    stressDelta: 40,
    trustDelta: -25,
    prerequisites: ["meera_film_cut", "meera_ledger"],
    unlocksClueId: "clue_meera_admits_struggle",
    evidenceChallengeId: "challenge_reel_clamp_meera"
  },

  // ═══════════════════════════════════════════════════════
  // DR. ARVIND SETHI — Retired Professor
  // ═══════════════════════════════════════════════════════

  arvind_zohra: {
    id: "arvind_zohra",
    suspectId: "arvind",
    storylines: ["B", "C"],
    category: "motive",
    phrasings: [
      "zohra", "zohra sen", "sister", "late sister", "credit", "uncredited",
      "acknowledgement", "erased", "forgotten", "zohra's work", "sister's film",
      "family legacy"
    ],
    answer: "Zohra Sen gave her youth, her vision, and her creative health to that 1968 production! The studio producers erased her name from the final print entirely. Harbans Lal found the original reel — catalogue RT-17-Z — and promised her name would be publicly screened tonight for the first time!",
    stressDelta: 25,
    trustDelta: 5,
    prerequisites: [],
    unlocksClueId: "clue_arvind_zohra_motive",
    evidenceChallengeId: null
  },

  arvind_film_canister: {
    id: "arvind_film_canister",
    suspectId: "arvind",
    storylines: ["B"],
    category: "evidence",
    phrasings: [
      "canister", "film canister", "replacement label", "rt-archive", "general stock",
      "rt-17-z", "label replaced", "label pasted", "original label", "archive sticker",
      "canister label"
    ],
    answer: "The replacement label reading 'RT-ARCHIVE / GENERAL STOCK / 1968' was pasted deliberately over the true original catalogue code. Someone wanted that specific reel to disappear silently into the commercial liquidation sale!",
    stressDelta: 22,
    trustDelta: -5,
    prerequisites: ["arvind_zohra"],
    unlocksClueId: "clue_arvind_label_replacement",
    evidenceChallengeId: "challenge_film_canister_arvind"
  },

  arvind_splice_pattern: {
    id: "arvind_splice_pattern",
    suspectId: "arvind",
    storylines: ["B", "C"],
    category: "evidence",
    phrasings: [
      "splice", "three splices", "12mm", "19mm", "film strip", "joins",
      "tape joins", "splice spacing", "film joins", "three tape joins",
      "splice pattern", "join signature"
    ],
    answer: "Three tape joins with exactly twelve and nineteen and twelve millimeter spacing! That was my sister Zohra's personal splicing signature from the vintage studio cutting room in 1968. I would recognise those joins anywhere in the world!",
    stressDelta: 20,
    trustDelta: 10,
    prerequisites: ["arvind_zohra"],
    unlocksClueId: "clue_arvind_splice_identified",
    evidenceChallengeId: "challenge_film_strip_arvind"
  },

  arvind_manual_reel: {
    id: "arvind_manual_reel",
    suspectId: "arvind",
    storylines: ["B"],
    category: "timeline",
    phrasings: [
      "reel movement", "9:21", "motor", "spindle", "manual reel", "maintenance log",
      "reel movement at 9:21", "spindle turned", "manual spindle", "log entry",
      "projector log"
    ],
    answer: "At 9:21 PM the projector motor was completely dead, yet the take-up spindle was physically turned by human hands. I knew that irreplaceable reel could not be allowed to fall into commercial liquidation. It would be melted for scrap!",
    stressDelta: 26,
    trustDelta: -10,
    prerequisites: ["arvind_film_canister"],
    unlocksClueId: "clue_arvind_manual_reel_access",
    evidenceChallengeId: "challenge_maintenance_log_arvind"
  },

  arvind_seat_alibi: {
    id: "arvind_seat_alibi",
    suspectId: "arvind",
    storylines: ["B", "C"],
    category: "alibi",
    phrasings: [
      "seat", "g14", "seat g14", "alibi", "did you leave", "stayed seated",
      "row 7", "dark booth", "did not leave", "remained seated", "where were you seated"
    ],
    answer: "I wanted to protect that reel from destruction, Inspector! When the power failed in the blackout, I could not bear to watch Zohra's only surviving legacy be dismantled. But Harbans refused to release it to me.",
    stressDelta: 32,
    trustDelta: -20,
    prerequisites: ["arvind_manual_reel"],
    unlocksClueId: "clue_arvind_admits_confrontation",
    evidenceChallengeId: null
  },

  // ═══════════════════════════════════════════════════════
  // NUSRAT ALI — Film Student
  // ═══════════════════════════════════════════════════════

  nusrat_phone_gap: {
    id: "nusrat_phone_gap",
    suspectId: "nusrat",
    storylines: ["C", "B"],
    category: "contradiction",
    phrasings: [
      "gap", "58 seconds", "58-second", "recording gap", "rex_1710", "video",
      "missing footage", "deleted footage", "trimmed", "phone recording",
      "9:22", "9:23", "recording stop", "video gap", "missing recording"
    ],
    answer: "Fine! Look at the timestamp carefully! Fifty-eight seconds are missing from 9:22:10 to 9:23:08 PM — because I was inside the projection booth! I was filming the splice note for my research and I completely panicked when the lights failed!",
    stressDelta: 30,
    trustDelta: -15,
    prerequisites: [],
    unlocksClueId: "clue_nusrat_admits_booth",
    evidenceChallengeId: "challenge_nusrat_phone_nusrat"
  },

  nusrat_film_dust: {
    id: "nusrat_film_dust",
    suspectId: "nusrat",
    storylines: ["C"],
    category: "evidence",
    phrasings: [
      "film dust", "dust on phone", "phone case dust", "particles", "casing",
      "forensic swab", "dust inside", "phone case", "microscopic film"
    ],
    answer: "The film dust on my phone case — I leaned directly over the rewind table to take macro photographs of the splice joint for my thesis documentation! I never touched the reel clamp to harm anyone. I had no intention of hurting Masterji!",
    stressDelta: 24,
    trustDelta: -10,
    prerequisites: ["nusrat_phone_gap"],
    unlocksClueId: "clue_nusrat_film_dust_proof",
    evidenceChallengeId: "challenge_nusrat_phone_nusrat"
  },

  nusrat_mother_research: {
    id: "nusrat_mother_research",
    suspectId: "nusrat",
    storylines: ["C", "B"],
    category: "motive",
    phrasings: [
      "mother", "credit", "cue notes", "archive", "thesis", "proof", "photograph reel",
      "university research", "mother's work", "uncredited work", "mother contribution",
      "sound mixing", "erased contribution"
    ],
    answer: "My mother worked uncredited in the sound mixing rooms of Rex Talkies for three full years without a single screen credit! Harbans Lal had her original handwritten sound cue notes locked in that projection booth. I had to document them before the cinema was demolished!",
    stressDelta: 20,
    trustDelta: 5,
    prerequisites: [],
    unlocksClueId: "clue_nusrat_mother_motive",
    evidenceChallengeId: null
  },

  nusrat_booth_access: {
    id: "nusrat_booth_access",
    suspectId: "nusrat",
    storylines: ["C", "B"],
    category: "alibi",
    phrasings: [
      "booth access", "inside booth", "glance", "carbon arc lamp", "carbon arc",
      "arc lamp", "rewind table", "projection booth", "earlier tonight", "before the show",
      "booth visit", "harbans let you in"
    ],
    answer: "Harbans let me glance briefly at the vintage carbon arc lamp before the screening started. He was proud of the antique machinery. He showed me around the projection equipment. I did not touch anything on the rewind table during that visit!",
    stressDelta: 18,
    trustDelta: 5,
    prerequisites: [],
    unlocksClueId: "clue_nusrat_pre_screening_visit",
    evidenceChallengeId: null
  },

  nusrat_washroom_alibi: {
    id: "nusrat_washroom_alibi",
    suspectId: "nusrat",
    storylines: ["C", "B"],
    category: "alibi",
    phrasings: [
      "washroom", "restroom", "umbrella", "wet umbrella", "bathroom", "ladies washroom",
      "lavatory", "broken umbrella", "drying clothes", "where were you during blackout"
    ],
    answer: "I made up the broken umbrella excuse entirely because I was terrified of being expelled from university and charged with criminal trespassing in the projection area!",
    stressDelta: 18,
    trustDelta: -10,
    prerequisites: ["nusrat_phone_gap"],
    unlocksClueId: "clue_nusrat_false_alibi",
    evidenceChallengeId: null
  },

  nusrat_wrist_incident: {
    id: "nusrat_wrist_incident",
    suspectId: "nusrat",
    storylines: ["C"],
    category: "confession",
    phrasings: [
      "wrist", "grabbed wrist", "shoved", "pushed", "accident", "harbans fell",
      "fell against rail", "rail fall", "panicked", "froze", "ran away",
      "clamp moved", "clamp repositioned", "confrontation with harbans"
    ],
    answer: "He grabbed my wrist in the complete darkness! I was absolutely terrified! I jerked backward and shoved him away as hard as I could — he lost his balance completely and his head struck the railing! It was a terrible accident! I froze in shock and then I just ran!",
    stressDelta: 40,
    trustDelta: -30,
    prerequisites: ["nusrat_film_dust", "nusrat_washroom_alibi"],
    unlocksClueId: "clue_nusrat_admits_incident",
    evidenceChallengeId: "challenge_reel_clamp_nusrat"
  },

  // ═══════════════════════════════════════════════════════
  // BHOLA PRASAD — Cinema Chaiwala
  // ═══════════════════════════════════════════════════════

  bhola_token: {
    id: "bhola_token",
    suspectId: "bhola",
    storylines: ["A", "B", "C"],
    category: "trust",
    phrasings: [
      "token", "026", "paper token", "tea tin", "token number", "paid token",
      "bhola's token", "token twenty six", "brass tea tin", "token found"
    ],
    answer: "You found my token... Token twenty-six. Harbans placed it personally inside my tea tin at 9:10 PM with his own hands as his way of saying he trusted me completely. That token means you are sincerely seeking the honest truth, Babu ji. Ask me anything.",
    stressDelta: 5,
    trustDelta: 30,
    prerequisites: [],
    unlocksClueId: "clue_bhola_full_trust",
    evidenceChallengeId: "challenge_bhola_token"
  },

  bhola_booth_bell: {
    id: "bhola_booth_bell",
    suspectId: "bhola",
    storylines: ["A", "B", "C"],
    category: "timeline",
    phrasings: [
      "bell", "9:21", "booth bell", "spring bell", "bell chime", "booth door sound",
      "did you hear bell", "what did you hear", "bell rang at"
    ],
    answer: "At exactly 9:21 PM — right at the precise moment when the generator pitch changed to a higher note — the brass spring bell on the projection booth door chimed out clear as temple brass. Someone opened that heavy door from the outside during the blackout!",
    stressDelta: 10,
    trustDelta: 10,
    prerequisites: [],
    unlocksClueId: "clue_bhola_bell_testimony",
    evidenceChallengeId: null
  },

  bhola_footsteps: {
    id: "bhola_footsteps",
    suspectId: "bhola",
    storylines: ["A", "B", "C"],
    category: "timeline",
    phrasings: [
      "footsteps", "9:29", "steps", "corridor footsteps", "clink", "glass clink",
      "hurried steps", "wet footsteps", "passage sounds", "what did you hear after"
    ],
    answer: "At 9:29 PM, I heard hurried wet soles slapping down the staff corridor — someone was moving very fast and their shoes were soaked from the ceiling leaks. And then came the sharp distinct clink of a tea glass being set down hard on the passage stool.",
    stressDelta: 14,
    trustDelta: 10,
    prerequisites: ["bhola_token"],
    unlocksClueId: "clue_bhola_929_testimony",
    evidenceChallengeId: null
  },

  bhola_tea_delivery: {
    id: "bhola_tea_delivery",
    suspectId: "bhola",
    storylines: ["A", "B", "C"],
    category: "timeline",
    phrasings: [
      "tea delivery", "9:10", "chai", "cutting chai", "delivered tea", "took tea",
      "upstairs tea", "harbans alive", "last time saw harbans", "harbans at 9:10"
    ],
    answer: "At 9:10 PM I personally carried two hot glasses of cutting chai upstairs to the booth. Harbans had his green desk lamp burning bright and was carefully inspecting the take-up spindle under it. Perfectly alive, perfectly calm, and completely hale.",
    stressDelta: 8,
    trustDelta: 15,
    prerequisites: [],
    unlocksClueId: "clue_bhola_harbans_alive_910",
    evidenceChallengeId: null
  },

  bhola_footsteps_description: {
    id: "bhola_footsteps_description",
    suspectId: "bhola",
    storylines: ["A"],
    category: "observation",
    phrasings: [
      "describe footsteps", "who was it", "whose footsteps", "describe person",
      "what did you notice", "corridor person", "saree sounds", "heels", "describe the walker"
    ],
    answer: "The soles moved with authority — not like a frightened young person. The clicking rhythm on the mosaic tiles and the rustling of silk fabric near the corridor, they reminded me of the sounds Meera Kapoor's expensive sandals make when she walks the lobby. I have heard those sounds for many years, Babu ji.",
    stressDelta: 10,
    trustDelta: 5,
    prerequisites: ["bhola_token", "bhola_footsteps"],
    unlocksClueId: "clue_bhola_identifies_footsteps",
    evidenceChallengeId: null
  },

  bhola_footsteps_description_b: {
    id: "bhola_footsteps_description_b",
    suspectId: "bhola",
    storylines: ["B"],
    category: "observation",
    phrasings: [
      "describe footsteps", "who was it", "whose footsteps", "describe person",
      "what did you notice", "corridor person", "describe the walker"
    ],
    answer: "The steps were slow and careful — the kind an older man makes when he is trying to be quiet but is upset. And I heard something heavy being dragged or held, like a tin canister being moved. The footfalls matched a man who knows these corridors from many years visiting.",
    stressDelta: 10,
    trustDelta: 5,
    prerequisites: ["bhola_token", "bhola_footsteps"],
    unlocksClueId: "clue_bhola_identifies_footsteps",
    evidenceChallengeId: null
  },

  bhola_footsteps_description_c: {
    id: "bhola_footsteps_description_c",
    suspectId: "bhola",
    storylines: ["C"],
    category: "observation",
    phrasings: [
      "describe footsteps", "who was it", "whose footsteps", "describe person",
      "what did you notice", "corridor person", "describe the walker"
    ],
    answer: "The footsteps were light and fast — like a young person in a great panic. I heard the rustling of a canvas tote bag and the soft squeak of sneaker soles. When I stepped into the corridor doorway, I saw a young woman's silhouette moving away rapidly through the dark.",
    stressDelta: 10,
    trustDelta: 5,
    prerequisites: ["bhola_token", "bhola_footsteps"],
    unlocksClueId: "clue_bhola_identifies_footsteps",
    evidenceChallengeId: null
  }
};

/**
 * Returns the question object by ID, or null if not found.
 */
export function getQuestion(questionId) {
  return QUESTION_DATABASE[questionId] || null;
}

/**
 * Returns all questions for a given suspect and storyline.
 */
export function getQuestionsForSuspect(suspectId, storylineId) {
  return Object.values(QUESTION_DATABASE).filter(
    (q) => q.suspectId === suspectId && (q.storylines.includes(storylineId) || q.storylines.includes("ALL"))
  );
}

/**
 * Returns the canonical answer for a question ID.
 * This is the ONLY way answers should be retrieved — never from LLM.
 */
export function getCanonicalAnswer(questionId) {
  const q = QUESTION_DATABASE[questionId];
  if (!q) return null;
  return {
    answer: q.answer,
    stressDelta: q.stressDelta,
    trustDelta: q.trustDelta,
    unlocksClueId: q.unlocksClueId
  };
}

