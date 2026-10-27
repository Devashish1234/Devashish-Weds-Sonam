import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const confettiPieces = [
  { x: -116, y: -92, r: -35, color: '#B5965A' },
  { x: -92, y: -126, r: 42, color: '#A84251' },
  { x: -65, y: -75, r: 75, color: '#D9BD83' },
  { x: -40, y: -142, r: -64, color: '#6E1F2E' },
  { x: -15, y: -98, r: 105, color: '#E5CBA0' },
  { x: 15, y: -135, r: -52, color: '#A84251' },
  { x: 42, y: -88, r: 60, color: '#B5965A' },
  { x: 68, y: -124, r: -85, color: '#6E1F2E' },
  { x: 94, y: -82, r: 120, color: '#D9BD83' },
  { x: 118, y: -112, r: -35, color: '#A84251' },
  { x: -132, y: -48, r: 45, color: '#E5CBA0' },
  { x: -102, y: -55, r: -92, color: '#6E1F2E' },
  { x: 101, y: -42, r: 82, color: '#B5965A' },
  { x: 132, y: -55, r: -46, color: '#A84251' },
] as const

type DateRevealProps = { dateRevealed: boolean; onReveal: () => void }

function ConfettiBurst({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) return null
  return (
    <div className="scratch-confetti" aria-hidden="true">
      {confettiPieces.map((piece, index) => (
        <motion.i
          key={index}
          className="scratch-confetti__piece"
          style={{ left: '50%', top: '58%', backgroundColor: piece.color }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.6 }}
          animate={{ x: piece.x, y: piece.y, rotate: piece.r, opacity: [1, 1, 0], scale: 1 }}
          transition={{ duration: 1.35, ease: [0.15, 0.8, 0.25, 1], delay: index * 0.012 }}
        />
      ))}
    </div>
  )
}

