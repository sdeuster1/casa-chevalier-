// ============================================================
//  CC MAG articles — photos, category, date and layout
// ============================================================
//  The words (title, headings, paragraphs, closing lines) live in
//  src/i18n/translations.js under news.articles.<slug>.
//  Photos sit in public/media/news/<slug>/ as 01.jpg (1200px
//  wide) and 01-sm.jpg (640px wide, what phones load).
//  Landscape photos are 1600px and 800px wide instead.
//  Newest article first. Also read by scripts/generate-sitemap.js.
// ============================================================

// The small label above every article; the words are in
// translations.js under news.categories
export const CATEGORIES = ['founders-letter', 'events', 'press', 'stories', 'craftsmanship']

export const articles = [
  {
    slug: 'a-choice-made-with-care',
    // A Founder's Letter: the page says so under the title, with the byline
    category: 'founders-letter',
    date: '2026-11-02',
    photos: 4,
    // A photo used only as the cover, not in the story: cover.jpg and cover-sm.jpg
    cover: 'cover',
    // A chapter without a photo is a single column of text
    chapters: [
      { photo: 1, paragraphs: [0, 1, 2] }, // from a love of animals
      { photo: 2, heading: 0, paragraphs: [3, 4, 5, 6, 7, 8] }, // without compromise
      { photo: 4, heading: 1, paragraphs: [9, 10, 11, 12, 13] }, // made to be lived in
      { photo: 3, paragraphs: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23] }, // the sneeze
      { heading: 2, paragraphs: [24, 25, 26, 27, 28] }, // who we are
    ],
  },
  {
    slug: 'made-to-be-lived-in',
    category: 'craftsmanship',
    date: '2026-11-02',
    photos: 5,
    cover: 3,
    chapters: [
      { photo: 1, paragraphs: [0, 1, 2, 3, 4, 5] }, // an art to making things with care
      { photo: 2, heading: 0, paragraphs: [6, 7, 8, 9, 10, 11] }, // the people behind the pieces
      { photo: 3, heading: 1, paragraphs: [12, 13, 14, 15, 16, 17] }, // designed with purpose
      { photo: 4, heading: 2, paragraphs: [18, 19, 20, 21, 22, 23, 24, 25] }, // made to be lived in
      { photo: 5, paragraphs: [26, 27, 28, 29, 30] }, // worth keeping
    ],
  },
  {
    slug: 'the-madrid-ride',
    category: 'events',
    date: '2026-10-29',
    photos: 35,
    // The photo at the top of the article and on the CC MAG page
    cover: 20,
    // Wider than tall (3:2); every other photo is 2:3
    landscape: [21, 27, 33],
    // The story in chapters: a large photo with a few paragraphs beside it
    // (paragraph numbers count from 0), the photo alternating left and
    // right. Photos not used in a chapter are in the gallery at the end.
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

export const isLetter = (article) => article.category === 'founders-letter'

// The gallery only shows when there are more photos than the chapters use
export const hasGallery = (article) =>
  article.photos > article.chapters.filter((c) => c.photo).length

// '2 November 2026' / '2 novembre 2026'
export const formatDate = (article, lang) =>
  new Date(`${article.date}T12:00:00`).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

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
