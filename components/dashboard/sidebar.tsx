"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Zap, BarChart3, History, Wallet, FileText, Settings, HelpCircle, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Energy Trading", href: "/trading", icon: Zap },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "History", href: "/history", icon: History },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Contracts", href: "/contracts", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 text-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Zap className="h-8 w-8 text-green-500" />
          <h1 className="text-xl font-bold">EnergyChain</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                pathname === item.href ? "bg-green-900/50 text-green-500" : "hover:bg-gray-800",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 flex items-center justify-between">
        <button className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
        <ThemeToggle />
      </div>
    </div>
  )
}
