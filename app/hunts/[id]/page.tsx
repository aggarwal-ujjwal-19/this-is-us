import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Ghost, Sparkles, Lock } from "lucide-react"

export default function HuntDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch this data from a database
  const hunt = {
    id: params.id,
    name: "Midnight Romance",
    description: "A romantic journey through memories and promises, ending with a special surprise.",
    theme: "romantic",
    createdAt: "2023-10-15",
    clues: [
      {
        id: "clue-1",
        type: "image" as const,
        content: "/placeholder.svg?height=300&width=500",
        hint: "Where we first met under the stars...",
        isLocked: false,
      },
      {
        id: "clue-2",
        type: "video" as const,
        content: "/placeholder.svg?height=300&width=500",
        hint: "Our favorite song that always makes us dance...",
        isLocked: true,
      },
      {
        id: "clue-3",
        type: "gif" as const,
        content: "/placeholder.svg?height=300&width=500",
        hint: "The way you laugh when I tell that joke...",
        isLocked: true,
      },
      {
        id: "clue-4",
        type: "image" as const,
        content: "/placeholder.svg?height=300&width=500",
        hint: "The place we dream of visiting together...",
        isLocked: true,
      },
      {
        id: "clue-5",
        type: "image" as const,
        content: "/placeholder.svg?height=300&width=500",
        hint: "Where I'll be waiting with a special surprise...",
        isLocked: true,
      },
    ],
  }

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "romantic":
        return <Heart className="h-5 w-5 text-pink-400" />
      case "spooky":
        return <Ghost className="h-5 w-5 text-indigo-400" />
      case "mysterious":
        return <Sparkles className="h-5 w-5 text-purple-400" />
      default:
        return <Heart className="h-5 w-5 text-pink-400" />
    }
  }

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case "romantic":
        return "bg-pink-900/20 text-pink-300 border-pink-700/30"
      case "spooky":
        return "bg-indigo-900/20 text-indigo-300 border-indigo-700/30"
      case "mysterious":
        return "bg-purple-900/20 text-purple-300 border-purple-700/30"
      default:
        return "bg-pink-900/20 text-pink-300 border-pink-700/30"
    }
  }

  const getClueTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return "🖼️"
      case "video":
        return "🎬"
      case "gif":
        return "✨"
      default:
        return "🖼️"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/hunts" className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hunts
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`${getThemeColor(hunt.theme)} flex items-center gap-1`}>
              {getThemeIcon(hunt.theme)}
              {hunt.theme.charAt(0).toUpperCase() + hunt.theme.slice(1)}
            </Badge>
            <span className="text-gray-400 text-sm">Created: {hunt.createdAt}</span>
          </div>

          <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            {hunt.name}
          </h1>

          <p className="text-gray-300 text-lg mb-8">{hunt.description}</p>

          <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-lg border border-purple-800/30 mb-8">
            <h2 className="text-xl font-semibold mb-2 text-purple-300">How to Play</h2>
            <p className="text-gray-300">
              Follow the clues in order. Each clue will lead you to the next location or reveal a hint. Solve each clue
              to unlock the next one. The final clue will lead you to a special surprise!
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-purple-300">Clues</h2>

          {hunt.clues.map((clue, index) => (
            <Card
              key={clue.id}
              className={`bg-gray-800/60 backdrop-blur-sm border-purple-800/50 text-white ${clue.isLocked ? "opacity-80" : ""}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>
                    Clue {index + 1} {getClueTypeIcon(clue.type)}
                  </span>
                  {clue.isLocked && (
                    <Badge variant="outline" className="border-gray-600 text-gray-400 flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Locked
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {clue.isLocked ? (
                  <div className="relative h-48 w-full flex items-center justify-center bg-gray-900/60 rounded-lg border border-gray-700">
                    <div className="text-center">
                      <Lock className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-400">Solve the previous clue to unlock</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        src={clue.content || "/placeholder.svg"}
                        alt={`Clue ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="bg-gray-900/60 p-4 rounded-lg border border-purple-800/30">
                      <h3 className="text-lg font-semibold mb-2 text-purple-300">Hint</h3>
                      <p className="text-gray-300 italic">"{clue.hint}"</p>
                    </div>

                    {index === 0 && (
                      <div className="flex justify-end">
                        <Button className="bg-purple-700 hover:bg-purple-600">I Found It! Unlock Next Clue</Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
