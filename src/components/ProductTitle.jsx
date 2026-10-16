import { splitTitle } from '../lib/shopify'

// A product's name with its colour on the line underneath, from the
// Shopify title ("The Saddle Shirt - Vanilla Blush" → "The Saddle Shirt" /
// "Vanilla Blush"). Both lines take the surrounding font; the colour line
// is lighter, or styled with colourClassName. The colour never breaks
// across lines ("Heritage Check" stays together).
export default function ProductTitle({ title, colourClassName = 'opacity-60' }) {
  const { baseName, colour } = splitTitle(title || '')
  return (
    <>
      <span className="block">{baseName}</span>
      {colour && <span className={`block whitespace-nowrap ${colourClassName}`}>{colour}</span>}
    </>
  )
}
