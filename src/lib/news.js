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
    slug: 'a-choice-made-with-care',
    photos: 2,
    cover: 1,
    landscape: [],
    chapters: [
      { photo: 1, paragraphs: [0, 1] },
      { photo: 2, paragraphs: [2, 3] },
    ],
  },
  {
    slug: 'made-to-be-lived-in',
    photos: 5,
    cover: 1,
    landscape: [],
    chapters: [
      { photo: 1, paragraphs: [0, 1] },
      { photo: 5, paragraphs: [2, 3] },
      { photo: 3, paragraphs: [4, 5] },
      { photo: 2, paragraphs: [6, 7] },
      { photo: 4, paragraphs: [8] },
    ],
  },
  {
    slug: 'the-madrid-ride',
    photos: 35,
    // The photo at the top of the article and on the CC News page
    cover: 20,
    // Wider than tall (3:2); every other photo is 2:3
    landscape: [21, 27, 33],
    // The story in chapters: a large photo with a few paragraphs beside it
    // (paragraph numbers count from 0), the photo alternating left and
    // right. Every photo is also in the gallery at the end.
    chapters: [
      { photo: 18, paragraphs: [0, 1] }, // the launch, dressed in Casa Chevalier
      { photo: 16, paragraphs: [2, 3] }, // the ride
      { photo: 20, paragraphs: [4, 5, 6] }, // the table in the forest
      { photo: 30, paragraphs: [7] }, // women supporting women
      { photo: 24, paragraphs: [8, 9] }, // the ride home
    ],
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
