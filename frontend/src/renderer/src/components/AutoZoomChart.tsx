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
import { RacemetryData } from '@renderer/lib/types'
import { JSX } from 'react'

type PedalsCardProps = {
  data: RacemetryData[]
  range: { left: number; right: number }
  chartConfig: ChartConfig
  height?: number
  title: string
}

export default function AutoZoomChart({
  data,
  range,
  chartConfig,
  height = 250,
  title
}: PedalsCardProps): JSX.Element {
  return (
    <Card className="w-full rounded">
      <CardHeader className="flex flex-row flex-wrap gap-2 sm:gap-0 justify-between border-b">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={`w-full h-[${height}px] my-4`}>
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
                startIndex={range.left}
                endIndex={range.right}
                stroke="#4c78f1"
                fill="#000"
                className="hidden"
              ></Brush>
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
