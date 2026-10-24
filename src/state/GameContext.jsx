// src/state/GameContext.jsx
// Backward-compatible React Context adapter backed 100% by the Zustand store (useGameStore)

import React, { createContext, useContext } from "react";
import { useGameStore } from "./useGameStore.js";

const GameContext = createContext(null);

/**
 * Hook to access game state. Fully reactive via Zustand under the hood.
 */
export const useGame = () => useGameStore();

/**
 * Provider wrapper maintaining full backwards compatibility for tree root mounting.
 */
export function GameProvider({ children }) {
  const store = useGameStore();
  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
}

export default GameContext;
