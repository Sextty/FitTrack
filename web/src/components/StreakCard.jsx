import React from "react";

export default function StreakCard({ streak }) {
  return (
    <div className="stat streak">
      <div className="stat-val">
        {streak ?? "—"} <span className="fire">🔥</span>
      </div>
      <div className="stat-lbl">Day streak</div>
    </div>
  );
}
