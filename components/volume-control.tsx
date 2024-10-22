import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Volume2, VolumeX } from 'lucide-react'

interface VolumeControlProps {
  volume: number
  isMuted: boolean
  onVolumeChange: (value: number[]) => void
  onToggleMute: () => void
}

export function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute
}: VolumeControlProps) {
  return (
    <div className='mt-2 flex items-center'>
      <Button
        variant='ghost'
        size='icon'
        className='h-8 w-8 p-0'
        onClick={onToggleMute}
      >
        {isMuted || volume === 0 ? (
          <VolumeX className='h-4 w-4' />
        ) : (
          <Volume2 className='h-4 w-4' />
        )}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        max={100}
        step={1}
        className='w-full'
        onValueChange={onVolumeChange}
      />
    </div>
  )
}
