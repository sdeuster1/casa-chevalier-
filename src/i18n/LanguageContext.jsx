/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import translations from './translations'
import { setShopifyLanguage } from '../lib/shopify'

export const LANGUAGES = ['en', 'it']
const STORAGE_KEY = 'cc_lang'

const LanguageContext = createContext(null)

// A saved choice wins; otherwise Italian browsers get Italian, everyone else English.
function initialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.includes(saved)) return saved
  } catch { /* ignore */ }
  const browser = typeof navigator !== 'undefined' ? navigator.language || '' : ''
  return browser.toLowerCase().startsWith('it') ? 'it' : 'en'
}

const lookup = (dict, key) => key.split('.').reduce((o, k) => o?.[k], dict)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const initial = initialLanguage()
    setShopifyLanguage(initial)
    return initial
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return
    // Set before state changes so the refetch it triggers uses the new language.
    setShopifyLanguage(next)
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch { /* ignore */ }
  }, [])

  // t('footer.subscribe') → string; t('faq.items') → array.
  // Missing Italian keys fall back to English, missing keys to the key itself.
  // {name} placeholders are filled from vars.
  const t = useCallback(
    (key, vars) => {
      let value = lookup(translations[lang], key) ?? lookup(translations.en, key) ?? key
      if (typeof value === 'string' && vars) {
        value = value.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
      }
      return value
    },
    [lang]
  )

  // Menu section label (PANTS → PANTALONI); unmapped Shopify categories
  // show their own name, which Shopify already returns in the right language.
  const sectionLabel = useCallback(
    (section) => lookup(translations[lang], `sections.${section}`) ?? section,
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, sectionLabel }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
