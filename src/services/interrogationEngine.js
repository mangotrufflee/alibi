// src/services/interrogationEngine.js
// Suspect Interrogation Intelligence & Dialogue Processing
import { suspects } from "../data/suspects";

// Suspect interrogation patterns & NLP keywords
const SUSPECT_KNOWLEDGE_BASE = {
  raju: {
    name: "Raju Ansari",
    defaultResponse: "Sahab, I'm just a ticket boy! I don't know anything about high-level cinema business or who struck Masterji!",
    triggers: [
      {
        keywords: ["key", "lock", "duplicate", "booth", "deadbolt", "door", "brass"],
        response: "Masterji gave me the spare key yesterday morning! His hands were shivering from malaria chills, and he couldn't turn the heavy iron deadbolt himself. I swear, I never copied it!",
        stressDelta: 18,
        unlockedClue: "Raju admits having physical possession of the projection booth key before the blackout."
      },
      {
        keywords: ["debt", "money", "gamble", "gambling", "4000", "rupee", "cash", "loan"],
        response: "It wasn't gambling debts! My younger sister in Old Delhi needed penicillin for pneumonia! Harbans Masterji was like a father to me—he lent me the four thousand with no interest! Why would I harm him?!",
        stressDelta: 25,
        unlockedClue: "Raju owed Harbans Lal money, but insists it was a benevolent family medical loan."
      },
      {
        keywords: ["8:45", "blackout", "generator", "time", "where", "scream", "thud", "dark"],
        response: "When the lights died, the whole auditorium gasped. I ran to the foyer to light the kerosene hurricane lanterns. Bhola was right there by his stove! You can ask him!",
        stressDelta: 12,
        unlockedClue: "Raju claims Bhola Prasad can corroborate his whereabouts in the concession foyer."
      },
      {
        keywords: ["grease", "oil", "hands", "smell", "machine", "stain"],
        response: "Of course my hands have machine oil! Masterji made me grease the projector sprockets at 7:30 PM before the opening reel of 'Guide'. That doesn't make me a murderer!",
        stressDelta: 15,
        unlockedClue: "Raju's grease stains match the Peerless projector mechanisms."
      },
      {
        keywords: ["clamp", "weapon", "iron", "strike", "head", "blood"],
        response: "The heavy take-up reel clamp?! That stays on the shelf above the carbon arc lamp! Anyone who walked into the booth could have picked it up in the dark!",
        stressDelta: 30,
        unlockedClue: "Raju knows the exact location of the iron reel clamp inside the dark booth."
      }
    ]
  },
  meera: {
    name: "Meera Kapoor",
    defaultResponse: "Inspector, let us not waste each other's time with theatrics. Ask questions grounded in verified fact.",
    triggers: [
      {
        keywords: ["demolition", "sale", "deed", "dlf", "mall", "crore", "money", "18"],
        response: "Single-screen cinema in Old Delhi is a financial corpse. Yes, I signed a preliminary memorandum for redevelopment. Harbans thought he was protecting art; he was merely hoarding bankruptcy.",
        stressDelta: 14,
        unlockedClue: "Meera admits to the 18-crore commercial redevelopment deal that Harbans Lal obstructed."
      },
      {
        keywords: ["lawyer", "office", "phone", "alibi", "call", "blackout"],
        response: "I was on the landline phone with my solicitor, Mr. Chawla, regarding the heritage injunction. When the generator popped, the line went dead. You are welcome to subpoena telephone exchange logs.",
        stressDelta: 10,
        unlockedClue: "Meera claims she was on a landline phone in her ground floor manager's office."
      },
      {
        keywords: ["key", "master", "booth", "desk", "lock"],
        response: "The second master key is supposed to be in my office mahogany desk drawer. Whether someone picked that drawer during interval is something your forensic team should tell me.",
        stressDelta: 20,
        unlockedClue: "Meera's spare office key may have been compromised or accessed."
      },
      {
        keywords: ["mud", "boiler", "coal", "saree", "hem", "alley"],
        response: "...A minor accident. I stepped into the boiler alleyway around 8:20 PM to inspect the roof drainage leak. It rains inside this decrepit cinema as much as it does outside.",
        stressDelta: 28,
        unlockedClue: "Meera's saree coal mud places her directly near the exterior booth fire escape stairwell."
      }
    ]
  },
  arvind: {
    name: "Dr. Arvind Sethi",
    defaultResponse: "Cinema history is written in cellulose and silver halide, Inspector. One must look closely at what is missing from the frame.",
    triggers: [
      {
        keywords: ["print", "pyaasa", "1957", "nitrate", "sell", "collector", "archive", "film"],
        response: "Harbans Lal was systematically peeling vintage prints from the private vaults. The original 1957 negative cans of 'Pyaasa' were replaced with blank lead weight fillers. He had a collector meeting tonight.",
        stressDelta: 16,
        unlockedClue: "Dr. Sethi discovered Harbans Lal was trafficking vintage 35mm nitrate reels."
      },
      {
        keywords: ["canister", "gold", "dubai", "passport", "flight"],
        response: "Four gold biscuits hidden in a Mughal-e-Azam reel can? That explains the nervous phone call I overheard him take behind the confection stall at 8:10 PM.",
        stressDelta: 12,
        unlockedClue: "Dr. Sethi heard Harbans arranging flight departure logistics."
      },
      {
        keywords: ["seat", "alibi", "blackout", "scream", "notes"],
        response: "I never left Seat G-14. When the blackout occurred, the arc extinguished with an unmistakable electric hiss, followed five seconds later by the sound of brass striking bone.",
        stressDelta: 10,
        unlockedClue: "Dr. Sethi heard the murder blow land approximately 5 seconds after the arc extinguished."
      }
    ]
  },
  nusrat: {
    name: "Nusrat Ali",
    defaultResponse: "I am a post-graduate film student from Jamia, not a criminal. Please allow me to call my department head.",
    triggers: [
      {
        keywords: ["audio", "recorder", "mic", "zoom", "h4n", "tape", "recording"],
        response: "Harbans let me clamp my Zoom H4n recorder near the motor drive to capture ambient 35mm flutter. I stepped out to the balcony before the interval! I never wiped those 12 minutes—someone else did!",
        stressDelta: 22,
        unlockedClue: "Nusrat claims an intruder tampered with her audio recorder to erase the 12-minute murder window."
      },
      {
        keywords: ["threat", "whisper", "handover", "stairs", "phone"],
        response: "You listened to the phone memo?! That wasn't me making threats! That was an outside man who cornered Harbans on the mezzanine stairwell at 8:35 PM!",
        stressDelta: 26,
        unlockedClue: "Nusrat heard a mysterious visitor confronting Harbans on the mezzanine."
      },
      {
        keywords: ["washroom", "umbrella", "where", "alibi", "blackout"],
        response: "My umbrella broke in the Chandni Chowk storm. I was inside the ladies' restroom wringing out my cardigan when the lights dipped. Ask the washroom attendant if you don't trust me!",
        stressDelta: 14,
        unlockedClue: "Nusrat's alibi depends on verifying wet clothes and washroom timing."
      }
    ]
  },
  bhola: {
    name: "Bhola Prasad",
    defaultResponse: "Babu ji, tea vendor sees all, speaks little. But Harbans was my brother for thirty-two years in this hall.",
    triggers: [
      {
        keywords: ["tea", "chai", "glass", "datura", "poison", "almond", "dregs"],
        response: "Ram-Ram! Poison in the tea?! Babu ji, I poured Harbans his ginger brew with my own hands at 8:15! But when I took the glass upstairs, Raju was standing right outside the booth door!",
        stressDelta: 24,
        unlockedClue: "Bhola states Raju was lingering near the booth door when the tea was delivered."
      },
      {
        keywords: ["argument", "shout", "quarrel", "screen", "visitor", "man"],
        response: "Between 8:25 and 8:35, someone with heavy boots was cursing at Harbans behind the silver screen. Heavy Punjabi accent. Demanding the signed agreement or else 'this theatre burns tonight'.",
        stressDelta: 18,
        unlockedClue: "Bhola heard an aggressive enforcer threatening to burn the theatre if the agreement wasn't signed."
      },
      {
        keywords: ["token", "brass", "vip", "refill", "17"],
        response: "The brass chai tokens are for special patrons. Only three people had them tonight: Meera Ma'am, the old Professor sahab, and poor Harbans.",
        stressDelta: 10,
        unlockedClue: "Bhola narrows down the brass token ownership to three specific individuals."
      }
    ]
  }
};

export class InterrogationEngine {
  processQuery(suspectId, rawQuery) {
    const suspectData = SUSPECT_KNOWLEDGE_BASE[suspectId] || SUSPECT_KNOWLEDGE_BASE.raju;
    const cleanQuery = (rawQuery || "").toLowerCase();

    // Check for matching triggers
    let bestMatch = null;
    let highestScore = 0;

    for (const trigger of suspectData.triggers) {
      let score = 0;
      for (const kw of trigger.keywords) {
        if (cleanQuery.includes(kw)) {
          score += 1;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = trigger;
      }
    }

    if (bestMatch && highestScore > 0) {
      return {
        matched: true,
        response: bestMatch.response,
        stressDelta: bestMatch.stressDelta,
        unlockedClue: bestMatch.unlockedClue,
        topicId: bestMatch.keywords[0]
      };
    }

    // Fallback response with slight contextual flavor
    return {
      matched: false,
      response: suspectData.defaultResponse,
      stressDelta: 4,
      unlockedClue: null,
      topicId: "general"
    };
  }
}

export const interrogationEngine = new InterrogationEngine();
