import Link from "next/link";
import { footerCategories, footerShop, mainNav } from "@/lib/navigation";
import { NewsletterForm } from "./newsletter-form";

function SocialIcon({ d, label }: { d: string; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-white/25 hover:text-white"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={d} />
      </svg>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-[1] mt-auto border-t border-white/10 bg-[#080c12] text-zinc-400">
      {/* Newsletter strip */}
      <div className="border-b border-white/8 bg-[#0c1018]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="font-display text-lg font-semibold text-white">
              Stay in the loop
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              New products, press tips, and member-only offers — no spam.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-5 lg:gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <p className="font-display text-xl font-semibold tracking-tight text-white">
            Arden&apos;s Print
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
            DTF transfers, blank apparel, and print-on-demand fulfillment —
            quality-first production from Tomball, TX.
          </p>
          <dl className="mt-6 space-y-2 text-sm">
            <div>
              <dt className="sr-only">Address</dt>
              <dd className="text-zinc-500">
                16131 N Eldridge Pkwy, Suite 108
                <br />
                Tomball, TX 77377
              </dd>
            </div>
            <div className="pt-2">
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
          {/* Social */}
          <div className="mt-6 flex gap-2">
            <SocialIcon label="Instagram" d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.5a1 1 0 110 2 1 1 0 010-2z" />
            <SocialIcon label="Facebook" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            <SocialIcon label="TikTok" d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
          </div>
        </div>

        {/* Information */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
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

        {/* Shop */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
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

        {/* Categories */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
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

      {/* Copyright bar */}
      <div className="border-t border-white/6 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Arden&apos;s Print. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition hover:text-zinc-400">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-zinc-400">
              Terms
            </Link>
            <Link href="/returns" className="transition hover:text-zinc-400">
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
