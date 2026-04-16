import Link from "next/link";

function RulerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.174 6.812a1 1 0 00-3.986-3.987L3.842 16.174a2 2 0 00-.5.83l-1.321 4.352a.5.5 0 00.623.622l4.353-1.32a2 2 0 00.83-.497z" />
      <path d="M15 5l4 4" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17,8 12,3 7,8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

const cards = [
  {
    title: "Transfer by size",
    body: "Print transfers in the exact dimensions your job requires — from hat logos to full-chest.",
    href: "/shop?category=DTF%20Transfers",
    action: "View sizes",
    Icon: RulerIcon,
  },
  {
    title: "Gang sheet builder",
    body: "Lay out multiple artworks on one sheet to maximize yield and cut per-piece cost.",
    href: "/shop?category=DTF%20Transfers",
    action: "Open builder",
    Icon: GridIcon,
  },
  {
    title: "Upload gang sheet",
    body: "Send a print-ready file — we verify and queue same day with color-matched output.",
    href: "/contact",
    action: "Upload file",
    Icon: UploadIcon,
  },
  {
    title: "Ready-to-press designs",
    body: "Stock artwork you can ship or apply in minutes. Ready for heat transfer.",
    href: "/shop",
    action: "Browse designs",
    Icon: ShoppingBagIcon,
  },
] as const;

export function DtfHub() {
  return (
    <section className="section-dark">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">DTF Hub</p>
          <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Pick your workflow
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
            Most DTF orders ship within 24 hours. Choose the path that matches
            how you design and produce.
          </p>
        </div>

        <div className="stagger-children mt-12 grid gap-5 sm:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group flex flex-col rounded-xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white/80">
                <c.Icon />
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">
                {c.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                {c.body}
              </p>
              <Link
                href={c.href}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/80 transition hover:text-white hover:gap-2.5"
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
