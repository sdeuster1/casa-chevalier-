/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import {
  createCart,
  fetchCart,
  addCartLines,
  updateCartLine,
  removeCartLine,
} from '../lib/shopify'
import { useLanguage } from '../i18n/LanguageContext'
import { track, lineProps } from '../lib/analytics'

const CartContext = createContext(null)
const CART_ID_KEY = 'cc_shopify_cart_id'

export function CartProvider({ children }) {
  const { lang } = useLanguage()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  // Slide-in bag (CartDrawer), opened after adding a piece.
  const [drawerOpen, setDrawerOpen] = useState(false)

  // The cart as of right now (state lags a render) and the running load,
  // so adding to the bag can wait for the load instead of racing it.
  const cartRef = useRef(null)
  const loadRef = useRef(Promise.resolve())

  const applyCart = useCallback((next) => {
    cartRef.current = next
    setCart(next)
  }, [])

  // Use a new cart and remember it for the next visit
  const rememberCart = useCallback((next) => {
    localStorage.setItem(CART_ID_KEY, next.id)
    applyCart(next)
  }, [applyCart])

  // Restore an existing cart, or create a fresh one. Re-read on language
  // change so line titles and the checkout link follow the chosen language.
  useEffect(() => {
    let cancelled = false

    async function init() {
      const savedId = localStorage.getItem(CART_ID_KEY)
      try {
        if (savedId) {
          const existing = await fetchCart(savedId)
          // Shopify expires carts eventually; fall through to a new one.
          if (existing) {
            if (!cancelled) applyCart(existing)
            return
          }
        }
        const fresh = await createCart()
        // A run that was superseded (a quick language switch, or React's
        // double start in development) must not replace the cart in use.
        if (!cancelled) rememberCart(fresh)
      } catch (err) {
        console.error('Cart init failed:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadRef.current = init()
    return () => { cancelled = true }
  }, [lang, applyCart, rememberCart])

  // A new empty cart, remembered for the next visit
  const startFreshCart = useCallback(async () => {
    const fresh = await createCart()
    rememberCart(fresh)
    return fresh
  }, [rememberCart])

  // Shopify silently caps a line at available inventory rather than erroring,
  // so we compare what we asked for against what came back and report the gap.
  // If the cart never loaded, or Shopify no longer knows it (expired or already
  // checked out), a fresh one is started. Any other failure is thrown so the
  // product page shows an error instead of "Added".
  const addItem = useCallback(async (variantId, quantity = 1) => {
    setBusy(true)
    try {
      if (!cartRef.current) await loadRef.current
      let target = cartRef.current || (await startFreshCart())
      let updated
      try {
        updated = await addCartLines(target.id, variantId, quantity)
      } catch (err) {
        // Only start over when the cart itself is gone; a network error
        // must not throw away the pieces already in the bag.
        if (await fetchCart(target.id)) throw err
        target = await startFreshCart()
        updated = await addCartLines(target.id, variantId, quantity)
      }
      const before =
        target.lines.find((l) => l.variantId === variantId)?.quantity || 0
      applyCart(updated)

      const line = updated.lines.find((l) => l.variantId === variantId)
      const after = line?.quantity || 0
      const gained = after - before
      if (gained > 0) {
        track('added_to_bag', { ...lineProps(line, updated.currency), quantity: gained, source: 'product_page' })
      }
      return {
        capped: gained < quantity,
        added: gained,
        total: after,
      }
    } catch (err) {
      console.error('Add to cart failed:', err)
      throw err
    } finally {
      setBusy(false)
    }
  }, [applyCart, startFreshCart])

  const updateQuantity = useCallback(async (lineId, quantity) => {
    if (!cart) return { capped: false }
    setBusy(true)
    try {
      const updated = await updateCartLine(cart.id, lineId, quantity)
      applyCart(updated)
      const line = updated.lines.find((l) => l.lineId === lineId)
      // + and − in the bag count as adding and removing too
      const old = cart.lines.find((l) => l.lineId === lineId)
      const change = (line?.quantity || 0) - (old?.quantity || 0)
      if (old && change) {
        track(change > 0 ? 'added_to_bag' : 'removed_from_bag', {
          ...lineProps(line || old, updated.currency),
          quantity: Math.abs(change),
          source: 'bag',
        })
      }
      return { capped: Boolean(line) && line.quantity < quantity }
    } catch (err) {
      console.error('Update quantity failed:', err)
      return { capped: false }
    } finally {
      setBusy(false)
    }
  }, [cart, applyCart])

  const removeItem = useCallback(async (lineId) => {
    if (!cart) return
    setBusy(true)
    try {
      const updated = await removeCartLine(cart.id, lineId)
      applyCart(updated)
      const line = cart.lines.find((l) => l.lineId === lineId)
      if (line) {
        track('removed_from_bag', { ...lineProps(line, cart.currency), quantity: line.quantity, source: 'bag' })
      }
    } catch (err) {
      console.error('Remove from cart failed:', err)
    } finally {
      setBusy(false)
    }
  }, [cart, applyCart])

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

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
    drawerOpen,
    openDrawer,
    closeDrawer,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
