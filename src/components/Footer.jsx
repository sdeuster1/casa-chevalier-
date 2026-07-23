import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const columns = [
  {
    title: 'Get in Touch',
    links: [
      { label: 'Contacts', to: '/contacts' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Philosophy', to: '/philosophy' },
      { label: 'CC News', to: '/news' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#f99943] py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-10 md:gap-12">
        {/* Newsletter block */}
        <div className="md:flex-1 md:max-w-md">
          <h3 className="font-bodoni text-white text-base md:text-lg mb-2 uppercase tracking-[0.1em]">
            Subscribe to our newsletter
          </h3>
          <p className="font-playfair text-white/80 text-sm mb-1">
            Subscribe and receive 10% off your first order.
          </p>
          <p className="font-playfair text-white/60 text-xs mb-6">
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

        {/* Link columns — sit right next to Subscribe */}
        <div className="grid grid-cols-2 gap-8 md:gap-10">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-bodoni text-white uppercase text-xs md:text-sm mb-3 md:mb-4 tracking-[0.1em]">
                {col.title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-playfair text-white/70 text-xs hover:text-white transition-colors duration-300 no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 md:mt-12 pt-6 text-center">
        <p className="font-playfair text-white/50 text-xs">
          &copy; 2026 Casa Chevalier. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
