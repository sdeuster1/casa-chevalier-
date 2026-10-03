import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Monogram from './Monogram'
import { useLanguage } from '../i18n/LanguageContext'

const STORAGE_KEY = 'cc_newsletter_dismissed'

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { t } = useLanguage()

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    localStorage.setItem(STORAGE_KEY, 'true')
    setTimeout(close, 1800)
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

        <Monogram color="#c49fae" size={44} className="mb-6" />

        {submitted ? (
          <>
            <h2 className="font-bodoni uppercase text-cream text-xl tracking-[0.15em] mb-3">
              {t('newsletter.welcome')}
            </h2>
            <p className="font-playfair italic text-lilac text-sm">
              {t('newsletter.codeOnWay')}
            </p>
          </>
        ) : (
          <>
            <h2 className="font-bodoni uppercase text-cream text-xl md:text-2xl tracking-[0.15em] mb-3">
              {t('newsletter.title')}
            </h2>
            <p className="font-playfair italic text-lilac text-sm mb-8 max-w-xs">
              {t('newsletter.body')}
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.emailPlaceholder')}
                className="bg-transparent text-cream placeholder-cream/50 font-playfair text-sm py-2 w-full outline-none border-0 border-b border-cream/50 text-center"
              />
              <button
                type="submit"
                className="font-bodoni uppercase text-plum bg-cream text-xs tracking-[0.2em] py-3 px-6 cursor-pointer hover:opacity-90 transition-opacity duration-300"
              >
                {t('newsletter.claim')}
              </button>
            </form>

            <button
              onClick={close}
              className="mt-6 font-playfair text-lilac text-xs underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
            >
              {t('newsletter.decline')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
