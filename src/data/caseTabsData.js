// src/data/caseTabsData.js
// ALIBI — Phase 2: Authoring Data for the 8 Case Tabs (GDD §7)

export const INITIAL_CHECKLIST = [
  {
    id: "whereabouts_raju",
    category: "Whereabouts at 8:45 PM",
    title: "Question Raju on his position during blackout",
    description: "Raju claims he was near the stage door. Verify his claim against physical evidence.",
    targetSuspect: "raju",
    completed: false,
    hidden: false
  },
  {
    id: "whereabouts_meera",
    category: "Whereabouts at 8:45 PM",
    title: "Interrogate Meera regarding the office interval",
    description: "Meera insists she was in her private office balancing accounts.",
    targetSuspect: "meera",
    completed: false,
    hidden: false
  },
  {
    id: "whereabouts_sethi",
    category: "Whereabouts at 8:45 PM",
    title: "Confirm Dr. Sethi's seat in Row 7",
    description: "Dr. Sethi claims he was immersed in the film archive reel throughout the show.",
    targetSuspect: "arvind",
    completed: false,
    hidden: false
  },
  {
    id: "whereabouts_nusrat",
    category: "Whereabouts at 8:45 PM",
    title: "Examine Nusrat's balcony vantage point",
    description: "Nusrat was filming the auditorium with her phone and audio recorder.",
    targetSuspect: "nusrat",
    completed: false,
    hidden: false
  },
  {
    id: "whereabouts_bhola",
    category: "Whereabouts at 8:45 PM",
    title: "Cross-check Bhola's tea delivery schedule",
    description: "Bhola served cutting chai to the booth minutes before the blackout.",
    targetSuspect: "bhola",
    completed: false,
    hidden: false
  },
  {
    id: "clue_key_origin",
    category: "Forensic Discoveries",
    title: "Uncover who duplicated the P-1 booth key",
    description: "Find out why a freshly cut brass key was dropped under aisle seat D-4.",
    targetSuspect: "raju",
    completed: false,
    hidden: false
  },
  {
    id: "clue_sedative",
    category: "Forensic Discoveries",
    title: "Analyze the sedative residue in Harbans' chai",
    description: "Identify what substance was dissolved in the tea glass and who provided it.",
    targetSuspect: "bhola",
    completed: false,
    hidden: false
  },
  {
    id: "clue_deed",
    category: "Motive & Financial",
    title: "Locate the 18-Crore Rex Talkies sale deed",
    description: "Investigate whether Harbans Lal's tenancy injunction blocked the mall redevelopment.",
    targetSuspect: "meera",
    completed: false,
    hidden: true
  },
  {
    id: "clue_erased_audio",
    category: "Technical Evidence",
    title: "Recover Nusrat's erased audio tape snippet",
    description: "Nusrat recorded the interval voices outside the booth before the recorder stopped.",
    targetSuspect: "nusrat",
    completed: false,
    hidden: true
  },
  {
    id: "confront_killer",
    category: "Final Deduction",
    title: "Establish motive, weapon & opportunity to name the killer",
    description: "Cross the 50-point solve threshold before the diesel generator runs dry.",
    targetSuspect: null,
    completed: false,
    hidden: false
  }
];

export const MASTER_TIMELINE = [
  {
    time: "07:30 PM",
    title: "Rex Talkies Doors Open",
    description: "Monsoon deluge outside. 12 patrons enter for the final screening of 'Guide'.",
    verified: true,
    category: "theatre"
  },
  {
    time: "08:00 PM",
    title: "Screening Commences",
    description: "Harbans Lal cranks the Peerless carbon-arc projector for Reel 1.",
    verified: true,
    category: "theatre"
  },
  {
    time: "08:15 PM",
    title: "Bhola Delivers Chai to Booth",
    description: "Bhola climbs the metal spiral stairs with two hot glasses of cardamom chai.",
    verified: true,
    category: "witness"
  },
  {
    time: "08:22 PM",
    title: "Logbook Warning Entry",
    description: "Harbans Lal scrawls 'GEARBOX TAMPERED. DO NOT RUN REEL 4' in red ink.",
    verified: true,
    category: "forensic"
  },
  {
    time: "08:40 PM",
    title: "Ticket Stamped / Aisle Movement",
    description: "Staff punch ticket #409 discarded near Row 2. Shadows seen on aisle staircase.",
    verified: true,
    category: "forensic"
  },
  {
    time: "08:45 PM",
    title: "MAIN GENERATOR BLACKOUT",
    description: "Total darkness falls over Rex Talkies as the main fuse bank short-circuits.",
    verified: true,
    category: "critical"
  },
  {
    time: "08:48 PM",
    title: "Auditorium Thud & Distant Bell",
    description: "Heavy metallic strike heard above the auditorium ceiling. Bell pull-cord severed.",
    verified: true,
    category: "critical"
  },
  {
    time: "08:52 PM",
    title: "Emergency Lights Sputter / Body Found",
    description: "Dim 40W backup bulb flickers on. Harbans Lal found deceased over the projector.",
    verified: true,
    category: "forensic"
  },
  {
    time: "09:00 PM",
    title: "Storm Flood Locks All Exits",
    description: "Street flooding prevents outside police from reaching. Emergency inquiry begins.",
    verified: true,
    category: "theatre"
  }
];

