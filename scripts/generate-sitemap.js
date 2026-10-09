// ============================================================
//  Casa Chevalier — sitemap generator
// ============================================================
//  Runs before every build ("prebuild" in package.json), locally
//  and on Vercel. Writes public/sitemap.xml with the static pages
//  and every Shopify product. If Shopify can't be reached the
//  script exits with an error, so the build stops rather than
//  shipping a sitemap without products.
// ============================================================

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  SHOPIFY_ENDPOINT,
  SHOPIFY_STOREFRONT_TOKEN,
} from '../src/lib/shopifyConfig.js'

// Primary domain in Vercel (the only domain on the project).
const SITE_URL = 'https://casachevalier.com'

// Indexable pages. Excluded on purpose: / (splash), /shop, /wishlist, /account.
const STATIC_PATHS = [
  '/home', '/products', '/philosophy', '/news', '/faq', '/contacts',
  // Legal pages (src/lib/legal.js)
  '/policies/shipping-policy', '/policies/refund-policy', '/policies/terms-of-service',
  '/policies/privacy-policy', '/pages/cookie-policy', '/pages/accessibility-statement',
]

const OUTPUT = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url))

async function fetchAllProducts() {
  const products = []
  let after = null
  do {
    const res = await fetch(SHOPIFY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `query Sitemap($after: String) {
          products(first: 250, after: $after) {
            edges { node { handle updatedAt } }
            pageInfo { hasNextPage endCursor }
          }
        }`,
        variables: { after },
      }),
    })
    if (!res.ok) throw new Error(`Shopify request failed: ${res.status}`)
    const json = await res.json()
    if (json.errors?.length) {
      throw new Error(json.errors.map((e) => e.message).join('; '))
    }
    const page = json.data.products
    products.push(...page.edges.map((e) => e.node))
    after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null
  } while (after)
  return products
}

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function urlEntry(path, lastmod) {
  const loc = `    <loc>${escapeXml(SITE_URL + path)}</loc>`
  const mod = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
  return `  <url>\n${loc}${mod}\n  </url>`
}

try {
  const products = await fetchAllProducts()
  if (products.length === 0) throw new Error('Shopify returned no products')

  const entries = [
    ...STATIC_PATHS.map((p) => urlEntry(p)),
    ...products.map((p) =>
      urlEntry(`/product/${encodeURIComponent(p.handle)}`, p.updatedAt)
    ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`
  writeFileSync(OUTPUT, xml)
  console.log(`sitemap.xml: ${STATIC_PATHS.length} pages + ${products.length} products`)
} catch (err) {
  console.error(`Sitemap generation failed: ${err.message}`)
  process.exit(1)
}
