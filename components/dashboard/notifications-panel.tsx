"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Zap, ArrowRightLeft, FileText } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for notifications
const notifications = [
  {
    id: 1,
    type: "trade",
    message: "Your sell order of 1.8 kWh was completed",
    time: "10 min ago",
    icon: ArrowRightLeft,
    read: false,
  },
  {
    id: 2,
    type: "energy",
    message: "Energy production exceeded daily average by 15%",
    time: "2 hours ago",
    icon: Zap,
    read: false,
  },
  {
    id: 3,
    type: "contract",
    message: "Smart contract #45B2 was executed successfully",
    time: "Yesterday",
    icon: FileText,
    read: true,
  },
  {
    id: 4,
    type: "trade",
    message: "New buy offer available at $0.11/kWh",
    time: "Yesterday",
    icon: ArrowRightLeft,
    read: true,
  },
]

export default function NotificationsPanel() {
  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Bell className="h-5 w-5 text-green-500 mr-2" />
          Notifications
          <div className="ml-auto bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.filter((n) => !n.read).length}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px] pr-4">
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-md flex items-start ${notification.read ? "bg-muted/50" : "bg-muted"} ${!notification.read ? "border-l-2 border-green-500" : ""}`}
                >
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      notification.type === "trade"
                        ? "bg-blue-900/20 text-blue-500"
                        : notification.type === "energy"
                          ? "bg-green-900/20 text-green-500"
                          : "bg-yellow-900/20 text-yellow-500"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
