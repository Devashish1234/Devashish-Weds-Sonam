import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { type Wish } from '../types'
import { createWish, subscribeToWishes } from '../lib/wishService'
import { Wishes } from './Wishes'

vi.mock('./Reveal', () => ({
  Reveal: ({ children, className }: any) => <div className={className}>{children}</div>,
}))
vi.mock('../lib/wishService', () => ({
  createWish: vi.fn(),
  subscribeToWishes: vi.fn(),
}))

const sampleWishes: Wish[] = Array.from({ length: 5 }, (_, index) => ({
  id: `wish-${index + 1}`,
  name: `Guest ${index + 1}`,
  message: `A heartfelt wish ${index + 1}`,
  createdAt: Date.now() - index,
}))
let visibleWishes = sampleWishes

if (typeof HTMLDialogElement !== 'undefined' && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
}

afterEach(() => cleanup())
beforeEach(() => {
  visibleWishes = sampleWishes
  vi.mocked(createWish).mockResolvedValue({ id: 'wish-new' } as never)
  vi.mocked(subscribeToWishes).mockImplementation((onWishes) => {
    onWishes(visibleWishes)
    return () => {}
  })
})

describe('Wishes', () => {
  it('previews the four newest wishes and offers the full list', async () => {
    render(<Wishes />)

    await screen.findByRole('button', { name: /read all wishes/i })
    const preview = screen.getByRole('list')
    expect(within(preview).getAllByRole('listitem')).toHaveLength(4)
    expect(within(preview).getByText(/A heartfelt wish 1/)).toBeTruthy()
    expect(within(preview).queryByText(/A heartfelt wish 5/)).toBeNull()
  })

  it('does not show the full-list button for four or fewer wishes', async () => {
    visibleWishes = sampleWishes.slice(0, 4)
    render(<Wishes />)

    expect(await screen.findAllByRole('listitem')).toHaveLength(4)
    expect(screen.queryByRole('button', { name: /read all wishes/i })).toBeNull()
  })

  it('opens every wish in a dialog and closes it with the close button', async () => {
    render(<Wishes />)

    fireEvent.click(await screen.findByRole('button', { name: /read all wishes/i }))
    const dialog = screen.getByRole('dialog', { name: /wishes for the couple/i })
    expect(dialog).toBeTruthy()
    expect(within(dialog).getAllByRole('listitem')).toHaveLength(5)
    expect(within(dialog).getByText(/A heartfelt wish 5/)).toBeTruthy()

    fireEvent.click(within(dialog).getByRole('button', { name: /close/i }))
    expect(dialog.hasAttribute('open')).toBe(false)
  })

  it('saves a valid wish to the shared service and confirms success', async () => {
    render(<Wishes />)
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'New Guest' } })
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'Wishing you a lifetime of joy' } })
    fireEvent.click(screen.getByRole('button', { name: /share your wish/i }))

    await waitFor(() => expect(createWish).toHaveBeenCalledWith({ name: 'New Guest', message: 'Wishing you a lifetime of joy' }))
    expect(await screen.findByText('Your wish has been shared with everyone.')).toBeTruthy()
  })
})
