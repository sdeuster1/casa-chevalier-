/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { findProduct } from '../data/products'

const CartContext = createContext(null)

const STORAGE_KEY = 'cc_cart_v2'

// A line item is uniquely identified by productId + size.
const lineKey = (productId, size) => `${productId}__${size || 'ONE'}`

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

  const addItem = useCallback((productId, qty = 1, size = null) => {
    setItems((prev) => {
      const key = lineKey(productId, size)
      const existing = prev.find((i) => lineKey(i.productId, i.size) === key)
      if (existing) {
        return prev.map((i) =>
          lineKey(i.productId, i.size) === key
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      }
      return [...prev, { productId, size, quantity: qty }]
    })
  }, [])

  const removeItem = useCallback((productId, size = null) => {
    const key = lineKey(productId, size)
    setItems((prev) => prev.filter((i) => lineKey(i.productId, i.size) !== key))
  }, [])

  const updateQuantity = useCallback((productId, qty, size = null) => {
    const key = lineKey(productId, size)
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => lineKey(i.productId, i.size) !== key)
      return prev.map((i) =>
        lineKey(i.productId, i.size) === key ? { ...i, quantity: qty } : i
      )
    })
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const { detailedItems, itemCount, subtotal } = useMemo(() => {
    const detailed = items
      .map((i) => {
        const product = findProduct(i.productId)
        return product ? { ...i, product, key: lineKey(i.productId, i.size) } : null
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
