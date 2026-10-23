// src/services/scoringEngine.js
// ALIBI — Keyword Detection & Scoring Engine
// Phase 1: Matches STT / text transcripts against hint card keywords with Hindi/English/Hinglish fuzzy tolerance.

import { HINT_CARDS, getActiveHints } from "../data/hintCards.js";

export const SOLVE_THRESHOLD = 50;
export const INITIAL_SCORE = 0;
export const INITIAL_TRIES = 3;

/**
 * Normalizes text for robust matching across English, Hindi, and Hinglish.
 * Strips punctuation, collapses extra spaces, and converts to lowercase.
 */
function normalize(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’‘]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Checks whether target keyword or synonym appears in normalized transcript.
 * Supports exact phrase match and token-level matching.
 */
function isSynonymPresent(normTranscript, synonym) {
  const normSynonym = normalize(synonym);
  if (!normSynonym) return false;

  // 1. Direct substring match (covers multi-word phrases like "duplicate chabi" or "back door")
  if (normTranscript.includes(normSynonym)) {
    return true;
  }

  // 2. Token boundary regex match
  const escaped = normSynonym.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, "i");
  return regex.test(normTranscript);
}

/**
 * Matches a query transcript against the active hint cards for a suspect.
 * Returns the first matching card, or matched: false if none match.
 *
 * @param {string} transcript - The player's spoken or typed question.
 * @param {string} suspectId - Current suspect ("raju", "meera", etc.)
 * @param {string[]} alreadyScoredCardIds - IDs of cards already triggered.
 * @returns {{ matched: boolean, card: object|null, matchedKeyword: string|null }}
 */
export function matchTranscriptToHintCards(transcript, suspectId, alreadyScoredCardIds = []) {
  if (!transcript) {
    return { matched: false, card: null, matchedKeyword: null };
  }

  const normTranscript = normalize(transcript);
  const cards = getActiveHints(suspectId, alreadyScoredCardIds);

  for (const card of cards) {
    // Check main keyword first
    if (isSynonymPresent(normTranscript, card.keyword)) {
      return { matched: true, card, matchedKeyword: card.keyword };
    }

    // Check all authored synonyms (Hinglish/Hindi/English variations)
    if (card.synonyms && Array.isArray(card.synonyms)) {
      for (const syn of card.synonyms) {
        if (isSynonymPresent(normTranscript, syn)) {
          return { matched: true, card, matchedKeyword: syn };
        }
      }
    }
  }

  return { matched: false, card: null, matchedKeyword: null };
}

/**
 * Computes the score update and thin-ice try status based on match result.
 *
 * @param {{ matched: boolean, card: object|null }} matchResult
 * @param {number} currentScore - The existing score.
 * @param {number} currentTries - Remaining tries when on thin-ice (score <= 0).
 * @returns {{ delta: number, nextScore: number, nextTries: number, isSolved: boolean, isFailed: boolean }}
 */
export function computeScoreUpdate(matchResult, currentScore, currentTries) {
  let delta = 0;
  if (matchResult && matchResult.matched && matchResult.card) {
    delta = Number(matchResult.card.points) || 0;
  }

  const nextScore = currentScore + delta;
  let nextTries = currentTries;

  // Thin-Ice Rule:
  // If the detective is at or below 0 score and incurs a penalty (or hits a wrong lead),
  // they lose one of their 3 thin-ice tries.
  if (currentScore <= 0 && delta < 0) {
    nextTries = Math.max(0, currentTries - 1);
  }

  const isSolved = nextScore >= SOLVE_THRESHOLD;
  const isFailed = nextTries <= 0;

  return {
    delta,
    nextScore,
    nextTries,
    isSolved,
    isFailed
  };
}
