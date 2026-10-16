import { Link } from 'react-router-dom'
import { sizedImage } from '../lib/shopify'
import { swatchFor } from '../data/colours'

// Swatch size, and the gap down to the line marking the current colour
const SIZES = {
  xs: { swatch: 'w-4 h-[7px]', gap: 'pb-[3px]', row: 'gap-1.5' }, // beside the colour name on cards
  sm: { swatch: 'w-[22px] h-[14px]', gap: 'pb-[5px]', row: 'gap-2' },
  md: { swatch: 'w-9 h-6', gap: 'pb-[5px]', row: 'gap-2' }, // product page
}

// One plain rectangle per colour of a piece; the colour being shown is
// marked with a thin line underneath (Vitovi style). Each opens that colour.
// A colour without a hex in src/data/colours.js shows its product photo.
export default function ColourSwatches({ colours, currentHandle, size = 'sm', replace = false, className = '' }) {
  return (
    <div className={`flex ${SIZES[size].row} ${className}`}>
      {colours.map((c) => {
        const current = c.handle === currentHandle
        const hex = swatchFor(c.colour)
        return (
          <Link
            key={c.handle}
            to={`/product/${c.handle}`}
            replace={replace}
            aria-label={c.colour}
            aria-current={current ? 'true' : undefined}
            title={c.colour}
            className={`block ${SIZES[size].gap} border-b transition-colors ${
              current ? 'border-plum' : 'border-transparent hover:border-plum/30'
            }`}
          >
            <span
              className={`block ${SIZES[size].swatch} bg-[#e5ded4] bg-cover bg-center`}
              style={hex ? { backgroundColor: hex } : { backgroundImage: `url(${sizedImage(c.image, 120)})` }}
            />
          </Link>
        )
      })}
    </div>
  )
}
