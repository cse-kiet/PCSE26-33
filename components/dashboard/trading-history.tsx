"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for transaction history
const transactions = [
  {
    id: "tx-001",
    type: "buy",
    amount: 2.5,
    price: 0.11,
    total: 0.275,
    from: "0x6D2...9B4",
    timestamp: "2023-05-10T14:32:00",
    status: "completed",
  },
  {
    id: "tx-002",
    type: "sell",
    amount: 1.8,
    price: 0.12,
    total: 0.216,
    to: "0x3A7...F45",
    timestamp: "2023-05-09T11:15:00",
    status: "completed",
  },
  {
    id: "tx-003",
    type: "buy",
    amount: 3.2,
    price: 0.1,
    total: 0.32,
    from: "0x8F3...21A",
    timestamp: "2023-05-08T09:45:00",
    status: "completed",
  },
  {
    id: "tx-004",
    type: "sell",
    amount: 2.1,
    price: 0.13,
    total: 0.273,
    to: "0x2C1...E67",
    timestamp: "2023-05-07T16:20:00",
    status: "completed",
  },
]

export default function TradingHistory() {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <History className="h-5 w-5 text-green-500 mr-2" />
          Trading History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left text-gray-400">Type</th>
                <th className="px-4 py-2 text-left text-gray-400">Amount</th>
                <th className="px-4 py-2 text-left text-gray-400">Price</th>
                <th className="px-4 py-2 text-left text-gray-400">Total</th>
                <th className="px-4 py-2 text-left text-gray-400">Counterparty</th>
                <th className="px-4 py-2 text-left text-gray-400">Date</th>
                <th className="px-4 py-2 text-left text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-700 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {tx.type === "buy" ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-gray-400 mr-1" />
                      )}
                      <span className={tx.type === "buy" ? "text-green-500" : "text-gray-400"}>
                        {tx.type === "buy" ? "Buy" : "Sell"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{tx.amount} kWh</td>
                  <td className="px-4 py-3">${tx.price}/kWh</td>
                  <td className="px-4 py-3">${tx.total}</td>
                  <td className="px-4 py-3">{tx.type === "buy" ? tx.from : tx.to}</td>
                  <td className="px-4 py-3">{formatDate(tx.timestamp)}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="bg-green-900/20 text-green-500 border-green-800">
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
