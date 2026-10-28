import { useEffect, useRef, useState, type FormEvent } from 'react'
import { BookOpen, Heart, Send, X } from 'lucide-react'
import { type Wish } from '../types'
import { createWish, subscribeToWishes } from '../lib/wishService'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const PREVIEW_WISH_COUNT = 4

function WishList({ wishes, className }: { wishes: Wish[]; className: string }) {
  return (
    <ul className={className}>
      {wishes.map((wish) => (
        <li key={wish.id} className="wish-entry">
          <blockquote>“{wish.message}”</blockquote>
          <p>— {wish.name}</p>
        </li>
      ))}
    </ul>
  )
}

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => subscribeToWishes((nextWishes) => {
    setWishes(nextWishes)
    setIsLoading(false)
    setLoadError('')
  }, () => {
    setIsLoading(false)
    setLoadError('Wishes could not be loaded. Please refresh the page to try again.')
  }), [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isDialogOpen && !dialog.open) dialog.showModal()
    if (!isDialogOpen && dialog.open) dialog.close()
  }, [isDialogOpen])

  const addWish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanName = name.trim().slice(0, 60)
    const cleanMessage = message.trim().slice(0, 280)
    if (cleanName.length < 2 || cleanMessage.length < 3) {
      setFormError('Please add your name and a short wish.')
      setSuccessMessage('')
      return
    }

    setFormError('')
    setSuccessMessage('')
    setIsSubmitting(true)
    try {
      await createWish({ name: cleanName, message: cleanMessage })
      setName('')
      setMessage('')
      setSuccessMessage('Your wish has been shared with everyone.')
    } catch {
      setFormError('Your wish could not be shared. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeDialog = () => setIsDialogOpen(false)
  const previewWishes = wishes.slice(0, PREVIEW_WISH_COUNT)
  const hasMoreWishes = wishes.length > PREVIEW_WISH_COUNT

  return (
    <section className="wishes section-pad" id="wishes" aria-labelledby="wishes-title">
      <div className="section-shell wishes__grid">
        <Reveal>
          <SectionHeading eyebrow="A little love to carry with us" title="Leave a wish" titleId="wishes-title" description="Share a kind word with the couple and every guest." centered={false} />
          <form className="wish-form" onSubmit={addWish} noValidate>
            <div className="field-group">
              <label htmlFor="wish-name">Your name</label>
              <input id="wish-name" autoComplete="name" maxLength={60} value={name} onChange={(event) => setName(event.target.value)} required aria-invalid={Boolean(formError)} aria-describedby={formError ? 'wish-form-error' : undefined} />
            </div>
            <div className="field-group">
              <label htmlFor="wish-message">Your message</label>
              <textarea id="wish-message" maxLength={280} value={message} onChange={(event) => setMessage(event.target.value)} rows={3} required aria-invalid={Boolean(formError)} aria-describedby={formError ? 'wish-form-error' : undefined} />
            </div>
            {formError && <p className="field-error" id="wish-form-error" role="alert">{formError}</p>}
            {successMessage && <p className="wish-success" role="status">{successMessage}</p>}
            <button className="button button--primary" type="submit" disabled={isSubmitting}>
              <Send size={15} aria-hidden="true" />
              {isSubmitting ? 'Sharing your wish…' : 'Share your wish'}
            </button>
          </form>
        </Reveal>
        <Reveal delay={0.12} className="wishes-wall">
          <div className="wishes-wall__heading">
            <Heart size={18} aria-hidden="true" />
            <h3>Wishes for the couple</h3>
          </div>
          {isLoading ? <p className="wishes-empty" role="status">Gathering your wishes…</p> : null}
          {!isLoading && loadError ? <p className="field-error" role="alert">{loadError}</p> : null}
          {!isLoading && !loadError && wishes.length === 0 ? <p className="wishes-empty">The first wish is waiting to be written.</p> : null}
          {!isLoading && !loadError && wishes.length > 0 ? (
            <WishList wishes={previewWishes} className="wish-list wish-list--preview" />
          ) : null}
          {hasMoreWishes && !loadError ? (
            <button className="button button--secondary wishes-read-all" type="button" onClick={() => setIsDialogOpen(true)}>
              <BookOpen size={15} aria-hidden="true" />
              Read all wishes <span>({wishes.length})</span>
            </button>
          ) : null}
          <dialog
            className="wish-dialog"
            ref={dialogRef}
            aria-labelledby="wish-dialog-title"
            onClose={() => setIsDialogOpen(false)}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeDialog()
            }}
          >
            <div className="wish-dialog__header">
              <div>
                <p className="eyebrow">A little love to carry with us</p>
                <h2 id="wish-dialog-title">Wishes for the couple</h2>
                <p className="wish-dialog__count">{wishes.length} wishes · newest first</p>
              </div>
              <button className="wish-dialog__close" type="button" onClick={closeDialog} aria-label="Close wishes dialog">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="wish-dialog__body">
              {wishes.length > 0 ? <WishList wishes={wishes} className="wish-list wish-list--dialog" /> : <p className="wishes-empty">The first wish is waiting to be written.</p>}
            </div>
          </dialog>
        </Reveal>
      </div>
    </section>
  )
}
