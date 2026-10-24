// src/data/truthGatesData.js
// ALIBI — Phase 4: Suspect AI Character Sheets, Live State & Truth Gates (GDD §8)

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
      deflectionPattern: "Babbles about his innocence, brings up his sick sister, pivots to Bhola's stall."
    },
    secrets: [
      "Accepted 4,000 rupees from Meera to duplicate Harbans Lal's deadbolt key.",
      "Saw a woman in a silk saree slipping towards the projection booth stairs at 8:42 PM."
    ],
    fears: "Being framed for murder by Meera Kapoor and her high-court lawyers.",
    protects: "His sister Parveen and the memory of Harbans Lal's generosity."
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
      tone: "authoritative, condescending, legalistic",
      codeSwitching: "Formal British-Indian English, occasional sharp Urdu/Hindi terms ('fazool', 'auditing')",
      deflectionPattern: "Counter-questions the detective, threatens legal action, cites commercial necessity."
    },
    secrets: [
      "Paid Raju 4,000 rupees to copy the booth key to bypass Harbans' deadlock.",
      "Tore page 142 from Harbans' logbook to destroy his historical tenancy injunction.",
      "Tampered with Harbans' tea glass with sedative powder outside her office."
    ],
    fears: "The 18-crore DLF commercial mall sale expiring at midnight if heritage injunction is stamped.",
    protects: "Her family's commercial empire and her social standing in New Delhi."
  },

  arvind: {
    id: "arvind",
    name: "Dr. Arvind Sethi",
    role: "Retired Film Historian",
    age: 68,
    baseTrust: 50,
    baseStress: 15,
    speakingStyle: {
      pace: "slow, professorial, pedantic",
      tone: "philosophical, melancholic, detached",
      codeSwitching: "Rich literary English with classic Hindi cinema terminology ('Guru Dutt', 'halide', 'nitrate')",
      deflectionPattern: "Diverts concrete questions into film aesthetics and historical anecdotes."
    },
    secrets: [
      "Ascended the booth spiral stairs at 8:50 PM to steal the 1957 'Pyaasa' nitrate negative.",
      "Found Harbans Lal dying, checked his pulse, smeared grease on his hands, and fled in panic."
    ],
    fears: "Being arrested as an illegal film trafficker and having his private archive seized.",
    protects: "His pristine academic reputation and his vintage film reels."
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
      tone: "skeptical, defensive, media-savvy",
      codeSwitching: "Contemporary college English with media studies jargon ('Foley', 'ambient soundscape')",
      deflectionPattern: "Invokes student rights, blames faulty tech equipment, demands her phone back."
    },
    secrets: [
      "Her Zoom recorder captured a violent threat against Harbans by Meera's associate at 8:35 PM.",
      "Her tape was wiped by someone who cornered her in the dark foyer right after the blackout."
    ],
    fears: "Losing her Jamia university thesis and facing criminal accessory charges.",
    protects: "Her academic career and documentary audio files."
  },

  bhola: {
    id: "bhola",
    name: "Bhola Prasad",
    role: "Cinema Chaiwala",
    age: 56,
    baseTrust: 75,
    baseStress: 25,
    speakingStyle: {
      pace: "warm, rhythmic, deliberate",
      tone: "humble, observant, maternal",
      codeSwitching: "Bhojpuri-inflected Old Delhi Hindi with respectful salutations ('Babu ji', 'Ram-Ram')",
      deflectionPattern: "Offers chai, invokes thirty years of honest work, tells stories of the old days."
    },
    secrets: [
      "Saw Meera Kapoor lean over Harbans' tea glass with white powder outside her office at 8:12 PM.",
      "Saw Dr. Sethi frantically descending the booth stairs wiping his hands at 8:50 PM."
    ],
    fears: "Rex Talkies being demolished and losing his livelihood and old brotherhood.",
    protects: "The truth for his brother Harbans Lal."
  }
};

export const INITIAL_SUSPECT_LIVE_STATE = {
  raju: {
    trust: 45,
    stress: 35,
    contradictionsCaught: 0,
    revealedFacts: [],
    seenEvidence: []
  },
  meera: {
    trust: 30,
    stress: 20,
    contradictionsCaught: 0,
    revealedFacts: [],
    seenEvidence: []
  },
  arvind: {
    trust: 50,
    stress: 15,
    contradictionsCaught: 0,
    revealedFacts: [],
    seenEvidence: []
  },
  nusrat: {
    trust: 60,
    stress: 40,
    contradictionsCaught: 0,
    revealedFacts: [],
    seenEvidence: []
  },
  bhola: {
    trust: 75,
    stress: 25,
    contradictionsCaught: 0,
    revealedFacts: [],
    seenEvidence: []
  }
};

