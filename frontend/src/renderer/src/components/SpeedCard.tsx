import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@renderer/components/ui/chart'
import { RacemetryData } from '@renderer/lib/types'
import { CartesianGrid, Line, LineChart, YAxis } from 'recharts'

const chartConfig = {
  SpeedKmh: {
    label: 'Kph',
    color: '#0390fc'
  }
} satisfies ChartConfig

export default function SpeedCard({ data }: { data: RacemetryData[] }): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Speed (Kph)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid />
            <YAxis dataKey="SpeedKmh" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={true} indicator="line" />}
            />
            <Line
              dataKey="SpeedKmh"
              type="monotone"
              stroke={chartConfig.SpeedKmh.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
