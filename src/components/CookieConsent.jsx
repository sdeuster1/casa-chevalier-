import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useConsent, setConsent, COOKIE_SETTINGS_EVENT } from '../lib/analytics'

// Cookie banner: asks once, before any analytics cookie is set (see
// src/lib/analytics.js). Accept and Decline look the same on purpose, so
// neither is the "easy" choice. Reopened from the footer's Cookie settings.
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
    'flex-1 font-bodoni uppercase text-[10px] tracking-[0.2em] py-2 border border-plum text-plum bg-transparent cursor-pointer hover:bg-plum hover:text-cream transition-colors duration-300'

  // A small card in the bottom-right corner: noticeable without covering the page
  return (
    <section
      role="region"
      aria-label={t('cookies.label')}
      className="fixed bottom-3 right-3 w-[260px] max-w-[calc(100vw-24px)] z-[110] bg-cream border border-plum/30 shadow-[0_6px_24px_rgba(0,0,0,0.12)] p-4"
    >
      <p className="font-playfair text-dark/80 text-[12px] leading-relaxed m-0 mb-3">
        {t('cookies.text')}{' '}
        <Link to="/pages/cookie-policy" className="underline underline-offset-4 text-plum hover:opacity-70">
          {t('cookies.policy')}
        </Link>
      </p>
      <div className="flex gap-2">
        <button onClick={() => choose('denied')} className={button}>
          {t('cookies.decline')}
        </button>
        <button onClick={() => choose('granted')} className={button}>
          {t('cookies.accept')}
        </button>
      </div>
    </section>
  )
}
