"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Ghost, Sparkles, Home, RotateCcw, Volume2, VolumeX, Music, CheckCircle, Crown } from "lucide-react"
import { AudioManager } from "@/components/audio-manager"
import { SoundVisualizer } from "@/components/sound-visualizer"

export default function CompletePage() {
  const router = useRouter()
  const [progress, setProgress] = useState<number[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0)

    const savedProgress = localStorage.getItem("scavenger-hunt-progress")
    if (savedProgress) {
      const progressArray = JSON.parse(savedProgress)
      setProgress(progressArray)

      // Check if user has actually completed all levels
      if (progressArray.length < 6) {
        router.push(`/level/${progressArray.length + 1}`)
      }
    } else {
      // No progress found, redirect to home
      router.push("/")
    }
  }, [router])

  const handleRestart = () => {
    localStorage.removeItem("scavenger-hunt-progress")
    router.push("/")
  }

  const toggleMusic = () => {
    setIsMuted(!isMuted)
    setIsPlaying(!!isMuted)
  }

  if (progress.length < 7) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-gray-900 text-white">
      {/* Audio Manager */}
      <AudioManager
        currentSound={isPlaying && !isMuted ? "completion-celebration" : null}
        isMuted={isMuted}
        volume={0.4}
        forceAutoplay={true}
      />

      {/* Music Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-purple-600 text-purple-300 hover:bg-purple-900/20 backdrop-blur-sm"
          onClick={toggleMusic}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        {isPlaying && !isMuted && (
          <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm rounded-full px-3 py-1">
            <Music className="h-3 w-3 text-purple-300" />
            <Badge variant="outline" className="border-purple-600 text-purple-300 text-xs">
              🎵 Victory Celebration
            </Badge>
            <SoundVisualizer isPlaying={true} soundType="romantic" className="h-4" />
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="max-w-2xl bg-gradient-to-r from-pink-900/40 to-purple-900/40 backdrop-blur-sm border-pink-800/50 text-white">
          <CardContent className="text-center py-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Heart className="h-12 w-12 text-pink-400 animate-pulse" />
              <Sparkles className="h-12 w-12 text-purple-400 animate-pulse" />
              <Ghost className="h-12 w-12 text-indigo-400 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Congratulations!
            </h1>

            <div className="max-w-2xl mx-auto">
              <div className="bg-purple-900/30 border border-purple-800/50 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-pink-300">You've Completed the Hunt!</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  You've successfully solved all the mysteries and followed the whispers to their source. Your journey
                  through shadows and secrets has led you to the final revelation.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-pink-900/20 border border-pink-800/30 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-purple-300">Your Journey</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>The First Whisper - Cinema</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Echoes of Laughter - Dance Hall</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Midnight Confessions - Old Bridge</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>The Garden of Secrets - Rose Garden</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Shadows of the Past - Library</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>The Final Revelation - Abandoned Ballroom</span>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-800/30 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-3 text-pink-300">A Special Message</h2>
                  <p className="text-lg text-gray-300 italic">
                    "In the end, every whisper becomes a promise, every shadow reveals light, and every mystery finds
                    its answer in love."
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/40 rounded-full">
                      <Music className="h-4 w-4 text-pink-300" />
                      <span className="text-sm text-pink-300">Listen to the celebration music</span>
                      {!isMuted && <SoundVisualizer isPlaying={true} soundType="romantic" className="h-4" />}
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 border border-green-800/30 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-3 text-green-300">Achievement Unlocked!</h2>
                  <div className="flex justify-center items-center gap-3 my-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                      <Crown className="h-8 w-8 text-yellow-300" />
                    </div>
                  </div>
                  <p className="text-center text-gray-300">You've proven yourself a master of riddles and romance!</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                  onClick={handleRestart}
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Start New Hunt
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
                  onClick={() => router.push("/")}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Return Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
