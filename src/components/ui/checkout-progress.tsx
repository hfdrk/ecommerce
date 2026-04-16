import Link from "next/link";

type Step = "cart" | "checkout";

export function CheckoutProgress({ current }: { current: Step }) {
  const onCart = current === "cart";
  const onCheckout = current === "checkout";

  return (
    <nav aria-label="Checkout progress" className="mb-8">
      <ol className="flex flex-wrap items-center gap-3 text-sm">
        <li className="flex items-center gap-3">
          <Link
            href="/cart"
            className={
              onCart
                ? "inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white shadow-[var(--shadow-sm)]"
                : "inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--accent)] shadow-[var(--shadow-xs)] transition hover:bg-[var(--background-alt)]"
            }
            aria-current={onCart ? "step" : undefined}
          >
            <span
              className={
                onCart
                  ? "flex h-5 w-5 items-center justify-center rounded bg-white/20 text-[10px] font-bold text-white"
                  : "flex h-5 w-5 items-center justify-center rounded bg-[var(--accent-subtle)] text-[10px] font-bold text-[var(--accent)]"
              }
            >
              1
            </span>
            Cart
          </Link>
          <span className="text-[var(--accent-muted)]" aria-hidden>→</span>
          {onCheckout ? (
            <span
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white shadow-[var(--shadow-sm)]"
              aria-current="step"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-white/20 text-[10px] font-bold text-white">
                2
              </span>
              Checkout
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[var(--border)] bg-[var(--background-alt)] px-4 py-2 text-xs font-semibold text-[var(--muted-foreground)]">
              <span className="flex h-5 w-5 items-center justify-center rounded border border-[var(--border)] bg-white text-[10px] font-bold text-[var(--muted-foreground)]">
                2
              </span>
              Checkout
            </span>
          )}
        </li>
      </ol>
    </nav>
  );
}