export function DateReveal({ dateRevealed, onReveal }: DateRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activePointer = useRef<number | null>(null)
  const previousPoint = useRef<{ x: number; y: number } | null>(null)
  const reducedMotion = useReducedMotion()
  const [showConfetti, setShowConfetti] = useState(false)
  const [keyboardSweep, setKeyboardSweep] = useState(false)
  const revealedDate = new Date(`${weddingData.weddingDate}T12:00:00+05:30`)
  const day = new Intl.DateTimeFormat('en-IN', { day: '2-digit', timeZone: 'Asia/Kolkata' }).format(revealedDate)
  const monthYear = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(revealedDate)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const paintCover = () => {
      const bounds = canvas.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(bounds.width * ratio)
      canvas.height = Math.round(bounds.height * ratio)
      const context = canvas.getContext('2d')
      if (!context) return
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.fillStyle = '#6E1F2E'
      context.fillRect(0, 0, bounds.width, bounds.height)
      context.strokeStyle = 'rgba(213, 184, 125, .34)'
      context.lineWidth = 1
      for (let x = 17; x < bounds.width; x += 34) {
        for (let y = 17; y < bounds.height; y += 34) {
          context.beginPath()
          context.moveTo(x, y - 3)
          context.lineTo(x + 3, y)
          context.lineTo(x, y + 3)
          context.lineTo(x - 3, y)
          context.closePath()
          context.stroke()
        }
      }
      context.strokeStyle = 'rgba(229, 203, 160, .72)'
      context.strokeRect(9, 9, bounds.width - 18, bounds.height - 18)
      context.fillStyle = '#FFF9EF'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = '600 10px "DM Sans", sans-serif'
      context.fillText('RUB HERE TO UNCOVER', bounds.width / 2, bounds.height / 2 - 11)
      context.fillStyle = '#E5CBA0'
      context.font = '10px "DM Sans", sans-serif'
      context.fillText('Use your finger or cursor', bounds.width / 2, bounds.height / 2 + 10)
    }
    paintCover()
    const observer = new ResizeObserver(paintCover)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!showConfetti) return
    const timer = window.setTimeout(() => setShowConfetti(false), 1550)
    return () => window.clearTimeout(timer)
  }, [showConfetti])

  const reveal = useCallback(() => {
    if (dateRevealed) return
    setShowConfetti(true)
    onReveal()
  }, [dateRevealed, onReveal])

  const finishKeyboardSweep = useCallback(() => {
    if (dateRevealed) return
    setKeyboardSweep(false)
    reveal()
  }, [dateRevealed, reveal])

  useEffect(() => {
    if (!keyboardSweep) return
    const timer = window.setTimeout(finishKeyboardSweep, reducedMotion ? 20 : 1000)
    return () => window.clearTimeout(timer)
  }, [finishKeyboardSweep, keyboardSweep, reducedMotion])

  const scratchTo = (x: number, y: number) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const bounds = canvas.getBoundingClientRect()
    const point = { x: x - bounds.left, y: y - bounds.top }
    context.globalCompositeOperation = 'destination-out'
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = 46
    if (previousPoint.current) {
      context.beginPath()
      context.moveTo(previousPoint.current.x, previousPoint.current.y)
      context.lineTo(point.x, point.y)
      context.stroke()
    }
    context.beginPath()
    context.arc(point.x, point.y, 23, 0, Math.PI * 2)
    context.fill()
    previousPoint.current = point
  }

  const finishScratch = () => {
    activePointer.current = null
    previousPoint.current = null
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context || dateRevealed) return
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
    const step = 16
    let checked = 0
    let cleared = 0
    for (let pixel = 3; pixel < pixels.length; pixel += step * 4) {
      checked += 1
      if (pixels[pixel] < 32) cleared += 1
    }
    if (checked > 0 && cleared / checked >= 0.46) reveal()
  }

  const startScratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (dateRevealed) return
    event.preventDefault()
    activePointer.current = event.pointerId
    event.currentTarget.setPointerCapture(event.pointerId)
    scratchTo(event.clientX, event.clientY)
  }

  const moveScratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointer.current !== event.pointerId) return
    event.preventDefault()
    scratchTo(event.clientX, event.clientY)
  }

  return (
    <section className="date-reveal section-pad" aria-labelledby="date-reveal-title">
      <div className="section-shell">
        <Reveal>
          <SectionHeading eyebrow="Mark your calendar" title="A day to remember" titleId="date-reveal-title" description="Scratch the card to discover the day we celebrate." />
        </Reveal>
        <Reveal delay={0.12}>
          <div className={`date-card ${dateRevealed ? 'date-card--revealed' : ''}`}>
            <div className="date-card__top"><CalendarDays size={19} strokeWidth={1.4} aria-hidden="true" /> <span>{dateRevealed ? 'The day is' : 'A secret tucked inside'}</span></div>
            <div className="date-card__scratch" role="group" aria-label={dateRevealed ? `Wedding date: ${day} ${monthYear}` : 'Scratch away the maroon surface to reveal the wedding date.'}>
              <div className="date-card__body" aria-live="polite" aria-hidden={!dateRevealed}>
                <strong>{day}</strong><span>{monthYear.split(' ')[0]}<br />{monthYear.split(' ').at(-1)}</span>
              </div>
              <canvas
                ref={canvasRef}
                className={`date-card__cover ${keyboardSweep ? 'date-card__cover--keyboard-sweeping' : ''} ${dateRevealed ? 'date-card__cover--cleared' : ''}`}
                aria-hidden="true"
                onPointerDown={startScratch}
                onPointerMove={moveScratch}
                onPointerUp={finishScratch}
                onPointerCancel={finishScratch}
                onTransitionEnd={(event) => {
                  if (keyboardSweep && event.propertyName === 'clip-path') {
                    finishKeyboardSweep()
                  }
                }}
              />
              {showConfetti && <ConfettiBurst reducedMotion={Boolean(reducedMotion)} />}
            </div>
            <div className="date-card__bottom"><span>{dateRevealed ? 'Kanpur · Uttar Pradesh' : 'A little keepsake for you'}</span></div>
          </div>
          {!dateRevealed && <button className="scratch-alternative text-link" type="button" disabled={keyboardSweep} onClick={() => setKeyboardSweep(true)}>Scratch to reveal the date</button>}
        </Reveal>
      </div>
    </section>
  )
}
