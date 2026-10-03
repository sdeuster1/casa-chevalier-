import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import Monogram from '../components/Monogram'
import { useLanguage } from '../i18n/LanguageContext'

// Image tones only; copy lives in i18n/translations.js (philosophy.sections)
const tones = ['#c8beb0', '#d4cec6', '#cec5b8', '#d8d1c4']

export default function Philosophy() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  const sections = t('philosophy.sections').map((s, i) => ({ ...s, tone: tones[i] }))

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-8 md:pb-12 px-6 md:px-12">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <Monogram color="#4f1d34" size={48} className="mb-6" />
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] mb-4">
            {t('philosophy.title')}
          </h1>
          <p className="font-playfair italic text-lilac text-sm md:text-base max-w-lg">
            {t('philosophy.subtitle')}
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
                key={i}
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
