"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Copy, Key, Wallet } from "lucide-react"

export function Connectivity() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Connection</CardTitle>
          <CardDescription>
            Connect your cryptocurrency wallet for energy trading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <Wallet className="h-6 w-6" />
              <div>
                <p className="font-medium">MetaMask</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            </div>
            <Button>Connect Wallet</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <img src="/walletconnect-icon.png" alt="WalletConnect" className="h-6 w-6" />
              <div>
                <p className="font-medium">WalletConnect</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>
            Manage API tokens for external integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Key className="h-4 w-4" />
            <AlertDescription className="font-mono text-sm">
              API Key: sk_test_123...abc
              <Button variant="ghost" size="sm" className="ml-2">
                <Copy className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Generate New API Key
            </Button>
            <Button variant="outline" className="w-full">
              Revoke All Keys
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Backup</CardTitle>
          <CardDescription>
            Configure automatic data backup settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Cloud Backup</Label>
              <p className="text-sm text-gray-500">
                Automatically backup your data to secure cloud storage
              </p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label>Backup Frequency</Label>
            <select className="w-full border rounded-md p-2">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 