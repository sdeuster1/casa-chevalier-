/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  createCart,
  fetchCart,
  addCartLines,
  updateCartLine,
  removeCartLine,
} from '../lib/shopify'

const CartContext = createContext(null)
const CART_ID_KEY = 'cc_shopify_cart_id'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  // Restore an existing cart, or create a fresh one.
  useEffect(() => {
    let cancelled = false

    async function init() {
      const savedId = localStorage.getItem(CART_ID_KEY)
      try {
        if (savedId) {
          const existing = await fetchCart(savedId)
          // Shopify expires carts eventually; fall through to a new one.
          if (existing) {
            if (!cancelled) { setCart(existing); setLoading(false) }
            return
          }
        }
        const fresh = await createCart()
        localStorage.setItem(CART_ID_KEY, fresh.id)
        if (!cancelled) { setCart(fresh); setLoading(false) }
      } catch (err) {
        console.error('Cart init failed:', err)
        if (!cancelled) setLoading(false)
      }
    }

    init()
    return () => { cancelled = true }
  }, [])

  const addItem = useCallback(async (variantId, quantity = 1) => {
    if (!cart) return
    setBusy(true)
    try {
      const updated = await addCartLines(cart.id, variantId, quantity)
      setCart(updated)
    } catch (err) {
      console.error('Add to cart failed:', err)
      throw err
    } finally {
      setBusy(false)
    }
  }, [cart])

  const updateQuantity = useCallback(async (lineId, quantity) => {
    if (!cart) return
    setBusy(true)
    try {
      const updated = await updateCartLine(cart.id, lineId, quantity)
      setCart(updated)
    } catch (err) {
      console.error('Update quantity failed:', err)
    } finally {
      setBusy(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineId) => {
    if (!cart) return
    setBusy(true)
    try {
      const updated = await removeCartLine(cart.id, lineId)
      setCart(updated)
    } catch (err) {
      console.error('Remove from cart failed:', err)
    } finally {
      setBusy(false)
    }
  }, [cart])

  const value = {
    items: cart?.lines || [],
    itemCount: cart?.totalQuantity || 0,
    subtotal: cart?.subtotal || 0,
    total: cart?.total || 0,
    currency: cart?.currency || 'EUR',
    checkoutUrl: cart?.checkoutUrl || null,
    loading,
    busy,
    addItem,
    updateQuantity,
    removeItem,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
