import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { CONVERSIONS, COLUMNS, TEXT } from '../data/sizeGuide'

// "Size guide" link + panel. Sized products get the conversion chart,
// one-size products the general one-size note. Content and text come from
// src/data/sizeGuide.js; the layout follows the Casa Chevalier size guide PDF.
export default function SizeGuide({ guide }) {
  const [open, setOpen] = useState(false)
  const { lang } = useLanguage()
  const tx = (entry) => entry[lang] ?? entry.en

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 font-bodoni uppercase text-plum text-[12px] tracking-[0.2em] border-0 border-b border-plum pb-0.5 bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
      >
        {tx(TEXT.link)}
      </button>
      {open && <SizeGuidePanel guide={guide} tx={tx} onClose={() => setOpen(false)} />}
    </>
  )
}

function SizeGuidePanel({ guide, tx, onClose }) {
  const closeRef = useRef(null)

  // Esc closes; page scroll is locked while open; focus starts on the close button
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (guide.type === 'oneSize') {
    return (
      <PanelShell titleText={tx(TEXT.oneSizeTitle)} closeLabel={tx(TEXT.close)} closeRef={closeRef} onClose={onClose}>
        {guide.fit && (
          <p className="font-playfair text-dark text-[15px] leading-relaxed mb-3">
            {tx(guide.fit)}
          </p>
        )}
        <p className="font-playfair text-dark/75 text-[15px] leading-relaxed">
          {tx(guide.general || TEXT.oneSizeGeneral)}
        </p>
      </PanelShell>
    )
  }

  const sizes = guide.sizes
  const sizeList = (
    <>
      {sizes.map((s, i) => (
        <span key={s}>
          {i > 0 && (i === sizes.length - 1 ? ` ${tx(TEXT.and)} ` : ', ')}
          <strong className="font-bold text-dark">{s}</strong>
        </span>
      ))}
    </>
  )

  return (
    <PanelShell titleText={tx(TEXT.title)} closeLabel={tx(TEXT.close)} closeRef={closeRef} onClose={onClose}>
        <p className="font-playfair text-dark/75 text-[15px] leading-relaxed mb-8">
          {tx(TEXT.intro)}
        </p>

        <h3 className="font-bodoni font-bold uppercase text-plum text-sm md:text-base tracking-[0.12em] mb-2">
          {guide.name}
        </h3>
        <p className="font-playfair text-dark/75 text-[15px] mb-5">
          {tx(TEXT.available)} {sizeList}.
        </p>

        {/* Conversion chart — fixed layout so five columns always fit the width */}
        <table className="w-full table-fixed border-collapse font-playfair text-[15px] text-center">
          <thead>
            <tr className="bg-plum">
              {COLUMNS.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="font-bold uppercase text-white tracking-[0.1em] py-2.5 px-1 border border-[#e2dcd5]"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.map((it, i) => (
              <tr key={it} className={i % 2 ? 'bg-[#f7f4f0]' : 'bg-white'}>
                <th scope="row" className="font-bold text-dark py-2.5 px-1 border border-[#e2dcd5]">
                  {it}
                </th>
                {COLUMNS.slice(1).map((c) => (
                  <td key={c} className="text-dark/80 py-2.5 px-1 border border-[#e2dcd5]">
                    {CONVERSIONS[it][c]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {guide.fit && (
          <p className="font-playfair text-[15px] leading-relaxed mt-6">
            <strong className="font-bold text-dark">{tx(TEXT.fitLabel)}</strong>{' '}
            <span className="text-dark/70">{tx(guide.fit)}</span>
          </p>
        )}
        <p className="font-playfair text-dark/70 text-sm leading-relaxed mt-4">
          {tx(TEXT.closing)}
        </p>
    </PanelShell>
  )
}

// Overlay, white card, close button and title shared by both panels
function PanelShell({ titleText, closeLabel, closeRef, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm md:px-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl overflow-y-auto bg-white px-6 md:px-12 pt-16 pb-10 md:py-14"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none cursor-pointer p-2"
          aria-label={closeLabel}
        >
          <X className="w-5 h-5 text-plum" strokeWidth={1.5} />
        </button>

        <h2
          id="size-guide-title"
          className="font-bodoni uppercase text-plum text-xl md:text-2xl tracking-[0.15em] mb-4"
        >
          {titleText}
        </h2>
        {children}
      </div>
    </div>
  )
}
