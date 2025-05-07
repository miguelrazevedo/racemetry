'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { Button } from '@renderer/components/ui/button'
import { Badge } from '@renderer/components/ui/badge'
import { Gauge } from '@renderer/components/gauge'
import { TrackMap } from '@renderer/components/track-map'
import { PerformanceChart } from '@renderer/components/performance-chart'
import { LapTimeTable } from '@renderer/components/lap-time-table'
import { TelemetryControls } from '@renderer/components/telemetry-controls'
import { Settings, BarChart3, Clock, Activity, Map } from 'lucide-react'

// Mock data - in a real app, this would come from your game's telemetry API
const mockTelemetryData = {
  speed: 243,
  rpm: 8750,
  gear: 6,
  throttle: 85,
  brake: 0,
  steeringAngle: -5,
  lapTime: '1:42.567',
  sector1: '32.145',
  sector2: '38.721',
  sector3: '31.701',
  bestLap: '1:41.982',
  position: 3,
  fuel: 68,
  tireTemp: {
    frontLeft: 92,
    frontRight: 94,
    rearLeft: 89,
    rearRight: 91
  }
}

export default function TelemetryDashboard() {
  const [telemetryData, setTelemetryData] = useState(mockTelemetryData)
  const [activeView, setActiveView] = useState('dashboard')

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryData((prev) => ({
        ...prev,
        speed: Math.max(0, prev.speed + Math.floor(Math.random() * 11) - 5),
        rpm: Math.max(0, Math.min(9000, prev.rpm + Math.floor(Math.random() * 201) - 100)),
        throttle: Math.max(0, Math.min(100, prev.throttle + Math.floor(Math.random() * 11) - 5)),
        brake:
          prev.throttle > 80
            ? 0
            : Math.max(0, Math.min(100, prev.brake + Math.floor(Math.random() * 11) - 5)),
        steeringAngle: Math.max(
          -45,
          Math.min(45, prev.steeringAngle + Math.floor(Math.random() * 7) - 3)
        ),
        fuel: Math.max(0, prev.fuel - 0.02),
        tireTemp: {
          frontLeft: Math.max(
            60,
            Math.min(110, prev.tireTemp.frontLeft + Math.floor(Math.random() * 3) - 1)
          ),
          frontRight: Math.max(
            60,
            Math.min(110, prev.tireTemp.frontRight + Math.floor(Math.random() * 3) - 1)
          ),
          rearLeft: Math.max(
            60,
            Math.min(110, prev.tireTemp.rearLeft + Math.floor(Math.random() * 3) - 1)
          ),
          rearRight: Math.max(
            60,
            Math.min(110, prev.tireTemp.rearRight + Math.floor(Math.random() * 3) - 1)
          )
        }
      }))
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Racing Telemetry</h1>
          <p className="text-zinc-400">Nürburgring GP - Time Trial</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Connected
          </Badge>
          <Select defaultValue="ferrari_sf90">
            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Select car" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              <SelectItem value="ferrari_sf90">Ferrari SF90</SelectItem>
              <SelectItem value="porsche_911gt3">Porsche 911 GT3</SelectItem>
              <SelectItem value="mclaren_720s">McLaren 720S</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="bg-zinc-800 border-zinc-700">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-4" onValueChange={setActiveView}>
        <TabsList className="bg-zinc-800 border-zinc-700">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-zinc-700">
            <Activity className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="timing" className="data-[state=active]:bg-zinc-700">
            <Clock className="h-4 w-4 mr-2" />
            Timing
          </TabsTrigger>
          <TabsTrigger value="track" className="data-[state=active]:bg-zinc-700">
            <Map className="h-4 w-4 mr-2" />
            Track
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-zinc-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardTitle>Speed & RPM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Gauge
                    value={telemetryData.speed}
                    maxValue={400}
                    label="km/h"
                    size="large"
                    color="red"
                  />
                  <Gauge
                    value={telemetryData.rpm}
                    maxValue={9000}
                    label="RPM"
                    size="large"
                    color="blue"
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <Badge className="text-2xl px-6 py-2 bg-zinc-700">
                    {telemetryData.gear === 0 ? 'N' : telemetryData.gear}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardTitle>Lap Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Current Lap</span>
                    <span className="font-mono text-lg">{telemetryData.lapTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Best Lap</span>
                    <span className="font-mono text-lg text-green-500">
                      {telemetryData.bestLap}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-zinc-700 p-2 rounded text-center">
                      <div className="text-xs text-zinc-400">S1</div>
                      <div className="font-mono">{telemetryData.sector1}</div>
                    </div>
                    <div className="bg-zinc-700 p-2 rounded text-center">
                      <div className="text-xs text-zinc-400">S2</div>
                      <div className="font-mono">{telemetryData.sector2}</div>
                    </div>
                    <div className="bg-zinc-700 p-2 rounded text-center">
                      <div className="text-xs text-zinc-400">S3</div>
                      <div className="font-mono">{telemetryData.sector3}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardTitle>Inputs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-zinc-400">Throttle</span>
                      <span>{telemetryData.throttle}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${telemetryData.throttle}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-zinc-400">Brake</span>
                      <span>{telemetryData.brake}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2.5">
                      <div
                        className="bg-red-500 h-2.5 rounded-full"
                        style={{ width: `${telemetryData.brake}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-zinc-400">Steering</span>
                      <span>{telemetryData.steeringAngle}°</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2.5 flex items-center">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full absolute"
                        style={{
                          width: '4px',
                          left: `calc(50% + ${(telemetryData.steeringAngle / 90) * 50}%)`,
                          transform: 'translateX(-50%)'
                        }}
                      ></div>
                      <div className="w-px h-4 bg-zinc-500 absolute left-1/2"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardTitle>Track Position</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <TrackMap position={0.65} />
              </CardContent>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardTitle>Tire Temperatures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 text-center">
                    <div
                      className={`font-mono text-lg ${telemetryData.tireTemp.frontLeft > 95 ? 'text-red-500' : telemetryData.tireTemp.frontLeft < 70 ? 'text-blue-500' : 'text-green-500'}`}
                    >
                      {telemetryData.tireTemp.frontLeft}°C
                    </div>
                    <div className="text-xs text-zinc-400">Front Left</div>
                  </div>
                  <div className="space-y-1 text-center">
                    <div
                      className={`font-mono text-lg ${telemetryData.tireTemp.frontRight > 95 ? 'text-red-500' : telemetryData.tireTemp.frontRight < 70 ? 'text-blue-500' : 'text-green-500'}`}
                    >
                      {telemetryData.tireTemp.frontRight}°C
                    </div>
                    <div className="text-xs text-zinc-400">Front Right</div>
                  </div>
                  <div className="space-y-1 text-center">
                    <div
                      className={`font-mono text-lg ${telemetryData.tireTemp.rearLeft > 95 ? 'text-red-500' : telemetryData.tireTemp.rearLeft < 70 ? 'text-blue-500' : 'text-green-500'}`}
                    >
                      {telemetryData.tireTemp.rearLeft}°C
                    </div>
                    <div className="text-xs text-zinc-400">Rear Left</div>
                  </div>
                  <div className="space-y-1 text-center">
                    <div
                      className={`font-mono text-lg ${telemetryData.tireTemp.rearRight > 95 ? 'text-red-500' : telemetryData.tireTemp.rearRight < 70 ? 'text-blue-500' : 'text-green-500'}`}
                    >
                      {telemetryData.tireTemp.rearRight}°C
                    </div>
                    <div className="text-xs text-zinc-400">Rear Right</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardTitle>Fuel & Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-zinc-400">Fuel Remaining</span>
                      <span>{telemetryData.fuel.toFixed(1)}L</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${telemetryData.fuel < 20 ? 'bg-red-500' : 'bg-yellow-500'}`}
                        style={{ width: `${(telemetryData.fuel / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <div className="text-zinc-400 text-sm">Position</div>
                      <div className="text-3xl font-bold">
                        {telemetryData.position}
                        <span className="text-sm text-zinc-400 ml-1">/ 20</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-400 text-sm">Gap Ahead</div>
                      <div className="text-xl font-mono">+2.45s</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timing">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Lap Times</CardTitle>
              <CardDescription>Detailed timing information for all laps</CardDescription>
            </CardHeader>
            <CardContent>
              <LapTimeTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Track Map</CardTitle>
              <CardDescription>Track position and sector information</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <TrackMap position={0.65} size="large" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Detailed performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <TelemetryControls className="mt-6" />
    </div>
  )
}
