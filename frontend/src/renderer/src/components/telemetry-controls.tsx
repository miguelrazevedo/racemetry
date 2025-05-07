'use client'

import { Button } from '@renderer/components/ui/button'
import { Switch } from '@renderer/components/ui/switch'
import { Label } from '@renderer/components/ui/label'
import { Slider } from '@renderer/components/ui/slider'
import { Download, Pause, Play, RefreshCw, Save } from 'lucide-react'

interface TelemetryControlsProps {
  className?: string
}

export function TelemetryControls({ className = '' }: TelemetryControlsProps) {
  return (
    <div className={`bg-zinc-800 border border-zinc-700 rounded-lg p-4 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Pause className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Label htmlFor="live-data" className="text-sm">
              Live Data
            </Label>
            <Switch id="live-data" defaultChecked />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="grid gap-2 flex-1 max-w-[200px]">
            <div className="flex justify-between">
              <Label htmlFor="update-rate" className="text-sm">
                Update Rate
              </Label>
              <span className="text-xs text-zinc-400">200ms</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} id="update-rate" />
          </div>

          <Button variant="outline" size="sm" className="gap-1">
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save Session</span>
          </Button>

          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export Data</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
