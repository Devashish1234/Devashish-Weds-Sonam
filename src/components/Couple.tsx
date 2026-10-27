import { weddingData } from '../data/weddingData'
import { Carousel } from './Carousel'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import type { CoupleOrder } from '../types'

export function Couple({ names }: { names: CoupleOrder }) {
  const coupleNames = `${names.first.shortName} & ${names.second.shortName}`
  return (
    <section className="couple section-pad" aria-labelledby="couple-title">
      <div className="section-shell couple__grid">
        <Reveal className="couple__story">
          <SectionHeading eyebrow="Two hearts, one home" title="Our story" titleId="couple-title" centered={false} />
          <p>Rooted in family, held by blessings, and filled with all the promise of a new beginning. We would be so glad to have you beside us as our story unfolds.</p>
          <div className="couple__signoff"><span>{names.first.shortName}</span><i>&amp;</i><span>{names.second.shortName}</span></div>
          <a className="text-link" href="#wishes">Leave us a wish <span aria-hidden="true">→</span></a>
        </Reveal>
        <Reveal delay={0.14} className="couple__photo">
          <Carousel images={weddingData.assets.couplePhotos} coupleNames={coupleNames} />
        </Reveal>
      </div>
    </section>
  )
}
