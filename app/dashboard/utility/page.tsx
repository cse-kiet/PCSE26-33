"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, Gauge, Power, Zap } from "lucide-react"

export default function UtilityDashboard() {
  // Mock data - in a real app, this would come from your API
  const gridStats = {
    totalLoad: "1.2 MW",
    peakDemand: "1.5 MW",
    gridStability: "98.5%",
    activeProsumers: "156"
  }

  const alerts = [
    { id: 1, type: "High Load", location: "District A", severity: "Warning", time: "10 mins ago" },
    { id: 2, type: "Voltage Drop", location: "Sector 3", severity: "Critical", time: "15 mins ago" },
    { id: 3, type: "Peak Demand", location: "Zone B", severity: "Info", time: "25 mins ago" }
  ]

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Utility Dashboard</h1>

      {/* Grid Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Grid Load</CardTitle>
            <Power className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gridStats.totalLoad}</div>
            <p className="text-xs text-muted-foreground">Current consumption</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Demand</CardTitle>
            <Activity className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gridStats.peakDemand}</div>
            <p className="text-xs text-muted-foreground">Today's maximum</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grid Stability</CardTitle>
            <Gauge className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gridStats.gridStability}</div>
            <p className="text-xs text-muted-foreground">System health</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prosumers</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gridStats.activeProsumers}</div>
            <p className="text-xs text-muted-foreground">Connected to grid</p>
          </CardContent>
        </Card>
      </div>

      {/* Grid Management and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Real-time grid notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`h-4 w-4 ${
                      alert.severity === "Critical" ? "text-red-500" :
                      alert.severity === "Warning" ? "text-yellow-500" : "text-blue-500"
                    }`} />
                    <div>
                      <p className="font-medium">{alert.type}</p>
                      <p className="text-sm text-muted-foreground">{alert.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{alert.time}</p>
                    <p className="text-sm text-muted-foreground">{alert.severity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grid Management</CardTitle>
            <CardDescription>Control and optimize grid operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full mb-2">Load Balancing Settings</Button>
            <Button variant="outline" className="w-full mb-2">View Grid Analytics</Button>
            <Button variant="outline" className="w-full">Manage Maintenance Schedule</Button>
          </CardContent>
        </Card>
      </div>

      {/* Grid Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Grid Performance Overview</CardTitle>
          <CardDescription>24-hour load distribution and stability metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Grid performance chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 