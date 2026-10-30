import { Clock3, Flower2, MapPin } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const dateLabel = (date: string) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' }).format(new Date(`${date}T12:00:00+05:30`))

export function Functions({ dateRevealed }: { dateRevealed: boolean }) {
  return (
    <section className="functions section-pad" aria-labelledby="functions-title">
      <div className="section-shell">
        <Reveal><SectionHeading eyebrow="Gather with us" title="The Celebrations" titleId="functions-title" description="Three gatherings, one beautiful beginning." light /></Reveal>
        <ol className="event-grid" aria-label="Wedding celebration timeline">
          {weddingData.events.map((event, index) => (
            <li className="event-timeline__item" key={event.id}>
              <span className="event-timeline__node" aria-hidden="true"><Flower2 size={20} strokeWidth={1.3} /></span>
              <Reveal delay={index * 0.1} className="event-timeline__content">
              <article className="event-card">
                <p className="event-card__index">{String(index + 1).padStart(2, '0')}{dateRevealed && <> <span>·</span> {dateLabel(event.date)}</>}</p>
                <h3>{event.title}</h3>
                <p className="event-card__note">{event.note}</p>
                <div className="event-card__detail"><Clock3 size={16} aria-hidden="true" /><span>{event.startTime} – {event.endTime}</span></div>
                <div className="event-card__detail"><MapPin size={16} aria-hidden="true" /><span>{weddingData.venue.name}</span></div>
                <a className="text-link text-link--light" href={weddingData.venue.mapUrl} target="_blank" rel="noreferrer">Find your way <span aria-hidden="true">↗</span></a>
              </article>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="functions-address">{weddingData.venue.address}</p>
      </div>
    </section>
  )
}

