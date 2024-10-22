'use client'

import { useAudioPlayer } from '@/hooks/use-audio-player'
import { PlayButton } from './play-button'
import { ProgressBar } from './progress-bar'
import { TrackInfo } from './track-info'
import { VolumeControl } from './volume-control'

interface MusicPlayerProps {
  className?: string
}

export function MusicPlayer({ className = '' }: MusicPlayerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    toggleMute,
    handleSeek,
    handleVolumeChange
  } = useAudioPlayer()

  return (
    <div
      className={`fixed bottom-4 right-4 w-64 rounded-lg border border-green-500 bg-black bg-opacity-50 p-4 text-green-500 backdrop-blur-md ${className}`}
    >
      <div className='mb-2 flex items-center justify-between'>
        <TrackInfo />
        <PlayButton isPlaying={isPlaying} onToggle={togglePlay} />
      </div>
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />
      <VolumeControl
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
      />
    </div>
  )
}
