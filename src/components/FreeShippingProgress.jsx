import { formatPrice } from '../lib/shopify'
import { useLanguage } from '../i18n/LanguageContext'

// Free shipping in Italy and the EU starts at €350 (most orders ship there).
// Keep in step with the shipping rates in Shopify and the FAQ text.
export const FREE_SHIPPING_EU = 350

// "You are €45 away from free shipping" with a thin bar that fills up,
// or "Your order ships free" once the bag reaches the threshold.
export default function FreeShippingProgress({ subtotal, currency, className = '' }) {
  const { t } = useLanguage()
  const total = Number(subtotal) || 0
  if (total <= 0) return null

  const missing = Math.max(FREE_SHIPPING_EU - total, 0)
  const share = Math.min(total / FREE_SHIPPING_EU, 1)

  return (
    <div className={className}>
      <p className="font-playfair text-plum text-sm">
        {missing > 0
          ? t('bag.freeShippingAway', { amount: formatPrice(missing, currency) })
          : t('bag.freeShippingReached')}
      </p>
      <div className="mt-2 h-[3px] w-full bg-plum/15" aria-hidden="true">
        <div className="h-full bg-plum transition-[width] duration-500" style={{ width: `${share * 100}%` }} />
      </div>
    </div>
  )
}
