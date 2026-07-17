import React from "react";

const EMOJI = {
  Run: "🏃",
  Strength: "🏋️",
  Cycling: "🚴",
  Yoga: "🧘",
  Swim: "🏊",
  HIIT: "⚡",
};

export default function WorkoutList({ workouts, onDelete }) {
  if (!workouts.length) return <div className="muted">No workouts logged yet.</div>;
  return (
    <div className="workouts">
      {workouts.map((w) => (
        <div className="workout" key={w.id}>
          <span className="w-emoji">{EMOJI[w.type] || "💪"}</span>
          <div className="w-main">
            <div className="w-type">{w.type}</div>
            <div className="w-sub">
              {w.date} · {w.durationMin} min · {w.calories} kcal
            </div>
          </div>
          <button className="w-del" onClick={() => onDelete(w.id)} title="Delete">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
