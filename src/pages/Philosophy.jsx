import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import Monogram from '../components/Monogram'

const sections = [
  {
    eyebrow: 'The Foundation',
    title: 'Craftsmanship from the Saddle',
    body:
      'Casa Chevalier was born at the intersection of equestrian tradition and Italian sartorial precision. Every collection begins with the movement of the ride — the tension of the reins, the drape of a jacket in motion, the memory of leather softened by decades of use.',
    tone: '#c8beb0',
  },
  {
    eyebrow: 'The Atelier',
    title: 'Made Slowly in Italy',
    body:
      'Our garments are cut and finished in small ateliers across Lombardy and Tuscany. We work with families who have supplied Italian houses for generations — tanneries, wool mills, button makers — and refuse to compromise on the time each piece deserves.',
    tone: '#d4cec6',
  },
  {
    eyebrow: 'The Aesthetic',
    title: 'A Quiet Elegance',
    body:
      'We believe in restraint. No visible branding. No trend-led silhouettes. Just considered proportions, honest materials, and details that only reveal themselves to the person wearing them.',
    tone: '#cec5b8',
  },
  {
    eyebrow: 'The Future',
    title: 'From Saddle to Table',
    body:
      'Casa Chevalier is not only about clothing. It is a way of moving through the world — from stables to lunch, from evening rides to unhurried conversations. Our capsule collections extend from tailoring into accessories, home, and the objects of a well-considered life.',
    tone: '#d8d1c4',
  },
]

export default function Philosophy() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-8 md:pb-12 px-6 md:px-12">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <Monogram color="#4f1d34" size={48} className="mb-6" />
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] mb-4">
            Our Philosophy
          </h1>
          <p className="font-playfair italic text-lilac text-sm md:text-base max-w-lg">
            Equestrian elegance, shaped by Italian craftsmanship.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-20 md:gap-32">
          {sections.map((s, i) => {
            const imageFirst = i % 2 === 0
            const imageBlock = (
              <div
                className="w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: s.tone }}
              >
                <span className="font-playfair italic text-plum/40 text-xs tracking-widest">
                  [Editorial Image]
                </span>
              </div>
            )
            const textBlock = (
              <div className="flex flex-col justify-center">
                <span className="font-playfair italic text-lilac text-[11px] tracking-[0.25em] uppercase mb-4">
                  {s.eyebrow}
                </span>
                <h2 className="font-bodoni text-dark text-2xl md:text-4xl leading-tight mb-6">
                  {s.title}
                </h2>
                <p className="font-playfair text-dark/75 text-sm md:text-base leading-relaxed max-w-md">
                  {s.body}
                </p>
              </div>
            )

            return (
              <div
                key={s.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {imageFirst ? (
                  <>
                    {imageBlock}
                    {textBlock}
                  </>
                ) : (
                  <>
                    <div className="md:order-2">{imageBlock}</div>
                    <div className="md:order-1">{textBlock}</div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
