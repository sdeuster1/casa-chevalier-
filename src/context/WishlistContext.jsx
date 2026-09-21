/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useProducts } from './ProductsContext'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'cc_wishlist_v2'

export function WishlistProvider({ children }) {
  const { products } = useProducts()
  const [handles, setHandles] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(handles))
    } catch { /* ignore */ }
  }, [handles])

  const toggle = useCallback((handle) => {
    setHandles((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]
    )
  }, [])

  const remove = useCallback((handle) => {
    setHandles((prev) => prev.filter((h) => h !== handle))
  }, [])

  const has = useCallback((handle) => handles.includes(handle), [handles])

  // Resolve saved handles against the live catalog; products removed from
  // Shopify simply drop out of the wishlist.
  const items = handles
    .map((h) => products.find((p) => p.handle === h))
    .filter(Boolean)

  return (
    <WishlistContext.Provider value={{ items, handles, toggle, remove, has }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
