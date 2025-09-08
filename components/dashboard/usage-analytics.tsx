"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { BarChart3 } from "lucide-react"

// Mock data for energy usage
const weeklyData = [
  { day: "Mon", production: 4.2, consumption: 3.1 },
  { day: "Tue", production: 3.8, consumption: 3.5 },
  { day: "Wed", production: 5.1, consumption: 2.8 },
  { day: "Thu", production: 4.5, consumption: 3.2 },
  { day: "Fri", production: 3.9, consumption: 3.7 },
  { day: "Sat", production: 5.3, consumption: 2.5 },
  { day: "Sun", production: 5.8, consumption: 2.2 },
]

export default function UsageAnalytics() {
  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
          Energy Usage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "4px",
                  color: "#E5E7EB",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#E5E7EB" }}
                labelStyle={{ color: "#9CA3AF", fontWeight: "bold", marginBottom: "5px" }}
              />
              <Bar dataKey="production" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} name="Production" />
              <Bar dataKey="consumption" stackId="a" fill="#4B5563" radius={[0, 0, 4, 4]} name="Consumption" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-400">Production</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
            <span className="text-gray-400">Consumption</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-400 text-xs">Total Production</div>
            <div className="text-xl font-bold text-white">32.6 kWh</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">Total Consumption</div>
            <div className="text-xl font-bold text-white">21.0 kWh</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
