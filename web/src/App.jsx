import React, { useEffect, useState, useCallback } from "react";
import { api } from "./api.js";
import StreakCard from "./components/StreakCard.jsx";
import ProgressChart from "./components/ProgressChart.jsx";
import TypeBreakdown from "./components/TypeBreakdown.jsx";
import AddWorkout from "./components/AddWorkout.jsx";
import WorkoutList from "./components/WorkoutList.jsx";

export default function App() {
  const [stats, setStats] = useState(null);
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const [s, w] = await Promise.all([api.stats(), api.workouts()]);
      setStats(s);
      setList(w);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (w) => {
    await api.addWorkout(w);
    load();
  };
  const remove = async (id) => {
    await api.deleteWorkout(id);
    load();
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">💪 FitTrack</div>
        <div className="subtitle">Fitness &amp; Habit Tracker</div>
      </header>

      {error && <div className="error">API error: {error}</div>}

      <section className="stat-row">
        <StreakCard streak={stats?.streak} />
        <div className="stat">
          <div className="stat-val">{stats?.totalWorkouts ?? "—"}</div>
          <div className="stat-lbl">Workouts</div>
        </div>
        <div className="stat">
          <div className="stat-val">
            {stats ? Math.round(stats.totalMinutes / 60) : "—"}h
          </div>
          <div className="stat-lbl">Total time</div>
        </div>
        <div className="stat">
          <div className="stat-val">
            {stats ? stats.totalCalories.toLocaleString() : "—"}
          </div>
          <div className="stat-lbl">Calories</div>
        </div>
      </section>

      <div className="grid">
        <div className="panel wide">
          <h2>Weekly training volume (minutes)</h2>
          <ProgressChart data={stats?.weekly || []} />
        </div>
        <div className="panel">
          <h2>By activity</h2>
          <TypeBreakdown data={stats?.byType || []} />
        </div>
      </div>

      <div className="grid">
        <div className="panel">
          <h2>Log a workout</h2>
          <AddWorkout onAdd={add} />
        </div>
        <div className="panel wide">
          <h2>Recent workouts</h2>
          <WorkoutList workouts={list} onDelete={remove} />
        </div>
      </div>

      <footer className="foot">
        FitTrack · Express + MongoDB + React/Recharts · sample data seeded on start
      </footer>
    </div>
  );
}
