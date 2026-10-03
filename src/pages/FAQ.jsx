import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'

export default function FAQ() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)
  const { t } = useLanguage()
  const faqs = t('faq.items')

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: heading */}
          <div className="md:sticky md:top-32 self-start">
            <p className="font-playfair italic text-lilac text-[11px] tracking-[0.25em] uppercase mb-6">
              {t('faq.eyebrow')}
            </p>
            <h1 className="font-bodoni text-plum text-4xl md:text-6xl leading-tight">
              {t('faq.titleLine1')}<br />{t('faq.titleLine2')}
            </h1>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col border-t border-plum/20">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={index} className="border-b border-plum/20">
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 py-6 md:py-7 bg-transparent border-none cursor-pointer text-left"
                  >
                    <span className="font-bodoni text-dark text-lg md:text-xl leading-snug">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-plum shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-plum shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="font-playfair text-dark/75 text-sm md:text-base pb-6 md:pb-7 pr-8 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
