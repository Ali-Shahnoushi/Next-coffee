"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SaleChart() {
  const data = [
    { date: "02/01/1", sale: 500_000 },
    { date: "02/04/4", sale: 800_000 },
    { date: "02/08/11", sale: 20_000 },
    { date: "02/12/8", sale: 1_500_000 },
    { date: "02/03/6", sale: 453_000 },
  ];

  return (
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="sale" stroke="#000" fill="#711D1C" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
