import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'

const articles = [
  {
    id: 'atelier-milano',
    category: 'Atelier',
    date: 'March 2026',
    title: 'Inside the Milan Atelier',
    excerpt:
      'A quiet morning behind the doors of Via della Spiga, where every stitch begins with a single length of Italian thread.',
    ratio: 'aspect-[4/5]',
    tone: '#c8beb0',
  },
  {
    id: 'spring-collection',
    category: 'Collection',
    date: 'February 2026',
    title: 'The Spring Capsule',
    excerpt:
      'Softly tailored blazers, poplin shirts, and heritage breeches — an ode to the ride and the return.',
    ratio: 'aspect-[3/4]',
    tone: '#d4cec6',
  },
  {
    id: 'concorso',
    category: 'Events',
    date: 'January 2026',
    title: 'Concorso di Eleganza',
    excerpt:
      'Notes from an afternoon among horses and hand-finished lapels at the annual concorso in Lombardy.',
    ratio: 'aspect-[4/5]',
    tone: '#cec5b8',
  },
  {
    id: 'craft-of-leather',
    category: 'Craft',
    date: 'December 2025',
    title: 'The Craft of Leather',
    excerpt:
      'A conversation with the family tannery in Tuscany that has supplied our belts and saddles for three generations.',
    ratio: 'aspect-[3/4]',
    tone: '#d8d1c4',
  },
  {
    id: 'from-saddle-to-table',
    category: 'Lifestyle',
    date: 'November 2025',
    title: 'From Saddle to Table',
    excerpt:
      'The Italian art of moving from stables to lunch — dressed, unhurried, and always in linen.',
    ratio: 'aspect-[4/5]',
    tone: '#cbc2b3',
  },
  {
    id: 'heritage-of-the-house',
    category: 'Heritage',
    date: 'October 2025',
    title: 'Heritage of the House',
    excerpt:
      'Chapter one of a series on the sartorial traditions that shape every Casa Chevalier collection.',
    ratio: 'aspect-[3/4]',
    tone: '#e2dcd2',
  },
]

export default function News() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            CC News
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-16 md:mb-20">
            Stories from the house
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-10 md:gap-y-20">
            {articles.map((a) => (
              <article key={a.id} className="flex flex-col group cursor-pointer">
                <div
                  className={`w-full ${a.ratio} overflow-hidden`}
                  style={{ backgroundColor: a.tone }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-playfair italic text-plum/40 text-xs tracking-widest">
                      [Editorial Image]
                    </span>
                  </div>
                </div>
                <div className="pt-5 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-playfair italic text-lilac text-[10px] tracking-[0.2em] uppercase">
                      {a.category}
                    </span>
                    <span className="w-4 h-px bg-lilac/60"></span>
                    <span className="font-playfair italic text-lilac text-[10px]">
                      {a.date}
                    </span>
                  </div>
                  <h3 className="font-bodoni text-dark text-lg md:text-xl leading-snug">
                    {a.title}
                  </h3>
                  <p className="font-playfair text-dark/70 text-sm leading-relaxed">
                    {a.excerpt}
                  </p>
                  <span className="mt-2 font-bodoni uppercase text-plum text-[10px] tracking-[0.2em] border-b border-plum self-start pb-0.5 group-hover:opacity-70 transition-opacity">
                    Read More
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
