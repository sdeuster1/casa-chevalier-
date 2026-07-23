import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { products, categories, formatPrice } from '../data/products'
import { useWishlist } from '../context/WishlistContext'

export default function Products() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [manualCategory, setManualCategory] = useState(null)
  const [highlightTick, setHighlightTick] = useState(0)
  const productRefs = useRef({})
  const { toggle: toggleWish, has: hasWish } = useWishlist()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const urlCategory = searchParams.get('category')
  const urlProductId = searchParams.get('product')
  // Show highlight for ~2.5s after arriving; highlightTick is bumped when we
  // want it to disappear (via the effect's setTimeout callback, which is safe).
  const highlighted = urlProductId && highlightTick === 0 ? urlProductId : null

  // Derive active category from either manual override, URL, or product-implied
  const activeCategory = useMemo(() => {
    if (manualCategory) return manualCategory
    if (urlCategory && categories.includes(urlCategory)) return urlCategory
    if (urlProductId) {
      const p = products.find((x) => x.id === urlProductId)
      if (p) return p.category
    }
    return 'ALL'
  }, [manualCategory, urlCategory, urlProductId])

  // Scroll to targeted product and fade highlight after a moment
  useEffect(() => {
    if (!urlProductId) return
    const scrollTimer = setTimeout(() => {
      const el = productRefs.current[urlProductId]
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
    const clearTimer = setTimeout(() => setHighlightTick((t) => t + 1), 2500)
    return () => {
      clearTimeout(scrollTimer)
      clearTimeout(clearTimer)
    }
  }, [urlProductId])

  const filtered =
    activeCategory === 'ALL'
      ? products
      : products.filter((p) => p.category === activeCategory)

  const setCategory = (cat) => {
    setManualCategory(cat)
  }

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
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-14 md:mb-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
            {filtered.map((product) => {
              const wished = hasWish(product.id)
              const isHighlighted = highlighted === product.id
              return (
                <div
                  key={product.id}
                  ref={(el) => { productRefs.current[product.id] = el }}
                  className={`flex flex-col group transition-all duration-500 ${
                    isHighlighted ? 'ring-2 ring-plum ring-offset-4 ring-offset-cream' : ''
                  }`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#d4cec6]">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                    />
                    <button
                      onClick={() => toggleWish(product.id)}
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
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="font-bodoni uppercase tracking-[0.15em] text-xs md:text-sm text-dark mt-1 bg-transparent border-none p-0 cursor-pointer text-left hover:opacity-70 transition-opacity"
                    >
                      {product.name}
                    </button>
                    <p className="font-playfair text-sm text-plum mt-1">
                      {formatPrice(product.price)}
                    </p>
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="mt-4 self-start font-bodoni uppercase text-plum text-[10px] md:text-xs tracking-[0.2em] border-b border-plum pb-0.5 bg-transparent cursor-pointer hover:opacity-70 transition-opacity duration-300"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
