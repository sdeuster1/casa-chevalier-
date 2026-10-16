import { useRef, useState } from 'react'
import { photoFocus, sizedImage } from '../lib/shopify'
import { useLanguage } from '../i18n/LanguageContext'

// Product photos. Phones: one photo at a time, swiped sideways, with dots
// underneath so the name, price and sizes stay in the first screen.
// Desktop (md and up): the photos stacked under each other.
export default function ProductGallery({ product }) {
  const { t } = useLanguage()
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const images = product.images

  // The photo most in view is the active one
  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    setActive(Math.round(track.scrollLeft / track.clientWidth))
  }

  // scrollIntoView, not scrollTo: Chrome can cut a smooth scrollTo short
  // on a snapping track and land back on the first photo
  const goTo = (index) => {
    trackRef.current?.children[index]?.scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'start',
    })
  }

  return (
    <div className="flex flex-col">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex md:flex-col overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar"
      >
        {images.map((img, i) => (
          <div key={i} className="w-full shrink-0 snap-center aspect-[3/4] bg-[#d4cec6]">
            <img
              src={sizedImage(img, 1400)}
              loading={i === 0 ? 'eager' : 'lazy'}
              alt={t('product.view', { name: product.name, n: i + 1 })}
              className="w-full h-full object-cover cc-fade-in"
              style={{ objectPosition: photoFocus(product) }}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="md:hidden flex justify-center gap-2.5 pt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={t('product.view', { name: product.name, n: i + 1 })}
              aria-current={i === active}
              className="p-1 bg-transparent border-none cursor-pointer"
            >
              <span
                className={`block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i === active ? 'bg-plum' : 'bg-plum/25'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
