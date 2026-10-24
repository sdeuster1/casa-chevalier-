import { useRef, useState } from 'react'
import { useProducts } from '../context/ProductsContext'
import ProductCard from './ProductCard'

// Shopify handles of the four pieces shown on the homepage, in order.
// A list means "the first of these that exists": the blazer still has its
// placeholder handle in Shopify and keeps working before and after the rename.
const FEATURED_HANDLES = [
  ['the-equestrian-blazer-heritage-check', 'test-blazer'],
  'the-stable-vest-dark-chocolate',
  'the-everyday-breeches-sand',
  'cc-rsc-the-timeless-polo-rust-cream',
]

// Homepage row of four pieces with name, colour and price.
// Phones: one large piece at a time, swiped sideways, with the next one
// peeking in and dots underneath. Tablet: two per row. Desktop: four in a
// row spanning 92% of the page width.
export default function FeaturedProducts() {
  const { products, loading } = useProducts()
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const featured = FEATURED_HANDLES
    .map((entry) =>
      [entry].flat().map((h) => products.find((p) => p.handle === h)).find(Boolean)
    )
    .filter(Boolean)

  // The card most in view is the active one
  const handleScroll = () => {
    const track = trackRef.current
    const first = track?.children[0]
    if (!first) return
    const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0)
    setActive(Math.round(track.scrollLeft / step))
  }

  // scrollIntoView, not scrollTo: Chrome can cut a smooth scrollTo short
  // on a snapping track
  const goTo = (index) => {
    trackRef.current?.children[index]?.scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'center',
    })
  }

  const cards = loading
    ? [...Array(4)].map((_, i) => (
        <div key={i} className="cc-fade-in">
          <div className="aspect-[2/3] bg-[#e5ded4]" />
          <div className="h-3 w-28 bg-[#e5ded4] mt-4" />
          <div className="h-3 w-16 bg-[#e5ded4] mt-2" />
        </div>
      ))
    : featured.map((p) => <ProductCard key={p.handle} product={p} />)

  return (
    <section className="w-full bg-cream py-16 md:py-24 md:px-10">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar px-[9vw] md:px-0 md:w-[92%] mx-auto"
      >
        {cards.map((card) => (
          <div key={card.key} className="w-[82vw] shrink-0 snap-center md:w-auto">
            {card}
          </div>
        ))}
      </div>

      {!loading && featured.length > 1 && (
        <div className="md:hidden flex justify-center gap-2.5 pt-6">
          {featured.map((p, i) => (
            <button
              key={p.handle}
              onClick={() => goTo(i)}
              aria-label={p.name}
              aria-current={i === active}
              className="p-1 bg-transparent border-none cursor-pointer"
            >
              <span
                className={`block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i === active ? 'bg-plum' : 'bg-plum/25'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
