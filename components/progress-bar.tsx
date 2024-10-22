import { Slider } from '@/components/ui/slider'
import { formatTime } from '@/utils/format-time'

interface ProgressBarProps {
  currentTime: number
  duration: number
  onSeek: (value: number[]) => void
}

export function ProgressBar({
  currentTime,
  duration,
  onSeek
}: ProgressBarProps) {
  return (
    <>
      <Slider
        value={[duration ? (currentTime / duration) * 100 : 0]}
        max={100}
        step={1}
        className='w-full'
        onValueChange={onSeek}
      />
      <div className='mt-2 flex items-center justify-between'>
        <span className='text-xs'>{formatTime(currentTime)}</span>
        <span className='text-xs'>{formatTime(duration)}</span>
      </div>
    </>
  )
}
