"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Lightbulb,
  ImageIcon,
  Video,
  FileImageIcon as FileGif,
  Volume2,
  VolumeX,
  CheckCircle,
  RefreshCw,
  Lock,
  Unlock,
  User,
  BookOpen,
  Crown,
} from "lucide-react"
import { SoundVisualizer } from "@/components/sound-visualizer"
import { AudioManager } from "@/components/audio-manager"

interface LevelData {
  id: number
  title: string
  defaultType: "image" | "video" | "gif"
  imageUrl: string
  videoUrl?: string
  gifUrl?: string
  poem: string
  personName: string
  personDisplayName: string
  clue: string
  hint: string
  answer: string
  story: string
  ambientSound: string
  successSound: string
  atmosphere: "romantic" | "mysterious" | "spooky"
}

const levelsData: LevelData[] = [
  {
    id: 1,
    title: "The First Whisper",
    defaultType: "image",
    imageUrl: "/images/level1-cinema.jpg",
    poem: "With paint on hands and spark in eyes,\nShe claims she's broke—but shops in disguise! \nHer closet bursts with pricey flair, \nYet penny-pinching's everywhere.\nHer laughter bubbles, stories spin,\nHer style's a win—she's sure to grin.\nShe'll hear your woes and never judge,\nAnd win your heart with food she'll drudge.",
    personName: "Ishika",
    personDisplayName: "Ishika",
    clue: "From the place we met, a journey to see,\nThree letters await, as clear as can be.\nTrace back the steps, a hint in the sign,\n  Think of a spot where you went to shine.",
    hint: "Think about the first meeting place....",
    answer: "VMC",
    story: "Breakfast at Filter Coffee!",
    ambientSound: "level1-cinema-ambience",
    successSound: "level1-romantic-chime",
    atmosphere: "romantic",
  },
  {
    id: 2,
    title: "Echoes of Laughter",
    defaultType: "image",
    imageUrl: "/images/level2-dance-hall.jpg",
    videoUrl: "/videos/level2-dance-hall.mp4",
    poem: "Her smile stays bright, no matter the storm,\nA constant warmth, her radiant norm.\nA freak for clean, she’s spotless and neat,\nWith jhumkas and kurtas, she’s always on beat.\nShe waters your dreams, helps them grow tall,\nWants happiness around her, shared by all.\nHer “me time” is sacred, her zen-filled den,\nBut oh, her weakness? Those bad-choices in men!",
    personName: "Lakshita",
    personDisplayName: "Lakshita",
    clue: "When this song plays, we share a glance,\nLost in the music, caught in a trance.\nWith a great actor’s son dancing so fine,\nThink of our favorite song, a true love sign.",
    hint: "First letter of each word of the song...all in CAPS - 5 letters...",
    answer: "TAMJD",
    story: "Lunch at Thar - The taste of Rajasthan!",
    ambientSound: "level2-old-music-box",
    successSound: "level2-magical-sparkle",
    atmosphere: "mysterious",
  },
  {
    id: 3,
    title: "Midnight Confessions",
    defaultType: "image",
    imageUrl: "/images/level3-bridge.jpg",
    videoUrl: "/videos/level3-bridge.mp4",
    poem: "The first flatmate, what a wild start,\nFrom shareef to tez, she mastered the art.\nShopping sprees and outings, her natural flair,\nWith a guy so lucky, he’s beyond compare.\n\nGossip queen, with tea to spill,\nGym plans? Got swapped for a snack and a thrill.\nThrough laughter and chaos, we grew like glue,\nGuess who this is—it’s clearly her cue!",
    personName: "Kavya",
    personDisplayName: "Kavya",
    clue: "In the tower where markets dance and deals come alive,\nA second-in-command helps ambition thrive.\nNot the CEO, but the rank that steers the course,\nFind the Goldman Sachs role with secondary force.",
    hint: "Current Obsession....",
    answer: "VP",
    story: "Snacks at Chez Mariannick!",
    ambientSound: "level3-night-wind",
    successSound: "level3-ghostly-whisper",
    atmosphere: "spooky",
  },
  {
    id: 4,
    title: "The Garden of Secrets",
    defaultType: "image",
    imageUrl: "/images/level4-garden.jpg",
    videoUrl: "/videos/level4-garden.mp4",
    poem: "The lecture buddy, always by your side,\nWith stories so wild, a rollercoaster ride.\nHigh as a kite or a drink in hand,\nYet loyal and kind—a true friend so grand.\n\nA host so charming, she steals the show,\nDifferent as day and night, yet together you still glow.\nIn every adventure, a treasure to find,\nShe’s one of a kind.",
    personName: "Pooja",
    personDisplayName: "Pooja",
    clue: "Beneath emerald bays and towering karsts we roamed,\nPho steam rising in alleys where scooters combed.\nOur first leap beyond borders, hand clasped in hand,\nIn dawn-lit lantern glow, our hearts found new land.",
    hint: "International trip....",
    answer: "Vietnam",
    story: "Momos Time!",
    ambientSound: "level4-garden-night",
    successSound: "level4-nature-harmony",
    atmosphere: "romantic",
  },
  {
    id: 5,
    title: "Shadows of the Past",
    defaultType: "image",
    imageUrl: "/images/level5-library.jpg",
    videoUrl: "/videos/level5-library.mp4",
    poem: "He’s a sports junkie, gadgets in hand,\nBags and electronics—his treasure land.\nFrom biryani to burgers, his appetite’s grand,\nA foodie at heart, with tastes so unplanned.\n\nPeople make him groan, but for friends, he’ll stand,\nLoyal and fierce, always lending a hand.\nTrekking through trails is his perfect delight,\nAnd oddball movies? He’s watched every bite!",
    personName: "Ritu",
    personDisplayName: "Ritu",
    clue: "A city so planned, with gardens in view,\nThe first post-COVID trip with the whole crew.\nLaughter and stories by the lake so bright,\nThink of the place where it all felt right.",
    hint: "2 state jewel",
    answer: "Chandigarh",
    story:"Dinner at Helen's Place!",
    ambientSound: "level5-library-whispers",
    successSound: "level5-mystical-chime",
    atmosphere: "mysterious",
  },
  {
    id: 6,
    title: "The Final Revelation",
    defaultType: "image",
    imageUrl: "/images/level6-ballroom.jpg",
    videoUrl: "/videos/level6-ballroom.mp4",
    poem: "She’s a culture explorer, a polyglot star,\nMovies, traditions, she’s traveled afar.\nFrom German to customs, her knowledge flows,\nA frugal globetrotter, wherever she goes.\n\nHer diet’s a puzzle, so simple and neat,\nPotatoes alone are her favorite treat.\nShe plans every detail, from start to end,\nAnd loves like no other, a true, loyal friend.",
    personName: "Kriti",
    personDisplayName: "Kriti",
    clue: "A place where the sun kissed the sea goodbye,\nWith hues so stunning, they made you cry.\nOn a scooty we rode to the best sunset ever,\nThink of the shore you’ll cherish forever.",
    hint: "Sun set....",
    answer: "Gokarna",
    story:  "Sweets at home!",
    ambientSound: "level6-haunted-waltz",
    successSound: "level6-ethereal-bells",
    atmosphere: "spooky",
  },
]

