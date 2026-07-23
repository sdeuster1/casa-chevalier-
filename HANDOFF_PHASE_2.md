# Casa Chevalier — Phase 2 Handoff

## Project Overview
Luxury fashion website for "Casa Chevalier", an Italian equestrian-sartorial brand. Currently a React + Vite + Tailwind CSS v4 frontend with placeholder images, deployed on Vercel.

**Live site:** https://casa-chevalier.vercel.app
**GitHub:** git@github.com:sdeuster1/casa-chevalier-.git
**Local path:** /Users/sebastiandeuster/Desktop/casa-chevalier

---

## Stack
- React 19 + Vite 8 + Tailwind CSS v4 (using `@tailwindcss/vite` plugin and `@theme` directive in `src/index.css`)
- React Router DOM v7 for client-side routing
- lucide-react for icons
- Google Fonts: "Bodoni Moda" (headings, uppercase, wide tracking) and "Playfair Display" (body, often italic) — loaded via `<link>` in `index.html`
- Deployed on Vercel with SPA rewrite rule in `vercel.json`

## Design System
| Token   | Value     | Usage                        |
|---------|-----------|------------------------------|
| plum    | `#4f1d34` | Menu panel bg, news section  |
| cream   | `#f0e9e0` | Main content bg, text on plum|
| lilac   | `#c49fae` | Accent text on plum          |
| coral   | `#f05652` | (Available, unused so far)   |
| orange  | `#f99943` | Footer bg                    |
| dark    | `#1a1a1a` | Hero bg, dark sections       |

**Typography:** `font-bodoni` for headings (uppercase, tracked), `font-playfair` for body/accents (often italic).

## Current Routes
| Path       | Component         | Description                     |
|------------|-------------------|---------------------------------|
| `/`        | `SplashPage`      | Split-screen splash with monogram |
| `/home`    | `Home`            | Main page with all sections     |
| `/products`| `Products`        | 2x3 product grid                |

## File Structure
```
src/
├── App.jsx                    # Router with 3 routes
├── main.jsx                   # Entry point
├── index.css                  # Tailwind v4 config + theme tokens
├── components/
│   ├── Monogram.jsx           # CC monogram SVG (exact paths from original PDF vector)
│   ├── Navbar.jsx             # Fixed top nav: hamburger, brand name, Search/Heart/User/ShoppingBag icons
│   ├── DropdownMenu.jsx       # Prada-style side panel (plum bg, 85vw max-w-420px, blur overlay)
│   ├── HeroSection.jsx        # Full-viewport hero with dark placeholder
│   ├── TextInterlude.jsx      # Plum bg section with monogram + italic quote + "Discover" → /products
│   ├── ThreeProducts.jsx      # 3-column grid: VEST, SHIRT, BREECHES
│   ├── ShopTheLook.jsx        # Two-column: left image + right scrollable product carousel
│   ├── NewsCarousel.jsx       # 3-card carousel on plum bg, click-to-select cards
│   └── Footer.jsx             # Orange bg, newsletter + Get in Touch + Company columns
├── pages/
│   ├── Splash.jsx             # Wraps SplashPage
│   ├── Home.jsx               # Composes Navbar + DropdownMenu + all home sections + Footer
│   └── Products.jsx           # Navbar + DropdownMenu + product grid + Footer
```

## Navbar Icon → Page Mapping (for Phase 2)
The navbar (`src/components/Navbar.jsx`) has 4 right-side icons. Currently none navigate anywhere:
- **Search** (magnifying glass) — no page yet
- **Heart** (hidden on mobile) — needs: **Wishlist/Liked Items page**
- **User** — needs: **Sign Up / Profile page**
- **ShoppingBag** — needs: **Shop/Cart page**

## Menu Items (DropdownMenu.jsx)
- THE CAPSULE COLLECTION → has expandable submenu: PANTS, SHIRTS, JACKETS, VESTS, ACCESSORIES
- OUR PHILOSOPHY → no page yet
- CC NEWS → no page yet
- CONTACTS → needs: **Contacts & FAQ page**

