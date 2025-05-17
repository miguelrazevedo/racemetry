import AutoZoomChart from '@renderer/components/AutoZoomChart'
import { Button } from '@renderer/components/ui/button'
import { Search } from 'lucide-react'
import ZoomableChart from '@renderer/components/ZoomableChart'
import { RacemetryData } from '@renderer/lib/types'
import { useEffect, useState } from 'react'
import SteeringChart from '@renderer/components/SteeringChart'

export default function Dashboard(): React.JSX.Element {
  const [telemetry, setTelemetry] = useState<RacemetryData[]>([])
  const [range, setRange] = useState({ left: 0, right: 0 })

  const handleChange = (values: { left: number; right: number }): void => {
    setRange({ left: values.left, right: values.right })
  }

  const resetZoom = (): void => {
    setRange({ left: 0, right: telemetry.length - 1 })
  }

  useEffect(() => {
    const storedData = localStorage.getItem('telemetryData')
    const data: RacemetryData[] = storedData ? JSON.parse(storedData) : []
    setTelemetry(data)
    setRange({ left: 0, right: data.length - 1 })
    console.log(data)
  }, [])

  return (
    <div className="p-4 space-y-4">
      <ZoomableChart data={telemetry} range={range} setRange={handleChange} />
      <SteeringChart
        data={telemetry}
        chartConfig={{
          SteerAngle: {
            label: 'Steering',
            color: '#57d46c'
          }
        }}
        range={range}
        title="Steering (-Left; +Right)"
      />
      <AutoZoomChart
        data={telemetry}
        chartConfig={{
          SpeedKmh: {
            label: 'Kph',
            color: '#0390fc'
          }
        }}
        range={range}
        title="Speed (KPH)"
      />
      <AutoZoomChart
        data={telemetry}
        chartConfig={{
          Gear: {
            label: 'Gear',
            color: '#0390fc'
          }
        }}
        title="Gear"
        range={range}
      />
      <Button
        size="lg"
        variant="outline"
        className="fixed top-[50%] right-5 rounded cursor-pointer"
        onClick={resetZoom}
      >
        <Search /> Reset zoom
      </Button>
    </div>
  )
}
