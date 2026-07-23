import jacket from '../assets/products/jacket.svg'
import blazer from '../assets/products/blazer.svg'
import shirt from '../assets/products/shirt.svg'
import vest from '../assets/products/vest.svg'
import pants from '../assets/products/pants.svg'
import belt from '../assets/products/belt.svg'
import breeches from '../assets/products/breeches.svg'

// Central product catalog. Categories mirror the DropdownMenu submenu.
export const products = [
  {
    id: 'equestrian-blazer',
    name: 'Equestrian Blazer',
    price: 890,
    category: 'JACKETS',
    image: blazer,
    description:
      'A structured single-breasted blazer cut from Italian virgin wool, with equestrian-inspired lapels.',
  },
  {
    id: 'field-jacket',
    name: 'Field Jacket',
    price: 1120,
    category: 'JACKETS',
    image: jacket,
    description:
      'A softly tailored field jacket, finished with horn buttons and a signature interior lining.',
  },
  {
    id: 'poplin-shirt',
    name: 'Poplin Shirt',
    price: 345,
    category: 'SHIRTS',
    image: shirt,
    description:
      'A refined poplin shirt with a spread collar, tailored in Como from long-staple cotton.',
  },
  {
    id: 'riders-vest',
    name: "Rider's Vest",
    price: 690,
    category: 'VESTS',
    image: vest,
    description:
      'A quilted riding vest, hand-finished in Tuscany with tonal saddle stitching.',
  },
  {
    id: 'bombacha',
    name: 'Bombacha Trousers',
    price: 520,
    category: 'PANTS',
    image: pants,
    description:
      'Softly gathered at the waist, our bombacha trousers pair heritage cut with a modern hand.',
  },
  {
    id: 'breeches',
    name: 'Classic Breeches',
    price: 480,
    category: 'PANTS',
    image: breeches,
    description:
      'Traditional riding breeches with reinforced knee panels, made in Italy.',
  },
  {
    id: 'riders-belt',
    name: "Rider's Belt",
    price: 380,
    category: 'ACCESSORIES',
    image: belt,
    description:
      'Full-grain Italian leather belt with an antique brass buckle and hand-burnished edges.',
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
