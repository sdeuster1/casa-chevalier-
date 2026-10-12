import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'

const CONTACT_EMAIL = 'info@casachevalier.com'

const details = [
  { icon: Mail, label: 'email', value: CONTACT_EMAIL },
  { icon: Phone, label: 'telephone', value: '+39 02 393 5831' },
  { icon: MapPin, label: 'atelier', valueKey: 'address' },
]

export default function Contacts() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            {t('contacts.title')}
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-16 md:mb-20">
            {t('contacts.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Left: contact details */}
            <div className="flex flex-col gap-8">
              {details.map(({ icon: Icon, label, value, valueKey }) => (
                <div key={label} className="flex items-start gap-4">
                  <Icon className="w-5 h-5 text-plum mt-1 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="font-playfair italic text-lilac text-[10px] tracking-[0.15em] uppercase">
                      {t(`contacts.${label}`)}
                    </span>
                    <span className="font-playfair text-dark text-sm mt-1">
                      {valueKey ? t(`contacts.${valueKey}`) : value}
                    </span>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-3">
                  {t('contacts.hoursTitle')}
                </h3>
                <p className="font-playfair text-dark/70 text-sm">
                  {t('contacts.hoursWeek')}
                </p>
                <p className="font-playfair text-dark/70 text-sm">
                  {t('contacts.hoursSaturday')}
                </p>
              </div>
            </div>

            {/* Right: email prompt. Messages go straight to the inbox, so
                nothing a customer sends can get lost. */}
            <div className="flex flex-col items-start">
              <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-3">
                {t('contacts.writeTitle')}
              </h3>
              <p className="font-playfair text-dark/70 text-sm max-w-sm">
                {t('contacts.writeBody')}
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-8 font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-8 no-underline hover:opacity-90 transition-opacity duration-300"
              >
                {t('contacts.writeButton')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
