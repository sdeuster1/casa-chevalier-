#!/bin/bash
set -e
cd ~/Desktop/casa-chevalier
git am --abort 2>/dev/null || true
git am << 'PATCH_END'
From b6e9e49b0d1b9cd0f6ddf68c9b09151da99f4902 Mon Sep 17 00:00:00 2001
From: Claude <claude@sandbox>
Date: Thu, 1 Oct 2026 15:56:08 +0000
Subject: [PATCH] Update contact phone number

---
 src/pages/Contacts.jsx | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/src/pages/Contacts.jsx b/src/pages/Contacts.jsx
index 8df43a7..58a8f9a 100644
--- a/src/pages/Contacts.jsx
+++ b/src/pages/Contacts.jsx
@@ -6,7 +6,7 @@ import Footer from '../components/Footer'
 
 const details = [
   { icon: Mail, label: 'Email', value: 'Info@casachevalier.com' },
-  { icon: Phone, label: 'Telephone', value: '+39 348 232 2063' },
+  { icon: Phone, label: 'Telephone', value: '+39 23935831' },
   { icon: MapPin, label: 'Atelier', value: 'Via Leonardo Bruni 25, Milano, Italia' },
 ]
 
-- 
2.43.0


PATCH_END
echo "Phone updated."
