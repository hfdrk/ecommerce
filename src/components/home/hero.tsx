import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-y-1/2 rounded-full bg-gradient-to-tr from-[color-mix(in_oklab,var(--accent)_18%,transparent)] via-transparent to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-0 h-[380px] w-[380px] rounded-full bg-gradient-to-bl from-[color-mix(in_oklab,var(--accent)_12%,white)] to-transparent blur-2xl sm:h-[480px] sm:w-[480px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:grid lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          <p className="eyebrow">Print on demand · DTF · Blanks</p>
          <h1 className="font-display mt-6 text-[2.35rem] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
            Production-grade printing without the minimums.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)] sm:text-[1.0625rem]">
            From DTF transfers to full POD fulfillment — consistent color, fast
            turnaround, and apparel sourced for decorators who care about the
            details.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-primary px-8">
              Browse catalog
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full border border-[var(--border)] bg-white/90 px-8 text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-sm)] backdrop-blur-sm transition hover:border-[color-mix(in_oklab,var(--accent)_35%,var(--border))] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Talk to production
            </Link>
          </div>
        </div>

        <div className="relative mt-14 lg:col-span-5 lg:mt-0">
          <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--accent)_22%,var(--border))] bg-gradient-to-br from-[var(--accent)] via-[#123a58] to-[#0a2840] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
              aria-hidden
            />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              Why shops work with us
            </p>
            <ul className="relative mt-6 space-y-5">
              {[
                {
                  t: "Color you can repeat",
                  d: "Profiled presses and calibrated film for consistent runs.",
                },
                {
                  t: "Ops that answer",
                  d: "Direct line to production — not a ticket black hole.",
                },
                {
                  t: "Built for decorators",
                  d: "Blanks chosen for heat, stretch, and retail hand-feel.",
                },
              ].map((item) => (
                <li key={item.t} className="flex gap-4 border-l-2 border-white/25 pl-4">
                  <div>
                    <p className="font-semibold text-white">{item.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">
                      {item.d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="relative mt-8 flex flex-wrap gap-6 border-t border-white/15 pt-6">
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight">
                  24h
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/60">
                  Typical DTF turn
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight">
                  $0
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/60">
                  Catalog minimum
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--border)] pt-10 lg:col-span-12">
          <dl className="grid gap-8 sm:grid-cols-3">
            {[
              { k: "Turnaround", v: "Most DTF in 24h" },
              { k: "Minimums", v: "None on catalog" },
              { k: "Fulfillment", v: "POD-ready routing" },
            ].map((row) => (
              <div
                key={row.k}
                className="rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,white_70%,var(--background))] px-5 py-4 shadow-[var(--shadow-sm)] backdrop-blur-sm"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-muted)]">
                  {row.k}
                </dt>
                <dd className="mt-2 font-display text-lg font-semibold text-[var(--ink)]">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
