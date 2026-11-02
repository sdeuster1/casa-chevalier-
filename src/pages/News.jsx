import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import { articles, formatDate, photoSources } from '../lib/news'

// The words of one story on the CC MAG page: category and date, title,
// place, the first lines and a link. The lead story's are larger.
function StoryText({ article, lead }) {
  const { t, lang } = useLanguage()
  const copy = t(`news.articles.${article.slug}`)
  return (
    <div className="px-6 md:px-0 flex flex-col items-start text-left">
      <p className="font-playfair uppercase text-mauve text-[11px] md:text-[12px] tracking-[0.2em] mb-4">
        {t(`news.categories.${article.category}`)}
        <span className="mx-2" aria-hidden="true">·</span>
        {formatDate(article, lang)}
      </p>
      <h2 className={`font-bodoni uppercase text-plum leading-tight tracking-[0.12em] m-0 ${
        lead ? 'text-[26px] md:text-4xl' : 'text-xl md:text-2xl'
      }`}>
        {copy.title}
      </h2>
      {copy.place && (
        <p className="font-playfair italic text-mauve text-base md:text-lg mt-1">
          {copy.place}
        </p>
      )}
      <p className={`font-playfair text-dark/75 leading-relaxed mt-4 ${
        lead ? 'text-[15px] md:text-lg max-w-md' : 'text-[15px] md:text-base max-w-sm'
      }`}>
        {copy.standfirst}
      </p>
      <span className="mt-6 font-bodoni uppercase text-plum text-[12px] tracking-[0.2em] border-b border-plum pb-0.5 group-hover:opacity-70 transition-opacity">
        {t('news.readMore')}
      </span>
    </div>
  )
}

function Cover({ article, sizes, eager }) {
  const { t } = useLanguage()
  const { src, srcSet } = photoSources(article, article.cover)
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      alt={t(`news.articles.${article.slug}.title`)}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
    />
  )
}

// CC MAG as a journal: the newest story large across the page, the others
// two by two underneath, each a large photo with its words below.
// Phones: one story after another, photos edge to edge.
export default function News() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  const [lead, ...rest] = articles

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 md:px-12">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col items-center text-center px-6 mb-10 md:mb-16">
            <h1 className="font-bodoni uppercase text-plum text-3xl md:text-5xl tracking-[0.3em] m-0">
              {t('news.title')}
            </h1>
            <p className="font-playfair italic text-mauve text-base md:text-lg mt-3">
              {t('news.subtitle')}
            </p>
          </header>

          {lead && (
            <Link
              to={`/mag/${lead.slug}`}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center no-underline"
            >
              <div className="md:col-span-7 aspect-[4/5] overflow-hidden bg-[#e5ded4]">
                <Cover article={lead} sizes="(min-width: 768px) 640px, 100vw" eager />
              </div>
              <div className="md:col-span-5">
                <StoryText article={lead} lead />
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mx-6 md:mx-0 mt-16 md:mt-24 border-t border-plum/15" />
          )}

          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-24">
            {rest.map((a) => (
              <Link key={a.slug} to={`/mag/${a.slug}`} className="group flex flex-col gap-6 md:gap-8 no-underline">
                <div className="aspect-[4/5] overflow-hidden bg-[#e5ded4]">
                  <Cover article={a} sizes="(min-width: 768px) 540px, 100vw" />
                </div>
                <StoryText article={a} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
