import { Flower2 } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import type { CoupleOrder, WeddingPerson } from '../types'

function FamilyPanel({ person }: { person: WeddingPerson }) {
  return (
    <article className="family-blessings__family">
      <p className="family-blessings__label">{person.shortName}&apos;s family</p>
      <h3>{person.parents[0]}</h3>
      <span className="family-blessings__ampersand">&amp;</span>
      <h3>{person.parents[1]}</h3>
    </article>
  )
}

function MandalaArtwork() {
  return (
    <svg className="family-blessings__art" viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <circle cx="80" cy="80" r="74" />
      <circle cx="80" cy="80" r="63" />
      <circle cx="80" cy="80" r="23" />
      {Array.from({ length: 12 }, (_, index) => (
        <ellipse key={index} cx="80" cy="46" rx="12" ry="25" transform={`rotate(${index * 30} 80 80)`} />
      ))}
      <circle cx="80" cy="80" r="8" />
      <path d="M80 2v8M80 150v8M2 80h8M150 80h8" />
    </svg>
  )
}

export function FamilyBlessings({ names }: { names: CoupleOrder }) {
  return (
    <section className="family-blessings section-pad" aria-labelledby="family-blessings-title">
      <div className="section-shell family-blessings__inner">
        <Reveal>
          <SectionHeading
            eyebrow="The love that brought us here"
            title="Blessings from our families"
            titleId="family-blessings-title"
          />
        </Reveal>
        <Reveal delay={0.1} className="family-blessings__frame">
          <MandalaArtwork />
          <div className="family-blessings__families">
            <FamilyPanel person={names.first} />
            <div className="family-blessings__motif" aria-hidden="true">
              <span />
              <Flower2 size={30} strokeWidth={1.1} />
              <span />
            </div>
            <FamilyPanel person={names.second} />
          </div>
          <p className="family-blessings__message">Two families, one joyful gathering. Your presence and blessings will make our celebration complete.</p>
          <a className="text-link" href="#wishes">Leave us a wish <span aria-hidden="true">→</span></a>
        </Reveal>
      </div>
    </section>
  )
}

