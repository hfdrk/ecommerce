/**
 * Canonical Unsplash URLs for the storefront. All product and marketing imagery
 * should reference these so the site stays visually consistent.
 */
const u = (photoPath: string) =>
  `https://images.unsplash.com/${photoPath}?w=1200&q=80`;

/** Four core visuals — reused across the 8 demo SKUs (two each) */
export const SITE_IMAGES = {
  apparelWhiteTee: u("photo-1521572163474-6864f9cf17ab"),
  apparelFlatLay: u("photo-1576566588028-4147f3842f27"),
  dtfPressReady: u("photo-1618354691373-d851c5c3a990"),
  textileRoll: u("photo-1558618666-fcd25c85cd64"),
} as const;

/** Order used when cycling images across products */
export const PRODUCT_IMAGE_CYCLE = [
  SITE_IMAGES.apparelWhiteTee,
  SITE_IMAGES.apparelFlatLay,
  SITE_IMAGES.dtfPressReady,
  SITE_IMAGES.textileRoll,
] as const;

export function productImageAtIndex(index: number): string {
  return PRODUCT_IMAGE_CYCLE[index % PRODUCT_IMAGE_CYCLE.length]!;
}

/** Marketing / mockup surfaces (same pool — no extra stock photos) */
export const SITE_IMAGES_MARKETING = {
  designStudioPreview: SITE_IMAGES.apparelWhiteTee,
} as const;
