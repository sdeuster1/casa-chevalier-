export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center"
        style={{ backgroundAttachment: 'fixed' }}
      >
        <span className="text-gray-500 font-playfair text-sm tracking-widest">[Hero Campaign Image]</span>
      </div>
    </section>
  )
}
