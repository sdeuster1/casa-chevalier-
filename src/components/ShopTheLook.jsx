import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatPrice, photoFocus, sizedImage } from '../lib/shopify'
import { useProducts } from '../context/ProductsContext'
import { useLanguage } from '../i18n/LanguageContext'
import ProductTitle from './ProductTitle'

// Extra zoom on a card photo, by handle. The vest shot is a full-length
// figure, so it is brought 20% closer, zooming on the upper body so the
// head stays in frame.
const CARD_ZOOM = {
  'the-stable-vest-dark-chocolate': 1.2,
}

// Shopify handles of the pieces worn in the photo, in display order
const LOOK_HANDLES = [
  'the-stable-vest-dark-chocolate',
  'the-signature-bombacha-heritage-check',
  'the-saddle-shirt-vanilla-blush',
]

// Pulsing dots sit on the garments in the photo and link to each piece:
// vest, shirt, trousers.
// The frame is 10% wider than the photo's 2:3 ratio and anchored to the top,
// so only the very bottom of the photo is trimmed; the face never is.
const dots = [
  { top: '50%', left: '74%', handle: 'the-stable-vest-dark-chocolate' },
  { top: '57%', left: '45%', handle: 'the-saddle-shirt-vanilla-blush' },
  { top: '86%', left: '40%', handle: 'the-signature-bombacha-heritage-check' },
]

export default function ShopTheLook() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const { t } = useLanguage()
  // The pieces worn in the photo, in this order: vest, bombacha, shirt.
  // Change the handles here if the photo changes.
  const featured = LOOK_HANDLES
    .map((handle) => products.find((p) => p.handle === handle))
    .filter(Boolean)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 351, behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full" style={{ backgroundColor: '#f0e9e0' }}>
      <div className="flex flex-col md:flex-row" style={{ backgroundColor: '#f0e9e0' }}>
        {/* Photo frame sized by height, anchored to the top so the face is
            never cropped. The column hugs the photo so the products sit
            right beside it. */}
        <div className="w-full md:w-auto md:shrink-0 flex items-center justify-center py-8 md:py-12 px-6 md:pl-28 md:pr-0">
          <div className="relative h-[69vh] md:h-[92vh] aspect-[11/15] max-w-full overflow-hidden bg-[#2a2a2a]">
            <img
              src="/media/shop-the-look.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* Each dot sits in a larger invisible tap target, shifted so the
                dot itself stays exactly where it was. */}
            {dots.map((dot, i) => {
              const name = products.find((p) => p.handle === dot.handle)?.name
              return (
                <Link
                  key={dot.handle}
                  to={`/product/${dot.handle}`}
                  aria-label={name}
                  title={name}
                  className="group absolute w-8 h-8 flex items-center justify-center"
                  style={{ top: dot.top, left: dot.left, transform: 'translate(-10px, -10px)' }}
                >
                  <span
                    className="block w-3 h-3 rounded-full bg-white dot-pulse group-hover:scale-150 transition-transform duration-300"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                </Link>
              )
            })}
          </div>
        </div>

        <div className="w-full md:flex-1 min-w-0 px-6 py-10 md:py-12 md:pl-14 md:pr-10 flex flex-col justify-center" style={{ backgroundColor: '#f0e9e0' }}>
          <h2 className="font-bodoni uppercase tracking-[0.2em] text-plum text-xl md:text-2xl mb-8 md:mb-12">
            {t('home.shopTheLook')}
          </h2>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-4 -mx-1 px-1"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {loading &&
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[247px] md:w-[331px] cc-fade-in">
                  <div className="w-[247px] md:w-[331px] aspect-[3/4] bg-[#e5ded4]" />
                  <div className="h-3 w-24 bg-[#e5ded4] mt-3" />
                  <div className="h-3 w-16 bg-[#e5ded4] mt-2" />
                </div>
              ))}

            {!loading && featured.map((item) => (
              <button
                key={item.handle}
                onClick={() => navigate(`/product/${item.handle}`)}
                className="flex-shrink-0 w-[247px] md:w-[331px] cursor-pointer bg-transparent border-none p-0 text-left"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="w-[247px] md:w-[331px] aspect-[3/4] bg-[#d4cec6] overflow-hidden">
                  {item.image && (
                    <div className="w-full h-full" style={{ transform: `scale(${CARD_ZOOM[item.handle] || 1})`, transformOrigin: 'center 25%' }}>
                      <img
                        src={sizedImage(item.image, 800)}
                        loading="lazy"
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        style={{ objectPosition: photoFocus(item) }}
                      />
                    </div>
                  )}
                </div>
                <p className="font-bodoni text-[15px] tracking-[0.02em] text-dark mt-3">
                  <ProductTitle title={item.name} />
                </p>
                <p className="font-playfair text-[15px] text-plum mt-1">
                  {formatPrice(item.price, item.currency)}
                </p>
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => scroll(-1)} className="bg-transparent border border-plum p-2 cursor-pointer hover:bg-plum hover:text-cream transition-all duration-300 text-plum" aria-label={t('common.previous')}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll(1)} className="bg-transparent border border-plum p-2 cursor-pointer hover:bg-plum hover:text-cream transition-all duration-300 text-plum" aria-label={t('common.next')}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
