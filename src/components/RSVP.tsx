import { useEffect, useRef, useState } from 'react'
import { Check, Heart } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

type Attendance = 'yes' | 'no'
type FormErrors = Partial<Record<'name' | 'guests' | 'attendance', string>>

export function RSVP() {
  const [attendance, setAttendance] = useState<Attendance | ''>('')
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('1')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const guestsRef = useRef<HTMLInputElement>(null)
  const attendanceRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (errors.attendance) attendanceRef.current?.focus()
    else if (errors.name) nameRef.current?.focus()
    else if (errors.guests) guestsRef.current?.focus()
  }, [errors])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: FormErrors = {}
    if (!attendance) nextErrors.attendance = 'Please choose an RSVP option.'
    if (name.trim().length < 2) nextErrors.name = 'Please enter your name (at least 2 characters).'
    if (attendance === 'yes' && (!Number.isInteger(Number(guests)) || Number(guests) < 1 || Number(guests) > 8)) {
      nextErrors.guests = 'Enter a guest count from 1 to 8.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  return (
    <section className="rsvp section-pad" id="rsvp" aria-labelledby="rsvp-title">
      <div className="section-shell rsvp__shell">
        <Reveal><SectionHeading eyebrow="We hope you can join us" title="Kindly reply" titleId="rsvp-title" description="Please let us know if you can celebrate with us." /></Reveal>
        <Reveal delay={0.12} className="rsvp-card">
          {submitted ? (
            <div className="rsvp-success" role="status">
              <span className="rsvp-success__icon"><Check size={22} /></span>
              <p className="eyebrow">Thank you, {name.trim()}</p>
              <h3>{attendance === 'yes' ? 'We can’t wait to celebrate with you.' : 'You’ll be with us in spirit.'}</h3>
              <p>Your response is shown here only and hasn’t been sent to the family. Please contact them directly if they need your RSVP.</p>
              <button className="text-link button-link" type="button" onClick={() => setSubmitted(false)}>Edit response</button>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <fieldset className="attendance-options" aria-describedby={errors.attendance ? 'rsvp-attendance-error' : undefined}>
                <legend>Will you be joining us?</legend>
                <div>
                  <label className={attendance === 'yes' ? 'attendance-option attendance-option--selected' : 'attendance-option'}>
                    <input ref={attendanceRef} type="radio" name="attendance" value="yes" checked={attendance === 'yes'} onChange={() => { setAttendance('yes'); setErrors((current) => ({ ...current, attendance: undefined })) }} />
                    <span>Joyfully accepts</span>
                  </label>
                  <label className={attendance === 'no' ? 'attendance-option attendance-option--selected' : 'attendance-option'}>
                    <input type="radio" name="attendance" value="no" checked={attendance === 'no'} onChange={() => { setAttendance('no'); setErrors((current) => ({ ...current, attendance: undefined })) }} />
                    <span>Regretfully declines</span>
                  </label>
                </div>
                {errors.attendance && <p id="rsvp-attendance-error" className="field-error" role="alert">{errors.attendance}</p>}
              </fieldset>

              {attendance && <div className="rsvp-fields">
                <div className="field-group">
                  <label htmlFor="rsvp-name">Your name</label>
                  <input ref={nameRef} id="rsvp-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'rsvp-name-error' : undefined} />
                  {errors.name && <p id="rsvp-name-error" className="field-error">{errors.name}</p>}
                </div>
                {attendance === 'yes' && <div className="field-group">
                  <label htmlFor="rsvp-guests">Number in your party</label>
                  <input ref={guestsRef} id="rsvp-guests" type="number" inputMode="numeric" min="1" max="8" value={guests} onChange={(event) => setGuests(event.target.value)} aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? 'rsvp-guests-error' : undefined} />
                  {errors.guests && <p id="rsvp-guests-error" className="field-error">{errors.guests}</p>}
                </div>}
                <button className="button button--primary rsvp-submit" type="submit"><Heart size={16} aria-hidden="true" /> Send my reply</button>
                <p className="local-note">This invitation does not send or store your RSVP online.</p>
              </div>}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
