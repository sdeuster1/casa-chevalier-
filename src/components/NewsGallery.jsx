import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { isLandscape, photoSources } from '../lib/news'

// Every photo of an article in one sideways row. Phones: swiped, with the
// next photo peeking in from the right and a counter underneath.
// Desktop: three photos in view and arrows either side. Landscape photos
// keep their shape and sit centred in the row.
export default function NewsGallery({ article, title }) {
  const { t } = useLanguage()
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const count = article.photos
  const photos = Array.from({ length: count }, (_, i) => i + 1)

  // Photos are all the same width, so the scroll position says which is first in view
  const handleScroll = () => {
    const track = trackRef.current
    const first = track?.children[0]
    if (!first) return
    const step = track.children[1] ? track.children[1].offsetLeft - first.offsetLeft : first.offsetWidth
    setActive(Math.min(count - 1, Math.round(track.scrollLeft / step)))
  }

  // scrollIntoView, not scrollTo: Chrome can cut a smooth scrollTo short
  // on a snapping track (see ProductGallery)
  const goTo = (index) => {
    const target = Math.max(0, Math.min(count - 1, index))
    trackRef.current?.children[target]?.scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'start',
    })
  }

  return (
    <section className="w-full bg-plum py-14 md:py-20">
      <h2 className="font-bodoni uppercase text-cream text-lg md:text-xl tracking-[0.2em] text-center mb-8 md:mb-12 px-6">
        {t('news.gallery')}
      </h2>

      <div className="relative">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex items-center gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 md:px-16 scroll-px-6 md:scroll-px-16"
        >
          {photos.map((n) => {
            const { src, srcSet } = photoSources(article, n)
            return (
              <div
                key={n}
                className={`shrink-0 w-[78vw] md:w-[calc((100%-2.5rem)/3)] max-w-[420px] snap-start bg-[#6b3550] ${
                  isLandscape(article, n) ? 'aspect-[3/2]' : 'aspect-[2/3]'
                }`}
              >
                <img
                  src={src}
                  srcSet={srcSet}
                  sizes="(min-width: 768px) 420px, 78vw"
                  loading="lazy"
                  alt={t('news.photoAlt', { title, n, total: count })}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          })}
        </div>

        <button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label={t('common.previous')}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-transparent border-none cursor-pointer disabled:opacity-0 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6 text-cream" />
        </button>
        <button
          onClick={() => goTo(active + 1)}
          disabled={active >= count - 3}
          aria-label={t('common.next')}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-transparent border-none cursor-pointer disabled:opacity-0 transition-opacity"
        >
          <ChevronRight className="w-6 h-6 text-cream" />
        </button>
      </div>

      <p className="md:hidden font-playfair text-cream/80 text-[13px] tracking-[0.2em] text-center mt-5" aria-hidden="true">
        {active + 1} / {count}
      </p>
    </section>
  )
}
