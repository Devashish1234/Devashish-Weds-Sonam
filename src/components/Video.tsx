import { Play } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { Reveal } from './Reveal'

export function Video() {
  if (!weddingData.assets.videoUrl) return null
  return (
    <section className="video-section section-pad" aria-label="Wedding film">
      <Reveal className="section-shell">
        <video className="wedding-video" controls preload="none" poster={weddingData.assets.mandap}>
          <source src={weddingData.assets.videoUrl} />
          Your browser does not support video playback.
        </video>
        <p className="video-caption"><Play size={13} aria-hidden="true" /> A glimpse of our celebration</p>
      </Reveal>
    </section>
  )
}

