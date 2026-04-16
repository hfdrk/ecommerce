"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { CheckoutProgress } from "@/components/ui/checkout-progress";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [done, setDone] = useState(false);

  if (items.length === 0 && !done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--muted-bg)] text-[var(--muted-foreground)]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 8V6a3 3 0 116 0v2M5 8h14l-1.2 12.1a2 2 0 01-2 1.9H8.2a2 2 0 01-2-1.9L5 8z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="mt-8 text-2xl font-semibold text-[var(--foreground)]">
          Nothing to checkout
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
          Add items to your cart before completing an order.
        </p>
        <Link href="/shop" className="btn-primary mt-8 px-8">
          Browse shop
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[var(--accent)]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="mt-8 text-2xl font-semibold text-[var(--foreground)]">
          Order received
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
          This is a demo checkout. In production, you would connect a payment
          provider and push the order to your OMS or ERP.
        </p>
        <button
          type="button"
          className="btn-primary mt-8 px-8"
          onClick={() => router.push("/shop")}
        >
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <CheckoutProgress current="checkout" />

      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Demo flow — no payment is processed.
        </p>
      </header>

      <form
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start"
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setDone(true);
        }}
      >
        <div className="space-y-10">
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">
              Contact
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                <span className="text-[var(--muted-foreground)]">Full name</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="field-input mt-2"
                />
              </label>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                <span className="text-[var(--muted-foreground)]">Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="field-input mt-2"
                />
              </label>
            </div>
          </section>
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">
              Ship to
            </h2>
            <div className="mt-6 grid gap-4">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                <span className="text-[var(--muted-foreground)]">Address</span>
                <input
                  required
                  name="line1"
                  autoComplete="address-line1"
                  className="field-input mt-2"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block text-sm font-medium text-[var(--foreground)] sm:col-span-1">
                  <span className="text-[var(--muted-foreground)]">City</span>
                  <input
                    required
                    name="city"
                    autoComplete="address-level2"
                    className="field-input mt-2"
                  />
                </label>
                <label className="block text-sm font-medium text-[var(--foreground)] sm:col-span-1">
                  <span className="text-[var(--muted-foreground)]">State</span>
                  <input
                    required
                    name="state"
                    autoComplete="address-level1"
                    className="field-input mt-2"
                  />
                </label>
                <label className="block text-sm font-medium text-[var(--foreground)] sm:col-span-1">
                  <span className="text-[var(--muted-foreground)]">ZIP</span>
                  <input
                    required
                    name="zip"
                    autoComplete="postal-code"
                    className="field-input mt-2"
                  />
                </label>
              </div>
            </div>
          </section>
        </div>

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] lg:sticky lg:top-24">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">
            Order summary
          </h2>
          <ul className="mt-4 max-h-52 space-y-3 overflow-auto text-sm">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between gap-4">
                <span className="min-w-0 text-[var(--muted-foreground)]">
                  <span className="font-medium text-[var(--foreground)]">
                    {product.name}
                  </span>{" "}
                  <span className="tabular-nums text-[var(--muted-foreground)]">
                    ×{quantity}
                  </span>
                </span>
                <span className="shrink-0 tabular-nums font-medium text-[var(--foreground)]">
                  {formatPrice(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-[var(--border)] pt-4 text-sm">
            <span className="text-[var(--muted-foreground)]">Subtotal</span>
            <span className="font-semibold tabular-nums text-[var(--foreground)]">
              {formatPrice(subtotal)}
            </span>
          </div>
          <button type="submit" className="btn-primary mt-6 w-full">
            Place order
          </button>
          <Link
            href="/cart"
            className="mt-4 block text-center text-sm font-semibold text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
          >
            Return to cart
          </Link>
        </aside>
      </form>
    </div>
  );
}
