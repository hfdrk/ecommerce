import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--accent)_22%,var(--border))] hover:shadow-[var(--shadow-lg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="relative aspect-[4/5] bg-[var(--muted-bg)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-muted)]">
          {product.category}
        </p>
        <h2 className="mt-1 flex-1 font-display text-base font-semibold leading-snug text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--accent)]/25 group-hover:underline-offset-4">
          {product.name}
        </h2>
        <p className="mt-3 text-sm font-semibold tabular-nums text-[var(--accent)]">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
