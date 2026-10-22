// src/data/evidence.js
// Evidence items for ALIBI — The Murder of Harbans Lal

export const initialEvidenceItems = [
  {
    id: "ticket_stub",
    name: "Punched Ticket Stub #409",
    category: "Physical Evidence",
    location: "Row 2 Armrest (Next to Raju)",
    inScene: true,
    scenePosition: [-1.4, 0.65, -4.6],
    sceneRotation: [0, 0.4, 0],
    placeholderType: "ticket",
    discovered: true,
    description: "A vintage cardboard admission ticket for Rex Talkies' 8:00 PM screening. A peculiar double triangular notch is hand-punched on the bottom edge.",
    clue: "Double-notch punches were strictly reserved for complimentary staff access, not general admission.",
    inspectionDetails: [
      "Starch-treated rough newsprint cardboard, ink stamped 'REX TALKIES BALCONY RS. 12/-'.",
      "Noticeable smudge of fresh black carbon graphite on the verso side.",
      "The triangular punch cutter matches Harbans Lal's personal inspection tool."
    ],
    model: "/assets/models/evidence/ticket-stub.glb",
    image: "/assets/illustrations/evidence/ticket-stub.png"
  },
  {
    id: "duplicate_key",
    name: "Duplicate Projection Booth Key",
    category: "Physical Evidence",
    location: "Aisle Carpet under Seat D-4",
    inScene: true,
    scenePosition: [-0.2, 0.05, -5.3],
    sceneRotation: [Math.PI / 2, 0, 0.8],
    placeholderType: "key",
    discovered: true,
    description: "A heavy brass key cut crudely on a hand grinder. Stamped with 'P-1'. Fresh metal burrs on the teeth indicate it was cut within the last 48 hours.",
    clue: "Harbans Lal swore only two master keys existed — one in his pocket, and one locked in Meera Kapoor's desk.",
    inspectionDetails: [
      "Rough filing marks on the barrel shaft — freshly duplicated at an Old Delhi roadside locksmith.",
      "Stained with synthetic machine oil from the projector gearbox.",
      "Small piece of yellow tailor's chalk stuck in the bow hole."
    ],
    model: "/assets/models/evidence/duplicate-key.glb",
    image: "/assets/illustrations/evidence/duplicate-key.png"
  },
  {
    id: "cutting_chai_glass",
    name: "Tempered Tea Glass & Dregs",
    category: "Physical Evidence",
    location: "Low Stool near Aisle Exit",
    inScene: true,
    scenePosition: [2.8, 0.4, -3.2],
    sceneRotation: [0, 0, 0],
    placeholderType: "glass",
    discovered: true,
    description: "A traditional flared cutting chai tumbler with cloudy residue at the bottom and a faint scent of bitter almonds beneath sweet cardamom.",
    clue: "Chemical residue indicates crushed Datura or chloral hydrate dissolved into the tea.",
    inspectionDetails: [
      "Glass bears grease smudges on the rim from oily fingers.",
      "Sediment does not dissolve in lukewarm liquid — foreign powder was introduced after pouring.",
      "The tea was poured from Bhola's brass samovar around 8:15 PM."
    ],
    model: "/assets/models/evidence/tea-glass.glb",
    image: "/assets/illustrations/evidence/tea-glass.png"
  },
  {
    id: "maintenance_log",
    name: "Projector Maintenance Logbook",
    category: "Documents",
    location: "Screen Edge Pedestal",
    inScene: true,
    scenePosition: [-3.8, 0.75, -10.5],
    sceneRotation: [0, -0.3, 0],
    placeholderType: "ledger",
    discovered: true,
    description: "Hardbound cloth register with grease-stained corners. The entry for tonight's 8:30 PM reel change is scrawled in urgent red ink: 'GEARBOX TAMPERED. DO NOT RUN REEL 4.'",
    clue: "The warning entry was signed by Harbans Lal at 8:22 PM — exactly 23 minutes before the generator failed.",
    inspectionDetails: [
      "Torn corner on page 142 corresponds to a scrap found in Meera's briefcase.",
      "Spatter of dry ink from a fountain pen dropped abruptly.",
      "Indentation on previous page reads: 'Payment promised via Daryaganj hawala'."
    ],
    model: "/assets/models/evidence/maintenance-log.glb",
    image: "/assets/illustrations/evidence/maintenance-log.png"
  },
  {
    id: "film_strip",
    name: "Three-Splice 35mm Film Strip",
    category: "Technical Evidence",
    location: "Near Front Stage Edge",
    inScene: true,
    scenePosition: [0.6, 0.15, -11.0],
    sceneRotation: [0, 1.2, 0],
    placeholderType: "filmstrip",
    discovered: true,
    description: "A severed loop of celluloid from tonight's screening. Three crude tape splices join completely different reels together.",
    clue: "Between the film frames, a hand-written code 'DLF-774-DEMO' is scratched into the emulsion.",
    inspectionDetails: [
      "Acetate safety base film, high-speed black and white emulsion.",
      "Fresh acetone film cement smell lingering on the splice joints.",
      "Scratched sprocket holes suggest the film was forced backwards through the gate."
    ],
    model: "/assets/models/evidence/film-strip.glb",
    image: "/assets/illustrations/evidence/film-strip.png"
  },
  {
    id: "generator_gauge",
    name: "Overloaded Generator Voltage Dial",
    category: "Technical Evidence",
    location: "Booth Back Wall Panel",
    inScene: false,
    placeholderType: "gauge",
    discovered: false,
    description: "The auxiliary diesel generator voltage meter needle is bent at 380V. The fuse bypass jumper wire is melted into the Bakelite casing.",
    clue: "Someone deliberately shoved a copper welding rod into the fuse bank to trigger an instant blackout at the interval.",
    inspectionDetails: [
      "Burnt copper terminal screws with pliers grip scratches.",
      "Soot pattern proves the short circuit originated inside the theatre, not the municipal power grid."
    ],
    model: "/assets/models/evidence/generator-gauge.glb",
    image: "/assets/illustrations/evidence/generator-gauge.png"
  },
  {
    id: "sale_ledger",
    name: "Rex Talkies Private Sale Deed",
    category: "Documents",
    location: "Office Drawer",
    inScene: false,
    placeholderType: "ledger",
    discovered: false,
    description: "Draft agreement of sale transferring Rex Talkies land to a commercial mall consortium for 18 Crore rupees, pending vacant possession.",
    clue: "Clause 9 stipulates: 'Sale void if historical heritage status is filed before midnight, Oct 22.'",
    inspectionDetails: [
      "Signed by Meera Kapoor and initialed by Delhi Heritage Council inspectors.",
      "Harbans Lal's counter-injunction petition copy attached with judicial stamp."
    ],
    model: "/assets/models/evidence/sale-ledger.glb",
    image: "/assets/illustrations/evidence/sale-ledger.png"
  },
  {
    id: "film_canister",
    name: "Heavy 35mm Canister with Forged Label",
    category: "Physical Evidence",
    location: "Projection Booth Rack",
    inScene: false,
    placeholderType: "canister",
    discovered: false,
    description: "A galvanized iron film can labeled 'MUGHAL-E-AZAM REEL 6'. Inside, instead of film, are 4 wrapped gold biscuits and duplicate passport photos.",
    clue: "Harbans Lal was planning to leave for Dubai on the midnight flight from Palam airport.",
    inspectionDetails: [
      "Customs inspection seal dated 1989 on underside.",
      "Weighs nearly 4 kilograms more than a standard 2000ft reel."
    ],
    model: "/assets/models/evidence/film-canister.glb",
    image: "/assets/illustrations/evidence/film-canister.png"
  },
  {
    id: "nusrat_phone",
    name: "Nusrat's Mobile Phone",
    category: "Digital Evidence",
    location: "Left Aisle Seat Pocket",
    inScene: false,
    placeholderType: "phone",
    discovered: false,
    description: "A smartphone with a cracked screen. The voice recorder app is paused at 00:43:12 with an active file titled 'REX_BOOTH_FINAL.wav'.",
    clue: "The final 8 seconds of audio record a whispered threat: 'Sign the handover or you won't walk down those stairs.'",
    inspectionDetails: [
      "Screen illuminated with 14 missed calls from 'Papa (Law Office)'.",
      "Bluetooth audio feed was actively transmitting to an external headphone."
    ],
    model: "/assets/models/evidence/phone.glb",
    image: "/assets/illustrations/evidence/phone.png"
  },
  {
    id: "reel_clamp",
    name: "Heavy Cast-Iron Reel Clamp",
    category: "Weapons / Trauma",
    location: "Projection Booth Floor",
    inScene: false,
    placeholderType: "clamp",
    discovered: false,
    description: "A two-pound brass-and-iron spindle clamp used to lock 35mm take-up reels. The hexagonal nut shows blunt impact denting and microscopic blood traces.",
    clue: "The primary murder weapon used to strike Harbans Lal from behind.",
    inspectionDetails: [
      "Knurled brass knob smeared with grease and a partial thumbprint.",
      "Matches the blunt cranial depression documented by the police surgeon."
    ],
    model: "/assets/models/evidence/reel-clamp.glb",
    image: "/assets/illustrations/evidence/reel-clamp.png"
  },
  {
    id: "bhola_token",
    name: "Brass Chai Token #17",
    category: "Physical Evidence",
    location: "Stairwell Landing",
    inScene: false,
    placeholderType: "token",
    discovered: false,
    description: "An octagonal brass token stamped 'BHOLA CHAI - REX'. Stamped tokens are given to VIP cinema patrons for unlimited refills.",
    clue: "Only three such brass tokens were handed out tonight: to Meera, Dr. Sethi, and the projectionist.",
    inspectionDetails: [
      "Scratched with roman numeral 'III' on the reverse.",
      "Smells faintly of kerosene fuel."
    ],
    model: "/assets/models/evidence/token.glb",
    image: "/assets/illustrations/evidence/token.png"
  },
  {
    id: "bell_cord",
    name: "Frayed Projection Bell Pull-Cord",
    category: "Physical Evidence",
    location: "Balcony Wall",
    inScene: false,
    placeholderType: "cord",
    discovered: false,
    description: "Braided hemp cord once used to signal the projectionist from the box office. Cleanly sliced with a razor-sharp box cutter.",
    clue: "Severed so Harbans Lal could not ring the emergency alarm to the lobby during the assault.",
    inspectionDetails: [
      "Clean 45-degree angle cut through 12mm braided jute rope.",
      "Fine traces of yellow packaging twine fibers on the blade shear."
    ],
    model: "/assets/models/evidence/bell-cord.glb",
    image: "/assets/illustrations/evidence/bell-cord.png"
  }
];
