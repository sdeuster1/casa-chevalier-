import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Monogram from './Monogram'
import { useLanguage } from '../i18n/LanguageContext'
import { subscribeToNewsletter, PRIVACY_POLICY_URL } from '../lib/newsletter'

const STORAGE_KEY = 'cc_newsletter_dismissed'

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // hidden anti-spam field
  const [status, setStatus] = useState('idle') // idle | sending | done | invalid_email | error
  const { t, lang } = useLanguage()
  const submitted = status === 'done'

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed) return

    const timer = setTimeout(() => setIsOpen(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const close = () => {
    setIsOpen(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || status === 'sending') return
    setStatus('sending')
    const result = await subscribeToNewsletter({ email, locale: lang, source: 'popup', website })
    setStatus(result === 'ok' ? 'done' : result)
    if (result === 'ok') {
      localStorage.setItem(STORAGE_KEY, 'true')
      setTimeout(close, 2600)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-6"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md bg-plum px-8 md:px-12 py-12 md:py-14 flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 bg-transparent border-none cursor-pointer p-2"
          aria-label={t('newsletter.close')}
        >
          <X className="w-4 h-4 text-cream" />
        </button>

        <Monogram color="#f0e9e0" size={44} className="mb-6" />

        {submitted ? (
          <>
            <h2 className="font-bodoni uppercase text-cream text-xl tracking-[0.15em] mb-3">
              {t('newsletter.welcome')}
            </h2>
            <p className="font-playfair italic text-cream text-sm">
              {t('newsletter.codeOnWay')}
            </p>
          </>
        ) : (
          <>
            <h2 className="font-bodoni uppercase text-cream text-xl md:text-2xl tracking-[0.15em] mb-3">
              {t('newsletter.title')}
            </h2>
            <p className="font-playfair italic text-cream text-sm mb-8 max-w-xs">
              {t('newsletter.body')}
            </p>

            <form onSubmit={handleSubmit} className="relative w-full flex flex-col gap-6">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.emailPlaceholder')}
                className="bg-transparent text-cream placeholder-cream/50 font-playfair text-sm py-2 w-full outline-none border-0 border-b border-cream/50 text-center"
              />
              {/* Hidden from people; bots that fill it in are ignored */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="absolute -left-[9999px] w-px h-px opacity-0"
                aria-hidden="true"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="font-bodoni uppercase text-plum bg-cream text-xs tracking-[0.2em] py-3 px-6 cursor-pointer hover:opacity-90 transition-opacity duration-300 disabled:opacity-60"
              >
                {status === 'sending' ? t('newsletter.sending') : t('newsletter.claim')}
              </button>
              {(status === 'invalid_email' || status === 'error') && (
                <p className="font-playfair italic text-coral text-xs -mt-3" role="alert">
                  {t(status === 'invalid_email' ? 'newsletter.invalidEmail' : 'newsletter.error')}
                </p>
              )}
              <p className="font-playfair text-cream/55 text-[11px] leading-relaxed -mt-1">
                {t('newsletter.consent')}{' '}
                <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="underline text-cream/75 hover:text-cream">
                  {t('newsletter.privacy')}
                </a>
              </p>
            </form>

            <button
              onClick={close}
              className="mt-6 font-playfair text-cream text-xs underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
            >
              {t('newsletter.decline')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
