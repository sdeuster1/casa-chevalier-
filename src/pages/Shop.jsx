import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Minus, Plus, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function Shop() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [step, setStep] = useState('bag') // 'bag' | 'checkout' | 'confirmed'
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', postal: '', country: 'Italy',
    card: '', expiry: '', cvv: '',
  })
  const { items, itemCount, subtotal, updateQuantity, removeItem, clear } = useCart()
  const navigate = useNavigate()

  const shipping = subtotal > 0 && subtotal < 500 ? 25 : 0
  const total = subtotal + shipping

  const handleCheckout = (e) => {
    e.preventDefault()
    // No real payment integration — simulate success
    clear()
    setStep('confirmed')
  }

  const setField = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 flex-1">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            {step === 'checkout' ? 'Checkout' : step === 'confirmed' ? 'Thank You' : 'Your Bag'}
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-16">
            {step === 'checkout'
              ? 'Complete your order'
              : step === 'confirmed'
              ? 'Your order has been received'
              : 'Curated pieces, ready for checkout'}
          </p>

          {step === 'confirmed' && (
            <div className="flex flex-col items-center text-center gap-6 py-8">
              <p className="font-playfair text-dark/70 text-sm max-w-md">
                A confirmation has been sent to your inbox. Our concierge team will be in
                touch with shipping details shortly.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-8 cursor-pointer hover:opacity-90 transition-opacity duration-300"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {step !== 'confirmed' && items.length === 0 && (
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

          {step === 'bag' && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              <div className="md:col-span-2 flex flex-col divide-y divide-plum/15 border-t border-b border-plum/15">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4 md:gap-6 py-5 md:py-6">
                    <img src={product.image} alt={product.name} className="w-20 h-24 md:w-24 md:h-32 object-cover bg-[#d4cec6]" />
                    <div className="flex-1 flex flex-col">
                      <span className="font-playfair italic text-lilac text-[10px] tracking-[0.15em] uppercase">
                        {product.category}
                      </span>
                      <p className="font-bodoni uppercase tracking-[0.15em] text-xs md:text-sm text-dark mt-1">
                        {product.name}
                      </p>
                      <p className="font-playfair text-sm text-plum mt-1">
                        {formatPrice(product.price)}
                      </p>
                      <div className="mt-auto flex items-center gap-4 pt-3">
                        <div className="flex items-center border border-plum/30">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-plum/5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 text-plum" />
                          </button>
                          <span className="font-playfair text-sm text-dark w-7 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-plum/5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 text-plum" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="font-playfair text-dark/50 text-xs hover:text-plum transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1"
                        >
                          <X className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="flex flex-col gap-3 self-start">
                <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-2">
                  Order Summary
                </h3>
                <div className="flex justify-between font-playfair text-sm text-dark/80">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-playfair text-sm text-dark/80">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-plum/20 my-3" />
                <div className="flex justify-between font-bodoni uppercase text-dark text-sm tracking-[0.1em]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button
                  onClick={() => setStep('checkout')}
                  className="mt-6 font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-6 cursor-pointer hover:opacity-90 transition-opacity duration-300"
                >
                  Proceed to Checkout
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

          {step === 'checkout' && items.length > 0 && (
            <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              <div className="md:col-span-2 flex flex-col gap-8">
                <div>
                  <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-4">
                    Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Full name" value={form.name} onChange={setField('name')} required />
                    <Field label="Email" type="email" value={form.email} onChange={setField('email')} required />
                  </div>
                </div>
                <div>
                  <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-4">
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Address" value={form.address} onChange={setField('address')} required className="md:col-span-2" />
                    <Field label="City" value={form.city} onChange={setField('city')} required />
                    <Field label="Postal code" value={form.postal} onChange={setField('postal')} required />
                    <Field label="Country" value={form.country} onChange={setField('country')} required />
                  </div>
                </div>
                <div>
                  <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-4">
                    Payment
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Field label="Card number" value={form.card} onChange={setField('card')} required className="col-span-2 md:col-span-2" />
                    <Field label="Expiry" placeholder="MM/YY" value={form.expiry} onChange={setField('expiry')} required />
                    <Field label="CVV" value={form.cvv} onChange={setField('cvv')} required />
                  </div>
                  <p className="font-playfair italic text-dark/40 text-xs mt-4">
                    No real payment is processed in this demo.
                  </p>
                </div>
              </div>

              <aside className="flex flex-col gap-3 self-start">
                <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-2">
                  Your Order
                </h3>
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between font-playfair text-xs text-dark/80">
                    <span>{product.name} × {quantity}</span>
                    <span>{formatPrice(product.price * quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-plum/20 my-3" />
                <div className="flex justify-between font-playfair text-sm text-dark/80">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-bodoni uppercase text-dark text-sm tracking-[0.1em] mt-2">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button
                  type="submit"
                  className="mt-6 font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-6 cursor-pointer hover:opacity-90 transition-opacity duration-300"
                >
                  Place Order
                </button>
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="mt-2 font-playfair text-plum text-xs underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
                >
                  Return to Bag
                </button>
              </aside>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Field({ label, className = '', ...rest }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="font-playfair italic text-dark/60 text-xs">{label}</span>
      <input
        {...rest}
        className="bg-transparent text-dark font-playfair text-sm py-2 w-full outline-none border-0 border-b border-dark/30 focus:border-plum transition-colors"
      />
    </label>
  )
}
