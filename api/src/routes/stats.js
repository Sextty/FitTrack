import { Router } from "express";
import { workouts } from "../db.js";

const router = Router();

function isoDay(d) {
  return d.toISOString().slice(0, 10);
}

// Count consecutive days (ending today or yesterday) that have a workout.
function currentStreak(dates) {
  const set = new Set(dates);
  let streak = 0;
  const d = new Date();
  if (!set.has(isoDay(d))) {
    d.setDate(d.getDate() - 1);
    if (!set.has(isoDay(d))) return 0;
  }
  while (set.has(isoDay(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

router.get("/", async (_req, res) => {
  const col = await workouts();
  const all = await col.find().toArray();

  const totalWorkouts = all.length;
  const totalMinutes = all.reduce((s, w) => s + (w.durationMin || 0), 0);
  const totalCalories = all.reduce((s, w) => s + (w.calories || 0), 0);
  const streak = currentStreak(all.map((w) => w.date));

  // Weekly minutes for the last 8 weeks.
  const weeks = {};
  const now = new Date();
  for (let i = 7; i >= 0; i--) {
    const start = new Date(now);
    start.setDate(now.getDate() - i * 7);
    weeks[weekKey(start)] = 0;
  }
  for (const w of all) {
    const key = weekKey(new Date(w.date));
    if (key in weeks) weeks[key] += w.durationMin || 0;
  }
  const weekly = Object.entries(weeks).map(([week, minutes]) => ({ week, minutes }));

  // Minutes by workout type.
  const byTypeMap = {};
  for (const w of all) byTypeMap[w.type] = (byTypeMap[w.type] || 0) + (w.durationMin || 0);
  const byType = Object.entries(byTypeMap).map(([type, minutes]) => ({ type, minutes }));

  res.json({ totalWorkouts, totalMinutes, totalCalories, streak, weekly, byType });
});

function weekKey(d) {
  // Monday-based week label like "Mar 04".
  const day = new Date(d);
  const diff = (day.getDay() + 6) % 7;
  day.setDate(day.getDate() - diff);
  return day.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

export default router;
