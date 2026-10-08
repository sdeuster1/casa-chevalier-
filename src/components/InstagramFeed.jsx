import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import { useLanguage } from '../i18n/LanguageContext'
import { sizedImage } from '../lib/shopify'
import { INSTAGRAM_FEED_URL, INSTAGRAM_PROFILE_URL } from '../lib/instagramConfig'

const MAX_POSTS = 8

// Accepts Behold-style JSON ({ posts: [...] } or a bare array) and keeps
// only what the strip needs. Videos use their cover image.
function normalisePosts(json) {
  const list = Array.isArray(json) ? json : json?.posts || json?.data || []
  return list
    .map((p) => ({
      id: p.id,
      url: p.permalink,
      image:
        p.sizes?.medium?.mediaUrl ||
        (p.mediaType === 'VIDEO' || p.media_type === 'VIDEO'
          ? p.thumbnailUrl || p.thumbnail_url
          : p.mediaUrl || p.media_url),
      caption: (p.caption || '').slice(0, 120),
    }))
    .filter((p) => p.image && p.url)
    .slice(0, MAX_POSTS)
}

function InstagramGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Horizontal strip of square posts with a brand tile, after Gil Cagne's
// homepage. Live posts come from INSTAGRAM_FEED_URL. Without a feed the
// strip is hidden in production; in local dev it previews the layout with
// campaign photos from Shopify.
export default function InstagramFeed() {
  const { t } = useLanguage()
  const { products } = useProducts()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!INSTAGRAM_FEED_URL) return
    let cancelled = false
    fetch(INSTAGRAM_FEED_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((json) => { if (!cancelled) setPosts(normalisePosts(json)) })
      .catch((err) => console.error('Instagram feed failed:', err))
    return () => { cancelled = true }
  }, [])

  const preview = !INSTAGRAM_FEED_URL && import.meta.env.DEV
  const tiles = preview
    ? products
        .filter((p) => p.images.length > 1)
        .slice(0, 6)
        .map((p) => ({ id: p.handle, to: `/product/${p.handle}`, image: sizedImage(p.images[1], 700), caption: p.name }))
    : posts

  if (tiles.length === 0) return null

  // Brand tile sits second, like the reference
  const items = [tiles[0], 'brand', ...tiles.slice(1)]

  return (
    <section className="w-full bg-cream py-12 md:py-20">
      <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-6">
        {items.map((item, i) =>
          item === 'brand' ? (
            <div
              key="brand"
              className="shrink-0 snap-start w-[72vw] sm:w-[45vw] md:w-[calc((100%-4.5rem)/4)] aspect-square bg-lilac/35 flex flex-col items-center justify-center text-center px-6"
            >
              <p className="font-bodoni uppercase text-plum text-xl md:text-2xl tracking-[0.12em] leading-snug">
                {t('instagram.tagline')}
              </p>
              {(INSTAGRAM_PROFILE_URL || preview) && (
                <a
                  href={INSTAGRAM_PROFILE_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 border border-plum text-plum px-6 py-3 font-bodoni uppercase text-[11px] tracking-[0.2em] no-underline hover:bg-plum hover:text-cream transition-colors"
                >
                  <InstagramGlyph className="w-4 h-4" />
                  {t('instagram.follow')}
                </a>
              )}
            </div>
          ) : (
            <TileLink
              key={item.id || i}
              item={item}
              label={t('instagram.post')}
            />
          )
        )}
      </div>
    </section>
  )
}

function TileLink({ item, label }) {
  const className =
    'group shrink-0 snap-start w-[72vw] sm:w-[45vw] md:w-[calc((100%-4.5rem)/4)] aspect-square overflow-hidden bg-[#e5ded4] block'
  const img = (
    <img
      src={item.image}
      alt={item.caption || label}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
    />
  )
  return item.to ? (
    <Link to={item.to} className={className}>{img}</Link>
  ) : (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {img}
    </a>
  )
}
