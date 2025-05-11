import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@renderer/components/ui/chart'
import { RacemetryData } from '@renderer/lib/types'
import { CartesianGrid, Line, LineChart, YAxis } from 'recharts'

type PedalsCardProps = {
  data: RacemetryData[]
}

const chartConfig = {
  Throttle: {
    label: 'Throttle',
    color: '#0390fc'
  },
  Brake: {
    label: 'Brake',
    color: '#ef4444'
  }
} satisfies ChartConfig

export default function PedalsCard({ data }: PedalsCardProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedals input</CardTitle>
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
            <YAxis dataKey="Gas" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={true} indicator="line" />}
            />
            <Line
              dataKey="Gas"
              type="monotone"
              stroke={chartConfig.Gas.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Brake"
              type="monotone"
              stroke={chartConfig.Brake.color}
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
