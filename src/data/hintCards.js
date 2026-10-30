// src/data/hintCards.js
// ALIBI — Canonical Hint Cards Supporting Storylines A, B, and C

export const HINT_CARDS = {
  raju: [
    {
      id: "raju_h1",
      hint: "Ask Raju why the duplicate back-door key had fresh latch grease",
      keyword: "key",
      type: "right",
      points: 10,
      synonyms: ["chabi", "lock", "duplicate", "back door", "deadbolt", "booth key", "grease", "latch", "kholi"]
    },
    {
      id: "raju_h2",
      hint: "Ask if Raju heard the projection booth bell ring at 9:21 PM",
      keyword: "bell",
      type: "right",
      points: 10,
      synonyms: ["bell", "booth bell", "ring", "ghanti", "9:21", "metallic chime", "door bell", "sound"]
    },
    {
      id: "raju_h3",
      hint: "Ask where Raju was between 9:17 PM and 9:32 PM during the blackout",
      keyword: "blackout",
      type: "right",
      points: 10,
      synonyms: ["blackout", "lights", "power cut", "andhera", "bijli", "generator", "time", "where were you", "lantern", "foyer"]
    },
    {
      id: "raju_h4",
      hint: "Suggest Raju climbed to the booth to steal money from Harbans",
      keyword: "steal money",
      type: "wrong",
      points: -10,
      synonyms: ["steal", "chori", "loot", "take cash", "rob", "steal money", "bribe"]
    },
    {
      id: "raju_h5",
      hint: "Ask Raju about torn ticket stubs at the balcony barrier",
      keyword: "ticket",
      type: "neutral",
      points: 0,
      synonyms: ["ticket", "stub", "punches", "seat b12", "rt-0847", "admission", "balcony"]
    }
  ],

  meera: [
    {
      id: "meera_h1",
      hint: "Confront Meera with private ledger page 47 and payments on Oct 14/16",
      keyword: "ledger",
      type: "right",
      points: 15,
      synonyms: ["ledger", "page 47", "accounts", "payments", "october 14", "october 16", "h lal", "private accounts", "bribe", "hisaab"]
    },
    {
      id: "meera_h2",
      hint: "Challenge Meera's office alibi with the 9:26 PM corridor footage",
      keyword: "corridor",
      type: "right",
      points: 15,
      synonyms: ["corridor", "footage", "bangles", "video", "staff passage", "phone", "alibi", "9:26", "caught on tape", "hallway"]
    },
    {
      id: "meera_h3",
      hint: "Ask Meera why the film was cut at 9:24 PM after the motor stopped",
      keyword: "film cut",
      type: "right",
      points: 15,
      synonyms: ["film cut", "cut", "shears", "9:24", "manual cut", "staged accident", "spindle", "sliced", "celluloid"]
    },
    {
      id: "meera_h4",
      hint: "Ask Meera about the altered property inspection certificate OD-P/1847/26",
      keyword: "certificate",
      type: "right",
      points: 10,
      synonyms: ["certificate", "inspection", "altered date", "property transfer", "commercial sale", "clearance", "pending inventory"]
    },
    {
      id: "meera_h5",
      hint: "Accuse Meera of poisoning Harbans Lal's tea with Datura",
      keyword: "poison",
      type: "wrong",
      points: -15,
      synonyms: ["poison", "datura", "toxic", "sedative", "chemical", "poisoned tea", "powder", "dregs"]
    },
    {
      id: "meera_h6",
      hint: "Ask Meera about the historical legacy of Rex Talkies cinema",
      keyword: "heritage",
      type: "neutral",
      points: 0,
      synonyms: ["heritage", "legacy", "cinema history", "old delhi", "father", "multiplex"]
    }
  ],

  arvind: [
    {
      id: "arvind_h1",
      hint: "Ask Dr. Sethi about catalogue RT-17-Z and his sister Zohra Sen",
      keyword: "zohra",
      type: "right",
      points: 15,
      synonyms: ["zohra", "zohra sen", "rt-17-z", "sister", "credit", "uncredited", "acknowledgement", "behen", "print"]
    },
    {
      id: "arvind_h2",
      hint: "Ask about the replacement label pasted over the original canister tag",
      keyword: "replacement label",
      type: "right",
      points: 15,
      synonyms: ["label", "replacement label", "canister", "rt-archive", "general stock", "sticker", "pasted", "conceal label"]
    },
    {
      id: "arvind_h3",
      hint: "Confront Dr. Sethi about the 3-splice pattern (12mm-19mm-12mm)",
      keyword: "splice",
      type: "right",
      points: 15,
      synonyms: ["splice", "three splices", "12mm", "19mm", "joins", "splice pattern", "tape", "film strip", "celluloid joins"]
    },
    {
      id: "arvind_h4",
      hint: "Ask Dr. Sethi about the manual reel movement at 9:21 PM in the logbook",
      keyword: "reel movement",
      type: "right",
      points: 10,
      synonyms: ["reel movement", "9:21", "take-up spindle", "maintenance log", "manual advancement", "turned reel"]
    },
    {
      id: "arvind_h5",
      hint: "Accuse Dr. Sethi of smuggling gold biscuits inside a film canister to Dubai",
      keyword: "gold biscuits",
      type: "wrong",
      points: -15,
      synonyms: ["gold", "gold biscuits", "dubai", "passport", "smuggling", "palam airport", "sona"]
    },
    {
      id: "arvind_h6",
      hint: "Ask Dr. Sethi about his academic thesis on Guru Dutt's lighting",
      keyword: "guru dutt",
      type: "neutral",
      points: 0,
      synonyms: ["guru dutt", "lighting", "academic", "analysis", "notes", "cinematography"]
    }
  ],

  nusrat: [
    {
      id: "nusrat_h1",
      hint: "Challenge Nusrat about the 58-second gap on her phone (9:22:10–9:23:08 PM)",
      keyword: "recording gap",
      type: "right",
      points: 15,
      synonyms: ["gap", "recording gap", "58 seconds", "missing minute", "9:22", "deleted", "trimmed", "rex_1710", "waveform"]
    },
    {
      id: "nusrat_h2",
      hint: "Ask Nusrat about the fresh 35mm film dust inside her phone case",
      keyword: "film dust",
      type: "right",
      points: 15,
      synonyms: ["dust", "film dust", "phone case", "acetate dust", "microscopic", "casing", "powder", "particles"]
    },
    {
      id: "nusrat_h3",
      hint: "Ask Nusrat why she entered the projection booth with her camera",
      keyword: "mother",
      type: "right",
      points: 15,
      synonyms: ["mother", "maa", "thesis", "photograph", "splice photo", "notes", "proof", "credit", "trespassing"]
    },
    {
      id: "nusrat_h4",
      hint: "Ask about the pitch shift in the generator hum when her audio cuts out",
      keyword: "generator hum",
      type: "right",
      points: 10,
      synonyms: ["generator hum", "audio pitch", "hum", "frequency", "sound", "waveform", "engine sound"]
    },
    {
      id: "nusrat_h5",
      hint: "Suggest an outside mobster in heavy rubber boots threatened Harbans",
      keyword: "mobster",
      type: "wrong",
      points: -15,
      synonyms: ["mobster", "heavy boots", "outside man", "gangster", "enforcer", "hired thug", "punjabi voice"]
    },
    {
      id: "nusrat_h6",
      hint: "Ask Nusrat what camera settings she used for shooting in the dark",
      keyword: "camera settings",
      type: "neutral",
      points: 0,
      synonyms: ["settings", "shutter", "iso", "focal length", "lens", "foley mic"]
    }
  ],

  bhola: [
    {
      id: "bhola_h1",
      hint: "Present paper token #026 to earn Bhola's full confidence",
      keyword: "token",
      type: "right",
      points: 15,
      synonyms: ["token", "paper token", "026", "tea token", "paid", "trust", "tea tin", "parcha"]
    },
    {
      id: "bhola_h2",
      hint: "Ask Bhola about the booth bell at 9:21 PM and footsteps at 9:29 PM",
      keyword: "footsteps",
      type: "right",
      points: 15,
      synonyms: ["footsteps", "steps", "wet shoes", "9:29", "9:21", "sounds", "corridor", "cup clink", "tumbler", "awaaz"]
    },
    {
      id: "bhola_h3",
      hint: "Ask Bhola what he saw when he delivered tea upstairs at 9:10 PM",
      keyword: "tea delivery",
      type: "right",
      points: 10,
      synonyms: ["tea", "chai", "delivery", "9:10", "cutting chai", "upstairs", "harbans hale", "cardamom"]
    },
    {
      id: "bhola_h4",
      hint: "Accuse Bhola of slipping sedatives into Harbans' tea glass",
      keyword: "sedative",
      type: "wrong",
      points: -15,
      synonyms: ["sedative", "poisoned", "sleeping pill", "drug", "datura", "tampered tea"]
    },
    {
      id: "bhola_h5",
      hint: "Ask Bhola about the monsoon storm flooding Chandni Chowk outside",
      keyword: "storm",
      type: "neutral",
      points: 0,
      synonyms: ["storm", "rain", "monsoon", "flood", "barish", "chandni chowk", "water"]
    }
  ]
};

export const HINTS_PER_SCREEN = 3;

/**
 * Retrieve hint cards for a suspect, prioritized and filtered by active storyline.
 */
export function getActiveHints(suspectId, scoredKeywordIds = [], storylineId = "A") {
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
