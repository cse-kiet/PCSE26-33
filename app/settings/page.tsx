import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountManagement } from "./components/account"
import { Connectivity } from "./components/connectivity"
import { DIDManagement } from "./components/did-management"
import { IoTDevices } from "./components/iot-devices"
import { NotificationPreferences } from "./components/notifications"
import { SecuritySettings } from "./components/security"
import { UIPreferences } from "./components/ui-preferences"
import { UserProfile } from "./components/user-profile"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="did">DID</TabsTrigger>
          <TabsTrigger value="iot">IoT Devices</TabsTrigger>
          <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ui">UI</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="did">
            <DIDManagement />
          </TabsContent>
          
          <TabsContent value="iot">
            <IoTDevices />
          </TabsContent>
          
          <TabsContent value="connectivity">
            <Connectivity />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationPreferences />
          </TabsContent>
          
          <TabsContent value="ui">
            <UIPreferences />
          </TabsContent>
          
          <TabsContent value="account">
            <AccountManagement />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
} 