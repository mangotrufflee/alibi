// src/data/storylines.js
// Canonical Definition for ALIBI's Three Storylines

export const STORYLINES = {
  A: {
    id: "A",
    title: "The Sale Must Survive",
    subtitle: "A desperate cinema owner, concealed reels, and a staged malfunction",
    culpritId: "meera",
    culpritName: "Meera Kapoor",
    summary:
      "Meera Kapoor needs the cinema sale to proceed and concealed unlicensed film prints in the back rooms. Harbans discovered the illegal prints and a backdated property inspection certificate, intending to reveal both before the cinema was sold. In a private confrontation to retrieve a ledger page, Meera struck Harbans with a metal reel clamp, causing a fatal fall against the booth rail. She then manually cut the film to fake an equipment accident.",
    motive:
      "Protecting the cinema sale and concealing illegal prints and backdated inspection certificates from buyers.",
    fatalAction:
      "Struck Harbans with a heavy metal reel clamp during a physical struggle, causing a fatal fall against the projection booth rail.",
    stagedElement:
      "Manually sliced a section of 35mm film at 9:24 PM to simulate an explosive projector malfunction.",
    requiredProof: {
      physicalClues: ["sale_ledger", "inspection_cert", "film_strip", "reel_clamp"],
      timelineFacts: ["time_919_stopped", "time_924_film_cut", "time_926_corridor"],
      contradictions: ["clash_meera_ledger", "clash_meera_corridor"],
      puzzles: ["puzzle_ticket_clock", "puzzle_reflection"],
      cutscenes: ["cutscene_last_negotiation"]
    },
    cutsceneTitles: {
      main: "Last Negotiation",
      description: "Meera closes her hand around the ledger, Harbans refuses, and the power dies."
    }
  },

  B: {
    id: "B",
    title: "The Film That Would Not Die",
    subtitle: "A forgotten sister, an uncredited masterpiece, and an archival obsession",
    culpritId: "arvind",
    culpritName: "Dr. Arvind Sethi",
    summary:
      "Dr. Arvind Sethi's late sister, Zohra, contributed to a film whose surviving print no longer acknowledges her. Harbans planned to screen the surviving print with an acknowledgement of Zohra. Sethi tried to take the reel before the truth became public; Harbans refused. Their confrontation became physical, and Sethi shoved Harbans, causing him to fall fatally against the booth rail. Sethi then removed the reel label to conceal its identity.",
    motive:
      "Protecting the surviving print and restoring Zohra's contribution, while fearing exposure of his own complicity in its erasure.",
    fatalAction:
      "Shoved Harbans during a violent disagreement over the reel, causing a fatal cranium impact against the rail.",
    stagedElement:
      "Peeled off the RT-17-Z label and replaced it with a generic archive sticker to obscure the print's identity.",
    requiredProof: {
      physicalClues: ["film_canister", "film_strip", "maintenance_log"],
      timelineFacts: ["time_919_stopped", "time_921_reel_moved", "time_925_label_removed"],
      contradictions: ["clash_arvind_catalogue", "clash_arvind_audio"],
      puzzles: ["puzzle_canister_lies", "puzzle_ticket_clock"],
      cutscenes: ["cutscene_three_splices", "cutscene_credit_never_came"]
    },
    cutsceneTitles: {
      main: "The Credit That Never Came",
      description: "The emotional history of Zohra Sen and Dr. Sethi's archival desperation."
    }
  },

  C: {
    id: "C",
    title: "The Missing Minute",
    subtitle: "A daughter's search, a silenced camera, and fifty-eight deleted seconds",
    culpritId: "nusrat",
    culpritName: "Nusrat Ali",
    summary:
      "Nusrat Ali entered the projection booth to photograph the three-splice pattern and a handwritten note proving her mother's erased contribution to cinema history. Harbans caught her and grabbed her wrist. In panic, Nusrat shoved him away, causing a fatal fall against the booth rail. She froze, moved the clamp, fled, and concealed the 58-second gap (9:22:10–9:23:08 PM) on her phone recording.",
    motive:
      "Recovering proof of her mother's erased cinematic contribution, and panicking when caught trespassing in the booth.",
    fatalAction:
      "Shoved Harbans away in self-defence panic when he seized her wrist, causing his head to strike the steel rail.",
    stagedElement:
      "Trimmed the critical 58 seconds from her phone recording and repositioned the reel clamp.",
    requiredProof: {
      physicalClues: ["nusrat_phone", "reel_clamp", "film_strip"],
      timelineFacts: ["time_921_bell", "time_922_gap_start", "time_923_gap_end"],
      contradictions: ["clash_nusrat_gap", "clash_nusrat_dust"],
      puzzles: ["puzzle_missing_minute", "puzzle_booth_reconstruction"],
      cutscenes: ["cutscene_missing_minute"]
    },
    cutsceneTitles: {
      main: "Missing Minute",
      description: "The silhouette in the booth dissolves into the truth of the 58-second gap."
    }
  }
};
