import { Button } from '@renderer/components/ui/button'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@renderer/components/ui/chart'
import { Tabs, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { RacemetryData } from '@renderer/lib/types'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

const chartConfig = {
  views: {
    label: 'Throttle'
  },
  Gas: {
    label: 'Throttle',
    color: '#00cc00'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export default function Dashboard(): React.JSX.Element {
  const [telemetry, setTelemetry] = useState<RacemetryData[]>([])

  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Add zoom in function
  const zoomIn = (): void => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4))
  }

  // Add zoom out function
  const zoomOut = (): void => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1))
  }

  useEffect(() => {
    const storedData = localStorage.getItem('telemetryData')
    const data: RacemetryData[] = storedData ? JSON.parse(storedData) : []
    setTelemetry(data)
    console.log(data)
  }, [])

  //////////////
  // Handle double-click to zoom
  const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Get click position relative to canvas
    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left

    // If already zoomed in, zoom out
    if (zoomLevel >= 2) {
      setZoomLevel(1)
      setScrollPosition(0)
      return
    }

    // Zoom to 2x
    setZoomLevel(2)

    // Calculate the center point to focus on
    const containerWidth = container.clientWidth
    const targetScrollPosition = Math.max(0, clickX * 2 - containerWidth / 2)

    // Set scroll position
    setScrollPosition(targetScrollPosition)

    // Apply scroll after state update and re-render
    setTimeout(() => {
      if (container) {
        container.scrollLeft = targetScrollPosition
      }
    }, 0)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="speed">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger value="speed" className="data-[state=active]:bg-zinc-700">
              Speed
            </TabsTrigger>
            <TabsTrigger value="inputs" className="data-[state=active]:bg-zinc-700">
              Inputs
            </TabsTrigger>
            <TabsTrigger value="gforce" className="data-[state=active]:bg-zinc-700">
              G-Force
            </TabsTrigger>
            <TabsTrigger value="tires" className="data-[state=active]:bg-zinc-700">
              Tires
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-zinc-800 border-zinc-700"
            onClick={zoomOut}
            disabled={zoomLevel <= 1}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs text-zinc-400">{zoomLevel}x</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-zinc-800 border-zinc-700"
            onClick={zoomIn}
            disabled={zoomLevel >= 4}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
        <LineChart
          accessibilityLayer
          data={telemetry}
          margin={{
            left: 12,
            right: 12
          }}
        >
          <CartesianGrid vertical={false} />

          <ChartTooltip content={<ChartTooltipContent className="w-[250px]" nameKey="views" />} />
          <Line dataKey={'Gas'} type="monotone" stroke={`#00cc00`} strokeWidth={2} dot={false} />
          <Line dataKey={'Brake'} type="monotone" stroke={`#fc0303`} strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
