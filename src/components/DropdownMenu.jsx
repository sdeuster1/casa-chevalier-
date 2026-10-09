import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitch from './LanguageSwitch'

const submenuItems = ['ALL', 'PANTS', 'SHIRTS', 'JACKETS', 'VESTS', 'ACCESSORIES']

const menuItems = [
  { key: 'collection', hasSubmenu: true, to: '/products' },
  { key: 'philosophy', hasSubmenu: false, to: '/philosophy' },
  { key: 'news', hasSubmenu: false, to: '/news' },
  { key: 'contacts', hasSubmenu: false, to: '/contacts' },
]

export default function DropdownMenu({ isOpen, onClose }) {
  const [activeSubmenu, setActiveSubmenu] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      setActiveSubmenu(!activeSubmenu)
      return
    }
    if (item.to) {
      onClose()
      navigate(item.to)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex" onClick={onClose}>
      {/* Side panel */}
      <div
        className="w-[85vw] max-w-[420px] h-full bg-plum flex flex-col justify-center px-10 md:px-14 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-transparent border-none cursor-pointer p-2"
          aria-label={t('menu.close')}
        >
          <X className="w-5 h-5 text-[#f0e9e0]" />
        </button>

        <div className="flex flex-col gap-6 md:gap-8">
          {menuItems.map((item) => (
            <div key={item.key} className="flex flex-col">
              <button
                className="font-bodoni uppercase text-[#f0e9e0] tracking-[0.15em] md:tracking-[0.2em] text-lg md:text-xl bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity duration-300 text-left flex items-center justify-between w-full"
                onClick={() => handleItemClick(item)}
              >
                {t(`menu.${item.key}`)}
                {item.hasSubmenu && (
                  <ChevronRight
                    className={`w-5 h-5 text-[#f0e9e0] transition-transform duration-300 ${activeSubmenu ? 'rotate-90' : ''}`}
                  />
                )}
              </button>
              {item.hasSubmenu && activeSubmenu && (
                <div className="flex flex-col gap-3 mt-4 pl-2">
                  {submenuItems.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        onClose()
                        // ALL goes to the unfiltered collection
                        navigate(
                          sub === 'ALL'
                            ? '/products'
                            : `/products?category=${encodeURIComponent(sub)}`
                        )
                      }}
                      className="font-playfair text-cream text-base cursor-pointer hover:opacity-70 transition-opacity duration-300 bg-transparent border-none p-0 text-left"
                    >
                      {t(`sections.${sub}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <LanguageSwitch className="absolute bottom-8 left-10 md:left-14 text-[#f0e9e0]" />
      </div>

      {/* Blurred overlay for right side */}
      <div className="flex-1 backdrop-blur-sm bg-black/30" />
    </div>
  )
}
