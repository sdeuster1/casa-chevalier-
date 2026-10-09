// Swatch colour for each colour name used in Shopify titles
// ("The Stable Vest - Sand" → Sand). Add a line when a new colour arrives;
// a colour not listed here shows the product's photo as its swatch.
export const COLOUR_SWATCHES = {
  'dark chocolate': '#3d2b23',
  sand: '#cdb99c',
  'vanilla blush': '#efe1d3',
  bronze: '#9a6b3f',
}

export const swatchFor = (colour) => COLOUR_SWATCHES[(colour || '').trim().toLowerCase()] || null
