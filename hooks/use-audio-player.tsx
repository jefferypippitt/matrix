import { useState, useRef, useEffect } from 'react'

export interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  togglePlay: () => void
  toggleMute: () => void
  handleSeek: (value: number[]) => void
  handleVolumeChange: (value: number[]) => void
}

export function useAudioPlayer(): AudioPlayerState {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    // Create audio element only once
    if (!audioRef.current) {
      const audio = new Audio('/matrix-theme.mp3')
      audio.preload = 'metadata'
      audioRef.current = audio

      // Set initial volume
      audio.volume = volume / 100
    }

    const audio = audioRef.current

    const handleLoadMetadata = () => {
      // console.log('Metadata loaded, duration:', audio.duration) // Removed console log
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    // Cleanup
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume, isMuted])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        await audioRef.current.pause()
      } else {
        // Reset the audio if it has ended
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0
        }
        await audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error('Error toggling play:', error)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const shouldMute = !isMuted
    audioRef.current.volume = shouldMute ? 0 : volume / 100
    setIsMuted(shouldMute)
  }

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return
    const newTime = (value[0] / 100) * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
      if (isMuted && newVolume > 0) {
        setIsMuted(false)
      }
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current.load()
        audioRef.current = null
      }
    }
  }, [])

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    toggleMute,
    handleSeek,
    handleVolumeChange
  }
}
