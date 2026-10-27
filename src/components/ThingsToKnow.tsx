import { useState } from 'react'
import { CalendarPlus, MapPin, Phone } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import type { CoupleOrder } from '../types'

const toIcsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const escapeIcs = (value: string) => value.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\r?\n/g, '\\n')

function makeCalendarFile(names: CoupleOrder) {
  const entries = weddingData.events.map((event) => {
    const start = new Date(`${event.date}T${event.startTime.includes('PM') ? (Number(event.startTime.split(':')[0]) % 12) + 12 : Number(event.startTime.split(':')[0])}:${event.startTime.split(':')[1].slice(0, 2)}:00+05:30`)
    const end = new Date(`${event.date}T${event.endTime.includes('PM') ? (Number(event.endTime.split(':')[0]) % 12) + 12 : Number(event.endTime.split(':')[0])}:${event.endTime.split(':')[1].slice(0, 2)}:00+05:30`)
    return [
      'BEGIN:VEVENT',
      `UID:${event.id}-devashish-sonam-2026@wedding-invitation`,
      `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
      `DTSTART:${toIcsDate(start.toISOString())}`,
      `DTEND:${toIcsDate(end.toISOString())}`,
      `SUMMARY:${escapeIcs(`${event.title} · ${names.first.shortName} & ${names.second.shortName}`)}`,
      `DESCRIPTION:${escapeIcs(event.note ?? 'Wedding celebration')}`,
      `LOCATION:${escapeIcs(`${weddingData.venue.name}, ${weddingData.venue.address}`)}`,
      'END:VEVENT',
    ].join('\r\n')
  })
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Devashish and Sonam//Wedding Invitation//EN', 'CALSCALE:GREGORIAN', ...entries, 'END:VCALENDAR'].join('\r\n')
}

export function ThingsToKnow({ dateRevealed, names }: { dateRevealed: boolean; names: CoupleOrder }) {
  const [saved, setSaved] = useState(false)
  const saveReminder = () => {
    const file = new Blob([makeCalendarFile(names)], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'devashish-sonam-wedding.ics'
    link.click()
    URL.revokeObjectURL(url)
    setSaved(true)
  }

  return (
    <section className="things section-pad" aria-labelledby="things-title">
      <div className="section-shell">
        <Reveal><SectionHeading eyebrow="For your journey" title="Things to know" titleId="things-title" description="A few details to make the day easy." /></Reveal>
        <div className="things-grid">
          <Reveal><article className="thing-card"><MapPin size={20} /><h3>Meet us there</h3><p>{weddingData.venue.name}<br />{weddingData.venue.address}</p><a className="text-link" href={weddingData.venue.mapUrl} target="_blank" rel="noreferrer">Open Google Maps <span aria-hidden="true">↗</span></a></article></Reveal>
          <Reveal delay={0.1}><article className="thing-card"><Phone size={20} /><h3>Need a hand?</h3><p>For any questions, reach out to either family.</p><a className="text-link" href={`tel:${weddingData.contacts.groomSide.replace(/\s/g, '')}`}>Groom’s family · {weddingData.contacts.groomSide}</a><a className="text-link" href={`tel:${weddingData.contacts.brideSide.replace(/\s/g, '')}`}>Bride’s family · {weddingData.contacts.brideSide}</a></article></Reveal>
          <Reveal delay={0.2}><article className="thing-card"><CalendarPlus size={20} /><h3>Save the dates</h3><p>{dateRevealed ? 'Add all three celebrations to your calendar in one step.' : 'Reveal the date to unlock your calendar reminder.'}</p><button className="text-link button-link calendar-link" type="button" disabled={!dateRevealed} onClick={saveReminder}>{saved ? 'Calendar file saved' : dateRevealed ? 'Download calendar reminder' : 'Available after the reveal'} {dateRevealed && <span aria-hidden="true">↓</span>}</button></article></Reveal>
        </div>
      </div>
    </section>
  )
}
