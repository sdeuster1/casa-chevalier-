import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const newsItems = [
  { category: 'EQUESTRIAN', title: 'The Art of Riding in Style' },
  { category: 'EDITORIAL', title: 'Spring Summer 2026 Campaign' },
  { category: 'EVENTS', title: 'Casa Chevalier at Milano Fashion Week' },
]

export default function NewsCarousel() {
  const [active, setActive] = useState(1)

  const prev = () => setActive((a) => (a - 1 + newsItems.length) % newsItems.length)
  const next = () => setActive((a) => (a + 1) % newsItems.length)

  return (
    <section className="w-full bg-[#1a1a1a] py-16 md:py-24 overflow-hidden">
      <h2 className="font-bodoni text-white text-xl md:text-2xl tracking-[0.1em] text-center mb-10 md:mb-16 uppercase px-4">
        News from Casa Chevalier
      </h2>

      <div className="flex items-center justify-center gap-2 md:gap-8 px-2 md:px-4">
        <button
          onClick={prev}
          className="bg-transparent border-none cursor-pointer p-2 flex-shrink-0"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        <div className="flex items-center justify-center overflow-hidden">
          {newsItems.map((item, i) => {
            const isCenter = i === active
            const isVisible = Math.abs(i - active) <= 1 || (active === 0 && i === newsItems.length - 1) || (active === newsItems.length - 1 && i === 0)
            return (
              <div
                key={i}
                className={`transition-all duration-500 flex-shrink-0 ${!isCenter ? 'hidden md:block' : ''}`}
                style={{
                  width: isCenter ? 'min(400px, 75vw)' : 280,
                  opacity: isCenter ? 1 : 0.5,
                  transform: isCenter ? 'scale(1.05)' : 'scale(0.95)',
                  zIndex: isCenter ? 10 : 1,
                  marginLeft: !isCenter ? '16px' : 0,
                  marginRight: !isCenter ? '16px' : 0,
                }}
              >
                <div
                  className="bg-[#2a2a2a] relative flex items-center justify-center cursor-pointer"
                  style={{ aspectRatio: '3/4' }}
                >
                  <span className="absolute top-4 left-4 font-playfair text-xs uppercase text-white border border-white px-4 py-2">
                    SCOPRIRE
                  </span>
                </div>
                {isCenter && (
                  <div className="mt-4 text-center px-2">
                    <p className="font-playfair text-xs uppercase text-lilac tracking-widest">
                      {item.category}
                    </p>
                    <p className="font-bodoni text-base md:text-lg text-white mt-2 uppercase tracking-[0.05em]">
                      {item.title}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={next}
          className="bg-transparent border-none cursor-pointer p-2 flex-shrink-0"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>
    </section>
  )
}
