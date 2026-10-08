import { useNavigate } from 'react-router-dom'
import Monogram from './Monogram'
import { useLanguage } from '../i18n/LanguageContext'
import Wordmark from './Wordmark'

export default function SplashPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row">
      {/* Campaign video on the left — muted and looping so browsers allow autoplay */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-[#1a1a1a] overflow-hidden">
        <video
          src="/media/splash.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>
      {/* Campaign photo on the right */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-[#2a2a2a] overflow-hidden">
        <img
          src="/media/splash-photo.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <Monogram color="#ffffff" size={70} className="mb-6" />
        <Wordmark
          color="#ffffff"
          className="w-[260px] md:w-[480px] h-auto mb-8 px-4"
        />
        <button
          onClick={() => navigate('/home')}
          className="font-playfair italic text-white text-sm tracking-[0.15em] underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
        >
          {t('common.discover')}
        </button>
      </div>
    </div>
  )
}
