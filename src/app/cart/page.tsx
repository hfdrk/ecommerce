"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { CheckoutProgress } from "@/components/ui/checkout-progress";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <CheckoutProgress current="cart" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          Cart
        </h1>
        {items.length > 0 && (
          <p className="text-sm text-[var(--muted-foreground)]">
            Review items, then continue to checkout when ready.
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-[var(--border)] bg-white px-6 py-16 text-center shadow-[var(--shadow-xs)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--background-alt)] text-[var(--muted-foreground)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 8V6a3 3 0 116 0v2M5 8h14l-1.2 12.1a2 2 0 01-2 1.9H8.2a2 2 0 01-2-1.9L5 8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="mt-6 text-base font-medium text-[var(--foreground)]">
            Your cart is empty
          </p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Browse the catalog to add blanks, transfers, or services.
          </p>
          <Link href="/shop" className="btn-primary mt-8 px-8">
            Browse catalog
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
          <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[var(--shadow-xs)]">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-[var(--background-alt)] sm:h-24 sm:w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="text-sm font-semibold text-[var(--foreground)] underline-offset-4 hover:underline"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
                    {product.sku}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                    {formatPrice(product.price)} each
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div
                    className="inline-flex items-center rounded-lg border border-[var(--border)] bg-white shadow-[var(--shadow-xs)]"
                    role="group"
                    aria-label={`Quantity for ${product.name}`}
                  >
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-l-lg text-lg leading-none text-[var(--foreground)] transition hover:bg-[var(--background-alt)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--foreground)]"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(product.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums text-[var(--foreground)]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-r-lg text-lg leading-none text-[var(--foreground)] transition hover:bg-[var(--background-alt)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--foreground)]"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums text-[var(--foreground)]">
                      {formatPrice(product.price * quantity)}
                    </p>
                    <button
                      type="button"
                      className="mt-2 text-xs font-semibold text-[var(--muted-foreground)] underline-offset-4 transition hover:text-[var(--foreground)] hover:underline"
                      onClick={() => removeItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-xs)] lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">
              Order summary
            </h2>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Subtotal</span>
              <span className="font-semibold tabular-nums text-[var(--foreground)]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
              Shipping and tax calculated at checkout.
            </p>
            <Link href="/checkout" className="btn-primary mt-6 w-full">
              Checkout
            </Link>
            <Link
              href="/shop"
              className="mt-4 block text-center text-sm font-semibold text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
