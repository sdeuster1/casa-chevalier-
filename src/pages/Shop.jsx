import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Minus, Plus, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatPrice, sizedImage } from '../lib/shopify'
import { useLanguage } from '../i18n/LanguageContext'
import ProductTitle from '../components/ProductTitle'

export default function Shop() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [limitNote, setLimitNote] = useState({})
  const {
    items, itemCount, subtotal, currency, checkoutUrl,
    updateQuantity, removeItem, loading, busy,
  } = useCart()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleCheckout = () => {
    if (!checkoutUrl) return
    setRedirecting(true)
    window.location.href = checkoutUrl
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 flex-1">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            {t('bag.title')}
          </h1>
          <p className="font-playfair text-mauve text-center text-[15px] mb-16">
            {t('bag.subtitle')}
          </p>

          {loading && (
            <div className="flex flex-col gap-6 cc-fade-in">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6 py-6 border-b border-plum/15">
                  <div className="w-24 h-32 bg-[#e5ded4]" />
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="h-2 w-16 bg-[#e5ded4]" />
                    <div className="h-4 w-40 bg-[#e5ded4]" />
                    <div className="h-3 w-20 bg-[#e5ded4]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="flex flex-col items-center text-center gap-6 py-12">
              <ShoppingBag className="w-8 h-8 text-plum" strokeWidth={1} />
              <p className="font-playfair text-dark/70 text-[15px] max-w-xs">
                {t('bag.empty')}
              </p>
              <button
                onClick={() => navigate('/products')}
                className="font-bodoni uppercase text-cream bg-plum text-[13px] tracking-[0.2em] py-3 px-8 cursor-pointer hover:opacity-90 transition-opacity duration-300"
              >
                {t('common.continueShopping')}
              </button>
            </div>
          )}

          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              <div className="md:col-span-2 flex flex-col divide-y divide-plum/15 border-t border-b border-plum/15">
                {items.map((line) => {
                  const atLimit =
                    typeof line.available === 'number' &&
                    line.quantity >= line.available
                  return (
                  <div key={line.lineId} className="flex gap-4 md:gap-6 py-5 md:py-6">
                    {line.image && (
                      <img
                        src={sizedImage(line.image, 300)}
                        alt={line.productTitle}
                        onClick={() => navigate(`/product/${line.productHandle}`)}
                        className="w-20 h-24 md:w-24 md:h-32 object-cover bg-[#d4cec6] cursor-pointer"
                      />
                    )}
                    <div className="flex-1 flex flex-col">
                      <button
                        onClick={() => navigate(`/product/${line.productHandle}`)}
                        className="font-bodoni tracking-[0.02em] text-[15px] md:text-base text-dark bg-transparent border-none p-0 text-left cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <ProductTitle title={line.productTitle} />
                      </button>
                      {line.size && (
                        <p className="font-playfair text-dark/70 text-sm mt-1">{t('bag.size', { size: line.size })}</p>
                      )}
                      <p className="font-playfair text-[15px] text-plum mt-1">
                        {formatPrice(line.price, currency)}
                      </p>
                      <div className="mt-auto flex items-center gap-4 pt-3">
                        <div className="flex items-center border border-plum/30">
                          <button
                            onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                            disabled={busy}
                            className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-plum/5 disabled:opacity-40"
                            aria-label={t('bag.decrease')}
                          >
                            <Minus className="w-3 h-3 text-plum" />
                          </button>
                          <span className="font-playfair text-[15px] text-dark w-7 text-center">
                            {line.quantity}
                          </span>
                          <button
                            onClick={async () => {
                              if (atLimit) {
                                setLimitNote((n) => ({ ...n, [line.lineId]: true }))
                                setTimeout(
                                  () => setLimitNote((n) => ({ ...n, [line.lineId]: false })),
                                  2500
                                )
                                return
                              }
                              const r = await updateQuantity(line.lineId, line.quantity + 1)
                              if (r?.capped) {
                                setLimitNote((n) => ({ ...n, [line.lineId]: true }))
                                setTimeout(
                                  () => setLimitNote((n) => ({ ...n, [line.lineId]: false })),
                                  2500
                                )
                              }
                            }}
                            disabled={busy}
                            className={`w-7 h-7 flex items-center justify-center bg-transparent border-none hover:bg-plum/5 disabled:opacity-40 ${
                              atLimit ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                            }`}
                            aria-label={t('bag.increase')}
                          >
                            <Plus className="w-3 h-3 text-plum" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(line.lineId)}
                          disabled={busy}
                          className="font-playfair text-dark/70 text-sm hover:text-plum transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1 disabled:opacity-40"
                        >
                          <X className="w-3 h-3" /> {t('bag.remove')}
                        </button>
                      </div>
                      {limitNote[line.lineId] && (
                        <p className="font-playfair text-plum text-sm mt-2">
                          {t('bag.onlyAvailable', { count: line.available })}
                        </p>
                      )}
                    </div>
                  </div>
                  )
                })}
              </div>

              <aside className="flex flex-col gap-3 self-start">
                <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-2">
                  {t('bag.summary')}
                </h3>
                <div className="flex justify-between font-playfair font-medium text-[15px] text-dark">
                  <span>{t(itemCount === 1 ? 'bag.subtotalOne' : 'bag.subtotalMany', { count: itemCount })}</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <p className="font-playfair text-dark/70 text-sm">
                  {t('bag.taxes')}
                </p>
                <ul className="font-playfair font-medium text-plum text-sm leading-relaxed flex flex-col gap-1 mt-1">
                  <li>{t('bag.freeShippingEu')}</li>
                  <li>{t('bag.freeShippingIntl')}</li>
                </ul>
                <div className="border-t border-plum/20 my-3" />
                <button
                  onClick={handleCheckout}
                  disabled={!checkoutUrl || redirecting}
                  className="font-bodoni uppercase text-cream bg-plum text-[13px] tracking-[0.2em] py-3 px-6 cursor-pointer hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                >
                  {redirecting ? t('bag.redirecting') : t('bag.checkout')}
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="mt-2 font-playfair text-plum text-sm underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
                >
                  {t('common.continueShopping')}
                </button>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
