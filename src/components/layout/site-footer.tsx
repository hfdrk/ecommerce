import Link from "next/link";
import { footerCategories, footerShop, mainNav } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="relative z-[1] mt-auto border-t border-white/10 bg-[var(--ink)] text-zinc-400">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:gap-10">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-white">
            Arden&apos;s Print
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            16131 N Eldridge Pkwy, Suite 108
            <br />
            Tomball, TX 77377
          </p>
          <dl className="mt-6 space-y-2 text-sm">
            <div>
              <dt className="sr-only">Phone</dt>
              <dd>
                <a
                  href="tel:+18324808080"
                  className="font-medium text-zinc-300 transition hover:text-white"
                >
                  (832) 480-8080
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Email</dt>
              <dd>
                <a
                  href="mailto:info@ardensprint.com"
                  className="font-medium text-zinc-300 transition hover:text-white"
                >
                  info@ardensprint.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Information
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-zinc-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Shop
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {footerShop.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-zinc-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Categories
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {footerCategories.map((c) => (
              <li key={c}>
                <Link
                  href={`/shop?q=${encodeURIComponent(c)}`}
                  className="text-zinc-500 transition hover:text-white"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Arden&apos;s Print. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/returns" className="transition hover:text-white">
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
