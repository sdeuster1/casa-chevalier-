// ============================================================
//  Casa Chevalier — PostHog analytics, behind cookie consent
// ============================================================
//  Vercel Analytics (App.jsx) counts page views for everyone and
//  needs no consent: it is cookieless. PostHog adds the shopping
//  funnel and error tracking, and because it recognises returning
//  visitors it needs opt-in consent under GDPR. Until a visitor
//  clicks Accept in the cookie banner, PostHog is not even
//  downloaded and nothing is sent; Decline keeps it that way.
//
//  Events carry product data only (handle, title, size, price),
//  never names, emails or addresses.
//
//  The project key is PUBLIC by design, like the Storefront
//  token: it can send events but not read them.
// ============================================================

import { useSyncExternalStore } from 'react'

const env = import.meta.env

const POSTHOG_KEY =
  env.VITE_POSTHOG_KEY || 'phc_rMwCcPDNA4V3NuoAH4rwKstYfJAMTdhw3S9W6BsgGBVf'
// EU Cloud, so the data stays in the EU
const POSTHOG_HOST = 'https://eu.i.posthog.com'

// Locally, events are written to the console instead of sent, so working on
// the site doesn't add to the shop's numbers. VITE_POSTHOG_DEV=1 sends them.
const LOG_ONLY = env.DEV && !env.VITE_POSTHOG_DEV

const CONSENT_KEY = 'cc-consent' // 'granted' | 'denied'; absent = not asked yet
const INTERNAL_KEY = 'cc-internal'

// ---------- The team's own visits ----------

// Open the site once with ?internal=1 to stop counting this browser
// (?internal=0 counts it again). Used by Vercel Analytics too.
export function isInternalVisit() {
  try {
    const flag = new URLSearchParams(window.location.search).get('internal')
    if (flag === '1') localStorage.setItem(INTERNAL_KEY, '1')
    if (flag === '0') localStorage.removeItem(INTERNAL_KEY)
    return localStorage.getItem(INTERNAL_KEY) === '1'
  } catch {
    // Storage blocked (private window): count the visit as usual
    return false
  }
}

// ---------- Consent ----------

// Kept in memory as well, so a choice made in a private window (where
// storage can be blocked) still holds for the rest of the visit.
let consent = null
const listeners = new Set()

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) || consent
  } catch {
    return consent
  }
}

export function setConsent(choice) {
  consent = choice
  try {
    localStorage.setItem(CONSENT_KEY, choice)
  } catch { /* see above */ }

  if (choice === 'granted') {
    startAnalytics()
  } else if (posthogPromise) {
    // Withdrawn after accepting: stop sending and forget this browser's ID.
    // On the next visit PostHog is not loaded at all.
    posthogPromise.then((ph) => {
      ph?.opt_out_capturing()
      ph?.reset()
    })
  }
  listeners.forEach((fn) => fn())
}

function subscribeConsent(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// The current choice ('granted' | 'denied' | null), re-rendering on change
export function useConsent() {
  return useSyncExternalStore(subscribeConsent, getConsent)
}

// The footer's "Cookie settings" link reopens the banner
export const COOKIE_SETTINGS_EVENT = 'cc:cookie-settings'
export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
}

// ---------- PostHog ----------

let posthogPromise = null

const allowed = () => getConsent() === 'granted' && !isInternalVisit()

// Loads and starts PostHog, only with consent and only once. Called at
// startup (main.jsx) and when the visitor clicks Accept.
export function startAnalytics() {
  if (!allowed() || LOG_ONLY || !POSTHOG_KEY) return
  if (posthogPromise) {
    // Declined and then accepted again on the same page
    posthogPromise.then((ph) => ph?.has_opted_out_capturing() && ph.opt_in_capturing())
    return
  }
  // Loaded on demand, so visitors who never accept never download it
  posthogPromise = import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        ui_host: 'https://eu.posthog.com',
        // A page view on every route change of the single-page app
        capture_pageview: 'history_change',
        capture_pageleave: true,
        // We never identify visitors, so PostHog keeps no person profiles
        person_profiles: 'identified_only',
        // Clicks on links and buttons only: never form fields or what is typed in them
        autocapture: { dom_event_allowlist: ['click'], element_allowlist: ['a', 'button'] },
        // Strips ad click IDs (fbclid, gclid…) from the page addresses sent
        mask_personal_data_properties: true,
        // JavaScript errors visitors run into
        capture_exceptions: true,
        // No session recordings or surveys
        disable_session_recording: true,
        disable_surveys: true,
        loaded: (ph) => {
          // An earlier Decline leaves an opt-out behind; consent now overrides it
          if (ph.has_opted_out_capturing()) ph.opt_in_capturing()
        },
      })
      return posthog
    })
    .catch((err) => {
      console.warn('Analytics unavailable:', err)
      return null
    })
}

// Sends one event. Options go to posthog.capture, e.g. { send_instantly: true }
// for a click that leaves the site straight after.
export function track(event, properties, options) {
  if (!allowed()) return
  if (LOG_ONLY) {
    console.info('[analytics]', event, properties ?? {})
    return
  }
  posthogPromise?.then((ph) => ph?.capture(event, properties, options))
}

// Errors React caught (ErrorBoundary) never reach PostHog's own error
// capture, so they are sent here.
export function captureError(error, properties) {
  if (!allowed()) return
  if (LOG_ONLY) {
    console.info('[analytics] $exception', error, properties ?? {})
    return
  }
  posthogPromise?.then((ph) => ph?.captureException(error, properties))
}

// What we send about a bag line: the piece, never the person
export const lineProps = (line, currency) => ({
  product_handle: line.productHandle,
  product_title: line.productTitle,
  variant: line.variantTitle,
  size: line.size,
  price: line.price,
  currency,
})
