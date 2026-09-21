import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'

export default function ThreeProducts() {
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const featured = products.slice(0, 3)

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8" style={{ backgroundColor: '#f0e9e0' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {loading &&
          [...Array(3)].map((_, i) => (
            <div key={i} className="cc-fade-in">
              <div className="aspect-square bg-[#e5ded4]" />
              <div className="h-3 w-24 bg-[#e5ded4] mt-4 mx-auto" />
            </div>
          ))}

        {!loading && featured.map((item) => (
          <button
            key={item.handle}
            onClick={() => navigate(`/product/${item.handle}`)}
            className="cursor-pointer group bg-transparent border-none p-0 text-left"
          >
            <div className="aspect-square bg-[#d4cec6] overflow-hidden">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
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
