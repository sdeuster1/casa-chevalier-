import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import Monogram from '../components/Monogram'
import { useLanguage } from '../i18n/LanguageContext'

export default function Account() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState('signup') // 'signup' | 'login'
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-sm flex flex-col items-center">
          <Monogram color="#4f1d34" size={44} className="mb-6" />

          <h1 className="font-bodoni uppercase text-dark text-xl md:text-2xl tracking-[0.15em] text-center mb-2">
            {mode === 'signup' ? t('account.createTitle') : t('account.welcomeBack')}
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-10">
            {mode === 'signup' ? t('account.createSubtitle') : t('account.signInSubtitle')}
          </p>

          <form className="w-full flex flex-col gap-6">
            {mode === 'signup' && (
              <input
                type="text"
                required
                placeholder={t('account.fullName')}
                className="bg-transparent text-dark placeholder-dark/40 font-playfair text-sm py-2 w-full outline-none border-0 border-b border-dark/30"
              />
            )}
            <input
              type="email"
              required
              placeholder={t('account.email')}
              className="bg-transparent text-dark placeholder-dark/40 font-playfair text-sm py-2 w-full outline-none border-0 border-b border-dark/30"
            />
            <input
              type="password"
              required
              placeholder={t('account.password')}
              className="bg-transparent text-dark placeholder-dark/40 font-playfair text-sm py-2 w-full outline-none border-0 border-b border-dark/30"
            />

            <button
              type="submit"
              className="mt-4 font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-6 cursor-pointer hover:opacity-90 transition-opacity duration-300"
            >
              {mode === 'signup' ? t('account.signUp') : t('account.signIn')}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="mt-8 font-playfair text-dark/60 text-xs underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
          >
            {mode === 'signup' ? t('account.toSignIn') : t('account.toSignUp')}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
