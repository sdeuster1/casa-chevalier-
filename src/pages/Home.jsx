import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import HeroSection from '../components/HeroSection'
import TextInterlude from '../components/TextInterlude'
import ThreeProducts from '../components/ThreeProducts'
import ShopTheLook from '../components/ShopTheLook'
import NewsCarousel from '../components/NewsCarousel'
import Footer from '../components/Footer'
import NewsletterPopup from '../components/NewsletterPopup'
import { useLanguage } from '../i18n/LanguageContext'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      <NewsletterPopup />
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="cream" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <HeroSection />
      <TextInterlude text={t('home.interlude1')} />
      <ThreeProducts />
      <TextInterlude text={t('home.interlude2')} />
      <ShopTheLook />
      <NewsCarousel />
      <Footer />
    </div>
  )
}
