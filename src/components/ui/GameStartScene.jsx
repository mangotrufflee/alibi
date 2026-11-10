import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useGame } from "../../state/GameContext";

const OLD_THEATRE_IMAGE_URL =
  "https://www.bengalfilmarchive.com/images/our-film/DSC_7557.jpg";

export default function GameStartScene() {
  const startGame = useGame((s) => s.startGame);
  const [isLaunching, setIsLaunching] = useState(false);

  const launchGame = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    window.setTimeout(startGame, 520);
  };

  return (
    <main
      className="game-start-scene"
      style={{ "--start-scene-image": `url("${OLD_THEATRE_IMAGE_URL}")` }}
    >
      <motion.div
        className="game-start-scene__backdrop"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: isLaunching ? 0 : 1, scale: isLaunching ? 1.18 : 1.03 }}
        transition={{ duration: isLaunching ? 0.5 : 1.4, ease: "easeOut" }}
      />
      <div className="game-start-scene__grain" aria-hidden="true" />
      <motion.div
        className="game-start-scene__projector-beam"
        aria-hidden="true"
        initial={{ opacity: 0, scaleX: 0.2, x: "-50%" }}
        animate={{ opacity: isLaunching ? 0 : 1, scaleX: 1, x: "-50%" }}
        transition={{ delay: 0.35, duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="game-start-scene__projector-flare"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.25, x: "-50%" }}
        animate={{ opacity: isLaunching ? 0 : [0.72, 1, 0.72], scale: isLaunching ? 1.4 : [0.9, 1.1, 0.9], x: "-50%" }}
        transition={{ delay: 0.6, duration: isLaunching ? 0.4 : 2.8, repeat: isLaunching ? 0 : Infinity, ease: "easeInOut" }}
      />

      <motion.section
        className="game-start-scene__content"
        aria-labelledby="game-start-title"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={isLaunching ? { opacity: 0, y: -18, scale: 1.04 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: isLaunching ? 0 : 0.42, duration: isLaunching ? 0.4 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="game-start-scene__eyebrow"
          initial={{ opacity: 0, letterSpacing: "0.48em" }}
          animate={{ opacity: 1, letterSpacing: "0.22em" }}
          transition={{ delay: 0.72, duration: 0.8 }}
        >
          REX TALKIES // OLD DELHI
        </motion.p>
        <h1 id="game-start-title" className="game-start-scene__title" aria-label="ALIBI">
          {"ALIBI".split("").map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              className="game-start-scene__title-letter"
              initial={{ opacity: 0, y: 58, rotateX: -78 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.72 + index * 0.1, duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="game-start-scene__subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.28, duration: 0.5 }}
        >
          A Noir Voice Interrogation
        </motion.p>
        <motion.button
          type="button"
          className="game-start-scene__button"
          onClick={launchGame}
          disabled={isLaunching}
          initial={{ opacity: 0, y: 18, scale: 0.86 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.45, duration: 0.5, type: "spring", stiffness: 270, damping: 18 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <Play size={17} fill="currentColor" aria-hidden="true" />
          {isLaunching ? "Entering Theatre..." : "Start Game"}
        </motion.button>
      </motion.section>

      <motion.p
        className="game-start-scene__caption"
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: isLaunching ? 0 : 1, x: 0 }}
        transition={{ delay: 1.7, duration: 0.5 }}
      >
        THE LAST SHOW BEGINS IN THE DARK
      </motion.p>
    </main>
  );
}
