// src/data/truthGatesData.js
// ALIBI — Suspect Character Sheets, Live State & Canonical Truth Gates for Storylines A, B, and C

export const SUSPECT_CHARACTER_SHEETS = {
  raju: {
    id: "raju",
    name: "Raju Ansari",
    role: "Ticket Boy",
    age: 19,
    baseTrust: 45,
    baseStress: 35,
    speakingStyle: {
      pace: "fast",
      tone: "nervous, defensive, deferential ('Sahab', 'Masterji')",
      codeSwitching: "Frequent Hinglish with Old Delhi colloquialisms ('Bhai', 'kholi', 'chabi')",
      deflectionPattern: "Babbles about his sister, swears on his mother, pivots to Bhola's stall."
    },
    secrets: [
      "Took 500 rupees to leave the back staff passage unlatched before the screening.",
      "Heard the mechanical booth bell ring at 9:21 PM while lighting hurricane lanterns."
    ],
    fears: "Being framed by the police for murder because of his poverty and access to the doors.",
    protects: "His sister Parveen and the memory of Harbans Lal's past kindness."
  },

  meera: {
    id: "meera",
    name: "Meera Kapoor",
    role: "Cinema Owner",
    age: 42,
    baseTrust: 30,
    baseStress: 20,
    speakingStyle: {
      pace: "measured, cold, haughty",
      tone: "controlled, authoritative British-Indian English, clipped Hindi when angry",
      codeSwitching: "Formal legalistic English, occasional sharp Hindi terms ('fazool', 'hisaab')",
      deflectionPattern: "Counter-questions the detective, threatens legal action, cites commercial necessity."
    },
    secrets: [
      "Concealed unlicensed film prints in the back vaults to inflate the commercial valuation.",
      "Met Harbans in the booth after 9:12 PM to retrieve ledger page 47 and stop his disclosure."
    ],
    fears: "The cinema sale falling through, exposing her debts and destroying her family legacy.",
    protects: "The commercial transaction and her social reputation."
  },

  arvind: {
    id: "arvind",
    name: "Dr. Arvind Sethi",
    role: "Retired Professor & Regular Patron",
    age: 68,
    baseTrust: 50,
    baseStress: 15,
    speakingStyle: {
      pace: "slow, professorial, pedantic",
      tone: "formal Hindi with English film terminology and quotations",
      codeSwitching: "Classic literary Hindi with English cinematic terms ('carbon arc', 'emulsion', 'splice')",
      deflectionPattern: "Diverts concrete questions into film aesthetics and historical anecdotes."
    },
    secrets: [
      "His late sister, Zohra Sen, was an unacknowledged contributor to the film on tonight's reel.",
      "Knew the print carried catalogue code RT-17-Z and was determined to protect it from exploitation."
    ],
    fears: "Being forgotten, and having his sister's artistic contribution permanently erased.",
    protects: "Zohra Sen's memory and the surviving 35mm physical reel."
  },

  nusrat: {
    id: "nusrat",
    name: "Nusrat Ali",
    role: "Film Student (Jamia Millia)",
    age: 23,
    baseTrust: 60,
    baseStress: 40,
    speakingStyle: {
      pace: "sharp, guarded, articulate",
      tone: "defensive, media-savvy English with Hindi surfacing under stress",
      codeSwitching: "Contemporary college English with film analysis terms ('frame rate', 'foley', 'splice')",
      deflectionPattern: "Invokes student rights, blames tech glitches, demands to call her department head."
    },
    secrets: [
      "Entered the projection booth to photograph the splice pattern and archival notes.",
      "Her phone contains a missing 58-second interval (9:22:10–9:23:08 PM) during the fatal confrontation."
    ],
    fears: "Being arrested for trespassing, losing her phone footage, and ruining her family name.",
    protects: "Her documentary research and proof of her mother's erased cinematic work."
  },

  bhola: {
    id: "bhola",
    name: "Bhola Prasad",
    role: "Cinema Chaiwala",
    age: 56,
    baseTrust: 75,
    baseStress: 25,
    speakingStyle: {
      pace: "warm, rhythmic, deliberate, long pauses",
      tone: "humble, observant, story-shaped answers in local Old Delhi Hindi",
      codeSwitching: "Warm colloquial Hindi with respectful salutations ('Babu ji', 'Sahab')",
      deflectionPattern: "Offers chai, reminisces about forty years of cinema history, speaks in parables."
    },
    secrets: [
      "Keeps a paid paper token (#026) that proves he served tea upstairs at 9:10 PM.",
      "Clearly heard the 9:21 PM bell, the 9:23 PM thud, and wet footsteps at 9:29 PM."
    ],
    fears: "Rex Talkies being demolished and his lifelong home vanishing forever.",
    protects: "The truth for his fallen brother Harbans Lal."
  }
};

