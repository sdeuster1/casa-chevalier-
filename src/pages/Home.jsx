import { useState } from 'react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import HeroSection from '../components/HeroSection'
import TextInterlude from '../components/TextInterlude'
import FeaturedProducts from '../components/FeaturedProducts'
import ShopTheLook from '../components/ShopTheLook'
import Footer from '../components/Footer'
import NewsletterPopup from '../components/NewsletterPopup'
import InstagramFeed from '../components/InstagramFeed'
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
      <FeaturedProducts />
      <TextInterlude text={t('home.interlude2')} />
      <ShopTheLook />
      <InstagramFeed />
      <Footer />
    </div>
  )
}
