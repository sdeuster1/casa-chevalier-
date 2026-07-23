#!/bin/bash
set -e
cd ~/Desktop/casa-chevalier

echo "Applying navbar/deep-link patch..."
git apply --whitespace=nowarn << 'DIFF_END'
diff --git a/src/components/DropdownMenu.jsx b/src/components/DropdownMenu.jsx
index 6cf66ba..2e7546e 100644
--- a/src/components/DropdownMenu.jsx
+++ b/src/components/DropdownMenu.jsx
@@ -60,12 +60,16 @@ export default function DropdownMenu({ isOpen, onClose }) {
               {item.hasSubmenu && activeSubmenu && (
                 <div className="flex flex-col gap-3 mt-4 pl-2">
                   {submenuItems.map((sub) => (
-                    <span
+                    <button
                       key={sub}
-                      className="font-playfair text-lilac text-base cursor-pointer hover:text-[#f0e9e0] transition-colors duration-300"
+                      onClick={() => {
+                        onClose()
+                        navigate(`/products?category=${sub}`)
+                      }}
+                      className="font-playfair text-lilac text-base cursor-pointer hover:text-[#f0e9e0] transition-colors duration-300 bg-transparent border-none p-0 text-left"
                     >
                       {sub}
-                    </span>
+                    </button>
                   ))}
                 </div>
               )}
diff --git a/src/components/Navbar.jsx b/src/components/Navbar.jsx
index 6b01a0b..1cb5b48 100644
--- a/src/components/Navbar.jsx
+++ b/src/components/Navbar.jsx
@@ -24,10 +24,17 @@ export default function Navbar({ onMenuToggle, variant = 'light' }) {
     setQuery('')
   }
 
-  // 'light' = light-colored (white/cream) foreground, for use on dark backgrounds (hero, plum sections)
-  // 'dark'  = dark (plum) foreground, for use on cream/light backgrounds
-  const fg = variant === 'dark' ? 'text-plum' : 'text-white'
-  const barBg = variant === 'dark' ? 'bg-plum' : 'bg-white'
+  // 'light' = white foreground, for dark hero backgrounds
+  // 'cream' = cream (#f0e9e0) foreground, for dark backgrounds where we want softer contrast
+  // 'dark'  = plum foreground, for cream/light backgrounds
+  const fg =
+    variant === 'dark' ? 'text-plum'
+    : variant === 'cream' ? 'text-cream'
+    : 'text-white'
+  const barBg =
+    variant === 'dark' ? 'bg-plum'
+    : variant === 'cream' ? 'bg-cream'
+    : 'bg-white'
   const badgeBg = variant === 'dark' ? 'bg-plum' : 'bg-dark'
   const badgeText = variant === 'dark' ? 'text-cream' : 'text-white'
 
diff --git a/src/components/ShopTheLook.jsx b/src/components/ShopTheLook.jsx
index e76a5a4..023cead 100644
--- a/src/components/ShopTheLook.jsx
+++ b/src/components/ShopTheLook.jsx
@@ -1,12 +1,10 @@
 import { useRef } from 'react'
+import { useNavigate } from 'react-router-dom'
 import { ChevronLeft, ChevronRight } from 'lucide-react'
+import { products, formatPrice } from '../data/products'
 
-const items = [
-  { name: 'EQUESTRIAN BLAZER', price: '€890' },
-  { name: 'RIDERS BELT', price: '€380' },
-  { name: 'BOMBACHA', price: '€520' },
-  { name: 'SHIRT', price: '€345' },
-]
+// Pick 4 items from the real catalog to feature
+const featured = products.slice(0, 4)
 
 const dots = [
   { top: '25%', left: '35%' },
@@ -16,6 +14,7 @@ const dots = [
 
 export default function ShopTheLook() {
   const scrollRef = useRef(null)
+  const navigate = useNavigate()
 
   const scroll = (dir) => {
     if (scrollRef.current) {
@@ -38,7 +37,7 @@ export default function ShopTheLook() {
         </div>
 
         <div className="w-full md:w-1/2 px-6 py-10 md:p-12 flex flex-col justify-center" style={{ backgroundColor: '#f0e9e0' }}>
-          <h2 className="font-bodoni uppercase tracking-[0.2em] text-dark text-xl md:text-2xl mb-8 md:mb-12">
+          <h2 className="font-bodoni uppercase tracking-[0.2em] text-plum text-xl md:text-2xl mb-8 md:mb-12">
             Shop the Look
           </h2>
 
@@ -47,32 +46,41 @@ export default function ShopTheLook() {
             className="flex gap-4 md:gap-5 overflow-x-auto pb-4 -mx-1 px-1"
             style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
           >
-            {items.map((item) => (
-              <div key={item.name} className="flex-shrink-0 w-[150px] md:w-[200px] cursor-pointer" style={{ scrollSnapAlign: 'start' }}>
-                <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-[#d4cec6] flex items-center justify-center">
-                  <span className="text-gray-400 font-playfair text-xs tracking-widest">[Image]</span>
+            {featured.map((item) => (
+              <button
+                key={item.id}
+                onClick={() => navigate(`/products?product=${item.id}`)}
+                className="flex-shrink-0 w-[150px] md:w-[200px] cursor-pointer bg-transparent border-none p-0 text-left"
+                style={{ scrollSnapAlign: 'start' }}
+              >
+                <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-[#d4cec6] overflow-hidden">
+                  <img
+                    src={item.image}
+                    alt={item.name}
+                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
+                  />
                 </div>
                 <p className="font-bodoni uppercase text-xs tracking-[0.15em] text-dark mt-3">
                   {item.name}
                 </p>
                 <p className="font-playfair text-sm text-plum mt-1">
-                  {item.price}
+                  {formatPrice(item.price)}
                 </p>
-              </div>
+              </button>
             ))}
           </div>
 
           <div className="flex gap-4 mt-6">
             <button
               onClick={() => scroll(-1)}
-              className="bg-transparent border border-dark p-2 cursor-pointer hover:bg-dark hover:text-white transition-all duration-300 text-dark"
+              className="bg-transparent border border-plum p-2 cursor-pointer hover:bg-plum hover:text-cream transition-all duration-300 text-plum"
               aria-label="Previous"
             >
               <ChevronLeft className="w-4 h-4" />
             </button>
             <button
               onClick={() => scroll(1)}
-              className="bg-transparent border border-dark p-2 cursor-pointer hover:bg-dark hover:text-white transition-all duration-300 text-dark"
+              className="bg-transparent border border-plum p-2 cursor-pointer hover:bg-plum hover:text-cream transition-all duration-300 text-plum"
               aria-label="Next"
             >
               <ChevronRight className="w-4 h-4" />
diff --git a/src/components/ThreeProducts.jsx b/src/components/ThreeProducts.jsx
index 170575f..74a28d4 100644
--- a/src/components/ThreeProducts.jsx
+++ b/src/components/ThreeProducts.jsx
@@ -1,36 +1,35 @@
 import { useNavigate } from 'react-router-dom'
-import vest from '../assets/products/vest.svg'
-import shirt from '../assets/products/shirt.svg'
-import breeches from '../assets/products/breeches.svg'
+import { products } from '../data/products'
 
+// Pick 3 featured pieces from the real catalog
 const featured = [
-  { name: 'VEST', image: vest },
-  { name: 'SHIRT', image: shirt },
-  { name: 'BREECHES', image: breeches },
-]
+  products.find((p) => p.id === 'riders-vest'),
+  products.find((p) => p.id === 'poplin-shirt'),
+  products.find((p) => p.id === 'breeches'),
+].filter(Boolean)
 
 export default function ThreeProducts() {
   const navigate = useNavigate()
   return (
     <section className="w-full py-16 md:py-24 px-6 md:px-8" style={{ backgroundColor: '#f0e9e0' }}>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
-        {featured.map(({ name, image }) => (
-          <div
-            key={name}
-            onClick={() => navigate('/products')}
-            className="cursor-pointer group"
+        {featured.map((item) => (
+          <button
+            key={item.id}
+            onClick={() => navigate(`/products?product=${item.id}`)}
+            className="cursor-pointer group bg-transparent border-none p-0 text-left"
           >
             <div className="aspect-square bg-[#d4cec6] overflow-hidden">
               <img
-                src={image}
-                alt={name}
+                src={item.image}
+                alt={item.name}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
             </div>
             <p className="font-bodoni uppercase tracking-[0.15em] text-sm text-dark mt-4 text-center">
-              {name}
+              {item.name}
             </p>
-          </div>
+          </button>
         ))}
       </div>
     </section>
diff --git a/src/pages/Home.jsx b/src/pages/Home.jsx
index 827bc8a..0534fa9 100644
--- a/src/pages/Home.jsx
+++ b/src/pages/Home.jsx
@@ -15,7 +15,7 @@ export default function Home() {
   return (
     <div className="min-h-screen">
       <NewsletterPopup />
-      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
+      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="cream" />
       <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
       <HeroSection />
       <TextInterlude text="Equestrian elegance, shaped by Italian craftsmanship." />
diff --git a/src/pages/Products.jsx b/src/pages/Products.jsx
index b7c39f6..8043832 100644
--- a/src/pages/Products.jsx
+++ b/src/pages/Products.jsx
@@ -1,5 +1,5 @@
-import { useState } from 'react'
-import { useNavigate } from 'react-router-dom'
+import { useState, useEffect, useRef, useMemo } from 'react'
+import { useNavigate, useSearchParams } from 'react-router-dom'
 import { Heart } from 'lucide-react'
 import Navbar from '../components/Navbar'
 import DropdownMenu from '../components/DropdownMenu'
@@ -10,11 +10,45 @@ import { useWishlist } from '../context/WishlistContext'
 
 export default function Products() {
   const [menuOpen, setMenuOpen] = useState(false)
-  const [activeCategory, setActiveCategory] = useState('ALL')
+  const [manualCategory, setManualCategory] = useState(null)
   const [confirmation, setConfirmation] = useState(null)
+  const [highlightTick, setHighlightTick] = useState(0)
+  const productRefs = useRef({})
   const { addItem } = useCart()
   const { toggle: toggleWish, has: hasWish } = useWishlist()
   const navigate = useNavigate()
+  const [searchParams] = useSearchParams()
+
+  const urlCategory = searchParams.get('category')
+  const urlProductId = searchParams.get('product')
+  // Show highlight for ~2.5s after arriving; highlightTick is bumped when we
+  // want it to disappear (via the effect's setTimeout callback, which is safe).
+  const highlighted = urlProductId && highlightTick === 0 ? urlProductId : null
+
+  // Derive active category from either manual override, URL, or product-implied
+  const activeCategory = useMemo(() => {
+    if (manualCategory) return manualCategory
+    if (urlCategory && categories.includes(urlCategory)) return urlCategory
+    if (urlProductId) {
+      const p = products.find((x) => x.id === urlProductId)
+      if (p) return p.category
+    }
+    return 'ALL'
+  }, [manualCategory, urlCategory, urlProductId])
+
+  // Scroll to targeted product and fade highlight after a moment
+  useEffect(() => {
+    if (!urlProductId) return
+    const scrollTimer = setTimeout(() => {
+      const el = productRefs.current[urlProductId]
+      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
+    }, 150)
+    const clearTimer = setTimeout(() => setHighlightTick((t) => t + 1), 2500)
+    return () => {
+      clearTimeout(scrollTimer)
+      clearTimeout(clearTimer)
+    }
+  }, [urlProductId])
 
   const filtered =
     activeCategory === 'ALL'
@@ -27,6 +61,10 @@ export default function Products() {
     setTimeout(() => setConfirmation(null), 1500)
   }
 
+  const setCategory = (cat) => {
+    setManualCategory(cat)
+  }
+
   return (
     <div className="min-h-screen bg-cream">
       <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
@@ -46,7 +84,7 @@ export default function Products() {
             {categories.map((cat) => (
               <button
                 key={cat}
-                onClick={() => setActiveCategory(cat)}
+                onClick={() => setCategory(cat)}
                 className={`font-bodoni uppercase text-xs md:text-sm tracking-[0.2em] bg-transparent border-none cursor-pointer pb-1 transition-all duration-300 ${
                   activeCategory === cat
                     ? 'text-plum border-b border-plum'
@@ -61,8 +99,15 @@ export default function Products() {
           <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
             {filtered.map((product) => {
               const wished = hasWish(product.id)
+              const isHighlighted = highlighted === product.id
               return (
-                <div key={product.id} className="flex flex-col group">
+                <div
+                  key={product.id}
+                  ref={(el) => { productRefs.current[product.id] = el }}
+                  className={`flex flex-col group transition-all duration-500 ${
+                    isHighlighted ? 'ring-2 ring-plum ring-offset-4 ring-offset-cream' : ''
+                  }`}
+                >
                   <div className="relative aspect-[3/4] overflow-hidden bg-[#d4cec6]">
                     <img
                       src={product.image}

DIFF_END

echo "Patch applied."
git add -A
git commit -m "Cream navbar on home, deep-linked product cards, category submenu"
echo "Pushing..."
git push origin main
echo "Deploying..."
npx vercel --prod --yes
echo ""
echo "DONE. Hard-refresh with Cmd+Shift+R"
