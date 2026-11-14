import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useConsent, setConsent, COOKIE_SETTINGS_EVENT } from '../lib/analytics'

// Cookie banner: asks once, before any analytics cookie is set (see
// src/lib/analytics.js). "Accept and close" is the main, filled button;
// "Learn more" opens the Cookie Policy. Declining stays one click away as
// a small underlined link, always visible: the law requires refusing to be
// as quick as accepting, so it must never be hidden or removed.
// Reopened from the footer's Cookie settings.
export default function CookieConsent() {
  const consent = useConsent()
  const [reopened, setReopened] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const reopen = () => setReopened(true)
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  if (consent && !reopened) return null

  const choose = (choice) => {
    setConsent(choice)
    setReopened(false)
  }

  const button =
    'flex items-center justify-center whitespace-nowrap font-bodoni uppercase text-[9px] tracking-[0.15em] py-2 px-2 border border-plum cursor-pointer no-underline transition-colors duration-300'

  // A small card in the bottom-right corner: noticeable without covering the page
  return (
    <section
      role="region"
      aria-label={t('cookies.label')}
      className="fixed bottom-3 right-3 w-[280px] max-w-[calc(100vw-24px)] z-[110] bg-cream border border-plum/30 shadow-[0_6px_24px_rgba(0,0,0,0.12)] p-3.5"
    >
      <p className="font-playfair text-dark/80 text-[11px] leading-relaxed m-0 mb-3">
        {t('cookies.text')}
      </p>
      <div className="flex gap-2">
        <Link
          to="/pages/cookie-policy"
          className={`${button} flex-1 text-plum bg-transparent hover:bg-plum hover:text-cream`}
        >
          {t('cookies.learnMore')}
        </Link>
        <button
          onClick={() => choose('granted')}
          className={`${button} flex-[1.4] text-cream bg-plum hover:opacity-90`}
        >
          {t('cookies.accept')}
        </button>
      </div>
      <button
        onClick={() => choose('denied')}
        className="mt-2.5 p-0 bg-transparent border-none font-playfair text-[10px] text-dark/60 underline underline-offset-4 cursor-pointer hover:text-plum transition-colors"
      >
        {t('cookies.decline')}
      </button>
    </section>
  )
}
