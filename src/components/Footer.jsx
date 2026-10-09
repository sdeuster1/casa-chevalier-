import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { subscribeToNewsletter, PRIVACY_POLICY_URL } from '../lib/newsletter'
import { useLanguage } from '../i18n/LanguageContext'

const columns = [
  {
    title: 'getInTouch',
    links: [
      { label: 'contacts', to: '/contacts' },
      { label: 'faq', to: '/faq' },
    ],
  },
  {
    title: 'company',
    links: [
      { label: 'philosophy', to: '/philosophy' },
      { label: 'news', to: '/news' },
    ],
  },
]

export default function Footer() {
  const { t, lang } = useLanguage()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // hidden anti-spam field
  const [status, setStatus] = useState('idle') // idle | sending | done | invalid_email | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || status === 'sending') return
    setStatus('sending')
    const result = await subscribeToNewsletter({ email, locale: lang, source: 'footer', website })
    setStatus(result === 'ok' ? 'done' : result)
    if (result === 'ok') setEmail('')
  }
  return (
    <footer className="w-full bg-[#f99943] py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-10 md:gap-12">
        {/* Newsletter block */}
        <div className="md:flex-1 md:max-w-md">
          <h3 className="font-bodoni text-white text-base md:text-lg mb-2 uppercase tracking-[0.1em]">
            {t('footer.subscribeTitle')}
          </h3>
          <p className="font-playfair text-white/80 text-sm mb-1">
            {t('footer.subscribeOffer')}
          </p>
          <p className="font-playfair text-white/60 text-xs mb-6">
            {t('footer.subscribeNote')}
          </p>
          {status === 'done' ? (
            <p className="font-playfair italic text-white text-sm max-w-xs" role="status">
              {t('newsletter.codeOnWay')}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="relative max-w-xs">
              <div className="flex items-center border-b border-white">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  aria-label={t('footer.emailPlaceholder')}
                  className="bg-transparent text-white placeholder-white/50 font-playfair text-sm py-2 flex-1 outline-none border-none min-w-0"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-transparent border-none cursor-pointer p-2 disabled:opacity-50"
                  aria-label={t('footer.subscribe')}
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
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
              {(status === 'invalid_email' || status === 'error') && (
                <p className="font-playfair italic text-white text-xs mt-2" role="alert">
                  {t(status === 'invalid_email' ? 'newsletter.invalidEmail' : 'newsletter.error')}
                </p>
              )}
              <p className="font-playfair text-white/60 text-[11px] leading-relaxed mt-3">
                {t('newsletter.consent')}{' '}
                <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="underline text-white/80 hover:text-white">
                  {t('newsletter.privacy')}
                </a>
              </p>
            </form>
          )}
        </div>

        {/* Link columns — sit right next to Subscribe */}
        <div className="grid grid-cols-2 gap-8 md:gap-10">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-bodoni text-white uppercase text-xs md:text-sm mb-3 md:mb-4 tracking-[0.1em]">
                {t(`footer.${col.title}`)}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-playfair text-white/70 text-xs hover:text-white transition-colors duration-300 no-underline"
                    >
                      {t(`footer.${link.label}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 md:mt-12 pt-6 text-center">
        <p className="font-playfair text-white/50 text-xs">
          {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
