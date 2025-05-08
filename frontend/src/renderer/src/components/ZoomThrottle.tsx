import { useState, useEffect, useMemo, useRef } from 'react'
import {
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  ReferenceArea,
  ResponsiveContainer,
  Line
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@renderer/components/ui/chart'
import { RacemetryData } from '@renderer/lib/types'

type ZoomableChartProps = {
  data?: RacemetryData[]
}

const chartConfig = {
  Gas: {
    label: 'Throttle',
    color: '#0390fc'
  },
  Brake: {
    label: 'Brake',
    color: '#ef4444'
  }
} satisfies ChartConfig

export function ZoomThrottle({ data: initialData }: ZoomableChartProps): React.JSX.Element {
  const [data, setData] = useState<RacemetryData[]>(initialData || [])
  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null)
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [originalData, setOriginalData] = useState<RacemetryData[]>(initialData || [])
  const [isSelecting, setIsSelecting] = useState<boolean>(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialData?.length) {
      setData(initialData)
      setOriginalData(initialData)
      setStartTime(initialData[0].PacketId)
      setEndTime(initialData[initialData.length - 1].PacketId)
    }
  }, [initialData])

  const zoomedData = useMemo(() => {
    if (!startTime || !endTime) {
      return data
    }

    const dataPointsInRange = originalData.filter(
      (dataPoint) => dataPoint.PacketId >= startTime && dataPoint.PacketId <= endTime
    )

    // Ensure we have at least two data points for the chart to prevent rendering a single dot
    return dataPointsInRange.length > 1 ? dataPointsInRange : originalData.slice(0, 2)
  }, [startTime, endTime, originalData, data])

  const total = useMemo(() => zoomedData.reduce((acc, curr) => acc + curr.Gas, 0), [zoomedData])

  const handleMouseDown = (e: any): void => {
    if (e.activeLabel) {
      setRefAreaLeft(e.activeLabel)
      setIsSelecting(true)
    }
  }

  const handleMouseMove = (e: any): void => {
    if (isSelecting && e.activeLabel) {
      setRefAreaRight(e.activeLabel)
    }
  }

  const handleMouseUp = (): void => {
    if (refAreaLeft && refAreaRight) {
      const [left, right] = [refAreaLeft, refAreaRight].sort()
      setStartTime(left)
      setEndTime(right)
    }
    setRefAreaLeft(null)
    setRefAreaRight(null)
    setIsSelecting(false)
  }

  const handleReset = (): void => {
    setStartTime(originalData[0].PacketId)
    setEndTime(originalData[originalData.length - 1].PacketId)
  }

  const handleZoom = (
    e: React.WheelEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): void => {
    e.preventDefault()
    if (!originalData.length || !chartRef.current) return

    const zoomFactor = 0.1
    let direction = 0
    let clientX = 0

    if ('deltaY' in e) {
      if (!e.ctrlKey) return

      // Mouse wheel event
      direction = e.deltaY < 0 ? 1 : -1
      clientX = e.clientX
    } else if (e.touches.length === 2) {
      // Pinch zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const currentDistance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      )

      if ((e as any).lastTouchDistance) {
        direction = currentDistance > (e as any).lastTouchDistance ? 1 : -1
      }
      ;(e as any).lastTouchDistance = currentDistance

      clientX = touch1.clientX + touch2.clientX
    } else {
      return
    }

    const currentRange =
      (endTime || originalData[originalData.length - 1].PacketId) -
      (startTime || originalData[0].PacketId)
    const zoomAmount = currentRange * zoomFactor * direction

    const chartRect = chartRef.current.getBoundingClientRect()
    const mouseX = clientX - chartRect.left
    const chartWidth = chartRect.width
    const mousePercentage = mouseX / chartWidth

    const currentStartTime = startTime || originalData[0].PacketId
    const currentEndTime = endTime || originalData[originalData.length - 1].PacketId

    const newStartTime = currentStartTime + zoomAmount * mousePercentage
    const newEndTime = currentEndTime - zoomAmount * (1 - mousePercentage)

    setStartTime(newStartTime)
    setEndTime(newEndTime)
  }

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex-col items-stretch space-y-0 border-b p-0 sm:flex-row hidden sm:flex">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Zoomable Chart Demo</CardTitle>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l bg-muted/10 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Events</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-full sm:h-[250px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <div
            className="h-full"
            onWheel={handleZoom}
            onTouchMove={handleZoom}
            ref={chartRef}
            style={{ touchAction: 'none' }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={zoomedData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <defs>
                  <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartConfig.Gas.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chartConfig.Gas.color} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="PacketId"
                  tickFormatter={formatXAxis}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  minTickGap={16}
                  style={{ fontSize: '10px', userSelect: 'none' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: '10px', userSelect: 'none' }}
                  width={30}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      className="w-[150px] sm:w-[200px] font-mono text-xs sm:text-sm"
                      nameKey="Gas"
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="Gas"
                  stroke={chartConfig.Gas.color}
                  strokeWidth={2}
                  isAnimationActive={false}
                  dot={false}
                />
                {refAreaLeft && refAreaRight && (
                  <ReferenceArea
                    x1={refAreaLeft}
                    x2={refAreaRight}
                    strokeOpacity={0.3}
                    fill="hsl(var(--foreground))"
                    fillOpacity={0.05}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
