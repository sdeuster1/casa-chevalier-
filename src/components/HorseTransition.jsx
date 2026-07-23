import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import horse from '../assets/brand/horse.png'

const DURATION = 1000 // ms the overlay stays visible

// Palette rotation — excludes plum (#4f1d34) since the horse itself is that color
const BACKGROUNDS = ['#f0e9e0', '#f05652', '#c49fae']

export default function HorseTransition() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [bgIndex, setBgIndex] = useState(0)
  const isFirstRender = useRef(true)
  const counter = useRef(0)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    // Rotate to the next background color on each navigation
    counter.current = (counter.current + 1) % BACKGROUNDS.length
    setBgIndex(counter.current)
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), DURATION)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none backdrop-blur-sm"
      style={{
        backgroundColor: BACKGROUNDS[bgIndex],
        animation: `horse-fade ${DURATION}ms ease-in-out forwards`,
      }}
    >
      <img
        src={horse}
        alt=""
        className="horse-jump w-64 md:w-96 h-auto object-contain"
      />

      <style>{`
        @keyframes horse-fade {
          0% { opacity: 0; }
          15% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes horse-jump {
          0%   { transform: translateY(30px) scale(0.85) rotate(-6deg); }
          40%  { transform: translateY(-22px) scale(1.05) rotate(5deg); }
          70%  { transform: translateY(-6px) scale(1) rotate(-1deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); }
        }
        .horse-jump {
          animation: horse-jump ${DURATION}ms ease-in-out;
          filter: drop-shadow(0 12px 24px rgba(0,0,0,0.15));
        }
      `}</style>
    </div>
  )
}

