import Link from "next/link";

const tiers = [
  {
    name: "Warrior",
    price: "$14.99",
    cadence: "/month",
    blurb: "Member pricing on blanks and transfers.",
    features: [
      "5% off all catalog orders",
      "Priority order processing",
      "Member-only color library",
      "Standard support",
    ],
  },
  {
    name: "Elite",
    price: "$39.99",
    cadence: "/month",
    blurb: "Priority production + quarterly samples.",
    features: [
      "12% off all catalog orders",
      "Rush production queue",
      "Quarterly sample box",
      "Dedicated account rep",
      "Custom gang sheet templates",
    ],
  },
  {
    name: "Royal",
    price: "$89.99",
    cadence: "/month",
    blurb: "Dedicated support and custom routing rules.",
    features: [
      "18% off all catalog orders",
      "Same-day DTF production",
      "White-label fulfillment",
      "Custom routing rules",
      "1-on-1 onboarding call",
      "Volume pricing unlocked",
    ],
  },
] as const;

export function Membership() {
  return (
    <section className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <p className="eyebrow justify-center">Membership</p>
          <h2 className="font-display mx-auto mt-4 max-w-md text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
            Predictable savings for production shops
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            Unlock tiered discounts when you print often. Cancel any time — no contracts.
          </p>
        </div>

        <div className="stagger-children mt-12 grid gap-5 md:grid-cols-3">
          {tiers.map((t, index) => {
            const popular = index === 1;
            return (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-xl border p-7 transition hover:shadow-[var(--shadow-md)] ${
                  popular
                    ? "border-[var(--accent)] bg-white shadow-[var(--shadow-sm)] ring-1 ring-[var(--accent)]/20"
                    : "border-[var(--border)] bg-white shadow-[var(--shadow-xs)]"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-6 rounded-md bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most popular
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
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {t.blurb}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--muted-foreground)]">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={popular ? "btn-primary mt-8 w-full" : "btn-secondary mt-8 w-full"}
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
