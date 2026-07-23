import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Splash from './pages/Splash'
import Home from './pages/Home'
import Products from './pages/Products'
import Contacts from './pages/Contacts'
import FAQ from './pages/FAQ'
import News from './pages/News'
import Philosophy from './pages/Philosophy'
import Shop from './pages/Shop'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'
import HorseTransition from './components/HorseTransition'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <HorseTransition />
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/news" element={<News />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
