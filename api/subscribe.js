// ============================================================
//  Casa Chevalier — newsletter sign-up (Vercel serverless function)
// ============================================================
//  POST /api/subscribe  { email, locale, source, website }
//
//  Saves the sign-up in Shopify → Customers: creates the customer
//  (or finds the existing one by email), records email-marketing
//  consent and adds the tags "newsletter" + the form it came from.
//  Shopify Email's "Welcome new subscriber" automation then sends
//  the 10% welcome code.
//
//  Runs on the server, so the Admin credentials never reach the
//  browser. Set in Vercel (Settings → Environment Variables):
//    SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET  — Dev Dashboard app
//      with the write_customers / read_customers scopes, installed
//      on the store
//    SHOPIFY_SHOP (optional) — store subdomain, default casachevalier
// ============================================================

const SHOP = process.env.SHOPIFY_SHOP || 'casachevalier'
const API_VERSION = '2026-07'
const ADMIN_URL = `https://${SHOP}.myshopify.com/admin/api/${API_VERSION}/graphql.json`
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const SOURCES = new Set(['popup', 'footer'])

// Client-credentials tokens last 24 hours; reuse one while it's valid.
let cachedToken = null
let tokenExpiresAt = 0

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken
  const res = await fetch(`https://${SHOP}.myshopify.com/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  })
  if (!res.ok) throw new Error(`Token request failed: ${res.status}`)
  const json = await res.json()
  cachedToken = json.access_token
  // Refresh five minutes before Shopify's expiry
  tokenExpiresAt = Date.now() + (json.expires_in - 300) * 1000
  return cachedToken
}

async function admin(query, variables) {
  const res = await fetch(ADMIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': await getAccessToken(),
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`Admin API ${res.status}`)
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '))
  return json.data
}

// Throws if a mutation returned userErrors
function check(payload, step) {
  const errors = payload?.userErrors || []
  if (errors.length) throw new Error(`${step}: ${errors.map((e) => e.message).join('; ')}`)
  return payload
}

async function subscribe(email, locale, source) {
  // 1. Create the customer, or find the existing one with this email
  const set = check(
    (await admin(
      `mutation Upsert($email: String!, $input: CustomerSetInput!) {
        customerSet(identifier: { email: $email }, input: $input) {
          customer { id }
          userErrors { field message code }
        }
      }`,
      { email, input: { email, locale } }
    )).customerSet,
    'customerSet'
  )
  const customerId = set.customer.id

  // 2. Record consent to email marketing
  check(
    (await admin(
      `mutation Consent($input: CustomerEmailMarketingConsentUpdateInput!) {
        customerEmailMarketingConsentUpdate(input: $input) {
          customer { id }
          userErrors { field message }
        }
      }`,
      {
        input: {
          customerId,
          emailMarketingConsent: {
            marketingState: 'SUBSCRIBED',
            marketingOptInLevel: 'SINGLE_OPT_IN',
            consentUpdatedAt: new Date().toISOString(),
          },
        },
      }
    )).customerEmailMarketingConsentUpdate,
    'consent'
  )

  // 3. Tag without overwriting tags the customer already has
  check(
    (await admin(
      `mutation Tag($id: ID!, $tags: [String!]!) {
        tagsAdd(id: $id, tags: $tags) { userErrors { field message } }
      }`,
      { id: customerId, tags: ['newsletter', `newsletter-${source}`] }
    )).tagsAdd,
    'tagsAdd'
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}
  // Hidden "website" field: real people leave it empty, bots fill it in.
  // Answer as if it worked so bots don't retry.
  if (body.website) return res.status(200).json({ ok: true })

  const email = String(body.email || '').trim().toLowerCase()
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' })
  }
  const locale = body.locale === 'it' ? 'it' : 'en'
  const source = SOURCES.has(body.source) ? body.source : 'popup'

  if (!process.env.SHOPIFY_CLIENT_ID || !process.env.SHOPIFY_CLIENT_SECRET) {
    console.error('Newsletter: Shopify credentials are not configured')
    return res.status(503).json({ ok: false, error: 'not_configured' })
  }

  try {
    await subscribe(email, locale, source)
    return res.status(200).json({ ok: true })
  } catch (err) {
    // Log the reason, never the email address
    console.error('Newsletter sign-up failed:', err.message)
    return res.status(502).json({ ok: false, error: 'server' })
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s)
  } catch {
    return {}
  }
}
