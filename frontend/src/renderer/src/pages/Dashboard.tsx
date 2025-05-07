import GearCard from '@renderer/components/GearCard'
import PedalsCard from '@renderer/components/PedalsCard'
import SpeedCard from '@renderer/components/SpeedCard'
import { RacemetryData } from '@renderer/lib/types'
import { useEffect, useState } from 'react'

export default function Dashboard(): React.JSX.Element {
  const [telemetry, setTelemetry] = useState<RacemetryData[]>([])

  useEffect(() => {
    const storedData = localStorage.getItem('telemetryData')
    const data: RacemetryData[] = storedData ? JSON.parse(storedData) : []
    setTelemetry(data)
    console.log(data)
  }, [])

  return (
    <div className="p-4 space-y-4">
      <PedalsCard data={telemetry} />
      <SpeedCard data={telemetry} />
      <GearCard data={telemetry} />
    </div>
  )
}
