import Link from "next/link";

export function ContactStrip() {
  return (
    <section className="relative z-[1] bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface-2)] via-white to-[color-mix(in_oklab,var(--accent)_6%,white)] p-8 shadow-[var(--shadow-md)] sm:flex sm:items-center sm:justify-between sm:gap-10 sm:p-10">
          <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] blur-3xl" />
          <div className="relative">
            <p className="eyebrow">Direct line</p>
            <h2 className="font-display mt-4 text-xl font-semibold text-[var(--ink)] sm:text-2xl">
              Talk to production
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Text or call — we route rush jobs and custom programs daily.
            </p>
            <a
              href="tel:+18324808080"
              className="mt-5 inline-block font-display text-2xl font-semibold tabular-nums tracking-tight text-[var(--accent)] transition hover:text-[var(--accent-hover)]"
            >
              (832) 480-8080
            </a>
          </div>
          <Link
            href="/contact"
            className="btn-primary relative mt-8 w-full shrink-0 px-8 sm:mt-0 sm:w-auto"
          >
            Contact form
          </Link>
        </div>
      </div>
    </section>
  );
}
