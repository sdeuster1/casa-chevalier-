import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Minus, Plus, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/shopify'

export default function Shop() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [limitNote, setLimitNote] = useState({})
  const {
    items, itemCount, subtotal, currency, checkoutUrl,
    updateQuantity, removeItem, loading, busy,
  } = useCart()
  const navigate = useNavigate()

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
            Your Bag
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-16">
            Curated pieces, ready for checkout
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
              <p className="font-playfair text-dark/70 text-sm max-w-xs">
                Your bag is currently empty. Discover our capsule collection and add
                your favourite pieces.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-8 cursor-pointer hover:opacity-90 transition-opacity duration-300"
              >
                Continue Shopping
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
                        src={line.image}
                        alt={line.productTitle}
                        onClick={() => navigate(`/product/${line.productHandle}`)}
                        className="w-20 h-24 md:w-24 md:h-32 object-cover bg-[#d4cec6] cursor-pointer"
                      />
                    )}
                    <div className="flex-1 flex flex-col">
                      <button
                        onClick={() => navigate(`/product/${line.productHandle}`)}
                        className="font-bodoni uppercase tracking-[0.15em] text-xs md:text-sm text-dark bg-transparent border-none p-0 text-left cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        {line.productTitle}
                      </button>
                      {line.size && (
                        <p className="font-playfair text-dark/60 text-xs mt-1">Size: {line.size}</p>
                      )}
                      <p className="font-playfair text-sm text-plum mt-1">
                        {formatPrice(line.price, currency)}
                      </p>
                      <div className="mt-auto flex items-center gap-4 pt-3">
                        <div className="flex items-center border border-plum/30">
                          <button
                            onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                            disabled={busy}
                            className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-plum/5 disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 text-plum" />
                          </button>
                          <span className="font-playfair text-sm text-dark w-7 text-center">
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
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 text-plum" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(line.lineId)}
                          disabled={busy}
                          className="font-playfair text-dark/50 text-xs hover:text-plum transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1 disabled:opacity-40"
                        >
                          <X className="w-3 h-3" /> Remove
                        </button>
                      </div>
                      {limitNote[line.lineId] && (
                        <p className="font-playfair italic text-plum text-xs mt-2">
                          Only {line.available} available.
                        </p>
                      )}
                    </div>
                  </div>
                  )
                })}
              </div>

              <aside className="flex flex-col gap-3 self-start">
                <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-2">
                  Order Summary
                </h3>
                <div className="flex justify-between font-playfair text-sm text-dark/80">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <p className="font-playfair italic text-dark/50 text-xs">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="border-t border-plum/20 my-3" />
                <button
                  onClick={handleCheckout}
                  disabled={!checkoutUrl || redirecting}
                  className="font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-6 cursor-pointer hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                >
                  {redirecting ? 'Taking you to checkout…' : 'Proceed to Checkout'}
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="mt-2 font-playfair text-plum text-xs underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
                >
                  Continue Shopping
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
