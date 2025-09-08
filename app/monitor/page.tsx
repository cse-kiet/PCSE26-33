"use client"

import EnergyFlowDiagram from "@/app/components/EnergyFlowDiagram"
import EnergyTrendsChart from "@/app/components/EnergyTrendsChart"
import { ChargingTrendsChart, ProductionForecastChart, SustainabilityTrendsChart } from "@/app/components/ForecastCharts"
import HistoryDialog from "@/app/components/HistoryDialog"
import { virtualMeter } from "@/app/lib/virtualMeter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Activity,
    ArrowDownToLine,
    ArrowUpFromLine,
    Battery,
    BatteryCharging,
    Clock,
    CloudSun,
    Download,
    Droplets,
    Gauge,
    Home,
    Power,
    RefreshCw,
    Sun
} from "lucide-react"
import { useEffect, useState } from "react"

export default function EnergyMonitor() {
  type TimeRange = "hourly" | "daily" | "weekly" | "monthly"
  const [timeRange, setTimeRange] = useState<TimeRange>("hourly")
  const [activeTab, setActiveTab] = useState("overview")
  const [energyData, setEnergyData] = useState(virtualMeter.getMeterData())

  // Update meter data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData(virtualMeter.getMeterData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Handle manual refresh
  const handleRefresh = () => {
    setEnergyData(virtualMeter.getMeterData())
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Energy Monitor</h1>
          <p className="text-muted-foreground">Real-time energy production and consumption</p>
        </div>
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-card rounded-lg p-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTimeRange("hourly")}
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hourly View</p>
                </TooltipContent>
              </Tooltip>

              <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
                <SelectTrigger className="w-[130px] h-8">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly View</SelectItem>
                  <SelectItem value="daily">Daily View</SelectItem>
                  <SelectItem value="weekly">Weekly View</SelectItem>
                  <SelectItem value="monthly">Monthly View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 bg-card rounded-lg p-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleRefresh}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh Data</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export Data</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <HistoryDialog />
                </TooltipTrigger>
                <TooltipContent>
                  <p>View History</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>

      {/* Live Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Solar Production</CardTitle>
            <Sun className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{energyData.production.current} kWh</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpFromLine className="h-4 w-4 text-green-400 mr-1" />
              {energyData.production.trend}% from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Consumption</CardTitle>
            <Home className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{energyData.consumption.current} kWh</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownToLine className="h-4 w-4 text-green-400 mr-1" />
              {energyData.consumption.trend}% from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Battery Level</CardTitle>
            <BatteryCharging className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{energyData.battery.level}</div>
            <p className="text-xs text-muted-foreground">
              {energyData.battery.backupTime} backup remaining
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Grid Balance</CardTitle>
            <Power className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{energyData.grid.balance} kWh</div>
            <p className="text-xs text-muted-foreground">Net energy exchange</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-card">
          <TabsTrigger value="overview" className="data-[state=active]:bg-accent">
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="battery" className="data-[state=active]:bg-accent">
            <Battery className="h-4 w-4 mr-2" />
            Battery
          </TabsTrigger>
          <TabsTrigger value="forecast" className="data-[state=active]:bg-accent">
            <CloudSun className="h-4 w-4 mr-2" />
            Forecast
          </TabsTrigger>
          <TabsTrigger value="sustainability" className="data-[state=active]:bg-accent">
            <Droplets className="h-4 w-4 mr-2" />
            Sustainability
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Energy Flow Diagram</CardTitle>
                <CardDescription>Real-time energy distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <EnergyFlowDiagram
                  production={energyData.production}
                  consumption={energyData.consumption}
                  battery={energyData.battery}
                  grid={energyData.grid}
                />
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Production vs. Consumption</CardTitle>
                <CardDescription>Energy trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <EnergyTrendsChart timeRange={timeRange} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Battery Tab */}
        <TabsContent value="battery" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Battery Health</CardTitle>
                <CardDescription>Current status and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Gauge className="h-4 w-4 text-blue-500" />
                      <span>Battery Health</span>
                    </div>
                    <span className="text-green-500">{energyData.battery.health}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ArrowDownToLine className="h-4 w-4 text-green-500" />
                      <span>Input Rate</span>
                    </div>
                    <span>{energyData.battery.inputRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ArrowUpFromLine className="h-4 w-4 text-yellow-500" />
                      <span>Output Rate</span>
                    </div>
                    <span>{energyData.battery.outputRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Charging Trends</CardTitle>
                <CardDescription>Battery usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Battery charging trend chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Production Forecast</CardTitle>
                <CardDescription>Expected energy generation</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductionForecastChart />
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Charging Trends</CardTitle>
                <CardDescription>Battery usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ChargingTrendsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sustainability Tab */}
        <TabsContent value="sustainability" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Carbon Savings</CardTitle>
                <CardDescription>Environmental impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 space-y-2">
                  <div className="text-4xl font-bold text-green-500">{energyData.carbon.saved}</div>
                  <p className="text-sm text-muted-foreground">CO₂ Emissions Avoided</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Tree Equivalent</CardTitle>
                <CardDescription>Impact visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 space-y-2">
                  <div className="text-4xl font-bold text-green-500">{energyData.carbon.trees}</div>
                  <p className="text-sm text-muted-foreground">Trees Planted Equivalent</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Miles Saved</CardTitle>
                <CardDescription>Car emissions avoided</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 space-y-2">
                  <div className="text-4xl font-bold text-green-500">{energyData.carbon.milesSaved}</div>
                  <p className="text-sm text-muted-foreground">Car Miles Not Driven</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Sustainability Trends</CardTitle>
              <CardDescription>Long-term environmental impact</CardDescription>
            </CardHeader>
            <CardContent>
              <SustainabilityTrendsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 