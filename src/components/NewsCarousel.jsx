import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { articles, formatDate, photoSources } from '../lib/news'
import { track } from '../lib/analytics'

// Homepage: CC MAG articles on a plum band, three side by side — the current
// one large in the middle, its neighbours smaller and faded either side.
// The arrows (or a swipe on phones) move through them, round and round;
// clicking a side article brings it to the middle, clicking the middle one
// opens it. Phones: only the middle article, with the arrows.
export default function NewsCarousel() {
  const { t, lang } = useLanguage()
  const count = articles.length
  // With three or more, start on the second so the newest sits on the left
  const [active, setActive] = useState(count >= 3 ? 1 : 0)
  const touchX = useRef(null)
  if (count === 0) return null

  const prev = () => setActive((a) => (a - 1 + count) % count)
  const next = () => setActive((a) => (a + 1) % count)
  // The articles in view: the active one with a neighbour either side
  const slots = count >= 3 ? [-1, 0, 1].map((o) => (active + o + count) % count) : articles.map((_, i) => i)

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - (touchX.current ?? 0)
    if (Math.abs(dx) > 40) (dx > 0 ? prev : next)()
    touchX.current = null
  }

  return (
    <section className="w-full bg-plum py-16 md:py-24 overflow-hidden">
      <h2 className="font-bodoni text-cream text-xl md:text-2xl tracking-[0.2em] text-center mb-10 md:mb-16 uppercase px-4">
        {t('news.title')}
      </h2>

      <div
        className="flex items-start justify-center gap-2 md:gap-6 px-2 md:px-4"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={onTouchEnd}
      >
        {count > 1 && (
          <button
            onClick={prev}
            className="bg-transparent border-none cursor-pointer p-2 flex-shrink-0 mt-40 md:mt-48"
            aria-label={t('common.previous')}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-cream" />
          </button>
        )}

        <div className="flex items-start justify-center gap-4 md:gap-6">
          {slots.map((index) => {
            const article = articles[index]
            const isCenter = index === active
            const copy = t(`news.articles.${article.slug}`)
            const cover = photoSources(article, article.cover)
            const card = (
              <>
                <div className="relative aspect-[3/4] overflow-hidden bg-[#6b3550]">
                  <img
                    src={cover.src}
                    srcSet={cover.srcSet}
                    sizes="340px"
                    loading="lazy"
                    alt={copy.title}
                    className="w-full h-full object-cover"
                  />
                  {isCenter && (
                    <span className="absolute top-4 left-4 font-playfair text-[13px] uppercase text-cream border border-cream px-4 py-2">
                      {t('home.newsCta')}
                    </span>
                  )}
                </div>
                <div className="mt-4 text-center px-2">
                  <p className="font-playfair text-[11px] md:text-[12px] uppercase text-lilac tracking-[0.2em] m-0">
                    {t(`news.categories.${article.category}`)}
                    {/* The date only on the middle article: the side ones are too narrow */}
                    {isCenter && (
                      <>
                        <span className="mx-2" aria-hidden="true">·</span>
                        {formatDate(article, lang)}
                      </>
                    )}
                  </p>
                  <p className={`font-bodoni text-sm md:text-base text-[#f0e9e0] mt-2 mb-0 uppercase tracking-[0.1em] transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-50'}`}>
                    {copy.title}
                  </p>
                </div>
              </>
            )
            return (
              <div
                key={article.slug}
                className={`transition-all duration-500 flex-shrink-0 ${!isCenter ? 'hidden md:block' : ''}`}
                style={{
                  width: isCenter ? 'min(340px, 68vw)' : 240,
                  opacity: isCenter ? 1 : 0.6,
                  transform: isCenter ? 'scale(1)' : 'scale(0.95)',
                }}
              >
                {isCenter ? (
                  <Link
                    to={`/mag/${article.slug}`}
                    onClick={() => track('news_teaser_clicked', { article: article.slug })}
                    className="block no-underline"
                  >
                    {card}
                  </Link>
                ) : (
                  <button
                    onClick={() => setActive(index)}
                    aria-label={copy.title}
                    className="block w-full bg-transparent border-none p-0 cursor-pointer"
                  >
                    {card}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {count > 1 && (
          <button
            onClick={next}
            className="bg-transparent border-none cursor-pointer p-2 flex-shrink-0 mt-40 md:mt-48"
            aria-label={t('common.next')}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-cream" />
          </button>
        )}
      </div>

      <div className="flex justify-center mt-10 md:mt-14">
        <Link
          to="/mag"
          className="font-bodoni uppercase text-cream text-[12px] tracking-[0.2em] border-b border-cream pb-0.5 no-underline hover:opacity-70 transition-opacity"
        >
          {t('news.allNews')}
        </Link>
      </div>
    </section>
  )
}
