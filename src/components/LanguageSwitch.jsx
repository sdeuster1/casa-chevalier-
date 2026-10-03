import { useLanguage, LANGUAGES } from '../i18n/LanguageContext'

// "EN | IT" toggle. Inherits colour from its parent so it follows the navbar.
export default function LanguageSwitch({ className = '' }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className={`flex items-center gap-1.5 font-bodoni text-[10px] md:text-xs tracking-[0.15em] ${className}`} aria-label={t('lang.switchTo')}>
      {LANGUAGES.map((code, i) => (
        <span key={code} className="flex items-center gap-1.5">
          {i > 0 && <span className="opacity-40">|</span>}
          <button
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`bg-transparent border-none p-0 cursor-pointer text-inherit transition-opacity duration-300 ${
              lang === code ? 'opacity-100' : 'opacity-50 hover:opacity-80'
            }`}
          >
            {t(`lang.${code}`)}
          </button>
        </span>
      ))}
    </div>
  )
}
