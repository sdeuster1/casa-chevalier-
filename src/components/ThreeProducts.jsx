import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'

// Pick 3 featured pieces from the real catalog
const featured = [
  products.find((p) => p.id === 'riders-vest'),
  products.find((p) => p.id === 'poplin-shirt'),
  products.find((p) => p.id === 'breeches'),
].filter(Boolean)

export default function ThreeProducts() {
  const navigate = useNavigate()
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8" style={{ backgroundColor: '#f0e9e0' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featured.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="cursor-pointer group bg-transparent border-none p-0 text-left"
          >
            <div className="aspect-square bg-[#d4cec6] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="font-bodoni uppercase tracking-[0.15em] text-sm text-dark mt-4 text-center">
              {item.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  )
}
