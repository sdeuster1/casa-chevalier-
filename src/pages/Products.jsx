import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'

const products = [
  { name: 'EQUESTRIAN BLAZER', price: '€890', category: 'JACKETS' },
  { name: 'RIDERS BELT', price: '€380', category: 'ACCESSORIES' },
  { name: 'BOMBACHA', price: '€520', category: 'PANTS' },
  { name: 'SHIRT', price: '€345', category: 'SHIRTS' },
  { name: 'VEST', price: '€690', category: 'VESTS' },
  { name: 'JACKET', price: '€1,120', category: 'JACKETS' },
]

export default function Products() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            The Collection
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-16">
            Equestrian sartorial pieces, handcrafted in Italy
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {products.map((product) => (
              <div key={product.name} className="cursor-pointer group">
                <div className="aspect-[3/4] bg-[#d4cec6] flex items-center justify-center">
                  <span className="text-gray-500 font-playfair text-xs md:text-sm tracking-widest">[Product Image]</span>
                </div>
                <p className="font-bodoni uppercase tracking-[0.15em] text-xs md:text-sm text-dark mt-3">
                  {product.name}
                </p>
                <p className="font-playfair text-sm text-plum mt-1">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
