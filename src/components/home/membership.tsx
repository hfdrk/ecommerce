import Link from "next/link";

const tiers = [
  {
    name: "Warrior",
    price: "$14.99",
    cadence: "/month",
    blurb: "Member pricing on blanks and transfers.",
  },
  {
    name: "Elite",
    price: "$39.99",
    cadence: "/month",
    blurb: "Priority production + quarterly samples.",
  },
  {
    name: "Royal",
    price: "$89.99",
    cadence: "/month",
    blurb: "Dedicated support and custom routing rules.",
  },
] as const;

export function Membership() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Membership</p>
          <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
            Volume-friendly savings
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
            Unlock predictable savings when you print often. Cancel any time.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tiers.map((t, index) => {
            const popular = index === 1;
            return (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-2xl border p-7 shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)] ${
                  popular
                    ? "border-[var(--accent)] bg-[var(--surface-2)] ring-1 ring-[color-mix(in_oklab,var(--accent)_35%,transparent)]"
                    : "border-[var(--border)] bg-[var(--surface-2)]"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Popular
                  </span>
                )}
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-muted)]">
                  {t.name}
                </p>
                <p className="mt-5">
                  <span className="font-display text-3xl font-semibold tabular-nums text-[var(--ink)]">
                    {t.price}
                  </span>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {t.cadence}
                  </span>
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {t.blurb}
                </p>
                <Link
                  href="/contact"
                  className={
                    popular
                      ? "btn-primary mt-8 w-full"
                      : "mt-8 inline-flex h-11 w-full items-center justify-center rounded-full border border-[var(--border)] bg-white px-5 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--muted-bg)]"
                  }
                >
                  Request access
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
