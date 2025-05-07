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
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
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

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   if (!canvas) return

  //   const ctx = canvas.getContext('2d')
  //   if (!ctx) return

  //   // Set dimensions based on device pixel ratio
  //   const dpr = window.devicePixelRatio || 1
  //   const baseWidth = 800
  //   const zoomedWidth = baseWidth * zoomLevel
  //   const height = 300
  //   canvas.width = zoomedWidth * dpr
  //   canvas.height = height * dpr
  //   ctx.scale(dpr, dpr)

  //   // Set canvas dimensions in CSS
  //   canvas.style.width = `${zoomedWidth}px`
  //   canvas.style.height = `${height}px`

  //   // Clear canvas
  //   ctx.clearRect(0, 0, zoomedWidth, height)

  //   // Draw grid
  //   ctx.strokeStyle = '#3f3f46' // zinc-700
  //   ctx.lineWidth = 1

  //   // Vertical grid lines - adjust spacing based on zoom
  //   const gridSpacing = 50 * zoomLevel
  //   for (let i = 0; i <= zoomedWidth; i += gridSpacing) {
  //     ctx.beginPath()
  //     ctx.moveTo(i, 0)
  //     ctx.lineTo(i, height)
  //     ctx.stroke()
  //   }

  //   // Horizontal grid lines
  //   for (let i = 0; i <= height; i += 50) {
  //     ctx.beginPath()
  //     ctx.moveTo(0, i)
  //     ctx.lineTo(zoomedWidth, i)
  //     ctx.stroke()
  //   }

  //   // // Draw speed data
  //   // ctx.beginPath()
  //   // ctx.moveTo(0, height - (telemetry[0]?.SpeedKmh / 350) * height)

  //   // for (let i = 1; i < telemetry.length; i++) {
  //   //   const x = (i / (telemetry.length - 1)) * zoomedWidth
  //   //   const y = height - (telemetry[i].SpeedKmh / 350) * height
  //   //   ctx.lineTo(x, y)
  //   // }

  //   // ctx.strokeStyle = '#3b82f6' // blue-500
  //   // ctx.lineWidth = 3
  //   // ctx.stroke()

  //   // Draw throttle data
  //   ctx.beginPath()
  //   ctx.moveTo(0, height - (telemetry[0]?.Gas / 100) * height)

  //   for (let i = 1; i < telemetry.length; i++) {
  //     const x = (i / (telemetry.length - 1)) * zoomedWidth
  //     const y = height - (telemetry[i].Gas / 100) * height
  //     ctx.lineTo(x, y)
  //   }

  //   ctx.strokeStyle = '#22c55e' // green-500
  //   ctx.lineWidth = 2
  //   ctx.stroke()

  //   // Draw brake data
  //   ctx.beginPath()
  //   ctx.moveTo(0, height - (telemetry[0]?.Brake / 100) * height)

  //   for (let i = 1; i < telemetry.length; i++) {
  //     const x = (i / (telemetry.length - 1)) * zoomedWidth
  //     const y = height - (telemetry[i].Brake / 100) * height
  //     ctx.lineTo(x, y)
  //   }

  //   ctx.strokeStyle = '#ef4444' // red-500
  //   ctx.lineWidth = 2
  //   ctx.stroke()

  //   // Draw legend
  //   const legendItems = [
  //     // { label: 'Speed', color: '#3b82f6' },
  //     { label: 'Throttle', color: '#22c55e' },
  //     { label: 'Brake', color: '#ef4444' }
  //   ]

  //   legendItems.forEach((item, index) => {
  //     const x = 20 + index * 100
  //     const y = 20

  //     // Line
  //     ctx.beginPath()
  //     ctx.moveTo(x, y)
  //     ctx.lineTo(x + 20, y)
  //     ctx.strokeStyle = item.color
  //     ctx.lineWidth = 3
  //     ctx.stroke()

  //     // Label
  //     ctx.fillStyle = '#ffffff'
  //     ctx.font = '12px sans-serif'
  //     ctx.fillText(item.label, x + 25, y + 4)
  //   })

  //   // Sync scroll position when zoom changes
  //   if (containerRef.current) {
  //     containerRef.current.scrollLeft = scrollPosition
  //   }
  // }, [zoomLevel, scrollPosition])

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
          data={chartData}
          margin={{
            left: 12,
            right: 12
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                }}
              />
            }
          />
          <Line
            dataKey={activeChart}
            type="monotone"
            stroke={`var(--color-${activeChart})`}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
