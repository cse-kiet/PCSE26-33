"use client"

import { useEffect, useState } from "react"
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

interface EnergyTrendsChartProps {
  timeRange: "hourly" | "daily" | "weekly" | "monthly"
}

// Generate mock data based on time range
const generateData = (timeRange: string) => {
  const data = []
  const points = timeRange === "hourly" ? 24 : 
                timeRange === "daily" ? 7 : 
                timeRange === "weekly" ? 4 : 12

  const baseProduction = 5
  const baseConsumption = 4
  const variance = 2

  for (let i = 0; i < points; i++) {
    const time = timeRange === "hourly" ? `${i}:00` :
                 timeRange === "daily" ? `Day ${i + 1}` :
                 timeRange === "weekly" ? `Week ${i + 1}` : 
                 `Month ${i + 1}`

    data.push({
      time,
      production: +(baseProduction + Math.random() * variance).toFixed(1),
      consumption: +(baseConsumption + Math.random() * variance).toFixed(1),
    })
  }

  return data
}

export default function EnergyTrendsChart({ timeRange }: EnergyTrendsChartProps) {
  const [data, setData] = useState(() => generateData(timeRange))

  useEffect(() => {
    setData(generateData(timeRange))
  }, [timeRange])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#facc15" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="time"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          unit=" kWh"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "6px",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "1rem",
          }}
        />
        <Area
          type="monotone"
          dataKey="production"
          name="Production"
          stroke="#facc15"
          fill="url(#productionGradient)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="consumption"
          name="Consumption"
          stroke="#3b82f6"
          fill="url(#consumptionGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
} 