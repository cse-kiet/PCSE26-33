"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

export function NotificationPreferences() {
  const notificationTypes = [
    {
      id: "trade-matches",
      title: "Trade Matches",
      description: "Get notified when someone matches your energy trade offer"
    },
    {
      id: "price-changes",
      title: "Price Changes",
      description: "Alerts for significant changes in energy prices"
    },
    {
      id: "energy-surplus",
      title: "Energy Surplus",
      description: "Notifications when you have excess energy to trade"
    },
    {
      id: "system-updates",
      title: "System Updates",
      description: "Important updates about the platform"
    },
    {
      id: "security-alerts",
      title: "Security Alerts",
      description: "Notifications about account security and suspicious activity"
    }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>
            Choose which notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationTypes.map((type) => (
            <div key={type.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor={type.id}>{type.title}</Label>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
              <Switch id={type.id} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Methods</CardTitle>
          <CardDescription>
            Select how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Email Notifications</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="email-all" />
                <Label htmlFor="email-all">All notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="important" id="email-important" />
                <Label htmlFor="email-important">Important only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="email-none" />
                <Label htmlFor="email-none">None</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>SMS Notifications</Label>
            <RadioGroup defaultValue="important">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="sms-all" />
                <Label htmlFor="sms-all">All notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="important" id="sms-important" />
                <Label htmlFor="sms-important">Important only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="sms-none" />
                <Label htmlFor="sms-none">None</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>App Notifications</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="app-all" />
                <Label htmlFor="app-all">All notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="important" id="app-important" />
                <Label htmlFor="app-important">Important only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="app-none" />
                <Label htmlFor="app-none">None</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 