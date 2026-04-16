import Link from "next/link";

export function DesignStudio() {
  return (
    <section className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-r from-[var(--accent-subtle)] via-white to-white p-8 sm:flex sm:items-center sm:justify-between sm:gap-10 sm:p-10">
          <div className="max-w-lg">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-muted)]">
              Design Studio
            </p>
            <h2 className="font-display mt-3 text-xl font-semibold tracking-tight text-[var(--ink)] sm:text-2xl">
              Design → Preview → Order — all in one flow
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
              Upload your artwork, preview on garment mockups, and place the order
              without leaving the browser. Built for schools, teams, and growing brands.
            </p>
          </div>
          <Link
            href="/shop"
            className="btn-primary mt-6 shrink-0 px-8 sm:mt-0"
          >
            Launch Studio
          </Link>
        </div>
      </div>
    </section>
  );
}
