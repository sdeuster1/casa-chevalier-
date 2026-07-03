const products = ['BREECHES', 'SHIRT', 'JACKET']

export default function ThreeProducts() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8" style={{ backgroundColor: '#f0e9e0' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((name) => (
          <div key={name} className="cursor-pointer group">
            <div className="aspect-square bg-[#d4cec6] flex items-center justify-center">
              <span className="text-gray-500 font-playfair text-sm tracking-widest">[Product Image]</span>
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
