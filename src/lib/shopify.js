// ============================================================
//  Casa Chevalier — Shopify Storefront API client
// ============================================================
//  The Storefront access token is PUBLIC by design. It ships in
//  the browser bundle and only permits the read/cart scopes
//  enabled in the Headless channel. It is not an admin secret.
// ============================================================

const DOMAIN =
  import.meta.env.VITE_SHOPIFY_DOMAIN || 'casachevalier.myshopify.com'
const TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ||
  '6c89c607a3e3e705f11515d81d36cabb'
const API_VERSION = '2025-01'

const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`

// Language Shopify returns content in (Translate & Adapt translations).
// Every query declares $language and uses @inContext, so it applies to
// products, cart lines and the checkout. Falls back to the store default
// when a translation is missing.
let language = 'EN'
export function setShopifyLanguage(lang) {
  language = lang.toUpperCase()
}

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables: { ...variables, language } }),
  })

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status}`)
  }

  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }
  return json.data
}

// ---------- Fragments ----------

const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  descriptionHtml
  productType
  category { name }
  tags
  availableForSale
  options { name values }
  images(first: 10) { edges { node { url altText width height } } }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 50) {
    edges {
      node {
        id
        title
        availableForSale
        quantityAvailable
        selectedOptions { name value }
        price { amount currencyCode }
        image { url altText }
      }
    }
  }
  collections(first: 5) { edges { node { title handle } } }
  composizione: metafield(namespace: "custom", key: "composizione") { value }
`

// ---------- Category mapping ----------
// Menu sections are fixed keys (labels come from the translations file).
// Shopify returns taxonomy names in the requested language, so each section
// lists both the Italian and the English Shopify labels it covers.
// Add both names here when a new product category is introduced.
export const CATEGORY_MAP = {
  PANTS: ['PANTALONI', 'BOMBACHA', 'BREECHES', 'PANTS', 'TROUSERS'],
  SHIRTS: ['CAMICIE ELEGANTI', 'CAMICIE', 'POLO', 'SHIRTS', 'DRESS SHIRTS', 'POLOS'],
  JACKETS: ['BLAZER', 'GIACCHE', 'GIACCA', 'JACKETS', 'BLAZERS'],
  VESTS: ['GILET', 'VESTS'],
  ACCESSORIES: ['CINTURE', 'CINTURA', 'ACCESSORI', 'ACCESSORIES', 'BELTS'],
}

// The English section a set of Shopify labels belongs to, if any.
function sectionFor(labels) {
  for (const [section, members] of Object.entries(CATEGORY_MAP)) {
    if (labels.some((l) => members.includes(l))) return section
  }
  return null
}

// True when a product belongs in the given English section.
export function matchesCategory(product, section) {
  if (!section || section === 'ALL') return true
  const wanted = CATEGORY_MAP[section] || [section]
  return (product.categoryTags || []).some((l) => wanted.includes(l))
}

// ---------- Normalisation ----------
// Flattens Shopify's edges/node shape into the flat objects our
// components already expect, so the UI layer stays unchanged.

function normalizeProduct(node) {
  if (!node) return null

  const images = node.images.edges.map((e) => e.node.url)
  const variants = node.variants.edges.map((e) => ({
    id: e.node.id,
    title: e.node.title,
    available: e.node.availableForSale,
    quantity: e.node.quantityAvailable,
    price: parseFloat(e.node.price.amount),
    options: Object.fromEntries(
      e.node.selectedOptions.map((o) => [o.name, o.value])
    ),
    image: e.node.image?.url || null,
  }))

  const sizeOption = node.options.find(
    (o) => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'taglia'
  )

  // Category: prefer a real collection, fall back to productType.
  // Shopify's auto-created "Home page" collection isn't a real category.
  const collectionTitles = node.collections.edges
    .map((e) => e.node.title)
    .filter((t) => t && t.toLowerCase() !== 'home page')
  const taxonomy = node.category?.name
  const category = (taxonomy || collectionTitles[0] || node.productType || 'UNCATEGORISED').toUpperCase()

  // Every label this product could legitimately be filtered by
  const categoryTags = [
    taxonomy,
    ...collectionTitles,
    node.productType,
    ...node.tags,
  ]
    .filter(Boolean)
    .map((t) => t.toUpperCase())

  return {
    id: node.handle,           // handle is the human-readable URL id
    shopifyId: node.id,
    name: node.title,
    handle: node.handle,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    // custom.composizione (multi-line text); null when not filled in
    composition: node.composizione?.value?.trim() || null,
    category,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    currency: node.priceRange.minVariantPrice.currencyCode,
    image: images[0] || null,
    images,
    sizes: sizeOption ? sizeOption.values : [],
    hasSizes: Boolean(sizeOption),
    variants,
    availableForSale: node.availableForSale,
    tags: node.tags,
    categoryTags,
    section: sectionFor(categoryTags) || category,
  }
}

// ---------- Products ----------

export async function fetchProducts(first = 100) {
  const data = await shopifyFetch(
    `query Products($first: Int!, $language: LanguageCode) @inContext(language: $language) {
      products(first: $first) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }`,
    { first }
  )
  return data.products.edges.map((e) => normalizeProduct(e.node)).filter(Boolean)
}

export async function fetchProductByHandle(handle) {
  const data = await shopifyFetch(
    `query Product($handle: String!, $language: LanguageCode) @inContext(language: $language) {
      product(handle: $handle) { ${PRODUCT_FIELDS} }
    }`,
    { handle }
  )
  return normalizeProduct(data.product)
}

// ---------- Cart ----------

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            quantityAvailable
            availableForSale
            price { amount currencyCode }
            image { url }
            selectedOptions { name value }
            product { title handle }
          }
        }
      }
    }
  }
`

