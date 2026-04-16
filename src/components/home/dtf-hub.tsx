import Link from "next/link";

const cards = [
  {
    title: "Transfer by size",
    body: "Print transfers in the exact dimensions your job requires.",
    href: "/shop?category=DTF%20Transfers",
    action: "View sizes",
  },
  {
    title: "Gang sheet builder",
    body: "Lay out multiple artworks on one sheet to maximize yield.",
    href: "/shop?category=DTF%20Transfers",
    action: "Open builder",
  },
  {
    title: "Upload gang sheet",
    body: "Send a print-ready file — we verify and queue same day.",
    href: "/contact",
    action: "Upload file",
  },
  {
    title: "Ready-to-press designs",
    body: "Stock artwork you can ship or apply in minutes.",
    href: "/shop",
    action: "Browse designs",
  },
] as const;

export function DtfHub() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">DTF hub</p>
          <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
            Pick your workflow
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
            Most DTF orders ship within 24 hours. Choose the path that matches
            how you design and produce.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-7 shadow-[var(--shadow-sm)] transition hover:border-[color-mix(in_oklab,var(--accent)_22%,var(--border))] hover:shadow-[var(--shadow-md)]"
            >
              <h3 className="text-sm font-semibold text-[var(--ink)]">
                {c.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {c.body}
              </p>
              <Link
                href={c.href}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[var(--accent)] transition hover:gap-2"
              >
                {c.action}
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
