import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import NewsGallery from '../components/NewsGallery'
import NotFound from './NotFound'
import { useLanguage } from '../i18n/LanguageContext'
import { findArticle, formatDate, hasGallery, isLandscape, isLetter, photoSources } from '../lib/news'

// A chapter's heading (if it has one) and paragraphs
function ChapterText({ chapter, copy }) {
  return (
    <>
      {chapter.heading !== undefined && (
        <h2 className="font-bodoni uppercase text-plum text-[15px] md:text-base leading-relaxed tracking-[0.2em] m-0">
          {copy.headings[chapter.heading]}
        </h2>
      )}
      {chapter.paragraphs.map((i) => (
        <p key={i} className="font-playfair text-dark/80 text-[16px] md:text-[17px] leading-[1.8] m-0">
          {copy.paragraphs[i]}
        </p>
      ))}
    </>
  )
}

// One chapter of the story: a large photo filling half the page with its
// paragraphs beside it, the photo alternating left and right. When the
// words run longer than the photo, the photo stays in view beside them.
// Phones: the photo edge to edge, the paragraphs underneath. A chapter
// without a photo is a single centred column of text.
function Chapter({ article, chapter, side, eager, copy }) {
  const { t } = useLanguage()

  if (!chapter.photo) {
    return (
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-[640px] mx-auto flex flex-col gap-6">
          <ChapterText chapter={chapter} copy={copy} />
        </div>
      </section>
    )
  }

  const { src, srcSet } = photoSources(article, chapter.photo)
  const photoRight = side % 2 === 1
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className={`${isLandscape(article, chapter.photo) ? 'aspect-[3/2]' : 'aspect-[2/3]'} md:w-full md:sticky md:top-20 md:self-start bg-[#e5ded4] ${photoRight ? 'md:order-2' : ''}`}>
        <img
          src={src}
          srcSet={srcSet}
          sizes="(min-width: 768px) 50vw, 100vw"
          loading={eager ? 'eager' : 'lazy'}
          alt={t('news.photoAlt', { title: copy.title, n: chapter.photo, total: article.photos })}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-[560px] md:self-center md:justify-self-center px-6 md:px-12 py-12 md:py-16 flex flex-col gap-6">
        <ChapterText chapter={chapter} copy={copy} />
      </div>
    </section>
  )
}

export default function NewsArticle() {
  const { slug } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang } = useLanguage()
  const article = findArticle(slug)

  if (!article) return <NotFound />

  const copy = t(`news.articles.${slug}`)
  const letter = isLetter(article)
  // Photos alternate left and right, counting only the chapters that have one
  let photoCount = 0

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <article>
        {/* Category and date, title, then the place or "A Founder's Letter",
            centred above the story */}
        <header className="pt-28 md:pt-40 pb-12 md:pb-20 px-6 flex flex-col items-center text-center">
          <p className="font-playfair uppercase text-mauve text-[11px] md:text-[12px] tracking-[0.2em] mb-5">
            {!letter && (
              <>
                {t(`news.categories.${article.category}`)}
                <span className="mx-2" aria-hidden="true">·</span>
              </>
            )}
            {formatDate(article, lang)}
          </p>
          <h1 className="font-bodoni uppercase text-plum text-[26px] md:text-4xl leading-tight tracking-[0.12em]">
            {copy.title}
          </h1>
          {(letter || copy.place) && (
            <p className="font-playfair italic text-mauve text-lg md:text-xl mt-2">
              {letter ? t('news.letter') : copy.place}
            </p>
          )}
          {copy.credit && (
            <p className="font-playfair text-mauve text-[13px] md:text-sm mt-3">
              {copy.credit}
            </p>
          )}
          <div className="w-10 h-px bg-plum/30 my-6" />
          <p className="font-playfair text-dark/80 text-[17px] md:text-lg leading-relaxed max-w-xl">
            {copy.standfirst}
          </p>
        </header>

        {/* The story: photo and text side by side, chapter by chapter */}
        {article.chapters.map((chapter, i) => {
          const side = chapter.photo ? photoCount++ : photoCount
          return (
            <Chapter key={i} article={article} chapter={chapter} side={side} eager={i === 0} copy={copy} />
          )
        })}

        {(copy.closing || copy.signoff) && (
          <div className="border-t border-plum/15 px-6 py-16 md:py-24 flex flex-col items-center text-center">
            {copy.closing?.map((line) => (
              <p key={line} className="font-bodoni uppercase text-plum text-[12px] md:text-sm tracking-[0.12em] md:tracking-[0.2em] leading-loose">
                {line}
              </p>
            ))}
            {copy.signoff && (
              <p className={`font-playfair italic text-plum text-xl md:text-2xl ${copy.closing ? 'mt-8' : ''}`}>
                {copy.signoff}
              </p>
            )}
          </div>
        )}
      </article>

      {hasGallery(article) && <NewsGallery article={article} title={copy.title} />}

      <div className="flex justify-center py-12 md:py-16">
        <Link
          to="/mag"
          className="font-bodoni uppercase text-plum text-[12px] tracking-[0.2em] border-b border-plum pb-0.5 no-underline hover:opacity-70 transition-opacity"
        >
          {t('news.allNews')}
        </Link>
      </div>

      <Footer />
    </div>
  )
}
