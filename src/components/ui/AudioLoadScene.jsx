import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../../state/GameContext";
import { ambientAudio } from "../../services/ambientAudio";

const OPENING_STORY = [
  "REX TALKIES HAS GONE DARK.",
  "THE PROJECTIONIST LIES DEAD BEHIND THE SCREEN.",
  "FIVE WITNESSES REMAIN. NONE ARE CLEAN.",
  "FIND THE TRUTH BEFORE THE LAST REEL ENDS."
].join("\n");

export default function AudioLoadScene() {
  const unlockAudio = useGame((s) => s.unlockAudio);
  const [typedText, setTypedText] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let index = 0;
    let readyTimer;
    ambientAudio.playTyping();
    const typingTimer = window.setInterval(() => {
      index += 1;
      setTypedText(OPENING_STORY.slice(0, index));
      if (index >= OPENING_STORY.length) {
        window.clearInterval(typingTimer);
        ambientAudio.stopTyping();
        readyTimer = window.setTimeout(() => setIsReady(true), 1000);
      }
    }, 32);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(readyTimer);
      ambientAudio.stopTyping();
    };
  }, []);

  return (
    <main className="audio-load-scene" onClick={isReady ? unlockAudio : undefined}>
      <p className="audio-load-scene__story">{typedText}</p>
      {isReady && (
        <motion.button
          type="button"
          className="audio-load-scene__begin"
          onClick={(event) => {
            event.stopPropagation();
            unlockAudio();
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          Click anywhere to begin
        </motion.button>
      )}
    </main>
  );
}
