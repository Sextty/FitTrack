import { Router } from "express";
import { ObjectId } from "mongodb";
import { workouts } from "../db.js";

const router = Router();

router.get("/", async (_req, res) => {
  const col = await workouts();
  const list = await col.find().sort({ date: -1, createdAt: -1 }).limit(200).toArray();
  res.json(list.map((w) => ({ ...w, id: w._id.toString(), _id: undefined })));
});

router.post("/", async (req, res) => {
  const { type, durationMin, calories, date, notes } = req.body;
  if (!type || !durationMin) {
    return res.status(400).json({ error: "type and durationMin are required" });
  }
  const col = await workouts();
  const doc = {
    type,
    durationMin: Number(durationMin),
    calories: Number(calories) || Math.round(Number(durationMin) * 8),
    date: date || new Date().toISOString().slice(0, 10),
    notes: notes || "",
    createdAt: new Date(),
  };
  const { insertedId } = await col.insertOne(doc);
  res.status(201).json({ ...doc, id: insertedId.toString() });
});

router.delete("/:id", async (req, res) => {
  const col = await workouts();
  try {
    await col.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ deleted: req.params.id });
  } catch {
    res.status(400).json({ error: "invalid id" });
  }
});

export default router;
