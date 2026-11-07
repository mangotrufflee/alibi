import React, { createContext } from "react";
import { useGameStore } from "./useGameStore.js";

const GameContext = createContext(useGameStore);

/**
 * Hook to access game state.
 * Supports optional selector: useGame((state) => state.selectedSuspect)
 * If no selector is passed, returns the full reactive state.
 */
const identitySelector = (state) => state;

export const useGame = (selector) => {
  return useGameStore(typeof selector === "function" ? selector : identitySelector);
};

/**
 * Provider wrapper maintaining full backwards compatibility for tree root mounting.
 * Does NOT subscribe to the store state to prevent re-rendering the whole application on state updates.
 */
export function GameProvider({ children }) {
  return <GameContext.Provider value={useGameStore}>{children}</GameContext.Provider>;
}

export default GameContext;
