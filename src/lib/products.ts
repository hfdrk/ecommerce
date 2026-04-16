import { productImageAtIndex } from "@/lib/site-images";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  sku: string;
  badge?: string;
};

export const CATEGORIES = [
  "All",
  "DTF Transfers",
  "Blank Apparel",
  "Accessories",
  "Print Services",
] as const;

const productRows = [
  {
    id: "p1",
    slug: "47-brand-tee-4700",
    name: "47 Brand Tee — 4700",
    price: 7.5,
    category: "Blank Apparel",
    sku: "BB-4700",
    description:
      "Premium cotton blend tee, retail-ready construction. Ideal for DTF or screen applications.",
  },
  {
    id: "p2",
    slug: "american-apparel-1304",
    name: "American Apparel 1304",
    price: 8.81,
    category: "Blank Apparel",
    sku: "AA-1304",
    description:
      "Fine jersey construction with a smooth hand-feel. Consistent dye lots for repeat orders.",
  },
  {
    id: "p3",
    slug: "dtf-gang-sheet-12x16",
    name: "DTF Gang Sheet — 12×16",
    price: 18.0,
    category: "DTF Transfers",
    sku: "DTF-GS-1216",
    badge: "Popular",
    description:
      "Full-color DTF transfer sized for hats, pockets, and youth placements. Press-ready.",
  },
  {
    id: "p4",
    slug: "dtf-ready-roll-10yd",
    name: "DTF Ready Roll — 10 yd",
    price: 129.0,
    category: "DTF Transfers",
    sku: "DTF-RL-10",
    description:
      "Continuous roll for high-volume shops. Vibrant whites, predictable stretch.",
  },
  {
    id: "p5",
    slug: "canvas-tote-12oz",
    name: "Canvas Tote — 12 oz",
    price: 14.25,
    category: "Accessories",
    sku: "AC-TOTE-12",
    description:
      "Heavy canvas with reinforced handles. Perfect for retail and event merch.",
  },
  {
    id: "p6",
    slug: "pod-rush-fulfillment",
    name: "Rush POD Fulfillment",
    price: 2.5,
    category: "Print Services",
    sku: "SRV-RUSH",
    description:
      "Per-piece rush handling for tight deadlines. Pairs with any in-catalog garment.",
  },
  {
    id: "p7",
    slug: "quarter-zip-performance",
    name: "Quarter-Zip — Performance",
    price: 36.0,
    category: "Blank Apparel",
    sku: "QZ-PERF-01",
    description:
      "Moisture-wicking layer with clean zipper and minimal branding for relabeling.",
  },
  {
    id: "p8",
    slug: "fleece-hood-premium",
    name: "Fleece Hood — Premium",
    price: 42.0,
    category: "Blank Apparel",
    sku: "FL-HD-PR",
    description:
      "Plush interior, stable shrinkage profile. Built for repeat heat applications.",
  },
] as const;

export const products: Product[] = productRows.map((row, index) => ({
  ...row,
  image: productImageAtIndex(index),
}));

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}
