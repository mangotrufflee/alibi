// src/components/case/tabs/ChecklistTab.jsx
// ALIBI — Phase 2: Dynamic Investigative Checklist Tab (GDD §7)

import React from "react";
import { useGame } from "../../../state/GameContext";

export default function ChecklistTab() {
  const {
    checklistGoals,
    toggleChecklistGoal,
    selectSuspect,
    setActiveTab
  } = useGame();

  const completedCount = checklistGoals.filter((g) => g.completed).length;
  const totalCount = checklistGoals.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  // Group goals by category
  const categories = Array.from(new Set(checklistGoals.map((g) => g.category)));

  const handleJumpToSuspect = (suspectId) => {
    if (!suspectId) return;
    selectSuspect(suspectId);
    setActiveTab("interrogation");
  };

  return (
    <div className="tab-pane checklist-pane">
      {/* CHECKLIST HEADER & PROGRESS METER */}
      <div className="checklist-summary-card">
        <div className="summary-info">
          <h2 className="summary-title">INVESTIGATIVE OBJECTIVES</h2>
          <p className="summary-desc">
            Primary deduction tasks that track leads, corroborate alibis, and unlock the final confession. Goals update automatically as keywords land.
          </p>
        </div>

        <div className="summary-meter-box">
          <div className="meter-label-row">
            <span>OBJECTIVES CLEARED:</span>
            <strong>{completedCount} / {totalCount} ({progressPct}%)</strong>
          </div>
          <div className="checklist-progress-track">
            <div
              className="checklist-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* CATEGORY SECTIONS */}
      <div className="checklist-categories-list">
        {categories.map((category) => {
          const goals = checklistGoals.filter((g) => g.category === category);

          return (
            <div key={category} className="checklist-category-block">
              <h3 className="category-header-title">{category.toUpperCase()}</h3>

              <div className="goals-list">
                {goals.map((goal) => {
                  if (goal.hidden && !goal.completed) {
                    return (
                      <div key={goal.id} className="goal-item-card goal-hidden">
                        <div className="goal-check-box locked">🔒</div>
                        <div className="goal-content">
                          <span className="goal-title-redacted">
                            [CLASSIFIED LEAD // Awaiting forensic breakthrough]
                          </span>
                          <span className="goal-desc-muted">
                            Explore leads with suspects and evidence to uncover this objective.
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={goal.id}
                      className={`goal-item-card ${goal.completed ? "is-completed" : ""}`}
                    >
                      <button
                        type="button"
                        className={`goal-check-btn ${goal.completed ? "checked" : ""}`}
                        onClick={() => toggleChecklistGoal(goal.id)}
                        title="Click to toggle objective state"
                      >
                        {goal.completed ? "✓" : ""}
                      </button>

                      <div className="goal-content">
                        <span className="goal-title">{goal.title}</span>
                        <p className="goal-desc">{goal.description}</p>
                      </div>

                      {goal.targetSuspect && !goal.completed && (
                        <div className="goal-action-box">
                          <button
                            type="button"
                            className="jump-suspect-btn"
                            onClick={() => handleJumpToSuspect(goal.targetSuspect)}
                          >
                            Interrogate {goal.targetSuspect.toUpperCase()} ➔
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
