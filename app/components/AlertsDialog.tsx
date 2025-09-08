"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Bell } from "lucide-react"

interface Alert {
  id: number
  type: string
  message: string
  severity: "success" | "warning" | "info"
  time: string
}

interface AlertsDialogProps {
  alerts: Alert[]
}

export default function AlertsDialog({ alerts }: AlertsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          title="View Recent Alerts"
        >
          <Bell className="h-4 w-4" />
          {alerts.length > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500">
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-ping" />
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Alerts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center space-x-4 p-3 border rounded-lg bg-card"
            >
              <AlertTriangle
                className={`h-5 w-5 ${
                  alert.severity === "success"
                    ? "text-green-500"
                    : alert.severity === "warning"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              />
              <div className="flex-1">
                <p className="font-medium text-card-foreground">{alert.type}</p>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {alert.time}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 