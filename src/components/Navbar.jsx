import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, User, ShoppingBag, X } from 'lucide-react'
import { products } from '../data/products'

export default function Navbar({ onMenuToggle }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = query.trim()
    ? products.filter((p) =>
        (p.name + ' ' + p.category).toLowerCase().includes(query.toLowerCase())
      )
    : []

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 py-4 bg-transparent">
        <button
          onClick={onMenuToggle}
          className="flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-2"
          aria-label="Menu"
        >
          <span className="block w-5 md:w-6 h-[1.5px] bg-white"></span>
          <span className="block w-5 md:w-6 h-[1.5px] bg-white"></span>
          <span className="block w-5 md:w-6 h-[1.5px] bg-white"></span>
        </button>

        <Link
          to="/home"
          className="font-bodoni uppercase text-white text-xs md:text-lg tracking-[0.15em] md:tracking-[0.2em] absolute left-1/2 -translate-x-1/2 no-underline hover:opacity-80 transition-opacity"
        >
          Casa Chevalier
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="bg-transparent border-none cursor-pointer p-0"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="hidden md:block">
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
          </Link>
          <Link to="/account" aria-label="Account">
            <User className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
          </Link>
          <Link to="/shop" aria-label="Shopping bag">
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-plum/95 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-4 md:px-10 py-4">
            <div className="w-5" />
            <span className="font-bodoni uppercase text-cream text-xs md:text-lg tracking-[0.15em] md:tracking-[0.2em]">
              Search
            </span>
            <button
              onClick={closeSearch}
              className="bg-transparent border-none cursor-pointer p-2"
              aria-label="Close search"
            >
              <X className="w-5 h-5 text-cream" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center px-6 pt-8 md:pt-16">
            <div className="w-full max-w-xl flex items-center gap-3 border-b border-cream/50 pb-3">
              <Search className="w-5 h-5 text-cream/70" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the collection..."
                className="bg-transparent text-cream placeholder-cream/40 font-playfair text-base md:text-lg py-2 flex-1 outline-none border-none"
              />
            </div>

            <div className="w-full max-w-xl mt-8">
              {query.trim() && results.length === 0 && (
                <p className="font-playfair italic text-lilac text-sm text-center">
                  No results for "{query}"
                </p>
              )}
              {results.length > 0 && (
                <ul className="flex flex-col divide-y divide-cream/15 list-none p-0 m-0">
                  {results.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => {
                          closeSearch()
                          navigate('/products')
                        }}
                        className="w-full flex items-center gap-4 py-4 bg-transparent border-none cursor-pointer text-left hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-16 object-cover bg-[#d4cec6]"
                        />
                        <div className="flex flex-col">
                          <span className="font-playfair italic text-lilac text-[10px] tracking-[0.15em] uppercase">
                            {p.category}
                          </span>
                          <span className="font-bodoni uppercase tracking-[0.15em] text-sm text-cream">
                            {p.name}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {!query.trim() && (
                <p className="font-playfair italic text-lilac/60 text-sm text-center">
                  Start typing to browse the collection.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
