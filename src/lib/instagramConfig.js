// ============================================================
//  Casa Chevalier — Instagram
// ============================================================
//  Instagram doesn't let a website read posts directly. The feed
//  comes from a JSON link produced by a feed service connected to
//  the account (e.g. Behold.so → "JSON feed"), set in Vercel as
//  VITE_INSTAGRAM_FEED_URL (or the default below). If the feed
//  can't be loaded the strip is hidden.
// ============================================================

const env = import.meta.env ?? {}

// Profile the "Follow us" button opens
export const INSTAGRAM_PROFILE_URL =
  env.VITE_INSTAGRAM_PROFILE_URL || 'https://www.instagram.com/casa.chevalier/'

// Behold JSON feed for @casa.chevalier (public by design, safe in the browser)
export const INSTAGRAM_FEED_URL =
  env.VITE_INSTAGRAM_FEED_URL || 'https://feeds.behold.so/uRRRKyYQrKmBJIcTZytN'
