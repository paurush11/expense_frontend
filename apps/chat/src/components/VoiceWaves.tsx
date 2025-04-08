import { useEffect, useRef } from 'react'

interface VoiceWavesProps {
    isActive: boolean
    theme: 'theme-1' | 'theme-2'
}

export const VoiceWaves = ({ isActive, theme }: VoiceWavesProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(0)
    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const dataArrayRef = useRef<Uint8Array | null>(null)

    useEffect(() => {
        if (!isActive) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
            return
        }

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set up audio context and analyser
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount)

        // Get microphone access
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const source = audioContextRef.current!.createMediaStreamSource(stream)
                source.connect(analyserRef.current!)
            })
            .catch(err => {
                console.error('Error accessing microphone:', err)
            })

        const draw = () => {
            if (!ctx || !analyserRef.current || !dataArrayRef.current) return

            const width = canvas.width
            const height = canvas.height
            const centerY = height / 2

            // Clear canvas
            ctx.clearRect(0, 0, width, height)
            // Get frequency data
            analyserRef.current.getByteFrequencyData(dataArrayRef.current)
            // Draw waves
            const barWidth = width / dataArrayRef.current.length
            // Add glow effect
            ctx.shadowColor = 'hsl(var(--success))'
            ctx.shadowBlur = 10
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0

            ctx.fillStyle = 'hsl(var(--success))'
            for (let i = 0; i < dataArrayRef.current.length; i++) {
                const barHeight = (dataArrayRef.current[i] / 255) * (height / 2)
                const x = i * barWidth
                const y = centerY - barHeight / 2

                // Draw rounded bars
                const radius = 4
                ctx.beginPath()
                ctx.moveTo(x + radius, y)
                ctx.lineTo(x + barWidth - radius, y)
                ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
                ctx.lineTo(x + barWidth, y + barHeight - radius)
                ctx.quadraticCurveTo(x + barWidth, y + barHeight, x + barWidth - radius, y + barHeight)
                ctx.lineTo(x + radius, y + barHeight)
                ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - radius)
                ctx.lineTo(x, y + radius)
                ctx.quadraticCurveTo(x, y, x + radius, y)
                ctx.closePath()
                ctx.fill()
            }

            // Reset shadow
            ctx.shadowBlur = 0
            ctx.shadowColor = 'transparent'

            animationRef.current = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [isActive, theme])

    return (
        <div className={theme}>
            <canvas
                ref={canvasRef}
                width={100}
                height={100}
                className="rounded-lg"
            />
        </div>
    )
} 