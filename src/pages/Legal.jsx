import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import { fetchLegalBody } from '../lib/shopify'
import { legalDocumentFor } from '../lib/legal'

// Keep the document's structure, drop any styling that came with it
const clean = (html) =>
  DOMPurify.sanitize(html || '', {
    ALLOWED_TAGS: ['p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href'],
  })

// The English translations open with "In case of discrepancy, the Italian
// version prevails". Keep the note, but at the end of the document.
const translationNoteLast = (html) => {
  const note = html.match(/<p>(?:(?!<\/p>)[\s\S])*prevails(?:(?!<\/p>)[\s\S])*<\/p>/i)?.[0]
  return note ? html.replace(note, '') + note : html
}

export default function Legal() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { lang, t } = useLanguage()
  const doc = legalDocumentFor(pathname)
  // Results are keyed by document + language, so switching either shows the
  // loading state again instead of the previous text
  const [result, setResult] = useState({ key: null, html: '', failed: false })
  const key = doc ? `${doc.path}|${lang}` : null

  useEffect(() => {
    if (!doc) return
    let cancelled = false
    fetchLegalBody(doc)
      .then((body) => {
        // A missing or empty document shows the "unavailable" note, not a blank page
        const html = translationNoteLast(clean(body))
        if (!cancelled) setResult({ key, html, failed: !html.trim() })
      })
      .catch(() => !cancelled && setResult({ key, html: '', failed: true }))
    return () => { cancelled = true }
  }, [doc, key])

  const ready = result.key === key
  const title = doc ? doc.title[lang] ?? doc.title.en : ''

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-12 md:mb-16">
            {doc ? title : t('legal.notFound')}
          </h1>

          {doc && !ready && (
            <div className="flex flex-col gap-3 cc-fade-in" aria-hidden="true">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-3 bg-[#e5ded4]" style={{ width: `${90 - (i % 3) * 15}%` }} />
              ))}
            </div>
          )}
          {ready && result.failed && (
            <p className="font-playfair text-plum text-center text-[15px]">{t('legal.error')}</p>
          )}
          {ready && !result.failed && (
            <div
              className="cc-legal cc-rich-text font-playfair text-dark/75 text-[15px] md:text-[15px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: result.html }}
            />
          )}
          {!doc && (
            <p className="text-center">
              <Link to="/home" className="font-bodoni uppercase text-plum text-[13px] tracking-[0.2em] border-b border-plum pb-0.5 no-underline">
                {t('legal.backHome')}
              </Link>
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
