import React from "react";

// SVG progress ring showing this week's minutes vs the weekly goal.
export default function GoalRing({ minutes, goal, onGoalChange }) {
  const R = 52;
  const CIRC = 2 * Math.PI * R;
  const pct = Math.min(1, goal > 0 ? minutes / goal : 0);
  const done = pct >= 1;

  return (
    <div className="goal-ring">
      <svg viewBox="0 0 130 130" width={120} height={120}>
        <circle cx={65} cy={65} r={R} fill="none" stroke="#223028" strokeWidth={12} />
        <circle
          cx={65}
          cy={65}
          r={R}
          fill="none"
          stroke={done ? "#22c55e" : "#4ade80"}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={`${pct * CIRC} ${CIRC}`}
          transform="rotate(-90 65 65)"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
        <text x={65} y={60} textAnchor="middle" fontSize={22} fontWeight={800} fill="#e7f0ea">
          {Math.round(pct * 100)}%
        </text>
        <text x={65} y={80} textAnchor="middle" fontSize={11} fill="#8aa196">
          {minutes} / {goal} min
        </text>
      </svg>
      <div className="goal-meta">
        <div className="goal-title">{done ? "Weekly goal hit! 🎉" : "Weekly goal"}</div>
        <label className="goal-edit">
          Target&nbsp;
          <input
            type="number"
            min="10"
            step="10"
            value={goal}
            onChange={(e) => onGoalChange(Math.max(10, Number(e.target.value) || 10))}
          />
          &nbsp;min/week
        </label>
      </div>
    </div>
  );
}
