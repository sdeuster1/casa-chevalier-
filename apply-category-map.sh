#!/bin/bash
set -e
cd ~/Desktop/casa-chevalier
echo "Applying category mapping..."
git am --abort 2>/dev/null || true
git am << 'PATCH_END'
From 5e42298056f031a561b437f0ae75bd34894cbc5a Mon Sep 17 00:00:00 2001
From: Claude <claude@sandbox>
Date: Thu, 1 Oct 2026 15:36:54 +0000
Subject: [PATCH 1/2] Fix category filtering from the collection submenu
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit

- Restores the fixed sections (ALL, PANTS, SHIRTS, JACKETS, VESTS, ACCESSORIES)
- Products page now honours any category from the URL instead of only ones
  already present as Shopify collections — this was why every section showed
  the full catalogue
- Category matches against collection title, product type or tag, so it works
  however products are organised in Shopify
- Shopify's auto-created 'Home page' collection no longer counts as a category
- Empty sections offer a View All link
---
 src/components/DropdownMenu.jsx |  8 ++------
 src/lib/shopify.js              | 19 ++++++++++++++++---
 src/pages/Products.jsx          | 27 ++++++++++++++++++++-------
 3 files changed, 38 insertions(+), 16 deletions(-)

diff --git a/src/components/DropdownMenu.jsx b/src/components/DropdownMenu.jsx
index f9402f4..41c25b7 100644
--- a/src/components/DropdownMenu.jsx
+++ b/src/components/DropdownMenu.jsx
@@ -1,7 +1,8 @@
 import { useState } from 'react'
 import { useNavigate } from 'react-router-dom'
 import { X, ChevronRight } from 'lucide-react'
-import { useProducts } from '../context/ProductsContext'
+
+const submenuItems = ['ALL', 'PANTS', 'SHIRTS', 'JACKETS', 'VESTS', 'ACCESSORIES']
 
 const menuItems = [
   { label: 'THE CAPSULE COLLECTION', hasSubmenu: true, to: '/products' },
@@ -13,11 +14,6 @@ const menuItems = [
 export default function DropdownMenu({ isOpen, onClose }) {
   const [activeSubmenu, setActiveSubmenu] = useState(false)
   const navigate = useNavigate()
-  const { categories } = useProducts()
-
-  // Driven by the live Shopify collections, so the menu and the filter can
-  // never disagree, and a new collection appears here with no code change.
-  const submenuItems = categories
 
   const handleItemClick = (item) => {
     if (item.hasSubmenu) {
diff --git a/src/lib/shopify.js b/src/lib/shopify.js
index 9c8d79d..d014265 100644
--- a/src/lib/shopify.js
+++ b/src/lib/shopify.js
@@ -90,9 +90,21 @@ function normalizeProduct(node) {
     (o) => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'taglia'
   )
 
-  // Category: prefer a real collection, fall back to productType
-  const collection = node.collections.edges[0]?.node?.title
-  const category = (collection || node.productType || 'ALL').toUpperCase()
+  // Category: prefer a real collection, fall back to productType.
+  // Shopify's auto-created "Home page" collection isn't a real category.
+  const collectionTitles = node.collections.edges
+    .map((e) => e.node.title)
+    .filter((t) => t && t.toLowerCase() !== 'home page')
+  const category = (collectionTitles[0] || node.productType || 'UNCATEGORISED').toUpperCase()
+
+  // Every label this product could legitimately be filtered by
+  const categoryTags = [
+    ...collectionTitles,
+    node.productType,
+    ...node.tags,
+  ]
+    .filter(Boolean)
+    .map((t) => t.toUpperCase())
 
   return {
     id: node.handle,           // handle is the human-readable URL id
@@ -111,6 +123,7 @@ function normalizeProduct(node) {
     variants,
     availableForSale: node.availableForSale,
     tags: node.tags,
+    categoryTags,
   }
 }
 
diff --git a/src/pages/Products.jsx b/src/pages/Products.jsx
index 21c1d4a..459544f 100644
--- a/src/pages/Products.jsx
+++ b/src/pages/Products.jsx
@@ -13,7 +13,8 @@ export default function Products() {
   const [manualCategory, setManualCategory] = useState(null)
   const [highlightTick, setHighlightTick] = useState(0)
   const productRefs = useRef({})
-  const { products, categories, loading, error } = useProducts()
+  const { products, loading, error } = useProducts()
+  const categories = ['ALL', 'PANTS', 'SHIRTS', 'JACKETS', 'VESTS', 'ACCESSORIES']
   const { toggle: toggleWish, has: hasWish } = useWishlist()
   const navigate = useNavigate()
   const [searchParams] = useSearchParams()
@@ -24,13 +25,13 @@ export default function Products() {
 
   const activeCategory = useMemo(() => {
     if (manualCategory) return manualCategory
-    if (urlCategory && categories.includes(urlCategory)) return urlCategory
+    if (urlCategory) return urlCategory.toUpperCase()
     if (urlProductId) {
       const p = products.find((x) => x.handle === urlProductId)
       if (p) return p.category
     }
     return 'ALL'
-  }, [manualCategory, urlCategory, urlProductId, categories, products])
+  }, [manualCategory, urlCategory, urlProductId, products])
 
   useEffect(() => {
     if (!urlProductId || loading) return
@@ -45,7 +46,11 @@ export default function Products() {
   const filtered =
     activeCategory === 'ALL'
       ? products
-      : products.filter((p) => p.category === activeCategory)
+      : products.filter(
+          (p) =>
+            p.category === activeCategory ||
+            (p.categoryTags || []).includes(activeCategory)
+        )
 
   return (
     <div className="min-h-screen bg-cream">
@@ -103,9 +108,17 @@ export default function Products() {
           )}
 
           {!loading && !error && filtered.length === 0 && (
-            <p className="font-playfair italic text-lilac text-center text-sm py-12">
-              No pieces in this category yet.
-            </p>
+            <div className="text-center py-12">
+              <p className="font-playfair italic text-lilac text-sm">
+                No pieces in this category yet.
+              </p>
+              <button
+                onClick={() => setManualCategory('ALL')}
+                className="mt-4 font-bodoni uppercase text-plum text-[10px] tracking-[0.2em] border-b border-plum pb-0.5 bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
+              >
+                View All
+              </button>
+            </div>
           )}
 
           {!loading && filtered.length > 0 && (
-- 
2.43.0


From b14efbaf1c4ce75361971f998701ccea4175a50f Mon Sep 17 00:00:00 2001
From: Claude <claude@sandbox>
Date: Thu, 1 Oct 2026 15:43:22 +0000
Subject: [PATCH 2/2] Map English menu sections to the Italian Shopify
 catalogue

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
