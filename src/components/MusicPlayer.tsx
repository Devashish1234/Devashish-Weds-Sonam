import { useRef, useState } from 'react'
import { Music2, Pause, Play } from 'lucide-react'
import { weddingData } from '../data/weddingData'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  if (!weddingData.assets.musicUrl) return null

  const toggle = async () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }

  return (
    <div className="music-player">
      <audio ref={audioRef} src={weddingData.assets.musicUrl} loop onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
      <button type="button" className="music-toggle" onClick={toggle} aria-label={playing ? 'Pause wedding music' : 'Play wedding music'} aria-pressed={playing}>
        <Music2 size={17} aria-hidden="true" />{playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
      </button>
    </div>
  )
}
