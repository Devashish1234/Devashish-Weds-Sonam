import { useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'
import { Reveal } from './Reveal'

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }
const weddingMoment = new Date(`${weddingData.weddingDate}T18:00:00+05:30`).getTime()

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, weddingMoment - Date.now())
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1_000),
  }
}

export function Countdown({ dateRevealed }: { dateRevealed: boolean }) {
  const [remaining, setRemaining] = useState(getTimeLeft)
  useEffect(() => {
    if (!dateRevealed) return
    const timer = window.setInterval(() => setRemaining(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [dateRevealed])

  return (
    <section className="countdown section-pad" aria-labelledby="countdown-title">
      <Reveal className="section-shell countdown__inner">
        <p className="eyebrow">Until we say “I do”</p>
        <h2 id="countdown-title">The countdown {dateRevealed ? 'is on' : 'awaits'}</h2>
        {dateRevealed ? <>
          <div className="countdown-grid" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds until the wedding`}>
            {Object.entries(remaining).map(([unit, value]) => (
              <div className="countdown-unit" key={unit}><strong>{String(value).padStart(2, '0')}</strong><span>{unit}</span></div>
            ))}
          </div>
          <p className="countdown__date">{weddingData.heroDate} <span>·</span> Kanpur</p>
        </> : <p className="countdown__locked">Scratch the invitation above to uncover the celebration day.</p>}
      </Reveal>
    </section>
  )
}
