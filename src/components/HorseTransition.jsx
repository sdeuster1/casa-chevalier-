import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const DURATION = 1000 // ms the overlay stays visible

export default function HorseTransition() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
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
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none bg-plum/95 backdrop-blur-sm"
      style={{ animation: `horse-fade ${DURATION}ms ease-in-out forwards` }}
    >
      <svg
        viewBox="0 0 200 200"
        width="160"
        height="160"
        xmlns="http://www.w3.org/2000/svg"
        className="horse-jump"
      >
        {/* Mid-jump horse silhouette, forelegs tucked, mane flowing back */}
        <path
          fill="#f99943"
          d="M 152 42
             C 156 38, 162 38, 165 42
             C 168 46, 168 52, 165 56
             L 160 62
             C 164 66, 168 72, 170 80
             C 172 86, 170 92, 166 96
             L 158 100
             C 156 104, 152 108, 148 110
             L 138 116
             C 132 122, 126 128, 120 134
             L 108 148
             C 104 154, 100 162, 96 170
             C 92 176, 88 180, 82 182
             L 76 184
             L 74 190
             L 68 192
             L 70 186
             C 66 184, 62 180, 62 174
             C 62 168, 64 162, 66 156
             L 60 158
             C 54 160, 48 158, 44 152
             C 42 146, 44 140, 50 136
             L 60 130
             C 66 124, 72 118, 78 112
             L 88 100
             C 84 96, 82 90, 84 84
             C 86 78, 92 72, 100 68
             L 112 62
             C 120 56, 128 50, 138 46
             L 148 42
             Z
             M 142 50
             C 145 48, 148 48, 150 50
             L 148 54
             C 146 56, 143 56, 141 54
             Z"
        />
        {/* Mane strands */}
        <path
          fill="#f99943"
          d="M 158 50
             L 172 44
             L 168 54
             L 175 52
             L 170 62
             L 176 62
             L 168 70
             Z"
        />
        {/* Tail */}
        <path
          fill="#f99943"
          d="M 66 156
             C 60 162, 54 170, 52 178
             C 50 184, 52 188, 56 188
             C 60 188, 64 182, 66 176
             C 68 170, 68 164, 66 156 Z"
        />
      </svg>

      <style>{`
        @keyframes horse-fade {
          0% { opacity: 0; }
          15% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes horse-jump {
          0%   { transform: translateY(20px) scale(0.9) rotate(-4deg); }
          40%  { transform: translateY(-18px) scale(1.05) rotate(4deg); }
          70%  { transform: translateY(-4px) scale(1) rotate(-1deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); }
        }
        .horse-jump {
          animation: horse-jump ${DURATION}ms ease-in-out;
          filter: drop-shadow(0 8px 20px rgba(0,0,0,0.25));
        }
      `}</style>
    </div>
  )
}
