// Legal documents shown on the site. The text lives in Shopify, so the team
// can edit it there: the four policies under Settings → Policies, the two
// pages under Online Store → Pages. English versions are Shopify translations.
export const LEGAL_DOCUMENTS = [
  { path: '/policies/shipping-policy', policy: 'shippingPolicy', title: { it: 'Spedizioni e resi', en: 'Shipping & Returns' } },
  { path: '/policies/refund-policy', policy: 'refundPolicy', title: { it: 'Informativa sui rimborsi', en: 'Returns & Refunds' } },
  { path: '/policies/terms-of-service', policy: 'termsOfService', title: { it: 'Termini e condizioni', en: 'Terms & Conditions' } },
  { path: '/policies/privacy-policy', policy: 'privacyPolicy', title: { it: 'Privacy Policy', en: 'Privacy Policy' } },
  { path: '/pages/cookie-policy', page: 'cookie-policy', title: { it: 'Cookie Policy', en: 'Cookie Policy' } },
  { path: '/pages/accessibility-statement', page: 'accessibility-statement', title: { it: 'Dichiarazione di accessibilità', en: 'Accessibility Statement' } },
]

export const legalDocumentFor = (pathname) =>
  LEGAL_DOCUMENTS.find((d) => d.path === pathname.replace(/\/+$/, '')) || null
