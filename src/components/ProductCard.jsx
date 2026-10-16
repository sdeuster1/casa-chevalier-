import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { formatPrice, photoFocus, sizedImage } from '../lib/shopify'
import { useWishlist } from '../context/WishlistContext'
import { useProducts } from '../context/ProductsContext'
import { useLanguage } from '../i18n/LanguageContext'
import { swatchFor } from '../data/colours'
import ProductTitle from './ProductTitle'

// Product tile in the luxury-retail pattern: full 2:3 photo (the shoots are
// 2:3, so nothing is cropped), second photo on hover, then a quiet text block.
export default function ProductCard({ product, highlighted = false, cardRef }) {
  const { toggle, has } = useWishlist()
  const { colourVersions } = useProducts()
  const { t } = useLanguage()
  const wished = has(product.handle)
  const soldOut = !product.availableForSale
  // Every colour of this piece, in a fixed order, for the swatches
  const colours = [product, ...colourVersions(product)].sort((a, b) => a.handle.localeCompare(b.handle))
  const hover = product.images[1]
  const to = `/product/${product.handle}`

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
            className="w-[18px] h-[18px] text-plum drop-shadow-[0_0_2px_rgba(240,233,224,0.9)]"
            fill={wished ? '#4f1d34' : 'none'}
            strokeWidth={1.25}
          />
        </button>
      </div>

      <Link to={to} className="pt-4 flex flex-col gap-1 no-underline">
        <span className="font-bodoni tracking-[0.02em] text-[15px] md:text-base text-dark leading-snug">
          <ProductTitle title={product.name} />
        </span>
        <span className="font-playfair text-plum text-[15px] mt-1">
          {formatPrice(product.price, product.currency)}
        </span>
      </Link>

      {/* One small swatch per colour, like the product page; each opens
          that colour. Outside the link above (links can't be nested). */}
      {colours.length > 1 && (
        <div className="flex gap-1.5 mt-3">
          {colours.map((c) => {
            const current = c.handle === product.handle
            const hex = swatchFor(c.colour)
            return (
              <Link
                key={c.handle}
                to={`/product/${c.handle}`}
                aria-label={c.colour}
                title={c.colour}
                className={`block w-7 h-[18px] p-[2px] border transition-colors ${
                  current ? 'border-plum' : 'border-transparent hover:border-plum/40'
                }`}
              >
                <span
                  className="block w-full h-full bg-[#e5ded4] bg-cover bg-center border border-dark/10"
                  style={hex ? { backgroundColor: hex } : { backgroundImage: `url(${sizedImage(c.image, 80)})` }}
                />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
