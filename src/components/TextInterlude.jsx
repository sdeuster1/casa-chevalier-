import { useNavigate } from 'react-router-dom'
import Monogram from './Monogram'
import { useLanguage } from '../i18n/LanguageContext'

export default function TextInterlude({ text }) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <section className="w-full bg-plum py-[30px] md:py-[45px]">
      <div className="flex flex-col items-center px-6">
        <Monogram color="#f0e9e0" size={30} className="mb-4" />
        <p className="font-playfair text-cream text-xl text-center max-w-xl mx-auto">
          {text}
        </p>
        <button
          onClick={() => navigate('/products')}
          className="mt-5 font-playfair text-cream text-[15px] tracking-[0.15em] underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
        >
          {t('common.discover')}
        </button>
      </div>
    </section>
  )
}
