"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, RefreshCw, Trash2 } from "lucide-react"

export function IoTDevices() {
  const mockDevices = [
    {
      id: "sm-001",
      name: "Smart Meter #1",
      location: "Main House",
      status: "online",
      lastSync: "2 minutes ago"
    },
    {
      id: "sm-002",
      name: "Smart Meter #2",
      location: "Solar Panel Array",
      status: "offline",
      lastSync: "1 hour ago"
    }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>IoT Devices</CardTitle>
              <CardDescription>
                Manage your connected smart meters and energy devices
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDevices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{device.name}</h3>
                    <Badge variant={device.status === "online" ? "default" : "secondary"}>
                      {device.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{device.location}</p>
                  <p className="text-sm text-gray-500">Last synced: {device.lastSync}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Troubleshooting</CardTitle>
          <CardDescription>
            Tools to help diagnose and fix device connection issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Run Network Diagnostics
            </Button>
            <Button variant="outline" className="w-full">
              Sync All Devices
            </Button>
            <Button variant="outline" className="w-full">
              Download Device Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 