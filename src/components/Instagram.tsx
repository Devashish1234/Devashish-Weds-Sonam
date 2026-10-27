import { Instagram as InstagramIcon } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { Reveal } from './Reveal'

export function Instagram() {
  return (
    <section className="hashtag-section section-pad" aria-labelledby="hashtag-title">
      <Reveal className="section-shell hashtag-section__inner">
        <InstagramIcon size={22} strokeWidth={1.3} aria-hidden="true" />
        <p className="eyebrow">Keep the memories close</p>
        <h2 id="hashtag-title">Share the celebration</h2>
        <p>When you share a favorite moment, use our wedding hashtag so we can find it.</p>
        <span className="hashtag">{weddingData.hashtag}</span>
      </Reveal>
    </section>
  )
}
