import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'

// Layout only; titles, dates and excerpts live in i18n/translations.js
const articles = [
  {
    id: 'atelier-milano',
    ratio: 'aspect-[4/5]',
    tone: '#c8beb0',
  },
  {
    id: 'spring-collection',
    ratio: 'aspect-[3/4]',
    tone: '#d4cec6',
  },
  {
    id: 'concorso',
    ratio: 'aspect-[4/5]',
    tone: '#cec5b8',
  },
  {
    id: 'craft-of-leather',
    ratio: 'aspect-[3/4]',
    tone: '#d8d1c4',
  },
  {
    id: 'from-saddle-to-table',
    ratio: 'aspect-[4/5]',
    tone: '#cbc2b3',
  },
  {
    id: 'heritage-of-the-house',
    ratio: 'aspect-[3/4]',
    tone: '#e2dcd2',
  },
]

export default function News() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            {t('news.title')}
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-16 md:mb-20">
            {t('news.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-10 md:gap-y-20">
            {articles.map((a) => {
              const copy = t(`news.articles.${a.id}`)
              return (
              <article key={a.id} className="flex flex-col group cursor-pointer">
                <div
                  className={`w-full ${a.ratio} overflow-hidden`}
                  style={{ backgroundColor: a.tone }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-playfair italic text-plum/40 text-xs tracking-widest">
                      [Editorial Image]
                    </span>
                  </div>
                </div>
                <div className="pt-5 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-playfair italic text-lilac text-[10px] tracking-[0.2em] uppercase">
                      {copy.category}
                    </span>
                    <span className="w-4 h-px bg-lilac/60"></span>
                    <span className="font-playfair italic text-lilac text-[10px]">
                      {copy.date}
                    </span>
                  </div>
                  <h3 className="font-bodoni text-dark text-lg md:text-xl leading-snug">
                    {copy.title}
                  </h3>
                  <p className="font-playfair text-dark/70 text-sm leading-relaxed">
                    {copy.excerpt}
                  </p>
                  <span className="mt-2 font-bodoni uppercase text-plum text-[10px] tracking-[0.2em] border-b border-plum self-start pb-0.5 group-hover:opacity-70 transition-opacity">
                    {t('news.readMore')}
                  </span>
                </div>
              </article>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
