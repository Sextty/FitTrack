import express from "express";
import cors from "cors";
import workoutsRouter from "./routes/workouts.js";
import statsRouter from "./routes/stats.js";
import { seedIfEmpty } from "./seed.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/workouts", workoutsRouter);
app.use("/api/stats", statsRouter);

const port = parseInt(process.env.PORT || "4100", 10);

seedIfEmpty()
  .then((n) => n && console.log(`Seeded ${n} sample workouts`))
  .catch((e) => console.warn("Seed skipped:", e.message))
  .finally(() =>
    app.listen(port, "0.0.0.0", () => console.log(`FitTrack API on :${port}`)),
  );
