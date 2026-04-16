import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[var(--accent)] lg:min-h-[680px]">
      {/* Background image */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        className="object-cover opacity-40"
        sizes="100vw"
        priority
      />

      {/* Gradient overlays */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--accent)] via-transparent to-transparent opacity-60"
        aria-hidden
      />

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 py-28 sm:px-8 sm:py-32 lg:py-36">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
          DTF Transfers · Blank Apparel · Print on Demand
        </p>

        <h1 className="font-display mt-6 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.5rem]">
          Production-grade printing, zero minimums.
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
          Consistent color, fast turnarounds, and apparel sourced for
          decorators who care about the details.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-[var(--accent)] shadow-lg transition hover:bg-zinc-50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Browse catalog
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 px-8 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Talk to production
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid max-w-xl grid-cols-3 gap-4">
          {[
            { value: "24h", label: "Typical DTF turn" },
            { value: "$0", label: "Order minimum" },
            { value: "POD", label: "Fulfillment ready" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
            >
              <p className="font-display text-2xl font-semibold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/45">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
