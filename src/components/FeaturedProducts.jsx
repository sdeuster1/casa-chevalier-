import { useProducts } from '../context/ProductsContext'
import ProductCard from './ProductCard'

// Homepage row of four pieces with name, colour and price. The grid spans
// 92% of the page width on desktop.
export default function FeaturedProducts() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 4)

  return (
    <section className="w-full bg-cream py-16 md:py-24 px-4 md:px-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-10 md:w-[92%] mx-auto">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="cc-fade-in">
                <div className="aspect-[2/3] bg-[#e5ded4]" />
                <div className="h-3 w-28 bg-[#e5ded4] mt-4" />
                <div className="h-3 w-16 bg-[#e5ded4] mt-2" />
              </div>
            ))
          : featured.map((p) => <ProductCard key={p.handle} product={p} />)}
      </div>
    </section>
  )
}
