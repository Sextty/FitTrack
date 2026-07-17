import { workouts } from "./db.js";

const TYPES = ["Run", "Strength", "Cycling", "Yoga", "Swim", "HIIT"];

// Insert ~6 weeks of sample workouts if the collection is empty.
export async function seedIfEmpty() {
  const col = await workouts();
  if ((await col.countDocuments()) > 0) return 0;

  const docs = [];
  const today = new Date();
  for (let i = 0; i < 42; i++) {
    // ~70% of days have a workout
    if (Math.random() > 0.7) continue;
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const durationMin = 20 + Math.floor(Math.random() * 70);
    docs.push({
      type,
      durationMin,
      calories: Math.round(durationMin * (6 + Math.random() * 6)),
      date: day.toISOString().slice(0, 10),
      notes: "",
      createdAt: new Date(),
    });
  }
  if (docs.length) await col.insertMany(docs);
  return docs.length;
}

// Allow `npm run seed` as a standalone command.
if (import.meta.url === `file://${process.argv[1]}`) {
  seedIfEmpty().then((n) => {
    console.log(`Seeded ${n} workouts`);
    process.exit(0);
  });
}
