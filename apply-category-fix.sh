#!/bin/bash
set -e
cd ~/Desktop/casa-chevalier
echo "Applying category filter fix..."
git am --abort 2>/dev/null || true
git am << 'PATCH_END'
From 5e42298056f031a561b437f0ae75bd34894cbc5a Mon Sep 17 00:00:00 2001
From: Claude <claude@sandbox>
Date: Thu, 1 Oct 2026 15:36:54 +0000
Subject: [PATCH] Fix category filtering from the collection submenu
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


PATCH_END
echo "Applied. Starting dev server..."
npm run dev
