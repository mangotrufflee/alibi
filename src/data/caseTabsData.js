// src/data/caseTabsData.js
// ALIBI — Authoring Data for the 8 Case Tabs & Canonical Timeline (17 October 2026)

export const INITIAL_CHECKLIST = [
  {
    id: "whereabouts_raju",
    category: "Whereabouts at 9:17–9:32 PM",
    title: "Verify Raju's position during blackout",
    description: "Raju claims he was near Bhola's tea stall lighting emergency hurricane lanterns.",
    targetSuspect: "raju",
    completed: false,
    hidden: false
  },
  {
    id: "whereabouts_meera",
    category: "Whereabouts at 9:17–9:32 PM",
    title: "Interrogate Meera on her corridor movements",
    description: "Meera insists she stayed in her office from 9:15 PM until the body was found at 9:32 PM.",
    targetSuspect: "meera",
    completed: false,
    hidden: false
  },
  {
    id: "whereabouts_sethi",
    category: "Whereabouts at 9:17–9:32 PM",
    title: "Confirm Dr. Sethi's alibi in Seat G-14",
    description: "Dr. Sethi claims he never left Seat G-14 throughout the entire power cut.",
    targetSuspect: "arvind",
    completed: false,
    hidden: false
  },
  {
    id: "whereabouts_nusrat",
    category: "Whereabouts at 9:17–9:32 PM",
    title: "Examine Nusrat's washroom alibi and phone gap",
    description: "Nusrat claims she was fixing an umbrella in the restroom, but her recording stopped for 58 seconds.",
    targetSuspect: "nusrat",
    completed: false,
    hidden: false
  },
  {
    id: "whereabouts_bhola",
    category: "Whereabouts at 9:17–9:32 PM",
    title: "Cross-examine Bhola on corridor sounds",
    description: "Bhola was near the samovar and heard the booth bell ring at 9:21 PM and footsteps at 9:29 PM.",
    targetSuspect: "bhola",
    completed: false,
    hidden: false
  },
  {
    id: "clue_key_origin",
    category: "Forensic Discoveries",
    title: "Examine the duplicate back-door key",
    description: "Check the fresh dark latch grease on the aged iron key found under the lobby blotter.",
    targetSuspect: "raju",
    completed: false,
    hidden: false
  },
  {
    id: "clue_manual_cut",
    category: "Forensic Discoveries",
    title: "Investigate the manual 9:24 PM film cut",
    description: "Determine why the film strip was cut with shears 5 minutes after the projector motor stopped.",
    targetSuspect: "meera",
    completed: false,
    hidden: false
  },
  {
    id: "clue_splice_identity",
    category: "Archival Forensics",
    title: "Identify the three-splice print RT-17-Z",
    description: "Match the 12mm-19mm-12mm splice pattern to the surviving print catalogued for Zohra Sen.",
    targetSuspect: "arvind",
    completed: false,
    hidden: false
  },
  {
    id: "clue_missing_minute",
    category: "Digital Forensics",
    title: "Reconstruct the 58-second recording gap",
    description: "Align Nusrat's phone audio waveform and generator pitch shift from 9:22:10 to 9:23:08 PM.",
    targetSuspect: "nusrat",
    completed: false,
    hidden: false
  },
  {
    id: "confront_killer",
    category: "Final Deduction",
    title: "Establish 3-point proof chain and indict culprit",
    description: "Combine physical evidence, verified timeline contradiction, and corroborating testimony.",
    targetSuspect: null,
    completed: false,
    hidden: false
  }
];

