# Handover: PostHog analytics for casachevalier.com

*Written 18 Oct 2026. Paste or @-mention this file in a new chat to start the work.*

## Goal

Add **PostHog** to casachevalier.com to see what Vercel Analytics can't:

1. **The shopping funnel.** How many people view a product, add it to the bag, open the bag, click checkout and buy. The owner's main question is how many people have items in their bag but never go to checkout. That is invisible today.
2. **Error tracking.** JavaScript errors real visitors hit in their browsers.
3. **Session replay and heatmaps.** Optional; see the open questions.
4. **On-demand reporting.** Add the PostHog numbers to the `/site-report` skill so the owner can ask "how's the site doing?" in chat.

## Current state (don't redo)

- **Site:** React 19 + Vite SPA on Vercel (team "Deel Demo", project `casa-chevalier`, id `prj_9u7jGz5owHuehHKV7HLvjGxaPgnD`). It's a **headless Shopify** store: the Storefront API is called from the browser (`src/lib/shopify.js`, `src/lib/shopifyConfig.js`). Checkout happens on Shopify's own domain (`casachevalier.myshopify.com/checkouts/...`), **not** on our site.
- **Launched publicly on 16 Oct 2026, around 17:15 CEST.** First real orders: #1004 (€325, Signature Bombacha) and #1005 (€444, Equestrian Blazer), both shipping to Belgium. Traffic is mostly mobile, mostly Italy, mostly from Instagram.
- **Vercel Web Analytics** (`@vercel/analytics`, `<Analytics />` in `src/App.jsx`) counts page views without cookies. The project is on the **Hobby** plan, so custom events are unavailable. That's why we want PostHog.
- **Hiding internal visits:** in `src/App.jsx`, `skipInternalVisits()` is passed as `beforeSend`. Opening the site with `?internal=1` sets localStorage `cc-internal=1` and the browser stops being counted; `?internal=0` undoes it. **PostHog must respect the same flag** (call `posthog.opt_out_capturing()` or skip init when it's set).
- **Claude connectors already working:**
  - `vercel` MCP (Web Analytics: use `aggregate_pageviews`, because `count_pageviews` wrongly returns 0)
  - `gsc` MCP (Search Console)
  - Shopify connector (`run-analytics-query` and Admin GraphQL). Shopify's `sessions` funnel is unreliable for this headless store and missed order #1004. Count orders from `sales` or the `orders` query instead.
- **Reporting:** the user-scope skill `~/.claude/skills/site-report/SKILL.md` (`/site-report`). The scheduled daily report is **disabled** at the owner's request; they ask on demand.
- **Monitoring:**
  - Local health check every 15 min: `~/.local/share/casa-chevalier-health/health-check.mjs`, run by launchd, log in `~/Library/Logs/casa-chevalier-health/`.
  - UptimeRobot monitor emailing the owner.

## Before coding: the owner's steps (can't be done by Claude)

1. Sign up at PostHog and choose **EU Cloud** (`eu.posthog.com`), for GDPR.
2. Create a project for casachevalier.com and copy the **Project API key** (starts with `phc_`). It's public by design: it ships in the browser bundle, like the Shopify Storefront token.
3. Connect the **PostHog connector** in claude.ai connector settings. It currently shows "needs authentication". This is needed for reporting, not for the site code.

## What to build

### 1. Cookie consent banner (required first)
PostHog sets cookies or local storage to recognise returning visitors. For EU visitors that needs **opt-in consent** under GDPR/ePrivacy.
- Build a small, on-brand consent banner with **Accept** and **Decline** buttons, both equally visible (no dark patterns). Use the existing site styles and fonts, and make it translated: the site has EN/IT via `src/i18n/LanguageContext.jsx` and `src/i18n/translations.js`.
- Remember the choice in localStorage, and add a way to change it later, for example a "Cookie settings" link in `src/components/Footer.jsx`.
- **Before consent, or after Decline:** either don't load PostHog at all, or run it cookieless/in memory (`persistence: 'memory'`) with no personal identifiers. Pick one and document it.
- Update the privacy policy wording if needed. The policies are Shopify policies rendered by `src/pages/Legal.jsx` and are edited in Shopify admin by the owner. Suggest the text; don't change it yourself.
- Vercel Analytics stays as it is. It's cookieless and needs no consent.

### 2. PostHog setup
- Add `posthog-js`, pinned to an exact version. Initialise with `api_host: 'https://eu.i.posthog.com'`.
- Put the key in a Vite env var (`VITE_POSTHOG_KEY`) with the public key as a fallback, following the pattern in `shopifyConfig.js`.
- SPA page views: capture `$pageview` on route changes (React Router v7, see `Pages()` in `src/App.jsx`).
- Respect the `cc-internal` flag and consent.
- Turn off autocapture of form inputs. **Never send emails, names, addresses or the newsletter email** (`src/components/NewsletterPopup.jsx`, `api/subscribe.js`) as event properties.

### 3. Shopping events
Track these with product handle, title, variant/size, price and currency, never personal data:

| Event | Where |
|---|---|
| `product_viewed` | `src/pages/ProductDetail.jsx` |
| `added_to_bag` | `src/context/CartContext.jsx` (add lines) |
| `removed_from_bag` | `CartContext.jsx` |
| `bag_opened` | `src/components/CartDrawer.jsx` / `src/pages/Shop.jsx` |
| `checkout_clicked` | `CartDrawer.jsx` (the handler that redirects to `checkoutUrl`) |
| `added_to_wishlist` | `src/context/WishlistContext.jsx` |
| `newsletter_signed_up` | `NewsletterPopup.jsx` (no email in the event) |
| `size_guide_opened` | `src/components/SizeGuide.jsx` |

Then build a **funnel** in PostHog: product_viewed → added_to_bag → checkout_clicked → purchase.

**Purchases happen on Shopify's domain, where our JS doesn't run.** Options:
- (a) Count purchases from Shopify orders in the report and compare them with `checkout_clicked`. This is the simplest.
- (b) A Shopify "order paid" webhook → a Vercel function → `posthog.capture('order_completed')` server-side. Send no personal data, and if you link it to the visitor at all, use only the cart token or ID.

Start with (a) unless the owner wants (b).

### 4. Error tracking
- Enable PostHog exception capture.
- Also capture errors caught by `src/components/ErrorBoundary.jsx` (`posthog.captureException`).

### 5. Session replay (only if the owner says yes)
- Mask all inputs and text in the checkout-adjacent areas.
- Sample if volume grows.
- Mention it in the privacy policy.

### 6. Reporting
- Extend `~/.claude/skills/site-report/SKILL.md` with a PostHog section: funnel conversion, "bag but no checkout" count, top added-to-bag products and new errors.
- Use the PostHog connector's tools. Totals only.

## Rules to follow

- **GDPR:** no personal data in events or reports. EU hosting. Opt-in consent before cookies.
- Match the surrounding code style, with short comments explaining *why*, like the existing files.
- Verify in the browser preview (`.claude/launch.json` → `casa-chevalier`, port 5174): events firing, consent respected, `?internal=1` respected, no console errors, mobile width.
- Run `npx eslint` and `npx vite build` before finishing.
- **Commit only the files you changed.** The repo often has unrelated untracked files (`apply-*.sh`, `shopify/email-templates/...`). Commit or push only when the owner asks; they have pushed straight to `main` before. Pushing to `main` deploys to production on Vercel.

## Open questions for the owner

1. Do they want **session replay**? It's useful, but more privacy-sensitive.
2. Before consent: **no PostHog at all**, or **cookieless counting**?
3. Purchases: is option (a) (Shopify orders in reports) enough, or do they want the webhook, option (b)?
4. Keep Vercel Analytics alongside PostHog? Recommended: yes, it's free, cookieless and already in the reports.
5. The Vercel Pro upgrade ($20/month for cookieless custom events) was the alternative. If PostHog is done, it isn't needed.
