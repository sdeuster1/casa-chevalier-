import { useNavigate } from 'react-router-dom'
import vest from '../assets/products/vest.svg'
import shirt from '../assets/products/shirt.svg'
import breeches from '../assets/products/breeches.svg'

const featured = [
  { name: 'VEST', image: vest },
  { name: 'SHIRT', image: shirt },
  { name: 'BREECHES', image: breeches },
]

export default function ThreeProducts() {
  const navigate = useNavigate()
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8" style={{ backgroundColor: '#f0e9e0' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featured.map(({ name, image }) => (
          <div
            key={name}
            onClick={() => navigate('/products')}
            className="cursor-pointer group"
          >
            <div className="aspect-square bg-[#d4cec6] overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="font-bodoni uppercase tracking-[0.15em] text-sm text-dark mt-4 text-center">
              {name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
