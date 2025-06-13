"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock, CheckCircle, Lightbulb, ImageIcon, Video, FileImageIcon as FileGif } from "lucide-react"

interface Level {
  id: number
  title: string
  type: "image" | "video" | "gif"
  mediaUrl: string
  clue: string
  hint: string
  answer: string
  story: string
  ambientSound: string
  successSound: string
  atmosphere: "romantic" | "mysterious" | "spooky"
}

interface LevelCardProps {
  level: Level
  isUnlocked: boolean
  isCompleted: boolean
  isActive: boolean
  onComplete: (answer: string) => boolean
  userAnswer?: string
  isMuted?: boolean
  onPlaySound?: (soundId: string) => void
}

export function LevelCard({
  level,
  isUnlocked,
  isCompleted,
  isActive,
  onComplete,
  userAnswer,
  isMuted,
  onPlaySound,
}: LevelCardProps) {
  const [answer, setAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const playInteractionSound = (soundType: "hover" | "click" | "error") => {
    if (isMuted || !onPlaySound) return

    const sounds = {
      hover: "ui-hover",
      click: "ui-click",
      error: "error-sound",
    }

    onPlaySound(sounds[soundType])
  }

  const handleSubmit = async () => {
    if (!answer.trim()) return

    setIsSubmitting(true)
    setShowError(false)
    playInteractionSound("click")

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = onComplete(answer)

    if (!success) {
      setShowError(true)
      setAnswer("")
      playInteractionSound("error")
    }

    setIsSubmitting(false)
  }

  const getTypeIcon = () => {
    switch (level.type) {
      case "image":
        return <ImageIcon className="h-4 w-4 text-pink-400" />
      case "video":
        return <Video className="h-4 w-4 text-purple-400" />
      case "gif":
        return <FileGif className="h-4 w-4 text-indigo-400" />
    }
  }

  const getTypeLabel = () => {
    switch (level.type) {
      case "image":
        return "Image Clue"
      case "video":
        return "Video Clue"
      case "gif":
        return "Animated Clue"
    }
  }

  const getAtmosphereStyle = (atmosphere: string) => {
    switch (atmosphere) {
      case "romantic":
        return "bg-pink-900/30 border-pink-600/70 shadow-pink-900/20"
      case "mysterious":
        return "bg-purple-900/40 border-purple-600/70 shadow-purple-900/20"
      case "spooky":
        return "bg-indigo-900/30 border-indigo-600/70 shadow-indigo-900/20"
      default:
        return "bg-purple-900/40 border-purple-600/70 shadow-purple-900/20"
    }
  }

  return (
    <Card
      className={`transition-all duration-500 ${
        isActive
          ? `${getAtmosphereStyle(level.atmosphere)} backdrop-blur-sm shadow-lg`
          : isCompleted
            ? "bg-green-900/20 backdrop-blur-sm border-green-800/50"
            : isUnlocked
              ? "bg-gray-800/60 backdrop-blur-sm border-purple-800/50"
              : "bg-gray-900/60 backdrop-blur-sm border-gray-700/50"
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted ? "bg-green-600" : isUnlocked ? "bg-purple-600" : "bg-gray-700"
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-white" />
              ) : isUnlocked ? (
                <Unlock className="h-5 w-5 text-white" />
              ) : (
                <Lock className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div>
              <CardTitle
                className={`text-lg ${
                  isCompleted ? "text-green-300" : isUnlocked ? "text-purple-300" : "text-gray-500"
                }`}
              >
                Level {level.id}: {level.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    isCompleted ? "border-green-700 text-green-300" : "border-purple-700 text-purple-300"
                  }`}
                >
                  {getTypeIcon()}
                  <span className="ml-1">{getTypeLabel()}</span>
                </Badge>
              </div>
            </div>
          </div>

          {isCompleted && <Badge className="bg-green-900/40 text-green-300 border-green-700/50">Completed</Badge>}
        </div>
      </CardHeader>

      <CardContent>
        {!isUnlocked ? (
          <div className="text-center py-12 text-gray-500">
            <Lock className="h-12 w-12 mx-auto mb-4 text-gray-600" />
            <p>Complete the previous level to unlock this mystery...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Media Content */}
            <div className="relative">
              <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg border border-purple-800/30">
                {level.type === "video" ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-purple-300">Video Clue</p>
                      <p className="text-sm text-gray-400 mt-2">In a real app, this would be a video player</p>
                    </div>
                  </div>
                ) : level.type === "gif" ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <FileGif className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                      <p className="text-indigo-300">Animated GIF Clue</p>
                      <p className="text-sm text-gray-400 mt-2">In a real app, this would be an animated GIF</p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={level.mediaUrl || "/placeholder.svg"}
                    alt={`Level ${level.id} clue`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Atmospheric Audio Indicator */}
              {isActive && !isMuted && (
                <div className="absolute top-2 left-2 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-300">🎵 {level.ambientSound.replace("-", " ")}</span>
                </div>
              )}

              {/* Atmospheric overlay for spooky effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-lg pointer-events-none"></div>
            </div>

            {/* Clue Text */}
            <div className="bg-gray-900/60 p-6 rounded-lg border border-purple-800/30">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">The Clue</h3>
              <p className="text-gray-300 italic leading-relaxed text-lg">"{level.clue}"</p>
            </div>

            {/* Hint Section */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-600 text-yellow-300 hover:bg-yellow-900/20"
                onClick={() => setShowHint(!showHint)}
                onMouseEnter={() => playInteractionSound("hover")}
              >
                <Lightbulb className="mr-1 h-4 w-4" />
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>

              {showHint && (
                <div className="flex-1 bg-yellow-900/20 p-3 rounded-lg border border-yellow-800/30">
                  <p className="text-yellow-300 text-sm">💡 {level.hint}</p>
                </div>
              )}
            </div>

            {/* Answer Section */}
            {!isCompleted ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    className="bg-gray-700/60 border-gray-600 text-white"
                    onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                    disabled={isSubmitting}
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={!answer.trim() || isSubmitting}
                    className="bg-purple-700 hover:bg-purple-600 min-w-[100px]"
                    onMouseEnter={() => playInteractionSound("hover")}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>

                {showError && (
                  <div className="bg-red-900/20 border border-red-800/30 p-3 rounded-lg">
                    <p className="text-red-300 text-sm">❌ That's not quite right. Try again...</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-800/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-green-300 font-semibold">Correct Answer: {userAnswer}</span>
                  </div>
                </div>

                {/* Story Revelation */}
                <div className="bg-purple-900/20 border border-purple-800/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-semibold mb-2">The Story Unfolds...</h4>
                  <p className="text-gray-300 italic">{level.story}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
