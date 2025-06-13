"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SoundVisualizer } from "@/components/sound-visualizer"
import { AudioManager } from "@/components/audio-manager"
import { Heart, Ghost, Sparkles, Play, Volume2, VolumeX, Music } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true) // Start with true to attempt autoplay

  const huntData = {
    title: "Whispers in the Moonlight",
    description:
      "Hi Akshika, this is a journey through shadows and secrets, where love meets mystery under the pale moonlight. Follow the clues to uncover a tale of romance wrapped in enigma.",
    totalLevels: 6,
  }

  const toggleMusic = () => {
    setIsMuted(!isMuted)
    setIsPlaying(!isMuted)
  }

  const handleStartGame = () => {
    // Reset any existing progress and start from level 1
    localStorage.removeItem("scavenger-hunt-progress")
    router.push("/level/1")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-gray-900 text-white relative overflow-hidden">
      {/* Audio Manager */}
      <AudioManager
        currentSound={isPlaying && !isMuted ? "homepage-theme" : null}
        isMuted={isMuted}
        volume={0.3}
        forceAutoplay={true}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse opacity-50 delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-30 delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
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
                🎵 Moonlight Serenade
              </Badge>
              <SoundVisualizer isPlaying={true} soundType="romantic" className="h-4" />
            </div>
          )}
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-pink-400 animate-pulse" />
            <Ghost className="h-8 w-8 text-purple-400 animate-pulse delay-500" />
            <Sparkles className="h-8 w-8 text-indigo-400 animate-pulse delay-1000" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse">
            {huntData.title}
          </h1>
          <Badge className="bg-purple-900/40 text-purple-300 border-purple-700/50 text-lg px-4 py-2 backdrop-blur-sm">
            Romantic • Mysterious • Spooky
          </Badge>
        </header>

        {/* Story Introduction */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gray-800/60 backdrop-blur-sm border-purple-800/50 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-purple-300">The Story Begins...</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-300 leading-relaxed mb-8">{huntData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center p-4 bg-pink-900/20 rounded-lg border border-pink-800/30 hover:bg-pink-900/30 transition-colors">
                  <Heart className="h-12 w-12 text-pink-400 mb-3" />
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">Romance</h3>
                  <p className="text-sm text-gray-300 text-center">
                    Follow the path of love through cherished memories
                  </p>
                </div>

                <div className="flex flex-col items-center p-4 bg-purple-900/20 rounded-lg border border-purple-800/30 hover:bg-purple-900/30 transition-colors">
                  <Sparkles className="h-12 w-12 text-purple-400 mb-3" />
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Mystery</h3>
                  <p className="text-sm text-gray-300 text-center">Unravel cryptic clues hidden in the shadows</p>
                </div>

                <div className="flex flex-col items-center p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/30 hover:bg-indigo-900/30 transition-colors">
                  <Ghost className="h-12 w-12 text-indigo-400 mb-3" />
                  <h3 className="text-lg font-semibold text-indigo-300 mb-2">Spooky</h3>
                  <p className="text-sm text-gray-300 text-center">Experience thrills in the moonlit darkness</p>
                </div>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-purple-800/30 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-purple-300">Your Quest</h3>
                <p className="text-gray-300 mb-4">
                  You must solve 6 mysterious levels, each revealing a piece of a larger story. Each level contains a
                  clue hidden within images and videos, accompanied by atmospheric audio that sets the
                  mood.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>🎵</span>
                    <span>Immersive soundscapes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>🔊</span>
                    <span>Interactive sound effects</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>🌙</span>
                    <span>Atmospheric music</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>💕</span>
                    <span>Romantic storytelling</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <span>6 Levels</span>
                  <span>•</span>
                  <span>Multimedia Clues</span>
                  <span>•</span>
                  <span>Progressive Story</span>
                  <span>•</span>
                  <span>Atmospheric Audio</span>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleStartGame}
              >
                <Play className="mr-2 h-5 w-5" />
                Begin the Hunt
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
