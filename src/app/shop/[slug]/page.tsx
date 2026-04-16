import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import {
  formatPrice,
  getProductBySlug,
  products,
} from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[var(--muted-foreground)]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="transition hover:text-[var(--accent)]">Home</Link>
          </li>
          <li aria-hidden className="text-[var(--border)]">/</li>
          <li>
            <Link href="/shop" className="transition hover:text-[var(--accent)]">Shop</Link>
          </li>
          <li aria-hidden className="text-[var(--border)]">/</li>
          <li className="font-medium text-[var(--ink)]">{product.name}</li>
        </ol>
      </nav>

      {/* Product layout */}
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-alt)] shadow-[var(--shadow-sm)] lg:aspect-[5/6] lg:sticky lg:top-24">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-md bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-muted)]">
            {product.category}
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-6 font-display text-3xl font-semibold tabular-nums tracking-tight text-[var(--accent)] sm:text-4xl">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            {product.description}
          </p>

          {/* Details card */}
          <dl className="mt-8 grid gap-5 rounded-xl border border-[var(--border)] bg-[var(--background-alt)] p-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[var(--muted-foreground)]">SKU</dt>
              <dd className="mt-1 font-mono text-sm font-semibold text-[var(--ink)]">
                {product.sku}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Availability</dt>
              <dd className="mt-1 font-semibold text-[var(--ink)]">
                In stock — ships in 1–2 business days
              </dd>
            </div>
          </dl>

          {/* Actions */}
          <div className="mt-8 space-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-3 sm:space-y-0">
            <AddToCartButton product={product} />
            <Link
              href="/cart"
              className="btn-secondary h-12 w-full sm:w-auto sm:min-w-[160px]"
            >
              View cart
            </Link>
          </div>

          <p className="mt-8 text-xs leading-relaxed text-[var(--muted-foreground)]">
            Tax and freight calculated at checkout. Free shipping may apply on
            qualifying catalog orders.
          </p>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20 border-t border-[var(--border)] pt-14">
          <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--ink)] sm:text-2xl">
            Related products
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/shop/${p.slug}`}
                className="card card-lift group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[3/4] bg-[var(--background-alt)]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-muted)]">
                    {p.category}
                  </p>
                  <h3 className="mt-1.5 flex-1 font-display text-base font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--accent)]">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm font-semibold tabular-nums text-[var(--accent)]">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
