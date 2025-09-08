"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, CreditCard, LineChart, Wallet } from "lucide-react"

export default function ConsumerDashboard() {
  // Mock data - in a real app, this would come from your API
  const consumptionStats = {
    currentUsage: "8.2 kWh",
    dailyAverage: "7.8 kWh",
    monthlyBill: "125.50 ETH",
    walletBalance: "500.00 ETH"
  }

  const energyPrices = [
    { source: "Grid", price: "0.12 ETH/kWh", availability: "Unlimited" },
    { source: "Local Prosumer A", price: "0.10 ETH/kWh", availability: "5.2 kWh" },
    { source: "Local Prosumer B", price: "0.11 ETH/kWh", availability: "3.8 kWh" }
  ]

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Consumer Dashboard</h1>

      {/* Consumption Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Usage</CardTitle>
            <Battery className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consumptionStats.currentUsage}</div>
            <p className="text-xs text-muted-foreground">Live consumption rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <LineChart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consumptionStats.dailyAverage}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Bill</CardTitle>
            <CreditCard className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consumptionStats.monthlyBill}</div>
            <p className="text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consumptionStats.walletBalance}</div>
            <p className="text-xs text-muted-foreground">Available for purchases</p>
          </CardContent>
        </Card>
      </div>

      {/* Energy Market and Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Energy Sources</CardTitle>
            <CardDescription>Current market prices and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {energyPrices.map((source, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{source.source}</p>
                    <p className="text-sm text-muted-foreground">Available: {source.availability}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{source.price}</p>
                    <Button variant="outline" size="sm">Purchase</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your energy consumption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full mb-2">Set Usage Alerts</Button>
            <Button variant="outline" className="w-full mb-2">View Detailed Analytics</Button>
            <Button variant="outline" className="w-full">Schedule Auto-Purchases</Button>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption Trends</CardTitle>
          <CardDescription>24-hour consumption pattern</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Energy consumption chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 