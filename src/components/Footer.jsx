import { ArrowRight } from 'lucide-react'

const columns = [
  {
    title: 'Get in Touch',
    links: ['Contacts', 'FAQ'],
  },
  {
    title: 'Company',
    links: ['Our Philosophy', 'CC News'],
  },
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#f99943] py-12 md:py-16 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-5xl mx-auto">
        <div className="mb-4 md:mb-0">
          <h3 className="font-bodoni text-white text-base md:text-lg mb-2 uppercase tracking-[0.1em]">
            Subscribe to our newsletter
          </h3>
          <p className="font-playfair text-white/70 text-sm mb-6">
            Be the first to know about new collections and exclusive events.
          </p>
          <div className="flex items-center border-b border-white max-w-xs">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent text-white placeholder-white/50 font-playfair text-sm py-2 flex-1 outline-none border-none min-w-0"
            />
            <button className="bg-transparent border-none cursor-pointer p-2" aria-label="Subscribe">
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-bodoni text-white uppercase text-xs md:text-sm mb-3 md:mb-4 tracking-[0.1em]">
              {col.title}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-playfair text-white/70 text-xs hover:text-white transition-colors duration-300 no-underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/20 mt-10 md:mt-12 pt-6 text-center">
        <p className="font-playfair text-white/50 text-xs">
          &copy; 2026 Casa Chevalier. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
