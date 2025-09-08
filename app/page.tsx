import type { Metadata } from "next"
import EnergyMonitor from "@/components/dashboard/energy-monitor"
import TradingPanel from "@/components/dashboard/trading-panel"
import EnergyWallet from "@/components/dashboard/energy-wallet"
import UsageAnalytics from "@/components/dashboard/usage-analytics"
import TradingHistory from "@/components/dashboard/trading-history"
import NotificationsPanel from "@/components/dashboard/notifications-panel"
import SmartContracts from "@/components/dashboard/smart-contracts"

export const metadata: Metadata = {
  title: "Energy Trading Dashboard",
  description: "Blockchain-Enabled Ecosystem for Distributed Electricity Trading",
}

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-green-500">Energy Trading Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top row - Key metrics */}
        <EnergyMonitor />
        <EnergyWallet />
        <NotificationsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Middle row - Trading and analytics */}
        <div className="lg:col-span-2">
          <TradingPanel />
        </div>
        <div>
          <UsageAnalytics />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bottom row - History and contracts */}
        <div className="lg:col-span-2">
          <TradingHistory />
        </div>
        <div>
          <SmartContracts />
        </div>
      </div>
    </div>
  )
}
