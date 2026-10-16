import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { formatPrice, photoFocus, sizedImage, splitTitle } from '../lib/shopify'
import { useWishlist } from '../context/WishlistContext'
import { useProducts } from '../context/ProductsContext'
import { useLanguage } from '../i18n/LanguageContext'
import ColourSwatches from './ColourSwatches'

// Product tile in the luxury-retail pattern: full 2:3 photo (the shoots are
// 2:3, so nothing is cropped), second photo on hover, then a quiet text block.
export default function ProductCard({ product, highlighted = false, cardRef }) {
  const { toggle, has } = useWishlist()
  const { colourVersions } = useProducts()
  const { t } = useLanguage()
  const wished = has(product.handle)
  const soldOut = !product.availableForSale
  // Every colour of this piece for the swatches: the one shown first,
  // then the others in a fixed order
  const colours = [product, ...colourVersions(product).sort((a, b) => a.handle.localeCompare(b.handle))]
  const hover = product.images[1]
  const to = `/product/${product.handle}`
  const { baseName, colour } = splitTitle(product.name)

  return (
    <div
      ref={cardRef}
      className={`group flex flex-col cc-fade-in transition-shadow duration-500 ${
        highlighted ? 'ring-1 ring-plum ring-offset-4 ring-offset-cream' : ''
      }`}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-[#e5ded4]">
        <Link to={to} className="block w-full h-full" aria-label={product.name}>
          {product.image && (
            <img
              src={sizedImage(product.image, 900)}
              alt={product.name}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                hover ? 'md:group-hover:opacity-0' : ''
              }`}
              style={{ objectPosition: photoFocus(product) }}
            />
          )}
          {hover && (
            <img
              src={sizedImage(hover, 900)}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 hidden md:block md:group-hover:opacity-100"
              style={{ objectPosition: photoFocus(product) }}
            />
          )}
        </Link>

        {soldOut && (
          <span className="absolute top-3 left-3 bg-cream/90 font-bodoni uppercase text-plum text-[12px] tracking-[0.2em] px-2 py-1">
            {t('common.soldOut')}
          </span>
        )}
        <button
          onClick={() => toggle(product.handle)}
          className="absolute top-2 right-2 bg-transparent w-9 h-9 flex items-center justify-center border-none cursor-pointer"
          aria-label={wished ? t('common.removeFromWishlist') : t('common.addToWishlist')}
        >
          <Heart
            className="w-[18px] h-[18px] text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.35)]"
            fill={wished ? '#ffffff' : 'none'}
            strokeWidth={1.25}
          />
        </button>
      </div>

      {/* Name on the left, price on the right; underneath the name its
          colour with the other colours' swatches beside it. Separate links,
          since the swatches are links too and links can't be nested. */}
      <div className="pt-4 flex items-start justify-between gap-3 font-bodoni tracking-[0.02em] text-[15px] md:text-base text-dark leading-snug">
        <div className="min-w-0">
          <Link to={to} className="block text-dark no-underline">
            {baseName}
          </Link>
          {(colour || colours.length > 1) && (
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {colour && (
                <Link to={to} className="text-dark/60 no-underline">
                  {colour}
                </Link>
              )}
              {colours.length > 1 && (
                <ColourSwatches colours={colours} currentHandle={product.handle} size="xs" />
              )}
            </div>
          )}
        </div>
        <Link to={to} className="text-dark no-underline whitespace-nowrap shrink-0">
          {formatPrice(product.price, product.currency)}
        </Link>
      </div>
    </div>
  )
}
