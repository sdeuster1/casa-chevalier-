import { useState } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { Heart, Plus, Minus } from 'lucide-react'
import DOMPurify from 'dompurify'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import SizeGuide from '../components/SizeGuide'
import ProductGallery from '../components/ProductGallery'
import { sizeGuideFor } from '../data/sizeGuide'
import { formatPrice, photoFocus, RENAMED_HANDLES, sizedImage } from '../lib/shopify'
import { swatchFor } from '../data/colours'
import { useProducts } from '../context/ProductsContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useLanguage } from '../i18n/LanguageContext'
import ProductTitle from '../components/ProductTitle'

const LOW_STOCK_THRESHOLD = 5

// Every piece is made in Italy, so the origin line shows on all products.
// Add a product's handle here if one is ever made elsewhere.
const NOT_MADE_IN_ITALY = []

// Shopify descriptions are often pasted from Word and carry fonts, sizes and
// colours. Keep only structure (paragraphs, breaks, bold, italic, lists) and
// drop every attribute, so the site's own typography always applies.
const sanitizeDescription = (html) =>
  DOMPurify.sanitize(html || '', {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  }).trim()

export default function ProductDetail() {
  const { id: handle } = useParams()
  const navigate = useNavigate()
  const { products, loading, error, retry, colourVersions } = useProducts()
  const product = products.find((p) => p.handle === handle)

  const [menuOpen, setMenuOpen] = useState(false)
  const [chosenSize, setChosenSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)
  const [openSection, setOpenSection] = useState(null)
  const [added, setAdded] = useState(false)
  const [addError, setAddError] = useState(null)

  const { addItem, busy, openDrawer } = useCart()
  const { toggle: toggleWish, has: hasWish } = useWishlist()
  const { t, lang } = useLanguage()

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
        <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="pt-24 grid grid-cols-1 md:grid-cols-[minmax(0,44fr)_minmax(0,46fr)] md:gap-x-[10%] md:px-10">
          <div className="aspect-[3/4] bg-[#e5ded4] cc-fade-in" />
          <div className="px-6 md:px-0 py-10 md:py-16 flex flex-col gap-4">
            <div className="h-2 w-20 bg-[#e5ded4]" />
            <div className="h-6 w-56 bg-[#e5ded4]" />
            <div className="h-4 w-24 bg-[#e5ded4]" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // An old address of a renamed product: go to its new one
  const renamedTo = RENAMED_HANDLES[handle]
  if (!product && renamedTo && products.some((p) => p.handle === renamedTo)) {
    return <Navigate to={`/product/${renamedTo}`} replace />
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
        <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="pt-40 pb-40 text-center">
          {/* Shopify unreachable is not the same as a missing product */}
          <p className="font-playfair text-plum text-lg mb-6 px-6">
            {error ? t('product.unavailable') : t('product.notFound')}
          </p>
          <button
            onClick={error ? retry : () => navigate('/products')}
            className="font-bodoni uppercase text-cream bg-plum text-[13px] tracking-[0.2em] py-3 px-8 cursor-pointer"
          >
            {error ? t('common.retry') : t('product.back')}
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  // Size guide for this product (src/data/sizeGuide.js), or null
  const guide = sizeGuideFor(product)
  // One-size products show a note instead of a size button
  const oneSizeNote = guide?.type === 'oneSize' && product.variants.length === 1

  // A size chosen on another colour carries over only if it's available here
  const keptSize = product.variants.some(
    (v) => (v.options.Size || v.title) === chosenSize && v.available
  )
    ? chosenSize
    : null

  // Single-variant products (no sizes, or one-size) select themselves.
  const size =
    keptSize ||
    ((!product.hasSizes || oneSizeNote) && product.variants.length === 1
      ? product.variants[0].options.Size || product.variants[0].title
      : null)

  // Colour versions of this piece ("The Stable Vest - Sand" / "- Dark Chocolate"), stable order
  const colours = [product, ...colourVersions(product)].sort((a, b) => a.handle.localeCompare(b.handle))

  const wished = hasWish(product.handle)
  const selectedVariant = product.variants.find(
    (v) => v.title === size || v.options.Size === size
  )

  const handleBuy = async () => {
    if (product.hasSizes && !size) {
      setSizeError(true)
      return
    }
    if (!selectedVariant) return
    setAddError(null)
    try {
      const result = await addItem(selectedVariant.id, 1)
      if (result?.capped) {
        setAddError(
          result.total > 0
            ? t('product.onlyInSize', { count: result.total, size })
            : t('product.sizeGone', { size })
        )
        setAdded(false)
        return
      }
      setAdded(true)
      openDrawer()
      setTimeout(() => setAdded(false), 2500)
    } catch {
      setAddError(t('product.addFailed'))
    }
  }

  const related = products
    .filter((p) => p.section === product.section && p.handle !== product.handle)
    .slice(0, 3)

  const outOfStock = selectedVariant && !selectedVariant.available

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="pt-20 md:pt-24">
        {/* Desktop: inside the navbar's side margins (md:px-10), gallery 44%,
            gap 10%, info 46% ending at the right margin. Mobile is full-width. */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,44fr)_minmax(0,46fr)] md:gap-x-[10%] md:px-10">
          {/* LEFT: image gallery */}
          <ProductGallery key={product.handle} product={product} />

          {/* RIGHT: sticky info column */}
          <div className="md:sticky md:top-24 md:self-start px-6 md:px-0 py-10 md:py-16">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-bodoni text-dark text-2xl md:text-3xl leading-tight">
                <ProductTitle title={product.name} colourClassName="text-lg md:text-xl text-dark/60 mt-1" />
              </h1>
              <button
                onClick={() => toggleWish(product.handle)}
                className="shrink-0 mt-1.5 bg-transparent border-none cursor-pointer p-0"
                aria-label={wished ? t('common.removeFromWishlist') : t('common.addToWishlist')}
              >
                <Heart className="w-5 h-5 text-plum" fill={wished ? '#4f1d34' : 'none'} strokeWidth={1.5} />
              </button>
            </div>
            <p className="font-playfair text-plum text-lg mt-3">
              {formatPrice(product.price, product.currency)}
            </p>

            {/* Colour — one swatch per colour version of this piece */}
            {colours.length > 1 && (
              <div className="mt-8">
                <span className="block font-bodoni uppercase text-dark text-[13px] tracking-[0.15em] mb-3">
                  {t('product.colour')}
                  <span className="font-playfair normal-case tracking-normal text-dark/70 ml-2">
                    {product.colour}
                  </span>
                </span>
                <div className="flex gap-2">
                  {colours.map((c) => {
                    const current = c.handle === product.handle
                    const hex = swatchFor(c.colour)
                    return (
                      <Link
                        key={c.handle}
                        to={`/product/${c.handle}`}
                        replace
                        aria-label={c.colour}
                        aria-current={current ? 'true' : undefined}
                        title={c.colour}
                        className={`block w-12 h-8 p-[3px] border transition-colors ${
                          current ? 'border-plum' : 'border-transparent hover:border-plum/40'
                        }`}
                      >
                        <span
                          className="block w-full h-full bg-[#e5ded4] bg-cover bg-center border border-dark/10"
                          style={hex ? { backgroundColor: hex } : { backgroundImage: `url(${sizedImage(c.image, 120)})` }}
                        />
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* One-size products: fit note in place of the size buttons,
                with the general one-size text behind the size guide link */}
            {oneSizeNote && (
              <div className="mt-10">
                {guide.fit && (
                  <p className="font-playfair text-dark/70 text-[15px] leading-relaxed">
                    {guide.fit[lang] ?? guide.fit.en}
                  </p>
                )}
                <SizeGuide guide={guide} />
              </div>
            )}

            {/* Size selector — only when the product actually has sizes */}
            {product.hasSizes && !oneSizeNote && (
              <div className="mt-10">
                <span className="block font-bodoni uppercase text-dark text-[13px] tracking-[0.15em] mb-3">
                  {t('product.sizeLabel')}
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {product.variants.map((v) => {
                    const label = v.options.Size || v.title
                    const disabled = !v.available
                    return (
                      <button
                        key={v.id}
                        disabled={disabled}
                        onClick={() => { setChosenSize(label); setSizeError(false) }}
                        className={`py-2 border font-playfair text-[15px] transition-colors ${
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
                {sizeError && (
                  <p className="font-playfair text-coral text-sm mt-2">
                    {t('product.sizeRequired')}
                  </p>
                )}
                {guide?.type === 'sized' && <SizeGuide guide={guide} />}
              </div>
            )}

            {/* Short description — custom.short_description, under the sizes */}
            {product.shortDescription && (
              <p className="font-playfair text-dark/80 text-[15px] leading-relaxed mt-6 max-w-md whitespace-pre-line">
                {product.shortDescription}
              </p>
            )}

            {/* Low-stock note — honest scarcity, only when genuinely low */}
            {selectedVariant &&
              selectedVariant.available &&
              selectedVariant.quantity > 0 &&
              selectedVariant.quantity <= LOW_STOCK_THRESHOLD && (
                <p className="font-playfair text-plum text-sm mt-4">
                  {product.hasSizes && size
                    ? t('product.remainingInSize', { count: selectedVariant.quantity, size })
                    : t('product.remaining', { count: selectedVariant.quantity })}
                </p>
              )}

            {/* Origin, just above the buy button */}
            {!NOT_MADE_IN_ITALY.includes(product.handle) && (
              <p className="font-playfair text-dark/80 text-[15px] mt-6">
                {t('product.madeIn')}
              </p>
            )}

            {/* Buy button */}
            <button
              onClick={handleBuy}
              disabled={busy || outOfStock}
              className={`w-full mt-8 font-bodoni uppercase text-[13px] tracking-[0.25em] py-4 transition-opacity duration-300 ${
                outOfStock
                  ? 'bg-plum/30 text-cream cursor-not-allowed'
                  : 'bg-plum text-cream cursor-pointer hover:opacity-90'
              }`}
            >
              {outOfStock
                ? t('common.soldOut')
                : busy
                ? t('product.adding')
                : added
                ? t('product.added')
                : t('product.addToBag')}
            </button>

            {addError && (
              <p className="font-playfair text-coral text-sm mt-3">{addError}</p>
            )}

            {/* Expandable sections */}
            <div className="mt-10 flex flex-col border-t border-plum/20">
              {[
                {
                  key: 'details',
                  label: t('product.details'),
                  html: sanitizeDescription(product.descriptionHtml),
                  body: t('product.detailsFallback'),
                },
                // Hidden when the product has no custom.composizione metafield
                product.composition && {
                  key: 'composition',
                  label: t('product.composition'),
                  body: product.composition,
                },
              ].filter(Boolean).map((sec) => {
                const open = openSection === sec.key
                return (
                  <div key={sec.key} className="border-b border-plum/20">
                    <button
                      onClick={() => setOpenSection(open ? null : sec.key)}
                      className="w-full flex items-center justify-between py-4 bg-transparent border-none cursor-pointer"
                    >
                      <span className="font-bodoni uppercase text-dark text-[13px] tracking-[0.15em]">
                        {sec.label}
                      </span>
                      {open ? <Minus className="w-4 h-4 text-plum" /> : <Plus className="w-4 h-4 text-plum" />}
                    </button>
                    {open && sec.html && (
                      <div
                        className="cc-rich-text font-playfair text-dark/70 text-[15px] leading-relaxed pb-4 pr-4"
                        dangerouslySetInnerHTML={{ __html: sec.html }}
                      />
                    )}
                    {open && !sec.html && (
                      <p className="font-playfair text-dark/70 text-[15px] leading-relaxed pb-4 pr-4 whitespace-pre-line">
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
              {t('product.related')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8">
              {related.map((p) => (
                <button
                  key={p.handle}
                  onClick={() => navigate(`/product/${p.handle}`)}
                  className="flex flex-col group bg-transparent border-none p-0 text-left cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#d4cec6]">
                    {p.image && (
                      <img src={sizedImage(p.image, 700)} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: photoFocus(p) }} />
                    )}
                  </div>
                  <p className="font-bodoni tracking-[0.02em] text-[15px] md:text-base text-dark mt-3">
                    <ProductTitle title={p.name} />
                  </p>
                  <p className="font-playfair text-[15px] text-plum mt-1">
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
