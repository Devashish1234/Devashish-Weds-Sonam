import { useEffect, useRef } from 'react'
import { Flower2 } from 'lucide-react'
import type { FamilySide } from '../types'

export function FamilySidePrompt({ onSelect }: { onSelect: (side: FamilySide) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  const chooseSide = (side: FamilySide) => {
    onSelect(side)
    dialogRef.current?.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="family-dialog"
      aria-labelledby="family-dialog-title"
      onCancel={(event) => event.preventDefault()}
    >
      <div className="family-dialog__inner">
        <span className="family-dialog__ornament" aria-hidden="true"><Flower2 size={24} strokeWidth={1.2} /></span>
        <h2 id="family-dialog-title">Which side are you joining us from?</h2>
        <div className="family-dialog__choices">
          <button type="button" onClick={() => chooseSide('groom')}>
            <span className="family-dialog__side">Groom’s side</span>
            <span className="family-dialog__name">Devashish</span>
            <span className="family-dialog__choose">Continue <span aria-hidden="true">↗</span></span>
          </button>
          <button type="button" onClick={() => chooseSide('bride')}>
            <span className="family-dialog__side">Bride’s side</span>
            <span className="family-dialog__name">Sonam</span>
            <span className="family-dialog__choose">Continue <span aria-hidden="true">↗</span></span>
          </button>
        </div>
      </div>
    </dialog>
  )
}
