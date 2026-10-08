// ============================================================
//  Casa Chevalier — size guide
// ============================================================
//  Everything the product-page size guide shows lives here:
//  which product gets which guide, the conversion chart and all
//  text in English and Italian. Edit this file to change it.
//
//  Products are matched on the START of their Shopify title.
//  Longer names are checked first, so "CC × RSC The Signature
//  Bombacha" is never mistaken for "The Signature Bombacha".
//  Titles can differ per language (Translate & Adapt), so each
//  guide also lists the start of the product's handle, which is
//  the same in every language. Products not listed show no guide.
// ============================================================

// International conversions for each Italian size
export const CONVERSIONS = {
  36: { FR: 34, EU: 32, UK: 4, US: 2 },
  38: { FR: 36, EU: 34, UK: 6, US: 4 },
  40: { FR: 38, EU: 36, UK: 8, US: 6 },
  42: { FR: 40, EU: 38, UK: 10, US: 8 },
}

export const COLUMNS = ['IT', 'FR', 'EU', 'UK', 'US']

const FIT_MODEL_36 = {
  it: 'La modella porta una taglia italiana 36 e indossa una 36.',
  en: 'The model is an Italian size 36 and wears an Italian size 36.',
}

const ONE_SIZE_GENERAL = {
  it: 'I capi in taglia unica sono pensati con proporzioni morbide, concepite per adattarsi a diverse corporature.',
  en: 'One-size pieces are designed with relaxed proportions conceived to adapt to different body shapes.',
}

// type 'sized': link + panel with the chart. type 'oneSize': note on the page.
const GUIDES = [
  {
    title: 'CC × RSC The Signature Bombacha',
    handles: ['cc-rsc-the-signature-bombacha'],
    type: 'sized',
    name: 'CC × RSC THE SIGNATURE BOMBACHA',
    sizes: [36, 38, 40, 42],
    fit: FIT_MODEL_36,
  },
  {
    title: 'The Equestrian Blazer',
    handles: ['the-equestrian-blazer', 'test-blazer'],
    type: 'sized',
    name: 'THE EQUESTRIAN BLAZER',
    sizes: [38, 40, 42],
    fit: {
      it: 'La modella indossa abitualmente una taglia italiana 36 e indossa una 38 in The Equestrian Blazer. La 38 è adatta anche a una 36, a seconda della vestibilità desiderata.',
      en: 'The model usually wears an Italian size 36 and is wearing an Italian size 38 in The Equestrian Blazer. The 38 is also suitable for an IT 36 depending on the desired fit.',
    },
  },
  {
    title: 'The Signature Bombacha',
    handles: ['the-signature-bombacha'],
    type: 'sized',
    name: 'THE SIGNATURE BOMBACHA',
    sizes: [36, 38, 40, 42],
    fit: FIT_MODEL_36,
  },
  {
    title: 'The Everyday Breeches',
    handles: ['the-everyday-breeches'],
    type: 'sized',
    name: 'THE EVERYDAY BREECHES',
    sizes: [36, 38, 40, 42],
    fit: FIT_MODEL_36,
  },
  {
    title: 'CC × RSC The Timeless Polo',
    handles: ['cc-rsc-the-timeless-polo'],
    type: 'oneSize',
    fit: {
      it: 'Taglia unica. Pensata per una vestibilità oversize e squadrata.',
      en: 'One Size. Designed for an oversized, boxy fit.',
    },
  },
  {
    title: 'The Stable Vest',
    handles: ['the-stable-vest'],
    type: 'oneSize',
    fit: {
      it: 'Taglia unica. Pensato per una vestibilità oversize.',
      en: 'One Size. Designed for an oversized fit.',
    },
  },
  {
    title: 'The Saddle Shirt',
    handles: ['the-saddle-shirt'],
    type: 'oneSize',
    fit: {
      it: 'Taglia unica. Pensata per una vestibilità fluida e rilassata.',
      en: 'One Size. Designed for a fluid, relaxed fit.',
    },
  },
  {
    // General line only, no fit line
    title: 'The Pocket Belt',
    handles: ['the-pocket-belt'],
    type: 'oneSize',
    fit: null,
  },
]

// Interface text
export const TEXT = {
  link: { it: 'Guida alle taglie', en: 'Size guide' },
  close: { it: 'Chiudi guida alle taglie', en: 'Close size guide' },
  title: { it: 'Trova la tua taglia', en: 'Find your size' },
  intro: {
    it: 'Casa Chevalier segue la taglia italiana. Consulta la tabella di conversione qui sotto per trovare la tua taglia internazionale.',
    en: 'Casa Chevalier follows Italian sizing. Please refer to the conversion chart below to find your corresponding international size.',
  },
  // Availability line: prefix + sizes (in bold) + "."
  available: { it: 'Disponibile nelle taglie italiane', en: 'Available in Italian sizes' },
  and: { it: 'e', en: 'and' },
  fitLabel: { it: 'Nota sulla vestibilità:', en: 'Fit note:' },
  closing: {
    it: 'Le conversioni delle taglie internazionali sono da intendersi come indicazione generale. La vestibilità può variare in base al modello e alla silhouette desiderata.',
    en: 'International size conversions are intended as a general guide. Fit may vary depending on the style and desired silhouette.',
  },
  oneSizeGeneral: ONE_SIZE_GENERAL,
}

const normalise = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase()
const BY_LENGTH = [...GUIDES].sort((a, b) => b.title.length - a.title.length)

// The guide for a product ({ name, handle }), or null.
// Title first; the handle catches titles translated differently.
export function sizeGuideFor({ name, handle } = {}) {
  const t = normalise(name)
  const byTitle = BY_LENGTH.find((g) => t.startsWith(normalise(g.title)))
  if (byTitle) return byTitle
  const h = (handle || '').toLowerCase()
  const byHandle = [...GUIDES]
    .flatMap((g) => g.handles.map((prefix) => ({ g, prefix })))
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(({ prefix }) => h.startsWith(prefix))
  return byHandle?.g || null
}
