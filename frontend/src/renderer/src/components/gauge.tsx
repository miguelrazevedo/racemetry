"use client"

import { useEffect, useRef } from "react"

interface GaugeProps {
  value: number
  maxValue: number
  label: string
  size?: "small" | "medium" | "large"
  color?: "red" | "blue" | "green" | "yellow"
}

export function Gauge({ value, maxValue, label, size = "medium", color = "red" }: GaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const colorMap = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#eab308",
  }

  const sizeMap = {
    small: 100,
    medium: 120,
    large: 150,
  }

  const gaugeSize = sizeMap[size]
  const strokeWidth = size === "small" ? 8 : size === "medium" ? 10 : 12

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions based on device pixel ratio
    const dpr = window.devicePixelRatio || 1
    canvas.width = gaugeSize * dpr
    canvas.height = gaugeSize * dpr
    ctx.scale(dpr, dpr)

    // Set canvas dimensions in CSS
    canvas.style.width = `${gaugeSize}px`
    canvas.style.height = `${gaugeSize}px`

    // Draw background arc
    ctx.beginPath()
    ctx.arc(gaugeSize / 2, gaugeSize / 2, gaugeSize / 2 - strokeWidth / 2, Math.PI * 0.75, Math.PI * 2.25, false)
    ctx.strokeStyle = "#3f3f46" // zinc-700
    ctx.lineWidth = strokeWidth
    ctx.stroke()

    // Draw value arc
    const percentage = Math.min(value / maxValue, 1)
    const startAngle = Math.PI * 0.75
    const endAngle = startAngle + percentage * Math.PI * 1.5

    ctx.beginPath()
    ctx.arc(gaugeSize / 2, gaugeSize / 2, gaugeSize / 2 - strokeWidth / 2, startAngle, endAngle, false)
    ctx.strokeStyle = colorMap[color]
    ctx.lineWidth = strokeWidth
    ctx.stroke()

    // Draw value text
    ctx.fillStyle = "#ffffff"
    ctx.font = `${size === "large" ? "bold " : ""}${size === "small" ? 20 : size === "medium" ? 24 : 28}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(value.toString(), gaugeSize / 2, gaugeSize / 2)

    // Draw label
    ctx.fillStyle = "#a1a1aa" // zinc-400
    ctx.font = `${size === "small" ? 12 : 14}px sans-serif`
    ctx.fillText(label, gaugeSize / 2, gaugeSize / 2 + (size === "small" ? 18 : 22))
  }, [value, maxValue, label, gaugeSize, strokeWidth, color])

  return <canvas ref={canvasRef} width={gaugeSize} height={gaugeSize} />
}
