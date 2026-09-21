import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { formatPrice } from '../lib/shopify'
import { useProducts } from '../context/ProductsContext'
import { useWishlist } from '../context/WishlistContext'

export default function Products() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [manualCategory, setManualCategory] = useState(null)
  const [highlightTick, setHighlightTick] = useState(0)
  const productRefs = useRef({})
  const { products, categories, loading, error } = useProducts()
  const { toggle: toggleWish, has: hasWish } = useWishlist()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const urlCategory = searchParams.get('category')
  const urlProductId = searchParams.get('product')
  const highlighted = urlProductId && highlightTick === 0 ? urlProductId : null

  const activeCategory = useMemo(() => {
    if (manualCategory) return manualCategory
    if (urlCategory && categories.includes(urlCategory)) return urlCategory
    if (urlProductId) {
      const p = products.find((x) => x.handle === urlProductId)
      if (p) return p.category
    }
    return 'ALL'
  }, [manualCategory, urlCategory, urlProductId, categories, products])

  useEffect(() => {
    if (!urlProductId || loading) return
    const scrollTimer = setTimeout(() => {
      const el = productRefs.current[urlProductId]
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
    const clearTimer = setTimeout(() => setHighlightTick((t) => t + 1), 2500)
    return () => { clearTimeout(scrollTimer); clearTimeout(clearTimer) }
  }, [urlProductId, loading])

  const filtered =
    activeCategory === 'ALL'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            The Collection
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-12">
            Equestrian sartorial pieces, handcrafted in Italy
          </p>

          {/* Category filter */}
          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-14 md:mb-20">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setManualCategory(cat)}
                  className={`font-bodoni uppercase text-xs md:text-sm tracking-[0.2em] bg-transparent border-none cursor-pointer pb-1 transition-all duration-300 ${
                    activeCategory === cat
                      ? 'text-plum border-b border-plum'
                      : 'text-dark/50 hover:text-dark'
                  }`}
                >
                  {cat === 'ALL' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          )}

          {/* Loading skeleton — quiet fade, in keeping with the rest */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col cc-fade-in">
                  <div className="aspect-[3/4] bg-[#e5ded4]" />
                  <div className="pt-4 flex flex-col gap-2">
                    <div className="h-2 w-16 bg-[#e5ded4]" />
                    <div className="h-3 w-32 bg-[#e5ded4]" />
                    <div className="h-3 w-20 bg-[#e5ded4]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && !loading && (
            <p className="font-playfair italic text-plum text-center text-sm py-12">
              The collection is momentarily unavailable. Please try again shortly.
            </p>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="font-playfair italic text-lilac text-center text-sm py-12">
              No pieces in this category yet.
            </p>
          )}

          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
              {filtered.map((product) => {
                const wished = hasWish(product.handle)
                const isHighlighted = highlighted === product.handle
                const soldOut = !product.availableForSale
                return (
                  <div
                    key={product.handle}
                    ref={(el) => { productRefs.current[product.handle] = el }}
                    className={`flex flex-col group cc-fade-in transition-all duration-500 ${
                      isHighlighted ? 'ring-2 ring-plum ring-offset-4 ring-offset-cream' : ''
                    }`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#d4cec6]">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          onClick={() => navigate(`/product/${product.handle}`)}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                        />
                      )}
                      {soldOut && (
                        <span className="absolute top-3 left-3 bg-cream/90 font-bodoni uppercase text-plum text-[9px] tracking-[0.2em] px-2 py-1">
                          Sold Out
                        </span>
                      )}
                      <button
                        onClick={() => toggleWish(product.handle)}
                        className="absolute top-3 right-3 bg-cream/80 backdrop-blur-sm w-8 h-8 flex items-center justify-center rounded-full border-none cursor-pointer hover:bg-cream transition-colors duration-300"
                        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart
                          className="w-4 h-4 text-plum"
                          fill={wished ? '#4f1d34' : 'none'}
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>

                    <div className="pt-4 flex flex-col">
                      <span className="font-playfair italic text-lilac text-[10px] tracking-[0.15em] uppercase">
                        {product.category}
                      </span>
                      <button
                        onClick={() => navigate(`/product/${product.handle}`)}
                        className="font-bodoni uppercase tracking-[0.15em] text-xs md:text-sm text-dark mt-1 bg-transparent border-none p-0 cursor-pointer text-left hover:opacity-70 transition-opacity"
                      >
                        {product.name}
                      </button>
                      <p className="font-playfair text-sm text-plum mt-1">
                        {formatPrice(product.price, product.currency)}
                      </p>
                      <button
                        onClick={() => navigate(`/product/${product.handle}`)}
                        className="mt-4 self-start font-bodoni uppercase text-plum text-[10px] md:text-xs tracking-[0.2em] border-b border-plum pb-0.5 bg-transparent cursor-pointer hover:opacity-70 transition-opacity duration-300"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
