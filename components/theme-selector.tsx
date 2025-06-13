"use client"

import { Heart, Ghost, Sparkles } from "lucide-react"

interface ThemeSelectorProps {
  selectedTheme: string
  onSelectTheme: (theme: string) => void
}

export function ThemeSelector({ selectedTheme, onSelectTheme }: ThemeSelectorProps) {
  const themes = [
    {
      id: "romantic",
      name: "Romantic",
      icon: <Heart className="h-5 w-5" />,
      description: "Love-filled and heartwarming",
      color: "border-pink-600 bg-pink-900/20 text-pink-300",
      selectedColor: "border-pink-500 bg-pink-800/40 text-pink-200",
    },
    {
      id: "mysterious",
      name: "Mysterious",
      icon: <Sparkles className="h-5 w-5" />,
      description: "Enigmatic and intriguing",
      color: "border-purple-600 bg-purple-900/20 text-purple-300",
      selectedColor: "border-purple-500 bg-purple-800/40 text-purple-200",
    },
    {
      id: "spooky",
      name: "Spooky",
      icon: <Ghost className="h-5 w-5" />,
      description: "Eerie and thrilling",
      color: "border-indigo-600 bg-indigo-900/20 text-indigo-300",
      selectedColor: "border-indigo-500 bg-indigo-800/40 text-indigo-200",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3">
      {themes.map((theme) => (
        <div
          key={theme.id}
          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
            selectedTheme === theme.id ? theme.selectedColor : theme.color
          }`}
          onClick={() => onSelectTheme(theme.id)}
        >
          <div className={`p-2 rounded-full ${selectedTheme === theme.id ? "bg-gray-800/60" : "bg-gray-900/60"}`}>
            {theme.icon}
          </div>
          <div>
            <h3 className="font-medium">{theme.name}</h3>
            <p className="text-sm opacity-80">{theme.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
