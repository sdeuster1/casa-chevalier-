import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import { CATEGORIES, articles, formatDate, photoSources } from '../lib/news'

// CC MAG as a journal: a row of categories to filter by (only those with
// articles), then every story as an equal card — photo, category and date,
// title — three across on desktop, two on tablets, one on phones.
export default function News() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [category, setCategory] = useState(null)
  const { t, lang } = useLanguage()

  const categories = CATEGORIES.filter((c) => articles.some((a) => a.category === c))
  const shown = category ? articles.filter((a) => a.category === category) : articles

  const filterClass = (on) =>
    `bg-transparent border-none p-0 pb-1 cursor-pointer font-playfair uppercase text-[11px] md:text-[12px] tracking-[0.2em] transition-colors ${
      on ? 'text-plum border-b border-plum' : 'text-mauve hover:text-plum'
    }`

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col items-center text-center mb-8 md:mb-12">
            <h1 className="font-bodoni uppercase text-plum text-2xl md:text-4xl tracking-[0.3em] m-0">
              {t('news.title')}
            </h1>
            <p className="font-playfair italic text-mauve text-[15px] md:text-base mt-3">
              {t('news.subtitle')}
            </p>
          </header>

          {categories.length > 1 && (
            <nav className="flex flex-wrap justify-center gap-x-6 md:gap-x-8 gap-y-3 pb-8 md:pb-10 mb-10 md:mb-14 border-b border-plum/15">
              <button onClick={() => setCategory(null)} className={filterClass(!category)}>
                {t('news.all')}
              </button>
              {categories.map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={filterClass(category === c)}>
                  {t(`news.categories.${c}`)}
                </button>
              ))}
            </nav>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
            {shown.map((a, i) => {
              const copy = t(`news.articles.${a.slug}`)
              const cover = photoSources(a, a.cover)
              return (
                <Link key={a.slug} to={`/mag/${a.slug}`} className="group flex flex-col no-underline">
                  <div className="aspect-[4/5] overflow-hidden bg-[#e5ded4]">
                    <img
                      src={cover.src}
                      srcSet={cover.srcSet}
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      loading={i < 3 ? 'eager' : 'lazy'}
                      alt={copy.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="font-playfair uppercase text-mauve text-[10px] md:text-[11px] tracking-[0.2em] mt-5 mb-2">
                    {t(`news.categories.${a.category}`)}
                    <span className="mx-2" aria-hidden="true">·</span>
                    {formatDate(a, lang)}
                  </p>
                  <h2 className="font-bodoni uppercase text-plum text-[15px] md:text-base leading-snug tracking-[0.14em] m-0 group-hover:opacity-70 transition-opacity">
                    {copy.title}
                  </h2>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
