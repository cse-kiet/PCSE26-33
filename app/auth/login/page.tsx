"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Battery, Coins, Factory, Shield, User, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Define the form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  role: z.string().min(1, "Please select a role")
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: ""
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      // Here you would typically make an API call to authenticate
      console.log("Form data:", data)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push(`/dashboard/${data.role}`)
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Update the role in the form when the select changes
  const handleRoleChange = (newRole: string) => {
    setRole(newRole)
    setValue("role", newRole)
  }

  const roles = [
    { 
      id: "prosumer", 
      label: "Prosumer", 
      description: "Generate and trade electricity",
      icon: Battery,
      color: "text-green-500"
    },
    { 
      id: "consumer", 
      label: "Consumer", 
      description: "Buy electricity from the network",
      icon: User,
      color: "text-blue-500"
    },
    { 
      id: "utility", 
      label: "Utility Company", 
      description: "Monitor and manage grid operations",
      icon: Factory,
      color: "text-yellow-500"
    },
    { 
      id: "admin", 
      label: "System Administrator", 
      description: "Manage platform operations",
      icon: Users,
      color: "text-purple-500"
    },
    { 
      id: "regulator", 
      label: "Regulator", 
      description: "Audit and compliance monitoring",
      icon: Shield,
      color: "text-red-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="text-white space-y-6 p-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter">
              Energy Trading Platform
            </h1>
            <p className="text-gray-400 text-lg">
              Revolutionizing energy distribution through blockchain technology
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Coins className="h-6 w-6 text-yellow-500" />
              <p>Transparent and secure energy trading</p>
            </div>
            <div className="flex items-center space-x-3">
              <Battery className="h-6 w-6 text-green-500" />
              <p>Real-time energy monitoring</p>
            </div>
            <div className="flex items-center space-x-3">
              <Factory className="h-6 w-6 text-blue-500" />
              <p>Smart grid integration</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="w-full backdrop-blur-sm bg-white/10 border-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
            <CardDescription className="text-gray-400">
              Choose your role and sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <Alert variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20 py-2">
                    <AlertDescription>{errors.email.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password")}
                />
                {errors.password && (
                  <Alert variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20 py-2">
                    <AlertDescription>{errors.password.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-white">Select Role</Label>
                <Select value={role} onValueChange={handleRoleChange}>
                  <SelectTrigger 
                    className={`bg-gray-800/50 border-gray-700 text-white ${
                      errors.role ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {roles.map((role) => {
                      const Icon = role.icon
                      return (
                        <SelectItem 
                          key={role.id} 
                          value={role.id}
                          className="text-white focus:bg-gray-700 focus:text-white"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className={`h-4 w-4 ${role.color}`} />
                            <div>
                              <p className="font-medium">{role.label}</p>
                              <p className="text-sm text-gray-400">{role.description}</p>
                            </div>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <Alert variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20 py-2">
                    <AlertDescription>{errors.role.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center">
                <a href="/auth/register" className="text-sm text-gray-400 hover:text-white hover:underline">
                  Don't have an account? Register here
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 