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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-xs text-[var(--muted-foreground)]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link
              href="/"
              className="transition hover:text-[var(--accent)]"
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-[var(--border)]">
            /
          </li>
          <li>
            <Link
              href="/shop"
              className="transition hover:text-[var(--accent)]"
            >
              Shop
            </Link>
          </li>
          <li aria-hidden className="text-[var(--border)]">
            /
          </li>
          <li className="font-medium text-[var(--ink)]">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--muted-bg)] shadow-[var(--shadow-md)] lg:aspect-[5/6] lg:sticky lg:top-24">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        <div className="lg:min-h-[min(100vh-8rem,720px)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-muted)]">
            {product.category}
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-6 font-display text-3xl font-semibold tabular-nums tracking-tight text-[var(--accent)] sm:text-4xl">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
            {product.description}
          </p>

          <dl className="mt-8 grid gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6 text-sm shadow-[var(--shadow-sm)] sm:grid-cols-2">
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

          <div className="mt-8 space-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-3 sm:space-y-0">
            <AddToCartButton product={product} />
            <Link
              href="/cart"
              className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-6 text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--muted-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-auto"
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
    </div>
  );
}