function normalizeCart(cart) {
  if (!cart) return null
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: parseFloat(cart.cost.subtotalAmount.amount),
    total: parseFloat(cart.cost.totalAmount.amount),
    currency: cart.cost.totalAmount.currencyCode,
    lines: cart.lines.edges.map((e) => ({
      lineId: e.node.id,
      quantity: e.node.quantity,
      variantId: e.node.merchandise.id,
      variantTitle: e.node.merchandise.title,
      available: e.node.merchandise.quantityAvailable,
      inStock: e.node.merchandise.availableForSale,
      size:
        e.node.merchandise.selectedOptions.find(
          (o) => ['size', 'taglia'].includes(o.name.toLowerCase())
        )?.value || null,
      price: parseFloat(e.node.merchandise.price.amount),
      image: e.node.merchandise.image?.url || null,
      productTitle: e.node.merchandise.product.title,
      productHandle: e.node.merchandise.product.handle,
    })),
  }
}

export async function createCart() {
  const data = await shopifyFetch(
    `mutation Create($language: LanguageCode) @inContext(language: $language) { cartCreate { cart { ${CART_FIELDS} } userErrors { message } } }`
  )
  return normalizeCart(data.cartCreate.cart)
}

export async function fetchCart(cartId) {
  const data = await shopifyFetch(
    `query Cart($id: ID!, $language: LanguageCode) @inContext(language: $language) { cart(id: $id) { ${CART_FIELDS} } }`,
    { id: cartId }
  )
  return normalizeCart(data.cart)
}

export async function addCartLines(cartId, variantId, quantity = 1) {
  const data = await shopifyFetch(
    `mutation Add($cartId: ID!, $lines: [CartLineInput!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] }
  )
  const errs = data.cartLinesAdd.userErrors
  if (errs?.length) throw new Error(errs.map((e) => e.message).join('; '))
  return normalizeCart(data.cartLinesAdd.cart)
}

export async function updateCartLine(cartId, lineId, quantity) {
  const data = await shopifyFetch(
    `mutation Update($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  )
  const errs = data.cartLinesUpdate.userErrors
  if (errs?.length) throw new Error(errs.map((e) => e.message).join('; '))
  return normalizeCart(data.cartLinesUpdate.cart)
}

export async function removeCartLine(cartId, lineId) {
  const data = await shopifyFetch(
    `mutation Remove($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }`,
    { cartId, lineIds: [lineId] }
  )
  const errs = data.cartLinesRemove.userErrors
  if (errs?.length) throw new Error(errs.map((e) => e.message).join('; '))
  return normalizeCart(data.cartLinesRemove.cart)
}


export const formatPrice = (n, currency = 'EUR') =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(n)
