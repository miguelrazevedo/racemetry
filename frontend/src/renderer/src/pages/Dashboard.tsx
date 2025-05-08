import AutoZoomChart from '@renderer/components/AutoZoomChart'
import GearCard from '@renderer/components/GearCard'
import SpeedCard from '@renderer/components/SpeedCard'
import { ChartConfig } from '@renderer/components/ui/chart'
import ZoomableChart from '@renderer/components/ZoomableChart'
import { RacemetryData } from '@renderer/lib/types'
import { useEffect, useState } from 'react'

export default function Dashboard(): React.JSX.Element {
  const [telemetry, setTelemetry] = useState<RacemetryData[]>([])
  const [range, setRange] = useState({ left: 0, right: 0 })

  const handleChange = (values: { left: number; right: number }): void => {
    setRange({ left: values.left, right: values.right })
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
    </div>
  )
}
