import { Search, Heart, User, ShoppingBag } from 'lucide-react'

export default function Navbar({ onMenuToggle }) {
  return (
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

      <span className="font-bodoni uppercase text-white text-xs md:text-lg tracking-[0.15em] md:tracking-[0.2em] absolute left-1/2 -translate-x-1/2">
        Casa Chevalier
      </span>

      <div className="flex items-center gap-3 md:gap-6">
        <Search className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
        <Heart className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer hidden md:block" />
        <User className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
        <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
      </div>
    </nav>
  )
}