export const MASTER_TIMELINE = [
  {
    time: "08:45 PM",
    title: "Final Screening Commences",
    description: "Rex Talkies begins its farewell 35mm screening of 'Guide' amidst a torrential Old Delhi downpour.",
    verified: true,
    category: "theatre"
  },
  {
    time: "09:12 PM",
    title: "Private Discussion in Mezzanine",
    description: "Meera Kapoor meets Harbans Lal to demand the return of private account ledger page 47.",
    verified: true,
    category: "witness"
  },
  {
    time: "09:17 PM",
    title: "MAIN POWER FAILS — GENERATOR ACTIVATES",
    description: "Municipal power cut hits Chandni Chowk grid. Cinema auxiliary diesel generator kicks in at 100%.",
    verified: true,
    category: "critical"
  },
  {
    time: "09:19 PM",
    title: "Projector Motor Stops",
    description: "Carbon-arc projection lamp dims and motor halts due to electrical surge, as recorded in log.",
    verified: true,
    category: "forensic"
  },
  {
    time: "09:21 PM",
    title: "Booth Threshold Breached / Bell Chimes",
    description: "The mechanical spring bell rings at 9:21 PM as the projection booth door is opened.",
    verified: true,
    category: "critical"
  },
  {
    time: "09:23 PM",
    title: "Harbans Lal Fatal Impact",
    description: "Harbans Lal suffers fatal blunt occipital trauma against the steel booth rail during physical confrontation.",
    verified: true,
    category: "critical"
  },
  {
    time: "09:24 PM",
    title: "Film Severed Manually",
    description: "35mm celluloid strip manually sliced across the take-up spindle to fake a projector jam.",
    verified: true,
    category: "forensic"
  },
  {
    time: "09:26 PM",
    title: "Corridor Figure Captured on Phone",
    description: "Nusrat's phone video captures a figure with ornate metal bangles passing the staff corridor.",
    verified: true,
    category: "digital"
  },
  {
    time: "09:29 PM",
    title: "Footsteps & Tea Cup Sound",
    description: "Bhola Prasad hears hurried wet footsteps and the distinct clink of a glass being placed down.",
    verified: true,
    category: "witness"
  },
  {
    time: "09:32 PM",
    title: "Harbans Discovered / Emergency Inquiry",
    description: "Body discovered in booth. Generator fuel reading at 68%. Floodwaters lock all auditorium exits.",
    verified: true,
    category: "theatre"
  }
];

export const SUSPECT_CLAIMS = {
  raju: [
    { time: "08:45 PM", claim: "Standing at the balcony ticket barrier tearing stubs for late patrons." },
    { time: "09:17 PM", claim: "Went to the concession foyer to light hurricane lanterns near Bhola's samovar." },
    { time: "09:21 PM", claim: "Heard the projection booth bell ring while standing next to Bhola." },
    { time: "09:32 PM", claim: "Ran upstairs after hearing the shouts when Harbans was discovered." }
  ],
  meera: [
    { time: "09:12 PM", claim: "Had a brief conversation with Harbans in the mezzanine about screening arrangements, then went to office." },
    { time: "09:17 PM", claim: "Remained inside ground floor manager's office on phone with solicitor Chawla when generator tripped." },
    { time: "09:26 PM", claim: "Claims she never entered the staff corridor or went near the projection stairs all evening." },
    { time: "09:32 PM", claim: "Stepped out to the auditorium only when someone cried out that Harbans was dead." }
  ],
  arvind: [
    { time: "08:45 PM", claim: "Seated in Row 7 Seat G-14 taking detailed analytical notes on cinematographic lighting." },
    { time: "09:17 PM", claim: "Remained seated in Seat G-14 in complete darkness, reciting film history to calm nearby patrons." },
    { time: "09:21 PM", claim: "Denies ascending the spiral stairs or touching the take-up spindle." },
    { time: "09:32 PM", claim: "Approached the projection gallery only after the emergency lanterns were raised." }
  ],
  nusrat: [
    { time: "09:10 PM", claim: "Filming the beam flutter and architectural cornice from the balcony railing." },
    { time: "09:17 PM", claim: "Stepped into the ladies' restroom to wring out her umbrella and cardigan." },
    { time: "09:22 PM", claim: "Claims her phone video recorded continuously and that the gap was caused by a dead battery." },
    { time: "09:28 PM", claim: "Returned to the stalls before the body was discovered." }
  ],
  bhola: [
    { time: "09:10 PM", claim: "Handed Harbans cutting chai in the booth, exchanged salaam, and descended to stove." },
    { time: "09:17 PM", claim: "Stoking the coal samovar near the side aisle entrance when power snapped." },
    { time: "09:21 PM", claim: "Clearly heard the high brass metallic chime of the projection booth bell overhead." },
    { time: "09:29 PM", claim: "Heard hurried wet footsteps on the staff passage and a tea tumbler placed on the stool." }
  ]
};

