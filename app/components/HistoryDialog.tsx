"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { History } from "lucide-react"

interface HistoryEntry {
  timestamp: Date
  production: string
  consumption: string
  batteryLevel: string
  gridBalance: string
}

// Generate mock history data
const generateHistoryData = (): HistoryEntry[] => {
  const data: HistoryEntry[] = []
  const now = new Date()

  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000) // Past 24 hours
    data.push({
      timestamp,
      production: `${(4 + Math.random() * 2).toFixed(1)} kWh`,
      consumption: `${(3 + Math.random() * 2).toFixed(1)} kWh`,
      batteryLevel: `${(50 + Math.random() * 50).toFixed(0)}%`,
      gridBalance: `${(-1 + Math.random() * 2).toFixed(1)} kWh`,
    })
  }

  return data
}

export default function HistoryDialog() {
  const historyData = generateHistoryData()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          title="View History"
        >
          <History className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Energy History
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Production</TableHead>
                <TableHead>Consumption</TableHead>
                <TableHead>Battery Level</TableHead>
                <TableHead>Grid Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{format(entry.timestamp, 'HH:mm dd/MM')}</TableCell>
                  <TableCell className="text-yellow-500">{entry.production}</TableCell>
                  <TableCell className="text-blue-500">{entry.consumption}</TableCell>
                  <TableCell className="text-green-500">{entry.batteryLevel}</TableCell>
                  <TableCell className={entry.gridBalance.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
                    {entry.gridBalance}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
} 