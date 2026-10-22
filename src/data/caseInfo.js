// src/data/caseInfo.js
// ALIBI: Rex Talkies Case Data & Timeline

export const caseInfo = {
  title: "THE PROJECTIONIST'S LAST REEL",
  subtitle: "Rex Talkies • Old Delhi • Monsoon Blackout",
  victim: "Harbans Lal (Age 64, Chief Projectionist for 41 years)",
  timeOfDeath: "Estimated between 8:40 PM and 8:50 PM",
  causeOfDeath: "Blunt force trauma to the occipital cranium; possible precursor poisoning",
  weather: "Severe monsoon downpour, Old Delhi grid failure, diesel backup generator struggling",
  overview:
    "At 8:45 PM during the interval reel change of the 1965 film 'Guide', the cinema was plunged into darkness. When the auxiliary generator sputtered back to life, Harbans Lal was found collapsed over the Peerless carbon-arc projector in a pool of blood. The heavy exit doors are chained against the storm. The killer is still inside this auditorium.",
  
  timeline: [
    { time: "07:30 PM", event: "Rex Talkies opens doors for 8:00 PM evening show amidst torrential downpour." },
    { time: "08:00 PM", event: "Screening begins. Raju tears tickets at entrance; Bhola starts boiling tea." },
    { time: "08:15 PM", event: "Bhola serves a cutting chai upstairs to Harbans Lal in the booth." },
    { time: "08:25 PM", event: "Nusrat enters projection booth to calibrate her audio recording equipment." },
    { time: "08:32 PM", event: "Witnesses hear heated argument behind screen regarding cinema demolition deed." },
    { time: "08:42 PM", event: "Raju is observed climbing booth stairs carrying an iron reel case." },
    { time: "08:45 PM", event: "TOTAL BLACKOUT. Projector stops. A heavy metallic thud echoes through hall." },
    { time: "08:52 PM", event: "Emergency auxiliary generator activates with erratic voltage. Body discovered." },
    { time: "09:00 PM", event: "Police investigator locks cinema exits; 5 suspects sequestered in auditorium." }
  ],

  checklist: [
    { id: "c1", label: "Inspect the 5 suspects seated in the theatre stalls", completed: true },
    { id: "c2", label: "Locate the murder weapon used to strike Harbans Lal", completed: false },
    { id: "c3", label: "Determine how the killer accessed the locked projection booth", completed: true },
    { id: "c4", label: "Verify Raju's whereabouts during the 8:45 PM blackout", completed: false },
    { id: "c5", label: "Examine the tampered auxiliary generator voltage dial", completed: false },
    { id: "c6", label: "Uncover the financial motive behind Rex Talkies redevelopment", completed: false }
  ],

  investigatorNotes: [
    "Note 1: The projection booth deadbolt was locked from the outside. Only someone with a key could have struck Harbans and locked him in.",
    "Note 2: Raju smells distinctly of fresh lubricating grease and machine oil, matching the carbon arc projector.",
    "Note 3: Meera Kapoor's designer saree hem is stained with wet coal mud from the boiler room alley.",
    "Note 4: The storm outside has washed out Chandni Chowk road. Backup patrol cannot reach us for at least 45 minutes."
  ]
};
