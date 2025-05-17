import { CartesianGrid, Line, YAxis, Brush, ComposedChart, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent
} from '@renderer/components/ui/chart'
import { RacemetryData } from '@renderer/lib/types'
import { JSX, useCallback, useEffect, useState } from 'react'
import SteeringIcon from '@renderer/assets/steeringwheel.png'

type PedalsCardProps = {
  data: RacemetryData[]
  range: { left: number; right: number }
  chartConfig: ChartConfig
  height?: number
  title: string
}

const CustomTooltip = ({ active, payload, label, setAngle }) => {
  useEffect(() => {
    if (active && payload && payload.length) {
      const hoveredData: RacemetryData = payload[0].payload
      const angle = Math.round((hoveredData.SteerAngle * 900) / 2)
      setAngle(angle)
    } else {
      setAngle(0)
    }
  }, [active, payload, label, setAngle])

  if (active && payload && payload.length) {
    const hoveredData: RacemetryData = payload[0].payload
    const angle = Math.round((hoveredData.SteerAngle * 900) / 2)
    return (
      <div className="flex justify-between items-center min-w-[8rem] gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
        <span className="text-muted-foreground">Steering Angle</span>
        {hoveredData && (
          <span className="font-mono font-medium tabular-nums text-foreground">
            {hoveredData.SteerAngle.toFixed(2)} ({angle}º)
          </span>
        )}
      </div>
    )
  }

  return null
}

export default function SteeringChart({
  data,
  range,
  chartConfig,
  height = 250,
  title
}: PedalsCardProps): JSX.Element {
  const [angle, setAngle] = useState(0)
  const handleChartHover = useCallback((data) => {
    setAngle(data)
  }, [])
  return (
    <Card className="w-full rounded">
      <CardHeader className="flex flex-row flex-wrap gap-2 sm:gap-0 justify-between border-b">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={`w-full h-[${height}px] my-4 flex items-center justify-center`}>
        <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={40}
                className="select-none"
              />
              <ChartTooltip content={<CustomTooltip setAngle={handleChartHover} />} />

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
                startIndex={range.left}
                endIndex={range.right}
                stroke="#4c78f1"
                fill="#000"
                className="hidden"
              ></Brush>
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="w-full h-full flex items-center justify-center">
          <img src={SteeringIcon} className="w-[250px]" style={{ rotate: `${angle}deg` }} />
        </div>
      </CardContent>
    </Card>
  )
}