export const INITIAL_SUSPECT_LIVE_STATE = {
  raju: { trust: 45, stress: 35, contradictionsCaught: 0, revealedFacts: [], seenEvidence: [] },
  meera: { trust: 30, stress: 20, contradictionsCaught: 0, revealedFacts: [], seenEvidence: [] },
  arvind: { trust: 50, stress: 15, contradictionsCaught: 0, revealedFacts: [], seenEvidence: [] },
  nusrat: { trust: 60, stress: 40, contradictionsCaught: 0, revealedFacts: [], seenEvidence: [] },
  bhola: { trust: 75, stress: 25, contradictionsCaught: 0, revealedFacts: [], seenEvidence: [] }
};

/**
 * Canonical Truth Gates Catalog partitioned by active storyline.
 */
export const TRUTH_GATES = [
  // ── SHARED TRUTH GATES ──────────────────────────────────────────────────
  {
    id: "gate_raju_key",
    suspectId: "raju",
    storylines: ["A", "B", "C"],
    title: "The Unlatched Back Door",
    secretFact: "Raju took money to leave the back staff door unlatched before the screening.",
    conditions: {
      minStress: 45,
      requiredEvidence: ["duplicate_key"],
      requiredContradiction: "clash_raju_key",
      matchKeyword: "key"
    },
    lockedResponse:
      "Sahab, I'm just tearing tickets! Masterji had his own keys. Why are you questioning me about locks?!",
    unlockedAdmission:
      "Please don't arrest me, Inspector! Someone pressed five hundred rupees into my palm before the show and told me to leave the iron back door unlatched! They said they were only delivering projector spare valves! I never knew anyone would climb up to hurt Masterji!",
    unlockedClue:
      "Raju confesses: He left the rear passage unlatched after receiving cash, allowing unauthorised access to the booth stairs.",
    checklistGoalId: "clue_key_origin",
    points: 20,
    stressDelta: 20,
    trustDelta: -5
  },
  {
    id: "gate_bhola_trust",
    suspectId: "bhola",
    storylines: ["A", "B", "C"],
    title: "Bhola's Corroborating Account",
    secretFact: "Bhola heard the metallic bell at 9:21 PM and hurried footsteps at 9:29 PM.",
    conditions: {
      minStress: 20,
      requiredEvidence: ["bhola_token", "tea_glass"],
      matchKeyword: "token"
    },
    lockedResponse:
      "Babu ji, forty years I brewed tea beneath these cinema horns. A tea seller sees much, but speaking brings storm upon poor folk.",
    unlockedAdmission:
      "You have my paper token... You treat an old tea vendor with honor, Inspector. Listen closely: At 9:21 PM, through the hum of the backup engine, I heard the sharp brass clink of the booth bell ring upstairs! Then silence. And at 9:29 PM, wet leather soles came down the staff corridor, and someone set a glass down right by the passage stool!",
    unlockedClue:
      "Bhola's verified account: Booth bell chimed at 9:21 PM, followed by wet footsteps and a glass set down at 9:29 PM.",
    checklistGoalId: "whereabouts_bhola",
    points: 25,
    stressDelta: 10,
    trustDelta: 25
  },

  // ── STORYLINE A: MEERA KAPOOR TRUTH GATES ────────────────────────────────
  {
    id: "gate_meera_ledger",
    suspectId: "meera",
    storylines: ["A"],
    title: "Private Meeting & October Payments",
    secretFact: "Meera met Harbans in the booth after 9:12 PM regarding ledger payments.",
    conditions: {
      minStress: 40,
      requiredEvidence: ["sale_ledger"],
      requiredContradiction: "clash_meera_ledger",
      matchKeyword: "ledger"
    },
    lockedResponse:
      "Our business dealings concluded on the tenth of October. My private corporate accounts are entirely confidential.",
    unlockedAdmission:
      "Very well, Inspector. There is no point denying the ledger. Yes, I paid Harbans eighteen thousand rupees on the fourteenth, and another six thousand on the sixteenth. He discovered the unlicensed reels in the archive room and threatened to hand page 47 to the heritage preservation board! I met him in the booth after 9:12 PM to plead for time!",
    unlockedClue:
      "Meera admits: She met Harbans in the booth after 9:12 PM to recover the ledger page and stop his disclosure.",
    checklistGoalId: "whereabouts_meera",
    points: 25,
    stressDelta: 25,
    trustDelta: -10
  },
  {
    id: "gate_meera_cut",
    suspectId: "meera",
    storylines: ["A"],
    title: "The Manual Film Cut & Fatal Fall",
    secretFact: "Meera struck Harbans during the argument and staged the projector accident.",
    conditions: {
      minStress: 65,
      requiredEvidence: ["maintenance_log", "film_strip", "reel_clamp", "nusrat_phone"],
      requiredContradiction: "clash_meera_corridor",
      matchKeyword: "corridor"
    },
    lockedResponse:
      "You have no proof of what occurred in that booth! The projector malfunctioned under the power surge!",
    unlockedAdmission:
      "It wasn't murder! He refused to listen! He held the ledger page over the arc lamp! I grabbed the metal reel clamp to pull his arm back—he pulled away, stumbled in the dark, and his head struck the iron rail with a sickening crack! I panicked... I saw the projector motor had stopped, so I took the shears and sliced the film across the gate at 9:24 PM to make it look like an equipment jam! God forgive me, I only wanted the sale to go through!",
    unlockedClue:
      "Meera's Full Confession: Harbans died from a fall against the rail after she struck him with the clamp; she manually cut the film at 9:24 PM to stage an accident.",
    checklistGoalId: "clue_manual_cut",
    points: 35,
    stressDelta: 30,
    trustDelta: -15
  },

  // ── STORYLINE B: DR. ARVIND SETHI TRUTH GATES ────────────────────────────
  {
    id: "gate_arvind_catalogue",
    suspectId: "arvind",
    storylines: ["B"],
    title: "RT-17-Z & Zohra Sen's Erased Credit",
    secretFact: "The print on the projector was catalogue RT-17-Z, featuring his sister Zohra.",
    conditions: {
      minStress: 40,
      requiredEvidence: ["film_canister", "film_strip"],
      requiredContradiction: "clash_arvind_catalogue",
      matchKeyword: "catalogue"
    },
    lockedResponse:
      "An old cinema patron merely observes the flickering shadows, Inspector. The catalogue numbers of vintage stock are of no consequence.",
    unlockedAdmission:
      "You looked beneath the paper label... Yes! RT-17-Z was the master archive print of the 1968 classic. And the assistant director whose name was struck from the credits was my sister, Zohra Sen! For fifty years, commercial distributors erased her labor from history. Harbans found the original print in the vault and told me he was going to project her name tonight!",
    unlockedClue:
      "Dr. Sethi admits: Print RT-17-Z carries the unacknowledged work of his sister Zohra Sen, and Harbans intended to reveal it.",
    checklistGoalId: "clue_splice_identity",
    points: 25,
    stressDelta: 25,
    trustDelta: 10
  },
  {
    id: "gate_arvind_label",
    suspectId: "arvind",
    storylines: ["B"],
    title: "The Replaced Label & Fatal Confrontation",
    secretFact: "Sethi confronted Harbans to seize the reel, causing his fatal fall, and removed the label.",
    conditions: {
      minStress: 65,
      requiredEvidence: ["film_canister", "maintenance_log", "reel_clamp"],
      requiredContradiction: "clash_arvind_audio",
      matchKeyword: "splice"
    },
    lockedResponse:
      "I was in Seat G-14! I could never commit violence inside a sanctuary of cinema!",
    unlockedAdmission:
      "Harbans was going to hand the reel over to the new commercial developers! They were going to sell it as scrap acetate! When the bell rang at 9:21 PM, I climbed into the booth. I demanded the canister! Harbans shouted that it belonged to the cinema. We grappled over the take-up reel—I shoved him away, and he struck his temple against the booth safety rail! I froze... When he didn't move, I peeled the RT-17-Z label from the canister and slapped on the general archive tag so no one would know why I came for it!",
    unlockedClue:
      "Dr. Sethi's Full Confession: Shoved Harbans into the booth rail during a struggle over the Zohra print, then replaced the canister label to conceal its identity.",
    checklistGoalId: "whereabouts_sethi",
    points: 35,
    stressDelta: 30,
    trustDelta: -10
  },

  // ── STORYLINE C: NUSRAT ALI TRUTH GATES ──────────────────────────────────
  {
    id: "gate_nusrat_gap",
    suspectId: "nusrat",
    storylines: ["C"],
    title: "The Missing 58-Second Phone Recording",
    secretFact: "Nusrat deleted the 58-second gap between 9:22:10 and 9:23:08 PM.",
    conditions: {
      minStress: 45,
      requiredEvidence: ["nusrat_phone"],
      requiredContradiction: "clash_nusrat_gap",
      matchKeyword: "recording"
    },
    lockedResponse:
      "My phone simply ran out of buffer space! A student filmmaker does not have high-end broadcast servers, Inspector!",
    unlockedAdmission:
      "Stop looking at the audio waveform! Fine... I didn't have a buffer crash! I deleted fifty-eight seconds from the recording file! From 9:22:10 PM until 9:23:08 PM! Because I was inside the projection booth! I went up there to photograph the splice joint that proved my mother worked on that print! I was terrified the police would seize my camera and think I was a thief!",
    unlockedClue:
      "Nusrat admits: She intentionally deleted the 58 seconds on her phone because she was inside the booth during the confrontation.",
    checklistGoalId: "clue_missing_minute",
    points: 25,
    stressDelta: 25,
    trustDelta: -5
  },
  {
    id: "gate_nusrat_fall",
    suspectId: "nusrat",
    storylines: ["C"],
    title: "The Shove Near the Rail & Moved Clamp",
    secretFact: "Harbans grabbed Nusrat's wrist; her shove caused his fatal fall against the rail.",
    conditions: {
      minStress: 65,
      requiredEvidence: ["nusrat_phone", "reel_clamp", "film_strip"],
      requiredContradiction: "clash_nusrat_dust",
      matchKeyword: "dust"
    },
    lockedResponse:
      "I was in the restroom! You cannot link me to what happened near that railing!",
    unlockedAdmission:
      "I never meant to hurt him! I was leaning over the projector taking close-up macro shots of the splice! Suddenly the lights snapped off. A heavy hand seized my wrist—it was Harbans in the dark! He screamed 'Who's touching the reel?!' I panicked, pulled my arm with all my strength, and shoved him backwards! He lost his footing in the dark and fell against the booth railing! He didn't get up... I dropped the clamp, ran down the fire passage, and edited the video before anyone saw me!",
    unlockedClue:
      "Nusrat's Full Confession: Harbans grabbed her wrist while she photographed the reel; she shoved him back in panic, causing his fatal fall, then altered her recording.",
    checklistGoalId: "whereabouts_nusrat",
    points: 35,
    stressDelta: 30,
    trustDelta: -10
  }
];

/**
 * Filter truth gates by active storyline (includes shared gates and route-specific gates).
 */
export function getTruthGatesForStoryline(storylineId = "A") {
  const route = storylineId || "A";
  return TRUTH_GATES.filter((gate) => !gate.storylines || gate.storylines.includes(route));
}
