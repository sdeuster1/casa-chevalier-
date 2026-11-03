#!/bin/bash
set -e
cd ~/Desktop/casa-chevalier
echo "Applying menu + contacts patch..."
git am --abort 2>/dev/null || true
git am << 'PATCH_END'
From c58b99627a83dfbe8be14ca2a3851b8d70895325 Mon Sep 17 00:00:00 2001
From: Claude <claude@sandbox>
Date: Thu, 1 Oct 2026 15:33:40 +0000
Subject: [PATCH] Live-driven collection submenu and corrected contact details

- Capsule Collection submenu now built from the live Shopify collections,
  so menu entries and the Products filter can never disagree
- 'ALL' sits at the top and routes to the unfiltered collection
- Contact details updated: Info@casachevalier.com, +39 348 232 2063,
  Via Leonardo Bruni 25, Milano
- News placeholder copy updated to match the new address
---
 src/components/DropdownMenu.jsx | 15 ++++++++++++---
 src/pages/Contacts.jsx          |  6 +++---
 src/pages/News.jsx              |  2 +-
 3 files changed, 16 insertions(+), 7 deletions(-)

diff --git a/src/components/DropdownMenu.jsx b/src/components/DropdownMenu.jsx
index 2e7546e..f9402f4 100644
--- a/src/components/DropdownMenu.jsx
+++ b/src/components/DropdownMenu.jsx
@@ -1,8 +1,7 @@
 import { useState } from 'react'
 import { useNavigate } from 'react-router-dom'
 import { X, ChevronRight } from 'lucide-react'
-
-const submenuItems = ['PANTS', 'SHIRTS', 'JACKETS', 'VESTS', 'ACCESSORIES']
+import { useProducts } from '../context/ProductsContext'
 
 const menuItems = [
   { label: 'THE CAPSULE COLLECTION', hasSubmenu: true, to: '/products' },
@@ -14,6 +13,11 @@ const menuItems = [
 export default function DropdownMenu({ isOpen, onClose }) {
   const [activeSubmenu, setActiveSubmenu] = useState(false)
   const navigate = useNavigate()
+  const { categories } = useProducts()
+
+  // Driven by the live Shopify collections, so the menu and the filter can
+  // never disagree, and a new collection appears here with no code change.
+  const submenuItems = categories
 
   const handleItemClick = (item) => {
     if (item.hasSubmenu) {
@@ -64,7 +68,12 @@ export default function DropdownMenu({ isOpen, onClose }) {
                       key={sub}
                       onClick={() => {
                         onClose()
-                        navigate(`/products?category=${sub}`)
+                        // ALL goes to the unfiltered collection
+                        navigate(
+                          sub === 'ALL'
+                            ? '/products'
+                            : `/products?category=${encodeURIComponent(sub)}`
+                        )
                       }}
                       className="font-playfair text-lilac text-base cursor-pointer hover:text-[#f0e9e0] transition-colors duration-300 bg-transparent border-none p-0 text-left"
                     >
diff --git a/src/pages/Contacts.jsx b/src/pages/Contacts.jsx
index a65b918..8df43a7 100644
--- a/src/pages/Contacts.jsx
+++ b/src/pages/Contacts.jsx
@@ -5,9 +5,9 @@ import DropdownMenu from '../components/DropdownMenu'
 import Footer from '../components/Footer'
 
 const details = [
-  { icon: Mail, label: 'Email', value: 'concierge@casachevalier.com' },
-  { icon: Phone, label: 'Telephone', value: '+39 02 1234 5678' },
-  { icon: MapPin, label: 'Atelier', value: 'Via della Spiga, Milano, Italia' },
+  { icon: Mail, label: 'Email', value: 'Info@casachevalier.com' },
+  { icon: Phone, label: 'Telephone', value: '+39 348 232 2063' },
+  { icon: MapPin, label: 'Atelier', value: 'Via Leonardo Bruni 25, Milano, Italia' },
 ]
 
 export default function Contacts() {
diff --git a/src/pages/News.jsx b/src/pages/News.jsx
index 4e43b79..074ba23 100644
--- a/src/pages/News.jsx
+++ b/src/pages/News.jsx
@@ -10,7 +10,7 @@ const articles = [
     date: 'March 2026',
     title: 'Inside the Milan Atelier',
     excerpt:
-      'A quiet morning behind the doors of Via della Spiga, where every stitch begins with a single length of Italian thread.',
+      'A quiet morning behind the doors of Via Leonardo Bruni, where every stitch begins with a single length of Italian thread.',
     ratio: 'aspect-[4/5]',
     tone: '#c8beb0',
   },
-- 
2.43.0


PATCH_END
echo "Applied. Starting dev server..."
npm run dev
