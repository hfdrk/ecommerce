import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/shop/product-card";
import { CATEGORIES, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse DTF transfers, blank apparel, accessories, and services.",
};

type Search = { category?: string; q?: string };

function filterProducts({ category, q }: Search) {
  let list = products;
  if (category && category !== "All") {
    list = list.filter((p) => p.category === category);
  }
  if (q && q.trim()) {
    const needle = q.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle) ||
        p.sku.toLowerCase().includes(needle),
    );
  }
  return list;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { category: catRaw, q } = await searchParams;
  const category = catRaw ? decodeURIComponent(catRaw) : undefined;
  const list = filterProducts({ category, q });
  const hasFilters =
    (category && category !== "All") || (q && q.trim().length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Catalog</p>
        <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          Shop
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
          Filter by category or search by SKU and product name. Prices reflect
          catalog tiers — volume quotes available on request.
        </p>
      </header>

      <div className="sticky top-14 z-30 -mx-4 border-b border-[var(--border)]/60 bg-[var(--surface)]/90 px-4 py-4 backdrop-blur-md sm:top-[4.25rem] sm:-mx-6 sm:px-6">
        <form
          className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 shadow-[var(--shadow-md)] sm:flex-row sm:items-end sm:gap-4"
          action="/shop"
          method="get"
        >
          <div className="min-w-0 flex-1">
            <label
              htmlFor="category"
              className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={category ?? "All"}
              className="field-input mt-2"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0 flex-1">
            <label
              htmlFor="q"
              className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]"
            >
              Search
            </label>
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={q ?? ""}
              placeholder="Name, category, SKU…"
              autoComplete="off"
              className="field-input mt-2"
            />
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <button type="submit" className="btn-primary h-11 min-h-[44px] w-full px-6 sm:w-auto">
              Apply filters
            </button>
            {hasFilters && (
              <Link
                href="/shop"
                className="inline-flex h-11 min-h-[44px] w-full items-center justify-center rounded-full border border-[var(--border)] bg-white px-4 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--muted-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-auto"
              >
                Reset
              </Link>
            )}
          </div>
        </form>
        <p className="mt-3 text-xs text-[var(--muted-foreground)]">
          <span className="font-semibold text-[var(--accent)]">
            {list.length}
          </span>{" "}
          {list.length === 1 ? "product" : "products"}
          {hasFilters ? " match your filters" : " in catalog"}
        </p>
      </div>

      {list.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-[color-mix(in_oklab,var(--accent)_35%,var(--border))] bg-[var(--surface-2)] px-6 py-14 text-center shadow-[var(--shadow-sm)]">
          <p className="text-sm font-semibold text-[var(--ink)]">
            No matches
          </p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Try another search or clear filters to see everything.
          </p>
          <Link href="/shop" className="btn-primary mt-6 px-8">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
