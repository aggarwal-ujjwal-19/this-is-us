"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, ImageIcon, Video, FileImageIcon as FileGif, Save } from "lucide-react"
import { ClueCard } from "@/components/clue-card"
import { ThemeSelector } from "@/components/theme-selector"

export default function CreateHunt() {
  const router = useRouter()
  const [huntName, setHuntName] = useState("")
  const [huntDescription, setHuntDescription] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("romantic")
  const [clues, setClues] = useState<
    Array<{
      id: string
      type: "image" | "video" | "gif"
      content: string
      hint: string
      solution: string
    }>
  >([])

  const addClue = (type: "image" | "video" | "gif") => {
    const newClue = {
      id: `clue-${Date.now()}`,
      type,
      content: "",
      hint: "",
      solution: "",
    }
    setClues([...clues, newClue])
  }

  const removeClue = (id: string) => {
    setClues(clues.filter((clue) => clue.id !== id))
  }

  const updateClue = (id: string, field: string, value: string) => {
    setClues(clues.map((clue) => (clue.id === id ? { ...clue, [field]: value } : clue)))
  }

  const handleSave = () => {
    // In a real app, we would save to a database
    alert("Hunt saved successfully!")
    router.push("/hunts")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          Create Your Enchanted Hunt
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/60 backdrop-blur-sm border-purple-800/50 text-white">
              <CardHeader>
                <CardTitle>Hunt Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hunt-name">Hunt Name</Label>
                  <Input
                    id="hunt-name"
                    value={huntName}
                    onChange={(e) => setHuntName(e.target.value)}
                    placeholder="Midnight Mystery..."
                    className="bg-gray-700/60 border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hunt-description">Description</Label>
                  <Textarea
                    id="hunt-description"
                    value={huntDescription}
                    onChange={(e) => setHuntDescription(e.target.value)}
                    placeholder="A mysterious journey through..."
                    className="bg-gray-700/60 border-gray-600 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hunt Theme</Label>
                  <ThemeSelector selectedTheme={selectedTheme} onSelectTheme={setSelectedTheme} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-gray-800/60 backdrop-blur-sm border-purple-800/50 text-white">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Clues</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-pink-600 text-pink-300 hover:bg-pink-900/20"
                      onClick={() => addClue("image")}
                    >
                      <ImageIcon className="mr-1 h-4 w-4" />
                      Image
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
                      onClick={() => addClue("video")}
                    >
                      <Video className="mr-1 h-4 w-4" />
                      Video
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-indigo-600 text-indigo-300 hover:bg-indigo-900/20"
                      onClick={() => addClue("gif")}
                    >
                      <FileGif className="mr-1 h-4 w-4" />
                      GIF
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {clues.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
                    <p className="text-gray-400 mb-4">No clues added yet</p>
                    <Button
                      variant="outline"
                      className="border-purple-600 text-purple-300 hover:bg-purple-900/20"
                      onClick={() => addClue("image")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Clue
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {clues.map((clue, index) => (
                      <ClueCard
                        key={clue.id}
                        clue={clue}
                        clueNumber={index + 1}
                        onUpdate={(field, value) => updateClue(clue.id, field, value)}
                        onRemove={() => removeClue(clue.id)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Preview Hunt
                </Button>
                <Button
                  className="bg-purple-700 hover:bg-purple-600"
                  onClick={handleSave}
                  disabled={!huntName || clues.length === 0}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Hunt
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
