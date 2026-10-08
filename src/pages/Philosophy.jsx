import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import Monogram from '../components/Monogram'
import { useLanguage } from '../i18n/LanguageContext'

export default function Philosophy() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-10 md:pb-14 px-6 md:px-12">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <Monogram color="#4f1d34" size={48} className="mb-6" />
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] mb-4">
            {t('philosophy.title')}
          </h1>
          <p className="font-playfair italic text-lilac text-sm md:text-base max-w-lg">
            {t('philosophy.intro').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
        </div>
      </section>

      {/* Manifesto — one photo on the left, the whole text on the right */}
      <section className="pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="aspect-[2/3] overflow-hidden bg-[#e5ded4]">
            <img
              src="/media/philosophy-1.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6 md:max-w-md md:pl-4 md:-mt-[0.35em]">
            {t('philosophy.body').map((paragraph, i) => (
              <p key={i} className="font-playfair text-dark/75 text-sm md:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="w-10 h-px bg-plum/30 mt-4" />
            <p className="font-playfair italic text-plum text-base md:text-lg">
              {t('philosophy.closing')}
            </p>
            <div className="flex flex-col gap-2 -mt-2">
              {t('philosophy.motto').map((line, i) => (
                <span key={i} className="font-bodoni uppercase text-plum text-xs md:text-sm tracking-[0.2em]">
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
