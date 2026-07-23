#!/bin/bash
set -e
cd ~/Desktop/casa-chevalier

echo "Applying navbar + badges patch..."
git apply --whitespace=nowarn << 'DIFF_END'
diff --git a/src/components/Navbar.jsx b/src/components/Navbar.jsx
index 256019c..6b01a0b 100644
--- a/src/components/Navbar.jsx
+++ b/src/components/Navbar.jsx
@@ -2,11 +2,16 @@ import { useState } from 'react'
 import { Link, useNavigate } from 'react-router-dom'
 import { Search, Heart, User, ShoppingBag, X } from 'lucide-react'
 import { products } from '../data/products'
+import { useCart } from '../context/CartContext'
+import { useWishlist } from '../context/WishlistContext'
 
-export default function Navbar({ onMenuToggle }) {
+export default function Navbar({ onMenuToggle, variant = 'light' }) {
   const [searchOpen, setSearchOpen] = useState(false)
   const [query, setQuery] = useState('')
   const navigate = useNavigate()
+  const { itemCount } = useCart()
+  const { items: wishItems } = useWishlist()
+  const wishCount = wishItems.length
 
   const results = query.trim()
     ? products.filter((p) =>
@@ -19,6 +24,13 @@ export default function Navbar({ onMenuToggle }) {
     setQuery('')
   }
 
+  // 'light' = light-colored (white/cream) foreground, for use on dark backgrounds (hero, plum sections)
+  // 'dark'  = dark (plum) foreground, for use on cream/light backgrounds
+  const fg = variant === 'dark' ? 'text-plum' : 'text-white'
+  const barBg = variant === 'dark' ? 'bg-plum' : 'bg-white'
+  const badgeBg = variant === 'dark' ? 'bg-plum' : 'bg-dark'
+  const badgeText = variant === 'dark' ? 'text-cream' : 'text-white'
+
   return (
     <>
       <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 py-4 bg-transparent">
@@ -27,14 +39,14 @@ export default function Navbar({ onMenuToggle }) {
           className="flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-2"
           aria-label="Menu"
         >
-          <span className="block w-5 md:w-6 h-[1.5px] bg-white"></span>
-          <span className="block w-5 md:w-6 h-[1.5px] bg-white"></span>
-          <span className="block w-5 md:w-6 h-[1.5px] bg-white"></span>
+          <span className={`block w-5 md:w-6 h-[1.5px] ${barBg}`}></span>
+          <span className={`block w-5 md:w-6 h-[1.5px] ${barBg}`}></span>
+          <span className={`block w-5 md:w-6 h-[1.5px] ${barBg}`}></span>
         </button>
 
         <Link
           to="/home"
-          className="font-bodoni uppercase text-white text-xs md:text-lg tracking-[0.15em] md:tracking-[0.2em] absolute left-1/2 -translate-x-1/2 no-underline hover:opacity-80 transition-opacity"
+          className={`font-bodoni uppercase ${fg} text-xs md:text-lg tracking-[0.15em] md:tracking-[0.2em] absolute left-1/2 -translate-x-1/2 no-underline hover:opacity-80 transition-opacity`}
         >
           Casa Chevalier
         </Link>
@@ -45,16 +57,33 @@ export default function Navbar({ onMenuToggle }) {
             aria-label="Search"
             className="bg-transparent border-none cursor-pointer p-0"
           >
-            <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
+            <Search className={`w-4 h-4 md:w-5 md:h-5 ${fg}`} />
           </button>
-          <Link to="/wishlist" aria-label="Wishlist" className="hidden md:block">
-            <Heart className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
+
+          <Link to="/wishlist" aria-label="Wishlist" className="hidden md:block relative">
+            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${fg} cursor-pointer`} />
+            {wishCount > 0 && (
+              <span
+                className={`absolute -bottom-1 -right-1 ${badgeBg} ${badgeText} rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-playfair leading-none`}
+              >
+                {wishCount > 9 ? '9+' : wishCount}
+              </span>
+            )}
           </Link>
+
           <Link to="/account" aria-label="Account">
-            <User className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
+            <User className={`w-4 h-4 md:w-5 md:h-5 ${fg} cursor-pointer`} />
           </Link>
-          <Link to="/shop" aria-label="Shopping bag">
-            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
+
+          <Link to="/shop" aria-label="Shopping bag" className="relative">
+            <ShoppingBag className={`w-4 h-4 md:w-5 md:h-5 ${fg} cursor-pointer`} />
+            {itemCount > 0 && (
+              <span
+                className={`absolute -bottom-1 -right-1 ${badgeBg} ${badgeText} rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-playfair leading-none`}
+              >
+                {itemCount > 9 ? '9+' : itemCount}
+              </span>
+            )}
           </Link>
         </div>
       </nav>
diff --git a/src/pages/Account.jsx b/src/pages/Account.jsx
index c12f833..a377766 100644
--- a/src/pages/Account.jsx
+++ b/src/pages/Account.jsx
@@ -10,7 +10,7 @@ export default function Account() {
 
   return (
     <div className="min-h-screen bg-cream">
-      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
+      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
       <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
 
       <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 min-h-[70vh] flex items-center justify-center">
diff --git a/src/pages/Contacts.jsx b/src/pages/Contacts.jsx
index 9110710..a65b918 100644
--- a/src/pages/Contacts.jsx
+++ b/src/pages/Contacts.jsx
@@ -28,12 +28,12 @@ export default function Contacts() {
 
   return (
     <div className="min-h-screen bg-cream">
-      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
+      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
       <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
 
       <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
         <div className="max-w-5xl mx-auto">
-          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
+          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
             Contacts
           </h1>
           <p className="font-playfair italic text-lilac text-center text-sm mb-16 md:mb-20">
diff --git a/src/pages/FAQ.jsx b/src/pages/FAQ.jsx
index 946f393..34592d3 100644
--- a/src/pages/FAQ.jsx
+++ b/src/pages/FAQ.jsx
@@ -48,7 +48,7 @@ export default function FAQ() {
 
   return (
     <div className="min-h-screen bg-cream">
-      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
+      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
       <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
 
       <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
@@ -58,7 +58,7 @@ export default function FAQ() {
             <p className="font-playfair italic text-lilac text-[11px] tracking-[0.25em] uppercase mb-6">
               Frequently Asked Questions
             </p>
-            <h1 className="font-bodoni text-dark text-4xl md:text-6xl leading-tight">
+            <h1 className="font-bodoni text-plum text-4xl md:text-6xl leading-tight">
               Some answers<br />to your questions
             </h1>
           </div>
diff --git a/src/pages/News.jsx b/src/pages/News.jsx
index 6843a37..4e43b79 100644
--- a/src/pages/News.jsx
+++ b/src/pages/News.jsx
@@ -71,12 +71,12 @@ export default function News() {
 
   return (
     <div className="min-h-screen bg-cream">
-      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
+      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
       <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
 
       <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
         <div className="max-w-6xl mx-auto">
-          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
+          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
             CC News
           </h1>
           <p className="font-playfair italic text-lilac text-center text-sm mb-16 md:mb-20">
diff --git a/src/pages/Philosophy.jsx b/src/pages/Philosophy.jsx
index d569850..e820a3d 100644
--- a/src/pages/Philosophy.jsx
+++ b/src/pages/Philosophy.jsx
@@ -40,13 +40,13 @@ export default function Philosophy() {
 
   return (
     <div className="min-h-screen bg-cream">
-      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
+      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
       <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
 
       <section className="pt-28 md:pt-36 pb-8 md:pb-12 px-6 md:px-12">
         <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
           <Monogram color="#4f1d34" size={48} className="mb-6" />
-          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] mb-4">
+          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] mb-4">
             Our Philosophy
           </h1>
           <p className="font-playfair italic text-lilac text-sm md:text-base max-w-lg">
diff --git a/src/pages/Products.jsx b/src/pages/Products.jsx
index c2d22e8..b7c39f6 100644
--- a/src/pages/Products.jsx
+++ b/src/pages/Products.jsx
@@ -29,12 +29,12 @@ export default function Products() {
 
   return (
     <div className="min-h-screen bg-cream">
-      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
+      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
       <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
 
       <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
         <div className="max-w-6xl mx-auto">
-          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
+          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
             The Collection
           </h1>
           <p className="font-playfair italic text-lilac text-center text-sm mb-12">
diff --git a/src/pages/Shop.jsx b/src/pages/Shop.jsx
index b170e1e..1c264a8 100644
--- a/src/pages/Shop.jsx
+++ b/src/pages/Shop.jsx
@@ -31,12 +31,12 @@ export default function Shop() {
 
   return (
     <div className="min-h-screen bg-cream flex flex-col">
-      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
+      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
       <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
 
       <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 flex-1">
         <div className="max-w-4xl mx-auto w-full">
-          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
+          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
             {step === 'checkout' ? 'Checkout' : step === 'confirmed' ? 'Thank You' : 'Your Bag'}
           </h1>
           <p className="font-playfair italic text-lilac text-center text-sm mb-16">
diff --git a/src/pages/Wishlist.jsx b/src/pages/Wishlist.jsx
index a72e080..d5b941f 100644
--- a/src/pages/Wishlist.jsx
+++ b/src/pages/Wishlist.jsx
@@ -16,12 +16,12 @@ export default function Wishlist() {
 
   return (
     <div className="min-h-screen bg-cream">
-      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
+      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
       <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
 
       <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 min-h-[70vh]">
         <div className="max-w-6xl mx-auto">
-          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
+          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
             Wishlist
           </h1>
           <p className="font-playfair italic text-lilac text-center text-sm mb-16">

DIFF_END

echo "Patch applied."
git add -A
git commit -m "Navbar variant + cart badges + plum titles"
echo "Pushing..."
git push origin main
echo "Deploying..."
npx vercel --prod --yes
echo ""
echo "DONE. Hard-refresh with Cmd+Shift+R"
