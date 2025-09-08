"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data for smart contracts
const contracts = [
  {
    id: "SC-001",
    name: "Daily Energy Purchase",
    type: "Recurring Buy",
    status: "active",
    nextExecution: "Today, 18:00",
  },
  {
    id: "SC-002",
    name: "Surplus Auto-Sell",
    type: "Conditional Sell",
    status: "active",
    nextExecution: "When surplus > 2kWh",
  },
  {
    id: "SC-003",
    name: "Weekend Trading Halt",
    type: "Time-based",
    status: "pending",
    nextExecution: "Sat, 00:00",
  },
]

export default function SmartContracts() {
  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <FileText className="h-5 w-5 text-green-500 mr-2" />
          Smart Contracts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {contracts.map((contract) => (
            <div key={contract.id} className="p-3 bg-muted rounded-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{contract.name}</h4>
                  <p className="text-xs text-gray-400">{contract.type}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`
                    ${
                      contract.status === "active"
                        ? "bg-green-900/20 text-green-500 border-green-800"
                        : "bg-yellow-900/20 text-yellow-500 border-yellow-800"
                    }
                  `}
                >
                  {contract.status}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-2">
                <Clock className="h-3 w-3 mr-1" />
                <span>Next: {contract.nextExecution}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">Create New Contract</Button>
        </div>
      </CardContent>
    </Card>
  )
}
