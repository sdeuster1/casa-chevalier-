import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Splash from './pages/Splash'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Contacts from './pages/Contacts'
import FAQ from './pages/FAQ'
import News from './pages/News'
import Philosophy from './pages/Philosophy'
import Shop from './pages/Shop'
import Wishlist from './pages/Wishlist'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import HorseTransition from './components/HorseTransition'
import ScrollToTop from './components/ScrollToTop'
import CartDrawer from './components/CartDrawer'
import ErrorBoundary from './components/ErrorBoundary'
import PageMeta from './components/PageMeta'
import CookieConsent from './components/CookieConsent'
import { ProductsProvider } from './context/ProductsContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { LanguageProvider } from './i18n/LanguageContext'
import { isInternalVisit } from './lib/analytics'

// Shopify's own storefront uses /products/<handle>; old or shared links of
// that shape land on our product page instead of the 404.
function ShopifyProductLink() {
  const { handle } = useParams()
  return <Navigate to={`/product/${handle}`} replace />
}

// The team's own visits stay out of the analytics (?internal=1, see
// src/lib/analytics.js)
const skipInternalVisits = (event) => (isInternalVisit() ? null : event)

// Everything that renders inside one safety net, reset on every navigation
function Pages() {
  const { pathname } = useLocation()
  return (
    <ErrorBoundary resetKey={pathname}>
      <ScrollToTop />
      <PageMeta />
      <HorseTransition />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/news" element={<News />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/shop" element={<Shop />} />
        {/* No customer accounts yet: old links go to the homepage */}
        <Route path="/account" element={<Navigate to="/home" replace />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/policies/:handle" element={<Legal />} />
        <Route path="/pages/:handle" element={<Legal />} />
        {/* Shopify-style addresses */}
        <Route path="/products/:handle" element={<ShopifyProductLink />} />
        <Route path="/collections/*" element={<Navigate to="/products" replace />} />
        <Route path="/cart" element={<Navigate to="/shop" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <Pages />
            </WishlistProvider>
            {/* Vercel Web Analytics: cookieless page views, counted on every
                page change. Only active on the deployed site, not locally. */}
            <Analytics beforeSend={skipInternalVisits} />
            {/* Asks before PostHog runs; Vercel Analytics needs no consent */}
            <CookieConsent />
          </CartProvider>
        </ProductsProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
