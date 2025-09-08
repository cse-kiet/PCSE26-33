"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    BarChart3,
    Battery,
    Coins,
    History,
    Home,
    LineChart,
    LogOut,
    Settings,
    ShieldAlert,
    User,
    Wallet,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const roleBasedNavItems = {
  prosumer: [
    { href: "/dashboard/prosumer", label: "Dashboard", icon: Home },
    { href: "/monitor", label: "Energy Monitor", icon: Battery },
    { href: "/market", label: "P2P Market", icon: Coins },
    { href: "/transactions", label: "Transaction History", icon: History },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
  consumer: [
    { href: "/dashboard/consumer", label: "Dashboard", icon: Home },
    { href: "/market", label: "Buy Energy", icon: Coins },
    { href: "/usage", label: "Usage Tracking", icon: LineChart },
    { href: "/wallet", label: "Token Wallet", icon: Wallet },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
  utility: [
    { href: "/dashboard/utility", label: "Dashboard", icon: Home },
    { href: "/grid", label: "Grid Monitor", icon: BarChart3 },
    { href: "/analytics", label: "Analytics", icon: LineChart },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: Home },
    { href: "/users", label: "User Management", icon: User },
    { href: "/system", label: "System Health", icon: ShieldAlert },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
  regulator: [
    { href: "/dashboard/regulator", label: "Dashboard", icon: Home },
    { href: "/compliance", label: "Compliance", icon: ShieldAlert },
    { href: "/reports", label: "Reports", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
}

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  
  // In a real app, this would come from your auth state management
  const userRole = pathname.split('/')[2] || 'prosumer'
  const navItems = roleBasedNavItems[userRole] || []

  const handleLogout = () => {
    // In a real app, implement proper logout logic here
    router.push('/auth/login')
  }

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-xl">
            Energy Trading
          </Link>
        </div>

        <div className="flex items-center space-x-6 ml-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User Name</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
} 