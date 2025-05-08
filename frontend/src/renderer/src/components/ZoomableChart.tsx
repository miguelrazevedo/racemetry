'use client'

import React, { useCallback, useMemo, useRef } from 'react'
import { CartesianGrid, Line, YAxis, Brush, ComposedChart, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@renderer/components/ui/chart'
import { Button } from '@renderer/components/ui/button'
import { RacemetryData } from '@renderer/lib/types'

type PedalsCardProps = {
  data: RacemetryData[]
  range: { left: number; right: number }
  setRange: (values: { left: number; right: number }) => void
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

export default function ZoomableChart({
  data,
  range,
  setRange
}: PedalsCardProps): React.JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null)

  const reset = useCallback(() => {
    setRange({ left: 0, right: data.length - 1 })
  }, [data, setRange])

  const handleZoom = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!data.length || !chartRef.current) return

      const zoomFactor = 0.1
      let direction = 0
      let clientX = 0

      if (!e.deltaY) return

      if (!e.ctrlKey) return

      // Mouse wheel event
      direction = e.deltaY < 0 ? 1 : -1
      clientX = e.clientX

      const { left, right } = range
      const currentRange = right - left
      const zoomAmount = currentRange * zoomFactor * direction

      const chartRect = chartRef.current.getBoundingClientRect()
      const mouseX = clientX - chartRect.left
      const chartWidth = chartRect.width
      const mousePercentage = mouseX / chartWidth

      const newLeft = Math.max(0, left + Math.floor(zoomAmount * mousePercentage))
      const newRight = Math.min(
        data.length - 1,
        right - Math.ceil(zoomAmount * (1 - mousePercentage))
      )

      if (newLeft >= newRight) return
      setRange({ left: newLeft, right: newRight })
    },
    [data, range, setRange]
  )

  const memoizedChart = useMemo(
    () => (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          //   onMouseMove={handleMouseMove}
        >
          <CartesianGrid vertical={false} />
          {/* <XAxis
            dataKey="PacketId"
            tickLine={false}
            axisLine={false}
            tickMargin={7}
            className="select-none"
          /> */}
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={40}
            className="select-none"
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel={true} indicator="line" />} />

          {Object.entries(chartConfig).map(([key, config]) => (
            <Line
              key={key}
              dataKey={key}
              type="monotone"
              stroke={config.color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
          <ChartLegend content={<ChartLegendContent />} />
          <Brush
            dataKey="PacketId"
            height={50}
            startIndex={range.left}
            endIndex={range.right}
            onChange={(e) =>
              setRange({
                left: e.startIndex ?? 0,
                right: e.endIndex ?? data.length - 1
              })
            }
            stroke="#4c78f1"
            fill="#000"
          >
            <ComposedChart>
              {Object.entries(chartConfig).map(([key, config]) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={config.color}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                  opacity={0.5}
                />
              ))}
            </ComposedChart>
          </Brush>
        </ComposedChart>
      </ResponsiveContainer>
    ),
    [data, range]
  )

  return (
    <Card className="w-full rounded">
      <CardHeader className="flex flex-row flex-wrap gap-2 sm:gap-0 justify-between border-b">
        <div className="flex flex-col gap-1">
          <CardTitle>Throttle and Brake input</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="rounded" onClick={reset}>
            Reset zoom
          </Button>
        </div>
      </CardHeader>
      <CardContent className="w-full h-[250px] my-4">
        <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
          <div className="h-full touch-none overflow-hidden" onWheel={handleZoom} ref={chartRef}>
            {memoizedChart}
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
