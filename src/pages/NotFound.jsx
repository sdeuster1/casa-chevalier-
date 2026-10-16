import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import Monogram from '../components/Monogram'
import { useLanguage } from '../i18n/LanguageContext'

// Any address the site doesn't know: a quiet page with a way back in.
export default function NotFound() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="flex-1 pt-36 md:pt-44 pb-24 md:pb-32 px-6 flex flex-col items-center text-center">
        <Monogram color="#4f1d34" size={36} className="mb-8" />
        <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] mb-6">
          {t('pageErrors.notFoundTitle')}
        </h1>
        <p className="font-playfair text-dark/70 text-[15px] md:text-base max-w-md mb-10">
          {t('pageErrors.notFoundBody')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            to="/products"
            className="font-bodoni uppercase text-cream bg-plum text-[13px] tracking-[0.2em] py-3 px-8 no-underline hover:opacity-90 transition-opacity"
          >
            {t('pageErrors.toCollection')}
          </Link>
          <Link
            to="/home"
            className="font-bodoni uppercase text-plum text-[13px] tracking-[0.2em] border-b border-plum pb-0.5 no-underline"
          >
            {t('legal.backHome')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
