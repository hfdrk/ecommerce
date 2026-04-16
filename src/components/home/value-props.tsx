const items = [
  {
    title: "Works on any fabric",
    body: "DTF that plays nicely with cotton, blends, and synthetics.",
  },
  {
    title: "No order minimums",
    body: "Scale from one piece to full production without penalties.",
  },
  {
    title: "Fast, trackable shipping",
    body: "Eligible orders move quickly with clear tracking.",
  },
  {
    title: "Satisfaction-first",
    body: "We stand behind color accuracy and press performance.",
  },
] as const;

export function ValueProps() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Why teams choose us</p>
          <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
            Standards that hold up on the press and at retail
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface-2)] to-[color-mix(in_oklab,var(--accent)_4%,var(--surface))] p-6 shadow-[var(--shadow-sm)] transition hover:border-[color-mix(in_oklab,var(--accent)_28%,var(--border))] hover:shadow-[var(--shadow-md)]"
            >
              <div className="mb-4 h-px w-10 bg-gradient-to-r from-[var(--accent)] to-transparent" />
              <h3 className="text-sm font-semibold text-[var(--ink)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
