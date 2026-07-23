import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ChevronDown, Plus, Minus } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { findProduct, products, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = findProduct(id)

  const [menuOpen, setMenuOpen] = useState(false)
  const [size, setSize] = useState(null)
  const [sizeOpen, setSizeOpen] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [openSection, setOpenSection] = useState('details')
  const [added, setAdded] = useState(false)

  const { addItem } = useCart()
  const { toggle: toggleWish, has: hasWish } = useWishlist()

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

  const gallery = product.images || [product.image]
  const wished = hasWish(product.id)

  const handleBuy = () => {
    if (!size) {
      setSizeError(true)
      setSizeOpen(true)
      return
    }
    addItem(product.id, 1, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="pt-20 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: image gallery */}
          <div className="flex flex-col">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="w-full aspect-[3/4] bg-[#d4cec6] flex items-center justify-center"
              >
                <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
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
                onClick={() => toggleWish(product.id)}
                className="bg-transparent border-none cursor-pointer p-0"
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className="w-5 h-5 text-plum" fill={wished ? '#4f1d34' : 'none'} strokeWidth={1.5} />
              </button>
            </div>

            <h1 className="font-bodoni text-dark text-2xl md:text-3xl leading-tight mt-3">
              {product.name}
            </h1>
            <p className="font-playfair text-plum text-lg mt-3">{formatPrice(product.price)}</p>

            <p className="font-playfair text-dark/70 text-sm leading-relaxed mt-6 max-w-md">
              {product.description}
            </p>

            {/* Size selector */}
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
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSize(s); setSizeOpen(false); setSizeError(false) }}
                      className={`py-2 border font-playfair text-sm cursor-pointer transition-colors ${
                        size === s
                          ? 'border-plum bg-plum text-cream'
                          : 'border-plum/30 text-dark hover:border-plum'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buy button */}
            <button
              onClick={handleBuy}
              className="w-full mt-8 font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.25em] py-4 cursor-pointer hover:opacity-90 transition-opacity duration-300"
            >
              {added ? 'Added to Bag ✓' : 'Add to Bag'}
            </button>
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
                { key: 'details', label: 'Details', body: product.details },
                { key: 'composition', label: 'Composition & Care', body: product.composition },
                { key: 'shipping', label: 'Shipping & Returns', body: 'Complimentary shipping within the EU. Returns accepted within 30 days of delivery.' },
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
                      <p className="font-playfair text-dark/70 text-sm leading-relaxed pb-4 pr-4">
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
                  key={p.id}
                  onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0, 0) }}
                  className="flex flex-col group bg-transparent border-none p-0 text-left cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#d4cec6]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="font-bodoni uppercase tracking-[0.15em] text-xs md:text-sm text-dark mt-3">
                    {p.name}
                  </p>
                  <p className="font-playfair text-sm text-plum mt-1">{formatPrice(p.price)}</p>
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
