import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatPrice } from '../lib/shopify'
import { useProducts } from '../context/ProductsContext'
import { useLanguage } from '../i18n/LanguageContext'

// Shopify handles of the pieces worn in the photo, in display order
// Where each card photo is framed in its square (CSS object-position).
// The shirt sits lower so the frame starts at the neck, not the face.
const CARD_FOCUS = {
  'the-saddle-shirt-vanilla-blush': 'center 78%',
}

const LOOK_HANDLES = [
  'the-stable-vest-dark-chocolate',
  'the-signature-bombacha-heritage-check',
  'the-saddle-shirt-vanilla-blush',
]

// Pulsing dots sit on the garments in the photo: vest, shirt, trousers.
// The frame is 10% wider than the photo's 2:3 ratio and anchored to the top,
// so only the very bottom of the photo is trimmed; the face never is.
const dots = [
  { top: '50%', left: '74%' },
  { top: '57%', left: '45%' },
  { top: '86%', left: '40%' },
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
            {dots.map((pos, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-white dot-pulse"
                style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.5}s` }}
              />
            ))}
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
                  <div className="w-[247px] h-[247px] md:w-[331px] md:h-[331px] bg-[#e5ded4]" />
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
                <div className="w-[247px] h-[247px] md:w-[331px] md:h-[331px] bg-[#d4cec6] overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      style={{ objectPosition: CARD_FOCUS[item.handle] || 'center' }}
                    />
                  )}
                </div>
                <p className="font-bodoni uppercase text-xs tracking-[0.15em] text-dark mt-3">
                  {item.name}
                </p>
                <p className="font-playfair text-sm text-plum mt-1">
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
