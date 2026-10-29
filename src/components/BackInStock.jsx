import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { requestBackInStock, PRIVACY_POLICY_URL } from '../lib/newsletter'
import { track } from '../lib/analytics'

// Product page, under the Sold Out button: leave an email to hear when this
// size (or a one-size piece) is back. Saved in Shopify → Customers with the
// tag back-in-stock-<handle>-<size>; no newsletter sign-up.
export default function BackInStock({ product, size }) {
  const { t, lang } = useLanguage()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // hidden anti-spam field
  const [status, setStatus] = useState('idle') // idle | sending | done | invalid_email | error
  const [sentFor, setSentFor] = useState(null)

  // Switching to another sold-out size starts a fresh form
  const done = status === 'done' && sentFor === `${product.handle}/${size}`
  const withSize = product.hasSizes && size

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || status === 'sending') return
    setStatus('sending')
    const result = await requestBackInStock({
      email, locale: lang, product: product.handle, size: size || 'one-size', website,
    })
    setStatus(result === 'ok' ? 'done' : result)
    if (result === 'ok') {
      setSentFor(`${product.handle}/${size}`)
      setEmail('')
      // Which piece and size people wait for; never the address
      track('back_in_stock_requested', { product_handle: product.handle, product_title: product.name, size })
    }
  }

  if (done) {
    return (
      <p className="font-playfair text-plum text-[15px] leading-relaxed mt-4" role="status">
        {withSize ? t('product.backInStock.sentSize', { size }) : t('product.backInStock.sent')}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-5">
      <p className="font-bodoni uppercase text-plum text-[13px] tracking-[0.15em] mb-1">
        {withSize ? t('product.backInStock.titleSize', { size }) : t('product.backInStock.title')}
      </p>
      <p className="font-playfair text-dark/75 text-[15px] leading-relaxed mb-3">
        {t('product.backInStock.body')}
      </p>
      <div className="flex items-stretch gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletter.emailPlaceholder')}
          aria-label={t('newsletter.emailPlaceholder')}
          className="flex-1 min-w-0 bg-transparent border border-plum/30 focus:border-plum outline-none font-playfair text-[15px] text-dark placeholder-dark/40 px-3 py-3"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="shrink-0 border border-plum bg-transparent text-plum font-bodoni uppercase text-[12px] tracking-[0.2em] px-4 cursor-pointer hover:bg-plum hover:text-cream transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? t('newsletter.sending') : t('product.backInStock.notify')}
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
        <p className="font-playfair text-coral text-sm mt-2" role="alert">
          {t(status === 'invalid_email' ? 'newsletter.invalidEmail' : 'newsletter.error')}
        </p>
      )}
      <p className="font-playfair text-dark/55 text-[13px] leading-relaxed mt-2">
        {t('product.backInStock.consent')}{' '}
        <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="underline text-dark/70 hover:text-plum">
          {t('newsletter.privacy')}
        </a>
      </p>
    </form>
  )
}
