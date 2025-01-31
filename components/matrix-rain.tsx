'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MusicPlayer } from './music-player'

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Get canvas element and ensure it exists
    const canvas = canvasRef.current
    if (!canvas) return

    // Get the context and ensure it exists
    const context = canvas.getContext('2d')
    if (!context) return

    // Now TypeScript knows both canvas and context are not null
    const ctx = context

    // Safely set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Matrix rain configuration
    const fontSize = 15
    const columnWidth = 20
    const columns = Math.floor(canvas.width / columnWidth)
    const drops: number[] = Array(columns).fill(1)
    const matrixChars =
      'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890'

    // Create the draw function with canvas and ctx in scope
    const draw = () => {
      // Create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      drops.forEach((drop, i) => {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]

        // Random brightness effect
        const brightness = Math.random()
        ctx.fillStyle = `rgba(0, 255, 0, ${brightness})`

        // Draw the character
        ctx.fillText(char, i * columnWidth, drop * 20)

        // Reset drop when it reaches bottom
        if (drop * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++
      })
    }

    // Start the animation
    const interval = setInterval(draw, 33)

    // Cleanup
    return () => {
      clearInterval(interval)
    }
  }, [dimensions])

  return (
    <div className='relative min-h-screen overflow-hidden bg-black text-green-500'>
      <canvas ref={canvasRef} className='absolute inset-0 h-full w-full' />
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center p-4'>
        <div className='relative w-full max-w-lg'>
          <Image
            src='/matrix-logo-hd.png'
            alt='The Matrix'
            width={500}
            height={500}
            className='w-full h-auto'
            priority
          />
        </div>
        <MusicPlayer className='fixed bottom-4 right-4' />
      </div>
    </div>
  )
}
