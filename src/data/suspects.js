// src/data/suspects.js
// Rex Talkies, Old Delhi — The 5 Suspects

export const suspects = {
  raju: {
    id: "raju",
    name: "Raju Ansari",
    role: "Ticket Boy",
    age: 19,
    personality: "Nervous, observant, fast-talking. Fidgets constantly with brass door-key rings.",
    description: "Knows every crawlspace in Rex Talkies. He was seen rushing down from the projection booth stairs right before the power cut.",
    seat: { row: 2, col: 2, position: [-0.7, 0.4, -4.6] },
    color: "#e2b170", // warm amber accent
    silhouette: "young-slim",
    status: "Primary Suspect",
    initialMotive: "Owed Harbans Lal two months of gambling debts; found with a duplicate booth key.",
    alibi: "Claimed he was changing carbon reels in the ground floor storage closet when the scream happened.",
    portrait: "/assets/illustrations/characters/raju-portrait.png",
    model: "/assets/models/characters/raju.glb",
    initialDialogue: "Sahab, I swear on my mother, I didn't touch Masterji! The lights went black, the projector sputtered, and then... a thud like a sack of grain dropping upstairs.",
    topics: [
      { id: "booth_key", title: "Why do you have Harbans Lal's spare booth key?", response: "Masterji gave it to me yesterday! He said his hands were shaking too much from fever to turn the heavy brass deadbolt." },
      { id: "gambling", title: "Word is you owed Harbans Lal 4,000 rupees.", response: "It wasn't gambling! It was medicine money for my sister! Masterji wasn't cruel like Meera Ma'am says." },
      { id: "interval_blackout", title: "Where were you during the 8:45 PM blackout?", response: "In the concession hallway, lighting the emergency hurricane lantern. Ask Bhola bhai, he was brewing chai right there!" }
    ]
  },
  meera: {
    id: "meera",
    name: "Meera Kapoor",
    role: "Cinema Owner",
    age: 42,
    personality: "Polished, controlled, intimidating. Smokes clove kreteks with an ivory cigarette holder.",
    description: "Inherited Rex Talkies from her late father. The single-screen is bleeding money and facing demolition for a shopping complex.",
    seat: { row: 2, col: 3, position: [0.7, 0.4, -4.6] },
    color: "#c98282", // muted burgundy
    silhouette: "upright-structured",
    status: "Under Investigation",
    initialMotive: "Harbans Lal was the sole holdout tenant union rep blocking the sale deed of Rex Talkies.",
    alibi: "Was on a landline call with her property lawyer in the manager's office when the generator tripped.",
    portrait: "/assets/illustrations/characters/meera-portrait.png",
    model: "/assets/models/characters/meera.glb",
    initialDialogue: "Inspector, Harbans was a relic who refused to modernize. Tragic, yes, but do not mistake cinema melodrama for evidence.",
    topics: [
      { id: "demolition", title: "The redevelopment contract with DLF promoters", response: "Business is business. Rex Talkies has not turned a profit since multiplexes opened in Saket." },
      { id: "insurance", title: "The 50-lakh insurance policy on equipment", response: "Standard commercial coverage. Any sensible proprietor protects their capital." }
    ]
  },
  arvind: {
    id: "arvind",
    name: "Dr. Arvind Sethi",
    role: "Retired Professor & Regular Patron",
    age: 68,
    personality: "Formal, reflective, difficult to read. Wears tweed jacket and carries a worn leather satchel.",
    description: "Has occupied Seat G-14 for Friday matinees since 1974. Possesses an encyclopedic memory of Hindi cinema archives.",
    seat: { row: 1, col: 2, position: [-0.7, 0.4, -6.1] },
    color: "#9db8a1", // sage muted
    silhouette: "stooped-elderly",
    status: "Material Witness",
    initialMotive: "Discovered Harbans Lal was secretly selling rare 35mm nitrate prints to illicit international collectors.",
    alibi: "Sat in his usual middle-stall seat taking analytical notes on Guru Dutt's lighting techniques.",
    portrait: "/assets/illustrations/characters/arvind-portrait.png",
    model: "/assets/models/characters/arvind.glb",
    initialDialogue: "In cinema noir, Inspector, the projectionist is the one who controls what light reveals and what shadow conceals. Harbans Lal knew too much.",
    topics: [
      { id: "missing_prints", title: "The missing 1957 print of Pyaasa", response: "Harbans spoke to someone in Bombay three nights ago. He was terrified. That film can never be replaced." }
    ]
  },
  nusrat: {
    id: "nusrat",
    name: "Nusrat Ali",
    role: "Film Student (Jamia Millia)",
    age: 23,
    personality: "Sharp, attentive, guarded. Constantly checking her mobile phone and gripping a tote bag.",
    description: "Was recording audio of the vintage projector for her master's thesis on Delhi's disappearing mechanical soundscapes.",
    seat: { row: 1, col: 3, position: [0.7, 0.4, -6.1] },
    color: "#6fa6b0", // cold teal
    silhouette: "young-profile",
    status: "Person of Interest",
    initialMotive: "Her Zoom H4n audio recorder was found unplugged inside the projection booth with 12 minutes deleted.",
    alibi: "Claimed she was in the ladies' washroom fixing her wet umbrella when the power failed.",
    portrait: "/assets/illustrations/characters/nusrat-portrait.png",
    model: "/assets/models/characters/nusrat.glb",
    initialDialogue: "I was only recording ambient Foley tracks for my college project. I never went past the private curtain, I swear.",
    topics: [
      { id: "audio_recorder", title: "Why was your audio recorder found beside the corpse?", response: "Harbans let me leave it on the carbon arc housing to capture the motor drone. I didn't touch it after interval!" }
    ]
  },
  bhola: {
    id: "bhola",
    name: "Bhola Prasad",
    role: "Cinema Chaiwala",
    age: 56,
    personality: "Warm, watchful, locally familiar. Smells of crushed cardamom and kerosene.",
    description: "Has poured cutting chai inside Rex Talkies for 32 years. Sees everyone who enters or exits the dark hall.",
    seat: { row: 0, col: 2, position: [-0.7, 0.4, -7.6] },
    color: "#c29d66", // warm brass
    silhouette: "broad-seated",
    status: "Key Eyewitness",
    initialMotive: "Overheard a violent argument between Harbans Lal and an unidentified visitor behind the screen.",
    alibi: "Was stoking the coal samovar near the side aisle entrance, sheltering from the leaking ceiling.",
    portrait: "/assets/illustrations/characters/bhola-portrait.png",
    model: "/assets/models/characters/bhola.glb",
    initialDialogue: "Babu ji, thirty-two years I gave tea to Harbans. In the dark of Rex Talkies, people forget that tea vendors have ears as sharp as cinema horns.",
    topics: [
      { id: "screen_argument", title: "Who was shouting behind the screen at 8:30 PM?", response: "A deep voice, wearing heavy rubber boots. Sounded like someone from the municipal water board, or... Meera Sahiba's chauffeur." }
    ]
  }
};
