import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="card card-lift group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[3/4] bg-[var(--background-alt)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-muted)]">
          {product.category}
        </p>
        <h2 className="mt-1.5 flex-1 font-display text-base font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--accent)]">
          {product.name}
        </h2>
        <p className="mt-3 text-sm font-semibold tabular-nums text-[var(--accent)]">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
