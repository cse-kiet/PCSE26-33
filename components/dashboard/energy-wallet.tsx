"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EnergyWallet() {
  // This would be fetched from your blockchain/API in a real implementation
  const walletData = {
    balance: 245.8,
    tokenValue: 0.12, // in USD or other currency
    change24h: 3.2, // percentage
  }

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Wallet className="h-5 w-5 text-green-500 mr-2" />
          Energy Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="text-gray-400 text-sm">Token Balance</div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-white">{walletData.balance}</span>
              <span className="text-gray-400 ml-2 text-sm">kWh</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-400">≈ ${(walletData.balance * walletData.tokenValue).toFixed(2)}</span>
              <div
                className={`flex items-center ml-2 ${walletData.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {walletData.change24h >= 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span className="text-xs ml-1">{Math.abs(walletData.change24h)}%</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Buy</Button>
            <Button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white">Sell</Button>
          </div>

          <div className="pt-2 border-t border-border text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Token Value</span>
              <span>${walletData.tokenValue} / kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
