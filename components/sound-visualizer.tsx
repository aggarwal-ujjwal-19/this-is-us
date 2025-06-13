"use client"

import { useEffect, useState } from "react"

interface SoundVisualizerProps {
  isPlaying: boolean
  soundType: "romantic" | "mysterious" | "spooky"
  className?: string
}

export function SoundVisualizer({ isPlaying, soundType, className = "" }: SoundVisualizerProps) {
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        // Generate random heights for visualization bars
        const newBars = Array.from({ length: 5 }, () => Math.random() * 100)
        setBars(newBars)
      }, 150)

      return () => clearInterval(interval)
    } else {
      setBars([])
    }
  }, [isPlaying])

  const getColorClass = () => {
    switch (soundType) {
      case "romantic":
        return "bg-pink-400"
      case "mysterious":
        return "bg-purple-400"
      case "spooky":
        return "bg-indigo-400"
      default:
        return "bg-purple-400"
    }
  }

  if (!isPlaying) return null

  return (
    <div className={`flex items-end gap-1 h-6 ${className}`}>
      {bars.map((height, index) => (
        <div
          key={index}
          className={`w-1 transition-all duration-150 ${getColorClass()} opacity-80`}
          style={{ height: `${Math.max(height, 10)}%` }}
        />
      ))}
    </div>
  )
}
