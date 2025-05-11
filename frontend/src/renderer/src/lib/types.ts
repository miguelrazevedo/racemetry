export type RacemetryData = {
  PacketId_physics: number
  Throttle: number
  Brake: number
  Fuel: number
  Gear: number
  RPM: number
  SteerAngle: number
  SpeedKmh: number

  PacketId_graphics: number
  CurrentTime: string
  LastTime: string
  BestTime: string
  Split: string
  CompletedLaps: string

  CarModel: string
  Track: string
}
