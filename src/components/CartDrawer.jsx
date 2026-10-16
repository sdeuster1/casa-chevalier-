import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice, sizedImage } from '../lib/shopify'
import { useLanguage } from '../i18n/LanguageContext'

// Slide-in shopping bag. Opens after "Add to bag" so the customer can go
// straight to checkout or keep browsing. The full bag stays at /shop.
export default function CartDrawer() {
  const {
    items, itemCount, subtotal, currency, checkoutUrl,
    removeItem, busy, drawerOpen, closeDrawer,
  } = useCart()
  const [redirecting, setRedirecting] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useLanguage()

  // Close when the page changes (e.g. clicking a product in the bag)
  useEffect(() => { closeDrawer() }, [pathname, closeDrawer])

  // Esc closes; the page behind doesn't scroll while the bag is open
  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeDrawer() }
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen, closeDrawer])

  const goTo = (path) => {
    closeDrawer()
    navigate(path)
  }

  const handleCheckout = () => {
    if (!checkoutUrl) return
    setRedirecting(true)
    window.location.href = checkoutUrl
  }

  return (
    <div
      className={`fixed inset-0 z-[60] ${drawerOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!drawerOpen}
      inert={!drawerOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-dark/40 transition-opacity duration-500 ${
          drawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t('bag.drawerTitle', { count: itemCount })}
        className={`absolute top-0 right-0 h-full w-full sm:w-[440px] bg-cream flex flex-col transition-transform duration-500 ease-out ${
          drawerOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 pt-8 pb-6">
          <h2 className="font-bodoni uppercase text-plum text-base md:text-lg tracking-[0.2em]">
            {t('bag.drawerTitle', { count: itemCount })}
          </h2>
          <button
            onClick={closeDrawer}
            aria-label={t('bag.close')}
            className="bg-transparent border-none p-1 cursor-pointer hover:opacity-60 transition-opacity"
          >
            <X className="w-6 h-6 text-plum" strokeWidth={1} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 px-6 md:px-10">
            <p className="font-playfair text-dark/70 text-[15px]">{t('bag.empty')}</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 md:px-10 divide-y divide-plum/15 border-t border-plum/15">
              {items.map((line) => (
                <div key={line.lineId} className="flex gap-5 py-6">
                  {line.image && (
                    <img
                      src={sizedImage(line.image, 300)}
                      alt={line.productTitle}
                      onClick={() => goTo(`/product/${line.productHandle}`)}
                      className="w-24 h-32 object-cover bg-[#d4cec6] cursor-pointer shrink-0"
                    />
                  )}
                  <div className="flex-1 flex flex-col">
                    <button
                      onClick={() => goTo(`/product/${line.productHandle}`)}
                      className="font-bodoni tracking-[0.02em] text-[15px] text-dark bg-transparent border-none p-0 text-left cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      {line.productTitle}
                      {line.quantity > 1 && <span className="text-dark/70"> × {line.quantity}</span>}
                    </button>
                    {line.size && (
                      <p className="font-playfair text-dark/70 text-sm mt-2">{t('bag.size', { size: line.size })}</p>
                    )}
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <button
                        onClick={() => removeItem(line.lineId)}
                        disabled={busy}
                        className="font-playfair text-dark/70 text-sm underline underline-offset-4 hover:text-plum transition-colors bg-transparent border-none p-0 cursor-pointer disabled:opacity-40"
                      >
                        {t('bag.remove')}
                      </button>
                      <span className="font-playfair text-[15px] text-plum">
                        {formatPrice(line.price * line.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 md:px-10 pt-6 pb-8 border-t border-plum">
              <div className="flex justify-between items-baseline font-bodoni uppercase text-dark text-sm tracking-[0.15em]">
                <span>{t(itemCount === 1 ? 'bag.subtotalOne' : 'bag.subtotalMany', { count: itemCount })}</span>
                <span className="font-playfair normal-case tracking-normal text-base text-plum">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>
              <p className="font-playfair text-dark/70 text-sm mt-2">{t('bag.taxes')}</p>
              <button
                onClick={handleCheckout}
                disabled={!checkoutUrl || redirecting || busy}
                className="w-full mt-6 font-bodoni uppercase text-cream bg-plum text-[13px] tracking-[0.25em] py-4 cursor-pointer hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
              >
                {redirecting ? t('bag.redirecting') : t('bag.checkout')}
              </button>
              <button
                onClick={() => goTo('/shop')}
                className="w-full mt-4 font-bodoni uppercase text-plum text-[13px] tracking-[0.2em] underline underline-offset-4 hover:no-underline bg-transparent border-none cursor-pointer"
              >
                {t('bag.view')}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
