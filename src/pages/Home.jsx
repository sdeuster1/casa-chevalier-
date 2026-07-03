import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import HeroSection from '../components/HeroSection'
import TextInterlude from '../components/TextInterlude'
import ThreeProducts from '../components/ThreeProducts'
import ShopTheLook from '../components/ShopTheLook'
import NewsCarousel from '../components/NewsCarousel'
import Footer from '../components/Footer'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <HeroSection />
      <TextInterlude text="Equestrian sartorial lifestyle made in Italy heritage." />
      <ThreeProducts />
      <TextInterlude text="From saddle to table." />
      <ShopTheLook />
      <NewsCarousel />
      <Footer />
    </div>
  )
}
