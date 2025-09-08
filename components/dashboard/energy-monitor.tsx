"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function EnergyMonitor() {
  // This would be fetched from your blockchain/API in a real implementation
  const energyData = {
    currentProduction: 3.8,
    currentConsumption: 2.1,
    surplus: 1.7,
    capacity: 5.0,
    productionChange: 12, // percentage
    consumptionChange: -8, // percentage
  }

  const productionPercentage = (energyData.currentProduction / energyData.capacity) * 100

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Zap className="h-5 w-5 text-green-500 mr-2" />
          Real-Time Energy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Production</span>
              <div className="flex items-center">
                <span className="text-white font-medium">{energyData.currentProduction} kWh</span>
                <div
                  className={`flex items-center ml-2 ${energyData.productionChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {energyData.productionChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span className="text-xs ml-1">{Math.abs(energyData.productionChange)}%</span>
                </div>
              </div>
            </div>
            <Progress value={productionPercentage} className="h-2 bg-muted">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${productionPercentage}%` }}
              />
            </Progress>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Consumption</span>
              <div className="flex items-center">
                <span className="text-white font-medium">{energyData.currentConsumption} kWh</span>
                <div
                  className={`flex items-center ml-2 ${energyData.consumptionChange <= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {energyData.consumptionChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span className="text-xs ml-1">{Math.abs(energyData.consumptionChange)}%</span>
                </div>
              </div>
            </div>
            <Progress value={(energyData.currentConsumption / energyData.capacity) * 100} className="h-2 bg-muted">
              <div
                className="h-full bg-gray-600 dark:bg-gray-600 rounded-full transition-all"
                style={{ width: `${(energyData.currentConsumption / energyData.capacity) * 100}%` }}
              />
            </Progress>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Available Surplus</span>
              <span className="text-green-500 font-bold text-xl">{energyData.surplus} kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
