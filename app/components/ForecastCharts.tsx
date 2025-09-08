"use client"

import { addHours, format } from "date-fns"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts"

// Generate forecast data for the next 24 hours
const generateForecastData = () => {
  const data = []
  const now = new Date()
  
  for (let i = 0; i < 24; i++) {
    const time = addHours(now, i)
    // Simulate solar production based on time of day
    const hour = time.getHours()
    let production = 0
    
    // Simulate daylight hours (6 AM to 6 PM)
    if (hour >= 6 && hour <= 18) {
      // Peak production around noon
      const peakFactor = 1 - Math.abs(hour - 12) / 6
      production = 5 * peakFactor + Math.random()
    }

    data.push({
      time: format(time, 'HH:mm'),
      expected: production.toFixed(1),
      weather: Math.random() > 0.7 ? 'Cloudy' : 'Clear',
      confidence: Math.min(95, 70 + Math.random() * 25).toFixed(0)
    })
  }
  return data
}

// Generate battery charging data
const generateChargingData = () => {
  const data = []
  const now = new Date()
  let level = 50 + Math.random() * 20
  let efficiency = 90 + Math.random() * 5

  for (let i = 0; i < 24; i++) {
    const time = addHours(now, -i)
    const hour = time.getHours()
    let charging = 0
    let temperature = 20 + Math.random() * 5 // Battery temperature between 20-25°C
    
    // Charge during sunlight hours, discharge at night
    if (hour >= 6 && hour <= 18) {
      charging = 2 + Math.random()
      level = Math.min(100, level + charging)
      // Slight efficiency drop during peak hours
      efficiency = Math.max(85, efficiency - 0.1)
    } else {
      charging = -(1 + Math.random())
      level = Math.max(20, level + charging)
      // Recovery of efficiency during night
      efficiency = Math.min(95, efficiency + 0.1)
    }

    // Calculate power metrics
    const powerIn = charging > 0 ? charging * 1000 : 0 // Convert to watts
    const powerOut = charging < 0 ? Math.abs(charging) * 1000 : 0
    const cycleCount = Math.floor(i / 24) + 1

    data.unshift({
      time: format(time, 'HH:mm'),
      level: level.toFixed(1),
      charging: charging.toFixed(1),
      temperature: temperature.toFixed(1),
      efficiency: efficiency.toFixed(1),
      powerIn: powerIn.toFixed(0),
      powerOut: powerOut.toFixed(0),
      cycleCount
    })
  }
  return data
}

// Generate sustainability impact data
const generateSustainabilityData = () => {
  const data = []
  const now = new Date()
  let cumulative = 0

  for (let i = 0; i < 30; i++) {
    const time = addHours(now, -i * 24)
    const daily = 25 + Math.random() * 10
    cumulative += daily

    data.unshift({
      date: format(time, 'MM/dd'),
      daily: daily.toFixed(1),
      cumulative: cumulative.toFixed(1)
    })
  }
  return data
}

interface ChartProps {
  className?: string
}

export function ProductionForecastChart({ className }: ChartProps) {
  const data = generateForecastData()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="expected"
          stroke="#fbbf24"
          fill="#fbbf24"
          fillOpacity={0.3}
          name="Expected Production (kWh)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function ChargingTrendsChart({ className }: ChartProps) {
  const data = generateChargingData()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 border rounded-lg">
          <div className="text-sm text-muted-foreground">Current Level</div>
          <div className="text-2xl font-bold text-foreground">{data[0].level}%</div>
        </div>
        <div className="p-3 border rounded-lg">
          <div className="text-sm text-muted-foreground">Temperature</div>
          <div className="text-2xl font-bold text-foreground">{data[0].temperature}°C</div>
        </div>
        <div className="p-3 border rounded-lg">
          <div className="text-sm text-muted-foreground">Efficiency</div>
          <div className="text-2xl font-bold text-foreground">{data[0].efficiency}%</div>
        </div>
        <div className="p-3 border rounded-lg">
          <div className="text-sm text-muted-foreground">Power Flow</div>
          <div className="text-2xl font-bold text-foreground">
            {data[0].powerIn !== "0" ? `+${data[0].powerIn}W` : `-${data[0].powerOut}W`}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-background border rounded-lg p-3 shadow-lg">
                  <div className="font-bold">{label}</div>
                  <div className="space-y-1">
                    <div className="text-green-500">Level: {payload[0].value}%</div>
                    <div className="text-blue-500">Charging: {payload[1].value} kW</div>
                    <div className="text-orange-500">Temperature: {payload[2].value}°C</div>
                    <div className="text-purple-500">Efficiency: {payload[3].value}%</div>
                  </div>
                </div>
              )
            }
            return null
          }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="level"
            stroke="#22c55e"
            name="Battery Level (%)"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="charging"
            stroke="#3b82f6"
            name="Charging Rate (kW)"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="temperature"
            stroke="#f97316"
            name="Temperature (°C)"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="efficiency"
            stroke="#a855f7"
            name="Efficiency (%)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SustainabilityTrendsChart({ className }: ChartProps) {
  const data = generateSustainabilityData()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="daily"
          fill="#22c55e"
          name="Daily CO₂ Savings (kg)"
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 