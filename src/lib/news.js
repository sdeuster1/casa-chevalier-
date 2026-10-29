// ============================================================
//  CC News articles — photos and layout
// ============================================================
//  The words (title, paragraphs, closing lines) live in
//  src/i18n/translations.js under news.articles.<slug>.
//  Photos sit in public/media/news/<slug>/ as 01.jpg (1200px
//  wide) and 01-sm.jpg (640px wide, what phones load).
//  Landscape photos are 1600px and 800px wide instead.
//  Newest article first. Also read by scripts/generate-sitemap.js.
// ============================================================

export const articles = [
  {
    slug: 'the-madrid-ride',
    photos: 35,
    // The photo at the top of the article and on the CC News page
    cover: 20,
    // Wider than tall (3:2); every other photo is 2:3
    landscape: [21, 27, 33],
    // Photos placed after paragraph n (counting from 0). [a] is one photo,
    // [a, b] two side by side. Every photo is also in the gallery at the end.
    photosAfter: {
      0: [[21]],
      1: [[33]],
      2: [[16]],
      3: [[18]],
      4: [[20]],
      6: [[30]],
      8: [[24]],
      9: [[8]],
    },
  },
]

export const findArticle = (slug) => articles.find((a) => a.slug === slug)

export const isLandscape = (article, n) => article.landscape?.includes(n) ?? false

// Both sizes of photo n, for src and srcSet
export const photoSources = (article, n) => {
  const base = `/media/news/${article.slug}/${String(n).padStart(2, '0')}`
  const [small, large] = isLandscape(article, n) ? [800, 1600] : [640, 1200]
  return {
    src: `${base}.jpg`,
    srcSet: `${base}-sm.jpg ${small}w, ${base}.jpg ${large}w`,
  }
}
