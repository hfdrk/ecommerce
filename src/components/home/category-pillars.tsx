import Link from "next/link";

const pillars = [
  {
    title: "DTF transfers",
    desc: "Gang sheets, sizing tools, and press-ready color.",
    href: "/shop?category=DTF%20Transfers",
  },
  {
    title: "Blank apparel",
    desc: "Core and premium blanks with predictable shrink.",
    href: "/shop?category=Blank%20Apparel",
  },
  {
    title: "Custom print",
    desc: "Art prep, separations, and brand-consistent runs.",
    href: "/contact",
  },
  {
    title: "Print on demand",
    desc: "Ship direct to your customer with routed fulfillment.",
    href: "/shop?category=Print%20Services",
  },
] as const;

export function CategoryPillars() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--background)] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] shadow-[var(--shadow-sm)]">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group bg-[var(--surface-2)] p-8 transition hover:bg-[color-mix(in_oklab,var(--accent)_5%,white)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"
              >
                <h2 className="font-display text-[1.02rem] font-semibold tracking-tight text-[var(--ink)]">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {p.desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                  Explore
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
