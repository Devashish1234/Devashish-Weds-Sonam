import { Flower2 } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { Reveal } from './Reveal'
import type { CoupleOrder } from '../types'

function GaneshMotif() {
  return (
    <svg className="ganesh-motif" viewBox="0 0 100 100" fill="none" role="img" aria-label="Decorative Ganesh-inspired line motif">
      <circle cx="50" cy="50" r="45" />
      <path d="M33 39c-8-3-14 1-15 10 5 8 12 10 20 5M67 39c8-3 14 1 15 10-5 8-12 10-20 5M38 42c0-9 5-15 12-15s12 6 12 15v13c0 7-5 12-12 12s-12-5-12-12V42Zm12-14V16m-10 7c4-4 7-6 10-7 3 1 6 3 10 7M50 66c-1 9 1 15 7 18 7 3 13-1 13-7 0-5-4-7-8-7-5 0-7 3-6 7M44 48h.1M56 48h.1" />
      <path d="M28 79c7 6 14 9 22 9s15-3 22-9M42 58c3 3 5 4 8 4s5-1 8-4" />
    </svg>
  )
}

export function Invitation({ dateRevealed, names }: { dateRevealed: boolean; names: CoupleOrder }) {
  return (
    <section className="invitation section-pad" aria-labelledby="invitation-title">
      <Reveal className="invitation__inner">
        <div className="invitation__flourish" aria-hidden="true"><Flower2 size={19} /><span /></div>
        <GaneshMotif />
        <p className="eyebrow">With the blessings of our families</p>
        <div className="family-names">
          <p>{names.first.parents[0]} <span>&amp;</span> {names.first.parents[1]}</p>
          <span className="family-divider" aria-hidden="true">✦</span>
          <p>{names.second.parents[0]} <span>&amp;</span> {names.second.parents[1]}</p>
        </div>
        <p className="invitation-word">Invite</p>
        <h2 id="invitation-title" className="invitation-names">
          {names.first.name}<span className="ampersand">&amp;</span>{names.second.name}
        </h2>
        <p className="invitation-copy">to join them as they celebrate the beginning of a beautiful life together</p>
        <div className="ornament-rule" aria-hidden="true"><span /><i>✦</i><span /></div>
        {dateRevealed && <p className="invitation-date">{weddingData.heroDate}</p>}
      </Reveal>
    </section>
  )
}
