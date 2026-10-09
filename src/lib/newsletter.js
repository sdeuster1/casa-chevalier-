// Sends a newsletter sign-up to /api/subscribe (api/subscribe.js), which
// saves it in Shopify → Customers with email-marketing consent.
// Resolves to 'ok' | 'invalid_email' | 'error'.
export const PRIVACY_POLICY_URL =
  'https://casachevalier.myshopify.com/policies/privacy-policy'

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