export const SUSPECT_CLAIMS = {
  raju: [
    { time: "08:35 PM", claim: "Standing at the balcony ticket barrier tearing stubs for late patrons." },
    { time: "08:45 PM", claim: "Felt darkness and stayed completely frozen by the exit curtain." },
    { time: "08:50 PM", claim: "Ran to the lobby to check on Meera Madam." }
  ],
  meera: [
    { time: "08:25 PM", claim: "Reviewing theatre accounts and lease papers inside her private office." },
    { time: "08:45 PM", claim: "Remained behind her desk lighting emergency kerosene lantern." },
    { time: "08:52 PM", claim: "Came out to the auditorium after hearing shouts from the hall." }
  ],
  arvind: [
    { time: "08:30 PM", claim: "Taking detailed academic notes on the print quality from Row 7." },
    { time: "08:45 PM", claim: "Sat still in the dark, reciting cinematic trivia to calm patrons." },
    { time: "08:53 PM", claim: "Walked toward the projection booth to inspect the vintage projector." }
  ],
  nusrat: [
    { time: "08:38 PM", claim: "Filming the projector beam from the balcony railing." },
    { time: "08:45 PM", claim: "Her phone audio recorder was active; she claims she saw someone enter the booth." },
    { time: "08:49 PM", claim: "Tried calling her father's law office when the scream was heard." }
  ],
  bhola: [
    { time: "08:15 PM", claim: "Handed Harbans his chai, exchanged salaam, and left the booth immediately." },
    { time: "08:45 PM", claim: "Tending to the brass samovar near the side aisle entrance." },
    { time: "08:52 PM", claim: "Saw Dr. Sethi hurriedly wiping his hands on a handkerchief near the booth stairs." }
  ]
};

export const CONTRADICTIONS = [
  {
    id: "clash_raju_key",
    title: "Raju's Ticket Post vs Duplicate Key Location",
    suspectA: "raju",
    claimA: "Claims he stayed at the balcony curtain during the blackout.",
    suspectB: "evidence",
    claimB: "Freshly cut duplicate key P-1 found in main auditorium aisle seat D-4.",
    resolved: false
  },
  {
    id: "clash_meera_office",
    title: "Meera's Office Alibi vs Torn Maintenance Page",
    suspectA: "meera",
    claimA: "Claims she never entered the projection corridor all evening.",
    suspectB: "evidence",
    claimB: "Torn corner of page 142 from Harbans' logbook found in her briefcase.",
    resolved: false
  },
  {
    id: "clash_nusrat_bhola",
    title: "Nusrat's Balcony Video vs Dr. Sethi's Movement",
    suspectA: "arvind",
    claimA: "Dr. Sethi claims he never left Row 7 during the blackout.",
    suspectB: "bhola",
    claimB: "Bhola observed Sethi descending the booth spiral stairs at 8:50 PM.",
    resolved: false
  }
];

export const SUSPECT_RELATIONSHIPS = [
  { source: "meera", target: "raju", relation: "Employer & Secret Paymaster", desc: "Paid Raju 4,000 rupees to acquire the duplicate booth key under guise of maintenance." },
  { source: "meera", target: "victim", relation: "Landlord vs Tenancy Injunction", desc: "Harbans held the lifelong tenancy blocking Meera's 18-Crore commercial redevelopment." },
  { source: "arvind", target: "victim", relation: "Archival Rivalry", desc: "Harbans refused to sell the rare original 1965 35mm print to Dr. Sethi's private collection." },
  { source: "nusrat", target: "raju", relation: "Caught on Tape", desc: "Nusrat recorded Raju accepting cash from Meera behind the popcorn counter." },
  { source: "bhola", target: "victim", relation: "40-Year Comrades", desc: "Bhola served Harbans cutting chai every evening since Rex Talkies opened its doors in 1965." },
  { source: "arvind", target: "bhola", relation: "Daily Tea Patron", desc: "Sethi always orders special cardamom chai using brass token #17." }
];

export const INITIAL_INVESTIGATOR_NOTES = [
  {
    id: "note_1",
    timestamp: "09:05 PM",
    text: "Victim Harbans Lal struck from behind while bending over projector take-up spindle. Angle indicates right-handed assailant of moderate height.",
    tag: "Forensics",
    isAuto: true
  },
  {
    id: "note_2",
    timestamp: "09:12 PM",
    text: "Diesel generator was deliberately short-circuited with a copper welding wire. This was not an accidental municipal outage.",
    tag: "Sabotage",
    isAuto: true
  },
  {
    id: "note_3",
    timestamp: "09:18 PM",
    text: "Only five people remained in the theatre when the outer storm barriers flooded. The killer is sitting right in front of us.",
    tag: "Suspects",
    isAuto: true
  }
];
