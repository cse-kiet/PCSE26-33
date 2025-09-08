"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Zap, ArrowRightLeft, TrendingUp, Clock } from "lucide-react"

// Mock data for available offers
const mockOffers = [
  { id: 1, seller: "0x8F3...21A", amount: 5.2, price: 0.11, expiry: "2h 15m" },
  { id: 2, seller: "0x6D2...9B4", amount: 3.8, price: 0.12, expiry: "4h 30m" },
  { id: 3, seller: "0x3A7...F45", amount: 7.5, price: 0.1, expiry: "1h 45m" },
  { id: 4, seller: "0x2C1...E67", amount: 2.1, price: 0.13, expiry: "5h 20m" },
]

export default function TradingPanel() {
  const [amount, setAmount] = useState(3)
  const [price, setPrice] = useState(0.12)

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <ArrowRightLeft className="h-5 w-5 text-green-500 mr-2" />
          P2P Energy Trading
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="buy">Buy Energy</TabsTrigger>
            <TabsTrigger value="sell">Sell Energy</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="available-offers">Available Offers</Label>
                <div className="bg-muted rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-2 text-left text-gray-400">Seller</th>
                        <th className="px-4 py-2 text-left text-gray-400">Amount</th>
                        <th className="px-4 py-2 text-left text-gray-400">Price</th>
                        <th className="px-4 py-2 text-left text-gray-400">Expiry</th>
                        <th className="px-4 py-2 text-right text-gray-400">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOffers.map((offer) => (
                        <tr key={offer.id} className="border-b border-gray-700 last:border-0">
                          <td className="px-4 py-3">{offer.seller}</td>
                          <td className="px-4 py-3">{offer.amount} kWh</td>
                          <td className="px-4 py-3">${offer.price}/kWh</td>
                          <td className="px-4 py-3 flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-400" />
                            {offer.expiry}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 h-7 px-2">
                              Buy
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <h3 className="font-medium mb-3">Create Buy Order</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buy-amount">Amount (kWh)</Label>
                    <div className="space-y-2">
                      <Slider
                        id="buy-amount"
                        value={[amount]}
                        min={0.1}
                        max={10}
                        step={0.1}
                        onValueChange={(value) => setAmount(value[0])}
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>0.1 kWh</span>
                        <span>{amount} kWh</span>
                        <span>10 kWh</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buy-price">Max Price ($/kWh)</Label>
                    <div className="space-y-2">
                      <Slider
                        id="buy-price"
                        value={[price]}
                        min={0.05}
                        max={0.2}
                        step={0.01}
                        onValueChange={(value) => setPrice(value[0])}
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>$0.05</span>
                        <span>${price}</span>
                        <span>$0.20</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">Total Cost</div>
                    <div className="text-xl font-bold">${(amount * price).toFixed(2)}</div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Place Buy Order</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <div className="text-gray-400 text-sm mb-1">Available to Sell</div>
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">1.7 kWh</span>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-md">
                  <div className="text-gray-400 text-sm mb-1">Current Market Price</div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">$0.12/kWh</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="font-medium mb-3">Create Sell Order</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sell-amount">Amount (kWh)</Label>
                    <div className="space-y-2">
                      <Slider
                        id="sell-amount"
                        value={[amount]}
                        min={0.1}
                        max={1.7}
                        step={0.1}
                        onValueChange={(value) => setAmount(value[0])}
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>0.1 kWh</span>
                        <span>{amount} kWh</span>
                        <span>1.7 kWh</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sell-price">Min Price ($/kWh)</Label>
                    <div className="space-y-2">
                      <Slider
                        id="sell-price"
                        value={[price]}
                        min={0.05}
                        max={0.2}
                        step={0.01}
                        onValueChange={(value) => setPrice(value[0])}
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>$0.05</span>
                        <span>${price}</span>
                        <span>$0.20</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">Total Earnings</div>
                    <div className="text-xl font-bold">${(amount * price).toFixed(2)}</div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Place Sell Order</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
