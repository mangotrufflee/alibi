// src/data/caseInfo.js
// ALIBI: Rex Talkies Case Data & Canonical Timeline

export const caseInfo = {
  title: "THE PROJECTIONIST'S LAST REEL",
  subtitle: "Rex Talkies • Old Delhi • Monsoon Blackout",
  victim: "Harbans Lal (Age 64, Chief Projectionist for 41 years)",
  timeOfDeath: "Estimated between 9:21 PM and 9:24 PM (17 October 2026)",
  causeOfDeath:
    "Blunt force trauma to occipital cranium caused by a fatal fall against the projection booth rail during a physical confrontation.",
  weather:
    "Torrential monsoon downpour, Old Delhi municipal grid failure, auxiliary diesel generator running.",
  overview:
    "On 17 October 2026, during the final screening at Rex Talkies before its proposed commercial sale, the municipal power grid failed at 9:17 PM. The cinema switched to its auxiliary diesel generator. At 9:32 PM, veteran projectionist Harbans Lal was discovered dead beside the carbon-arc projector, having suffered a fatal blow against the booth rail. Heavy monsoon street flooding has sealed all exits. Five suspects remain inside the auditorium. As a retired inspector who happened to be present, you have until the generator runs dry to prove what occurred.",

  timeline: [
    { time: "08:45 PM", event: "Final screening begins amidst heavy monsoon downpour." },
    { time: "09:12 PM", event: "Meera Kapoor and Harbans Lal begin a private discussion." },
    { time: "09:17 PM", event: "Main power grid fails; auxiliary generator activates at 100% capacity." },
    { time: "09:19 PM", event: "Projector motor stops." },
    { time: "09:21 PM", event: "Confrontation begins; projection booth bell chimes." },
    { time: "09:23 PM", event: "Harbans Lal suffers the fatal fall against the booth rail." },
    { time: "09:24 PM", event: "35mm film strip manually severed in projection booth." },
    { time: "09:26 PM", event: "Nusrat's phone camera captures a figure entering the staff corridor." },
    { time: "09:29 PM", event: "Bhola Prasad hears wet footsteps and a cup being set down." },
    { time: "09:32 PM", event: "Harbans Lal is discovered dead; generator gauge reads 68%." }
  ],

  checklist: [
    { id: "c1", label: "Establish the exact sequence of the 9:17–9:24 PM blackout", completed: true },
    { id: "c2", label: "Analyze the metal reel clamp and booth rail fibres", completed: false },
    { id: "c3", label: "Verify how the booth was accessed during the power failure", completed: false },
    { id: "c4", label: "Cross-examine suspect timeline claims against the maintenance log", completed: false },
    { id: "c5", label: "Reconstruct phone footage and corridor reflection evidence", completed: false },
    { id: "c6", label: "Name the culprit with verified physical, timeline, and corroborating proof", completed: false }
  ],

  investigatorNotes: [
    "Note 1: Cause of death is cranium impact against the booth safety rail. There is no evidence of poisoning or foreign sedative in the tea.",
    "Note 2: Projector motor halted at 9:19 PM, but the film was cut at 9:24 PM. Any claim of a motor tear is physically impossible.",
    "Note 3: The booth bell rang at 9:21 PM, establishing the exact moment the booth threshold was breached.",
    "Note 4: Generator gauge registered 100% at 9:17 PM and 68% at 9:32 PM, locking all events inside a strict 15-minute window."
  ]
};
