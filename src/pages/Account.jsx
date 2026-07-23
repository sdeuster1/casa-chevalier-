import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import Monogram from '../components/Monogram'

export default function Account() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState('signup') // 'signup' | 'login'

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-sm flex flex-col items-center">
          <Monogram color="#4f1d34" size={44} className="mb-6" />

          <h1 className="font-bodoni uppercase text-dark text-xl md:text-2xl tracking-[0.15em] text-center mb-2">
            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-10">
            {mode === 'signup'
              ? 'Join Casa Chevalier for a tailored experience'
              : 'Sign in to your account'}
          </p>

          <form className="w-full flex flex-col gap-6">
            {mode === 'signup' && (
              <input
                type="text"
                required
                placeholder="Full name"
                className="bg-transparent text-dark placeholder-dark/40 font-playfair text-sm py-2 w-full outline-none border-0 border-b border-dark/30"
              />
            )}
            <input
              type="email"
              required
              placeholder="Email"
              className="bg-transparent text-dark placeholder-dark/40 font-playfair text-sm py-2 w-full outline-none border-0 border-b border-dark/30"
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="bg-transparent text-dark placeholder-dark/40 font-playfair text-sm py-2 w-full outline-none border-0 border-b border-dark/30"
            />

            <button
              type="submit"
              className="mt-4 font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-6 cursor-pointer hover:opacity-90 transition-opacity duration-300"
            >
              {mode === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="mt-8 font-playfair text-dark/60 text-xs underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
          >
            {mode === 'signup'
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