export default function LevelPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const levelId = Number.parseInt(params.id)
  const level = levelsData.find((l) => l.id === levelId)
  const pageTopRef = useRef<HTMLDivElement>(null)

  const [answer, setAnswer] = useState("")
  const [personGuess, setPersonGuess] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showPersonError, setShowPersonError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingPerson, setIsSubmittingPerson] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isMediaUnlocked, setIsMediaUnlocked] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState<number[]>([])
  const [currentSound, setCurrentSound] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<"image" | "video" | "gif">("image")

  // Scroll to top when level changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [levelId])

  useEffect(() => {
    // Set default media type based on level data
    if (level) {
      setMediaType(level.defaultType)
    }

    // Load progress from localStorage
    const savedProgress = localStorage.getItem("scavenger-hunt-progress")
    if (savedProgress) {
      const progressArray = JSON.parse(savedProgress)
      setProgress(progressArray)
      setIsCompleted(progressArray.includes(levelId))
    }

    // Load media unlock status
    const savedUnlocks = localStorage.getItem("scavenger-hunt-unlocks")
    if (savedUnlocks) {
      const unlocksArray = JSON.parse(savedUnlocks)
      setIsMediaUnlocked(unlocksArray.includes(levelId))
    }

    // Check if user should be on this level
    if (levelId > 1 && savedProgress) {
      const progressArray = JSON.parse(savedProgress)
      if (!progressArray.includes(levelId - 1)) {
        // User hasn't completed previous level, redirect
        router.push(`/level/${progressArray.length > 0 ? Math.max(...progressArray) + 1 : 1}`)
      }
    }
  }, [levelId, router, level])

  useEffect(() => {
    // Set the current sound when level loads (only if not already set)
    if (level && currentSound === null && !isMuted) {
      setCurrentSound(level.ambientSound)
    }
  }, [level, isMuted, currentSound])

  useEffect(() => {
    // Reset answer and personGuess when level changes
    setAnswer("")
    setPersonGuess("")
    setShowError(false)
    setShowPersonError(false)

    // Reset current sound when level changes
    if (level) {
      setCurrentSound(isMuted ? null : level.ambientSound)
    }
  }, [levelId, level, isMuted])

  const playSound = (soundId: string) => {
    if (!isMuted) {
      // For UI sounds, we'll play them briefly
      const audio = new Audio(`/audio/${soundId}.mp3`)
      audio.volume = 0.5
      audio.play().catch((error) => {
        console.log("Sound playback failed:", error)
      })
    }
  }

  const handlePersonSubmit = async () => {
    if (!personGuess.trim() || !level) return

    setIsSubmittingPerson(true)
    setShowPersonError(false)
    playSound("ui-click")

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (personGuess.toLowerCase().trim() === level.personName.toLowerCase()) {
      // Success! Unlock media
      setIsMediaUnlocked(true)
      playSound("level1-romantic-chime")

      // Save unlock status
      const savedUnlocks = localStorage.getItem("scavenger-hunt-unlocks")
      const unlocksArray = savedUnlocks ? JSON.parse(savedUnlocks) : []
      if (!unlocksArray.includes(levelId)) {
        unlocksArray.push(levelId)
        localStorage.setItem("scavenger-hunt-unlocks", JSON.stringify(unlocksArray))
      }
    } else {
      setShowPersonError(true)
      setPersonGuess("")
      playSound("error-sound")
    }

    setIsSubmittingPerson(false)
  }

  const toggleMediaType = () => {
    if (!level || !isMediaUnlocked) return

    // Cycle through available media types
    if (mediaType === "image") {
      setMediaType("video")
    } else if (mediaType === "video") {
      if (level.gifUrl) {
        setMediaType("gif")
      } else {
        setMediaType("image")
      }
    } else {
      setMediaType("image")
    }

    playSound("ui-click")
  }

  const getMediaUrl = () => {
    if (!level) return ""

    switch (mediaType) {
      case "image":
        return level.imageUrl
      case "video":
        return level.videoUrl
      case "gif":
        return level.gifUrl || level.imageUrl
      default:
        return level.imageUrl
    }
  }

  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-gray-900 text-white flex items-center justify-center">
        <Card className="bg-gray-800/60 backdrop-blur-sm border-red-800/50 text-white">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Level Not Found</h2>
            <p className="text-gray-300 mb-6">The level you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/")} className="bg-purple-700 hover:bg-purple-600">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (!answer.trim()) return

    setIsSubmitting(true)
    setShowError(false)
    playSound("ui-click")

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (answer.toLowerCase().trim() === level.answer.toLowerCase()) {
      // Success!
      setCurrentSound(level.successSound)
      setIsCompleted(true)

      // Update progress
      const newProgress = [...progress, levelId]
      setProgress(newProgress)
      localStorage.setItem("scavenger-hunt-progress", JSON.stringify(newProgress))

      // Play success sound briefly, then return to ambient
      setTimeout(() => {
        if (!isMuted) {
          setCurrentSound(level.ambientSound)
        }
      }, 3000)
    } else {
      setShowError(true)
      setAnswer("")
      playSound("error-sound")
    }

    setIsSubmitting(false)
  }

  const getTypeIcon = () => {
    switch (mediaType) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-pink-400" />
      case "video":
        return <Video className="h-5 w-5 text-purple-400" />
      case "gif":
        return <FileGif className="h-5 w-5 text-indigo-400" />
    }
  }

  const getAtmosphereStyle = (atmosphere: string) => {
    switch (atmosphere) {
      case "romantic":
        return "from-pink-900/40 to-purple-900/40 border-pink-600/70"
      case "mysterious":
        return "from-purple-900/40 to-indigo-900/40 border-purple-600/70"
      case "spooky":
        return "from-indigo-900/40 to-gray-900/40 border-indigo-600/70"
      default:
        return "from-purple-900/40 to-indigo-900/40 border-purple-600/70"
    }
  }

  const canGoToPreviousLevel = levelId > 1

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const navigateToNextLevel = () => {
    if (levelId < 6) {
      router.push(`/level/${levelId + 1}`)
    } else {
      router.push("/complete")
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${getAtmosphereStyle(level.atmosphere)} text-white`}
      ref={pageTopRef}
    >
      {/* Audio Manager */}
      <AudioManager currentSound={currentSound} isMuted={isMuted} volume={0.4} forceAutoplay={true} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
              onClick={() => router.push("/")}
              onMouseEnter={() => playSound("ui-hover")}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            {canGoToPreviousLevel && (
              <Button
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
                onClick={() => router.push(`/level/${levelId - 1}`)}
                onMouseEnter={() => playSound("ui-hover")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-purple-900/40 text-purple-300 border-purple-700/50">Level {levelId} of 6</Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            {!isMuted && currentSound && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-green-600 text-green-300 text-xs">
                  🎵 {currentSound.replace(/level\d+-/, "").replace("-", " ")}
                </Badge>
                <SoundVisualizer isPlaying={true} soundType={level.atmosphere} />
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
          <div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(progress.length / 6) * 100}%` }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Poem Section */}
          {!isMediaUnlocked && (
            <Card className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-sm border-amber-600/70 text-white">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-300 flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  The Riddle of Names
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-900/60 p-6 rounded-lg border border-amber-800/30">
                  <h3 className="text-xl font-semibold mb-4 text-amber-300">Solve this riddle to unlock the clue:</h3>
                  <div className="text-gray-300 italic leading-relaxed text-lg whitespace-pre-line font-serif">
                    {level.poem}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={personGuess}
                      onChange={(e) => setPersonGuess(e.target.value)}
                      placeholder="Enter the person's name..."
                      className="bg-gray-700/60 border-gray-600 text-white text-lg"
                      onKeyPress={(e) => e.key === "Enter" && handlePersonSubmit()}
                      disabled={isSubmittingPerson}
                    />
                    <Button
                      onClick={handlePersonSubmit}
                      disabled={!personGuess.trim() || isSubmittingPerson}
                      className="bg-amber-700 hover:bg-amber-600 min-w-[120px]"
                      onMouseEnter={() => playSound("ui-hover")}
                    >
                      {isSubmittingPerson ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <User className="mr-2 h-4 w-4" />
                          Unlock
                        </>
                      )}
                    </Button>
                  </div>

                  {showPersonError && (
                    <div className="bg-red-900/20 border border-red-800/30 p-4 rounded-lg">
                      <p className="text-red-300">❌ That's not the right name. Read the riddle carefully...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Level Content */}
          <Card
            className={`bg-gradient-to-br ${getAtmosphereStyle(level.atmosphere)} backdrop-blur-sm text-white ${!isMediaUnlocked ? "opacity-60" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {isMediaUnlocked ? getTypeIcon() : <Lock className="h-5 w-5 text-gray-500" />}
                  <CardTitle className="text-2xl text-purple-300">{level.title}</CardTitle>
                  {isCompleted && <CheckCircle className="h-6 w-6 text-green-400" />}
                  {isMediaUnlocked && !isCompleted && <Unlock className="h-5 w-5 text-green-400" />}
                </div>

                {/* Media Type Toggle Button */}
                {isMediaUnlocked && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
                    onClick={toggleMediaType}
                    title="Switch media type"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    {mediaType === "image" ? "Image" : mediaType === "video" ? "Video" : "GIF"}
                  </Button>
                )}
              </div>

              {/* Person Name Display - Only show when unlocked */}
              {isMediaUnlocked && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-gold-900/40 text-amber-300 border-amber-700/50 flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Inspired by: {level.personDisplayName}
                  </Badge>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Media Content */}
              <div className="relative">
                <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg border border-purple-800/30">
                  {!isMediaUnlocked ? (
                    <div className="w-full h-full bg-gray-900/80 flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">Solve the riddle above to unlock this clue</p>
                      </div>
                    </div>
                  ) : mediaType === "video" ? (
                    <video
                      src={getMediaUrl()}
                      controls
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=400&width=600"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : mediaType === "gif" ? (
                    <Image
                      src={getMediaUrl() || "/placeholder.svg"}
                      alt={`Level ${level.id} clue`}
                      fill
                      className="object-cover"
                      unoptimized // For GIFs to maintain animation
                    />
                  ) : (
                    <Image
                      src={getMediaUrl() || "/placeholder.svg"}
                      alt={`Level ${level.id} clue`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Atmospheric overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-lg pointer-events-none"></div>
              </div>

              {/* Clue Text */}
              {isMediaUnlocked && (
                <div className="bg-gray-900/60 p-6 rounded-lg border border-purple-800/30">
                  <h3 className="text-xl font-semibold mb-4 text-purple-300">The Clue</h3>
                  <p className="text-gray-300 italic leading-relaxed text-xl">"{level.clue}"</p>
                </div>
              )}

              {/* Hint Section */}
              {isMediaUnlocked && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-600 text-yellow-300 hover:bg-yellow-900/20"
                    onClick={() => setShowHint(!showHint)}
                    onMouseEnter={() => playSound("ui-hover")}
                  >
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>

                  {showHint && (
                    <div className="flex-1 bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30">
                      <p className="text-yellow-300">💡 {level.hint}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Answer Section */}
              {isMediaUnlocked && !isCompleted ? (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Enter your answer..."
                      className="bg-gray-700/60 border-gray-600 text-white text-lg"
                      onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                      disabled={isSubmitting}
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={!answer.trim() || isSubmitting}
                      className="bg-purple-700 hover:bg-purple-600 min-w-[120px]"
                      onMouseEnter={() => playSound("ui-hover")}
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>

                  {showError && (
                    <div className="bg-red-900/20 border border-red-800/30 p-4 rounded-lg">
                      <p className="text-red-300">❌ That's not quite right. Try again...</p>
                    </div>
                  )}
                </div>
              ) : isCompleted ? (
                <div className="space-y-6">
                  <div className="bg-green-900/20 border border-green-800/30 p-6 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                      <span className="text-green-300 font-semibold text-lg">Correct Answer: {level.answer}</span>
                    </div>
                  </div>

                  {/* Story Revelation */}
                  <div className="bg-purple-900/20 border border-purple-800/30 p-6 rounded-lg">
                    <h4 className="text-purple-300 font-semibold mb-3 text-lg">The Story Unfolds...</h4>
                    <p className="text-gray-300 italic text-lg leading-relaxed">{level.story}</p>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4">
                    {levelId < 6 ? (
                      <Button
                        onClick={navigateToNextLevel}
                        className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                        onMouseEnter={() => playSound("ui-hover")}
                      >
                        Next Level
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={navigateToNextLevel}
                        className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                        onMouseEnter={() => playSound("ui-hover")}
                      >
                        Complete Hunt
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
