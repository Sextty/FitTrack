import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProgressChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#26303a" />
        <XAxis dataKey="week" stroke="#8a97a6" fontSize={12} />
        <YAxis stroke="#8a97a6" fontSize={12} />
        <Tooltip
          contentStyle={{
            background: "#151b22",
            border: "1px solid #26303a",
            borderRadius: 8,
            color: "#e7edf3",
          }}
        />
        <Area
          type="monotone"
          dataKey="minutes"
          stroke="#22c55e"
          strokeWidth={2}
          fill="url(#vol)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
