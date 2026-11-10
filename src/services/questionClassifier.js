// src/services/questionClassifier.js
// ALIBI — Deterministic Question Classifier
// Matches player text input to a canonical question ID.
// Never generates factual answers — only identifies which predefined question was asked.

import { QUESTION_DATABASE } from "../data/questionDatabase.js";

/**
 * Normalize text for comparison.
 */
function normalize(text) {
  return (text || "").toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[^a-z0-9\s:'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Count how many phrasings from a question's list appear in the input text.
 * Returns a score 0–1 representing match confidence.
 */
function scoreQuestion(question, normalizedInput, suspectId, lockedStoryline) {
  // Must match suspect
  if (question.suspectId !== suspectId) return 0;

  // Must be valid for active storyline (if locked)
  if (lockedStoryline && !question.storylines.includes(lockedStoryline)) return 0;

  let matchCount = 0;
  let totalWeight = 0;

  for (const phrasing of question.phrasings) {
    const normalizedPhrasing = normalize(phrasing);
    const words = normalizedPhrasing.split(" ");
    const weight = words.length; // longer phrases score higher

    totalWeight += weight;
    if (normalizedInput.includes(normalizedPhrasing)) {
      matchCount += weight;
    }
  }

  if (totalWeight === 0) return 0;
  return matchCount / totalWeight;
}

/**
 * Classify player input text against the question database.
 *
 * @param {string} input - Player's typed or spoken text
 * @param {string} suspectId - Currently selected suspect
 * @param {string|null} lockedStoryline - Active storyline (null if not yet decided)
 * @param {string[]} askedQuestionIds - Already-asked question IDs for this suspect
 * @returns {{ questionId: string|null, confidence: 'high'|'medium'|'low', score: number }}
 */
export function classifyQuestion(input, suspectId, lockedStoryline = null, askedQuestionIds = []) {
  if (!input || !suspectId) {
    return { questionId: null, confidence: "low", score: 0 };
  }

  const normalizedInput = normalize(input);

  // Score all questions
  const scores = Object.values(QUESTION_DATABASE).map((q) => ({
    questionId: q.id,
    score: scoreQuestion(q, normalizedInput, suspectId, lockedStoryline),
    alreadyAsked: askedQuestionIds.includes(q.id)
  }));

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  const best = scores[0];

  if (!best || best.score === 0) {
    return { questionId: null, confidence: "low", score: 0 };
  }

  // Map score to confidence
  let confidence;
  if (best.score >= 0.4) {
    confidence = "high";
  } else if (best.score >= 0.15) {
    confidence = "medium";
  } else {
    confidence = "low";
  }

  return {
    questionId: best.score > 0 ? best.questionId : null,
    confidence,
    score: best.score,
    alreadyAsked: best.alreadyAsked
  };
}

/**
 * Returns a rephrasing prompt when no confident match is found.
 */
export function getRephrasPrompt(suspectId) {
  const prompts = {
    raju: "Kya? Zara tez boliye.",
    meera: "Yeh aap kya kehna chahte hain?",
    arvind: "Could you say that again?",
    nusrat: "Kya? Zara tez boliye.",
    bhola: "Yeh aap kya kehna chahte hain?"
  };
  return prompts[suspectId] || "What are you trying to say?";
}

/**
 * Checks if a question's prerequisites have been met.
 * @param {Object} question - Question object from QUESTION_DATABASE
 * @param {string[]} askedQuestionIds - All asked question IDs for this suspect
 * @returns {boolean}
 */
export function arePrerequisitesMet(question, askedQuestionIds) {
  if (!question.prerequisites || question.prerequisites.length === 0) return true;
  return question.prerequisites.every((prereq) => askedQuestionIds.includes(prereq));
}

