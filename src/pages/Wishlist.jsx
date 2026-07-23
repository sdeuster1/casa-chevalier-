import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function Wishlist() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items, remove } = useWishlist()
  const { addItem } = useCart()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 min-h-[70vh]">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            Wishlist
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-16">
            Your saved pieces
          </p>

          {items.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-6 py-12">
              <Heart className="w-8 h-8 text-plum" strokeWidth={1} />
              <p className="font-playfair text-dark/70 text-sm max-w-xs">
                You haven't saved any items yet. Browse the collection and tap the
                heart icon on pieces you love.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-8 cursor-pointer hover:opacity-90 transition-opacity duration-300"
              >
                Explore the Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
              {items.map((product) => (
                <div key={product.id} className="flex flex-col group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#d4cec6]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => remove(product.id)}
                      className="absolute top-3 right-3 bg-cream/80 backdrop-blur-sm w-8 h-8 flex items-center justify-center rounded-full border-none cursor-pointer hover:bg-cream transition-colors duration-300"
                      aria-label="Remove from wishlist"
                    >
                      <X className="w-4 h-4 text-plum" />
                    </button>
                  </div>
                  <div className="pt-4 flex flex-col">
                    <span className="font-playfair italic text-lilac text-[10px] tracking-[0.15em] uppercase">
                      {product.category}
                    </span>
                    <p className="font-bodoni uppercase tracking-[0.15em] text-xs md:text-sm text-dark mt-1">
                      {product.name}
                    </p>
                    <p className="font-playfair text-sm text-plum mt-1">
                      {formatPrice(product.price)}
                    </p>
                    <button
                      onClick={() => addItem(product.id, 1)}
                      className="mt-4 self-start font-bodoni uppercase text-plum text-[10px] md:text-xs tracking-[0.2em] border-b border-plum pb-0.5 bg-transparent cursor-pointer hover:opacity-70 transition-opacity duration-300"
                    >
                      Add to Bag
                    </button>
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
