# FitTrack — Fitness & Habit Tracker

Log workouts, watch your weekly training volume, keep a daily streak alive, and
see how your time splits across activities — with charts powered by Recharts.

![stack](https://img.shields.io/badge/stack-React%20·%20Recharts%20·%20Express%20·%20MongoDB-22c55e)

## Features

- 🔥 **Day streak** (consecutive days with a workout)
- 📊 Weekly training-volume area chart (last 8 weeks)
- 🥧 Activity breakdown donut (minutes by type)
- ➕ Log workouts (type, duration, date) — calories auto-estimated
- 🌱 ~6 weeks of sample workouts seeded on first boot

## Stack

| Tier | Tech |
|------|------|
| Frontend | React + Vite, **Recharts** |
| API | **Node + Express** |
| DB | **MongoDB** (native driver) |
| Runtime | Docker Compose |

## Quickstart

```bash
docker compose up --build
```

- **App** → http://localhost:5173
- **API** → http://localhost:4100/api/stats

## Local development

```bash
cd api && npm install
MONGODB_URI=mongodb://localhost:27017 npm run dev

cd ../web && npm install && npm run dev   # Vite proxies /api to :4100
```

## API

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/workouts` | recent workouts |
| `POST` | `/api/workouts` | log a workout |
| `DELETE` | `/api/workouts/:id` | delete a workout |
| `GET` | `/api/stats` | totals, streak, weekly volume, by-type |

Streak and aggregations are computed in `api/src/routes/stats.js`.

## License

MIT © Wassim Jebali
