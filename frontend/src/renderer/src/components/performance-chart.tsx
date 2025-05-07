'use client'

import type React from 'react'

import { useEffect, useRef, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { Button } from '@renderer/components/ui/button'
import { ZoomIn, ZoomOut } from 'lucide-react'

export function PerformanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Add zoom in function
  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4))
  }

  // Add zoom out function
  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1))
  }

  // Handle double-click to zoom
  const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Get click position relative to canvas
    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left

    // If already zoomed in, zoom out
    if (zoomLevel >= 2) {
      setZoomLevel(1)
      setScrollPosition(0)
      return
    }

    // Zoom to 2x
    setZoomLevel(2)

    // Calculate the center point to focus on
    const containerWidth = container.clientWidth
    const targetScrollPosition = Math.max(0, clickX * 2 - containerWidth / 2)

    // Set scroll position
    setScrollPosition(targetScrollPosition)

    // Apply scroll after state update and re-render
    setTimeout(() => {
      if (container) {
        container.scrollLeft = targetScrollPosition
      }
    }, 0)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set dimensions based on device pixel ratio
    const dpr = window.devicePixelRatio || 1
    const baseWidth = 800
    const zoomedWidth = baseWidth * zoomLevel
    const height = 300
    canvas.width = zoomedWidth * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Set canvas dimensions in CSS
    canvas.style.width = `${zoomedWidth}px`
    canvas.style.height = `${height}px`

    // Clear canvas
    ctx.clearRect(0, 0, zoomedWidth, height)

    // Draw grid
    ctx.strokeStyle = '#3f3f46' // zinc-700
    ctx.lineWidth = 1

    // Vertical grid lines - adjust spacing based on zoom
    const gridSpacing = 50 * zoomLevel
    for (let i = 0; i <= zoomedWidth; i += gridSpacing) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 0; i <= height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(zoomedWidth, i)
      ctx.stroke()
    }

    // Draw speed data - expand data points based on zoom
    const speedData = [
      120, 150, 180, 210, 240, 260, 270, 280, 290, 300, 310, 320, 310, 290, 250, 200, 150, 120, 100,
      90, 110, 130, 160, 190, 220, 250, 270, 290, 300, 310, 320, 330
    ]

    ctx.beginPath()
    ctx.moveTo(0, height - (speedData[0] / 350) * height)

    for (let i = 1; i < speedData.length; i++) {
      const x = (i / (speedData.length - 1)) * zoomedWidth
      const y = height - (speedData[i] / 350) * height
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = '#ef4444' // red-500
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw throttle data
    const throttleData = [
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 80, 20, 0, 0, 0, 0, 0, 20, 60,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100
    ]

    ctx.beginPath()
    ctx.moveTo(0, height - (throttleData[0] / 100) * height)

    for (let i = 1; i < throttleData.length; i++) {
      const x = (i / (throttleData.length - 1)) * zoomedWidth
      const y = height - (throttleData[i] / 100) * height
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = '#22c55e' // green-500
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw brake data
    const brakeData = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 100, 100, 90, 70, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0
    ]

    ctx.beginPath()
    ctx.moveTo(0, height - (brakeData[0] / 100) * height)

    for (let i = 1; i < brakeData.length; i++) {
      const x = (i / (brakeData.length - 1)) * zoomedWidth
      const y = height - (brakeData[i] / 100) * height
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = '#3b82f6' // blue-500
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw legend
    const legendItems = [
      { label: 'Speed', color: '#ef4444' },
      { label: 'Throttle', color: '#22c55e' },
      { label: 'Brake', color: '#3b82f6' }
    ]

    legendItems.forEach((item, index) => {
      const x = 20 + index * 100
      const y = 20

      // Line
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + 20, y)
      ctx.strokeStyle = item.color
      ctx.lineWidth = 3
      ctx.stroke()

      // Label
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px sans-serif'
      ctx.fillText(item.label, x + 25, y + 4)
    })

    // Sync scroll position when zoom changes
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollPosition
    }
  }, [zoomLevel, scrollPosition])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="speed">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger value="speed" className="data-[state=active]:bg-zinc-700">
              Speed
            </TabsTrigger>
            <TabsTrigger value="inputs" className="data-[state=active]:bg-zinc-700">
              Inputs
            </TabsTrigger>
            <TabsTrigger value="gforce" className="data-[state=active]:bg-zinc-700">
              G-Force
            </TabsTrigger>
            <TabsTrigger value="tires" className="data-[state=active]:bg-zinc-700">
              Tires
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-zinc-800 border-zinc-700"
            onClick={zoomOut}
            disabled={zoomLevel <= 1}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs text-zinc-400">{zoomLevel}x</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-zinc-800 border-zinc-700"
            onClick={zoomIn}
            disabled={zoomLevel >= 4}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto border border-zinc-700 rounded-md"
        style={{
          maxWidth: '100%',
          scrollbarWidth: 'thin',
          scrollbarColor: '#52525b #27272a'
        }}
      >
        <canvas
          ref={canvasRef}
          width={800 * zoomLevel}
          height={300}
          onDoubleClick={handleDoubleClick}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="bg-zinc-800 p-3 rounded-lg">
          <div className="text-xs text-zinc-400">Top Speed</div>
          <div className="text-xl font-bold">330 km/h</div>
        </div>
        <div className="bg-zinc-800 p-3 rounded-lg">
          <div className="text-xs text-zinc-400">Avg. Speed</div>
          <div className="text-xl font-bold">218 km/h</div>
        </div>
        <div className="bg-zinc-800 p-3 rounded-lg">
          <div className="text-xs text-zinc-400">Max G-Force</div>
          <div className="text-xl font-bold">4.2 G</div>
        </div>
        <div className="bg-zinc-800 p-3 rounded-lg">
          <div className="text-xs text-zinc-400">Brake Efficiency</div>
          <div className="text-xl font-bold">92%</div>
        </div>
      </div>
    </div>
  )
}
