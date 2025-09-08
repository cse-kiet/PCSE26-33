"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Key, Link as LinkIcon } from "lucide-react"

export function DIDManagement() {
  const mockDID = "did:ethr:0x1234...abcd"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Decentralized Identity (DID)</CardTitle>
          <CardDescription>
            View and manage your decentralized identity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Your DID</AlertTitle>
            <AlertDescription className="font-mono">
              {mockDID}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <Key className="mr-2 h-4 w-4" />
              View DID Document
            </Button>
            <Button variant="outline" className="w-full">
              Regenerate Keys
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>External Identity Providers</CardTitle>
          <CardDescription>
            Link or unlink external accounts to your DID
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="/google-icon.png" alt="Google" className="w-6 h-6" />
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-gray-500">Not connected</p>
                </div>
              </div>
              <Button variant="outline">
                <LinkIcon className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="/metamask-icon.png" alt="MetaMask" className="w-6 h-6" />
                <div>
                  <p className="font-medium">MetaMask</p>
                  <p className="text-sm text-gray-500">Connected</p>
                </div>
              </div>
              <Button variant="outline" className="text-red-500 hover:text-red-600">
                Disconnect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 