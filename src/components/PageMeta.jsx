import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import { useLanguage } from '../i18n/LanguageContext'
import { legalDocumentFor } from '../lib/legal'

const SITE_URL = 'https://casachevalier.com'
const BRAND = 'Casa Chevalier'

// Pages kept out of search results: unfinished, personal or not a real page
const NO_INDEX = ['/news', '/shop', '/wishlist']

// Plain text for a search result: list items and paragraphs become
// sentences, tags go, and it is cut at a word to about 155 characters.
const snippet = (html) => {
  if (!html) return null
  const text = html
    .replace(/<\/(li|p|h\d)>|<br\s*\/?>/gi, '. ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*\.(\s*\.)+/g, '.')
    .replace(/\s+\./g, '.')
    .trim()
  return text.length <= 155 ? text : text.slice(0, 155).replace(/\s+\S*$/, '') + '…'
}

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// Per-page browser title, description, canonical address and robots rule.
// index.html holds the defaults; this updates them on every navigation.
export default function PageMeta() {
  const { pathname } = useLocation()
  const { products } = useProducts()
  const { t, lang } = useLanguage()

  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const defaultDescription = document.head
      .querySelector('meta[property="og:description"]')
      ?.getAttribute('content')

    let title = null
    let description = null
    let known = true

    if (path.startsWith('/product/')) {
      const product = products.find((p) => p.handle === path.slice('/product/'.length))
      if (product) {
        title = product.name
        description = snippet(product.shortDescription || product.descriptionHtml)
      }
    } else {
      const legal = legalDocumentFor(path)
      const titles = {
        '/products': t('products.title'),
        '/philosophy': t('philosophy.title'),
        '/faq': t('faq.eyebrow'),
        '/contacts': t('contacts.title'),
        '/news': t('news.title'),
        '/shop': t('bag.title'),
        '/wishlist': t('wishlist.title'),
      }
      if (legal) title = legal.title[lang] ?? legal.title.en
      else if (titles[path]) title = titles[path]
      else if (!['/', '/home'].includes(path)) known = false
    }

    document.title = title ? `${title} | ${BRAND}` : known
      ? `${BRAND} — In & beyond the saddle`
      : `${t('pageErrors.notFoundTitle')} | ${BRAND}`
    setMeta('meta[name="description"]', 'content', description || defaultDescription)
    setMeta('link[rel="canonical"]', 'href', SITE_URL + (path === '/' ? '/' : path))
    setMeta('meta[property="og:url"]', 'content', SITE_URL + path)

    // robots: noindex for hidden pages and the 404
    let robots = document.head.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', NO_INDEX.includes(path) || !known ? 'noindex' : 'index, follow')
  }, [pathname, products, t, lang])

  return null
}
