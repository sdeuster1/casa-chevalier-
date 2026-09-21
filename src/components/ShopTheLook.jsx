import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatPrice } from '../lib/shopify'
import { useProducts } from '../context/ProductsContext'

const dots = [
  { top: '25%', left: '35%' },
  { top: '55%', left: '60%' },
  { top: '75%', left: '30%' },
]

export default function ShopTheLook() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const featured = products.slice(0, 4)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 220, behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full" style={{ backgroundColor: '#f0e9e0' }}>
      <div className="flex flex-col md:flex-row" style={{ backgroundColor: '#f0e9e0' }}>
        <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-[80vh] bg-[#2a2a2a] relative flex items-center justify-center">
          <span className="text-gray-500 font-playfair text-sm tracking-widest">[Model Image]</span>
          {dots.map((pos, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-white dot-pulse"
              style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>

        <div className="w-full md:w-1/2 px-6 py-10 md:p-12 flex flex-col justify-center" style={{ backgroundColor: '#f0e9e0' }}>
          <h2 className="font-bodoni uppercase tracking-[0.2em] text-plum text-xl md:text-2xl mb-8 md:mb-12">
            Shop the Look
          </h2>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-4 -mx-1 px-1"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {loading &&
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[150px] md:w-[200px] cc-fade-in">
                  <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-[#e5ded4]" />
                  <div className="h-3 w-24 bg-[#e5ded4] mt-3" />
                  <div className="h-3 w-16 bg-[#e5ded4] mt-2" />
                </div>
              ))}

            {!loading && featured.map((item) => (
              <button
                key={item.handle}
                onClick={() => navigate(`/product/${item.handle}`)}
                className="flex-shrink-0 w-[150px] md:w-[200px] cursor-pointer bg-transparent border-none p-0 text-left"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-[#d4cec6] overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <p className="font-bodoni uppercase text-xs tracking-[0.15em] text-dark mt-3">
                  {item.name}
                </p>
                <p className="font-playfair text-sm text-plum mt-1">
                  {formatPrice(item.price, item.currency)}
                </p>
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => scroll(-1)} className="bg-transparent border border-plum p-2 cursor-pointer hover:bg-plum hover:text-cream transition-all duration-300 text-plum" aria-label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll(1)} className="bg-transparent border border-plum p-2 cursor-pointer hover:bg-plum hover:text-cream transition-all duration-300 text-plum" aria-label="Next">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
