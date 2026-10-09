import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function NewsCarousel() {
  const [active, setActive] = useState(1)
  const { t } = useLanguage()
  const newsItems = t('home.newsItems')

  const prev = () => setActive((a) => (a - 1 + newsItems.length) % newsItems.length)
  const next = () => setActive((a) => (a + 1) % newsItems.length)

  return (
    <section className="w-full bg-plum py-16 md:py-24 overflow-hidden">
      <h2 className="font-bodoni text-cream text-xl md:text-2xl tracking-[0.1em] text-center mb-10 md:mb-16 uppercase px-4">
        {t('home.newsTitle')}
      </h2>

      <div className="flex items-start justify-center gap-2 md:gap-6 px-2 md:px-4">
        <button
          onClick={prev}
          className="bg-transparent border-none cursor-pointer p-2 flex-shrink-0 mt-28 md:mt-32"
          aria-label={t('common.previous')}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-cream" />
        </button>

        <div className="flex items-start justify-center gap-4 md:gap-6">
          {newsItems.map((item, i) => {
            const isCenter = i === active
            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-500 flex-shrink-0 cursor-pointer ${!isCenter ? 'hidden md:block' : ''}`}
                style={{
                  width: isCenter ? 'min(340px, 60vw)' : 240,
                  opacity: isCenter ? 1 : 0.6,
                  transform: isCenter ? 'scale(1)' : 'scale(0.95)',
                  zIndex: isCenter ? 10 : 1,
                }}
              >
                <div
                  className="bg-[#6b3550] relative flex items-center justify-center"
                  style={{ aspectRatio: '3/4' }}
                >
                  <span className="absolute top-4 left-4 font-playfair text-xs uppercase text-cream border border-cream px-4 py-2">
                    {t('home.newsCta')}
                  </span>
                </div>
                <div className="mt-4 text-center px-2">
                  <p className="font-playfair text-xs uppercase text-cream tracking-widest">
                    {item.category}
                  </p>
                  <p className={`font-bodoni text-sm md:text-base text-[#f0e9e0] mt-2 uppercase tracking-[0.05em] transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-50'}`}>
                    {item.title}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={next}
          className="bg-transparent border-none cursor-pointer p-2 flex-shrink-0 mt-28 md:mt-32"
          aria-label={t('common.next')}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-cream" />
        </button>
      </div>
    </section>
  )
}
