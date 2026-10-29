import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import { articles, photoSources } from '../lib/news'

// Every article as a wide row: cover photo and title. Phones: photo on
// top, words underneath. Desktop: photo left, words right.
export default function News() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4 px-6">
            {t('news.title')}
          </h1>
          <p className="font-playfair text-mauve text-center text-[15px] mb-10 md:mb-16 px-6">
            {t('news.subtitle')}
          </p>

          <div className="flex flex-col gap-16 md:gap-24">
            {articles.map((a) => {
              const copy = t(`news.articles.${a.slug}`)
              const cover = photoSources(a, a.cover)
              return (
                <Link
                  key={a.slug}
                  to={`/news/${a.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center no-underline"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#e5ded4] md:max-w-[480px] md:w-full md:justify-self-end">
                    <img
                      src={cover.src}
                      srcSet={cover.srcSet}
                      sizes="(min-width: 768px) 480px, 100vw"
                      alt={copy.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="px-6 md:px-0 flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="font-playfair uppercase text-mauve text-[11px] md:text-[12px] tracking-[0.2em] mb-4">
                      {copy.kicker}
                    </p>
                    <h2 className="font-bodoni uppercase text-plum text-xl md:text-3xl leading-tight tracking-[0.12em]">
                      {copy.title}
                    </h2>
                    <p className="font-playfair italic text-mauve text-base md:text-lg mt-1">
                      {copy.place}
                    </p>
                    <p className="font-playfair text-dark/75 text-[15px] md:text-base leading-relaxed mt-4 max-w-md">
                      {copy.standfirst}
                    </p>
                    <span className="mt-6 font-bodoni uppercase text-plum text-[12px] tracking-[0.2em] border-b border-plum pb-0.5 group-hover:opacity-70 transition-opacity">
                      {t('news.readMore')}
                    </span>
                  </div>
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
