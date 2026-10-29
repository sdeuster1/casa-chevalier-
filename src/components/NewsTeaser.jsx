import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { articles, photoSources } from '../lib/news'
import { track } from '../lib/analytics'

// Homepage: the latest CC News article on a plum band. Phones: photo, then
// the words underneath. Desktop: photo left, words right.
export default function NewsTeaser() {
  const { t } = useLanguage()
  const article = articles[0]
  if (!article) return null

  const copy = t(`news.articles.${article.slug}`)
  const cover = photoSources(article, article.cover)

  return (
    <section className="w-full bg-plum py-14 md:py-20 px-6 md:px-12">
      <h2 className="font-bodoni uppercase text-cream text-xl md:text-2xl tracking-[0.2em] text-center mb-8 md:mb-12">
        {t('news.title')}
      </h2>
      <Link
        to={`/news/${article.slug}`}
        onClick={() => track('news_teaser_clicked', { article: article.slug })}
        className="group max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center no-underline"
      >
        <div className="aspect-[4/5] overflow-hidden bg-[#6b3550] md:max-w-[440px] md:w-full md:justify-self-end">
          <img
            src={cover.src}
            srcSet={cover.srcSet}
            sizes="(min-width: 768px) 440px, calc(100vw - 3rem)"
            loading="lazy"
            alt={copy.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="font-playfair uppercase text-lilac text-[11px] md:text-[12px] tracking-[0.2em] mb-4">
            {copy.kicker}
          </p>
          <h3 className="font-bodoni uppercase text-cream text-xl md:text-3xl leading-tight tracking-[0.12em]">
            {copy.title}
          </h3>
          <p className="font-playfair italic text-lilac text-base md:text-lg mt-1">
            {copy.place}
          </p>
          <p className="font-playfair text-cream/85 text-[15px] md:text-base leading-relaxed mt-4 max-w-sm">
            {copy.standfirst}
          </p>
          <span className="mt-6 font-bodoni uppercase text-cream text-[12px] tracking-[0.2em] border-b border-cream pb-0.5 group-hover:opacity-70 transition-opacity">
            {t('news.readMore')}
          </span>
        </div>
      </Link>
    </section>
  )
}
