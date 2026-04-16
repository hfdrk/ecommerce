const stats = [
  { value: "500+", label: "Shops served" },
  { value: "24h", label: "Avg DTF turnaround" },
  { value: "99.4%", label: "Color accuracy" },
] as const;

const props = [
  {
    title: "Works on any fabric",
    body: "DTF that plays nicely with cotton, blends, and synthetics — no pre-treatment required.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2 12 3.46 8 2 3.62 3.46a2 2 0 00-1.34 1.89v14.91a.5.5 0 00.72.45L8 18.16l4 1.46 4-1.46 4.96 2.55a.5.5 0 00.72-.45V5.35a2 2 0 00-1.3-1.89z" />
      </svg>
    ),
  },
  {
    title: "No order minimums",
    body: "Scale from one piece to full production runs without setup fees or quantity penalties.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    title: "Fast, trackable shipping",
    body: "Eligible orders move quickly with clear tracking and reliable carrier routing nationwide.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18h1a2 2 0 002-2V7a2 2 0 00-2-2H5" />
        <path d="M14 5h1a2 2 0 012 2v9a2 2 0 01-2 2h-1" />
        <path d="M5 8h8M5 12h8M5 16h8" />
      </svg>
    ),
  },
  {
    title: "Satisfaction-first",
    body: "We stand behind color accuracy and press performance — reprints at our cost if we miss the mark.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
] as const;

export function ValueProps() {
  return (
    <section className="section-alt border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {/* Stats row */}
        <div className="stagger-children grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="stat-card text-center">
              <p className="font-display text-3xl font-semibold tabular-nums tracking-tight text-[var(--accent)]">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Value props */}
        <div className="mt-14">
          <div className="text-center">
            <p className="eyebrow justify-center">Why decorators trust us</p>
            <h2 className="font-display mx-auto mt-4 max-w-lg text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
              Standards that hold up on the press and at retail
            </h2>
          </div>

          <div className="stagger-children mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {props.map((item) => (
              <div
                key={item.title}
                className="card group p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)] transition group-hover:bg-[var(--accent)] group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
