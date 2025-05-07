"use client"

import { useEffect, useRef } from "react"

interface TrackMapProps {
  position: number // 0 to 1 representing position around the track
  size?: "medium" | "large"
}

export function TrackMap({ position, size = "medium" }: TrackMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const sizeMap = {
    medium: 200,
    large: 400,
  }

  const mapSize = sizeMap[size]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set dimensions based on device pixel ratio
    const dpr = window.devicePixelRatio || 1
    canvas.width = mapSize * dpr
    canvas.height = mapSize * dpr
    ctx.scale(dpr, dpr)

    // Set canvas dimensions in CSS
    canvas.style.width = `${mapSize}px`
    canvas.style.height = `${mapSize}px`

    // Clear canvas
    ctx.clearRect(0, 0, mapSize, mapSize)

    // Draw track (simplified Nürburgring GP layout)
    ctx.beginPath()
    ctx.moveTo(mapSize * 0.2, mapSize * 0.3)
    ctx.bezierCurveTo(mapSize * 0.1, mapSize * 0.4, mapSize * 0.1, mapSize * 0.6, mapSize * 0.2, mapSize * 0.7)
    ctx.bezierCurveTo(mapSize * 0.3, mapSize * 0.8, mapSize * 0.5, mapSize * 0.8, mapSize * 0.6, mapSize * 0.7)
    ctx.bezierCurveTo(mapSize * 0.7, mapSize * 0.6, mapSize * 0.8, mapSize * 0.5, mapSize * 0.7, mapSize * 0.4)
    ctx.bezierCurveTo(mapSize * 0.6, mapSize * 0.3, mapSize * 0.4, mapSize * 0.2, mapSize * 0.2, mapSize * 0.3)

    ctx.strokeStyle = "#3f3f46" // zinc-700
    ctx.lineWidth = size === "medium" ? 10 : 16
    ctx.stroke()

    // Draw sector lines
    const sector1Point = getPointOnPath(0.33, mapSize)
    const sector2Point = getPointOnPath(0.66, mapSize)

    if (sector1Point && sector2Point) {
      // Sector 1 line
      ctx.beginPath()
      ctx.moveTo(sector1Point.x - 10, sector1Point.y - 10)
      ctx.lineTo(sector1Point.x + 10, sector1Point.y + 10)
      ctx.strokeStyle = "#eab308" // yellow-500
      ctx.lineWidth = 2
      ctx.stroke()

      // Sector 2 line
      ctx.beginPath()
      ctx.moveTo(sector2Point.x - 10, sector2Point.y - 10)
      ctx.lineTo(sector2Point.x + 10, sector2Point.y + 10)
      ctx.strokeStyle = "#eab308" // yellow-500
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw start/finish line
    const startPoint = getPointOnPath(0, mapSize)
    if (startPoint) {
      ctx.beginPath()
      ctx.moveTo(startPoint.x - 10, startPoint.y - 10)
      ctx.lineTo(startPoint.x + 10, startPoint.y + 10)
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw car position
    const carPoint = getPointOnPath(position, mapSize)
    if (carPoint) {
      ctx.beginPath()
      ctx.arc(carPoint.x, carPoint.y, size === "medium" ? 6 : 8, 0, Math.PI * 2)
      ctx.fillStyle = "#ef4444" // red-500
      ctx.fill()
    }
  }, [position, mapSize, size])

  // Helper function to get a point on the track path
  function getPointOnPath(t: number, size: number): { x: number; y: number } | null {
    // Simplified calculation for demo purposes
    // In a real app, you'd have actual track coordinates
    const angle = t * Math.PI * 2
    const centerX = size / 2
    const centerY = size / 2
    const radiusX = size * 0.3
    const radiusY = size * 0.25

    return {
      x: centerX + Math.cos(angle) * radiusX,
      y: centerY + Math.sin(angle) * radiusY,
    }
  }

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={mapSize} height={mapSize} />
      {size === "large" && (
        <>
          <div className="absolute text-xs text-zinc-400" style={{ top: mapSize * 0.15, left: mapSize * 0.2 }}>
            Start/Finish
          </div>
          <div className="absolute text-xs text-zinc-400" style={{ top: mapSize * 0.4, left: mapSize * 0.05 }}>
            Sector 1
          </div>
          <div className="absolute text-xs text-zinc-400" style={{ bottom: mapSize * 0.3, left: mapSize * 0.5 }}>
            Sector 2
          </div>
        </>
      )}
    </div>
  )
}
