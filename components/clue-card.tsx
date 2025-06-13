"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Trash2, ImageIcon, Video, FileImageIcon as FileGif } from "lucide-react"

type ClueType = "image" | "video" | "gif"

interface ClueCardProps {
  clue: {
    id: string
    type: ClueType
    content: string
    hint: string
    solution: string
  }
  clueNumber: number
  onUpdate: (field: string, value: string) => void
  onRemove: () => void
}

export function ClueCard({ clue, clueNumber, onUpdate, onRemove }: ClueCardProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = () => {
    setIsUploading(true)
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false)
      onUpdate("content", "/placeholder.svg?height=200&width=400")
    }, 1500)
  }

  const getTypeIcon = () => {
    switch (clue.type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-pink-400" />
      case "video":
        return <Video className="h-5 w-5 text-purple-400" />
      case "gif":
        return <FileGif className="h-5 w-5 text-indigo-400" />
    }
  }

  const getTypeLabel = () => {
    switch (clue.type) {
      case "image":
        return "Image Clue"
      case "video":
        return "Video Clue"
      case "gif":
        return "GIF Clue"
    }
  }

  return (
    <Card className="bg-gray-800/40 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <h3 className="font-medium">
            Clue {clueNumber}: {getTypeLabel()}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Upload {clue.type}</Label>
          {clue.content ? (
            <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-700">
              <Image src={clue.content || "/placeholder.svg"} alt="Clue content" fill className="object-cover" />
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-2 right-2 bg-gray-900/80 border-gray-700 text-gray-300"
                onClick={() => onUpdate("content", "")}
              >
                Replace
              </Button>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-700 rounded-md p-4 cursor-pointer hover:bg-gray-800/40 transition-colors"
              onClick={handleFileUpload}
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-2"></div>
                  <p className="text-gray-400">Uploading...</p>
                </div>
              ) : (
                <>
                  {getTypeIcon()}
                  <p className="mt-2 text-sm text-gray-400">Click to upload a {clue.type}</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF, MP4 up to 10MB</p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`hint-${clue.id}`}>Hint or Clue Text</Label>
          <Textarea
            id={`hint-${clue.id}`}
            value={clue.hint}
            onChange={(e) => onUpdate("hint", e.target.value)}
            placeholder="Where we first met..."
            className="bg-gray-700/60 border-gray-600 min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`solution-${clue.id}`}>Solution or Next Location</Label>
          <Input
            id={`solution-${clue.id}`}
            value={clue.solution}
            onChange={(e) => onUpdate("solution", e.target.value)}
            placeholder="The coffee shop on Main Street"
            className="bg-gray-700/60 border-gray-600"
          />
        </div>
      </CardContent>
    </Card>
  )
}
