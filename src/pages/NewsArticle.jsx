import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import NewsGallery from '../components/NewsGallery'
import NotFound from './NotFound'
import { useLanguage } from '../i18n/LanguageContext'
import { findArticle, isLandscape, photoSources } from '../lib/news'

// One photo, or two side by side. Phones: edge to edge, two photos split
// the width. Desktop: a single portrait photo stays narrower than a pair
// so it doesn't fill the whole screen; a landscape one is as wide as a pair.
function PhotoRow({ article, numbers, title }) {
  const { t } = useLanguage()
  const pair = numbers.length > 1
  const wide = pair || isLandscape(article, numbers[0])
  return (
    <div className={`w-full mx-auto grid gap-1 md:gap-5 md:px-6 ${pair ? 'grid-cols-2' : ''} ${wide ? 'md:max-w-4xl' : 'md:max-w-xl'}`}>
      {numbers.map((n) => {
        const { src, srcSet } = photoSources(article, n)
        return (
          <div key={n} className={`${isLandscape(article, n) ? 'aspect-[3/2]' : 'aspect-[2/3]'} bg-[#e5ded4]`}>
            <img
              src={src}
              srcSet={srcSet}
              sizes={pair ? '(min-width: 768px) 430px, 50vw' : wide ? '(min-width: 768px) 848px, 100vw' : '(min-width: 768px) 576px, 100vw'}
              loading="lazy"
              alt={t('news.photoAlt', { title, n, total: article.photos })}
              className="w-full h-full object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}

export default function NewsArticle() {
  const { slug } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  const article = findArticle(slug)

  if (!article) return <NotFound />

  const copy = t(`news.articles.${slug}`)
  const cover = photoSources(article, article.cover)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <article>
        {/* Title and cover photo. Phones: title first, then the photo
            edge to edge. Desktop: photo left, title right. */}
        <header className="pt-24 md:pt-36 pb-12 md:pb-20 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="px-6 md:px-0 md:order-2 flex flex-col items-center md:items-start text-center md:text-left">
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
              <p className="font-playfair text-dark/80 text-[17px] md:text-lg leading-relaxed max-w-md">
                {copy.standfirst}
              </p>
            </div>

            <div className="md:order-1 aspect-[2/3] bg-[#e5ded4] md:max-w-[480px] md:w-full md:justify-self-end">
              <img
                src={cover.src}
                srcSet={cover.srcSet}
                sizes="(min-width: 768px) 480px, 100vw"
                fetchPriority="high"
                alt={t('news.photoAlt', { title: copy.title, n: article.cover, total: article.photos })}
                className="w-full h-full object-cover cc-fade-in"
              />
            </div>
          </div>
        </header>

        {/* The story, with photos between the paragraphs */}
        <div className="flex flex-col gap-10 md:gap-14 pb-16 md:pb-24">
          {copy.paragraphs.map((paragraph, i) => (
            <div key={i} className="flex flex-col gap-10 md:gap-14">
              <p className="w-full max-w-[640px] mx-auto px-6 font-playfair text-dark/80 text-[16px] md:text-[17px] leading-[1.8]">
                {paragraph}
              </p>
              {article.photosAfter[i]?.map((numbers) => (
                <PhotoRow
                  key={numbers.join('-')}
                  article={article}
                  numbers={numbers}
                  title={copy.title}
                />
              ))}
            </div>
          ))}

          <div className="max-w-[640px] mx-auto px-6 flex flex-col items-center text-center pt-4">
            <div className="w-10 h-px bg-plum/30 mb-8" />
            {copy.closing.map((line) => (
              <p key={line} className="font-bodoni uppercase text-plum text-[12px] md:text-sm tracking-[0.12em] md:tracking-[0.2em] leading-loose">
                {line}
              </p>
            ))}
            <p className="font-playfair italic text-plum text-xl md:text-2xl mt-8">
              {copy.signoff}
            </p>
          </div>
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
