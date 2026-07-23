/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { findProduct } from '../data/products'

const CartContext = createContext(null)

const STORAGE_KEY = 'cc_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch { /* ignore quota errors */ }
  }, [items])

  const addItem = useCallback((productId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + qty } : i
        )
      }
      return [...prev, { productId, quantity: qty }]
    })
  }, [])

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.productId !== productId)
      return prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i))
    })
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const { detailedItems, itemCount, subtotal } = useMemo(() => {
    const detailed = items
      .map((i) => {
        const product = findProduct(i.productId)
        return product ? { ...i, product } : null
      })
      .filter(Boolean)

    return {
      detailedItems: detailed,
      itemCount: detailed.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: detailed.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }
  }, [items])

  const value = {
    items: detailedItems,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
