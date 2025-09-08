"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Activity,
    AlertCircle,
    Battery,
    BellRing,
    Coins,
    Gauge,
    History,
    LineChart,
    Plug,
    Power,
    Settings,
    Smartphone,
    Wallet,
    Zap
} from "lucide-react"
import { useState } from "react"

export default function ProsumerDashboard() {
  const [activeTab, setActiveTab] = useState("monitoring")

  // Mock data - in a real app, this would come from your API
  const energyStats = {
    production: "12.5 kWh",
    consumption: "8.2 kWh",
    surplus: "4.3 kWh",
    earnings: "45.30 ETH",
    carbonOffset: "28.5 kg CO₂",
    deviceStatus: "Online",
    lastSync: "2 mins ago",
    tokenBalance: "150 kWh",
    smartContracts: "3 Active"
  }

  const recentTransactions = [
    { id: 1, type: "Sold", amount: "2.1 kWh", price: "5.20 ETH", buyer: "Consumer A", time: "10:30 AM" },
    { id: 2, type: "Bought", amount: "1.0 kWh", price: "2.45 ETH", buyer: "Grid", time: "11:45 AM" },
    { id: 3, type: "Sold", amount: "3.2 kWh", price: "7.80 ETH", buyer: "Consumer B", time: "2:15 PM" }
  ]

  const alerts = [
    { id: 1, type: "New Buyer Match", message: "Consumer C wants to buy 2.5 kWh", severity: "info", time: "5 mins ago" },
    { id: 2, type: "Smart Contract", message: "Daily trade executed with Consumer A", severity: "success", time: "30 mins ago" },
    { id: 3, type: "Device Alert", message: "Battery storage at 90% capacity", severity: "warning", time: "1 hour ago" }
  ]

  const smartContracts = [
    { id: 1, buyer: "Consumer A", amount: "2 kWh", frequency: "Daily", nextExecution: "Tomorrow 9 AM" },
    { id: 2, buyer: "Grid", amount: "5 kWh", frequency: "Weekly", nextExecution: "Sunday 10 AM" },
    { id: 3, buyer: "Consumer B", amount: "1 kWh", frequency: "Daily", nextExecution: "Tomorrow 2 PM" }
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Prosumer Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <BellRing className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Production</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energyStats.production}</div>
            <p className="text-xs text-muted-foreground">+2% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energyStats.tokenBalance}</div>
            <p className="text-xs text-muted-foreground">Available for trading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
            <Gauge className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energyStats.carbonOffset}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Smart Contracts</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energyStats.smartContracts}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="monitoring">
            <LineChart className="h-4 w-4 mr-2" />
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="trading">
            <Coins className="h-4 w-4 mr-2" />
            Trading
          </TabsTrigger>
          <TabsTrigger value="wallet">
            <Wallet className="h-4 w-4 mr-2" />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="devices">
            <Smartphone className="h-4 w-4 mr-2" />
            Devices
          </TabsTrigger>
          <TabsTrigger value="contracts">
            <History className="h-4 w-4 mr-2" />
            Contracts
          </TabsTrigger>
        </TabsList>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Energy Flow</CardTitle>
                <CardDescription>Current production and consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Energy flow chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Device health and connectivity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Power className="h-4 w-4 text-green-500" />
                      <span>Smart Meter Status</span>
                    </div>
                    <span className="text-green-500">{energyStats.deviceStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span>Last Data Sync</span>
                    </div>
                    <span>{energyStats.lastSync}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4 text-yellow-500" />
                      <span>Battery Storage</span>
                    </div>
                    <span>75% Charged</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trading Tab */}
        <TabsContent value="trading" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Sell Offer</CardTitle>
                <CardDescription>List your surplus energy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">List Energy for Sale</Button>
                  <Button variant="outline" className="w-full">View Market Prices</Button>
                  <Button variant="outline" className="w-full">Manage Trading Preferences</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest energy trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{tx.type} {tx.amount}</p>
                        <p className="text-sm text-muted-foreground">To: {tx.buyer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{tx.price}</p>
                        <p className="text-sm text-muted-foreground">{tx.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Wallet Tab */}
        <TabsContent value="wallet" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Token Management</CardTitle>
                <CardDescription>Manage your energy tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold mb-2">{energyStats.tokenBalance}</div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">Convert to Fiat</Button>
                    <Button variant="outline" className="w-full">Top Up Balance</Button>
                    <Button variant="outline" className="w-full">Transaction History</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wallet Security</CardTitle>
                <CardDescription>Manage your wallet security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">Backup Wallet</Button>
                  <Button variant="outline" className="w-full">Recovery Options</Button>
                  <Button variant="outline" className="w-full">Security Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>Manage your IoT devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Plug className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Smart Meter</p>
                        <p className="text-sm text-muted-foreground">Last sync: 2 mins ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Battery className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Battery Storage</p>
                        <p className="text-sm text-muted-foreground">75% Capacity</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Monitor</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Alerts</CardTitle>
                <CardDescription>Recent notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <AlertCircle className={`h-5 w-5 ${
                        alert.severity === "success" ? "text-green-500" :
                        alert.severity === "warning" ? "text-yellow-500" :
                        "text-blue-500"
                      }`} />
                      <div>
                        <p className="font-medium">{alert.type}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Smart Contracts</CardTitle>
                <CardDescription>Manage your automated trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smartContracts.map((contract) => (
                    <div key={contract.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Contract with {contract.buyer}</p>
                          <p className="text-sm text-muted-foreground">{contract.amount} {contract.frequency}</p>
                        </div>
                        <Button variant="outline" size="sm">Modify</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Next execution: {contract.nextExecution}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Management</CardTitle>
                <CardDescription>Create and manage contracts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">Create New Contract</Button>
                  <Button variant="outline" className="w-full">View Contract History</Button>
                  <Button variant="outline" className="w-full">Contract Templates</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 