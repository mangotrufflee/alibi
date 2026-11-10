import React, { useEffect, useState } from "react";
import { useGame } from "../../state/GameContext";
import { ambientAudio } from "../../services/ambientAudio";

const BRIEFING =
  "Select a suspect to begin questioning. Follow the evidence, test each alibi, and open Case Files whenever a lead emerges.";

export default function OpeningInstructionOverlay() {
  const isOpeningCameraPanComplete = useGame((s) => s.isOpeningCameraPanComplete);
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!isOpeningCameraPanComplete) {
      setVisible(false);
      setTypedText("");
      return undefined;
    }

    setVisible(true);
    let characterIndex = 0;
    ambientAudio.playTyping();
    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setTypedText(BRIEFING.slice(0, characterIndex));
      if (characterIndex >= BRIEFING.length) {
        window.clearInterval(typingTimer);
        ambientAudio.stopTyping();
      }
    }, 18);
    const dismissTimer = window.setTimeout(() => setVisible(false), 11200);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(dismissTimer);
      ambientAudio.stopTyping();
    };
  }, [isOpeningCameraPanComplete]);

  if (!visible) return null;

  return (
    <aside className="opening-instruction-overlay" aria-live="polite">
      <span className="opening-instruction-overlay__label">INVESTIGATION BRIEFING</span>
      <p>
        {typedText}
        <span className="opening-instruction-overlay__cursor" aria-hidden="true">▋</span>
      </p>
    </aside>
  );
}
