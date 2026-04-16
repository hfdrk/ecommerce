import Link from "next/link";

export function BlankBanner() {
  return (
    <section className="relative overflow-hidden border-y border-[color-mix(in_oklab,var(--accent)_25%,var(--border))] bg-gradient-to-br from-[var(--accent)] via-[#143e5f] to-[#0a2238] text-white">
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgb(255_255_255/0.14),transparent_65%)] blur-2xl"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-16">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
            Blank apparel
          </p>
          <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Build your next retail line
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Premium and core blanks with stable specs — built for repeat orders
            and predictable decorating.
          </p>
        </div>
        <Link
          href="/shop?category=Blank%20Apparel"
          className="inline-flex h-12 min-h-[48px] shrink-0 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-[var(--accent)] shadow-lg shadow-black/20 transition hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Shop blanks
        </Link>
      </div>
    </section>
  );
}
