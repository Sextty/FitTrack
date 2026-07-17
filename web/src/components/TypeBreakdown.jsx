import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#22c55e", "#06b6d4", "#8b5cf6", "#f59e0b", "#ec4899", "#ef4444"];

export default function TypeBreakdown({ data }) {
  if (!data.length) return <div className="muted">No data yet.</div>;
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="minutes"
          nameKey="type"
          innerRadius={48}
          outerRadius={80}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#151b22",
            border: "1px solid #26303a",
            borderRadius: 8,
            color: "#e7edf3",
          }}
        />
        <Legend wrapperStyle={{ fontSize: 12, color: "#8a97a6" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
