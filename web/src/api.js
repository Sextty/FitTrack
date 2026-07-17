async function json(res) {
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export const api = {
  workouts: () => fetch("/api/workouts").then(json),
  stats: () => fetch("/api/stats").then(json),
  addWorkout: (w) =>
    fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(w),
    }).then(json),
  deleteWorkout: (id) =>
    fetch(`/api/workouts/${id}`, { method: "DELETE" }).then(json),
};
