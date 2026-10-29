// Sends a newsletter sign-up to /api/subscribe (api/subscribe.js), which
// saves it in Shopify → Customers with email-marketing consent.
// Resolves to 'ok' | 'invalid_email' | 'error'.
export const PRIVACY_POLICY_URL = '/policies/privacy-policy'

export async function subscribeToNewsletter({ email, locale, source, website = '' }) {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, locale, source, website }),
    })
    const json = await res.json().catch(() => ({}))
    if (res.ok && json.ok) return 'ok'
    return json.error === 'invalid_email' ? 'invalid_email' : 'error'
  } catch {
    return 'error'
  }
}

// "Email me when it's back": the same endpoint saves the email in Shopify →
// Customers tagged with the product and size, without newsletter consent.
// Resolves to 'ok' | 'invalid_email' | 'error'.
export async function requestBackInStock({ email, locale, product, size, website = '' }) {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, locale, source: 'back-in-stock', product, size, website }),
    })
    const json = await res.json().catch(() => ({}))
    if (res.ok && json.ok) return 'ok'
    return json.error === 'invalid_email' ? 'invalid_email' : 'error'
  } catch {
    return 'error'
  }
}
