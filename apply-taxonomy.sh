#!/bin/bash
set -e
cd ~/Desktop/casa-chevalier
echo "Applying taxonomy fix..."
git am --abort 2>/dev/null || true
git am << 'PATCH_END'
From b6f8961e8975498bdebe7284009c5a3f6cd8d79b Mon Sep 17 00:00:00 2001
From: Claude <claude@sandbox>
Date: Thu, 1 Oct 2026 15:49:32 +0000
Subject: [PATCH] Read categories from Shopify standard taxonomy

productType is empty across the catalogue; categories are set via the
standard product taxonomy field. Now fetched and used as the primary
category signal.
---
 src/lib/shopify.js | 5 ++++-
 1 file changed, 4 insertions(+), 1 deletion(-)

diff --git a/src/lib/shopify.js b/src/lib/shopify.js
index e6d6724..16100cd 100644
--- a/src/lib/shopify.js
+++ b/src/lib/shopify.js
@@ -45,6 +45,7 @@ const PRODUCT_FIELDS = `
   description
   descriptionHtml
   productType
+  category { name }
   tags
   availableForSale
   options { name values }
@@ -122,10 +123,12 @@ function normalizeProduct(node) {
   const collectionTitles = node.collections.edges
     .map((e) => e.node.title)
     .filter((t) => t && t.toLowerCase() !== 'home page')
-  const category = (collectionTitles[0] || node.productType || 'UNCATEGORISED').toUpperCase()
+  const taxonomy = node.category?.name
+  const category = (taxonomy || collectionTitles[0] || node.productType || 'UNCATEGORISED').toUpperCase()
 
   // Every label this product could legitimately be filtered by
   const categoryTags = [
+    taxonomy,
     ...collectionTitles,
     node.productType,
     ...node.tags,
-- 
2.43.0


PATCH_END
echo "Applied. Starting dev server..."
npm run dev
