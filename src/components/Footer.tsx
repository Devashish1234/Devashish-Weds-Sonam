import { ArrowUp, Heart } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import type { CoupleOrder } from '../types'

export function Footer({ dateRevealed, names }: { dateRevealed: boolean; names: CoupleOrder }) {
  return (
    <footer className="footer">
      <div className="section-shell footer__inner">
        <a className="footer__top" href="#hero" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }}>
          <span>Back to the beginning</span><ArrowUp size={15} aria-hidden="true" />
        </a>
        <p className="footer__names">{names.first.shortName} <i>&amp;</i> {names.second.shortName}</p>
        <p className="footer__date">{dateRevealed && <>{weddingData.heroDate} <span>·</span> </>}{weddingData.venue.address}</p>
        <p className="footer__made">Made with <Heart size={12} fill="currentColor" aria-label="love" /> for our favorite people</p>
      </div>
    </footer>
  )
}
