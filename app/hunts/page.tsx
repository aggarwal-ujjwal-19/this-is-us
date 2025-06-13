import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Ghost, Sparkles, Eye } from "lucide-react"

export default function HuntsPage() {
  // Example hunts - in a real app, these would come from a database
  const exampleHunts = [
    {
      id: "1",
      name: "Midnight Romance",
      description: "A romantic journey through memories and promises, ending with a special surprise.",
      theme: "romantic",
      cluesCount: 5,
      createdAt: "2023-10-15",
      previewImage: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "2",
      name: "Haunted Love Letters",
      description: "Follow the trail of mysterious notes that blend romance with a touch of the supernatural.",
      theme: "spooky",
      cluesCount: 7,
      createdAt: "2023-11-02",
      previewImage: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "3",
      name: "Enigma of the Heart",
      description: "Decode the cryptic messages that reveal a path to a hidden treasure of love.",
      theme: "mysterious",
      cluesCount: 6,
      createdAt: "2023-12-20",
      previewImage: "/placeholder.svg?height=200&width=400",
    },
  ]

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "romantic":
        return <Heart className="h-4 w-4 text-pink-400" />
      case "spooky":
        return <Ghost className="h-4 w-4 text-indigo-400" />
      case "mysterious":
        return <Sparkles className="h-4 w-4 text-purple-400" />
      default:
        return <Heart className="h-4 w-4 text-pink-400" />
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Example Hunts
          </h1>
          <Link href="/hunts/create">
            <Button className="bg-purple-700 hover:bg-purple-600">Create Your Own</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleHunts.map((hunt) => (
            <Card
              key={hunt.id}
              className="bg-gray-800/60 backdrop-blur-sm border-purple-800/50 text-white overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image src={hunt.previewImage || "/placeholder.svg"} alt={hunt.name} fill className="object-cover" />
                <Badge className={`absolute top-2 right-2 ${getThemeColor(hunt.theme)} flex items-center gap-1`}>
                  {getThemeIcon(hunt.theme)}
                  {hunt.theme.charAt(0).toUpperCase() + hunt.theme.slice(1)}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>{hunt.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{hunt.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{hunt.cluesCount} clues</span>
                  <span>Created: {hunt.createdAt}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/hunts/${hunt.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-purple-600 text-purple-300 hover:bg-purple-900/20">
                    <Eye className="mr-2 h-4 w-4" />
                    View Hunt
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
