// src/data/cutscenesData.js
// Canonical Cutscenes Data for ALIBI

export const CUTSCENES = [
  {
    id: "cutscene_opening",
    storylines: ["A", "B", "C"],
    title: "Opening: Last Screening",
    subtitle: "8:45 PM • The Farewell Screening of 'Guide'",
    prerequisites: "Initial state",
    unlockedByDefault: true,
    paragraphs: [
      "Monsoon rain lashes against the vintage art-deco facade of Rex Talkies. Inside the cavernous auditorium, forty patrons sit scattered across velvet seats.",
      "Chief projectionist Harbans Lal strikes an electric arc between the carbon rods. The 35mm projector whirs to life, throwing a beam of silver light across the dust motes to the screen.",
      "Forty minutes later, the municipal power grid fails. The auxiliary diesel engine in the basement coughs to life, and in the projection gallery above, Harbans Lal's final screening abruptly ends in darkness."
    ],
    reveals: "Screening started at 8:45 PM; power failure struck at 9:17 PM."
  },
  {
    id: "cutscene_timeline_replay",
    storylines: ["A", "B", "C"],
    title: "Auditorium Echoes: First Replay",
    subtitle: "9:17 PM – 9:32 PM • The Missing Fifteen Minutes",
    prerequisites: "Establish alibi claims for at least 3 suspects",
    unlockedByDefault: false,
    paragraphs: [
      "The hall plunged into sudden blackness as the carbons died with a sharp hiss. Down below, Raju struck a match, his hands trembling beside Bhola's tea stove.",
      "Upstairs in the gallery, the mechanical spring bell above the projection booth door rang once at 9:21 PM with a sharp metallic clink.",
      "Two minutes later, at 9:23 PM, a heavy thud vibrated through the plaster ceiling. And when the dim 40-watt emergency bulbs flickered on, Harbans was dead over the take-up spindle."
    ],
    reveals: "The booth threshold was breached at 9:21 PM; the fatal impact landed at 9:23 PM."
  },
  {
    id: "cutscene_last_negotiation",
    storylines: ["A"],
    title: "Last Negotiation",
    subtitle: "Storyline A: The Confrontation in the Projection Gallery",
    prerequisites: "Ledger discrepancy + manual film cut + corridor timestamp established",
    unlockedByDefault: false,
    paragraphs: [
      "Meera Kapoor closed her hand around page 47 of the private ledger. 'Sign the inventory waiver, Harbans. The sale goes through tonight, or we are both ruined.'",
      "Harbans shook his head, holding the paper over the hot lamp casing. 'Not this time, Meera Sahiba. These films belong to the artists who made them, not commercial demolition crews.'",
      "As the lights snapped off at 9:17 PM, Meera lunged for the page. In the dark, her hand found the steel reel clamp. A sudden blow, a desperate pull—Harbans stumbled against the guardrail with a sickening crack. In sheer panic, Meera seized the shears and sliced the film across the gate at 9:24 PM to fake a machine jam."
    ],
    reveals: "Meera caused the fatal fall during the struggle for the ledger and staged the projector accident."
  },
  {
    id: "cutscene_three_splices",
    storylines: ["B"],
    title: "Three Splices",
    subtitle: "Storyline B: The Surviving Print of Catalogue RT-17-Z",
    prerequisites: "Match original catalogue RT-17-Z and three-splice pattern",
    unlockedByDefault: false,
    paragraphs: [
      "Under the booth magnifying lamp, the celluloid reveals its hidden signature: three tape joins spaced precisely at 12 mm, 19 mm, and 12 mm, joined with aged amber cement.",
      "Fifty years ago, in a cutting room in Bombay, an uncredited woman named Zohra Sen spliced this negative by hand. When the studio released the film, her name was excised from the opening credits.",
      "Harbans Lal knew. He had spent three months restoring this surviving print, determined that on the cinema's final night, Zohra's contribution would finally be acknowledged before an audience."
    ],
    reveals: "Print RT-17-Z uniquely preserves Zohra Sen's lost contribution."
  },
  {
    id: "cutscene_credit_never_came",
    storylines: ["B"],
    title: "The Credit That Never Came",
    subtitle: "Storyline B: Dr. Sethi's Archival Desperation",
    prerequisites: "Establish Sethi's audio knowledge and manual reel advancement",
    unlockedByDefault: false,
    paragraphs: [
      "Dr. Arvind Sethi stood before Harbans in the dark gallery at 9:21 PM. 'Give me the reel, Harbans. You don't understand what these commercial buyers will do to it. They will melt it down!'",
      "Harbans refused to let go of the take-up spindle. 'It is going on the projector, Professor. Her name will be on the screen!'",
      "Their argument turned violent in the narrow gallery. Sethi shoved Harbans away with desperate force; Harbans lost his balance in the gloom and struck his temple on the steel rail. Terrified of his own complicity, Sethi peeled off the RT-17-Z label and replaced it with a generic sticker."
    ],
    reveals: "Dr. Sethi caused Harbans' fatal fall and replaced the reel label."
  },
  {
    id: "cutscene_missing_minute",
    storylines: ["C"],
    title: "The Missing Minute",
    subtitle: "Storyline C: The Reconstruction of the 58-Second Gap",
    prerequisites: "Reconstruct phone recording gap (9:22:10–9:23:08 PM) + film dust proof",
    unlockedByDefault: false,
    paragraphs: [
      "As the audio waveform is aligned against the generator pitch, the black screen dissolves into grainy, recovered phone frames.",
      "Nusrat Ali is crouched over the rewind bench, her camera flash reflecting off the three-splice join. She is photographing the archival notes proving her mother's uncredited sound work.",
      "Suddenly, Harbans' silhouette enters the frame. A hand grabs her wrist in the pitch dark. In blind student panic, Nusrat jerks back and shoves with both arms. Harbans stumbles backward against the booth rail and falls silent. Trembling, Nusrat moves the clamp, flees down the fire stairs, and deletes the 58-second confrontation."
    ],
    reveals: "Nusrat shoved Harbans in panic when caught trespassing and trimmed the video file."
  },
  {
    id: "cutscene_bhola_account",
    storylines: ["A", "B", "C"],
    title: "Bhola's Full Account",
    subtitle: "The Eyewitness of the Tea Stall",
    prerequisites: "Present paper token #026 to Bhola Prasad",
    unlockedByDefault: false,
    paragraphs: [
      "Bhola pours fresh steaming chai from his samovar into two glasses, his eyes calm and sorrowful.",
      "'Babu ji, Masterji was my brother. At 9:10 PM, he was laughing about old songs. At 9:21 PM, when the generator hum dipped, the booth bell chimed overhead.'",
      "'Then at 9:23 PM, a heavy thud shook the ceiling. Six minutes later, wet shoes came down the dark passage and placed a glass on the stool. That is the gospel truth.'"
    ],
    reveals: "Corroborates the exact timing of the bell (9:21 PM), thud (9:23 PM), and corridor exit (9:29 PM)."
  },
  {
    id: "cutscene_final_confrontation",
    storylines: ["A", "B", "C"],
    title: "Final Indictment & Verdict",
    subtitle: "Rex Talkies • Case Concluded",
    prerequisites: "Successfully indict the canonical culprit with verified proof chain",
    unlockedByDefault: false,
    paragraphs: [
      "In the centre of the rain-streaked auditorium, the detective lays out the physical evidence, the timeline facts, and the broken alibis.",
      "The culprit breaks down as their contradictions are systematically dismantled. The monsoon flood recedes as morning light touches the silver screen.",
      "Rex Talkies will close its doors forever, but the truth of Harbans Lal's final reel has been saved from the darkness."
    ],
    reveals: "Case formally closed and culprit remanded to custody."
  }
];
