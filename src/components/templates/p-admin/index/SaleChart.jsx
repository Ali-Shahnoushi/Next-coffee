"use client";

import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState([]);
  useEffect(() => {
    const getMonthlySale = async () => {
      const res = await fetch("api/order");
      const data = await res.json();

      setData(data.monthlySalesFormatted);
    };
    getMonthlySale();
  }, []);

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
        <Area type="monotone" dataKey="sale" stroke="#003275" fill="#2b72d0" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
