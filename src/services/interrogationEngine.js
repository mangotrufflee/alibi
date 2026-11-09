// src/services/interrogationEngine.js
// Canonical Interrogation Intelligence & Suspect Response Triggers

const SUSPECT_KNOWLEDGE_BASE = {
  raju: {
    name: "Raju Ansari",
    defaultResponse:
      "Sahab, I'm just the ticket boy! I don't know high-level cinema business or what happened in the booth!",
    triggers: [
      {
        keywords: ["key", "lock", "duplicate", "back door", "deadbolt", "door", "brass", "chabi"],
        response:
          "Someone gave me five hundred rupees to leave the back staff passage unlatched before the show! They told me it was only for delivery of sound equipment. I swear on my mother, I never copied it!",
        stressDelta: 18,
        unlockedClue: "Raju admits leaving the rear staff passage unlatched after receiving cash."
      },
      {
        keywords: ["bell", "ring", "9:21", "ghanti", "chime", "sound"],
        response:
          "Yes! At 9:21 PM, right over the generator drone, that brass spring bell on Masterji's booth door rang out! Someone pushed that door open!",
        stressDelta: 15,
        unlockedClue: "Raju corroborates the projection booth door opened at 9:21 PM."
      },
      {
        keywords: ["8:45", "9:17", "9:32", "blackout", "generator", "time", "where", "dark", "lantern"],
        response:
          "When the lights died at 9:17 PM, the whole hall gasped. I ran to the foyer to light the hurricane lanterns. Bhola bhai was right there by his stove! You can ask him!",
        stressDelta: 10,
        unlockedClue: "Raju claims Bhola Prasad can corroborate his whereabouts in the concession foyer."
      },
      {
        keywords: ["grease", "oil", "latch", "hands", "stain"],
        response:
          "The grease on that key matches the heavy booth latch. Whoever took it from under the blotter used it to get through the corridor unnoticed!",
        stressDelta: 16,
        unlockedClue: "Duplicate key grease connects directly to the projection booth door latch."
      },
      {
        keywords: ["clamp", "weapon", "rail", "strike", "blood"],
        response:
          "The heavy reel clamp?! That stays on the take-up spindle shelf above the rewind table! Anyone who entered the booth could have grabbed it!",
        stressDelta: 22,
        unlockedClue: "Raju confirms the reel clamp was kept on the take-up spindle shelf."
      }
    ]
  },

  meera: {
    name: "Meera Kapoor",
    defaultResponse:
      "Inspector, let us not waste time with baseless theatrics. Ask questions grounded in verified fact.",
    triggers: [
      {
        keywords: ["ledger", "page 47", "payment", "october", "h lal", "18,500", "6,000", "advance"],
        response:
          "Harbans threatened to bring private records before the municipal board! Yes, I paid him eighteen thousand on the fourteenth, and six thousand on the sixteenth to keep the inventory quiet until the deed was executed!",
        stressDelta: 24,
        unlockedClue: "Meera admits to October ledger payments to delay Harbans' inventory disclosure."
      },
      {
        keywords: ["sale", "deed", "developer", "transfer", "certificate", "inspection", "inventory"],
        response:
          "Single-screen cinema is a financial corpse. The property inspection certificate required a cleared inventory. If Harbans revealed the unlicensed prints, the entire transaction would collapse!",
        stressDelta: 20,
        unlockedClue: "Meera admits the altered property inspection certificate was contingent on unlisted prints."
      },
      {
        keywords: ["corridor", "video", "bangles", "footage", "phone", "alibi", "9:26"],
        response:
          "That phone video... A silhouette in a corridor proves nothing! Rex Talkies is full of shadows during a blackout!",
        stressDelta: 28,
        unlockedClue: "Nusrat's 9:26 PM phone footage shatters Meera's manager's office alibi."
      },
      {
        keywords: ["cut", "film cut", "shears", "manual", "9:24", "malfunction", "staged"],
        response:
          "The maintenance log says the motor stopped at 9:19 PM... If the film was sliced at 9:24 PM, that is... a matter for mechanical technicians, not homicide investigators!",
        stressDelta: 30,
        unlockedClue: "Evidence establishes the 35mm film was cut manually 5 minutes after the projector motor stopped."
      },
      {
        keywords: ["clamp", "rail", "struggle", "fall", "harbans", "struck"],
        response:
          "He grabbed the ledger sheet! He was going to burn it! It was an argument, nothing more! No one intended for him to fall!",
        stressDelta: 35,
        unlockedClue: "Meera admits to a physical struggle with Harbans near the booth safety rail."
      }
    ]
  },

  arvind: {
    name: "Dr. Arvind Sethi",
    defaultResponse:
      "Cinema history is written in cellulose and silver halide, Inspector. One must look closely at what is missing from the frame.",
    triggers: [
      {
        keywords: ["zohra", "zohra sen", "sister", "credit", "uncredited", "acknowledgement"],
        response:
          "Zohra Sen gave her youth, her vision, and her health to that 1968 film! The studio producers erased her name from the print. Harbans found the original reel RT-17-Z and promised her name would be screened tonight!",
        stressDelta: 25,
        unlockedClue: "Dr. Sethi reveals print RT-17-Z holds the uncredited work of his late sister Zohra Sen."
      },
      {
        keywords: ["canister", "label", "replacement", "rt-archive", "general stock", "rt-17-z"],
        response:
          "The replacement label reading 'RT-ARCHIVE / GENERAL STOCK' was pasted over the true code. Someone wanted that reel to disappear into commercial liquidation!",
        stressDelta: 22,
        unlockedClue: "The film canister label was deliberately replaced to conceal its archival value."
      },
      {
        keywords: ["splice", "three splices", "12mm", "19mm", "film strip", "joins"],
        response:
          "Three tape joins with exactly twelve and nineteen millimeter spacing! That was my sister's personal splicing signature from the vintage studio cutting room!",
        stressDelta: 20,
        unlockedClue: "The three-splice strip pattern uniquely identifies the surviving print tied to Zohra."
      },
      {
        keywords: ["reel movement", "9:21", "motor", "spindle", "log"],
        response:
          "At 9:21 PM the motor was dead, yet the take-up spindle was turned by hand... I knew that reel could not be replaced. If commercial scavengers took it, it would be melted for scrap!",
        stressDelta: 26,
        unlockedClue: "Log confirms manual reel movement at 9:21 PM during the blackout."
      },
      {
        keywords: ["seat", "alibi", "g14", "dark", "booth"],
        response:
          "I wanted to protect that reel, Inspector! When the power died, I could not bear to see Zohra's legacy destroyed. But Harbans refused to let me take it!",
        stressDelta: 32,
        unlockedClue: "Dr. Sethi admits he confronted Harbans in the booth over the possession of the print."
      }
    ]
  },

  nusrat: {
    name: "Nusrat Ali",
    defaultResponse:
      "I am a post-graduate film student from Jamia, not a criminal. Please allow me to call my department head.",
    triggers: [
      {
        keywords: ["gap", "58 seconds", "recording", "rex_1710", "video", "missing", "trimmed"],
        response:
          "Fine! Look at the timestamp! Fifty-eight seconds missing from 9:22:10 to 9:23:08 PM! Because I was inside the booth! I was filming the splice note and I panicked when the lights failed!",
        stressDelta: 28,
        unlockedClue: "Nusrat admits deleting the 58 seconds on her phone because she was inside the booth."
      },
      {
        keywords: ["dust", "film dust", "phone case", "casing", "particles"],
        response:
          "The film dust on my phone case... I leaned over the rewind table to take macro photographs of the splice joint! I didn't touch the reel clamp to hurt anyone!",
        stressDelta: 24,
        unlockedClue: "Film dust inside Nusrat's phone case proves direct physical contact with the reel."
      },
      {
        keywords: ["mother", "credit", "note", "notes", "archive", "thesis", "proof", "photograph", "reel"],
        response:
          "My mother worked uncredited in the sound mixing rooms of Rex Talkies for three years. Harbans had her original handwritten cue notes in that booth! I had to document them!",
        stressDelta: 20,
        unlockedClue: "Nusrat entered the booth to retrieve proof of her mother's erased cinema contributions."
      },
      {
        keywords: ["booth", "inside", "glance", "carbon", "arc lamp", "lamp", "rewind table", "access", "earlier"],
        response:
          "Harbans let me glance at the carbon arc lamp before the show started! He was proud of the vintage machinery. I didn't touch anything on the rewind table!",
        stressDelta: 18,
        unlockedClue: "Nusrat admits being inside the projection booth before the blackout."
      },
      {
        keywords: ["clamp", "wrist", "grabbed", "shove", "rail", "fall"],
        response:
          "He grabbed my wrist in the dark! I was terrified! I jerked backward and shoved him away—he lost balance and hit the railing! It was an accident! I froze and ran!",
        stressDelta: 35,
        unlockedClue: "Nusrat confesses Harbans grabbed her wrist and her shove caused his fatal fall against the rail."
      },
      {
        keywords: ["washroom", "alibi", "umbrella", "restroom"],
        response:
          "I made up the broken umbrella excuse because I was terrified of being expelled from university and charged with trespassing!",
        stressDelta: 16,
        unlockedClue: "Nusrat admits her washroom alibi was completely fabricated."
      }
    ]
  },

  bhola: {
    name: "Bhola Prasad",
    defaultResponse:
      "Babu ji, tea vendor sees all, speaks little. But Harbans was my brother for forty-one years in this hall.",
    triggers: [
      {
        keywords: ["token", "026", "paper token", "tea tin", "paid"],
        response:
          "You found my token... Token twenty-six. Harbans put it in my tea tin at 9:10 PM with his own hands. That token means you seek the honest truth, Babu ji.",
        stressDelta: 10,
        unlockedClue: "Bhola's paper token unlocks his complete trust and eyewitness testimony."
      },
      {
        keywords: ["bell", "9:21", "sound", "chime", "door"],
        response:
          "At 9:21 PM, right when the generator pitch changed, the spring bell on the booth door chimed clear as temple brass. Someone opened that door!",
        stressDelta: 12,
        unlockedClue: "Bhola heard the booth door bell ring at exactly 9:21 PM."
      },
      {
        keywords: ["footsteps", "9:29", "steps", "glass", "corridor", "clink"],
        response:
          "At 9:29 PM, I heard hurried wet soles coming down the staff corridor. And then the sharp clink of a tea glass being set down on the passage stool.",
        stressDelta: 14,
        unlockedClue: "Bhola heard hurried footsteps and a glass set down near the staff passage at 9:29 PM."
      },
      {
        keywords: ["tea delivery", "9:10", "upstairs", "cutting chai"],
        response:
          "I took two hot glasses up at 9:10 PM. Harbans had his green desk lamp on and was inspecting the take-up spindle. Perfectly alive and calm.",
        stressDelta: 10,
        unlockedClue: "Bhola confirms Harbans Lal was alive and inspecting reels at 9:10 PM."
      }
    ]
  }
};

export class InterrogationEngine {
  processQuery(suspectId, rawQuery) {
    const suspectData = SUSPECT_KNOWLEDGE_BASE[suspectId] || SUSPECT_KNOWLEDGE_BASE.raju;
    const cleanQuery = (rawQuery || "").toLowerCase();

    for (const trigger of suspectData.triggers) {
      const match = trigger.keywords.some((kw) => cleanQuery.includes(kw.toLowerCase()));
      if (match) {
        return {
          response: trigger.response,
          stressDelta: trigger.stressDelta,
          unlockedClue: trigger.unlockedClue
        };
      }
    }

    return {
      response: suspectData.defaultResponse,
      stressDelta: 4,
      unlockedClue: null
    };
  }
}

export const interrogationEngine = new InterrogationEngine();

export { getCanonicalAnswer, getQuestion, QUESTION_DATABASE } from "../data/questionDatabase.js";