export const CONTRADICTIONS = [
  {
    id: "clash_meera_ledger",
    title: "Meera's Cutoff Claim vs Ledger Payments",
    suspectA: "meera",
    claimA: "Meera claims her business and financial arrangement with Harbans ended on 10 October 2026.",
    suspectB: "evidence",
    claimB: "Private ledger page 47 documents payments to Harbans on 14 Oct (₹18,500) and 16 Oct (₹6,000).",
    resolved: false
  },
  {
    id: "clash_meera_corridor",
    title: "Meera's Office Alibi vs 9:26 PM Phone Video",
    suspectA: "meera",
    claimA: "Meera claims she remained inside her ground floor manager's office continuously from 9:15 PM.",
    suspectB: "evidence",
    claimB: "Nusrat's recovered phone video proves a figure wearing Meera's metal bangles was in the staff corridor at 9:26 PM.",
    resolved: false
  },
  {
    id: "clash_arvind_catalogue",
    title: "Dr. Sethi's Denial vs RT-17-Z Canister Label",
    suspectA: "arvind",
    claimA: "Dr. Sethi insists tonight's reel was generic stock of no historical or personal consequence.",
    suspectB: "evidence",
    claimB: "Under the replacement label, original catalogue RT-17-Z confirms the reel is the uncredited print of his sister Zohra Sen.",
    resolved: false
  },
  {
    id: "clash_arvind_audio",
    title: "Dr. Sethi's Seat G-14 Alibi vs 9:21 PM Reel Movement",
    suspectA: "arvind",
    claimA: "Dr. Sethi claims he stayed immobile in Seat G-14 throughout the entire power outage.",
    suspectB: "evidence",
    claimB: "Projector maintenance log records manual reel movement at 9:21 PM, matching Sethi's knowledge of the canister.",
    resolved: false
  },
  {
    id: "clash_nusrat_gap",
    title: "Nusrat's Battery Claim vs Missing 58-Second Gap",
    suspectA: "nusrat",
    claimA: "Nusrat claims her recording stopped because her battery died while in the washroom.",
    suspectB: "evidence",
    claimB: "Video metadata proves an exact 58-second gap (9:22:10–9:23:08 PM) cut manually before recording resumed with 60% battery.",
    resolved: false
  },
  {
    id: "clash_nusrat_dust",
    title: "Nusrat's Restroom Alibi vs Phone Case Film Dust",
    suspectA: "nusrat",
    claimA: "Nusrat swears she never went near the projector or handling table during the screening.",
    suspectB: "evidence",
    claimB: "Forensic analysis detected fresh 35mm acetate film dust inside and around her phone case.",
    resolved: false
  },
  {
    id: "clash_raju_key",
    title: "Raju's Ticket Post vs Duplicate Grease Key",
    suspectA: "raju",
    claimA: "Raju claims he had no key and stayed at the concession barrier all evening.",
    suspectB: "evidence",
    claimB: "Duplicate key EV-05 found under lobby blotter with fresh grease matching the projection booth latch.",
    resolved: false
  }
];

export const SUSPECT_RELATIONSHIPS = [
  { source: "meera", target: "victim", relation: "Proprietor & Union Holdout", desc: "Harbans threatened to disclose unlicensed prints and altered inspection certificates before the sale." },
  { source: "arvind", target: "victim", relation: "Archival Obsession", desc: "Harbans planned to publicly acknowledge Zohra Sen's contribution; Sethi tried to seize the reel first." },
  { source: "nusrat", target: "victim", relation: "Trespasser & Student", desc: "Nusrat entered the booth to photograph the splice pattern proving her mother's erased cinematic credit." },
  { source: "raju", target: "meera", relation: "Staff & Keyholder", desc: "Raju took small cash to leave the rear staff door unlatched, unaware of the impending confrontation." },
  { source: "bhola", target: "victim", relation: "41-Year Brotherhood", desc: "Served Harbans cardamom cutting chai every night at Rex Talkies; heard the corridor sounds at 9:21 and 9:29 PM." }
];

export const INITIAL_INVESTIGATOR_NOTES = [
  {
    id: "note_1",
    timestamp: "09:35 PM",
    text: "Victim Harbans Lal suffered fatal blunt cranium trauma against the projection booth rail. Impact matches fall from a physical struggle, not an equipment malfunction.",
    tag: "Forensics",
    isAuto: true
  },
  {
    id: "note_2",
    timestamp: "09:40 PM",
    text: "Projector maintenance log proves motor stopped at 9:19 PM, while the 35mm film was cleanly cut with shears at 9:24 PM. Staging confirmed.",
    tag: "Sabotage",
    isAuto: true
  },
  {
    id: "note_3",
    timestamp: "09:45 PM",
    text: "Auxiliary diesel generator started at 100% at 9:17 PM and reached 68% at 9:32 PM. The killer is one of the five individuals inside this cinema.",
    tag: "Suspects",
    isAuto: true
  }
];
