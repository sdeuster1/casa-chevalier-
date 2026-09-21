import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ChevronDown, Plus, Minus } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { formatPrice } from '../lib/shopify'
import { useProducts } from '../context/ProductsContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const LOW_STOCK_THRESHOLD = 5

export default function ProductDetail() {
  const { id: handle } = useParams()
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const product = products.find((p) => p.handle === handle)

  const [menuOpen, setMenuOpen] = useState(false)
  const [chosenSize, setChosenSize] = useState(null)
  const [sizeOpen, setSizeOpen] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [openSection, setOpenSection] = useState('details')
  const [added, setAdded] = useState(false)
  const [addError, setAddError] = useState(null)

  const { addItem, busy } = useCart()
  const { toggle: toggleWish, has: hasWish } = useWishlist()

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
        <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="pt-24 grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-[3/4] bg-[#e5ded4] cc-fade-in" />
          <div className="px-6 md:px-12 py-10 md:py-16 flex flex-col gap-4">
            <div className="h-2 w-20 bg-[#e5ded4]" />
            <div className="h-6 w-56 bg-[#e5ded4]" />
            <div className="h-4 w-24 bg-[#e5ded4]" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
        <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="pt-40 pb-40 text-center">
          <p className="font-playfair italic text-plum text-lg mb-6">Product not found.</p>
          <button
            onClick={() => navigate('/products')}
            className="font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-8 cursor-pointer"
          >
            Back to Collection
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  // Single-variant products (no sizes) select themselves.
  const size =
    chosenSize ||
    (!product.hasSizes && product.variants.length === 1
      ? product.variants[0].title
      : null)

  const gallery = product.images.length ? product.images : []
  const wished = hasWish(product.handle)
  const selectedVariant = product.variants.find(
    (v) => v.title === size || v.options.Size === size
  )

  const handleBuy = async () => {
    if (product.hasSizes && !size) {
      setSizeError(true)
      setSizeOpen(true)
      return
    }
    if (!selectedVariant) return
    setAddError(null)
    try {
      const result = await addItem(selectedVariant.id, 1)
      if (result?.capped) {
        setAddError(
          result.total > 0
            ? `Only ${result.total} available in size ${size}. Your bag has been updated.`
            : `Size ${size} is no longer available.`
        )
        setAdded(false)
        return
      }
      setAdded(true)
      setTimeout(() => setAdded(false), 2500)
    } catch {
      setAddError('Could not add to bag. Please try again.')
    }
  }

  const related = products
    .filter((p) => p.category === product.category && p.handle !== product.handle)
    .slice(0, 3)

  const outOfStock = selectedVariant && !selectedVariant.available

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="pt-20 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: image gallery */}
          <div className="flex flex-col">
            {gallery.map((img, i) => (
              <div key={i} className="w-full aspect-[3/4] bg-[#d4cec6]">
                <img
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full h-full object-cover cc-fade-in"
                />
              </div>
            ))}
          </div>

          {/* RIGHT: sticky info column */}
          <div className="md:sticky md:top-24 md:self-start px-6 md:px-12 py-10 md:py-16">
            <div className="flex items-start justify-between">
              <span className="font-playfair italic text-lilac text-[11px] tracking-[0.2em] uppercase">
                {product.category}
              </span>
              <button
                onClick={() => toggleWish(product.handle)}
                className="bg-transparent border-none cursor-pointer p-0"
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className="w-5 h-5 text-plum" fill={wished ? '#4f1d34' : 'none'} strokeWidth={1.5} />
              </button>
            </div>

            <h1 className="font-bodoni text-dark text-2xl md:text-3xl leading-tight mt-3">
              {product.name}
            </h1>
            <p className="font-playfair text-plum text-lg mt-3">
              {formatPrice(product.price, product.currency)}
            </p>

            {product.description && (
              <p className="font-playfair text-dark/70 text-sm leading-relaxed mt-6 max-w-md whitespace-pre-line">
                {product.description.split('\n\n')[0]}
              </p>
            )}

            {/* Size selector — only when the product actually has sizes */}
            {product.hasSizes && (
              <div className="mt-10">
                <button
                  onClick={() => { setSizeOpen(!sizeOpen); setSizeError(false) }}
                  className={`w-full flex items-center justify-between border-b pb-3 bg-transparent cursor-pointer ${
                    sizeError ? 'border-coral' : 'border-plum/30'
                  }`}
                >
                  <span className="font-bodoni uppercase text-dark text-sm tracking-[0.15em]">
                    {size ? `Size: ${size}` : 'Select your size'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-plum transition-transform ${sizeOpen ? 'rotate-180' : ''}`} />
                </button>
                {sizeError && (
                  <p className="font-playfair italic text-coral text-xs mt-2">
                    Please select a size to continue.
                  </p>
                )}
                {sizeOpen && (
                  <div className="grid grid-cols-5 gap-2 mt-4">
                    {product.variants.map((v) => {
                      const label = v.options.Size || v.title
                      const disabled = !v.available
                      return (
                        <button
                          key={v.id}
                          disabled={disabled}
                          onClick={() => { setChosenSize(label); setSizeOpen(false); setSizeError(false) }}
                          className={`py-2 border font-playfair text-sm transition-colors ${
                            disabled
                              ? 'border-plum/15 text-dark/25 line-through cursor-not-allowed'
                              : size === label
                              ? 'border-plum bg-plum text-cream cursor-pointer'
                              : 'border-plum/30 text-dark hover:border-plum cursor-pointer'
                          }`}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Low-stock note — honest scarcity, only when genuinely low */}
            {selectedVariant &&
              selectedVariant.available &&
              selectedVariant.quantity > 0 &&
              selectedVariant.quantity <= LOW_STOCK_THRESHOLD && (
                <p className="font-playfair italic text-plum text-xs mt-4">
                  Only {selectedVariant.quantity} remaining
                  {product.hasSizes && size ? ` in size ${size}` : ''}.
                </p>
              )}

            {/* Buy button */}
            <button
              onClick={handleBuy}
              disabled={busy || outOfStock}
              className={`w-full mt-8 font-bodoni uppercase text-xs tracking-[0.25em] py-4 transition-opacity duration-300 ${
                outOfStock
                  ? 'bg-plum/30 text-cream cursor-not-allowed'
                  : 'bg-plum text-cream cursor-pointer hover:opacity-90'
              }`}
            >
              {outOfStock
                ? 'Sold Out'
                : busy
                ? 'Adding…'
                : added
                ? 'Added to Bag ✓'
                : 'Add to Bag'}
            </button>

            {addError && (
              <p className="font-playfair italic text-coral text-xs mt-3">{addError}</p>
            )}

            {added && (
              <button
                onClick={() => navigate('/shop')}
                className="w-full mt-3 font-playfair text-plum text-sm underline hover:no-underline cursor-pointer bg-transparent border-none"
              >
                View bag
              </button>
            )}

            {/* Expandable sections */}
            <div className="mt-10 flex flex-col border-t border-plum/20">
              {[
                {
                  key: 'details',
                  label: 'Details',
                  body: product.description?.split('\n\n')[1] || product.description || 'Handcrafted in Italy.',
                },
                {
                  key: 'composition',
                  label: 'Composition & Care',
                  body: product.description?.split('\n\n')[2] || 'Please refer to the garment label for care instructions.',
                },
                {
                  key: 'shipping',
                  label: 'Shipping & Returns',
                  body: 'Complimentary shipping within the EU. Returns accepted within 30 days of delivery.',
                },
              ].map((sec) => {
                const open = openSection === sec.key
                return (
                  <div key={sec.key} className="border-b border-plum/20">
                    <button
                      onClick={() => setOpenSection(open ? null : sec.key)}
                      className="w-full flex items-center justify-between py-4 bg-transparent border-none cursor-pointer"
                    >
                      <span className="font-bodoni uppercase text-dark text-xs tracking-[0.15em]">
                        {sec.label}
                      </span>
                      {open ? <Minus className="w-4 h-4 text-plum" /> : <Plus className="w-4 h-4 text-plum" />}
                    </button>
                    {open && (
                      <p className="font-playfair text-dark/70 text-sm leading-relaxed pb-4 pr-4 whitespace-pre-line">
                        {sec.body}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
            <h2 className="font-bodoni uppercase text-plum text-lg md:text-xl tracking-[0.2em] text-center mb-12">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8">
              {related.map((p) => (
                <button
                  key={p.handle}
                  onClick={() => { navigate(`/product/${p.handle}`); window.scrollTo(0, 0) }}
                  className="flex flex-col group bg-transparent border-none p-0 text-left cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#d4cec6]">
                    {p.image && (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  <p className="font-bodoni uppercase tracking-[0.15em] text-xs md:text-sm text-dark mt-3">
                    {p.name}
                  </p>
                  <p className="font-playfair text-sm text-plum mt-1">
                    {formatPrice(p.price, p.currency)}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}
