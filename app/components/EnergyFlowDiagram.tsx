"use client"

import { Battery, Home, Power, Sun } from "lucide-react"
import { useCallback } from "react"
import ReactFlow, {
    Background,
    Controls,
    Edge,
    Handle,
    Node,
    Position,
    useEdgesState,
    useNodesState
} from "reactflow"
import "reactflow/dist/style.css"

interface EnergyFlowDiagramProps {
  production: {
    current: string
    solar: string
    wind: string
  }
  consumption: {
    current: string
    home: string
    devices: string
  }
  battery: {
    level: string
    inputRate: string
    outputRate: string
  }
  grid: {
    imported: string
    exported: string
    balance: string
  }
}

// Custom node components with dark mode styles
const SolarNode = ({ data }: { data: any }) => (
  <div className="bg-yellow-950/50 p-4 rounded-lg border-2 border-yellow-600/50 min-w-[150px] text-yellow-100">
    <Handle type="source" position={Position.Bottom} />
    <div className="flex items-center gap-2">
      <Sun className="text-yellow-400" />
      <div>
        <div className="font-semibold">Solar Production</div>
        <div className="text-sm">{data.value} kWh</div>
      </div>
    </div>
  </div>
)

const HomeNode = ({ data }: { data: any }) => (
  <div className="bg-blue-950/50 p-4 rounded-lg border-2 border-blue-600/50 min-w-[150px] text-blue-100">
    <Handle type="target" position={Position.Top} />
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Bottom} />
    <div className="flex items-center gap-2">
      <Home className="text-blue-400" />
      <div>
        <div className="font-semibold">Consumption</div>
        <div className="text-sm">{data.value} kWh</div>
      </div>
    </div>
  </div>
)

const BatteryNode = ({ data }: { data: any }) => (
  <div className="bg-green-950/50 p-4 rounded-lg border-2 border-green-600/50 min-w-[150px] text-green-100">
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    <div className="flex items-center gap-2">
      <Battery className="text-green-400" />
      <div>
        <div className="font-semibold">Battery Storage</div>
        <div className="text-sm">{data.value}</div>
        <div className="text-xs text-green-300/70">
          In: {data.inputRate} kWh | Out: {data.outputRate} kWh
        </div>
      </div>
    </div>
  </div>
)

const GridNode = ({ data }: { data: any }) => (
  <div className="bg-purple-950/50 p-4 rounded-lg border-2 border-purple-600/50 min-w-[150px] text-purple-100">
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Right} />
    <div className="flex items-center gap-2">
      <Power className="text-purple-400" />
      <div>
        <div className="font-semibold">Grid</div>
        <div className="text-sm">Balance: {data.balance} kWh</div>
        <div className="text-xs text-purple-300/70">
          Import: {data.imported} kWh | Export: {data.exported} kWh
        </div>
      </div>
    </div>
  </div>
)

const nodeTypes = {
  solar: SolarNode,
  home: HomeNode,
  battery: BatteryNode,
  grid: GridNode,
}

export default function EnergyFlowDiagram({
  production,
  consumption,
  battery,
  grid,
}: EnergyFlowDiagramProps) {
  // Define initial nodes
  const initialNodes: Node[] = [
    {
      id: "1",
      type: "solar",
      position: { x: 250, y: 0 },
      data: { value: production.current },
    },
    {
      id: "2",
      type: "home",
      position: { x: 250, y: 150 },
      data: { value: consumption.current },
    },
    {
      id: "3",
      type: "battery",
      position: { x: 250, y: 300 },
      data: { 
        value: battery.level,
        inputRate: battery.inputRate,
        outputRate: battery.outputRate,
      },
    },
    {
      id: "4",
      type: "grid",
      position: { x: 500, y: 150 },
      data: { 
        balance: grid.balance,
        imported: grid.imported,
        exported: grid.exported,
      },
    },
  ]

  // Define edges with animated lines
  const initialEdges: Edge[] = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "#facc15" }, // Yellow color for solar energy
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      animated: true,
      style: { stroke: "#3b82f6" }, // Blue color for consumption flow
    },
    {
      id: "e3-2",
      source: "3",
      target: "2",
      animated: true,
      style: { stroke: "#22c55e" }, // Green color for battery discharge
    },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      animated: true,
      style: { stroke: "#a855f7" }, // Purple color for grid interaction
    },
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Update node positions on drag
  const onNodeDragStop = useCallback(
    (event: any, node: Node) => {
      const updatedNodes = nodes.map((n) => {
        if (n.id === node.id) {
          return { ...n, position: node.position }
        }
        return n
      })
      setNodes(updatedNodes)
    },
    [nodes, setNodes]
  )

  return (
    <div className="h-[300px] w-full border rounded-lg border-border bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background className="bg-background" />
        <Controls />
      </ReactFlow>
    </div>
  )
} 