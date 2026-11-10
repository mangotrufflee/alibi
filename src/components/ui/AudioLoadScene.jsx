import React from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { useGame } from "../../state/GameContext";

export default function AudioLoadScene() {
  const unlockAudio = useGame((s) => s.unlockAudio);

  return (
    <main className="audio-load-scene">
      <div className="audio-load-scene__beam" aria-hidden="true" />
      <motion.button
        type="button"
        className="audio-load-scene__button"
        onClick={unlockAudio}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <Volume2 size={24} aria-hidden="true" />
        <span>Click to Load</span>
        <small>ENABLE SOUND // ENTER REX TALKIES</small>
      </motion.button>
    </main>
  );
}
