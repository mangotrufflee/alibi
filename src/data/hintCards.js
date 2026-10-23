// src/data/hintCards.js
// ALIBI � Hint Card Authoring Data
// Derived from interrogationEngine.js triggers.
// Each hint card: { id, hint, keyword, type, points, synonyms }
// type: "right" = +points, "wrong" = -points, "neutral" = 0 points

export const HINT_CARDS = {
  raju: [
    {
      id: "raju_h1",
      hint: "Ask Raju who has the key to the projection booth",
      keyword: "key",
      type: "right",
      points: 10,
      synonyms: ["key", "chabi", "lock", "duplicate", "brass key", "deadbolt", "booth key", "spare key", "duplicate key", "kholi ki chabi"]
    },
    {
      id: "raju_h2",
      hint: "Ask about Raju's gambling debts and money problems",
      keyword: "debt",
      type: "right",
      points: 10,
      synonyms: ["debt", "money", "loan", "gamble", "gambling", "rupee", "cash", "4000", "paise", "karza", "udhar", "borrow"]
    },
    {
      id: "raju_h3",
      hint: "Ask where Raju was when the lights went out at 8:45",
      keyword: "blackout",
      type: "right",
      points: 10,
      synonyms: ["blackout", "lights", "8:45", "dark", "generator", "power cut", "andhere", "bijli", "where were you", "time", "interval"]
    },
    {
      id: "raju_h4",
      hint: "Point out the grease stains on Raju''s hands",
      keyword: "grease",
      type: "right",
      points: 10,
      synonyms: ["grease", "oil", "stain", "hands", "machine", "smell", "projector", "sprocket", "lubricant", "haath"]
    },
    {
      id: "raju_h5",
      hint: "Ask Raju about the heavy iron reel clamp from the booth",
      keyword: "clamp",
      type: "right",
      points: 15,
      synonyms: ["clamp", "reel clamp", "iron", "weapon", "strike", "hit", "blow", "murder weapon", "loha", "patta"]
    },
    {
      id: "raju_h6",
      hint: "Suggest Raju planned to steal from the cinema sale money",
      keyword: "steal",
      type: "wrong",
      points: -10,
      synonyms: ["steal", "theft", "chori", "rob", "take money", "sale money", "developer", "crore"]
    },
    {
      id: "raju_h7",
      hint: "Ask Raju what he was selling at the back stairwell",
      keyword: "chai",
      type: "neutral",
      points: 0,
      synonyms: ["chai", "tea", "selling", "stall", "snacks", "ticket", "food"]
    }
  ],

  meera: [
    {
      id: "meera_h1",
      hint: "Ask Meera about the demolition and cinema redevelopment deal",
      keyword: "sale",
      type: "right",
      points: 10,
      synonyms: ["sale", "demolition", "redevelopment", "deed", "dlf", "mall", "crore", "18 crore", "cinema sale", "developer", "bechna"]
    },
    {
      id: "meera_h2",
      hint: "Ask about Meera''s alibi � where was she during the blackout",
      keyword: "phone call",
      type: "right",
      points: 10,
      synonyms: ["alibi", "phone", "call", "lawyer", "office", "blackout", "where were you", "solicitor", "chawla", "telephone", "landline"]
    },
    {
      id: "meera_h3",
      hint: "Ask Meera who else had a key to the projection booth",
      keyword: "master key",
      type: "right",
      points: 10,
      synonyms: ["key", "master key", "booth", "desk", "drawer", "mahogany", "office key", "duplicate", "lock", "chabi"]
    },
    {
      id: "meera_h4",
      hint: "Confront Meera about the coal mud on her saree hem",
      keyword: "mud",
      type: "right",
      points: 15,
      synonyms: ["mud", "coal", "boiler", "saree", "alley", "stain", "hem", "dirty", "ganda", "fire escape", "stairwell", "outside"]
    },
    {
      id: "meera_h5",
      hint: "Accuse Meera of ordering Raju to let the killer in",
      keyword: "hired",
      type: "wrong",
      points: -15,
      synonyms: ["hired", "paid raju", "bribe", "accomplice", "ordered", "told him", "plan together", "conspiracy"]
    },
    {
      id: "meera_h6",
      hint: "Ask Meera what she thinks of Harbans Lal as a person",
      keyword: "harbans",
      type: "neutral",
      points: 0,
      synonyms: ["harbans", "masterji", "projectionist", "victim", "dead man", "opinion"]
    }
  ],

  arvind: [
    {
      id: "arvind_h1",
      hint: "Ask Dr. Sethi about the vintage print thefts from the archive vaults",
      keyword: "print",
      type: "right",
      points: 10,
      synonyms: ["print", "film", "pyaasa", "1957", "nitrate", "archive", "vintage", "reel", "canister", "collector", "vault", "stolen print"]
    },
    {
      id: "arvind_h2",
      hint: "Ask about the gold biscuits hidden in the Mughal-e-Azam reel can",
      keyword: "gold",
      type: "right",
      points: 10,
      synonyms: ["gold", "biscuit", "sona", "canister", "dubai", "passport", "flight", "smuggle", "mughal e azam", "reel can", "hidden"]
    },
    {
      id: "arvind_h3",
      hint: "Ask Dr. Sethi exactly where he was when the murder blow landed",
      keyword: "seat",
      type: "right",
      points: 10,
      synonyms: ["seat", "alibi", "where", "blackout", "scream", "g14", "g-14", "auditorium", "sound", "hiss", "noise", "blow", "thud"]
    },
    {
      id: "arvind_h4",
      hint: "Accuse Dr. Sethi of killing Harbans to steal the Pyaasa print for himself",
      keyword: "steal print",
      type: "wrong",
      points: -15,
      synonyms: ["steal print", "killed for film", "wanted the reel", "collector murder", "film obsession", "killed to get", "reel thief"]
    },
    {
      id: "arvind_h5",
      hint: "Ask Dr. Sethi about his opinion on the cinema being demolished",
      keyword: "demolition",
      type: "neutral",
      points: 0,
      synonyms: ["demolition", "sale", "cinema closing", "heritage", "development", "sad", "end of era"]
    }
  ],

  nusrat: [
    {
      id: "nusrat_h1",
      hint: "Ask Nusrat about her audio recorder and the erased 12-minute tape",
      keyword: "recording",
      type: "right",
      points: 10,
      synonyms: ["recording", "recorder", "audio", "mic", "zoom", "h4n", "tape", "erased", "deleted", "12 minutes", "wiped", "record kar"]
    },
    {
      id: "nusrat_h2",
      hint: "Ask about the threatening phone memo Nusrat heard on the mezzanine",
      keyword: "threat",
      type: "right",
      points: 10,
      synonyms: ["threat", "whisper", "phone", "handover", "stairs", "mezzanine", "outside man", "cornered", "dhamma", "frightened", "warning"]
    },
    {
      id: "nusrat_h3",
      hint: "Challenge Nusrat''s alibi about being in the ladies'' washroom",
      keyword: "washroom",
      type: "right",
      points: 10,
      synonyms: ["washroom", "restroom", "toilet", "ladies", "bathroom", "umbrella", "wet", "cardigan", "alibi", "bathroom attendant", "washroom attendant"]
    },
    {
      id: "nusrat_h4",
      hint: "Accuse Nusrat of being the one who entered the booth and struck Harbans",
      keyword: "killer",
      type: "wrong",
      points: -15,
      synonyms: ["nusrat killed", "nusrat did it", "you killed him", "you struck", "nusrat murderer", "film student killer"]
    },
    {
      id: "nusrat_h5",
      hint: "Ask Nusrat what kind of film project she is working on",
      keyword: "documentary",
      type: "neutral",
      points: 0,
      synonyms: ["documentary", "film project", "thesis", "jamia", "student film", "dissertation", "research", "cinema study"]
    }
  ],

  bhola: [
    {
      id: "bhola_h1",
      hint: "Ask Bhola about the cutting chai he delivered to Harbans � was there poison?",
      keyword: "chai",
      type: "right",
      points: 10,
      synonyms: ["chai", "tea", "poison", "datura", "glass", "cutting chai", "deliver", "upstairs", "bhola ki chai", "ginger", "adrak chai", "dregs", "sedative"]
    },
    {
      id: "bhola_h2",
      hint: "Ask Bhola about the argument and shouting he heard behind the screen",
      keyword: "argument",
      type: "right",
      points: 10,
      synonyms: ["argument", "shout", "quarrel", "fight", "dispute", "behind screen", "heavy boots", "punjabi", "burn", "threaten", "agreement", "signed", "jhagda", "awaaz"]
    },
    {
      id: "bhola_h3",
      hint: "Ask who held the VIP brass chai tokens at Rex Talkies tonight",
      keyword: "brass token",
      type: "right",
      points: 10,
      synonyms: ["token", "brass", "vip", "special patron", "refill", "17", "number", "chai token", "tin token", "coin"]
    },
    {
      id: "bhola_h4",
      hint: "Accuse Bhola of poisoning the chai himself to kill Harbans",
      keyword: "bhola poisoned",
      type: "wrong",
      points: -15,
      synonyms: ["bhola poisoned", "you poisoned", "bhola killed", "you added datura", "bhola is the killer", "bhola did it", "chai wala murderer"]
    },
    {
      id: "bhola_h5",
      hint: "Ask Bhola how long he has known Harbans Lal",
      keyword: "years",
      type: "neutral",
      points: 0,
      synonyms: ["years", "how long", "kitne saal", "friendship", "old friend", "knew him", "relationship", "history"]
    }
  ]
};

// How many hint cards to show at a time per suspect
export const HINTS_PER_SCREEN = 3;

// Retrieve hint cards for a suspect, excluding already-scored ones
export function getActiveHints(suspectId, scoredKeywordIds = []) {
  const cards = HINT_CARDS[suspectId] || [];
  const available = cards.filter((c) => !scoredKeywordIds.includes(c.id));
  // Prioritize "right" and "wrong" over "neutral"
  const prioritized = [
    ...available.filter((c) => c.type === "right"),
    ...available.filter((c) => c.type === "wrong"),
    ...available.filter((c) => c.type === "neutral")
  ];
  return prioritized.slice(0, HINTS_PER_SCREEN);
}