---

## Phase 2 Tasks

### 1. Newsletter Discount Popup
**What:** A modal/popup that appears when users first land on `/home` offering 10% discount for newsletter signup.
**Where:** Trigger in `src/pages/Home.jsx` or `src/App.jsx`.
**Design notes:** Should match the brand aesthetic (plum/cream colors, Bodoni/Playfair fonts). Include email input, CTA button, and a close/dismiss option. Consider using `localStorage` to only show once per visitor.

### 2. Contacts & FAQ Page
**What:** A dedicated page with contact information and frequently asked questions.
**Route:** `/contacts`
**Links from:** Footer "Contacts" and "FAQ" links, dropdown menu "CONTACTS" item.
**Design notes:** Keep consistent with existing pages — Navbar + DropdownMenu at top, Footer at bottom. Use the plum/cream palette. FAQ could use an accordion pattern (click to expand, like the menu submenu).

### 3. Shop Page (from ShoppingBag icon)
**What:** A shopping bag/cart page accessible from the ShoppingBag icon in the navbar.
**Route:** `/shop` or `/cart`
**Design notes:** Start with an empty cart view with a "Continue Shopping" link to `/products`. Product cards should match the existing style in `Products.jsx` and `ThreeProducts.jsx`.

### 4. Profile / Sign Up Page (from User icon)
**What:** Sign up / login / profile page accessible from the User icon in the navbar.
**Route:** `/account`
**Design notes:** Simple form with email/password fields. Use brand typography and colors. No backend needed for now — just the UI.

### 5. Wishlist / Liked Items Page (from Heart icon)
**What:** A saved/liked items page accessible from the Heart icon in the navbar.
**Route:** `/wishlist`
**Design notes:** Grid layout similar to `/products`. Show an empty state message when no items are saved.

### 6. Jumping Horse Page Transition Animation
**What:** An animated horse silhouette (like the Hermès horse in the attached screenshot) that appears briefly (~1 second) in the center of the screen when navigating between pages/sections.
**How to implement:**
1. Create an SVG or CSS-animated horse silhouette component (`src/components/HorseTransition.jsx`)
2. Use React Router's navigation events or a wrapper component to detect route changes
3. On route change: show a full-screen overlay (semi-transparent or brand-colored) with the animated horse centered, then fade out after ~800ms-1s
4. The horse animation could be a simple CSS `@keyframes` with a trotting/jumping motion (translate-y bounce + slight rotation), or a sprite sheet if a more detailed animation is desired
5. Wrap the router in a transition provider component in `App.jsx`

**Complexity:** Low-medium. The overlay + fade is straightforward. The horse SVG/animation is the main creative work. A simple silhouette with a CSS bounce animation takes ~30 minutes. A detailed multi-frame sprite animation would take longer.

---

## Key Implementation Notes

- **Tailwind v4:** Uses `@theme` directive in `src/index.css` for custom tokens, NOT `tailwind.config.js`. The plugin is `@tailwindcss/vite`.
- **Background colors:** Some sections use inline `style={{ backgroundColor: '#f0e9e0' }}` instead of `bg-cream` because of a rendering inconsistency between the two. Keep using inline styles for cream backgrounds on sections adjacent to each other.
- **Monogram SVG:** The `Monogram.jsx` component contains exact bezier paths extracted from the original PDF vector. It accepts `color`, `size`, and `className` props. The viewBox uses a matrix transform to flip Y-axis from the PDF coordinate system. Do NOT recreate — use as-is.
- **SPA routing:** `vercel.json` has a rewrite rule for client-side routing. All new routes will work automatically.
- **Mobile responsive:** All components use Tailwind responsive prefixes (`md:` for 768px+). The splash page stacks vertically on mobile. The dropdown menu is 85vw on mobile.
- **Deploy:** `npx vercel --prod --yes` from the project root. Push to GitHub with `git push origin main`.

## Dev Setup
```bash
cd /Users/sebastiandeuster/Desktop/casa-chevalier
npm install
npm run dev
# Opens on http://localhost:5173 (or next available port)
```
