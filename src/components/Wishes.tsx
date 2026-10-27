import { useEffect, useState } from 'react'
import { Heart, Send } from 'lucide-react'
import { type Wish } from '../types'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const STORAGE_KEY = 'devashish-sonam-wedding-wishes-v1'

function readWishes(): Wish[] {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(stored)) return []
    return stored.filter((item): item is Wish =>
      typeof item === 'object' && item !== null &&
      typeof item.id === 'string' && typeof item.name === 'string' &&
      typeof item.message === 'string' && typeof item.createdAt === 'number',
    ).slice(0, 50)
  } catch {
    return []
  }
}

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [storageError, setStorageError] = useState(false)

  useEffect(() => setWishes(readWishes()), [])

  const save = (nextWishes: Wish[]) => {
    setWishes(nextWishes)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextWishes))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }

  const addWish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanName = name.trim().slice(0, 60)
    const cleanMessage = message.trim().slice(0, 280)
    if (cleanName.length < 2 || cleanMessage.length < 3) {
      setError('Please add your name and a short wish.');
      return
    }
    setError('')
    save([{ id: crypto.randomUUID(), name: cleanName, message: cleanMessage, createdAt: Date.now() }, ...wishes].slice(0, 50))
    setName('')
    setMessage('')
  }

  const removeWish = (id: string) => save(wishes.filter((wish) => wish.id !== id))

  return (
    <section className="wishes section-pad" id="wishes" aria-labelledby="wishes-title">
      <div className="section-shell wishes__grid">
        <Reveal>
          <SectionHeading eyebrow="A little love to carry with us" title="Leave a wish" titleId="wishes-title" description="Your kind words will live on this device for the next visitor to read." centered={false} />
          <form className="wish-form" onSubmit={addWish}>
            <div className="field-group"><label htmlFor="wish-name">Your name</label><input id="wish-name" autoComplete="name" maxLength={60} value={name} onChange={(event) => setName(event.target.value)} required /></div>
            <div className="field-group"><label htmlFor="wish-message">Your message</label><textarea id="wish-message" maxLength={280} value={message} onChange={(event) => setMessage(event.target.value)} rows={3} required /></div>
            {error && <p className="field-error" role="alert">{error}</p>}
            {storageError && <p className="field-error" role="status">This browser could not save the wish. It will disappear when you leave this page.</p>}
            <button className="button button--primary" type="submit"><Send size={15} aria-hidden="true" /> Share your wish</button>
          </form>
        </Reveal>
        <Reveal delay={0.12} className="wishes-wall">
          <div className="wishes-wall__heading"><Heart size={18} aria-hidden="true" /><h3>Wishes for the couple</h3></div>
          {wishes.length === 0 ? <p className="wishes-empty">The first wish is waiting to be written.</p> : (
            <ul className="wish-list">
              {wishes.map((wish) => <li key={wish.id} className="wish-entry"><blockquote>“{wish.message}”</blockquote><p>— {wish.name}</p><button type="button" className="wish-remove" onClick={() => removeWish(wish.id)} aria-label={`Remove wish from ${wish.name}`}>Remove</button></li>)}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  )
}
