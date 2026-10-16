import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown, Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { formatPrice, matchesCategory, photoFocus, sizedImage } from '../lib/shopify'
import { useProducts } from '../context/ProductsContext'
import { useWishlist } from '../context/WishlistContext'
import { useLanguage } from '../i18n/LanguageContext'
import ProductTitle from '../components/ProductTitle'

export default function Products() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [manualCategory, setManualCategory] = useState(null)
  const [highlightTick, setHighlightTick] = useState(0)
  const productRefs = useRef({})
  const { products, loading, error, retry } = useProducts()
  const categories = ['ALL', 'PANTS', 'SHIRTS', 'JACKETS', 'VESTS', 'ACCESSORIES']
  const { toggle: toggleWish, has: hasWish } = useWishlist()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t, sectionLabel } = useLanguage()

  const urlCategory = searchParams.get('category')
  const urlProductId = searchParams.get('product')
  const highlighted = urlProductId && highlightTick === 0 ? urlProductId : null

  const activeCategory = useMemo(() => {
    if (manualCategory) return manualCategory
    if (urlCategory) return urlCategory.toUpperCase()
    if (urlProductId) {
      const p = products.find((x) => x.handle === urlProductId)
      if (p) return p.section
    }
    return 'ALL'
  }, [manualCategory, urlCategory, urlProductId, products])

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
      : products.filter((p) => matchesCategory(p, activeCategory))

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-24 md:pt-28 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Title kept for search engines and screen readers, not shown */}
          <h1 className="sr-only">{t('products.title')}</h1>

          {/* Compact header: category dropdown on the left, the line about
              the collection centred on the page (underneath on phones) */}
          <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] md:items-center gap-x-8 gap-y-2 mb-8 md:mb-10">
            <label className="relative inline-flex items-center self-start justify-self-start shrink-0">
              <span className="sr-only">{t('products.filterLabel')}</span>
              <select
                value={categories.includes(activeCategory) ? activeCategory : 'ALL'}
                onChange={(e) => setManualCategory(e.target.value)}
                className="appearance-none bg-transparent font-bodoni uppercase text-plum text-[13px] md:text-sm tracking-[0.2em] border-0 border-b border-plum rounded-none pb-1 pr-7 cursor-pointer focus:outline-none focus-visible:outline-1 focus-visible:outline-plum focus-visible:outline-offset-4"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {sectionLabel(cat)}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-plum pointer-events-none"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </label>
            <p className="font-playfair text-mauve text-[15px] m-0">
              {t('products.subtitle')}
            </p>
          </div>

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
            <div className="text-center py-12">
              <p className="font-playfair text-plum text-[15px]">
                {t('products.unavailable')}
              </p>
              <button
                onClick={retry}
                className="mt-4 font-bodoni uppercase text-plum text-[12px] tracking-[0.2em] border-0 border-b border-plum pb-0.5 bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
              >
                {t('common.retry')}
              </button>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="font-playfair text-mauve text-[15px]">
                {t('products.empty')}
              </p>
              <button
                onClick={() => setManualCategory('ALL')}
                className="mt-4 font-bodoni uppercase text-plum text-[12px] tracking-[0.2em] border-b border-plum pb-0.5 bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
              >
                {t('products.viewAll')}
              </button>
            </div>
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
                          src={sizedImage(product.image, 900)}
                          loading="lazy"
                          alt={product.name}
                          onClick={() => navigate(`/product/${product.handle}`)}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                          style={{ objectPosition: photoFocus(product) }}
                        />
                      )}
                      {soldOut && (
                        <span className="absolute top-3 left-3 bg-cream/90 font-bodoni uppercase text-plum text-[12px] tracking-[0.2em] px-2 py-1">
                          {t('common.soldOut')}
                        </span>
                      )}
                      <button
                        onClick={() => toggleWish(product.handle)}
                        className="absolute top-3 right-3 bg-cream/80 backdrop-blur-sm w-8 h-8 flex items-center justify-center rounded-full border-none cursor-pointer hover:bg-cream transition-colors duration-300"
                        aria-label={wished ? t('common.removeFromWishlist') : t('common.addToWishlist')}
                      >
                        <Heart
                          className="w-4 h-4 text-plum"
                          fill={wished ? '#4f1d34' : 'none'}
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>

                    <div className="pt-4 flex items-start justify-between gap-3">
                      <button
                        onClick={() => navigate(`/product/${product.handle}`)}
                        className="font-bodoni tracking-[0.02em] text-[15px] md:text-base text-dark min-w-0 bg-transparent border-none p-0 cursor-pointer text-left hover:opacity-70 transition-opacity"
                      >
                        <ProductTitle title={product.name} />
                      </button>
                      <p className="font-bodoni tracking-[0.02em] text-[15px] md:text-base text-dark whitespace-nowrap shrink-0 m-0">
                        {formatPrice(product.price, product.currency)}
                      </p>
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
