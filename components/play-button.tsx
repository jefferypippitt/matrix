import { Button } from '@/components/ui/button'
import { Play, Pause } from 'lucide-react'

interface PlayButtonProps {
  isPlaying: boolean
  onToggle: () => void
}

export function PlayButton({ isPlaying, onToggle }: PlayButtonProps) {
  return (
    <Button variant='ghost' size='icon' className='h-8 w-8' onClick={onToggle}>
      {isPlaying ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
    </Button>
  )
}
