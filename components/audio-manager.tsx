"use client"

import { useEffect, useRef, useState } from "react"

interface AudioManagerProps {
  currentSound: string | null
  isMuted: boolean
  volume?: number
  forceAutoplay?: boolean
}

export function AudioManager({ currentSound, isMuted, volume = 0.3, forceAutoplay = true }: AudioManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [autoplayAttempted, setAutoplayAttempted] = useState(false)
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string | null>(null)

  // Track user interaction for autoplay policy compliance
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true)

      // Try to play audio if it was blocked before
      if (audioRef.current && !isPlaying && !isMuted && currentSound) {
        audioRef.current.play().catch((err) => console.log("Still can't autoplay:", err))
      }
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction)

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [isPlaying, isMuted, currentSound])

  useEffect(() => {
    // Handle mute/unmute without changing the audio source
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else if (currentSound) {
        // Only try to play if we have a current sound
        audioRef.current.play().catch((error) => {
          console.log("Autoplay prevented by browser policy:", error)
        })
      }
    }
  }, [isMuted])

  useEffect(() => {
    // Only create a new audio instance when the sound changes
    if (currentSound && currentSound !== currentAudioSrc) {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      // Create new audio instance
      try {
        audioRef.current = new Audio(`/audio/${currentSound}.mp3`)
        setCurrentAudioSrc(currentSound)
        audioRef.current.volume = volume
        audioRef.current.loop = true
        audioRef.current.preload = "auto"

        // Add event listeners
        audioRef.current.addEventListener("loadeddata", () => {
          console.log(`Audio loaded: ${currentSound}`)
        })

        audioRef.current.addEventListener("error", (e) => {
          console.error(`Audio error for ${currentSound}:`, e)
        })

        audioRef.current.addEventListener("play", () => {
          setIsPlaying(true)
          console.log(`Audio playing: ${currentSound}`)
        })

        audioRef.current.addEventListener("pause", () => {
          setIsPlaying(false)
          console.log(`Audio paused: ${currentSound}`)
        })

        // Only play if not muted
        if (!isMuted) {
          // Always attempt autoplay immediately
          if (forceAutoplay && !autoplayAttempted) {
            setAutoplayAttempted(true)

            // Try to play the audio immediately
            audioRef.current.play().catch((error) => {
              console.log("Autoplay prevented by browser policy:", error)

              // Create a silent audio context to unlock audio on iOS
              try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext
                if (AudioContext) {
                  const audioContext = new AudioContext()
                  const silence = audioContext.createBuffer(1, 1, 22050)
                  const source = audioContext.createBufferSource()
                  source.buffer = silence
                  source.connect(audioContext.destination)
                  source.start(0)

                  // Try again after unlocking
                  setTimeout(() => {
                    if (audioRef.current) {
                      audioRef.current.play().catch((e) => console.log("Still can't autoplay after unlock:", e))
                    }
                  }, 100)
                }
              } catch (e) {
                console.log("Audio context creation failed:", e)
              }
            })
          } else if (audioRef.current) {
            audioRef.current.play().catch((error) => {
              console.log("Autoplay prevented by browser policy:", error)
            })
          }
        }
      } catch (error) {
        console.error("Error creating audio:", error)
      }
    } else if (currentSound === null && audioRef.current) {
      // Stop audio if no sound specified
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentAudioSrc(null)
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("loadeddata", () => {})
        audioRef.current.removeEventListener("error", () => {})
        audioRef.current.removeEventListener("play", () => {})
        audioRef.current.removeEventListener("pause", () => {})
      }
    }
  }, [currentSound, volume, forceAutoplay, isMuted, autoplayAttempted])

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Expose play function for manual triggering
  const playAudio = async () => {
    if (audioRef.current && !isMuted) {
      try {
        await audioRef.current.play()
        setHasUserInteracted(true)
      } catch (error) {
        console.error("Manual audio play failed:", error)
      }
    }
  }

  // This component doesn't render anything visible, but we can expose the play function
  // through a global reference if needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).playAudio = playAudio
    }
  }, [])

  return null
}
