import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

// Video only on desktop: phones show the photo and never download the reel.
const DESKTOP = '(min-width: 768px)'
const subscribe = (cb) => {
  const mq = window.matchMedia(DESKTOP)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useIsDesktop = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false)

// Campaign split screen: photo on the left, reel on the right (desktop),
// with the call to shop over both.
export default function HeroSection() {
  const { t } = useLanguage()
  const isDesktop = useIsDesktop()

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-dark">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 grid-rows-1">
        <img
          src="/media/home-hero-image.jpg"
          alt=""
          // Frame starts just above her head and runs down to the saddle
          className="w-full h-full min-h-0 object-cover object-[center_60%]"
        />
        {isDesktop && (
          <video
            src="/media/home-hero.mp4"
            poster="/media/home-hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="w-full h-full min-h-0 object-cover"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />

      <div className="absolute inset-x-0 bottom-0 pb-16 md:pb-20 px-6 flex flex-col items-center text-center">
        <span className="font-playfair italic text-cream/85 text-xs md:text-sm tracking-[0.2em] mb-4">
          {t('home.heroEyebrow')}
        </span>
        <h1 className="font-bodoni uppercase text-cream text-3xl md:text-5xl tracking-[0.12em] leading-tight mb-8">
          {t('home.heroTitle')}
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            to="/products"
            className="font-bodoni uppercase text-plum bg-cream text-[11px] tracking-[0.25em] px-10 py-4 no-underline hover:opacity-90 transition-opacity"
          >
            {t('home.heroCta')}
          </Link>
          <Link
            to="/philosophy"
            className="font-bodoni uppercase text-cream border border-cream/80 text-[11px] tracking-[0.25em] px-10 py-4 no-underline hover:bg-cream hover:text-plum transition-colors"
          >
            {t('home.heroCta2')}
          </Link>
        </div>
      </div>
    </section>
  )
}