/**
 * Truth Gates Catalog (GDD §8):
 * Each Truth Gate holds a secret that can only be unlocked under verified engine conditions.
 */
export const TRUTH_GATES = [
  // ── RAJU'S TRUTH GATES ──────────────────────────────────────────────────
  {
    id: "gate_raju_key",
    suspectId: "raju",
    title: "Who Ordered the Duplicate Key",
    secretFact: "Raju was bribed by Meera Kapoor to cut the duplicate projection booth key.",
    conditions: {
      minStress: 50,
      requiredEvidence: ["duplicate_key"],
      requiredContradiction: "clash_raju_key",
      matchKeyword: "duplicate"
    },
    lockedResponse: "Sahab, I told you! Masterji's hands were shivering from malaria! He gave me the key himself. Why are you harassing a poor boy?!",
    unlockedAdmission: "Alright! Please don't call the police beat constables! Meera Ma'am gave me four thousand rupees last Thursday! She said she needed to inspect the acoustic ceiling tiles before the commercial buyers arrived! I swear by my mother, I had no idea she would hurt Masterji!",
    unlockedClue: "Raju confesses: Meera Kapoor paid him 4,000 rupees to duplicate the projection booth deadbolt key.",
    checklistGoalId: "clue_key_origin",
    points: 20,
    stressDelta: 25,
    trustDelta: -10,
    unlocked: false
  },
  {
    id: "gate_raju_alibi",
    suspectId: "raju",
    title: "Shadow on the Spiral Stairwell",
    secretFact: "Raju saw a woman in a silk saree slip past towards the booth spiral stairs right before 8:45 PM.",
    conditions: {
      minStress: 65,
      requiredContradiction: "clash_raju_key",
      matchKeyword: "blackout"
    },
    lockedResponse: "I was frozen at the concession counter! Bhola bhai saw me! I didn't see anyone enter or leave!",
    unlockedAdmission: "I lied about staying at the counter the entire interval! At 8:42 PM, right before the generator tripped, I saw a woman's shadow in an expensive silk saree slip through the back velvet drape towards the booth spiral stairs! I was trembling so badly I didn't dare speak!",
    unlockedClue: "Raju admits seeing a woman in a silk saree sneaking towards the projection booth stairs at 8:42 PM.",
    checklistGoalId: "whereabouts_raju",
    points: 20,
    stressDelta: 20,
    trustDelta: 5,
    unlocked: false
  },

  // ── MEERA'S TRUTH GATES ─────────────────────────────────────────────────
  {
    id: "gate_meera_mud",
    suspectId: "meera",
    title: "Boiler Alley Stairwell Intrusion",
    secretFact: "Meera ascended the boiler stairwell to steal page 142 from Harbans' logbook.",
    conditions: {
      minStress: 45,
      requiredEvidence: ["maintenance_log"],
      requiredContradiction: "clash_meera_office",
      matchKeyword: "mud"
    },
    lockedResponse: "Inspector, Rex Talkies has a leaking roof. Stepping near an alleyway drain does not constitute a criminal offense. Speak to my solicitor.",
    unlockedAdmission: "Harbans threatened to present his lifelong tenancy injunction to the Delhi Heritage Council tonight! That injunction would have bankrupted me! Yes, I climbed the boiler alley fire escape at 8:30 PM and tore page 142 from his register! But he was screaming at someone else behind the screen when I left! He was alive!",
    unlockedClue: "Meera confesses to climbing the boiler stairwell to tear page 142 from the maintenance register.",
    checklistGoalId: "whereabouts_meera",
    points: 25,
    stressDelta: 22,
    trustDelta: -15,
    unlocked: false
  },
  {
    id: "gate_meera_deed",
    suspectId: "meera",
    title: "18-Crore Mall Demolition Deadline",
    secretFact: "The 18-crore commercial deed required vacant possession before midnight.",
    conditions: {
      minStress: 60,
      requiredEvidence: ["sale_ledger"],
      matchKeyword: "sale"
    },
    lockedResponse: "Commercial agreements are private business affairs protected by non-disclosure agreements.",
    unlockedAdmission: "You want the truth?! DLF's consortium clause expires at midnight tonight! If Harbans' heritage covenant remained active, the 18-crore buyout was completely dead. Harbans was an obstinate fossil who lived in 1955 while this cinema accrued two lakhs of electric debt every month!",
    unlockedClue: "Meera admits the 18-crore sale required vacant possession before midnight, giving her an urgent motive.",
    checklistGoalId: "clue_deed",
    points: 25,
    stressDelta: 18,
    trustDelta: -10,
    unlocked: false
  },

  // ── ARVIND'S TRUTH GATES ────────────────────────────────────────────────
  {
    id: "gate_arvind_stairs",
    suspectId: "arvind",
    title: "Booth Visit & Grease Smeared Hands",
    secretFact: "Dr. Sethi climbed into the booth at 8:50 PM, discovered the body, and fled without reporting.",
    conditions: {
      minStress: 40,
      requiredEvidence: ["film_strip"],
      requiredContradiction: "clash_arvind_bhola",
      matchKeyword: "seat"
    },
    lockedResponse: "A scholar does not wander into machinery booths during a blackout, Inspector. I remained seated in Row 7 contemplating cinema history.",
    unlockedAdmission: "Enough! I will not have my reputation dragged through the gutter! Harbans promised to hand me the original 1957 nitrate reel of 'Pyaasa' tonight in exchange for twenty-five thousand rupees. When the power died, I climbed the spiral stairs at 8:50 PM. The door was ajar... I felt around in the dark, touched his arm, and realized he was dead! I panicked, wiped the grease from my hands, and returned to my seat!",
    unlockedClue: "Dr. Sethi confesses to finding Harbans' body in the booth at 8:50 PM and fleeing to protect his film purchase.",
    checklistGoalId: "whereabouts_sethi",
    points: 20,
    stressDelta: 25,
    trustDelta: 10,
    unlocked: false
  },

  // ── NUSRAT'S TRUTH GATES ────────────────────────────────────────────────
  {
    id: "gate_nusrat_audio",
    suspectId: "nusrat",
    title: "The Threat Recorded on Zoom H4n",
    secretFact: "Nusrat recorded a confrontation outside the booth before her audio card was wiped.",
    conditions: {
      minStress: 50,
      requiredEvidence: ["nusrat_phone"],
      matchKeyword: "recording"
    },
    lockedResponse: "My audio gear is sensitive equipment! The blackout triggered a power surge that corrupted the SD card sector!",
    unlockedAdmission: "Stop pressuring me! I didn't wipe the card! At 8:35 PM, my Zoom mic captured an outside man with heavy boots cornering Harbans by the mezzanine! He told Harbans: 'Sign the handover or you won't walk down those stairs alive.' When the lights dipped, someone pushed me in the foyer and snatched the recorder! I managed to back up the final 8 seconds to my phone cloud!",
    unlockedClue: "Nusrat reveals her audio captured a man threatening Harbans to 'sign the handover or die' at 8:35 PM.",
    checklistGoalId: "clue_erased_audio",
    points: 25,
    stressDelta: 20,
    trustDelta: 15,
    unlocked: false
  },

  // ── BHOLA'S TRUTH GATES ─────────────────────────────────────────────────
  {
    id: "gate_bhola_poison",
    suspectId: "bhola",
    title: "Powder Tampering at the Office Door",
    secretFact: "Bhola witnessed Meera tampering with Harbans' tea glass at 8:12 PM.",
    conditions: {
      minStress: 35,
      requiredEvidence: ["cutting_chai_glass"],
      matchKeyword: "chai"
    },
    lockedResponse: "Babu ji, my cardamom chai has nourished the patrons of Old Delhi for thirty-two years. I would never taint my own tea.",
    unlockedAdmission: "Bhagwan is my witness! When I carried the brass tray upstairs at 8:12 PM, Meera Madam called me to her office doorway. She asked for an extra saucer, paid me five hundred rupees, and lingered directly over the glasses! I saw fine white dust clinging to the emerald stone on her index finger! Harbans was already groggy by 8:30 PM!",
    unlockedClue: "Bhola eyewitness testimony: Meera Kapoor tampered with Harbans Lal's cutting chai at 8:12 PM.",
    checklistGoalId: "clue_sedative",
    points: 30,
    stressDelta: 25,
    trustDelta: 20,
    unlocked: false
  }
];
