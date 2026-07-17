import React, { useState } from "react";

const TYPES = ["Run", "Strength", "Cycling", "Yoga", "Swim", "HIIT"];

export default function AddWorkout({ onAdd }) {
  const [type, setType] = useState("Run");
  const [durationMin, setDuration] = useState(30);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const submit = (e) => {
    e.preventDefault();
    onAdd({ type, durationMin: Number(durationMin), date });
  };

  return (
    <form className="add-form" onSubmit={submit}>
      <label>
        Activity
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Duration (min)
        <input
          type="number"
          min="1"
          value={durationMin}
          onChange={(e) => setDuration(e.target.value)}
        />
      </label>
      <label>
        Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <button type="submit">Add workout</button>
    </form>
  );
}
