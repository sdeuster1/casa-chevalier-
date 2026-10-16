import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useWishlist } from '../context/WishlistContext'
import { formatPrice, photoFocus, sizedImage } from '../lib/shopify'
import { useLanguage } from '../i18n/LanguageContext'
import ProductTitle from '../components/ProductTitle'

export default function Wishlist() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items, remove } = useWishlist()
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 min-h-[70vh]">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            {t('wishlist.title')}
          </h1>
          <p className="font-playfair text-mauve text-center text-[15px] mb-16">
            {t('wishlist.subtitle')}
          </p>

          {items.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-6 py-12">
              <Heart className="w-8 h-8 text-plum" strokeWidth={1} />
              <p className="font-playfair text-dark/70 text-[15px] max-w-xs">
                {t('wishlist.empty')}
              </p>
              <button
                onClick={() => navigate('/products')}
                className="font-bodoni uppercase text-cream bg-plum text-[13px] tracking-[0.2em] py-3 px-8 cursor-pointer hover:opacity-90 transition-opacity duration-300"
              >
                {t('wishlist.explore')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
              {items.map((product) => (
                <div key={product.handle} className="flex flex-col group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#d4cec6]">
                    <img
                      src={sizedImage(product.image, 700)}
                      loading="lazy"
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: photoFocus(product) }}
                    />
                    <button
                      onClick={() => remove(product.handle)}
                      className="absolute top-3 right-3 bg-cream/80 backdrop-blur-sm w-8 h-8 flex items-center justify-center rounded-full border-none cursor-pointer hover:bg-cream transition-colors duration-300"
                      aria-label={t('common.removeFromWishlist')}
                    >
                      <X className="w-4 h-4 text-plum" />
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
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
