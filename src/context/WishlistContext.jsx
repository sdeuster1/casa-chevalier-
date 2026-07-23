/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { findProduct } from '../data/products'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'cc_wishlist_v1'

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch { /* ignore */ }
  }, [ids])

  const toggle = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const remove = useCallback((id) => {
    setIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const has = useCallback((id) => ids.includes(id), [ids])

  const items = ids.map(findProduct).filter(Boolean)

  return (
    <WishlistContext.Provider value={{ items, ids, toggle, remove, has }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
