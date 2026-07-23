import blazer from '../assets/products/blazer.svg'
import blazer2 from '../assets/products/blazer-2.svg'
import blazer3 from '../assets/products/blazer-3.svg'
import jacket from '../assets/products/jacket.svg'
import jacket2 from '../assets/products/jacket-2.svg'
import jacket3 from '../assets/products/jacket-3.svg'
import shirt from '../assets/products/shirt.svg'
import shirt2 from '../assets/products/shirt-2.svg'
import shirt3 from '../assets/products/shirt-3.svg'
import vest from '../assets/products/vest.svg'
import vest2 from '../assets/products/vest-2.svg'
import vest3 from '../assets/products/vest-3.svg'
import pants from '../assets/products/pants.svg'
import pants2 from '../assets/products/pants-2.svg'
import pants3 from '../assets/products/pants-3.svg'
import breeches from '../assets/products/breeches.svg'
import breeches2 from '../assets/products/breeches-2.svg'
import breeches3 from '../assets/products/breeches-3.svg'
import belt from '../assets/products/belt.svg'
import belt2 from '../assets/products/belt-2.svg'
import belt3 from '../assets/products/belt-3.svg'

const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL']
const PANTS_SIZES = ['44', '46', '48', '50', '52']
const BELT_SIZES = ['85', '90', '95', '100']

// Central product catalog. Categories mirror the DropdownMenu submenu.
// `image` is the primary; `images` is the full gallery for the product detail page.
export const products = [
  {
    id: 'equestrian-blazer',
    name: 'Equestrian Blazer',
    price: 890,
    category: 'JACKETS',
    image: blazer,
    images: [blazer, blazer2, blazer3],
    sizes: APPAREL_SIZES,
    description:
      'A structured single-breasted blazer cut from Italian virgin wool, with equestrian-inspired lapels.',
    details:
      'Cut from a virgin wool woven in Biella and lined in cupro. Natural horn buttons and a single back vent. Tailored in Italy.',
    composition: '100% virgin wool. Lining: 100% cupro. Dry clean only.',
  },
  {
    id: 'field-jacket',
    name: 'Field Jacket',
    price: 1120,
    category: 'JACKETS',
    image: jacket,
    images: [jacket, jacket2, jacket3],
    sizes: APPAREL_SIZES,
    description:
      'A softly tailored field jacket, finished with horn buttons and a signature interior lining.',
    details:
      'A relaxed field silhouette with four utility pockets, a two-way front closure and a printed interior lining. Made in Italy.',
    composition: '98% cotton, 2% elastane. Dry clean only.',
  },
  {
    id: 'poplin-shirt',
    name: 'Poplin Shirt',
    price: 345,
    category: 'SHIRTS',
    image: shirt,
    images: [shirt, shirt2, shirt3],
    sizes: APPAREL_SIZES,
    description:
      'A refined poplin shirt with a spread collar, tailored in Como from long-staple cotton.',
    details:
      'Woven in Como from long-staple cotton poplin. Spread collar, mother-of-pearl buttons and a curved hem. Made in Italy.',
    composition: '100% cotton. Machine wash cold, iron warm.',
  },
  {
    id: 'riders-vest',
    name: "Rider's Vest",
    price: 690,
    category: 'VESTS',
    image: vest,
    images: [vest, vest2, vest3],
    sizes: APPAREL_SIZES,
    description:
      'A quilted riding vest, hand-finished in Tuscany with tonal saddle stitching.',
    details:
      'A diamond-quilted vest with a stand collar, snap closure and tonal saddle stitching. Hand-finished in Tuscany.',
    composition: 'Shell: 100% cotton. Fill: 90% down, 10% feather.',
  },
  {
    id: 'bombacha',
    name: 'Bombacha Trousers',
    price: 520,
    category: 'PANTS',
    image: pants,
    images: [pants, pants2, pants3],
    sizes: PANTS_SIZES,
    description:
      'Softly gathered at the waist, our bombacha trousers pair heritage cut with a modern hand.',
    details:
      'A modern take on the traditional gaucho bombacha, softly pleated at the waist and tapered below the knee. Made in Italy.',
    composition: '100% cotton gabardine. Machine wash cold.',
  },
  {
    id: 'breeches',
    name: 'Classic Breeches',
    price: 480,
    category: 'PANTS',
    image: breeches,
    images: [breeches, breeches2, breeches3],
    sizes: PANTS_SIZES,
    description:
      'Traditional riding breeches with reinforced knee panels, made in Italy.',
    details:
      'Full-seat riding breeches with reinforced knee panels and a contoured waistband. Made in Italy.',
    composition: '92% cotton, 8% elastane. Machine wash cold.',
  },
  {
    id: 'riders-belt',
    name: "Rider's Belt",
    price: 380,
    category: 'ACCESSORIES',
    image: belt,
    images: [belt, belt2, belt3],
    sizes: BELT_SIZES,
    description:
      'Full-grain Italian leather belt with an antique brass buckle and hand-burnished edges.',
    details:
      'Full-grain leather from a Tuscan tannery, with an antique brass buckle and hand-burnished edges. Made in Italy.',
    composition: '100% calf leather. Solid brass hardware.',
  },
]

export const categories = ['ALL', 'JACKETS', 'SHIRTS', 'VESTS', 'PANTS', 'ACCESSORIES']

export const formatPrice = (n) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)

export const findProduct = (id) => products.find((p) => p.id === id)
