import { useState } from 'react'
import { X } from 'lucide-react'

const submenuItems = ['PANTS', 'SHIRTS', 'JACKETS', 'VESTS', 'ACCESSORIES']

const menuItems = [
  { label: 'THE CAPSULE COLLECTION', hasSubmenu: false },
  { label: 'SHOP ALL', hasSubmenu: true },
  { label: 'OUR PHILOSOPHY', hasSubmenu: false },
  { label: 'CC NEWS', hasSubmenu: false },
  { label: 'CONTACTS', hasSubmenu: false },
]

export default function DropdownMenu({ isOpen, onClose }) {
  const [activeSubmenu, setActiveSubmenu] = useState(false)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-plum z-[60] flex flex-col items-center justify-center overflow-y-auto"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 left-4 md:left-10 bg-transparent border-none cursor-pointer p-2"
        aria-label="Close menu"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div
        className="flex flex-col items-center gap-6 md:gap-8 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {menuItems.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <button
              className="font-bodoni uppercase text-white tracking-[0.15em] md:tracking-[0.2em] text-lg md:text-2xl bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity duration-300"
              onClick={() => item.hasSubmenu && setActiveSubmenu(!activeSubmenu)}
              onMouseEnter={() => item.hasSubmenu && window.innerWidth > 768 && setActiveSubmenu(true)}
              onMouseLeave={() => item.hasSubmenu && window.innerWidth > 768 && setActiveSubmenu(false)}
            >
              {item.label}
            </button>
            {item.hasSubmenu && activeSubmenu && (
              <div
                className="flex flex-col items-center gap-3 mt-4"
                onMouseEnter={() => window.innerWidth > 768 && setActiveSubmenu(true)}
                onMouseLeave={() => window.innerWidth > 768 && setActiveSubmenu(false)}
              >
                {submenuItems.map((sub) => (
                  <span
                    key={sub}
                    className="font-playfair text-lilac text-base md:text-lg cursor-pointer hover:text-white transition-colors duration-300"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
