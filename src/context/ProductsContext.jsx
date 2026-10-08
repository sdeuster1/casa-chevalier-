/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { fetchProducts } from '../lib/shopify'
import { useLanguage } from '../i18n/LanguageContext'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const { lang } = useLanguage()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    // Refetched on language change so names and descriptions follow the switch.
    fetchProducts()
      .then((list) => {
        if (!cancelled) {
          setProducts(list)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Failed to load products from Shopify:', err)
          setError(err)
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [lang])

  // Categories derived from whatever collections actually exist in Shopify,
  // so a new collection appears in the filter with no code change.
  const categories = useMemo(() => {
    const found = [...new Set(products.map((p) => p.category))]
      .filter((c) => c && c !== 'ALL')
      .sort()
    return ['ALL', ...found]
  }, [products])

  const findProduct = (handle) => products.find((p) => p.handle === handle)

  // Other colours of the same piece ("The Stable Vest - Sand" ↔ "- Dark Chocolate")
  const colourVersions = (product) =>
    product
      ? products.filter((p) => p.baseName === product.baseName && p.handle !== product.handle)
      : []

  return (
    <ProductsContext.Provider
      value={{ products, categories, loading, error, findProduct, colourVersions }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
