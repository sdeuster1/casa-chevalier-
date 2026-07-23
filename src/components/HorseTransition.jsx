import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const DURATION = 900 // ms the overlay stays visible

export default function HorseTransition() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the animation on initial page load — only show on subsequent navigations.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setVisible(true)
    const timer = setTimeout(() => setVisible(false), DURATION)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-plum pointer-events-none"
      style={{ animation: `horse-fade ${DURATION}ms ease-in-out forwards` }}
    >
      <svg
        viewBox="0 0 200 140"
        width="140"
        height="98"
        xmlns="http://www.w3.org/2000/svg"
        className="horse-jump"
      >
        <g fill="#f0e9e0">
          {/* Simple equestrian silhouette: horse mid-jump with rider */}
          <path
            d="M28 108
               C 22 100 24 88 34 82
               L 46 74
               C 44 62 50 50 62 44
               L 78 36
               C 84 30 94 28 102 32
               L 112 38
               C 120 34 130 36 134 44
               L 140 56
               C 148 58 154 66 152 76
               L 148 92
               C 152 98 150 106 142 108
               L 132 110
               L 130 122
               L 122 122
               L 122 110
               L 96 110
               L 94 124
               L 86 124
               L 86 110
               L 60 110
               C 52 116 40 116 32 110
               Z"
          />
          {/* Rider */}
          <circle cx="100" cy="18" r="8" />
          <path d="M96 26 L104 26 L108 46 L92 46 Z" />
          {/* Front legs mid-stride (jump pose) */}
          <path d="M40 84 L26 100 L32 104 L48 90 Z" />
          <path d="M132 78 L146 62 L152 66 L138 82 Z" />
        </g>
      </svg>

      <style>{`
        @keyframes horse-fade {
          0% { opacity: 0; }
          15% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes horse-jump {
          0% { transform: translateY(10px) rotate(-2deg); }
          40% { transform: translateY(-14px) rotate(3deg); }
          70% { transform: translateY(-4px) rotate(-1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .horse-jump {
          animation: horse-jump ${DURATION}ms ease-in-out;
        }
      `}</style>
    </div>
  )
}
