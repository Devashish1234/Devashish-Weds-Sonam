import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ImagePlus } from 'lucide-react'

type CarouselPhoto = { src: string; alt: string }
type CarouselProps = { images: CarouselPhoto[]; coupleNames: string }

type Slot = 'left' | 'center' | 'right' | 'hidden'

const slotStyles: Record<Slot, { left: string; top: string; width: string; height: string; scale: number; opacity: number; zIndex: number }> = {
  left: { left: '0%', top: '17%', width: '27%', height: '66%', scale: 0.92, opacity: 0.78, zIndex: 1 },
  center: { left: '20%', top: '2%', width: '60%', height: '96%', scale: 1.02, opacity: 1, zIndex: 2 },
  right: { left: '73%', top: '17%', width: '27%', height: '66%', scale: 0.92, opacity: 0.78, zIndex: 1 },
  hidden: { left: '50%', top: '50%', width: '0%', height: '0%', scale: 0.8, opacity: 0, zIndex: 0 },
}

export function Carousel({ images, coupleNames }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  if (images.length === 0) {
    return (
      <div className="photo-placeholder" aria-label={`Photo placeholder for ${coupleNames}`}>
        <div className="photo-placeholder__frame">
          <ImagePlus size={27} strokeWidth={1.2} aria-hidden="true" />
          <p>A favorite photo of<br />{coupleNames} will live here</p>
          <span>Photo placeholder</span>
        </div>
      </div>
    )
  }

  const move = (direction: number) => setIndex((current) => (current + direction + images.length) % images.length)
  const getSlot = (imageIndex: number): Slot => {
    if (images.length === 1) return 'center'
    const relativePosition = (imageIndex - index + images.length) % images.length
    if (relativePosition === 0) return 'center'
    if (relativePosition === 1) return 'right'
    if (relativePosition === images.length - 1) return 'left'
    return 'hidden'
  }

  return (
    <div className="photo-carousel" role="region" aria-roledescription="carousel" aria-label={`Photos of ${coupleNames}`}>
      {images.map((photo, imageIndex) => {
        const slot = getSlot(imageIndex)
        const active = slot === 'center'
        const style = slotStyles[slot]
        return (
          <motion.button
            key={photo.src}
            className="photo-carousel__slide"
            type="button"
            aria-label={`Show photo ${imageIndex + 1} of ${images.length}: ${photo.alt}`}
            aria-pressed={active}
            tabIndex={slot === 'hidden' ? -1 : 0}
            data-position={slot}
            onClick={() => setIndex(imageIndex)}
            initial={false}
            animate={style}
            transition={reducedMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 170, damping: 25, mass: 0.85 }}
          >
            <img
              src={photo.src}
              alt={`${coupleNames}: ${photo.alt}`}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.button>
        )
      })}
      {images.length > 1 && (
        <div className="photo-carousel__controls">
          <button type="button" aria-label="Previous photo" onClick={() => move(-1)}><ChevronLeft size={20} aria-hidden="true" /></button>
          <span aria-live="polite" aria-atomic="true">{index + 1} / {images.length}</span>
          <button type="button" aria-label="Next photo" onClick={() => move(1)}><ChevronRight size={20} aria-hidden="true" /></button>
        </div>
      )}
    </div>
  )
}
