import Link from "next/link";
import Image from "next/image";
import { formatPrice, products } from "@/lib/products";

const featured = products.slice(0, 4);

export function FeaturedProducts() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Catalog</p>
            <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
              Featured picks
            </h2>
            <p className="mt-3 text-sm text-[var(--muted-foreground)] sm:text-[0.95rem]">
              A rotating snapshot of blanks and services decorators order most
              often.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--accent)] transition hover:gap-3"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--accent)_25%,var(--border))] hover:shadow-[var(--shadow-lg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <div className="relative aspect-[4/5] bg-[var(--muted-bg)]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-muted)]">
                  {p.category}
                </p>
                <h3 className="mt-2 flex-1 font-display text-base font-semibold leading-snug text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--accent)]/30 group-hover:underline-offset-4">
                  {p.name}
                </h3>
                <p className="mt-4 text-sm font-semibold tabular-nums text-[var(--accent)]">
                  {formatPrice(p.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
