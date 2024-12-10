"use client";

import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function GrowthChart() {
  const data = [
    { date: "02/12/1", current: 500_000, prev: 430_000 },
    { date: "02/30/4", current: 800_000, prev: 820_000 },
    { date: "02/18/11", current: 20_000, prev: 8_500 },
    { date: "02/25/8", current: 1_500_000, prev: 957_000 },
    { date: "02/03/6", current: 453_000, prev: 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart
        width={500}
        height={200}
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="prev" stroke="#2d2b2b" />
        <Line type="monotone" dataKey="current" stroke="#000" />
      </LineChart>
    </ResponsiveContainer>
  );
}
