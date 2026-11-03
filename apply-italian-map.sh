#!/bin/bash
set -e
cd ~/Desktop/casa-chevalier
echo "Applying Italian category mapping..."
git am --abort 2>/dev/null || true
git am << 'PATCH_END'
From b14efbaf1c4ce75361971f998701ccea4175a50f Mon Sep 17 00:00:00 2001
From: Claude <claude@sandbox>
Date: Thu, 1 Oct 2026 15:43:22 +0000
Subject: [PATCH] Map English menu sections to the Italian Shopify catalogue

The catalogue uses Italian product types (Pantaloni, Camicie eleganti,
Gilet, Blazer, Cinture, Polo) while the menu is English, so nothing matched.

- CATEGORY_MAP in shopify.js maps each English section to its Italian labels
- Products carry a  field; cards, PDP and search show that instead of
  the raw Italian product type
- Related products on the PDP match by section
---
 src/components/Navbar.jsx   |  2 +-
 src/lib/shopify.js          | 29 +++++++++++++++++++++++++++++
 src/pages/ProductDetail.jsx |  4 ++--
 src/pages/Products.jsx      | 10 +++-------
 src/pages/Wishlist.jsx      |  2 +-
 5 files changed, 36 insertions(+), 11 deletions(-)

diff --git a/src/components/Navbar.jsx b/src/components/Navbar.jsx
index 0fc42c1..8c3d8d7 100644
--- a/src/components/Navbar.jsx
+++ b/src/components/Navbar.jsx
@@ -171,7 +171,7 @@ export default function Navbar({ onMenuToggle, variant = 'light' }) {
                         />
                         <div className="flex flex-col">
                           <span className="font-playfair italic text-lilac text-[10px] tracking-[0.15em] uppercase">
-                            {p.category}
+                            {p.section}
                           </span>
                           <span className="font-bodoni uppercase tracking-[0.15em] text-sm text-cream">
                             {p.name}
diff --git a/src/lib/shopify.js b/src/lib/shopify.js
index d014265..e6d6724 100644
--- a/src/lib/shopify.js
+++ b/src/lib/shopify.js
@@ -66,6 +66,33 @@ const PRODUCT_FIELDS = `
   collections(first: 5) { edges { node { title handle } } }
 `
 
+// ---------- Category mapping ----------
+// Menu sections are English; the Shopify catalogue is organised in Italian.
+// Each section lists the Shopify product types / collections / tags it covers.
+// Add a line here when a new Italian product type is introduced.
+export const CATEGORY_MAP = {
+  PANTS: ['PANTALONI', 'BOMBACHA', 'BREECHES', 'PANTS'],
+  SHIRTS: ['CAMICIE ELEGANTI', 'CAMICIE', 'POLO', 'SHIRTS'],
+  JACKETS: ['BLAZER', 'GIACCHE', 'GIACCA', 'JACKETS'],
+  VESTS: ['GILET', 'VESTS'],
+  ACCESSORIES: ['CINTURE', 'CINTURA', 'ACCESSORI', 'ACCESSORIES'],
+}
+
+// The English section a set of Shopify labels belongs to, if any.
+function sectionFor(labels) {
+  for (const [section, members] of Object.entries(CATEGORY_MAP)) {
+    if (labels.some((l) => members.includes(l))) return section
+  }
+  return null
+}
+
+// True when a product belongs in the given English section.
+export function matchesCategory(product, section) {
+  if (!section || section === 'ALL') return true
+  const wanted = CATEGORY_MAP[section] || [section]
+  return (product.categoryTags || []).some((l) => wanted.includes(l))
+}
+
 // ---------- Normalisation ----------
 // Flattens Shopify's edges/node shape into the flat objects our
 // components already expect, so the UI layer stays unchanged.
@@ -124,6 +151,7 @@ function normalizeProduct(node) {
     availableForSale: node.availableForSale,
     tags: node.tags,
     categoryTags,
+    section: sectionFor(categoryTags) || category,
   }
 }
 
@@ -271,6 +299,7 @@ export async function removeCartLine(cartId, lineId) {
   return normalizeCart(data.cartLinesRemove.cart)
 }
 
+
 export const formatPrice = (n, currency = 'EUR') =>
   new Intl.NumberFormat('it-IT', {
     style: 'currency',
diff --git a/src/pages/ProductDetail.jsx b/src/pages/ProductDetail.jsx
index eaa140b..af3fcb9 100644
--- a/src/pages/ProductDetail.jsx
+++ b/src/pages/ProductDetail.jsx
@@ -105,7 +105,7 @@ export default function ProductDetail() {
   }
 
   const related = products
-    .filter((p) => p.category === product.category && p.handle !== product.handle)
+    .filter((p) => p.section === product.section && p.handle !== product.handle)
     .slice(0, 3)
 
   const outOfStock = selectedVariant && !selectedVariant.available
@@ -134,7 +134,7 @@ export default function ProductDetail() {
           <div className="md:sticky md:top-24 md:self-start px-6 md:px-12 py-10 md:py-16">
             <div className="flex items-start justify-between">
               <span className="font-playfair italic text-lilac text-[11px] tracking-[0.2em] uppercase">
-                {product.category}
+                {product.section}
               </span>
               <button
                 onClick={() => toggleWish(product.handle)}
diff --git a/src/pages/Products.jsx b/src/pages/Products.jsx
index 459544f..109707a 100644
--- a/src/pages/Products.jsx
+++ b/src/pages/Products.jsx
@@ -4,7 +4,7 @@ import { Heart } from 'lucide-react'
 import Navbar from '../components/Navbar'
 import DropdownMenu from '../components/DropdownMenu'
 import Footer from '../components/Footer'
-import { formatPrice } from '../lib/shopify'
+import { formatPrice, matchesCategory } from '../lib/shopify'
 import { useProducts } from '../context/ProductsContext'
 import { useWishlist } from '../context/WishlistContext'
 
@@ -46,11 +46,7 @@ export default function Products() {
   const filtered =
     activeCategory === 'ALL'
       ? products
-      : products.filter(
-          (p) =>
-            p.category === activeCategory ||
-            (p.categoryTags || []).includes(activeCategory)
-        )
+      : products.filter((p) => matchesCategory(p, activeCategory))
 
   return (
     <div className="min-h-screen bg-cream">
@@ -164,7 +160,7 @@ export default function Products() {
 
                     <div className="pt-4 flex flex-col">
                       <span className="font-playfair italic text-lilac text-[10px] tracking-[0.15em] uppercase">
-                        {product.category}
+                        {product.section}
                       </span>
                       <button
                         onClick={() => navigate(`/product/${product.handle}`)}
diff --git a/src/pages/Wishlist.jsx b/src/pages/Wishlist.jsx
index cb86e2d..e6300de 100644
--- a/src/pages/Wishlist.jsx
+++ b/src/pages/Wishlist.jsx
@@ -60,7 +60,7 @@ export default function Wishlist() {
                   </div>
                   <div className="pt-4 flex flex-col">
                     <span className="font-playfair italic text-lilac text-[10px] tracking-[0.15em] uppercase">
-                      {product.category}
+                      {product.section}
                     </span>
                     <button
                       onClick={() => navigate(`/product/${product.handle}`)}
-- 
2.43.0


PATCH_END
echo "Applied. Starting dev server..."
npm run dev
