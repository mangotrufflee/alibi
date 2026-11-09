// src/data/suspects.js
// Rex Talkies, Old Delhi — The 5 Canonical Suspects

export const suspects = {
  raju: {
    id: "raju",
    name: "Raju Ansari",
    role: "Ticket Boy",
    age: 19,
    personality: "Nervous, observant, fast-talking. Fidgets constantly with brass door-key rings.",
    description: "Knows every corridor and crawlspace in Rex Talkies. Admits taking cash to leave the rear staff door unlatched.",
    seat: { row: 2, col: 2, position: [-0.7, 0.4, -4.6] },
    color: "#3772f1",
    silhouette: "young-slim",
    status: "Material Witness",
    initialMotive: "Took money to unlatch the rear staff passage door before the screening.",
    alibi: "Claimed he was in the concession foyer lighting emergency hurricane lanterns near Bhola's stall when the power failed.",
    portrait: "/assets/illustrations/characters/raju-portrait.png",
    model: "/assets/models/characters/raju.glb",
    initialDialogue: "Sahab, I swear on my mother, I didn't touch Masterji! When the lights snapped black, the projector sputtered, and Bhola bhai was right beside me at the tea stove!",
    topics: [
      { id: "back_door", title: "Why was the duplicate back-door key smeared with fresh latch grease?", response: "Someone gave me five hundred rupees to leave the iron door unlatched! They told me it was only for spare valves! I didn't steal anything!" },
      { id: "booth_bell", title: "Did you hear the projection booth bell ring at 9:21 PM?", response: "Yes! At 9:21 PM, right through the generator engine noise, that brass spring bell on Masterji's door rang out sharp!" },
      { id: "blackout_timing", title: "Where were you from 9:17 to 9:32 PM?", response: "In the concession hallway, holding a box of matches and lighting hurricane lanterns. Ask Bhola bhai, he poured me half a glass!" }
    ]
  },

  meera: {
    id: "meera",
    name: "Meera Kapoor",
    role: "Cinema Owner",
    age: 42,
    personality: "Polished, controlled, intimidating. Smokes clove kreteks with an ivory cigarette holder.",
    description: "Inherited Rex Talkies and urgently needs the commercial property sale to proceed, concealing unlisted archival reels from prospective buyers.",
    seat: { row: 2, col: 3, position: [0.7, 0.4, -4.6] },
    color: "#c98282",
    silhouette: "upright-structured",
    status: "Under Investigation",
    initialMotive: "Harbans Lal threatened to expose unlicensed prints and the altered property inspection certificate before the sale was signed.",
    alibi: "Claims she was inside her ground floor manager's office on a landline call with her property solicitor from 9:15 PM onwards.",
    portrait: "/assets/illustrations/characters/meera-portrait.png",
    model: "/assets/models/characters/meera.glb",
    initialDialogue: "Inspector, Harbans was an obstinate projectionist clinging to a dying celluloid era. A tragedy, certainly, but do not mistake cinema melodrama for evidence.",
    topics: [
      { id: "cinema_sale", title: "The impending commercial sale of Rex Talkies", response: "Single-screen cinema in Old Delhi has been bankrupt for a decade. The sale is completely legal, properly filed, and necessary." },
      { id: "ledger_accounts", title: "Harbans Lal's private account ledger page 47", response: "Harbans received routine gratuities for archival maintenance. There were no secret dealings between us." },
      { id: "corridor_movement", title: "Where were you when the film was cut at 9:24 PM?", response: "I was at my mahogany desk attempting to reconnect the dropped telephone line. You have no legal standing to harass me." }
    ]
  },

  arvind: {
    id: "arvind",
    name: "Dr. Arvind Sethi",
    role: "Retired Professor & Regular Patron",
    age: 68,
    personality: "Formal, reflective, deeply possessive of film history. Wears a tweed jacket and carries a leather satchel.",
    description: "Has occupied Seat G-14 for Friday screenings since 1974. Deeply attached to preserving the truth regarding his late sister Zohra's cinematic legacy.",
    seat: { row: 1, col: 2, position: [-0.7, 0.4, -6.1] },
    color: "#9db8a1",
    silhouette: "stooped-elderly",
    status: "Material Witness",
    initialMotive: "Desperate to recover print RT-17-Z to restore his sister Zohra Sen's erased contribution before the cinema is dismantled.",
    alibi: "Claims he never left middle-stall Seat G-14 (Row 7), quietly contemplating cinematographic lighting in the dark.",
    portrait: "/assets/illustrations/characters/arvind-portrait.png",
    model: "/assets/models/characters/arvind.glb",
    initialDialogue: "In cinema noir, Inspector, the projectionist controls what light reveals and what shadow conceals. But cellulose remembers what history attempts to erase.",
    topics: [
      { id: "surviving_print", title: "The three-splice print mounted on the projector", response: "That 35mm print has three visible tape joins spaced at twelve and nineteen millimeters. A unique join signature known only to genuine archivists." },
      { id: "zohra_sen", title: "Who was Zohra Sen and why is her name on catalogue RT-17-Z?", response: "Zohra was... an extraordinary talent whose name commercial cinema chose to forget. Harbans promised her work would not vanish into oblivion." },
      { id: "seat_g14", title: "Did you leave Seat G-14 between 9:19 and 9:25 PM?", response: "I remained seated in the dark, Inspector. At my age, navigating aisle steps in a blackout is a hazardous proposition." }
    ]
  },

  nusrat: {
    id: "nusrat",
    name: "Nusrat Ali",
    role: "Film Student (Jamia Millia)",
    age: 23,
    personality: "Sharp, attentive, guarded. Grips her phone and canvas tote bag defensively.",
    description: "Documenting Rex Talkies' final days for her thesis, secretly searching for physical proof of her mother's erased cinematic contributions.",
    seat: { row: 1, col: 3, position: [0.7, 0.4, -6.1] },
    color: "#6fa6b0",
    silhouette: "young-profile",
    status: "Person of Interest",
    initialMotive: "Entered the projection booth without permission to photograph the splice pattern and archival notes proving her mother's work.",
    alibi: "Claims she was in the ladies' washroom wringing out her wet umbrella and sweater when the lights died.",
    portrait: "/assets/illustrations/characters/nusrat-portrait.png",
    model: "/assets/models/characters/nusrat.glb",
    initialDialogue: "I was only recording documentary Foley and projector beam flutter for my university dissertation. I had nothing to do with what happened to Masterji.",
    topics: [
      { id: "phone_recording", title: "Why is there a 58-second gap in your video file at 9:22 PM?", response: "My storage buffer lagged during the power surge! The phone stopped recording when the voltage dipped, that's all!" },
      { id: "booth_access", title: "Were you inside the projection booth earlier tonight?", response: "Harbans let me glance at the carbon arc lamp before the show started. I didn't touch anything on the rewind table!" },
      { id: "mother_credit", title: "What note were you trying to photograph on the print reel?", response: "My mother gave three years of her youth to these films without screen credit. I wanted proof before the projectors were scrapped!" }
    ]
  },

  bhola: {
    id: "bhola",
    name: "Bhola Prasad",
    role: "Cinema Chaiwala",
    age: 56,
    personality: "Warm, watchful, respectful. Smells of crushed cardamom and kerosene.",
    description: "Has poured cutting chai inside Rex Talkies for 41 years. Sees and hears everything that passes through the corridors.",
    seat: { row: 0, col: 2, position: [-0.7, 0.4, -7.6] },
    color: "#2255c3",
    silhouette: "broad-seated",
    status: "Key Eyewitness",
    initialMotive: "None. Harbans was his closest friend and brother in the cinema for over four decades.",
    alibi: "Was tending the coal samovar near the side aisle entrance, sheltering from the ceiling leaks during the storm.",
    portrait: "/assets/illustrations/characters/bhola-portrait.png",
    model: "/assets/models/characters/bhola.glb",
    initialDialogue: "Babu ji, forty-one years I carried tea upstairs to Harbans. In the dark of Rex Talkies, people forget that tea vendors have ears as sharp as cinema horns.",
    topics: [
      { id: "booth_bell_time", title: "What sounds did you hear from the projection gallery at 9:21 PM?", response: "The brass bell on the booth door rang at 9:21 PM sharp. Two minutes later, a dull heavy thud like a roll of carpet dropping. Then footsteps at 9:29 PM." },
      { id: "tea_delivery", title: "Did you deliver cutting chai to Harbans tonight?", response: "At 9:10 PM I brought two hot glasses up. Harbans was inspecting the take-up reel under his green desk lamp, perfectly hale and hearty." },
      { id: "paper_token", title: "The paid paper token #026 inside your tea tin", response: "Show me that token and you will have every word I know. I gave token twenty-six to Harbans with my own hands." }
    ]
  }
};
