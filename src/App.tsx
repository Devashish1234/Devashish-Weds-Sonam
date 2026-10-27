import { useEffect, useMemo, useState } from 'react'
import { Countdown } from './components/Countdown'
import { Couple } from './components/Couple'
import { DateReveal } from './components/DateReveal'
import { Footer } from './components/Footer'
import { FamilySidePrompt } from './components/FamilySidePrompt'
import { Functions } from './components/Functions'
import { Hero } from './components/Hero'
import { Instagram } from './components/Instagram'
import { Invitation } from './components/Invitation'
import { MusicPlayer } from './components/MusicPlayer'
import { RSVP } from './components/RSVP'
import { ThingsToKnow } from './components/ThingsToKnow'
import { Video } from './components/Video'
import { Wishes } from './components/Wishes'
import { getCoupleOrder } from './data/weddingData'
import type { FamilySide } from './types'

export default function App() {
  const [familySide, setFamilySide] = useState<FamilySide | null>(null)
  const [dateRevealed, setDateRevealed] = useState(false)
  const names = useMemo(() => getCoupleOrder(familySide ?? 'groom'), [familySide])

  useEffect(() => {
    if (familySide) document.title = `${names.first.shortName} weds ${names.second.shortName} · A celebration of love`
  }, [familySide, names])

  if (familySide === null) return <FamilySidePrompt onSelect={setFamilySide} />

  return (
    <>
      <a className="skip-link" href="#invitation-content">Skip to invitation</a>
      <Hero dateRevealed={dateRevealed} names={names} />
      <main id="invitation-content">
        <Invitation dateRevealed={dateRevealed} names={names} />
        <DateReveal dateRevealed={dateRevealed} onReveal={() => setDateRevealed(true)} />
        <Functions dateRevealed={dateRevealed} />
        <Couple names={names} />
        <Instagram />
        <Video />
        <Countdown dateRevealed={dateRevealed} />
        <ThingsToKnow dateRevealed={dateRevealed} names={names} />
        <RSVP />
        <Wishes />
      </main>
      <MusicPlayer />
      <Footer dateRevealed={dateRevealed} names={names} />
    </>
  )
}
