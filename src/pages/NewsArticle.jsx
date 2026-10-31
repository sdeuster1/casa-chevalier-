import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import NewsGallery from '../components/NewsGallery'
import NotFound from './NotFound'
import { useLanguage } from '../i18n/LanguageContext'
import { findArticle, photoSources } from '../lib/news'

// One chapter of the story: a large photo filling half the page with its
// paragraphs beside it, the photo alternating left and right. Phones: the
// photo edge to edge, the paragraphs underneath.
function Chapter({ article, chapter, index, copy }) {
  const { t } = useLanguage()
  const { src, srcSet } = photoSources(article, chapter.photo)
  const photoRight = index % 2 === 1
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:items-center">
      <div className={`aspect-[4/5] md:aspect-square bg-[#e5ded4] ${photoRight ? 'md:order-2' : ''}`}>
        <img
          src={src}
          srcSet={srcSet}
          sizes="(min-width: 768px) 50vw, 100vw"
          loading={index === 0 ? 'eager' : 'lazy'}
          alt={t('news.photoAlt', { title: copy.title, n: chapter.photo, total: article.photos })}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-[560px] md:justify-self-center px-6 md:px-12 py-12 md:py-16 flex flex-col gap-6">
        {chapter.paragraphs.map((i) => (
          <p key={i} className="font-playfair text-dark/80 text-[16px] md:text-[17px] leading-[1.8] m-0">
            {copy.paragraphs[i]}
          </p>
        ))}
      </div>
    </section>
  )
}

export default function NewsArticle() {
  const { slug } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  const article = findArticle(slug)

  if (!article) return <NotFound />

  const copy = t(`news.articles.${slug}`)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <article>
        {/* Title, centred above the story */}
        <header className="pt-28 md:pt-40 pb-12 md:pb-20 px-6 flex flex-col items-center text-center">
          <p className="font-playfair uppercase text-mauve text-[11px] md:text-[12px] tracking-[0.2em] mb-5">
            {copy.kicker}
          </p>
          <h1 className="font-bodoni uppercase text-plum text-[26px] md:text-4xl leading-tight tracking-[0.12em]">
            {copy.title}
          </h1>
          <p className="font-playfair italic text-mauve text-lg md:text-xl mt-2">
            {copy.place}
          </p>
          <div className="w-10 h-px bg-plum/30 my-6" />
          <p className="font-playfair text-dark/80 text-[17px] md:text-lg leading-relaxed max-w-xl">
            {copy.standfirst}
          </p>
        </header>

        {/* The story: photo and text side by side, chapter by chapter */}
        {article.chapters.map((chapter, i) => (
          <Chapter key={chapter.photo} article={article} chapter={chapter} index={i} copy={copy} />
        ))}

        <div className="border-t border-plum/15 px-6 py-16 md:py-24 flex flex-col items-center text-center">
          {copy.closing.map((line) => (
            <p key={line} className="font-bodoni uppercase text-plum text-[12px] md:text-sm tracking-[0.12em] md:tracking-[0.2em] leading-loose">
              {line}
            </p>
          ))}
          <p className="font-playfair italic text-plum text-xl md:text-2xl mt-8">
            {copy.signoff}
          </p>
        </div>
      </article>

      <NewsGallery article={article} title={copy.title} />

      <div className="flex justify-center py-12 md:py-16">
        <Link
          to="/news"
          className="font-bodoni uppercase text-plum text-[12px] tracking-[0.2em] border-b border-plum pb-0.5 no-underline hover:opacity-70 transition-opacity"
        >
          {t('news.allNews')}
        </Link>
      </div>

      <Footer />
    </div>
  )
}
