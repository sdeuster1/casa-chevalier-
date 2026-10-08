// ============================================================
//  Casa Chevalier — pre-launch password protection
// ============================================================
//  Vercel Routing Middleware: runs before every request (pages,
//  images, videos, sitemap). While the SITE_PASSWORD environment
//  variable is set in Vercel, visitors must log in with
//  SITE_USERNAME / SITE_PASSWORD. To go live, delete SITE_PASSWORD
//  in Vercel (Settings → Environment Variables) and redeploy.
// ============================================================

export const config = { matcher: '/:path*' }

export default function middleware(request) {
  const password = process.env.SITE_PASSWORD
  if (!password) return // not locked: the site is public

  const username = process.env.SITE_USERNAME || 'casachevalier'
  const [scheme, encoded] = (request.headers.get('authorization') || '').split(' ')
  if (scheme === 'Basic' && encoded) {
    const [user, ...rest] = atob(encoded).split(':')
    if (user === username && rest.join(':') === password) return
  }

  return new Response('Casa Chevalier — coming soon.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Casa Chevalier", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  })
}
