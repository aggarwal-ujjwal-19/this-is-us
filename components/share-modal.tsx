"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Share2,
  Copy,
  Twitter,
  Facebook,
  MessageCircle,
  Mail,
  Download,
  QrCode,
  Heart,
  CheckCircle,
  Lock,
} from "lucide-react"

interface ShareModalProps {
  progress: number[]
  currentLevel?: number
  isCompleted?: boolean
  trigger?: React.ReactNode
}

export function ShareModal({ progress, currentLevel, isCompleted = false, trigger }: ShareModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [customMessage, setCustomMessage] = useState("")

  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const shareUrl = `${baseUrl}${isCompleted ? "/complete" : currentLevel ? `/level/${currentLevel}` : ""}`

  const levelNames = [
    "The First Whisper",
    "Echoes of Laughter",
    "Midnight Confessions",
    "The Garden of Secrets",
    "Shadows of the Past",
    "The Final Revelation",
  ]

  const generateShareText = (platform: string) => {
    const completedCount = progress.length
    const totalLevels = 6

    let messages

    if (isCompleted) {
      messages = {
        twitter: `🌙 I just completed "Whispers in the Moonlight" - a romantic mystery scavenger hunt! ✨ All 6 levels solved! 💕 #ScavengerHunt #Romance #Mystery`,
        facebook: `I just finished an amazing romantic mystery scavenger hunt called "Whispers in the Moonlight"! 🌙✨ It was such a beautiful journey through 6 levels of romance, mystery, and spooky fun. Highly recommend! 💕`,
        whatsapp: `🌙 Just completed "Whispers in the Moonlight" scavenger hunt! ✨ All 6 romantic mystery levels done! It was amazing! 💕`,
        email: `I wanted to share something special with you! I just completed this beautiful romantic mystery scavenger hunt called "Whispers in the Moonlight." It's 6 levels of romance, mystery, and just the right amount of spooky fun. You should try it!`,
        generic: `🌙 Completed "Whispers in the Moonlight" - a romantic mystery scavenger hunt! ✨ All 6 levels solved! 💕`,
      }
    } else {
      messages = {
        twitter: `🌙 Playing "Whispers in the Moonlight" scavenger hunt! Currently on level ${currentLevel}/6 ✨ ${completedCount} levels completed! #ScavengerHunt #Romance #Mystery`,
        facebook: `I'm having so much fun with this romantic mystery scavenger hunt called "Whispers in the Moonlight"! 🌙 Currently on level ${currentLevel} and have completed ${completedCount} out of 6 levels. The story is so engaging! ✨`,
        whatsapp: `🌙 Playing this cool scavenger hunt "Whispers in the Moonlight"! On level ${currentLevel}/6 - ${completedCount} completed so far! ✨`,
        email: `I'm playing this amazing romantic mystery scavenger hunt called "Whispers in the Moonlight" and thought you might enjoy it too! I'm currently on level ${currentLevel} and have completed ${completedCount} out of 6 levels.`,
        generic: `🌙 Playing "Whispers in the Moonlight" scavenger hunt! Level ${currentLevel}/6 - ${completedCount} completed! ✨`,
      }
    }

    return messages[platform as keyof typeof messages] || messages.generic
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const shareToSocial = (platform: string) => {
    const text = customMessage || generateShareText(platform)
    const encodedText = encodeURIComponent(text)
    const encodedUrl = encodeURIComponent(shareUrl)

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      email: `mailto:?subject=Check out this romantic scavenger hunt!&body=${encodedText}%0A%0A${shareUrl}`,
    }

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  const generateProgressCard = () => {
    return (
      <Card className="bg-gray-800/60 backdrop-blur-sm border-purple-800/50 text-white mb-4">
        <CardHeader>
          <CardTitle className="text-lg text-purple-300">My Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {levelNames.map((name, index) => {
              const levelNum = index + 1
              const isCompleted = progress.includes(levelNum)
              const isCurrent = currentLevel === levelNum

              return (
                <div key={levelNum} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      isCompleted ? "bg-green-600" : isCurrent ? "bg-purple-600" : "bg-gray-700"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : isCurrent ? (
                      <span>{levelNum}</span>
                    ) : (
                      <Lock className="h-3 w-3" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isCompleted ? "text-green-300" : isCurrent ? "text-purple-300" : "text-gray-500"
                    }`}
                  >
                    Level {levelNum}: {name}
                  </span>
                  {isCurrent && !isCompleted && (
                    <Badge variant="outline" className="border-purple-600 text-purple-300 text-xs">
                      Current
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Progress: {progress.length}/6 levels</span>
              <span>{Math.round((progress.length / 6) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(progress.length / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const downloadProgress = () => {
    const progressData = {
      huntName: "Whispers in the Moonlight",
      completedLevels: progress,
      currentLevel: currentLevel,
      totalLevels: 6,
      completionPercentage: Math.round((progress.length / 6) * 100),
      completedAt: isCompleted ? new Date().toISOString() : null,
      levels: levelNames.map((name, index) => ({
        id: index + 1,
        name,
        completed: progress.includes(index + 1),
        isCurrent: currentLevel === index + 1,
      })),
    }

    const dataStr = JSON.stringify(progressData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `whispers-moonlight-progress-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-900/20">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-gray-900 border-purple-800/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-300 flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-400" />
            Share Your Journey
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isCompleted
              ? "Celebrate completing the romantic mystery hunt!"
              : `Share your progress through the moonlit mystery (${progress.length}/6 levels completed)`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Card */}
          {generateProgressCard()}

          {/* Custom Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300">Custom Message (Optional)</label>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={generateShareText("generic")}
              className="bg-gray-800/60 border-gray-600 text-white min-h-[80px]"
            />
          </div>

          {/* Share URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300">Share Link</label>
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly className="bg-gray-800/60 border-gray-600 text-white" />
              <Button
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
                onClick={() => copyToClipboard(shareUrl)}
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-purple-300">Share on Social Media</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-300 hover:bg-blue-900/20"
                onClick={() => shareToSocial("twitter")}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="border-blue-700 text-blue-300 hover:bg-blue-900/20"
                onClick={() => shareToSocial("facebook")}
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button
                variant="outline"
                className="border-green-600 text-green-300 hover:bg-green-900/20"
                onClick={() => shareToSocial("whatsapp")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => shareToSocial("email")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-purple-300">Additional Options</h3>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
                onClick={downloadProgress}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Progress
              </Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
                onClick={() => copyToClipboard(customMessage || generateShareText("generic"))}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Message
              </Button>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-gray-800/40 p-4 rounded-lg border border-purple-800/30">
            <div className="flex items-center gap-2 mb-2">
              <QrCode className="h-4 w-4 text-purple-300" />
              <span className="text-sm font-medium text-purple-300">QR Code</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Generate a QR code for easy sharing (in a real app, this would show an actual QR code)
            </p>
            <div className="bg-white p-4 rounded-lg flex items-center justify-center">
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <QrCode className="h-16 w-16 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
