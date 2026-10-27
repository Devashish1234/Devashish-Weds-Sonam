import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'
import { weddingData } from '../data/weddingData'
import type { CoupleOrder } from '../types'

function Clouds() {
  return (
    <div className="hero-clouds" aria-hidden="true">
      <span className="cloud cloud--one" />
      <span className="cloud cloud--two" />
      <span className="cloud cloud--three" />
      <span className="cloud cloud--four" />
      <span className="hero-sunwash" />
    </div>
  )
}

export function Hero({ dateRevealed, names }: { dateRevealed: boolean; names: CoupleOrder }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.42, 1], [0.76, 1.12, 1.5])
  const leftX = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], ['0%', '0%', '-32%', '-62%'])
  const rightX = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], ['0%', '0%', '32%', '62%'])
  const glow = useTransform(scrollYProgress, [0, 0.22, 0.45, 0.9, 1], [0, 0, 0.95, 0.85, 0])
  const fade = useTransform(scrollYProgress, [0.86, 1], [1, 0])

  return (
    <section id="hero" ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <Clouds />
      <div className="hero-copy">
        <p className="hero-eyebrow">A celebration of love</p>
        <h1 id="hero-title">
          <span>{names.first.shortName}</span>
          <i aria-hidden="true">weds</i>
          <span>{names.second.shortName}</span>
        </h1>
        {dateRevealed && <p className="hero-date">{weddingData.heroDate}</p>}
      </div>

      <motion.div className="hero-portal" style={reduceMotion ? undefined : { opacity: fade }} aria-hidden="true">
        {reduceMotion ? (
          <img className="hero-mandap hero-mandap--static" src={weddingData.assets.mandap} alt="" fetchPriority="high" />
        ) : (
          <>
            <motion.div className="hero-door hero-door--left" style={{ x: leftX, scale }}>
              <img className="hero-mandap" src={weddingData.assets.mandap} alt="" fetchPriority="high" />
            </motion.div>
            <motion.div className="hero-door hero-door--right" style={{ x: rightX, scale }}>
              <img className="hero-mandap" src={weddingData.assets.mandap} alt="" fetchPriority="high" />
            </motion.div>
            <motion.span className="portal-glow" style={{ opacity: glow }} />
          </>
        )}
      </motion.div>
      <a className="scroll-cue" href="#invitation-content">
        <span>Scroll to explore</span>
        <ChevronDown size={17} strokeWidth={1.4} aria-hidden="true" />
      </a>
    </section>
  )
}
