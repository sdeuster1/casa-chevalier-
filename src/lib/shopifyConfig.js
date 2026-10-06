// ============================================================
//  Casa Chevalier — Shopify Storefront config
// ============================================================
//  Shared by the browser client (src/lib/shopify.js) and the
//  Node build scripts (scripts/generate-sitemap.js).
//
//  The Storefront access token is PUBLIC by design. It ships in
//  the browser bundle and only permits the read/cart scopes
//  enabled in the Headless channel. It is not an admin secret.
// ============================================================

// Vite provides import.meta.env in the browser; Node scripts use process.env.
const env = import.meta.env ?? globalThis.process?.env ?? {}

export const SHOPIFY_DOMAIN =
  env.VITE_SHOPIFY_DOMAIN || 'casachevalier.myshopify.com'
export const SHOPIFY_STOREFRONT_TOKEN =
  env.VITE_SHOPIFY_STOREFRONT_TOKEN || '6c89c607a3e3e705f11515d81d36cabb'
export const SHOPIFY_API_VERSION = '2025-01'

export const SHOPIFY_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`
